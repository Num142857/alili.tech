---
title: '谈一谈创建React Component的几种方式' 
date: 2019-01-26 2:30:18
hidden: true
slug: a4kpewlts4g
categories: [reprint]
---

{{< raw >}}

                    
<p>当我们谈起React的时候，多半会将注意力集中在组件之上，思考如何将页面划分成一个个组件，以及如何编写可复用的组件。但对于接触React不久，还没有真正用它做一个完整项目的人来说，理解如何创建一个组件也并不那么简单。在最开始的时候我以为创建组件只需要调用<code>createClass</code>这个api就可以了；但学习了ES6的语法后，又知道了可以利用继承，通过<code>extends React.component</code>来创建组件；后来在阅读别人代码的时候又发现了<code>PureComponent</code>以及完全没有继承，仅仅通过返回JSX语句的方式创建组件的方式。下面这篇文章，就将逐一介绍这几种创建组件的方法，分析其特点，以及如何选择使用哪一种方式创建组件。</p>
<h1 id="articleHeader0">几种方法</h1>
<h2 id="articleHeader1">1.createClass</h2>
<p>如果你还没有使用ES6语法，那么定义组件，只能使用<code>React.createClass</code>这个helper来创建组件，下面是一段示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var React = require(&quot;react&quot;);
var Greeting = React.createClass({
  
  propTypes: {
    name: React.PropTypes.string //属性校验
  },

  getDefaultProps: function() {
    return {
      name: 'Mary' //默认属性值
    };
  },
  
  getInitialState: function() {
    return {count: this.props.initialCount}; //初始化state
  },
  
  handleClick: function() {
    //用户点击事件的处理函数
  },

  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
module.exports = Greeting;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">"react"</span>);
<span class="hljs-keyword">var</span> Greeting = React.createClass({
  
  <span class="hljs-attr">propTypes</span>: {
    <span class="hljs-attr">name</span>: React.PropTypes.string <span class="hljs-comment">//属性校验</span>
  },

  <span class="hljs-attr">getDefaultProps</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Mary'</span> <span class="hljs-comment">//默认属性值</span>
    };
  },
  
  <span class="hljs-attr">getInitialState</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">count</span>: <span class="hljs-keyword">this</span>.props.initialCount}; <span class="hljs-comment">//初始化state</span>
  },
  
  <span class="hljs-attr">handleClick</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//用户点击事件的处理函数</span>
  },

  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
  }
});
<span class="hljs-built_in">module</span>.exports = Greeting;</code></pre>
<p>这段代码，包含了组件的几个关键组成部分，这种方式下，组件的props、state等都是以对象属性的方式组合在一起，其中默认属props和初始state都是返回对象的函数，propTypes则是个对象。这里还有一个值得注意的事情是，在createClass中，React对属性中的所有函数都进行了<code>this</code>绑定，也就是如上面的<code>hanleClick</code>其实相当于<code>handleClick.bind(this)</code> 。</p>
<h2 id="articleHeader2">2.component</h2>
<p>因为ES6对类和继承有语法级别的支持，所以用ES6创建组件的方式更加优雅，下面是示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
class Greeting extends React.Component {

  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
    this.handleClick = this.handleClick.bind(this);
  }
  
  //static defaultProps = {
  //  name: 'Mary'  //定义defaultprops的另一种方式
  //}
  
  //static propTypes = {
    //name: React.PropTypes.string
  //}
  
  handleClick() {
    //点击事件的处理函数
  }
  
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

Greeting.propTypes = {
  name: React.PropTypes.string
};

Greeting.defaultProps = {
  name: 'Mary'
};
export default Greating;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Greeting</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{

  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">count</span>: props.initialCount};
    <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);
  }
  
  <span class="hljs-comment">//static defaultProps = {</span>
  <span class="hljs-comment">//  name: 'Mary'  //定义defaultprops的另一种方式</span>
  <span class="hljs-comment">//}</span>
  
  <span class="hljs-comment">//static propTypes = {</span>
    <span class="hljs-comment">//name: React.PropTypes.string</span>
  <span class="hljs-comment">//}</span>
  
  handleClick() {
    <span class="hljs-comment">//点击事件的处理函数</span>
  }
  
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
  }
}

Greeting.propTypes = {
  <span class="hljs-attr">name</span>: React.PropTypes.string
};

Greeting.defaultProps = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Mary'</span>
};
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Greating;</code></pre>
<p>可以看到Greeting继承自React.component,在构造函数中，通过super()来调用父类的构造函数，同时我们看到组件的state是通过在构造函数中对this.state进行赋值实现，而组件的props是在类Greeting上创建的属性，如果你对<code>类的属性</code>和<code>对象的属性</code>的区别有所了解的话，大概能理解为什么会这么做。对于组件来说，组件的props是父组件通过调用子组件向子组件传递的，子组件内部不应该对props进行修改，它更像是所有子组件实例共享的状态，不会因为子组件内部操作而改变，因此将props定义为类Greeting的属性更为合理，而在面向对象的语法中类的属性通常被称作静态(static)属性，这也是为什么props还可以像上面注释掉的方式来定义。对于Greeting类的一个实例对象的state，它是组件对象内部维持的状态，通过用户操作会修改这些状态，每个实例的state也可能不同，彼此间不互相影响，因此通过this.state来设置。</p>
<p>用这种方式创建组件时，React并没有对内部的函数，进行this绑定，所以如果你想让函数在回调中保持正确的this，就要手动对需要的函数进行this绑定，如上面的handleClick，在构造函数中对this 进行了绑定。</p>
<h2 id="articleHeader3">3.PureComponet</h2>
<p>我们知道，当组件的props或者state发生变化的时候：React会对组件当前的Props和State分别与nextProps和nextState进行比较，当发现变化时，就会对<code>当前组件以及子组件</code>进行重新渲染，否则就不渲染。有时候为了避免组件进行不必要的重新渲染，我们通过定义<code>shouldComponentUpdate</code>来优化性能。例如如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
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
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CounterButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">count</span>: <span class="hljs-number">1</span>};
  }

  shouldComponentUpdate(nextProps, nextState) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.color !== nextProps.color) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.count !== nextState.count) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
        <span class="hljs-attr">color</span>=<span class="hljs-string">{this.props.color}</span>
        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.setState(state =&gt; ({count: state.count + 1}))}&gt;
        Count: {this.state.count}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
  }
}</code></pre>
<p><code>shouldComponentUpdate</code>通过判断<code>props.color</code>和<code>state.count</code>是否发生变化来决定需不需要重新渲染组件，当然有时候这种简单的判断，显得有些多余和样板化，于是React就提供了<code>PureComponent</code>来自动帮我们做这件事，这样就不需要手动来写<code>shouldComponentUpdate</code>了：</p>
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
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CounterButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">PureComponent</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">count</span>: <span class="hljs-number">1</span>};
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
        <span class="hljs-attr">color</span>=<span class="hljs-string">{this.props.color}</span>
        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.setState(state =&gt; ({count: state.count + 1}))}&gt;
        Count: {this.state.count}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
  }
}</code></pre>
<p>大多数情况下， 我们使用<code>PureComponent</code>能够简化我们的代码，并且提高性能，但是<code>PureComponent</code>的自动为我们添加的<code>shouldComponentUpate</code>函数，只是对props和state进行浅比较(shadow comparison)，当props或者state本身是嵌套对象或数组等时，浅比较并不能得到预期的结果，这会导致实际的props和state发生了变化，但组件却没有更新的问题，例如下面代码有一个<code>ListOfWords</code>组件来将单词数组拼接成逗号分隔的句子，它有一个父组件<code>WordAdder</code>让你点击按钮为单词数组添加单词，但他并不能正常工作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
 }
 
class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    // 这个地方导致了bug
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ListOfWords</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">PureComponent</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.props.words.join(',')}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
 }
 
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WordAdder</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">words</span>: [<span class="hljs-string">'marklar'</span>]
    };
    <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);
  }
  
  handleClick() {
    <span class="hljs-comment">// 这个地方导致了bug</span>
    <span class="hljs-keyword">const</span> words = <span class="hljs-keyword">this</span>.state.words;
    words.push(<span class="hljs-string">'marklar'</span>);
    <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">words</span>: words});
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;button onClick={this.handleClick} /&gt;
        &lt;ListOfWords words={this.state.words} /&gt;
      &lt;/div&gt;
    );
  }
}</code></pre>
<p>这种情况下，<code>PureComponent</code>只会对this.props.words进行一次浅比较，虽然数组里面新增了元素，但是this.props.words与nextProps.words指向的仍是同一个数组，因此this.props.words !== nextProps.words 返回的便是flase，从而导致ListOfWords组件没有重新渲染,笔者之前就因为对此不太了解，而随意使用PureComponent，导致state发生变化，而视图就是不更新，调了好久找不到原因~。</p>
<p>最简单避免上述情况的方式，就是避免使用可变对象作为props和state，取而代之的是每次返回一个全新的对象,如下通过<code>concat</code>来返回新的数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleClick() {
  this.setState(prevState => ({
    words: prevState.words.concat(['marklar'])
  }));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">handleClick() {
  <span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">prevState</span> =&gt;</span> ({
    <span class="hljs-attr">words</span>: prevState.words.concat([<span class="hljs-string">'marklar'</span>])
  }));
}</code></pre>
<p>你可以考虑使用<code>Immutable.js</code>来创建不可变对象，通过它来简化对象比较，提高性能。<br>这里还要提到的一点是虽然这里虽然使用了<code>Pure</code>这个词，但是<code>PureComponent</code>并不是纯的，因为对于纯的函数或组件应该是没有内部状态，对于<code>stateless component</code>更符合纯的定义，不了解纯函数的同学，可以参见<a href="https://segmentfault.com/a/1190000007491981">这篇文章</a>。</p>
<h2 id="articleHeader4">4.Stateless Functional Component</h2>
<p>上面我们提到的创建组件的方式，都是用来创建包含状态和用户交互的复杂组件，当组件本身只是用来展示，所有数据都是通过props传入的时候，我们便可以使用<code>Stateless Functional Component</code>来快速创建组件。例如下面代码所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
const Button = ({
  day,
  increment
}) => {
  return (
    <div>
      <button onClick={increment}>Today is {day}</button>
    </div>
  )
}

Button.propTypes = {
  day: PropTypes.string.isRequired,
  increment: PropTypes.func.isRequired,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">const</span> Button = ({
  day,
  increment
}) =&gt; {
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{increment}</span>&gt;</span>Today is {day}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}

Button.propTypes = {
  <span class="hljs-attr">day</span>: PropTypes.string.isRequired,
  <span class="hljs-attr">increment</span>: PropTypes.func.isRequired,
}</code></pre>
<p>这种组件，没有自身的状态，相同的props输入，必然会获得完全相同的组件展示。因为不需要关心组件的一些生命周期函数和渲染的钩子，所以不用继承自Component显得更简洁。</p>
<h1 id="articleHeader5">对比</h1>
<h2 id="articleHeader6">createClass vs Component</h2>
<p>对于<code>React.createClass</code> 和 <code>extends React.Component</code>本质上都是用来创建组件，他们之间并没有绝对的好坏之分，只不过一个是ES5的语法，一个是ES6的语法支持，只不过createClass支持定义<a href="https://facebook.github.io/react/docs/pure-render-mixin.html" rel="nofollow noreferrer" target="_blank">PureRenderMixin</a>,这种写法官方已经不再推荐，而是建议使用PureComponent。</p>
<h2 id="articleHeader7">pureComponent vs Component</h2>
<p>通过上面对PureComponent和Component的介绍，你应该已经了解了二者的区别:<code>PureComponent</code>已经定义好了<code>shouldUpdateComponent</code>而<code>Component</code>需要显示定义。</p>
<h2 id="articleHeader8">Component vs Stateless Functional component</h2>
<ol>
<li><p><code>Component</code>包含内部state，而<code>Stateless Functional Component</code>所有数据都来自props，没有内部state;</p></li>
<li><p><code>Component</code> 包含的一些生命周期函数，<code>Stateless Functional Component</code>都没有，因为<code>Stateless Functional component</code>没有<code>shouldComponentUpdate</code>,所以也无法控制组件的渲染，也即是说只要是收到新的props，<code>Stateless Functional Component</code>就会重新渲染。</p></li>
<li><p><code>Stateless Functional Component</code> <a>不支持Refs</a></p></li>
</ol>
<h1 id="articleHeader9">选哪个？</h1>
<p>这里仅列出一些参考:</p>
<ol>
<li><p><strong>createClass</strong>， 除非你确实对ES6的语法一窍不通，不然的话就不要再使用这种方式定义组件。</p></li>
<li><p><strong>Stateless Functional Component</strong>, 对于不需要内部状态，且用不到生命周期函数的组件，我们可以使用这种方式定义组件，比如展示性的列表组件，可以将列表项定义为Stateless Functional Component。</p></li>
<li><p><strong>PureComponent/Component</strong>，对于拥有内部state，使用生命周期的函数的组件，我们可以使用二者之一，但是大部分情况下，我更推荐使用<strong>PureComponent</strong>，因为它提供了更好的性能，同时强制你使用不可变的对象，保持良好的编程习惯。</p></li>
</ol>
<h1 id="articleHeader10">参考文章</h1>
<p><a href="https://facebook.github.io/react/docs/optimizing-performance.html#shouldcomponentupdate-in-action" rel="nofollow noreferrer" target="_blank">optimizing-performance.html#shouldcomponentupdate-in-action</a><br><a href="http://www.07net01.com/2017/01/1782424.html" rel="nofollow noreferrer" target="_blank">pureComponent介绍</a><br><a href="http://stackoverflow.com/questions/40703675/react-functional-stateless-component-purecomponent-component-what-are-the-dif" rel="nofollow noreferrer" target="_blank">react-functional-stateless-component-purecomponent-component-what-are-the-dif</a><br><a href="https://www.peterbe.com/plog/4-different-kinds-of-react-component-styles" rel="nofollow noreferrer" target="_blank">4 different kinds of React component styles</a><br><a href="https://facebook.github.io/react/docs/react-without-es6.html" rel="nofollow noreferrer" target="_blank">react-without-es6</a><br><a href="https://toddmotto.com/react-create-class-versus-component/" rel="nofollow noreferrer" target="_blank">react-create-class-versus-component</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谈一谈创建React Component的几种方式

## 原文链接
[https://segmentfault.com/a/1190000008402834](https://segmentfault.com/a/1190000008402834)


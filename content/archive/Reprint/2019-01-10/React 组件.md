---
title: 'React 组件' 
date: 2019-01-10 2:30:08
hidden: true
slug: 4if3tvf8yx
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">React 组件</h1>
<p>一个 <code>React</code> 应用就是构建在<code>React组件</code>之上的。</p>
<p>组件有两个核心概念：</p>
<ul>
<li><p><code>props</code></p></li>
<li><p><code>state</code></p></li>
</ul>
<p>一个组件就是通过这两个属性的值在 <code>render</code> 方法里面生成这个组件对应的 <code>HTML</code> 结构。</p>
<blockquote><p><strong>注意：组件生成的 <code>HTML</code> 结构只能有一个单一的根节点。</strong></p></blockquote>
<p><strong>props</strong></p>
<p><code>props</code> 就是组件的属性，由外部通过 <code>JSX</code> 属性传入设置，一旦初始设置完成，就可以认为 <code>this.props</code> 是不可更改的，所以不要轻易更改设置 <code>this.props</code> 里面的值（虽然对于一个 <code>JS</code> 对象你可以做任何事）。</p>
<p><strong>state</strong></p>
<p><code>state</code> 是组件的当前状态，可以把组件简单看成一个<code>“状态机”</code>，根据状态 <code>state</code> 呈现不同的 <code>UI</code> 展示。</p>
<p>一旦状态（数据）更改，组件就会自动调用 <code>render</code> 重新渲染 <code>UI</code>，这个更改的动作会通过 <code>this.setState</code> 方法来触发。</p>
<h2 id="articleHeader1">划分状态数据</h2>
<p>一条原则：让组件尽可能地少状态。</p>
<p>这样组件逻辑就越容易维护。</p>
<blockquote><p>什么样的数据属性可以当作状态？</p></blockquote>
<p>当更改这个状态（数据）需要更新组件 <code>UI</code> 的就可以认为是 <code>state</code>，下面这些可以认为不是状态：</p>
<ul>
<li><p>可计算的数据：比如一个数组的长度</p></li>
<li><p>和 <code>props</code> 重复的数据：除非这个数据是要做变更的</p></li>
</ul>
<h2 id="articleHeader2">无状态组件</h2>
<p>你也可以用纯粹的函数来定义<code>无状态的组件(stateless function)</code>，<code>这种组件没有状态，没有生命周期</code>，只是简单的接受 <code>props</code> 渲染生成 <code>DOM</code> 结构。无状态组件非常简单，开销很低，如果可能的话尽量使用无状态组件。比如使用箭头函数定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HelloMessage = (props) => <div>Hello {props.name}</div>;
render(<HelloMessage name=&quot;Jim&quot;/>, app);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">const HelloMessage = (props) =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello </span><span class="hljs-template-variable">{props.name}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>;
render(<span class="hljs-tag">&lt;<span class="hljs-name">HelloMessage</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"Jim"</span>/&gt;</span>, app);
</span></code></pre>
<p>因为无状态组件<code>只是函数</code>，所以它<code>没有实例返回</code>，这点在想用 <code>refs</code> 获取无状态组件的时候要注意。</p>
<h1 id="articleHeader3">组件生命周期</h1>
<p>一般来说，一个组件类由 <code>extends Component</code> 创建，并且提供一个 <code>render</code> 方法以及其他<code>可选的生命周期函数</code>、<code>组件相关的事件或方法</code>来定义。</p>
<p><strong>getInitialState</strong></p>
<p>初始化 <code>this.state</code> 的值，只在组件装载之前调用一次。</p>
<p>如果是使用 <code>ES6</code> 的语法，你也可以<code>在构造函数中初始化状态</code>，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {count: props.initialCount};
    }

    render() {
        
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {count: props.initialCount};
    }

    render() {
        
    }
}
</code></pre>
<h2 id="articleHeader4">getDefaultProps</h2>
<p>只在组件<code>创建时调用一次并缓存返回的对象</code>（即在 <code>React.createClass</code> 之后就会调用）。</p>
<p>因为这个方法在实例初始化之前调用，所以在这个方法里面不能依赖 <code>this</code> 获取到这个组件的实例。</p>
<p>在组件装载之后，这个方法缓存的结果会用来保证访问 <code>this.props</code> 的属性时，当这个属性没有在父组件中传入（在这个组件的 <code>JSX</code> 属性里设置），也总是有值的。</p>
<p>如果是使用 <code>ES6</code> 语法，可以直接定义 <code>defaultProps</code> 这个类属性来替代，这样能更直观的知道 <code>default props</code> 是预先定义好的对象值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Counter.defaultProps = {initialCount: 0};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">Counter.defaultProps = </span><span class="hljs-template-variable">{initialCount: 0}</span><span class="xml">;
</span></code></pre>
<p><strong>render</strong></p>
<p>组装生成这个组件的 <code>HTML</code> 结构（使用原生 <code>HTML</code> 标签或者子组件），也可以返回 <code>null</code> 或者 <code>false</code>，这时候 <code>ReactDOM.findDOMNode(this)</code> 会返回 <code>null</code>。</p>
<h1 id="articleHeader5">生命周期函数</h1>
<h2 id="articleHeader6">装载组件触发</h2>
<p><strong>componentWillMount</strong></p>
<p>只会在装载之前调用一次，在 <code>render</code> 之前调用，你可以在这个方法里面调用 <code>setState</code> 改变状态，并且不会导致额外调用一次 <code>render</code>。</p>
<p><strong>componentDidMount</strong></p>
<p>只会在装载完成之后调用一次，在 <code>render</code> 之后调用，从这里开始可以通过 <code>ReactDOM.findDOMNode(this)</code> 获取到组件的 <code>DOM</code> 节点。</p>
<h2 id="articleHeader7">更新组件触发</h2>
<p>这些方法不会在首次 <code>render</code> 组件的周期调用</p>
<ul>
<li><p><code>componentWillReceiveProps</code></p></li>
<li><p><code>shouldComponentUpdate</code></p></li>
<li><p><code>componentWillUpdate</code></p></li>
<li><p><code>componentDidUpdate</code></p></li>
</ul>
<h2 id="articleHeader8">卸载组件触发</h2>
<ul><li><p><code>componentWillUnmount</code></p></li></ul>
<h1 id="articleHeader9">事件处理</h1>
<p>可以看到 <code>React</code> 里面绑定事件的方式和在 <code>HTML</code> 中绑定事件类似，使用驼峰式命名指定要绑定的 <code>onClick</code> 属性为组件定义的一个方法 <code>{this.handleClick.bind(this)}</code>。</p>
<p>注意要显式调用 <code>bind(this)</code> <code>将事件函数上下文绑定要组件实例上</code>，这也是 <code>React</code> 推崇的原则：没有黑科技，尽量使用显式的容易理解的 <code>JavaScript</code> 代码。</p>
<h2 id="articleHeader10">“合成事件”和“原生事件”</h2>
<p><code>React</code> 实现了一个“合成事件”层（<code>synthetic event system</code>），这个事件模型保证了和 <strong>W3C</strong> 标准保持一致，所以不用担心有什么诡异的用法，并且这个事件层消除了 <strong>IE</strong> 与 <strong>W3C</strong> 标准实现之间的兼容问题。</p>
<p><strong>“合成事件”还提供了额外的好处：</strong></p>
<p><strong>事件委托</strong></p>
<p>“合成事件”会以<code>事件委托</code>（<code>event delegation</code>）的方式绑定到<code>组件最上层</code>，并且在<code>组件卸载</code>（<code>unmount</code>）的时候<code>自动销毁绑定的事件</code>。</p>
<p><strong>什么是“原生事件”？</strong></p>
<p>比如你在 <code>componentDidMount</code> 方法里面通过 <code>addEventListener</code> 绑定的事件就是浏览器原生事件。</p>
<p>使用原生事件的时候注意在 <code>componentWillUnmount</code> 解除绑定 <code>removeEventListener</code>。</p>
<p>所有通过 <code>JSX</code> 这种方式绑定的事件都是绑定到“合成事件”，除非你有特别的理由，建议总是用 <code>React</code> 的方式处理事件。</p>
<p><strong>Tips</strong></p>
<p>如果混用“合成事件”和“原生事件”，比如一种常见的场景是用原生事件在 <code>document</code> 上绑定，然后在组件里面绑定的合成事件想要通过 <code>e.stopPropagation()</code> 来阻止事件冒泡到 <code>document</code>，这时候是行不通的，参见 <a href="https://stackoverflow.com/questions/24415631/reactjs-syntheticevent-stoppropagation-only-works-with-react-events/24421834#24421834" rel="nofollow noreferrer" target="_blank">Event delegation</a>，因为 <code>e.stopPropagation</code> 是内部“合成事件” 层面的，解决方法是要用 <code>e.nativeEvent.stopImmediatePropagation()</code></p>
<p>“合成事件” 的 <code>event</code> 对象只在当前 <code>event loop</code> 有效，比如你想在事件里面调用一个 <code>promise</code>，在 <code>resolve</code> 之后去拿 <code>event</code> 对象会拿不到（并且没有错误抛出）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleClick(e) {
  promise.then(() => doSomethingWith(e));
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>handleClick(e) {
  promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> doSomethingWith(e));
}
</code></pre>
<h2 id="articleHeader11">参数传递</h2>
<p>给事件处理函数传递额外参数的方式：<code>bind(this, arg1, arg2, ...)</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render: function() {
    return <p onClick={this.handleClick.bind(this, 'extra param')}>;
},
handleClick: function(param, event) {
    // handle click
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>render: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> &lt;p onClick={<span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>, <span class="hljs-string">'extra param'</span>)}&gt;;
},
handleClick: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(param, event)</span> </span>{
    <span class="hljs-comment">// handle click</span>
}
</code></pre>
<h1 id="articleHeader12">DOM 操作</h1>
<p>大部分情况下你不需要通过查询 <code>DOM</code> 元素去更新组件的 <code>UI</code>，你只要关注设置组件的状态（<code>setState</code>）。但是可能在某些情况下你确实需要直接操作 <code>DOM</code>。</p>
<p>首先我们要了解 <code>ReactDOM.render</code> 组件返回的是什么？</p>
<p>它会返回<code>对组件的引用</code>也就是<code>组件实例</code>（对于<code>无状态状态组件</code>来说返回 <code>null</code>），注意 <code>JSX</code> 返回的不是组件实例，它只是一个 <code>ReactElement</code> 对象（还记得我们用纯 <code>JS</code> 来构建 <code>JSX</code> 的方式吗），比如这种：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// A ReactElement
const myComponent = <MyComponent />

// render
const myComponentInstance = ReactDOM.render(myComponent, mountNode);
myComponentInstance.doSomething();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// A ReactElement</span>
<span class="hljs-keyword">const</span> myComponent = &lt;MyComponent /&gt;

<span class="hljs-comment">// render</span>
<span class="hljs-keyword">const</span> myComponentInstance = ReactDOM.render(myComponent, mountNode);
myComponentInstance.doSomething();
</code></pre>
<p><strong>findDOMNode()</strong></p>
<p>当组件加载到页面上之后（<code>mounted</code>），你都可以通过 <code>react-dom</code> 提供的 <code>findDOMNode()</code> 方法拿到组件对应的 <code>DOM</code> 元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { findDOMNode } from 'react-dom';

// Inside Component class
componentDidMound() {
  const el = findDOMNode(this);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { findDOMNode } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-regexp">//</span> Inside Component <span class="hljs-class"><span class="hljs-keyword">class</span></span>
componentDidMound() {
  const el = findDOMNode(<span class="hljs-keyword">this</span>);
}
</code></pre>
<p><code>findDOMNode()</code> 不能用在无状态组件上。</p>
<p><strong>Refs</strong></p>
<p>另外一种方式就是通过在要引用的 <code>DOM</code> 元素上面设置一个 <code>ref</code> 属性指定一个名称，然后通过 <code>this.refs.name</code> 来访问对应的 <code>DOM</code> 元素。</p>
<p>比如有一种情况是必须<code>直接操作 DOM</code> 来实现的，你希望一个 <code>&lt;input/&gt;</code> 元素在你清空它的值时 <code>focus</code>，你没法仅仅靠 <code>state</code> 来实现这个功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
  constructor() {
    return { userInput: '' };
  }

  handleChange(e) {
    this.setState({ userInput: e.target.value });
  }

  clearAndFocusInput() {
    this.setState({ userInput: '' }, () => {
      this.refs.theInput.focus();
    });
  }

  render() {
    return (
      <div>
        <div onClick={this.clearAndFocusInput.bind(this)}>
          Click to Focus and Reset
        </div>
        <input
          ref=&quot;theInput&quot;
          value={this.state.userInput}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-title">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">return</span> { userInput: <span class="hljs-string">''</span> };
  }

  handleChange(e) {
    <span class="hljs-keyword">this</span>.setState({ userInput: e.target.value });
  }

  clearAndFocusInput() {
    <span class="hljs-keyword">this</span>.setState({ userInput: <span class="hljs-string">''</span> }, () =&gt; {
      <span class="hljs-keyword">this</span>.refs.theInput.focus();
    });
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;div onClick={<span class="hljs-keyword">this</span>.clearAndFocusInput.bind(<span class="hljs-keyword">this</span>)}&gt;
          Click to Focus and Reset
        &lt;/div&gt;
        &lt;input
          ref=<span class="hljs-string">"theInput"</span>
          value={<span class="hljs-keyword">this</span>.state.userInput}
          onChange={<span class="hljs-keyword">this</span>.handleChange.bind(<span class="hljs-keyword">this</span>)}
        /&gt;
      &lt;/div&gt;
    );
  }
}
</code></pre>
<p>如果 <code>ref</code> 是设置在原生 <code>HTML</code> 元素上，它拿到的就是 <code>DOM</code> 元素，如果设置在自定义组件上，它拿到的就是组件实例，这时候就需要通过 <code>findDOMNode</code> 来拿到组件的 <code>DOM</code> 元素。</p>
<p>因为无状态组件没有实例，所以 <code>ref</code> 不能设置在无状态组件上，一般来说这没什么问题，因为无状态组件没有实例方法，不需要 <code>ref</code> 去拿实例调用相关的方法，但是如果想要拿无状态组件的 <code>DOM</code> 元素的时候，就需要用一个状态组件封装一层，然后通过 <code>ref</code> 和 <code>findDOMNode</code> 去获取。</p>
<p><strong>总结</strong></p>
<ul>
<li><p>你可以使用 <code>ref</code> 到的组件定义的任何公共方法，比如 <code>this.refs.myTypeahead.reset()</code></p></li>
<li><p><code>Refs</code> 是访问到组件内部 <code>DOM</code> 节点唯一<strong>可靠</strong>的方法</p></li>
</ul>
<p><strong>注意事项</strong></p>
<ul>
<li><p>不要在 <code>render</code> 或者 <code>render 之前</code>访问 <code>refs</code></p></li>
<li><p>不要滥用 <code>refs</code>，比如只是用它来按照传统的方式操作界面 <code>UI</code>：找到 <code>DOM</code> -&gt; 更新 <code>DOM</code></p></li>
</ul>
<h1 id="articleHeader13">组合组件</h1>
<p>使用组件的目的就是通过构建模块化的组件，相互组合组件最后组装成一个复杂的应用。</p>
<p>在 <code>React</code> 组件中要包含其他组件作为子组件，只需要把组件当作一个 <code>DOM</code> 元素引入就可以了。</p>
<h2 id="articleHeader14">循环插入子元素</h2>
<p>如果组件中包含通过循环插入的子元素，为了保证重新渲染 <code>UI</code> 的时候能够正确显示这些子元素，每个元素都需要通过一个特殊的 <code>key</code> 属性指定一个唯一值。</p>
<p><code>key</code> 必须直接在循环中设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const MyComponent = (props) => {
    return (
        <ul>
            {props.results.map((result) => {
                return <ListItemWrapper key={result.id} data={result}/>;
            })}
        </ul>
    );
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> MyComponent = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            {props.results.map((result) =&gt; {
                return <span class="hljs-tag">&lt;<span class="hljs-name">ListItemWrapper</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{result.id}</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{result}/</span>&gt;</span>;
            })}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    );
};
</span></code></pre>
<p>你也可以用一个 <code>key</code> 值作为属性，子元素作为属性值的对象字面量来显示子元素列表。</p>
<p>实际上浏览器在遍历一个字面量对象的时候会保持顺序一致，除非存在属性值可以被转换成整数值，这种属性值会排序并放在其他属性之前被遍历到，所以为了防止这种情况发生，可以在构建这个字面量的时候在 <code>key</code> 值前面加字符串前缀。</p>
<p><code>HTML</code> 元素会作为 <code>React</code> 组件对象、<code>JS</code> 表达式结果是一个文字节点，都会存入 <code>Parent</code> 组件的 <code>props.children</code>。</p>
<p>一般来说，可以直接将这个属性作为父组件的子元素 <code>render</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Parent = (props) => <div>{props.children}</div>;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const Parent = <span class="hljs-function"><span class="hljs-params">(props)</span> =&gt;</span> &lt;div&gt;{props.children}&lt;/div&gt;;
</code></pre>
<p><code>props.children</code> 通常是一个组件对象的数组，但是当只有一个子元素的时候，<code>props.children</code> 将是这个唯一的子元素，而不是数组了。</p>
<p><code>React.Children</code> 提供了额外的方法方便操作这个属性。</p>
<h1 id="articleHeader15">组件间通信</h1>
<h2 id="articleHeader16">父子组件间通信</h2>
<p>这种情况下很简单，就是通过 <code>props</code> 属性传递，在父组件给子组件设置 <code>props</code>，然后子组件就可以通过 <code>props</code> 访问到父组件的数据／方法，这样就搭建起了父子组件间通信的桥梁。</p>
<p><code>div</code> 可以看作一个子组件，指定它的 <code>onClick</code> 事件调用父组件的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';
import {render} from 'react-dom';

class GroceryList extends Component {
    handleClick(i) {
        console.log('You clicked: ' + this.props.items[i]);
    }

    render() {
        return (
            <ul>
                {this.props.items.map((item, i) => {
                    return (
                        <li onClick={this.handleClick.bind(this, i)} key={i}>{item}</li>
                    )
                })}
            </ul>
        )
    }
}
render(
    <GroceryList items={['Apple', 'Banana', 'Cranberry']}/>,
    mountNode
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, {<span class="hljs-type">Component</span>} from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> {render} from <span class="hljs-symbol">'react</span>-dom';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">GroceryList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    handleClick(i) {
        console.log(<span class="hljs-symbol">'You</span> clicked: ' + <span class="hljs-keyword">this</span>.props.items[i]);
    }

    render() {
        <span class="hljs-keyword">return</span> (
            &lt;ul&gt;
                {<span class="hljs-keyword">this</span>.props.items.map((item, i) =&gt; {
                    <span class="hljs-keyword">return</span> (
                        &lt;li onClick={<span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>, i)} key={i}&gt;{item}&lt;/li&gt;
                    )
                })}
            &lt;/ul&gt;
        )
    }
}
render(
    &lt;<span class="hljs-type">GroceryList</span> items={[<span class="hljs-symbol">'Appl</span>e', <span class="hljs-symbol">'Banan</span>a', <span class="hljs-symbol">'Cranberr</span>y']}/&gt;,
    mountNode
);
</code></pre>
<p><code>div</code> 可以看作一个子组件，指定它的 <code>onClick</code> 事件调用父组件的方法。</p>
<h2 id="articleHeader17">非父子组件间的通信</h2>
<p>使用<code>全局事件 Pub/Sub 模式</code>，在 <code>componentDidMount</code> 里面<code>订阅事件</code>，在 <code>componentWillUnmount</code> 里面<code>取消订阅</code>，当收到事件触发的时候调用 <code>setState</code> 更新 <code>UI</code>。</p>
<p>这种模式在复杂的系统里面可能会变得难以维护，所以看个人权衡是否将组件封装到大的组件，甚至整个页面或者应用就封装到一个组件。</p>
<p>一般来说，对于比较复杂的应用，推荐使用类似 <code>Flux</code> 这种单项数据流架构。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 组件

## 原文链接
[https://segmentfault.com/a/1190000010020334](https://segmentfault.com/a/1190000010020334)


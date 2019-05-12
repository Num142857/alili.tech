---
title: 'React 进阶设计与控制权问题' 
date: 2019-01-03 2:30:11
hidden: true
slug: g6uxhl9lurc
categories: [reprint]
---

{{< raw >}}

                    
<p>控制权——这个概念在编程中至关重要。比如，“轮子”封装层与业务消费层对于控制权的“争夺”，就是一个很有意思的话题。这在 React 世界里也不例外。表面上看，我们当然希望“轮子”掌控的事情越多越好：<strong>因为抽象层处理的逻辑越多，业务调用时关心的事情就越少，使用就越方便。可是有些设计却“不敢越雷池一步”。“轮子”与业务在控制权上的拉锯，就非常有意思了。</strong></p>
<p>同时，控制能力与组件设计也息息相关：Atomic components 这样的原子组件设计被受推崇；在原子组件这个概念之上，还有分子组件：Molecules components。不管是分子还是原子，在解决业务问题上都有存在的理由。</p>
<p><strong>这篇文章将以 React 框架为背景，谈谈我在开发当中对于控制权的一些想法和总结。如果你并不使用 React，原则上仍不妨碍阅读。</strong></p>
<hr>
<p>在文章开始之前，我想先向大家介绍一本书。</p>
<p>从去年起，我和知名技术大佬<a href="https://www.zhihu.com/people/yanhaijing/activities" rel="nofollow noreferrer" target="_blank">颜海镜</a>开始了合著之旅，今年我们共同打磨的书籍<strong>《React 状态管理与同构实战》</strong>终于正式出版了！这本书以 React 技术栈为核心，在介绍 React 用法的基础上，从源码层面分析了 Redux 思想，同时着重介绍了服务端渲染和同构应用的架构模式。书中包含许多项目实例，不仅为用户打开了 React 技术栈的大门，更能提升读者对前沿领域的整体认知。</p>
<p>如果各位对图书内容或接下来的内容感兴趣，还望多多支持！<strong>文末有详情，不要走开！</strong></p>
<hr>
<h2 id="articleHeader0">从受控与非受控组件说起</h2>
<p>初入 React 大门，关于控制权概念，我们最先接触到的就是受控组件与非受控组件。这两个概念往往与表单关联在一起。在大部分情况下，推荐使用受控组件来实现表单、输入框等状态控制。在受控组件中，表单等数据都由 React 组件自己处理。而非受控组件，是指表单的数据由 Dom 自己控制。下面就是一个典型的非受控组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form>
  <label>
    Name:
    <input type=&quot;text&quot; name=&quot;name&quot; />
  </label>
  <input type=&quot;submit&quot; value=&quot;Submit&quot; />
</form>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;<span class="hljs-keyword">form</span>&gt;
  &lt;<span class="hljs-keyword">label</span>&gt;
    Name:
    &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"text"</span> name=<span class="hljs-string">"name"</span> /&gt;
  &lt;/<span class="hljs-keyword">label</span>&gt;
  &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"submit"</span> value=<span class="hljs-string">"Submit"</span> /&gt;
&lt;/<span class="hljs-keyword">form</span>&gt;
</code></pre>
<p>对于 React 来说，非受控组件的状态和用户输入都无法直接掌控，只能依赖 form 标签的原生能力进行交互。如果使上例非受控组件变为一个受控组件，代码也很简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class NameForm extends React.Component {
  state= {value: ''}

  handleChange = event => {
    this.setState({value: event.target.value});
  }

  handleSubmit = event => {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type=&quot;text&quot; value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type=&quot;submit&quot; value=&quot;Submit&quot; />
      </form>
    )
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">NameForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state= {value: ''}

  handleChange = event =&gt; {
    <span class="hljs-keyword">this</span>.setState({value: event.target.value});
  }

  handleSubmit = event =&gt; {
    alert(<span class="hljs-symbol">'A</span> name was submitted: ' + <span class="hljs-keyword">this</span>.state.value);
    event.preventDefault();
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;form onSubmit={<span class="hljs-keyword">this</span>.handleSubmit}&gt;
        &lt;label&gt;
          <span class="hljs-type">Name</span>:
          &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> value={<span class="hljs-keyword">this</span>.state.value} onChange={<span class="hljs-keyword">this</span>.handleChange} /&gt;
        &lt;/label&gt;
        &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"submit"</span> value=<span class="hljs-string">"Submit"</span> /&gt;
      &lt;/form&gt;
    )
  }
}
</code></pre>
<p>这时候表单值和行为都由 React 组件控制，使得开发更加便利。</p>
<p><strong>这当然是很基础的概念，借此抛出控制权的话题，请读者继续阅读。</strong></p>
<h2 id="articleHeader1">UI “轮子”与 Control Props 模式</h2>
<p>前文介绍的样例，我称之为“<strong>狭义</strong>受控和非受控”组件。<strong>广义来说，我认为完全的非受控组件是指：不含有内部 states，只接受 props 的函数式组件或无状态组件</strong>。它的渲染行为完全由外部传入的 props 控制，没有自身的“自治权”。这样的组件在很好地实现了复用性，且具有良好的测试性。</p>
<p>但在 UI “轮子”设计当中，<strong>“半自治”或者“不完全受控”</strong>组件，有时也会是一个更好的选择。我们将此称之为 “control props” 模式。简单来说就是：<strong>组件具有自身 state，当没有相关 porps 传入时，使用自身状态 statea 完成渲染和交互逻辑；当该组件被调用时，如果有相关 props 传入，那么将会交出控制权，由业务消费层面控制其行为。</strong></p>
<p>在研究大量社区 UI “轮子” 之后，我发现由 Kent C. Dodds 编写的，在 paypal 使用的组件库 <a href="https://github.com/paypal/downshift" rel="nofollow noreferrer" target="_blank">downshift</a> 便广泛采用了这样的模式。</p>
<p>简单用一个 Toogle 组件举例，这个组件由业务方调用时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Example extends React.Component {
  state = {on: false, inputValue: 'off'}
  handleToggle = on => {
    this.setState({on, inputValue: on ? 'on' : 'off'})
  }
  handleChange = ({target: {value"}}") => {
    if (value === 'on') {
      this.setState({on: true})
    } else if (value === 'off') {
      this.setState({on: false})
    }
    this.setState({inputValue: value})
  }
  render() {
    const {on} = this.state
    return (
      <div>
        <input
          value={this.state.inputValue}
          onChange={this.handleChange}
        />
        <Toggle on={on} onToggle={this.handleToggle} />
      </div>
    )
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Example</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> {</span>
  state = {on: <span class="hljs-literal">false</span>, inputValue: <span class="hljs-string">'off'</span>}
  handleToggle = <span class="hljs-literal">on</span> =&gt; {
    <span class="hljs-keyword">this</span>.setState({<span class="hljs-literal">on</span>, inputValue: <span class="hljs-literal">on</span> ? <span class="hljs-string">'on'</span> : <span class="hljs-string">'off'</span>})
  }
<span class="hljs-function">  <span class="hljs-title">handleChange</span> = <span class="hljs-params">({target: {value"}}")</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (value === <span class="hljs-string">'on'</span>) {
      <span class="hljs-keyword">this</span>.setState({on: <span class="hljs-literal">true</span>})
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (value === <span class="hljs-string">'off'</span>) {
      <span class="hljs-keyword">this</span>.setState({on: <span class="hljs-literal">false</span>})
    }
    <span class="hljs-keyword">this</span>.setState({inputValue: value})
  }
  render() {
    const {<span class="hljs-literal">on</span>} = <span class="hljs-keyword">this</span>.state
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;input
          value={<span class="hljs-keyword">this</span>.state.inputValue}
          onChange={<span class="hljs-keyword">this</span>.handleChange}
        /&gt;
        &lt;Toggle <span class="hljs-literal">on</span>={<span class="hljs-literal">on</span>} onToggle={<span class="hljs-keyword">this</span>.handleToggle} /&gt;
      &lt;/div&gt;
    )
  }
}
</code></pre>
<p>效果如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016374193?w=552&amp;h=458" src="https://static.alili.tech/img/remote/1460000016374193?w=552&amp;h=458" alt="Toggle 效果" title="Toggle 效果" style="cursor: pointer;"></span></p>
<p>我们可以通过输入框来控制 Toggle 组件状态切换（输入 “on“ 激活状态，输入 ”off“ 状态置灰），同时也可以通过鼠标来点击切换，此时输入框内容也会相应变化。</p>
<p>请思考：对于 UI 组件 Toggle 来说，它的状态可以由业务调用方来控制其状态，这就赋予了使用层面上的消费便利。在业务代码中，不管是 Input 还是其他任何组件都可以控制其状态，调用时我们具有完全的控制权掌控能力。</p>
<p>同时，如果在调用 Toggle 组件时，不去传 props 值，该组件仍然可以正常发挥。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <Toggle>
    {({on, getTogglerProps}) => (
      <div>
        <button {...getTogglerProps()}>Toggle me</button>
        <div>{on ? 'Toggled On' : 'Toggled Off'}</div>
      </div>
    )}
  </Toggle>
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">  <span class="hljs-tag">&lt;<span class="hljs-name">Toggle</span>&gt;</span>
    </span><span class="hljs-template-variable">{({on, getTogglerProps}</span><span class="xml">) =&gt; (
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> </span></span><span class="hljs-template-variable">{...getTogglerProps()}</span><span class="xml"><span class="hljs-tag">&gt;</span>Toggle me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">{on ? 'Toggled On' : 'Toggled Off'}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )}
  <span class="hljs-tag">&lt;/<span class="hljs-name">Toggle</span>&gt;</span>
  </span></code></pre>
<p>Toggle 组件在状态切换时，自己维护内部状态，实现切换效果，同时通过 render prop 模式，对外输出本组件的状态信息。</p>
<p>我们看 Toggle 源码（部分环节已删减）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const callAll = (...fns) => (...args) => fns.forEach(fn => fn &amp;&amp; fn(...args))

class Toggle extends Component {
  static defaultProps = {
    defaultOn: false,
    onToggle: () => {},
  }
  state = {
    on: this.getOn({on: this.props.defaultOn}),
  }
  getOn(state = this.state) {
    return this.isOnControlled() ? this.props.on : state.on
  }
  isOnControlled() {
    return this.props.on !== undefined
  }
  getTogglerStateAndHelpers() {
    return {
      on: this.getOn(),
      setOn: this.setOn,
      setOff: this.setOff,
      toggle: this.toggle,
    }
  }
  setOnState = (state = !this.getOn()) => {
    if (this.isOnControlled()) {
      this.props.onToggle(state, this.getTogglerStateAndHelpers())
    } else {
      this.setState({on: state}, () => {
        this.props.onToggle(
          this.getOn(),
          this.getTogglerStateAndHelpers()
        )
      })
    }
  }
  setOn = this.setOnState.bind(this, true)
  setOff = this.setOnState.bind(this, false)
  toggle = this.setOnState.bind(this, undefined)
  render() {
    const renderProp = unwrapArray(this.props.children)
    return renderProp(this.getTogglerStateAndHelpers())
  }
}

function unwrapArray(arg) {
  return Array.isArray(arg) ? arg[0] : arg
}
export default Toggle
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>const callAll = (...fns) =&gt; (...args) =&gt; fns.forEach(fn =&gt; fn &amp;&amp; fn(...args))

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Toggle</span> <span class="hljs-title">extends</span> <span class="hljs-title">Component</span> </span>{
  static defaultProps = {
    defaultOn: <span class="hljs-literal">false</span>,
    onToggle: () =&gt; {},
  }
  state = {
    on: <span class="hljs-keyword">this</span>.getOn({on: <span class="hljs-keyword">this</span>.props.defaultOn}),
  }
  getOn(state = <span class="hljs-keyword">this</span>.state) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.isOnControlled() ? <span class="hljs-keyword">this</span>.props.on : state.on
  }
  isOnControlled() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.on !== undefined
  }
  getTogglerStateAndHelpers() {
    <span class="hljs-keyword">return</span> {
      on: <span class="hljs-keyword">this</span>.getOn(),
      setOn: <span class="hljs-keyword">this</span>.setOn,
      setOff: <span class="hljs-keyword">this</span>.setOff,
      toggle: <span class="hljs-keyword">this</span>.toggle,
    }
  }
  setOnState = (state = !<span class="hljs-keyword">this</span>.getOn()) =&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isOnControlled()) {
      <span class="hljs-keyword">this</span>.props.onToggle(state, <span class="hljs-keyword">this</span>.getTogglerStateAndHelpers())
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.setState({on: state}, () =&gt; {
        <span class="hljs-keyword">this</span>.props.onToggle(
          <span class="hljs-keyword">this</span>.getOn(),
          <span class="hljs-keyword">this</span>.getTogglerStateAndHelpers()
        )
      })
    }
  }
  setOn = <span class="hljs-keyword">this</span>.setOnState.bind(<span class="hljs-keyword">this</span>, <span class="hljs-literal">true</span>)
  setOff = <span class="hljs-keyword">this</span>.setOnState.bind(<span class="hljs-keyword">this</span>, <span class="hljs-literal">false</span>)
  toggle = <span class="hljs-keyword">this</span>.setOnState.bind(<span class="hljs-keyword">this</span>, undefined)
  render() {
    const renderProp = unwrapArray(<span class="hljs-keyword">this</span>.props.children)
    <span class="hljs-keyword">return</span> renderProp(<span class="hljs-keyword">this</span>.getTogglerStateAndHelpers())
  }
}

function unwrapArray(arg) {
  <span class="hljs-keyword">return</span> Array.isArray(arg) ? arg[<span class="hljs-number">0</span>] : arg
}
export <span class="hljs-keyword">default</span> Toggle
</code></pre>
<p>关键的地方在于组件内 isOnControlled 方法判断是否有命名为 on 的属性传入：如果有，则使用 this.props.on 作为本组件状态，反之用自身 this.state.on 来管理状态。同时在 render 方法中，<strong>使用了 render prop 模式，关于这个模式本文不再探讨，感兴趣的读者可以在社区中找到很多资料，同时也可以在我新书中找到相关内容。</strong></p>
<p>盘点一下，control props 模式反应了典型的控制权问题。这样的<strong>“半自治”</strong>能够完美适应业务需求，在组件设计上也更加灵活有效。</p>
<h2 id="articleHeader2">Redux 异步状态管理与控制权</h2>
<p>提到控制权话题，怎能少得了 Redux 这样的状态管理工具。<strong>Redux 的设计在方方面面都体现出来良好的控制权处理</strong>，这里我们把注意力集中在<strong>异步状态</strong>上，更多的内容还请读者关注我的新书。</p>
<p>Redux 处理异步，最为人熟知的就是 Redux-thunk 这样的中间件，它由 Dan 亲自编写，并在 Redux 官方文档上被安利。<strong>它与其他所有中间件一样，将 action 到 reducer 中间的过程进行掌控，使得业务使用时可以直接 dispatch 一个函数类型的 action</strong>，实现代码也很简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();

export default thunk;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createThunkMiddleware</span>(<span class="hljs-params">extraArgument</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">{ dispatch, getState }</span>) =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action === <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">return</span> action(dispatch, getState, extraArgument);
    }

    <span class="hljs-keyword">return</span> next(action);
  };
}

<span class="hljs-keyword">const</span> thunk = createThunkMiddleware();

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> thunk;
</code></pre>
<p>但是很快就有人认为，这样的方案因为在中间件实现中的控制不足，导致了业务代码不够精简。我们还是需要遵循传统的 Redux 步骤：八股文似的编写 action，action creactor，reducer......于是，<strong>控制粒度更大的中间件方案应运而生</strong>。</p>
<p>Redux-promise 中间件控制了 action type，它限制业务方在 dispatch 异步 action 时，action的 payload 属性需要是一个 Promise 对象时，执行 resolve，该中间件触发一个类型相同的 action，并将 payload 设置为 promise 的 value，并设 action.status 属性为 "success"。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action) ? action.then(dispatch) : next(action);
    }

    return isPromise(action.payload)
      ? action.payload
          .then(result => dispatch({ ...action, payload: result }))
          .catch(error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          })
      : next(action);
  };
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>export <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span></span> promiseMiddleware({ dispatch }) {
  <span class="hljs-keyword">return</span> next =&gt; <span class="hljs-keyword">action</span> =&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-comment">!isFSA(action)) {</span>
      <span class="hljs-keyword">return</span> isPromise(<span class="hljs-keyword">action</span>) ? <span class="hljs-keyword">action</span>.<span class="hljs-keyword">then</span>(dispatch) : next(<span class="hljs-keyword">action</span>);
    }

    <span class="hljs-keyword">return</span> isPromise(<span class="hljs-keyword">action</span>.payload)
      ? <span class="hljs-keyword">action</span>.payload
          .<span class="hljs-keyword">then</span>(result =&gt; dispatch({ ...<span class="hljs-keyword">action</span>, payload: result }))
          .catch(error =&gt; {
            dispatch({ ...<span class="hljs-keyword">action</span>, payload: error, error: true });
            <span class="hljs-keyword">return</span> Promise.reject(error);
          })
      : next(<span class="hljs-keyword">action</span>);
  };
}
</code></pre>
<p>这样的设计与 Redux-thunk 完全不同，<strong>它将 thunk 过程控制在中间件自身中</strong>，这样一来，第三方轮子做的事情更多，因此在业务调用时更加简练方便。我们只需要正常编写 action 即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch({
    type: GET_USER,
    payload: http.getUser(userId) // payload 为 promise 对象
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">dispatch</span>({
    <span class="hljs-attribute">type</span>: GET_USER,
    payload: http.<span class="hljs-built_in">getUser</span>(userId) // payload 为 promise 对象
})
</code></pre>
<p>我们对比一下 Redux-thunk，相对于“轮子”控制权较弱，业务方控制权更多的 Redux-thunk，实现上述三行代码，就得不得不需要：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch(
    function(dispatch, getState) {
        dispatch({
            type: GET_USERE, 
            payload: userId
        })
        http.getUser(id)
            .then(response => {
                dispatch({
                    type: GET_USER_SUCCESS,
                    payload: response
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_DATA_FAILED,
                    payload: error
                })
            }) 
    }
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>dispatch(
    <span class="hljs-name">function</span>(<span class="hljs-name">dispatch</span>, getState) {
        dispatch({
            type: GET_USERE, 
            payload: userId
        })
        http.getUser(<span class="hljs-name">id</span>)
            .then(<span class="hljs-name">response</span> =&gt; {
                dispatch({
                    type: GET_USER_SUCCESS,
                    payload: response
                })
            })
            .catch(<span class="hljs-name">error</span> =&gt; {
                dispatch({
                    type: GET_DATA_FAILED,
                    payload: error
                })
            }) 
    }
)
</code></pre>
<p><strong>当然，Redux-promise 控制权越多，一方面带来了简练，但是另一方面，业务控制权越弱，也丧失了一定的自主性</strong>。比如如果想实现乐观更新（Optimistic updates），那就很难做了。具体详见 <a href="https://github.com/redux-utilities/flux-standard-action/issues/7" rel="nofollow noreferrer" target="_blank">Issue #7</a> </p>
<p><strong>为了平衡这个矛盾，在 Redux-thunk 和 Redux-promise 这两个极端控制权理念的中间件之间，于是便存在了中间状态的中间件：Redux-promise-middleware</strong>，它与 Redux-thunk 类似，掌控粒度也类似，但是在 action 处理上更加温和和渐进，它会在适当的时机 dispatch XXX_PENDING、XXX_FULFILLED 、XXX_REJECTED 三种类型的 action，<strong>也就是说这个中间件在掌控更多逻辑的基础上，增加了和外界第三方的通信程度，不再是直接高冷地触发 XXX_FULFILLED 、XXX_REJECTED，请读者仔细体会其中不同</strong>。</p>
<h2 id="articleHeader3">状态管理中的控制主义和极简主义</h2>
<p>了解了异步状态中的控制权问题，我们再从 Redux 全局角度进行分析。在内部分享时，我将<strong>基于 Redux 封装的状态管理类库共同特性</strong>总结为这一页 slide:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016374194" src="https://static.alili.tech/img/remote/1460000016374194" alt="slide" title="slide" style="cursor: pointer;"></span></p>
<p><strong>以上四点都是相关类库基于 Redux 所进行的简化</strong>，其中非常有意思的就是后面三点，<strong>它们无一例外地与控制权相关</strong>。以 Rematch 为代表，它不再是处理 action 到 reducer 的中间件，而是完全控制了 action creator，reducer 以及联通过程。</p>
<p><strong>具体来看</strong>：</p>
<ul>
<li>业务方不再需要显示申明 action type，它由类库直接函数名直接生成，如果 reducer 命名为 increment，那么 action.type 就是 increment；</li>
<li>同时控制 reducer 和 action creator 合二为一，态管理从未变得如此简单、高效。</li>
</ul>
<p>我把这样的实践称为控制主义或者极简主义，相比 Redux-actions 这样的状态管理类库，这样的做法更加彻底、完善。具体思想可参考 Shawn McKay 的<a href="https://hackernoon.com/redesigning-redux-b2baee8b8a38" rel="nofollow noreferrer" target="_blank">文章</a>，介绍的比较充分，这里我不再赘述。</p>
<h2 id="articleHeader4">总结：码农和控制权</h2>
<p>控制权说到底是一种设计思想，是第三方类库和业务消费的交锋和碰撞。它与语言和框架无关，本文只是以 React 举例，实际上在编程领域控制权的争夺随处可见；他与抽象类别无关，本文已经在 UI 抽象和状态抽象中分别例举分析；控制权与码农息息相关，它直接决定了我们的编程体验和开发效率。</p>
<p>可是在编程的初期阶段，优秀的控制权设计难以一蹴而就。只有投身到一线开发当中，真正了解自身业务需求，进而总结大量最佳实践，同时参考社区精华，分析优秀开源作品，相信我们都会得到成长。</p>
<p>最后，前端学习永无止境，希望和每一位技术爱好者共同进步，大家可以在<a href="https://www.zhihu.com/people/lucas-hc/activities" rel="nofollow noreferrer" target="_blank">知乎找到我！</a></p>
<p>Happy coding!</p>
<p>Happy coding!</p>
<hr>
<p>《React 状态管理与同构实战》这本书由我和前端知名技术大佬<a href="https://www.zhihu.com/people/yanhaijing/activities" rel="nofollow noreferrer" target="_blank">颜海镜</a>合力打磨，凝结了我们在学习、实践 React 框架过程中的积累和心得。<strong>除了 React 框架使用介绍以外，着重剖析了状态管理以及服务端渲染同构应用方面的内容。</strong>同时吸取了社区大量优秀思想，进行归纳比对。</p>
<p>本书受到百度公司副总裁沈抖、百度资深前端工程师董睿，以及知名 JavaScript 语言专家阮一峰、Node.js 布道者狼叔、Flarum 中文社区创始人 justjavac、新浪移动前端技术专家小爝、百度资深前端工程师顾轶灵等前端圈众多专家大咖的联合力荐。</p>
<p>有兴趣的读者可以<a href="https://item.m.jd.com/product/12403508.html" rel="nofollow noreferrer" target="_blank">点击这里，了解详情。</a>也可以扫描下面的二维码购买。再次感谢各位的支持与鼓励！恳请各位批评指正！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016374195" src="https://static.alili.tech/img/remote/1460000016374195" alt="React 状态管理与同构实战" title="React 状态管理与同构实战" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016008111" src="https://static.alili.tech/img/remote/1460000016008111" alt="React 状态管理与同构实战" title="React 状态管理与同构实战" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 进阶设计与控制权问题

## 原文链接
[https://segmentfault.com/a/1190000016374190](https://segmentfault.com/a/1190000016374190)


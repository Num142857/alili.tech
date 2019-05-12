---
title: 'react开发教程（五）生命周期' 
date: 2019-01-16 2:30:08
hidden: true
slug: jcpetst2jab
categories: [reprint]
---

{{< raw >}}

                    
<p>在组件的整个生命周期中，随着该组件的props或者state发生改变，其DOM表现也会有相应的变化。一个组件就是一个状态机，对于特定地输入，它总返回一致的输出。</p>
<p>一个React组件的生命周期分为三个部分：实例化、存在期和销毁时。</p>
<h1 id="articleHeader0">实例化</h1>
<p>当组件在客户端被实例化，第一次被创建时，以下方法依次被调用：</p>
<ul>
<li>getDefaultProps 设置属性的默认值。  es6对应  deftaultProps</li>
<li>getInitialState 用来初始化每个实例的state。 es6 对应 constructor函数中的this.state</li>
<li>componentWillMount 渲染前</li>
<li>render  渲染</li>
<li>componentDidMount  渲染后</li>
</ul>
<p>当组件在服务端被实例化，首次被创建时，以下方法依次被调用：</p>
<p>1、getDefaultProps  <br>2、getInitialState<br>3、componentWillMount<br>4、render</p>
<p>componentDidMount 不会在服务端被渲染的过程中调用。</p>
<h2 id="articleHeader1">getDefaultProps</h2>
<p>对于每个组件实例来讲，这个方法只会调用一次，该组件类的所有后续应用，getDefaultPops 将不会再被调用，其返回的对象可以用于设置默认的 props(properties的缩写) 值。</p>
<h2 id="articleHeader2">getInitialState</h2>
<p>对于组件的每个实例来说，这个方法的调用有且只有一次，用来初始化每个实例的 state，在这个方法里，可以访问组件的 props。每一个React组件都有自己的 state，其与 props 的区别在于 state只存在组件的内部，props 在所有实例中共享。</p>
<p>getInitialState 和 getDefaultPops 的调用是有区别的，getDefaultPops 是对于组件类来说只调用一次，后续该类的应用都不会被调用，而 getInitialState 是对于每个组件实例来讲都会调用，并且只调一次。</p>
<p>每次修改 state，都会重新渲染组件，实例化后通过 state 更新组件，会依次调用下列方法：<br>1、shouldComponentUpdate<br>2、componentWillUpdate<br>3、render<br>4、componentDidUpdate</p>
<p>但是不要直接修改 this.state，要通过 this.setState 方法来修改。</p>
<h2 id="articleHeader3">componentWillMount</h2>
<p>该方法在首次渲染之前调用，也是再 render 方法调用之前修改 state 的最后一次机会。</p>
<p>render<br>该方法会创建一个虚拟DOM，用来表示组件的输出。对于一个组件来讲，render方法是唯一一个必需的方法。render方法需要满足下面几点：</p>
<ul>
<li>只能通过 this.props 和 this.state 访问数据（不能修改）</li>
<li>可以返回 null,false 或者任何React组件</li>
<li>只能出现一个顶级组件，不能返回一组元素</li>
<li>不能改变组件的状态</li>
<li>不能修改DOM的输出</li>
</ul>
<p>render方法返回的结果并不是真正的DOM元素，而是一个虚拟的表现，类似于一个DOM tree的结构的对象。react之所以效率高，就是这个原因。</p>
<h2 id="articleHeader4">componentDidMount</h2>
<p>该方法不会在服务端被渲染的过程中调用。该方法被调用时，已经渲染出真实的 DOM，可以在该方法中通过 this.refs 访问到真实的 DOM。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="


class App extends Component {
  static defaultProps = {
    name:&quot;默认值&quot;
  }

  constructor(props) {
    super(props);
    this.state = {
        num : 0
    };
    this.addNum = this.addNum.bind(this);
  }

  addNum(e) {
    e.preventDefault();
    var num = ++this.state.num;
    this.setState({
        num:num
    })
  }

  componentWillMount() {
    this.setState({
        num:10
    })
  }
  render() {

    return (
      <div className=&quot;App&quot;>
        <div className=&quot;App-header&quot; ref=&quot;header&quot;>
          <img src={logo} className=&quot;App-logo&quot; alt=&quot;logo&quot; />
          <h2>Welcome to React{this.props.name}</h2>
        </div>
        <p className=&quot;App-intro&quot;>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.addNum}>{this.state.num}</button>
      </div>
    );
  }

  componentDidMount() {
    console.log(this.refs.header)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>

<span class="javascript">
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> defaultProps = {
    <span class="hljs-attr">name</span>:<span class="hljs-string">"默认值"</span>
  }

  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
        <span class="hljs-attr">num</span> : <span class="hljs-number">0</span>
    };
    <span class="hljs-keyword">this</span>.addNum = <span class="hljs-keyword">this</span>.addNum.bind(<span class="hljs-keyword">this</span>);
  }

  addNum(e) {
    e.preventDefault();
    <span class="hljs-keyword">var</span> num = ++<span class="hljs-keyword">this</span>.state.num;
    <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">num</span>:num
    })
  }

  componentWillMount() {
    <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">num</span>:<span class="hljs-number">10</span>
    })
  }
  render() {

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-header"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"header"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{logo}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-logo"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"logo"</span> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Welcome to React{this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-intro"</span>&gt;</span>
          To get started, edit <span class="hljs-tag">&lt;<span class="hljs-name">code</span>&gt;</span>src/App.js<span class="hljs-tag">&lt;/<span class="hljs-name">code</span>&gt;</span> and save to reload.
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.addNum}</span>&gt;</span>{this.state.num}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }

  componentDidMount() {
    console.log(this.refs.header)
  }
}</span></span></code></pre>
<p>需要注意的是，由于 this.refs.[refName] 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。</p>
<h1 id="articleHeader5">存在期</h1>
<p>此时组件已经渲染好并且用户可以与它进行交互，比如鼠标点击，手指点按，或者其它的一些事件，导致应用状态的改变，你将会看到下面的方法依次被调用</p>
<ul>
<li>componentWillReceiveProps   props在父组件改变时执行</li>
<li>shouldComponentUpdate    如果你确定组件的 props 或者 state 的改变不需要重新渲染，可以通过在这个方法里通过返回 false 来阻止组件的重新渲染，返回 `false 则不会执行 render 以及后面的 componentWillUpdate，componentDidUpdate 方法</li>
<li>componentWillUpdate    这个方法和 componentWillMount 类似，在组件接收到了新的 props 或者 state 即将进行重新渲染前，componentWillUpdate(object nextProps, object nextState) 会被调用，<strong>注意不要在此方面里再去更新 props 或者 state。</strong>
</li>
<li>render</li>
<li>componentDidUpdate    这个方法和 &lt;kdb&gt;componentDidMount&lt;／kdb&gt; 类似，在组件重新被渲染之后，componentDidUpdate(object prevProps, object prevState) 会被调用。可以在这里访问并修改 DOM。</li>
</ul>
<h1 id="articleHeader6">销毁时</h1>
<h2 id="articleHeader7">componentWillUnmount</h2>
<p>每当React使用完一个组件，这个组件必须从 DOM 中卸载后被销毁，此时 componentWillUnmout 会被执行，完成所有的清理和销毁工作，在 componentDidMount 中添加的任务都需要再该方法中撤销，如创建的定时器或事件监听器。</p>
<p>当再次装载组件时，以下方法会被依次调用：</p>
<p>1、getInitialState<br>2、componentWillMount<br>3、render<br>4、componentDidMount</p>
<h1 id="articleHeader8">createClass和ES6的不同</h1>
<blockquote>
<p><strong>ES6 class</strong><br>static propTypes<br>static defaultProps<br>constructor (this.state)</p>
<p><strong>对应createClass</strong><br>propTypes<br>getDefaultProps<br>getInitialState</p>
</blockquote>
<h1 id="articleHeader9">整体流程</h1>
<h2 id="articleHeader10">ES6 class</h2>
<blockquote>
<p>static propTypes props值的类型检查 static defaultProps   设置属性的默认值<br>constructor ( this.state )   初始化每个实例的state</p>
<p>componentWillMount   该方法在首次渲染之前调用，也是再 render 方法调用之前修改 state 的最后一次机会。<br>componentDidMount    该方法被调用时，已经渲染出真实的 DOM，可以在该方法中通过 this.refs 访问到真实的<br>DOM。</p>
<p>componentWillUnmount  每当React使用完一个组件，这个组件必须从 DOM 中卸载后被销毁，此时会被执行<br>componentWillReceiveProps  props在父组件改变时执行 shouldComponentUpdate <br>如果你确定组件的 props 或者 state 的改变不需要重新渲染，可以通过在这个方法里通过返回 false 来阻止组件的重新渲染，返回<br>`false 则不会执行 render 以及后面的 componentWillUpdate，componentDidUpdate 方法</p>
<p>componentWillUpdate  这个方法和 componentWillMount 类似，在组件接收到了新的 props 或者<br>state 即将进行重新渲染前， componentDidUpdate   这个方法和<br>&lt;kdb&gt;componentDidMount&lt;／kdb&gt; 类似，在组件重新被渲染之后，会被调用。可以在这里访问并修改 DOM。 render<br>渲染组件</p>
</blockquote>
<p>上一篇：<a href="https://segmentfault.com/a/1190000009139532">react开发教程（四）React数据流</a><br>下一篇：<a href="https://segmentfault.com/a/1190000010593738" target="_blank">react开发教程（六）React与DOM</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react开发教程（五）生命周期

## 原文链接
[https://segmentfault.com/a/1190000009153245](https://segmentfault.com/a/1190000009153245)


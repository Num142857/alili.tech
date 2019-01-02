---
title: 'React中state和props分别是什么？' 
date: 2018-12-31 2:30:30
hidden: true
slug: fh5nz9oaxak
categories: [reprint]
---

{{< raw >}}

                    
<p>整理一下React中关于state和props的知识点。</p>
<hr>
<p>在任何应用中，数据都是必不可少的。我们需要直接的改变页面上一块的区域来使得视图的刷新，或者间接地改变其他地方的数据。React的数据是自顶向下单向流动的，即从父组件到子组件中，组件的数据存储在<code>props</code>和<code>state</code>中，这两个属性有啥子区别呢？</p>
<h2 id="articleHeader0">props</h2>
<p>React的核心思想就是组件化思想，页面会被切分成一些独立的、可复用的组件。</p>
<p>组件从概念上看就是一个函数，可以接受一个参数作为输入值，这个参数就是<code>props</code>，所以可以把<code>props</code>理解为从外部传入组件内部的数据。由于React是单向数据流，所以<code>props</code>基本上也就是从服父级组件向子组件传递的数据。</p>
<h3 id="articleHeader1">用法</h3>
<p>假设我们现在需要实现一个列表，根据React组件化思想，我们可以把列表中的行当做一个组件，也就是有这样两个组件：<code>&lt;ItemList/&gt;</code>和<code>&lt;Item/&gt;</code>。</p>
<p>先看看<code>&lt;ItemList/&gt;</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Item from &quot;./item&quot;;
export default class ItemList extends React.Component{
  const itemList = data.map(item => <Item item=item />);
  render(){
    return (
      {itemList}
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Item <span class="hljs-keyword">from</span> <span class="hljs-string">"./item"</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ItemList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  <span class="hljs-keyword">const</span> itemList = data.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> &lt;Item item=item /&gt;);
  render(){
    <span class="hljs-keyword">return</span> (
      {itemList}
    )
  }
}</code></pre>
<p>列表的数据我们就暂时先假设是放在一个<code>data</code>变量中，然后通过<code>map</code>函数返回一个每一项都是<code>&lt;Item item='数据'/&gt;</code>的数组，也就是说这里其实包含了<code>data.length</code>个<code>&lt;Item/&gt;</code>组件，数据通过在组件上自定义一个参数传递。当然，这里想传递几个自定义参数都可以。</p>
<p>在<code>&lt;Item /&gt;</code>中是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Item extends React.Component{
  render(){
    return (
      <li>{this.props.item}</li>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Item</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  render(){
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{this.props.item}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    )
  }
}</code></pre>
<p>在<code>render</code>函数中可以看出，组件内部是使用<code>this.props</code>来获取传递到该组件的所有数据，它是一个对象，包含了所有你对这个组件的配置，现在只包含了一个<code>item</code>属性，所以通过<code>this.props.item</code>来获取即可。</p>
<h3 id="articleHeader2">只读性</h3>
<p><code>props</code>经常被用作渲染组件和初始化状态，当一个组件被实例化之后，它的<code>props</code>是只读的，不可改变的。如果<code>props</code>在渲染过程中可以被改变，会导致这个组件显示的形态变得不可预测。只有通过父组件重新渲染的方式才可以把新的<code>props</code>传入组件中。</p>
<h3 id="articleHeader3">默认参数</h3>
<p>在组件中，我们最好为<code>props</code>中的参数设置一个<code>defaultProps</code>，并且制定它的类型。比如，这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Item.defaultProps = {
  item: 'Hello Props',
};

Item.propTypes = {
  item: PropTypes.string,
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Item.defaultProps = {
  <span class="hljs-attr">item</span>: <span class="hljs-string">'Hello Props'</span>,
};

Item.propTypes = {
  <span class="hljs-attr">item</span>: PropTypes.string,
};</code></pre>
<p>关于<code>propTypes</code>，可以声明为以下几种类型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="optionalArray: PropTypes.array,
optionalBool: PropTypes.bool,
optionalFunc: PropTypes.func,
optionalNumber: PropTypes.number,
optionalObject: PropTypes.object,
optionalString: PropTypes.string,
optionalSymbol: PropTypes.symbol," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">optionalArray: PropTypes.array,
<span class="hljs-attr">optionalBool</span>: PropTypes.bool,
<span class="hljs-attr">optionalFunc</span>: PropTypes.func,
<span class="hljs-attr">optionalNumber</span>: PropTypes.number,
<span class="hljs-attr">optionalObject</span>: PropTypes.object,
<span class="hljs-attr">optionalString</span>: PropTypes.string,
<span class="hljs-attr">optionalSymbol</span>: PropTypes.symbol,</code></pre>
<p>注意，<code>bool</code>和<code>func</code>是简写。</p>
<p>这些知识基础数据类型，还有一些复杂的，附上链接：</p>
<p><a href="https://facebook.github.io/react/docs/typechecking-with-proptypes.html" rel="nofollow noreferrer" target="_blank">https://facebook.github.io/react/docs/typechecking-with-proptypes.html</a></p>
<h3 id="articleHeader4">总结</h3>
<p><code>props</code>是一个从外部传进组件的参数，主要作为就是从父组件向子组件传递数据，它具有可读性和不变性，只能通过外部组件主动传入新的<code>props</code>来重新渲染子组件，否则子组件的<code>props</code>以及展现形式不会改变。</p>
<h2 id="articleHeader5">state</h2>
<p><code>state</code>是什么呢？</p>
<blockquote><p>State is similar to props, but it is private and fully controlled by the component.</p></blockquote>
<p>一个组件的显示形态可以由数据状态和外部参数所决定，外部参数也就是<code>props</code>，而数据状态就是<code>state</code>。</p>
<h3 id="articleHeader6">用法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class ItemList extends React.Component{
  constructor(){
    super();
    this.state = {
      itemList:'一些数据',
    }
  }
  render(){
    return (
      {this.state.itemList}
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ItemList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  <span class="hljs-keyword">constructor</span>(){
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">itemList</span>:<span class="hljs-string">'一些数据'</span>,
    }
  }
  render(){
    <span class="hljs-keyword">return</span> (
      {<span class="hljs-keyword">this</span>.state.itemList}
    )
  }
}</code></pre>
<p>首先，在组件初始化的时候，通过<code>this.state</code>给组件设定一个初始的<code>state</code>，在第一次<code>render</code>的时候就会用这个数据来渲染组件。</p>
<h3 id="articleHeader7">setState</h3>
<p><code>state</code>不同于<code>props</code>的一点是，<code>state</code>是可以被改变的。不过，不可以直接通过<code>this.state=</code>的方式来修改，而需要通过<code>this.setState()</code>方法来修改<code>state</code>。</p>
<p>比如，我们经常会通过异步操作来获取数据，我们需要在<code>didMount</code>阶段来执行异步操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount(){
  fetch('url')
    .then(response => response.json())
    .then((data) => {
      this.setState({itemList:item});  
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">componentDidMount(){
  fetch(<span class="hljs-string">'url'</span>)
    .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.json())
    .then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
      <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">itemList</span>:item});  
    }
}</code></pre>
<p>当数据获取完成后，通过<code>this.setState</code>来修改数据状态。</p>
<p>当我们调用<code>this.setState</code>方法时，React会更新组件的数据状态<code>state</code>，并且重新调用<code>render</code>方法，也就是会对组件进行重新渲染。</p>
<p><strong>注意：通过<code>this.state=</code>来初始化<code>state</code>，使用<code>this.setState</code>来修改<code>state</code>，<code>constructor</code>是唯一能够初始化的地方。</strong></p>
<p><code>setState</code>接受一个对象或者函数作为第一个参数，只需要传入需要更新的部分即可，不需要传入整个对象，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class ItemList extends React.Component{
  constructor(){
    super();
    this.state = {
      name:'axuebin',
      age:25,
    }
  }
  componentDidMount(){
    this.setState({age:18})  
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ItemList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  <span class="hljs-keyword">constructor</span>(){
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">name</span>:<span class="hljs-string">'axuebin'</span>,
      <span class="hljs-attr">age</span>:<span class="hljs-number">25</span>,
    }
  }
  componentDidMount(){
    <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">age</span>:<span class="hljs-number">18</span>})  
  }
}</code></pre>
<p>在执行完<code>setState</code>之后的<code>state</code>应该是<code>{name:'axuebin',age:18}</code>。</p>
<p><code>setState</code>还可以接受第二个参数，它是一个函数，会在<code>setState</code>调用完成并且组件开始重新渲染时被调用，可以用来监听渲染是否完成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({
  name:'xb'
},()=>console.log('setState finished'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.setState({
  <span class="hljs-attr">name</span>:<span class="hljs-string">'xb'</span>
},()=&gt;<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setState finished'</span>))</code></pre>
<h3 id="articleHeader8">总结</h3>
<p><code>state</code>的主要作用是用于组件保存、控制以及修改自己的状态，它只能在<code>constructor</code>中初始化，它算是组件的私有属性，不可通过外部访问和修改，只能通过组件内部的<code>this.setState</code>来修改，修改<code>state</code>属性会导致组件的重新渲染。</p>
<h2 id="articleHeader9">区别</h2>
<ol>
<li>
<code>state</code>是组件自己管理数据，控制自己的状态，可变；</li>
<li>
<code>props</code>是外部传入的数据参数，不可变；</li>
<li>没有<code>state</code>的叫做无状态组件，有<code>state</code>的叫做有状态组件；</li>
<li>多用<code>props</code>，少用<code>state</code>。也就是多写无状态组件。</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React中state和props分别是什么？

## 原文链接
[https://segmentfault.com/a/1190000011184076](https://segmentfault.com/a/1190000011184076)


---
title: 'React 组件数据流 && 组件间沟通' 
date: 2019-02-04 2:30:58
hidden: true
slug: jjiiiwk33f
categories: [reprint]
---

{{< raw >}}

                    
<p>使用React我们首先要知道如何传递数据，组件如何沟通，才能展示我们想要的数据。下面的列子都是使用ES6语法，不懂的同学需要先学习ES6语法。</p>
<h2 id="articleHeader0">数据流</h2>
<p>React是单向数据流，从父节点传递到子节点（通过<code>props</code>）。如果顶层的某个<code>props</code>改变了，React会重渲染所有的子节点（未做性能优化）。严格意义上React只提供，也强烈建议使用这种数据交流方式。</p>
<h3 id="articleHeader1">Props</h3>
<p><code>props</code>是property的缩写，可以理解为HTML标签的attribute。请把<code>props</code>当做只读的（不可以使用<code>this.props</code>直接修改props），<code>props</code>是用于整个组件树中传递数据和配置。在当前组件访问<code>props</code>，使用<code>this.props</code>。在什么情况下可以使用<code>props</code>，请看<a href="https://segmentfault.com/a/1190000006792687">组件生命周期</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
        <div title={this.props.title}></div>
    )
  }
}
<Component title=&quot;test&quot;/>//调用title就传进去了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props){
    <span class="hljs-keyword">super</span>(props);
  }
  render(){
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">title</span>=<span class="hljs-string">{this.props.title}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}
&lt;Component title=<span class="hljs-string">"test"</span>/&gt;<span class="hljs-comment">//调用title就传进去了</span></code></pre>
<h3 id="articleHeader2">PropTypes</h3>
<p><code>PropsTypes</code>是React中用来定义<code>props</code>的类型，不符合定义好的类型会报错。建议可复用组件要使用prop验证！接着上面的列子设置<code>PropsTypes</code>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Component {
  ...
}
Component.PropsType = {
  title: React.PropTypes.string,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="jsx">class Component {
  ...
}
Component<span class="hljs-selector-class">.PropsType</span> = {
  title: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.string</span>,
}</code></pre>
<p><code>React.PropTypes</code>&nbsp;提供很多验证器 (validator) 来验证传入数据的有效性。官方定义的验证器如下，不是使用ES6语法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createClass({
  propTypes: {
    // 可以声明 prop 为指定的 JS 基本类型。默认
    // 情况下，这些 prop 都是可传可不传的。
    optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,
    optionalSymbol: React.PropTypes.symbol,

    // 所有可以被渲染的对象：数字，
    // 字符串，DOM 元素或包含这些类型的数组(or fragment) 。
    optionalNode: React.PropTypes.node,

    // React 元素
    optionalElement: React.PropTypes.element,

    // 你同样可以断言一个 prop 是一个类的实例。
    // 用 JS 的 instanceof 操作符声明 prop 为类的实例。
    optionalMessage: React.PropTypes.instanceOf(Message),

    // 你可以用 enum 的方式
    // 确保你的 prop 被限定为指定值。
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

    // 指定的多个对象类型中的一个
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),

    // 指定类型组成的数组
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

    // 指定类型的属性构成的对象
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

    // 特定形状参数的对象
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),

    // 你可以在任意东西后面加上 `isRequired`
    // 来确保 如果 prop 没有提供 就会显示一个警告。
    requiredFunc: React.PropTypes.func.isRequired,

    // 不可空的任意类型
    requiredAny: React.PropTypes.any.isRequired,

    // 你可以自定义一个验证器。如果验证失败需要返回一个 Error 对象。
    // 不要直接使用 `console.warn` 或抛异常，
    // 因为这在 `oneOfType` 里不起作用。
    customProp: function(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
  },
  /* ... */
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs roboconf"><code class="jsx">React.createClass({
  <span class="hljs-attribute">propTypes</span>: {
    // 可以声明 prop 为指定的 JS 基本类型。默认
    // 情况下，这些 prop 都是可传可不传的。
    optionalArray: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.array</span>,
    optionalBool: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.bool</span>,
    optionalFunc: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.func</span>,
    optionalNumber: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.number</span>,
    optionalObject: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.object</span>,
    optionalString: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.string</span>,
    optionalSymbol: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.symbol</span>,

    // 所有可以被渲染的对象：数字，
    // 字符串，DOM 元素或包含这些类型的数组(or fragment) 。
    optionalNode: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.node</span>,

    // React 元素
    optionalElement: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.element</span>,

    // 你同样可以断言一个 prop 是一个类的实例。
    // 用 JS 的 instanceof 操作符声明 prop 为类的实例。
    optionalMessage: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.instanceOf</span>(Message),

    // 你可以用 enum 的方式
    // 确保你的 prop 被限定为指定值。
    optionalEnum: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.oneOf</span>(['News', 'Photos']),

    // 指定的多个对象类型中的一个
    optionalUnion: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.oneOfType</span>([
      React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.string</span>,
      React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.number</span>,
      React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.instanceOf</span>(Message)
    ]),

    // 指定类型组成的数组
    optionalArrayOf: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.arrayOf</span>(React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.number</span>),

    // 指定类型的属性构成的对象
    optionalObjectOf: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.objectOf</span>(React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.number</span>),

    // 特定形状参数的对象
    optionalObjectWithShape: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.shape</span>({
      color: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.string</span>,
      fontSize: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.number</span>
    }),

    // 你可以在任意东西后面加上 `isRequired`
    // 来确保 如果 prop 没有提供 就会显示一个警告。
    requiredFunc: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.func</span><span class="hljs-variable">.isRequired</span>,

    // 不可空的任意类型
    requiredAny: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.any</span><span class="hljs-variable">.isRequired</span>,

    // 你可以自定义一个验证器。如果验证失败需要返回一个 Error 对象。
    // 不要直接使用 `console<span class="hljs-variable">.warn</span>` 或抛异常，
    // 因为这在 `oneOfType` 里不起作用。
    customProp: function(props, propName, componentName) {
      if (!/matchme/<span class="hljs-variable">.test</span>(props[propName])) {
        return new Error('Validation failed!');
      }
    }
  },
  /* ... */
});</code></pre>
<h3 id="articleHeader3">defaultProps</h3>
<p>如何设置组件默认的<code>props</code>？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//React提供的crateClass创建方式
var Component = React.createClass({
  getDefaultProps(){
    return {
      //这里设置defaultProps
    }
  }
})
//ES6
class Component {
  ...
}
Component.defaultProps = {}
//ES7 stage-0
class Component {
  static defaultProps = {
    
  }
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code class="jsx"><span class="hljs-comment">//React提供的crateClass创建方式</span>
<span class="hljs-keyword">var</span> Component = React.createClass({
  getDefaultProps(){
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">//这里设置defaultProps</span>
    }
  }
})
<span class="hljs-comment">//ES6</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> </span>{
  ...
}
Component.defaultProps = {}
<span class="hljs-comment">//ES7 stage-0</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> defaultProps = {
    
  }
  ...
}</code></pre>
<h3 id="articleHeader4">state</h3>
<p>每个组件都有属于自己的<code>state</code>，<code>state</code>和<code>props</code>的区别在于前者之只存在于组件内部，只能从当前组件调用<code>this.setState</code>修改state值（不可以直接修改<code>this.state</code>）。一般我们更新子组件都是通过改变<code>state</code>值，更新新子组件的<code>props</code>值从而达到更新。</p>
<p>那如何设置默认state?</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//React提供的crateClass创建方式
var Component = React.createClass({
  getInitialState(){
    return {
      //这里设置初始state值
    }
  }
})
//ES6 &amp;&amp; ES7
class Component {
  constructor(){
    this.state = {}//在ES6中的构造函数中初始化，可以之直接赋值，在其他方法中，只能使用this.setState
  }
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code class="jsx"><span class="hljs-comment">//React提供的crateClass创建方式</span>
<span class="hljs-keyword">var</span> Component = React.createClass({
  getInitialState(){
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">//这里设置初始state值</span>
    }
  }
})
<span class="hljs-comment">//ES6 &amp;&amp; ES7</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(){
    <span class="hljs-keyword">this</span>.state = {}<span class="hljs-comment">//在ES6中的构造函数中初始化，可以之直接赋值，在其他方法中，只能使用this.setState</span>
  }
  ...
}</code></pre>
<h3 id="articleHeader5">props和state使用方式</h3>
<p>尽可能使用<code>props</code>当做数据源，<code>state</code>用来存放状态值（简单的数据），如复选框、下拉菜单等。</p>
<h2 id="articleHeader6">组件沟通</h2>
<p>组件沟通因为React的单向数据流方式会有所限制，下面述说组件之间的沟通方式。</p>
<h3 id="articleHeader7">父子组件沟通</h3>
<p>这种方式是最常见的，也是最简单的。</p>
<ul><li><p>父组件更新组件状态</p></li></ul>
<p>父组件更新子组件状态，通过传递<code>props</code>，就可以了。</p>
<ul><li><p>子组件更新父组件状态</p></li></ul>
<p>这种情况需要父组件传递回调函数给子组件，子组件调用触发即可。</p>
<p>代码示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Child extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  render(){
    return (
      <div>
        {this.props.text}
        <br />
        <button onClick={this.props.refreshParent}>
            更新父组件
        </button>
      </div>
    )
  }
}
class Parent extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  refreshChild(){
    return (e)=>{
      this.setState({
        childText: &quot;父组件沟通子组件成功&quot;,
      })
    }
  }
  refreshParent(){
    this.setState({
      parentText: &quot;子组件沟通父组件成功&quot;,
    })
  }
  render(){
    return (
      <div>
        <h1>父子组件沟通</h1>
        <button onClick={this.refreshChild()} >
            更新子组件
        </button>
        <Child 
          text={this.state.childText || &quot;子组件未更新&quot;} 
          refreshParent={this.refreshParent.bind(this)}
        />
        {this.state.parentText || &quot;父组件未更新&quot;}
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  constructor(props){
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {}
  }
  
  render(){
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        {<span class="hljs-keyword">this</span>.props.text}
        &lt;br /&gt;
        &lt;button onClick={<span class="hljs-keyword">this</span>.props.refreshParent}&gt;
            更新父组件
        &lt;/button&gt;
      &lt;/div&gt;
    )
  }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  constructor(props){
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {}
  }
  refreshChild(){
    <span class="hljs-keyword">return</span> (e)=&gt;{
      <span class="hljs-keyword">this</span>.setState({
        childText: <span class="hljs-string">"父组件沟通子组件成功"</span>,
      })
    }
  }
  refreshParent(){
    <span class="hljs-keyword">this</span>.setState({
      parentText: <span class="hljs-string">"子组件沟通父组件成功"</span>,
    })
  }
  render(){
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;h1&gt;父子组件沟通&lt;/h1&gt;
        &lt;button onClick={<span class="hljs-keyword">this</span>.refreshChild()} &gt;
            更新子组件
        &lt;/button&gt;
        &lt;<span class="hljs-type">Child</span> 
          text={<span class="hljs-keyword">this</span>.state.childText || <span class="hljs-string">"子组件未更新"</span>} 
          refreshParent={<span class="hljs-keyword">this</span>.refreshParent.bind(<span class="hljs-keyword">this</span>)}
        /&gt;
        {<span class="hljs-keyword">this</span>.state.parentText || <span class="hljs-string">"父组件未更新"</span>}
      &lt;/div&gt;
    )
  }
}</code></pre>
<p>codepen例子<a href="https://codepen.io/nange/pen/KgwRJk" rel="nofollow noreferrer" target="_blank">React组件之父子组件沟通</a><button class="btn btn-xs btn-default ml10 preview" data-url="nange/pen/KgwRJk" data-typeid="3">点击预览</button>&nbsp;。</p>
<h3 id="articleHeader8">兄弟组件沟通</h3>
<p>当两个组件有相同的父组件时，就称为兄弟组件（堂兄也算的）。按照React单向数据流方式，我们需要借助父组件进行传递，通过父组件回调函数改变兄弟组件的<code>props</code>。</p>
<h4>方式一</h4>
<p>通过<code>props</code>传递父组件回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Brother1 extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  render(){
    return (
      <div>
        <button onClick={this.props.refresh}>
            更新兄弟组件
        </button>
      </div>
    )
  }
}
class Brother2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  render(){
    return (
      <div>
         {this.props.text || &quot;兄弟组件未更新&quot;}
      </div>
    )
  }
}
class Parent extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  refresh(){
    return (e)=>{
      this.setState({
        text: &quot;兄弟组件沟通成功&quot;,
      })
    }
  }
  render(){
    return (
      <div>
        <h2>兄弟组件沟通</h2>
        <Brother1 refresh={this.refresh()}/>
        <Brother2 text={this.state.text}/>
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Brother1</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  constructor(props){
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {}
  }
  
  render(){
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;button onClick={<span class="hljs-keyword">this</span>.props.refresh}&gt;
            更新兄弟组件
        &lt;/button&gt;
      &lt;/div&gt;
    )
  }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Brother2</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  constructor(props){
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {}
  }
  
  render(){
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
         {<span class="hljs-keyword">this</span>.props.text || <span class="hljs-string">"兄弟组件未更新"</span>}
      &lt;/div&gt;
    )
  }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  constructor(props){
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {}
  }
  refresh(){
    <span class="hljs-keyword">return</span> (e)=&gt;{
      <span class="hljs-keyword">this</span>.setState({
        text: <span class="hljs-string">"兄弟组件沟通成功"</span>,
      })
    }
  }
  render(){
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;h2&gt;兄弟组件沟通&lt;/h2&gt;
        &lt;<span class="hljs-type">Brother1</span> refresh={<span class="hljs-keyword">this</span>.refresh()}/&gt;
        &lt;<span class="hljs-type">Brother2</span> text={<span class="hljs-keyword">this</span>.state.text}/&gt;
      &lt;/div&gt;
    )
  }
}</code></pre>
<p>codepen例子：<a href="https://codepen.io/nange/pen/xEbJVg" rel="nofollow noreferrer" target="_blank">React组件之兄弟组件沟通</a><button class="btn btn-xs btn-default ml10 preview" data-url="nange/pen/xEbJVg" data-typeid="3">点击预览</button>。</p>
<h4>方式二</h4>
<p>但是如果组件层次太深（如下图），上面的兄弟组件沟通方式就效率低了（不建议组件层次太深）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006831823?w=278&amp;h=300" src="https://static.alili.tech/img/remote/1460000006831823?w=278&amp;h=300" alt="" title="" style="cursor: pointer;"></span></p>
<p>React提供了一种上下文方式（挺方便的），可以让子组件直接访问祖先的数据或函数，无需从祖先组件一层层地传递数据到子组件中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Brother1 extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  render(){
    
    return (
      <div>
        <button onClick={this.context.refresh}>
            更新兄弟组件
        </button>
      </div>
    )
  }
}
Brother1.contextTypes = {
  refresh: React.PropTypes.any
}
class Brother2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  render(){
    return (
      <div>
         {this.context.text || &quot;兄弟组件未更新&quot;}
      </div>
    )
  }
}
Brother2.contextTypes = {
  text: React.PropTypes.any
}
class Parent extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  getChildContext(){
    return {
      refresh: this.refresh(),
          text: this.state.text,
      }
    }
  
  refresh(){
    return (e)=>{
      this.setState({
        text: &quot;兄弟组件沟通成功&quot;,
      })
    }
  }
  render(){
    return (
      <div>
        <h2>兄弟组件沟通</h2>
        <Brother1 />
        <Brother2 text={this.state.text}/>
      </div>
    )
  }
}
Parent.childContextTypes = {
  refresh: React.PropTypes.any,
  text: React.PropTypes.any,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Brother1</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  constructor(props){
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {}
  }
  
  render(){
    
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;button onClick={<span class="hljs-keyword">this</span>.context.refresh}&gt;
            更新兄弟组件
        &lt;/button&gt;
      &lt;/div&gt;
    )
  }
}
<span class="hljs-type">Brother1</span>.contextTypes = {
  refresh: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.any
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Brother2</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  constructor(props){
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {}
  }
  
  render(){
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
         {<span class="hljs-keyword">this</span>.context.text || <span class="hljs-string">"兄弟组件未更新"</span>}
      &lt;/div&gt;
    )
  }
}
<span class="hljs-type">Brother2</span>.contextTypes = {
  text: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.any
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  constructor(props){
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {}
  }
  
  getChildContext(){
    <span class="hljs-keyword">return</span> {
      refresh: <span class="hljs-keyword">this</span>.refresh(),
          text: <span class="hljs-keyword">this</span>.state.text,
      }
    }
  
  refresh(){
    <span class="hljs-keyword">return</span> (e)=&gt;{
      <span class="hljs-keyword">this</span>.setState({
        text: <span class="hljs-string">"兄弟组件沟通成功"</span>,
      })
    }
  }
  render(){
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;h2&gt;兄弟组件沟通&lt;/h2&gt;
        &lt;<span class="hljs-type">Brother1</span> /&gt;
        &lt;<span class="hljs-type">Brother2</span> text={<span class="hljs-keyword">this</span>.state.text}/&gt;
      &lt;/div&gt;
    )
  }
}
<span class="hljs-type">Parent</span>.childContextTypes = {
  refresh: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.any,
  text: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.any,
}</code></pre>
<p>codepen例子：<a href="https://codepen.io/nange/pen/VKYBAX" rel="nofollow noreferrer" target="_blank">React组件之兄弟组件沟通2</a><button class="btn btn-xs btn-default ml10 preview" data-url="nange/pen/VKYBAX" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader9">全局事件</h3>
<blockquote><p>For communication between two components that don't have a parent-child relationship, you can set up your own global event system. Subscribe to events in&nbsp;<code>componentDidMount()</code>, unsubscribe in&nbsp;<code>componentWillUnmount()</code>, and call&nbsp;<code>setState()</code>&nbsp;when you receive an event.<a href="https://facebook.github.io/flux/" rel="nofollow noreferrer" target="_blank">Flux</a>&nbsp;pattern is one of the possible ways to arrange this.</p></blockquote>
<p>官网中提到可以使用全局事件来进行组件间的通信，官网推荐Flux（Facebook官方出的），还有Relay、Redux、trandux等第三方类库。这些框架思想都一致，都是统一管理组件state变化情况，达到<strong>数据可控</strong>目的。本人使用了Redux，建议要会其中一种。对于EventEmitter或PostalJS这类的第三方库是不建议使用的，这类全局事件框架并没有统一管理组件数据变化，用多了会导致数据流不可控。</p>
<p>这里就不细说，请选择其中一种类库，深入学习下。</p>
<h2 id="articleHeader10">总结</h2>
<p>简单的组件交流我们可以使用上面非全局事件的简单方式，但是当项目复杂，组件间层次越来越深，上面的交流方式就不太合适（当然还是要用到的，简单的交流）。强烈建议使用Flux、Relay、Redux、trandux等类库其中一种，这些类库不只适合React，像Angular等都可以使用。</p>
<h2 id="articleHeader11">参考文章</h2>
<ul>
<li><p><a href="http://www.alloyteam.com/2016/01/some-methods-of-reactjs-communication-between-components/" rel="nofollow noreferrer" target="_blank">ReactJS组件间沟通的一些方法</a></p></li>
<li><p><a href="http://www.alloyteam.com/2015/09/react-redux/" rel="nofollow noreferrer" target="_blank">React 数据流管理架构之 Redux 介绍</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 组件数据流 && 组件间沟通

## 原文链接
[https://segmentfault.com/a/1190000006831820](https://segmentfault.com/a/1190000006831820)


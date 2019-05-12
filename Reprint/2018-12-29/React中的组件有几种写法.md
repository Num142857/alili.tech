---
title: 'React中的组件有几种写法' 
date: 2018-12-29 2:30:10
hidden: true
slug: nik5d4hf5o
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">内容提要</h2>
<ul>
<li>元素与组件 Element &amp; Component</li>
<li>函数定义与类定义组件 Functional &amp; Class</li>
<li>展示与容器组件 Presentational &amp; Container</li>
<li>有状态与无状态组件 Stateful &amp; Stateless</li>
<li>受控与非受控组件 Controlled &amp; Uncontrolled</li>
<li>组合与继承 Composition &amp; Inheritance</li>
</ul>
<h2 id="articleHeader1">元素与组件 Element &amp; Component</h2>
<p><strong>元素</strong></p>
<p>元素是构建React应用的最小单位。元素所描述的也就是你在浏览器中能够看到的东西。根据我们在上节课中讲到的内容，我们在编写React代码时一般用JSX来描述React元素。</p>
<p>在作用上，我们可以把React元素理解为DOM元素；但实际上，React元素只是JS当中普通的对象。React内部实现了一套叫做React DOM的东西，或者我们称之为Virtual DOM也就是虚拟DOM.通过一个树状结构的JS对象来模拟DOM树。</p>
<p>说到这里我们可以稍微讲一下，React为什么会有这一层虚拟DOM呢？在课程介绍中我们曾经提到过，React很快、很轻。它之所以快就是因为这一套虚拟DOM的存在，React内部还实现了一个低复杂度高效率的Diff算法，不同于以往框架，例如angular使用的脏检查。在应用的数据改变之后，React会尽力少地比较，然后根据虚拟DOM只改变真实DOM中需要被改变的部分。React也藉此实现了它的高效率，高性能。</p>
<p>当然这不是虚拟DOM唯一的意义，通过这一层单独抽象的逻辑让React有了无限的可能，就比如react native的实现，可以让你只掌握JS的知识也能在其他平台系统上开发应用，而不只是写网页，甚至是之后会出现的React VR或者React物联网等等别的实现。</p>
<p>话说回来，元素也就是React DOM之中描述UI界面的最小单位。刚才我们说到了，元素其实就是普通的JS对象。不过我们用JSX来描述React元素在理解上可能有些困难，事实上，我们也可以不使用JSX来描述：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = <h1>Hello, world</h1>;
// 用JSX描述就相当于是调用React的方法创建了一个对象
const element = React.createElement('h1', null, 'Hello, world');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">const</span> element = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
<span class="hljs-comment">// 用JSX描述就相当于是调用React的方法创建了一个对象</span>
<span class="hljs-keyword">const</span> element = React.createElement(<span class="hljs-string">'h1'</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">'Hello, world'</span>);</code></pre>
<p><strong>组件</strong></p>
<p>要注意到，在React当中元素和组件是两个不同的概念，之所以在前面讲了这么多，就是担心大家不小心会混淆这两个概念。首先我们需要明确的是，组件是构建在元素的基础之上的。</p>
<p>React官方对组件的定义呢，是指在UI界面中，可以被独立划分的、可复用的、独立的模块。其实就类似于JS当中对function函数的定义，它一般会接收一个名为props的输入，然后返回相应的React元素，再交给ReactDOM，最后渲染到屏幕上。</p>
<h2 id="articleHeader2">函数定义与类定义组件 Functional &amp; Class</h2>
<p>新版本的React里提供了两种定义组件的方法。当然之前的React.createClass也可以继续用，不过我们在这里先不纳入我们讨论的范围。</p>
<p>第一种函数定义组件，非常简单啦，我们只需要定义一个接收props传值，返回React元素的方法即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Title(props) {
  return <h1>Hello, {props.name}</h1>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Title</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}</code></pre>
<p>甚至使用ES6的箭头函数简写之后可以变成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Title = props => <h1>Hello, {props.name}</h1>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code class="jsx" style="word-break: break-word; white-space: initial;"><span class="xml">const Title = props =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, </span><span class="hljs-template-variable">{props.name}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span></code></pre>
<p>第二种是类定义组件，也就是使用ES6中新引入的类的概念来定义React组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Title extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Title</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;h1&gt;<span class="hljs-type">Hello</span>, {<span class="hljs-keyword">this</span>.props.name}&lt;/h1&gt;;
  }
}</code></pre>
<p>之后呢，根据我们在上一节课中了解到的，组件在定义好之后，可以通过JSX描述的方式被引用，组件之间也可以相互嵌套和组合。</p>
<h2 id="articleHeader3">展示与容器组件 Presentational &amp; Container</h2>
<p>接下来我们还会介绍一些更深入的关于组件概念，现在听起来可能会比较抽象枯燥，不过接下来要介绍的这几个概念在之后的课程中都是会被应用到的，同学们也可以根据自己的实际情况，在学习完后续的课程之后，再返回来听听看，相信一定会对你理解React有所帮助。</p>
<p>首先是最重要的一组概念：展示组件与容器组件。同样，在课程介绍中我们提到的，React并不是传统的MVVM框架，它只是在V层，视图层上下功夫。同学们应该对MVVM或MVC都有所了解，那么既然我们的框架现在只有V层的话，在实际开发中应该如何处理数据与视图的关系呢？</p>
<p>为了解决React只有V层的这个问题，更好地区分我们的代码逻辑，展示组件与容器组件这一对概念就被引入了。这同样也是我们在开发React应用时的最佳实践。</p>
<p>我们还是先看一个具体的例子来解释这两个概念：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class CommentList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { comments: [] }
  }
  
  componentDidMount() {
    $.ajax({
      url: &quot;/my-comments.json&quot;,
      dataType: 'json',
      success: function(comments) {
        this.setState({comments: comments})
      }.bind(this)
    })
  }
  
  renderComment({body, author}) {
    return <li>{body}—{author}</li>
  }

  render() {
    return <ul> {this.state.comments.map(this.renderComment)} </ul>
  }
  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CommentList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props)
    <span class="hljs-keyword">this</span>.state = { <span class="hljs-attr">comments</span>: [] }
  }
  
  componentDidMount() {
    $.ajax({
      <span class="hljs-attr">url</span>: <span class="hljs-string">"/my-comments.json"</span>,
      <span class="hljs-attr">dataType</span>: <span class="hljs-string">'json'</span>,
      <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">comments</span>) </span>{
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">comments</span>: comments})
      }.bind(<span class="hljs-keyword">this</span>)
    })
  }
  
  renderComment({body, author}) {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{body}—{author}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  }

  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span> {this.state.comments.map(this.renderComment)} <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  }
  
}</code></pre>
<p>这是一个回复列表组件，乍看上去很正常也很合理。但实际上在开发React应用时，我们应该避免写出这样的组件，因为这类组件担负的功能太多了。它只是一个单一的组件，但需要同时负责初始化state，通过ajax获取服务器数据，渲染列表内容，在实际应用中，可能还会有更多的功能依赖。这样，在后续维护的时候，不管是我们要修改服务器数据交互还是列表样式内容，都需要去修改同一个组件，逻辑严重耦合，多个功能在同一个组件中维护也不利于团队协作。</p>
<p>通过应用展示组件与容器组件的概念，我们可以把上述的单一组件重构为一个展示回复列表组件和回复列表容器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 展示组件

class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderComment({body, author}) {
    return <li>{body}—{author}</li>;
  }
  
  render() { 
    return <ul> {this.props.comments.map(this.renderComment)} </ul>;
  } 
  
}

// 容器组件

class CommentListContainer extends React.Component {
  constructor() {
    super()
    this.state = { comments: [] }
  }
  
  componentDidMount() {
    $.ajax({
      url: &quot;/my-comments.json&quot;,
      dataType: 'json',
      success: function(comments) {
        this.setState({comments: comments})
      }.bind(this)
    })
  }
  
  render() {
    return <CommentList comments={this.state.comments} />
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-comment">// 展示组件</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CommentList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
  }

  renderComment({body, author}) {
    <span class="hljs-keyword">return</span> &lt;li&gt;{body}—{author}&lt;/li&gt;;
  }
  
  render() { 
    <span class="hljs-keyword">return</span> &lt;ul&gt; {<span class="hljs-keyword">this</span>.props.comments.map(<span class="hljs-keyword">this</span>.renderComment)} &lt;/ul&gt;;
  } 
  
}

<span class="hljs-comment">// 容器组件</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CommentListContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>()
    <span class="hljs-keyword">this</span>.state = { comments: [] }
  }
  
  componentDidMount() {
    $.ajax({
      url: <span class="hljs-string">"/my-comments.json"</span>,
      dataType: <span class="hljs-symbol">'jso</span>n',
      success: function(comments) {
        <span class="hljs-keyword">this</span>.setState({comments: comments})
      }.bind(<span class="hljs-keyword">this</span>)
    })
  }
  
  render() {
    <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">CommentList</span> comments={<span class="hljs-keyword">this</span>.state.comments} /&gt;
  }
}</code></pre>
<p>像这样回复列表如何展示与如何获取回复数据的逻辑就被分离到两个组件当中了。我们再来明确一下展示组件和容器组件的概念：</p>
<p><strong>展示组件</strong></p>
<ul>
<li>主要负责组件内容如何展示</li>
<li>从props接收父组件传递来的数据</li>
<li>大多数情况可以通过函数定义组件声明</li>
</ul>
<p><strong>容器组件</strong></p>
<ul>
<li>主要关注组件数据如何交互</li>
<li>拥有自身的state，从服务器获取数据，或与redux等其他数据处理模块协作</li>
<li>需要通过类定义组件声明，并包含生命周期函数和其他附加方法</li>
</ul>
<p>那么这样写具体有什么好处呢？</p>
<ul>
<li>解耦了界面和数据的逻辑</li>
<li>更好的可复用性，比如同一个回复列表展示组件可以套用不同数据源的容器组件</li>
<li>利于团队协作，一个人负责界面结构，一个人负责数据交互</li>
</ul>
<h2 id="articleHeader4">有状态与无状态组件 Stateful &amp; Stateless</h2>
<p><strong>有状态组件</strong></p>
<p>意思是这个组件能够获取储存改变应用或组件本身的状态数据，在React当中也就是state，一些比较明显的特征是我们可以在这样的组件当中看到对this.state的初始化，或this.setState方法的调用等等。</p>
<p><strong>无状态组件</strong></p>
<p>这样的组件一般只接收来自其他组件的数据。一般这样的组件中只能看到对this.props的调用，通常可以用函数定义组件的方式声明。它本身不会掌握应用的状态数据，即使触发事件，也是通过事件处理函数传递到其他有状态组件当中再对state进行操作。</p>
<p>我们还是来看具体的例子比较能清楚地说明问题，与此同时，我们已经介绍了三组概念，为了防止混淆，我这里特意使用了两个展示组件来做示例，其中一个是有状态组件，另一个是无状态组件，也是为了证明，并不是所有的展示组件都是无状态组件，所有的容器组件都是有状态组件。再次强调一下，这是两组不同的概念，以及对组件不同角度的划分方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Stateful Component
class StatefulLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }
  handleClick() {
    this.setState({
      active: !this.state.active
    })
  }
  render() {
    return <a 
          style="{{" color: this.state.active ? 'red' : 'black' "}}"
          onClick={this.handleClick.bind(this)}
         >
           Stateful Link
         </a>
  }
}

// Stateless Component
class StatelessLink extends React.Component {
  constructor(props) {
    super(props)
  }
  handleClick() {
    this.props.handleClick(this.props.router)
  }
  render() {
    const active = this.props.activeRouter === this.props.router
    return (
        <li>
            <a 
              style="{{" color: active ? 'red' : 'black' "}}"
              onClick={this.handleClick.bind(this)}
             >
                Stateless Link
            </a>
    </li>
    )
  }
}

class Nav extends React.Component {
  constructor() {
    super()
    this.state={activeRouter: 'home'}
  }
  handleSwitch(router) {
    this.setState({activeRouter: router})
  }
  render() {
    return (
    <ul>
        <StatelessLink activeRouter={this.state.activeRouter} router='home' handleClick={this.handleSwitch.bind(this)} />
        <StatelessLink activeRouter={this.state.activeRouter} router='blog' handleClick={this.handleSwitch.bind(this)} />
        <StatelessLink activeRouter={this.state.activeRouter} router='about' handleClick={this.handleSwitch.bind(this)} />
    </ul>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-comment">//Stateful Component</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">StatefulLink</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props)
    <span class="hljs-keyword">this</span>.state = {
      active: <span class="hljs-literal">false</span>
    }
  }
  handleClick() {
    <span class="hljs-keyword">this</span>.setState({
      active: !<span class="hljs-keyword">this</span>.state.active
    })
  }
  render() {
    <span class="hljs-keyword">return</span> &lt;a 
          style="{{" color: <span class="hljs-keyword">this</span>.state.active ? <span class="hljs-symbol">'re</span>d' : <span class="hljs-symbol">'blac</span>k' "}}"
          onClick={<span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>)}
         &gt;
           <span class="hljs-type">Stateful</span> <span class="hljs-type">Link</span>
         &lt;/a&gt;
  }
}

<span class="hljs-comment">// Stateless Component</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">StatelessLink</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props)
  }
  handleClick() {
    <span class="hljs-keyword">this</span>.props.handleClick(<span class="hljs-keyword">this</span>.props.router)
  }
  render() {
    const active = <span class="hljs-keyword">this</span>.props.activeRouter === <span class="hljs-keyword">this</span>.props.router
    <span class="hljs-keyword">return</span> (
        &lt;li&gt;
            &lt;a 
              style="{{" color: active ? <span class="hljs-symbol">'re</span>d' : <span class="hljs-symbol">'blac</span>k' "}}"
              onClick={<span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>)}
             &gt;
                <span class="hljs-type">Stateless</span> <span class="hljs-type">Link</span>
            &lt;/a&gt;
    &lt;/li&gt;
    )
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Nav</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>()
    <span class="hljs-keyword">this</span>.state={activeRouter: <span class="hljs-symbol">'hom</span>e'}
  }
  handleSwitch(router) {
    <span class="hljs-keyword">this</span>.setState({activeRouter: router})
  }
  render() {
    <span class="hljs-keyword">return</span> (
    &lt;ul&gt;
        &lt;<span class="hljs-type">StatelessLink</span> activeRouter={<span class="hljs-keyword">this</span>.state.activeRouter} router=<span class="hljs-symbol">'hom</span>e' handleClick={<span class="hljs-keyword">this</span>.handleSwitch.bind(<span class="hljs-keyword">this</span>)} /&gt;
        &lt;<span class="hljs-type">StatelessLink</span> activeRouter={<span class="hljs-keyword">this</span>.state.activeRouter} router=<span class="hljs-symbol">'blo</span>g' handleClick={<span class="hljs-keyword">this</span>.handleSwitch.bind(<span class="hljs-keyword">this</span>)} /&gt;
        &lt;<span class="hljs-type">StatelessLink</span> activeRouter={<span class="hljs-keyword">this</span>.state.activeRouter} router=<span class="hljs-symbol">'abou</span>t' handleClick={<span class="hljs-keyword">this</span>.handleSwitch.bind(<span class="hljs-keyword">this</span>)} /&gt;
    &lt;/ul&gt;
    )
  }
}</code></pre>
<p>上述的例子可能稍有些复杂，事实上，在React的实际开发当中，我们编写的组件大部分都是无状态组件。毕竟React的主要作用是编写用户界面。再加上ES6的新特性，绝大多数的无状态组件都可以通过箭头函数简写成类似下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* function SimpleButton(props) {
  return <button>{props.text}</button>
} */

const SimpleButton = props => <button>{props.text}</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code class="jsx">/* <span class="hljs-keyword">function</span> <span class="hljs-title">SimpleButton</span>(props) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">&lt;button&gt;{props.text}&lt;/button&gt;</span>
} */

const SimpleButton = props =&gt; &lt;button&gt;{props.text}&lt;/button&gt;</code></pre>
<h2 id="articleHeader5">受控与非受控组件 Controlled &amp; Uncontrolled</h2>
<p><strong>受控组件</strong></p>
<p>一般涉及到表单元素时我们才会使用这种分类方法，在后面一节课程表单及事件处理中我们还会再次谈论到这个话题。受控组件的值由props或state传入，用户在元素上交互或输入内容会引起应用state的改变。在state改变之后重新渲染组件，我们才能在页面中看到元素中值的变化，假如组件没有绑定事件处理函数改变state，用户的输入是不会起到任何效果的，这也就是“受控”的含义所在。</p>
<p><strong>非受控组件</strong></p>
<p>类似于传统的DOM表单控件，用户输入不会直接引起应用state的变化，我们也不会直接为非受控组件传入值。想要获取非受控组件，我们需要使用一个特殊的ref属性，同样也可以使用defaultValue属性来为其指定一次性的默认值。</p>
<p>我们还是来看具体的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ControlledInput extends React.Component {
  constructor() {
    super()
    this.state = {value: 'Please type here...'}
  }

  handleChange(event) {
    console.log('Controlled change:',event.target.value)
    this.setState({value: event.target.value})
  }

  render() {
    return (
      <label>
        Controlled Component:
        <input type=&quot;text&quot;
               value={this.state.value}
               onChange={(e) => this.handleChange(e)}
        />
      </label>
    );
  }
}

class UncontrolledInput extends React.Component {
  constructor() {
    super();
  }

  handleChange() {
    console.log('Uncontrolled change:',this.input.value);
  }

  render() {
    return (
        <label>
          Uncontrolled Component:
          <input type=&quot;text&quot;
                 defaultValue='Please type here...'
                 ref={(input) => this.input = input}
                 onChange={() =>this.handleChange()}
          />
        </label>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ControlledInput</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>()
    <span class="hljs-keyword">this</span>.state = {value: <span class="hljs-symbol">'Please</span> <span class="hljs-class"><span class="hljs-keyword">type</span> <span class="hljs-title">here</span>...'}</span>
  }

  handleChange(event) {
    console.log(<span class="hljs-symbol">'Controlled</span> change:',event.target.value)
    <span class="hljs-keyword">this</span>.setState({value: event.target.value})
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;label&gt;
        <span class="hljs-type">Controlled</span> <span class="hljs-type">Component</span>:
        &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>
               value={<span class="hljs-keyword">this</span>.state.value}
               onChange={(e) =&gt; <span class="hljs-keyword">this</span>.handleChange(e)}
        /&gt;
      &lt;/label&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UncontrolledInput</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>();
  }

  handleChange() {
    console.log(<span class="hljs-symbol">'Uncontrolled</span> change:',<span class="hljs-keyword">this</span>.input.value);
  }

  render() {
    <span class="hljs-keyword">return</span> (
        &lt;label&gt;
          <span class="hljs-type">Uncontrolled</span> <span class="hljs-type">Component</span>:
          &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>
                 defaultValue=<span class="hljs-symbol">'Please</span> <span class="hljs-class"><span class="hljs-keyword">type</span> <span class="hljs-title">here</span>...'</span>
                 ref={(input) =&gt; <span class="hljs-keyword">this</span>.input = input}
                 onChange={() =&gt;<span class="hljs-keyword">this</span>.handleChange()}
          /&gt;
        &lt;/label&gt;
    );
  }
}</code></pre>
<p>通常情况下，React当中所有的表单控件都需要是受控组件。但正如我们对受控组件的定义，想让受控组件正常工作，每一个受控组件我们都需要为其编写事件处理函数，有的时候确实会很烦人，比方说一个注册表单你需要写出所有验证姓名电话邮箱验证码的逻辑，当然也有一些小技巧可以让同一个事件处理函数应用在多个表单组件上，但生产开发中并没有多大实际意义。更有可能我们是在对已有的项目进行重构，除了React之外还有一些别的库需要和表单交互，这时候使用非受控组件可能会更方便一些。</p>
<h2 id="articleHeader6">组合与继承 Composition &amp; Inheritance</h2>
<p>前面我们已经提到了，React当中的组件是通过嵌套或组合的方式实现组件代码复用的。通过props传值和组合使用组件几乎可以满足所有场景下的需求。这样也更符合组件化的理念，就好像使用互相嵌套的DOM元素一样使用React的组件，并不需要引入继承的概念。</p>
<p>当然也不是说我们的代码不能这么写，来看下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Inheritance
class InheritedButton extends React.Component {
  constructor() {
    super()
    this.state = {
      color: 'red'
    }
  }
  render() {
    return (
    <button style="{{"backgroundColor: this.state.color"}}" class='react-button'>Inherited Button</button>
    )
  }
}

class BlueButton extends InheritedButton {
  constructor() {
    super()
    this.state = {
      color: '#0078e7'
    }
  }
}

// Composition
const CompositedButton = props => <button style="{{"backgroundColor:props.color"}}">Composited Button</button>

const YellowButton = () => <CompositedButton color='#ffeb3b' />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-comment">// Inheritance</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">InheritedButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>()
    <span class="hljs-keyword">this</span>.state = {
      color: <span class="hljs-symbol">'re</span>d'
    }
  }
  render() {
    <span class="hljs-keyword">return</span> (
    &lt;button style="{{"backgroundColor: <span class="hljs-keyword">this</span>.state.color"}}" <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-symbol">'react</span>-button'&gt;<span class="hljs-type">Inherited</span> <span class="hljs-type">Button</span>&lt;/button&gt;
    )
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BlueButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">InheritedButton</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>()
    <span class="hljs-keyword">this</span>.state = {
      color: '#<span class="hljs-number">0078e7</span>'
    }
  }
}

<span class="hljs-comment">// Composition</span>
const <span class="hljs-type">CompositedButton</span> = props =&gt; &lt;button style="{{"backgroundColor:props.color"}}"&gt;<span class="hljs-type">Composited</span> <span class="hljs-type">Button</span>&lt;/button&gt;

const <span class="hljs-type">YellowButton</span> = () =&gt; &lt;<span class="hljs-type">CompositedButton</span> color='#ffeb3b' /&gt;</code></pre>
<p>但继承的写法并不符合React的理念。在React当中props其实是非常强大的，props几乎可以传入任何东西，变量、函数、甚至是组件本身：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function SplitPane(props) {
  return (
    <div className=&quot;SplitPane&quot;>
      <div className=&quot;SplitPane-left&quot;>
        {props.left}
      </div>
      <div className=&quot;SplitPane-right&quot;>
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SplitPane</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"SplitPane"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"SplitPane-left"</span>&gt;</span>
        {props.left}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"SplitPane-right"</span>&gt;</span>
        {props.right}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">App</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">SplitPane</span>
      <span class="hljs-attr">left</span>=<span class="hljs-string">{</span>
        &lt;<span class="hljs-attr">Contacts</span> /&gt;</span>
      }
      right={
        <span class="hljs-tag">&lt;<span class="hljs-name">Chat</span> /&gt;</span>
      } /&gt;
  );
}</span></code></pre>
<p>React官方也希望我们通过组合的方式来使用组件，如果你想实现一些非界面类型函数的复用，可以单独写在其他的模块当中在引入组件进行使用。</p>
<p>本文为《从零学习React技术栈教程·理论篇》当中的一节内容，学习React，阅读更多用心有爱的教程内容，请关注 <strong>余博伦</strong> 微信公众号。</p>
<p><span class="img-wrap"><img data-src="/img/bVV8Q5?w=300&amp;h=300" src="https://static.alili.tech/img/bVV8Q5?w=300&amp;h=300" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React中的组件有几种写法

## 原文链接
[https://segmentfault.com/a/1190000011434694](https://segmentfault.com/a/1190000011434694)


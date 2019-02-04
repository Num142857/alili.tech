---
title: 'React入门及资源指引' 
date: 2019-02-05 2:30:09
hidden: true
slug: x49k0qqm0ei
categories: [reprint]
---

{{< raw >}}

                    
<p>因为工作需要，这段时间一直在看<strong>React</strong>相关的东西，不得不感叹<strong>Facebook</strong>在开源项目和软件架构方面的实力，其在<strong>React</strong>中提出的一些设计思想非常新颖，极大的简化了前端开发的代码逻辑。本文将介绍<strong>React</strong>相关的基础知识，以及本人在学习过程发现的好的学习资料。</p>
<h2 id="articleHeader0">React简介</h2>
<h3 id="articleHeader1">什么是React</h3>
<p><strong>React</strong>是<strong>Facebook</strong>开源的一套用来创建用户界面的JS库，它重在界面渲染，因此很多人认为<strong>React</strong>是传统<strong>MVC</strong>中的<strong>V</strong>（视图），使用<strong>React</strong>你可以轻松构建可交互、基于状态的、可复用的UI组件。</p>
<p><strong>Facebook</strong>创建<strong>React</strong>的初衷是想使得构建随着时间流逝数据不断变化的大规模应用程序变得简单，<strong>Facebook</strong>工程师认为传统的<strong>MVC</strong>模式已经不适用于构建这种大规模应用，因为当系统中的模型和对应的视图越来越多时，其复杂程度就会迅速扩大，加之可能存在的双向数据流动，导致程序难以理解和调试。</p>
<p><strong>React</strong>有两个主要思想：</p>
<ul><li><p>简单<br>仅仅表达出你的应用在任意时间点应该呈现的样子（这种展现是可以预测的，给编写测试代码带来了极大的便利），数据驱动UI，当底层数据变了，<strong>React</strong>会自动处理所有用户界面的更新，通过Dom Diff算法尽可能少的减少Dom变化以提高性能。</p></li></ul>
<ul><li><p>声明式<br>当数据（状态）变化时，<strong>React</strong>内部知道该怎样去局部更新需要变化的部分视图。也就是说在在编程时我们只需要告诉<strong>React</strong>想要的是什么，而不需要告诉<strong>React</strong>怎么样一步步Dom操作才能到达需要的效果。可以参见<a href="http://stackoverflow.com/questions/33655534/difference-between-declarative-and-imperative-in-react-js" rel="nofollow noreferrer" target="_blank">这里</a>关于声明式和命令式编程的区别。</p></li></ul>
<h3 id="articleHeader2">为什么使用React</h3>
<p>选择React无非是看中了它所表现出的突出优点：</p>
<ol>
<li><p>组件化思想，使应用更加容易维护和复用</p></li>
<li><p>Virtual Dom使得React不仅可以在浏览器端渲染也可以运行在服务端，这为编写同构应用提供了可能</p></li>
<li><p>Dom Diff算法尽可能的减少Dom操作，提高应用的性能</p></li>
<li><p>单向数据流使应用逻辑可容易理解，基于状态的视图更新使应用状态可预测，便于测试</p></li>
</ol>
<p>当然React也不是完美的，它的JSX语法虽然提供了强大的功能，但它却将HTML结构分散进了JS文件中，不利于初学者对网页整体结构的把握，同时Css-in-js的写法也背离了Web标准倡导的表现结构逻辑分离的思想。如何取舍还要看实际情况。</p>
<h2 id="articleHeader3">快速开始React学习</h2>
<p>想要快速开始学习<strong>React</strong>，<a href="https://facebook.github.io/react/docs/tutorial.html" rel="nofollow noreferrer" target="_blank">官方tutorial</a>是个不错的选择，上面包含了构建<strong>React</strong>组件的关键性内容。如果你想亲手敲两行代码体验一下，你可以下载一个<a href="https://facebook.github.io/react/downloads/react-15.3.0.zip" rel="nofollow noreferrer" target="_blank">starter kit</a>，里面包含了相关依赖文件和一些实例，当然你也可以使用<a href="https://jsfiddle.net/reactjs/69z2wepo/" rel="nofollow noreferrer" target="_blank">jsfiddle</a><button class="btn btn-xs btn-default ml10 preview" data-url="reactjs/69z2wepo/" data-typeid="0">点击预览</button>在线体验。</p>
<h2 id="articleHeader4">JSX</h2>
<p><strong>JSX</strong>是<strong>React</strong>提供的用来快速创建<strong>React</strong>树节点的语法糖，它能够使用类似HTML的语法创建<strong>JavaScript</strong>对象，当然你也可以使用提供的<a href="https://facebook.github.io/react/docs/displaying-data.html#react-without-jsx" rel="nofollow noreferrer" target="_blank">api</a>手动创建。</p>
<p>例如我们事先创建了一个Nav组件，那么在对应的Dom节点渲染它时就可以像下面一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var navElement = <Nav className='nav' />;  //jsx语法，react会自动将其转换成javascript 对象
ReactDOM.render(navElement, /*真实dom节点*/);  //渲染" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> navElement = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Nav</span> <span class="hljs-attr">className</span>=<span class="hljs-string">'nav'</span> /&gt;</span>;  //jsx语法，react会自动将其转换成javascript 对象
ReactDOM.render(navElement, /*真实dom节点*/);  //渲染</span></code></pre>
<h3 id="articleHeader5">JavaScript 表达式</h3>
<p><strong>JSX</strong>语法的一个重要特点是能够使用JavaScript表达式，通过在属性值或子组件混入js表达式，能够轻易的写出更加复杂的组件，js表达式需要用一对大括号{}包裹起来。</p>
<p>例如属性值混入js表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//显示不同的样式类
var person = <Person className={window.isLoggedIn ? 'logged' : null />;
//输入框禁止输入
var input = <input type='button' disabled={false} />; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//显示不同的样式类</span>
<span class="hljs-keyword">var</span> person = &lt;Person className={window.isLoggedIn ? 'logged' : null /&gt;;
//输入框禁止输入
var input = &lt;input type='button' disabled={false} /&gt;; </code></pre>
<p>子组件混入js表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//根据isLoggedIn的值嵌入不同的子组件
var content = <Container> {window.isLoggedIn ? <Nav /> : <Login />}</Container>;

//数组循环创建多个子组件，key属性不能省略，否则会报错
var results = [1, 2, 3, 4];
var list = <ol>
            {results.map(function(result, index) {
                return <li key={index}>{result}</li>;
             })}
           </ol>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//根据isLoggedIn的值嵌入不同的子组件</span>
<span class="hljs-keyword">var</span> content = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Container</span>&gt;</span> {window.isLoggedIn ? <span class="hljs-tag">&lt;<span class="hljs-name">Nav</span> /&gt;</span> : <span class="hljs-tag">&lt;<span class="hljs-name">Login</span> /&gt;</span>}<span class="hljs-tag">&lt;/<span class="hljs-name">Container</span>&gt;</span></span>;

<span class="hljs-comment">//数组循环创建多个子组件，key属性不能省略，否则会报错</span>
<span class="hljs-keyword">var</span> results = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];
<span class="hljs-keyword">var</span> list = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
            {results.map(function(result, index) {
                return <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>{result}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>;
             })}
           <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span></span></code></pre>
<h3 id="articleHeader6">
<strong>JSX</strong>语法有几个需要注意的地方：</h3>
<ul>
<li><p>JSX既能解析React组件标签也能解析HTML标签，但是React组件必须是首字母大写，如上面的Container；HTML标签则照常小写即可，如ol</p></li>
<li><p>style属性值必须是JavaScript对象</p></li>
<li><p>JSX最外层的标签必须是唯一的，如果有多个可以用div标签将其包裹起来</p></li>
<li><p>因为JSX本身是JavaScript，HTML一些与JavaScript关键字有冲突的属性，如class、for都要转换成相应的className、htmlFor，更多不同参见<a href="https://facebook.github.io/react/docs/jsx-gotchas.html" rel="nofollow noreferrer" target="_blank">jsx-gotchas</a></p></li>
<li><p>循环创建多个同类子组件的时候，要带上key属性，且key值是唯一的，如上例的多个<strong>li</strong>标签</p></li>
</ul>
<h2 id="articleHeader7">组件</h2>
<p><strong>React</strong>提倡组件化思想，认为一个应用应该是多个互相独立的组件构成的大组件，每个组件只关心自己部分的逻辑。如下图的评论界面所示，一个评论组件CommentBoxComponent由CommentListComponent和FormBoxComponent组件组成，相应的CommentListComponent组件又由CommentItemComponent和ButtonComponent组成。</p>
<p><span class="img-wrap"><img data-src="/img/bVBo51" src="https://static.alili.tech/img/bVBo51" alt="组件划分" title="组件划分" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">组件的划分原则</h3>
<p>对于初学者而言，想要很好的对UI进行组件划分可能比较困难，但是遵循一些组件划分原则是有益的：</p>
<ol>
<li><p>单一职责，一个组件应该只做一件事情，当你发现在一个组件做了太多事情的时候，应该考虑将其拆分为更小的子组件。</p></li>
<li><p>根据数据模型拆分组件，因为React是基于数据来渲染UI，所以让你的组件仅仅是用来表现数据模型的某个部分通常是正确的选择。</p></li>
<li><p>构建纯组件，一个纯组件通常没有内部状态（state，后面会讲到），它用来渲染的数据完全来自于输入的props，使用相同的props来渲染相同的纯组件多次将得到相同的UI，不存在内部状态导致渲染不同。</p></li>
</ol>
<h3 id="articleHeader9">如何创建组件</h3>
<p><strong>React</strong>提供了createClass来创建组件，它接受一个对象作为参数，该对象包含一些属性和函数来具体描述一个组件，其中render函数是必须的，其他的状态初始化函数以及生命周期相关的函数都是可选的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//注意Component首字母大写
var Component = React.createClass({
  getIntialState: function(){}, //初始化组件状态
  getDefaultProps： function(){}, //初始化组件的默认属性
  
  propTypes: {}, //规定属性的存在性和类型
  
  //一些生命周期相关函数
  componentWillMount: function(){}, //组件被嵌入之前触发
  componentDidMount: function(){}, //组件被嵌入之后触发
  componentWillReceiveProps: function(){}, //当props有改变时触发
  componentWillUnmount: function(){}, //组件被注销之前触发
  //渲染函数，不能省略    
  render: function() {
    return <h1>Hello </h1> ;     
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//注意Component首字母大写</span>
<span class="hljs-keyword">var</span> Component = React.createClass({
  <span class="hljs-attr">getIntialState</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}, <span class="hljs-comment">//初始化组件状态</span>
  getDefaultProps： <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}, <span class="hljs-comment">//初始化组件的默认属性</span>
  
  propTypes: {}, <span class="hljs-comment">//规定属性的存在性和类型</span>
  
  <span class="hljs-comment">//一些生命周期相关函数</span>
  componentWillMount: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}, <span class="hljs-comment">//组件被嵌入之前触发</span>
  componentDidMount: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}, <span class="hljs-comment">//组件被嵌入之后触发</span>
  componentWillReceiveProps: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}, <span class="hljs-comment">//当props有改变时触发</span>
  componentWillUnmount: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}, <span class="hljs-comment">//组件被注销之前触发</span>
  <span class="hljs-comment">//渲染函数，不能省略    </span>
  render: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span> ;     
  }
});</code></pre>
<p>以上是ES5的写法，如果你看了一些脚手架项目，你会发现有些使用了ES6的语法，ES6创建组件的语法有很大的不同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Component extends React.Component {
  constructor() {
    super();
    this.state = {
    //组件状态
    };
  }
  static defaultProps = {
    //组件属性    
  };
  render() {
    return (
      <div onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.state = {
    <span class="hljs-comment">//组件状态</span>
    };
  }
  <span class="hljs-keyword">static</span> defaultProps = {
    <span class="hljs-comment">//组件属性    </span>
  };
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span>&gt;</span>
        You {text} this. Click to toggle.
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}</code></pre>
<p>我们可以看到使用了ES6语法的组件构建很像在编写面向对象编程时创建类，更多写法的不同，可以参见<a href="http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8" rel="nofollow noreferrer" target="_blank">es5-es6写法对照表</a>。</p>
<h2 id="articleHeader10">区分props和state</h2>
<p>前面我们有涉及props和state这个两个概念，这里做一下解释。</p>
<h3 id="articleHeader11">props</h3>
<p>当我们在使用定义好的组件时，可以向其添加一些属性，在组件定义的内部，可以通过this.props来访问这些属性，如下在render方法里渲染动态数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Component = React.createClass({
    getDefaultProps: function(){
      return {
        name: 'world'
      }
    },
    propTypes: {
    name: React.PropTypes.string //设置属性的类型
    },
    render: function(){
        return (
            <h1>Hello, {this.props.name}!</h1> //访问name属性
        );
    }
});

ReactDOM.render(<Component name=&quot;Handsome&quot; />, document.body);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Component = React.createClass({
    <span class="hljs-attr">getDefaultProps</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'world'</span>
      }
    },
    <span class="hljs-attr">propTypes</span>: {
    <span class="hljs-attr">name</span>: React.PropTypes.string <span class="hljs-comment">//设置属性的类型</span>
    },
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {this.props.name}!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span> <span class="hljs-comment">//访问name属性</span>
        );
    }
});

ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"Handsome"</span> /&gt;</span>, document.body);</span></code></pre>
<p>其中getDefaultProps用来设置默认的属性值，<a href="https://facebook.github.io/react/docs/reusable-components.html#prop-validation" rel="nofollow noreferrer" target="_blank">propTypes</a>来设置属性的类型，在使用时如果属性类型不匹配会提示。</p>
<p>this.props是只读的，它通常用来传递来自父组件的数据，也是<strong>React</strong>构建单向数据流的方式。</p>
<h3 id="articleHeader12">state</h3>
<p>相同的组件之所以能够表现出不一样的UI是因为它们内部拥有不同的状态（states），每个组件都可以拥有自己的state，并且可以在需要的时候通过props传递给子组件。组件可以通过setState函数来修改内部的状态，同时触发界面的渲染。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ParentComponent = React.createClass({
  getInitialState: function(){
    return {
      name: 'Tyler McGinnis',
      friend: 'Tom' 
    }
  },
  handleClick: function(e){
    this.setState({name: 'Tim'}); //更改状态
  },
  render: function(){
    return (
      <div>
        <h3> Name: {this.state.name} </h3>
        //点击触发事件，调用handleClick改变组件状态
        <button onClick={this.hanleClick}>change name</button>
        <Component name={this.state.friend} /> //传递状态到子组件
      </div>
    )
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ParentComponent = React.createClass({
  <span class="hljs-attr">getInitialState</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Tyler McGinnis'</span>,
      <span class="hljs-attr">friend</span>: <span class="hljs-string">'Tom'</span> 
    }
  },
  <span class="hljs-attr">handleClick</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">name</span>: <span class="hljs-string">'Tim'</span>}); <span class="hljs-comment">//更改状态</span>
  },
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span> Name: {this.state.name} <span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        //点击触发事件，调用handleClick改变组件状态
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.hanleClick}</span>&gt;</span>change name<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Component</span> <span class="hljs-attr">name</span>=<span class="hljs-string">{this.state.friend}</span> /&gt;</span> //传递状态到子组件
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
  }
});</span></code></pre>
<p>这里需要注意的是getInitialState是用来初始化组件内部状态的默认值，不要在该方法里面使用this.props，除非某个属性有明确的语义是被用来初始化state的，详细请参看<a href="https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h3 id="articleHeader13">diffrent</h3>
<p>props是只读的，不能够在组件内部修改，它是父组件向子组件传递数据的途径；state是组件自身的状态，它不能是父组件传递过来的数据，并且state是可以改变的。</p>
<p>合理的状态操作是创建多个只负责渲染数据的无状态（stateless）组件，在它们的上层创建一个有状态（stateful）组件并把它的状态通过 props 传给子组件。这个有状态的组件封装了所有用户的交互逻辑，而这些无状态组件则负责声明式地渲染数据。</p>
<h2 id="articleHeader14">生命周期</h2>
<p>如前面组件创建里提到，组件创建时可以提供几个生命周期函数，这些函数决定了组件在不同的时期进行的操作。</p>
<blockquote>
<p><strong>componentWillMount</strong>: 在初始化渲染执行前立即调用且仅调用一次。如果在这个方法内部调用setState并不会触发重新渲染，你可以将一些只需要执行一次的操作放在这个函数里。</p>
<p><strong>componentDidMount</strong>:在初始化渲染之后，立即调用一次，这个时候你可以访问虚拟Dom节点。我们可以在这个方法中与其他JavaScript框架进行集成、处理一些渲染后的逻辑（比如说绑定一些事件等）、发送Ajax请求或是设置定时器方法(setTimeout/setInterval)等。</p>
<p><strong>componentWillReceiveProps</strong>:初始化渲染时不会被调用，只有当props放生改变时才会被调用。该方法可以作为React在prop传入之后，render()方法执行之前更新state的合适时机。旧的props可以通过this.props获取到。</p>
<p><strong>componentWillUnmount</strong>:在组件从DOM中移除的时候立刻被调用我们可以在该方法中执行任何必要的清理，比如无效的定时器，或者清除在componentDidMount()中创建的DOM元素等。</p>
</blockquote>
<p>另外React还提供了一个用来优化渲染的周期函数<strong>shouldComponentUpdate</strong>，它可以用来判断一次状态改变是否需要重新渲染，更多生命周期函数介绍参见<a href="https://facebook.github.io/react/docs/component-specs.html" rel="nofollow noreferrer" target="_blank">这里</a></p>
<h2 id="articleHeader15">事件系统</h2>
<p><strong>React</strong>有内建的跨浏览器的<a href="https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#under-the-hood-autobinding-and-event-delegation" rel="nofollow noreferrer" target="_blank">事件系统</a>，你可以在组件里以添加属性的方式绑定事件和相应的处理函数，如上面例子中ParentComponent组件里通过设置onClick属性绑定事件的处理函数handleClick。这种事件绑定方法极大的方便了事件操作，不用再像以前先定位到Dom节点，再通过addEventListener绑定事件，还要用removeEventListener解绑。当组件注销时，react会自动帮我们解绑事件。更多React支持的事件，请参见<a href="https://facebook.github.io/react/docs/events.html" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h2 id="articleHeader16">进阶</h2>
<p>如果你是刚刚接触<strong>React</strong>，那么当你阅读官方的<a href="http://reactjs.cn/react/docs/tutorial.html" rel="nofollow noreferrer" target="_blank">tutorial</a>文档时，会觉得这玩意原来这么简单，无非是将页面功能组件化，调用为数不多的几个api，按照教程一步一步来很快就编写出一个评论应用。当你想利用脚手架快速搭建企业级的<strong>React</strong>开发环境时，你会也许会用到<a href="https://github.com/kriasoft/react-starter-kit" rel="nofollow noreferrer" target="_blank">react-starter-kit</a>，但是他却有点“名不符实”，因为匮乏的文档说明，让其对新手并不友好。相比之下<a href="https://github.com/erikras/react-redux-universal-hot-example" rel="nofollow noreferrer" target="_blank">react-redux-universal-hot-example</a>则更加易于理解和学习。值得注意的是学习<strong>React</strong>，仅仅是学习框架本身是不够，因为当你阅读代码的过程中，你会发现<strong>npm</strong>是基本的；<strong>webpack</strong>也是必须的；你还要知道<strong>ES6</strong>相关语法，相应的你要懂得使用<strong>Babel</strong>来转换<strong>ES5</strong>；更进阶你要开始学习全新的程序设计模式<strong>Flux</strong>和<strong>Redux</strong>来管理应用的状态等等。学习这些知识不可能一蹴而就，当你遇到某个解不开的点时，不妨先跳过，随着学习的深入，当你回头来看时就会有种恍然大悟的感觉。</p>
<h2 id="articleHeader17">资源索引</h2>
<p><a href="http://spyrestudios.com/the-only-react-js-tutorials-and-resources-youll-need/" rel="nofollow noreferrer" target="_blank">The Only React.js Tutorials and Resources You’ll Need</a>，介绍了很多React学校相关的资源，上面的每篇文章都值得一读。</p>
<p><a href="http://www.cocoachina.com/webapp/20150721/12692.html" rel="nofollow noreferrer" target="_blank">一看就懂的ReactJs入门教程（精华版）</a></p>
<p><a href="http://www.w3cplus.com/react/react-beginner-intro.html?utm_source=tuicool&amp;utm_medium=referral" rel="nofollow noreferrer" target="_blank">React的一些概念</a>对React的一些概念进行了阐述。</p>
<p><a href="https://tylermcginnis.com/react-js-tutorial-pt-1-a-comprehensive-guide-to-building-apps-with-react-js-8ce321b125ba#.8n8bgdfir" rel="nofollow noreferrer" target="_blank">React.js Tutorial Pt 1: A Comprehensive Guide to Building Apps with React.js</a> 非常不错的tutorial，作者思路很清晰，一步步讲解并且附有实例，系列文章还没更新完</p>
<p><a href="http://www.ruanyifeng.com/blog/2015/03/react" rel="nofollow noreferrer" target="_blank">React 入门实例教程</a>，阮一峰写的实例教程，里面包含了各个关键知识点的实例代码。</p>
<p><a href="http://www.oschina.net/question/2012764_242688" rel="nofollow noreferrer" target="_blank">es5-es6语法对比</a> ，比较详细的react es5-es6语法对照表，看完它对理解一些项目代码比较有用</p>
<p><a href="https://web-design-weekly.com/2015/01/29/opinionated-guide-react-js-best-practices-conventions/" rel="nofollow noreferrer" target="_blank">react style guide</a>，react 代码书写风格的一篇文章，遵守大家都在用的一些规则，对阅读源码很有帮助。</p>
<p><a href="http://imweb.io/topic/57711e37f0a5487b05f325b5" rel="nofollow noreferrer" target="_blank">浅谈 React、Flux 与 Redux</a>，对React、Flux、Redux之间的关系进行了很好的阐述。</p>
<p><a href="http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html" rel="nofollow noreferrer" target="_blank">Full-Stack Redux Tutorial</a>，这篇文章介绍了如何使用Redux构建同构应用，通过一个投票应用，全面介绍了整个开发流程，非常值得阅读。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React入门及资源指引

## 原文链接
[https://segmentfault.com/a/1190000006495917](https://segmentfault.com/a/1190000006495917)


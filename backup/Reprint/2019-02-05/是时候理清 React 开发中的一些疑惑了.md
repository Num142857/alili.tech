---
title: '是时候理清 React 开发中的一些疑惑了' 
date: 2019-02-05 2:30:09
hidden: true
slug: bahnaw6eleo
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>React其实很好上手，我在最初使用时并未去了解其一些细节性的东西，但是好像在项目中也一直能正常运作。但是那时总会有一种不安感，深感自己对React的使用逻辑并未理解得非常清晰，本文的目的就在于理清这种使用逻辑，当然个人见解定有偏颇，如果你有一些建议，也希望您能在讨论区予以指教，如果你到现在还没有怎么接触过React，推荐可以跟着<a href="https://facebook.github.io/react/docs/tutorial.html" rel="nofollow noreferrer" target="_blank">官方文档的例子</a>体会下React再来看本文，也许这样收获更大一些，后文的链接里还有一个更加高级的例子也是非常好的入门教程。</p></blockquote>
<h2 id="articleHeader0">为什么要使用 React</h2>
<p>这是一个老生常谈的问题了，可能大家在众多的教程、文章里已经了解过了React的好处，比如说它的虚拟DOM可以被高效的渲染，比如说它的组件化使得项目结构非常清晰，代码复用非常容易，比如说它的数据管理机制也能让你清晰的知晓数据的状态，而React本身就是被这种清晰的数据所驱动的。</p>
<blockquote><p>"We built React to solve one problem: building large applications with data that changes over time."</p></blockquote>
<p><strong>详细谈论这些优点前，我想说说React给我带来的改变。</strong></p>
<p>在使用React之前，我也一直在使用jQuery，它对节点的操作非常方便，如果仅仅只是普通网页的开发，jQuery无疑是非常好的，但是如果开发的是WebApp，jQuery并不能增强你对全局的把控能力，在学习使用React没多久以后突然有一天我感觉以前所做的开发都好像在玩一些小打小闹的游戏，而使用React也让自己明白了为什么我被称作前端工程师，这个框架让我找到了工程师的归属感，当我再看自己的项目时和一个建筑工程师看自己的设计图的感觉没了太多差别，我知道我的这个组件是房子的总体框架，这个组件是大厅，这个组件是椅子，还有与大厅同级的卧室组件，厨房组件，与椅子同级的桌子组件，家电组件。</p>
<p>我可以用优雅的桌子，椅子，床，台灯来布置一个温馨的卧室；<br>我可以把桌子压扁拉长变成电视柜，把椅子拉宽加上软软的海绵变成沙发，再把台灯提高，换一个像样的遮光罩它就是落地灯了，再加上一些客厅独有的家电，客厅的感觉也就出来了；<br>用相同的思路，一个温馨的家就出来了。</p>
<p>其实想想，如果只考虑客厅和卧室（不考虑里面的那些桌子椅子之类的组件）那么除却它们的长、宽、摆放位置这些参数不同，它们又有什么区别呢？</p>
<p>回到React，它即带给我们对整体的把控能力，也让我们可以通过修改数据（参数）以表现不同的细节达到不同的效果，从最大的房子的框架到每个桌子椅子的样子，一切都在我们的掌握。下面就慢慢说说React是如何帮我们达到把握全局，了解细节的。</p>
<h2 id="articleHeader1">从虚拟 DOM（Virtual DOM）说起</h2>
<p>想象这么一个场景，客厅里有一把我们不是很喜欢的椅子，想换一把，最合适的做法当然就是改造一下，或者把这把丢了重新买一把新的，为了换一把椅子而重新组装整个房子一看就是不聪明的做法。Virtual DOM为我们提供了一种高效的渲染机制，使得我们可以只改变我们想改变的地方，而尽量不去影响其它无关的组件。它是React高性能的基础。</p>
<h4>虚拟 DOM 究竟是什么？</h4>
<p>要说明Virtual DOM究竟是什么，不得不提到React DOM模块的一个方法，<code>ReactDOM.reader()</code>。</p>
<p>这个方法就像打开一道门的钥匙，门的两边就是Virtual DOM和Html DOM，我们在浏览器中看到的肯定是Html DOM，Virtual DOM存在于隔着这道门的系统内存之中，Html DOM和Virtual DOM之间存在着映射关系。<br>就像Html DOM由各种节点构成，Virtual DOM也是由一种被称为<code>React node</code>的节点构成。</p>
<p>每个React组件中还有另外一个<code>render()</code>方法（不同于<code>ReactDOM.reader()</code>），我的理解是这个方法用于将<code>ReactNode</code>构建为Virtual DOM。下面再来详细看看<code>React node</code>。</p>
<h4>React node</h4>
<blockquote><p>“a light, stateless, immutable, virtual representation of a DOM node.”</p></blockquote>
<p>React node其实并非真实的节点，实际上它们可以看做是真实节点在Virtual DOM中的代表，Virtual DOM就是由ReactNodes构成，真实的DOM就是依据它们所构建；</p>
<p>在需要改变真实的DOM时，React其实是先修改虚拟DOM，然后和真实的DOM做比较，在真实DOM中只改变需要改变的地方，这种补丁机制只改变局部，不改变整体，因此对系统性能的消耗较小，对虚拟DOM的修改会在状态改变时触发，后文会详细说明这种状态机制。可能大家也已经听说了二者之间的比较是基于diff算法，知乎上有一篇详细解析React的这个算法的<a href="https://zhuanlan.zhihu.com/p/20346379?refer=purerender" rel="nofollow noreferrer" target="_blank">文章</a>，推荐大家阅读。</p>
<p>一般来说创建React node有两种方法，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方法1，使用React 内置的工厂方法创建
var reactNodeLi = React.DOM.li({id:'li1'}, 'one');

//方法2，使用JavaScript创建node的方法
var reactNodeLi = React.createElement('li', null, 'one');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 方法1，使用React 内置的工厂方法创建</span>
<span class="hljs-keyword">var</span> reactNodeLi = React.DOM.li({<span class="hljs-attr">id</span>:<span class="hljs-string">'li1'</span>}, <span class="hljs-string">'one'</span>);

<span class="hljs-comment">//方法2，使用JavaScript创建node的方法</span>
<span class="hljs-keyword">var</span> reactNodeLi = React.createElement(<span class="hljs-string">'li'</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">'one'</span>);</code></pre>
<p>最近有一本开源的电子书<a href="https://www.gitbook.com/book/frontendmasters/react-enlightenment/details" rel="nofollow noreferrer" target="_blank">React Enlightenment</a>里有一章对React node有详细的介绍，也推荐大家阅读。</p>
<p>React提供的另外一种简洁，直观的创建React node的方法，那就是JSX，其实提到React，大家好像都会想到JSX，因为它实在是太方便了，其实使用React其实并非必须使用JSX，不过使用它真的能让我们的工作更加轻松。</p>
<h4>JSX</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var App = React.createClass({
  render: function() {
    return <p>My name is { this.props.name }</p>;
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> App = React.createClass({
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>My name is { this.props.name }<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;
  }
});</code></pre>
<p>上面例子里return中的那一部分就是JSX了，初看JSX的语法，可能大家会想到前端开发中经常使用到的模板，不过JSX并非模板，它应该算是React对JS语法的拓展，需要编译后才能正确使用它，JSX的构建是非常简洁明了的，在此就不再赘述。</p>
<h4>再说 Babel</h4>
<p>刚刚已经提及JSX是需要编译才能被浏览器识别的，它就是被Babel编译的，具体说来是被babel-preset-react来编译的。不过Babel的最主要目的其实并非编译JSX，Babel应该算是一个编译平台，其主要目的是转换你在代码中使用了的ES6甚至ES7语法为浏览器识别的ES5语法（babel-core,babel-preset-es2015模块），编译React倒像是其的附加功能。初学者有时候会觉得使用React困难，配置合适的开发环境可是就是原因之一。以前翻译过一篇基础的配置webpack的文章，具体可以<a href="https://segmentfault.com/a/1190000006178770?_ea=1088498">点这里</a>。</p>
<h2 id="articleHeader2">说到组件了（Component）</h2>
<p>除却高性能，组件是另外一个React非常吸引人的地方，组件的可复用性,可组合性以及其对模块化开发的天然适应性，使得我们的项目非常直观，便于理解和管理。拿到一个项目，最开始要想的就是如何来划分组件。当然划分肯定需要一些依据，先来看看React自己对组件的分类。</p>
<h4>划分并创建组件</h4>
<p>我在最初使用React时，我的项目里的所有的组件都是通过<code>React.createClass()</code>创建，所有的组件在里面可能都拥有<code>getInitialState(),componentDidMount()</code>等方法，当然这样用其实一点也没有问题。但是这样写，除非对项目非常熟悉，否则我们并不能很容易的就区分组件之间的层级关系。而且随着项目的复杂化，也不利于数据的管理。</p>
<h5>Stateful Component</h5>
<p>之前在<a href="http://wangfupeng.coding.me/share/2016/08/06/restruct-bdnews-webapp-by-react.html" rel="nofollow noreferrer" target="_blank">使用React重构百度新闻webapp前端</a>看到智能组件和木偶组件二词，我觉得它们可能可以分别对应到<code>Stateful Component</code>和<code>Stateless Component</code>,在此引用一下该文里的说法。</p>
<blockquote><p><strong>智能组件</strong> 它是数据的所有者，它拥有数据、且拥有操作数据的action，但是它不实现任何具体功能。它会将数据和操作action传递给子组件，让子组件来完成UI或者功能。这就是智能组件，也就是项目中的各个页面。</p></blockquote>
<p>这是一个完整的组件，在这种组件里可能会出现所有的React提供的方法（包括各种生命周期函数<code>life cycle methods</code>,各种事件响应函数等等）</p>
<p>创建：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//ES5 写法
var App = React.createClass({
getInitialState(){
    return{
    name:&quot;Tom&quot;,
    ...
    }
},

componentDidMount(){
    this.setState({
        name:&quot;Jim&quot;
    })
},

  render: function() {
    return <p>My name is { this.state.name }</p>;
  }
});

// ES6 写法
class SearchBar extends React.Component {
      constructor(props) {//props需要作为参数传入
            super(props);//需要使用super，如果没有this就会是undefined
            this.state = {
              searchTerm: '',
            };
            this.handleInputChange = this.handleInputChange.bind(this);//为事件绑定this，这是ES6语法所要求的，ES5并没相关要求
      }

      handleInputChange(event) {
        this.setState({
              searchTerm: event.target.value,
        });
      }

      render() {
            return <input onChange={this.handleInputChange} />;
      }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//ES5 写法</span>
<span class="hljs-keyword">var</span> App = React.createClass({
getInitialState(){
    <span class="hljs-keyword">return</span>{
    <span class="hljs-attr">name</span>:<span class="hljs-string">"Tom"</span>,
    ...
    }
},

componentDidMount(){
    <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">name</span>:<span class="hljs-string">"Jim"</span>
    })
},

  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>My name is { this.state.name }<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;
  }
});

<span class="hljs-comment">// ES6 写法</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SearchBar</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
      <span class="hljs-keyword">constructor</span>(props) {<span class="hljs-comment">//props需要作为参数传入</span>
            <span class="hljs-keyword">super</span>(props);<span class="hljs-comment">//需要使用super，如果没有this就会是undefined</span>
            <span class="hljs-keyword">this</span>.state = {
              <span class="hljs-attr">searchTerm</span>: <span class="hljs-string">''</span>,
            };
            <span class="hljs-keyword">this</span>.handleInputChange = <span class="hljs-keyword">this</span>.handleInputChange.bind(<span class="hljs-keyword">this</span>);<span class="hljs-comment">//为事件绑定this，这是ES6语法所要求的，ES5并没相关要求</span>
      }

      handleInputChange(event) {
        <span class="hljs-keyword">this</span>.setState({
              <span class="hljs-attr">searchTerm</span>: event.target.value,
        });
      }

      render() {
            <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.handleInputChange}</span> /&gt;</span>;
      }
}</span></code></pre>
<p>两种写法其实没有本质区别，ES6语法也会通过Babel转换为ES5语法后被执行，但是两种写法里确实存在一些不一样的地方，比如说使用ES6时需要单独绑定<code>this</code>，ES6语法里方法之间不能使用逗号<code>,</code>等等。网上可以查到很多相关资料，在此不做赘述。</p>
<h5>Stateless Component</h5>
<blockquote><p><strong>木偶组件</strong>：它就是一个工具，不拥有任何数据、及操作数据的action，给它什么数据它就显示什么数据，给它什么方法，它就调用什么方法，比较傻。这就是木偶组件，即项目中的各个组件。</p></blockquote>
<p>这种组件里只会出现，React提供的<code>render()</code>方法,用于构建虚拟DOM，其创建方式除了ES5，ES6的写法，还可以使用<code>Stateless Functions</code>方法创建。</p>
<p>创建：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//ES5
var HelloMessage = React.createClass({
    render(){
        return <div>Hello {props.name}</div> //多个节点时需要加括号
    }
})

//ES6
class HelloMessage extends React.Component {
        constructor(props) {//props需要作为参数传入
            super(props);//需要使用super，如果没有this就会是undefined
            }
            
            render() {
            return <div>Hello {props.name}</div>;
      }
}

//Stateless Functions
function HelloMessage(props) {
  return <div>Hello {props.name}</div>;
}

//ES6 Stateless Functions
const HelloMessage = (props) => <div>Hello {props.name}</div>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//ES5</span>
<span class="hljs-keyword">var</span> HelloMessage = React.createClass({
    render(){
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span> <span class="hljs-comment">//多个节点时需要加括号</span>
    }
})

<span class="hljs-comment">//ES6</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloMessage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
        <span class="hljs-keyword">constructor</span>(props) {<span class="hljs-comment">//props需要作为参数传入</span>
            <span class="hljs-keyword">super</span>(props);<span class="hljs-comment">//需要使用super，如果没有this就会是undefined</span>
            }
            
            render() {
            <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
      }
}

<span class="hljs-comment">//Stateless Functions</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">HelloMessage</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">//ES6 Stateless Functions</span>
<span class="hljs-keyword">const</span> HelloMessage = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> &lt;div&gt;Hello {props.name}&lt;<span class="hljs-regexp">/div&gt;;</span></code></pre>
<h4>模块和组件</h4>
<p>如若需要，所有的React组件都是可以当做模块被导出的，不过就就我本人看来，一般所导出的模块都是由一个或者若干个组件组成的功能单元。不过说到这里更想说明的一点时，React其实是很依赖类似于webpack这样的模块管理工具的，所以想要用好React，其实也需要对模块的定义，以及模块管理工具有一点的了解。</p>
<h2 id="articleHeader3">有生命的组件</h2>
<p>React里的组件是活的，组件不仅仅有类似于出生，成长，死亡的过程，还有心脏和血液。</p>
<h4>生命周期函数 life cycle methods</h4>
<p>组件的生命周期函数可以分为三个阶段：</p>
<ul>
<li>
<p>Mounting Phase（此阶段的函数在一个组件的生命中只会执行一次）（挂载阶段）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- getInitialState()
- componentWillMount()
- componentDidMount()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> getInitialState()
</span>-<span class="ruby"> componentWillMount()
</span>-<span class="ruby"> componentDidMount()</span></code></pre>
</li>
<li>
<p>Updating Phase（此阶段的函数在一个组件的生命中可别多次执行）（更新阶段）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- componentWillReceiveProps()
- shouldComponentUpdate()
- componentWillUpdate()
- componentDidUpdate()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> componentWillReceiveProps()
</span>-<span class="ruby"> shouldComponentUpdate()
</span>-<span class="ruby"> componentWillUpdate()
</span>-<span class="ruby"> componentDidUpdate()</span></code></pre>
</li>
<li>
<p>Unmount Phase （此阶段的函数在一个组件的生命中只会执行一次）（卸载阶段）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- componentWillUnmount()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code style="word-break: break-word; white-space: initial;"><span class="hljs-bullet">- </span>componentWillUnmount()</code></pre>
</li>
</ul>
<p>关于各个函数的具体意义，在此不在赘述，一个比较容易出错的地方是弄明白各个函数的执行顺序，下面给出一个参考列表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- Mounting Phase：
    1. Initialize / Construction
    2. getDefaultProps() (React.createClass) or MyComponent.defaultProps (ES6 class)
    3. getInitialState() (React.createClass) or this.state = ... (ES6 constructor)
    4. componentWillMount()
    5. render()
    6. Children initialization &amp; life cycle kickoff
    7. componentDidMount()

- Updating Phase follows this order:
    1. componentWillReceiveProps()
    2. shouldComponentUpdate()
    3. render()
    4. Children Life cycle methods
    5. componentWillUpdate()

- Unmount Phase follows this order:
    1. componentWillUnmount()
    2. Children Life cycle methods
    3. Instance destroyed for Garbage Collection" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>- Mounting Phase：
    <span class="hljs-number">1</span>. Initialize / Construction
    <span class="hljs-number">2</span>. getDefaultProps() (React.createClass) <span class="hljs-keyword">or</span> MyComponent.defaultProps (ES6 <span class="hljs-keyword">class</span>)
    <span class="hljs-number">3</span>. getInitialState() (React.createClass) <span class="hljs-keyword">or</span> this.state = ... (ES6 <span class="hljs-function"><span class="hljs-keyword">constructor</span>)
    4. <span class="hljs-title">componentWillMount</span><span class="hljs-params">()</span>
    5. <span class="hljs-title">render</span><span class="hljs-params">()</span>
    6. <span class="hljs-title">Children</span> <span class="hljs-title">initialization</span> &amp; <span class="hljs-title">life</span> <span class="hljs-title">cycle</span> <span class="hljs-title">kickoff</span>
    7. <span class="hljs-title">componentDidMount</span><span class="hljs-params">()</span>

- <span class="hljs-title">Updating</span> <span class="hljs-title">Phase</span> <span class="hljs-title">follows</span> <span class="hljs-title">this</span> <span class="hljs-title">order</span>:</span>
    <span class="hljs-number">1</span>. componentWillReceiveProps()
    <span class="hljs-number">2</span>. shouldComponentUpdate()
    <span class="hljs-number">3</span>. render()
    <span class="hljs-number">4</span>. Children Life cycle methods
    <span class="hljs-number">5</span>. componentWillUpdate()

- Unmount Phase follows this <span class="hljs-keyword">order</span>:
    <span class="hljs-number">1</span>. componentWillUnmount()
    <span class="hljs-number">2</span>. Children Life cycle methods
    <span class="hljs-number">3</span>. Instance destroyed <span class="hljs-keyword">for</span> Garbage Collection</code></pre>
<h4>组件的生命之源-state</h4>
<p>用过React的人都知道，<code>this.setState({})</code>可能算是React里使用最多的方法了，每次使用都会根据所更新的数据重构Virtual DOM已达到更新组件的目的，使得组件充满活力，满足我们的各种要求。</p>
<p>state在getInitialState()阶段被初始化，之后通过其它生命周期函数（<code>componentWillUpdate()</code>里不能使用）或React事件调用的函数，可以使用利用<code>this.setState({})</code>更新某一state的值。</p>
<p>我在最初使用React时总觉得，使用了过多的<code>this.setState({})</code>会不会导致React变得性能低下，不过阅读了<a href="https://zhuanlan.zhihu.com/p/20328570?refer=purerender" rel="nofollow noreferrer" target="_blank">这篇文章</a>打消了我的一些疑惑。</p>
<h4>组件的血液-props</h4>
<p>为什么把<code>props</code>比作血液呢，因为它本身自己并不会变化，它就像是一个传输的中介，把父组件的方法，属性传递给子组件。一般在子组件中它可能有三方面的作用</p>
<ul>
<li><p>作为子组件的属性<code>&lt;div className="this.props.className"&gt;作为属性&lt;/div&gt;</code>；</p></li>
<li><p>作为参数<code>&lt;div&gt;{"我的名字是"+this.props.name}&lt;/div&gt;</code>;</p></li>
<li><p>传递方法<code>&lt;div onClick="this.props.click"&gt;传递方法&lt;/div&gt;</code>;</p></li>
</ul>
<p>配合<code>state</code>，props可以用来改变子组件的表现形式，如果用来传递方法，<code>props</code>可以在子组件中调用父组件的方法。</p>
<p>在开发时，props还可以配合<code>propTypes</code>使用，这样可以使得props的使用更加准确（如下例），也使得组件更加健壮。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const AlbumList = (props) => {
  const albums = props.albums.map((album) => <li>{album.name}</li>);
 
  return (
    <ul>
      {albums}
    </ul>
  );
};
 
AlbumList.propTypes = {
  albums: React.PropTypes.array.isRequired,
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> AlbumList = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> albums = props.albums.map(<span class="hljs-function">(<span class="hljs-params">album</span>) =&gt;</span> &lt;li&gt;{album.name}&lt;<span class="hljs-regexp">/li&gt;);
 
  return (
    &lt;ul&gt;
      {albums}
    &lt;/u</span>l&gt;
  );
};
 
AlbumList.propTypes = {
  <span class="hljs-attr">albums</span>: React.PropTypes.array.isRequired,
};</code></pre>
<h2 id="articleHeader4">一点小结</h2>
<p>本文只总结了我对React的最基础的部分的一些思考，类似于高阶组件，Redux这类的目前我并未接触过多的知识和以及一些类似于React中的事件这类的较容易理解的知识没做过多的叙述，至于Routing这类构建app的知识，以后有机会一定会再和大家分享。</p>
<p>对于刚刚接触React的童鞋，可能看完依旧是云里雾里，不过本文实在算不上教程，初学者可能还是得看比较靠谱的教程。</p>
<p>之前看过一个一个比较好的React学习路径推荐在此也分享给大家，希望对大家的React学习有帮助</p>
<ul>
<li><p>学习React的基本知识；</p></li>
<li><p>熟悉npm</p></li>
<li><p>熟悉JavaScript的打包工具</p></li>
<li><p>了解ES6</p></li>
<li><p>学习Routing和flux（redux）</p></li>
</ul>
<p>最后还要做一个小广告，或者其实也算是对自己的一个激励和监督，之前和 <a href="https://www.gitbook.com/book/frontendmasters/react-enlightenment/details" rel="nofollow noreferrer" target="_blank">React Enlightenment</a>这本开源书的作者联系，他也非常愿意自己的书能让更多人有收获，所以就同意我把这本书翻译为汉语了。这本书目前一共八章，这本书，上周我看就看完了，感觉有很大收获，对初学者也比较友好，应该好好看一道，React肯定就入门了，我打算是每三四天翻译一章，然后也发布在此处，欢迎大家关注，希望和大家一起进步。</p>
<h2 id="articleHeader5">参考</h2>
<ul>
<li><p><a href="http://patternhatch.com/2016/07/06/a-primer-on-the-react-ecosystem-part-1-of-3/" rel="nofollow noreferrer" target="_blank">A Primer on the React Ecosystem: Part 1 of 3</a></p></li>
<li><p><a href="http://patternhatch.com/2016/08/02/a-primer-on-the-react-ecosystem-part-2-of-3/" rel="nofollow noreferrer" target="_blank">A Primer on the React Ecosystem: Part 2 of 3</a></p></li>
<li><p><a href="https://zhuanlan.zhihu.com/p/20346379?refer=purerender" rel="nofollow noreferrer" target="_blank">React 源码剖析系列 － 不可思议的 react diff</a></p></li>
<li><p><a href="https://www.gitbook.com/book/frontendmasters/react-enlightenment/details" rel="nofollow noreferrer" target="_blank">React Enlightenment</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006178770?_ea=1088498">入门 Webpack，看这篇就够了</a></p></li>
<li><p><a href="https://zhuanlan.zhihu.com/p/20328570?refer=purerender" rel="nofollow noreferrer" target="_blank">React 源码剖析系列 － 解密 setState</a></p></li>
<li><p><a href="https://zhangwang1990.gitbooks.io/reactenlightenment/content/" rel="nofollow noreferrer" target="_blank">React Enlightenment译文地址</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
是时候理清 React 开发中的一些疑惑了

## 原文链接
[https://segmentfault.com/a/1190000006685370](https://segmentfault.com/a/1190000006685370)


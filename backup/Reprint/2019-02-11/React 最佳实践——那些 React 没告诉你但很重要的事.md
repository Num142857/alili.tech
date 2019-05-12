---
title: 'React 最佳实践——那些 React 没告诉你但很重要的事' 
date: 2019-02-11 2:30:49
hidden: true
slug: 86zg7e14m3y
categories: [reprint]
---

{{< raw >}}

                    
<p>前言：对很多 react 新手来说，网上能找到的资源大都是些简单的 tutorial ，它们能教会你如何使用 react ，但并不会告诉你怎么在实际项目中优雅的组织和编写 react 代码。用谷歌搜中文“ React 最佳实践”发现前两页几乎全都是同一篇国外文章的译文...所以我总结了下自己过去那个项目使用 React 踩过的一些坑，也整理了一些别人的观点，希望对部分 react 使用者有帮助。</p>
<h2 id="articleHeader0">React 与 AJAX</h2>
<p>React只负责处理View这一层，它本身不涉及网络请求/AJAX，所以这里我们需求考虑两个问题：</p>
<ul>
<li><p>第一，用什么技术从服务端获取数据；</p></li>
<li><p>第二，获取到的数据应该放在react组件的什么位置。</p></li>
</ul>
<p>React官方提供了一种解决方案：<a href="https://facebook.github.io/react/tips/initial-ajax.html" rel="nofollow noreferrer" target="_blank">Load Initial Data via AJAX</a></p>
<p>使用jQuery的Ajax方法，在一个组件的<code>componentDidMount()</code>中发ajax请求，拿到的数据存在组件自己的<code>state</code>中，并调用<code>setState</code>方法去更新UI。如果是异步获取数据，则在<code>componentWillUnmount</code>中取消发送请求。</p>
<p>如果只是为了使用jQuery的Ajax方法就引入整个jQuery库，既是一种浪费又加大了整个应用的体积。那我们还有什么其他的选择吗？事实上是有很多的：<a href="https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch" rel="nofollow noreferrer" target="_blank">fetch()</a>、<a href="https://github.com/github/fetch" rel="nofollow noreferrer" target="_blank">fetch polyfill</a>、<a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">axios</a>...其中最需要我们关注的是<code>window.fetch()</code>,它是一个简洁、标准化的javascript的Ajax API。在Chrome和Firefox中已经可以使用，如果需要兼容其他浏览器，可以使用fetch polyfill。</p>
<p>React官方文档只告诉了我们在一个单一组件中如何通过ajax从服务器端获取数据，但并没有告诉我们在一个完整的实际项目中到底应该把数据存在哪些组件中，这部分如果缺乏规范的话，会导致整个项目变得混乱、难以维护。下面给出三种比较好的实践：</p>
<h5>1. 所有的数据请求和管理都存放在唯一的一个根组件</h5>
<p>让父组件/根组件集中发送所有的ajax请求，把从服务端获取的数据统一存放在这个组件的state中，再通过props把数据传给子组件。这种方法主要是针对组件树不是很复杂的小型应用。缺点就是当组件树的层级变多了以后，需要把数据一层一层地传给子组件，写起来麻烦，性能也不好。</p>
<h5>2. 设置多个容器组件专门处理数据请求和管理</h5>
<p>其实跟第一种方法类似，只不过设置多个容器组件来负责数据请求和状态管理。这里我们需要区分两种不同类型的组件，一种是展示性组件（presentational component），另一种是容器性组件（container component）。展示性组件本身不拥有任何状态，所有的数据都从容器组件中获得，在容器组件中发送ajax请求。两者更详细的描述，可以阅读下这篇文章：<a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.ch9xqg6s4" rel="nofollow noreferrer" target="_blank">Presentational and Container Components</a></p>
<p>一个具体的例子：</p>
<p>假设我们需要展示用户的姓名和头像，首先创建一个展示性组件<code>&lt;UserProfile /&gt;</code>,它接受两个Props：<code>name</code>和<code>profileImage</code>。这个组件内部没有任何关于Ajax的代码。</p>
<p>然后创建一个容器组件<code>&lt;UserProfileContainer /&gt;</code>，它接受一个<code>userId</code>的参数，发送Ajax请求从服务器获取数据存在<code>state</code>中，再通过<code>props</code>传给<code>&lt;UserProfile /&gt;</code>组件。</p>
<h5>3. 使用Redux或Relay的情况</h5>
<p>Redux管理状态和数据，Ajax从服务器端获取数据，所以很显然当我们使用了Redux时，应该把所有的网络请求都交给redux来解决。具体来说，应该是放在<a href="http://redux.js.org/docs/advanced/AsyncActions.html" rel="nofollow noreferrer" target="_blank">Async Actions</a>。如果用其他类Flux库的话，解决方式都差不多，都是在actions中发送网络请求。</p>
<p>Relay是Facebook官方推出的一个库。如果用它的话，我们只需要通过GraphQL来声明组件需要的数据，Relay会自动地把下载数据并通过props往下传递。不过想要用Relay，你得先有一个GraphQL的服务器...</p>
<h2 id="articleHeader1">一个标准组件的组织结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 class definition
    1.1 constructor
        1.1.1 event handlers
    1.2 'component' lifecycle events
    1.3 getters
    1.4 render
2 defaultProps
3 proptypes" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-number">1</span> <span class="hljs-keyword">class</span> definition
    <span class="hljs-number">1.1</span> <span class="hljs-function"><span class="hljs-keyword">constructor</span>
        1.1.1 <span class="hljs-title">event</span> <span class="hljs-title">handlers</span>
    1.2 '<span class="hljs-title">component</span>' <span class="hljs-title">lifecycle</span> <span class="hljs-title">events</span>
    1.3 <span class="hljs-title">getters</span>
    1.4 <span class="hljs-title">render</span>
2 <span class="hljs-title">defaultProps</span>
3 <span class="hljs-title">proptypes</span></span></code></pre>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person extends React.Component {
  constructor (props) {
    super(props);

    this.state = { smiling: false };

    this.handleClick = () => {
      this.setState({smiling: !this.state.smiling});
    };
  }

  componentWillMount () {
    // add event listeners (Flux Store, WebSocket, document, etc.)
  },

  componentDidMount () {
    // React.getDOMNode()
  },

  componentWillUnmount () {
    // remove event listeners (Flux Store, WebSocket, document, etc.)
  },

  get smilingMessage () {
    return (this.state.smiling) ? &quot;is smiling&quot; : &quot;&quot;;
  }

  render () {
    return (
      <div onClick={this.handleClick}>
        {this.props.name} {this.smilingMessage}
      </div>
    );
  },
}

Person.defaultProps = {
  name: 'Guest'
};

Person.propTypes = {
  name: React.PropTypes.string
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> <span class="hljs-title">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span> (props) {
    <span class="hljs-keyword">super</span>(props);

    <span class="hljs-keyword">this</span>.state = { smiling: <span class="hljs-literal">false</span> };

    <span class="hljs-keyword">this</span>.handleClick = () =&gt; {
      <span class="hljs-keyword">this</span>.setState({smiling: !<span class="hljs-keyword">this</span>.state.smiling});
    };
  }

  componentWillMount () {
    <span class="hljs-comment">// add event listeners (Flux Store, WebSocket, document, etc.)</span>
  },

  componentDidMount () {
    <span class="hljs-comment">// React.getDOMNode()</span>
  },

  componentWillUnmount () {
    <span class="hljs-comment">// remove event listeners (Flux Store, WebSocket, document, etc.)</span>
  },

  <span class="hljs-keyword">get</span> smilingMessage () {
    <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.state.smiling) ? <span class="hljs-string">"is smiling"</span> : <span class="hljs-string">""</span>;
  }

  render () {
    <span class="hljs-keyword">return</span> (
      &lt;div onClick={<span class="hljs-keyword">this</span>.handleClick}&gt;
        {<span class="hljs-keyword">this</span>.props.name} {<span class="hljs-keyword">this</span>.smilingMessage}
      &lt;/div&gt;
    );
  },
}

Person.defaultProps = {
  name: <span class="hljs-string">'Guest'</span>
};

Person.propTypes = {
  name: React.PropTypes.string
};</code></pre>
<p>以上示例代码的来源：<a href="https://github.com/planningcenter/react-patterns#component-organization" rel="nofollow noreferrer" target="_blank">https://github.com/planningcenter/react-patterns#component-organization</a></p>
<h2 id="articleHeader2">使用 PropTypes 和 getDefaultProps()</h2>
<ol>
<li><p>一定要写PropTypes，切莫为了省事而不写</p></li>
<li>
<p>如果一个Props不是requied，一定在getDefaultProps中设置它</p>
<p><code>React.PropTypes</code>主要用来验证组件接收到的props是否为正确的数据类型，如果不正确，console中就会出现对应的warning。出于性能方面的考虑，这个API只在开发环境下使用。</p>
</li>
</ol>
<p>基本使用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="propTypes: {
    myArray: React.PropTypes.array,
    myBool: React.PropTypes.bool,
    myFunc: React.PropTypes.func,
    myNumber: React.PropTypes.number,
    myString: React.PropTypes.string，
     
     // You can chain any of the above with `isRequired` to make sure a warning
    // is shown if the prop isn't provided.
    requiredFunc: React.PropTypes.func.isRequired
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>propTypes: {
    myArray: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.array</span>,
    myBool: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.bool</span>,
    myFunc: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.func</span>,
    myNumber: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.number</span>,
    myString: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.string</span>，
     
     <span class="hljs-comment">// You can chain any of the above with `isRequired` to make sure a warning</span>
    <span class="hljs-comment">// is shown if the prop isn't provided.</span>
    requiredFunc: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.func</span><span class="hljs-selector-class">.isRequired</span>
}</code></pre>
<p>假如我们props不是以上类型，而是拥有复杂结构的对象怎么办？比如下面这个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  text: 'hello world',
  numbers: [5, 2, 7, 9],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">text</span>: <span class="hljs-string">'hello world'</span>,
  numbers: [<span class="hljs-number">5</span>, <span class="hljs-number">2</span>, <span class="hljs-number">7</span>, <span class="hljs-number">9</span>],
}</code></pre>
<p>当然，我们可以直接用<code>React.PropTypes.object</code>,但是对象内部的数据我们却无法验证。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="propTypes: {
  myObject: React.PropTypes.object,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">propTypes</span>: {
  <span class="hljs-attribute">myObject</span>: React.PropTypes.object,
}</code></pre>
<p>进阶使用方法：<code>shape()</code> 和 <code>arrayOf()</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="propTypes: {
  myObject: React.PropTypes.shape({
    text: React.PropTypes.string,
    numbers: React.PropTypes.arrayOf(React.PropTypes.number),
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>propTypes: {
  myObject: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.shape</span>({
    text: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.string</span>,
    numbers: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.arrayOf</span>(React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.number</span>),
  })
}</code></pre>
<p>下面是一个更复杂的Props：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  {
    name: 'Zachary He',
    age: 13,
    married: true,
  },
  {
    name: 'Alice Yo',
    name: 17,
  },
  {
    name: 'Jonyu Me',
    age: 20,
    married: false,
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">[</span>
  <span class="hljs-string">{</span>
<span class="hljs-attr">    name:</span> <span class="hljs-string">'Zachary He'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    age:</span> <span class="hljs-number">13</span><span class="hljs-string">,</span>
<span class="hljs-attr">    married:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
  <span class="hljs-string">},</span>
  <span class="hljs-string">{</span>
<span class="hljs-attr">    name:</span> <span class="hljs-string">'Alice Yo'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    name:</span> <span class="hljs-number">17</span><span class="hljs-string">,</span>
  <span class="hljs-string">},</span>
  <span class="hljs-string">{</span>
<span class="hljs-attr">    name:</span> <span class="hljs-string">'Jonyu Me'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    age:</span> <span class="hljs-number">20</span><span class="hljs-string">,</span>
<span class="hljs-attr">    married:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">]</span></code></pre>
<p>综合上面，写起来应该就不难了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="propTypes: {
    myArray: React.PropTypes.arrayOf(
        React.propTypes.shape({
            name: React.propTypes.string.isRequired,
            age: React.propTypes.number.isRequired,
            married: React.propTypes.bool
        })
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>propTypes: {
    myArray: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.arrayOf</span>(
        React<span class="hljs-selector-class">.propTypes</span><span class="hljs-selector-class">.shape</span>({
            name: React<span class="hljs-selector-class">.propTypes</span><span class="hljs-selector-class">.string</span><span class="hljs-selector-class">.isRequired</span>,
            age: React<span class="hljs-selector-class">.propTypes</span><span class="hljs-selector-class">.number</span><span class="hljs-selector-class">.isRequired</span>,
            married: React<span class="hljs-selector-class">.propTypes</span><span class="hljs-selector-class">.bool</span>
        })
    )
}</code></pre>
<h2 id="articleHeader3">把计算和条件判断都交给 <code>render()</code> 方法吧</h2>
<h5>1. 组件的state中不能出现props</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // BAD:
  constructor (props) {
    this.state = {
      fullName: `${props.firstName} ${props.lastName}`
    };
  }

  render () {
    var fullName = this.state.fullName;
    return (
      <div>
        <h2>{fullName}</h2>
      </div>
    );
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-comment">// BAD:</span>
  <span class="hljs-keyword">constructor</span> (props) {
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">fullName</span>: <span class="hljs-string">`<span class="hljs-subst">${props.firstName}</span> <span class="hljs-subst">${props.lastName}</span>`</span>
    };
  }

  render () {
    <span class="hljs-keyword">var</span> fullName = <span class="hljs-keyword">this</span>.state.fullName;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{fullName}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// GOOD: 
render () {
  var fullName = `${this.props.firstName} ${this.props.lastName}`;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// GOOD: </span>
render () {
  <span class="hljs-keyword">var</span> fullName = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.props.firstName}</span> <span class="hljs-subst">${<span class="hljs-keyword">this</span>.props.lastName}</span>`</span>;
}</code></pre>
<p>当然，复杂的display logic也应该避免全堆放在render()中，因为那样可能导致整个render()方法变得臃肿，不优雅。我们可以把一些复杂的逻辑通过helper function移出去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// GOOD: helper function
renderFullName () {
  return `${this.props.firstName} ${this.props.lastName}`;
}

render () {
  var fullName = this.renderFullName();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// GOOD: helper function</span>
renderFullName () {
  <span class="hljs-keyword">return</span> `${<span class="hljs-keyword">this</span>.props.firstName} ${<span class="hljs-keyword">this</span>.props.lastName}`;
}

render () {
  <span class="hljs-keyword">var</span> fullName = <span class="hljs-keyword">this</span>.renderFullName();
}</code></pre>
<h5>2. 保持state的简洁，不要出现计算得来的state</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// WRONG:
  constructor (props) {
    this.state = {
      listItems: [1, 2, 3, 4, 5, 6],
      itemsNum: this.state.listItems.length
    };
  }
  render() {
      return (
          <div>
              <span>{this.state.itemsNum}</span>
          </div>
      )
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// WRONG:
  constructor (props) {
    this.<span class="hljs-keyword">state</span> = {
      listItems: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>],
      itemsNum: this.<span class="hljs-keyword">state</span>.listItems.length
    };
  }
  render() {
      return (
          <span class="hljs-variable">&lt;div&gt;</span>
              <span class="hljs-variable">&lt;span&gt;</span>{this.<span class="hljs-keyword">state</span>.itemsNum}&lt;/span&gt;
          &lt;/div&gt;
      )
  }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Right:
render () {
  var itemsNum = this.state.listItems.length;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// Right:
render () {
  var itemsNum = this.<span class="hljs-keyword">state</span>.listItems.length;
}</code></pre>
<h5>3. 能用三元判断符，就不用If，直接放在render()里</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// BAD: 
renderSmilingStatement () {
    if (this.state.isSmiling) {
        return <span>is smiling</span>;
    }else {
        return '';
    }
},

render () {
  return <div>{this.props.name}{this.renderSmilingStatement()}</div>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// BAD: </span>
renderSmilingStatement () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.isSmiling) {
        <span class="hljs-keyword">return</span> &lt;span&gt;<span class="hljs-keyword">is</span> smiling&lt;/span&gt;;
    }<span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>;
    }
},

render () {
  <span class="hljs-keyword">return</span> &lt;div&gt;{<span class="hljs-keyword">this</span>.props.name}{<span class="hljs-keyword">this</span>.renderSmilingStatement()}&lt;/div&gt;;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// GOOD: 
render () {
  return (
    <div>
      {this.props.name}
      {(this.state.smiling)
        ? <span>is smiling</span>
        : null
      }
    </div>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// GOOD: </span>
render () {
  <span class="hljs-keyword">return</span> (
    &lt;div&gt;
      {<span class="hljs-keyword">this</span>.props.name}
      {(<span class="hljs-keyword">this</span>.state.smiling)
        ? &lt;span&gt;<span class="hljs-keyword">is</span> smiling&lt;/span&gt;
        : <span class="hljs-literal">null</span>
      }
    &lt;/div&gt;
  );
}</code></pre>
<h5>4. 布尔值都不能搞定的，交给IIFE吧</h5>
<p><a href="https://en.wikipedia.org/wiki/Immediately-invoked_function_expression" rel="nofollow noreferrer" target="_blank">Immediately-invoked function expression</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return (
  <section>
    <h1>Color</h1>
    <h3>Name</h3>
    <p>{this.state.color || &quot;white&quot;}</p>
    <h3>Hex</h3>
    <p>
      {(() => {
        switch (this.state.color) {
          case &quot;red&quot;:   return &quot;#FF0000&quot;;
          case &quot;green&quot;: return &quot;#00FF00&quot;;
          case &quot;blue&quot;:  return &quot;#0000FF&quot;;
          default:      return &quot;#FFFFFF&quot;;
        }
      })()}
    </p>
  </section>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>return (
  <span class="hljs-variable">&lt;section&gt;</span>
    <span class="hljs-variable">&lt;h1&gt;</span>Color&lt;/h1&gt;
    <span class="hljs-variable">&lt;h3&gt;</span>Name&lt;/h3&gt;
    <span class="hljs-variable">&lt;p&gt;</span>{this.<span class="hljs-keyword">state</span>.color || <span class="hljs-string">"white"</span>}&lt;/p&gt;
    <span class="hljs-variable">&lt;h3&gt;</span>Hex&lt;/h3&gt;
    <span class="hljs-variable">&lt;p&gt;</span>
      {(() =&gt; {
        switch (this.<span class="hljs-keyword">state</span>.color) {
          case <span class="hljs-string">"red"</span>:   return <span class="hljs-string">"#FF0000"</span>;
          case <span class="hljs-string">"green"</span>: return <span class="hljs-string">"#00FF00"</span>;
          case <span class="hljs-string">"blue"</span>:  return <span class="hljs-string">"#0000FF"</span>;
          <span class="hljs-keyword">default</span>:      return <span class="hljs-string">"#FFFFFF"</span>;
        }
      })()}
    &lt;/p&gt;
  &lt;/section&gt;
);</code></pre>
<h5>5. 不要把display logic写在<code>componentWillReceiveProps</code>或<code>componentWillMount</code>中，把它们都移到render()中去。</h5>
<h2 id="articleHeader4">如何动态处理 classNames</h2>
<h5>1. 使用布尔值</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// BAD:
constructor () {
    this.state = {
      classes: []
    };
  }

  handleClick () {
    var classes = this.state.classes;
    var index = classes.indexOf('active');

    if (index != -1) {
      classes.splice(index, 1);
    } else {
      classes.push('active');
    }

    this.setState({ classes: classes });
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-comment">// BAD:</span>
<span class="hljs-function"><span class="hljs-keyword">constructor</span> <span class="hljs-params">()</span> <span class="hljs-comment">{
    this.state = {
      classes: []
    }</span>;</span>
  }

  handleClick () <span class="hljs-comment">{
    var classes = this.state.classes;
    var index = classes.indexOf('active');

    if (index != -1) {
      classes.splice(index, 1);
    }</span> <span class="hljs-keyword">else</span> <span class="hljs-comment">{
      classes.push('active');
    }</span>

    this.setState(<span class="hljs-comment">{ classes: classes }</span>);
  }
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// GOOD:
  constructor () {
    this.state = {
      isActive: false
    };
  }

  handleClick () {
    this.setState({ isActive: !this.state.isActive });
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-comment">// GOOD:</span>
  <span class="hljs-function"><span class="hljs-keyword">constructor</span> <span class="hljs-params">()</span> <span class="hljs-comment">{
    this.state = {
      isActive: false
    }</span>;</span>
  }

  handleClick () <span class="hljs-comment">{
    this.setState({ isActive: !this.state.isActive }</span>);
  }</code></pre>
<h5>2. 使用<a href="https://github.com/JedWatson/classnames" rel="nofollow noreferrer" target="_blank">classnames</a>这个小工具来拼接classNames：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// BEFORE:
var Button = React.createClass({
  render () {
    var btnClass = 'btn';
    if (this.state.isPressed) btnClass += ' btn-pressed';
    else if (this.state.isHovered) btnClass += ' btn-over';
    return <button className={btnClass}>{this.props.label}</button>;
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// BEFORE:</span>
<span class="hljs-keyword">var</span> Button = React.createClass({
  render () {
    <span class="hljs-keyword">var</span> btnClass = <span class="hljs-string">'btn'</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.isPressed) btnClass += <span class="hljs-string">' btn-pressed'</span>;
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.isHovered) btnClass += <span class="hljs-string">' btn-over'</span>;
    <span class="hljs-keyword">return</span> &lt;button className={btnClass}&gt;{<span class="hljs-keyword">this</span>.props.label}&lt;/button&gt;;
  }
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// AFTER：
var classNames = require('classnames');

var Button = React.createClass({
  render () {
    var btnClass = classNames({
      'btn': true,
      'btn-pressed': this.state.isPressed,
      'btn-over': !this.state.isPressed &amp;&amp; this.state.isHovered
    });
    return <button className={btnClass}>{this.props.label}</button>;
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// AFTER：</span>
<span class="hljs-keyword">var</span> classNames = require(<span class="hljs-string">'classnames'</span>);

<span class="hljs-keyword">var</span> Button = React.createClass({
  render () {
    <span class="hljs-keyword">var</span> btnClass = classNames({
      <span class="hljs-string">'btn'</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-string">'btn-pressed'</span>: <span class="hljs-keyword">this</span>.state.isPressed,
      <span class="hljs-string">'btn-over'</span>: !<span class="hljs-keyword">this</span>.state.isPressed &amp;&amp; <span class="hljs-keyword">this</span>.state.isHovered
    });
    <span class="hljs-keyword">return</span> &lt;button className={btnClass}&gt;{<span class="hljs-keyword">this</span>.props.label}&lt;/button&gt;;
  }
});</code></pre>
<p>未完待续...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 最佳实践——那些 React 没告诉你但很重要的事

## 原文链接
[https://segmentfault.com/a/1190000005013207](https://segmentfault.com/a/1190000005013207)


---
title: 'react开发教程（四）React数据流' 
date: 2019-01-16 2:30:08
hidden: true
slug: nmyfcsv40zd
categories: [reprint]
---

{{< raw >}}

                    
<p>在React中，数据是自顶向下流动的（称为单项数据流），从父组件传递到子组件。因此组件是简单且易于把握的，它们只需从父节点获取<strong>props</strong>渲染即可。如果顶层组件的某个<strong>prop</strong>改变了，React会递归向下遍历整个组件树，从新渲染所有使用这个属性的组件。<br>然而在React中出了props之外还有自己的状态，这些状态只能在组件内修改，那这个状态就是<strong>state</strong></p>
<p>props:就是properties的缩写，你可以使用它把任意类型的数据传递给组件(通俗一点就是，可以当成方法传递的参数)<br>state:当前组件内部数据</p>
<h1 id="articleHeader0">props</h1>
<p>可以在挂载组件的时候设置它的props</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Component title=&quot;标题&quot; />
var data = {
    name : &quot;刘宇&quot;,
    title : &quot;标题&quot;
};
<Component {...data} />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>&lt;Component <span class="hljs-built_in">title</span>=<span class="hljs-string">"标题"</span> /&gt;
var <span class="hljs-keyword">data</span> = {
    <span class="hljs-keyword">name</span> : <span class="hljs-string">"刘宇"</span>,
    <span class="hljs-built_in">title</span> : <span class="hljs-string">"标题"</span>
};
&lt;Component {...<span class="hljs-keyword">data</span>} /&gt;
</code></pre>
<p>在组件内部调用的话就是使用 this.props</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Comment.js
import React, { Component } from 'react';、
import './Comment.css';

class Comment extends Component {
  render() {
    return (
      <div className=&quot;Comment&quot;>
        {/**接受参数**/}
        {this.props.name}
        {/**接受子节点**/}
        {this.props.children}
      </div>
    );
  }
}
export default Comment;

//App.js
class App extends Component {
  render() {
    return (
      <div className=&quot;App&quot;>
        {/**调用组件**/}
        <Comment name=&quot;刘宇&quot; /**传递参数**/>组件插入内容{/**子节点**/}</Comment>
      </div>
    );
  }
}

export default App;

//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">//Comment.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';、
<span class="hljs-keyword">import</span> './<span class="hljs-type">Comment</span>.css';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Comment</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div className=<span class="hljs-string">"Comment"</span>&gt;
        {<span class="hljs-comment">/**接受参数**/</span>}
        {<span class="hljs-keyword">this</span>.props.name}
        {<span class="hljs-comment">/**接受子节点**/</span>}
        {<span class="hljs-keyword">this</span>.props.children}
      &lt;/div&gt;
    );
  }
}
export <span class="hljs-keyword">default</span> <span class="hljs-type">Comment</span>;

<span class="hljs-comment">//App.js</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div className=<span class="hljs-string">"App"</span>&gt;
        {<span class="hljs-comment">/**调用组件**/</span>}
        &lt;<span class="hljs-type">Comment</span> name=<span class="hljs-string">"刘宇"</span> <span class="hljs-comment">/**传递参数**/</span>&gt;组件插入内容{<span class="hljs-comment">/**子节点**/</span>}&lt;/<span class="hljs-type">Comment</span>&gt;
      &lt;/div&gt;
    );
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">App</span>;

<span class="hljs-comment">//index.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> <span class="hljs-type">ReactDOM</span> from <span class="hljs-symbol">'react</span>-dom';
<span class="hljs-keyword">import</span> <span class="hljs-type">App</span> from './<span class="hljs-type">App</span>';
<span class="hljs-keyword">import</span> './index.css';

<span class="hljs-type">ReactDOM</span>.render(
  &lt;<span class="hljs-type">App</span> /&gt;,
  document.getElementById(<span class="hljs-symbol">'roo</span>t')
);
</code></pre>
<h2 id="articleHeader1">propTypes</h2>
<p>propTypes用于规范props的类型与必须的状态。如果组件定义了propTypes,那么在开发环境下，就会对组件的props值的类型作检查，如果传入的props不能与之匹配，React将实时在控制台里报warning（警告）；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="static propTypes = {
  // 你可以定义一个js原始类型的prop,默认请情况下，这是都是可选的
  optionalArray: React.PropTypes.array,
  optionalBool: React.PropTypes.bool,
  optionalFunc: React.PropTypes.func,
  optionalNumber: React.PropTypes.number,
  optionalObject: React.PropTypes.object,
  optionalString: React.PropTypes.string,
  optionalSymbol: React.PropTypes.symbol,

  // 任何可以渲染的东西：数字，字符串，元素或数组（或片段）。
  optionalNode: React.PropTypes.node,

  // React元素
  optionalElement: React.PropTypes.element,

  // 你也可以声明prop是某个类的实例。 内部使用的是JS的instanceof运算符。
  optionalMessage: React.PropTypes.instanceOf(Message),

  // 你可以通过将它作为枚举来确保你的prop被限制到特定的值。
  optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

  // 可以是许多类型之一的对象
  optionalUnion: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.instanceOf(Message)
  ]),

  // 某种类型的数组
  optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

  // 具有某种类型的属性值的对象
  optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

  // 采取特定样式的对象
  optionalObjectWithShape: React.PropTypes.shape({
    color: React.PropTypes.string,
    fontSize: React.PropTypes.number
  }),

  // 你可以用`isRequired`来连接到上面的任何一个类型，以确保如果没有提供props的话会显示一个警告。
  requiredFunc: React.PropTypes.func.isRequired,

  // 任何数据类型
  requiredAny: React.PropTypes.any.isRequired,

  // 您还可以指定自定义类型检查器。 如果检查失败，它应该返回一个Error对象。 不要`console.warn`或throw，因为这不会在`oneOfType`内工作。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 您还可以为`arrayOf`和`objectOf`提供自定义类型检查器。 如果检查失败，它应该返回一个Error对象。 
  // 检查器将为数组或对象中的每个键调用验证函数。 
  // 检查器有两个参数，第一个参数是数组或对象本身，第二个是当前项的键。
  customArrayProp: React.PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
//以上是ES6的写法，如果使用的是createClass
MyComponent.propTypes = {
//同上
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs roboconf"><code>static propTypes = {
  // 你可以定义一个<span class="hljs-attribute">js原始类型的prop,默认请情况下，这是都是可选的
  optionalArray</span>: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.array</span>,
  optionalBool: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.bool</span>,
  optionalFunc: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.func</span>,
  optionalNumber: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.number</span>,
  optionalObject: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.object</span>,
  optionalString: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.string</span>,
  optionalSymbol: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.symbol</span>,

  // 任何可以渲染的东西：数字，字符串，元素或数组（或片段）。
  optionalNode: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.node</span>,

  // React元素
  optionalElement: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.element</span>,

  // 你也可以声明prop是某个类的实例。 内部使用的是JS的instanceof运算符。
  optionalMessage: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.instanceOf</span>(Message),

  // 你可以通过将它作为枚举来确保你的prop被限制到特定的值。
  optionalEnum: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.oneOf</span>(['News', 'Photos']),

  // 可以是许多类型之一的对象
  optionalUnion: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.oneOfType</span>([
    React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.string</span>,
    React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.number</span>,
    React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.instanceOf</span>(Message)
  ]),

  // 某种类型的数组
  optionalArrayOf: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.arrayOf</span>(React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.number</span>),

  // 具有某种类型的属性值的对象
  optionalObjectOf: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.objectOf</span>(React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.number</span>),

  // 采取特定样式的对象
  optionalObjectWithShape: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.shape</span>({
    color: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.string</span>,
    fontSize: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.number</span>
  }),

  // 你可以用`isRequired`来连接到上面的任何一个类型，以确保如果没有提供props的话会显示一个警告。
  requiredFunc: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.func</span><span class="hljs-variable">.isRequired</span>,

  // 任何数据类型
  requiredAny: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.any</span><span class="hljs-variable">.isRequired</span>,

  // 您还可以指定自定义类型检查器。 如果检查失败，它应该返回一个Error对象。 不要`console<span class="hljs-variable">.warn</span>`或throw，因为这不会在`oneOfType`内工作。
  customProp: function(props, propName, componentName) {
    if (!/matchme/<span class="hljs-variable">.test</span>(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 您还可以为`arrayOf`和`objectOf`提供自定义类型检查器。 如果检查失败，它应该返回一个Error对象。 
  // 检查器将为数组或对象中的每个键调用验证函数。 
  // 检查器有两个参数，第一个参数是数组或对象本身，第二个是当前项的键。
  customArrayProp: React.PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
//以上是ES6的写法，如果使用的是createClass
MyComponent.propTypes = {
//同上
}
</code></pre>
<h3 id="articleHeader2">要求只能是单个子元素</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyComponent extends React.Component {
    render() {
        // 只能包含一个子元素，否则会给出警告
        const children = this.props.children;
        return (
            <div>{children}</div>
        );
    }
}

MyComponent.propTypes = {
    children: React.PropTypes.element.isRequired
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-comment">// 只能包含一个子元素，否则会给出警告</span>
        const children = <span class="hljs-keyword">this</span>.props.children;
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;{children}&lt;/div&gt;
        );
    }
}

<span class="hljs-type">MyComponent</span>.propTypes = {
    children: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.element.isRequired
}
</code></pre>
<h2 id="articleHeader3">getDefaultProps和defaultProps</h2>
<p>可以为组件添加getDefaultProps来设置属性的默认值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//es6写法

class Comment extends Component {
  //设置默认props值
  static defaultProps = {
    name:&quot;默认值&quot;
  }
  render() {
    return (
      <div className=&quot;Comment&quot;>
        {/**接受参数**/}
        {this.props.name}
        {/**接受子节点**/}
        {this.props.children}
      </div>
    );
  }
}


var Comment = React.createClass( {
  //设置默认props值
  getDefaultProps : {
    name:&quot;默认值&quot;
  },
  render : function(){
    return (
      <div className=&quot;Comment&quot;>
        {/**接受参数**/}
        {this.props.name}
        {/**接受子节点**/}
        {this.props.children}
      </div>
    );
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">//es6写法</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Comment</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">//设置默认props值</span>
  static defaultProps = {
    name:<span class="hljs-string">"默认值"</span>
  }
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div className=<span class="hljs-string">"Comment"</span>&gt;
        {<span class="hljs-comment">/**接受参数**/</span>}
        {<span class="hljs-keyword">this</span>.props.name}
        {<span class="hljs-comment">/**接受子节点**/</span>}
        {<span class="hljs-keyword">this</span>.props.children}
      &lt;/div&gt;
    );
  }
}


<span class="hljs-keyword">var</span> <span class="hljs-type">Comment</span> = <span class="hljs-type">React</span>.createClass( {
  <span class="hljs-comment">//设置默认props值</span>
  getDefaultProps : {
    name:<span class="hljs-string">"默认值"</span>
  },
  render : function(){
    <span class="hljs-keyword">return</span> (
      &lt;div className=<span class="hljs-string">"Comment"</span>&gt;
        {<span class="hljs-comment">/**接受参数**/</span>}
        {<span class="hljs-keyword">this</span>.props.name}
        {<span class="hljs-comment">/**接受子节点**/</span>}
        {<span class="hljs-keyword">this</span>.props.children}
      &lt;/div&gt;
    );
  }
})</code></pre>
<blockquote><p>注意：props可以访问不可以修改，如果需要修改，请使用state</p></blockquote>
<h1 id="articleHeader4">state</h1>
<p>state是组件内部的属性。组件本身是一个状态机，他可以在constructor中通过this.state直接定义他的值，然后根据这些值来渲染不同的UI,当state的值发生改变时，可以通过this.setState方法让组件再次调用render方法，来渲染新的UI.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Comment = React.createClass( {
  //设置state值
  getInitialState : {
    num:0
  },
  addNum : function(){
    var num = this.state.num++;
    this.setState({
        num:num
    })
  },
  render : function(){
    return (
      <div className=&quot;Comment&quot;>
        <button onClick>{this.state.num}</button>
      </div>
    );
  }
})

//es6写法
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        num : 0
    };
    this.addNum = this.addNum.bind(this)
  }

  addNum() {
    var num = this.state.num++;
    this.setState({
        num:num
    })
  }

  render() {
    return (
      <div className=&quot;Comment&quot;>
        <button onClick>{this.state.num}</button>
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Comment = React.createClass( {
  <span class="hljs-comment">//设置state值</span>
  getInitialState : {
    <span class="hljs-attr">num</span>:<span class="hljs-number">0</span>
  },
  <span class="hljs-attr">addNum</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> num = <span class="hljs-keyword">this</span>.state.num++;
    <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">num</span>:num
    })
  },
  <span class="hljs-attr">render</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Comment"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>&gt;</span>{this.state.num}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
})

<span class="hljs-comment">//es6写法</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Comment</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
        <span class="hljs-attr">num</span> : <span class="hljs-number">0</span>
    };
    <span class="hljs-keyword">this</span>.addNum = <span class="hljs-keyword">this</span>.addNum.bind(<span class="hljs-keyword">this</span>)
  }

  addNum() {
    <span class="hljs-keyword">var</span> num = <span class="hljs-keyword">this</span>.state.num++;
    <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">num</span>:num
    })
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Comment"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>&gt;</span>{this.state.num}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}</code></pre>
<p>上一篇：<a href="https://segmentfault.com/a/1190000009123395">react开发教程（三）组件的构建</a><br>下一篇：<a href="https://segmentfault.com/a/1190000009153245" target="_blank">react开发教程（五）生命周期</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react开发教程（四）React数据流

## 原文链接
[https://segmentfault.com/a/1190000009139532](https://segmentfault.com/a/1190000009139532)


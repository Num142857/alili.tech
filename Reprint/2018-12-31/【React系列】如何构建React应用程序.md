---
title: '【React系列】如何构建React应用程序' 
date: 2018-12-31 2:30:30
hidden: true
slug: sw4ts5hb99
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>前面几篇内容简单整理了一些React的基础知识点，以方便大家能够简单的了解React的一些相关概念。在本节中，我们来试着以一个简单的例子来分析，如何构建一个React应用程序，该如何去思考。</p></blockquote>
<p>首先，我们来选择比较常见的一个示例程序：TodoList来作为本次的分析案例。</p>
<p><span class="img-wrap"><img data-src="/img/bVU6Se?w=360&amp;h=112" src="https://static.alili.tech/img/bVU6Se?w=360&amp;h=112" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>上面是一个简单的TodoList的的样子，此处并没有进行样式修饰，大家可以后面自己完善。我们将按照以下几个步骤进行分析设计：</p>
<h2 id="articleHeader0">步骤1：将 UI 拆解到组件层次结构中</h2>
<p>当我们拿到一个UI设计时，需要我们将之进行拆解，使之成为由每个组件（和子组件）的结构构成的一个整体，并且可以根据功能给各个部分进行命名。</p>
<p>但是你该如何拆分组件呢？其实只需要像拆分一个新方法或新对象一样的方式即可。一个常用的技巧是<strong>单一职责原则</strong>，即一个组件理想情况下只处理一件事。如果一个组件持续膨胀，就应该将其拆分为多个更小的组件中。</p>
<p>React最大的卖点是轻量组件化。我们分析一下以上截图中的页面，如果要分组件的话，我们大约可以分成一个总组件和两个子组件。一个输入内容的组件，一个显示内容列表（带删除功能）的组件，外面再用一个总组件将两个子组件包括起来。</p>
<p><span class="img-wrap"><img data-src="/img/bVU6WI?w=577&amp;h=117" src="https://static.alili.tech/img/bVU6WI?w=577&amp;h=117" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这样，我们的应用程序的结构就清晰了：</p>
<ul><li>
<p>todoList --- 整个应用程序用例</p>
<ul>
<li>typeNew  ---  接收用户的输入</li>
<li>listTodo ---  显示所有的list item</li>
</ul>
</li></ul>
<h2 id="articleHeader1">步骤2： 用 React 构建一个静态版本</h2>
<p>通过上面的结构划分，我们代码的整体结构大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// TodoList 组件是一个整体的组件，最终的React渲染也将只渲染这一个组件
// 该组件用于将『新增』和『列表』两个组件集成起来
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    }
  }
  render() {
      return (
          <div>
              <TypeNew  />
              <ListTodo />
          </div>
      );
  }
};

// TypeNew 组件用于新增数据，
class TypeNew extends Component {
  render() {
      return (
          <form>
              <input type=&quot;text&quot; placeholder=&quot;typing a newthing todo&quot; autoComplete=&quot;off&quot; />
          </form>
      );
  }
};

// ListTodo 组件用于展示列表，并可以删除某一项内容，
class ListTodo extends Component {
  render() {
      return (
          <ul id=&quot;todo-list&quot;>
              {/* 其中显示数据列表 */}
          </ul>
      );
  }
};

// 将 TodoList 组件渲染到页面
ReactDOM.render(<TodoList />, document.getElementById('root'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> <span class="hljs-type">ReactDOM</span> from <span class="hljs-symbol">'react</span>-dom';
<span class="hljs-keyword">import</span> './index.css';


<span class="hljs-comment">// TodoList 组件是一个整体的组件，最终的React渲染也将只渲染这一个组件</span>
<span class="hljs-comment">// 该组件用于将『新增』和『列表』两个组件集成起来</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      todoList: []
    }
  }
  render() {
      <span class="hljs-keyword">return</span> (
          &lt;div&gt;
              &lt;<span class="hljs-type">TypeNew</span>  /&gt;
              &lt;<span class="hljs-type">ListTodo</span> /&gt;
          &lt;/div&gt;
      );
  }
};

<span class="hljs-comment">// TypeNew 组件用于新增数据，</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TypeNew</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
      <span class="hljs-keyword">return</span> (
          &lt;form&gt;
              &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> placeholder=<span class="hljs-string">"typing a newthing todo"</span> autoComplete=<span class="hljs-string">"off"</span> /&gt;
          &lt;/form&gt;
      );
  }
};

<span class="hljs-comment">// ListTodo 组件用于展示列表，并可以删除某一项内容，</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ListTodo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
      <span class="hljs-keyword">return</span> (
          &lt;ul id=<span class="hljs-string">"todo-list"</span>&gt;
              {<span class="hljs-comment">/* 其中显示数据列表 */</span>}
          &lt;/ul&gt;
      );
  }
};

<span class="hljs-comment">// 将 TodoList 组件渲染到页面</span>
<span class="hljs-type">ReactDOM</span>.render(&lt;<span class="hljs-type">TodoList</span> /&gt;, document.getElementById(<span class="hljs-symbol">'roo</span>t'));</code></pre>
<p>目前为止你已经有了组件层次结构，现在是时候实现你的 app 了。最简单的方法是构建一个采用数据模型并渲染 UI 但没有交互性的版本。最好解耦这些处理，因为构建静态版本需要 大量的代码 和 少量的思考，而添加交互需要 大量思考 和 少量的代码。我们将看到原因。</p>
<p>要构建你 app 的一个静态版本，用于渲染数据模型， 您将需要构建复用其他组件并使用 props 传递数据的组件。props 是将数据从 父级组件 传递到 子级 的一种方式。如果你熟悉 state 的概念，在构建静态版本时 <em>不要使用 </em>state ** 。state 只用于交互，也就是说，数据可以随时被改变。由于这是一个静态版本 app，所以你并不需要使用 state 。</p>
<p>您可以 自上而下 或 自下而上 构建。也就是说，您可以从构建层次结构中顶端的组件开始（即从 FilterableProductTable 开始），也可以从构建层次结构中底层的组件开始（即 ProductRow ）。在更简单的例子中，通常 自上而下 更容易，而在较大的项目中，自下而上，更有利于编写测试。</p>
<p>在这一步结束时，你已经有了一个可重用的组件库，用于渲染你的数据模型。组件将只有 render() 方法，因为这是你应用程序的静态版本。层次结构顶部的组件（ FilterableProductTable ）应该接收你的数据模型作为 prop 。如果您对基础数据模型进行更改，并再次调用 ReactDOM.render()，UI 将同步更新。这有利于观测UI的更新以及相关的数据变化，因为这中间没有做什么复杂的事情。React 的 单向数据流（也称为 单向绑定 ）使所有模块化和高性能。</p>
<blockquote><p>♥ 小插曲 区分: Props(属性) vs State(状态)</p></blockquote>
<h2 id="articleHeader2">步骤3： 确定 UI state(状态) 的最小（但完整）表示</h2>
<p>为了你的 UI 可以交互，你需要能够触发更改底层的数据模型。React 通过 state 使其变得容易。</p>
<p>要正确的构建应用程序，你首先需要考虑你的应用程序需要的可变 state(状态) 的最小集合。这里的关键是：不要重复你自己 (DRY，don't repeat yourself)。找出你的应用程序所需 state(状态) 的绝对最小表示，并且可以以此计算出你所需的所有其他数据内容。正如我们在构建一个 TODO 列表，只保留一个 TODO 元素数组即可;不需要为元素数量保留一个单独的 state(状态) 变量。相反，当你要渲染 TODO 计数时，只需要获取 TODO 数组的长度即可。</p>
<p>在我们的例子中，主要出现的数据有两个，一个是todo列表，一个是用户输入的新的todo项目，todo列表会根据用户的添加和删除发生变化，可以认为是属于state的，对于用户输入的todo项目，我们发现它只是一个中间的临时值，并不需要设置相应的变量进行存储，所以我们的最终的State是：</p>
<ul><li>todo列表</li></ul>
<h2 id="articleHeader3">步骤4：确定 state(状态) 的位置</h2>
<p>既然是展示数据，首先要考虑数据存储在哪里，来自于哪里。现在这里放一句话——React提倡所有的数据都是由父组件来管理，通过props的形式传递给子组件来处理——先记住，接下来再解释这句话。</p>
<p>上面提到，做一个todolist页面需要一个父组件，两个子组件。父组件当然就是todolist的『总指挥』，两个子组件分别用来add和show、delete。用通俗的方式讲来，父组件就是领导，两个子组件就是协助领导开展工作的，一切的资源和调动资源的权利，都在领导层级，子组件配合领导工作，需要资源或者调动资源，只能申请领导的批准。</p>
<p>这么说来就明白了吧。数据完全由父组件来管理和控制，子组件用来显示、操作数据，得经过父组件的批准，即——父组件通过props的形式将数据传递给子组件，子组件拿到父组件传递过来的数据，再进行展示。</p>
<p>另外，根据React开发的规范，组件内部的数据由state控制，外部对内部传递数据时使用 props 。这么看来，针对父组件来说，要存储todolist的数据，那就是内部信息（本身就是自己可控的资源，而不是『领导』控制的资源），用state来存储即可。而父组件要将todolist数据传递给子组件，对子组件来说，那就是传递进来的外部信息（是『领导』的资源，交付给你来处理），需要使用props。</p>
<p>此时我们的代码可以修改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// TodoList 组件是一个整体的组件，最终的React渲染也将只渲染这一个组件
// 该组件用于将『新增』和『列表』两个组件集成起来
class TodoList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        todoList: []
      }
    }

    render() {
        return (
            <div>
                <TypeNew  />
                <ListTodo />
            </div>
        );
    };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// TodoList 组件是一个整体的组件，最终的React渲染也将只渲染这一个组件</span>
<span class="hljs-comment">// 该组件用于将『新增』和『列表』两个组件集成起来</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    constructor(props) {
      <span class="hljs-keyword">super</span>(props);
      <span class="hljs-keyword">this</span>.state = {
        todoList: []
      }
    }

    render() {
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;<span class="hljs-type">TypeNew</span>  /&gt;
                &lt;<span class="hljs-type">ListTodo</span> /&gt;
            &lt;/div&gt;
        );
    };
};</code></pre>
<p>现在，已经确定了应用所需 state(状态) 的最小集合。接下来，需要确定是哪个组件可变，或者说哪个组件拥有这些 state(状态) 。</p>
<p>记住：React 单向数据流在层级中自上而下进行。这样有可能不能立即判断出状态属于哪个组件。这常常是新手最难理解的一部分，试着按下面的步骤分析操作：</p>
<p>对于你应用中的每一个 state(状态) ：</p>
<ul>
<li>确定每个基于这个 state(状态) 渲染的组件。</li>
<li>找出公共父级组件（一个单独的组件，在组件层级中位于所有需要这个 state(状态) 的组件的上面。愚人码头注：父级组件）。</li>
<li>公共父级组件 或者 另一个更高级组件拥有这个 state(状态) 。</li>
<li>如果找不出一个拥有该 state(状态) 的合适组件，可以创建一个简单的新组件来保留这个 state(状态) ，并将其添加到公共父级组件的上层即可。</li>
</ul>
<h2 id="articleHeader4">步骤5：添加反向数据流</h2>
<p>目前，构建的应用已经具备了正确渲染 props(属性) 和 state(状态) 沿着层次结构向下传播的功能。现在是时候实现另一种数据流方式：层次结构中深层的 form(表单) 组件需要更新 TodoList中的 state(状态) 。</p>
<p>想想我们希望发生什么。我们期望当用户改变表单输入进行提交的时候，我们更新 state(状态) 来反映用户的输入。由于组件只能更新它们自己的 state(状态) ，TodoList将传递回调到 TypeNew，然后在 state(状态) 被更新的时候触发。我们可以使用表单的onSubmit事件来接收通知。而且通过 TodoList传递的回调调用 setState()，然后应用被更新。同理删除处理在ListTodo中触发按钮的点击onClick事件来调用TodoList传递的回掉函数来更新删除后的state。</p>
<p>最终我们的代码结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// TodoList 组件是一个整体的组件，最终的React渲染也将只渲染这一个组件
// 该组件用于将『新增』和『列表』两个组件集成起来
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    }
    this.handleAddNewItem = this.handleAddNewItem.bind(this);
    this.handleDelItem = this.handleDelItem.bind(this);
  }

  handleAddNewItem(todo) {
    var todoList = this.state.todoList;
    if(todo === &quot;&quot;) {
      return;
    }
    todoList.push(todo);
    this.setState({
      todoList: todoList
    })
  }

  handleDelItem(index) {
    var todoList = this.state.todoList;
    todoList.splice(index, 1);
    this.setState({
      todoList: todoList
    })
  }

  render() {
      return (
          <div>
              <TypeNew typeNewItem={this.handleAddNewItem} />
              <ListTodo todoList={this.state.todoList} onDelItem={this.handleDelItem} />
          </div>
      );
  }
};

// TypeNew 组件用于新增数据，
class TypeNew extends Component {
  constructor(props){
    super(props);
    this.onHandleAddNewItem = this.onHandleAddNewItem.bind(this);
  }
  onHandleAddNewItem(e) {
    e.preventDefault();
    var inputDom = this.textInput;
    var newthing = inputDom.value.trim();
    this.props.typeNewItem(newthing);
    inputDom.value = '';
  }
  render() {
      return (
          <form onSubmit={this.onHandleAddNewItem}>
              <input type=&quot;text&quot; ref={(input) => { this.textInput = input; "}}" placeholder=&quot;typing a newthing todo&quot; autoComplete=&quot;off&quot; />
          </form>
      );
  }
};

// ListTodo 组件用于展示列表，并可以删除某一项内容，
class ListTodo extends Component {
  constructor(props){
    super(props);
    this.onHandleDelItem = this.onHandleDelItem.bind(this);
  }

  onHandleDelItem(e){
    this.props.onDelItem(e.target.getAttribute(&quot;data-key&quot;));
  }

  render() {
      return (
          <ul id=&quot;todo-list&quot;>
              {
                // this.props.todo 获取父组件传递过来的数据
                // {/* 遍历数据 */}
                this.props.todoList.map(function (item, i) {
                    return (
                        <li>
                            <label>{item}</label>
                            <button onClick={this.onHandleDelItem} data-key={i}>delete</button>
                        </li>                     
                      );
                }.bind(this))
              }
          </ul>
      );
  }
};

// 将 TodoList 组件渲染到页面
ReactDOM.render(<TodoList />, document.getElementById('root'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> React, { Component } from <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM from <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./index.css'</span>;


<span class="hljs-comment">// TodoList 组件是一个整体的组件，最终的React渲染也将只渲染这一个组件</span>
<span class="hljs-comment">// 该组件用于将『新增』和『列表』两个组件集成起来</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoList</span> <span class="hljs-title">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      todoList: []
    }
    <span class="hljs-keyword">this</span>.handleAddNewItem = <span class="hljs-keyword">this</span>.handleAddNewItem.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.handleDelItem = <span class="hljs-keyword">this</span>.handleDelItem.bind(<span class="hljs-keyword">this</span>);
  }

  handleAddNewItem(todo) {
    <span class="hljs-keyword">var</span> todoList = <span class="hljs-keyword">this</span>.state.todoList;
    <span class="hljs-keyword">if</span>(todo === <span class="hljs-string">""</span>) {
      <span class="hljs-keyword">return</span>;
    }
    todoList.push(todo);
    <span class="hljs-keyword">this</span>.setState({
      todoList: todoList
    })
  }

  handleDelItem(index) {
    <span class="hljs-keyword">var</span> todoList = <span class="hljs-keyword">this</span>.state.todoList;
    todoList.splice(index, <span class="hljs-number">1</span>);
    <span class="hljs-keyword">this</span>.setState({
      todoList: todoList
    })
  }

  render() {
      <span class="hljs-keyword">return</span> (
          &lt;div&gt;
              &lt;TypeNew typeNewItem={<span class="hljs-keyword">this</span>.handleAddNewItem} /&gt;
              &lt;ListTodo todoList={<span class="hljs-keyword">this</span>.state.todoList} onDelItem={<span class="hljs-keyword">this</span>.handleDelItem} /&gt;
          &lt;/div&gt;
      );
  }
};

<span class="hljs-comment">// TypeNew 组件用于新增数据，</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TypeNew</span> <span class="hljs-title">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props){
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.onHandleAddNewItem = <span class="hljs-keyword">this</span>.onHandleAddNewItem.bind(<span class="hljs-keyword">this</span>);
  }
  onHandleAddNewItem(e) {
    e.preventDefault();
    <span class="hljs-keyword">var</span> inputDom = <span class="hljs-keyword">this</span>.textInput;
    <span class="hljs-keyword">var</span> newthing = inputDom.value.trim();
    <span class="hljs-keyword">this</span>.props.typeNewItem(newthing);
    inputDom.value = <span class="hljs-string">''</span>;
  }
  render() {
      <span class="hljs-keyword">return</span> (
          &lt;form onSubmit={<span class="hljs-keyword">this</span>.onHandleAddNewItem}&gt;
              &lt;input type=<span class="hljs-string">"text"</span> ref={(input) =&gt; { <span class="hljs-keyword">this</span>.textInput = input; "}}" placeholder=<span class="hljs-string">"typing a newthing todo"</span> autoComplete=<span class="hljs-string">"off"</span> /&gt;
          &lt;/form&gt;
      );
  }
};

<span class="hljs-comment">// ListTodo 组件用于展示列表，并可以删除某一项内容，</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ListTodo</span> <span class="hljs-title">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props){
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.onHandleDelItem = <span class="hljs-keyword">this</span>.onHandleDelItem.bind(<span class="hljs-keyword">this</span>);
  }

  onHandleDelItem(e){
    <span class="hljs-keyword">this</span>.props.onDelItem(e.target.getAttribute(<span class="hljs-string">"data-key"</span>));
  }

  render() {
      <span class="hljs-keyword">return</span> (
          &lt;ul id=<span class="hljs-string">"todo-list"</span>&gt;
              {
                <span class="hljs-comment">// this.props.todo 获取父组件传递过来的数据</span>
                <span class="hljs-comment">// {/* 遍历数据 */}</span>
                <span class="hljs-keyword">this</span>.props.todoList.map(function (item, i) {
                    <span class="hljs-keyword">return</span> (
                        &lt;li&gt;
                            &lt;label&gt;{item}&lt;/label&gt;
                            &lt;button onClick={<span class="hljs-keyword">this</span>.onHandleDelItem} <span class="hljs-keyword">data</span>-key={i}&gt;delete&lt;/button&gt;
                        &lt;/li&gt;                     
                      );
                }.bind(<span class="hljs-keyword">this</span>))
              }
          &lt;/ul&gt;
      );
  }
};

<span class="hljs-comment">// 将 TodoList 组件渲染到页面</span>
ReactDOM.render(&lt;TodoList /&gt;, document.getElementById(<span class="hljs-string">'root'</span>));</code></pre>
<p>上面就是我们一步步进行分析拆分来设计我们的应用程序的过程。由于例子比较简单，所以相对来说思路更加清晰，当我们面对大型的应用程序时，往往分析方式会有所变化，但是根本的原理是不变的。</p>
<hr>
<p><strong>参考资料</strong>：</p>
<p><a href="http://www.css88.com/react/docs/thinking-in-react.html" rel="nofollow noreferrer" target="_blank">React 的编程思想</a><br><a href="http://www.cnblogs.com/wangfupeng1988/p/5302738.html" rel="nofollow noreferrer" target="_blank">使用React并做一个简单的to-do-list</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【React系列】如何构建React应用程序

## 原文链接
[https://segmentfault.com/a/1190000011190715](https://segmentfault.com/a/1190000011190715)


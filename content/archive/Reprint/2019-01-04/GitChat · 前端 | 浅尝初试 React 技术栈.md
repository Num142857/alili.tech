---
title: 'GitChat · 前端 | 浅尝初试 React 技术栈' 
date: 2019-01-04 2:30:10
hidden: true
slug: 6bxy07jr4ue
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>来自 GitChat 作者：余博伦 <br>更多IT技术分享，尽在微信公众号：GitChat 技术杂谈</p></blockquote>
<p><a href="http://gitbook.cn/books/595e1822fd12e512c486802d/index.html" rel="nofollow noreferrer" target="_blank">进入 GitChat 阅读原文</a></p>
<h3 id="articleHeader0">React</h3>
<h4>React 是什么？</h4>
<p>Facebook 官方对 React 定义是：用来构建用户界面的库（Library）。注意到这里的用词是库（Library）而不是框架（Framework）。React 不像早期版本的 Angular 这样功能非常完备的 mvvm 框架，它主要只专注于解决 MVC 当中 V 层，也就是视图层（View）方面的问题。</p>
<p>不过我们也不必太过纠结库（Library）或框架（Framework）的定义。复杂的，给出你一整套解决方案的就叫框架（Framework）；简单的，专注解决一个问题并做到极致（Do one thing and do it well）的就叫库（Library）。</p>
<p>不过我们还是习惯性地称 React 是一个 JavaScript 框架，因为除了 React 核心库本身，在 React 的生态圈当中，还有很多其他可以搭配协同的工具库，比如在这次分享当中我们要介绍的用来解决状态管理问题的 Redux ；用来提供前端路由功能的 react-router 。我们把这些工具库统称为 React 技术栈，组合使用 React 技术栈也就完全撑得起一个框架提供的功能了。</p>
<h4>React 有哪些特性？</h4>
<p><strong>声明式</strong></p>
<p>说白了声明式就是你告诉程序你要一个什么样的东西的编写代码的方式。这也是在开发构建用户界面时最友好的方式。在 React 当中，你可以很轻松地告诉 React 你想要一个什么样的界面。我们使用一种叫做 JSX 的类似于 HTML/XML 的 JavaScript 语法扩展来和 React 交流：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<应用>
    <输入框></输入框>
    <按钮></按钮>
</应用>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;应用&gt;</span>
    <span class="hljs-section">&lt;输入框&gt;</span><span class="hljs-section">&lt;/输入框&gt;</span>
    <span class="hljs-section">&lt;按钮&gt;</span><span class="hljs-section">&lt;/按钮&gt;</span>
<span class="hljs-section">&lt;/应用&gt;</span></code></pre>
<p>这就好像我们可以直接对 React 说：</p>
<blockquote><p>这里我要一个按钮！<br>这里我要一个表单！</p></blockquote>
<p>是不是非常的直观明了呢？</p>
<p><strong>组件化</strong></p>
<p>在 React 当中，我们是以组件（Component）的概念来划分用户界面的。通常我们开发的页面都可以拆成一个个通用的组件，例如导航、表单、列表项、页脚等等。</p>
<p>使用 React 可以在很大程度上提高你代码的可复用性，编写页面就如搭积木一般简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<应用>
    <导航/>
    <注册表单/>
    <页脚/>
</应用>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;应用&gt;</span>
    <span class="hljs-section">&lt;导航/&gt;</span>
    <span class="hljs-section">&lt;注册表单/&gt;</span>
    <span class="hljs-section">&lt;页脚/&gt;</span>
<span class="hljs-section">&lt;/应用&gt;</span></code></pre>
<p>这也同样意味着，我们除了可以在开发页面时复用自己编写的组件以外，还能把别人编写好的通用组件直接拿过来用。自定义一下样式，传个数据进去，组合起来，一个页面分分钟就搞定。</p>
<p><strong>一次学习，随处编写</strong></p>
<p>React 最强大的地方在于，其内部实现的虚拟DOM屏蔽了所有的底层实现，通过不同的渲染器（renderer），你编写的同一套代码可以用来构建包含 <strong>浏览器/桌面操作系统/Android/iOS</strong> 等几乎所有平台的用户界面。也就是说，掌握了 React 之后，你的能力将不止局限于写网页，而是可以在几乎所有的平台上开发用户界面。</p>
<p>这也就是为什么我们使用 React 的时候需要调用两个库 react 和 react-dom，react 库文件用来实现 React 的核心功能，react-dom 则用来把它渲染到浏览器当中。</p>
<p>目前已有的其他平台的解决方案还包括：</p>
<ul>
<li>React Native</li>
<li>React VR</li>
<li>React XP</li>
</ul>
<p>例如在使用 React Native 的时候，我们同样是使用 react 核心库来实现基础功能，然后通过 react-native 库将我们编写的界面渲染到移动端上。</p>
<p>也就是说，有了 React 之后，我们可以用一种统一的描述方式来开发用户界面，至于在什么平台上实现，只要有相应的渲染器（renderer），我们就能够把我们开发的界面在对应的平台上面渲染出来。例如在美剧《西部世界》当中，React 甚至可以用来编写人工智能 Host 的故事线：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010641964" src="https://static.alili.tech/img/remote/1460000010641964" alt="西部世界代码图.jpg" title="西部世界代码图.jpg" style="cursor: pointer;"></span></p>
<h4>用 React 编写组件</h4>
<p><strong>React 组件</strong></p>
<p>我们用 React 编写的代码绝大多数都是组件的代码。编写 React 组件需要遵循 React 内部的一系列规范，因此用 React 编写出来的应用自带前端工程化属性。不管新手还是老司机，只要是用 React 写组件，我们都能保证他写出来的代码是差不多的。这也就非常有利于一个项目组当中多个开发者之间进行协作。非常适合高级做架构，中级封组件，初级写业务的模式。</p>
<p>React 组件其实就相当于 JavaScript 当中的一种函数，接受应用数据作为参数，内部进行一系列处理（包含事件处理函数、生命周期函数等，此处不展开讲），返回一个 React 元素。</p>
<p><strong>React 元素</strong></p>
<p>这里要注意到，React 组件和 React 元素是两个不同的概念。React 元素是 React 组件的一部分，也就是 React 组件返回的要拿来渲染的内容。</p>
<h4>JSX</h4>
<p>在 React 当中，我们通过一种叫做 JSX 的 JavaScript 语法扩展来描述 React 元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const title = <h1>Counter</h1>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> title = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Counter<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;</code></pre>
<p>这里特别要注意的是，JSX 既不是原生的 HTML，也不是 jQuery 当中的字符串 <code>$('&lt;h1&gt;Counter&lt;/h1&gt;')</code> ，更不是 pug(jade) 当中的模板 <code>h1 Counter</code>。这是 React 内部自己的一套实现，可以允许你像写 HTML 一样，在 JavaScript 代码当中直接写页面，React 会在随后的渲染过程当中自动把 JSX 转译成页面当中真实的 DOM 元素。</p>
<h4>函数定义组件 &amp; 类定义组件</h4>
<p>在 React 当中，有两种定义组件的方式。（注：在 react@15.6 当中已经废弃了 <code>createClass</code> 方法，如果你从来没用过 React 请自动忽略）</p>
<p><strong>函数定义组件</strong></p>
<p>比较简单的一些，只接受外部传入的数据的组件，我们一般通过函数定义的方式来编写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Button = function(props) {
    return <button onClick={props.onClick}>+</button>;
}

// 当然也可以用 ES6 的 箭头函数 arrow function

const Number = ({ number }) => <p>{number}</p>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">var</span> Button = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{props.onClick}</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}

<span class="hljs-comment">// 当然也可以用 ES6 的 箭头函数 arrow function</span>

<span class="hljs-keyword">const</span> <span class="hljs-built_in">Number</span> = <span class="hljs-function">(<span class="hljs-params">{ number }</span>) =&gt;</span> &lt;p&gt;{number}&lt;<span class="hljs-regexp">/p&gt;;</span></code></pre>
<p><strong>props &amp; state</strong></p>
<p>上述示例当中的 props 就是组件数据的一种。在 React 当中，最常用的组件数据有两种：props 和 state.</p>
<p>其中 props 是从外部传入的，内部无法修改，用来渲染展示的数据。</p>
<p>而 state 则是组件内部维护，可以跟随应用状态改变而改变的数据（例如用户输入的表单项）。</p>
<p><strong>类定义组件</strong></p>
<p>比较复杂的，需要处理事件，调用生命周期函数，与服务器交互数据的组件，我们通过类定义组件的方式来声明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 从 React 库当中获取组件的基础支持
const { Component } = React;
// 使用 ES6 当中的 class 关键字来声明组件
class Container extends Component {
    /* 类中的构造方法，调用super方法来确保我们能够获取到this，组件自身的 state 数据也在构造方法当中初始化。*/
    constructor() {
        super();
        this.state = {
            number: 0
        }
    }
    /* 事件处理方法，在 React 当中我们通过调用 `setState` 方法来修改 state 数据，这样才能触发组件在界面当中自动重新渲染更新 */
    handleClick() {
        this.setState({number: this.state.number+1});
    }
    // 渲染方法，返回 React 元素
    render() {
        return (
            <div>
                <Title />
                <Number number={this.state.number} />
                <Button onClick={() => this.handleClick()} />
            </div>
            );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code class="jsx">// 从 React 库当中获取组件的基础支持
const { Component } = React;
// 使用 ES6 当中的 class 关键字来声明组件
class Container extends Component {
    /* 类中的构造方法，调用super方法来确保我们能够获取到this，组件自身的 <span class="hljs-keyword">state</span> 数据也在构造方法当中初始化。*/
    constructor() {
        super();
        this.<span class="hljs-keyword">state</span> = {
            number: <span class="hljs-number">0</span>
        }
    }
    /* 事件处理方法，在 React 当中我们通过调用 `<span class="hljs-built_in">set</span>State` 方法来修改 <span class="hljs-keyword">state</span> 数据，这样才能触发组件在界面当中自动重新渲染更新 */
    handleClick() {
        this.<span class="hljs-built_in">set</span>State({number: this.<span class="hljs-keyword">state</span>.number+<span class="hljs-number">1</span>});
    }
    // 渲染方法，返回 React 元素
    render() {
        return (
            <span class="hljs-variable">&lt;div&gt;</span>
                <span class="hljs-variable">&lt;Title /&gt;</span>
                <span class="hljs-variable">&lt;Number number={this.state.number} /&gt;</span>
                <span class="hljs-variable">&lt;Button onClick={() =&gt;</span> this.handleClick()} /&gt;
            &lt;/div&gt;
            );
    }
}</code></pre>
<h4>展示组件 &amp; 容器组件</h4>
<p>在本文的开头我们已经介绍过了，React 是一个视图层的框架，也就是说它只有 V，而真正在编写前端代码的时候，除了页面展示的内容以外，我们还需要进行处理用户输入、验证表单、和服务器进行数据交互之类的操作。</p>
<p>那么在实际的编码过程当中，我们要如何解耦这些应用的业务逻辑和用户界面的结构样式呢？</p>
<p>这时我们就需要引入一组展示组件和容器组件的概念。</p>
<p><strong>展示组件</strong></p>
<ul>
<li>主要负责用户界面的结构和样式。</li>
<li>从 props 接收父组件传递来的数据。</li>
<li>大多数情况可以通过函数定义组件声明。</li>
</ul>
<p><strong>容器组件</strong></p>
<ul>
<li>主要负责组件如何交互，业务逻辑等。</li>
<li>拥有自身的state，从服务器获取数据，或与 redux 等其他数据处理模块协作。</li>
<li>需要通过类定义组件声明，可以包含生命周期函数、事件处理函数等。</li>
</ul>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 展示组件
const Button = props => <button onClick={props.onClick}>+</button>;
// 容器组件
class Counter extends Component {
  constructor() {
    super();
    this.state = {
      number: 0
    }
  }
  
  handleClick() {
    this.setState({number: this.state.number + 1});
  }
  
  render() {
    return (
      <div>
        <Title />
        <Number number={this.state.number} />
        <Button onClick={() => this.handleClick()} />
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-comment">// 展示组件</span>
const <span class="hljs-type">Button</span> = props =&gt; &lt;button onClick={props.onClick}&gt;+&lt;/button&gt;;
<span class="hljs-comment">// 容器组件</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.state = {
      number: <span class="hljs-number">0</span>
    }
  }
  
  handleClick() {
    <span class="hljs-keyword">this</span>.setState({number: <span class="hljs-keyword">this</span>.state.number + <span class="hljs-number">1</span>});
  }
  
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;<span class="hljs-type">Title</span> /&gt;
        &lt;<span class="hljs-type">Number</span> number={<span class="hljs-keyword">this</span>.state.number} /&gt;
        &lt;<span class="hljs-type">Button</span> onClick={() =&gt; <span class="hljs-keyword">this</span>.handleClick()} /&gt;
      &lt;/div&gt;
    )
  }
}</code></pre>
<h3 id="articleHeader1">Redux</h3>
<h4>Redux 又是什么？</h4>
<p>在上述 React 部分的介绍当中，我们已经提到了，React 用来处理数据的方式主要有 props 和 state 两种（另外还有一种不常用的 <a href="https://discountry.github.io/react/docs/context.html" rel="nofollow noreferrer" target="_blank">context</a>）。</p>
<p>其中的 props 必须是从父组件传递到子组件，如果嵌套层级很多，props 必须逐级从保存数据的组件层层传递到使用 props 的组件当中。而 state 在使用的时候，必须通过调用 <code>this.setState()</code> 方法，在改变 state 值的同时，触发 React 组件运行的生命周期，来触发界面的更新。 <code>this.setState()</code> 方法可以传递数据、方法、回调函数。在同一次操作中，连续调用多次  <code>this.setState()</code> 方法也会造成许多难以预料的结果，仅仅通过看代码你很难判断出最后值会变成什么。</p>
<p>而我们使用 React 开发界面的主要场景是在Web应用当中，不同于传统的以内容为主的网页。Web应用涉及到非常多的状态数据的改变，包括用户的交互、服务器通信、界面的动画、样式的改变等等内容。</p>
<p>我们在开头也提到了，React 是一个专注于视图层的库，在数据的改变，状态管理方面，它并没有做得很好。因此，当我们的应用复杂到一定程度时，就需要引入一些其他的工具库来帮助我们解决状态管理的问题。</p>
<h4>什么是状态管理</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Component(state) = View" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">Component(<span class="hljs-keyword">state</span>) = View</code></pre>
<p>我们通过一个简单的公式来说明这个问题。在 React 的理念当中，组件其实就是一个方法，我们向组件方法传入数据得出要渲染的视图内容。</p>
<p>这里之所以把传入的数据称为 <strong>状态(state)</strong> ，是因为在一个应用当中，许多数据都是处于变化当中的，根据用户的不同操作响应发生改变（比如说在我们计数器的示例当中，点击按钮，计数器的数字就会随之改变增加）。</p>
<p>也就是说，我们看到的视图，网页的内容，如果把应用状态数据不同的改变不同的时刻看作是一段动画的话，页面在某一刻显示的内容其实就是动画的某一帧。</p>
<p>所以，我们在开发构建界面时，除了界面的样式和逻辑以外，如何处理状态数据就成了另外一个我们需要主要关注的问题。这一问题的解决方案，自然也就叫做状态管理了。</p>
<h4>用 Redux 管理应用的状态数据</h4>
<p><a href="https://discountry.github.io/react/docs/thinking-in-react.html" rel="nofollow noreferrer" target="_blank">React 应用的开发理念</a>告诉我们，在一个应用当中，如果有两个组件需要使用同一数据，那么我们需要把这一组数据提升到它们共同的父组件当中保存；在实际开发当中，应该尽量控制有状态组件（含有 state 的组件）的数量。</p>
<p>在一个Web应用当中，会涉及到显示数据的增删改查、服务器数据获取、界面切换显示内容等各种各样类型的状态数据改变。</p>
<p>那么我们为什么不把所有的状态数据改变，用一种统一的方式描述；既然要控制有状态组件的数量，那么我们为什么不干脆直接把一个应用的所有状态数据存储在一个统一的地方集中管理？</p>
<p>这也就是 Redux 的理念。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010641965" src="https://static.alili.tech/img/remote/1460000010641965" alt="enter image description here" title="enter image description here" style="cursor: pointer;"></span></p>
<h4>Action</h4>
<p>Action 就是我们上述的，用统一的形式，描述所有改变应用状态数据的操作的方法。说白了，它其实就是一个带有 <code>type</code> 属性的 Javascript 对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: 'INCREMENT',
  value: 1
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">type</span>: <span class="hljs-string">'INCREMENT'</span>,
  <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
}</code></pre>
<p>例如在我们的计数器当中，点击按钮数字增加1的操作可以用上述格式内容的对象来描述表示。Redux 对 Action 的要求并不是非常严格，你只需要保证它包含 <code>type</code> 属性，其余的内容完全由你自己决定。当然如果你希望你制定的 Action 更加符合规范，可以遵循 <a href="https://github.com/acdlite/flux-standard-action" rel="nofollow noreferrer" target="_blank">Flux Standard Action</a> 标准。</p>
<h4>Reducer</h4>
<p>Reducer 则是 Redux 的设计理念当中最核心的方法，它接受当前的状态数据以及触发的 Action 作为参数，根据内部 <code>switch</code> 结构的逻辑判断，返回一个新的状态数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(previousState, action) => newState" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">(previousState, action) =&gt; newState</code></pre>
<p>例如在我们的计数器当中，可以抽象编写出这样一个 Reducer 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function counter(state = 0, action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + action.value
      default:
        return state
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">counter</span>(<span class="hljs-params">state = <span class="hljs-number">0</span>, action</span>) </span>{
    <span class="hljs-keyword">switch</span> (action.type) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">'INCREMENT'</span>:
        <span class="hljs-keyword">return</span> state + action.value
      <span class="hljs-keyword">default</span>:
        <span class="hljs-keyword">return</span> state
    }
}</code></pre>
<p>我们可以看到 counter 函数接受 state 和 action 两个参数，返回值则是经过一个 switch 结构判断的新的 state 数据。这样结构的函数也就是我们在使用 Redux 时编写的 Reducer 方法。</p>
<p>这是 Redux 理念当中最核心的一个部分，它决定了一个应用当中的状态数据在不同的 Action 被触发时具体会如何改变。</p>
<p>有关 Reducer 的更详细解释，可以参阅我之前发表的 <a href="https://zhuanlan.zhihu.com/p/25863768" rel="nofollow noreferrer" target="_blank">Redux 中的 reducer 到底是什么，以及它为什么叫 reducer</a> 一文。</p>
<h4>Store</h4>
<p>Store 则是 Redux 当中我们用来存储状态数据的地方，它提供了3个主要的方法：</p>
<ul>
<li>用来获取当前状态数据的 <code>getState()</code>
</li>
<li>用来触发应用 action 动作的 <code>dispatch(action)</code>
</li>
<li>用来订阅响应事件（state改变之后进行的操作）的 <code>subscribe(listener)</code>
</li>
</ul>
<p>而在使用 Redux 时，我们可以通过它提供的 <code>createStore</code> 方法，直接从 reducer 函数生成对应的 store :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { createStore } = Redux;

const store = createStore(counter);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> { createStore } = Redux;

<span class="hljs-keyword">const</span> store = createStore(counter);</code></pre>
<h4>在 React 应用当中使用 Redux</h4>
<p>我们可以直接在 React 项目当中使用 Redux:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 把之前 React 的渲染函数命名为 render
const render = () => {
  /* 传入 store.getState() 获取 Redux 当中存储的状态数据
   * 传入 store.dispatch() 方法来执行对应 action 修改状态数据
   */
  ReactDOM.render(<Counter
              number={store.getState()}
              onIncrement={() => store.dispatch({
                          type: 'INCREMENT',
                          value: 1
                        })}
             />,
             document.getElementById('root'));
}
// 调用一次 render 方法进行初次渲染
render()
// 使用 store.subscribe 方法订阅 render 这样每次 store.dispatch 方法触发时就会自动调用 render
store.subscribe(render);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code class="jsx"><span class="hljs-comment">// 把之前 React 的渲染函数命名为 render</span>
<span class="hljs-keyword">const</span> render = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">/* 传入 store.getState() 获取 Redux 当中存储的状态数据
   * 传入 store.dispatch() 方法来执行对应 action 修改状态数据
   */</span>
  ReactDOM.render(&lt;Counter
              <span class="hljs-built_in">number</span>={store.getState()}
              onIncrement={<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> store.dispatch({
                          <span class="hljs-keyword">type</span>: <span class="hljs-string">'INCREMENT'</span>,
                          value: <span class="hljs-number">1</span>
                        })}
             /&gt;,
             <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>));
}
<span class="hljs-comment">// 调用一次 render 方法进行初次渲染</span>
render()
<span class="hljs-comment">// 使用 store.subscribe 方法订阅 render 这样每次 store.dispatch 方法触发时就会自动调用 render</span>
store.subscribe(render);</code></pre>
<h4>react-redux</h4>
<p>当然，每次 Redux 当中的状态数据改变时都强制执行 ReactDOM 的 <code>render</code> 方法并不是最优选择。事实上，社区已经开发出了一个名为 react-redux 的库专门来辅助我们对 React 和 Redux 进行协同使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Provider 充当为整个 React 应用传入 Redux 当中 store 的容器组件
 * connect 用来为需要使用 store 的组件提供相应的状态数据或 dispatch 方法
 */
const { Provider, connect } = ReactRedux;
/* 我们通过 mapStateToProps 来将 Redux 当中的状态数据映射到 React 相应的 props 当中 */
const mapStateToProps = state => ({
  number: state
});

class Counter extends Component {
  constructor(props) {
    super(props);
  }
  
  handleClick() {
    // 在这里调用传入组件的 dispatch 方法
    this.props.dispatch({
      type: 'INCREMENT',
      value: 1
    });
  }
  
  render() {
    return (
      <div>
        <Title />
        <Number number={this.props.number} />
        <Button onClick={() => this.handleClick()} />
      </div>
    )
  }
}
/* 我们需要通过 connect 方法来包装一下 React 的 Counter 组件，使其获取到 Redux 的 store 当中的方法和数据 */
Counter = connect(mapStateToProps)(Counter);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* Provider 充当为整个 React 应用传入 Redux 当中 store 的容器组件
 * connect 用来为需要使用 store 的组件提供相应的状态数据或 dispatch 方法
 */</span>
<span class="hljs-keyword">const</span> { Provider, connect } = ReactRedux;
<span class="hljs-comment">/* 我们通过 mapStateToProps 来将 Redux 当中的状态数据映射到 React 相应的 props 当中 */</span>
<span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> ({
  <span class="hljs-attr">number</span>: state
});

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
  }
  
  handleClick() {
    <span class="hljs-comment">// 在这里调用传入组件的 dispatch 方法</span>
    <span class="hljs-keyword">this</span>.props.dispatch({
      <span class="hljs-attr">type</span>: <span class="hljs-string">'INCREMENT'</span>,
      <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
    });
  }
  
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;Title /&gt;
        &lt;Number number={this.props.number} /&gt;
        &lt;Button onClick={() =&gt; this.handleClick()} /&gt;
      &lt;/div&gt;
    )
  }
}
/* 我们需要通过 connect 方法来包装一下 React 的 Counter 组件，使其获取到 Redux 的 store 当中的方法和数据 */
Counter = connect(mapStateToProps)(Counter);</code></pre>
<h3 id="articleHeader2">react-router</h3>
<h4>react-router 是什么？</h4>
<p>react-router 是 React 生态圈当中前端路由功能的实现。它最大的特点是可以不用添加额外的路由配置文件，像使用所有其他 React 组件的方式一样，只需要引入几个组件就可以轻松为你的 React 应用添加前端路由的功能。</p>
<h4>什么是前端路由？</h4>
<p>我们都知道，在传统的网站当用，一个 URL 就对应着某个特定的页面。当我们在浏览器地址栏当中输入这个 URL 的时候，浏览器就会从网站的服务器请求该页面，获取相应的内容。</p>
<p>而在Web应用的开发当中，我们可以通过操纵浏览器暴露给我们的 history 接口以及异步服务器数据请求等方式，在前端就实现路由的切换，而不需要每次都让服务器后端解析 URL 路由请求再返回内容。</p>
<p>使用前端路由可以很大程度上提升Web应用，尤其是单页面应用的使用体验。</p>
<h4>在 React 应用当中使用 react-router</h4>
<p>react-router 的使用非常简单，它目前已经发行到了 v4 版本，而之前的3个版本在网络上也能找到非常多的应用。在这里我们仅拿最新的版本作为示例。在 react-router@4 版本当中，专门为Web端提供了高度封装好的 react-router-dom 库，这下我们几乎不需要任何的配置就可以直接使用前端路由功能了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 这里引入的3个方法全部都是封装好的 React 组件，使用方法和其他 React 组件几乎没有任何差别 */
const { HashRouter, Route, Redirect } = ReactRouterDOM;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 这里引入的3个方法全部都是封装好的 React 组件，使用方法和其他 React 组件几乎没有任何差别 */</span>
<span class="hljs-keyword">const</span> { HashRouter, Route, Redirect } = ReactRouterDOM;</code></pre>
<h4>HashRouter</h4>
<p><code>HashRouter</code> 为我们的应用提供了 hash 形式（也就是带#的路由）路由的功能支持。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{/* 在通常情况下，我们不需要为 HashRouter 进行任何设置，直接引入使用即可。 */}
<HashRouter>
  <App/>
</HashRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code class="jsx"><span class="xml"></span><span class="hljs-template-tag">{/* 在通常情况下，我们不需要为 <span class="hljs-name">HashRouter</span> 进行任何设置，直接引入使用即可。 */}</span><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">HashRouter</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">App</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">HashRouter</span>&gt;</span></span></code></pre>
<p>主要到在 react-router 提供的所有类型的 <code>Router</code> 组件当中，第一级的子组件有且只能有一个。因此我们在使用的时候，通常在我们应用组件的最外层包裹上一个 <code>&lt;div&gt;</code> 标签：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<HashRouter>
  <div>
    ...
  </div>
</HashRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="jsx"><span class="hljs-tag">&lt;<span class="hljs-name">HashRouter</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    ...
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">HashRouter</span>&gt;</span></code></pre>
<p>这里为了方便在线演示，所以我们使用了 <code>HashRouter</code> 组件，在实际的开发当中，更经常使用的是 <code>BrowserRouter</code> 组件，它可以为我们提供不带 <code>#</code> 的前端路由支持，更加友好。</p>
<h4>Route</h4>
<p>前端路由的主要功能就是通过判断不同的浏览器地址显示不同的内容，那么具体某个路由地址要怎么展示某个组件呢？</p>
<p>这就是 <code>Route</code> 组件为我们提供的功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<HashRouter>
    <div>
      <Route path='/:title?' component={App} />
    </div>
</HashRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="jsx"><span class="hljs-tag">&lt;<span class="hljs-name">HashRouter</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/:title?'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{App}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">HashRouter</span>&gt;</span></code></pre>
<p>其中的 path 属性用来设置匹配的目标路由地址，路由地址可以是固定的字符串，例如 home/about/user 之类的，也可以像我们示例中一样，以冒号开头将路由的地址作为参数，之后我们可以在组件当中获取到对应的路由参数（以 <code>?</code> 结尾则表示这一参数是可选的）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Title = props => <h1>{props.title}</h1>;

const App = ({ match }) => (
  <Provider store={store}>
    <Counter title={match.params.title} />
  </Provider>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code class="jsx"><span class="xml">const Title = props =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">{props.title}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>;

const App = (</span><span class="hljs-template-variable">{ match }</span><span class="xml">) =&gt; (
  <span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=</span></span><span class="hljs-template-variable">{store}</span><span class="xml"><span class="hljs-tag">&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Counter</span> <span class="hljs-attr">title</span>=</span></span><span class="hljs-template-variable">{match.params.title}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span>
);</span></code></pre>
<p>这里的 <code>match.params.title</code> 也就是我们路由参数当中对应的值了。</p>
<h4>Link</h4>
<p>有了前端路由的内容，我们还需要相应的前端路由的导航。前端路由导航的主要功能是实现浏览器地址栏 URL 的切换，并触发Web应用展示对应的内容，而不是像原生的 HTML 超链接试图向服务器发起对应 URL 的请求。</p>
<p>react-router 同样为我们提供了现成的 <code>Link</code> 导航组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<HashRouter>
    <div>
      <ul>
        <li><Link to='/react'>react</Link></li>
        <li><Link to='/redux'>redux</Link></li>
        <li><Link to='/react-router'>react-router</Link></li>
      </ul>
      <Route path='/:title?' component={App} />
    </div>
</HashRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="jsx"><span class="hljs-tag">&lt;<span class="hljs-name">HashRouter</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/react'</span>&gt;</span>react<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/redux'</span>&gt;</span>redux<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/react-router'</span>&gt;</span>react-router<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/:title?'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{App}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">HashRouter</span>&gt;</span></code></pre>
<h3 id="articleHeader3">备注</h3>
<h4>使用到所有库的链接</h4>
<ul>
<li><a href="https://github.com/facebook/react" rel="nofollow noreferrer" target="_blank">react</a></li>
<li><a href="https://github.com/reactjs/redux" rel="nofollow noreferrer" target="_blank">redux</a></li>
<li><a href="https://github.com/reactjs/react-redux" rel="nofollow noreferrer" target="_blank">react-redux</a></li>
<li><a href="https://github.com/ReactTraining/react-router" rel="nofollow noreferrer" target="_blank">react-router</a></li>
</ul>
<h4>使用库的方式</h4>
<p><strong>直接在浏览器中使用</strong></p>
<p>为了方便我们在线演示，更快地直接上手，在本文的示例当中，我们均采用了直接在浏览器当中使用这些库的方法。在 Codepen 示例当中，我已经事先引入了所有库的 CDN 文件，这些库都会向页面暴露一个全局的对象，然后我们可以通过解构赋值的方式，获取到对象当中我们要使用的方法，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { Component } = React;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> { Component } = React;</code></pre>
<p>如果你是在本地进行练习，也可以通过 <code>&lt;script&gt;</code> 标签引入相应库的 CDN 文件，之后通过相同的方式进行调用。</p>
<blockquote><p>P.S. 如果你使用最新版的 Chrome 进行调试，这些 ES6 的新特性都可以直接在浏览器当中运行，无需编译。</p></blockquote>
<p><strong>通过 npm 来使用</strong></p>
<p>在正式的开发项目当中，我们会使用 npm 来管理安装各个库，之后通过 <code>import</code>的方式来调用：</p>
<p>首先安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install react react-dom --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install react react-dom --save</code></pre>
<p>然后调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</code></pre>
<h3 id="articleHeader4">分享源码完整示例</h3>
<p>本文所有代码完整示例可以在 <a href="https://codepen.io/collection/DZBxNm/" rel="nofollow noreferrer" target="_blank">GitChat React Examples</a><button class="btn btn-xs btn-default ml10 preview" data-url="collection/DZBxNm/" data-typeid="3">点击预览</button> 在线查看调试。包含：</p>
<ul>
<li><a href="https://codepen.io/discountry/pen/XgwwNq" rel="nofollow noreferrer" target="_blank">React 版计数器</a><button class="btn btn-xs btn-default ml10 preview" data-url="discountry/pen/XgwwNq" data-typeid="3">点击预览</button></li>
<li><a href="https://codepen.io/discountry/pen/mwYYpe" rel="nofollow noreferrer" target="_blank">React+Redux 版计数器</a><button class="btn btn-xs btn-default ml10 preview" data-url="discountry/pen/mwYYpe" data-typeid="3">点击预览</button></li>
<li><a href="https://codepen.io/discountry/pen/GEaazj" rel="nofollow noreferrer" target="_blank">React+Redux+react-redux 版计数器</a><button class="btn btn-xs btn-default ml10 preview" data-url="discountry/pen/GEaazj" data-typeid="3">点击预览</button></li>
<li><a href="https://codepen.io/discountry/pen/mwYZmw" rel="nofollow noreferrer" target="_blank">React+Redux+react-redux+react-router 版计数器</a><button class="btn btn-xs btn-default ml10 preview" data-url="discountry/pen/mwYZmw" data-typeid="3">点击预览</button></li>
</ul>
<h3 id="articleHeader5">学习资源推荐</h3>
<h4>文档</h4>
<ul>
<li><a href="https://discountry.github.io/react/" rel="nofollow noreferrer" target="_blank">React 中文文档</a></li>
<li><a href="http://cn.redux.js.org/index.html" rel="nofollow noreferrer" target="_blank">Redux 中文文档</a></li>
</ul>
<h4>知乎专栏</h4>
<ul>
<li><a href="https://zhuanlan.zhihu.com/reactjs" rel="nofollow noreferrer" target="_blank">从零学习React技术栈</a></li>
<li><a href="https://zhuanlan.zhihu.com/leanreact" rel="nofollow noreferrer" target="_blank">LeanReact</a></li>
<li><a href="https://zhuanlan.zhihu.com/purerender" rel="nofollow noreferrer" target="_blank">pure render</a></li>
</ul>
<h4>编辑器插件</h4>
<ul><li><a href="https://marketplace.visualstudio.com/items?itemName=discountry.react-redux-react-router-snippets" rel="nofollow noreferrer" target="_blank">VS Code React 技术栈代码补全插件</a></li></ul>
<hr>
<p><span class="img-wrap"><img data-src="/img/bVTSrW?w=640&amp;h=640" src="https://static.alili.tech/img/bVTSrW?w=640&amp;h=640" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
GitChat · 前端 | 浅尝初试 React 技术栈

## 原文链接
[https://segmentfault.com/a/1190000010641959](https://segmentfault.com/a/1190000010641959)


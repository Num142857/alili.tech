---
title: '玩转 React（七）- 组件之间的数据共享' 
date: 2018-12-22 2:30:11
hidden: true
slug: tdv8pbpgur
categories: [reprint]
---

{{< raw >}}

                    
<p>上一篇文章 <a href="https://segmentfault.com/a/1190000011877137">玩转 React（六）- 处理事件</a> 介绍了在 React 中如何处理用户事件，以及 React 事件机制与原生 DOM 事件的差异和注意的问题，同时也介绍了事件处理函数中 this 的指向问题以及处理的几种方式及其优缺点。</p>
<p>大家在阅读的过程中有任何为题可以给我留言，同时欢迎大家加入玩转 React 微信群，我的微信号是 <strong><code>leobaba88</code></strong>，先加我好友，验证信息：<strong>玩转 React</strong>，然后我会拉你进群。</p>
<hr>
<p>今天这篇文章要讲的内容是关于多个组件之间如何共享数据，或者说是如何通信的。只有掌握了正确的组件之间通信的方式，才能在开发交互复杂的前端应用时做到游刃有余，所谓正确的方式也就是符合 React 设计理念的方式。使用一个框架时，一定要遵从框架的最佳实践，人家框架是这样设计的，你偏要那样来用，用得不爽还要喷其不好用，那就不应该了。</p>
<h1 id="articleHeader0">内容摘要</h1>
<ul>
<li>React 中的数据是单向自顶向下传递的。</li>
<li>单向数据流与双向绑定的差异。</li>
<li>最符合 React 理念的组件之间共享数据的方式。</li>
<li>数据唯一来源原则。</li>
<li>一些不好的方式。</li>
<li>先跟 Redux 打个招呼。</li>
<li>其他一些关于组件间通信的内容（context、ref）。</li>
</ul>
<h1 id="articleHeader1">组件之间通信的最佳方式</h1>
<p>现在我们就来探讨下，什么样的方式才是 React 中组件之间通信的正确方式。</p>
<p>在前面的文章中，我们有说过，React 之所以能胜任大型复杂前端项目的开发，是因为其 <strong>单向数据流</strong> 这一重要特性，单向数据流能让视图更新逻辑变得简单，从原始的对 DOM 操作变为对数据操作，简单了就容易维护。</p>
<p>React 组件中数据的流动方向是<strong>自顶向下</strong>的，也就是说在组件树中，数据只能从父组件以属性的方式传递到子组件，父组件的数据可能是其接收到的属性，也可能是自身的内部状态。</p>
<p>有些同学这里可能会比较困惑，说子组件明明可以通过一个函数属性将数据传递给父组件呀。好多同学甚至因此搞不明白单向数据流和双向绑定的差异。其实换个角度考虑一下就清楚很多了，既然“数据传递”这个词区分度不够大，那就换个区分度比较大的说法。我们可以这样理解，函数属性是子组件用来通知父组件发生了什么，它更像是子组件触发的一个事件，父组件可以依据业务逻辑来选择如何处理这个事件，它可以更新数据后重新传递给子组件，也可以置之不理。</p>
<p>函数属性（或者说事件）在组件之间通信过程中是必不可少的，但是切莫让它影响了大家对单向数据流这一概念的理解。</p>
<p>数据双向绑定不一样，在双向绑定中父组件将数据传递给子组件，子组件修改数据后会将数据回传同步给父组件，父组件是无条件接受的。这里就不过多去说哪个好哪个差了，有兴趣的同学可以自己去体会，懒一点的就坚持学习 React 吧。</p>
<h2 id="articleHeader2">状态提升（Lifting State Up）</h2>
<p>既然 React 中的数据是单向自顶向下传递的，那么符合 React 这一特性的组件通信方式就显而易见了。</p>
<p>状态提升的意思是，当组件 A 需要依赖另外一个组件 B 的内部状态，而他们又不是父子关系时，需要将组件 B 的内部状态提升到他们公共的祖先组件中管理。这样他们就都可以通过属性接收到这份数据了。</p>
<p>当组件 B 需要对数据进行变更时，可以通过函数属性来通知祖先组件对数据更新，然后重新传递给子组件。</p>
<h2 id="articleHeader3">唯一数据来源（Single source of truth）</h2>
<p>有些同学可能又会迷惑，为什么多个组件之间必须要共用同一份数据，我可不可以引入一个事件库，一个组件分发事件，另一个组件注册相应的事件来接受数据自己维护。</p>
<p>类似的方案五花八门，会有很多，我认为这样做当然是不好的，会有如下问题：</p>
<ol>
<li>破坏了组件的封装性，易于复用的组件都是相对独立的，它只需要定义自己需要的数据和行为（函数属性）即可，我不需要谁帮我分发事件。</li>
<li>数据传递是不连续的，这样做会增加项目的复杂性，当项目到一定阶段后，对这份数据的依赖就变得千丝万缕、难以维护了。</li>
<li>相同的数据会有多个副本，需要保证数据同步，在增加项目复杂性的同时也提高了出现BUG的几率。</li>
</ol>
<p>这是我个人的看法，我也确实有遇到过这种用法，有不同意见大家可以进群交流。</p>
<p>数据唯一来源是官方推荐的数据共享的原则，也是最符合 React 设计理念，与单向数据流特性相辅相成的，希望大家务必遵守。</p>
<h2 id="articleHeader4">Redux</h2>
<p>Redux 是一个状态管理库，它不是专属于 React 技术栈的，但是跟 React 配合起来相当不错。</p>
<p>当我们的前端应用规模较小的时候，我们可以不引入任何的状态管理工具，只需要依据上面说的状态提升的方式来管理应用状态即可。为了让应用的状态更直观，你可以将跟组件作为状态总线，来管理整个应用所有的状态。而且对于小规模的项目是推荐这样来做的，没有必要高射炮打蚊子，过渡设计。</p>
<p>但是当前端应用规模变得比较复杂时，我们就需要有类似 Redux 这样一个来专门进行状态管理的东西了。它的职责如下：</p>
<ol>
<li>维护一个数据仓库（store）管理整个应用的状态（state），确保数据的唯一来源。</li>
<li>可以通过 dispatch 方法分发一个 action，来通知 Redux 需要对数据进行变更。</li>
<li>Redux 接收到 action 后可以依据 action 的类型对 state 进行相应的修改。</li>
<li>数据跟新后 Redux 会触发注册的监听器（如：更新组件属性），完成视图更新。</li>
</ol>
<p>Redux 跟 React 一起来用，更详细的介绍可以参考：<a href="https://redux.js.org/docs/basics/UsageWithReact.html" rel="nofollow noreferrer" target="_blank">官方文档</a>，这里大家可以先简单了解下，在后面关于 React 实战的文章中也会详细介绍 Redux 的使用。</p>
<p>类似的状态管理工具还有：<a href="https://mobx.js.org/" rel="nofollow noreferrer" target="_blank">MobxJS</a>，感兴趣的同学也可以了解下。</p>
<h1 id="articleHeader5">关于组件通信的其他内容</h1>
<p>在 React 中还有一些其他的与组件间通信相关的知识，这里也顺便跟大家介绍下。</p>
<h2 id="articleHeader6">context</h2>
<p>首先说一下，这是一个不推荐使用的特性，React 官方有明确说明，这是一个实验性的API，可能会在后面的版本中去掉这个东西。所以我是从来不用的，呵呵！</p>
<p>context 的作用是啥呢，当大家有过 React 实战经验时，很容易遇到这种场景，如果组件的层级组织得不合适，可能会嵌套的非常深，当底层的一个组件需要使用顶层一个组件的数据时，需要通过属性一层层传递下去，非常繁琐。</p>
<p>context 就是解决这个问题的，只需要在顶层组件中声明 context，那它的所有子组件可以通过 this.context 直接获取得到。如下实例所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    return (
      <button style="{{"background: this.context.color"}}">
        {this.props.children}
      </button>
    );
  }
}

Button.contextTypes = {
  color: PropTypes.string
};

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  getChildContext() {
    return {color: &quot;purple&quot;};
  }

  render() {
    const children = this.props.messages.map((message) =>
      <Message text={message.text} />
    );
    return <div>{children}</div>;
  }
}

MessageList.childContextTypes = {
  color: PropTypes.string
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> <span class="hljs-type">PropTypes</span> from <span class="hljs-symbol">'prop</span>-types';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;button style="{{"background: <span class="hljs-keyword">this</span>.context.color"}}"&gt;
        {<span class="hljs-keyword">this</span>.props.children}
      &lt;/button&gt;
    );
  }
}

<span class="hljs-type">Button</span>.contextTypes = {
  color: <span class="hljs-type">PropTypes</span>.string
};

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Message</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        {<span class="hljs-keyword">this</span>.props.text} &lt;<span class="hljs-type">Button</span>&gt;<span class="hljs-type">Delete</span>&lt;/<span class="hljs-type">Button</span>&gt;
      &lt;/div&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MessageList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  getChildContext() {
    <span class="hljs-keyword">return</span> {color: <span class="hljs-string">"purple"</span>};
  }

  render() {
    const children = <span class="hljs-keyword">this</span>.props.messages.map((message) =&gt;
      &lt;<span class="hljs-type">Message</span> text={message.text} /&gt;
    );
    <span class="hljs-keyword">return</span> &lt;div&gt;{children}&lt;/div&gt;;
  }
}

<span class="hljs-type">MessageList</span>.childContextTypes = {
  color: <span class="hljs-type">PropTypes</span>.string
};</code></pre>
<p>实例中，组件层级关系是：MessageList -&gt; Message -&gt; Button。</p>
<p>MessageList 组件中维护一个 <code>color</code> 值用于 Button 组件的背景色，一般情况下我们需要将 color 以属性的方式传给 Message 组件，再通过属性传给 Button 组件。然后在实例中，通过 React 的 context 功能，MessageList 可以将 color 的值越过 Message 直接传给 Button。</p>
<p>是不是很方便？确实很方便，但是这会导致数据传递不连续，过度使用会使得项目逻辑变得不直观，增加项目维护的复杂性。</p>
<h2 id="articleHeader7">ref</h2>
<p>每一个 React 组件有一个特殊的属性 <code>ref</code>，该属性的值可以是一个字符串，也可以是一个函数。由于字符串形式的 ref 在内部实现和实际使用中存在诸多问题，官方不推荐使用，而且可能在未来的版本中会移除，所以我们也没必要聊它了，只要大家在看到字符串形式的 ref 属性时知道也有这种用法就可以了。</p>
<p>当 <code>ref</code> 属性值是一个函数时，如果组件是一个 HTML 元素兼容的 React 内部组件时（如：div、img 等），函数接收其对应的原生 DOM 节点作为参数。<strong>如果组件是一个我们以类的方式定义的组件时，函数接收该组件类的实例作为参数。</strong>需要注意的是，如果组件是一个以函数的方式定义的组件，那么设置为 <code>ref</code> 值得函数永远都会接收到一个 <code>null</code>。</p>
<p>那么 <code>ref</code> 与组件之间的通信有什么关系呢？请看上段文字加粗内容和下面这个实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      age: null
    }
  }
  formData() {
    return this.state
  }
  handleFieldChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  render() {
    return (
      <div>
        <input
          type=&quot;text&quot;
          name=&quot;name&quot;
          placeholder=&quot;Name&quot;
          onChange={e => this.handleFieldChange(e)}
        />
        <input
          type=&quot;text&quot;
          name=&quot;age&quot;
          placeholder=&quot;Age&quot;
          onChange={e => this.handleFieldChange(e)}
        />
      </div>
    )
  }
}
class App extends React.Component {
  handleSubmit() {
    const formData = this.form.formData()
    alert(`formData: ${JSON.stringify(formData)}`)
  }
  render() {
    return (
      <div>
        <UserForm ref={form => {this.form = form"}}" />
        <button onClick={() => this.handleSubmit()}>Submit</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UserForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props)
    <span class="hljs-keyword">this</span>.state = {
      name: <span class="hljs-literal">null</span>,
      age: <span class="hljs-literal">null</span>
    }
  }
  formData() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.state
  }
  handleFieldChange(e) {
    const { name, value } = e.target
    <span class="hljs-keyword">this</span>.setState({
      [name]: value
    })
  }
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;input
          <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>
          name=<span class="hljs-string">"name"</span>
          placeholder=<span class="hljs-string">"Name"</span>
          onChange={e =&gt; <span class="hljs-keyword">this</span>.handleFieldChange(e)}
        /&gt;
        &lt;input
          <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>
          name=<span class="hljs-string">"age"</span>
          placeholder=<span class="hljs-string">"Age"</span>
          onChange={e =&gt; <span class="hljs-keyword">this</span>.handleFieldChange(e)}
        /&gt;
      &lt;/div&gt;
    )
  }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  handleSubmit() {
    const formData = <span class="hljs-keyword">this</span>.form.formData()
    alert(`formData: ${<span class="hljs-type">JSON</span>.stringify(formData)}`)
  }
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;<span class="hljs-type">UserForm</span> ref={form =&gt; {<span class="hljs-keyword">this</span>.form = form"}}" /&gt;
        &lt;button onClick={() =&gt; <span class="hljs-keyword">this</span>.handleSubmit()}&gt;<span class="hljs-type">Submit</span>&lt;/button&gt;
      &lt;/div&gt;
    )
  }
}

<span class="hljs-type">ReactDOM</span>.render(&lt;<span class="hljs-type">App</span> /&gt;, document.querySelector('#root'))</code></pre>
<p>演示地址：<a href="https://codepen.io/Sarike/pen/OOKYXJ" rel="nofollow noreferrer" target="_blank">https://codepen.io/Sarike/pen...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Sarike/pen/OOKYXJ" data-typeid="3">点击预览</button></p>
<p>既然通过 <code>ref</code> 能够获取子组件的实例，那么我们自然可以调用其成员方法，从而获取数据。</p>
<p>当然，目前这确实能工作，但绝对不是一种好的方式。因为作为一个组件，是需要有一定的封装性的，它应该对外只会承诺我接受什么样的属性，而不会承诺有什么样的成员方法。换句话说，如果 JavaScript 的类支持私有成员方法，那么 React 组件类中的成员方法都应该定义成私有的。</p>
<p>这应该属于一种 Hack 的使用方式，而且这样做有悖单向数据流原则。</p>
<p>ref 有它自己的使用场景，这里只是说明这种方式不适用于组件之间通信。</p>
<h1 id="articleHeader8">总结</h1>
<p>虽然啰嗦了这么多，实际上只希望大家知道一件事情，<strong>请使用状态提升的方式在多个组件之间共享数据，切记维持应用单向数据流和数据唯一来源原则。</strong></p>
<p>文章中有些观点仁者见仁，有什么疑惑欢迎留言讨论。</p>
<p>好久没更新了，但是没有放弃，感谢大家支持。欢迎加我微信好友：<code>leobaba88</code>，进群交流。验证信息：<code>玩转 React</code>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
玩转 React（七）- 组件之间的数据共享

## 原文链接
[https://segmentfault.com/a/1190000012365876](https://segmentfault.com/a/1190000012365876)


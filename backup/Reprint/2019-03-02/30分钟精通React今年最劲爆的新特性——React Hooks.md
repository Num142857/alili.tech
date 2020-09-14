---
title: '30分钟精通React今年最劲爆的新特性——React Hooks' 
date: 2019-03-02 2:30:07
hidden: true
slug: 304a32r2py8
categories: [reprint]
---

{{< raw >}}

                    
<p>你还在为该使用无状态组件（Function）还是有状态组件（Class）而烦恼吗？<br>  ——拥有了hooks，你再也不需要写Class了，你的所有组件都将是Function。</p>
<p>你还在为搞不清使用哪个生命周期钩子函数而日夜难眠吗？<br>  ——拥有了Hooks，生命周期钩子函数可以先丢一边了。</p>
<p>你在还在为组件中的this指向而晕头转向吗？<br>  ——既然Class都丢掉了，哪里还有this？你的人生第一次不再需要面对this。</p>
<p>这样看来，说React Hooks是今年最劲爆的新特性真的毫不夸张。如果你也对react感兴趣，或者正在使用react进行项目开发，答应我，请一定抽出至少30分钟的时间来阅读本文好吗？所有你需要了解的React Hooks的知识点，本文都涉及到了，相信完整读完后你一定会有所收获。</p>
<h2 id="articleHeader0">一个最简单的Hooks</h2>
<p>首先让我们看一下一个简单的有状态组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>class Example extends React.Component {
  constructor(props) {
    super(props);
    this.<span class="hljs-keyword">state</span> = {
      count: <span class="hljs-number">0</span>
    };
  }

  render() {
    return (
      <span class="hljs-variable">&lt;div&gt;</span>
        <span class="hljs-variable">&lt;p&gt;</span>You clicked {this.<span class="hljs-keyword">state</span>.count} times&lt;/p&gt;
        <span class="hljs-variable">&lt;button onClick={() =&gt;</span> this.<span class="hljs-built_in">set</span>State({ count: this.<span class="hljs-keyword">state</span>.count + <span class="hljs-number">1</span> })}&gt;
          Click me
        &lt;/button&gt;
      &lt;/div&gt;
    );
  }
}</code></pre>
<p>我们再来看一下使用hooks后的版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> [count, setCount] = useState(<span class="hljs-number">0</span>);

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>You clicked {count} times<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setCount(count + 1)}&gt;
        Click me
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}</code></pre>
<p>是不是简单多了！可以看到，<code>Example</code>变成了一个函数，但这个函数却有自己的状态（count），同时它还可以更新自己的状态（setCount）。这个函数之所以这么了不得，就是因为它注入了一个hook--<code>useState</code>，就是这个hook让我们的函数变成了一个有状态的函数。</p>
<p>除了<code>useState</code>这个hook外，还有很多别的hook，比如<code>useEffect</code>提供了类似于<code>componentDidMount</code>等生命周期钩子的功能，<code>useContext</code>提供了上下文（context）的功能等等。</p>
<p>Hooks本质上就是一类特殊的函数，它们可以为你的函数型组件（function component）注入一些特殊的功能。咦？这听起来有点像被诟病的Mixins啊？难道是Mixins要在react中死灰复燃了吗？当然不会了，等会我们再来谈两者的区别。总而言之，这些hooks的目标就是让你不再写class，让function一统江湖。</p>
<h2 id="articleHeader1">React为什么要搞一个Hooks？</h2>
<h3 id="articleHeader2">想要复用一个有状态的组件太麻烦了！</h3>
<p>我们都知道react都核心思想就是，将一个页面拆成一堆独立的，可复用的组件，并且用自上而下的单向数据流的形式将这些组件串联起来。但假如你在大型的工作项目中用react，你会发现你的项目中实际上很多react组件冗长且难以复用。尤其是那些写成class的组件，它们本身包含了状态（state），所以复用这类组件就变得很麻烦。</p>
<p>那之前，官方推荐怎么解决这个问题呢？答案是：<a href="https://reactjs.org/docs/render-props.html" rel="nofollow noreferrer" target="_blank">渲染属性（Render Props）</a>和<a href="/img/bVbjfuz">高阶组件（Higher-Order Components）</a>。我们可以稍微跑下题简单看一下这两种模式。</p>
<p>渲染属性指的是使用一个值为函数的prop来传递需要动态渲染的nodes或组件。如下面的代码可以看到我们的<code>DataProvider</code>组件包含了所有跟状态相关的代码，而<code>Cat</code>组件则可以是一个单纯的展示型组件，这样一来<code>DataProvider</code>就可以单独复用了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Cat from 'components/cat'
class DataProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { target: 'Zac' };
  }

  render() {
    return (
      <div>
        {this.props.render(this.state)}
      </div>
    )
  }
}

<DataProvider render={data => (
  <Cat target={data.target} />
)}/>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">Cat</span> from <span class="hljs-symbol">'components</span>/cat'
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DataProvider</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = { target: <span class="hljs-symbol">'Za</span>c' };
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        {<span class="hljs-keyword">this</span>.props.render(<span class="hljs-keyword">this</span>.state)}
      &lt;/div&gt;
    )
  }
}

&lt;<span class="hljs-type">DataProvider</span> render={data =&gt; (
  &lt;<span class="hljs-type">Cat</span> target={data.target} /&gt;
)}/&gt;
</code></pre>
<p>虽然这个模式叫Render Props，但不是说非用一个叫render的props不可，习惯上大家更常写成下面这种：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
<DataProvider>
  {data => (
    <Cat target={data.target} />
  )}
</DataProvider>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>...
<span class="hljs-tag">&lt;<span class="hljs-name">DataProvider</span>&gt;</span>
  {data =&gt; (
    <span class="hljs-tag">&lt;<span class="hljs-name">Cat</span> <span class="hljs-attr">target</span>=<span class="hljs-string">{data.target}</span> /&gt;</span>
  )}
<span class="hljs-tag">&lt;/<span class="hljs-name">DataProvider</span>&gt;</span></code></pre>
<p>高阶组件这个概念就更好理解了，说白了就是一个函数接受一个组件作为参数，经过一系列加工后，最后返回一个新的组件。看下面的代码示例，<code>withUser</code>函数就是一个高阶组件，它返回了一个新的组件，这个组件具有了它提供的获取用户信息的功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const withUser = WrappedComponent => {
  const user = sessionStorage.getItem(&quot;user&quot;);
  return props => <WrappedComponent user={user} {...props} />;
};

const UserPage = props => (
  <div class=&quot;user-container&quot;>
    <p>My name is {props.user}!</p>
  </div>
);

export default withUser(UserPage);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> withUser = <span class="hljs-function"><span class="hljs-params">WrappedComponent</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> user = sessionStorage.getItem(<span class="hljs-string">"user"</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> &lt;WrappedComponent user={user} {...props} /&gt;;
};

<span class="hljs-keyword">const</span> UserPage = <span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"user-container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>My name is {props.user}!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> withUser(UserPage);</code></pre>
<p>以上这两种模式看上去都挺不错的，很多库也运用了这种模式，比如我们常用的React Router。但我们仔细看这两种模式，会发现它们会增加我们代码的层级关系。最直观的体现，打开devtool看看你的组件层级嵌套是不是很夸张吧。这时候再回过头看我们上一节给出的hooks例子，是不是简洁多了，没有多余的层级嵌套。把各种想要的功能写成一个一个可复用的自定义hook，当你的组件想用什么功能时，直接在组件里调用这个hook即可。</p>
<p><span class="img-wrap"><img data-src="/img/bVbjfuz?w=923&amp;h=590" src="https://static.alili.tech/img/bVbjfuz?w=923&amp;h=590" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">生命周期钩子函数里的逻辑太乱了吧！</h3>
<p>我们通常希望一个函数只做一件事情，但我们的生命周期钩子函数里通常同时做了很多事情。比如我们需要在<code>componentDidMount</code>中发起ajax请求获取数据，绑定一些事件监听等等。同时，有时候我们还需要在<code>componentDidUpdate</code>做一遍同样的事情。当项目变复杂后，这一块的代码也变得不那么直观。</p>
<h3 id="articleHeader4">classes真的太让人困惑了！</h3>
<p>我们用class来创建react组件时，还有一件很麻烦的事情，就是this的指向问题。为了保证this的指向正确，我们要经常写这样的代码：<code>this.handleClick = this.handleClick.bind(this)</code>，或者是这样的代码：<code>&lt;button onClick={() =&gt; this.handleClick(e)}&gt;</code>。一旦我们不小心忘了绑定this，各种bug就随之而来，很麻烦。</p>
<p>还有一件让我很苦恼的事情。我在之前的react系列文章当中曾经说过，尽可能把你的组件写成无状态组件的形式，因为它们更方便复用，可独立测试。然而很多时候，我们用function写了一个简洁完美的无状态组件，后来因为需求变动这个组件必须得有自己的state，我们又得很麻烦的把function改成class。</p>
<p>在这样的背景下，Hooks便横空出世了！</p>
<h2 id="articleHeader5">什么是State Hooks？</h2>
<p>回到一开始我们用的例子，我们分解来看到底state hooks做了什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> [count, setCount] = useState(<span class="hljs-number">0</span>);

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>You clicked {count} times<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setCount(count + 1)}&gt;
        Click me
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}</code></pre>
<h3 id="articleHeader6">声明一个状态变量</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> [count, setCount] = useState(<span class="hljs-number">0</span>);</code></pre>
<p><code>useState</code>是react自带的一个hook函数，它的作用就是用来声明状态变量。<code>useState</code>这个函数接收的参数是我们的状态初始值（initial state），它返回了一个数组，这个数组的第<code>[0]</code>项是当前当前的状态值，第<code>[1]</code>项是可以改变状态值的方法函数。</p>
<p>所以我们做的事情其实就是，声明了一个状态变量count，把它的初始值设为0，同时提供了一个可以更改count的函数setCount。</p>
<p>上面这种表达形式，是借用了es6的数组解构（<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring" rel="nofollow noreferrer" target="_blank">array destructuring</a>），它可以让我们的代码看起来更简洁。不清楚这种用法的可以先去看下我的这篇文章<a href="https://segmentfault.com/a/1190000004365693">30分钟掌握ES6/ES2015核心内容（上）</a>。</p>
<p>如果不用数组解构的话，可以写成下面这样。实际上数组解构是一件开销很大的事情，用下面这种写法，或者改用对象解构，性能会有很大的提升。具体可以去这篇文章的分析<a href="https://docs.google.com/document/d/1hWb-lQW4NSG9yRpyyiAA_9Ktytd5lypLnVLhPX9vamE/edit#" rel="nofollow noreferrer" target="_blank">Array destructuring for multi-value returns (in light of React hooks)</a>，这里不详细展开，我们就按照官方推荐使用数组解构就好。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let _useState = useState(0);
let count = _useState[0];
let setCount = _useState[1];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> <span class="hljs-attr">_useState</span> = useState(<span class="hljs-number">0</span>);
<span class="hljs-keyword">let</span> <span class="hljs-attr">count</span> = _useState[<span class="hljs-number">0</span>];
<span class="hljs-keyword">let</span> <span class="hljs-attr">setCount</span> = _useState[<span class="hljs-number">1</span>];</code></pre>
<h3 id="articleHeader7">读取状态值</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>You clicked {count} times</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code style="word-break: break-word; white-space: initial;"><span class="hljs-params">&lt;p&gt;</span>You <span class="hljs-class">clicked </span>{count} times<span class="hljs-params">&lt;/p&gt;</span></code></pre>
<p>是不是超简单？因为我们的状态count就是一个单纯的变量而已，我们再也不需要写成<code>{this.state.count}</code>这样了。</p>
<h3 id="articleHeader8">更新状态</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <button onClick={() => setCount(count + 1)}>
    Click me
  </button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setCount(count + 1)}&gt;
    Click me
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>当用户点击按钮时，我们调用setCount函数，这个函数接收的参数是修改过的新状态值。接下来的事情就交给react了，react将会重新渲染我们的Example组件，并且使用的是更新后的新的状态，即count=1。这里我们要停下来思考一下，Example本质上也是一个普通的函数，为什么它可以记住之前的状态？</p>
<h3 id="articleHeader9">一个至关重要的问题</h3>
<p>这里我们就发现了问题，通常来说我们在一个函数中声明的变量，当函数运行完成后，这个变量也就销毁了（这里我们先不考虑闭包等情况），比如考虑下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(n) {
    const result = 0;
    return result + 1;
}

add(1); //1
add(1); //1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>function <span class="hljs-keyword">add</span><span class="bash">(n) {
</span>    const result = <span class="hljs-number">0</span>;
    return result + <span class="hljs-number">1</span>;
}

<span class="hljs-keyword">add</span><span class="bash">(1); //1
</span><span class="hljs-keyword">add</span><span class="bash">(1); //1
</span></code></pre>
<p>不管我们反复调用add函数多少次，结果都是1。因为每一次我们调用add时，result变量都是从初始值0开始的。那为什么上面的Example函数每次执行的时候，都是拿的上一次执行完的状态值作为初始值？答案是：是react帮我们记住的。至于react是用什么机制记住的，我们可以再思考一下。</p>
<h3 id="articleHeader10">假如一个组件有多个状态值怎么办？</h3>
<p>首先，useState是可以多次调用的，所以我们完全可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ExampleWithManyStates() {
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ExampleWithManyStates</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">const</span> [age, setAge] = useState(<span class="hljs-number">42</span>);
  <span class="hljs-keyword">const</span> [fruit, setFruit] = useState(<span class="hljs-string">'banana'</span>);
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState([{ text: <span class="hljs-string">'Learn Hooks'</span> }]);</code></pre>
<p>其次，useState接收的初始值没有规定一定要是string/number/boolean这种简单数据类型，它完全可以接收对象或者数组作为参数。唯一需要注意的点是，之前我们的<code>this.setState</code>做的是合并状态后返回一个新状态，而<code>useState</code>是直接替换老状态后返回新状态。最后，react也给我们提供了一个useReducer的hook，如果你更喜欢redux式的状态管理方案的话。</p>
<p>从ExampleWithManyStates函数我们可以看到，useState无论调用多少次，相互之间是独立的。这一点至关重要。为什么这么说呢？</p>
<p>其实我们看hook的“形态”，有点类似之前被官方否定掉的Mixins这种方案，都是提供一种“插拔式的功能注入”的能力。而mixins之所以被否定，是因为Mixins机制是让多个Mixins共享一个对象的数据空间，这样就很难确保不同Mixins依赖的状态不发生冲突。</p>
<p>而现在我们的hook，一方面它是直接用在function当中，而不是class；另一方面每一个hook都是相互独立的，不同组件调用同一个hook也能保证各自状态的独立性。这就是两者的本质区别了。</p>
<h3 id="articleHeader11">react是怎么保证多个useState的相互独立的？</h3>
<p>还是看上面给出的ExampleWithManyStates例子，我们调用了三次useState，每次我们传的参数只是一个值（如42，‘banana’），我们根本没有告诉react这些值对应的key是哪个，那react是怎么保证这三个useState找到它对应的state呢？</p>
<p>答案是，react是根据useState出现的顺序来定的。我们具体来看一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //第一次渲染
  useState(42);  //将age初始化为42
  useState('banana');  //将fruit初始化为banana
  useState([{ text: 'Learn Hooks' }]); //...

  //第二次渲染
  useState(42);  //读取状态变量age的值（这时候传的参数42直接被忽略）
  useState('banana');  //读取状态变量fruit的值（这时候传的参数banana直接被忽略）
  useState([{ text: 'Learn Hooks' }]); //..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-comment">//第一次渲染</span>
  <span class="hljs-selector-tag">useState</span>(<span class="hljs-number">42</span>);  <span class="hljs-comment">//将age初始化为42</span>
  <span class="hljs-selector-tag">useState</span>(<span class="hljs-string">'banana'</span>);  <span class="hljs-comment">//将fruit初始化为banana</span>
  <span class="hljs-selector-tag">useState</span>([{ <span class="hljs-attribute">text</span>: <span class="hljs-string">'Learn Hooks'</span> }]); <span class="hljs-comment">//...</span>

  <span class="hljs-comment">//第二次渲染</span>
  <span class="hljs-selector-tag">useState</span>(<span class="hljs-number">42</span>);  <span class="hljs-comment">//读取状态变量age的值（这时候传的参数42直接被忽略）</span>
  <span class="hljs-selector-tag">useState</span>(<span class="hljs-string">'banana'</span>);  <span class="hljs-comment">//读取状态变量fruit的值（这时候传的参数banana直接被忽略）</span>
  <span class="hljs-selector-tag">useState</span>([{ <span class="hljs-attribute">text</span>: <span class="hljs-string">'Learn Hooks'</span> }]); <span class="hljs-comment">//...</span></code></pre>
<p>假如我们改一下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let showFruit = true;
function ExampleWithManyStates() {
  const [age, setAge] = useState(42);
  
  if(showFruit) {
    const [fruit, setFruit] = useState('banana');
    showFruit = false;
  }
 
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> showFruit = <span class="hljs-literal">true</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ExampleWithManyStates</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> [age, setAge] = useState(<span class="hljs-number">42</span>);
  
  <span class="hljs-keyword">if</span>(showFruit) {
    <span class="hljs-keyword">const</span> [fruit, setFruit] = useState(<span class="hljs-string">'banana'</span>);
    showFruit = <span class="hljs-literal">false</span>;
  }
 
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState([{ <span class="hljs-attr">text</span>: <span class="hljs-string">'Learn Hooks'</span> }]);</code></pre>
<p>这样一来，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //第一次渲染
  useState(42);  //将age初始化为42
  useState('banana');  //将fruit初始化为banana
  useState([{ text: 'Learn Hooks' }]); //...

  //第二次渲染
  useState(42);  //读取状态变量age的值（这时候传的参数42直接被忽略）
  // useState('banana');  
  useState([{ text: 'Learn Hooks' }]); //读取到的却是状态变量fruit的值，导致报错" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-comment">//第一次渲染</span>
  <span class="hljs-selector-tag">useState</span>(<span class="hljs-number">42</span>);  <span class="hljs-comment">//将age初始化为42</span>
  <span class="hljs-selector-tag">useState</span>(<span class="hljs-string">'banana'</span>);  <span class="hljs-comment">//将fruit初始化为banana</span>
  <span class="hljs-selector-tag">useState</span>([{ <span class="hljs-attribute">text</span>: <span class="hljs-string">'Learn Hooks'</span> }]); <span class="hljs-comment">//...</span>

  <span class="hljs-comment">//第二次渲染</span>
  <span class="hljs-selector-tag">useState</span>(<span class="hljs-number">42</span>);  <span class="hljs-comment">//读取状态变量age的值（这时候传的参数42直接被忽略）</span>
  <span class="hljs-comment">// useState('banana');  </span>
  <span class="hljs-selector-tag">useState</span>([{ <span class="hljs-attribute">text</span>: <span class="hljs-string">'Learn Hooks'</span> }]); <span class="hljs-comment">//读取到的却是状态变量fruit的值，导致报错</span></code></pre>
<p>鉴于此，react规定我们必须把hooks写在函数的最外层，不能写在ifelse等条件语句当中，来确保hooks的执行顺序一致。</p>
<h2 id="articleHeader12">什么是Effect Hooks?</h2>
<p>我们在上一节的例子中增加一个新功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 类似于componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 更新文档的标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { useState, useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> [count, setCount] = useState(<span class="hljs-number">0</span>);

  <span class="hljs-comment">// 类似于componentDidMount 和 componentDidUpdate:</span>
  useEffect(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// 更新文档的标题</span>
    <span class="hljs-built_in">document</span>.title = <span class="hljs-string">`You clicked <span class="hljs-subst">${count}</span> times`</span>;
  });

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>You clicked {count} times<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setCount(count + 1)}&gt;
        Click me
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}</code></pre>
<p>我们对比着看一下，如果没有hooks，我们会怎么写？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>class Example extends React.Component {
  constructor(props) {
    super(props);
    this.<span class="hljs-keyword">state</span> = {
      count: <span class="hljs-number">0</span>
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.<span class="hljs-keyword">state</span>.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.<span class="hljs-keyword">state</span>.count} times`;
  }

  render() {
    return (
      <span class="hljs-variable">&lt;div&gt;</span>
        <span class="hljs-variable">&lt;p&gt;</span>You clicked {this.<span class="hljs-keyword">state</span>.count} times&lt;/p&gt;
        <span class="hljs-variable">&lt;button onClick={() =&gt;</span> this.<span class="hljs-built_in">set</span>State({ count: this.<span class="hljs-keyword">state</span>.count + <span class="hljs-number">1</span> })}&gt;
          Click me
        &lt;/button&gt;
      &lt;/div&gt;
    );
  }
}
</code></pre>
<p>我们写的有状态组件，通常会产生很多的副作用（side effect），比如发起ajax请求获取数据，添加一些监听的注册和取消注册，手动修改dom等等。我们之前都把这些副作用的函数写在生命周期函数钩子里，比如componentDidMount，componentDidUpdate和componentWillUnmount。而现在的useEffect就相当与这些声明周期函数钩子的集合体。它以一抵三。</p>
<p>同时，由于前文所说hooks可以反复多次使用，相互独立。所以我们合理的做法是，给每一个副作用一个单独的useEffect钩子。这样一来，这些副作用不再一股脑堆在生命周期钩子里，代码变得更加清晰。</p>
<h3 id="articleHeader13">useEffect做了什么？</h3>
<p>我们再梳理一遍下面代码的逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> [count, setCount] = useState(<span class="hljs-number">0</span>);

  useEffect(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">document</span>.title = <span class="hljs-string">`You clicked <span class="hljs-subst">${count}</span> times`</span>;
  });</code></pre>
<p>首先，我们声明了一个状态变量<code>count</code>，将它的初始值设为0。然后我们告诉react，我们的这个组件有一个副作用。我们给<code>useEffect</code>hook传了一个匿名函数，这个匿名函数就是我们的副作用。在这个例子里，我们的副作用是调用browser API来修改文档标题。当react要渲染我们的组件时，它会先记住我们用到的副作用。等react更新了DOM之后，它再依次执行我们定义的副作用函数。</p>
<p>这里要注意几点：<br>第一，react首次渲染和之后的每次渲染都会调用一遍传给useEffect的函数。而之前我们要用两个声明周期函数来分别表示首次渲染（componentDidMount），和之后的更新导致的重新渲染（componentDidUpdate）。</p>
<p>第二，useEffect中定义的副作用函数的执行不会阻碍浏览器更新视图，也就是说这些函数是异步执行的，而之前的componentDidMount或componentDidUpdate中的代码则是同步执行的。这种安排对大多数副作用说都是合理的，但有的情况除外，比如我们有时候需要先根据DOM计算出某个元素的尺寸再重新渲染，这时候我们希望这次重新渲染是同步发生的，也就是说它会在浏览器真的去绘制这个页面前发生。</p>
<h3 id="articleHeader14">useEffect怎么解绑一些副作用</h3>
<p>这种场景很常见，当我们在componentDidMount里添加了一个注册，我们得马上在componentWillUnmount中，也就是组件被注销之前清除掉我们添加的注册，否则内存泄漏的问题就出现了。</p>
<p>怎么清除呢？让我们传给useEffect的副作用函数返回一个新的函数即可。这个新的函数将会在组件下一次重新渲染之后执行。这种模式在一些pubsub模式的实现中很常见。看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // 一定注意下这个顺序：告诉react在下次重新渲染组件之后，同时是下次调用ChatAPI.subscribeToFriendStatus之前执行cleanup
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { useState, useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FriendStatus</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">const</span> [isOnline, setIsOnline] = useState(<span class="hljs-literal">null</span>);

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleStatusChange</span>(<span class="hljs-params">status</span>) </span>{
    setIsOnline(status.isOnline);
  }

  useEffect(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    <span class="hljs-comment">// 一定注意下这个顺序：告诉react在下次重新渲染组件之后，同时是下次调用ChatAPI.subscribeToFriendStatus之前执行cleanup</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cleanup</span>(<span class="hljs-params"></span>) </span>{
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  <span class="hljs-keyword">if</span> (isOnline === <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">'Loading...'</span>;
  }
  <span class="hljs-keyword">return</span> isOnline ? <span class="hljs-string">'Online'</span> : <span class="hljs-string">'Offline'</span>;
}</code></pre>
<p>这里有一个点需要重视！这种解绑的模式跟componentWillUnmount不一样。componentWillUnmount只会在组件被销毁前执行一次而已，而useEffect里的函数，每次组件渲染后都会执行一遍，包括副作用函数返回的这个清理函数也会重新执行一遍。所以我们一起来看一下下面这个问题。</p>
<h3 id="articleHeader15">为什么要让副作用函数每次组件更新都执行一遍？</h3>
<p>我们先看以前的模式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      <span class="hljs-keyword">this</span>.props.friend.id,
      <span class="hljs-keyword">this</span>.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      <span class="hljs-keyword">this</span>.props.friend.id,
      <span class="hljs-keyword">this</span>.handleStatusChange
    );
  }</code></pre>
<p>很清除，我们在componentDidMount注册，再在componentWillUnmount清除注册。但假如这时候<code>props.friend.id</code>变了怎么办？我们不得不再添加一个componentDidUpdate来处理这种情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
  componentDidUpdate(prevProps) {
    // 先把上一个friend.id解绑
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // 再重新注册新但friend.id
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>...
  componentDidUpdate(prevProps) {
    <span class="hljs-comment">// 先把上一个friend.id解绑</span>
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      <span class="hljs-keyword">this</span>.handleStatusChange
    );
    <span class="hljs-comment">// 再重新注册新但friend.id</span>
    ChatAPI.subscribeToFriendStatus(
      <span class="hljs-keyword">this</span>.props.friend.id,
      <span class="hljs-keyword">this</span>.handleStatusChange
    );
  }
...</code></pre>
<p>看到了吗？很繁琐，而我们但useEffect则没这个问题，因为它在每次组件更新后都会重新执行一遍。所以代码的执行顺序是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.页面首次渲染
2.替friend.id=1的朋友注册

3.突然friend.id变成了2
4.页面重新渲染
5.清除friend.id=1的绑定
6.替friend.id=2的朋友注册
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>页面首次渲染
<span class="hljs-number">2.</span>替friend.id=<span class="hljs-number">1</span>的朋友注册

<span class="hljs-number">3.</span>突然friend.id变成了<span class="hljs-number">2</span>
<span class="hljs-number">4.</span>页面重新渲染
<span class="hljs-number">5.</span>清除friend.id=<span class="hljs-number">1</span>的绑定
<span class="hljs-number">6.</span>替friend.id=<span class="hljs-number">2</span>的朋友注册
...</code></pre>
<h3 id="articleHeader16">怎么跳过一些不必要的副作用函数</h3>
<p>按照上一节的思路，每次重新渲染都要执行一遍这些副作用函数，显然是不经济的。怎么跳过一些不必要的计算呢？我们只需要给useEffect传第二个参数即可。用第二个参数来告诉react只有当这个参数的值发生改变时，才执行我们传的副作用函数（第一个参数）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 只有当count的值发生变化时，才会重新执行`document.title`这一句" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>useEffect(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">document</span>.title = `<span class="javascript">You clicked ${count} times</span>`;
}, [count]); <span class="hljs-regexp">//</span> 只有当count的值发生变化时，才会重新执行`<span class="javascript"><span class="hljs-built_in">document</span>.title</span>`这一句</code></pre>
<p>当我们第二个参数传一个空数组[]时，其实就相当于只在首次渲染的时候执行。也就是componentDidMount加componentWillUnmount的模式。不过这种用法可能带来bug，少用。</p>
<h2 id="articleHeader17">还有哪些自带的Effect Hooks?</h2>
<p>除了上文重点介绍的useState和useEffect，react还给我们提供来很多有用的hooks：</p>
<p>useContext<br>useReducer<br>useCallback<br>useMemo<br>useRef<br>useImperativeMethods<br>useMutationEffect<br>useLayoutEffect</p>
<p>我不再一一介绍，大家自行去查阅官方文档。</p>
<h2 id="articleHeader18">怎么写自定义的Effect Hooks?</h2>
<p>为什么要自己去写一个Effect Hooks? 这样我们才能把可以复用的逻辑抽离出来，变成一个个可以随意插拔的“插销”，哪个组件要用来，我就插进哪个组件里，so easy！看一个完整的例子，你就明白了。</p>
<p>比如我们可以把上面写的FriendStatus组件中判断朋友是否在线的功能抽出来，新建一个useFriendStatus的hook专门用来判断某个id是否在线。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { useState, useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">useFriendStatus</span>(<span class="hljs-params">friendID</span>) </span>{
  <span class="hljs-keyword">const</span> [isOnline, setIsOnline] = useState(<span class="hljs-literal">null</span>);

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleStatusChange</span>(<span class="hljs-params">status</span>) </span>{
    setIsOnline(status.isOnline);
  }

  useEffect(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  <span class="hljs-keyword">return</span> isOnline;
}</code></pre>
<p>这时候FriendStatus组件就可以简写为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FriendStatus</span><span class="hljs-params">(props)</span> </span>{
  <span class="hljs-keyword">const</span> isOnline = useFriendStatus(props.friend.id);

  <span class="hljs-keyword">if</span> (isOnline === <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">'Loading...'</span>;
  }
  <span class="hljs-keyword">return</span> isOnline ? <span class="hljs-string">'Online'</span> : <span class="hljs-string">'Offline'</span>;
}</code></pre>
<p>简直Perfect！假如这个时候我们又有一个朋友列表也需要显示是否在线的信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style="{{" color: isOnline ? 'green' : 'black' "}}">
      {props.friend.name}
    </li>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FriendListItem</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">const</span> isOnline = useFriendStatus(props.friend.id);

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">color:</span> <span class="hljs-attr">isOnline</span> ? '<span class="hljs-attr">green</span>' <span class="hljs-attr">:</span> '<span class="hljs-attr">black</span>' "}}"&gt;</span>
      {props.friend.name}
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  );
}</code></pre>
<p>简直Fabulous!</p>
<h2 id="articleHeader19">结尾</h2>
<p>不知道你阅读完整篇文章的感受如何，或者对hooks有任何角度的看法和思考都欢迎在评论区一起讨论。另外如果你有换工作的打算，我们部门真的很缺人，欢迎私信勾搭～（阿里巴巴，base在深圳的部门）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
30分钟精通React今年最劲爆的新特性——React Hooks

## 原文链接
[https://segmentfault.com/a/1190000016950339](https://segmentfault.com/a/1190000016950339)


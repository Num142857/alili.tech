---
title: 学习React之前你需要知道的的JavaScript基础知识
hidden: true
categories: [reprint]
slug: 7f16801f
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>在我的研讨会期间，更多的材料是关于JavaScript而不是React。其中大部分归结为JavaScript ES6以及功能和语法，但也包括三元运算符，语言中的简写版本，此对象，JavaScript内置函数（map，reduce，filter）或更常识性的概念，如：可组合性，可重用性，不变性或高阶函数。这些是基础知识，在开始使用React之前你不需要掌握这些基础知识，但在学习或实践它时肯定会出现这些基础知识。</p>
<p>以下演练是我尝试为您提供一个几乎广泛但简明的列表，其中列出了所有不同的JavaScript功能，以补充您的React应用程序。如果您有任何其他不在列表中的内容，只需对本文发表评论，我会及时更新。</p>
<h2>目录</h2>
<ul>
<li><a href="https://www.robinwieruch.de/javascript-fundamentals-react-requirements/#react-javascript">从JavaScript中学习React</a></li>
<li><a href="https://www.robinwieruch.de/javascript-fundamentals-react-requirements/#react-javascript-classes">React 和 JavaScript Classes</a></li>
<li><a href="https://www.robinwieruch.de/javascript-fundamentals-react-requirements/#react-arrow-functions">React中的箭头函数</a></li>
<li><a href="https://www.robinwieruch.de/javascript-fundamentals-react-requirements/#react-javascript-functional-components">作为React中的组件的fuuction</a></li>
<li><a href="https://www.robinwieruch.de/javascript-fundamentals-react-requirements/#react-class-component-syntax">React类组件语法</a></li>
<li><a href="https://www.robinwieruch.de/javascript-fundamentals-react-requirements/#react-javascript-map-reduce-filter">在React中的Map, Reduce 和 Filter</a></li>
<li><a href="https://www.robinwieruch.de/javascript-fundamentals-react-requirements/#react-javascript-variables">React中的var，let和const</a></li>
<li><a href="https://www.robinwieruch.de/javascript-fundamentals-react-requirements/#react-ternary-operator"> React中的三元运算符</a></li>
<li><a href="https://www.robinwieruch.de/javascript-fundamentals-react-requirements/#react-import-export-statements">React中的Import 和 Export</a></li>
<li><a href="https://www.robinwieruch.de/javascript-fundamentals-react-requirements/#react-libraries">React中的库</a></li>
<li><a href="https://www.robinwieruch.de/javascript-fundamentals-react-requirements/#react-higher-order-functions">React中的高阶函数</a></li>
<li><a href="https://www.robinwieruch.de/javascript-fundamentals-react-requirements/#react-destructuring-spread-operator">React中的解构和传播运算符</a></li>
<li><a href="https://www.robinwieruch.de/javascript-fundamentals-react-requirements/#react-javascript-learn">There is more JavaScript than React</a></li>
</ul>
<h2>从JavaScript中学习React</h2>
<p>当你进入React的世界时，通常是使用用于启动React项目的 <a href="https://github.com/facebook/create-react-app">create-react-app</a>。设置项目后，您将遇到以下React类组件：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> logo <span class="hljs-keyword">from</span> <span class="hljs-string">'./logo.svg'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./App.css'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"logo"</span> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome to React<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
          To get started, edit <span class="hljs-tag">&lt;<span class="hljs-name">code</span>&gt;</span>src/App.js<span class="hljs-tag">&lt;/<span class="hljs-name">code</span>&gt;</span> and save to reload.
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}

export default App;

</span></code></pre>
<p>可以说，React类组件可能不是最好的起点。新手有许多东西需要消化，不一定是React：类语句，类方法和继承。导入语句也只是在学习React时增加了复杂性。尽管主要焦点应该是JSX（React的语法），但通常所有的事情都需要解释。这篇文章应该揭示所有的东西，大部分是JavaScript，而不用担心React。</p>
<h2>React和JavaScript类</h2>
<p>在开始时遇到React类组件，需要有关JavaScript类的基础只是。JavaScript类在语言中是相当新的。以前，只有<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain">JavaScript的原型链</a>也可以用于继承。JavaScript类在原型继承之上构建，使整个事物更简单。</p>
<p>定义React组件的一种方法是使用JavaScript类。为了理解JavaScript类，您可以花一些时间在没有React的情况下学习它们。</p>
<pre><code class="hljs kotlin"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Developer</span> </span>{
  <span class="hljs-keyword">constructor</span>(firstname, lastname) {
    <span class="hljs-keyword">this</span>.firstname = firstname;
    <span class="hljs-keyword">this</span>.lastname = lastname;
  }

  getName() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.firstname + <span class="hljs-string">' '</span> + <span class="hljs-keyword">this</span>.lastname;
  }
}

<span class="hljs-keyword">var</span> me = new Developer(<span class="hljs-string">'Robin'</span>, <span class="hljs-string">'Wieruch'</span>);

console.log(me.getName());

</code></pre>
<p>类描述了一个实体，该实体用作创建该实体实例的蓝图。一旦使用<code>new</code>语句创建了类的实例，就会调用该类的构造函数，该实例化该类的实例。因此，类可以具有通常位于其构造函数中的属性。此外，类方法（例如getName（））用于读取（或写入）实例的数据。类的实例在类中表示为此对象，但实例外部仅指定给JavaScript变量。</p>
<p>通常，类用于面向对象编程中的继承。它们在JavaScript中用于相同的，而extends语句可用于从另一个类继承一个类。具有extends语句的更专业的类继承了更通用类的所有功能，但可以向其添加其专用功能。</p>
<pre><code class="hljs scala"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Developer</span> </span>{
  constructor(firstname, lastname) {
    <span class="hljs-keyword">this</span>.firstname = firstname;
    <span class="hljs-keyword">this</span>.lastname = lastname;
  }

  getName() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.firstname + ' ' + <span class="hljs-keyword">this</span>.lastname;
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ReactDeveloper</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Developer</span> </span>{
  getJob() {
    <span class="hljs-keyword">return</span> <span class="hljs-symbol">'React</span> <span class="hljs-type">Developer</span>';
  }
}

<span class="hljs-keyword">var</span> me = <span class="hljs-keyword">new</span> <span class="hljs-type">ReactDeveloper</span>(<span class="hljs-symbol">'Robi</span>n', <span class="hljs-symbol">'Wieruc</span>h');

console.log(me.getName());
console.log(me.getJob());

</code></pre>
<p>基本上，它只需要完全理解React类组件。 JavaScript类用于定义React组件，但正如您所看到的，React组件只是一个React组件，因为它继承了从React包导入的React Component类的所有功能。</p>
<pre><code class="hljs scala"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;h1&gt;<span class="hljs-type">Welcome</span> to <span class="hljs-type">React</span>&lt;/h1&gt;
      &lt;/div&gt;
    );
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">App</span>;

</code></pre>
<p>这就是为什么render（）方法在React类组件中是必需的：来自导入的React包的React组件指示您使用它在浏览器中显示某些内容。此外，如果不从React组件扩展，您将无法使用其他<a href="https://reactjs.org/docs/react-component.html">生命周期方法</a> （包括render（）方法）。例如，不存在componentDidMount（）生命周期方法，因为该组件将是vanilla JavaScript类的实例。并且不仅生命周期方法会消失，React的API方法（例如用于本地状态管理的this.setState（））也不可用。</p>
<p>但是，正如您所看到的，使用JavaScript类有利于使用您的专业行为扩展通用类。因此，您可以引入自己的类方法或属性。</p>
<pre><code class="hljs scala"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  getGreeting() {
    <span class="hljs-keyword">return</span> <span class="hljs-symbol">'Welcome</span> to <span class="hljs-type">React</span>';
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;h1&gt;{<span class="hljs-keyword">this</span>.getGreeting()}&lt;/h1&gt;
      &lt;/div&gt;
    );
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">App</span>;

</code></pre>
<p>现在您知道为什么React使用JavaScript类来定义React类组件。当您需要访问React的API（生命周期方法，this.state和this.setState（））时，可以使用它们。在下文中，您将看到如何以不同的方式定义React组件，而不使用JavaScript类，因为您可能不需要始终使用类方法，生命周期方法和状态。</p>
<p>毕竟，JavaScript类欢迎使用React中的继承，这对于React来说不是一个理想的结果，<a href="https://reactjs.org/docs/composition-vs-inheritance.html">因为React更喜欢组合而不是继承</a>。因此，您应该为您的React组件扩展的唯一类应该是官方的React组件。</p>
<h2>React中的箭头函数</h2>
<p>When teaching someone about React, I explain <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions">JavaScript arrow functions</a> pretty early. They are one of JavaScript’s language additions in ES6 which pushed JavaScript forward in functional programming.</p>
<p>在教关于React时，我很早就解释了<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions">JavaScript arrow functions</a>。它们是ES6中JavaScript的语言添加之一，它推动了JavaScript在函数式编程中的发展。</p>
<pre><code class="hljs fortran">// JavaScript ES5 <span class="hljs-function"><span class="hljs-keyword">function</span></span>
<span class="hljs-function"><span class="hljs-keyword">function</span></span> getGreeting() {
  <span class="hljs-keyword">return</span> <span class="hljs-string">'Welcome to JavaScript'</span>;
}

// JavaScript ES6 arrow <span class="hljs-function"><span class="hljs-keyword">function</span></span> with body
const getGreeting = () =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-string">'Welcome to JavaScript'</span>;
}

// JavaScript ES6 arrow <span class="hljs-function"><span class="hljs-keyword">function</span></span> without body and <span class="hljs-keyword">implicit</span> <span class="hljs-keyword">return</span>
const getGreeting = () =&gt;
  <span class="hljs-string">'Welcome to JavaScript'</span>;

</code></pre>
<p>JavaScript箭头函数通常用在React应用程序中，以保持代码简洁和可读。尝试从JavaScript ES5到ES6功能重构我的功能。在某些时候，当JavaScript ES5函数和JavaScript ES6函数之间的差异很明显时，我坚持使用JavaScript ES6的方式来实现箭头函数。但是，我总是看到React新手的太多不同的语法可能会让人不知所措。因此，我尝试在使用它们在React中全部使用之前，使JavaScript函数的不同特性变得清晰。在以下部分中，您将了解如何在React中常用JavaScript箭头函数。</p>
<h2>作为React中的组件的function</h2>
<p>React使用不同的编程范例，因为JavaScript是一种多方面的编程语言。在面向对象编程的时候，React的类组件是利用JavaScript类这一种方式（React组件API的继承，类方法和类属性，如this.state）。另一方面，React（及其生态系统）中使用了很多的函数式编程的概念。例如，React的功能无状态组件是另一种在React中定义组件的方法。在React无状态组件就引发了一个新的思考：组件如何像函数一样使用？</p>
<pre><code class="hljs ada"><span class="hljs-keyword">function</span> <span class="hljs-title"></span>(props) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">view</span>;
}

</code></pre>
<p>它是一个接收输入（例如props）并返回显示的HTML元素（视图）的函数（函数）。它不需要管理任何状态（无状态），也不需要了解任何方法（类方法，生命周期方法）。该函数只需要使用React组件中render（）方法的呈现机制。那是在引入无状态组件的时候。</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Greeting</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{props.greeting}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}

</code></pre>
<p>无状态组件是在React中定义组件的首选方法。它们具有较少的样板，降低了复杂性，并且比React类组件更易于维护。但是，就目前而言，两者都有自己存在的意义。</p>
<p>以前，文章提到了JavaScript箭头函数以及它们如何改进您的React代码。让我们将这些函数应用于您的无状态组件。
来看看Greeting组分别使用ES5和ES6不同的写法：</p>
<pre><code class="hljs fortran">// JavaScript ES5 <span class="hljs-function"><span class="hljs-keyword">function</span></span>
<span class="hljs-function"><span class="hljs-keyword">function</span></span> Greeting(props) {
  <span class="hljs-keyword">return</span> &lt;h1&gt;{props.greeting}&lt;/h1&gt;;
}

// JavaScript ES6 arrow <span class="hljs-function"><span class="hljs-keyword">function</span></span>
const Greeting = (props) =&gt; {
  <span class="hljs-keyword">return</span> &lt;h1&gt;{props.greeting}&lt;/h1&gt;;
}

// JavaScript ES6 arrow <span class="hljs-function"><span class="hljs-keyword">function</span></span> without body and <span class="hljs-keyword">implicit</span> <span class="hljs-keyword">return</span>
const Greeting = (props) =&gt;
  &lt;h1&gt;{props.greeting}&lt;/h1&gt;

</code></pre>
<p>JavaScript箭头函数是在React中保持无状态组件简洁的好方法。当更多的时候没有计算，因此可以省略函数体和return语句。</p>
<h2>React类组件语法</h2>
<p>React定义组件的方式随着时间的推移而演变。在早期阶段，React.createClass（）方法是创建React类组件的默认方式。如今，它已不再使用，因为随着JavaScript ES6的兴起，更多的是使用ES6的方法来创建React类组件。</p>
<p>然而，JavaScript不断发展，因此JavaScript爱好者一直在寻找新的做事方式。这就是为什么你会经常发现React类组件的不同语法。使用状态和类方法定义React类组件的一种方法如下：</p>
<pre><code class="hljs pf">class Counter extends Component {
  constructor(props) {
    super(props);

    this.<span class="hljs-keyword">state</span> = {
      counter: <span class="hljs-number">0</span>,
    };

    this.<span class="hljs-keyword">on</span>Increment = this.<span class="hljs-keyword">on</span>Increment.bind(this);
    this.<span class="hljs-keyword">on</span>Decrement = this.<span class="hljs-keyword">on</span>Decrement.bind(this);
  }

  <span class="hljs-keyword">on</span>Increment() {
    this.<span class="hljs-built_in">set</span>State(<span class="hljs-keyword">state</span> =&gt; ({ counter: <span class="hljs-keyword">state</span>.counter + <span class="hljs-number">1</span> }));
  }

  <span class="hljs-keyword">on</span>Decrement() {
    this.<span class="hljs-built_in">set</span>State(<span class="hljs-keyword">state</span> =&gt; ({ counter: <span class="hljs-keyword">state</span>.counter - <span class="hljs-number">1</span> }));
  }

  render() {
    return (
      <span class="hljs-variable">&lt;div&gt;</span>
        <span class="hljs-variable">&lt;p&gt;</span>{this.<span class="hljs-keyword">state</span>.counter}&lt;/p&gt;

        <span class="hljs-variable">&lt;button onClick={this.onIncrement} type="button"&gt;</span>Increment&lt;/button&gt;
        <span class="hljs-variable">&lt;button onClick={this.onDecrement} type="button"&gt;</span>Decrement&lt;/button&gt;
      &lt;/div&gt;
    );
  }
}

</code></pre>
<p>但是，当实现大量的React类组件时，构造函数中的<a href="https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56">class方法的绑定</a> 以及首先具有构造函数变为繁琐的实现细节。幸运的是，有一个简短的语法来摆脱这两个烦恼：</p>
<pre><code class="hljs pf">class Counter extends Component {
  <span class="hljs-keyword">state</span> = {
    counter: <span class="hljs-number">0</span>,
  };

  <span class="hljs-keyword">on</span>Increment = () =&gt; {
    this.<span class="hljs-built_in">set</span>State(<span class="hljs-keyword">state</span> =&gt; ({ counter: <span class="hljs-keyword">state</span>.counter + <span class="hljs-number">1</span> }));
  }

  <span class="hljs-keyword">on</span>Decrement = () =&gt; {
    this.<span class="hljs-built_in">set</span>State(<span class="hljs-keyword">state</span> =&gt; ({ counter: <span class="hljs-keyword">state</span>.counter - <span class="hljs-number">1</span> }));
  }

  render() {
    return (
      <span class="hljs-variable">&lt;div&gt;</span>
        <span class="hljs-variable">&lt;p&gt;</span>{this.<span class="hljs-keyword">state</span>.counter}&lt;/p&gt;

        <span class="hljs-variable">&lt;button onClick={this.onIncrement} type="button"&gt;</span>Increment&lt;/button&gt;
        <span class="hljs-variable">&lt;button onClick={this.onDecrement} type="button"&gt;</span>Decrement&lt;/button&gt;
      &lt;/div&gt;
    );
  }
}

</code></pre>
<p>通过使用JavaScript箭头函数，您可以自动绑定类方法，而无需在构造函数中绑定它们。通过将状态直接定义为类属性，也可以在不使用props时省略构造函数。 （注意：请注意，<a href="https://babeljs.io/docs/en/babel-plugin-transform-class-properties/">类属性</a> 尚未使用JavaScript语言。）因此，您可以说这种定义React类组件的方式比其他版本更简洁。</p>
<h2>React中的模板文字</h2>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals">模板文字</a>是JavaScript ES6附带的另一种JavaScript语言特定功能。值得一提的是，因为当JavaScript和React的新手看到它们时，它们也会让人感到困惑。以下是你正在用的连接字符串的语法：</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getGreeting</span>(<span class="hljs-params">what</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">'Welcome to '</span> + what;
}

<span class="hljs-keyword">const</span> greeting = getGreeting(<span class="hljs-string">'JavaScript'</span>);
<span class="hljs-built_in">console</span>.log(greeting);
<span class="hljs-comment">// Welcome to JavaScript</span>

</code></pre>
<p>模板文字可以用于相同的文字文字，称为字符串插值：</p>
<pre><code class="hljs ada"><span class="hljs-keyword">function</span> <span class="hljs-title">getGreeting</span>(what) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">Welcome</span> to ${what};
}

</code></pre>
<p>您只需使用<code>` `</code>和${}表示法来插入JavaScript原语。但是，字符串文字不仅用于字符串插值，还用于JavaScript中的多行字符串：</p>
<pre><code class="hljs ada"><span class="hljs-keyword">function</span> <span class="hljs-title">getGreeting</span>(what) {
  <span class="hljs-keyword">return</span> 
    <span class="hljs-type">Welcome</span>
    to
    ${what}
  ;
}

</code></pre>
<p>基本上，这就是如何在多行上格式化更大的文本块。最近在<a href="https://www.robinwieruch.de/react-with-graphql-tutorial/">JavaScript中引入了GraphQL也可以看出它</a> 。</p>
<h2>React中的Map, Reduce 和 Filter</h2>
<p>为React新手教授JSX语法的最佳方法是什么？通常我首先在render（）方法中定义一个变量，并在返回块中将其用作HTML中的JavaScript。</p>
<pre><code class="hljs scala"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">var</span> greeting = <span class="hljs-symbol">'Welcome</span> to <span class="hljs-type">React</span>';
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;h1&gt;{greeting}&lt;/h1&gt;
      &lt;/div&gt;
    );
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">App</span>;

</code></pre>
<p>您只需使用花括号来获取HTML格式的JavaScript。从渲染字符串到复杂对象并没有什么不同。</p>
<pre><code class="hljs scala"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">var</span> user = { name: <span class="hljs-symbol">'Robi</span>n' };
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;h1&gt;{user.name}&lt;/h1&gt;
      &lt;/div&gt;
    );
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">App</span>;

</code></pre>
<p>通常接下来的问题是：如何呈现一个项目列表？在我看来，这是解释React最好的部分之一。没有特定于React的API，例如HTML标记上的自定义属性，使您可以在React中呈现多个项目。您可以使用纯JavaScript来迭代项目列表并返回每个项目的HTML。</p>
<pre><code class="hljs scala"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">var</span> users = [
      { name: <span class="hljs-symbol">'Robi</span>n' },
      { name: <span class="hljs-symbol">'Marku</span>s' },
    ];

    <span class="hljs-keyword">return</span> (
      &lt;ul&gt;
        {users.map(function (user) {
          <span class="hljs-keyword">return</span> &lt;li&gt;{user.name}&lt;/li&gt;;
        })}
      &lt;/ul&gt;
    );
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">App</span>;

</code></pre>
<p>之前使用过JavaScript箭头函数，你可以摆脱箭头函数体和return语句，使你的渲染输出更加简洁。</p>
<pre><code class="hljs scala"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">var</span> users = [
      { name: <span class="hljs-symbol">'Robi</span>n' },
      { name: <span class="hljs-symbol">'Marku</span>s' },
    ];

    <span class="hljs-keyword">return</span> (
      &lt;ul&gt;
        {users.map(user =&gt; &lt;li&gt;{user.name}&lt;/li&gt;)}
      &lt;/ul&gt;
    );
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">App</span>;

</code></pre>
<p>很快，每个React开发人员都习惯了数组的内置JavaScript map（）方法。映射数组并返回每个项的渲染输出非常有意义。这同样适用于自定义的情况，其中filter（）或reduce（）更有意义，而不是为每个映射项呈现输出。</p>
<pre><code class="hljs scala"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">var</span> users = [
      { name: <span class="hljs-symbol">'Robi</span>n', isDeveloper: <span class="hljs-literal">true</span> },
      { name: <span class="hljs-symbol">'Marku</span>s', isDeveloper: <span class="hljs-literal">false</span> },
    ];

    <span class="hljs-keyword">return</span> (
      &lt;ul&gt;
        {users
          .filter(user =&gt; user.isDeveloper)
          .map(user =&gt; &lt;li&gt;{user.name}&lt;/li&gt;)
        }
      &lt;/ul&gt;
    );
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">App</span>;

</code></pre>
<p>通常，这就是React开发人员如何习惯这些JavaScript内置函数，而不必使用React特定的API。它只是HTML中的JavaScript。</p>
<h2>React中的var，let和const</h2>
<p>使用var，let和const的不同变量声明对于React的新手来说可能会造成混淆，即使它们不是React特定的。也许是因为当React变得流行时引入了JavaScript ES6。总的来说，我尝试在我的工作室中尽早介绍let和const。它只是从在React组件中与const交换var开始：</p>
<pre><code class="hljs scala"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    const users = [
      { name: <span class="hljs-symbol">'Robi</span>n' },
      { name: <span class="hljs-symbol">'Marku</span>s' },
    ];

    <span class="hljs-keyword">return</span> (
      &lt;ul&gt;
        {users.map(user =&gt; &lt;li&gt;{user.name}&lt;/li&gt;)}
      &lt;/ul&gt;
    );
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">App</span>;

</code></pre>
<p>然后我给出了使用哪个变量声明的经验法则：</p>
<ul>
<li>（1）不要使用var，因为let和const更具体 </li>
<li>（2）默认为const，因为它不能重新分配或重新声明 </li>
<li>（3）重新赋值变量时使用let</li>
</ul>
<p>虽然let通常用于for循环来递增迭代器，但const通常用于保持JavaScript变量不变。尽管在使用const时可以更改对象和数组的内部属性，但变量声明显示了保持变量不变的意图。</p>
<h2>React中的三目运算符</h2>
<p>如果要在render中的JSX中使用if-else语句，可以使用<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator">JavaScripts三元运算符</a>来执行此操作：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> users = [
      { <span class="hljs-attr">name</span>: <span class="hljs-string">'Robin'</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">'Markus'</span> },
    ];

    <span class="hljs-keyword">const</span> showUsers = <span class="hljs-literal">false</span>;

    <span class="hljs-keyword">if</span> (!showUsers) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {users.map(user =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>)}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    );
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App;

</code></pre>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> users = [
      { <span class="hljs-attr">name</span>: <span class="hljs-string">'Robin'</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">'Markus'</span> },
    ];

    <span class="hljs-keyword">const</span> showUsers = <span class="hljs-literal">false</span>;

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        {
          showUsers ? (
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
              {users.map(user =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>)}
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
          ) : (
            null
          )
        }
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App;

</code></pre>
<p>另一种方法是，如果你只返回条件渲染的一边，则使用&amp;&amp;运算符：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> users = [
      { <span class="hljs-attr">name</span>: <span class="hljs-string">'Robin'</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">'Markus'</span> },
    ];

    <span class="hljs-keyword">const</span> showUsers = <span class="hljs-literal">false</span>;

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        {
          showUsers &amp;&amp; (
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
              {users.map(user =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>)}
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
          )
        }
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App;

</code></pre>
<p>我不会详细说明为什么会这样，但如果你很好奇，你可以在这里了解它和条件渲染的其他技术：<a href="https://www.robinwieruch.de/conditional-rendering-react/">React中的所有条件渲染</a>。毕竟，React中的条件呈现仅再次显示大多数React是JavaScript而不是React特定的任何内容。</p>
<h2>React中的Import 和 Export语句</h2>
<p>幸运的是，JavaScript社区确定了使用JavaScript ES6的<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import">import</a> 和 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export">export</a>。</p>
<p>但是，对于React和JavaScript ES6来说，这些导入和导出语句只是另一个需要在开始使用第一个React应用程序时需要解释的主题。很早就有了CSS，SVG或其他JavaScript文件的第一次导入。 create-react-app项目已经从那些import语句开始：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> logo <span class="hljs-keyword">from</span> <span class="hljs-string">'./logo.svg'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./App.css'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"logo"</span> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome to React<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
          To get started, edit <span class="hljs-tag">&lt;<span class="hljs-name">code</span>&gt;</span>src/App.js<span class="hljs-tag">&lt;/<span class="hljs-name">code</span>&gt;</span> and save to reload.
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}

export default App;

</span></code></pre>
<p>这对初学者项目来说非常棒，因为它为您提供了一个全面的体验，可以导入和导出其他文件。 App组件也会在 <em>src/index.js</em>文件中导入。但是，在React中执行第一步时，我会尝试在开始时避免这些导入。相反，我尝试专注于JSX和React组件。只有在将另一个文件中的第一个React组件或JavaScript函数分离时才会引入导入和导出语句。</p>
<p>那么这些导入和导出语句如何工作呢？假设您要在一个文件中导出以下变量：</p>
<pre><code class="hljs arduino"><span class="hljs-keyword">const</span> firstname = <span class="hljs-string">'Robin'</span>;
<span class="hljs-keyword">const</span> lastname = <span class="hljs-string">'Wieruch'</span>;

<span class="hljs-keyword">export</span> { firstname, lastname };

</code></pre>
<p>然后，您可以使用第一个文件的相对路径将它们导入到另一个文件中：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> { firstname, lastname } <span class="hljs-keyword">from</span> <span class="hljs-string">'./file1.js'</span>;

<span class="hljs-built_in">console</span>.log(firstname);
<span class="hljs-comment">// output: Robin</span>

</code></pre>
<p>因此，它不一定是关于 importing/exporting 组件或函数，而是关于共享可分配给变量的所有东西（省略CSS或SVG导入/导出，但只谈JS）。您还可以将另一个文件中的所有导出变量作为一个对象导入：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> person <span class="hljs-keyword">from</span> <span class="hljs-string">'./file1.js'</span>;

<span class="hljs-built_in">console</span>.log(person.firstname);
<span class="hljs-comment">// output: Robin</span>

</code></pre>
<p>importing可以有别名。您可能会从具有相同命名导出的多个文件中导入功能。这就是你可以使用别名的原因：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> { firstname <span class="hljs-keyword">as</span> username } <span class="hljs-keyword">from</span> <span class="hljs-string">'./file1.js'</span>;

<span class="hljs-built_in">console</span>.log(username);
<span class="hljs-comment">// output: Robin</span>

</code></pre>
<p>以前的所有案例都被命名为进口和出口。但是也存在默认声明。它可以用于一些用例：</p>
<ul>
<li>导出和导入单个功能 </li>
<li>突出显示模块的导出API的主要功能</li>
<li>具有后备导入功能</li>
</ul>
<pre><code class="hljs arduino"><span class="hljs-keyword">const</span> robin = {
  firstname: <span class="hljs-string">'Robin'</span>,
  lastname: <span class="hljs-string">'Wieruch'</span>,
};

<span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> robin;

</code></pre>
<p>您可以省略导入的大括号以导入默认导出：</p>
<pre><code class="hljs coffeescript"><span class="hljs-keyword">import</span> developer <span class="hljs-keyword">from</span> <span class="hljs-string">'./file1.js'</span>;

<span class="hljs-built_in">console</span>.log(developer);
<span class="hljs-regexp">//</span> output: { firstname: <span class="hljs-string">'Robin'</span>, lastname: <span class="hljs-string">'Wieruch'</span> }

</code></pre>
<p>此外，导入名称可能与导出的默认名称不同。您还可以将它与命名的export和import语句一起使用：</p>
<pre><code class="hljs arduino"><span class="hljs-keyword">const</span> firstname = <span class="hljs-string">'Robin'</span>;
<span class="hljs-keyword">const</span> lastname = <span class="hljs-string">'Wieruch'</span>;

<span class="hljs-keyword">const</span> person = {
  firstname,
  lastname,
};

<span class="hljs-keyword">export</span> {
  firstname,
  lastname,
};

<span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> person;

</code></pre>
<p>并在另一个文件中导入默认导出或命名导出：</p>
<pre><code class="hljs coffeescript"><span class="hljs-keyword">import</span> developer, { firstname, lastname } <span class="hljs-keyword">from</span> <span class="hljs-string">'./file1.js'</span>;

<span class="hljs-built_in">console</span>.log(developer);
<span class="hljs-regexp">//</span> output: { firstname: <span class="hljs-string">'Robin'</span>, lastname: <span class="hljs-string">'Wieruch'</span> }
<span class="hljs-built_in">console</span>.log(firstname, lastname);
<span class="hljs-regexp">//</span> output: Robin Wieruch

</code></pre>
<p>您还可以节省额外的行并直接为命名导出导出变量：</p>
<pre><code class="hljs arduino"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> firstname = <span class="hljs-string">'Robin'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> lastname = <span class="hljs-string">'Wieruch'</span>;

</code></pre>
<p>这些是ES6模块的主要功能。它们可以帮助您组织代码，维护代码和设计可重用的模块API。您还可以导出和导入功能以测试它们。</p>
<h2>React中的库</h2>
<p>React只是应用程序的视图层。 React提供了一些内部状态管理，但除此之外，它只是一个为您的浏览器呈现HTML的组件库。其他所有内容都可以从API（例如浏览器API，DOM API），JavaScript功能或外部库中添加。选择合适的库来补充React应用程序并不总是很简单，但是<a href="https://www.robinwieruch.de/essential-react-libraries-framework/">一旦您对不同的选项有了很好的概述</a>，就可以选择最适合您的技术堆栈的库。</p>
<p>例如，可以使用本机<a href="https://www.robinwieruch.de/react-fetching-data/">fetch API</a>在React中获取数据：</p>
<pre><code class="hljs scala"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = {
    data: <span class="hljs-literal">null</span>,
  };

  componentDidMount() {
    fetch(<span class="hljs-symbol">'https</span>:<span class="hljs-comment">//api.mydomain.com')</span>
      .then(response =&gt; response.json())
      .then(data =&gt; <span class="hljs-keyword">this</span>.setState({ data }));
  }

  render() {
    ...
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">App</span>;

</code></pre>
<p>但是你可以使用另一个库来获取React中的数据。 Axios是React应用程序的一个流行选择：</p>
<pre><code class="hljs scala"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> axios from <span class="hljs-symbol">'axio</span>s';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = {
    data: <span class="hljs-literal">null</span>,
  };

  componentDidMount() {
    axios.get(<span class="hljs-symbol">'https</span>:<span class="hljs-comment">//api.mydomain.com')</span>
      .then(data =&gt; <span class="hljs-keyword">this</span>.setState({ data }));
  }

  render() {
    ...
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">App</span>;

</code></pre>
<p>因此，一旦您了解了需要解决的问题，<a href="https://www.robinwieruch.de/reasons-why-i-moved-from-angular-to-react/">React广泛而创新的生态系统应该为您提供大量解决方案</a> 。这又不是关于React，而是了解所有可用于补充应用程序的不同JavaScript库。</p>
<h2>React中的高阶函数</h2>
<p>高阶函数是一个很好的编程概念，特别是在转向函数式编程时。在React中，了解这类函数是完全有意义的，因为在某些时候你必须处理高阶组件，这些组件在首先了解高阶函数时可以得到最好的解释。</p>
<p>可以在早期的React中展示高阶函数，而不会引入更高阶的组件。例如，假设可以根据输入字段的值过滤呈现的用户列表。</p>
<pre><code class="hljs scala"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = {
    query: '',
  };

  onChange = event =&gt; {
    <span class="hljs-keyword">this</span>.setState({ query: event.target.value });
  }

  render() {
    const users = [
      { name: <span class="hljs-symbol">'Robi</span>n' },
      { name: <span class="hljs-symbol">'Marku</span>s' },
    ];

    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;ul&gt;
          {users
            .filter(user =&gt; <span class="hljs-keyword">this</span>.state.query === user.name)
            .map(user =&gt; &lt;li&gt;{user.name}&lt;/li&gt;)
          }
        &lt;/ul&gt;

        &lt;input
          <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>
          onChange={<span class="hljs-keyword">this</span>.onChange}
        /&gt;
      &lt;/div&gt;
    );
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">App</span>;

</code></pre>
<p>并不总是希望提取函数，因为它可以增加不必要的复杂性，但另一方面，它可以为JavaScript带来有益的学习效果。此外，通过提取函数，<a href="https://www.robinwieruch.de/react-testing-tutorial/">您可以将其与React组件隔离开来进行测试</a>。因此，让我们使用提供给内置过滤器功能的功能来展示它。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doFilter</span>(<span class="hljs-params">user</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.state.query === user.name;
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  ...

  render() {
    <span class="hljs-keyword">const</span> users = [
      { <span class="hljs-attr">name</span>: <span class="hljs-string">'Robin'</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">'Markus'</span> },
    ];

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          {users
            .filter(doFilter)
            .map(user =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>)
          }
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.onChange}</span>
        /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}

export default App;

</span></code></pre>
<p>之前的实现不起作用，因为doFilter（）函数需要从状态知道查询属性。因此，您可以通过将其包含在另一个导致更高阶函数的函数中来将其传递给函数。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doFilter</span>(<span class="hljs-params">query</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">user</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.state.query === user.name;
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  ...

  render() {
    <span class="hljs-keyword">const</span> users = [
      { <span class="hljs-attr">name</span>: <span class="hljs-string">'Robin'</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">'Markus'</span> },
    ];

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          {users
            .filter(doFilter(this.state.query))
            .map(user =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>)
          }
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.onChange}</span>
        /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}

export default App;

</span></code></pre>
<p>基本上，高阶函数是返回函数的函数。通过使用JavaScript ES6箭头函数，您可以使更高阶的函数更简洁。此外，这种速记版本使得将功能组合成功能更具吸引力。</p>
<pre><code class="hljs routeros">const doFilter = query =&gt;<span class="hljs-built_in"> user </span>=&gt;
  this.state.query === user.name;

</code></pre>
<p>现在可以从文件中导出doFilter（）函数，并将其作为纯（高阶）函数单独测试。在了解了高阶函数之后，建立了所有基础知识，以便更多地了解<a href="https://www.robinwieruch.de/gentle-introduction-higher-order-components/">React的高阶组件</a>。</p>
<p>将这些函数提取到React组件之外的（高阶）函数中也可以有利于单独测试React的本地状态管理。</p>
<pre><code class="hljs pf">export const doIncrement = <span class="hljs-keyword">state</span> =&gt;
  ({ counter: <span class="hljs-keyword">state</span>.counter + <span class="hljs-number">1</span> });

export const doDecrement = <span class="hljs-keyword">state</span> =&gt;
  ({ counter: <span class="hljs-keyword">state</span>.counter - <span class="hljs-number">1</span> });

class Counter extends Component {
  <span class="hljs-keyword">state</span> = {
    counter: <span class="hljs-number">0</span>,
  };

  <span class="hljs-keyword">on</span>Increment = () =&gt; {
    this.<span class="hljs-built_in">set</span>State(doIncrement);
  }

  <span class="hljs-keyword">on</span>Decrement = () =&gt; {
    this.<span class="hljs-built_in">set</span>State(doDecrement);
  }

  render() {
    return (
      <span class="hljs-variable">&lt;div&gt;</span>
        <span class="hljs-variable">&lt;p&gt;</span>{this.<span class="hljs-keyword">state</span>.counter}&lt;/p&gt;

        <span class="hljs-variable">&lt;button onClick={this.onIncrement} type="button"&gt;</span>Increment&lt;/button&gt;
        <span class="hljs-variable">&lt;button onClick={this.onDecrement} type="button"&gt;</span>Decrement&lt;/button&gt;
      &lt;/div&gt;
    );
  }
}

</code></pre>
<p>围绕代码库移动函数是了解在JavaScript中使用函数作为拳头类公民的好处的好方法。将代码移向函数式编程时，它非常强大。</p>
<h2>React中的解构和传播运算符</h2>
<p>JavaScript中引入的另一种语言特性称为<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment">解构</a>。通常情况下，您必须从您state或组件中的props访问大量属性。您可以在JavaScript中使用解构赋值，而不是逐个将它们分配给变量。</p>
<pre><code class="hljs pf">// no destructuring
const users = this.<span class="hljs-keyword">state</span>.users;
const counter = this.<span class="hljs-keyword">state</span>.counter;

// destructuring
const { users, counter } = this.<span class="hljs-keyword">state</span>;

</code></pre>
<p>这对功能无状态组件特别有用，因为它们总是在函数签名中接收props对象。通常，您不会使用道具而是使用道具，因此您可以对功能签名中已有的内容进行解构。</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// no destructuring</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Greeting</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{props.greeting}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}

<span class="hljs-comment">// destructuring</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Greeting</span>(<span class="hljs-params">{ greeting }</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{greeting}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}

</code></pre>
<p>解构也适用于JavaScript数组。另一个很棒的特征是其余的解构。它通常用于拆分对象的一部分，但将剩余属性保留在另一个对象中。</p>
<pre><code class="hljs pf">// rest destructuring
const { users, ...rest } = this.<span class="hljs-keyword">state</span>;

</code></pre>
<p>之后，可以使用用户进行渲染，例如在React组件中，而在其他地方使用剩余的状态。这就是<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax">JavaScript扩展运算符</a> 用于将其余对象转发到下一个组件的位置。在下一节中，您将看到此运算符的运行情况。</p>
<h2>JavaScript比React更重要</h2>
<p>总之，有很多JavaScript可以在React中使用。虽然React只有一个API表面区域，但开发人员必须习惯JavaScript提供的所有功能。这句话并非没有任何理由：“成为React开发人员会让你成为更好的JavaScript开发人员”。让我们通过重构更高阶的组件来回顾一下React中JavaScript的一些学习方面。</p>
<pre><code class="hljs scala">function withLoading(<span class="hljs-type">Component</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WithLoading</span> <span class="hljs-keyword">extends</span> </span>{
    render() {
      const { isLoading, ...props } = <span class="hljs-keyword">this</span>.props;

      <span class="hljs-keyword">if</span> (isLoading) {
        <span class="hljs-keyword">return</span> &lt;p&gt;<span class="hljs-type">Loading</span>&lt;/p&gt;;
      }

      <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">Component</span> { ...props } /&gt;;
    }
  }
  };
}

</code></pre>
<p>当isLoading prop设置为true时，此高阶组件仅用于显示条件加载指示符。否则它呈现输入组件。您已经可以看到（休息）解构和传播运算符。后者可以在渲染的Component中看到，因为props对象的所有剩余属性都传递给Component。</p>
<p>使高阶组件更简洁的第一步是将返回的React类组件重构为功能无状态组件：</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withLoading</span><span class="hljs-params">(Component)</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">({ isLoading, <span class="hljs-rest_arg">...props</span> })</span> </span>{
    <span class="hljs-keyword">if</span> (isLoading) {
      <span class="hljs-keyword">return</span> &lt;p&gt;Loading&lt;/p&gt;;
    }

    <span class="hljs-keyword">return</span> &lt;Component { ...props } /&gt;;
  };
}

</code></pre>
<p>您可以看到其余的解构也可以在函数的签名中使用。接下来，使用JavaScript ES6箭头函数使高阶组件更简洁：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> withLoading = <span class="hljs-function"><span class="hljs-params">Component</span> =&gt;</span> ({ isLoading, ...props }) =&gt; {
  <span class="hljs-keyword">if</span> (isLoading) {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Loading<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> { <span class="hljs-attr">...props</span> } /&gt;</span>;
}

</span></code></pre>
<p>添加三元运算符可将函数体缩短为一行代码。因此可以省略函数体，并且可以省略return语句。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> withLoading = <span class="hljs-function"><span class="hljs-params">Component</span> =&gt;</span> ({ isLoading, ...props }) =&gt;
  isLoading
    ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Loading<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    : <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> { <span class="hljs-attr">...props</span> } /&gt;</span>

</span></code></pre>
<p>如您所见，高阶组件使用各种JavaScript而不是React相关技术：箭头函数，高阶函数，三元运算符，解构和扩展运算符。这就是如何在React应用程序中使用JavaScript的功能。</p>
<hr>
<p>人们经常说学习React的学习曲线很陡峭。但是，只有将React留在等式中并将所有JavaScript排除在外。当其他Web框架正在执行时，React不会在顶部添加任何外部抽象层。相反，你必须使用JavaScript。因此，磨练您的JavaScript技能，您将成为一个伟大的React开发人员。</p>
<hr>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/javascript-fundamentals-before-learning-react](https://www.zcfy.cc/article/javascript-fundamentals-before-learning-react)
原文标题: 学习React之前你需要知道的的JavaScript基础知识
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

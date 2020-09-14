---
title: '如何优雅的设计 React 组件' 
date: 2018-12-26 2:30:14
hidden: true
slug: lt3jbwg0rt9
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>作者：晓冬<br>本文原创，转载请注明作者及出处</p></blockquote>
<p>如今的 Web 前端已被 React、Vue 和 Angular 三分天下，一统江山十几年的 jQuery 显然已经很难满足现在的开发模式。那么，为什么大家会觉得 jQuery “过时了”呢？一来，文章《<a href="https://www.sitepoint.com/dom-manipulation-vanilla-javascript-no-jquery/" rel="nofollow noreferrer" target="_blank">No JQuery! 原生 JavaScript 操作 DOM</a>》就直截了当的告诉你，现在用原生 JavaScript 可以非常方便的操作 DOM 了。其次，jQuery 的便利性是建立在有一个基础  DOM 结构的前提下的，看上去是符合了样式、行为和结构分离，但其实 DOM 结构和 JavaScript 的代码逻辑是耦合的，你的开发思路会不断的在 DOM 结构和 JavaScript 之间来回切换。</p>
<p>尽管现在的 jQuery 已不再那么流行，但 jQuery 的设计思想还是非常值得致敬和学习的，特别是 jQuery 的插件化。如果大家开发过 jQuery 插件的话，想必都会知道，一个插件要足够灵活，需要有细颗粒度的参数化设计。一个灵活好用的 React 组件跟 jQuery 插件一样，都离不开合理的属性化（<code>props</code>）设计，但 React 组件的拆分和组合比起 jQuery 插件来说还是简单的令人发指。</p>
<p>So! 接下来我们就以万能的 TODO LIST 为例，一起来设计一款 React 的 <code>TodoList</code> 组件吧！</p>
<h2 id="articleHeader0">实现基本功能</h2>
<p>TODO LIST 的功能想必我们应该都比较了解，也就是 TODO 的添加、删除、修改等等。本身的功能也比较简单，为了避免示例的复杂度，显示不同状态 TODO LIST 的导航（全部、已完成、未完成）的功能我们就不展开了。</p>
<h3 id="articleHeader1">约定目录结构</h3>
<p>先假设我们已经拥有一个可以运行 React 项目的脚手架（ha~ 因为我不是来教你如何搭建脚手架的），然后项目的源码目录 <code>src/</code> 下可能是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── components
├── containers
│   └── App
│       ├── app.scss
│       └── index.js
├── index.html
└── index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">.
├── components
├── containers
│   └── App
│       ├── app<span class="hljs-selector-class">.scss</span>
│       └── index<span class="hljs-selector-class">.js</span>
├── index<span class="hljs-selector-class">.html</span>
└── index.js</code></pre>
<p>我们先来简单解释下这个目录设定。我们看到根目录下的 <code>index.js</code> 文件是整个项目的入口模块，入口模块将会处理 DOM 的渲染和 React 组件的热更新（<a href="https://github.com/gaearon/react-hot-loader" rel="nofollow noreferrer" target="_blank">react-hot-loader</a>）等设置。然后，<code>index.html</code> 是页面的 HTML 模版文件，这 2 个部分不是我们这次关心的重点，我们不再展开讨论。</p>
<p>入口模块 <code>index.js</code> 的代码大概是这样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// import reset css, base css...

import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'containers/App';

const render = (Component) => {
  ReactDom.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('containers/App', () => {
    let nextApp = require('containers/App').default;
    
    render(nextApp);
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="react"><span class="hljs-comment">// import reset css, base css...</span>

<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDom <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> { AppContainer } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-hot-loader'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'containers/App'</span>;

<span class="hljs-keyword">const</span> render = <span class="hljs-function">(<span class="hljs-params">Component</span>) =&gt;</span> {
  ReactDom.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">AppContainer</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Component</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">AppContainer</span>&gt;</span></span>,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>)
  );
};

render(App);

<span class="hljs-keyword">if</span> (<span class="hljs-built_in">module</span>.hot) {
  <span class="hljs-built_in">module</span>.hot.accept(<span class="hljs-string">'containers/App'</span>, () =&gt; {
    <span class="hljs-keyword">let</span> nextApp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'containers/App'</span>).default;
    
    render(nextApp);
  });
}</code></pre>
<p>接下来看 <code>containers/</code> 目录，它将放置我们的页面容器组件，业务逻辑、数据处理等会在这一层做处理，<code>containers/App</code> 将作为我们的页面主容器组件。作为通用组件，我们将它们放置于  <code>components/</code> 目录下。</p>
<p>基本的目录结构看起来已经完成，接下来我们实现下主容器组件 <code>containers/App</code>。</p>
<h3 id="articleHeader2">实现主容器</h3>
<p>我们先来看下主容器组件 <code>containers/App/index.js</code> 最初的代码实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import styles from './app.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Todo List Demo</h2>
        <div className={styles.content}>
          <header className={styles['todo-list-header']}>
            <input 
              type=&quot;text&quot;
              className={styles.input}
              ref={(input) => this.input = input} 
            />
            <button 
              className={styles.button} 
              onClick={() => this.handleAdd()}
            >
              Add Todo
            </button>
          </header>
          <section className={styles['todo-list-content']}>
            <ul className={styles['todo-list-items']}>
              {this.state.todos.map((todo, i) => (
                <li key={`${todo.text}-${i}`}>
                  <em 
                    className={todo.completed ? styles.completed : ''} 
                    onClick={() => this.handleStateChange(i)}
                  >
                    {todo.text}
                  </em>
                  <button 
                    className={styles.button} 
                    onClick={() => this.handleRemove(i)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    );
  }

  handleAdd() {
    ...
  }

  handleRemove(index) {
    ...
  }

  handleStateChange(index) {
    ...
  }
}

export default App;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="react"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.scss'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);

    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">todos</span>: []
    };
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.container}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.header}</span>&gt;</span>Todo List Demo<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.content}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles[</span>'<span class="hljs-attr">todo-list-header</span>']}&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> 
              <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
              <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.input}</span>
              <span class="hljs-attr">ref</span>=<span class="hljs-string">{(input)</span> =&gt;</span> this.input = input} 
            /&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> 
              <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.button}</span> 
              <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.handleAdd()}
            &gt;
              Add Todo
            <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles[</span>'<span class="hljs-attr">todo-list-content</span>']}&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles[</span>'<span class="hljs-attr">todo-list-items</span>']}&gt;</span>
              {this.state.todos.map((todo, i) =&gt; (
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{</span>`${<span class="hljs-attr">todo.text</span>}<span class="hljs-attr">-</span>${<span class="hljs-attr">i</span>}`}&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">em</span> 
                    <span class="hljs-attr">className</span>=<span class="hljs-string">{todo.completed</span> ? <span class="hljs-attr">styles.completed</span> <span class="hljs-attr">:</span> ''} 
                    <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.handleStateChange(i)}
                  &gt;
                    {todo.text}
                  <span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> 
                    <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.button}</span> 
                    <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.handleRemove(i)}
                  &gt;
                    Remove
                  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
              ))}
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }

  handleAdd() {
    ...
  }

  handleRemove(index) {
    ...
  }

  handleStateChange(index) {
    ...
  }
}

export default App;</span></code></pre>
<p>我们可以像上面这样把所有的业务逻辑一股脑的塞进主容器中，但我们要考虑到主容器随时会组装其他的组件进来，将各种逻辑堆放在一起，到时候这个组件就会变得无比庞大，直到“无法收拾”。所以，我们得分离出一个独立的 <code>TodoList</code> 组件。</p>
<h2 id="articleHeader3">分离组件</h2>
<h3 id="articleHeader4">TodoList 组件</h3>
<p>在 <code>components/</code> 目录下，我们新建一个 <code>TodoList</code> 文件夹以及相关文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── components
+│   └── TodoList
+│       ├── index.js
+│       └── todo-list.scss
├── containers
│   └── App
│       ├── app.scss
│       └── index.js
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">.
├── components
<span class="hljs-addition">+│   └── TodoList</span>
<span class="hljs-addition">+│       ├── index.js</span>
<span class="hljs-addition">+│       └── todo-list.scss</span>
├── containers
│   └── App
│       ├── app.scss
│       └── index.js
...</code></pre>
<p>然后我们将 <code>containers/App/index.js</code> 下跟 <code>TodoList</code> 组件相关的功能抽离到 <code>components/TodoList/index.js</code> 中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
import styles from './todo-list.scss';

export default class TodoList extends Component {
  ...
  
  render() {
    return (
      <div className={styles.container}>
-       <header className={styles['todo-list-header']}>
+       <header className={styles.header}>
          <input 
            type=&quot;text&quot;
            className={styles.input}
            ref={(input) => this.input = input} 
          />
          <button 
            className={styles.button} 
            onClick={() => this.handleAdd()}
          >
            Add Todo
          </button>
        </header>
-       <section className={styles['todo-list-content']}>
+       <section className={styles.content}>
-         <ul className={styles['todo-list-items']}>
+         <ul className={styles.items}>
            {this.state.todos.map((todo, i) => (
              <li key={`${todo}-${i}`}>
                <em 
                  className={todo.completed ? styles.completed : ''} 
                  onClick={() => this.handleStateChange(i)}
                >
                  {todo.text}
                </em>
                <button 
                  className={styles.button} 
                  onClick={() => this.handleRemove(i)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }

  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">...
import styles from './todo-list.scss';

export default class TodoList extends Component {
  ...
  
  render() {
    return (
      &lt;div className={styles.container}&gt;
<span class="hljs-deletion">-       &lt;header className={styles['todo-list-header']}&gt;</span>
<span class="hljs-addition">+       &lt;header className={styles.header}&gt;</span>
          &lt;input 
            type="text"
            className={styles.input}
            ref={(input) =&gt; this.input = input} 
          /&gt;
          &lt;button 
            className={styles.button} 
            onClick={() =&gt; this.handleAdd()}
          &gt;
            Add Todo
          &lt;/button&gt;
        &lt;/header&gt;
<span class="hljs-deletion">-       &lt;section className={styles['todo-list-content']}&gt;</span>
<span class="hljs-addition">+       &lt;section className={styles.content}&gt;</span>
<span class="hljs-deletion">-         &lt;ul className={styles['todo-list-items']}&gt;</span>
<span class="hljs-addition">+         &lt;ul className={styles.items}&gt;</span>
            {this.state.todos.map((todo, i) =&gt; (
              &lt;li key={`${todo}-${i}`}&gt;
                &lt;em 
                  className={todo.completed ? styles.completed : ''} 
                  onClick={() =&gt; this.handleStateChange(i)}
                &gt;
                  {todo.text}
                &lt;/em&gt;
                &lt;button 
                  className={styles.button} 
                  onClick={() =&gt; this.handleRemove(i)}
                &gt;
                  Remove
                &lt;/button&gt;
              &lt;/li&gt;
            ))}
          &lt;/ul&gt;
        &lt;/section&gt;
      &lt;/div&gt;
    );
  }

  ...
}</code></pre>
<p>有没有注意到上面 <code>render</code> 方法中的 <code>className</code>，我们省去了 <code>todo-list*</code> 前缀，由于我们用的是 <a href="https://github.com/css-modules/css-modules" rel="nofollow noreferrer" target="_blank">CSS MODULES</a>，所以当我们分离组件后，原先在主容器中定义的 <code>todo-list*</code> 前缀的 <code>className</code> ，可以很容易通过 webpack 的配置来实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.s?css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]--[local]-[hash:base64:5]'
            }
          },
          ...
        ]
      }
    ]  
  }
  ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">...
module.exports = {
  ...
  module: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.s?css/</span>,
        <span class="hljs-attr">use</span>: [
          <span class="hljs-string">'style-loader'</span>,
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'css-loader'</span>,
            <span class="hljs-attr">options</span>: {
              <span class="hljs-attr">modules</span>: <span class="hljs-literal">true</span>,
              <span class="hljs-attr">localIdentName</span>: <span class="hljs-string">'[name]--[local]-[hash:base64:5]'</span>
            }
          },
          ...
        ]
      }
    ]  
  }
  ...
};</code></pre>
<p>我们再来看下该组件的代码输出后的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div data-reactroot=&quot;&quot; class=&quot;app--container-YwMsF&quot;>
  ...
    <div class=&quot;todo-list--container-2PARV&quot;>
      <header class=&quot;todo-list--header-3KDD3&quot;>
        ...
      </header>
      <section class=&quot;todo-list--content-3xwvR&quot;>
        <ul class=&quot;todo-list--items-1SBi6&quot;>
          ...
        </ul>
      </section>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-reactroot</span>=<span class="hljs-string">""</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app--container-YwMsF"</span>&gt;</span>
  ...
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"todo-list--container-2PARV"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"todo-list--header-3KDD3"</span>&gt;</span>
        ...
      <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"todo-list--content-3xwvR"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"todo-list--items-1SBi6"</span>&gt;</span>
          ...
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>从上面 webpack 的配置和输出的 HTML 中可以看到，<code>className</code> 的命名空间问题可以通过语义化 <code>*.scss</code> 文件名的方式来实现，比如 <code>TodoList</code> 的样式文件 <code>todo-list.scss</code>。这样一来，省去了我们定义组件 <code>className</code> 的命名空间带来的烦恼，从而只需要从组件内部的结构下手。</p>
<p>回到正题，我们再来看下分离 <code>TodoList</code> 组件后的 <code>containers/App/index.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import TodoList from 'components/TodoList';
...

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Todo List Demo</h2>
        <div className={styles.content}>
          <TodoList />
        </div>
      </div>
    );
  }
}

export default App;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="react"><span class="hljs-keyword">import</span> TodoList <span class="hljs-keyword">from</span> <span class="hljs-string">'components/TodoList'</span>;
...

class App extends Component {
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.container}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.header}</span>&gt;</span>Todo List Demo<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.content}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">TodoList</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App;</code></pre>
<h3 id="articleHeader5">抽离通用组件</h3>
<p>作为一个项目，当前的 <code>TodoList</code> 组件包含了太多的子元素，如：input、button 等。为了让组件“<strong>一次编写，随处使用</strong>”的原则，我们可以进一步拆分 <code>TodoList</code> 组件以满足其他组件的使用。</p>
<p>但是，如何拆分组件才是最合理的呢？我觉得这个问题没有最好的答案，但我们可以从几个方面进行思考：可封装性、可重用性和灵活性。比如拿 <code>h1</code> 元素来讲，你可以封装成一个 <code>Title</code> 组件，然后这样 <code>&lt;Title text={title} /&gt;</code> 使用，又或者可以这样 <code>&lt;Title&gt;{title}&lt;/Title&gt;</code> 来使用。但你有没有发现，这样实现的 <code>Title</code> 组件并没有起到简化和封装的作用，反而增加了使用的复杂度，对于 HTML 来讲，<code>h1</code> 本身也是一个组件，所以我们拆分组件也是需要掌握一个度的。</p>
<p>好，我们先拿 input 和 button 下手，在 <code>components/</code> 目录下新建 2 个 <code>Button</code> 和 <code>Input</code> 组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── components
+│   ├── Button
+│   │   ├── button.scss
+│   │   └── index.js
+│   ├── Input
+│   │   ├── index.js
+│   │   └── input.scss
│   └── TodoList
│       ├── index.js
│       └── todo-list.scss
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">.
├── components
<span class="hljs-addition">+│   ├── Button</span>
<span class="hljs-addition">+│   │   ├── button.scss</span>
<span class="hljs-addition">+│   │   └── index.js</span>
<span class="hljs-addition">+│   ├── Input</span>
<span class="hljs-addition">+│   │   ├── index.js</span>
<span class="hljs-addition">+│   │   └── input.scss</span>
│   └── TodoList
│       ├── index.js
│       └── todo-list.scss
...</code></pre>
<p><code>Button/index.js</code>  的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
export default class Button extends Component {
  render() {
    const { className, children, onClick } = this.props;

    return (
      <button 
        type=&quot;button&quot; 
        className={cn(styles.normal, className)} 
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="react">...
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    const { className, children, onClick } = <span class="hljs-keyword">this</span>.props;

    <span class="hljs-keyword">return</span> (
      &lt;button 
        <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"button"</span> 
        className={cn(styles.normal, className)} 
        onClick={onClick}
      &gt;
        {children}
      &lt;/button&gt;
    );
  }
}</code></pre>
<p><code>Input/index.js</code> 的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
export default class Input extends Component {
  render() {
    const { className, value, inputRef } = this.props;

    return (
      <input 
        type=&quot;text&quot;
        className={cn(styles.normal, className)}
        defaultValue={value}
        ref={inputRef} 
      />
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="react">...
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Input</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    const { className, value, inputRef } = <span class="hljs-keyword">this</span>.props;

    <span class="hljs-keyword">return</span> (
      &lt;input 
        <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>
        className={cn(styles.normal, className)}
        defaultValue={value}
        ref={inputRef} 
      /&gt;
    );
  }
}</code></pre>
<p>由于这 2 个组件自身不涉及任何业务逻辑，应该属于纯渲染组件（木偶组件），我们可以使用 React 轻量的无状态组件的方式来声明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
const Button = ({ className, children, onClick }) => (
  <button 
    type=&quot;button&quot; 
    className={cn(styles.normal, className)} 
    onClick={onClick}
  >
    {children}
  </button>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="react">...
const Button = <span class="hljs-function">(<span class="hljs-params">{ className, children, onClick }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> 
    <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> 
    <span class="hljs-attr">className</span>=<span class="hljs-string">{cn(styles.normal,</span> <span class="hljs-attr">className</span>)} 
    <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>
  &gt;</span>
    {children}
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
);</code></pre>
<p>是不是觉得酷炫很多！</p>
<p>另外，从 <code>Input</code> 组件的示例代码中看到，我们使用了<a href="https://reactjs.org/docs/uncontrolled-components.html" rel="nofollow noreferrer" target="_blank">非受控组件</a>，这里是为了降低示例代码的复杂度而特意为之，大家可以根据自己的实际情况来决定是否需要设计成<a href="https://reactjs.org/docs/forms.html#controlled-components" rel="nofollow noreferrer" target="_blank">受控组件</a>。一般情况下，如果不需要获取实时输入值的话，我觉得使用非受控组件应该够用了。</p>
<p>我们再回到上面的 <code>TodoList</code> 组件，将之前分离的子组件 <code>Button</code>，<code>Input</code> 组装进来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
import Button from 'components/Button';
import Input from 'components/Input';
...

export default class TodoList extends Component {
  render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <Input 
            className={styles.input} 
            inputRef={(input) => this.input = input} 
          />
          <Button onClick={() => this.handleAdd()}>
            Add Todo
          </Button>
        </header>
        ...
      </div>
    );
  }
}

..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="react">...
import Button <span class="hljs-keyword">from</span> <span class="hljs-string">'components/Button'</span>;
<span class="hljs-keyword">import</span> Input <span class="hljs-keyword">from</span> <span class="hljs-string">'components/Input'</span>;
...

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.container}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.header}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Input</span> 
            <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.input}</span> 
            <span class="hljs-attr">inputRef</span>=<span class="hljs-string">{(input)</span> =&gt;</span> this.input = input} 
          /&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.handleAdd()}&gt;
            Add Todo
          <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        ...
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}

...</span></code></pre>
<h3 id="articleHeader6">拆分子组件</h3>
<p>然后继续接着看 <code>TodoList</code> 的 items 部分，我们注意到这部分包含了较多的渲染逻辑在 <code>render</code> 中，导致我们需要浪费对这段代码与上下文之间会有过多的思考，所以，我们何不把它抽离出去：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...

export default class TodoList extends Component {
  render() {
    return (
      <div className={styles.container}>
        ...
        <section className={styles.content}>
          {this.renderItems()}
        </section>
      </div>
    );
  }

  renderItems() {
    return (
      <ul className={styles.items}>
        {this.state.todos.map((todo, i) => (
          <li key={`${todo}-${i}`}>
            ...
          </li>
        ))}
      </ul>
    );
  }
  
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="react">...

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.container}</span>&gt;</span>
        ...
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.content}</span>&gt;</span>
          {this.renderItems()}
        <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }

  renderItems() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.items}</span>&gt;</span>
        {this.state.todos.map((todo, i) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{</span>`${<span class="hljs-attr">todo</span>}<span class="hljs-attr">-</span>${<span class="hljs-attr">i</span>}`}&gt;</span>
            ...
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    );
  }
  
  ...
}</code></pre>
<p>上面的代码看似降低了 <code>render</code> 的复杂度，但仍然没有让 <code>TodoList</code> 减少负担。既然我们要把这部分逻辑分离出去，我们何不创建一个 <code>Todos</code> 组件，把这部分逻辑拆分出去呢？so，我们以“<strong>就近声明</strong>”的原则在 <code>components/TodoList/</code> 目录下创建一个子目录 <code>components/TodoList/components/</code> 来存放 <code>TodoList</code> 的子组件 。why？因为我觉得 组件 <code>Todos</code> 跟 <code>TodoList</code> 有紧密的父子关系，且跟其他组件间也不太会有任何交互，也可以认为它是 <code>TodoList</code> 私有的。</p>
<p>然后我们预览下现在的目录结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── components
│   ...
│   └── TodoList
+│       ├── components
+│       │   └── Todos
+│       │       ├── index.js
+│       │       └── todos.scss
│       ├── index.js
│       └── todo-list.scss" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">.
├── components
│   ...
│   └── TodoList
<span class="hljs-addition">+│       ├── components</span>
<span class="hljs-addition">+│       │   └── Todos</span>
<span class="hljs-addition">+│       │       ├── index.js</span>
<span class="hljs-addition">+│       │       └── todos.scss</span>
│       ├── index.js
│       └── todo-list.scss</code></pre>
<p><code>Todos/index.js</code> 的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
const Todos = ({ data: todos, onStateChange, onRemove }) => (
  <ul className={styles.items}>
    {todos.map((todo, i) => (
      <li key={`${todo}-${i}`}>
        <em 
          className={todo.completed ? styles.completed : ''} 
          onClick={() => onStateChange(i)}
        >
          {todo.text}
        </em>
        <Button onClick={() => onRemove(i)}>
          Remove
        </Button>
      </li>
    ))}
  </ul>
);
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="react">...
const Todos = <span class="hljs-function">(<span class="hljs-params">{ data: todos, onStateChange, onRemove }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.items}</span>&gt;</span>
    {todos.map((todo, i) =&gt; (
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{</span>`${<span class="hljs-attr">todo</span>}<span class="hljs-attr">-</span>${<span class="hljs-attr">i</span>}`}&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">em</span> 
          <span class="hljs-attr">className</span>=<span class="hljs-string">{todo.completed</span> ? <span class="hljs-attr">styles.completed</span> <span class="hljs-attr">:</span> ''} 
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> onStateChange(i)}
        &gt;
          {todo.text}
        <span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> onRemove(i)}&gt;
          Remove
        <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    ))}
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
);
...</code></pre>
<p>再看拆分后的 <code>TodoList/index.js</code> ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  return (
    <div className={styles.container}>
      ...
      <section className={styles.content}>
        <Todos 
          data={this.state.todos}
          onStateChange={(index) => this.handleStateChange(index)}
          onRemove={(index) => this.handleRemove(index)}
        />
      </section>
    </div>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code class="react">render() {
  <span class="hljs-keyword">return</span> (
    &lt;<span class="hljs-keyword">div</span> className={styles.<span class="hljs-keyword">container</span>}&gt;
      ...
      &lt;section className={styles.content}&gt;
        &lt;Todos 
          data={<span class="hljs-keyword">this</span>.state.todos}
          onStateChange={(<span class="hljs-keyword">index</span>) =&gt; <span class="hljs-keyword">this</span>.handleStateChange(<span class="hljs-keyword">index</span>)}
          onRemove={(<span class="hljs-keyword">index</span>) =&gt; <span class="hljs-keyword">this</span>.handleRemove(<span class="hljs-keyword">index</span>)}
        /&gt;
      &lt;/section&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
  );
}</code></pre>
<h3 id="articleHeader7">增强子组件</h3>
<p>到目前为止，大体上的功能已经搞定，子组件看上去拆分的也算合理，这样就可以很容易的增强某个子组件的功能了。就拿 <code>Todos</code> 来说，在新增了一个 TODO 后，假如我们并没有完成这个 TODO，而我们又希望可以修改它的内容了。ha～不要着急，要不我们再拆分下这个 <code>Todos</code>，比如增加一个 <code>Todo</code> 组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── components
│   ...
│   └── TodoList
│       ├── components
+│       │   ├── Todo
+│       │   │   ├── index.js
+│       │   │   └── todo.scss
│       │   └── Todos
│       │       ├── index.js
│       │       └── todos.scss
│       ├── index.js
│       └── todo-list.scss" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">.
├── components
│   ...
│   └── TodoList
│       ├── components
<span class="hljs-addition">+│       │   ├── Todo</span>
<span class="hljs-addition">+│       │   │   ├── index.js</span>
<span class="hljs-addition">+│       │   │   └── todo.scss</span>
│       │   └── Todos
│       │       ├── index.js
│       │       └── todos.scss
│       ├── index.js
│       └── todo-list.scss</code></pre>
<p>先看下 <code>Todos</code> 组件在抽离了 <code>Todo</code> 后的样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
import Todo from '../Todo';
...

const Todos = ({ data: todos, onStateChange, onRemove }) => (
  <ul className={styles.items}>
    {todos.map((todo, i) => (
      <li key={`${todo}-${i}`}>
        <Todo
          {...todo}
          onClick={() => onStateChange(i)}
        />
        <Button onClick={() => onRemove(i)}>
          Remove
        </Button>
      </li>
    ))}
  </ul>
);

export default Todos;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="react">...
import Todo <span class="hljs-keyword">from</span> <span class="hljs-string">'../Todo'</span>;
...

const Todos = <span class="hljs-function">(<span class="hljs-params">{ data: todos, onStateChange, onRemove }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.items}</span>&gt;</span>
    {todos.map((todo, i) =&gt; (
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{</span>`${<span class="hljs-attr">todo</span>}<span class="hljs-attr">-</span>${<span class="hljs-attr">i</span>}`}&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Todo</span>
          {<span class="hljs-attr">...todo</span>}
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> onStateChange(i)}
        /&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> onRemove(i)}&gt;
          Remove
        <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    ))}
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
);

export default Todos;
</span></code></pre>
<p>我们先不关心 <code>Todo</code> 内是何如实现的，就如我们上面说到的那样，我们需要对这个 <code>Todo</code> 增加一个可编辑的功能，从单纯的属性配置入手，我们只需要给它增加一个 <code>editable</code> 的属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Todo
  {...todo}
+ editable={editable}
  onClick={() => onStateChange(i)}
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">&lt;Todo
  {...todo}
<span class="hljs-addition">+ editable={editable}</span>
  onClick={() =&gt; onStateChange(i)}
/&gt;</code></pre>
<p>然后，我们再思考下，在 <code>Todo</code> 组件的内部，我们需要重新组织一些功能逻辑：</p>
<ul>
<li><p>根据传入的 <code>editable</code> 属性来判断是否需要显示编辑按钮</p></li>
<li><p>根据组件内部的编辑状态，是显示文本输入框还是文本内容</p></li>
<li><p>点击“更新”按钮后，需要通知父组件更新数据列表</p></li>
</ul>
<p>我们先来实现下 <code>Todo</code> 的第一个功能点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  const { completed, text, editable, onClick } = this.props;

  return (
    <span className={styles.wrapper}>
      <em
        className={completed ? styles.completed : ''} 
        onClick={onClick}
        >
        {text}
      </em>
      {editable &amp;&amp; 
        <Button>
          Edit
        </Button>
      }
    </span>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="react">render() {
  <span class="hljs-keyword">const</span> { completed, text, editable, onClick } = <span class="hljs-keyword">this</span>.props;

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.wrapper}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">em</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">{completed</span> ? <span class="hljs-attr">styles.completed</span> <span class="hljs-attr">:</span> ''} 
        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>
        &gt;</span>
        {text}
      <span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span>
      {editable &amp;&amp; 
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>
          Edit
        <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
      }
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
  );
}</code></pre>
<p>显然实现这一步似乎没什么 luan 用，我们还需要点击 Edit 按钮后能显示 <code>Input</code> 组件，使内容可修改。所以，简单的传递属性似乎无法满足该组件的功能，我们还需要一个内部状态来管理组件是否处于编辑中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  const { completed, text, editable, onStateChange } = this.props,
    { editing } = this.state;

  return (
    <span className={styles.wrapper}>
      {editing ? 
        <Input 
          value={text}
          className={styles.input}
          inputRef={input => this.input = input}
        /> :
        <em
          className={completed ? styles.completed : ''} 
          onClick={onStateChange}
        >
          {text}
        </em>
      }
      {editable &amp;&amp; 
        <Button onClick={() => this.handleEdit()}>
          {editing ? 'Update' : 'Edit'}
        </Button>
      }
    </span>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="react">render() {
  <span class="hljs-keyword">const</span> { completed, text, editable, onStateChange } = <span class="hljs-keyword">this</span>.props,
    { editing } = <span class="hljs-keyword">this</span>.state;

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.wrapper}</span>&gt;</span>
      {editing ? 
        <span class="hljs-tag">&lt;<span class="hljs-name">Input</span> 
          <span class="hljs-attr">value</span>=<span class="hljs-string">{text}</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.input}</span>
          <span class="hljs-attr">inputRef</span>=<span class="hljs-string">{input</span> =&gt;</span> this.input = input}
        /&gt; :
        <span class="hljs-tag">&lt;<span class="hljs-name">em</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">{completed</span> ? <span class="hljs-attr">styles.completed</span> <span class="hljs-attr">:</span> ''} 
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onStateChange}</span>
        &gt;</span>
          {text}
        <span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span>
      }
      {editable &amp;&amp; 
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.handleEdit()}&gt;
          {editing ? 'Update' : 'Edit'}
        <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
      }
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  );
}</span></code></pre>
<p>最后，<code>Todo</code> 组件在点击 Update 按钮后需要通知父组件更新数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleEdit() {
  const { text, onUpdate } = this.props;
  let { editing } = this.state;

  editing = !editing;

  this.setState({ editing });

  if (!editing &amp;&amp; this.input.value !== text) {
    onUpdate(this.input.value);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">handleEdit() {
  <span class="hljs-keyword">const</span> { text, onUpdate } = <span class="hljs-keyword">this</span>.props;
  <span class="hljs-keyword">let</span> { editing } = <span class="hljs-keyword">this</span>.state;

  editing = !editing;

  <span class="hljs-keyword">this</span>.setState({ editing });

  <span class="hljs-keyword">if</span> (!editing &amp;&amp; <span class="hljs-keyword">this</span>.input.value !== text) {
    onUpdate(<span class="hljs-keyword">this</span>.input.value);
  }
}</code></pre>
<p>需要注意的是，我们传递的是更新后的内容，在数据没有任何变化的情况下通知父组件是毫无意义的。</p>
<p>我们再回过头来修改下 <code>Todos</code> 组件对 <code>Todo</code> 的调用。先增加一个由 <code>TodoList</code> 组件传递下来的回调属性 <code>onUpdate</code>，同时修改 <code>onClick</code> 为 <code>onStateChange</code>，因为这时的 <code>Todo</code> 已不仅仅只有单个点击事件了，需要定义不同状态变更时的事件回调：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Todo
  {...todo}
  editable={editable}
- onClick={() => onStateChange(i)}
+ onStateChange={() => onStateChange(i)}
+ onUpdate={(value) => onUpdate(i, value)}
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">&lt;Todo
  {...todo}
  editable={editable}
<span class="hljs-deletion">- onClick={() =&gt; onStateChange(i)}</span>
<span class="hljs-addition">+ onStateChange={() =&gt; onStateChange(i)}</span>
<span class="hljs-addition">+ onUpdate={(value) =&gt; onUpdate(i, value)}</span>
/&gt;</code></pre>
<p>而最终我们又在 <code>TodoList</code> 组件中，增加 <code>Todo</code> 在数据更新后的业务逻辑。</p>
<p><code>TodoList</code> 组件的 <code>render</code> 方法内的部分示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Todos 
  editable
  data={this.state.todos}
+ onUpdate={(index, value) => this.handleUpdate(index, value)}
  onStateChange={(index) => this.handleStateChange(index)}
  onRemove={(index) => this.handleRemove(index)}
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">&lt;Todos 
  editable
  data={this.state.todos}
<span class="hljs-addition">+ onUpdate={(index, value) =&gt; this.handleUpdate(index, value)}</span>
  onStateChange={(index) =&gt; this.handleStateChange(index)}
  onRemove={(index) =&gt; this.handleRemove(index)}
/&gt;</code></pre>
<p><code>TodoList</code> 组件的 <code>handleUpdate</code> 方法的示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleUpdate(index, value) {
  let todos = [...this.state.todos];
  const target = todos[index];

  todos = [
    ...todos.slice(0, index),
    {
      text: value,
      completed: target.completed
    },
    ...todos.slice(index + 1)
  ];

  this.setState({ todos });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">handleUpdate(index, value) {
  <span class="hljs-keyword">let</span> todos = [...this.state.todos];
  <span class="hljs-keyword">const</span> target = todos[index];

  todos = [
    ...todos.slice(<span class="hljs-number">0</span>, index),
    {
      <span class="hljs-attr">text</span>: value,
      <span class="hljs-attr">completed</span>: target.completed
    },
    ...todos.slice(index + <span class="hljs-number">1</span>)
  ];

  <span class="hljs-keyword">this</span>.setState({ todos });
}</code></pre>
<h2 id="articleHeader8">组件数据管理</h2>
<p>既然 <code>TodoList</code> 是一个组件，初始状态 <code>this.state.todos</code> 就有可能从外部传入。对于组件内部，我们不应该过多的关心这些数据从何而来（可能通过父容器直接 Ajax 调用后返回的数据，或者 Redux、MobX 等状态管理器获取的数据），我觉得组件的数据属性的设计可以从以下 3 个方面来考虑：</p>
<ul>
<li><p>在没有初始数据传入时应该提供一个默认值</p></li>
<li><p>一旦数据在组件内部被更新后应该及时的通知父组件</p></li>
<li><p>当有新的数据（从后端 API 请求的）传入组件后，应该重新更新组件内部状态</p></li>
</ul>
<p>根据这几点，我们可以对 <code>TodoList </code> 再做一番改造。</p>
<p>首先，对 <code>TodoList</code> 增加一个 <code>todos</code> 的默认数据属性，使父组件在没有传入有效属性值时也不会影响该组件的使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: props.todos
    };
  }
  ...
}

TodoList.defaultProps = {
  todos: []
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);

    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">todos</span>: props.todos
    };
  }
  ...
}

TodoList.defaultProps = {
  <span class="hljs-attr">todos</span>: []
};</code></pre>
<p>然后，再新增一个内部方法 <code>this.update</code> 和一个组件的更新事件回调属性 <code>onUpdate</code>，当数据状态更新时可以及时的通知父组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class TodoList extends Component {
  ...
  handleAdd() {
    ...
    this.update(todos);
  }

  handleUpdate(index, value) {
    ...
    this.update(todos);
  }

  handleRemove(index) {
    ...
    this.update(todos);
  }

  handleStateChange(index) {
    ...
    this.update(todos);
  }

  update(todos) {
    const { onUpdate } = this.props;

    this.setState({ todos });
    onUpdate &amp;&amp; onUpdate(todos);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  ...
  handleAdd() {
    ...
    this.update(todos);
  }

  handleUpdate(index, value) {
    ...
    this.update(todos);
  }

  handleRemove(index) {
    ...
    this.update(todos);
  }

  handleStateChange(index) {
    ...
    this.update(todos);
  }

  update(todos) {
    <span class="hljs-keyword">const</span> { onUpdate } = <span class="hljs-keyword">this</span>.props;

    <span class="hljs-keyword">this</span>.setState({ todos });
    onUpdate &amp;&amp; onUpdate(todos);
  }
}</code></pre>
<p>这就完事儿了？No! No! No! 因为 <code>this.state.todos</code> 的初始状态是由外部 <code>this.props</code> 传入的，假如父组件重新更新了数据，会导致子组件的数据和父组件不同步。那么，如何解决？</p>
<p>我们回顾下 <a href="https://reactjs.org/docs/react-component.html#the-component-lifecycle" rel="nofollow noreferrer" target="_blank">React 的生命周期</a>，父组件传递到子组件的 props 的更新数据可以在  <code>componentWillReceiveProps</code> 中获取。所以我们有必要在这里重新更新下 <code>TodoList</code> 的数据，哦！千万别忘了判断传入的 todos 和当前的数据是否一致，因为，当任何传入的 props 更新时都会导致 <code>componentWillReceiveProps</code> 的触发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillReceiveProps(nextProps) {
  const nextTodos = nextProps.todos;

  if (Array.isArray(nextTodos) &amp;&amp; !_.isEqual(this.state.todos, nextTodos)) {
    this.setState({ todos: nextTodos });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">componentWillReceiveProps(nextProps) {
  <span class="hljs-keyword">const</span> nextTodos = nextProps.todos;

  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(nextTodos) &amp;&amp; !_.isEqual(<span class="hljs-keyword">this</span>.state.todos, nextTodos)) {
    <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">todos</span>: nextTodos });
  }
}</code></pre>
<p>注意代码中的 <code>_.isEqual</code>，该方法是 <a href="https://lodash.com/" rel="nofollow noreferrer" target="_blank">Lodash</a> 中非常实用的一个函数，我经常拿来在这种场景下使用。</p>
<h2 id="articleHeader9">结尾</h2>
<p>由于本人对 React 的了解有限，以上示例中的方案可能不一定最合适，但你也看到了 <code>TodoList</code> 组件，既可以是包含多个不同功能逻辑的大组件，也可以拆分为独立、灵巧的小组件，我觉得我们只需要掌握一个度。当然，如何设计取决于你自己的项目，正所谓：<strong>没有最好的，只有更合适的</strong>。还是希望本篇文章能给你带来些许的小收获。</p>
<blockquote>
<p>iKcamp官网：<a href="http://www.ikcamp.com" rel="nofollow noreferrer" target="_blank">http://www.ikcamp.com</a></p>
<p>访问官网更快阅读全部免费分享课程：《iKcamp出品｜全网最新｜微信小程序｜基于最新版1.0开发者工具之初中级培训教程分享》。<br>包含：文章、视频、源代码</p>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010953661" src="https://static.alili.tech/img/remote/1460000010953661" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>iKcamp原创新书《移动Web前端高效开发实战》已在亚马逊、京东、当当开售。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何优雅的设计 React 组件

## 原文链接
[https://segmentfault.com/a/1190000011939560](https://segmentfault.com/a/1190000011939560)


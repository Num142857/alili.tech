---
title: '基于 Jest + Enzyme 的 React 单元测试' 
date: 2019-01-15 2:30:12
hidden: true
slug: oiyecivimim
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>如果你想学习 React 单元测试，那就从这篇文章开始吧。Star 项目，clone 到本地，根据教程走一遍，有任何问题欢迎  <a href="https://github.com/superman66/react-test-demo/issues" rel="nofollow noreferrer" target="_blank">issue</a> 讨论。</p>
<blockquote>项目GitHub地址：<a href="https://github.com/superman66/react-test-demo" rel="nofollow noreferrer" target="_blank">react-test-demo</a>
</blockquote>
<p>文章主要内容如下：</p>
<ul>
<li>Jest 和 Enzyme 的基本介绍</li>
<li>测试环境搭建</li>
<li>
<p>测试脚本编写</p>
<ul>
<li>UI 组件测试</li>
<li>Reducer 测试</li>
</ul>
</li>
<li>运行并调试</li>
<li>参考资料</li>
</ul>
<h2 id="articleHeader1">Jest、Enzyme 介绍</h2>
<p>Jest 是 Facebook 发布的一个开源的、基于 <code>Jasmine</code> 框架的 JavaScript 单元测试工具。提供了包括内置的测试环境 DOM API 支持、断言库、Mock 库等，还包含了 Spapshot Testing、 Instant Feedback 等特性。</p>
<p>Airbnb开源的 React 测试类库 Enzyme 提供了一套简洁强大的 API，并通过 jQuery 风格的方式进行DOM 处理，开发体验十分友好。不仅在开源社区有超高人气，同时也获得了React 官方的推荐。</p>
<h2 id="articleHeader2">测试环境搭建</h2>
<p>在开发 React 应用的基础上（默认你用的是 Webpack + Babel 来打包构建应用），你需要安装 <code>Jest</code> <code>Enzyme</code>，以及对应的 <code>babel-jest</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install jest enzyme babel-jest --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span><span class="hljs-keyword">jest </span>enzyme <span class="hljs-keyword">babel-jest </span>--save-dev</code></pre>
<p>下载 npm 依赖包之后，你需要在 <code>package.json</code> 中新增属性，配置 Jest：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;jest&quot;: {
    &quot;moduleFileExtensions&quot;: [
      &quot;js&quot;,
      &quot;jsx&quot;
    ],
    &quot;moduleNameMapper&quot;: {
      &quot;\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$&quot;: &quot;<rootDir>/__mocks__/fileMock.js&quot;,
      &quot;.*\\.(css|less|scss)$&quot;: &quot;<rootDir>/__mocks__/styleMock.js&quot;
    },
    &quot;transform&quot;: {
      &quot;^.+\\.js$&quot;: &quot;babel-jest&quot;
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">  <span class="hljs-string">"jest"</span>: {
    <span class="hljs-attr">"moduleFileExtensions"</span>: [
      <span class="hljs-string">"js"</span>,
      <span class="hljs-string">"jsx"</span>
    ],
    <span class="hljs-attr">"moduleNameMapper"</span>: {
      <span class="hljs-attr">"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$"</span>: <span class="hljs-string">"&lt;rootDir&gt;/__mocks__/fileMock.js"</span>,
      <span class="hljs-attr">".*\\.(css|less|scss)$"</span>: <span class="hljs-string">"&lt;rootDir&gt;/__mocks__/styleMock.js"</span>
    },
    <span class="hljs-attr">"transform"</span>: {
      <span class="hljs-attr">"^.+\\.js$"</span>: <span class="hljs-string">"babel-jest"</span>
    }
  },</code></pre>
<p>并新增<code>test scripts</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;dev&quot;: &quot;NODE_ENV=development webpack-dev-server  --inline --progress --colors --port 3000 --host 0.0.0.0 &quot;,
    &quot;test&quot;: &quot;jest&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"NODE_ENV=development webpack-dev-server  --inline --progress --colors --port 3000 --host 0.0.0.0 "</span>,
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"jest"</span>
  }</code></pre>
<p>其中 :</p>
<ul>
<li>
<code>moduleFileExtensions</code>：代表支持加载的文件名，与 Webpack 中的 <code>resolve.extensions</code> 类似</li>
<li>
<code>moduleNameMapper</code>：代表需要被 Mock 的资源名称。如果需要 Mock 静态资源（如less、scss等），则需要配置 Mock 的路径 <code>&lt;rootDir&gt;/__mocks__/yourMock.js</code>
</li>
<li>
<code>transform</code> 用于编译 ES6/ES7 语法，需配合 <code>babel-jest</code> 使用</li>
</ul>
<p>上面三个是常用的配置，更多 Jest 配置见官方文档：<a href="https://facebook.github.io/jest/docs/configuration.html" rel="nofollow noreferrer" target="_blank">Jest Configuration</a></p>
<h2 id="articleHeader3">测试脚本编写</h2>
<h3 id="articleHeader4">UI 组件测试</h3>
<p>环境搭建好了，就可以开始动手写测试脚本了。在开始之前，先分析下 Todo 应用的组成部分。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009220533?w=627&amp;h=332" src="https://static.alili.tech/img/remote/1460000009220533?w=627&amp;h=332" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>应用主体结构如下 <code>src/component/App.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
  render() {
    const { params } = this.props;
    return (
      <section className=&quot;todoapp&quot;>
        <div className=&quot;main&quot;>
          <AddTodo />
          <VisibleTodoList filter={params.filter || 'all'} />
        </div>
         <Footer />
      </section>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> { params } = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"todoapp"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"main"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">AddTodo</span> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">VisibleTodoList</span> <span class="hljs-attr">filter</span>=<span class="hljs-string">{params.filter</span> || '<span class="hljs-attr">all</span>'} /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">Footer</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    )
  }
}</span></code></pre>
<p>可以发现 整个应用可以分为三个组件:</p>
<ul>
<li>最外层的 <code>&lt;App /&gt;</code>
</li>
<li>中间的 Input 输入框 <code>&lt;AddTodo /&gt;</code>
</li>
<li>下面的 TODO 列表 <code>&lt;VisibleTodoList /&gt;</code>
</li>
</ul>
<p>其中 <code>&lt;App/&gt;</code> 是 UI 组件，<code>&lt;AddTodo /&gt;</code> 和 <code>&lt;VisibleTodoList /&gt;</code> 是智能组件，我们需要找到智能组件所对应的 UI 组件 <code>&lt;AddTodoView/&gt;</code> 和 <code>&lt;TodoList/&gt;</code>。</p>
<p><code>&lt;AddTodoView/&gt;</code> 就是一个 <code>Input</code> 输入框，接受文字输入，敲下回车键，创建一个 Todo。代码如下 <code>src/component/AddTodoView.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component, PropTypes } from 'react'
class AddTodoView extends Component {
  render() {
    return (
      <header className=&quot;header&quot;>
        <h1>todos</h1>
        <input
          className=&quot;new-todo&quot;
          type=&quot;text&quot;
          onKeyUp={e => this.handleClick(e)}
          placeholder=&quot;input todo item&quot;
          ref='input' />
      </header>
    )
  }

  handleClick(e) {
    if (e.keyCode === 13) {
      const node = this.refs.input;
      const text = node.value.trim();
      text &amp;&amp; this.props.onAddClick(text);
      node.value = '';
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component, PropTypes } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AddTodoView</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"header"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>todos<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">"new-todo"</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
          <span class="hljs-attr">onKeyUp</span>=<span class="hljs-string">{e</span> =&gt;</span> this.handleClick(e)}
          placeholder="input todo item"
          ref='input' /&gt;
      <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
    )
  }

  handleClick(e) {
    if (e.keyCode === 13) {
      const node = this.refs.input;
      const text = node.value.trim();
      text &amp;&amp; this.props.onAddClick(text);
      node.value = '';
    }
  }
}</span></code></pre>
<p>了解了该组件的功能之后，我们首先需要明确该组件需要测试哪些点：</p>
<ul>
<li>组件是否正常渲染</li>
<li>当用户输入内容敲下回车键时，是否能正常的调用 <code>props</code> 传递的 <code>onAddClick(text)</code> 方法</li>
<li>创建完成后清除 Input 的值</li>
<li>当用户没有输入任何值时，敲下回车时，应该不调用 <code>props</code> 传递的 <code>onAddClick(text)</code> 方法</li>
</ul>
<p>经过上面的分析之后，我们就可以开始编写单元测试脚本了。</p>
<h4>第一步：引入相关 lib</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import App from '../../src/component/App'
import { shallow } from 'enzyme'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'../../src/component/App'</span>
<span class="hljs-keyword">import</span> { shallow } <span class="hljs-keyword">from</span> <span class="hljs-string">'enzyme'</span></code></pre>
<p>在这里我们引入了 <code>shallow</code> 方法，它是 <code>Enzyme</code> 提供的 API 之一，可以实现<strong>浅渲染</strong>。其作用是仅仅渲染至虚拟节点，不会返回真实的节点，能极大提高测试性能。但是它不适合测试包含子组件、需要测试声明周期的组件。<br><code>Enzyme</code> 还提供了其他两个 API：</p>
<ul>
<li>
<code>mount</code>：Full Rendering，非常适用于存在于 DOM API 存在交互组件，或者需要测试组件完整的声明周期</li>
<li>
<code>render</code>：Static Rendering，用于 将 React 组件渲染成静态的 HTML 并分析生成的 HTML 结构。<code>render</code> 返回的 <code>wrapper</code> 与其他两个 API 类似。不同的是 <code>render</code> 使用了第三方 HTML 解析器和 <code>Cheerio</code>。</li>
</ul>
<p>一般情况下，<code>shallow</code> 就已经足够用了，偶尔情况下会用到 <code>mount</code>。</p>
<h4>第二步：模拟 Props，渲染组件创建 Wrapper</h4>
<p>这一步，我们可以创建一个 <code>setup</code> 函数来实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const setup = () => {
  // 模拟 props
  const props = {
    // Jest 提供的mock 函数
    onAddClick: jest.fn()
  }

  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(<AddTodoView {...props} />)
  return {
    props,
    wrapper
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> setup = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// 模拟 props</span>
  <span class="hljs-keyword">const</span> props = {
    <span class="hljs-comment">// Jest 提供的mock 函数</span>
    onAddClick: jest.fn()
  }

  <span class="hljs-comment">// 通过 enzyme 提供的 shallow(浅渲染) 创建组件</span>
  <span class="hljs-keyword">const</span> wrapper = shallow(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">AddTodoView</span> {<span class="hljs-attr">...props</span>} /&gt;</span>)
  return {
    props,
    wrapper
  }
}</span></code></pre>
<p><code>Props</code> 中包含函数的时候，我们需要使用 Jest 提供的 <a href="https://facebook.github.io/jest/docs/mock-function-api.html#content" rel="nofollow noreferrer" target="_blank">mockFunction</a></p>
<h4>第四步：编写 Test Case</h4>
<p>这里的 Case 根据我们前面分析需要测试的点编写。</p>
<p><strong>Case1：测试组件是否正常渲染</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('AddTodoView', () => {
  const { wrapper, props } = setup();

  // case1
  // 通过查找存在 Input,测试组件正常渲染
  it('AddTodoView Component should be render', () => {
    //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
    // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
    expect(wrapper.find('input').exists());
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'AddTodoView'</span>, () =&gt; {
  <span class="hljs-keyword">const</span> { wrapper, props } = setup();

  <span class="hljs-comment">// case1</span>
  <span class="hljs-comment">// 通过查找存在 Input,测试组件正常渲染</span>
  it(<span class="hljs-string">'AddTodoView Component should be render'</span>, () =&gt; {
    <span class="hljs-comment">//.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点</span>
    <span class="hljs-comment">// 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html</span>
    expect(wrapper.find(<span class="hljs-string">'input'</span>).exists());
  })
})</code></pre>
<p>写完第一个测试用例之后，我们可以运行看看测试的效果。在 Terminal 中输入 <code>npm run test</code>,效果如下:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009220534?w=1134&amp;h=564" src="https://static.alili.tech/img/remote/1460000009220534?w=1134&amp;h=564" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>Case2: 输入内容并敲下回车键，测试组件调用props的方法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  it('When the Enter key was pressed, onAddClick() shoule be called', () => {
    // mock input 输入和 Enter事件
    const mockEvent = {
      keyCode: 13, // enter 事件
      target: {
        value: 'Test'
      }
    }
    // 通过 Enzyme 提供的 simulate api 模拟 DOM 事件
    wrapper.find('input').simulate('keyup',mockEvent)
    // 判断 props.onAddClick 是否被调用
    expect(props.onAddClick).toBeCalled()
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  it(<span class="hljs-string">'When the Enter key was pressed, onAddClick() shoule be called'</span>, () =&gt; {
    <span class="hljs-comment">// mock input 输入和 Enter事件</span>
    <span class="hljs-keyword">const</span> mockEvent = {
      <span class="hljs-attr">keyCode</span>: <span class="hljs-number">13</span>, <span class="hljs-comment">// enter 事件</span>
      target: {
        <span class="hljs-attr">value</span>: <span class="hljs-string">'Test'</span>
      }
    }
    <span class="hljs-comment">// 通过 Enzyme 提供的 simulate api 模拟 DOM 事件</span>
    wrapper.find(<span class="hljs-string">'input'</span>).simulate(<span class="hljs-string">'keyup'</span>,mockEvent)
    <span class="hljs-comment">// 判断 props.onAddClick 是否被调用</span>
    expect(props.onAddClick).toBeCalled()
  })</code></pre>
<p>上面的代码与第一个 case 多了两点：</p>
<ul>
<li>增加了 <code>mockEvent</code>,用于模拟 DOM 事件</li>
<li>使用 <code>Enzyme</code> 提供的 <code>.simulate(’keyup‘, mockEvent)</code> 来模拟点击事件,这里的 <code>keyup</code> 会自动转换成 React 组件中的 <code>onKeyUp</code> 并调用。</li>
</ul>
<p>我们再运行 <code>npm run test</code> 看看测试效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009220535?w=1134&amp;h=598" src="https://static.alili.tech/img/remote/1460000009220535?w=1134&amp;h=598" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>经过上面两个 Test Case 的分析，接下来的 Case3 和 Case4 思路也是一样，具体写法见代码： <a href="https://github.com/superman66/react-test-demo/blob/master/__test__/component/AddTodoView.spec.js" rel="nofollow noreferrer" target="_blank">__test__/component/AddTodoView.spec.js</a>，这里就不一一讲解了。</p>
<h3 id="articleHeader5">Reducer 测试</h3>
<p>由于 Reducer 是纯函数，因此对 Reducer 的测试非常简单，Redux 官方文档也提供了测试的例子，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import reducer from '../../reducers/todos'
import * as types from '../../constants/ActionTypes'

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ])
  })

  it('should handle ADD_TODO', () => {
    expect(
      reducer([], {
        type: types.ADD_TODO,
        text: 'Run the tests'
      })
    ).toEqual(
      [
        {
          text: 'Run the tests',
          completed: false,
          id: 0
        }
      ]
    )

    expect(
      reducer(
        [
          {
            text: 'Use Redux',
            completed: false,
            id: 0
          }
        ],
        {
          type: types.ADD_TODO,
          text: 'Run the tests'
        }
      )
    ).toEqual(
      [
        {
          text: 'Run the tests',
          completed: false,
          id: 1
        },
        {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ]
    )
  })
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> reducer <span class="hljs-keyword">from</span> <span class="hljs-string">'../../reducers/todos'</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">'../../constants/ActionTypes'</span>

describe(<span class="hljs-string">'todos reducer'</span>, () =&gt; {
  it(<span class="hljs-string">'should return the initial state'</span>, () =&gt; {
    expect(
      reducer(<span class="hljs-literal">undefined</span>, {})
    ).toEqual([
      {
        <span class="hljs-attr">text</span>: <span class="hljs-string">'Use Redux'</span>,
        <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">id</span>: <span class="hljs-number">0</span>
      }
    ])
  })

  it(<span class="hljs-string">'should handle ADD_TODO'</span>, () =&gt; {
    expect(
      reducer([], {
        <span class="hljs-attr">type</span>: types.ADD_TODO,
        <span class="hljs-attr">text</span>: <span class="hljs-string">'Run the tests'</span>
      })
    ).toEqual(
      [
        {
          <span class="hljs-attr">text</span>: <span class="hljs-string">'Run the tests'</span>,
          <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">id</span>: <span class="hljs-number">0</span>
        }
      ]
    )

    expect(
      reducer(
        [
          {
            <span class="hljs-attr">text</span>: <span class="hljs-string">'Use Redux'</span>,
            <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">id</span>: <span class="hljs-number">0</span>
          }
        ],
        {
          <span class="hljs-attr">type</span>: types.ADD_TODO,
          <span class="hljs-attr">text</span>: <span class="hljs-string">'Run the tests'</span>
        }
      )
    ).toEqual(
      [
        {
          <span class="hljs-attr">text</span>: <span class="hljs-string">'Run the tests'</span>,
          <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>
        },
        {
          <span class="hljs-attr">text</span>: <span class="hljs-string">'Use Redux'</span>,
          <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">id</span>: <span class="hljs-number">0</span>
        }
      ]
    )
  })
})
</code></pre>
<p>更多关于 Redux 的测试可以看官网提供的例子：<a href="http://cn.redux.js.org/docs/recipes/WritingTests.html" rel="nofollow noreferrer" target="_blank">编写测试-Redux文档</a></p>
<h2 id="articleHeader6">调试及测试覆盖率报告</h2>
<p>在运行测试脚本过程，<code>Jest</code> 的错误提示信息友好，通过错误信息一般都能找到问题的所在。<br>同时 <code>Jest</code> 还提供了生成测试覆盖率报告的命令，只需要添加上 <code>--coverage</code> 这个参数既可生成。不仅会在终端中显示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009220536?w=585&amp;h=366" src="https://static.alili.tech/img/remote/1460000009220536?w=585&amp;h=366" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>而且还会在项目中生成 <code>coverage</code> 文件夹，非常方便。</p>
<h1 id="articleHeader7">资料</h1>
<ul>
<li><a href="http://echizen.github.io/tech/2017/02-12-jest-enzyme-method" rel="nofollow noreferrer" target="_blank">使用jest+enzyme进行react项目测试</a></li>
<li><a href="https://github.com/tmallfe/tmallfe.github.io/issues/37" rel="nofollow noreferrer" target="_blank">聊一聊前端自动化测试</a></li>
<li><a href="http://airbnb.io/enzyme/docs/api/index.html" rel="nofollow noreferrer" target="_blank">Enzyme API</a></li>
<li><a href="https://facebook.github.io/jest/" rel="nofollow noreferrer" target="_blank">Jest</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 Jest + Enzyme 的 React 单元测试

## 原文链接
[https://segmentfault.com/a/1190000009220530](https://segmentfault.com/a/1190000009220530)


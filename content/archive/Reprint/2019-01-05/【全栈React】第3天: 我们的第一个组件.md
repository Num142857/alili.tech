---
title: '【全栈React】第3天: 我们的第一个组件' 
date: 2019-01-05 2:30:11
hidden: true
slug: r83cxavgf4c
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文转载自：<a href="http://www.zcfy.cc" rel="nofollow noreferrer" target="_blank">众成翻译</a><br>译者：<a href="http://www.zcfy.cc/@jiaxianhua" rel="nofollow noreferrer" target="_blank">iOSDevLog</a><br>链接：<a href="http://www.zcfy.cc/article/3799" rel="nofollow noreferrer" target="_blank">http://www.zcfy.cc/article/3799</a><br>原文：<a href="https://www.fullstackreact.com/30-days-of-react/day-3/" rel="nofollow noreferrer" target="_blank">https://www.fullstackreact.com/30-days-of-react/day-3/</a></p></blockquote>
<p>这个系列的前两篇文章是很重要的讨论。在今天的课程中，我们来看看一些代码，并写下我们的第一个React应用。</p>
<p>让我们重温第一天介绍的<code>Hello world</code>应用。这次，略有不同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>Hello world</title>
  <!-- Script tags including React -->
  ``<script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js&quot;>``</script>
  ``<script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js&quot;>``</script>
  ``<script src=&quot;https://npmcdn.com/babel-core@5.8.38/browser.min.js&quot;>`` </script>
</head>
<body>
  <div id=&quot;app&quot;></div>
  ``<script type=&quot;text/babel&quot;>``
    var app = <h1>Hello world</h1>
    var mountComponent = document.querySelector('#app');
    ReactDOM.render(app, mountComponent);
  </script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello world<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Script tags including React --&gt;</span>
  ``<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js"</span>&gt;</span><span class="javascript"><span class="hljs-string">``</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  ``<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js"</span>&gt;</span><span class="javascript"><span class="hljs-string">``</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  ``<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://npmcdn.com/babel-core@5.8.38/browser.min.js"</span>&gt;</span><span class="javascript"><span class="hljs-string">``</span> </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  ``<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/babel"</span>&gt;</span><span class="javascript"><span class="hljs-string">``</span>
    <span class="hljs-keyword">var</span> app = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
    <span class="hljs-keyword">var</span> mountComponent = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#app'</span>);
    ReactDOM.render(app, mountComponent);
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<h3 id="articleHeader0">加载React库</h3>
<p>我们在包含了React的来源作为<code>&lt;script&gt;`标签在`&lt;head&gt;</code>元素里面。在我们开始编写我们的React应用之前放置我们的<code>&lt;script&gt;</code>加载标签很重要，以便我们使用<code>ReactReactDOM</code>。</p>
<p><code>head</code>还有一个<code>script</code>标签包括在一个<code>babel-core</code>库。但是什么<code>babel-core</code>？</p>
<h3 id="articleHeader1">Babel</h3>
<p>昨天我们谈了ES5和ES6。我们提到对ES6的支持仍然不稳定。为了使用ES6，最好是将ES6 JavaScript转换为ES5 JavaScript。</p>
<p><strong>Babel</strong>是一个将ES6转换到ES5的库。</p>
<p>在<code>body</code>里面我们有一个<code>script</code>。在<code>script</code>里我们定义了我们的第一个React应用。请注意，<code>script</code>标签具有<code>type</code>的<code>text/babel</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/babel&quot;>`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/babel"</span>&gt;</span><span class="undefined">`</span></code></pre>
<p>这告诉Babel，我们希望它处理这个script主体内的JavaScript的执行。我们可以使用ES6 JavaScript编写我们的React应用，并确保Babel将在仅支持ES5的浏览器中处理它的执行。</p>
<h3 id="articleHeader2">React应用</h3>
<p>在Babel <code>script</code>中，我们定义了我们的第一个React应用。我们的应用由一个单一的元素组成<code>&lt;h1&gt;Hello world&lt;/h1&gt;</code>。调用<code>ReactDOM.render()</code>实际上将我们的袖珍React应用放置在页面上。如果不调用<code>ReactDOM.render()</code>，DOM中不会呈现任何内容。<code>ReactDOM.render()</code>的第一个参数是呈现 _什么_，第二个是 _哪里_：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(<what>, <where>)`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;">ReactDOM.render(<span class="hljs-tag">&lt;<span class="hljs-name">what</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">where</span>&gt;</span>)`</code></pre>
<p>我们写了一个React应用。我们的“app”是一个代表一个<code>h1</code> 标签的React元素。但这不是很有趣。富Web应用接受用户输入，根据用户交互更改其形状，并与Web服务器通信。让我们通过构建我们的第一个React组件来开始接触这个力量。</p>
<h2 id="articleHeader3">组件和更多</h2>
<p>我们在本系列的开头提到，所有React应用的核心是_组件_。理解React组件的最好方法是编写它们。我们将把React组件写成ES6类。</p>
<p>Let's look at a component we'll call <code>App</code>. Like all other React components, this ES6 class will extend the <code>React.Component</code> class from the React package:<br>让我们来看一个我们要调用的组件<code>App</code>。像所有其他React组件一样，这个ES6类将扩展（继承）React包中的<code>React.Component</code> 类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends React.Component {
  render() {
    return <h1>Hello from our app</h1>
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;h1&gt;<span class="hljs-type">Hello</span> from our app&lt;/h1&gt;
  }
}
</code></pre>
<blockquote>
<p>所有React组件至少需要一个<code>render()</code> 函数。此<code>render()</code> 函数应返回浏览器DOM元素的虚拟DOM表示形式。</p>
<p>有多种方法来编写React组件。在本系列中，我们将介绍几种编写方法。我们将使用的最常见的形式是上面使用的ES6类表示。</p>
<p>另一种编写我们的<code>App</code> 组件的方式是使用该<code>React.createClass()</code>函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var App = React.createClass({
  render: function() {
    return <h1>Hello from our app</h1>
  }
}); 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> App = React.createClass({
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello from our app<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
  }
}); 
</code></pre>
<p>到目前为止，社区一直采用ES6类声明。但是这两种方法都产生具有相同特性的React组件。</p>
</blockquote>
<p>在我们的index.html，我们用之前的新<code>App</code> 组件替换我们的JavaScript。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>Hello world</title>
  <!-- Script tags including React -->
  ``<script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js&quot;>``</script>
  ``<script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js&quot;>``</script>
  ``<script src=&quot;https://npmcdn.com/babel-core@5.8.38/browser.min.js&quot;>``</script>
</head>
<body>
  <div id=&quot;app&quot;></div>
  ``<script type=&quot;text/babel&quot;>``
    class App extends React.Component {
      render() {
        return <h1>Hello from our app</h1>
      }
    }
  </script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello world<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Script tags including React --&gt;</span>
  ``<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js"</span>&gt;</span><span class="javascript"><span class="hljs-string">``</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  ``<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js"</span>&gt;</span><span class="javascript"><span class="hljs-string">``</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  ``<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://npmcdn.com/babel-core@5.8.38/browser.min.js"</span>&gt;</span><span class="javascript"><span class="hljs-string">``</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  ``<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/babel"</span>&gt;</span><span class="javascript"><span class="hljs-string">``</span>
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
      render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello from our app<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
      }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>然而，什么都不会在屏幕上呈现。你还记得为什么吗？</p>
<p>我们没有告诉React我们要在屏幕上渲染任何东西，或者在什么地方渲染它。我们需要再次使用<code>ReactDOM.render()</code> 函数来表达React我们想要呈现的内容和位置。</p>
<p>添加<code>ReactDOM.render()</code> 函数将在屏幕上呈现我们的应用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mount = document.querySelector('#app');
ReactDOM.render(<App />, mount);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> mount = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'#app'</span>);
ReactDOM.render(&lt;App /&gt;, mount);
</code></pre>
<p>请注意，我们可以使用<code>App</code>类来渲染我们的React应用，就像它是一个内置的DOM组件类型（像<code>&lt;h1 /&gt;</code>和<code>&lt;div /&gt;</code>标签一样）。这里我们使用它，就像它是一个带尖括号的元素：<code>&lt;App /&gt;</code>。</p>
<p>我们的React组件的行为就像我们页面上的任何其他元素一样，我们可以<strong>像构建一个本地浏览器树</strong>一样构建一个组件树。</p>
<p>虽然我们现在渲染一个React组件，我们的应用仍然缺乏丰富性或交互性。很快，我们将看到如何使React组件数据驱动和动态。但首先，在本系列的下一期中，我们将探讨如何对图层组件进行分层。嵌套组件是丰富的React Web应用的基础。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【全栈React】第3天: 我们的第一个组件

## 原文链接
[https://segmentfault.com/a/1190000010465254](https://segmentfault.com/a/1190000010465254)


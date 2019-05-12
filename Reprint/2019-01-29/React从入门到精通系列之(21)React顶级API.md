---
title: 'React从入门到精通系列之(21)React顶级API' 
date: 2019-01-29 2:30:10
hidden: true
slug: evtauqulqa
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">二十一、React顶级API</h2>
<p>全局变量<code>React</code>是React库的入口。如果你通过一个script标签使用的React，那么它的顶级API都会在全局环境下一个名称为React的变量上。如果你是通过npm使用的ES6，你可以这样写：<code>import React from 'react';</code>。你是通过npm使用的ES5，你可以这样写<code>var React = require('react');</code>。</p>
<h2 id="articleHeader1">总览</h2>
<h3 id="articleHeader2">Components</h3>
<p>React组件可以让你将UI部分独立出来，成为可重用的部分。从而单独考虑分离出来的每一部分功能。可以通过<code>React.Component</code>或者<code>React.PureComponent</code>来创建React组件。</p>
<ul>
<li><p><code>React.Component</code></p></li>
<li><p><code>React.PureComponent</code></p></li>
</ul>
<p>如果你不是用ES6的class功能,你可以使用以下代替:</p>
<ul><li><p><code>React.createClass()</code></p></li></ul>
<h3 id="articleHeader3">创建一个React元素</h3>
<p>我们推荐使用<code>JSX</code>来定义UI。每个JSX元素都是<code>React.createElement(component, props, children)</code>的语法糖。使用<code>JSX</code>就意味着你不需要直接调用下面的方法:</p>
<ul>
<li><p><code>React.createElement()</code></p></li>
<li><p><code>React.createFactory()</code></p></li>
</ul>
<h3 id="articleHeader4">处理React元素</h3>
<p><code>React</code>同时还为处理元素提供了一些其他APIs:</p>
<ul>
<li><p><code>React.cloneElement()</code></p></li>
<li><p><code>React.isValidElement()</code></p></li>
<li><p><code>React.Children</code></p></li>
</ul>
<h3 id="articleHeader5">使用PropTypes进行类型检测</h3>
<p>你可以使用<code>React.PropTypes</code>为一个组件上的props进行类型检测。</p>
<ul>
<li><p><code>React.PropTypes</code></p></li>
<li><p><code>React.PropTypes.array</code></p></li>
<li><p><code>React.PropTypes.bool</code></p></li>
<li><p><code>React.PropType.func</code></p></li>
<li><p><code>React.PropTypes.number</code></p></li>
<li><p><code>React.PropTypes.object</code></p></li>
<li><p><code>React.PropTypes.string</code></p></li>
<li><p><code>React.PropTypes.symbol</code></p></li>
<li><p><code>React.PropTypes.node</code></p></li>
<li><p><code>React.PropTypes.element</code></p></li>
<li><p><code>React.PropTypes.instanceOf()</code></p></li>
<li><p><code>React.PropType.oneOf()</code></p></li>
<li><p><code>React.PropType.oneOfType()</code></p></li>
<li><p><code>React.PropType.arrayOf()</code></p></li>
<li><p><code>React.PropType.objectOf()</code></p></li>
<li><p><code>React.PropTypes.shape()</code></p></li>
<li><p><code>React.PropTypes.any</code></p></li>
</ul>
<p>以上的验查器默认都是可选的。你可以使用<code>isRequired</code>来标记一个必填属性。如果用户没有根据指定类型传入props或者压根没有传入props的话则会给出一个错误提示。</p>
<h3 id="articleHeader6">插件</h3>
<p>如果你使用了<code>react-with-addons.js</code>,那么React组件可以通过变量<code>React.addons</code>使用。</p>
<ul><li><p><code>React.addons</code></p></li></ul>
<h2 id="articleHeader7">使用方法</h2>
<h4>React.Component</h4>
<p><code>React.Component</code>是所有React组件的基类,当使用ES6 <code>classes</code>定义一个组件的用法如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Greeting extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>
    }
}
ReactDOM.render(
    <Greeting name={&quot;zhangyatao&quot;}/>,
    document.getElementById('root)
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Greeting</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
    }
}
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Greeting</span> <span class="hljs-attr">name</span>=<span class="hljs-string">{</span>"<span class="hljs-attr">zhangyatao</span>"}/&gt;</span>,
    document.getElementById('root)
)</span></code></pre>
<hr>
<h4>React.PureComponet</h4>
<p><code>React.PureComponent</code>表面上很像<code>React.Component</code>,但是它实现了<code>shouldComponentUpdate()</code>对props和state的进行浅比较。</p>
<p>如果你React组件的<code>render()</code>方法每次使用相同的props和state并且渲染出相同的结果。这种情况你可以使用<code>React.PureComponent</code>来提升性能。</p>
<blockquote>
<h4>提示</h4>
<p><code>React.PureComponent</code>的<code>shouldComponentUpdate()</code>仅会对对象进行浅比较,如果对象包含复杂的数据结构,对于深层次的差异有可能会产生<code>false-negatives</code>(假阴性,相当于医院中的错诊)。</p>
</blockquote>
<hr>
<h4>React.createClass()</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createClass(specification)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">React.createClass(specification)</code></pre>
<p>如果你还没有使用ES6,你可以使用<code>React.createClass()</code>来创建一个组件类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Greeting = React.createClass({
    setInitialState: function() {
        return {value: 0};
    },
    render: function() {
        return <h1>Hello, {this.props.name}</h1>;
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Greeting = React.createClass({
    <span class="hljs-attr">setInitialState</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {<span class="hljs-attr">value</span>: <span class="hljs-number">0</span>};
    },
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
    }
})</code></pre>
<hr>
<h4>React.createElement()</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.ceateElement(
    type,
    [props],
    [...children]
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">React.ceateElement(
    type,
    [props],
    [...children]
)</code></pre>
<p>通过传入的类型和属性以及子元素来创建并返回一个新的<code>React元素</code>。其中type参数可以传入一个html标签名称字符串(例如'div'或者'span')，或者传入一个<code>React组件</code>(一个类组件或功能性组件)。</p>
<p><code>React.DOM</code>提供了DOM组件可以比较便捷地通过<code>React.createElement()</code>包装的方法。例如，<code>React.DOM.a(...)</code>就是<code>React.createElement('a',...)</code>的便捷包装。这种方法可以是历史版本遗留产物，所以我们推荐你是用JSX或者使用<code>React.createElement()</code>来直接代替。</p>
<p>使用JSX写的代码会被转换为<code>React.createElement()</code>。如果你使用了JSX的话，通常不需要直接调用<code>React.createElement()</code>。</p>
<hr>
<h4>React.cloneElement()</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.cloneElement(
    element,
    [props],
    [...children]
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">React.cloneElement(
    element,
    [props],
    [...children]
)</code></pre>
<p>传入一个React元素进行克隆并返回一个新的React元素。</p>
<hr>
<h4>React.createFactory()</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createFactory(type)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.createFactory(type)</code></pre>
<p>返回一个生成给定类型的React元素的函数。就像<code>React.createElement()</code>，其中type参数可以传入一个html标签名称字符串(例如'div'或者'span')，或者传入一个<code>React组件</code>类型(一个类型组件或功能性组件)。</p>
<p>这种方法可以是一个历史版本遗留产物，我们推荐你是用JSX或者使用<code>React.createElement()</code>来直接代替。</p>
<p>使用JSX写的代码会被转换为<code>React.createElement()</code>。如果你使用了JSX的话，通常不需要直接调用<code>React.createElement()</code>。</p>
<hr>
<h4>React.isValidElement()</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.isValidElement(Object)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.isValidElement(<span class="hljs-built_in">Object</span>)</code></pre>
<p>验证一个对象是否是React元素，返回<code>true</code>或者<code>false</code>。</p>
<hr>
<h4>React.Children</h4>
<p>React.children提供了处理<code>this.props.children</code>中那些不透明的数据结构的一些工具函数。</p>
<h5>React.Children.map</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.Children.map(children, function[(thisArg))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.Children.map(children, <span class="hljs-function"><span class="hljs-keyword">function</span>[(<span class="hljs-params">thisArg</span>))</span></code></pre>
<h4>React.Children.forEach</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.Children.forEach(children, function[(thisArg)])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.Children.forEach(children, <span class="hljs-function"><span class="hljs-keyword">function</span>[(<span class="hljs-params">thisArg</span>)])</span></code></pre>
<p>和<code>React.Children.map</code>相同，只不过不会返回一个数组。</p>
<h4>React.Children.count</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.Children.count(children)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.Children.count(children)</code></pre>
<p>返回children中的组件总数。</p>
<h5>React.Children.only</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.Children.only(children)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.Children.only(children)</code></pre>
<p>然会children中的只出现一次的子元素。否则抛出。</p>
<h5>React.Children.toArray</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.Children.toArray(children)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.Children.toArray(children)</code></pre>
<p>将子元素中的不透明数据结构作为一个一维数组返回。如果你想在<code>render</code>方法中操作children集合，特别是如果你想在传递它之前重新排序或切割this.props.children，这歌方法将非常有用。</p>
<hr>
<h4>React.PropTypes</h4>
<p><code>React.PropTypes</code>是一系列类型验证器的集合，可以与组件的<code>propTypes</code>对象一起使用，以验证传递到组件的props。</p>
<h5>React.PropTypes.array</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.PropTypes.array" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.PropTypes.array</code></pre>
<p>验证prop是一个数组类型。</p>
<h5>React.PropTypes.bool</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.PropTypes.bool" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.PropTypes.bool</code></pre>
<p>验证prop是一个布尔值。</p>
<h5>React.PropTypes.func</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.PropTypes.func" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.PropTypes.func</code></pre>
<p>验证prop是一个函数。</p>
<h5>React.PropTypes.number</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.PropTypes.number" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.PropTypes.number</code></pre>
<p>验证prop是一个数字。</p>
<h5>React.PropTypes.object</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.PropTypes.object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.PropTypes.object</code></pre>
<p>验证prop是一个对象。</p>
<h5>React.PropTypes.string</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.PropTypes.string" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.PropTypes.string</code></pre>
<p>验证prop是一个字符串。</p>
<h5>React.PropTypes.symbol</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.PropTypes.symbol" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.PropTypes.symbol</code></pre>
<p>验证prop是一个symbol。</p>
<h5>React.PropTypes.node</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.PropTypes.node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.PropTypes.node</code></pre>
<p>验证prop是一个可以渲染的东西：数字，字符串，元素 或者包含这些类型的数组（或片段）。</p>
<h5>React.PropTypes.element</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.PropTypes.element" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.PropTypes.element</code></pre>
<p>验证prop是一个React元素。</p>
<h5>React.PropTypes.instanceOf()</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.PropTypes.instanceOf(class)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.PropTypes.instanceOf(<span class="hljs-class"><span class="hljs-keyword">class</span>)</span></code></pre>
<p>验证prop是否是class的实例，使用Javascript中的<code>instaceof</code>操作符。</p>
<h5>React.PropTypes.oneOf()</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.PropTypes.oneOf(arrayOfValues)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.PropTypes.oneOf(arrayOfValues)</code></pre>
<p>通过将其视为枚举来验证prop是否受限于特定值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyComponent.propTypes = {
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">MyComponent.propTypes = {
    <span class="hljs-attr">optionalEnum</span>: React.PropTypes.oneOf([<span class="hljs-string">'News'</span>, <span class="hljs-string">'Photos'</span>]);
}</code></pre>
<h5>React.PropTypes.oneOfType()</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.PropTypes.oneOfType()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.PropTypes.oneOfType()</code></pre>
<p>验证prop是可以是多种类型之一的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyComponent.propTypes = {
    optionalUnion: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.instanceOf(Message)
    ]),
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">MyComponent.propTypes = {
    <span class="hljs-attr">optionalUnion</span>: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.instanceOf(Message)
    ]),
}</code></pre>
<h5>React.PropTypes.arrayOf()</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.PropTypes.arrayOf(propType)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.PropTypes.arrayOf(propType)</code></pre>
<p>验证porp是一个特定类型的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyComponent.propTypes = {
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">MyComponent.propTypes = {
    <span class="hljs-attr">optionalArrayOf</span>: React.PropTypes.arrayOf(React.PropTypes.number),
}</code></pre>
<h5>React.PropTypes.objectOf()</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.PropTypes.objectOf(propType)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.PropTypes.objectOf(propType)</code></pre>
<p>验证prop是具有某个类型的属性值的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyComponent.propTypes = {
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">MyComponent.propTypes = {
    <span class="hljs-attr">optionalObjectOf</span>: React.PropTypes.objectOf(React.PropTypes.number),
}</code></pre>
<h5>React.PropTypes.shape()</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.PropTypes.shape(object)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.PropTypes.shape(object)</code></pre>
<p>验证prop是采取特定形状的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyComponent.propTypes = {
    optionalObjectWithShape: React.PropTypes.shape({
        color: React.PropTypes.string,
        fontSize: React.PropTypes.number
    }),
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">MyComponent.propTypes = {
    <span class="hljs-attr">optionalObjectWithShape</span>: React.PropTypes.shape({
        <span class="hljs-attr">color</span>: React.PropTypes.string,
        <span class="hljs-attr">fontSize</span>: React.PropTypes.number
    }),
}</code></pre>
<h5>React.PropTypes.any</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.PropTypes.any" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.PropTypes.any</code></pre>
<p>验证prop具有任何数据类型的值。 通常后面是<code>isRequired</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyComponent.propTypes = {
    requiredAny: React.PropTypes.any.isRequired,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">MyComponent.propTypes = {
    <span class="hljs-attr">requiredAny</span>: React.PropTypes.any.isRequired,
}</code></pre>
<h5>isRequired</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="propTypes.isRequired" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">propTypes.isRequired</code></pre>
<p>您可以使用isRequired链接上述任何验证器，以确保在未提供prop的情况下显示警告。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyComponent.propTypes = {
    requiredFunc: React.PropTypes.func.isRequired,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">MyComponent.propTypes = {
    <span class="hljs-attr">requiredFunc</span>: React.PropTypes.func.isRequired,
}</code></pre>
<hr>
<h4>React.addons</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.addons" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.addons</code></pre>
<p><code>React.addons</code>导出一系列附加组件，只有在使用<code>react-with-addons.js</code>时才可用。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(21)React顶级API

## 原文链接
[https://segmentfault.com/a/1190000007828637](https://segmentfault.com/a/1190000007828637)


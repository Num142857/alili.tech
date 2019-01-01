---
title: '图解 React Virtual DOM' 
date: 2019-01-02 2:30:09
hidden: true
slug: 08jeyxb4418y
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>作者： 阿希 （沪江Web前端开发工程师）<br>本文原创，转载请注明作者及出处。</p></blockquote>
<p>了解 React 的人几乎都听过说 Virtual DOM，甚至不了解 React 的人也听过 Virtual DOM。那么 React 的 Virtual DOM 到底长什么样子呢？今天我们将一探 React 的源码来揭开 React  Virtual DOM 的神秘面纱。</p>
<blockquote><p>参考源码为React稳定版，版本号v15.4.1。</p></blockquote>
<h2 id="articleHeader0">1. React</h2>
<p>我们首先试着在控制台打印一下 <code>React</code> 看看会是什么样子:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010924028" src="https://static.alili.tech/img/remote/1460000010924028" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>从控制台看来，React是一个对象，那接下来我们找到相应的源码来确认看看(src/isomorphic/React.js)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var React = {
  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild,
  },
  Component: ReactComponent,
  PureComponent: ReactPureComponent,
  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,
  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: createFactory,
  createMixin: function(mixin) {
    return mixin;
  },
  DOM: ReactDOMFactories,
  version: ReactVersion,
  __spread: __spread,
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> React = {
  <span class="hljs-attr">Children</span>: {
    <span class="hljs-attr">map</span>: ReactChildren.map,
    <span class="hljs-attr">forEach</span>: ReactChildren.forEach,
    <span class="hljs-attr">count</span>: ReactChildren.count,
    <span class="hljs-attr">toArray</span>: ReactChildren.toArray,
    <span class="hljs-attr">only</span>: onlyChild,
  },
  <span class="hljs-attr">Component</span>: ReactComponent,
  <span class="hljs-attr">PureComponent</span>: ReactPureComponent,
  <span class="hljs-attr">createElement</span>: createElement,
  <span class="hljs-attr">cloneElement</span>: cloneElement,
  <span class="hljs-attr">isValidElement</span>: ReactElement.isValidElement,
  <span class="hljs-attr">PropTypes</span>: ReactPropTypes,
  <span class="hljs-attr">createClass</span>: ReactClass.createClass,
  <span class="hljs-attr">createFactory</span>: createFactory,
  <span class="hljs-attr">createMixin</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">mixin</span>) </span>{
    <span class="hljs-keyword">return</span> mixin;
  },
  <span class="hljs-attr">DOM</span>: ReactDOMFactories,
  <span class="hljs-attr">version</span>: ReactVersion,
  <span class="hljs-attr">__spread</span>: __spread,
};</code></pre>
<p>可以了解到，React 确实是一个 Object ，我们可以把 React 对象画成下图的形式，方便大家直观的观察：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010924029" src="https://static.alili.tech/img/remote/1460000010924029" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>React 是一个对象，里面包含了许多方法和属性，有最新的 v15 版本的方法，也有些以前的 API 和一些已经废弃不建议使用的 API。</p>
<ul>
<li><p><code>Component</code> 用来创建 React 组件类。</p></li>
<li><p><code>PureComponent</code> 用来创建 React 纯组件类。</p></li>
<li><p><code>createElement</code> 创建 React 元素。</p></li>
<li><p><code>cloneElement</code> 拷贝 React 元素。</p></li>
<li><p><code>isValidElement</code> 判断是否是有效的 React 元素。</p></li>
<li><p><code>PropTypes</code> 定义 React props 类型。(过时的API)</p></li>
<li><p><code>createClass</code> 创建 React 组件类（过时的API）。</p></li>
<li><p><code>createFactory</code> 创建 React 工厂函数。（不建议使用）。</p></li>
<li><p><code>createMixin</code> 创建 Mixin。</p></li>
<li><p><code>DOM</code> 主要和同构相关。</p></li>
<li><p><code>version</code> 当前使用的 React 版本号。</p></li>
<li><p><code>__spread</code> <strong>已废弃</strong>，直接用 <code>Object.assign()</code> 代替</p></li>
</ul>
<p><code>__spread</code> 方法已经<strong>废弃</strong>，不再建议使用。在作者写这篇文章的时候，React 又发布了 v15.5.0 版本，在这个版本里，<code>createClass</code> 和 <code>PropTypes</code> 也已经被标记为<strong>过时</strong>的 API，会提示 warning。</p>
<ul>
<li><p>对于原来的旧 API <code>React.createClass</code>，现在推荐开发者用 class 的方式继承 <code>Component</code> 或者 <code>PureComponent</code>。</p></li>
<li><p>对于 <code>PropTypes</code> 的引入方式也不是原来的 <code>import { PropTypes } from 'react'</code>，而变成了 <code>import PropTypes from 'prop-types'</code>。</p></li>
</ul>
<p>其他属性和方法我们暂且就不详细的讲述了，这篇文章就只详细的研究一下和创建 React Virtual DOM 最紧密相关的方法——<code>React.createElement</code>。</p>
<blockquote><p><code>React.createElement</code> 方法其实是调用的ReactElement模块的 <code>ReactElement.createElement</code> 方法。</p></blockquote>
<h2 id="articleHeader1">2. React Element</h2>
<p>Virtual DOM 是真实 DOM 的模拟，真实 DOM 是由真实的 DOM 元素构成，Virtual DOM 也是由虚拟的 DOM 元素构成。真实 DOM 元素我们已经很熟悉了，它们都是 HTML 元素（HTML Element）。那虚拟 DOM 元素是什么呢？React 给虚拟 DOM 元素取名叫 React 元素（React Element）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010924030" src="https://static.alili.tech/img/remote/1460000010924030" alt="" title="" style="cursor: pointer;"></span></p>
<p>我们知道，React 可以通过组合一些 HTML 原生元素形成组件，然后组件又可以被其他的组件复用。所以，原生元素和组件其实在概念上都是一致的，都是具有特定功能和 UI 的可复用的元素。因此，React 把这些元素抽象成了 React Element。不论是 HTML 原生元素，例如：<code>&lt;p&gt;&lt;/p&gt;</code>，<code>&lt;a&gt;&lt;/a&gt;</code>，等。或者这些原生元素的组合（组件），例如 <code>&lt;Message /&gt;</code> 等。它们都是 React Element，而创建这些 Element 的方法就是 <code>React.createElement</code>。</p>
<blockquote><p><strong>React Virtual DOM 就是由 React Element 构成的一棵树</strong>。</p></blockquote>
<p>接下来我们就探究下 React Element 到底长什么样以及 React 是如何创建这些 React Element 的。</p>
<h3 id="articleHeader2">2.1 ReactElement 模块</h3>
<p>我们在控制台里直接打印出 <code>&lt;h1&gt;hello&lt;/h1&gt;</code>：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010924031" src="https://static.alili.tech/img/remote/1460000010924031" alt="" title="" style="cursor: pointer;"></span></p>
<p>我们再打印出 <code>&lt;App /&gt;</code>，App 组件的结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <h1>App</h1>
    <p>Hello world!</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>App<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello world!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>打印出的结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010924032" src="https://static.alili.tech/img/remote/1460000010924032" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>可以很直观的发现，打印的 HTML 元素并不是真实的 DOM 元素，打印的组件也不是 DOM 元素的集合，所有打印出来的元素都是一个对象，而且它们长的非常相似，那其实这些对象都是 React Element 对象。</p>
<p>然后我们再看看源码部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ReactElement = function(type, key, ref, self, source, owner, props) {
  var element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner,
  };
  if (__DEV__) {
    // ...
  }
  return element;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> ReactElement = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, key, ref, self, source, owner, props</span>) </span>{
  <span class="hljs-keyword">var</span> element = {
    <span class="hljs-attr">$$typeof</span>: REACT_ELEMENT_TYPE,
    <span class="hljs-attr">type</span>: type,
    <span class="hljs-attr">key</span>: key,
    <span class="hljs-attr">ref</span>: ref,
    <span class="hljs-attr">props</span>: props,
    <span class="hljs-attr">_owner</span>: owner,
  };
  <span class="hljs-keyword">if</span> (__DEV__) {
    <span class="hljs-comment">// ...</span>
  }
  <span class="hljs-keyword">return</span> element;
};</code></pre>
<p>ReactElement其实是一个工厂函数，接受7个参数，最终返回一个React Element对象。</p>
<ul>
<li><p><code>$$type</code> React Element 的标志，是一个Symbol类型。</p></li>
<li><p><code>type</code> React 元素的类型。</p></li>
<li><p><code>key</code> React 元素的 key，diff 算法会用到。</p></li>
<li><p><code>ref</code> React 元素的 ref 属性，当 React 元素生成实际 DOM 后，返回 DOM 的引用。</p></li>
<li><p><code>props</code> React 元素的属性，是一个对象。</p></li>
<li><p><code>_owner</code> 负责创建这个 React 元素的组件。</p></li>
</ul>
<p>参数中的 <code>self</code> 和 <code>source</code> 都是只供开发环境下用的参数。从上面的例子我们可以发现唯一不同的就是<code>type</code> 了，对于原生元素，<code>type</code> 是一个字符串类型，记录了原生元素的类型；对于 react 组件来说呢，<code>type</code> 是一个构造函数，或者说它是一个类，记录了这个 react 组件的是哪一个类的实例。所以<code>&lt;App/&gt;.type === App</code> 的。</p>
<p>所以，每一个包装过后的React元素都是这样的对象:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">$$typeof</span>: REACT_ELEMENT_TYPE,
    <span class="hljs-attr">type</span>: type,
    <span class="hljs-attr">key</span>: key,
    <span class="hljs-attr">ref</span>: ref,
    <span class="hljs-attr">props</span>: props,
    <span class="hljs-attr">_owner</span>: owner,
}</code></pre>
<p>用图片表示 React Element，就是下图这样：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010924033" src="https://static.alili.tech/img/remote/1460000010924033" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">2.2 ReactElement.createElement 方法</h3>
<p>在此之前，可能有人会问，我们开发当中似乎没有用到 React.createElement 方法呀。其实不然，看下面的示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class OriginalElement extends Component {
  render() {
    return (
      <div>Original Element div</div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">OriginalElement</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Original Element div<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}</code></pre>
<p>经过babel转译之后是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_createClass(OriginalElement, [{
    key: &quot;render&quot;,
    value: function render() {
      return React.createElement(
        &quot;div&quot;,
        null,
        &quot;Original Element div&quot;
      );
    }
  }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_createClass(OriginalElement, [{
    <span class="hljs-attr">key</span>: <span class="hljs-string">"render"</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> React.createElement(
        <span class="hljs-string">"div"</span>,
        <span class="hljs-literal">null</span>,
        <span class="hljs-string">"Original Element div"</span>
      );
    }
  }]);</code></pre>
<p>可以看到，所有的 JSX 都会被编译成 React.createElement 方法，所以这个方法可能是我们在使用React用的最多的方法。</p>
<p>接下来我们看看 React.createElement 方法是怎样的，前面说过了 React.createElement 方法其实就是 ReactElement.createElement 方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactElement.createElement = function(type, config, children) {
  var propName;
  var props = {};
  var key = null;
  var ref = null;
  var self = null;
  var source = null;
  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) &amp;&amp;
          !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (__DEV__) {
      // ...
    }
    props.children = childArray;
  }
  if (type &amp;&amp; type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (__DEV__) {
    // ...
  }
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props
  );
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">ReactElement.createElement = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, config, children</span>) </span>{
  <span class="hljs-keyword">var</span> propName;
  <span class="hljs-keyword">var</span> props = {};
  <span class="hljs-keyword">var</span> key = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">var</span> ref = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">var</span> self = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">var</span> source = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">if</span> (config != <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">if</span> (hasValidRef(config)) {
      ref = config.ref;
    }
    <span class="hljs-keyword">if</span> (hasValidKey(config)) {
      key = <span class="hljs-string">''</span> + config.key;
    }
    self = config.__self === <span class="hljs-literal">undefined</span> ? <span class="hljs-literal">null</span> : config.__self;
    source = config.__source === <span class="hljs-literal">undefined</span> ? <span class="hljs-literal">null</span> : config.__source;

    <span class="hljs-keyword">for</span> (propName <span class="hljs-keyword">in</span> config) {
      <span class="hljs-keyword">if</span> (hasOwnProperty.call(config, propName) &amp;&amp;
          !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }
  <span class="hljs-keyword">var</span> childrenLength = <span class="hljs-built_in">arguments</span>.length - <span class="hljs-number">2</span>;
  <span class="hljs-keyword">if</span> (childrenLength === <span class="hljs-number">1</span>) {
    props.children = children;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (childrenLength &gt; <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">var</span> childArray = <span class="hljs-built_in">Array</span>(childrenLength);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; childrenLength; i++) {
      childArray[i] = <span class="hljs-built_in">arguments</span>[i + <span class="hljs-number">2</span>];
    }
    <span class="hljs-keyword">if</span> (__DEV__) {
      <span class="hljs-comment">// ...</span>
    }
    props.children = childArray;
  }
  <span class="hljs-keyword">if</span> (type &amp;&amp; type.defaultProps) {
    <span class="hljs-keyword">var</span> defaultProps = type.defaultProps;
    <span class="hljs-keyword">for</span> (propName <span class="hljs-keyword">in</span> defaultProps) {
      <span class="hljs-keyword">if</span> (props[propName] === <span class="hljs-literal">undefined</span>) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  <span class="hljs-keyword">if</span> (__DEV__) {
    <span class="hljs-comment">// ...</span>
  }
  <span class="hljs-keyword">return</span> ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props
  );
};</code></pre>
<p>reactElement.createElement大致做了2件事。</p>
<p>第一件是初始化 React Element 里的各种参数，例如 <code>type</code>，<code>props</code> 和 <code>children</code> 等。在初始化的时候，会提取出 <code>key</code>，<code>ref</code> 这两个属性，然后 __self，__source 这两个属性也是仅开发用。所以如果你在组件里定义了 <code>key</code>，<code>ref</code>，<code>__self</code>，<code>__source</code> 这4个属性中的任何一个，都是不能在 <code>this.props</code> 里访问到的。从第三个参数开始，传入的参数都会合并为 <code>children</code> 属性，如果只有一个，那么 <code>children</code> 就是第三个元素，如果超过一个，那么这些元素就会合并成一个 <code>children</code> 数组。</p>
<p>第二件是初始化 <code>defaultProps</code>，我们可以发现，<code>defaultProps</code> 是通过 <code>type</code> 来初始化的，我们在上面也说过，对于 <code>react</code> 组件来说，<code>type</code> 是 React Element 所属的类，所以可以通过 <code>type</code> 取到该类的 <code>defaultProps</code>（默认属性）。这里还有一点需要注意，如果我们把某个属性的值定义成 <code>undefined</code>，那么这个属性也会使用默认属性，但是定义成 <code>null</code> 就不会使用默认属性。</p>
<p>下面是图解：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010924034" src="https://static.alili.tech/img/remote/1460000010924034" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">4. 创建Virtual DOM树</h2>
<p>有了上面的作为基础，那创建 Virtual DOM 就很简单了。整个 Virtual DOM 就是一个巨大的对象。</p>
<p>比如我们有这么一个 <code>App</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="App:
<div>
  <Header />
  <List />
</div>

Header:
<div>
  <Logo />
  <button>菜单</button>
</div>

List:
<ul>
  <li>text 1</li>
  <li>text 2</li>
  <li>text 3</li>
</ul>

Logo:
<div>
  <img src=&quot;./foo.png&quot; alt=&quot;logo&quot; />
  <p>text logo</p>
</div>

ReactDOM.render(<App />, document.getElementById('root'))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">App:
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">List</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

Header:
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Logo</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>菜单<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

List:
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>text 1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>text 2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>text 3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

Logo:
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./foo.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"logo"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>text logo<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

ReactDOM.render(<span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>, document.getElementById('root'))
</code></pre>
<p>通过上面的了解到的 React Element 创建方式，我们不难知道，生成的对应的 Virtual DOM 应该是类似于这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010924035" src="https://static.alili.tech/img/remote/1460000010924035" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>需要注意的是，这些元素<strong>并不是</strong>真实的 DOM 元素， 它们只是一些对象，而且我们可以看到 React 组件实际上是概念上的形态，最终还是会生成原生的虚拟 DOM 对象。当这些对象上的数据发生变化时，通过打 patch 把变化同步到真实的 DOM 上去。</p>
<p>目前我们可以认为 Virtual DOM 就是这样的一种形态，但是实际上，并没有这么简单，这只是最基本的样子，在后续的文章中我会带大家一起看看更高级的形态。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010887896" src="https://static.alili.tech/img/remote/1460000010887896" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVT6wG?w=1500&amp;h=854" src="https://static.alili.tech/img/bVT6wG?w=1500&amp;h=854" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>iKcamp原创新书《移动Web前端高效开发实战》已在亚马逊、京东、当当开售。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
图解 React Virtual DOM

## 原文链接
[https://segmentfault.com/a/1190000010924023](https://segmentfault.com/a/1190000010924023)


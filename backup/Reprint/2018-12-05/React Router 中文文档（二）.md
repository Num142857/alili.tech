---
title: 'React Router 中文文档（二）' 
date: 2018-12-05 2:30:09
hidden: true
slug: 87m3fb9bhdo
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>官方英文文档 - <a href="https://reacttraining.com/react-router/web/api/history" rel="nofollow noreferrer" target="_blank"></a><a href="https://reacttraining.com/react-router/web/api/history" rel="nofollow noreferrer" target="_blank">https://reacttraining.com/rea...</a><br>版本 - <code>v4.2.0</code>
</blockquote>
<h2 id="articleHeader0">history</h2>
<p>本文档中的术语 <code>history</code> 指的是 <a href="https://github.com/ReactTraining/history" rel="nofollow noreferrer" target="_blank">history</a> 包，它是 React Router 的两个主要依赖之一（除了 React 本身），并且提供了几种不同的实现方式，用于在各种环境中管理 JavaScript 中的会话历史。</p>
<p>以下术语我们会经常使用：</p>
<ul>
<li>
<code>browser history</code> - 针对 DOM 环境，用于支持 HTML5 history API 的浏览器</li>
<li>
<code>hash history</code> - 针对 DOM 环境，用于传统的旧式（低版本） 浏览器</li>
<li>
<code>memory history</code> - <code>history</code> 在内存上的实现，用于测试以及 React Native 等非 DOM 环境</li>
</ul>
<p><code>history</code> 对象通常具有以下属性和方法：</p>
<ul>
<li>
<code>length</code> - number 历史堆栈中的条目数</li>
<li>
<code>action</code> - string 当前的导航操作（<code>push</code>、<code>replace</code>    或 <code>pop</code>）</li>
<li>
<p><code>location</code> - object 当前访问的位置信息，可能具有以下属性：</p>
<ul>
<li>
<code>pathname</code> - string URL 路径</li>
<li>
<code>search</code> - string URL 中的查询字符串</li>
<li>
<code>hash</code> - string URL 中的 hash 片段</li>
<li>
<code>state</code> - object 存储至 <code>location</code> 中的额外状态数据，仅在 <code>browser history</code> 和 <code>memory history</code> 中有效。</li>
</ul>
</li>
<li>
<code>push(path, [state])</code> - function 将一个新条目推入到历史堆栈中</li>
<li>
<code>replace(path, [state])</code> - function 替换历史堆栈中的当前条目</li>
<li>
<code>go(n)</code> - function 将历史堆栈中的指针移动 n 个条目</li>
<li>
<code>goBack()</code> - function 返回到上一个页面，相当于 go(-1)</li>
<li>
<code>goForward()</code> - function 进入到下一个页面，相当于 go(1)</li>
<li>
<code>block(prompt)</code> - function 阻止导航（请参阅 <a href="https://github.com/ReactTraining/history#blocking-transitions" rel="nofollow noreferrer" target="_blank">history</a> 文档）</li>
</ul>
<h4>history is mutable</h4>
<p><code>history</code> 对象是可变的。因此建议从 <code>&lt;Route&gt;</code> 渲染组件时接收的属性中直接访问 <code>location</code>，而不是通过 <code>history.location</code> 进行访问。这样可以保证 React 在生命周期中的钩子函数正常执行。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Comp extends React.Component {
  componentWillReceiveProps(nextProps) {
    // locationChanged 会是 true
    const locationChanged = nextProps.location !== this.props.location;

    // 错误，locationChanged 永远是 false，因为 history 是可变的。
    const locationChanged = nextProps.history.location !== this.props.history.location;
  }
}

<Route component={Comp} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Comp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  componentWillReceiveProps(nextProps) {
    <span class="hljs-comment">// locationChanged 会是 true</span>
    const locationChanged = nextProps.location !== <span class="hljs-keyword">this</span>.props.location;

    <span class="hljs-comment">// 错误，locationChanged 永远是 false，因为 history 是可变的。</span>
    const locationChanged = nextProps.history.location !== <span class="hljs-keyword">this</span>.props.history.location;
  }
}

&lt;<span class="hljs-type">Route</span> component={<span class="hljs-type">Comp</span>} /&gt;</code></pre>
<p>根据你使用的实现方式，还可能存在其它属性。有关详细信息，请参阅 <a href="https://github.com/ReactTraining/history#properties" rel="nofollow noreferrer" target="_blank">history</a> 文档。</p>
<h2 id="articleHeader1">location</h2>
<p><code>location</code> 代表应用程序的位置。如当前的位置，将要去的位置，或是之前所在的位置。它看起来像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  key: 'ac3df4', // 使用 hash history 时，没有这个属性
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>{
  <span class="hljs-attribute">key</span>: <span class="hljs-string">'ac3df4'</span>, <span class="hljs-comment">// 使用 hash history 时，没有这个属性</span>
  <span class="hljs-attribute">pathname</span>: <span class="hljs-string">'/somewhere'</span>
  <span class="hljs-attribute">search</span>: <span class="hljs-string">'?some=search-string'</span>,
  <span class="hljs-attribute">hash</span>: <span class="hljs-string">'#howdy'</span>,
  <span class="hljs-attribute">state</span>: {
    [userDefined]: true
  }
}</code></pre>
<p>Router 将在以下几个地方为您提供一个 <code>location</code> 对象：</p>
<ul>
<li>在 <code>Route component</code> 中，以 <code>this.props.location</code> 方式获取</li>
<li>在 <code>Route render</code> 中，以 <code>({ location }) =&gt; ()</code> 方式获取</li>
<li>在 <code>Route children</code> 中，以 <code>({ location }) =&gt; ()</code> 方式获取</li>
<li>在 <code>withRouter</code> 中，以 <code>this.props.location</code> 方式获取</li>
</ul>
<p><code>location</code> 对象永远不会发生改变，因此可以在生命周期钩子函数中使用 <code>location</code> 对象来查看当前访问地址是否发生改变。这种技巧在获取远程数据以及使用动画时非常有用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillReceiveProps(nextProps) {
  if (nextProps.location !== this.props.location) {
    // 已经跳转了！
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">componentWillReceiveProps</span><span class="hljs-params">(nextProps)</span></span> {
  <span class="hljs-keyword">if</span> (nextProps<span class="hljs-selector-class">.location</span> !== this<span class="hljs-selector-class">.props</span><span class="hljs-selector-class">.location</span>) {
    <span class="hljs-comment">// 已经跳转了！</span>
  }
}</code></pre>
<p>可以在以下不同情境中使用 <code>location</code>：</p>
<ul>
<li>Web <a href="https://reacttraining.com/react-router/web/api/Link" rel="nofollow noreferrer" target="_blank">&lt;Link to={location}&gt;</a>
</li>
<li>React Native <a href="https://reacttraining.com/react-router/native/api/Link" rel="nofollow noreferrer" target="_blank">&lt;Link to={location}&gt;</a>
</li>
<li><a href="https://reacttraining.com/react-router/web/api/Redirect" rel="nofollow noreferrer" target="_blank">&lt;Redirect to={location}&gt;</a></li>
<li><a href="https://reacttraining.com/react-router/web/api/history" rel="nofollow noreferrer" target="_blank">history.push(location)</a></li>
<li><a href="https://reacttraining.com/react-router/web/api/history" rel="nofollow noreferrer" target="_blank">history.replace(location)</a></li>
</ul>
<p>通常情况下只是使用一个字符串，但是如果你需要添加一些额外的 <code>state</code>，以在应用程序跳转到特定位置时可以使用，那么你就可以使用 <code>location</code> 对象。如果你想根据导航历史而不是路径来组织 UI（如模态对话框），这也很有用（见<a href="https://reacttraining.com/react-router/web/example/modal-gallery" rel="nofollow noreferrer" target="_blank">模态画廊</a>示例）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通常情况下我们这么做
<Link to=&quot;/somewhere&quot; />

// 但是我们可以改为使用 location 对象
const location = {
  pathname: '/somewhere',
  state: { fromDashboard: true }
};

<Link to={location} />
<Redirect to={location} />
history.push(location);
history.replace(location);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">// 通常情况下我们这么做</span>
&lt;<span class="hljs-keyword">Link</span> <span class="hljs-keyword">to</span>=<span class="hljs-string">"/somewhere"</span> /&gt;

<span class="hljs-comment">// 但是我们可以改为使用 location 对象</span>
const location = {
  pathname: <span class="hljs-string">'/somewhere'</span>,
  state: { fromDashboard: <span class="hljs-literal">true</span> }
};

&lt;<span class="hljs-keyword">Link</span> <span class="hljs-keyword">to</span>={location} /&gt;
&lt;Redirect <span class="hljs-keyword">to</span>={location} /&gt;
history.push(location);
history.replace(location);</code></pre>
<p>最终，<code>location</code> 将传递给以下组件：</p>
<ul>
<li><a href="https://reacttraining.com/react-router/web/api/Route" rel="nofollow noreferrer" target="_blank">Route</a></li>
<li><a href="https://reacttraining.com/react-router/web/api/Switch" rel="nofollow noreferrer" target="_blank">Switch</a></li>
</ul>
<p>这将阻止它们在 Router 状态下使用实际位置。这对动画和等待导航非常有用，或者任何时候你想诱导一个组件在不同于真实位置的地方渲染。</p>
<h2 id="articleHeader2">match</h2>
<p>一个 <code>match</code> 对象包含有关 <code>&lt;Route path&gt;</code> 如何匹配 URL 的信息。它具有以下属性：</p>
<ul>
<li>
<code>params</code> - object 根据 <code>path</code> 中指定的动态片段，从 URL 中解析出的键值对</li>
<li>
<code>isExact</code> - boolean 如果整个 URL 匹配（不包含尾随字符），则为 <code>true</code>
</li>
<li>
<code>path</code> - string 用于匹配的路径模式。可用于构建嵌套的 <code>&lt;Route&gt;</code>
</li>
<li>
<code>url</code> - string URL 的匹配部分。可用于构建嵌套的 <code>&lt;Link&gt;</code>
</li>
</ul>
<p>您可以在以下几个地方访问 <code>match</code> 对象：</p>
<ul>
<li>在 <code>Route component</code> 中，以 <code>this.props.match</code> 方式获取</li>
<li>在 <code>Route render</code> 中，以 <code>({ match }) =&gt; ()</code> 方式获取</li>
<li>在 <code>Route children</code> 中，以 <code>({ match }) =&gt; ()</code> 方式获取</li>
<li>在 <code>withRouter</code> 中，以 <code>this.props.match</code> 方式获取</li>
<li>
<code>matchPath</code> 的返回值</li>
</ul>
<p>如果 <code>&lt;Route&gt;</code> 没有定义 <code>path</code>，并因此始终匹配，则会得到最接近的父匹配。<code>withRouter</code> 也是一样。</p>
<h4>null matches</h4>
<p>在 <code>&lt;Route path="/somewhere" children={({ match }) =&gt; ()} /&gt;</code> 中，即使 <code>path</code> 与当前位置不匹配，<code>children</code> 指定的内联函数也依然会被调用。这种情况下，<code>match</code> 为 <code>null</code>。能够在不匹配时依然呈现 <code>&lt;Route&gt;</code> 的内容可能很有用，但是这样会带来一些挑战。</p>
<p>解析 URL 的默认方式是将 <code>match.url</code> 字符串连接到 relative-path。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`${match.url}/relative-path`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;">`${match.url}/relative-path`</code></pre>
<p>如果你在 <code>match</code> 为 <code>null</code> 时尝试执行此操作，最终会出现 <code>TypeError</code> 错误。这意味着在使用 <code>children</code> 属性时尝试在 <code>&lt;Route&gt;</code> 内部连接 relative-path 是不安全的。</p>
<p>当您在产生空匹配对象的 <code>&lt;Route&gt;</code> 内部使用没有定义 <code>path</code> 的 <code>&lt;Route&gt;</code> 时，会出现类似但更微妙的情况。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// location.pathname = '/matches'
<Route path='/does-not-match' children={({ match }) => (
  // match === null
  <Route render={({ match: pathlessMatch }) => (
    // pathlessMatch === ???
  )} />
)} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// location.pathname = '/matches'</span>
&lt;Route path=<span class="hljs-string">'/does-not-match'</span> children={<span class="hljs-function">(<span class="hljs-params">{ match }</span>) =&gt;</span> (
  <span class="hljs-comment">// match === null</span>
  &lt;Route render={<span class="hljs-function">(<span class="hljs-params">{ match: pathlessMatch }</span>) =&gt;</span> (
    <span class="hljs-comment">// pathlessMatch === ???</span>
  )} /&gt;
)} /&gt;</code></pre>
<p>没有 <code>path</code> 的 <code>&lt;Route&gt;</code> 从它的父节点继承 <code>match</code> 对象。如果它的父匹配为 <code>null</code>，那么它的匹配也将为 <code>null</code>。这意味着：</p>
<ul>
<li>任何子路由/子链接必须是绝对的</li>
<li>一个没有定义 <code>path</code> 的 <code>&lt;Route&gt;</code>，它的父匹配可以为 <code>null</code>，但它本身需要使用 <code>children</code> 来呈现内容。</li>
</ul>
<h2 id="articleHeader3">matchPath</h2>
<p>在正常的渲染周期之外，你可以使用和 <code>&lt;Route&gt;</code> 所使用的相同的匹配代码，例如在服务器上呈现之前收集数据依赖关系。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { matchPath } from 'react-router';

const match = matchPath('/users/123', {
  path: '/users/:id',
  exact: true,
  strict: false
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { matchPath } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;

<span class="hljs-keyword">const</span> match = matchPath(<span class="hljs-string">'/users/123'</span>, {
  <span class="hljs-attr">path</span>: <span class="hljs-string">'/users/:id'</span>,
  <span class="hljs-attr">exact</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">strict</span>: <span class="hljs-literal">false</span>
});</code></pre>
<h4>pathname</h4>
<p>第一个参数是要匹配的路径名。如果您在服务器上通过 Node.js 使用，它将是 <code>req.path</code>。</p>
<h4>props</h4>
<p>第二个参数是匹配的属性，它们与 <code>&lt;Route&gt;</code> 接受的匹配属性相同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  path, // 例如 /users/:id
  strict, // 可选，默认为 false
  exact // 可选，默认为false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>{
  path, <span class="hljs-regexp">//</span> 例如 <span class="hljs-regexp">/users/</span>:id
  strict, <span class="hljs-regexp">//</span> 可选，默认为 false
  exact <span class="hljs-regexp">//</span> 可选，默认为false
}</code></pre>
<h2 id="articleHeader4">withRouter</h2>
<p>你可以通过 <code>withRouter</code> 高阶组件访问 <code>history</code> 对象的属性和最近（UI 结构上靠的最近）的 <code>&lt;Route&gt;</code> 的 <code>match</code> 对象。当组件渲染时，<code>withRouter</code> 会将更新后的 <code>match</code>、<code>location</code> 和 <code>history</code> 传递给它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// 显示当前位置的 pathname 的简单组件
class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, location, history } = this.props;

    return (
      <div>You are now at {location.pathname}</div>
    );
  }
}

// 创建一个连接到 Router 的新组件（借用 redux 术语）
const ShowTheLocationWithRouter = withRouter(ShowTheLocation)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> <span class="hljs-type">PropTypes</span> from <span class="hljs-symbol">'prop</span>-types';
<span class="hljs-keyword">import</span> { withRouter } from <span class="hljs-symbol">'react</span>-router-dom';

<span class="hljs-comment">// 显示当前位置的 pathname 的简单组件</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ShowTheLocation</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  static propTypes = {
    <span class="hljs-keyword">match</span>: <span class="hljs-type">PropTypes</span>.<span class="hljs-keyword">object</span>.isRequired,
    location: <span class="hljs-type">PropTypes</span>.<span class="hljs-keyword">object</span>.isRequired,
    history: <span class="hljs-type">PropTypes</span>.<span class="hljs-keyword">object</span>.isRequired
  }

  render() {
    const { <span class="hljs-keyword">match</span>, location, history } = <span class="hljs-keyword">this</span>.props;

    <span class="hljs-keyword">return</span> (
      &lt;div&gt;<span class="hljs-type">You</span> are now at {location.pathname}&lt;/div&gt;
    );
  }
}

<span class="hljs-comment">// 创建一个连接到 Router 的新组件（借用 redux 术语）</span>
const <span class="hljs-type">ShowTheLocationWithRouter</span> = withRouter(<span class="hljs-type">ShowTheLocation</span>)</code></pre>
<p>注意：withRouter 不会订阅位置更改，如 React Redux 的 connect 对状态更改所做的更改。而是在位置更改从 &lt;Router&gt; 组件传播出去之后重新呈现。这意味着除非其父组件重新呈现，否则使用 withRouter 不会在路由转换时重新呈现。如果使用 withRouter 来防止更新被 shouldComponentUpdate 阻塞，那么使用router 包装实现 shouldComponentUpdate 的组件是非常重要的。例如，使用 Redux 时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// This gets around shouldComponentUpdate
withRouter(connect(...)(MyComponent))
// or
compose(
  withRouter,
  connect(...)
)(MyComponent)

// This does not
connect(...)(withRouter(MyComponent))
// nor
compose(
  connect(...),
  withRouter
)(MyComponent)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>// This gets around shouldComponentUpdate
withRouter(<span class="hljs-name">connect</span>(...)(<span class="hljs-name">MyComponent</span>))
// or
compose(
  <span class="hljs-name">withRouter</span>,
  connect(...)
)(<span class="hljs-name">MyComponent</span>)

// This does not
connect(...)(<span class="hljs-name">withRouter</span>(<span class="hljs-name">MyComponent</span>))
// nor
compose(
  <span class="hljs-name">connect</span>(...),
  withRouter
)(<span class="hljs-name">MyComponent</span>)</code></pre>
<p>有关更多信息，请参阅<a href="https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md" rel="nofollow noreferrer" target="_blank">本指南</a>。</p>
<p>静态方法和属性</p>
<p>封装组件的所有无反应的特定静态方法和属性都会自动复制到 connected 组件。</p>
<h4>Component.WrappedComponent</h4>
<p>被包装的组件被公开为返回组件上的静态属性 <code>WrappedComponent</code>，它可用于隔离测试组件等等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// MyComponent.js
export default withRouter(MyComponent);

// MyComponent.test.js
import MyComponent from './MyComponent';

render(<MyComponent.WrappedComponent location="{{"..."}}" ... />);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>// <span class="hljs-type">MyComponent</span>.js
<span class="hljs-keyword">export</span> default withRouter(<span class="hljs-type">MyComponent</span>);

// <span class="hljs-type">MyComponent</span>.test.js
<span class="hljs-keyword">import</span> <span class="hljs-type">MyComponent</span> <span class="hljs-keyword">from</span> './<span class="hljs-type">MyComponent</span>';

render(&lt;<span class="hljs-type">MyComponent</span>.<span class="hljs-type">WrappedComponent</span> location={<span class="hljs-meta">{...}</span>} ... /&gt;);</code></pre>
<h4>wrappedComponentRef: func</h4>
<p>一个将作为 <code>ref</code> 属性传递给包装组件的函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Container extends React.Component {
  componentDidMount() {
    this.component.doSomething();
  }

  render() {
    return (
      <MyComponent wrappedComponentRef={c => this.component = c} />
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Container</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  componentDidMount() {
    <span class="hljs-keyword">this</span>.component.doSomething();
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">MyComponent</span> wrappedComponentRef={c =&gt; <span class="hljs-keyword">this</span>.component = c} /&gt;
    )
  }
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Router 中文文档（二）

## 原文链接
[https://segmentfault.com/a/1190000014342764](https://segmentfault.com/a/1190000014342764)


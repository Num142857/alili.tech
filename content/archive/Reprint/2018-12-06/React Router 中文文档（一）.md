---
title: 'React Router 中文文档（一）' 
date: 2018-12-06 2:30:09
hidden: true
slug: e5rst8hbv1h
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>官方英文文档 - <a href="https://reacttraining.com/react-router/web/api/BrowserRouter" rel="nofollow noreferrer" target="_blank"></a><a href="https://reacttraining.com/react-router/web/api/BrowserRouter" rel="nofollow noreferrer" target="_blank">https://reacttraining.com/rea...</a><br>版本 - <code>v4.2.0</code>
</blockquote>
<h2 id="articleHeader0">&lt;BrowserRouter&gt;</h2>
<p><code>&lt;BrowserRouter&gt;</code> 使用 HTML5 提供的 history API (<code>pushState</code>, <code>replaceState</code> 和 <code>popstate</code> 事件) 来保持 UI 和 URL 的同步。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { BrowserRouter } from 'react-router-dom';

<BrowserRouter
  basename={string}
  forceRefresh={bool}
  getUserConfirmation={func}
  keyLength={number}
>
  <App />
</BrowserRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { BrowserRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">BrowserRouter</span>
  <span class="hljs-attr">basename</span>=<span class="hljs-string">{string}</span>
  <span class="hljs-attr">forceRefresh</span>=<span class="hljs-string">{bool}</span>
  <span class="hljs-attr">getUserConfirmation</span>=<span class="hljs-string">{func}</span>
  <span class="hljs-attr">keyLength</span>=<span class="hljs-string">{number}</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span></span></code></pre>
<h4>basename: string</h4>
<p>所有位置的基准 URL。如果你的应用程序部署在服务器的子目录，则需要将其设置为子目录。<code>basename</code> 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<BrowserRouter basename=&quot;/calendar&quot;>
  <Link to=&quot;/today&quot; />
</BrowserRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">BrowserRouter</span> <span class="hljs-attr">basename</span>=<span class="hljs-string">"/calendar"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/today"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span></code></pre>
<p>上例中的 <code>&lt;Link&gt;</code> 最终将被呈现为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;/calendar/today&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"/calendar/today"</span> /&gt;</code></pre>
<h4>forceRefresh: bool</h4>
<p>如果为 <code>true</code> ，在导航的过程中整个页面将会刷新。一般情况下，只有在不支持 HTML5 history API 的浏览器中使用此功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const supportsHistory = 'pushState' in window.history;

<BrowserRouter forceRefresh={!supportsHistory} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> supportsHistory = <span class="hljs-string">'pushState'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>.history;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">BrowserRouter</span> <span class="hljs-attr">forceRefresh</span>=<span class="hljs-string">{!supportsHistory}</span> /&gt;</span></span></code></pre>
<h4>getUserConfirmation: func</h4>
<p>用于确认导航的函数，默认使用 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm" rel="nofollow noreferrer" target="_blank">window.confirm</a>。例如，当从 <code>/a</code> 导航至 <code>/b</code> 时，会使用默认的 <code>confirm</code> 函数弹出一个提示，用户点击确定后才进行导航，否则不做任何处理。译注：需要配合 <code>&lt;Prompt&gt;</code> 一起使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这是默认的确认函数
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message);
  callback(allowTransition);
}

<BrowserRouter getUserConfirmation={getConfirmation} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 这是默认的确认函数</span>
<span class="hljs-keyword">const</span> getConfirmation = <span class="hljs-function">(<span class="hljs-params">message, callback</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> allowTransition = <span class="hljs-built_in">window</span>.confirm(message);
  callback(allowTransition);
}

&lt;BrowserRouter getUserConfirmation={getConfirmation} /&gt;</code></pre>
<h4>keyLength: number</h4>
<p><code>location.key</code> 的长度，默认为 <code>6</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<BrowserRouter keyLength={12} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">BrowserRouter</span> <span class="hljs-attr">keyLength</span>=<span class="hljs-string">{12}</span> /&gt;</span></code></pre>
<h4>children: node</h4>
<p>要呈现的<a href="https://reactjs.org/docs/react-api.html#react.children.only" rel="nofollow noreferrer" target="_blank">单个子元素（组件）</a>。</p>
<h2 id="articleHeader1">&lt;HashRouter&gt;</h2>
<p><code>&lt;HashRouter&gt;</code> 使用 URL 的 <code>hash</code> 部分（即 <code>window.location.hash</code>）来保持 UI 和 URL 的同步。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { HashRouter } from 'react-router-dom';

<HashRouter>
  <App />
</HashRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { HashRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">HashRouter</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">HashRouter</span>&gt;</span></span></code></pre>
<blockquote>注意： 使用 <code>hash</code> 记录导航历史不支持 <code>location.key</code> 和 <code>location.state</code>。在以前的版本中，我们视图 shim 这种行为，但是仍有一些问题我们无法解决。任何依赖此行为的代码或插件都将无法正常使用。由于该技术仅用于支持旧式（低版本）浏览器，因此对于一些新式浏览器，我们鼓励你使用 <code>&lt;BrowserHistory&gt;</code> 代替。</blockquote>
<h4>basename: string</h4>
<p>所有位置的基准 URL。<code>basename</code> 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<HashRouter basename=&quot;/calendar&quot;>
  <Link to=&quot;/today&quot; />
</HashRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">HashRouter</span> <span class="hljs-attr">basename</span>=<span class="hljs-string">"/calendar"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/today"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">HashRouter</span>&gt;</span></code></pre>
<p>上例中的 <code>&lt;Link&gt;</code> 最终将被呈现为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;#/calendar/today&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"#/calendar/today"</span> /&gt;</code></pre>
<h4>getUserConfirmation: func</h4>
<p>用于确认导航的函数，默认使用 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm" rel="nofollow noreferrer" target="_blank">window.confirm</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这是默认的确认函数
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message);
  callback(allowTransition);
}

<HashRouter getUserConfirmation={getConfirmation} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 这是默认的确认函数</span>
<span class="hljs-keyword">const</span> getConfirmation = <span class="hljs-function">(<span class="hljs-params">message, callback</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> allowTransition = <span class="hljs-built_in">window</span>.confirm(message);
  callback(allowTransition);
}

&lt;HashRouter getUserConfirmation={getConfirmation} /&gt;</code></pre>
<h4>hashType: string</h4>
<p><code>window.location.hash</code> 使用的 <code>hash</code> 类型，有如下几种：</p>
<ul>
<li>
<code>slash</code> - 后面跟一个斜杠，例如 #/ 和 #/sunshine/lollipops</li>
<li>
<code>noslash</code> - 后面没有斜杠，例如 # 和 #sunshine/lollipops</li>
<li>
<code>hashbang</code> - Google 风格的 <a href="https://developers.google.com/webmasters/ajax-crawling/docs/learn-more" rel="nofollow noreferrer" target="_blank">ajax crawlable</a>，例如 #!/ 和 #!/sunshine/lollipops</li>
</ul>
<p>默认为 <code>slash</code>。</p>
<h4>children: node</h4>
<p>要呈现的<a href="https://reactjs.org/docs/react-api.html#react.children.only" rel="nofollow noreferrer" target="_blank">单个子元素（组件）</a>。</p>
<h2 id="articleHeader2">&lt;Link&gt;</h2>
<p>为你的应用提供声明式的、可访问的导航链接。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Link } from 'react-router-dom';

<Link to=&quot;/about&quot;>About</Link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { Link } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/about"</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span></code></pre>
<h4>to: string</h4>
<p>一个字符串形式的链接地址，通过 <code>pathname</code>、<code>search</code> 和 <code>hash</code> 属性创建。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Link to='/courses?sort=name' />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">Link</span> <span class="hljs-keyword">to</span>=<span class="hljs-string">'/courses?sort=name'</span> /&gt;</code></pre>
<h4>to: object</h4>
<p>一个对象形式的链接地址，可以具有以下任何属性：</p>
<ul>
<li>
<code>pathname</code> - 要链接到的路径</li>
<li>
<code>search</code> - 查询参数</li>
<li>
<code>hash</code> - URL 中的 hash，例如 #the-hash</li>
<li>
<code>state</code> - 存储到 location 中的额外状态数据</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Link to="{{"
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: {
    fromDashboard: true
  }
"}}" />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">&lt;Link</span> <span class="hljs-string">to="{{"</span>
<span class="hljs-attr">  pathname:</span> <span class="hljs-string">'/courses'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  search:</span> <span class="hljs-string">'?sort=name'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  hash:</span> <span class="hljs-string">'#the-hash'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  state:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    fromDashboard:</span> <span class="hljs-literal">true</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">"}}"</span> <span class="hljs-string">/&gt;</span></code></pre>
<h4>replace: bool</h4>
<p>当设置为 <code>true</code> 时，点击链接后将替换历史堆栈中的当前条目，而不是添加新条目。默认为 <code>false</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Link to=&quot;/courses&quot; replace />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">Link</span> <span class="hljs-keyword">to</span>=<span class="hljs-string">"/courses"</span> replace /&gt;</code></pre>
<h4>innerRef: func</h4>
<p>允许访问组件的底层引用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const refCallback = node => {
  // node 指向最终挂载的 DOM 元素，在卸载时为 null
}

<Link to=&quot;/&quot; innerRef={refCallback} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> refCallback = <span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
  <span class="hljs-comment">// node 指向最终挂载的 DOM 元素，在卸载时为 null</span>
}

&lt;Link to=<span class="hljs-string">"/"</span> innerRef={refCallback} /&gt;</code></pre>
<h4>others</h4>
<p>你还可以传递一些其它属性，例如 <code>title</code>、<code>id</code> 或 <code>className</code> 等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Link to=&quot;/&quot; className=&quot;nav&quot; title=&quot;a title&quot;>About</Link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">Link</span> <span class="hljs-keyword">to</span>=<span class="hljs-string">"/"</span> className=<span class="hljs-string">"nav"</span> title=<span class="hljs-string">"a title"</span>&gt;About&lt;/<span class="hljs-keyword">Link</span>&gt;</code></pre>
<h2 id="articleHeader3">&lt;NavLink&gt;</h2>
<p>一个特殊版本的 <code>&lt;Link&gt;</code>，它会在与当前 URL 匹配时为其呈现元素添加样式属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { NavLink } from 'react-router-dom';

<NavLink to=&quot;/about&quot;>About</NavLink>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { NavLink } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">NavLink</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/about"</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">NavLink</span>&gt;</span></span></code></pre>
<h4>activeClassName: string</h4>
<p>当元素处于激活状态时应用的类，默认为 <code>active</code>。它将与 <code>className</code> 属性一起使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<NavLink to=&quot;/faq&quot; activeClassName=&quot;selected&quot;>FAQs</NavLink>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">NavLink</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/faq"</span> <span class="hljs-attr">activeClassName</span>=<span class="hljs-string">"selected"</span>&gt;</span>FAQs<span class="hljs-tag">&lt;/<span class="hljs-name">NavLink</span>&gt;</span></code></pre>
<h4>activeStyle: object</h4>
<p>当元素处于激活状态时应用的样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const activeStyle = {
  fontWeight: 'bold',
  color: 'red'
};

<NavLink to=&quot;/faq&quot; activeStyle={activeStyle}>FAQs</NavLink>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> activeStyle = {
  <span class="hljs-attr">fontWeight</span>: <span class="hljs-string">'bold'</span>,
  <span class="hljs-attr">color</span>: <span class="hljs-string">'red'</span>
};

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">NavLink</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/faq"</span> <span class="hljs-attr">activeStyle</span>=<span class="hljs-string">{activeStyle}</span>&gt;</span>FAQs<span class="hljs-tag">&lt;/<span class="hljs-name">NavLink</span>&gt;</span></span></code></pre>
<h4>exact: bool</h4>
<p>如果为 <code>true</code>，则只有在位置完全匹配时才应用激活类/样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<NavLink exact to=&quot;/profile&quot;>Profile</NavLink>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">NavLink</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/profile"</span>&gt;</span>Profile<span class="hljs-tag">&lt;/<span class="hljs-name">NavLink</span>&gt;</span></code></pre>
<h4>strict: bool</h4>
<p>如果为 <code>true</code>，则在确定位置是否与当前 URL 匹配时，将考虑位置的路径名后面的斜杠。有关更多信息，请参阅 <a href="https://reacttraining.com/react-router/web/api/Route/strict-bool" rel="nofollow noreferrer" target="_blank">&lt;Route strict&gt;</a> 文档。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<NavLink strict to=&quot;/events/&quot;>Events</NavLink>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">NavLink</span> <span class="hljs-attr">strict</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/events/"</span>&gt;</span>Events<span class="hljs-tag">&lt;/<span class="hljs-name">NavLink</span>&gt;</span></code></pre>
<h4>isActive: func</h4>
<p>添加额外逻辑以确定链接是否处于激活状态的函数。如果你要做的不仅仅是验证链接的路径名与当前 URL 的路径名相匹配，那么应该使用它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 只有当事件 id 为奇数时才考虑激活
const oddEvent = (match, location) => {
  if (!match) {
    return false;
  }
  const eventID = parseInt(match.params.eventID);
  return !isNaN(eventID) &amp;&amp; eventID % 2 === 1;
}

<NavLink to=&quot;/events/123&quot; isActive={oddEvent}>Event 123</NavLink>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 只有当事件 id 为奇数时才考虑激活</span>
<span class="hljs-keyword">const</span> oddEvent = <span class="hljs-function">(<span class="hljs-params">match, location</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (!match) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
  <span class="hljs-keyword">const</span> eventID = <span class="hljs-built_in">parseInt</span>(match.params.eventID);
  <span class="hljs-keyword">return</span> !<span class="hljs-built_in">isNaN</span>(eventID) &amp;&amp; eventID % <span class="hljs-number">2</span> === <span class="hljs-number">1</span>;
}

&lt;NavLink to=<span class="hljs-string">"/events/123"</span> isActive={oddEvent}&gt;Event <span class="hljs-number">123</span>&lt;<span class="hljs-regexp">/NavLink&gt;</span></code></pre>
<h4>location: object</h4>
<p><code>isActive</code> 默认比较当前历史位置（通常是当前的浏览器 URL）。你也可以传递一个不同的位置进行比较。</p>
<h2 id="articleHeader4">&lt;Prompt&gt;</h2>
<p>用于在位置跳转之前给予用户一些确认信息。当你的应用程序进入一个应该阻止用户导航的状态时（比如表单只填写了一半），弹出一个提示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Prompt } from 'react-router-dom';

<Prompt
  when={formIsHalfFilledOut}
  message=&quot;你确定要离开当前页面吗？&quot;
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { Prompt } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Prompt</span>
  <span class="hljs-attr">when</span>=<span class="hljs-string">{formIsHalfFilledOut}</span>
  <span class="hljs-attr">message</span>=<span class="hljs-string">"你确定要离开当前页面吗？"</span>
/&gt;</span></span></code></pre>
<h4>message: string</h4>
<p>当用户试图离开某个位置时弹出的提示信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Prompt message=&quot;你确定要离开当前页面吗？&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">Prompt</span> <span class="hljs-attr">message</span>=<span class="hljs-string">"你确定要离开当前页面吗？"</span> /&gt;</span></code></pre>
<h4>message: func</h4>
<p>将在用户试图导航到下一个位置时调用。需要返回一个字符串以向用户显示提示，或者返回 <code>true</code> 以允许直接跳转。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Prompt message={location => {
  const isApp = location.pathname.startsWith('/app');

  return isApp ? `你确定要跳转到${location.pathname}吗？` : true;
"}}" />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>&lt;Prompt message={<span class="hljs-function"><span class="hljs-params">location</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> isApp = location.pathname.startsWith(<span class="hljs-string">'/app'</span>);

  <span class="hljs-keyword">return</span> isApp ? <span class="hljs-string">`你确定要跳转到<span class="hljs-subst">${location.pathname}</span>吗？`</span> : <span class="hljs-literal">true</span>;
"}}" /&gt;</code></pre>
<blockquote>译注：上例中的 <code>location</code> 对象指的是下一个位置（即用户想要跳转到的位置）。你可以基于它包含的一些信息，判断是否阻止导航，或者允许直接跳转。</blockquote>
<h4>when: bool</h4>
<p>在应用程序中，你可以始终渲染 <code>&lt;Prompt&gt;</code> 组件，并通过设置 <code>when={true}</code> 或 <code>when={false}</code> 以阻止或允许相应的导航，而不是根据某些条件来决定是否渲染 <code>&lt;Prompt&gt;</code> 组件。</p>
<blockquote>译注：<code>when</code> 只有两种情况，当它的值为 <code>true</code> 时，会弹出提示信息。如果为 <code>false</code> 则不会弹出。见<a href="https://reacttraining.com/react-router/web/example/preventing-transitions" rel="nofollow noreferrer" target="_blank">阻止导航</a>示例。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Prompt when={true} message=&quot;你确定要离开当前页面吗？&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">&lt;Prompt <span class="hljs-keyword">when</span>={<span class="hljs-literal">true</span>} message=<span class="hljs-string">"你确定要离开当前页面吗？"</span> /&gt;</code></pre>
<h2 id="articleHeader5">&lt;MemoryRouter&gt;</h2>
<p>将 URL 的历史记录保存在内存中的 <code>&lt;Router&gt;</code>（不读取或写入地址栏）。在测试和非浏览器环境中很有用，例如 <a href="https://facebook.github.io/react-native/" rel="nofollow noreferrer" target="_blank">React Native</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <App />
</MemoryRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { MemoryRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MemoryRouter</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">MemoryRouter</span>&gt;</span></span></code></pre>
<h4>initialEntries: array</h4>
<p>历史堆栈中的一系列位置信息。这些可能是带有 <code>{pathname, search, hash, state}</code> 的完整位置对象或简单的字符串 URL。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<MemoryRouter
  initialEntries={[ '/one', '/two', { pathname: '/three' } ]}
  initialIndex={1}
>
  <App/>
</MemoryRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>&lt;MemoryRouter
  initialEntries={[ <span class="hljs-string">'/one'</span>, <span class="hljs-string">'/two'</span>, { pathname: <span class="hljs-string">'/three'</span> } ]}
  initialIndex={<span class="hljs-number">1</span>}
&gt;
  &lt;App/&gt;
&lt;/MemoryRouter&gt;</code></pre>
<h4>initialIndex: number</h4>
<p><code>initialEntries</code> 数组中的初始位置索引。</p>
<h4>getUserConfirmation: func</h4>
<p>用于确认导航的函数。当 <code>&lt;MemoryRouter&gt;</code> 直接与 <code>&lt;Prompt&gt;</code> 一起使用时，你必须使用此选项。</p>
<h4>keyLength: number</h4>
<p><code>location.key</code> 的长度，默认为 <code>6</code>。</p>
<h4>children: node</h4>
<p>要呈现的<a href="https://reactjs.org/docs/react-api.html#react.children.only" rel="nofollow noreferrer" target="_blank">单个子元素（组件）</a>。</p>
<h2 id="articleHeader6">&lt;Redirect&gt;</h2>
<p>使用 <code>&lt;Redirect&gt;</code> 会导航到一个新的位置。新的位置将覆盖历史堆栈中的当前条目，例如服务器端重定向（HTTP 3xx）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Route, Redirect } from 'react-router-dom';

<Route exact path=&quot;/&quot; render={() => (
  loggedIn ? (
    <Redirect to=&quot;/dashboard&quot; />
  ) : (
    <PublicHomePage />
  )
)} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { Route, Redirect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;

&lt;Route exact path=<span class="hljs-string">"/"</span> render={<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  loggedIn ? (
    &lt;Redirect to=<span class="hljs-string">"/dashboard"</span> /&gt;
  ) : (
    &lt;PublicHomePage /&gt;
  )
)} /&gt;</code></pre>
<h4>to: string</h4>
<p>要重定向到的 URL，可以是 <a href="https://www.npmjs.com/package/path-to-regexp" rel="nofollow noreferrer" target="_blank">path-to-regexp</a> 能够理解的任何有效的 URL 路径。所有要使用的 URL 参数必须由 <code>from</code> 提供。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Redirect to=&quot;/somewhere/else&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;Redirect <span class="hljs-keyword">to</span>=<span class="hljs-string">"/somewhere/else"</span> /&gt;</code></pre>
<h4>to: object</h4>
<p>要重定向到的位置，其中 <code>pathname</code> 可以是 <a href="https://www.npmjs.com/package/path-to-regexp" rel="nofollow noreferrer" target="_blank">path-to-regexp</a> 能够理解的任何有效的 URL 路径。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Redirect to="{{"
  pathname: '/login',
  search: '?utm=your+face',
  state: {
    referrer: currentLocation
  }
"}}" />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>&lt;Redirect <span class="hljs-keyword">to</span>="{{"
  pathname: <span class="hljs-string">'/login'</span>,
  search: <span class="hljs-string">'?utm=your+face'</span>,
  state: {
    referrer: currentLocation
  }
"}}" /&gt;</code></pre>
<p>上例中的 <code>state</code> 对象可以在重定向到的组件中通过 <code>this.props.location.state</code> 进行访问。而 <code>referrer</code> 键（不是特殊名称）将通过路径名 <code>/login</code> 指向的登录组件中的 <code>this.props.location.state.referrer</code> 进行访问。</p>
<h4>push: bool</h4>
<p>如果为 <code>true</code>，重定向会将新的位置推入历史记录，而不是替换当前条目。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Redirect push to=&quot;/somewhere/else&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;Redirect push <span class="hljs-keyword">to</span>=<span class="hljs-string">"/somewhere/else"</span> /&gt;</code></pre>
<h4>from: string</h4>
<p>要从中进行重定向的路径名，可以是 <a href="https://www.npmjs.com/package/path-to-regexp" rel="nofollow noreferrer" target="_blank">path-to-regexp</a> 能够理解的任何有效的 URL 路径。所有匹配的 URL 参数都会提供给 <code>to</code>，必须包含在 <code>to</code> 中用到的所有参数，<code>to</code> 未使用的其它参数将被忽略。</p>
<p>只能在 <code>&lt;Switch&gt;</code> 组件内使用 <code>&lt;Redirect from&gt;</code>，以匹配一个位置。有关更多细节，请参阅 <a href="https://reacttraining.com/react-router/web/api/Switch/children-node" rel="nofollow noreferrer" target="_blank">&lt;Switch children&gt;</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Switch>
  <Redirect from='/old-path' to='/new-path' />
  <Route path='/new-path' component={Place} />
</Switch>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Redirect</span> <span class="hljs-attr">from</span>=<span class="hljs-string">'/old-path'</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/new-path'</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/new-path'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Place}</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 根据匹配参数进行重定向
<Switch>
  <Redirect from='/users/:id' to='/users/profile/:id' />
  <Route path='/users/profile/:id' component={Profile} />
</Switch>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// 根据匹配参数进行重定向
<span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Redirect</span> <span class="hljs-attr">from</span>=<span class="hljs-string">'/users/:id'</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/users/profile/:id'</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/users/profile/:id'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Profile}</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span></code></pre>
<blockquote>译注：经过实践，发现以上“根据匹配参数进行重定向”的示例存在bug，没有效果。<code>to</code> 中的 <code>:id</code> 并不会继承 <code>from</code> 中的 <code>:id</code> 匹配的值，而是直接作为字符串显示到浏览器地址栏！！！</blockquote>
<h4>exact: bool</h4>
<p>完全匹配，相当于 <a href="https://reacttraining.com/react-router/web/api/Route/exact-bool" rel="nofollow noreferrer" target="_blank">Route.exact</a>。</p>
<h4>strict: bool</h4>
<p>严格匹配，相当于 <a href="https://reacttraining.com/react-router/web/api/Route/strict-bool" rel="nofollow noreferrer" target="_blank">Route.strict</a>。</p>
<h2 id="articleHeader7">&lt;Route&gt;</h2>
<p><code>&lt;Route&gt;</code> 可能是 React Router 中最重要的组件，它可以帮助你理解和学习如何更好的使用 React Router。它最基本的职责是在其 <code>path</code> 属性与某个 <a href="https://reacttraining.com/react-router/web/api/location" rel="nofollow noreferrer" target="_blank">location</a> 匹配时呈现一些 UI。</p>
<p>请考虑以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { BrowserRouter as Router, Route } from 'react-router-dom';

<Router>
  <div>
    <Route exact path=&quot;/&quot; component={Home} />
    <Route path=&quot;/news&quot; component={News} />
  </div>
</Router>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">import </span><span class="hljs-template-variable">{ BrowserRouter as Router, Route }</span><span class="xml"> from 'react-router-dom';

<span class="hljs-tag">&lt;<span class="hljs-name">Router</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Home}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/news"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{News}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span></span></code></pre>
<p>如果应用程序的位置是 <code>/</code>，那么 UI 的层次结构将会是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <Home />
  <!-- react-empty: 2 -->
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Home</span> /&gt;</span>
  <span class="hljs-comment">&lt;!-- react-empty: 2 --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>或者，如果应用程序的位置是 <code>/news</code>，那么 UI 的层次结构将会是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <!-- react-empty: 1 -->
  <News />
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- react-empty: 1 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">News</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>其中 <code>react-empty</code> 注释只是 React 空渲染的实现细节。但对于我们的目的而言，它是有启发性的。路由始终在技术上被“渲染”，即使它的渲染为空。只要应用程序的位置匹配 <code>&lt;Route&gt;</code> 的 <code>path</code>，你的组件就会被渲染。</p>
<h4>Route render methods</h4>
<p>使用 <code>&lt;Route&gt;</code> 渲染一些内容有以下三种方式：</p>
<ul>
<li><a href="https://reacttraining.com/react-router/web/api/Route/component" rel="nofollow noreferrer" target="_blank">&lt;Route component&gt;</a></li>
<li><a href="https://reacttraining.com/react-router/web/api/Route/render-func" rel="nofollow noreferrer" target="_blank">&lt;Route render&gt;</a></li>
<li><a href="https://reacttraining.com/react-router/web/api/Route/children-func" rel="nofollow noreferrer" target="_blank">&lt;Route children&gt;</a></li>
</ul>
<p>在不同的情况下使用不同的方式。在指定的 <code>&lt;Route&gt;</code> 中，你应该只使用其中的一种。请参阅下面的解释，了解为什么有三个选项。大多数情况下你会使用 <code>component</code>。</p>
<h4>Route props</h4>
<p>三种渲染方式都将提供相同的三个路由属性：</p>
<ul>
<li><a href="https://reacttraining.com/react-router/web/api/match" rel="nofollow noreferrer" target="_blank">match</a></li>
<li><a href="https://reacttraining.com/react-router/web/api/location" rel="nofollow noreferrer" target="_blank">location</a></li>
<li><a href="https://reacttraining.com/react-router/web/api/history" rel="nofollow noreferrer" target="_blank">history</a></li>
</ul>
<h4>component</h4>
<p>指定只有当位置匹配时才会渲染的 React 组件，该组件会接收 <a href="http://reacttraining.cn/web/api/Route/Route-props" rel="nofollow noreferrer" target="_blank">route props</a> 作为属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const User = ({ match }) => {
  return <h1>Hello {match.params.username}!</h1>
}

<Route path=&quot;/user/:username&quot; component={User} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> User = <span class="hljs-function">(<span class="hljs-params">{ match }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello {match.params.username}!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
}

&lt;Route path=<span class="hljs-string">"/user/:username"</span> component={User} /&gt;</code></pre>
<p>当你使用 <code>component</code>（而不是 <code>render</code> 或 <code>children</code>）时，Router 将根据指定的组件，使用 <code>React.createElement</code> 创建一个新的 React 元素。这意味着，如果你向 <code>component</code> 提供一个内联函数，那么每次渲染都会创建一个新组件。这将导致现有组件的卸载和新组件的安装，而不是仅仅更新现有组件。当使用内联函数进行内联渲染时，请使用 <code>render</code> 或 <code>children</code>（见下文）。</p>
<h4>render: func</h4>
<p>使用 <code>render</code> 可以方便地进行内联渲染和包装，而无需进行上文解释的不必要的组件重装。</p>
<p>你可以传入一个函数，以在位置匹配时调用，而不是使用 <code>component</code> 创建一个新的 React 元素。<code>render</code> 渲染方式接收所有与 <code>component</code> 方式相同的 <a href="https://reacttraining.com/react-router/web/api/Route/route-props" rel="nofollow noreferrer" target="_blank">route props</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方便的内联渲染
<Route path=&quot;/home&quot; render={() => <div>Home</div>} />

// 包装
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <FadeIn>
      <Component {...props} />
    </FadeIn>
  )} />
)

<FadingRoute path=&quot;/cool&quot; component={Something} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// 方便的内联渲染
<span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/home"</span> <span class="hljs-attr">render</span>=<span class="hljs-string">{()</span> =&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>} /&gt;

// 包装
const FadingRoute = ({ component: Component, ...rest }) =&gt; (
  <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> {<span class="hljs-attr">...rest</span>} <span class="hljs-attr">render</span>=<span class="hljs-string">{props</span> =&gt;</span> (
    <span class="hljs-tag">&lt;<span class="hljs-name">FadeIn</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Component</span> {<span class="hljs-attr">...props</span>} /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">FadeIn</span>&gt;</span>
  )} /&gt;
)

<span class="hljs-tag">&lt;<span class="hljs-name">FadingRoute</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/cool"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Something}</span> /&gt;</span></code></pre>
<blockquote>警告：<code>&lt;Route component&gt;</code> 优先于 <code>&lt;Route render&gt;</code>，因此不要在同一个 <code>&lt;Route&gt;</code> 中同时使用两者。</blockquote>
<h4>children: func</h4>
<p>有时候不论 <code>path</code> 是否匹配位置，你都想渲染一些内容。在这种情况下，你可以使用 <code>children</code> 属性。除了不论是否匹配它都会被调用以外，它的工作原理与 <code>render</code> 完全一样。</p>
<p><code>children</code> 渲染方式接收所有与 <code>component</code> 和 <code>render</code> 方式相同的 <a href="https://reacttraining.com/react-router/web/api/Route/route-props" rel="nofollow noreferrer" target="_blank">route props</a>，除非路由与 URL 不匹配，不匹配时 <code>match</code> 为 <code>null</code>。这允许你可以根据路由是否匹配动态地调整用户界面。如下所示，如果路由匹配，我们将添加一个激活类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest} />
    </li>
  )} />
)

<ul>
  <ListItemLink to=&quot;/somewhere&quot; />
  <ListItemLink to=&quot;/somewhere-else&quot; />
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">const ListItemLink = (</span><span class="hljs-template-variable">{ to, ...rest }</span><span class="xml">) =&gt; (
  <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=</span></span><span class="hljs-template-variable">{to}</span><span class="xml"><span class="hljs-tag"> <span class="hljs-attr">children</span>=</span></span><span class="hljs-template-variable">{({ match }</span><span class="xml"><span class="hljs-tag">) =&gt;</span> (
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">className</span>=</span></span><span class="hljs-template-variable">{match ? 'active' : ''}</span><span class="xml"><span class="hljs-tag">&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=</span></span><span class="hljs-template-variable">{to}</span><span class="xml"><span class="hljs-tag"> </span></span><span class="hljs-template-variable">{...rest}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  )} /&gt;
)

<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ListItemLink</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/somewhere"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ListItemLink</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/somewhere-else"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span></code></pre>
<p>这对动画也很有用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route children={({ match, ...rest }) => (
  {/* Animate 将始终渲染，因此你可以利用生命周期来为其子元素添加进出动画 */}
  <Animate>
    {match &amp;&amp; <Something {...rest} />}
  </Animate>
)} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">children</span>=</span></span><span class="hljs-template-variable">{({ match, ...rest }</span><span class="xml"><span class="hljs-tag">) =&gt;</span> (
  </span><span class="hljs-template-tag">{/* <span class="hljs-name">Animate</span> 将始终渲染，因此你可以利用生命周期来为其子元素添加进出动画 */}</span><span class="xml">
  <span class="hljs-tag">&lt;<span class="hljs-name">Animate</span>&gt;</span>
    </span><span class="hljs-template-variable">{match &amp;&amp; &lt;Something {...rest}</span><span class="xml"> /&gt;}
  <span class="hljs-tag">&lt;/<span class="hljs-name">Animate</span>&gt;</span>
)} /&gt;</span></code></pre>
<blockquote>警告：<code>&lt;Route component&gt;</code> 和 <code>&lt;Route render&gt;</code> 优先于 <code>&lt;Route children&gt;</code>，因此不要在同一个 <code>&lt;Route&gt;</code> 中同时使用多个。</blockquote>
<h4>path: string</h4>
<p>可以是 <a href="https://www.npmjs.com/package/path-to-regexp" rel="nofollow noreferrer" target="_blank">path-to-regexp</a> 能够理解的任何有效的 URL 路径。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path=&quot;/users/:id&quot; component={User} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/users/:id"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{User}</span> /&gt;</span></code></pre>
<p>没有定义 <code>path</code> 的 <code>&lt;Route&gt;</code> 总是会被匹配。</p>
<h4>exact: bool</h4>
<p>如果为 <code>true</code>，则只有在 <code>path</code> 完全匹配 <code>location.pathname</code> 时才匹配。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route exact path=&quot;/one&quot; component={OneComponent} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/one"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{OneComponent}</span> /&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV8fyF?w=237&amp;h=69" src="https://static.alili.tech/img/bV8fyF?w=237&amp;h=69" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>strict: bool</h4>
<p>如果为 <code>true</code>，则具有尾部斜杠的 <code>path</code> 仅与具有尾部斜杠的 <code>location.pathname</code> 匹配。当 <code>location.pathname</code> 中有附加的 URL 片段时，<code>strict</code> 就没有效果了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route strict path=&quot;/one/&quot; component={OneComponent} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">strict</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/one/"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{OneComponent}</span> /&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV8fz8?w=206&amp;h=97" src="https://static.alili.tech/img/bV8fz8?w=206&amp;h=97" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote>警告：可以使用 <code>strict</code> 来强制规定 <code>location.pathname</code> 不能具有尾部斜杠，但是为了做到这一点，<code>strict</code> 和 <code>exact</code> 必须都是 <code>true</code>。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV8fAP?w=202&amp;h=95" src="https://static.alili.tech/img/bV8fAP?w=202&amp;h=95" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>location: object</h4>
<p>一般情况下，<code>&lt;Route&gt;</code> 尝试将其 <code>path</code> 与当前历史位置（通常是当前的浏览器 URL）进行匹配。但是，也可以传递具有不同路径名的位置进行匹配。</p>
<p>当你需要将 <code>&lt;Route&gt;</code> 与当前历史位置以外的 <code>location</code> 进行匹配时，此功能非常有用。如<a href="https://reacttraining.com/react-router/web/example/animated-transitions" rel="nofollow noreferrer" target="_blank">过渡动画</a>示例中所示。</p>
<p>如果一个 <code>&lt;Route&gt;</code> 被包含在一个 <code>&lt;Switch&gt;</code> 中，并且需要匹配的位置（或当前历史位置）传递给了 <code>&lt;Switch&gt;</code>，那么传递给 <code>&lt;Route&gt;</code> 的 <code>location</code> 将被 <code>&lt;Switch&gt;</code> 所使用的 <code>location</code> 覆盖。</p>
<h4>sensitive: bool</h4>
<p>如果为 <code>true</code>，进行匹配时将区分大小写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route sensitive path=&quot;/one&quot; component={OneComponent} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">sensitive</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/one"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{OneComponent}</span> /&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV8f5g?w=255&amp;h=98" src="https://static.alili.tech/img/bV8f5g?w=255&amp;h=98" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">&lt;Router&gt;</h2>
<p>所有 Router 组件的通用低阶接口。通常情况下，应用程序只会使用其中一个高阶 Router：</p>
<ul>
<li><a href="https://reacttraining.com/react-router/web/api/BrowserRouter" rel="nofollow noreferrer" target="_blank">&lt;BrowserRouter&gt;</a></li>
<li><a href="https://reacttraining.com/react-router/web/api/HashRouter" rel="nofollow noreferrer" target="_blank">&lt;HashRouter&gt;</a></li>
<li><a href="https://reacttraining.com/react-router/web/api/MemoryRouter" rel="nofollow noreferrer" target="_blank">&lt;MemoryRouter&gt;</a></li>
<li><a href="https://reacttraining.com/react-router/native/api/NativeRouter" rel="nofollow noreferrer" target="_blank">&lt;NativeRouter&gt;</a></li>
<li><a href="https://reacttraining.com/react-router/web/api/StaticRouter" rel="nofollow noreferrer" target="_blank">&lt;StaticRouter&gt;</a></li>
</ul>
<p>使用低阶 &lt;Router&gt; 的最常见用例是同步一个自定义历史记录与一个状态管理库，比如 Redux 或 Mobx。请注意，将 React Router 和状态管理库一起使用并不是必需的，它仅用于深度集成。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

<Router history={history}>
  <App />
</Router>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { Router } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;
<span class="hljs-keyword">import</span> createBrowserHistory <span class="hljs-keyword">from</span> <span class="hljs-string">'history/createBrowserHistory'</span>;

<span class="hljs-keyword">const</span> history = createBrowserHistory();

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{history}</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span></span></code></pre>
<h4>history: object</h4>
<p>用于导航的历史记录对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import createBrowserHistory from 'history/createBrowserHistory';

const customHistory = createBrowserHistory();

<Router history={customHistory} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> createBrowserHistory <span class="hljs-keyword">from</span> <span class="hljs-string">'history/createBrowserHistory'</span>;

<span class="hljs-keyword">const</span> customHistory = createBrowserHistory();

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{customHistory}</span> /&gt;</span></span></code></pre>
<h4>children: node</h4>
<p>要呈现的<a href="https://reactjs.org/docs/react-api.html#react.children.only" rel="nofollow noreferrer" target="_blank">单个子元素（组件）</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Router>
  <App />
</Router>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;Router&gt;</span>
  <span class="hljs-section">&lt;App /&gt;</span>
<span class="hljs-section">&lt;/Router&gt;</span></code></pre>
<h2 id="articleHeader9">&lt;StaticRouter&gt;</h2>
<p>一个永远不会改变位置的 <code>&lt;Router&gt;</code>。</p>
<p>这在服务器端渲染场景中非常有用，因为用户实际上没有点击，所以位置实际上并未发生变化。因此，名称是 <code>static</code>（静态的）。当你只需要插入一个位置，并在渲染输出上作出断言以便进行简单测试时，它也很有用。</p>
<p>以下是一个示例，node server 为 <code>&lt;Redirect&gt;</code> 发送 302 状态码，并为其它请求发送常规 HTML：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createServer } from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

createServer((req, res) => {
  // 这个 context 对象包含了渲染的结果
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  // 如果使用 <Redirect>，context.url 将包含要重定向到的 URL
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });
    res.end();
  } else {
    res.write(html);
    res.end();
  }
}).listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { createServer } <span class="hljs-keyword">from</span> <span class="hljs-string">'http'</span>;
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOMServer <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom/server'</span>;
<span class="hljs-keyword">import</span> { StaticRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;

createServer(<span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  <span class="hljs-comment">// 这个 context 对象包含了渲染的结果</span>
  <span class="hljs-keyword">const</span> context = {};

  <span class="hljs-keyword">const</span> html = ReactDOMServer.renderToString(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">StaticRouter</span> <span class="hljs-attr">location</span>=<span class="hljs-string">{req.url}</span> <span class="hljs-attr">context</span>=<span class="hljs-string">{context}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">StaticRouter</span>&gt;</span></span>
  );

  <span class="hljs-comment">// 如果使用 &lt;Redirect&gt;，context.url 将包含要重定向到的 URL</span>
  <span class="hljs-keyword">if</span> (context.url) {
    res.writeHead(<span class="hljs-number">302</span>, {
      <span class="hljs-attr">Location</span>: context.url
    });
    res.end();
  } <span class="hljs-keyword">else</span> {
    res.write(html);
    res.end();
  }
}).listen(<span class="hljs-number">3000</span>);</code></pre>
<h4>basename: string</h4>
<p>所有位置的基准 URL。<code>basename</code> 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<StaticRouter basename=&quot;/calendar&quot;>
  <Link to=&quot;/today&quot; />
</StaticRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">StaticRouter</span> <span class="hljs-attr">basename</span>=<span class="hljs-string">"/calendar"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/today"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">StaticRouter</span>&gt;</span></code></pre>
<p>上例中的 <code>&lt;Link&gt;</code> 最终将被呈现为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;/calendar/today&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"/calendar/today"</span> /&gt;</code></pre>
<h4>location: string</h4>
<p>服务器收到的 URL，可能是 node server 上的 <code>req.url</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<StaticRouter location={req.url}>
  <App />
</StaticRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">StaticRouter</span> <span class="hljs-attr">location</span>=<span class="hljs-string">{req.url}</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">StaticRouter</span>&gt;</span></code></pre>
<h4>location: object</h4>
<p>一个形如 <code>{pathname, search, hash, state}</code> 的位置对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<StaticRouter location="{{" pathname: '/bubblegum' "}}">
  <App />
</StaticRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">StaticRouter</span> <span class="hljs-attr">location</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">pathname:</span> '/<span class="hljs-attr">bubblegum</span>' "}}"&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">StaticRouter</span>&gt;</span></code></pre>
<h4>context: object</h4>
<p>一个普通的 JavaScript 对象。在渲染过程中，组件可以向对象添加属性以存储有关渲染的信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const context = {};

<StaticRouter context={context}>
  <App />
</StaticRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> context = {};

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">StaticRouter</span> <span class="hljs-attr">context</span>=<span class="hljs-string">{context}</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">StaticRouter</span>&gt;</span></span></code></pre>
<p>当一个 <code>&lt;Route&gt;</code> 匹配时，它将把 context 对象传递给呈现为 <code>staticContext</code> 的组件。查看<a href="https://reacttraining.com/web/guides/server-rendering" rel="nofollow noreferrer" target="_blank">服务器渲染指南</a>以获取有关如何自行完成此操作的更多信息。</p>
<p>渲染之后，可以使用这些属性来配置服务器的响应。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (context.status === '404') {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">if</span> (context.status === <span class="hljs-string">'404'</span>) {
  <span class="hljs-comment">// ...</span>
}</code></pre>
<h4>children: node</h4>
<p>要呈现的<a href="https://reactjs.org/docs/react-api.html#react.children.only" rel="nofollow noreferrer" target="_blank">单个子元素（组件）</a>。</p>
<h2 id="articleHeader10">&lt;Switch&gt;</h2>
<p>用于渲染与路径匹配的第一个子 <code>&lt;Route&gt;</code> 或 <code>&lt;Redirect&gt;</code>。</p>
<p>这与仅仅使用一系列 <code>&lt;Route&gt;</code> 有何不同？</p>
<p><code>&lt;Switch&gt;</code> 只会渲染一个路由。相反，仅仅定义一系列 <code>&lt;Route&gt;</code> 时，每一个与路径匹配的 <code>&lt;Route&gt;</code> 都将包含在渲染范围内。考虑如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path=&quot;/about&quot; component={About} />
<Route path=&quot;/:user&quot; component={User} />
<Route component={NoMatch} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/about"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{About}</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/:user"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{User}</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{NoMatch}</span> /&gt;</span></code></pre>
<p>如果 URL 是 <code>/about</code>，那么 <code>&lt;About&gt;</code>、<code>&lt;User&gt;</code> 和 <code>&lt;NoMatch&gt;</code> 将全部渲染，因为它们都与路径匹配。这是通过设计，允许我们以很多方式将 <code>&lt;Route&gt;</code> 组合成我们的应用程序，例如侧边栏和面包屑、引导标签等。</p>
<p>但是，有时候我们只想选择一个 <code>&lt;Route&gt;</code> 来呈现。比如我们在 URL 为 <code>/about</code> 时不想匹配 <code>/:user</code>（或者显示我们的 404 页面），这该怎么实现呢？以下就是如何使用 <code>&lt;Switch&gt;</code> 做到这一点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Switch, Route } from 'react-router';

<Switch>
  <Route exact path=&quot;/&quot; component={Home} />
  <Route path=&quot;/about&quot; component={About} />
  <Route path=&quot;/:user&quot; component={User} />
  <Route component={NoMatch} />
</Switch>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">import </span><span class="hljs-template-variable">{ Switch, Route }</span><span class="xml"> from 'react-router';

<span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Home}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/about"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{About}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/:user"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{User}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{NoMatch}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span></span></code></pre>
<p>现在，当我们在 <code>/about</code> 路径时，<code>&lt;Switch&gt;</code> 将开始寻找匹配的 <code>&lt;Route&gt;</code>。我们知道，<code>&lt;Route path="/about" /&gt;</code> 将会被正确匹配，这时 <code>&lt;Switch&gt;</code> 会停止查找匹配项并立即呈现 <code>&lt;About&gt;</code>。同样，如果我们在 <code>/michael</code> 路径时，那么 <code>&lt;User&gt;</code> 会呈现。</p>
<p>这对于动画转换也很有用，因为匹配的 <code>&lt;Route&gt;</code> 与前一个渲染位置相同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Fade>
  <Switch>
    {/* 这里只会渲染一个子元素 */}
    <Route />
    <Route />
  </Switch>
</Fade>

<Fade>
  <Route />
  <Route />
  {/* 这里总是会渲染两个子元素，也有可能是空渲染，这使得转换更加麻烦 */}
</Fade>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-params">&lt;Fade&gt;</span>
  <span class="hljs-params">&lt;Switch&gt;</span>
    {<span class="hljs-comment">/* 这里只会渲染一个子元素 */</span>}
    <span class="hljs-params">&lt;Route /&gt;</span>
    <span class="hljs-params">&lt;Route /&gt;</span>
  <span class="hljs-params">&lt;/Switch&gt;</span>
<span class="hljs-params">&lt;/Fade&gt;</span>

<span class="hljs-params">&lt;Fade&gt;</span>
  <span class="hljs-params">&lt;Route /&gt;</span>
  <span class="hljs-params">&lt;Route /&gt;</span>
  {<span class="hljs-comment">/* 这里总是会渲染两个子元素，也有可能是空渲染，这使得转换更加麻烦 */</span>}
<span class="hljs-params">&lt;/Fade&gt;</span></code></pre>
<h4>location: object</h4>
<p>用于匹配子元素而不是当前历史位置（通常是当前的浏览器 URL）的 <a href="https://reacttraining.com/react-router/web/api/location" rel="nofollow noreferrer" target="_blank">location</a> 对象。</p>
<h4>children: node</h4>
<p>所有 <code>&lt;Switch&gt;</code> 的子元素都应该是 <code>&lt;Route&gt;</code> 或 <code>&lt;Redirect&gt;</code>。只有第一个匹配当前路径的子元素将被呈现。</p>
<p><code>&lt;Route&gt;</code> 组件使用 <code>path</code> 属性进行匹配，而 <code>&lt;Redirect&gt;</code> 组件使用它们的 <code>from</code> 属性进行匹配。没有 <code>path</code> 属性的 <code>&lt;Route&gt;</code> 或者没有 <code>from</code> 属性的 <code>&lt;Redirect&gt;</code> 将始终与当前路径匹配。</p>
<p>当在 <code>&lt;Switch&gt;</code> 中包含 <code>&lt;Redirect&gt;</code> 时，你可以使用任何 <code>&lt;Route&gt;</code> 拥有的路径匹配属性：<code>path</code>、<code>exact</code> 和 <code>strict</code>。<code>from</code> 只是 <code>path</code> 的别名。</p>
<p>如果给 <code>&lt;Switch&gt;</code> 提供一个 <code>location</code> 属性，它将覆盖匹配的子元素上的 <code>location</code> 属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Switch>
  <Route exact path=&quot;/&quot; component={Home} />
  <Route path=&quot;/users&quot; component={Users} />
  <Redirect from=&quot;/accounts&quot; to=&quot;/users&quot; />
  <Route component={NoMatch} />
</Switch>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Home}</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/users"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Users}</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Redirect</span> <span class="hljs-attr">from</span>=<span class="hljs-string">"/accounts"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/users"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{NoMatch}</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Router 中文文档（一）

## 原文链接
[https://segmentfault.com/a/1190000014294604](https://segmentfault.com/a/1190000014294604)


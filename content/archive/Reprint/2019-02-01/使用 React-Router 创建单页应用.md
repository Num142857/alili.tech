---
title: '使用 React-Router 创建单页应用' 
date: 2019-02-01 2:30:10
hidden: true
slug: cudsya9p28i
categories: [reprint]
---

{{< raw >}}

                    
<p>最近业余时间在学习 React，配合 Redux 和 React-Router 正在不紧不慢地开发一个小工具<a href="https://github.com/zhanglun/moviemaster" rel="nofollow noreferrer" target="_blank">moviemaster</a>，用于管理硬盘中的电影剧集。在单页应用开发中，redux 并不是必须的，所以今天只讲讲 前端的路由系统以及 React-Router的简单使用。</p>
<h3 id="articleHeader0">什么是路由</h3>
<p>以下来自维基百科：：</p>
<blockquote><p>路由（routing）就是通过互联的网络把信息从源地址传输到目的地址的活动。路由发生在OSI网络参考模型中的第三层即网路层。<br>路由引导分组转送，经过一些中间的节点后，到它们最后的目的地。</p></blockquote>
<p>这是网络工程中的术语，对大家而言，最熟悉的应该就是家里的路由器。路由是指路由器从一个接口上收到数据包，根据数据包的目的地址进行定向并转发到另一个接口的过程。放在 Web 上来说，url 就像是路由器中的路由表，每个 url 对应不同的页面或者内容，就像路由表中的的 IP 对应不同的网络一样。</p>
<p>先来看一下熟悉的套路：</p>
<p><span class="img-wrap"><img data-src="http://7i7gl0.com1.z0.glb.clouddn.com/e4199599d78057a8efacb848ab9b5927.png" src="https://static.alili.techhttp://7i7gl0.com1.z0.glb.clouddn.com/e4199599d78057a8efacb848ab9b5927.png" alt="image_1b0a1gh7ge4u1g9l14mm7v41me9a.png" title="image_1b0a1gh7ge4u1g9l14mm7v41me9a.png" style="cursor: pointer;"></span></p>
<p>在传统的网页应用架构中，客户端只是一个展示层，通过 url 访问服务端，服务端则根据自己的“路由表”将对应的页面分发给客户端。但是在这种模式下，ajax 异步加载的内容是无法通过url 记录的。无论你在页面上操作了多少，异步请求了多少数据，在每次重新访问同一个 url 时，服务端返回给客户端的内容都是一模一样。</p>
<p><span class="img-wrap"><img data-src="http://7xnrrd.com1.z0.glb.clouddn.com/6ed2cf502e487c30c3640a2026071f87.png" src="https://static.alili.techhttp://7xnrrd.com1.z0.glb.clouddn.com/6ed2cf502e487c30c3640a2026071f87.png" alt="image_1b0a24tg94le1p03qa76br1apfg.png" title="image_1b0a24tg94le1p03qa76br1apfg.png" style="cursor: pointer;"></span></p>
<p>如果前端有自己专属的“路由表”来分发页面上不同的状态，那不就行了？</p>
<h3 id="articleHeader1">Hash 和 pushState</h3>
<p>据我所知，目前有两种方式可以构建出前端的路由系统：url 中的#和 HTML5中的 history API。其原理如下：</p>
<ol>
<li><p>阻止标签的默认跳转动作。</p></li>
<li><p>ajax或者 Fetch 请求内容。</p></li>
<li><p>将返回的内容添加到页面中。</p></li>
<li><p>使用 hash 或者 pushState 修改 url。</p></li>
</ol>
<h4>经典的 Hash</h4>
<p>#代表网页中的一个位置。后面接着的字符，就是该位置的标识符。比如，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://zhanglun.github.io/index.html#body" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">https://zhanglun.github.io/index.html<span class="hljs-comment">#body</span></code></pre>
<p>就代表网页 index.html 的 body 位置。浏览器读取这个 URL 后，会自动将body位置滚动至可视区域。标识符的指定有两个方法。</p>
<ol><li><p>使用锚点</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a name=&quot;body&quot;></a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"body"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<ol><li><p>使用id属性</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;body&quot; >" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"body"</span> &gt;</code></pre>
<p>#是用来指向文档的内容，属于浏览器的行为，与服务端无关，在 HTTP请求中也不会携带 #及其后面的内容，对于服务端而言 <a href="http://www.baidu.com" rel="nofollow noreferrer" target="_blank">http://www.baidu.com</a> 和 <a href="http://www.baidu.com#action=fuckbaidu" rel="nofollow noreferrer" target="_blank">http://www.baidu.com#action=fuckbaidu</a> 返回给客户端的都是前者所分发的内容，但是在浏览器中可以通过 Window 对象上的 <code>location.hash</code> 进行操作。因此，在浏览器中可以通过 hash 来记录页面的状态，构建“路由表”。当页面状态发生变化时，hash 相应变化，重新加载时又可以通过 url 中携带的 hash 直接将页面设置到对应的状态。</p>
<p>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://www.example.com/
http://www.examplt.com/#edit
http://www.examplt.com/#settings" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">http:</span><span class="hljs-comment">//www.example.com/</span>
<span class="hljs-symbol">http:</span><span class="hljs-comment">//www.examplt.com/#edit</span>
<span class="hljs-symbol">http:</span><span class="hljs-comment">//www.examplt.com/#settings</span></code></pre>
<ol>
<li><p>访问<code>/</code>时，呈现主页。</p></li>
<li><p>点击页面上的<code>Edit</code>按钮，页面呈现编辑对应的内容。通过 url 直接访问时，检查 hash 是否和 <code>edit</code> 匹配，如果匹配执行加载编辑内容的代码</p></li>
<li><p>点击页面上的<code>Settings</code>按钮，页面呈现设置对应的内容。通过 url 直接访问时，检查 hash 是否和 <code>settings</code> 匹配，如果匹配执行加载编辑内容的代码。</p></li>
</ol>
<p>以下是伪代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function hashHandler () {
    let key = location.hash.slice(1);
    switch(key) {
      case 'edit':
        renderEditPanel();
        break;
      case 'settings':
        renderSettings();
        break;
       default:
        break;
    }
  }
  window.onload = () => {
    hashHandler();
  }
  window.onhashchange = () => {
    hashHandler();
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hashHandler</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> key = location.hash.slice(<span class="hljs-number">1</span>);
    <span class="hljs-keyword">switch</span>(key) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">'edit'</span>:
        renderEditPanel();
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">'settings'</span>:
        renderSettings();
        <span class="hljs-keyword">break</span>;
       <span class="hljs-keyword">default</span>:
        <span class="hljs-keyword">break</span>;
    }
  }
  <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    hashHandler();
  }
  <span class="hljs-built_in">window</span>.onhashchange = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    hashHandler();
  }</code></pre>
<h4>HTML5 中的 pushState</h4>
<p>pushState是 History API中的一个方法，其文档可以看这里 <a href="https://developer.mozilla.org/zh-CN/docs/DOM/Manipulating_the_browser_history" rel="nofollow noreferrer" target="_blank">MDN History</a>。它的功能简单的说就是：修改 url，添加历史记录。比如<code>/blogs</code>和<code>settings</code>对应的是两个页面，如果只是在页面上点击标签切换，需要做的操作只有：发送请求修改页面内容和调用 pushState 方法修改 url。问题来了，对于前端而言需要将其视为同一个页面，但实际上这两个 url 对于服务端来说是两个不同的请求，所以这里需要服务端的配合。</p>
<p>我的做法是：对应的url 返回的都是同一个页面，然后浏览器接受之后检查前端定义路由系统，执行响应的代码。这个方法可能会造成页面平白添加一个短暂的延迟，不过影响不是很大。</p>
<h3 id="articleHeader2">React-Router的使用</h3>
<p>目前来说，任何一个路由系统库或者框架，虽说是写法不一，但是都是在上述两种方式的基础上实现的。让我觉得耳目一新的是：使用路由嵌套的概念来定义 view 的嵌套集合，当一个给定的 URL 被调用时，整个集合中（命中的部分）都会被渲染。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './containers/App';
import MovieContainer from './containers/Movies';
import Detail from './containers/Detail';


let rootElement = document.getElementById('app');
render(
  <Router>
    <Route path=&quot;/&quot; component={App}>
      <Route path=&quot;about&quot; component={About} />
      <Route path=&quot;inbox&quot; component={Inbox}>
        <Route path=&quot;messages/:id&quot; component={Message} />
      </Route>
    </Route>
  </Router>,
rootElement);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> { Router, Route, IndexRoute, hashHistory } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;

<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/App'</span>;
<span class="hljs-keyword">import</span> MovieContainer <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Movies'</span>;
<span class="hljs-keyword">import</span> Detail <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Detail'</span>;


<span class="hljs-keyword">let</span> rootElement = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>);
render(
  &lt;Router&gt;
    &lt;Route path="/" component={App}&gt;
      &lt;Route path="about" component={About} /&gt;
      &lt;Route path="inbox" component={Inbox}&gt;
        &lt;Route path="messages/:id" component={Message} /&gt;
      &lt;/Route&gt;
    &lt;/Route&gt;
  &lt;/Router&gt;,
rootElement);</code></pre>
<p>在入口文件中，引入 React-Router，以组件的形式在 render 中使用，上述代码配置结果如下：</p>
<table>
<thead><tr>
<th>URL</th>
<th>组件</th>
</tr></thead>
<tbody>
<tr>
<td>/</td>
<td>App</td>
</tr>
<tr>
<td>/about</td>
<td>App -&gt; About</td>
</tr>
<tr>
<td>/inbox</td>
<td>App -&gt; Inbox</td>
</tr>
<tr>
<td>/inbox/messages/:id</td>
<td>App -&gt; Inbox -&gt; Message</td>
</tr>
</tbody>
</table>
<p>在路由中，组件对应设置的子组件可以通过 <code>this.props.children</code> 渲染在父组件中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extend Component {
  constructor(props) {
    super(props)
  }
  render() {
    <div id=&quot;app&quot;>
      <h1>Hello, world!</h1>
      {this.props.children}
    </div>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-title">extend</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props)
  }
  render() {
    &lt;div id=<span class="hljs-string">"app"</span>&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, world!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
      {<span class="hljs-keyword">this</span>.props.children}
    &lt;<span class="hljs-regexp">/div&gt;
  }
}</span></code></pre>
<p>当 URL 为 / 时， App 中并没有渲染任何的组件，render 中的 this.props.children 还是 undefined。此时可以使用 <code>IndexRoute</code> 来设置一个默认页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render(
  <Router>
    <Route path=&quot;/&quot; component={App}>
      {/* 当 url 为/时渲染 Welcome */}
      <IndexRoute component={Welcome} />
      <Route path=&quot;about&quot; component={About} />
      <Route path=&quot;inbox&quot; component={Inbox}>
        <Route path=&quot;messages/:id&quot; component={Message} />
      </Route>
    </Route>
  </Router>,
rootElement);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">render(
  &lt;Router&gt;
    &lt;Route path="/" component={App}&gt;
      {/* 当 url 为/时渲染 Welcome */}
      &lt;IndexRoute component={Welcome} /&gt;
      &lt;Route path="about" component={About} /&gt;
      &lt;Route path="inbox" component={Inbox}&gt;
        &lt;Route path="messages/:id" component={Message} /&gt;
      &lt;/Route&gt;
    &lt;/Route&gt;
  &lt;/Router&gt;,
rootElement);</code></pre>
<table>
<thead><tr>
<th>URL</th>
<th>组件</th>
</tr></thead>
<tbody>
<tr>
<td>/</td>
<td>App -&gt; Welcome</td>
</tr>
<tr>
<td>/about</td>
<td>App -&gt; About</td>
</tr>
<tr>
<td>/inbox</td>
<td>App -&gt; Inbox</td>
</tr>
<tr>
<td>/inbox/messages/:id</td>
<td>App -&gt; Inbox -&gt; Message</td>
</tr>
</tbody>
</table>
<p>看一下这一段代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path=&quot;posts&quot; component={Post}>
  <Route path=&quot;users/:userid&quot; component={User}>
    <Route path=&quot;messages/:messageid&quot; component={Message} />
  </Route>
</Route>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;Route path=<span class="hljs-string">"posts"</span> component={Post}&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"users/:userid"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{User}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"messages/:messageid"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Message}</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span></span></code></pre>
<p>此时匹配的路由分别是：<code>/posts</code>，<code>/posts/usres/:userid</code> 和<code>/posts/users/:userid/messages/:messageid</code>，可以看出，嵌套的<code>&lt;Route&gt;</code>所匹配的 url是包裹着它的 <code>&lt;Route&gt;</code>的 path “之和”。但是问题又来了，嵌套的好处在于路由之间结构清晰直观，但是也会导致 url 的不美观，试想<code>/posts/users/:userid/messages/:messageid</code>这么长的路由也是着实让人心累。React-Router 的配置提供了一个选择：将 Route 的 path 设置成绝对路径。同时可以使用<code>&lt;Redirect/&gt;</code> 将修改为绝对路径的路由重定向到之前的设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path=&quot;posts&quot; component={Inbox}>
  <Route path=&quot;/users/:userid&quot; component={Message}>
    <Route path=&quot;/messages/:messageid&quot; component={Message} />
  </Route>
</Route>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;Route path=<span class="hljs-string">"posts"</span> component={Inbox}&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/users/:userid"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Message}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/messages/:messageid"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Message}</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span></span></code></pre>
<table>
<thead><tr>
<th>URL</th>
<th>组件</th>
</tr></thead>
<tbody>
<tr>
<td>/posts</td>
<td>App -&gt; Post</td>
</tr>
<tr>
<td>/user/:userid</td>
<td>App -&gt; Post -&gt; User</td>
</tr>
<tr>
<td>/messages/:messageid</td>
<td>App -&gt; Post -&gt; User -&gt;Message</td>
</tr>
</tbody>
</table>
<p>基础的配置完成之后，通过 <code>&lt;Link&gt;</code>自动或者通过<code>browserHistory</code>和<code>hashHistory</code>手动执行路由的跳转。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 React-Router 创建单页应用

## 原文链接
[https://segmentfault.com/a/1190000007325151](https://segmentfault.com/a/1190000007325151)


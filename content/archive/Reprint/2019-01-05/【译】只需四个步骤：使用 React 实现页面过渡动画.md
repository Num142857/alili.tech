---
title: '【译】只需四个步骤：使用 React 实现页面过渡动画' 
date: 2019-01-05 2:30:10
hidden: true
slug: sh7xv1f0re
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>翻译：疯狂的技术宅<br>作者：Martin Haagensli<br>英文标题：Animated page transitions with React Router 4, ReactTransitionGroup and Animated<br>英文地址：<a href="https://hackernoon.com/animated-page-transitions-with-react-router-4-reacttransitiongroup-and-animated-1ca17bd97a1a" rel="nofollow noreferrer" target="_blank">https://hackernoon.com/animat...</a><br>说明：本文首发于公众号：jingchengyideng</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVSn7n?w=964&amp;h=533" src="https://static.alili.tech/img/bVSn7n?w=964&amp;h=533" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在本文中，我将向你展示如何使用 ReactTransitionGroup 和 Animated 库中的生命周期方法来实现页面的过渡效果。</p>
<p>你可以通过这个视频 <a href="http://animate.mhaagens.me" rel="nofollow noreferrer" target="_blank">http://animate.mhaagens.me</a> 来观看演示效果。</p>
<p>让我们看看该怎样设置一些简单的路由动画！</p>
<h2 id="articleHeader0">1、安装React</h2>
<p>首先安装 React 并创建一个 React 应用程序，很简单的就能创建一个 React 项目并让它运行。</p>
<p>如果你还没有安装 Create React App 就先装好（如果你已经安装，就跳过这一步）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g create-react-app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g <span class="hljs-keyword">create</span>-react-app</code></pre>
<p>然后创建我们的项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="create-react-app animatedroutes &amp;&amp; cd animatedroutes" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">create-react-app</span> <span class="hljs-string">animatedroutes </span>&amp;&amp; <span class="hljs-string">cd </span><span class="hljs-string">animatedroutes</span></code></pre>
<p>接下来安装 routes 和 animation 包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add react-router-dom animated react-transition-group" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-keyword">add</span> react-router-dom animated react-transition-<span class="hljs-keyword">group</span></code></pre>
<p>现在用你喜欢的编辑器打开项目，并运行它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> start</code></pre>
<h2 id="articleHeader1">2、添加 React 路由</h2>
<p>打开 <code>src/index.js</code> 文件，给 React 添加 BrowserRouter</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &quot;react&quot;;
import ReactDOM from &quot;react-dom&quot;;
import { BrowserRouter } from &quot;react-router-dom&quot;;
import App from &quot;./App&quot;;
import registerServiceWorker from &quot;./registerServiceWorker&quot;;
import &quot;./index.css&quot;;
ReactDOM.render(
 <BrowserRouter>
   <App />
 </BrowserRouter>,
 document.getElementById(&quot;root&quot;)
);
registerServiceWorker();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">"react-dom"</span>;
<span class="hljs-keyword">import</span> { BrowserRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">"react-router-dom"</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">"./App"</span>;
<span class="hljs-keyword">import</span> registerServiceWorker <span class="hljs-keyword">from</span> <span class="hljs-string">"./registerServiceWorker"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">"./index.css"</span>;
ReactDOM.render(
 <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">BrowserRouter</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span></span>,
 <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"root"</span>)
);
registerServiceWorker();</code></pre>
<p>然后添加两个需要渲染的组建，首先是 <code>src/Home.js</code> :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &quot;react&quot;;
export default class Home extends Component {
 render() {
  return (
   <div className=&quot;page&quot;>
    <h1>Home</h1>
    <p>Hello from the home page!</p>
   </div>
  )
 }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
 render() {
  <span class="hljs-keyword">return</span> (
   <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"page"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello from the home page!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
 }
}
</code></pre>
<p>接着是 <code>src/Subpage.js</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &quot;react&quot;;
export default class Subpage extends Component {
 render() {
  return (
   <div className=&quot;page&quot;>
    <h1>Subpage</h1>
    <p>Hello from a sub page!</p>
   </div>
  )
 }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Subpage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
 render() {
  <span class="hljs-keyword">return</span> (
   <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"page"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Subpage<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello from a sub page!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
 }
}</code></pre>
<p>下面打开<code>src/App.js</code> 文件并修改内容为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import { Route, Link } from &quot;react-router-dom&quot;;
import Home from &quot;./Home&quot;;
import Subpage from &quot;./Subpage&quot;;
class App extends Component {
  render() {
    return (
      <div className=&quot;App&quot;>
        <div className=&quot;TopBar&quot;>
          <Link to=&quot;/&quot;>Home</Link>
          <Link to=&quot;/subpage&quot;>Subpage</Link>
        </div>
          <Route exact path=&quot;/&quot; component={Home} />
          <Route exact path=&quot;/subpage&quot; component={Subpage} />
      </div>
    );
  }
}
export default App;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { Route, Link } <span class="hljs-keyword">from</span> <span class="hljs-string">"react-router-dom"</span>;
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">"./Home"</span>;
<span class="hljs-keyword">import</span> Subpage <span class="hljs-keyword">from</span> <span class="hljs-string">"./Subpage"</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div className="App"&gt;
        &lt;div className="TopBar"&gt;
          &lt;Link to="/"&gt;Home&lt;/Link&gt;
          &lt;Link to="/subpage"&gt;Subpage&lt;/Link&gt;
        &lt;/div&gt;
          &lt;Route exact path="/" component={Home} /&gt;
          &lt;Route exact path="/subpage" component={Subpage} /&gt;
      &lt;/div&gt;
    );
  }
}
export default App;</code></pre>
<p>最后删除 <code>src/App.css</code> 的内容，并把下面的代码复制到<code>src/index.css</code> 文件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html,
body,
#root {
    height: 100%;
    width: 100%;
}
body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
}
.App {
    position: relative;
    display: flex;
    flex-flow: column;
}
.TopBar {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    height: 62px;
    padding: 0 24px;
}
.TopBar a {
    margin-right: 18px;
    text-decoration: none;
}
.animated-page-wrapper {
    position: absolute;
    top: 62px;
    left: 0;
    width: 100%;
    height: 100%;
}
.page {
    padding: 0 24px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span>,
<span class="hljs-selector-tag">body</span>,
<span class="hljs-selector-id">#root</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">font-family</span>: sans-serif;
}
<span class="hljs-selector-class">.App</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-flow</span>: column;
}
<span class="hljs-selector-class">.TopBar</span> {
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-flow</span>: row nowrap;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">62px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">24px</span>;
}
<span class="hljs-selector-class">.TopBar</span> <span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">18px</span>;
    <span class="hljs-attribute">text-decoration</span>: none;
}
<span class="hljs-selector-class">.animated-page-wrapper</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">62px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.page</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">24px</span>;
}</code></pre>
<p>好了，现在可以通过路由在主页面和子页面之间进行导航了。</p>
<h2 id="articleHeader2">3、添加 TransitionGroup</h2>
<p>现在开始添加动画效果。我们需要做一些微不足道的工作来实现它。</p>
<p>现在，我们不再用默认的方式设置路由，而是要使用路由渲染方法来去渲染前面的组件，并将其封装到一个<code>&lt;TransitionGroup /&gt;</code>中。</p>
<p>首先把TransitionGroup导入你的 <code>src/App.js</code>，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import TransitionGroup from &quot;react-transition-group/TransitionGroup&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> TransitionGroup <span class="hljs-keyword">from</span> <span class="hljs-string">"react-transition-group/TransitionGroup"</span>;</code></pre>
<p>然后我们必须为 TransitionGroup 添加一个特殊的函数来渲染子组件。在 <code>src/App.js</code> 文件中<code>class App extends ... </code>的前面添加这个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> firstChild = <span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> childrenArray = React.Children.toArray(props.children);
  <span class="hljs-keyword">return</span> childrenArray[<span class="hljs-number">0</span>] || <span class="hljs-literal">null</span>;
};</code></pre>
<p>然后删除你的路由，并替换成下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route
  exact
  path=&quot;/&quot;
  children={({ match, ...rest }) => (
    <TransitionGroup component={firstChild}>
      {match &amp;&amp; <Home {...rest} />}
    </TransitionGroup>
)}/>
<Route
   path=&quot;/subpage&quot;
   children={({ match, ...rest }) => (
     <TransitionGroup component={firstChild}>
       {match &amp;&amp; <Subpage {...rest} />}
     </TransitionGroup>
)}/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span>
  <span class="hljs-attr">exact</span>
  <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span>
  <span class="hljs-attr">children</span>=<span class="hljs-string">{({</span> <span class="hljs-attr">match</span>, <span class="hljs-attr">...rest</span> }) =&gt;</span> (
    <span class="hljs-tag">&lt;<span class="hljs-name">TransitionGroup</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{firstChild}</span>&gt;</span>
      {match &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">Home</span> {<span class="hljs-attr">...rest</span>} /&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">TransitionGroup</span>&gt;</span>
)}/&gt;
<span class="hljs-tag">&lt;<span class="hljs-name">Route</span>
   <span class="hljs-attr">path</span>=<span class="hljs-string">"/subpage"</span>
   <span class="hljs-attr">children</span>=<span class="hljs-string">{({</span> <span class="hljs-attr">match</span>, <span class="hljs-attr">...rest</span> }) =&gt;</span> (
     <span class="hljs-tag">&lt;<span class="hljs-name">TransitionGroup</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{firstChild}</span>&gt;</span>
       {match &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">Subpage</span> {<span class="hljs-attr">...rest</span>} /&gt;</span>}
     <span class="hljs-tag">&lt;/<span class="hljs-name">TransitionGroup</span>&gt;</span>
)}/&gt;</code></pre>
<p>您现在可以访问新的生命周期方法了，比如 <code>componentWillAppear()</code>，<code>componentWillEnter()</code>和<code>componentWillLeave()</code>。</p>
<p>让我们用它们来制作一个更高级的组件来实现我的的动画路由效果，现在好戏开场了！</p>
<h1 id="articleHeader3">4、创建Animated Wrapper 并用 Animated 实现动画</h1>
<p>创建<code>src/AnimatedWrapper.js</code>文件并复制下面的代码到文件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &quot;react&quot;;
import * as Animated from &quot;animated/lib/targets/react-dom&quot;;
const AnimatedWrapper = WrappedComponent => class AnimatedWrapper
 extends Component {
 constructor(props) {
  super(props);
  this.state = {
   animate: new Animated.Value(0)
  };
 }
 render() {
  return (
   <Animated.div className=&quot;animated-page-wrapper&quot;>
    <WrappedComponent {...this.props} />
   </Animated.div>
  );
 }
};
export default AnimatedWrapper;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> Animated <span class="hljs-keyword">from</span> <span class="hljs-string">"animated/lib/targets/react-dom"</span>;
<span class="hljs-keyword">const</span> AnimatedWrapper = <span class="hljs-function"><span class="hljs-params">WrappedComponent</span> =&gt;</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AnimatedWrapper</span>
 <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
 <span class="hljs-keyword">constructor</span>(props) {
  <span class="hljs-keyword">super</span>(props);
  <span class="hljs-keyword">this</span>.state = {
   <span class="hljs-attr">animate</span>: <span class="hljs-keyword">new</span> Animated.Value(<span class="hljs-number">0</span>)
  };
 }
 render() {
  <span class="hljs-keyword">return</span> (
   &lt;Animated.div className="animated-page-wrapper"&gt;
    &lt;WrappedComponent {...this.props} /&gt;
   &lt;/Animated.div&gt;
  );
 }
};
export default AnimatedWrapper;</code></pre>
<p>这里有很多东西，我来解释一下。</p>
<p>我们用component来包装我们的路由组件。它将从 TransitionGroup 接收生命周期方法，我们可以用它来实现动画效果。<br>我们还用 Animated 创建了一个变量，可以用它来对封装的子组件中的 div 的不同样式属性实现动画效果。</p>
<p>让我们添加一些生命周期方法给组件添加动画效果。用<code>Animated.template</code>渲染，并且／或者插入动画状态值。</p>
<p>按照下面的代码修改<code>src/AnimatedWrapper.js</code>文件内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &quot;react&quot;;
import * as Animated from &quot;animated/lib/targets/react-dom&quot;;
const AnimatedWrapper = WrappedComponent => class AnimatedWrapper
 extends Component {
 constructor(props) {
  super(props);
  this.state = {
   animate: new Animated.Value(0)
  };
 }
 componentWillAppear(cb) {
  Animated.spring(this.state.animate, { toValue: 1 }).start();
  cb();
 }
 componentWillEnter(cb) {
  setTimeout(
   () => Animated.spring(this.state.animate, { toValue: 1 }).start(),
   250
  );
  cb();
 }
 componentWillLeave(cb) {
  Animated.spring(this.state.animate, { toValue: 0 }).start();
  setTimeout(() => cb(), 175);
 }
 render() {
  const style = {
   opacity: Animated.template`${this.state.animate}`,
   transform: Animated.template`
    translate3d(0,${this.state.animate.interpolate({
    inputRange: [0, 1],
    outputRange: [&quot;12px&quot;, &quot;0px&quot;]
   })},0)
   `
  };
  return (
   <Animated.div style={style} className=&quot;animated-page-wrapper&quot;>
    <WrappedComponent {...this.props} />
   </Animated.div>
  );
 }
};
export default AnimatedWrapper;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> Animated <span class="hljs-keyword">from</span> <span class="hljs-string">"animated/lib/targets/react-dom"</span>;
<span class="hljs-keyword">const</span> AnimatedWrapper = <span class="hljs-function"><span class="hljs-params">WrappedComponent</span> =&gt;</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AnimatedWrapper</span>
 <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
 <span class="hljs-keyword">constructor</span>(props) {
  <span class="hljs-keyword">super</span>(props);
  <span class="hljs-keyword">this</span>.state = {
   <span class="hljs-attr">animate</span>: <span class="hljs-keyword">new</span> Animated.Value(<span class="hljs-number">0</span>)
  };
 }
 componentWillAppear(cb) {
  Animated.spring(<span class="hljs-keyword">this</span>.state.animate, { <span class="hljs-attr">toValue</span>: <span class="hljs-number">1</span> }).start();
  cb();
 }
 componentWillEnter(cb) {
  setTimeout(
   <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> Animated.spring(<span class="hljs-keyword">this</span>.state.animate, { <span class="hljs-attr">toValue</span>: <span class="hljs-number">1</span> }).start(),
   <span class="hljs-number">250</span>
  );
  cb();
 }
 componentWillLeave(cb) {
  Animated.spring(<span class="hljs-keyword">this</span>.state.animate, { <span class="hljs-attr">toValue</span>: <span class="hljs-number">0</span> }).start();
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> cb(), <span class="hljs-number">175</span>);
 }
 render() {
  <span class="hljs-keyword">const</span> style = {
   <span class="hljs-attr">opacity</span>: Animated.template<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.state.animate}</span>`</span>,
   <span class="hljs-attr">transform</span>: Animated.template<span class="hljs-string">`
    translate3d(0,<span class="hljs-subst">${<span class="hljs-keyword">this</span>.state.animate.interpolate({
    inputRange: [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>],
    outputRange: [<span class="hljs-string">"12px"</span>, <span class="hljs-string">"0px"</span>]
   }</span>)},0)
   `</span>
  };
  <span class="hljs-keyword">return</span> (
   &lt;Animated.div style={style} className="animated-page-wrapper"&gt;
    &lt;WrappedComponent {...this.props} /&gt;
   &lt;/Animated.div&gt;
  );
 }
};
export default AnimatedWrapper;</code></pre>
<p>然后我们需要在每个路由组件中导入它，然后像这样将它们封装起来：</p>
<p>修改 <code>src/Home.js</code> 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &quot;react&quot;;
import AnimatedWrapper from &quot;./AnimatedWrapper&quot;;
class HomeComponent extends Component {
 render() {
  return (
   <div className=&quot;page&quot;>
    <h1>Home</h1>
    <p>Hello from the home page!</p>
   </div>
  )
 }
}
const Home = AnimatedWrapper(HomeComponent);
export default Home;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> AnimatedWrapper <span class="hljs-keyword">from</span> <span class="hljs-string">"./AnimatedWrapper"</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HomeComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
 render() {
  <span class="hljs-keyword">return</span> (
   <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"page"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello from the home page!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
 }
}
<span class="hljs-keyword">const</span> Home = AnimatedWrapper(HomeComponent);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Home;</code></pre>
<p>修改 <code>src/Subpage.js</code> 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &quot;react&quot;;
import AnimatedWrapper from &quot;./AnimatedWrapper&quot;;
class SubpageComponent extends Component {
 render() {
  return (
   <div className=&quot;page&quot;>
    <h1>Subpage</h1>
    <p>Hello from a sub page!</p>
   </div>
  )
 }
}
const Subpage = AnimatedWrapper(SubpageComponent);
export default Subpage;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> AnimatedWrapper <span class="hljs-keyword">from</span> <span class="hljs-string">"./AnimatedWrapper"</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SubpageComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
 render() {
  <span class="hljs-keyword">return</span> (
   <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"page"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Subpage<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello from a sub page!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
 }
}
<span class="hljs-keyword">const</span> Subpage = AnimatedWrapper(SubpageComponent);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Subpage;</code></pre>
<p>就这样，现在你的页面切换效果应该是动态的了！</p>
<h2 id="articleHeader4">扩展阅读</h2>
<p>我建议通过Animated文档来学习，但是现在相关文档很少。我们实用的<code>Animated.template</code>函数在 Github-issues 以外的地方几乎找不到。它的文档在这里：<a href="http://animatedjs.github.io/interactive-docs/" rel="nofollow noreferrer" target="_blank">http://animatedjs.github.io/i...</a>。<br>你可以通过下面的链接下载Demo的演示视频：<br><a href="http://animate.mhaagens.me/" rel="nofollow noreferrer" target="_blank">http://animate.mhaagens.me/</a><br>或者：<br><a href="https://github.com/mhaagens/animated_routes_react" rel="nofollow noreferrer" target="_blank">https://github.com/mhaagens/a...</a></p>
<p>也可以关注我在Medium的博客或者我的Twitter，来学习更多 React 相关的内容。<br><a href="https://twitter.com/mhaagens" rel="nofollow noreferrer" target="_blank">https://twitter.com/mhaagens</a></p>
<hr>
<p><em>欢迎扫描二维码关注公众号，每天第一时间推送我翻译的国外最新技术文章。</em><br><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVR5Bc?w=430&amp;h=430" src="https://static.alili.techhttps://segmentfault.com/img/bVR5Bc?w=430&amp;h=430" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】只需四个步骤：使用 React 实现页面过渡动画

## 原文链接
[https://segmentfault.com/a/1190000010539892](https://segmentfault.com/a/1190000010539892)


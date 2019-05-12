---
title: 'React Router 4 简易入门' 
date: 2019-01-08 2:30:11
hidden: true
slug: xp0vmchrrkn
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf" rel="nofollow noreferrer" target="_blank">原文</a></p>
<p>React Router4是一个流行的纯React重写的包。现在的版本中已不需要路由配置，现在一切皆组件。</p>
<p>本文涵盖了开始使用React Router构建网站所需要的一切知识。我们将会为本地运动队制作一个网站。</p>
<h3 id="articleHeader0">代码</h3>
<p>想看网站最终效果，查看<a href="https://codepen.io/pshrmn/pen/YZXZqM" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="pshrmn/pen/YZXZqM" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">安装</h2>
<p>React Router被拆分成三个包：<code>react-router</code>,<code>react-router-dom</code>和<code>react-router-native</code>。<code>react-router</code>提供核心的路由组件与函数。其余两个则提供运行环境（即浏览器与react-native）所需的特定组件。</p>
<p>进行网站（将会运行在浏览器环境中）构建，我们应当安装<code>react-router-dom</code>。<code>react-router-dom</code>暴露出<code>react-router</code>中暴露的对象与方法，因此你只需要安装并引用<code>react-router-dom</code>即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save react-router-dom
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save react-router-dom</span>
</code></pre>
<h2 id="articleHeader2">路由器(Router)</h2>
<p>在你开始项目前，你需要决定你使用的路由器的类型。对于网页项目，存在<code>&lt;BrowserRouter&gt;</code>与<code>&lt;HashRouter&gt;</code>两种组件。当存在服务区来管理动态请求时，需要使用&lt;BrowserRouter&gt;组件，而&lt;HashRouter&gt;被用于静态网站。</p>
<p>通常，我们更倾向选择&lt;BrowserRouter&gt;，但如果你的网站仅用来呈现静态文件，那么&lt;HashRouter&gt;将会是一个好选择。</p>
<p>对于我们的项目，将设将会有服务器的动态支持，因此我们选择&lt;BrowserRouter&gt;作为路由器组件。</p>
<h3 id="articleHeader3">历史(History)</h3>
<p>每个路由器都会创建一个history对象并用其保持追踪当前<code>location[注1]</code>并且在有变化时对网站进行重新渲染。这个history对象保证了React Router提供的其他组件的可用性，所以其他组件必须在router内部渲染。一个React Router组件如果向父级上追溯却找不到router组件，那么这个组件将无法正常工作。</p>
<h3 id="articleHeader4">渲染&lt;Router&gt;</h3>
<p>路由器组件无法接受两个及以上的子元素。基于这种限制的存在，创建一个<code>&lt;App&gt;</code>组件来渲染应用其余部分是一个有效的方法（对于服务端渲染，将应用从router组件中分离也是重要的）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { BrowserRouter } from 'react-router-dom'
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { BrowserRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>
ReactDOM.render((
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">BrowserRouter</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span></span>
), <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>))
</code></pre>
<h2 id="articleHeader5">&lt;App&gt;</h2>
<p>应用通过<code>&lt;App&gt;</code>组件定义。简化一下，我们将应用拆分成两个部分。<code>&lt;Header&gt;</code>组件包含网站的导航链接。&lt;Main&gt;组件则呈现其余内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// this component will be rendered by our <___Router>
const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// this component will be rendered by our &lt;___Router&gt;</span>
<span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Main</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)
</code></pre>
<p>注意：你可以按你喜欢的方式对应用布局，但是将路由与导航拆分出来对于这个入门教程会成家简单。</p>
<h2 id="articleHeader6">路由(Route)</h2>
<p>&lt;Route&gt;组件是React Router中主要的结构单元。在任意位置只要匹配了URL的路径名(pathname)你就可以创建&lt;Route&gt;元素进行渲染。</p>
<h3 id="articleHeader7">路径(Path)</h3>
<p>&lt;Route&gt;接受一个数为string类型的<code>path</code>，该值路由匹配的路径名的类型。例如：<code>&lt;Route path='/roster'/&gt;</code>会匹配以<code>/roster[注2]</code>开头的路径名。在当前path参数与当前location的路径相匹配时，路由就会开始渲染React元素。若不匹配，路由不会进行任何操作[注3]。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path='/roster'/>
// 当路径名为'/'时, path不匹配
// 当路径名为'/roster'或'/roster/2'时, path匹配
// 当你只想匹配'/roster'时，你需要使用&quot;exact&quot;参数
// 则路由仅匹配'/roster'而不会匹配'/roster/2'
<Route exact path='/roster'/>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>&lt;Route path=<span class="hljs-string">'/roster'</span>/&gt;
// 当路径名为<span class="hljs-string">'/'</span>时, path不匹配
// 当路径名为<span class="hljs-string">'/roster'</span>或<span class="hljs-string">'/roster/2'</span>时, path匹配
// 当你只想匹配<span class="hljs-string">'/roster'</span>时，你需要使用<span class="hljs-string">"exact"</span>参数
// 则路由仅匹配<span class="hljs-string">'/roster'</span>而不会匹配<span class="hljs-string">'/roster/2'</span>
&lt;Route exact path=<span class="hljs-string">'/roster'</span>/&gt;
</code></pre>
<p>注意：在匹配路由时，React Router只关注location的路径名。当URL如下时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://www.example.com/my-projects/one?extra=false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code><span class="hljs-keyword">http</span>://www.example.com/my-projects/<span class="hljs-literal">one</span>?extra=<span class="hljs-literal">false</span>
</code></pre>
<p>React Router去匹配的只是'/my-projects/one'这一部分。</p>
<h3 id="articleHeader8">匹配路径</h3>
<p><code>path-to-regexp</code>包用来决定route元素的path参数与当前location是否匹配。它将路径字符串编译成正则表达式，并与当前location的路径名进行匹配比较。除了上面的例子外，路径字符串有更多高级的选项，详见[path-to-regexp文档]。<br>当路由地址匹配成功后，会创建一个含有以下属性的<em>match对象</em>：</p>
<ul>
<li><p>url ：与当前location路径名所匹配部分</p></li>
<li><p>path ：路由的地址</p></li>
<li><p>isExact ：path 是否等于 pathname</p></li>
<li><p>params ：从<em>path-to-regexp</em>获取的路径中取出的值都被包含在这个对象中</p></li>
</ul>
<p>使用<a href="https://pshrmn.github.io/route-tester/#/" rel="nofollow noreferrer" target="_blank">route tester</a>这款工具来对路由与URL进行检验。</p>
<p>注意：本例中路由路径仅支持绝对路径[注4]。</p>
<h3 id="articleHeader9">创建你的路由</h3>
<p>可以在路由器(router)组件中的任意位置创建多个&lt;Route&gt;，但通常我们会把它们放在同一个位置。使用&lt;Switch&gt;组件来包裹一组&lt;Route&gt;。&lt;Switch&gt;会遍历自身的子元素（即路由）并对第一个匹配当前路径的元素进行渲染。</p>
<p>对于本网站，我们希望匹配一下路径：</p>
<ul>
<li><p>/ ： 主页</p></li>
<li><p>/roster ： 团体列表</p></li>
<li><p>/roster/:number ：运动员页面，使用运动员的编号作为标识</p></li>
<li><p>/schedule ：团队的赛程表</p></li>
</ul>
<p>为了在应用中能匹配路径，在创建&lt;Route&gt;元素时必须带有需要匹配的path作为参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Switch>
  <Route exact path='/' component={Home}/>
  {/* both /roster and /roster/:number begin with /roster */}
  <Route path='/roster' component={Roster}/>
  <Route path='/schedule' component={Schedule}/>
</Switch>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/'</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Home}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
  </span><span class="hljs-template-tag">{/* <span class="hljs-name">both</span> /roster and /roster/:number begin with /roster */}</span><span class="xml">
  <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/roster'</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Roster}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/schedule'</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Schedule}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span>
</span></code></pre>
<h3 id="articleHeader10">&lt;Route&gt;是如何渲染的？</h3>
<p>当一个路由的path匹配成功后，路由用来确定渲染结果的参数有三种。只需要提供其中一个即可。</p>
<ul>
<li><p>component ： 一个React组件。当带有component参数的route匹配成功后，route会返回一个新的元素，其为component参数所对应的React组件（使用React.createElement创建）。</p></li>
<li><p>render ： 一个返回React element的函数[注5]。当匹配成功后调用该函数。该过程与传入component参数类似，并且对于行级渲染与需要向元素传入额外参数的操作会更有用。</p></li>
<li><p>children ： 一个返回React element的函数。与上述两个参数不同，无论route是否匹配当前location，其都会被渲染。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path='/page' component={Page} />
const extraProps = { color: 'red' }
<Route path='/page' render={(props) => (
  <Page {...props} data={extraProps}/>
)}/>
<Route path='/page' children={(props) => (
  props.match
    ? <Page {...props}/>
    : <EmptyPage {...props}/>
)}/>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/page'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Page}</span> /&gt;</span>
const extraProps = { color: 'red' }
<span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/page'</span> <span class="hljs-attr">render</span>=<span class="hljs-string">{(props)</span> =&gt;</span> (
  <span class="hljs-tag">&lt;<span class="hljs-name">Page</span> {<span class="hljs-attr">...props</span>} <span class="hljs-attr">data</span>=<span class="hljs-string">{extraProps}/</span>&gt;</span>
)}/&gt;
<span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/page'</span> <span class="hljs-attr">children</span>=<span class="hljs-string">{(props)</span> =&gt;</span> (
  props.match
    ? <span class="hljs-tag">&lt;<span class="hljs-name">Page</span> {<span class="hljs-attr">...props</span>}/&gt;</span>
    : <span class="hljs-tag">&lt;<span class="hljs-name">EmptyPage</span> {<span class="hljs-attr">...props</span>}/&gt;</span>
)}/&gt;
</code></pre>
<p>通常<code>component</code>参数与<code>render</code>参数被更经常地使用。<code>children</code>参数偶尔会被使用，它更常用在path无法匹配时呈现的'空'状态。在本例中并不会有额外的状态，所以我们将使用&lt;Route&gt;的component参数。</p>
<p>通过&lt;Route&gt;渲染的元素会被传入一些参数。分别是match对象，当前location对象[注6]以及history对象（由router创建）[注7]。</p>
<h3 id="articleHeader11">&lt;Main&gt;</h3>
<p>现在我们清楚了根路由的结构，我们需要实际渲染我们的路由。对于这个应用，我们将会在&lt;Main&gt;组件中渲染&lt;Switch&gt;与&lt;Route&gt;，这一过程会将route匹配生成的HTML放在&lt;main&gt;节点中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Switch, Route } from 'react-router-dom'
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/roster' component={Roster}/>
      <Route path='/schedule' component={Schedule}/>
    </Switch>
  </main>
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">import </span><span class="hljs-template-variable">{ Switch, Route }</span><span class="xml"> from 'react-router-dom'
const Main = () =&gt; (
  <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/'</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Home}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/roster'</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Roster}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/schedule'</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Schedule}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
)
</span></code></pre>
<p>注意：主页路由包含额外参数。该参数用来保证路由能准确匹配path。</p>
<h3 id="articleHeader12">嵌套路由</h3>
<p>运动员路由<code>/roster/:number</code>并未包含在上述&lt;Switch&gt;中。它由&lt;Roster&gt;组件负责在路径包含'/roster'的情形下进行渲染。</p>
<p>在&lt;Roster&gt;组件中，我们将为两种路径进行渲染：</p>
<ul>
<li><p>/roster ：对应路径名仅仅是/roster时，因此需要在exact元素上添加exact参数。</p></li>
<li>
<p>/roster/:number ： 该路由使用一个路由参数来获取/roster后的路径名。</p>
<p>const Roster = () =&gt; (<br>  &lt;Switch&gt;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route exact path='/roster' component={FullRoster}/>
<Route path='/roster/:number' component={Player}/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/roster'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{FullRoster}/</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/roster/:number'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Player}/</span>&gt;</span></code></pre>
<p>&lt;/Switch&gt;<br>)</p>
<p>组合在相同组件中分享共同前缀的路由是一种有用的方法。这就需要简化父路由并且提供一个区域来渲染具有相同前缀的通用路由。</p>
</li>
</ul>
<p>例如，&lt;Roster&gt;用来渲染所有以<code>/roster</code>开始的全部路由。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Roster = () => (
  <div>
    <h2>This is a roster page!</h2>
    <Switch>
      <Route exact path='/roster' component={FullRoster}/>
      <Route path='/roster/:number' component={Player}/>
    </Switch>
  </div>
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>const Roster = () =&gt; (
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>This is a roster page!<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/roster'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{FullRoster}/</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/roster/:number'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Player}/</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
)
</code></pre>
<h3 id="articleHeader13">路径参数</h3>
<p>有时路径名中存在我们需要获取的参数。例如，在运动员界面，我们需要获取运动员的编号。我们可以向route的路径字符串中添加path参数</p>
<p>如'/roster/:number'中<code>:number</code>这种写法意味着/roster/后的路径名将会被获取并存在<code>match.params.number</code>中。例如，路径名'/roster/6'会获取到一个对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ number: '6' } // 注获取的值是字符串类型的
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>{ <span class="hljs-string">number:</span> <span class="hljs-string">'6'</span> } <span class="hljs-comment">// 注获取的值是字符串类型的</span>
</code></pre>
<p>&lt;Player&gt;组件可以使用props.match.params对象来确定需要被渲染的运动员的数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 返回运动员对象的API
import PlayerAPI from './PlayerAPI'
const Player = (props) => {
  const player = PlayerAPI.get(
    parseInt(props.match.params.number, 10)
  )
  if (!player) {
    return <div>Sorry, but the player was not found</div>
  }
  return (
    <div>
      <h1>{player.name} (#{player.number})</h1>
      <h2>{player.position}</h2>
    </div>
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 返回运动员对象的API</span>
<span class="hljs-keyword">import</span> PlayerAPI <span class="hljs-keyword">from</span> <span class="hljs-string">'./PlayerAPI'</span>
<span class="hljs-keyword">const</span> Player = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> player = PlayerAPI.get(
    <span class="hljs-built_in">parseInt</span>(props.match.params.number, <span class="hljs-number">10</span>)
  )
  <span class="hljs-keyword">if</span> (!player) {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Sorry, but the player was not found<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  }
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{player.name} (#{player.number})<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{player.position}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)
</code></pre>
<p>你可以通过阅读<a href="https://github.com/pillarjs/path-to-regexp#parameters" rel="nofollow noreferrer" target="_blank">path-to-regexp文档</a>来了解更多。</p>
<p>除了&lt;Player&gt;组件，我们的页面还包含&lt;FullRoster&gt;, &lt;Schedule&gt;以及 &lt;Home&gt;组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const FullRoster = () => (
  <div>
    <ul>
      {
        PlayerAPI.all().map(p => (
          <li key={p.number}>
            <Link to={`/roster/${p.number}`}>{p.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
)
const Schedule = () => (
  <div>
    <ul>
      <li>6/5 @ Evergreens</li>
      <li>6/8 vs Kickers</li>
      <li>6/14 @ United</li>
    </ul>
  </div>
)
const Home = () => (
  <div>
    <h1>Welcome to the Tornadoes Website!</h1>
  </div>
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> FullRoster = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {
        PlayerAPI.all().map(p =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{p.number}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">roster</span>/${<span class="hljs-attr">p.number</span>}`}&gt;</span>{p.name}<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))
      }
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)
<span class="hljs-keyword">const</span> Schedule = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>6/5 @ Evergreens<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>6/8 vs Kickers<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>6/14 @ United<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)
<span class="hljs-keyword">const</span> Home = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome to the Tornadoes Website!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)
</code></pre>
<h2 id="articleHeader14">Link</h2>
<p>现在，我们应用需要在各个页面间切换。如果使用锚点元素（就是<a></a>）实现，在每次点击时页面将被重新加载。React Router提供了&lt;Link&gt;组件用来避免这种状况的发生。当你点击&lt;Link&gt;时，URL会更新，组件会被重新渲染，但是页面不会重新加载。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Link } from 'react-router-dom'
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/roster'>Roster</Link></li>
        <li><Link to='/schedule'>Schedule</Link></li>
      </ul>
    </nav>
  </header>
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { Link } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>
<span class="hljs-keyword">const</span> Header = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/'</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/roster'</span>&gt;</span>Roster<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/schedule'</span>&gt;</span>Schedule<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></span>
)
</code></pre>
<p>&lt;Link&gt;使用'to'参数来描述需要定位的页面。它的值即可是字符串也可是location对象（包含pathname，search，hash与state属性）。如果其值为字符床将会被转换为location对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Link to="{{" pathname: '/roster/7' "}}">Player #7</Link>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>&lt;<span class="hljs-keyword">Link</span> <span class="hljs-keyword">to</span>="{{" pathname: <span class="hljs-string">'/roster/7'</span> "}}"&gt;Player #7&lt;/<span class="hljs-keyword">Link</span>&gt;
</code></pre>
<p>注意：本例的link的pathname属性只能是绝对路径[注4]。</p>
<h2 id="articleHeader15">例子</h2>
<p>一个完整的<a href="http://codepen.io/pshrmn/pen/YZXZqM" rel="nofollow noreferrer" target="_blank">网站例子</a><button class="btn btn-xs btn-default ml10 preview" data-url="pshrmn/pen/YZXZqM" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader16">获取路由</h2>
<p>希望当下你已准备好深入构建你自己的网站了。</p>
<p>我们已经了解了构建网站所需要的所有必须组件（&lt;BrowserRouter&gt;, &lt;Route&gt;, 以及 &lt;Link&gt;）。当然，还有一些我们没有涉及的组件。所幸React Router拥有优质的<a href="https://reacttraining.com/react-router/web/guides/quick-start" rel="nofollow noreferrer" target="_blank">文档</a>，你可以查看并从中了解更多的信息。文档也提供一系列的例子与源代码。</p>
<h2 id="articleHeader17">注释：</h2>
<p>[1] locations 是一个含有描述URL不同部分属性的对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 一个基本的location对象
{ pathname: '/', search: '', hash: '', key: 'abc123' state: {} }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// 一个基本的location对象</span>
{ <span class="hljs-string">pathname:</span> <span class="hljs-string">'/'</span>, <span class="hljs-string">search:</span> <span class="hljs-string">''</span>, <span class="hljs-string">hash:</span> <span class="hljs-string">''</span>, <span class="hljs-string">key:</span> <span class="hljs-string">'abc123'</span> <span class="hljs-string">state:</span> {} }
</code></pre>
<p>[2] 你可以渲染无路径的&lt;Route&gt;，其将会匹配所有location。此法用于访问存在上下文中的变量与方法。</p>
<p>[3] 如果你使用children参数，即便在当前location不匹配时route也将进行渲染。</p>
<p>[4] 当需要支持相对路径的&lt;Route&gt;与&lt;Link&gt;时，你需要多做一些工作。相对&lt;Link&gt;将会比你之前看到的更为复杂。因其使用了父级的match对象而非当前URL来匹配相对路径。</p>
<p>[5] 这是一个本质上无状态的函数组件。内部实现，component参数与render参数的组件是用很大的区别的。使用component参数的组件会使用<code>React.createElement</code>来创建元素，使用render参数的组件则会调用render函数。如果我们定义一个内联函数并将其传给component参数，这将会比使用render参数慢很多。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path='/one' component={One}/>
// React.createElement(props.component)
<Route path='/two' render={() => <Two />}/>
// props.render()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/one'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{One}/</span>&gt;</span>
// React.createElement(props.component)
<span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/two'</span> <span class="hljs-attr">render</span>=<span class="hljs-string">{()</span> =&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">Two</span> /&gt;</span>}/&gt;
// props.render()
</code></pre>
<p>[6] &lt;Route&gt;与&lt;Switch&gt;组件都会带有location参数。这能让你使用与实际location不同的location去匹配地址。</p>
<p>[7] 可以传入staticContext参数，不过这仅在服务端渲染时有用。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Router 4 简易入门

## 原文链接
[https://segmentfault.com/a/1190000010174260](https://segmentfault.com/a/1190000010174260)


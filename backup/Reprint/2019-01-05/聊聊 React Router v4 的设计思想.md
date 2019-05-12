---
title: '聊聊 React Router v4 的设计思想' 
date: 2019-01-05 2:30:11
hidden: true
slug: 296z8axpaic
categories: [reprint]
---

{{< raw >}}

                    
<p>React Router v4 发布已经有几个月了，但好像并没有得到太多人的青睐，大家（包括我们团队自己）还是习惯使用v2、v3版本。这一方面是因为v4版本是一次破坏性的升级，从v2、v3 升级到v4，必需要大量重写原有的路由相关的代码，对于已经稳定的项目，一般是不会轻易尝试这种变更的；另一方面，即使是新项目，很多开发者也依然选择使用v2、v3老版本，因为v4新的设计思想，意味着你必须改变原有的使用路由的思维，才能正确的使用新版本。</p>
<p>React Router v4 最大的变更，不是API的变更，而是从静态路由到动态路由的变化。什么是静态路由呢？静态路由是一堆在应用运行前就已经定义好的路由配置，应用需要在启动时，加载这些配置，构建出整个应用的路由表，然后当接收到某一请求时，根据请求地址，到应用路由表中找到对应的处理页面或处理方法。不管是前端开发，还是后端开发，只要涉及到路由，大部分情况下，其实我们使用的都是静态路由。例如，React Router v3版本中，我们会配置一个类似下面形式的路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Router history={browserHistory}>
  <Route path='/' component={App}>
    <Route path='about' component={About}>
    <Route path='contact' component={Contact}>
    // ...
  </Route>
</Router>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{browserHistory}</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{App}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'about'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{About}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'contact'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Contact}</span>&gt;</span>
    // ...
  <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
</code></pre>
<p>它的基本工作流程是：Router组件根据所有的子组件Route，生成全局的路由表，路由表中记录了path与UI组件的映射关系，然后Router监听path的变化，当path变化时，根据新的path，找出对应所需的所有UI组件，按一定层级将这些UI组件渲染出来。</p>
<p>对于已经很熟悉静态路由使用方式的开发者来说，上面的工作流程显得很自然，理解起来也毫不费力。既然如此，React Router的作者为什么还要把这一切推翻呢？原因是React Router不是普通的Router，它是“React”的Router。React致力于提供一个高效简洁的组件化方案，组件就是React的核心，在React的设计思想中，一切皆是组件。那么什么是组件呢？组件定义的是界面上一个区域的UI及UI的交互行为，关注点是UI。现在让我们回头来看看上面静态路由的例子，是不是感觉到什么奇怪的地方呢？虽然Route形式上是React组件，但它其实与UI无任何关系，它只是披着React组件的外衣，提供了一条路由配置项而已。我们也可以从Route源码中看出这一点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Route = createReactClass({
  // 省略无关代码

  /* istanbul ignore next: sanity check */
  render() {
    invariant(
      false,
      '<Route> elements are for router configuration only and should not be rendered'
    )
  }

})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>const Route = createReactClass({
  // 省略无关代码

  /* istanbul ignore next: sanity<span class="hljs-built_in"> check </span>*/
  render() {
    invariant(
      false,
      '&lt;Route&gt; elements are for router configuration only<span class="hljs-built_in"> and </span>should<span class="hljs-built_in"> not </span>be rendered'
    )
  }

})
</code></pre>
<p>Route的render方法中，没有做任何UI渲染相关的工作，这确实不是一个正宗的React组件。当然你也可以用React Router的另一种配置路由的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routes = {
  path: '/',
  component: App,
  childRoutes: [
    {
      path: 'about',
        component: About,
    },
    {
      path: 'contact',
        component: Contact,
    },
    // ...
  ]
}

<Router history={browserHistory} routes={routes} />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>const routes = {
  path: <span class="hljs-string">'/'</span>,
  componen<span class="hljs-variable">t:</span> App,
  childRoute<span class="hljs-variable">s:</span> [
    {
      path: <span class="hljs-string">'about'</span>,
        componen<span class="hljs-variable">t:</span> About,
    },
    {
      path: <span class="hljs-string">'contact'</span>,
        componen<span class="hljs-variable">t:</span> Contact,
    },
    // ...
  ]
}

&lt;Router <span class="hljs-keyword">history</span>={browserHistory} routes={routes} /&gt;
</code></pre>
<p>现在你又可以理直气壮的说，我没有使用Route这个伪组件了，这次和React的设计思想没有冲突了吧？好吧，让我们再来看看其他部分。React Router v3提供了很多类似生命周期方法的API，例如onEnter, onUpdate, and onLeave ，用来为处于不同阶段的路由提供钩子方法。但是，请不要忘了，React组件本身已经有一套很完善的生命周期方法了，如果一个Route就是一个组件，那么我们完全可以直接利用组件的生命周期方法，来作为路由不同阶段的钩子方法。例如，我们可以使用componentDidMount 或 componentWillMount替代onEnter，使用 componentDidUpdate或 componentWillUpdate 替代onUpdate，使用componentWillUnmount替代onLeave。</p>
<p>React Router v2、v3的问题，是在React组件思想之外，设计了一套API，是一种侵入式的设计。React Router的作者意识到了这个问题，所以在v4中，对React Router 进行了重写，将Route作为普通React组件看待，每个Route也负责UI的渲染工作，让React Router在React的大框架下运转。我们用v4版本实现上面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<BrowserRouter>
  <div>
    <Route path='/' component={App} />
    <Route path={'/about'} component={About} />
    <Route path={'/contact'} component={Contact} />
  </div>
</BrowserRouter>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">BrowserRouter</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{App}</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">{</span>'/<span class="hljs-attr">about</span>'} <span class="hljs-attr">component</span>=<span class="hljs-string">{About}</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">{</span>'/<span class="hljs-attr">contact</span>'} <span class="hljs-attr">component</span>=<span class="hljs-string">{Contact}</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span>
</code></pre>
<p>但从表面上看，并不能很直观地看出Route工作机制的变化。这里做一简单说明：Route的作用不是提供路由配置，而是一个普通的UI组件，不管请求的路径是什么，Route组件总是会被渲染，只不过在Route内部会判断请求路径是否与当前的path匹配，如果匹配，就会把Route component属性指向的组件作为子组件渲染出来，如果不匹配，会渲染一个null。可以从新版Route 的render方法源码中印证这个流程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Route extends React.Component {
  //...省略无关代码
  
  render() {
    const { match } = this.state
    const { children, component, render } = this.props
    const { history, route, staticContext } = this.context.router
    const location = this.props.location || route.location
    const props = { match, location, history, staticContext }

    return (
      component ? ( // component prop gets first priority, only called if there's a match
        match ? React.createElement(component, props) : null
      ) : render ? ( // render prop is next, only called if there's a match
        match ? render(props) : null
      ) : children ? ( // children come last, always called
        typeof children === 'function' ? (
          children(props)
        ) : !Array.isArray(children) || children.length ? ( // Preact defaults to empty children array
          React.Children.only(children)
        ) : (
          null
        )
      ) : (
        null
      )
    )
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Route</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">//...省略无关代码</span>
  
  render() {
    const { <span class="hljs-keyword">match</span> } = <span class="hljs-keyword">this</span>.state
    const { children, component, render } = <span class="hljs-keyword">this</span>.props
    const { history, route, staticContext } = <span class="hljs-keyword">this</span>.context.router
    const location = <span class="hljs-keyword">this</span>.props.location || route.location
    const props = { <span class="hljs-keyword">match</span>, location, history, staticContext }

    <span class="hljs-keyword">return</span> (
      component ? ( <span class="hljs-comment">// component prop gets first priority, only called if there's a match</span>
        <span class="hljs-keyword">match</span> ? <span class="hljs-type">React</span>.createElement(component, props) : <span class="hljs-literal">null</span>
      ) : render ? ( <span class="hljs-comment">// render prop is next, only called if there's a match</span>
        <span class="hljs-keyword">match</span> ? render(props) : <span class="hljs-literal">null</span>
      ) : children ? ( <span class="hljs-comment">// children come last, always called</span>
        typeof children === <span class="hljs-symbol">'functio</span>n' ? (
          children(props)
        ) : !<span class="hljs-type">Array</span>.isArray(children) || children.length ? ( <span class="hljs-comment">// Preact defaults to empty children array</span>
          <span class="hljs-type">React</span>.<span class="hljs-type">Children</span>.only(children)
        ) : (
          <span class="hljs-literal">null</span>
        )
      ) : (
        <span class="hljs-literal">null</span>
      )
    )
  }
}
</code></pre>
<p>这种模式的路由就是动态路由。可见，动态路由发挥作用的时间是在组件渲染时，而不是通过提前配置的方式，在应用刚收到请求时，就已经知道该渲染哪些组件了。</p>
<p>从上面的分析，可以得出动态路由的一个优点是，它会同时负责UI的渲染工作，而不是单纯的路由配置工作。此外，动态路由的另外一个优点是，你可以在任意时间、任意地点自由添加新的Route。例如，在上面的例子中，我想在About组件内定义两个新的路由，可以这么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<BrowserRouter>
  <div>
    <Route path='/' component={App} />
    <Route path={'/about'} component={About} />
    <Route path={'/contact'} component={Contact} />
  </div>
</BrowserRouter>

const About = (props) => (
  <div>
    <Route path={`${props.match.url}/a`} component={AboutA} />
    <Route path={`${props.match.url}/b`} component={AboutB} />
  </div>
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">BrowserRouter</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{App}</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">{</span>'/<span class="hljs-attr">about</span>'} <span class="hljs-attr">component</span>=<span class="hljs-string">{About}</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">{</span>'/<span class="hljs-attr">contact</span>'} <span class="hljs-attr">component</span>=<span class="hljs-string">{Contact}</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span>

const About = (props) =&gt; (
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">{</span>`${<span class="hljs-attr">props.match.url</span>}/<span class="hljs-attr">a</span>`} <span class="hljs-attr">component</span>=<span class="hljs-string">{AboutA}</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">{</span>`${<span class="hljs-attr">props.match.url</span>}/<span class="hljs-attr">b</span>`} <span class="hljs-attr">component</span>=<span class="hljs-string">{AboutB}</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
)
</code></pre>
<p>这样，当访问 /about/a 时，组件AboutA 会被作为About的子组件渲染，当访问 /about/b 时，组件AboutB 会作为About的子组件渲染。而且，/about/a 和 /about/b 我们是直接定义到 About 组件内的，并不需要像静态路由那样做集中配置，充分体现了动态路由的灵活性。</p>
<p>总结一下，虽然React Router v4 重构了路由使用的思想，但却和React的设计思想更加切合，个人认为是一个巨大的进步。使用React Router v4 时，你需要忘掉以前使用静态路由的思维方式，把路由当成普通组件看待，习惯了这个思维转变后，你就会发现React Router v4的魅力所在了。</p>
<hr>
<p><strong>欢迎关注我的公众号：老干部的大前端，领取21本大前端精选书籍！</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV4lGT?w=540&amp;h=193" src="https://static.alili.tech/img/bV4lGT?w=540&amp;h=193" alt="3808299627-5a93ba468b59a" title="3808299627-5a93ba468b59a" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
聊聊 React Router v4 的设计思想

## 原文链接
[https://segmentfault.com/a/1190000010526243](https://segmentfault.com/a/1190000010526243)


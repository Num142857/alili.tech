---
title: 'React.js 最佳实践（2016）_链接修正版' 
date: 2019-02-12 2:30:12
hidden: true
slug: nuu192oo477
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>译者按：最近React(web/native)依旧如火如荼,相信大家都跃跃欲试,我们团队也开始在React领域有所尝试. 2016年应该是<br>React 逐渐走向成熟的一年,让我们一起来看看国外的开发者们都总结了哪些"最佳实践".</p></blockquote>
<p>2015年 React 在全世界都有很多关于新的更新和开发者大会的讨论.关于去年的重要事件,请参考 React in 2015.<br>那么,2016年最有趣的问题来了:我们应该如何开发一个 App, 有什么推荐的库?<br>作为一名长期使用 React.js 的开发者,我对此问题有自己的答案和最佳实践,但你可能不一定完全同意.我对你的想法和观点很有兴趣,请留言以便讨论.</p>
<p><span class="img-wrap"><img data-src="/img/bVtO4t?w=600&amp;h=167" src="https://static.alili.tech/img/bVtO4t?w=600&amp;h=167" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如果你刚刚开始接触React.js,可以查看我们的 <a href="https://blog.risingstack.com/the-react-way-getting-started-tutorial/" rel="nofollow noreferrer" target="_blank">React.js 教程</a>,或者 Pete Hunt 的 <a href="https://github.com/petehunt/react-howto" rel="nofollow noreferrer" target="_blank">React howto</a>.</p>
<h1 id="articleHeader0">数据处理</h1>
<p>在 React.js 应用中处理数据非常简单,但也充满挑战.<br>这是因为你可以使用多种方式将属性数据传递给 React 组件,从而构建出渲染树,但你应该怎样更新视图却不是显而易见的.<br>2015一开始便诞生了很多不同 Flux 库,随后涌现出出更多具有更强功能和更加响应式解决方案.<br>让我们一起来看看：</p>
<h2 id="articleHeader1">Flux</h2>
<p>根据我们的经验,Flux 经常被过度使用,(就是大家总是在不需要它的时候仍然用了它).<br>Flux 提供了一种非常清晰的方式来存储和更新App 全局 state(译者注：对应 react 中的 state),并在需要的时候触发渲染.<br>Flux 在管理App的全局状态时很有用,比如：管理已登录用户状态,路由状态,或者是活跃账号状态,但若是用来管理临时数据或者本地数据,立刻就会变得很痛苦.<br>我们不推荐使用 Flux 来管理路由相关的数据,比如 /items/:itemId.获取路由数据并存储在组件的 state 之中.这种情况下,它会在组件销毁时一起被销毁.<br>如果你想了解更多关于 Flux 的信息,建议阅读 <a href="https://medium.com/@dan_abramov/the-evolution-of-flux-frameworks-6c16ad26bb31#.90lamiv5l" rel="nofollow noreferrer" target="_blank">The Evolution of Flux Frameworks</a>.</p>
<h2 id="articleHeader2">使用 Redux</h2>
<p>Redux 是一个 JavaScript App的可预测 state 容器.<br>如果你觉得需要 Flux 或者相似的解决方案,你应该了解一下 redux,并学习 <a href="https://twitter.com/dan_abramov" rel="nofollow noreferrer" target="_blank">Dan Abramov</a> 的 <a href="https://egghead.io/series/getting-started-with-redux" rel="nofollow noreferrer" target="_blank">Getting started with redux</a>,这能够迅速提高你的开发技能.<br>Redux 延续并改进了 Flux 的思想,学习了 Elm ,避开了 Flux 的复杂度(译者注：<a href="http://elm-lang.org/" rel="nofollow noreferrer" target="_blank">Elm</a> 是一门函数式编程语言).</p>
<p><strong>1.扁平化 state</strong></p>
<p>API 经常会返回嵌套的资源.这在 Flux 或基于 Redux 的架构中处理起来会非常困难.我们推荐使用 <a href="https://github.com/gaearon/normalizr" rel="nofollow noreferrer" target="_blank">normalizr</a> 这类库将数据进行扁平化处理,尽可能地扁平化state.<br>像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const data = normalize(response, arrayOf(schema.user))
state = _.merge(state, data.entities)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const data = normalize(response, arrayOf(schema.<span class="hljs-keyword">user</span>))
<span class="hljs-keyword">state</span> = _.merge(<span class="hljs-keyword">state</span>, data.entities)
</code></pre>
<p>(我们使用<a href="https://www.npmjs.com/package/isomorphic-fetch" rel="nofollow noreferrer" target="_blank">isomorphic-fetch</a>与API进行通信)</p>
<p><strong>2.使用 immutable state</strong></p>
<p>共享的可变性 state 是罪恶的根源. - Pete Hunt, React.js Conf 2015<br><span class="img-wrap"><img data-src="/img/bVtO56?w=629&amp;h=187" src="https://static.alili.tech/img/bVtO56?w=629&amp;h=187" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><a href="https://en.wikipedia.org/wiki/Immutable_object" rel="nofollow noreferrer" target="_blank">不可变对象</a>是指在创建后不可再被修改的对象.<br>不可变对象可以让我们免于痛苦,并且通过引用级的比对检查来提升渲染性能.比如在 shouldComponentUpdate 中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="shouldComponentUpdate(nexProps) {
 // 不进行对象的深度对比
 return this.props.immutableFoo !== nexProps.immutableFoo
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">shouldComponentUpdate</span><span class="hljs-params">(nexProps)</span></span> {
 <span class="hljs-comment">// 不进行对象的深度对比</span>
 return this<span class="hljs-selector-class">.props</span><span class="hljs-selector-class">.immutableFoo</span> !== nexProps<span class="hljs-selector-class">.immutableFoo</span>
}
</code></pre>
<p><strong>3. 如何在JavaScript中实现不可变?</strong></p>
<p>本办法是小心的写代码,示例代码如下,你需要在单元测试中通过 <a href="https://www.npmjs.com/package/deep-freeze-node" rel="nofollow noreferrer" target="_blank">deep-freeze-node</a> 来反复验证.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return {  
  ...state,
  foo
}

return arr1.concat(arr2)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>return {  
  ...<span class="hljs-keyword">state</span>,
  foo
}

return arr1.concat(arr2)
</code></pre>
<p>相信我,这是最明显的例子了.<br>更简单也更自然的方式是使用 Immutable.js.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { fromJS } from 'immutable'

const state = fromJS({ bar: 'biz' })  
const newState = foo.set('bar', 'baz') 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import { <span class="hljs-keyword">from</span>JS } <span class="hljs-keyword">from</span> 'immutable'

const <span class="hljs-keyword">state</span> = <span class="hljs-keyword">from</span>JS({ bar: 'biz' })  
const newState = foo.<span class="hljs-built_in">set</span>('bar', 'baz') 
</code></pre>
<p>Immutable.js 非常之快,背后理念也非常美妙.哪怕你并不准备使用它,我也推荐阅读这个由 <a href="https://twitter.com/leeb" rel="nofollow noreferrer" target="_blank">Lee Byron</a> 所制作的视频 <a href="https://www.youtube.com/watch?v=I7IdS-PbEgI" rel="nofollow noreferrer" target="_blank">Immutable Data and React</a>.它非常深刻的讲解了 Immutable.js 的工作原理.</p>
<p><strong>4. Observables and Reactive 解决方案</strong></p>
<p>如果你不喜欢 Flux/Redux 或者只是想要更加 reactive,不用失望!还有很多数据处理的方案供你选择,这里有一个可能是你想要的库的简单列表：</p>
<ul>
<li><p>cycle.js(“一个更清晰简洁的函数式 reactive JavaScript 框架”)</p></li>
<li><p>rx-flux(“Flux 架构与 Rxjs 的结合”)</p></li>
<li><p>redux-rx(“Redux的 Rxjs 工具集”)</p></li>
<li><p>mobservable(“可预测的数据,reactive的功能,简洁的代码”)</p></li>
</ul>
<h1 id="articleHeader3">路由</h1>
<p>几乎所有 App 都有路由功能.如果你在浏览器中使用 React.js,你将会在挑选库的时候遇到选择性问题.<br>我们的选择是react-router, 来自优秀的 rackt 社区.Racket 给 React.js 爱好者们带来了很多高质量资源.<br>要使用 react-router,请查看它的文档.但更重要的是：如果你使用Flux/Redux,我们推荐你将路由 state 与 store 或全局 state 保持同步.<br>同步的路由 state 会帮助你控制 Flux/Redux Actions 的路由行为,并能在组件中读取路由状态和参数.<br>Redux 用户可以通过 <a href="https://github.com/rackt/redux-simple-router" rel="nofollow noreferrer" target="_blank">redux-simple-router</a> 这个库轻松实现它.</p>
<h2 id="articleHeader4">代码分割,惰性加载</h2>
<p>只有一小部分 webpack 用户知 App 代码可以分割成多个 JavaScript 块.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require.ensure([], () => {  
  const Profile = require('./Profile.js')
  this.setState({
    currentComponent: Profile
  })
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {  
  const Profile = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./Profile.js'</span>)
  <span class="hljs-keyword">this</span>.setState({
    currentComponent: Profile
  })
})
</code></pre>
<p>这对于大型应用十分有用,每次部署之后用户浏览器不用下载那些很少会使用到的代码,比如Profile页面. 更多代码块将导致更多 HTTP 请求 - 但是使用 HTTP/2 多路复用就没有问题.<br>结合 <a href="https://christianalfoni.github.io/react-webpack-cookbook/Optimizing-caching.html" rel="nofollow noreferrer" target="_blank">chunk hashing</a>,可以在代码更新之后优化缓存命中率.<br>下个版本的 react-router 将会对代码分隔做更多支持.<br>对于 react-router 的未来规划,可以去查看博客 <a href="https://twitter.com/ryanflorence" rel="nofollow noreferrer" target="_blank">Ryan Florence</a>: <a href="https://medium.com/@ryanflorence/welcome-to-future-of-web-application-delivery-9750b7564d9f#.vuf3e1nqi" rel="nofollow noreferrer" target="_blank">Welcome to Future of Web Application Delivery</a>.</p>
<h1 id="articleHeader5">组件</h1>
<p>很多人都在抱怨JSX,但首先要知道,它在 React 中是可选的.<br>JSX 在最后都会通过 Babel 被编译成 JavaScript.你可以直接编写 JavaScript 来替代 JSX,但是在处理 HTML 的时候使用 JSX 会感觉更加自然.<br>特别是对于不懂技术的人来说,他们只可以理解和修改必要的部分.</p>
<p>JSX 是一种与 XML 类似的 JavaScript 语法扩展.你可以通过一个简单的 JSX 语法转换器来转换它.— <a href="https://facebook.github.io/react/docs/jsx-in-depth.html" rel="nofollow noreferrer" target="_blank">JSX in depth</a></p>
<p>如果你想了解更多 JSX 的内容,查看文章 <a href="https://medium.com/javascript-scene/jsx-looks-like-an-abomination-1c1ec351a918#.ca28nvee6" rel="nofollow noreferrer" target="_blank">JSX Looks Like An Abomination – But it’s Good for You</a></p>
<h2 id="articleHeader6">使用 Classes</h2>
<p>React 与 ES2015 的 Class 语法搭配的很好.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class HelloMessage extends React.Component {  
  render() {
    return
Hello {this.props.name}
} }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloMessage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{  
  render() {
    <span class="hljs-keyword">return</span>
<span class="hljs-type">Hello</span> {<span class="hljs-keyword">this</span>.props.name}
} }
</code></pre>
<p>相对于mixins,我们更喜欢<a href="http://jamesknelson.com/structuring-react-applications-higher-order-components/" rel="nofollow noreferrer" target="_blank">高阶组件</a>,所以保留 createClass 更像是一个语法问题,而不是技术问题. 我们认为使用 createClass 或者 React.Component 只是选择不同而已,没有对错之分.</p>
<h2 id="articleHeader7">属性类型</h2>
<p>如果你仍然没有检查 熟悉类型,那么你应该从2016年开始做起,这将为你节省大量的时间,相信我.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyComponent.propTypes = {  
  isLoading: PropTypes.bool.isRequired,
  items: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      name: PropTypes.string.isRequired,
    })
  ).isRequired
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>MyComponent<span class="hljs-selector-class">.propTypes</span> = {  
  isLoading: PropTypes<span class="hljs-selector-class">.bool</span><span class="hljs-selector-class">.isRequired</span>,
  items: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      name: PropTypes<span class="hljs-selector-class">.string</span><span class="hljs-selector-class">.isRequired</span>,
    })
  )<span class="hljs-selector-class">.isRequired</span>
}
</code></pre>
<p>当然,也可以使用 <a href="https://www.npmjs.com/package/react-immutable-proptypes" rel="nofollow noreferrer" target="_blank">react-immutable-proptypes</a> 验证 Immutable.js 所编写的属性.</p>
<h1 id="articleHeader8">高阶组件</h1>
<p>当前 mixins 将死,而且在 ES6 的 Class 不再支持 mixins,我们应当寻找新方案.</p>
<h2 id="articleHeader9">什么是高阶组件？</h2>
<p>PassData({ foo: 'bar' })(MyComponent)<br>简单来讲,从由原始组件创造一个新的组件并且扩展它的行为.你可以在多种场景来使用它,比如鉴权：requireAuth({ role: 'admin' })(MyComponent)(检查用户权限,如果未登录就跳转),或者将组件与 Flux/Redux 的 store 连通.<br>在 RisingStack,我们也喜欢将数据拉取和控制类的逻辑分离到高阶组件中,以尽可能地保持 view 层的简单.</p>
<h1 id="articleHeader10">测试</h1>
<p>保证测试的高代码覆盖率是开发周期中的重要一环.幸运的是,React.js 社区有很多这样的库来帮助我们.</p>
<h2 id="articleHeader11">组件测试</h2>
<p>AirBnb 的 <a href="https://github.com/airbnb/enzyme" rel="nofollow noreferrer" target="_blank">enzyme</a> 是我们最喜爱的组件测试库之一.使用它的浅渲染特性可以对组件的逻辑和渲染结果进行测试,非常神奇.它现在还不能替代selenium测试,但是将前端测试提升到了一个新高度.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="it('simulates click events', () => {  
  const onButtonClick = sinon.spy()
  const wrapper = shallow(
    
  )
  wrapper.find('button').simulate('click')
  expect(onButtonClick.calledOnce).to.be.true
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>it('simulates click events', () =&gt; {  
  const onButtonClick = sinon.spy()
  const wrapper = shallow(
    
  )
  wrapper.find('button').simulate('click')
  expect(<span class="hljs-name">onButtonClick</span>.calledOnce).to.be.true
})
</code></pre>
<p>看起来非常简洁,不是吗？<br>你使用 chai 作为测试断言库嘛？相信你会喜欢 <a href="https://github.com/producthunt/chai-enzyme" rel="nofollow noreferrer" target="_blank">chai-enyzime</a> 的!</p>
<h2 id="articleHeader12">Redux测试</h2>
<p>测试 reducer 非常简单,它响应新到来的 actions 然后将原来的 state 转换为新的 state：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="it('should set token', () => {  
  const nextState = reducer(undefined, {
    type: USER_SET_TOKEN,
    token: 'my-token'
  })

  // immutable.js state output
  expect(nextState.toJS()).to.be.eql({
    token: 'my-token'
  })
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>it('should set token', () =&gt; {  
  const nextState = reducer(<span class="hljs-name">undefined</span>, {
    type: USER_SET_TOKEN,
    token: 'my-token'
  })

  // immutable.js state output
  expect(<span class="hljs-name">nextState</span>.toJS()).to.be.eql({
    token: 'my-token'
  })
})
</code></pre>
<p>测试 actions 也很简单,但是异步 actions 就不太一样了.对于测试异步的 actions 来说,我们推荐使用 <a href="https://www.npmjs.com/package/redux-mock-store" rel="nofollow noreferrer" target="_blank">redux-mock-store</a>,非常有帮助.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="it('should dispatch action', (done) => {  
  const getState = {}
  const action = { type: 'ADD_TODO' }
  const expectedActions = [action]

  const store = mockStore(getState, expectedActions, done)
  store.dispatch(action)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>it('should dispatch action', (<span class="hljs-name">done</span>) =&gt; {  
  const getState = {}
  const action = { type: 'ADD_TODO' }
  const expectedActions = [action]

  const store = mockStore(<span class="hljs-name">getState</span>, expectedActions, done)
  store.dispatch(<span class="hljs-name">action</span>)
})
</code></pre>
<p>关于更深入的 <a href="http://rackt.org/redux/docs/recipes/WritingTests.html" rel="nofollow noreferrer" target="_blank">redux测试</a> ,请参考官方文档.</p>
<h1 id="articleHeader13">使用 npm</h1>
<p>虽然 React.js 并不依赖代码打包工具就可以工作得很好,但我们还是推荐使用 Webpack 或者 Browserify 来发挥 npm 的能力.Npm 有很多 React.js 的包,可以帮助你优雅地管理依赖.<br>(请不要忘记复用你自己的组件,这是优化代码的绝佳方式.)</p>
<h2 id="articleHeader14">Bundle 大小</h2>
<p>这本身不是一个 React 相关的问题,但是大多数人都在打包他们的 React 应用,所以我有必要在这里提一下.<br>当你打包源代码的时候,要时刻警惕打包后文件的大小.想要将其控制在最小体积,你需要思考如何如何 require/import 依赖.<br>查看下面的代码片段,这两种方式可以对输出大小会产生重大影响：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { concat, sortBy, map, sample } from 'lodash'

// vs.
import concat from 'lodash/concat';  
import sortBy from 'lodash/sortBy';  
import map from 'lodash/map';  
import sample from 'lodash/sample';  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> { concat, sortBy, map, sample } <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>

<span class="hljs-comment">// vs.</span>
<span class="hljs-keyword">import</span> concat <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash/concat'</span>;  
<span class="hljs-keyword">import</span> sortBy <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash/sortBy'</span>;  
<span class="hljs-keyword">import</span> map <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash/map'</span>;  
<span class="hljs-keyword">import</span> sample <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash/sample'</span>;  
</code></pre>
<p>查看<a href="https://lacke.mn/reduce-your-bundle-js-file-size/" rel="nofollow noreferrer" target="_blank">Reduce Your bundle.js File Size By Doing This One Thing</a>,以获取更多信息.<br>我们也喜欢将代码分离到至少 vendors.js 和 app.js 两个文件,因为 vendors 相对于我们的代码库来说更新频率低很多.<br>对输出文件进行 hash 命名(WebPack中的chunk hash),并使用长缓存,我们可以显著地减少访问用户需要下载的代码.结合代码懒加载,优化效果非常显著.<br>如果你还不太熟悉 Webpack,可以查看这本优秀的 <a href="https://christianalfoni.github.io/react-webpack-cookbook" rel="nofollow noreferrer" target="_blank">React webpack cookbook</a>.</p>
<h2 id="articleHeader15">组件级别的 hot reload</h2>
<p>如果你曾使用过hot reload编写单页面应用,当你在处理某些与状态相关的事情时,可能你就会明白当你在编辑器中点击保存,整个页面就重新加载了是多么令人讨厌.你需要逐步点击操作到刚才的环节,然后在这样的重复中奔溃.<br>通过 React,在重载组件的同时保持组件状态已经成为可能,从此不再痛苦!<br>关于如何搭建hot reload,可参考 <a href="https://github.com/gaearon/react-transform-boilerplate" rel="nofollow noreferrer" target="_blank">react-transform-boilerplate</a>.</p>
<h1 id="articleHeader16">使用ES2015</h1>
<p>前面有提到过,我们在 React.js 组件中使用 JSX,然后使用 Babel.js 进行编译.<br><span class="img-wrap"><img data-src="/img/bVtO6f?w=400&amp;h=277" src="https://static.alili.tech/img/bVtO6f?w=400&amp;h=277" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>Babel 的能力远不止这些,它也可以让我们现在就可以给浏览器编写 ES6/ES2015 代码.在RisingStack,我们在服务器端和客户端都使用了ES2015的特性,ES2015已经可以在最新的LTS Node.js版本中使用了.</p>
<h1 id="articleHeader17">代码检查</h1>
<p>或许你已经给你的 JavaScript 代码制定了代码规范,但是你知道也有用于 React 的代码规范了吗？我们建议你选择一个代码规范,然后照着它说的来做.<br>在 RisingStack,我们也将 linters 强制运行在 CI 系统上,git push 亦然.可以试试 pre-push 或者 pre-commit.<br>我们使用标准的 JavaScript 代码风格,并使用 <a href="https://www.npmjs.com/package/eslint-plugin-react" rel="nofollow noreferrer" target="_blank">eslint-plugin-react</a> 来检查React.js代码.<br>(是的,我们已经不再使用分号了)</p>
<h1 id="articleHeader18">GraphQL 和 Relay</h1>
<p>相对而言 GraphQL 和 Relay 还属于新技术,在 RisingStack,我们还没有在产品环境中使用它们,但保持关注.<br>我们写过一个 Relay 的 MongoDB ORM 库,叫做 graffiti,可以使用你已有的 mongoose models 来创建 GraphQL server.<br>如果你想要学习这些新技术,我们建议你可以找来玩一玩.</p>
<h1 id="articleHeader19">尽情享用这些 React.js 的最佳实践</h1>
<p>有些优秀的技术和库其实跟React都几乎没关系,但要关注社区的其他人都在做些什么.2015这一年,React社区被 <a href="https://github.com/evancz/elm-architecture-tutorial/" rel="nofollow noreferrer" target="_blank">Elm 架构</a>启发了很多.<br>如果你知道其它在2016年必要的 React.js 工具,请在下面给我们留言!</p>
<hr>
<blockquote>
<p>原文作者：Peter Marton，RisingStack技术总监<br>原文链接：<a href="https://blog.risingstack.com/react-js-best-practices-for-2016" rel="nofollow noreferrer" target="_blank">https://blog.risingstack.com/...</a><br>翻译自力谱宿云LeapCloud团队_UX组成员：Jason</p>
<p>关于MaxLeap<br>MaxLeap移动云服务平台为企业提供一站式的移动研发和运营云服务，帮助企业快速研发和上线移动应用，平台提供数据云存储，云引擎，支付管理，IM，数据分析和营销自动化等服务。<br>MaxLeap官网链接： <a href="https://maxleap.cn" rel="nofollow noreferrer" target="_blank">https://maxleap.cn</a><br>欢迎关注微信公众号：MaxLeap_yidongyanfa</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React.js 最佳实践（2016）_链接修正版

## 原文链接
[https://segmentfault.com/a/1190000004685622](https://segmentfault.com/a/1190000004685622)


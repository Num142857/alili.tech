---
title: '追溯 React Hot Loader 的实现' 
date: 2018-12-11 2:30:10
hidden: true
slug: xrnp7inbr1n
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>文：萝卜（沪江金融前端开发工程师）<p>本文原创，转载请注明作者及出处</p>
</blockquote>
<p>如果你使用 React ，你可以在各个工程里面看到 <a href="https://github.com/gaearon?tab=repositories" rel="nofollow noreferrer" target="_blank">Dan Abramov</a> 的身影。他于 2015 年加入 facebook，是 React Hot Loader 、React Transform、redux-thunk、redux-devtools 等等的开发者。同样也是 React、Redux、Create-React-App 的联合开发者。从他的签名 <em>Building tools for humans.</em> 或许表明了他想打造高效的开发环境以及调试过程。</p>
<p>作为 Dan 的小迷妹，如他说 <em>is curious where the magic comes from</em>。这篇文章会带你们去了解 React Hot Loader 的由来，它实现的原理，以及在实现中遇到的问题对应的解决方法。也许你认为这篇文章太过于底层，对日常的业务并没有帮助，但希望你和我一样能通过了解一个实现得到乐趣，以及收获一些思路。</p>
<h2 id="articleHeader0">首先，React Hot Loader 的产生</h2>
<p>Dan 在自己的文章里面说到。React Hot Loader 起源一个来自 <a href="https://stackoverflow.com/questions/24581873/what-exactly-is-hot-module-replacement-in-webpack" rel="nofollow noreferrer" target="_blank">stackoverflow 上的一个问题</a> ——  <strong>what exactly is hot module replacement in webpack</strong>，这个问题解释了 webpack 的 hot module replacement（下面简称 HMR）到底是什么，以及我们可以利用它做什么，Dan 当时想到也 React 可以和 webpack hot module 以一种有趣的方式结合在一起。</p>
<p>于是他在 Twitter 上录制了一个简单的视频（请看下面），事实上视频中的实现依赖于它在 React 源代码里面插入了很多自己的全局变量。他本没指望到这个视频能带来多大的关注，但结果是他收到了很多点赞，并且粉丝狂增，他意识到必须以一个真正的工程去实现。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013571765?w=300&amp;h=148" src="https://static.alili.tech/img/remote/1460000013571765?w=300&amp;h=148" alt="上传大小有限制= =" title="上传大小有限制= =" style="cursor: pointer;"></span></p>
<p><a href="https://cdn-images-1.medium.com/max/400/1" rel="nofollow noreferrer" target="_blank">大图请戳</a></p>
<h2 id="articleHeader1">初步尝试,  直接使用 HMR</h2>
<p>HMR 是属于 webpack 范畴内的实现，你可以在 <a href="https://webpack.js.org/api/hot-module-replacement/" rel="nofollow noreferrer" target="_blank">webpack 的官方文档</a> 看到如何开启它以及它提供的接口。如果你有印象，你会记得使用它需要<br> 在 webpack config 或者 webpack-dev-server cli 里面指定开启 hot reloading 模式，并且在你的代码里写上 <code>module.hot.accept(xxx)</code>。但 HMR 到底是什么？我们可以用一句话总结：当一个 import 进来的模块发生了变化，HMR 提供了一个接口让我们使用 callback 回调去做一些事情。</p>
<p>一个使用 HMR 实现自动刷新的 React App 像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js

var App = require('./App')
var React = require('react')
var ReactDOM = require('react-dom')

// 像通常一样 render Root Element
var rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl)

// 我们是不是在 dev 环境 ？
if (module.hot) {
  // 当 App.js 更新了
  module.hot.accept('./App', function () {
    // require 进来更新的 App.js 重新render
    var NextApp = require('./App')
    ReactDOM.render(<NextApp />, rootEl)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// index.js</span>

<span class="hljs-keyword">var</span> App = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./App'</span>)
<span class="hljs-keyword">var</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react'</span>)
<span class="hljs-keyword">var</span> ReactDOM = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-dom'</span>)

<span class="hljs-comment">// 像通常一样 render Root Element</span>
<span class="hljs-keyword">var</span> rootEl = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>, rootEl)

// 我们是不是在 dev 环境 ？
if (module.hot) {
  // 当 App.js 更新了
  module.hot.accept('./App', function () {
    // require 进来更新的 App.js 重新render
    var NextApp = require('./App')
    ReactDOM.render(<span class="hljs-tag">&lt;<span class="hljs-name">NextApp</span> /&gt;</span>, rootEl)
  })
}</span></code></pre>
<p><strong>请注意，这个实现没有使用 React Hot Loader 或者 React Transform 或者任何其他的，这仅仅是 webpack 的HMR 的 api</strong>。而这里的 callback 回调函数当然是 re-render 我们的 app。</p>
<p>得益于 HMR API 的设计，在嵌套的组件也能实现更新。如果一个模块没有指明如何去更新自己，那么引入这个模块的另一个模块也会被包含在热更新的 bundle 里，这些更新会”冒泡“，直到某个 import 它们的模块 "接收" 更新。如果有些模块最终没有被"接受"，那么热更新失败，控制台会打印出警告。为了“接受”更新，你只需要调用 <code>module.hot.accept('./name', callback) </code> 。</p>
<p>因为我们在 index.js 里的接受了 App.js 的更新 ，这使得我们隐性的接受了所有从 App.js 引入的所有模块（component）的更新。打个比方，假如我编辑了 Button.js 组件，而它被 UserProfile.js 以及 Navbar.js import， 而这两个模块都被 App.js import 引入了。因为 index.js import 了 App.js，并且它包含了 <code>module.hot.accept('./App', callback)</code> ，Webpack 会自动产生一个包含以上所有文件的 “updated bundle”， 并且运行我们提供的 callback。</p>
<p>你以为 hot reloading 就到此为止了吗，当然远远不够 ? 。</p>
<h2 id="articleHeader2">问题：组件的 state 和 DOM 被销毁。</h2>
<p>当我们的 App.js 更新，实际上是有个新的 App.js 用 script 标签注入到 html， 并且重新执行了一次。此时新生成的 component 和之前的是一个组件的不同版本，它们是不同版本的同一个组件，但是 NextApp !== App。</p>
<p>如果你了解 React ，你会知道当下一个 component 的 type 和之前的不一样，它会 unmount 之前那个。这就是为什么 state 和 DOM 会被销毁。</p>
<p>在解决 state 保留的问题上，有人认为如果工程依赖一个单一的 state 树，那没有必要费大精力去保留组件自身的 state。因为在这种类型的 app 里面我们关注的更多的是全局的这个 state 树，而去保存这个全局的 state 树是很容易做到的，比如你可以把它保存到 localstorage里面，当 store 初始化的时候你去读取它，这样的话连刷新都不会丢失状态。</p>
<p>Dan 接受了这个意见，并且在自己的文章里面总结，如果你使用 redux ，并且主要的状态保存在 redux 的 store 上，这时也许你不需要使用 React-Hot-Loader。</p>
<p>但他并没有因为仅仅 <strong>有些人</strong> 可能不需要用到而放弃了 React-Hot-Loader。这才有了下文 ? 。</p>
<h2 id="articleHeader3">如何解决 state 和 DOM 销毁问题</h2>
<p>当你从上面了解了为什么 DOM 和 state 会丢失，也许你就会 和 Dan 一样想到了两种方法。</p>
<ol>
<li>找到一种方式把 React 的实例和 Dom nodes 以及 state 分离，创建一个新组件的新实例，然后用一种方式把它递归地和现有的 Dom 和 state 结合在一起。</li>
<li>另外一种，代理 component 的 type，这样能让 React 认为 type 没有变。事实上每次 hot update 实现引用的是新的 component type。</li>
</ol>
<p>第一种方式看上去好一点，但是 React 暂时没有提供可以分离（聚合）state 以及不销毁 DOM、不运行生命周期去替换一个实例。即使深入到使用 React 的私有 API 达到这个目的，采用第一个方案任然面临着一些细微的问题。</p>
<p>比如，React components 经常 在 componentDidmount 时候订阅 Flux stores 或者其他数据源。即使我们做到不销毁 Dom 以及 state， 偷偷地用一个新的实例替换旧的实例，旧的实例仍然会继续保持订阅，而新的实例将不会订阅。</p>
<p>结论是，如果 React 的 state  的订阅是申明式，并且独立于生命周期之外，或者 React 没有那么依赖 class 和 instance， 第一个方法才可行。这些也许会出现在以后的 React 版本里，但是现在并没有。</p>
<p>于是 Dan 采用了第二种，这也是之后的 React Hot Loader 和 React Transform  所使用的到技巧。</p>
<p>为此，Dan 建立了一个独立的工程（react-proxy）去做 proxy，你可以在<a href="https://github.com/gaearon/react-proxy" rel="nofollow noreferrer" target="_blank">这里</a> 看到它。create-proxy 只是一个底层的工程，它不依赖 wepback 也不依赖 babel。React Hot Loader 和 React Transform 依赖它，它把 React Component 包装到一个个 proxy 里面，这些 “proxy” 只是些 class， 它们表现的就像你自己的class，但是提供你一些钩子让你能对 class 注入新的实现方法，这样相当于让一个已经存在的实例表现的像新的 class，从而不会销毁 state 和 DOM。</p>
<h2 id="articleHeader4">在哪里 proxy ？</h2>
<p>Dan 首先所做的是在 wepback 的 loader 里面 proxy。</p>
<blockquote>补充，很多人认为 React Hot Loader 不是一个 “loader”，因为它只是实现 hot reloading 的。这是一个普遍的误解?。</blockquote>
<p>之所以叫 “loader” 是因为 webpack 是这么称呼它，而其他 bundlers（打包器）称呼为 “transform”。打个比方，json-loader 把JSON 文件 “transform” 成  javascript modules，style-loader 把 CSS 文件 “transform” 成 js code 然后把它们以 stylesheets 的形式注入。</p>
<p>而关于 React Hot Loader 你可以在<a href="https://github.com/gaearon/react-hot-loader/blob/7b0bc31d0a65eeae2742579e12ab10cf43df1af6/index.js#L26-L72" rel="nofollow noreferrer" target="_blank">这里</a> 看到，在编译的时候它通过 export 找到 component，并且“静默” 的包裹它，然后 export 一个代理的 component 取而代之原来的。</p>
<p>通过 module.exports 去寻找 components 开始听上去是合理的。开发者们经常把每个组件单独储存在一个文件，自然而然组件将会被exported。然而，随着时间变化，React 社区发生了一些变化，采取了一些新的写法或者思想，这导致了一些问题。</p>
<ul>
<li>随着高阶组件变得流行，大家开始 export 出来的是一个高阶组件，而不是实际上自己写的组件。 结果导致， React Hot Loader 没有“发现” module.export 里面包裹的组件，所以没有给它们创建 proxy。它们的 DOM 以及 local state 将会被在这些文件每次修改后销毁。这尤其影响像 <a href="https://github.com/jsstyles/react-jss" rel="nofollow noreferrer" target="_blank">React JSS</a> 一样利用高阶组件实现样式。</li>
<li>React 0.14 引进了函数式组件，并且鼓励在一个文件里面最小化拆分组件。即使React Hot Loader 能检测到导出的组件，它也“看”不到那些未被导出的本地的component。所以这些component 将不会包裹在proxy里面，所以会导致在它以及它下面的子树丢失 DOM 以及 state。</li>
</ul>
<p>这显然是使得从 <code>module.exports</code> 去找组件是不可靠的。</p>
<h2 id="articleHeader5">React Transform 的出现</h2>
<p>除了上面提到的从 <code>module.exports</code> 不可靠之外，第一版的 React-Hot-Loader 还存在一些其他的问题。比如 webpack 的依赖问题，Dan 想做的是一个通用的工具，而不仅限于 webpack，而现在的工具只是一个 webpack 的 loader。</p>
<p>虽然目前为止只有 webpack 实现了HMR， 但是一旦有其他的编译工具也实现了 HMR，那现有的 <code>loader</code> 如何集成到新的编译工具里面 ？</p>
<p>基于这些问题 Dan 曾经写过一篇 <a href="https://medium.com/@dan_abramov/the-death-of-react-hot-loader-765fa791d7c4" rel="nofollow noreferrer" target="_blank">React-Hot-Loader</a> 之死的文章，文章中提到虽然 React-Hot-Loader 得到了巨大的关注，并且有很多工程也采取了他的思想，他仍然认为这不是他所想要的。</p>
<p>此时  <code>Babel</code> 如浪潮一般突然占领了整个 javascript 世界。Dan 意识到可以采用静态分析的方法去找到这些 component，而 babel 正好很适合做这些。不仅如此，Dan 同样想做一个错误处理的方式，因为当 render() 方法报错的时候，此时组件会处于一种无效状态，而此时 hot reload 是没办法工作的，Dan 想一起 fix 掉这个问题。</p>
<p>把 component 包裹在一个 proxy 里或者把 component  render() 包裹在一个 try/catch 里，听上去都像 “一个函数接受一个component class 并且在它身上做些修改"。</p>
<p>那为什么不创造一个 Babel plugin 在你的基准代码里去定位 React Component 并且包裹它们，这样就可以进行随意的 transform。</p>
<h2 id="articleHeader6">React Transform 的实现</h2>
<p>如果你在 github 去搜 React Transform ，你可以搜到 gearaon ( dan 在github上的名字，也是唯一一个不使用真名的账号哦~) 几个工程。 这是因为在开始设定 Transform 实现的时候不确定哪些想法最终会有实质作用，所以他拆分了 React Transform 为以下 5 个子工程：</p>
<ul>
<li>React Proxy 实现了对 React Component 的底层代理的功能</li>
<li>React Transform HMR 为每一个传入的 component 创建了一个代理，并且在全局对象里面保持了一个代理的清单，当同一个组件再次经历 transform，它去更新这些 component</li>
<li>React Transform Catch Error 在 render() 方法外面包了一层t ry/catch, 当出现错误可以显示一个自己配置的组件。</li>
<li>Babel Plugin for React Transform 会在你的基准代码里找到所有的React component ，在编译的时候提取它们的信息，并且把它们包裹在你选择使用的 Transform 里（比如，React Transform HMR）</li>
<li>React Transform Boilerplate 是个模板，展示如何将这些技术组合在一起使用</li>
</ul>
<p>这种模块化带了好处，同时也带来了弊端，弊端就是使用者在不清楚原理的情况下，不知道这些工程到底如何关联起来使用。并且这里有太多的概念暴露给了使用者， “proxies”， “HMR”， “hot middleware”, “error catcher”,  这使得用户感到很迷惑。</p>
<h3 id="articleHeader7">问题：高阶组件还是存在问题</h3>
<p><em>当你解决了这些问题，尽量避免引入由解决它们带来的新的问题</em>。</p>
<p>还记得当年 React-Hot-Loader 在高阶组件上面束手无策吗，它没办法通过 <code>module.export</code> 导出的，包裹在高阶组件里面的组件。而 React Transform 通过静态检查这些组件的生命去“fix”这个问题，寻找继承自<br> React.Component 或者使用 React.createClass() 申明的 class。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// React Hot Loader 找不到它
// React Transform 找得到它
class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = { counter: 0 }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({
      counter: this.state.counter + 1
    })
  }
  render() {
    return (
      <div className={this.props.sheet.container} onClick={this.handleClick}>
        {this.state.counter}
      </div>
    )
  }
}

const styles = {
  container: { 
    backgroundColor: 'yellow'
  }
}

// React Hot Loader 找到到它
// React Transform 找不到它
export default useSheet(styles)(Counter)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>
<span class="hljs-comment">// React Hot Loader 找不到它</span>
<span class="hljs-comment">// React Transform 找得到它</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-title">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props)
    <span class="hljs-keyword">this</span>.state = { counter: <span class="hljs-number">0</span> }
    <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>)
  }
  handleClick() {
    <span class="hljs-keyword">this</span>.setState({
      counter: <span class="hljs-keyword">this</span>.state.counter + <span class="hljs-number">1</span>
    })
  }
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div className={<span class="hljs-keyword">this</span>.props.sheet.container} onClick={<span class="hljs-keyword">this</span>.handleClick}&gt;
        {<span class="hljs-keyword">this</span>.state.counter}
      &lt;/div&gt;
    )
  }
}

const styles = {
  container: { 
    backgroundColor: <span class="hljs-string">'yellow'</span>
  }
}

<span class="hljs-comment">// React Hot Loader 找到到它</span>
<span class="hljs-comment">// React Transform 找不到它</span>
export <span class="hljs-keyword">default</span> useSheet(styles)(Counter)
</code></pre>
<p>猜猜这里我们遗漏了什么？被导出的 components! 在这个例子中，React Transform 会保留 <em>Counter</em> 的 state ， hot reload 会改变<br><em>render()</em>  和 <em>handleClick()</em> 这些方法，但是任何对 <em>styles</em> 的改变不会体现，因为它不知道 <em>useSheet(styles)(Counter)</em> 正好 return 一个 React component， 这个组件也需要被 proxy。</p>
<p>很多人<a href="https://github.com/gaearon/babel-plugin-react-transform/issues/26" rel="nofollow noreferrer" target="_blank">发现了这个问题</a>，当他们注意到他们在 redux 里面 selectors 以及 action creators 不再会 hot reload。这是因为 React Transform 没有发现 <em>connect()</em> 返回一个组件，然后并没有一个简单的方法去识别。</p>
<h3 id="articleHeader8">问题：使用静态方法检查太过于入侵性</h3>
<p>找到通过继承自 <em>React.Component</em> 或者使 <em>React.createClass()</em> 创建的class <a href="https://github.com/gaearon/babel-plugin-react-transform/blob/19c714643faad916f3342f34171f8974589835e1/src/index.js#L4-L32" rel="nofollow noreferrer" target="_blank">不是很难</a> 。然而，它可能出错，你也不想 <a href="https://github.com/gaearon/babel-plugin-react-transform/issues/78" rel="nofollow noreferrer" target="_blank">带来误判</a>。</p>
<p>随着React 0.14的发布，这个任务变得更加艰难。任何 functions，如果<br> return 出来的是一个有效的 ReactElement 那就可能是一个组件。由于你不能肯定，所以你不得不采用探索法。比如说，你可在判断在顶级作用域的 function，如果是以驼峰命名，使用JSX, 并且接受不超过两个以上（props 和 context）参数，那它可能是个React component。这样会误判吗？是，可能会。</p>
<p>更糟糕的是，你必须让所有的 “transform” 去处理 classes 和 functions。如果React 在v16版本里面引进<a href="https://github.com/reactjs/react-future/blob/7ce26f52d53e5132238a4bfcbab821ad77e89d0c/04%20-%20Layout/prototype/index.js" rel="nofollow noreferrer" target="_blank">另外一种</a> 一种方式去声明组件呢，我们将要重写所有的transform吗？</p>
<p>最后得出结论，用静态方法 <em>包裹</em> 组件相当复杂。你将要对 functions 和 classes 可能的 export 方式取使用各种方法去处理，包括 default 和 named 的 exports，function声明，箭头函数，class声明，class表达式，createClass() 形式调用，以及等等。每种情况你都需要用一种方法针对相同的变量或者表达式去绑定不同的值。</p>
<p>想办法支持 functional components 是<a href="https://github.com/gaearon/babel-plugin-react-transform/issues/57" rel="nofollow noreferrer" target="_blank">最多的提议</a>， 我现在不会考虑在 React Transform 支持它，因为实现的复杂程度会给工程以及它的维护者带来巨大困难，并且可能由于一些边缘情况导致彻底的破坏。</p>
<h2 id="articleHeader9">React Hot Loader 3</h2>
<p>以上总结是出自 Dan 的一篇在medium上的<a href="https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf" rel="nofollow noreferrer" target="_blank">文章</a>，他称呼 React Hot Loader 是一个 Accidental Complexity，其中还提到它对 compile-to-js 语言 （其他通过编译转成JS的语言）的考虑，以及中途遇到的 babel 的问题等。文章中 Dan 表明他会在几个月内停止 React Transform 而使用一个新的工程代替，新的工程会解决大多数残留的问题，末尾给了一些提示在新工程里面需要做到的。在这篇文章的一个月后，React-Hot-Loader 3 release了，让我们大致的过一下 3 的到底做了些什么。</p>
<h3 id="articleHeader10">在调用的时候 proxy</h3>
<p>在源码中找到并且包裹React components是非常难做到的，并且有可能是破坏性的。这真的会破坏你的代码，但标记它们相对来说是比较安全。比如我们可以通过 babel-plugin 检查一个文件，针对顶层 class、function 以及 被 export 出来的模块在文件末尾做个标记:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = { counter: 0 }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({
      counter: this.state.counter + 1
    })
  }
  render() {
    return (
      <div className={this.props.sheet.container} onClick={this.handleClick}>
        {this.state.counter}
      </div>
    )
  }
}

const styles = {
  container: { 
    backgroundColor: 'yellow'
  }
}

const __exports_default = useSheet(styles)(Counter)
export default __exports_default

// 我们 generate 的标记代码：
// 在 *远端* 标记任何看上去像 React Component 的东西
register('Counter.js#Counter', Counter)
register('Counter.js#exports#default', __exports_default) // every export too" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props)
    <span class="hljs-keyword">this</span>.state = { counter: <span class="hljs-number">0</span> }
    <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>)
  }
  handleClick() {
    <span class="hljs-keyword">this</span>.setState({
      counter: <span class="hljs-keyword">this</span>.state.counter + <span class="hljs-number">1</span>
    })
  }
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div className={<span class="hljs-keyword">this</span>.props.sheet.container} onClick={<span class="hljs-keyword">this</span>.handleClick}&gt;
        {<span class="hljs-keyword">this</span>.state.counter}
      &lt;/div&gt;
    )
  }
}

const styles = {
  container: { 
    backgroundColor: <span class="hljs-symbol">'yello</span>w'
  }
}

const __exports_default = useSheet(styles)(<span class="hljs-type">Counter</span>)
export <span class="hljs-keyword">default</span> __exports_default

<span class="hljs-comment">// 我们 generate 的标记代码：</span>
<span class="hljs-comment">// 在 *远端* 标记任何看上去像 React Component 的东西</span>
register(<span class="hljs-symbol">'Counter</span>.js#<span class="hljs-type">Counter</span>', <span class="hljs-type">Counter</span>)
register(<span class="hljs-symbol">'Counter</span>.js#exports#<span class="hljs-keyword">default</span>', __exports_default) <span class="hljs-comment">// every export too</span></code></pre>
<p>register() 至少会判断传进来的值是不是一个函数，如果是，创建一个 React Proxy 包裹它。它不会替换你的 class 或者 function，这个proxy将会待在全局的map里面，等待着，直到你使用React.createElement()。</p>
<p>仅仅真正的组件才会经历 React.createElement，这就是我们为什么 monkeyPatch React.createElement()。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import createProxy from 'react-proxy'

let proxies = {}
const UNIQUE_ID_KEY = '__uniqueId'

export function register(uniqueId, type) {
  Object.defineProperty(type, UNIQUE_ID_KEY, {
    value: uniqueId,
    enumerable: false,
    configurable: false
  })
  
  let proxy = proxies[uniqueId]
  if (proxy) {
    proxy.update(type)
  } else {
    proxy = proxies[id] = createProxy(type)
  }
}

// Resolve 发生在 element 被创建的时候，而不是声明的时候
const realCreateElement = React.createElement
React.createElement = function createElement(type, ...args)  {
  if (type[UNIQUE_ID_KEY]) {
    type = proxies[type[UNIQUE_ID_KEY]].get()
  }
  
  return realCreateElement(type, ...args)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> createProxy <span class="hljs-keyword">from</span> <span class="hljs-string">'react-proxy'</span>

<span class="hljs-keyword">let</span> proxies = {}
<span class="hljs-keyword">const</span> UNIQUE_ID_KEY = <span class="hljs-string">'__uniqueId'</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">register</span>(<span class="hljs-params">uniqueId, <span class="hljs-keyword">type</span></span>) </span>{
  <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-keyword">type</span>, UNIQUE_ID_KEY, {
    value: uniqueId,
    enumerable: <span class="hljs-literal">false</span>,
    configurable: <span class="hljs-literal">false</span>
  })
  
  <span class="hljs-keyword">let</span> proxy = proxies[uniqueId]
  <span class="hljs-keyword">if</span> (proxy) {
    proxy.update(<span class="hljs-keyword">type</span>)
  } <span class="hljs-keyword">else</span> {
    proxy = proxies[id] = createProxy(<span class="hljs-keyword">type</span>)
  }
}

<span class="hljs-comment">// Resolve 发生在 element 被创建的时候，而不是声明的时候</span>
<span class="hljs-keyword">const</span> realCreateElement = React.createElement
React.createElement = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createElement</span>(<span class="hljs-params"><span class="hljs-keyword">type</span>, ...args</span>)  </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span>[UNIQUE_ID_KEY]) {
    <span class="hljs-keyword">type</span> = proxies[<span class="hljs-keyword">type</span>[UNIQUE_ID_KEY]].get()
  }
  
  <span class="hljs-keyword">return</span> realCreateElement(<span class="hljs-keyword">type</span>, ...args)
}</code></pre>
<p>在调用端包裹组件解决了很多问题，比如 functional component 不会误判，包裹的逻辑只要考虑 function 和 class，因为我们把生成的代码移到底部这样不会污染代码。</p>
<h3 id="articleHeader11">给 compile-to-js 语言提供了一种兼容方式</h3>
<p>Dan 提供了类似于 React-Hot-Loader 1 的 webpack loader， 即 <code>react-hot-loader/webpack</code>。在不使用 babel 做静态分析的情况下，你可以通过它找到 <code>module.export</code> 出来的 component，并且 register 到全局，然后在调用端实现真正的代理。所以这种方式只能针对<a href="https://github.com/gaearon/react-hot-loader#known-limitations" rel="nofollow noreferrer" target="_blank">实际 export 出来的组件做保留 state 以及 DOM 的 hot reloading</a>。</p>
<p>什么情况下会使用这种方式，那就是针对其他 compile-to-js 的语言比如  <a href="https://github.com/bhauman/lein-figwheel" rel="nofollow noreferrer" target="_blank">Figwheel</a> 和 <a href="https://github.com/elm-lang/elm-reactor" rel="nofollow noreferrer" target="_blank">Elm Reactor</a>。在这些语言里面有自己的类的实现等，所以 Babel 没有针对源码办法去做静态检查，所以必须在编译之后去处理。</p>
<h3 id="articleHeader12">错误处理</h3>
<p>还记得 React Transform 里面的React Transform Catch Error 吗。React-Hot-Loader 把处理 render 出错的逻辑放到 AppContainer 。因为 React V16 增加了 <a href="https://reactjs.org/docs/error-boundaries.html" rel="nofollow noreferrer" target="_blank">error boundaries </a>，相信在未来的版本 React-Hot-Loader 也会做相应调整。</p>
<h2 id="articleHeader13">写在最后</h2>
<p>这就是对 React-Hot-Loader 的实现的一个追溯，如果你真的理解了，那么你在配置 React-Hot-Loader 到你的应用代码里面的每个步骤会有一个重新的认识。我不确定大家是否读懂了，或者存在还存在什么疑问，欢迎来沟通讨论。截止写文现在 React-Hot-Loader 4 已经在进行中，我比较偏向于 4 会和 React 迭代保持更亲密的同步（ 从之前  <a href="https://reactjs.org/docs/error-boundaries.html" rel="nofollow noreferrer" target="_blank">error boundaries </a> 和 <a href="https://github.com/facebook/react/issues/5306" rel="nofollow noreferrer" target="_blank">official instrumentation API</a> 来看），到时候拭目以待吧。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012423305?w=1426&amp;h=778" src="https://static.alili.tech/img/remote/1460000012423305?w=1426&amp;h=778" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
追溯 React Hot Loader 的实现

## 原文链接
[https://segmentfault.com/a/1190000013571760](https://segmentfault.com/a/1190000013571760)


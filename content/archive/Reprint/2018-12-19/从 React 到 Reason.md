---
title: '从 React 到 Reason' 
date: 2018-12-19 2:30:07
hidden: true
slug: azzww9s2tun
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000012656721?w=1024&amp;h=240" src="https://static.alili.tech/img/remote/1460000012656721?w=1024&amp;h=240" alt="ReasonReact" title="ReasonReact" style="cursor: pointer; display: inline;"></span></p>
<blockquote>如果你是一个 React 爱好者，开始在各种站点听到有人谈论 Reason 这个新语言，也看见 <a href="https://github.com/jordwalke" rel="nofollow noreferrer" target="_blank">Jordan</a>（React 作者）说 ReasonReact 将是未来，但你却是不知道从哪下手，那么这篇小教程就是为你准备的。</blockquote>
<p>ps. 有条件的话还是尽量看 <a href="https://reasonml.github.io/guide/what-and-why" rel="nofollow noreferrer" target="_blank">Reason</a> 和 <a href="https://reasonml.github.io/reason-react/docs/en/what-why.html" rel="nofollow noreferrer" target="_blank">ReasonReact</a> 的官方文档吧</p>
<p>pps. Jared 写的 <a href="https://jaredforsyth.com/2017/07/05/a-reason-react-tutorial/" rel="nofollow noreferrer" target="_blank">A ReasonReact Tutorial</a> 是 ReasonReact 最棒的入门指南。本文也是经由他允许，参考了很多其中的内容。能看的懂英语的都直接去他那里吧~</p>
<h2 id="articleHeader0">Reason 是什么？</h2>
<p>Reason 是一门基于 <a href="http://ocaml.org/" rel="nofollow noreferrer" target="_blank">OCaml</a> 的语言，它为 Ocaml 带来了新的语法和工具链。它既可以通过 BuckleScript 被同编译为 JavaScript，也支持直接编译为原生的二进制汇编。Reason 提供了和 JavaScript 相似的语法，也可以使用 npm 来安装依赖。长江后浪推前浪，Reason 丢掉了历史包袱，比 JavaScript 多了可靠的<strong>静态类型</strong>，也更快更简洁！</p>
<h2 id="articleHeader1">为什么要学 Reason ？</h2>
<blockquote>“为啥我要花时间学一门全新的语言呢？是 JavaScript 哪里不好还是你们要求太高？”</blockquote>
<p>错！Reason 不是一门全新的语言，事实上 80% 的语义都可以直接对应到现代的 JavaScript 上，反之也差不多。你只需要丢弃掉一丢丢的 JavaScript 边角语法，再学一点点好东西，就可以获得也许 ES2030 才有的特性。对于大部分人来说，学习 Reason 也不会比学习 JavaScript 和一个其他的类型系统（比如 Flow）来的慢。</p>
<p>不相信的话，先自己去看看 <a href="https://reasonml.github.io/guide/javascript/syntax-cheatsheet/" rel="nofollow noreferrer" target="_blank">JS -&gt; Reason 速查表</a>，然后去 <a href="https://reasonml.github.io/try/" rel="nofollow noreferrer" target="_blank">playground</a> 体验一下吧。</p>
<h2 id="articleHeader2">从哪开始？</h2>
<p>如果你体验了一下，还是提不起兴趣，你可以再出门右转逛逛隔壁家 <a href="http://elm-lang.org/" rel="nofollow noreferrer" target="_blank">elm</a> 和 <a href="https://clojurescript.org/" rel="nofollow noreferrer" target="_blank">ClojureScript</a> 试试。但如果你觉得 ok，却不知道从哪下手，那不妨和我一样，从咱们熟悉的 React 开始。<a href="https://github.com/jordwalke" rel="nofollow noreferrer" target="_blank">Jordan</a> 重新发起了 <a href="https://reasonml.github.io/reason-react/" rel="nofollow noreferrer" target="_blank">ReasonReact</a> 这个新项目，让我们可以换一种更简单优雅的方式写 React。</p>
<h2 id="articleHeader3">ReasonReact</h2>
<p>ReasonReact 提供了一些和 React 脚手架类似的工具，比如 <a href="https://github.com/reasonml-community/reason-scripts" rel="nofollow noreferrer" target="_blank">reason-scripts</a>。不过为了理解的深入一点，不妨从零开始搭起我们的第一个 ReasonReact 项目。新建一个项目目录，名字随意，让我们开始吧~ 当然，你也可以直接 clone 已经准备好了的 <a href="https://github.com/stonexer/simple-reason-react-demo" rel="nofollow noreferrer" target="_blank">simple-reason-react-demo</a> 项目来参考。</p>
<p>首先，初始化 <code>package.json</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;simple-reason-react-demo&quot;,
  &quot;version&quot;: &quot;0.1.0&quot;,
  &quot;scripts&quot;: {
    &quot;start&quot;: &quot;bsb -make-world -w&quot;,
    &quot;build&quot;: &quot;webpack -w&quot;
  },
  &quot;dependencies&quot;: {
    &quot;react&quot;: &quot;^16.2.0&quot;,
    &quot;react-dom&quot;: &quot;^16.2.0&quot;,
    &quot;reason-react&quot;: &quot;^0.3.0&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;bs-platform&quot;: &quot;^2.1.0&quot;,
    &quot;webpack&quot;: &quot;^3.10.0&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"simple-reason-react-demo"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.1.0"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"start"</span>: <span class="hljs-string">"bsb -make-world -w"</span>,
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"webpack -w"</span>
  },
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"react"</span>: <span class="hljs-string">"^16.2.0"</span>,
    <span class="hljs-attr">"react-dom"</span>: <span class="hljs-string">"^16.2.0"</span>,
    <span class="hljs-attr">"reason-react"</span>: <span class="hljs-string">"^0.3.0"</span>
  },
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"bs-platform"</span>: <span class="hljs-string">"^2.1.0"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^3.10.0"</span>
  }
}</code></pre>
<p>然后安装一下依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --registry=https://registry.npm.taobao.org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> install --registry=https:<span class="hljs-regexp">//</span>registry.<span class="hljs-built_in">npm</span>.taobao.org</code></pre>
<p>项目里安装了最新的 React 和 ReactDOM，以及额外的 ReasonReact。而编译工具使用了前端业界标准 Webpack 和 <a href="https://www.zhihu.com/people/hongbo_zhang" rel="nofollow noreferrer" target="_blank">张宏波</a> 开发的 <a href="https://github.com/bucklescript/bucklescript" rel="nofollow noreferrer" target="_blank">bs-platform</a>。你可能暂时还弄不清 BuckleScript 在这里将要扮演怎样的角色，不过没关系，暂时你只要把他理解成 Reason -&gt; JavaScript 的编译器就好了，就像 Babel 把 ES2016 编译成了 ES5 一样。</p>
<p>然后，我们添加一个 BuckleScript 的配置文件 <code>bsconfig.json</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot; : &quot;simple-reason-react-demo&quot;,
  &quot;reason&quot; : {&quot;react-jsx&quot; : 2},
  &quot;refmt&quot;: 3,
  &quot;bs-dependencies&quot;: [&quot;reason-react&quot;],
  &quot;sources&quot;: &quot;src&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"name"</span> : <span class="hljs-string">"simple-reason-react-demo"</span>,
  <span class="hljs-attr">"reason"</span> : {<span class="hljs-attr">"react-jsx"</span> : <span class="hljs-number">2</span>},
  <span class="hljs-attr">"refmt"</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">"bs-dependencies"</span>: [<span class="hljs-string">"reason-react"</span>],
  <span class="hljs-attr">"sources"</span>: <span class="hljs-string">"src"</span>
}</code></pre>
<p>可以大概猜出来，项目用到了 reason 的 <code>react-jsx</code> 语法，依赖了 <code>reason-react</code>，源代码存放在 <code>src</code> 目录。时间有限，就先不展开研究了，详细配置可以查看 <a href="https://bucklescript.github.io/docs/zh-CN/build-configuration.html" rel="nofollow noreferrer" target="_blank">bsconfig.json 结构</a>。再创建下 src 目录，我们的项目应该长成这样了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── bsconfig.json
├── src
├── node_modules
└── package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="shell">.
├── <span class="hljs-selector-tag">bsconfig</span><span class="hljs-selector-class">.json</span>
├── <span class="hljs-selector-tag">src</span>
├── <span class="hljs-selector-tag">node_modules</span>
└── <span class="hljs-selector-tag">package</span><span class="hljs-selector-class">.json</span></code></pre>
<h1 id="articleHeader4">你好，ReasonReact</h1>
<p>是不是很容易的就到这里了，让我们正式开始写 Reason 吧！在 src 里新建 <code>Main.re</code> 文件，写下 Hello World</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOMRe.renderToElementWithId(
  <div>(ReasonReact.stringToElement(&quot;Hello ReasonReact&quot;))</div>,
  &quot;root&quot;
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code class="reason">ReactDOMRe.renderToElementWithId(
  &lt;<span class="hljs-keyword">div</span>&gt;(ReasonReact.stringToElement(<span class="hljs-string">"Hello ReasonReact"</span>))&lt;/<span class="hljs-keyword">div</span>&gt;,
  <span class="hljs-string">"root"</span>
);</code></pre>
<p>几乎和 React 代码一样不是么？然后我们运行编译命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 相当于之前写好的 'bsb -make-world -w'
npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code class="shell"><span class="hljs-meta"># 相当于之前写好的 <span class="hljs-string">'bsb -make-world -w'</span></span>
npm start</code></pre>
<p>一切正常的话，可以看到编译成功的提示，否则就要辛苦你按错误提示排查一下了，注意 bsb 的输出对我们的很重要，一些错误提示和类型检查的信息都要通过它来看。因为我们开启了 <code>-w</code> 的 watch 模式，接下来还要用到，就先不用退出了。bsb 将代码编译到了 lib 目录下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lib
├── bs
└── js
    └── src
        └── Main.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code class="shell"><span class="hljs-class"><span class="hljs-keyword">lib</span></span>
├── bs
└── js
    └── src
        └── Main.js</code></pre>
<p>目前我们要关注一下的是 <code>lib/js/src/Main.js</code>，打开它我们可以看到编译好的 JavaScript 代码，非常漂亮是吧？这都是 BuckleScript 的功劳。为了让代码能在浏览器里运行，我们还需要用 Webpack 打包一下模块化，这些你都应该非常熟悉了。</p>
<p>创建 <code>public/index.html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<meta charset=utf8>
<title>你好</title>
<body>
<div id=&quot;root&quot;></div>
<script src=&quot;./bundle.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">utf8</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>你好<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>以及 <code>webpack.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');

module.exports = {
  entry: './lib/js/src/Main.js',
  output: {
    path: path.join(__dirname, &quot;public&quot;),
    filename: 'bundle.js',
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./lib/js/src/Main.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">"public"</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>,
  },
};</code></pre>
<p>Webpacck 配置里入口是 bsb 编译生成的 './lib/js/src/Main.js'。再打开一个终端运行 <code>npm run build</code>，我们的准备工作就全部就绪了。我们只利用 webpack 做很简单的打包，所以你基本可以忽略这个终端的输出，还是把精力放在刚刚的 start 命令上。接下来直接在浏览器里打开 index.html 文件，就可以看到 “Hello ReasonReact” 了~</p>
<h2 id="articleHeader5">第一个组件</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012656722" src="https://static.alili.tech/img/remote/1460000012656722" alt="" title="" style="cursor: pointer;"></span></p>
<p>让我们开始第一个组件的开发，一个只能加加减减的步进器。新建一个组件文件：<code>src/Stepper.re</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let component = ReasonReact.statelessComponent(&quot;Stepper&quot;);

let make = (children) => ({
  ...component,
  render: (self) =>
    <div>
      <div>(ReasonReact.stringToElement(&quot;I'm a Stepper! &quot;))</div>
    </div>
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="reason">let component = ReasonReact.statelessComponent(<span class="hljs-string">"Stepper"</span>);

let make = <span class="hljs-function"><span class="hljs-params">(children)</span> =&gt;</span> ({
  ...component,
  render: <span class="hljs-function"><span class="hljs-params">(self)</span> =&gt;</span>
    &lt;div&gt;
      &lt;div&gt;(ReasonReact.stringToElement(<span class="hljs-string">"I'm a Stepper! "</span>))&lt;/div&gt;
    &lt;/div&gt;
});</code></pre>
<p><code>ReasonReact.statelessComponent</code> 会返回一个默认的组件定义，里面包含了你熟悉的那些生命周期函数以及其他一些方法和属性。这里我们定义了 <code>make</code> 方法，目前它只接受一个 <code>children</code> 参数，返回了一个组件。我们利用了类似 es6 的 <code>... 对象展开操作符</code> 重写了 <code>component</code> 中的 <code>render</code> 方法。神奇的是这段代码居然完全符合 JavaScript 的语法...接下来，让我们再修改一下 <code>Main.re</code>，让他渲染这个 Stepper 组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOMRe.renderToElementWithId(<Stepper />, &quot;root&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code class="reason" style="word-break: break-word; white-space: initial;">ReactDOMRe.renderToElementWithId(&lt;<span class="hljs-built_in">Stepper</span> /&gt;, <span class="hljs-string">"root"</span>);</code></pre>
<p>刷新下浏览器，你应该可以看到刚写好的组件就这么成功的 render 出来了。</p>
<p>你可能很好奇为什么这里没有写 <code>require()</code> 或 <code>import</code>。这是因为 Reason 的跨文件依赖是自动从你的代码中推导出来的，当编译器看到 <code>Stepper</code> 这个在 <code>Main.re</code> 中并没有定义的量，它就会自动去找 <code>Stepper.re</code> 这个文件并引入该模块。</p>
<p>熟悉 ReactJS 的同学都应该知道，jsx 并不是什么特殊的语法，只是会被编译成普通的函数调用，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>Hello React</div>
// to
React.createElement(
  &quot;div&quot;,
  null,
  &quot;Hello React&quot;
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code class="jsx">&lt;<span class="hljs-keyword">div</span>&gt;Hello React&lt;/<span class="hljs-keyword">div</span>&gt;
<span class="hljs-comment">// to</span>
React.createElement(
  <span class="hljs-string">"div"</span>,
  <span class="hljs-keyword">null</span>,
  <span class="hljs-string">"Hello React"</span>
);</code></pre>
<p>而在 ReasonReact 中，jsx 会被翻译成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Stepper />
/* to */
Stepper.make([||]) /* [|1,2,3|] 是 Reason 中数组的语法 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code class="reason">&lt;<span class="hljs-built_in">Stepper</span> /&gt;
<span class="hljs-comment">/* to */</span>
<span class="hljs-built_in">Stepper</span>.make([||]) <span class="hljs-comment">/* [|1,2,3|] 是 Reason 中数组的语法 */</span></code></pre>
<p>意思是调用 Stepper 模块的 make 函数，参数是一个空的数组。这就和我们之前写好的 <code>Stepper.re</code> 中的 make 函数对应上了，这个空数组就对应于 make 的参数 children。再让我们看眼我们的第一个组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let component = ReasonReact.statelessComponent(&quot;Stepper&quot;);

let make = (children) => ({
  ...component,
  render: (self) =>
    <div>
      <div>(ReasonReact.stringToElement(&quot;I'm a Stepper! &quot;))</div>
    </div>
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="reason">let component = ReasonReact.statelessComponent(<span class="hljs-string">"Stepper"</span>);

let make = <span class="hljs-function"><span class="hljs-params">(children)</span> =&gt;</span> ({
  ...component,
  render: <span class="hljs-function"><span class="hljs-params">(self)</span> =&gt;</span>
    &lt;div&gt;
      &lt;div&gt;(ReasonReact.stringToElement(<span class="hljs-string">"I'm a Stepper! "</span>))&lt;/div&gt;
    &lt;/div&gt;
});</code></pre>
<p>不同于 ReactJS 中组件的 <code>render</code>，这里的 <code>render</code> 方法需要一个参数：<code>self</code>，暂且你可以把它比作 this，因为我们的 <code>Stepper</code> 是一个 stateless 组件，所以我们还用不到它。<code>render</code> 方法里返回的同样是虚拟 DOM 节点，不同的是节点必须符合 ReasonReact 要求的节点类型。我们不能再直接写 <code>&lt;div&gt;Hello&lt;/div&gt;</code>，而得使用 ReasonReact 提供的 <code>stringToElement</code> 包装一层。嫌函数名太长？先忍着吧...</p>
<h3 id="articleHeader6">加上 state</h3>
<p>思来想去，我们的步进器还需要一个状态，就是要显示的数字。在 Reason 中，我们需要先定义 <code>state</code> 的类型（<code>type</code>）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type state = {
  value: int
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code class="reason">type <span class="hljs-keyword">state</span> = {
  value: int
};</code></pre>
<p>如果你写过 flow 或者 typescript，一定不会觉得奇怪，这标识我们的 state 中包含 <code>int</code> 类型的 <code>value</code> 字段。然后，我们需要开始把原先的 <code>statelessComponent</code> 替换成 <code>reducerComponent</code>，原先的组件代码也需要略微改动一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type state = {
  value: int
};

let component = ReasonReact.reducerComponent(&quot;Stepper&quot;);

let make = (children) => ({
  ...component,
  initialState: () => {
    value: 0
  },
  reducer: ((), state) => ReasonReact.NoUpdate,
  render: (self) =>
    <div>
      <div>(ReasonReact.stringToElement(string_of_int(self.state.value)))</div>
    </div>
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code class="reason">type <span class="hljs-keyword">state</span> = {
  value: int
};

let component = ReasonReact.reducerComponent(<span class="hljs-string">"Stepper"</span>);

let make = (children) =&gt; ({
  ...component,
  initialState: () =&gt; {
    value: <span class="hljs-number">0</span>
  },
  reducer: ((), <span class="hljs-keyword">state</span>) =&gt; ReasonReact.NoUpdate,
  render: (<span class="hljs-literal">self</span>) =&gt;
    <span class="hljs-variable">&lt;div&gt;</span>
      <span class="hljs-variable">&lt;div&gt;</span>(ReasonReact.stringToElement(string_of_int(<span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span>.value)))&lt;/div&gt;
    &lt;/div&gt;
});</code></pre>
<p>聪明的你肯定一下就看懂了 <code>initialState</code> 和 ReactJS 的 <code>getInitialState</code> 简直一模一样。而在 <code>render</code> 这里也很类似，组件当前的状态可以通过 <code>self.state</code> 获取，还是为了类型匹配我们套了一层 <code>string_of_int</code> 将 <code>int</code> 类型的 <code>value</code> 转换成 <code>string</code>。而新增的 <code>reducer</code> 函数可能就有点看不懂了。有意思的地方来啦~</p>
<p>在 ReactJS 中，我们依靠 <code>setState</code> 去手动的更新 <code>state</code>。ReasonReact 里则引入了 “<code>reducer</code>” 的概念，看上去很像 Redux 对吧？也许是 Jordan 自己也不是很喜欢 <code>setState</code> 这个非函数式的操作吧 …… ReasonReact 里更新一个组件状态分为两个步骤，首先发起一个 <code>action</code>，然后在 <code>reducer</code> 中处理它并更新状态。此时此刻，我们还没有添加 <code>action</code>，所以 <code>reducer</code> 还是无操作的，我们直接返回了一个 <code>ReasonReact.NoUpdate</code> 来标识我们并没有触发更新。让我们继续加上 <code>action</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type state = {
  value: int
};

/* here */
type action =
  | Increase
  | Decrease;

let component = ReasonReact.reducerComponent(&quot;Stepper&quot;);

let make = (children) => ({
  ...component,
  initialState: () => {
    value: 0
  },
  reducer: (action, state) => {
    /* here */
    switch action {
    | Decrease => ReasonReact.Update({value: state.value - 1})
    | Increase => ReasonReact.Update({value: state.value + 1})
    };
  },
  render: (self) =>
    <div>
      /* and here */
      <button onClick={self.reduce((evt) => Decrease)}>(ReasonReact.stringToElement(&quot;-&quot;))</button>
      <div>(ReasonReact.stringToElement(string_of_int(self.state.value)))</div>
      <button onClick={self.reduce((evt) => Increase)}>(ReasonReact.stringToElement(&quot;+&quot;))</button>
    </div>
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code class="reason">type <span class="hljs-keyword">state</span> = {
  value: int
};

/* here */
type action =
  | Increase
  | Decrease;

let component = ReasonReact.reducerComponent(<span class="hljs-string">"Stepper"</span>);

let make = (children) =&gt; ({
  ...component,
  initialState: () =&gt; {
    value: <span class="hljs-number">0</span>
  },
  reducer: (action, <span class="hljs-keyword">state</span>) =&gt; {
    /* here */
    switch action {
    | Decrease =&gt; ReasonReact.Update({value: <span class="hljs-keyword">state</span>.value - <span class="hljs-number">1</span>})
    | Increase =&gt; ReasonReact.Update({value: <span class="hljs-keyword">state</span>.value + <span class="hljs-number">1</span>})
    };
  },
  render: (<span class="hljs-literal">self</span>) =&gt;
    <span class="hljs-variable">&lt;div&gt;</span>
      /* and here */
      <span class="hljs-variable">&lt;button onClick={self.reduce((evt) =&gt;</span> Decrease)}&gt;(ReasonReact.stringToElement(<span class="hljs-string">"-"</span>))&lt;/button&gt;
      <span class="hljs-variable">&lt;div&gt;</span>(ReasonReact.stringToElement(string_of_int(<span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span>.value)))&lt;/div&gt;
      <span class="hljs-variable">&lt;button onClick={self.reduce((evt) =&gt;</span> Increase)}&gt;(ReasonReact.stringToElement(<span class="hljs-string">"+"</span>))&lt;/button&gt;
    &lt;/div&gt;
});</code></pre>
<p>首先，我们定义了 <code>action</code> 类型，它是一个 Variant（变体）。在 JavaScript 的世界里我们没见过这种值，它用来表示这个变体（或者先叫它 "枚举"？）可能的值。就像在 Redux 中推荐先声明一堆 <code>actionType</code> 一样，这个例子里我们定义了 +（<code>Increase</code>） 和 -（<code>Decrease</code>） 两种 <code>action</code>。</p>
<p>然后我们就可以给 <code>button</code> 增加点击的回调函数。我们使用了 <code>self.reduce</code> 这个函数（还记得 <code>dispatch</code> 么），它接收一个函数 <code>(evt) =&gt; Increase</code> 做转换，可以把它看作将点击的 event（在这里我们忽略掉了它因为用不到它...）换成一个 <code>action</code>，而这个 <code>action</code> 会被 <code>self.reduce</code> 用于做一个副作用操作来更新 <code>state</code>，更新 <code>state</code> 的操作就在 <code>reducer</code> 中。</p>
<p><code>reducer</code> 内采用了<strong>模式匹配</strong>的形式，定义了对于所有可能的 <code>action</code> 需要如何更新 <code>state</code>。例如，对于 <code>Increase</code> 这个类型的 <code>action</code>，返回了 <code>ReasonReact.Update({value: self.state.value + 1})</code> 去触发更新。值得注意的是，组件的 <code>state</code> 是不可变的，而目前 <code>state</code> 中只有 <code>value</code> 一个字段，所以我们没有 <code>{...state, value: state.value + 1}</code> 这样去展开它。</p>
<p>如果你熟悉 Redux 的话，应该非常熟悉这一套范式了（虽然这其实来源于 Elm）。不同的是，我们直接拥有不可变的数据，不再需要过度的使用 JavaScript 的 <code>String</code> 来做 <code>actionType</code>，reducer 也写的更加优雅简单了，看着真是舒服~</p>
<h2 id="articleHeader7">继续？</h2>
<p>这篇文章到这里也就暂时结束了，距离能做出一般的组件功能我们还差了很多东西。目前我也只是在一些个人的小项目中使用 Reason，文章内容很浅，主要是希望能启发下厉害的你去尝试 Reason 这个还算新鲜的语言，相信它会让你眼前一亮的。</p>
<p>对了，既然都看到这里了，不如再去看看今年两次 React Conf 上 <a href="https://github.com/chenglou" rel="nofollow noreferrer" target="_blank">chenglou</a> 关于 Reason 的精彩演讲吧~</p>
<ul>
<li><a href="https://www.youtube.com/watch?v=_0T5OSSzxms&amp;t=15s" rel="nofollow noreferrer" target="_blank">Taming the Meta Language - React Conf 2017</a></li>
<li><a href="https://www.youtube.com/watch?v=24S5u_4gx7w&amp;t=3s" rel="nofollow noreferrer" target="_blank">What's in a language? - Cheng Lou</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 React 到 Reason

## 原文链接
[https://segmentfault.com/a/1190000012656716](https://segmentfault.com/a/1190000012656716)


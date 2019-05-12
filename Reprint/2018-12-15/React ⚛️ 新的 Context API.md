---
title: 'React ⚛️ 新的 Context API' 
date: 2018-12-15 2:30:11
hidden: true
slug: 694f7aisawv
categories: [reprint]
---

{{< raw >}}

                    
<p>原文地址：<a href="https://blog.kentcdodds.com/reacts-%EF%B8%8F-new-context-api-70c9fe01596b" rel="nofollow noreferrer" target="_blank">React's ⚛️ new Context API</a></p>
<p>作者：<a href="https://twitter.com/kentcdodds" rel="nofollow noreferrer" target="_blank">kentcdodds</a></p>
<p>这不再是一个 <code>实验性的 API</code>，并且它更符合 <code>工程化</code> 的理念，目前它已成为 <code>React 一级棒的 API</code>。</p>
<blockquote>⚠️ ：大家可以通过 <a href="https://tinyletter.com/kentcdodds" rel="nofollow noreferrer" target="_blank">newsletter</a> 获取我最新的资讯，我一般每两周通过邮件发送一次，大家可以通过自己的收件箱获取更多的内容。</blockquote>
<p><code>React</code> 中的 <code>context API</code> 相信大家都知道吧，可能跟大伙一样，当看到 <code>React</code> 的官方文档是这样时，都不敢直接使用它。<br><span class="img-wrap"><img data-src="/img/bV21ST?w=748&amp;h=603" src="https://static.alili.tech/img/bV21ST?w=748&amp;h=603" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>第一条搜索结果显示的就是 <a href="https://reactjs.org/docs/context.html#why-not-to-use-context" rel="nofollow noreferrer" target="_blank">为什么不建议使用 context</a>，让大家瞬间产生忧虑，该章节是这么描述 <code>context</code> 的：</p>
<blockquote>如果你想让你的应用更加稳定，就别使用 <code>context</code>，因为这是一个实验性的 <code>API</code>，在未来的 <code>React</code> 版本中可能会发生改变。</blockquote>
<p>⚠️ 注意，这里的改变包括 <code>中断</code>，<code>终止</code>，<code>不再使用</code> 的含义。</p>
<h2 id="articleHeader0">那么，为什么还要使用 context 呢</h2>
<p>你曾经历过尝试在一个 <code>层级很深的组件</code> 中获取 <code>最外层组件</code> 的 <code>state</code> 的痛苦么，这种痛苦叫 <code>prop drilling</code>，可谓让人接近崩溃的。当遇到这种情形时，你肯定不会喜欢用 <code>props</code> 来传递数据，因为如果中间有个组件发生改变，这个代价将是几何 <img src="https://static.alili.techundefined" class="emoji" alt="joy" title="joy">。</p>
<p>实际上，你可以通过使用常规的 <code>JavaScript module</code> 来规避以上的问题，将数据存放在某个 <code>module</code> 中，就可以实现在任何地方 <code>访问/导入</code>，但这么做想要 <code>更新</code> 却很麻烦（你必须实现一个 <code>event</code> 在数据更新时触发，通知用户数据发生改变），并且，<code>服务端渲染</code> 对 <code>module</code> 也会有 <a href="https://stackoverflow.com/questions/40935571/why-singleton-store-in-flux-can-cause-issue-for-server-side-rendering/40974748#40974748" rel="nofollow noreferrer" target="_blank">影响</a>。</p>
<p>因此，像 <a href="https://redux.js.org/" rel="nofollow noreferrer" target="_blank">redux</a> 这样的负责 <code>状态管理</code> 的第三方库进入了大家的视野。它允许你在任何地方从 <code>store</code> 获取数据，你需要做的只是使用 <code> &lt;Provider /&gt;</code> 包装一下，然后就可以神奇地在 <code>connected</code> 的组件中轻松地获取想要的数据了。</p>
<p>然而，如果我告诉你 <code>&lt;Provider /&gt;</code> 就是在使用 <code>context</code> 这个 <code>实验性 API</code> 呢？? 事实上也是这样的！<code>provider</code> 组件将数据存进 <code>context</code> 中，<code>connect</code> 高阶组件从 <code>context</code> 获取数据，所以，<code>redux</code> 并不允许你的数据可以在任何地方访问，<code>context</code> 就是这样。</p>
<p>所以，为什么还要使用 <code>context</code> 呢？可能是大家已经深深地爱上它了吧！即使你没有直接使用 <code>context</code>，你的应用程序也会通过引用像 <a href="https://github.com/reactjs/react-redux/blob/76dd7faa90981dd2f9efa76f3e2f26ecf2c12cf7/src/components/connectAdvanced.js#L136-L143" rel="nofollow noreferrer" target="_blank">react-redux</a>， <a href="https://github.com/mobxjs/mobx-react/blob/dc249910c74c1b2e988a879be07f10aeaea90936/src/Provider.js#L19-L34" rel="nofollow noreferrer" target="_blank">MobX-react</a>， <a href="https://github.com/ReactTraining/react-router/blob/e6f9017c947b3ae49affa24cc320d0a86f765b55/packages/react-router/modules/Router.js#L23-L34" rel="nofollow noreferrer" target="_blank">react-router</a>， <a href="https://github.com/paypal/glamorous/blob/7468bfc76f46783cac841e20973ed119c771f3b7/src/theme-provider.js#L33-L37" rel="nofollow noreferrer" target="_blank">glamorous</a> 这样的第三方库间接用到它。</p>
<h2 id="articleHeader1">Context 重生啦</h2>
<p>现在清楚了，我们是如此地热爱 <code>context</code>，但官方文档的警告依然还在：<code>在 React 的未来版本中，可能不再使用它</code>，好消息是，<code>context</code> 要正式跟大家打招呼了，大家极有可能比之前更爱它。</p>
<p>一个月前，<code>React 团队</code> 从 <a href="https://github.com/yarnpkg/rfcs" rel="nofollow noreferrer" target="_blank">yarn</a>，<a href="https://github.com/rust-lang/rfcs" rel="nofollow noreferrer" target="_blank">rust</a> 和 <a href="https://github.com/emberjs/rfcs" rel="nofollow noreferrer" target="_blank">Ember</a> 的 <code>rfcs 仓库</code> 受到启发，建立了一个自己的 <a href="https://github.com/reactjs/rfcs" rel="nofollow noreferrer" target="_blank">rfcs</a> 仓库。仓库第一个 <code>PR</code> 来自 <a href="https://twitter.com/acdlite" rel="nofollow noreferrer" target="_blank">Andrew Clark</a>（React 团队核心成员），<code>PR</code> 标题为 <a href="https://github.com/reactjs/rfcs/pull/2" rel="nofollow noreferrer" target="_blank">New version of context</a>，其中 <code>Andrew Clark</code> 概述了未来新版本的 <code>context</code> 是怎样的，之后还存在一些有趣的讨论，几天后，<code>Andrew Clark</code> 就向 <code>React</code> 仓库提了一个 <a href="https://github.com/facebook/react/pull/11818" rel="nofollow noreferrer" target="_blank">New context API</a> 的 <code>PR</code>。</p>
<p>那么，到底有什么改变呢？肉眼估计新的 <code>API</code> 与之前的 <code>API</code> 存在百万级别的差异。这是我做的一个简单的 <a href="https://codesandbox.io/s/n4r0qq898j?from-embed" rel="nofollow noreferrer" target="_blank">示例</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ThemeContext = React.createContext('light')
class ThemeProvider extends React.Component {
  state = {theme: 'light'}
  render() {
    return ThemeContext.provide(this.state.theme, this.props.children)
  }
}

const ThemeConsumer = ({children}) => ThemeContext.consume(children)

class App extends React.Component {
  render() {
    <ThemeProvider>
      <ThemeConsumer>{val => <div>{val}</div>}</ThemeConsumer>
    </ThemeProvider>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> ThemeContext = React.createContext(<span class="hljs-string">'light'</span>)
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ThemeProvider</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {<span class="hljs-attr">theme</span>: <span class="hljs-string">'light'</span>}
  render() {
    <span class="hljs-keyword">return</span> ThemeContext.provide(<span class="hljs-keyword">this</span>.state.theme, <span class="hljs-keyword">this</span>.props.children)
  }
}

<span class="hljs-keyword">const</span> ThemeConsumer = <span class="hljs-function">(<span class="hljs-params">{children}</span>) =&gt;</span> ThemeContext.consume(children)

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    &lt;ThemeProvider&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ThemeConsumer</span>&gt;</span>{val =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{val}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}<span class="hljs-tag">&lt;/<span class="hljs-name">ThemeConsumer</span>&gt;</span></span>
    &lt;<span class="hljs-regexp">/ThemeProvider&gt;
  }
}</span></code></pre>
<blockquote>你可能注意到示例中使用到一个 <code>render prop</code>，但实际上并没有任何关于需要使用 <code>render prop</code> 的 <code>context API</code>，你可以使用 <code>context API</code> 轻松实现 <code>高阶组件</code> 或其他功能。</blockquote>
<p>新的 <code>context API</code> 主要由以下三部分组成</p>
<ul>
<li>
<code>React.createContext</code> 用于传递 <code>初始值</code>（可选择 <a href="https://twitter.com/acdlite/status/957446433656864768" rel="nofollow noreferrer" target="_blank">使用 bitmask 的一个奇妙的选择性退出函数</a>），返回一个包含 <code>provider</code> 和 <code>consumer</code> 的对象</li>
<li>
<code>provide</code> 函数使用 <code>higher</code>，并可以接收任何值</li>
<li>
<code>consume</code> 函数在 <code>provider</code> 之后任何地方使用，并传递一个返回 <code>JSX</code> 的函数（这有点像 <code>render prop</code> 组件，但 <code>consume</code> 不是组件）。</li>
</ul>
<p>我对这个 <code>API</code> 充满了期待，<code>React 团队</code> 也将会移除 <code>context 是实验性 API</code> 的警告，因为它现在是框架 <a href="https://twitter.com/acdlite/status/957445801302618112" rel="nofollow noreferrer" target="_blank">一级棒的特性</a>。这也意味着大家将不再那么担心使用 <code>context</code> 来解决应用中 <code>prop-drilling</code> 的问题了，对 <code>Redux</code> 也将不再那么依赖，对 <code>React</code> 将更加喜欢。</p>
<p><a href="https://twitter.com/kentcdodds/status/911276059051438082" rel="nofollow noreferrer" target="_blank">我最近看到的</a>，大概意思是：</p>
<blockquote>大家不是很愿意保持使用提倡的 <code>render</code> 方法，加重了 <code>prop drilling</code> 问题，所以，最终想通过 <code>redux</code> 来缓解</blockquote>
<p>所以，我认为如果我们不过早或武断地去破坏 <code>render</code> 方法，我们可能就不会那么痛苦，即便最终我们实在没有办法避免，我们也可以通过核心的 <code>React API</code> 来解决。</p>
<h2 id="articleHeader2">Context 实践</h2>
<p>我看到了一个关于 <code>context API</code>（或普通的 <code>render prop pattern</code>）的问题很多次，就是如何组合 <code>providers</code> 和 <code>consumers</code>，当在一个 <code>render</code> 方法中把一堆 <code>render prop</code> 组件放在一起时，就会像这样 <a href="https://twitter.com/acdlite/status/955955121979969537" rel="nofollow noreferrer" target="_blank">嵌套</a></p>
<p><span class="img-wrap"><img data-src="/img/bV3sq9?w=499&amp;h=989" src="https://static.alili.tech/img/bV3sq9?w=499&amp;h=989" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>那么，我们可以做点什么来避免呢？其实，个人觉得没有那么糟糕，如果你觉得这样并不好，那么可以使用常规的方法来解决它：<code>utility</code> 函数/组件，下面是一个示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ThemeContext = React.createContext('light')
class ThemeProvider extends React.Component {/* code */}
const ThemeConsumer = ({children}) => ThemeContext.consume(children)
const LanguageContext = React.createContext('en')
class LanguageProvider extends React.Component {/* code */}
const LanguageConsumer = ({children}) => LanguageContext.consume(children)

function AppProviders({children}) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </LanguageProvider>
  )
}

function ThemeAndLanguageConsumer({children}) {
  return (
    <LanguageConsumer>
      {language => (
        <ThemeConsumer>
          {theme => children({language, theme})}
        </ThemeConsumer>
      )}
    </LanguageConsumer>
  )
}

class App extends React.Component {
  render() {
    <AppProviders>
      <ThemeAndLanguageConsumer>
        {({theme, language}) => <div>{theme} and {language}</div>}
      </ThemeAndLanguageConsumer>
    </AppProviders>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> ThemeContext = React.createContext(<span class="hljs-string">'light'</span>)
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ThemeProvider</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{<span class="hljs-comment">/* code */</span>}
<span class="hljs-keyword">const</span> ThemeConsumer = <span class="hljs-function">(<span class="hljs-params">{children}</span>) =&gt;</span> ThemeContext.consume(children)
<span class="hljs-keyword">const</span> LanguageContext = React.createContext(<span class="hljs-string">'en'</span>)
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LanguageProvider</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{<span class="hljs-comment">/* code */</span>}
<span class="hljs-keyword">const</span> LanguageConsumer = <span class="hljs-function">(<span class="hljs-params">{children}</span>) =&gt;</span> LanguageContext.consume(children)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">AppProviders</span>(<span class="hljs-params">{children}</span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">LanguageProvider</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ThemeProvider</span>&gt;</span>
        {children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ThemeProvider</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">LanguageProvider</span>&gt;</span></span>
  )
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ThemeAndLanguageConsumer</span>(<span class="hljs-params">{children}</span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">LanguageConsumer</span>&gt;</span>
      {language =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">ThemeConsumer</span>&gt;</span>
          {theme =&gt; children({language, theme})}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ThemeConsumer</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">LanguageConsumer</span>&gt;</span></span>
  )
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    &lt;AppProviders&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ThemeAndLanguageConsumer</span>&gt;</span>
        {({theme, language}) =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{theme} and {language}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ThemeAndLanguageConsumer</span>&gt;</span></span>
    &lt;<span class="hljs-regexp">/AppProviders&gt;
  }
}</span></code></pre>
<p>这里的目标是使用常见的案例，结合特殊功能的函数/组件，使案例更加 <code>工程化</code>。</p>
<p>除此之外，大家还可以参考 <a href="https://medium.com/@jmeas" rel="nofollow noreferrer" target="_blank">jmeas</a> 的 <a href="https://codesandbox.io/s/92pj14134y?from-embed" rel="nofollow noreferrer" target="_blank">react-composer</a>。</p>
<p>但需要提及的是，在实践中，我并不建议大家嵌套渲染 <code>props components</code>，无论什么时候，都可以选择创建多个简单易用的组件，然后组合使用。</p>
<h2 id="articleHeader3">总结</h2>
<p>正如上面所说的，我对这个 <code>API</code> 充满了期待。目前暂未发布，但应该会包含在下一个 <code>minor</code> 版本中。不同担心，之前的 <code>API</code> 会继续正常工作，直到下一个 <code>major</code> 版本发布，所以，每个人都有时间迁移。还有不要忘了，<code>React</code> 团队在 <code>Facebook</code> 有超过 <code>50,000</code> 个 <code>React components</code> 需要维护，所以，将来很有可能会发布一个 <code>codemod</code> 去自动更新大多数人的代码（就像以往一样）。</p>
<p>我很高兴这个 <code>新 API</code> 能够提供，正如我在 <a href="https://twitter.com/kentcdodds/status/956675313966239745" rel="nofollow noreferrer" target="_blank">twitter</a> 中提及的。</p>
<p><span class="img-wrap"><img data-src="/img/bV3sra?w=499&amp;h=242" src="https://static.alili.tech/img/bV3sra?w=499&amp;h=242" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React ⚛️ 新的 Context API

## 原文链接
[https://segmentfault.com/a/1190000013076221](https://segmentfault.com/a/1190000013076221)


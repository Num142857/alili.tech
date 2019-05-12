---
title: React 新 Context API
hidden: true
categories: [reprint]
slug: a6086f2b
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p><em>它更符合工程化, 不再是实验性的,” 现在它是一流的API! 并且它还使用了 RENDER PROP!</em></p>
<p><strong>注意: 大家可以通过</strong> <a href="http://kcd.im/news"><strong>newsletter</strong></a><strong>获取我最新的资讯.我发送每封电子邮件两周后发布到</strong> <a href="https://blog.kentcdodds.com"><strong>我的博客</strong></a> <strong>. 订阅即可在收件箱中获得更早更多的内容! 💌</strong></p>
<p>你在react官网上听说过 context API?如果你听说过, 你会像许多人那样，因为看过官网的文档，而害怕直接使用它么:</p>
<p><img src="https://p0.ssl.qhimg.com/t0170baed12f9dd0be7.png" alt=""></p>
<p>该搜索结果第一个显示<a href="https://reactjs.org/docs/context.html#why-not-to-use-context">“为何不用使用Context”</a>.不会激发对context API.的大量信心 .为了使事情更加受关注，搜索结果这部分说:</p>
<blockquote>
<p><em>如果你想让你的应用更稳定，别使用context。因为这是一个实验性的API，在未来的React版本中可能会被更改。.</em></p>
</blockquote>
<h3>那么你为何要使用context?</h3>
<p>你有没有经历过尝试在react状态树中从底部组建向顶部组建获取状态值的痛苦? 这种痛苦称作<strong>“prop drilling”</strong> 并且 <strong>是让人感到崩溃的</strong>. 最终你必须通过不关心数据的组件来传递props，以便将这些props发送给需要关心这些数据的组件。 并且随着你移到这些组建这些痛苦将被扩大。</p>
<p>实际上你可以使用常规的JavaScript模块来避免这些问题。你可以把这些数据放在一个单独的模块中，这样你就可以随时随地的导入或者访问相关数据。 但是，在更新的时候会遇到一些麻烦 (你必须实现一个方法来保证实时更新), 并且服务器端的渲染也可能对单例有 <a href="https://stackoverflow.com/a/40974748/971592">问题</a> 。</p>
<p>如此，这就需要 <a href="https://redux.js.org/">redux</a>这种状态管理库参与进来的地方了 . redux允许您轻松地从store(状态树)中的任何位置获取数据.你所要做的就是使用这个叫做 <code>&lt;Provider /&gt;</code> 用法，的东西，神奇的是你的store(状态树)可以被任何“连接”的组件所访问</p>
<p>如果我告诉你 Redux用法之 <code>&lt;Provider /&gt;</code> 正在使用context的特性，那该怎么办？确实是这样！ provider组件将数据放入context中，并且“连接”高阶组件将数据从context中提取出来。 因此，实际上，Redux并不允许您的数据在任何地方访问......context是就是这样！</p>
<p>那么，为什么你应该使用context? 那么，你可能早已经爱上了它了 ！即使你不直接使用context, 但是你的app已经通过<code>react-redux</code>，<code>MobX-react</code>，<code>react-router</code>，<code>glamorous</code>等来使用它！</p>
<h3>Context的重生</h3>
<p>所以我们爱上了<code>context</code>, 但是要记住官方的警告“它又可能在之后的react版本中被摒弃掉? 现在context正式发布了! 你将会喜欢上它!</p>
<p>在一个月以前, the  React团队从 <a href="https://github.com/yarnpkg/rfcs">Yarn</a>, <a href="https://github.com/rust-lang/rfcs">Rust</a>, 和 <a href="https://github.com/emberjs/rfcs">Ember</a> 的 rfcs 仓库中受到了启发，创建了一个新的自己的<a href="https://github.com/reactjs/rfcs">RFCs 仓库</a> . 第一个从仓库拉代码的是 <a href="https://twitter.com/acdlite">Andrew Clark</a> (react核心团队成员) 它被称为<a href="https://github.com/reactjs/rfcs/pull/2">“新版的 context”</a>.其中， Andrew 描述了新版的context 将会是什么样的. 在这仓库里有些很有趣的讨论。 几天后, Andrew 就向 React 仓库提了一个<a href="https://github.com/facebook/react/pull/11818">“New context API”</a>的PR.</p>
<p>所以呢它看起来怎么样?肉眼估计新的 API 与之前的 API 存在百万级别的差异. 这是我做的一个简单实用的: 
<a href="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fcodesandbox.io%2Fembed%2Fn4r0qq898j&amp;url=https%3A%2F%2Fcodesandbox.io%2Fs%2Fn4r0qq898j&amp;image=https%3A%2F%2Fcodesandbox.io%2Fapi%2Fv1%2Fsandboxes%2Fn4r0qq898j%2Fscreenshot.png&amp;key=a19fcc184b9711e1b4764040d3dc5c07&amp;type=text%2Fhtml&amp;schema=codesandbox">实例</a></p>
<p>这是一个更简单的版本，所以你不必另外打开代码链接：</p>
<pre><code class="hljs scala">const <span class="hljs-type">ThemeContext</span> = <span class="hljs-type">React</span>.createContext(<span class="hljs-symbol">'ligh</span>t')
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ThemeProvider</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {theme: <span class="hljs-symbol">'ligh</span>t'}
  render() {
    <span class="hljs-keyword">return</span> (
      `&lt;<span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Provider</span> value={<span class="hljs-keyword">this</span>.state.theme}&gt;`
        {<span class="hljs-keyword">this</span>.props.children}
      `&lt;/<span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Provider</span>&gt;`
    )
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      `&lt;<span class="hljs-type">ThemeProvider</span>&gt;`
        `&lt;<span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Consumer</span>&gt;`
          {<span class="hljs-keyword">val</span> =&gt; `&lt;div&gt;`{<span class="hljs-keyword">val</span>}`&lt;/div&gt;`}
        `&lt;/<span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Consumer</span>&gt;`
      `&lt;/<span class="hljs-type">ThemeProvider</span>&gt;`
    )
  }
}
</code></pre><p><em>在我的代码例子中你或许注意到了， 我正在使用render prop Consumer组件（最好！）, 如果你不喜欢用这种方式, 您可以使用 context API （这就是为什么它是最好的）轻松实现更高阶组件或其他内容</em>
最新的  context API 由3个主要部分组成:</p>
<ul>
<li><code>React.createContext</code> 用于传递初始值(可选择 <a href="https://twitter.com/acdlite/status/957446433656864768">a fancy opt-out function that uses a bitmask</a>). ,返回一个包含 provider 和 consumer 的对象</li>
<li>The <code>Provider</code> 组件在树中内更深层次的值，并接受一个名为值的prop（可以是任何东西）。.</li>
<li>The <code>Consumer</code> 函数在 provider 之后任何地方使用，并传递一个返回 JSX 的函数.</li>
</ul>
<p>我对这个 API 充满了期待.React 团队 也将会移除 context 是实验性 API 的警告，因为，它现在是框架 <a href="https://twitter.com/acdlite/status/957445801302618112">“一级棒的特性”</a> . 这就意味着开发者不要再担心使用 context 来解决应用中 prop-drilling 的问题了，对 Redux 也将不再那么依赖，对 React 将更加喜欢 (或许 <a href="https://medium.com/@thejameskyle">James Kyle</a>的 <a href="https://github.com/thejameskyle/unstated">Unstated</a>  是我们一直所期待的).</p>
<p>我最近 <a href="https://twitter.com/kentcdodds/status/911276059051438082">看到的</a>:</p>
<p>我认为，如果我们能避免过早和任意打断 render 方法，那么我们就更少的会感受到这种痛苦。但是，即使我们感受到了，我们也有一个坚实的核心 React API来帮助我们避免这个问题。</p>
<h3>Context 实践</h3>
<p>我多次遇见一个关于 context API （或普通的 render prop pattern）的问题，就是如何组合 providers 和 consumers.当在一个 render 方法中把一堆 render prop 组件放在一起时，就会像这样 <a href="https://twitter.com/acdlite/status/955955121979969537">嵌套</a>:</p>
<p>所以我们怎么避免这种情况你? 如果这样很麻烦，你可以用常规的方法来解决: utility  函数/组件. 这有个例子:</p>
<pre><code class="hljs scala">const <span class="hljs-type">ThemeContext</span> = <span class="hljs-type">React</span>.createContext(<span class="hljs-symbol">'ligh</span>t')
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ThemeProvider</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{<span class="hljs-comment">/* code */</span>}
const <span class="hljs-type">ThemeConsumer</span> = <span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Consumer</span>
const <span class="hljs-type">LanguageContext</span> = <span class="hljs-type">React</span>.createContext(<span class="hljs-symbol">'e</span>n')
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LanguageProvider</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{<span class="hljs-comment">/* code */</span>}
const <span class="hljs-type">LanguageConsumer</span> = <span class="hljs-type">LanguageContext</span>.<span class="hljs-type">Consumer</span>

function <span class="hljs-type">AppProviders</span>({children}) {
  <span class="hljs-keyword">return</span> (
    `&lt;<span class="hljs-type">LanguageProvider</span>&gt;`
      `&lt;<span class="hljs-type">ThemeProvider</span>&gt;`
        {children}
      `&lt;/<span class="hljs-type">ThemeProvider</span>&gt;`
    `&lt;/<span class="hljs-type">LanguageProvider</span>&gt;`
  )
}

function <span class="hljs-type">ThemeAndLanguageConsumer</span>({children}) {
  <span class="hljs-keyword">return</span> (
    `&lt;<span class="hljs-type">LanguageConsumer</span>&gt;`
      {language =&gt; (
        `&lt;<span class="hljs-type">ThemeConsumer</span>&gt;`
          {theme =&gt; children({language, theme})}
        `&lt;/<span class="hljs-type">ThemeConsumer</span>&gt;`
      )}
    `&lt;/<span class="hljs-type">LanguageConsumer</span>&gt;`
  )
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      `&lt;<span class="hljs-type">AppProviders</span>&gt;`
        `&lt;<span class="hljs-type">ThemeAndLanguageConsumer</span>&gt;`
          {({theme, language}) =&gt; `&lt;div&gt;`{theme} and {language}`&lt;/div&gt;`}
        `&lt;/<span class="hljs-type">ThemeAndLanguageConsumer</span>&gt;`
      `&lt;/<span class="hljs-type">AppProviders</span>&gt;`
    )
  }
}
</code></pre><p>在这里的目的是为了使用常见的案例，结合特殊功能的函数/组件，使案例更加 工程化! 有道理么? 我希望它确实如此 😅
我这有另外一个例子，在这真实的展示出嵌套有多糟糕以及怎样使用一个<a href="https://medium.com/@jmeas">jmeas</a> 的一个称为<code>react-composer</code> utility 方法 来实现它<a href="https://codesandbox.io/embed/92pj14134y?referrer=https%3A%2F%2Fmedium.com%2Fmedia%2F4bcc13014bc56311fdb9440b6e28a050%3FpostId%3D70c9fe01596b">链接</a></p>
<p>我应该提到的是，我不希望你需要在实践中嵌套 render props 组建。无论何时，你都可以创建一个简单的组建，将它们组合在一起并使用该组件。</p>
<h3>总结</h3>
<p>正如我之前所说的，我对于这个新的API 非常的振奋。这个API 目前没有发布，但是一个会包含在下一个发布的  React minor版本中。
不同担心，之前的 API 会继续正常工作，直到下一个 major 版本发布。所以，每个人都有时间迁移。还有不要忘了，React 团队在 Facebook 有超过 50,000 个 React components 需要维护，所以，将来很有可能会发布一个 codemod 去自动更新大多数人的代码（就像之前的版本一样）。</p>
<p>我对这个新API所能提供的东西感到兴奋。正如<a href="https://twitter.com/kentcdodds/status/956675313966239745">我最近在Twitter上提到的</a> (回应 <a href="https://medium.com/@dan_abramov">Dan Abramov</a>的 <a href="https://twitter.com/dan_abramov/status/956674265104953344">推文</a>):
有太多的期待了！祝你好运！ 👍</p>
<p><strong>不容错过的事</strong>:</p>
<ul>
<li><code>react-broadcast</code>是 <a href="https://medium.com/@mjackson">Michael Jackson</a> 的一个库,提供与context同样的功能. <a href="https://github.com/ReactTraining/react-broadcast/tree/next">下一个版本</a> 将是对于<code>React.createContext</code> (对e<a href="https://medium.com/@thejameskyle">James Kyle</a>的shoutout 以及创建 <code>create-react-context</code>).我实际上使用react-broadcast <a href="https://egghead.io/courses/advanced-react-component-patterns">在我的高级react课程中</a>当新的contextAPI正式发布时我将不得不更新 😅.</li>
<li><code>react-fns</code>: 浏览器API由<a href="https://medium.com/@jaredpalmer">Jared Palmer</a> 转变为声明性React组件和HoC's👏</li>
<li><code>react-composer</code>: 由 <a href="https://medium.com/@jmeas">jmeas</a>撰写渲染道具组件（我在上面的代码框中使用的）</li>
<li><code>react-contextual</code>: <a href="https://medium.com/@drcmda">Paul Henschel</a>Paul Henschel的Reacts新context API的小助手</li>
</ul>
<p><strong>上周的一些推文:</strong></p>
<p><strong>附 如果你喜欢这些, 确保 </strong> <a href="http://kcd.im/news"><strong>邮箱订阅</strong></a><strong>, </strong><a href="https://twitter.com/kentcdodds"><strong>_在twitter上关注我</strong></a><strong>, </strong> <a href="http://kcd.im/donate"><strong>_帮我买午餐</strong></a><strong>,  </strong> <a href="http://kcd.im/patreon"><strong><em>在patreon支持我</em></strong></a><strong>, 并且 </strong><a href="http://kcd.im/news"><strong><em>和你的朋友分享这些</em></strong></a></p>
<p>并且，转发这是与朋友分享这个不错的方法:</p>
<p>👋 大家好！我叫<a href="https://kentcdodds.com/">Kent C. Dodds</a>. 我是一名工作在<a href="https://www.paypal.com/">PayPal</a> 的全栈工程师. 我在PayPal 我职级是 <a href="https://github.com/tc39">the TC39</a>. 我比较热衷于 <a href="https://github.com/kentcdodds">开源社区</a>. 我在 <a href="https://egghead.io/instructors/kentcdodds">egghead.io</a>, <a href="https://frontendmasters.com/">Frontend Masters</a>, and <a href="https://workshop.me/?a=kent">Workshop.me</a>上是一名讲师. 并且我还是一名 <a href="https://developers.google.com/experts/people/kent-c-dodds">谷歌开发者</a>. I’m 我幸福地结婚了，还有四个孩子的父亲。 我喜欢我的家人，喜欢编码，JavaScript和React.</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/react-s-new-context-api](https://www.zcfy.cc/article/react-s-new-context-api)
原文标题: React 新 Context API
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

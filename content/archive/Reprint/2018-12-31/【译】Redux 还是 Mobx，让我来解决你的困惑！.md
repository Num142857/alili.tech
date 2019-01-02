---
title: '【译】Redux 还是 Mobx，让我来解决你的困惑！' 
date: 2018-12-31 2:30:30
hidden: true
slug: 8ec99stqhga
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>原文地址：<a href="https://www.robinwieruch.de/redux-mobx-confusion/" rel="nofollow noreferrer" target="_blank">Redux or MobX: An attempt to dissolve the Confusion</a></p>
<p>原文作者：<a href="https://www.robinwieruch.de" rel="nofollow noreferrer" target="_blank">rwieruch</a></p>
</blockquote>
<p>我在去年大量的使用了 <a href="https://github.com/reactjs/redux" rel="nofollow noreferrer" target="_blank">Redux</a>，但我最近都在使用 <a href="https://github.com/mobxjs/mobx" rel="nofollow noreferrer" target="_blank">Mobx</a> 来做状态（state）管理。<a href="https://www.reddit.com/r/reactjs/comments/4npzq5/confused_redux_or_mobx/" rel="nofollow noreferrer" target="_blank">似乎现在社区里关于该选什么来替代 Redux 很自然地成为了一件困惑的事</a>。开发者不确定该选择哪种解决方案。这个问题并不只是出现在 Redux 与 Mobx 上。无论何时，只要存在选择，人们就会好奇最好的解决问题的方式是什么。我现在写的这些是为了解决 Redux 和 Mobx 这两个状态管理库之间的困惑。</p>
<p>大部分的文章都用 React 来介绍 Mobx 和 Redux 的用法。但是在大部分情况下你都可以将 React 替换成 Angular 、 Vue 或其他。</p>
<p>在 2016 年年初的时候我用 <a href="https://github.com/rwieruch/favesound-redux" rel="nofollow noreferrer" target="_blank">React + Redux</a> 写了一个相当大的应用。在我发现可以使用 Mobx 替代 Redux 时，我花时间将应用从 Redux 重构成了 Mobx 。现在我可以非常自在的使用它俩并且解释它俩的用法。</p>
<p>这篇文章将要讲什么呢？如果你不打算看这么长的文章（TLDR：<a href="https://en.wiktionary.org/wiki/TLDR" rel="nofollow noreferrer" target="_blank">too long, didn't read（查看此链接请自备梯子）</a>），你可以看下目录。但我想给你更多细节：第一，我想简单地回顾状态管理库为我们解决了什么问题。毕竟我们写 React 时只用 <code>setState()</code> 或写其他 SPA 框架时用 <code>setState()</code> 类似的方法一样也可以做的不错。第二，我会大致的说下它们之间的相同之处和不同之处。第三，我会给 React 生态初学者指明怎样学习 React 的状态管理。友情提醒：在你深入 Mobx 和 Redux 之前，请先使用 <code>setState()</code> 。最后，如果你已经有一个使用了 Mobx 或 Redux 的应用，我将会就如何从其中一个状态管理库重构到另一个给你更多我的理解。</p>
<hr>
<h2 id="articleHeader0">目录</h2>
<ul>
<li>我们要解决的是什么问题？</li>
<li>Mobx 和 Redux 的不同？</li>
<li>React 状态管理的学习曲线</li>
<li>尝试另一个状态管理方案？</li>
<li>最后思考</li>
</ul>
<h3 id="articleHeader1">我们要解决的是什么问题？</h3>
<p>所有人都想在应用中使用状态管理。但它为我们解决了什么问题？很多人开始一个小应用时就已经引入一个状态管理库。所有人都在谈论 Mobx 和 Redux ，不是吗？但大部分应用在一开始的时候<a href="https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367" rel="nofollow noreferrer" target="_blank">并不需要大型的状态管理</a>。这甚至是危险的，因为这部分人将无法体验  Mobx 和 Redux 这些库所要解决的问题。</p>
<p>如今的现状是要用组件（components）来构建一个前端应用。组件有自己的内部状态。举个栗子，在 React 中上述的本地状态是用<code>this.state</code>和<code>setState()</code>来处理。但本地状态的状态管理在膨胀的应用中很快会变得混乱，因为：</p>
<ul>
<li>一个组件需要和另一个组件共享状态</li>
<li>一个组件需要改变另一个组件的状态</li>
</ul>
<p>到一定程度时，推算应用的状态将会变得越来越困难。它就会变成一个有很多状态对象并且在组件层级上互相修改状态的混乱应用。在大部分情况下，状态对象和状态的修改并没有必要绑定在一些组件上。<a href="https://facebook.github.io/react/docs/lifting-state-up.html" rel="nofollow noreferrer" target="_blank">当你把状态提升时，它们可以通过组件树得到</a>。</p>
<p>所以，解决方案是引入状态管理库，比如：Mobx 或 Redux。它提供工具在某个地方保存状态、修改状态和更新状态。你可以从一个地方获得状态，一个地方修改它，一个地方得到它的更新。它遵循单一数据源的原则。这让我们更容易推断状态的值和状态的修改，因为它们与我们的组件是解耦的。</p>
<p>像 Redux 和 Mobx 这类状态管理库一般都有附带的工具，例如在 React 中使用的有 <a href="https://github.com/reactjs/react-redux" rel="nofollow noreferrer" target="_blank">react-redux</a> 和 <a href="https://github.com/mobxjs/mobx-react" rel="nofollow noreferrer" target="_blank">mobx-react</a>，它们使你的组件能够获得状态。一般情况下，这些组件被叫做容器组件（container components），或者说的更加确切的话，就是连接组件( connected components )。只要你将组件升级成连接组件，你就可以在组件层级的任何地方得到和更改状态。</p>
<h3 id="articleHeader2">Mobx 和 Redux 的不同？</h3>
<p>在我们深入了解 Redux 和 Mobx 的不同之前，我想先谈谈它们之间的相同之处。</p>
<p>这两个库都是用来管理 JavaScript 应用的状态。它们并不一定要跟 React 绑定在一起，它们也可以在 AngularJs 和 VueJs 这些其他库里使用。但它们与<a href="https://www.robinwieruch.de/reasons-why-i-moved-from-angular-to-react/" rel="nofollow noreferrer" target="_blank"> React 的理念</a>结合得非常好。</p>
<p>如果你选择了其中一个状态管理方案，你不会感到被它锁定了。因为你可以在任何时候切换到另一个解决方案。你可以从 Mobx 换成 Redux 或从 Redux 换成 Mobx。我下面会展示如何能够做到。</p>
<p><a href="https://twitter.com/dan_abramov" rel="nofollow noreferrer" target="_blank">Dan Abramov</a> 的 Redux 是从 <a href="https://facebook.github.io/flux/docs/in-depth-overview.html" rel="nofollow noreferrer" target="_blank">flux 架构</a>派生出来的。和 flux 不同的是，Redux 用单一 store 而不是多个 store 来保存 state，另外，它用纯函数替代 dispatcher 来修改 state，如果你对 flux 不熟并且没接触过状态管理，不要被这段内容所烦恼。</p>
<p>Redux 被 FP（函数式编程）原则所影响。FP 可以在 JavaScript 中使用，但很多人有面向对象语言的背景，比如 Java。他们在刚开始的时候很难适应函数式编程的原则。这就是为什么对于初学者来说 Mobx 可能更加简单。</p>
<p>既然 Redux 拥抱 FP，那它使用的就是纯函数。一个接受输入并返回输出并且没有其他依赖的纯函数。一个纯函数在相同的输入下输出总是相同而且没有任何副作用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(state, action) => newState" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">(<span class="hljs-keyword">state</span>, action) =&gt; newState</code></pre>
<p>你的 Redux state 是不可变的，你应该总是返回一个新的 state 而不是修改原 state。你不应该执行 state 的修改或依据对象引用的更改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// don't do this in Redux, because it mutates the array
function addAuthor(state, action) {
  return state.authors.push(action.author);
}

// stay immutable and always return a new object
function addAuthor(state, action) {
  return [ ...state.authors, action.author ];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// don't do this <span class="hljs-keyword">in</span> Redux, because it mutates the array
function addAuthor(<span class="hljs-keyword">state</span>, action) {
  return <span class="hljs-keyword">state</span>.authors.push(action.author);
}

// stay immutable and always return a new object
function addAuthor(<span class="hljs-keyword">state</span>, action) {
  return [ ...<span class="hljs-keyword">state</span>.authors, action.author ];
}</code></pre>
<p>最后，在 Redux 的习惯用法里，state 的格式是像数据库一样标准化的。实体之间只靠 id 互相引用，这是最佳实践。虽然不是每个人都这样做，你也可以使用 <a href="https://github.com/paularmstrong/normalizr" rel="nofollow noreferrer" target="_blank">normalizr</a> 来使 state 标准化。标准化的 state 让你能够保持一个扁平的 state 和保持实体为单一数据源。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  post: {
    id: 'a',
    authorId: 'b',
    ...
  },
  author: {
    id: 'b',
    postIds: ['a', ...],
    ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">post</span>: {
    id: <span class="hljs-string">'a'</span>,
    authorId: <span class="hljs-string">'b'</span>,
    ...
  },
  <span class="hljs-selector-tag">author</span>: {
    <span class="hljs-attribute">id</span>: <span class="hljs-string">'b'</span>,
    postIds: [<span class="hljs-string">'a'</span>, ...],
    ...
  }
}</code></pre>
<p><a href="https://twitter.com/mweststrate" rel="nofollow noreferrer" target="_blank">Michel Weststrate</a> 的 Mobx 则是受到面向对象编程和响应式编程的影响。它将 state 包装成可观察的对象，因此你的 state 就有了 Observable 的所有能力。state 数据可以只有普通的 setter 和 getter，但 observable 让我们能在数据改变的时候得到更新的值。</p>
<p>Mobx 的 state 是可变的，所以你直接的修改 state ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addAuthor(author) {
  this.authors.push(author);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addAuthor</span><span class="hljs-params">(author)</span> </span>{
  <span class="hljs-keyword">this</span>.authors.push(author);
}</code></pre>
<p>除此之外，state 实体保持嵌套的数据结构来互相关联。你不必标准化 state，而是让它们保持嵌套。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  post: {
    id: 'a',
    ...
    author: {
      id: 'b',
      ...
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">post</span>: {
    id: <span class="hljs-string">'a'</span>,
    ...
    author: {
      id: <span class="hljs-string">'b'</span>,
      ...
    }
  }
}</code></pre>
<h4>单 store 与多 stores</h4>
<p>在 Redux 中，你将所有的 state 都放在一个全局的 store。这个 store 对象就是你的单一数据源。另一方面，多个 reducers 允许你修改不可变的 state。</p>
<p>Mobx 则相反，它使用多 stores。和 Redux 的 reducers 类似，你可以在技术层面或领域进行分治。也许你想在不同的 stores 里保存你的领域实体，但仍然保持对视图中 state 的控制。毕竟你配置 state 是为了让应用看起来更合理。</p>
<p>从技术层面来说，你一样可以在 Redux 中使用多个 stores。没有人强迫你只能只用一个 store。 但那不是 Redux 建议的用法。因为那违反了最佳实践。在 Redux 中，你的单 store 通过 reducers 的全局事件来响应更新。</p>
<h4>如何使用？</h4>
<p>你需要跟随下面的代码学习使用 Redux，首先在全局 state 上新增一个 user 数组。你可以看到我通过<a href="https://github.com/sebmarkbage/ecmascript-rest-spread" rel="nofollow noreferrer" target="_blank">对象扩展运算符</a>来返回一个新对象。你同样可以在 ES6（原文为 ES5，实际是应该是 ES6）中使用 <code>Object.assign()</code> 来操作不可变对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const initialState = {
  users: [
    {
      name: 'Dan'
    },
    {
      name: 'Michel'
    }
  ]
};

// reducer
function users(state = initialState, action) {
  switch (action.type) {
  case 'USER_ADD':
    return { ...state, users: [ ...state.users, action.user ] };
  default:
    return state;
  }
}

// action
{ type: 'USER_ADD', user: user };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const initialState = {
  users: [
    {
      name: 'Dan'
    },
    {
      name: 'Michel'
    }
  ]
};

// reducer
function users(<span class="hljs-keyword">state</span> = initialState, action) {
  switch (action.type) {
  case 'USER_ADD':
    return { ...<span class="hljs-keyword">state</span>, users: [ ...<span class="hljs-keyword">state</span>.users, action.<span class="hljs-keyword">user</span> ] };
  <span class="hljs-keyword">default</span>:
    return <span class="hljs-keyword">state</span>;
  }
}

// action
{ type: 'USER_ADD', <span class="hljs-keyword">user</span>: <span class="hljs-keyword">user</span> };</code></pre>
<p>你必须使用 <code>dispatch({ type: 'USER_ADD', user: user });</code>来为全局 state 添加一个新 user 。</p>
<p>在 Mobx 中，一个 store 只管理一个子 state（就像 Redux 中管理子 state 的 reducer），但你可以直接修改 state 。<code>@observable</code> 让我们可以观察到 state 的变化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class UserStore {
  @observable users = [
    {
      name: 'Dan'
    },
    {
      name: 'Michel'
    }
  ];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">class</span> <span class="hljs-selector-tag">UserStore</span> {
  <span class="hljs-variable">@observable</span> users = [
    {
      <span class="hljs-attribute">name</span>: <span class="hljs-string">'Dan'</span>
    },
    {
      <span class="hljs-attribute">name</span>: <span class="hljs-string">'Michel'</span>
    }
  ];
}</code></pre>
<p>现在我们就可以调用 store 实例的方法：<code>userStore.users.push(user);</code>。这是一种最佳实践，虽然使用 actions 去操作 state 的修改更加清楚明确。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class UserStore {
  @observable users = [
    {
      name: 'Dan'
    },
    {
      name: 'Michel'
    }
  ];

  @action addUser = (user) => {
    this.users.push(user);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UserStore</span> {</span>
  @observable users = [
    {
      name: <span class="hljs-string">'Dan'</span>
    },
    {
      name: <span class="hljs-string">'Michel'</span>
    }
  ];

  @action addUser = <span class="hljs-function"><span class="hljs-params">(user)</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.users.push(user);
  }
}</code></pre>
<p>在 Mobx 中你可以加上 <code>useStrict()</code> 来强制使用 action。现在你可以调用 store 实例上的方法：<code>userStore.addUser(user);</code> 来修改你的 state 。</p>
<p>你已经看到如何在 Redux 和 Mobx 中更新 state 。它们是不同的，Redux 中 state 是只读的，你只能使用明确的 actions 来修改 state ，Mobx 则相反，state 是可读和写的，你可以不使用 actions 直接修改 state，但你可以 <code>useStrict()</code> 来使用明确的 actions 。</p>
<h3 id="articleHeader3">React 状态管理的学习曲线</h3>
<p>React 应用广泛使用 Redux 和 Mobx 。但它们是独立的状态管理库，可以运用在除 React 的任何地方。它们的互操作库让我们能简单的连接React 组件。Redux + React 的 <a href="https://github.com/reactjs/react-redux" rel="nofollow noreferrer" target="_blank">react-redux</a> 和 MobX + React 的 <a href="https://github.com/mobxjs/mobx-react" rel="nofollow noreferrer" target="_blank">mobx-react</a> 。稍后我会说明它俩如何在 React 组件树中使用。</p>
<p>在最近的讨论中，人们在争论 Redux 的学习曲线。这通常发生在下面的情境中：想使用 Redux 做状态管理的 React 初学者。大部分人认为 React 和 Redux 本身都有颇高的学习曲线，两者结合的话会失控。一个替代的选择就是 Mobx ，因为它更适合初学者。</p>
<p>然而，我会建议 React 的初学者一个学习状态管理的新方法。先学习<br> React 组件内部的状态管理功能。在 React 应用，你首先会学到生命周期方法，而且你会用 <code>setState()</code> 和 <code>this.state</code> 解决本地的状态管理。我非常推荐上面的学习路径。不然你会在 React 的生态中迷失。在这条学习路径的最后，你会认识到组件内部管理状态难度越来越大。毕竟那是 <a href="https://www.robinwieruch.de/the-road-to-learn-react/" rel="nofollow noreferrer" target="_blank">The Road to learn React</a> 书里如何教授 React 状态管理的方法。</p>
<p>现在我们重点讨论 Redux 和 Mobx 为我们解决了什么问题？它俩都提供了在组件外部管理应用状态的方法。state 与组件相互解耦，组件可以读取 state ，修改 state ，有新 state 时更新。这个 state 是单一数据源。</p>
<p>现在你需要选择其中一个状态管理库。这肯定是要第一时间解决的问题。此外，在开发过相当大的应用之后，你应该能很自如使用 React 。</p>
<h4>初学者用 Redux 还是 Mobx ?</h4>
<p>一旦你对 React 组件和它内部的状态管理熟悉了，你就能选择出一个状态管理库来解决你的问题。在我两个库都用过后，我想说 Mobx 更适合初学者。我们刚才已经看到 Mobx 只要更少的代码，甚至它可以用一些我们现在还不知道的魔法注解。</p>
<p>用 Mobx 你不需要熟悉函数式编程。像“不可变”之类的术语对你可能依然陌生。函数式编程是不断上升的范式，但对于大部分 JavaScript 开发者来说是新奇的。虽然它有清晰的趋势，但并非所有人都有函数式编程的背景，有面向对象背景的开发者可能会更加容易适应 Mobx 的原则。</p>
<blockquote><p>注：<a href="https://medium.com/@mweststrate/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e" rel="nofollow noreferrer" target="_blank">Mobx 可以很好的在 React 内部组件状态管理中代替 setState</a>，我还是建议继续使用 <code>setState()</code> 管理内部状态。但链接文章很清楚的说明了在 React 中用 Mobx 完成内部状态管理是很容易的。</p></blockquote>
<h4>规模持续增长的应用</h4>
<p>在 Mobx 中你改变注解过的对象，组件就会更新。Mobx 比 Redux 使用了更多的内部魔法实现，因此在刚开始的时候只要更少的代码。有 Angular 背景的会觉得跟双向绑定很像。你在一个地方保存 state ，通过注解观察 state ，一旦 state 修改组件会自动的更新。</p>
<p>Mobx 允许直接在组件树上直接修改 state 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// component
<button onClick={() => store.users.push(user)} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// component</span>
&lt;<span class="hljs-selector-tag">button</span> onClick={() =&gt; store<span class="hljs-selector-class">.users</span><span class="hljs-selector-class">.push</span>(user)} /&gt;</code></pre>
<p>更好的方式是用 store 的 <code>@action</code> 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// component
<button onClick={() => store.addUser(user)} />

// store
@action addUser = (user) => {
  this.users.push(user);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// component</span>
&lt;button onClick={<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> store.addUser(user)} /&gt;

<span class="hljs-comment">// store</span>
<span class="hljs-meta">@action</span> addUser = <span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> {
  <span class="hljs-keyword">this</span>.users.push(user);
}</code></pre>
<p>用 actions 修改 state 更加明确。上面也提到过，有个小功能可以强制的使用 actions 修改 state 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// root file
import { useStrict } from 'mobx';

useStrict(true);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-comment">// root file</span>
<span class="hljs-keyword">import</span> { useStrict } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>;

useStrict(<span class="hljs-keyword">true</span>);</code></pre>
<p>这样的话第一个例子中直接修改 store 中的 state 就不再起作用了。前面的例子展示了怎样拥抱 Mobx 的最佳实践。此外，一旦你只用 actions ，你就已经使用了 Redux 的约束。</p>
<p>在快速启动一个项目时，我会推荐使用 Mobx ，一旦应用开始变得越来越大，越来越多的人开发时，遵循最佳实践就很有意义，如使用明确的 actions 。这是拥抱 Redux 的约束：你永远不能直接修改 state ，只能使用 actions 。</p>
<h4>迁移到 Redux</h4>
<p>一旦应用开始变得越来越大，越来越多的人开发时，你应该考虑使用 Redux 。它本身强制使用明确的 actions 修改 state 。action 有 type 和 payload 参数，reducer 可以用来修改 state 。这样的话，一个团队里的开发人员可以很简单的推断 state 的修改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// reducer
(state, action) => newState" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// reducer
(<span class="hljs-keyword">state</span>, action) =&gt; newState</code></pre>
<p>Redux 提供状态管理的整个架构，并有清晰的约束规则。这是<a href="https://www.youtube.com/watch?v=uvAXVMwHJXU" rel="nofollow noreferrer" target="_blank"> Redux 的成功故事</a>。</p>
<p>另一个 Redux 的优势是在服务端使用。因为我们使用的是纯 JavaScript ，它可以在网络上传输 state 。序列化和反序列化一个 state 对象是直接可用的。当然 Mobx 也是一样可以的。</p>
<p>Mobx 是无主张的，但你可以通过 <code>useStrict()</code> 像 Redux 一样使用清晰的约束规则。这就是我为什么没说你不能在扩张的应用中使用 Mobx ，但 Redux 是有明确的使用方式的。而 Mobx 甚至在文档中说：“ Mobx 不会告诉你如何组织代码，哪里该存储 state 或 怎么处理事件。”所以开发团队首先要确定 state 的管理架构。</p>
<p>状态管理的学习曲线并不是很陡峭。我们总结下建议：React 初学者首先学习恰当的使用 <code>setState()</code> 和 <code>this.state</code> 。一段时间之后你将会意识到在 React 应用中仅仅使用 <code>setState()</code> 管理状态的问题。当你寻找解决方案时，你会在状态管理库 Mobx 或 Redux 的选择上犹豫。应该选哪个呢？由于 Mobx 是无主张的，使用上可以和 <code>setState()</code> 类似，我建议在小项目中尝试。一旦应用开始变得越来越大，越来越多的人开发时，你应该考虑在 Mobx 上实行更多的限制条件或尝试使用 Redux 。我使用两个库都很享受。即使你最后两个都没使用，了解到状态管理的另一种方式也是有意义的。</p>
<h3 id="articleHeader4">尝试另一个状态管理方案？</h3>
<p>你可能已经使用了其中一个状态管理方案，但是想考虑另一个？你可以比较现实中的 <a href="https://github.com/rwieruch/favesound-mobx" rel="nofollow noreferrer" target="_blank">Mobx</a> 和 <a href="https://github.com/rwieruch/favesound-redux" rel="nofollow noreferrer" target="_blank">Redux</a> 应用。我把所有的文件修改都提交到了一个 <a href="https://github.com/rwieruch/favesound-mobx/pull/1" rel="nofollow noreferrer" target="_blank">Pull Request</a> 。在这个 PR 里，项目从 Redux 重构成了 Mobx ，反之亦然，你可以自己实现。我不认为有必要和 Redux 或 Mobx 耦合，因为大部分的改变是和其他任何东西解耦的。</p>
<p>你主要需要将 Redux 的 Actions、Action Creator、 Action Types、Reducer、Global Store 替换成 Mobx 的 Stores 。另外将和 React 组件连接的接口 <a href="https://github.com/reactjs/react-redux" rel="nofollow noreferrer" target="_blank">react-redux</a> 换成 <a href="https://github.com/mobxjs/mobx-react" rel="nofollow noreferrer" target="_blank">mobx-react</a> 。<a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0" rel="nofollow noreferrer" target="_blank">presenter + container pattern</a> 依然可以执行。你仅仅还要重构容器组件。在 Mobx 中可以使用 <code>inject</code> 获得 store 依赖。然后 store 可以传递 substate 和 actions 给组件。Mobx 的 <code>observer</code> 确保组件在 store 中  <code>observable</code> 的属性变化时更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { observer, inject } from 'mobx-react';

...

const UserProfileContainer = inject(
  'userStore'
)(observer(({
  id,
  userStore,
}) => {
  return (
    <UserProfile
      user={userStore.getUser(id)}
      onUpdateUser={userStore.updateUser}
    />
  );
}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { observer, inject } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>;

...

const UserProfileContainer = inject(
  <span class="hljs-string">'userStore'</span>
)(observer(({
  id,
  userStore,
}) =&gt; {
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span>
      <span class="hljs-attr">user</span>=<span class="hljs-string">{userStore.getUser(id)}</span>
      <span class="hljs-attr">onUpdateUser</span>=<span class="hljs-string">{userStore.updateUser}</span>
    /&gt;</span>
  );
}));</span></code></pre>
<p>Redux 的话，你使用 <code>mapStateToProps</code> 和 <code>mapDispatchToProps</code> 传递 substate 和 actions 给组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

...

function mapStateToProps(state, props) {
  const { id } = props;
  const user = state.users[id];

  return {
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateUser: bindActionCreators(actions.updateUser, dispatch),
  };
}

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(UserProfile);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import { connect } <span class="hljs-keyword">from</span> 'react-redux';
import { bindActionCreators } <span class="hljs-keyword">from</span> 'redux';

...

function mapStateToProps(<span class="hljs-keyword">state</span>, props) {
  const { id } = props;
  const <span class="hljs-keyword">user</span> = <span class="hljs-keyword">state</span>.users[id];

  return {
    <span class="hljs-keyword">user</span>,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    <span class="hljs-keyword">on</span>UpdateUser: bindActionCreators(actions.updateUser, dispatch),
  };
}

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(UserProfile);</code></pre>
<p>这有一篇<a href="https://www.robinwieruch.de/mobx-react/" rel="nofollow noreferrer" target="_blank">怎样将 Redux 重构为 Mobx</a>指南。但就像我上面说过的，反过来一样也是可以的。一旦你选择了一个状态管理库，你会知道那并没有什么限制。它们基本上是和你的应用解耦的，所以是可以替换的。</p>
<h3 id="articleHeader5">最后思考</h3>
<p>每当我看 Redux vs Mobx 争论下的评论时，总会有下面这条：“Redux 有太多的样板代码，你应该使用 Mobx，可以减少 xxx 行代码”。这条评论也许是对的，但没人考虑得失，<strong>Redux 比 Mobx 更多的样板代码，是因为特定的设计约束</strong>。它允许你推断应用状态即使应用规模很大。所以围绕 state 的仪式都是有原因的。</p>
<p>Redux 库非常小，大部分时间你都是在处理纯 JavaScript 对象和数组。它比 Mobx 更接近 vanilla JavaScript 。Mobx 通过包装对象和数组为可观察对象，从而隐藏了大部分的样板代码。它是建立在隐藏抽象之上的。感觉像是出现了魔法，但却很难理解其内在的机制。Redux 则可以简单通过纯 JavaScript 来推断。它使你的应用更简单的测试和调试。</p>
<p>另外，我们重新回到单页应用的最开始来考虑，一系列的单页应用框架和库面临着相同的状态管理问题，它最终被 flux 模式解决了。Redux 是这个模式的成功者。</p>
<p>Mobx 则又处在相反的方向。我们直接修改 state 而没有拥抱函数式编程的好处。对一些开发者来说，这让他们觉得像双向绑定。一段时间之后，由于没有引入类似 Redux 的状态管理库，他们可能又会陷入同样的问题。状态管理分散在各个组件，导致最后一团糟。</p>
<p>使用 Redux，你有一个既定的模式组织代码，而 Mobx 则无主张。但拥抱 Mobx 最佳实践会是明智的。 开发者需要知道如何组织状态管理从而更好的推断它。不然他们就会想要直接在组件中修改它。</p>
<p>两个库都非常棒。Redux 已经非常完善，Mobx 则逐渐成为一个有效的替代。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】Redux 还是 Mobx，让我来解决你的困惑！

## 原文链接
[https://segmentfault.com/a/1190000011148981](https://segmentfault.com/a/1190000011148981)


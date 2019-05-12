---
title: 在 Create React App 中如何使用代码分离
hidden: true
categories: [reprint]
slug: a8b35793
date: 2018-10-19 00:00:00
---

{{< raw >}}

            <p>虽然说「代码分离」并不是构建 React 应用程序的必要步骤，但是如果你对什么是「代码分离」感兴趣并想知道它是如何帮我们构建大型 React 应用程序的话，请继续往下阅读。</p>
<h3>代码分离</h3>
<p>在开发 React.js 单页应用时，随着业务的增长，代码量也会有增长的趋势。有时用户只是访问应用程序（或路由）的一部分，但是却可能会加载了大量首次页面载入时不必要的组件，这会影响我们应用的初始加载时间。</p>
<p>你可能已经注意到，在我们使用 Create React App 来构建应用时，Create React App 最终会生成一个大的 .js 文件。 这个文件包含了我们应用中所有的 JavaScript 代码，但如果一个用户他只是想要在登录页登录，我们加载其他的组件代码是没有意义的。当我们的应用还比较小的时候，加载所有的代码不是一个问题，但是随着应用越来越大，这个问题就会慢慢凸显出来。为了解决这个问题，Create React App 有一个非常简单的内置方法来分割我们的代码。这个功能被称为 「代码分离」</p>
<p>Create React App（从 1.0 版本开始）允许我们使用动态import() 来加载部分应用代码，更多内容可以看<a href="https://facebook.github.io/react/blog/2017/05/18/whats-new-in-create-react-app.html#code-splitting-with-dynamic-import">这里</a>。</p>
<p>动态 import() 可用于我们的 React 应用程序中的任何组件，另外它与 React Router 配合得非常好。因为我们在使用 React Router 创建路由的时候已经指出出来哪些路径应该加载哪些组件，只有当我们导航到这个路径的时候再加载这个组件是很有意义的。</p>
<h3>「代码分离」 与 「React Router v4」</h3>
<p>使用「React Router」来定义路由的代码结构一般是这样的：</p>
<pre><code class="hljs livescript"><span class="hljs-comment">/* Import the components */</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">"./containers/Home"</span>;
<span class="hljs-keyword">import</span> Posts <span class="hljs-keyword">from</span> <span class="hljs-string">"./containers/Posts"</span>;
<span class="hljs-keyword">import</span> NotFound <span class="hljs-keyword">from</span> <span class="hljs-string">"./containers/NotFound"</span>;

<span class="hljs-comment">/* Use components to define routes */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt;
  &lt;Switch&gt;
    &lt;Route path=<span class="hljs-string">"/"</span> exact component={Home} /&gt;
    &lt;Route path=<span class="hljs-string">"/posts/:id"</span> exact component={Posts} /&gt;
    &lt;Route component={NotFound} /&gt;
  &lt;/Switch&gt;;


</code></pre><p>首先我们引入路由需要的组件，然后定义相关的路由，Switch 组件用于渲染与路径相匹配的路由。</p>
<p>我们在文件顶部通过使用 import 静态引入了所有的组件，这意味着不管我们访问哪个路由，这些组件都会被全部加载。通过「代码分离」我们想要实现的是在访问一个页面的时候只加载跟这个页面匹配的组件。</p>
<h3>创建异步组件</h3>
<p>为此我们来看如何动态引入相关的组件。</p>
<p>首先在 src/components/AsyncComponent.js 文件中添加以下代码：</p>
<pre><code class="hljs scala"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-string">"react"</span>;

export <span class="hljs-keyword">default</span> function asyncComponent(importComponent) {
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AsyncComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor(props) {
      <span class="hljs-keyword">super</span>(props);

      <span class="hljs-keyword">this</span>.state = {
        component: <span class="hljs-literal">null</span>
      };
    }

    async componentDidMount() {
      const { <span class="hljs-keyword">default</span>: component } = await importComponent();

      <span class="hljs-keyword">this</span>.setState({
        component: component
      });
    }

    render() {
      const <span class="hljs-type">C</span> = <span class="hljs-keyword">this</span>.state.component;

      <span class="hljs-keyword">return</span> <span class="hljs-type">C</span> ? &lt;<span class="hljs-type">C</span> {...<span class="hljs-keyword">this</span>.props} /&gt; : <span class="hljs-literal">null</span>;
    }
  }

  <span class="hljs-keyword">return</span> <span class="hljs-type">AsyncComponent</span>;
}


</code></pre><p>我们在这段代码里做了这么几件事情：</p>
<ol>
<li><p><code>asyncComponent</code> 函数接受一个参数 <code>importComponent</code>，调用这个方法将动态引入给定的组件，看接下来 <code>asyncComponent</code> 方法的使用会让你更有感觉一些。</p>
</li>
<li><p>在组件 componentDidMount 时，我们只需要调用传入的importComponent 函数，并将动态加载的组件保存在 <code>AsyncComponent</code> 组件的 state 中。</p>
</li>
<li><p>最后，在 render 方法里，我们需要判断下组件是否已经加载完成。如果组件还未加载成功，最简单的处理方式是直接返回 null，但是为了给用户更好的体验，我们可以加一个组件正在加载的反馈，比如可以渲染一个「loading spinner」。</p>
</li>
</ol>
<h3>使用异步组件</h3>
<p>现在让我们在路由中使用这个组件来替换我们之前静态引入组件的方式。</p>
<pre><code class="hljs capnproto"><span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">"./containers/Home"</span>;


</code></pre><p>我们将使用asyncComponent动态引入我们想要的组件。</p>
<pre><code class="hljs coffeescript">const AsyncHome = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">"./containers/Home"</span>));


</code></pre><p>需要重点注意的是，我们在这里并没有直接引入组件，而是创建了一个函数，然后将这个函数作为参数传递给asyncComponent 方法，它将在AsyncHome 创建的时候动态引入。</p>
<p>我们在这里传递一个函数似乎有点奇怪，为什么不直接传入一个字符串（比如 './containers/Home'）然后在AsyncComponent 函数中再执行动态import() 呢？ 这是因为我们需要在组件创建的地方明确声明我们是动态引入组件，而 Webpack 也是基于此来分割我们的应用程序代码。它会识别这些 <code>import</code> 的地方，然后将这些分割出来的 import 生成所需的代码块。 <a href="https://twitter.com/wSokra/status/866703557323632640">@wSokra</a> 和 <a href="https://twitter.com/dan_abramov/status/866646657437491201">@dan_abramov</a> 指出了这一点。</p>
<p>接下来我们就可以在路由中使用 AsyncHome 组件了，当路由匹配时，React Router 将创建AsyncHome组件，然后 AsyncHome 就会动态引入Home组件。</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{AsyncHome}</span> /&gt;</span>


</code></pre><p>现在让我们回到 Notes 这个项目并应用这些更改。</p>
<p>更改后， src/Routes.js 应如下所示</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> { Route, Switch } <span class="hljs-keyword">from</span> <span class="hljs-string">"react-router-dom"</span>;
<span class="hljs-keyword">import</span> asyncComponent <span class="hljs-keyword">from</span> <span class="hljs-string">"./components/AsyncComponent"</span>;
<span class="hljs-keyword">import</span> AppliedRoute <span class="hljs-keyword">from</span> <span class="hljs-string">"./components/AppliedRoute"</span>;
<span class="hljs-keyword">import</span> AuthenticatedRoute <span class="hljs-keyword">from</span> <span class="hljs-string">"./components/AuthenticatedRoute"</span>;
<span class="hljs-keyword">import</span> UnauthenticatedRoute <span class="hljs-keyword">from</span> <span class="hljs-string">"./components/UnauthenticatedRoute"</span>;

<span class="hljs-keyword">const</span> AsyncHome = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">"./containers/Home"</span>));
<span class="hljs-keyword">const</span> AsyncLogin = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">"./containers/Login"</span>));
<span class="hljs-keyword">const</span> AsyncNotes = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">"./containers/Notes"</span>));
<span class="hljs-keyword">const</span> AsyncSignup = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">"./containers/Signup"</span>));
<span class="hljs-keyword">const</span> AsyncNewNote = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">"./containers/NewNote"</span>));
<span class="hljs-keyword">const</span> AsyncNotFound = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">"./containers/NotFound"</span>));

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ({ childProps }) =&gt;
  &lt;Switch&gt;
    &lt;AppliedRoute
      path="/"
      exact
      component={AsyncHome}
      props={childProps}
    /&gt;
    &lt;UnauthenticatedRoute
      path="/login"
      exact
      component={AsyncLogin}
      props={childProps}
    /&gt;
    &lt;UnauthenticatedRoute
      path="/signup"
      exact
      component={AsyncSignup}
      props={childProps}
    /&gt;
    &lt;AuthenticatedRoute
      path="/notes/new"
      exact
      component={AsyncNewNote}
      props={childProps}
    /&gt;
    &lt;AuthenticatedRoute
      path="/notes/:id"
      exact
      component={AsyncNotes}
      props={childProps}
    /&gt;
    {/* Finally, catch all unmatched routes */}
    &lt;Route component={AsyncNotFound} /&gt;
  &lt;/Switch&gt;
;


</code></pre><p>只需进行一些更改，我们的应用程序就可以进行代码分割，而且也没有增加更多的复杂性，这非常酷。让我们再回过头来看下之前的 src/Routes.js。</p>
<pre><code class="hljs xl"><span class="hljs-keyword">import</span> React from <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> { Route, Switch } from <span class="hljs-string">"react-router-dom"</span>;
<span class="hljs-keyword">import</span> AppliedRoute from <span class="hljs-string">"./components/AppliedRoute"</span>;
<span class="hljs-keyword">import</span> AuthenticatedRoute from <span class="hljs-string">"./components/AuthenticatedRoute"</span>;
<span class="hljs-keyword">import</span> UnauthenticatedRoute from <span class="hljs-string">"./components/UnauthenticatedRoute"</span>;

<span class="hljs-keyword">import</span> Home from <span class="hljs-string">"./containers/Home"</span>;
<span class="hljs-keyword">import</span> Login from <span class="hljs-string">"./containers/Login"</span>;
<span class="hljs-keyword">import</span> Notes from <span class="hljs-string">"./containers/Notes"</span>;
<span class="hljs-keyword">import</span> Signup from <span class="hljs-string">"./containers/Signup"</span>;
<span class="hljs-keyword">import</span> NewNote from <span class="hljs-string">"./containers/NewNote"</span>;
<span class="hljs-keyword">import</span> NotFound from <span class="hljs-string">"./containers/NotFound"</span>;

export default ({ childProps }) =&gt;
  &lt;Switch&gt;
    &lt;AppliedRoute
      <span class="hljs-built_in">path</span>=<span class="hljs-string">"/"</span>
      exact
      component={Home}
      props={childProps}
    /&gt;
    &lt;UnauthenticatedRoute
      <span class="hljs-built_in">path</span>=<span class="hljs-string">"/login"</span>
      exact
      component={Login}
      props={childProps}
    /&gt;
    &lt;UnauthenticatedRoute
      <span class="hljs-built_in">path</span>=<span class="hljs-string">"/signup"</span>
      exact
      component={Signup}
      props={childProps}
    /&gt;
    &lt;AuthenticatedRoute
      <span class="hljs-built_in">path</span>=<span class="hljs-string">"/notes/new"</span>
      exact
      component={NewNote}
      props={childProps}
    /&gt;
    &lt;AuthenticatedRoute
      <span class="hljs-built_in">path</span>=<span class="hljs-string">"/notes/:id"</span>
      exact
      component={Notes}
      props={childProps}
    /&gt;
    {<span class="hljs-comment">/* Finally, catch all unmatched routes */</span>}
    &lt;Route component={NotFound} /&gt;
  &lt;/Switch&gt;
;


</code></pre><p>需要注意的是，取代了之前静态引入所有组件的方式，我们通过使用 asyncComponent 来创建组件，然后通过这个方法创建的组件将在必要时执行动态加载。</p>
<p>现在，如果您使用 <code>npm run build</code> 构建应用程序，你会看到代码分离已经成功。</p>
<p><img src="https://p2.ssl.qhimg.com/t0163ad06ce185386f7.png" alt="Create React App Code Splitting build screenshot"></p>
<p>每个.chunk.js 文件都是不同的动态加载执行的时候构建出来的。当然，我们的应用程序非常小，分割的各个部分根本不重要。但是如果有一个页面，是用来编辑笔记的，这个页面包含一个富文本编辑器，那么你可以想象它打包出来的文件将会多么大，不幸的是，它还会影响我们应用的初始加载时间。</p>
<p>通过使用<code>npm run deploy</code> 来部署我们的应用程序，我们可以在线看下这个 <a href="https://demo.serverless-stack.com/">例子</a> ，通过浏览器的控制台我们可以看到，我们的文件是按需加载的。</p>
<p><img src="https://p1.ssl.qhimg.com/t0138157ba2c26f4145.png" alt="Create React App loading Code Splitting screenshot"></p>
<p>哇塞！我们只对代码做了一些简单的更改，我们的应用程序就可以让使用 Create React App 创建的项目拥有代码分离的功能了。</p>
<h3>下一步</h3>
<p>现在看来这好像很容易实现的样子，但是你可能想知道如果加载新组件的请求花费了太长时间或失败了会发生什么，或者有时候我们可能想要预加载某些组件，比如，用户登录的页面，我们希望可以去预加载我们的个人主页页面。</p>
<p>上面提到过，我们可以在组件还在加载的时候渲染一个 「loading spinner」组件， 但我们可以更进一步以解决其中的一些边缘情况。 这里有一个很好的高阶组件可以很好地完成这个任务，这个组件就是 <a href="https://github.com/thejameskyle/react-loadable"><strong>react-loadable</strong></a>.</p>
<p>首先我们通过 npm 安装这个组件</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> npm install --save react-loadable</span>


</code></pre><p>然后使用它代替我们上面的 asyncComponent 方法</p>
<pre><code class="hljs coffeescript">const AsyncHome = Loadable({
  loader: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">"./containers/Home"</span>),
  loading: MyLoadingComponent
});


</code></pre><p>AsyncHome 组件的使用方式跟之前是完全一样的，另外这里的MyLoadingComponent 我们可以写成下面这样。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> MyLoadingComponent = <span class="hljs-function">(<span class="hljs-params">{isLoading, error}</span>) =&gt;</span> {
  <span class="hljs-comment">// Handle the loading state</span>
  <span class="hljs-keyword">if</span> (isLoading) {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
  <span class="hljs-comment">// Handle the error state</span>
  <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (error) {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Sorry, there was a problem loading the page.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
  <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }
};


</code></pre><p>这个组件代码非常简单，从代码里可以看到我们在这个组件里处理了各种边缘情况。</p>
<p>想要了解如何添加预加载以及该组件其他的功能，你可以查看<a href="https://github.com/thejameskyle/react-loadable">react-loadable</a> 的 github 仓库来了解更多特性，并享受「code splitting」的乐趣！</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/code-splitting-in-create-react-app](https://www.zcfy.cc/article/code-splitting-in-create-react-app)
原文标题: 在 Create React App 中如何使用代码分离
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

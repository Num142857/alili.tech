---
title: '[翻译]基于Webpack4使用懒加载分离打包React代码' 
date: 2018-12-11 2:30:10
hidden: true
slug: 91vlh3qco4q
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>原文地址：<a href="https://engineering.innovid.com/code-splitting-using-lazy-loading-with-react-redux-typescript-and-webpack-4-3ec60140ec5a" rel="nofollow noreferrer" target="_blank">https://engineering.innovid.com/code-splitting-using-lazy-loading-with-react-redux-typescript-and-webpack-4-3ec60140ec5a</a>  <br>作者：<a href="https://engineering.innovid.com/@avivshafir" rel="nofollow noreferrer" target="_blank">Aviv Shafir</a>  <br>摘要：Innovid网站使用Webpack4对一个React项目进行了优化改造。主要使用了新的optimization配置和动态注入功能。</blockquote>
<p>Hey，这里是<a href="http://www.innovid.com/" rel="nofollow noreferrer" target="_blank">Innovid</a>，一个领先的视频广告平台。我们每天处理130万小时的视频，而在我们的web项目中，经常会使用到Webpack。我们非常喜欢这个工具。</p>
<p>最近，我们将一个项目迁移到了最新的Webpack4。它给我们带来了一些开箱即用的新特性，比如在构建时间上进行了非常大的优化。</p>
<p>在本次迁移中，我们决定使用懒加载这一Webpack最吸引人的特性来分割app中的主要代码部分。</p>
<blockquote>代码分割能够帮助你延迟加载用户当前需要的内容，同时也能显著地提升用户体验。尽管你没有减少app的总代码量，但你已经避免加载一些用户也许永远也用不到的代码了。而且还能够在初始加载时减少加载的代码数量。  <br>——<a href="https://reactjs.org/docs/code-splitting.html" rel="nofollow noreferrer" target="_blank">React 文档</a>
</blockquote>
<p>Webpack根据你的应用程序构建了一个依赖关系图。从你的入口文件开始，它递归遍历所有文件和它们的依赖文件，使用loader和plugin对你的文件施了点魔法，最后就输出了提供给用户的生成包。</p>
<p>我们现在将生成包分为app.js（我们的应用代码）和vendors.js(第三方库)。  <br>我们使用webpack-bundle-analyzer插件来可视化两个生成包：  <br><span class="img-wrap"><img data-src="/img/remote/1460000013654185?w=1600&amp;h=758" src="https://static.alili.tech/img/remote/1460000013654185?w=1600&amp;h=758" alt="初始包" title="初始包" style="cursor: pointer; display: inline;"></span></p>
<blockquote>app.js大小116KB，vendors.js大小399KB</blockquote>
<h1 id="articleHeader0">Webpack配置</h1>
<p>app.js是我们程序的入口，所以自动打包成app.js。而第三方包vendors.js是使用了新的<code>optimization</code>配置，将从<code>node_modules</code>文件夹中引入的所有文件打包生成的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mode: &quot;production&quot;,
  entry: {
    app: path.join(__dirname, &quot;index.tsx&quot;),
  },
  output: {
    path: path.resolve(__dirname, &quot;public/dist&quot;),
    publicPath: &quot;&quot;,
    chunkFilename: &quot;[name].js&quot;,
    filename: &quot;[name].js&quot;
  },
  optimization: {
        runtimeChunk: {
            name: &quot;manifest&quot;
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: &quot;vendors&quot;,
                    priority: -20,
                    chunks: &quot;all&quot;
                }
            }
        }
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">mode: <span class="hljs-string">"production"</span>,
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: path.join(__dirname, <span class="hljs-string">"index.tsx"</span>),
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">"public/dist"</span>),
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">""</span>,
    <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">"[name].js"</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">"[name].js"</span>
  },
  <span class="hljs-attr">optimization</span>: {
        <span class="hljs-attr">runtimeChunk</span>: {
            <span class="hljs-attr">name</span>: <span class="hljs-string">"manifest"</span>
        },
        <span class="hljs-attr">splitChunks</span>: {
            <span class="hljs-attr">cacheGroups</span>: {
                <span class="hljs-attr">vendor</span>: {
                    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/[\\/]node_modules[\\/]/</span>,
                    <span class="hljs-attr">name</span>: <span class="hljs-string">"vendors"</span>,
                    <span class="hljs-attr">priority</span>: <span class="hljs-number">-20</span>,
                    <span class="hljs-attr">chunks</span>: <span class="hljs-string">"all"</span>
                }
            }
        }
   }</code></pre>
<p><em>注意：</em> 在Webpack4中，我们不再使用<code>CommonChunkPlugin</code>了，它被<code>splitChunks</code>和<code>runtimeChunk</code>这两个新API所取代。</p>
<h1 id="articleHeader1">懒加载React组件</h1>
<p>现在的vendors和app包都是用户在第一次打开页面室加载的。我们发现可以将一些“重量级”的组件懒加载来提升首屏体验，并且减少初始包的体积。</p>
<p>比如说：redux-form是一个管理react应用表单的库，它只在一个名为<code>GenerateTags</code>的大型组件中使用。由于它体积较大并且只在特定场景下被使用，所以用它来作为懒加载的实验对象是再好不过了。redux-form和GenerateTags组件可以被抽取到单独一个chunk中，这样我们在渲染首屏时请求的包体积更小。</p>
<p>让我们看看现在流行的动态导入工具库：<code>react-loadable</code>。它基础封装了未来JS的新语法<code>import()</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const GenerateTags = Loadable({
  loader: () =>
    import(/* webpackChunkName: &quot;generateTags&quot; */ &quot;./GenerateTags&quot;),
    loading: LoadingSpinner
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> GenerateTags = Loadable({
  <span class="hljs-attr">loader</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
    <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "generateTags" */</span> <span class="hljs-string">"./GenerateTags"</span>),
    <span class="hljs-attr">loading</span>: LoadingSpinner
});</code></pre>
<p>使用之后，我们的包变成了下面这样：<br><span class="img-wrap"><img data-src="/img/remote/1460000013654186?w=1600&amp;h=759" src="https://static.alili.tech/img/remote/1460000013654186?w=1600&amp;h=759" alt="抽取组件" title="抽取组件" style="cursor: pointer; display: inline;"></span></p>
<blockquote>GenerateTags已经被抽取到单独的一个chunk中，但redux-form仍然在vendor.js包里。</blockquote>
<p>结果不尽如人意，因为redux-form仍然在vendors.js包中，但我们希望它跟GenerateTags都被抽取到一个不同的chunk中来实现按需加载。</p>
<p>之所以会出现这样的情况，是因为我们在别的文件中也引用了redux-form。比如说我们在<code>combineReducers </code>中编写了下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { reducer as formReducer } from &quot;redux-form&quot;;
const applicationReducer: Reducer<any> = combineReducers({
    user,
    sidenav,
    navigation,
    //...
    form: formReducer
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { reducer <span class="hljs-keyword">as</span> formReducer } <span class="hljs-keyword">from</span> <span class="hljs-string">"redux-form"</span>;
<span class="hljs-keyword">const</span> applicationReducer: Reducer&lt;any&gt; = combineReducers({
    user,
    sidenav,
    navigation,
    <span class="hljs-comment">//...</span>
    form: formReducer
});</code></pre>
<p>这段代码顶部的静态导入语句导致redux-form库成了我们vendors包的一部分。也就是说，Webpack认为它已经被静态导入成我们的app入口依赖树的一部分，所以不能被懒加载。</p>
<p>为了解决这个问题，我们决定动态注入redux-form reducer。首先，我们移除了导入redux-form reducer的语句，并且加了下面的代码来实现动态注入redux reducer：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function injectAsyncReducer(store, name, asyncReducer) {
  if (store.asyncReducers[name]) {
    return;
  }
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}

export const configureStore = (initialState: AppState) => {
  const enhancer = compose(applyMiddleware(...getMiddleware()));
  const store: any = createStore(createReducer(), initialState, enhancer);
  store.asyncReducers = {};
  return store;
};


const createReducer = (asyncReducers = {}) => {
    return combineReducers({
        user,
        sidenav,
        navigation,
        //...
        ...asyncReducers
    });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">injectAsyncReducer</span>(<span class="hljs-params">store, name, asyncReducer</span>) </span>{
  <span class="hljs-keyword">if</span> (store.asyncReducers[name]) {
    <span class="hljs-keyword">return</span>;
  }
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> configureStore = <span class="hljs-function">(<span class="hljs-params">initialState: AppState</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> enhancer = compose(applyMiddleware(...getMiddleware()));
  <span class="hljs-keyword">const</span> store: any = createStore(createReducer(), initialState, enhancer);
  store.asyncReducers = {};
  <span class="hljs-keyword">return</span> store;
};


<span class="hljs-keyword">const</span> createReducer = <span class="hljs-function">(<span class="hljs-params">asyncReducers = {}</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> combineReducers({
        user,
        sidenav,
        navigation,
        <span class="hljs-comment">//...</span>
        ...asyncReducers
    });
};</code></pre>
<p>最后，我们在GenerateTags组件的componentDidMount中调用injectAsyncReducer方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public componentDidMount() {
    const reduxFormReducer = require(&quot;redux-form&quot;).reducer;
    injectAsyncReducer(store, &quot;form&quot;, reduxFormReducer);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">public componentDidMount() {
    <span class="hljs-keyword">const</span> reduxFormReducer = <span class="hljs-built_in">require</span>(<span class="hljs-string">"redux-form"</span>).reducer;
    injectAsyncReducer(store, <span class="hljs-string">"form"</span>, reduxFormReducer);
  }</code></pre>
<p>注意，不推荐从组件直接获取一个store的引用，因为这样会导致你在做服务端渲染时出现一些问题。  <br>在<a href="https://tylergaw.com/articles/dynamic-redux-reducers/" rel="nofollow noreferrer" target="_blank">这里</a>你可以阅读更多注入异步代码和使用HOC的知识。</p>
<h1 id="articleHeader2">TypeScript配置</h1>
<p>我们在项目中使用了typescript。我们必须在<code>tsconfig.json</code>中更新esnext的module配置，以及设置<code>removeComments</code>为<code>false</code>（要支持动态注入，TS的版本必须高于2.4）。这样，之前的动态注入才会起作用。通过“告诉”typescript编译器避开我们的import语句，并且不要对它们进行转码来让Webpack正常工作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;compilerOptions&quot;: {
    &quot;target&quot;: &quot;es5&quot;,
    &quot;sourceMap&quot;: false,
    &quot;inlineSourceMap&quot;: true,
    &quot;module&quot;: &quot;esnext&quot;,
    &quot;moduleResolution&quot;: &quot;node&quot;,
    &quot;jsx&quot;: &quot;react&quot;,
    &quot;preserveConstEnums&quot;: true,
    &quot;removeComments&quot;: false,
    &quot;lib&quot;: [&quot;es6&quot;, &quot;dom&quot;]
  },
  &quot;types&quot;: [&quot;node&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="JSON">{
  <span class="hljs-attr">"compilerOptions"</span>: {
    <span class="hljs-attr">"target"</span>: <span class="hljs-string">"es5"</span>,
    <span class="hljs-attr">"sourceMap"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">"inlineSourceMap"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"module"</span>: <span class="hljs-string">"esnext"</span>,
    <span class="hljs-attr">"moduleResolution"</span>: <span class="hljs-string">"node"</span>,
    <span class="hljs-attr">"jsx"</span>: <span class="hljs-string">"react"</span>,
    <span class="hljs-attr">"preserveConstEnums"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"removeComments"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">"lib"</span>: [<span class="hljs-string">"es6"</span>, <span class="hljs-string">"dom"</span>]
  },
  <span class="hljs-attr">"types"</span>: [<span class="hljs-string">"node"</span>]
}</code></pre>
<p>最后的结果就像下面这样：<br><span class="img-wrap"><img data-src="/img/remote/1460000013654187" src="https://static.alili.tech/img/remote/1460000013654187" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>vendors.js 314 KiB, app.js 96.6 KiB, generateTags.js 23.2 KiB, vendors~generateTags.js 90.2 KiB</blockquote>
<p>最后我们成功了，GenerateTags和它的依赖文件redux-form被提取出vendor.js并且能够被按需加载。</p>
<h1 id="articleHeader3">总结</h1>
<p>我们推荐你阅读<a href="https://developers.google.com/web/fundamentals/performance/webpack/" rel="nofollow noreferrer" target="_blank">这个文章</a>来优化Webpack。</p>
<ul>
<li>使用动态注入可以减少最终包的体积。还能疼痛感异步加载提供更快的首屏加载速度。</li>
<li>typescript从2.4版本开始支持动态注入，你只需要记住修改一部分配置就能使用这个功能。</li>
<li>迁移到Webpack4并不不复杂，但是目前还没有关于新配置和API的介绍文档。但我相信很快它们都会有的。</li>
<li>动态注入redux reducer是一个很有用的小技巧，它能够帮助我们的app在使用redux reducer时延迟加载一些库。</li>
</ul>
<blockquote>查看更多我翻译的Medium文章请访问：  <br>项目地址：<a href="https://github.com/WhiteYin/translation/tree/master" rel="nofollow noreferrer" target="_blank">https://github.com/WhiteYin/translation</a>  <br>SF专栏：<a href="https://segmentfault.com/blog/yin-translation">https://segmentfault.com/blog/yin-translation</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[翻译]基于Webpack4使用懒加载分离打包React代码

## 原文链接
[https://segmentfault.com/a/1190000013654180](https://segmentfault.com/a/1190000013654180)


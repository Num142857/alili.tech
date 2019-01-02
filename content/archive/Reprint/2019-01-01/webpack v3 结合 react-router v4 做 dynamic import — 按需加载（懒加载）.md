---
title: 'webpack v3 结合 react-router v4 做 dynamic import — 按需加载（懒加载）' 
date: 2019-01-01 2:30:07
hidden: true
slug: tjyuzh8jrup
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">为什么要做dynamic import？</h2>
<p>dynamic import不知道为什么有很多叫法，什么按需加载，懒加载，Code Splitting，代码分页等。<br>总之，就是在SPA，把JS代码分成N个页面份数的文件，不在用户刚进来就全部引入，而是等用户跳转路由的时候，再加载对应的JS文件。<br>这样做的好处就是加速首屏显示速度，同时也减少了资源的浪费。</p>
<h2 id="articleHeader1">为什么选择 webpack 3?</h2>
<ul>
<li>更高的性能</li>
<li>有scope hosting功能，不再需要rollup来处理代码冗余</li>
<li>可与react-router结合，更优雅的做dynamic import</li>
<li>最重要的一点是，我正经学webpack的时候3已结出了- -</li>
</ul>
<h2 id="articleHeader2">完整的 react spa 项目地址</h2>
<p><a href="https://github.com/CodeLittlePrince/react-webapp-spa" rel="nofollow noreferrer" target="_blank">GitHub项目地址</a></p>
<p>这个一个完整的项目，这节相关的内容可在router/routerMap.jsx中找到。</p>
<h2 id="articleHeader3">第一步：安装 babel-plugin-syntax-dynamic-import</h2>
<p>babel用的是babel-env，使用方法可以去babel官方学习，实践可看我项目的源代码。</p>
<p><code>npm i -D babel-plugin-syntax-dynamic-import</code> 以后， 在.babelrc文件的plungins中加上<code>"syntax-dynamic-import"</code>。</p>
<h2 id="articleHeader4">第二步：安装 react-loadable</h2>
<p><code>npm i -S react-loadable</code> 以后，我们就能愉快得做dynamic import了。</p>
<h2 id="articleHeader5">第三步： 编辑routerMap</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

import App from 'containers';

// 按路由拆分代码
import Loadable from 'react-loadable';
const MyLoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};
const AsyncHome = Loadable({
    loader: () => import('../containers/Home'),
    loading: MyLoadingComponent
});
const AsyncCity = Loadable({
    loader: () => import('../containers/City'),
    loading: MyLoadingComponent
});
const AsyncDetail = Loadable({
    loader: () => import('../containers/Detail'),
    loading: MyLoadingComponent
});
const AsyncSearch = Loadable({
    loader: () => import('../containers/Search'),
    loading: MyLoadingComponent
});
const AsyncUser = Loadable({
    loader: () => import('../containers/User'),
    loading: MyLoadingComponent
});
const AsyncNotFound = Loadable({
    loader: () => import('../containers/404'),
    loading: MyLoadingComponent
});

// 路由配置
class RouteMap extends React.Component {
    render() {
        return (
            <Router history={history}>
                <App>
                    <Switch>
                        <Route path=&quot;/&quot; exact component={AsyncHome} />
                        <Route path=&quot;/city&quot; component={AsyncCity} />
                        <Route path=&quot;/search/:category/:keywords?&quot; component={AsyncSearch} />
                        <Route path=&quot;/detail/:id&quot; component={AsyncDetail} />
                        <Route path=&quot;/user&quot; component={AsyncUser} />
                        <Route path=&quot;/empty&quot; component={null} key=&quot;empty&quot; />
                        <Route component={AsyncNotFound} />
                    </Switch>
                </App>
            </Router>
        );
        // 说明
        // empty Route
        // https://github.com/ReactTraining/react-router/issues/1982  解决人：PFight
        // 解决react-router v4改变查询参数并不会刷新或者说重载组件的问题 
    }
}

export default RouteMap;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { HashRouter <span class="hljs-keyword">as</span> Router, Route, Switch } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;
<span class="hljs-keyword">import</span> createHistory <span class="hljs-keyword">from</span> <span class="hljs-string">'history/createBrowserHistory'</span>;
<span class="hljs-keyword">const</span> history = createHistory();

<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'containers'</span>;

<span class="hljs-comment">// 按路由拆分代码</span>
<span class="hljs-keyword">import</span> Loadable <span class="hljs-keyword">from</span> <span class="hljs-string">'react-loadable'</span>;
<span class="hljs-keyword">const</span> MyLoadingComponent = <span class="hljs-function">(<span class="hljs-params">{ isLoading, error }</span>) =&gt;</span> {
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
<span class="hljs-keyword">const</span> AsyncHome = Loadable({
    <span class="hljs-attr">loader</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'../containers/Home'</span>),
    <span class="hljs-attr">loading</span>: MyLoadingComponent
});
<span class="hljs-keyword">const</span> AsyncCity = Loadable({
    <span class="hljs-attr">loader</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'../containers/City'</span>),
    <span class="hljs-attr">loading</span>: MyLoadingComponent
});
<span class="hljs-keyword">const</span> AsyncDetail = Loadable({
    <span class="hljs-attr">loader</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'../containers/Detail'</span>),
    <span class="hljs-attr">loading</span>: MyLoadingComponent
});
<span class="hljs-keyword">const</span> AsyncSearch = Loadable({
    <span class="hljs-attr">loader</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'../containers/Search'</span>),
    <span class="hljs-attr">loading</span>: MyLoadingComponent
});
<span class="hljs-keyword">const</span> AsyncUser = Loadable({
    <span class="hljs-attr">loader</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'../containers/User'</span>),
    <span class="hljs-attr">loading</span>: MyLoadingComponent
});
<span class="hljs-keyword">const</span> AsyncNotFound = Loadable({
    <span class="hljs-attr">loader</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'../containers/404'</span>),
    <span class="hljs-attr">loading</span>: MyLoadingComponent
});

<span class="hljs-comment">// 路由配置</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">RouteMap</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;Router history={history}&gt;
                &lt;App&gt;
                    &lt;Switch&gt;
                        &lt;Route path="/" exact component={AsyncHome} /&gt;
                        &lt;Route path="/city" component={AsyncCity} /&gt;
                        &lt;Route path="/search/:category/:keywords?" component={AsyncSearch} /&gt;
                        &lt;Route path="/detail/:id" component={AsyncDetail} /&gt;
                        &lt;Route path="/user" component={AsyncUser} /&gt;
                        &lt;Route path="/empty" component={null} key="empty" /&gt;
                        &lt;Route component={AsyncNotFound} /&gt;
                    &lt;/Switch&gt;
                &lt;/App&gt;
            &lt;/Router&gt;
        );
        // 说明
        // empty Route
        // https://github.com/ReactTraining/react-router/issues/1982  解决人：PFight
        // 解决react-router v4改变查询参数并不会刷新或者说重载组件的问题 
    }
}

export default RouteMap;</code></pre>
<h2 id="articleHeader6">大功告成</h2>
<p>我们可以运行webpack，然后就能看到效果（图仅为dev环境，build才会再打包一个vendor.js，为什么要有vendor.js，请见<a href="https://segmentfault.com/a/1190000011129059">devDependencies和dependencies的区别 &gt;&gt;</a>）</p>
<p><span class="img-wrap"><img data-src="/img/bVURhb?w=2590&amp;h=1242" src="https://static.alili.tech/img/bVURhb?w=2590&amp;h=1242" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">参考文章</h2>
<p><a href="https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html" rel="nofollow noreferrer" target="_blank">Code Splitting in Create React App</a></p>
<h2 id="articleHeader8">Q&amp;A</h2>
<p>有同学表示，我的方法做页面分离并没有什么好处，因为每个页面都依赖了三方库的代码，所以其实页面有很多冗余代码，能想到这点很棒，已经开始有架构思维了。不过，注意这个想法在<code>dev</code>环境下，这个同学是对的。</p>
<p>那到了<code>build</code>环境，或者说到了发布环境，又是怎么样的呢？的确，这篇文章我没有提到，请见我的另一篇文章<a href="https://segmentfault.com/a/1190000011129059">devDependencies和dependencies的区别</a>。这篇文章主要解释了npm的package.json中devDependencies和dependencies区别是什么。</p>
<p>看完以后，我们就可以知道，为什么我之前说“注意这个想法在<code>dev</code>环境下，这个同学是对的”了。因为，我们<code>npm run build</code>以后，webpack会把三方包打包到vendor.js文件，页面逻辑代码不会牵涉其中，每个页面都会引用vendor.js这个文件，这样的话，就不会出现重复引入冗余代码的情况了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack v3 结合 react-router v4 做 dynamic import — 按需加载（懒加载）

## 原文链接
[https://segmentfault.com/a/1190000011128817](https://segmentfault.com/a/1190000011128817)


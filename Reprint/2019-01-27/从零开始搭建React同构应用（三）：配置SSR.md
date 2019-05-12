---
title: '从零开始搭建React同构应用（三）：配置SSR' 
date: 2019-01-27 2:30:59
hidden: true
slug: 25e5uswwakg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">从零开始搭建React同构应用（三）：配置SSR</h1>
<p>这篇文章来讲解来配置<code>server side render</code>，我们先从最简单的方法开始，用cli的方式模拟实现SSR。</p>
<p><a href="https://github.com/larry011/react-isomorph-demo/tree/cb4209bb4c5e608dd67ed43963cd16c0418399e5" rel="nofollow noreferrer" target="_blank">demo在这里</a></p>
<p>主要内容：</p>
<ol>
<li><p>添加webpack的server render配置</p></li>
<li><p>使用CLI的方式测试SSR输出</p></li>
</ol>
<h2 id="articleHeader1">添加webpack的server render配置</h2>
<p>之前我是考虑在node端直接<code>require</code>源码，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//hook require
require(&quot;babel-register&quot;)({
    babelrc: &quot;false&quot;,
    presets: ['react'],
    plugins: [
        &quot;transform-decorators-legacy&quot;,
        &quot;transform-es2015-modules-commonjs&quot;
    ]
});

//直接引入源码
const IndexBundle = require(&quot;./src/index/Index.jsx&quot;);


//do server side render..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//hook require</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-register"</span>)({
    <span class="hljs-attr">babelrc</span>: <span class="hljs-string">"false"</span>,
    <span class="hljs-attr">presets</span>: [<span class="hljs-string">'react'</span>],
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-string">"transform-decorators-legacy"</span>,
        <span class="hljs-string">"transform-es2015-modules-commonjs"</span>
    ]
});

<span class="hljs-comment">//直接引入源码</span>
<span class="hljs-keyword">const</span> IndexBundle = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./src/index/Index.jsx"</span>);


<span class="hljs-comment">//do server side render...</span></code></pre>
<p>这样少编译一套代码，觉得这样维护起来更方便，但是后来实践发现有几个问题:</p>
<ol>
<li><p><code>import "xxx.styl"</code>，引入样式文件会报错。</p></li>
<li><p>这种模式下需要使用<a href="http://babeljs.io/docs/usage/babel-register/" rel="nofollow noreferrer" target="_blank">babel-register</a>，<code>babel</code>编译速度较慢，开发模式下每次修改文件再重启服务器耗时太长。</p></li>
<li><p>影响生产环境下执行效率。</p></li>
</ol>
<p>最后权衡下，还是决定使用现在多一套ssr编译配置的方案。</p>
<p>在<a href="https://github.com/larry011/react-isomorph-demo/blob/3317be01407d80819d3638a2df4b72eea5a68dcb/webpack.config.js#L69" rel="nofollow noreferrer" target="_blank">webpack.config.js</a>添加以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let serverConfig = {};

Object.assign(serverConfig, browserConfig, {
    output: {
        path: path.join(__dirname, 'build_server'),
        filename: &quot;[name].bundle.js&quot;,
        libraryTarget: 'commonjs2' //设置导出类型，web端默认是var，node需要module.exports = xxx的形式
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: &quot;babel-loader&quot;,
                query: {                //node端的babel编译配置可以简化很多
                    babelrc: &quot;false&quot;,
                    presets: ['react'],
                    plugins: [
                        &quot;transform-decorators-legacy&quot;,
                        &quot;transform-es2015-modules-commonjs&quot; //如果不转换成require，import 'xxx.styl'会报错
                    ]
                }
            },
            {
                test: /\.(styl|css)$/,          //node端不能 require('xx.css')，会报错
                loader: 'null'
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            fetch: 'isomorphic-fetch',
            promise: 'promise'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development')
        }),
    ],
    target: 'node',
    externals: [nodeExternals()], //不把node_modules中的文件打包
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> serverConfig = {};

<span class="hljs-built_in">Object</span>.assign(serverConfig, browserConfig, {
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'build_server'</span>),
        <span class="hljs-attr">filename</span>: <span class="hljs-string">"[name].bundle.js"</span>,
        <span class="hljs-attr">libraryTarget</span>: <span class="hljs-string">'commonjs2'</span> <span class="hljs-comment">//设置导出类型，web端默认是var，node需要module.exports = xxx的形式</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"babel-loader"</span>,
                <span class="hljs-attr">query</span>: {                <span class="hljs-comment">//node端的babel编译配置可以简化很多</span>
                    babelrc: <span class="hljs-string">"false"</span>,
                    <span class="hljs-attr">presets</span>: [<span class="hljs-string">'react'</span>],
                    <span class="hljs-attr">plugins</span>: [
                        <span class="hljs-string">"transform-decorators-legacy"</span>,
                        <span class="hljs-string">"transform-es2015-modules-commonjs"</span> <span class="hljs-comment">//如果不转换成require，import 'xxx.styl'会报错</span>
                    ]
                }
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(styl|css)$/</span>,          <span class="hljs-comment">//node端不能 require('xx.css')，会报错</span>
                loader: <span class="hljs-string">'null'</span>
            },
        ]
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.ProvidePlugin({
            <span class="hljs-attr">React</span>: <span class="hljs-string">'react'</span>,
            <span class="hljs-attr">ReactDOM</span>: <span class="hljs-string">'react-dom'</span>,
            <span class="hljs-attr">fetch</span>: <span class="hljs-string">'isomorphic-fetch'</span>,
            <span class="hljs-attr">promise</span>: <span class="hljs-string">'promise'</span>
        }),
        <span class="hljs-keyword">new</span> webpack.DefinePlugin({
            <span class="hljs-string">'process.env.NODE_ENV'</span>: <span class="hljs-built_in">JSON</span>.stringify(process.env.NODE_ENV) || <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">'development'</span>)
        }),
    ],
    <span class="hljs-attr">target</span>: <span class="hljs-string">'node'</span>,
    <span class="hljs-attr">externals</span>: [nodeExternals()], <span class="hljs-comment">//不把node_modules中的文件打包</span>
});</code></pre>
<p>因为<code>serverConfig</code>的配置和<code>browserConfig</code>相似，我就使用<code>Object.assign</code>来复制一份，同时做下修改。</p>
<p><code>nodejs</code>启用<code> --harmony</code>参数就可以支持绝大部分的ES6,ES7语法，如<code>async</code>等，因此只需要编译<code>JSX</code>语法和<code>import</code>语法。babel的编译速度也因此可以提高很多。<code>babelrc: "false"</code>是为了屏蔽项目目录下的<code>babel.rc</code>文件，那是给浏览器端编译使用的。</p>
<p>同时，在node环境不支持直接引入CSS文件的，如<code>require('xx.css')</code>，因此在打包的时候要忽略样式文件和资源文件，否则会报错。</p>
<p>这里我使用了<a href="https://www.npmjs.com/package/webpack-node-externals" rel="nofollow noreferrer" target="_blank">webpack-node-externals</a>插件，这个插件的原理是利用了webapck中的<a href="http://webpack.github.io/docs/configuration.html#externals" rel="nofollow noreferrer" target="_blank">externals</a>配置项，来剔除<code>node_modules</code>文件的，因为默认webapck会把所有用到的js文件统统打包，而我们由于是在node端，因此不需要把用到的库也打包了。</p>
<p>执行试试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run watch
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> watch
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVIMJg?w=761&amp;h=195" src="https://static.alili.tech/img/bVIMJg?w=761&amp;h=195" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>如果不用<a href="https://www.npmjs.com/package/webpack-node-externals" rel="nofollow noreferrer" target="_blank">webpack-node-externals</a>，打包出的文件体积会大很多</p>
<p><span class="img-wrap"><img data-src="/img/bVIMJm?w=688&amp;h=206" src="https://static.alili.tech/img/bVIMJm?w=688&amp;h=206" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">测试SSR输出</h2>
<p>其实使用React的ssr很简单，熟悉下面两个API即可：</p>
<ol>
<li><p><a href="https://facebook.github.io/react/docs/react-api.html#createelement" rel="nofollow noreferrer" target="_blank">React.createElement</a></p></li>
<li><p><a href="https://facebook.github.io/react/docs/react-dom-server.html#rendertostring" rel="nofollow noreferrer" target="_blank">ReactDOMServer.renderToString</a></p></li>
</ol>
<h3 id="articleHeader3">React.createElement</h3>
<p><span class="img-wrap"><img data-src="/img/bVFU6J?w=660&amp;h=173" src="https://static.alili.tech/img/bVFU6J?w=660&amp;h=173" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这里简单解释下，<code>React.createElement</code>把<code>React类</code>进行实例化，实例化后的组件就可以进行mount操作了，在浏览器环境我们是使用<code>ReactDOM.render()</code>来进行挂载操作的。</p>
<h3 id="articleHeader4">ReactDOMServer.renderToString</h3>
<p><span class="img-wrap"><img data-src="/img/bVFU6N?w=677&amp;h=114" src="https://static.alili.tech/img/bVFU6N?w=677&amp;h=114" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>而<code>ReactDOMServer.renderToString</code>则是把React实例渲染成HTML标签。</p>
<h3 id="articleHeader5">测试</h3>
<p>这里我们先不搭建HTTP server，暂时用cli的方式模拟一下，方便大家理解。</p>
<p>新建<a href="https://github.com/larry011/react-isomorph-demo/blob/cb4209bb4c5e608dd67ed43963cd16c0418399e5/test/cli.js" rel="nofollow noreferrer" target="_blank">cli.js</a>，写入以下内容（以<code>Index.jsx</code>为例），注意：<code>.defalut</code>不能少。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Created by chenchen on 2017/2/4.
 *
 * React server render 命令行测试
 */

//以Index.jsx为例
const IndexBundle = require(&quot;../build_server/index.bundle.js&quot;);
const React = require(&quot;react&quot;);
const ReactDOMServer = require(&quot;react-dom/server&quot;);
let {renderToString} = ReactDOMServer;
let initialData = {todoList: ['11', '22', '33']};
let instance = React.createElement(IndexBundle.default, initialData); //.defalut不能少


let str = renderToString(instance);

console.log(str);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * Created by chenchen on 2017/2/4.
 *
 * React server render 命令行测试
 */</span>

<span class="hljs-comment">//以Index.jsx为例</span>
<span class="hljs-keyword">const</span> IndexBundle = <span class="hljs-built_in">require</span>(<span class="hljs-string">"../build_server/index.bundle.js"</span>);
<span class="hljs-keyword">const</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">"react"</span>);
<span class="hljs-keyword">const</span> ReactDOMServer = <span class="hljs-built_in">require</span>(<span class="hljs-string">"react-dom/server"</span>);
<span class="hljs-keyword">let</span> {renderToString} = ReactDOMServer;
<span class="hljs-keyword">let</span> initialData = {<span class="hljs-attr">todoList</span>: [<span class="hljs-string">'11'</span>, <span class="hljs-string">'22'</span>, <span class="hljs-string">'33'</span>]};
<span class="hljs-keyword">let</span> instance = React.createElement(IndexBundle.default, initialData); <span class="hljs-comment">//.defalut不能少</span>


<span class="hljs-keyword">let</span> str = renderToString(instance);

<span class="hljs-built_in">console</span>.log(str);</code></pre>
<p>我们添加一条<code>npm script</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;test-ssr&quot;: &quot;node --harmony test/cli.js&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"test-ssr"</span>: <span class="hljs-string">"node --harmony test/cli.js"</span>
</code></pre>
<p>执行后效果如图</p>
<p><span class="img-wrap"><img data-src="/img/bVIMKK?w=968&amp;h=160" src="https://static.alili.tech/img/bVIMKK?w=968&amp;h=160" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到我们已经成功输出了组件渲染后的HTML文本了。</p>
<p>下一篇文章我将讲解如何搭建一个简单的<code>Koa server</code>，并结合这边文章内容，实现真正意义上的<code>server side render</code> ^_^。</p>
<h2 id="articleHeader6">要注意的地方</h2>
<h3 id="articleHeader7">React生命周期</h3>
<p>React组件的声明周期只会到<code>componentWillMount</code>，因此你不能在<code>componentWillMount</code>及其之前的生命周期钩子中写浏览器环境下的代码，如<code>$.ajax(...)</code>，会报错。</p>
<h3 id="articleHeader8">前后端数据同步</h3>
<p>要注意浏览器端和服务器端的数据要一致，否则会出现HTML重用失败的错误：<br><span class="img-wrap"><img data-src="/img/bVIMKV?w=1076&amp;h=159" src="https://static.alili.tech/img/bVIMKV?w=1076&amp;h=159" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader9">server side render 没有用到redux</h3>
<p>可能有人会疑惑，在浏览器编译的代码是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //初始数据，用于和server render数据同步
let initialData = window._SERVER_DATA || {};

let store = createStore(reducers, initialData, window.__REDUX_DEVTOOLS_EXTENSION__ &amp;&amp; window.__REDUX_DEVTOOLS_EXTENSION__());

let App = connect(_ => _)(Layout);//用connect包装一下，这里只用到mapStateToProps，而且不对state加以过滤

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('wrap'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-comment">//初始数据，用于和server render数据同步</span>
<span class="hljs-keyword">let</span> initialData = <span class="hljs-built_in">window</span>._SERVER_DATA || {};

<span class="hljs-keyword">let</span> store = createStore(reducers, initialData, <span class="hljs-built_in">window</span>.__REDUX_DEVTOOLS_EXTENSION__ &amp;&amp; <span class="hljs-built_in">window</span>.__REDUX_DEVTOOLS_EXTENSION__());

<span class="hljs-keyword">let</span> App = connect(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> _)(Layout);<span class="hljs-comment">//用connect包装一下，这里只用到mapStateToProps，而且不对state加以过滤</span>

ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">App</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'wrap'</span>));</code></pre>
<p>而server端的编译没有和Redux沾边，因为<code>Provider</code>和<code>connect（...）(Layout)</code>是<code>functional component</code>，本身不会多渲染出来HTML，因此可以不用Redux参与渲染。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始搭建React同构应用（三）：配置SSR

## 原文链接
[https://segmentfault.com/a/1190000008251610](https://segmentfault.com/a/1190000008251610)


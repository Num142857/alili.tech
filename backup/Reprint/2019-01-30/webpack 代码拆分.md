---
title: 'webpack 代码拆分' 
date: 2019-01-30 2:30:23
hidden: true
slug: d4l4hclkr1
categories: [reprint]
---

{{< raw >}}

                    
<p>如果利用 webpack 将项目中的所有代码打包在一起，很多时候是不适用的，因为代码中有些东西我们总是希望将其拆分出来。比如：</p>
<ul>
<li><p>样式表，希望利用 link 标签引入</p></li>
<li><p>使用概率较低的模块，希望后期需要的时候异步加载</p></li>
<li><p>框架代码，希望能利用浏览器缓存下部分不易变动的代码</p></li>
</ul>
<p>下面是我在阅读 webpack 的官方文档时候，记录的一些笔记，部分地方使用了自己的话来讲，力图让它显得更易懂。</p>
<h3 id="articleHeader0">按需加载拆分</h3>
<p>webpack 可以帮助我们将代码分成不同的逻辑块，在需要的时候加载这些代码。</p>
<h4>使用 <code>require.ensure()</code> 来拆分代码</h4>
<p><code>require.ensure()</code>  是一种使用 CommonJS 的形式来异步加载模块的策略。在代码中通过 <code>require.ensure([&lt;fileurl&gt;])</code> 引用模块，其使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require.ensure(dependencies: String[], callback: function(require), chunkName: String)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>.ensure(dependencies: <span class="hljs-built_in">String</span>[], callback: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"><span class="hljs-built_in">require</span></span>), <span class="hljs-title">chunkName</span>: <span class="hljs-title">String</span>)</span></code></pre>
<p>第一个参数指定依赖的模块，第二个参数是一个函数，在这个函数里面你可以使用 require 来加载其他的模块，webpack 会收集 ensure 中的依赖，将其打包在一个单独的文件中，在后续用到的时候使用 jsonp 异步地加载进去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require.ensure(['./a'], function(require){
    let b = require('./b');
    let a = require('./a');
    console.log(a+b)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">require</span>.ensure([<span class="hljs-string">'./a'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>)</span>{
    <span class="hljs-keyword">let</span> b = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./b'</span>);
    <span class="hljs-keyword">let</span> a = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./a'</span>);
    <span class="hljs-built_in">console</span>.log(a+b)
});</code></pre>
<p>以上代码，a  和 b 会被打包在一起，在代码中执行到这段代码的时候，会异步地去加载，加载完成后执行函数里面的逻辑。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = require('./a');
require.ensure(['./a'], function(require){
    let b = require('./b');
    console.log(a+b)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> a = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./a'</span>);
<span class="hljs-built_in">require</span>.ensure([<span class="hljs-string">'./a'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>)</span>{
    <span class="hljs-keyword">let</span> b = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./b'</span>);
    <span class="hljs-built_in">console</span>.log(a+b)
});</code></pre>
<p>如果这样写，那么 a 不会和 b 打包在一起，因为 a 已经被打包在主代码中了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require.ensure(['./c'], function(require){
    let a = require('./a');
    console.log(a)
});

require.ensure(['./c'], function(require){
    let b = require('./b');
    console.log(b)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">require</span>.ensure([<span class="hljs-string">'./c'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>)</span>{
    <span class="hljs-keyword">let</span> a = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./a'</span>);
    <span class="hljs-built_in">console</span>.log(a)
});

<span class="hljs-built_in">require</span>.ensure([<span class="hljs-string">'./c'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>)</span>{
    <span class="hljs-keyword">let</span> b = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./b'</span>);
    <span class="hljs-built_in">console</span>.log(b)
});</code></pre>
<p>以上代码中两个模块都依赖了 c 模块，这个时候会拆分出两个模块，其中都包含了 c 模块，因为在实际运用中，以上两个 <code>require.ensure</code> 的执行顺序不确定，执行与否也不确定，因此需要将 c 模块都打包进去。</p>
<p><code>require.ensure</code> 还可以传入第三个参数，这个参数用来指定打包的包名，对于上面这种情况，c 模块被打包入了两个包中，如果事先明确这两个包都会被使用，那么不妨将这两个包合并为一个，这样就不会有 c 模块被打包两次的问题了，所以可以将 chunkName 指定为同一个名字。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require.ensure(['./c'], function(require){
    let a = require('./a');
    console.log(a)
}, 'd');

require.ensure(['./c'], function(require){
    let b = require('./b');
    console.log(b)
}, 'd');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">require</span>.ensure([<span class="hljs-string">'./c'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>)</span>{
    <span class="hljs-keyword">let</span> a = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./a'</span>);
    <span class="hljs-built_in">console</span>.log(a)
}, <span class="hljs-string">'d'</span>);

<span class="hljs-built_in">require</span>.ensure([<span class="hljs-string">'./c'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>)</span>{
    <span class="hljs-keyword">let</span> b = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./b'</span>);
    <span class="hljs-built_in">console</span>.log(b)
}, <span class="hljs-string">'d'</span>);</code></pre>
<p>ok，这样以上两个 <code>require.ensure</code> 拆出来的包就合并为同一个了。</p>
<h3 id="articleHeader1">CSS 拆分</h3>
<p>开发者，可能希望能将工程中的所有引入的 CSS 拆分为单个文件，这样可以利用缓存，且利用 CSS 和 JavaScript 并行加载，来加速 web 应用。</p>
<h4>使用 <code>css-loader</code>
</h4>
<p>为了加载 css，这里需要用到 <code>css-loader</code>，配置方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    loaders: [{
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'css-loader'
    }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">loaders</span>: [{
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'css-loader'</span>
    }]
}</code></pre>
<p>这样在代码中就可以写如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let css = require('./main.css');
console.log('' + css);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> css = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./main.css'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">''</span> + css);</code></pre>
<p>通过 require 一个 css 得到其内容，当然了这里 <code>require('./main.css')</code> 实际得到的是一个对象，需要调用其 <code>toString</code> 方法将其转换为字符串。在代码中引用一段 css，这常常不是我们想要的。为此可以使用 <code>style-loader</code> 在代码执行起来的时候，会将这些 css 插入到 style 标签中，只是这里 css 还是存在于 js 中的，是后来动态插入到页面中的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    loaders: [{
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader'
    }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">loaders</span>: [{
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'style-loader!css-loader'</span>
    }]
}</code></pre>
<p>更多时候，是希望将 css 拆分为单个文件，然后使用 link 标签嵌入到 html 中，CSS 和 JavaScript 可以并行加载，css 还可以被缓存下来。</p>
<h4>使用 <code>extract-text-webpack-plugin</code> 来拆分 css</h4>
<p>为了使用这个插件首先需要通过 npm 来安装它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i --save-dev extract-text-webpack-plugin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code class="sh" style="word-break: break-word; white-space: initial;">npm i --<span class="hljs-built_in">save</span>-dev extract-<span class="hljs-built_in">text</span>-webpack-plugin</code></pre>
<p>然后在 webpack 的配置文件中使用该插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = function () {
    return {
        entry: './index.js',
        output: {
            path: './build',
            filename: 'bundle.js'
        },
        module: {
            loaders: [{
                test: /\.css$/,
                exclude: /node_modules/,
                // 在 loader 中使用该插件
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }]
        },
        plugins: [
            // 将其添加在插件中
            new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true })
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">entry</span>: <span class="hljs-string">'./index.js'</span>,
        <span class="hljs-attr">output</span>: {
            <span class="hljs-attr">path</span>: <span class="hljs-string">'./build'</span>,
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
        },
        <span class="hljs-attr">module</span>: {
            <span class="hljs-attr">loaders</span>: [{
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
                <span class="hljs-comment">// 在 loader 中使用该插件</span>
                loader: ExtractTextPlugin.extract(<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>)
            }]
        },
        <span class="hljs-attr">plugins</span>: [
            <span class="hljs-comment">// 将其添加在插件中</span>
            <span class="hljs-keyword">new</span> ExtractTextPlugin({ <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.css'</span>, <span class="hljs-attr">disable</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">allChunks</span>: <span class="hljs-literal">true</span> })
        ]
    }
}</code></pre>
<p>需要注意的是，对于 webpack1 和 webpack2 这个插件的配置方法是不同的，差别比较细微，详情请看官方文档 <a href="https://github.com/webpack/extract-text-webpack-plugin/blob/master/README.md" rel="nofollow noreferrer" target="_blank">extract text plugin for webpack 2</a></p>
<h3 id="articleHeader2">拆分业务代码与框架代码</h3>
<p>通常一个 web 应用都会引用若干第三方库，这些第三方库通常比较稳定不会经常变动，但是如果将业务代码和框架代码打包在了一起，这样业务代码每次变动打包得到的结果都会变动，及时只改变了一个字符，浏览器也无法利用缓存，必须全部重新加载。因此，何不将第三方库单独打包在一起呢？</p>
<p>这里举个案例，一个 react 项目中使用了 <code>react</code> 和 <code>react-dom</code> 这两个包，我希望将他们打包在一起，将业务代码打包在一起。</p>
<p>下面一步一步来：</p>
<p><strong>1. 安装 <code>react</code> 和 <code>react-dom</code>:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i react react-dom --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">npm i react react-dom --save</code></pre>
<p><strong>2. 配置 entry，output 和 loader</strong></p>
<p>先使用单入口，让代码工作起来。另外因为使用了 react 所以要使用 <code>babel-loader</code> 来加载 js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js

module.exports = {
    entry: 'index.js',
    output: {
        path: 'build/',
        filname: '[name]@[chunkhash].js'
    },
    module:{
        loaders:[{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack.config.js</span>

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: <span class="hljs-string">'index.js'</span>,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'build/'</span>,
        <span class="hljs-attr">filname</span>: <span class="hljs-string">'[name]@[chunkhash].js'</span>
    },
    <span class="hljs-attr">module</span>:{
        <span class="hljs-attr">loaders</span>:[{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
            <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>
        }]
    }
}</code></pre>
<p><strong>3. 编写业务代码</strong></p>
<p>index.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';


var Hello = React.createClass({
    render: function() {
        return <div>Hello {this.props.name}</div>;
    }
});

ReactDOM.render(<Hello name={'world'} />, document.getElementById('app'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;


<span class="hljs-keyword">var</span> Hello = React.createClass({
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
    }
});

ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Hello</span> <span class="hljs-attr">name</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">world</span>'} /&gt;</span>, document.getElementById('app'));</span></code></pre>
<p>index.html:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;></div>
<!--entry 为一个字符串，这个 chunk 的名字会是 main， 因此这里引入 main.js -->
<script src=&quot;build/main.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!--entry 为一个字符串，这个 chunk 的名字会是 main， 因此这里引入 main.js --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"build/main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>启动 <code>webpack-dev-server</code>，打开浏览器这个时候应该能在页面上看到 <code>hello world</code>，这说明工作正常。</p>
<p><strong>4. 拆分框架代码</strong></p>
<p>为了拆分框架代码，我们需要增加一个入口，在这个入口中要包含 <code>react</code> 和 <code>react-dom</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: {
        main: 'index.js',
        vendor: ['react', 'react-dom']
    }
    //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">main</span>: <span class="hljs-string">'index.js'</span>,
        <span class="hljs-attr">vendor</span>: [<span class="hljs-string">'react'</span>, <span class="hljs-string">'react-dom'</span>]
    }
    <span class="hljs-comment">//...</span>
}</code></pre>
<p>单单像上面这样配置，打包后会得到 <code>main.js</code> 和 <code>vendor.js</code>，但会发现在 <code>main.js</code> 中依然包含了 react 和 react-dom 的代码，这是因为指定了入口后，webpack 就会从入口文件开始讲整个依赖打包进来，<code>index.js</code> 中引用了 react 和 react-dom 自然会被打包进去。要想达到之前所说的那个效果，还需要借助一个插件 —— <code>CommonsChunkPlugin</code></p>
<p><strong>5. 使用 CommonsChunkPlugin </strong></p>
<p>这个插件的功能是将多个打包结果中公共的部分抽取出来，作为一个单独的文件。它符合目前的场景，因为 <code>main.js</code> 和 <code>vendor.js</code> 中存在一份公共的代码，那就是 <code>vendor.js</code> 中的内容。（这个说法并不准确，这里只是指 react 和 react-dom 都被打包进了这两个文件）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let webpack = require('webpack');

module.exports = {
    entry: {
        main: 'index.js',
        vendor: ['react', 'react-dom']
    },
    //...

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // 指定一个希望作为公共包的入口
        })
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">main</span>: <span class="hljs-string">'index.js'</span>,
        <span class="hljs-attr">vendor</span>: [<span class="hljs-string">'react'</span>, <span class="hljs-string">'react-dom'</span>]
    },
    <span class="hljs-comment">//...</span>

    plugins: [
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
            <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor'</span> <span class="hljs-comment">// 指定一个希望作为公共包的入口</span>
        })
    ]
}</code></pre>
<p>再进行打包，这个时候会发现 <code>main.js</code> 中的代码不在包含 react 的代码了。看似实现了我们的需求，但真实应用下并没有这么简单，在实际项目中 js 脚本通常都会给添加一个 MD5 的 hash 在后面，形如 <code>app@709d9850745a4c8ba1d4.js</code> 这样每次打包后，如果文件内容变了，后面的 hash 也会变动。就以上场景，会发现当我们修改了业务代码后，得到的 hash 是不同的，因此每次都会得到两个不同的打包结果。业务代码改变了，拆分出来的框架包也变了，这显然不符合初衷 —— 利用浏览器缓存。</p>
<p>这是因为 webpack 在打包的时候会产生一些运行时代码，比如 <code>__webpack_require__</code> 、<code>webpackJsonp</code> 等等，这些函数是用来帮助 webpack 完成模块加载等功能的，业务代码的改变会导致业务代码打包后的 hash 值改变，而在 webpack 的运行时代码中实际上是保存了打包后的结果的文件名的，因为它在异步加载模块的时候需要用到。因此，下面需要做的是将 webpack 的运行时代码拆分出来。</p>
<p>修改 plugins 如下，将 name 修改为 names，并增加一个 init 的包名，执行打包，会发现 webpack 的运行时代码都被入该包内。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'init']
    })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">plugins: [
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
        <span class="hljs-attr">names</span>: [<span class="hljs-string">'vendor'</span>, <span class="hljs-string">'init'</span>]
    })
]</code></pre>
<p>这样以来，修改了业务代码后，<code>vendor</code> 因为只引用了 react 和 react-dom 因此，业务代码的改变不会改变 vendor 这个包的内容，hash 也保持不变。<strong>但，也仅仅如此</strong> 如果你引用了其他模块，webpack 收集依赖的时候会给每个模块编一个号，引入其他模块会导致模块数改变，也就会导致编号改变，这个时候打包出来的 vendor 还是会改变。</p>
<p>那么到底该如何解决这个问题呢？在官方文档上没有找到解决方案。后面我会继续探索这一问题，找到解决方案后会及时更新到这里，如果你有解决方案，还请不吝赐教，谢谢。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack 代码拆分

## 原文链接
[https://segmentfault.com/a/1190000007649417](https://segmentfault.com/a/1190000007649417)


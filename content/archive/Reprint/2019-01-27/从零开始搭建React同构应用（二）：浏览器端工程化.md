---
title: '从零开始搭建React同构应用（二）：浏览器端工程化' 
date: 2019-01-27 2:30:59
hidden: true
slug: 1ro8eh25cbi
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">从零开始搭建React同构应用（二）</h1>
<h2 id="articleHeader1">项目工程化（浏览器端）</h2>
<p>在<a href="https://segmentfault.com/a/1190000007512055">从零开始React同构开发（一）</a>中我们已经能实现基本的React配置和编译了。接下来我们需要将编译工作工程化。</p>
<h2 id="articleHeader2">代码</h2>
<p><a href="https://github.com/larry011/react-isomorph-demo/tree/c711f382b3bd1fbb29112ea630a2e854d98c4896" rel="nofollow noreferrer" target="_blank">代码在这</a>，建议下载后，对照着看，因为文章不方便把所有的代码贴上来</p>
<h2 id="articleHeader3">主要内容</h2>
<ol>
<li><p>项目目录结构优化</p></li>
<li><p><code>stylus</code>样式文件的处理和打包</p></li>
<li><p><code>extract-text-webpack-plugin</code>配置</p></li>
<li><p><code>html-webpack-plugin</code>配置</p></li>
<li><p>配置<code>browser-sync</code>自动刷新（利用es6的<code>decoratort</code>特性）</p></li>
</ol>
<h2 id="articleHeader4">项目目录结构优化</h2>
<p>先看下整理后的目录结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   src
    ├─config //附加webpack配置文件
    ├─module
    │  ├─common //公共模块
    │  │  └─stylus
    │  ├─index //首页模块
    │  │  ├─component
    │  │  └─stylus
    │  │      └─img
    │  └─TodoDetail //todo详情模块
    │      └─stylus
    └─template //HTML模版
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>   src
    ├─<span class="hljs-built_in">config</span> <span class="hljs-comment">//附加webpack配置文件</span>
    ├─<span class="hljs-keyword">module</span>
    │  ├─common <span class="hljs-comment">//公共模块</span>
    │  │  └─stylus
    │  ├─index <span class="hljs-comment">//首页模块</span>
    │  │  ├─component
    │  │  └─stylus
    │  │      └─img
    │  └─TodoDetail <span class="hljs-comment">//todo详情模块</span>
    │      └─stylus
    └─<span class="hljs-keyword">template</span> <span class="hljs-comment">//HTML模版</span>
</code></pre>
<p><code>module</code>文件夹放置了各个模块，我把页面以模块分类，每个模块下第一层的<code>.jsx</code>文件就是页面的入口文件（common除外）。</p>
<p><a href="https://github.com/larry011/react-isomorph-demo/tree/master/src/module/common" rel="nofollow noreferrer" target="_blank">common</a>模块文件夹放置一些公共组件、公共库、公共样式等。</p>
<p><a href="https://github.com/larry011/react-isomorph-demo/tree/master/src/template" rel="nofollow noreferrer" target="_blank">template</a>文件夹用于放置<code>html-webpack-plugin</code>用到的页面模版。</p>
<p>当然我还在探索更好的目录配置方式，大家如果有想法欢迎@我^_^。</p>
<h2 id="articleHeader5">添加<code>npm script</code>
</h2>
<p>我们先添加一条<code>watch</code>命令，用于开发环境的编译。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;watch&quot;: &quot;webpack -d -w --progress --colors --bs&quot;,
    &quot;test-server&quot;: &quot;anywhere -p 18341 -d ./build&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"watch"</span>: <span class="hljs-string">"webpack -d -w --progress --colors --bs"</span>,
    <span class="hljs-string">"test-server"</span>: <span class="hljs-string">"anywhere -p 18341 -d ./build"</span>
  },</code></pre>
<h2 id="articleHeader6">样式文件处理</h2>
<h3 id="articleHeader7">css、stylus文件的处理</h3>
<p>前篇文章我们只编译了jsx，我们还没引入样式，假设现在项目的css使用<a href="http://stylus-lang.com/" rel="nofollow noreferrer" target="_blank"><code>stylus</code></a>来编写。那么可以参考以下配置。<br>我们需要3个loader:</p>
<ol>
<li><p><code>stylus-loader</code></p></li>
<li><p><code>autoprefixer-loader</code></p></li>
<li><p><code>css-loader</code></p></li>
<li><p><strong><code>vue-style-loader</code></strong></p></li>
<li><p><code>file-loader</code>和<code>url-loader</code></p></li>
</ol>
<p>这些loaders大家肯定耳熟能详啦，可能大家会对<code>vue-style-loader</code>会有疑惑，这里解释下：</p>
<blockquote><p><strong>因为在启用<code>sourceMap</code>的情况下，<code>style-loader</code>对<code>background-image</code>属性没有处理好，生成的URL链接开头为<code>chrome:// urls</code></strong>，官方库中已经有人提<a href="https://github.com/webpack/style-loader/issues/93" rel="nofollow noreferrer" target="_blank">issue</a>了，。</p></blockquote>
<p>后来<a href="http://evanyou.me/" rel="nofollow noreferrer" target="_blank">尤雨溪</a>大神fork了官方库后开发了<code>vue-style-loader</code>，完美的解决了<code>background-image</code>问题，当时发现这个库的时候真的感动的不行啊。。。</p>
<p>下面看一下样式文件loader的配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        loaders: [
            {
                test: /\.(png|jpe?g|gif)/,
                loader: 'url?limit=1024&amp;name=img/[name].[ext]'
            }, {
                test: /\.(ttf|eot|svg)$/,
                loader: &quot;url?limit=1024&amp;name=fonts/[name].[ext]&quot;
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: &quot;babel&quot;
            },
            {
                test: /\.(styl|css)$/,
                loader: &quot;vue-style!css?sourceMap!autoprefixer!stylus&quot;)
            },
        ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">        loaders: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpe?g|gif)/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">'url?limit=1024&amp;name=img/[name].[ext]'</span>
            }, {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(ttf|eot|svg)$/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"url?limit=1024&amp;name=fonts/[name].[ext]"</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"babel"</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(styl|css)$/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"vue-style!css?sourceMap!autoprefixer!stylus"</span>)
            },
        ]</code></pre>
<p>这样就可以愉快的在js中引入CSS啦</p>
<h2 id="articleHeader8">
<code>extract-text-webpack-plugin</code>配置</h2>
<p>有时候我们需要把CSS提取出来，单独打包成一个文件，这时候需要用到<code>extract-text-webpack-plugin</code></p>
<p>修改<a href="https://github.com/larry011/react-isomorph-demo/blob/master/webpack.config.js#L7" rel="nofollow noreferrer" target="_blank">webpack.config.js</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">const ExtractTextPlugin</span> = require(<span class="hljs-string">"extract-text-webpack-plugin"</span>);
</code></pre>
<p>然后修改我们原有的<code>styl-loader</code>配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.(styl|css)$/,
    loader: ExtractTextPlugin.extract([&quot;vue-style&quot;], &quot;css?sourceMap!autoprefixer!stylus&quot;)
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">test</span>: /\.(styl|css)$/,
    loader: ExtractTextPlugin.<span class="hljs-built_in">extract</span>([<span class="hljs-string">"vue-style"</span>], <span class="hljs-string">"css?sourceMap!autoprefixer!stylus"</span>)
},</code></pre>
<p>我们还要在plugin字段配置输出的CSS文件名称</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins:[
    new ExtractTextPlugin('css/[name].css'),
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">plugins:</span>[
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'css/[name].css'</span>),
]</code></pre>
<p>执行<code>watch</code>命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`npm run watch`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>`npm <span class="hljs-keyword">run</span><span class="bash"> watch`
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVIKJo?w=678&amp;h=328" src="https://static.alili.tech/img/bVIKJo?w=678&amp;h=328" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>可以看到css都被提取出来成为单独的文件了。</p>
<h2 id="articleHeader9">
<code>html-webpack-plugin</code>配置</h2>
<p>作用：</p>
<ul>
<li><p>自动生成HTML</p></li>
<li><p>自动在HTML引入<code>js</code>，<code>css</code>。</p></li>
<li><p>自动添加hash。</p></li>
</ul>
<p>我们在<code>src/config</code>新建<a href="https://github.com/larry011/react-isomorph-demo/blob/master/src/config/html-webpack-plugin.config.js" rel="nofollow noreferrer" target="_blank">html-webpack-plugin.config.js</a>文件，由于配置HTML编译。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//html-webpack-plugin.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['common', 'index'],
        template: path.resolve(__dirname, '../template/base.html'),
        hash: true,
    }),
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//html-webpack-plugin.config.js</span>
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-built_in">module</span>.exports = [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,
        <span class="hljs-attr">chunks</span>: [<span class="hljs-string">'common'</span>, <span class="hljs-string">'index'</span>],
        <span class="hljs-attr">template</span>: path.resolve(__dirname, <span class="hljs-string">'../template/base.html'</span>),
        <span class="hljs-attr">hash</span>: <span class="hljs-literal">true</span>,
    }),
]
</code></pre>
<p>修改<a href="https://github.com/larry011/react-isomorph-demo/blob/master/webpack.config.js#L6" rel="nofollow noreferrer" target="_blank">webpack.config.js</a></p>
<p><span class="img-wrap"><img data-src="/img/bVIKKD?w=1026&amp;h=596" src="https://static.alili.tech/img/bVIKKD?w=1026&amp;h=596" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>执行<code>watch</code>命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run watch
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> watch
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVIKJo?w=678&amp;h=328" src="https://static.alili.tech/img/bVIKJo?w=678&amp;h=328" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>可以看到webpack帮我们自动生成了html文件。</p>
<p><code>index.html</code>文件内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot;
          content=&quot;width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0&quot;/>
    <title>React同构开发Demo</title>
    <link href=&quot;/css/index.css?d8b82face5e26195ca7e&quot; rel=&quot;stylesheet&quot;>
</head>
<body>
<div id=&quot;wrap&quot;></div>
<script type=&quot;text/javascript&quot; src=&quot;/js/common.js?d8b82face5e26195ca7e&quot;></script>
<script type=&quot;text/javascript&quot; src=&quot;/js/index.bundle.js?d8b82face5e26195ca7e&quot;></script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span>
          <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>React同构开发Demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/css/index.css?d8b82face5e26195ca7e"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"wrap"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/js/common.js?d8b82face5e26195ca7e"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/js/index.bundle.js?d8b82face5e26195ca7e"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<h2 id="articleHeader10">配置<code>browser-sync</code>自动刷新</h2>
<p>这里我们用到ES7的<a href="http://es6.ruanyifeng.com/#docs/decorator" rel="nofollow noreferrer" target="_blank">修饰器</a>特性。目前<code>transform-decorators</code>只有第三方的实现。</p>
<p>以Index.jsx为例</p>
<ol>
<li>
<p>先修改<code>babel.rc</code>文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    &quot;react&quot;,
    &quot;es2015&quot;
  ],
  &quot;plugins&quot;: [
    &quot;transform-regenerator&quot;,
    &quot;transform-decorators-legacy&quot; //添加这个
  ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [
    <span class="hljs-string">"react"</span>,
    <span class="hljs-string">"es2015"</span>
  ],
  <span class="hljs-attr">"plugins"</span>: [
    <span class="hljs-string">"transform-regenerator"</span>,
    <span class="hljs-string">"transform-decorators-legacy"</span> //添加这个
  ]
}
</code></pre>
</li>
<li><p>在config文件夹添加<a href="https://github.com/larry011/react-isomorph-demo/blob/master/src/config/browser-sync.config.js" rel="nofollow noreferrer" target="_blank">browser-sync.config.js</a></p></li>
<li><p>修改<a href="https://github.com/larry011/react-isomorph-demo/blob/master/webpack.config.js#L8" rel="nofollow noreferrer" target="_blank">webpack.config.js</a><br><span class="img-wrap"><img data-src="/img/bVIKIx?w=909&amp;h=588" src="https://static.alili.tech/img/bVIKIx?w=909&amp;h=588" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>在common文件夹添加<a href="https://github.com/larry011/react-isomorph-demo/blob/master/src/module/common/bs.js" rel="nofollow noreferrer" target="_blank">bs.js</a></p></li>
<li><p>在React组件中引入<code>bs.js</code><br><span class="img-wrap"><img data-src="/img/bVIKHJ?w=632&amp;h=246" src="https://static.alili.tech/img/bVIKHJ?w=632&amp;h=246" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p></li>
</ol>
<p>执行<code>watch</code>命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`npm run watch`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>`npm <span class="hljs-keyword">run</span><span class="bash"> watch`
</span></code></pre>
<p>刷新浏览器，看到下图说明自动刷新服务已经成功开启<br><span class="img-wrap"><img data-src="/img/bVIKIc?w=322&amp;h=165" src="https://static.alili.tech/img/bVIKIc?w=322&amp;h=165" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader11">webapck小技巧</h2>
<p>减小路径的书写量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
    extensions: ['.jsx', '.js', ''],
    alias: {
        'common': path.join(__dirname, 'module/common')
    }
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>: {
    <span class="hljs-attribute">extensions</span>: [<span class="hljs-string">'.jsx'</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">''</span>],
    alias: {
        <span class="hljs-string">'common'</span>: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'module/common'</span>)
    }
},
</code></pre>
<p>自动引入库，不用每次都写import</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            fetch: 'isomorphic-fetch',
            promise: 'promise'
        }),
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.ProvidePlugin</span>({
            <span class="hljs-attribute">React</span>: <span class="hljs-string">'react'</span>,
            ReactDOM: <span class="hljs-string">'react-dom'</span>,
            fetch: <span class="hljs-string">'isomorphic-fetch'</span>,
            promise: <span class="hljs-string">'promise'</span>
        }),
</code></pre>
<p>区分生产和开发环境</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development'),
    }),
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
        <span class="hljs-string">'process.env.NODE_ENV'</span>: <span class="hljs-built_in">JSON</span>.stringify(process.env.NODE_ENV) || <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">'development'</span>),
    }),
</code></pre>
<p>使用<code>cross-env</code>来跨平台设置环境变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;watch&quot;: &quot;webpack -d -w --progress --colors --bs&quot;,
    &quot;test-server&quot;: &quot;anywhere -p 18341 -d ./build&quot;,
    &quot;dist&quot;: &quot;cross-env NODE_ENV='production' webpack -p&quot;
  }
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"watch"</span>: <span class="hljs-string">"webpack -d -w --progress --colors --bs"</span>,
    <span class="hljs-string">"test-server"</span>: <span class="hljs-string">"anywhere -p 18341 -d ./build"</span>,
    <span class="hljs-string">"dist"</span>: <span class="hljs-string">"cross-env NODE_ENV='production' webpack -p"</span>
  }
  </code></pre>
<p>提取公共js、css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'js/common.js',
    }),
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.CommonsChunkPlugin</span>({
        <span class="hljs-attribute">name</span>: <span class="hljs-string">'common'</span>,
        filename: <span class="hljs-string">'js/common.js'</span>,
    }),
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始搭建React同构应用（二）：浏览器端工程化

## 原文链接
[https://segmentfault.com/a/1190000008245218](https://segmentfault.com/a/1190000008245218)


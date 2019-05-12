---
title: 'webpack学习（三）—— webpack-dev-server' 
date: 2019-02-01 2:30:10
hidden: true
slug: 80q2lggkmm
categories: [reprint]
---

{{< raw >}}

                    
<p>本文主要介绍以下两方面的内容：</p>
<ol>
<li><p><code>webpack-dev-server</code>自动刷新</p></li>
<li><p>热加载（<code>Hot Module Replacement</code>）</p></li>
</ol>
<h2 id="articleHeader0">自动刷新</h2>
<p><code>webpack-dev-server</code>提供了两种自动刷新的模式</p>
<ol>
<li><p><code>iframe</code>模式</p></li>
<li><p><code>inline</code>模式</p></li>
</ol>
<p>这两种模式都支持<code>Hot Module Replacement</code>（热加载），所谓<code>热加载</code>是指当文件发生变化后，内存中的bundle文件会收到通知，同时更新页面中变化的部分，而非重新加载整个页面。</p>
<p>我们先介绍自动刷新，再来谈热加载。</p>
<h3 id="articleHeader1">
<code>iframe</code>模式</h3>
<p>前两篇文章中提到，我们在控制台输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">$ webpack-dev-<span class="hljs-keyword">server</span></code></pre>
<p>就启动了服务，并且支持自动刷新，其实，这种方式就是<code>iframe</code>模式。查看页面元素可以发现：</p>
<p><span class="img-wrap"><img data-src="/img/bVE55a?w=1048&amp;h=597" src="https://static.alili.tech/img/bVE55a?w=1048&amp;h=597" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如图中黑框所示，可以看到其实是通过iframe内使我们实际的页面。<br>这种方式有一点需要注意：浏览器地址栏的url地址不会受页面跳转的影响，将一直保持为<code>http://localhost:8080/webpack-dev-server</code>。<br>比如，现在给index.html页面加上一个跳转链接，跳转到<code>foo.html</code>。<br><code>foo.html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html>
    <head>
        <meta charset=&quot;utf-8&quot;>
        <title>webpack demo</title>
    </head>
    <body>
        <p>this is another page</p>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>webpack demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>this is another page<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><code>index.html</code>中加入跳转链接如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div class=&quot;main&quot; id=&quot;main&quot;>
        <p>webpack demo</p>
    </div>
    <a href=&quot;./foo.html&quot;>click here to go to foo.html</a>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"main"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>webpack demo<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"./foo.html"</span>&gt;</span>click here to go to foo.html<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>当点击链接跳转到<code>foo.html</code>页面时，可以看到浏览器的地址栏中仍然是<code>http://localhost:8080/webpack-dev-server</code>。如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVE560?w=959&amp;h=256" src="https://static.alili.tech/img/bVE560?w=959&amp;h=256" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">
<code>inline</code>模式</h3>
<p>这里要说一下，目前我们启动<code>webpack-dev-server</code>都是通过命令行实现的。实际上，还可以通过<code>node</code>API <code>WebpackDevServer</code>实现。<br>先看命令行如何实现<code>inline</code>模式，有两种方法：<br>1、启动时配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server --inline" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">$ webpack-dev-server <span class="hljs-comment">--inline</span></code></pre>
<p>2、配置文件配置，在<code>webpack.config.js</code>中加入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServer: { inline: true }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">devServer</span>: { <span class="hljs-attribute">inline</span>: true }</code></pre>
<p>这样我们就可以通过<code>http://localhost:8080/&lt;path&gt;</code>来访问我们的文件了。比如这样<code>http://localhost:8080/index.html</code>来访问<code>index.html</code>，且页面跳转回反映在浏览器的地址栏中。</p>
<p>接下来说明如何使用<code>WebpackDevServer</code>来实现<code>inline</code>模式。<br>在项目根目录下创建<code>server.js</code>，通过这个文件来起服务。<br><code>server.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config.js');
config.entry.unshift(&quot;webpack-dev-server/client?http://localhost:8080/&quot;);
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    publicPath: '/dist/'
});
server.listen(8080);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> WebpackDevServer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-dev-server'</span>);

<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.config.js'</span>);
config.entry.unshift(<span class="hljs-string">"webpack-dev-server/client?http://localhost:8080/"</span>);
<span class="hljs-keyword">var</span> compiler = webpack(config);
<span class="hljs-keyword">var</span> server = <span class="hljs-keyword">new</span> WebpackDevServer(compiler, {
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/dist/'</span>
});
server.listen(<span class="hljs-number">8080</span>);</code></pre>
<p>有几个问题需要说明：<br>1、这里加载了<code>webpack</code>和<code>webpack-dev-server</code>两个模块，这个<code>require</code>默认会从<code>node-modules</code>中去加载。由于我们之前安装时为了方便在命令行下使用，采用了全局安装的方式<code>-g</code>，所以本地并没有安装这个模块。这里需要在当前项目中再进行安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install webpack webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> webpack webpack-dev-<span class="hljs-keyword">server</span></code></pre>
<p>2、在配置文件<code>webpack.config.js</code>中无需再对<code>devServer</code>进行配置，因为我们这样启动服务的话，<code>WebpackDevServer</code>是访问不到<code>webpack</code>中的配置的。但是，我们需要对配置文件的<code>entry</code>进行修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: [&quot;./src/entry.js&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">entry</span>: [<span class="hljs-string">"./src/entry.js"</span>]</code></pre>
<p>以数组方式来写，这样就可以支持多个入口文件。同时在<code>server.js</code>中加入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config.entry.unshift(&quot;webpack-dev-server/client?http://localhost:8080/&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">config</span>.entry.unshift(<span class="hljs-string">"webpack-dev-server/client?http://localhost:8080/"</span>)<span class="hljs-comment">;</span></code></pre>
<p>3、<code>WebpackDevServer</code>支持两个参数，其中第二个参数对<code>WebpackDevServer</code>进行了配置，刚刚提到，<code>WebpackDevServer</code>是访问不到<code>webpack</code>中的配置的，所以这里我们要再设置<code>publicPath</code>。<br>当然，为了方便处理，一般我们可以统一将<code>WebpackDevServer</code>的配置在<code>webpack.config.js</code>中的<code>devServer</code>中设置，再将<code>devServer</code>作为第二个参数传给<code>WebpackDevServer</code>。如下：<br><code>webpack.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    devServer: {  //这里配置webpack-dev-server
        publicPath: '/dist/'
        //这里还可以加入其它你需要的参数
    },
    entry: [&quot;./src/entry.js&quot;],
    output: {
        path: path.join( __dirname, '/dist'),
        publicPath: '/dist/',
        filename: &quot;bundle.js&quot;
    },
    module: {
        loaders: [
            //....
        ]
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    devServer: {  <span class="hljs-comment">//这里配置webpack-dev-server</span>
        publicPath: <span class="hljs-string">'/dist/'</span>
        <span class="hljs-comment">//这里还可以加入其它你需要的参数</span>
    },
    entry: [<span class="hljs-string">"./src/entry.js"</span>],
    output: {
        path: path.join( __dirname, <span class="hljs-string">'/dist'</span>),
        publicPath: <span class="hljs-string">'/dist/'</span>,
        filename: <span class="hljs-string">"bundle.js"</span>
    },
    <span class="hljs-keyword">module</span>: {
        loaders: [
            <span class="hljs-comment">//....</span>
        ]
    }
};</code></pre>
<p><code>server.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var config = require('./webpack.config.js');
config.entry.unshift(&quot;webpack-dev-server/client?http://localhost:8080/&quot;);
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, config.devServer);  //这里将其作为参数传进来
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">config</span> = require('./webpack<span class="hljs-variable">.config</span><span class="hljs-variable">.js</span>');
<span class="hljs-keyword">config</span><span class="hljs-variable">.entry</span><span class="hljs-variable">.unshift</span>(<span class="hljs-string">"webpack-dev-server/client?http://localhost:8080/"</span>);
<span class="hljs-keyword">var</span> compiler = webpack(<span class="hljs-keyword">config</span>);
<span class="hljs-keyword">var</span> server = <span class="hljs-keyword">new</span> WebpackDevServer(compiler, <span class="hljs-keyword">config</span><span class="hljs-variable">.devServer</span>);  <span class="hljs-comment">//这里将其作为参数传进来</span>
</code></pre>
<p>最后运行<code>server.js</code>就可以启动服务了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node server.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>$ <span class="hljs-keyword">node</span> <span class="hljs-title">server</span>.js
</code></pre>
<p>到这里为止，自动刷新的内容基本讲完了。注意到一点，目前自动刷新都是刷新整个页面。下面来说下热加载，也就是只有变化的内容更新，而非刷新整个页面。</p>
<h2 id="articleHeader3">
<code>Hot Module Replacement</code>（热加载）</h2>
<p>方法一：直接通过命令行设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server --hot" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">$ webpack-dev-server <span class="hljs-comment">--hot</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVE6sZ?w=1434&amp;h=589" src="https://static.alili.tech/img/bVE6sZ?w=1434&amp;h=589" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>打开页面可以在控制台看到以上内容，说明热加载配置成功。其中<code>HMS</code>表示热加载模块，<code>WDS</code>表示<code>webpack-dev-server</code>。</p>
<p>方法二：通过<code>nodejs</code>的<code>api</code>配置  <br>这个方法需要对<code>webpack.config.js</code>做出一些配置。<br>第一步：在<code>webpack</code>配置文件入口参数中加入<code>webpack/hot/dev-server</code></p>
<p>在<code>server.js</code>中作如下修改即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config.entry.unshift(&quot;webpack-dev-server/client?http://localhost:8080/&quot;, &quot;webpack/hot/dev-server&quot;);  //这里在入口参数中又添加了一项，为热加载的dev-server
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">config</span>.entry.unshift(<span class="hljs-string">"webpack-dev-server/client?http://localhost:8080/"</span>, <span class="hljs-string">"webpack/hot/dev-server"</span>);  <span class="hljs-comment">//这里在入口参数中又添加了一项，为热加载的dev-server</span>
</code></pre>
<p>第二步：添加plugin，添加热加载模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    new webpack.HotModuleReplacementPlugin()
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">plugins:</span> [
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
]
</code></pre>
<p>第三步：在<code>devServer</code>中配置<code>hot</code>为<code>true</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServer: {
    publicPath: '/dist/',
    hot: true  //这里配置了热加载模式为true
    //这里还可以加入其它你需要的参数
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">devServer</span>: {
    <span class="hljs-attribute">publicPath</span>: <span class="hljs-string">'/dist/'</span>,
    <span class="hljs-attribute">hot</span>: true  <span class="hljs-comment">//这里配置了热加载模式为true</span>
    <span class="hljs-comment">//这里还可以加入其它你需要的参数</span>
}
</code></pre>
<p>最终，<code>webpack.config.js</code>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let path = require('path');
let webpack = require('webpack');

module.exports = {
    devServer: {
        publicPath: '/dist/',
        hot: true
        //这里还可以加入其它你需要的参数
    },
    entry: [&quot;./src/entry.js&quot;],
    output: {
        path: path.join( __dirname, '/dist'),
        publicPath: '/dist/',
        filename: &quot;bundle.js&quot;
    },
    module: {
        loaders: [
            {
                test: /\.css$/, 
                loader: &quot;style!css&quot;
            },
            {
                test: /\.less$/,
                loader: &quot;style!css!less&quot;
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: &quot;babel-loader&quot;
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">let</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
    devServer: {
        publicPath: <span class="hljs-string">'/dist/'</span>,
        hot: <span class="hljs-literal">true</span>
        <span class="hljs-comment">//这里还可以加入其它你需要的参数</span>
    },
    entry: [<span class="hljs-string">"./src/entry.js"</span>],
    output: {
        path: path.join( __dirname, <span class="hljs-string">'/dist'</span>),
        publicPath: <span class="hljs-string">'/dist/'</span>,
        filename: <span class="hljs-string">"bundle.js"</span>
    },
    <span class="hljs-keyword">module</span>: {
        loaders: [
            {
                test: <span class="hljs-regexp">/\.css$/</span>, 
                loader: <span class="hljs-string">"style!css"</span>
            },
            {
                test: <span class="hljs-regexp">/\.less$/</span>,
                loader: <span class="hljs-string">"style!css!less"</span>
            },
            {
                test: <span class="hljs-regexp">/\.js$/</span>,
                exclude: <span class="hljs-regexp">/node_modules/</span>,
                loader: <span class="hljs-string">"babel-loader"</span>
            }
        ]
    },
    plugins: [
        <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
    ]
};
</code></pre>
<p><code>server.js</code>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config.js');
config.entry.unshift(&quot;webpack-dev-server/client?http://localhost:8080/&quot;, &quot;webpack/hot/dev-server&quot;);
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, config.devServer);
server.listen(8080);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> WebpackDevServer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-dev-server'</span>);

<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.config.js'</span>);
config.entry.unshift(<span class="hljs-string">"webpack-dev-server/client?http://localhost:8080/"</span>, <span class="hljs-string">"webpack/hot/dev-server"</span>);
<span class="hljs-keyword">var</span> compiler = webpack(config);
<span class="hljs-keyword">var</span> server = <span class="hljs-keyword">new</span> WebpackDevServer(compiler, config.devServer);
server.listen(<span class="hljs-number">8080</span>);
</code></pre>
<p>启动服务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node server.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-keyword">node</span> <span class="hljs-title">server</span>.js</code></pre>
<p>可以看到配置成功，如下图所示：<br><span class="img-wrap"><img data-src="/img/bVE6uz?w=1433&amp;h=630" src="https://static.alili.tech/img/bVE6uz?w=1433&amp;h=630" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">结语</h2>
<p>至此，本文对<code>webpack-dev-server</code>的自动刷新和热加载做了详细介绍，当然，它的原理还有待更深一步的探索。后续我还会进行更深入的学习，希望和大家共同进步。</p>
<h2 id="articleHeader5">参考资料</h2>
<p><a href="http://webpack.github.io/docs/webpack-dev-server.html" rel="nofollow noreferrer" target="_blank"></a><a href="http://webpack.github.io/docs/webpack-dev-server.html" rel="nofollow noreferrer" target="_blank">http://webpack.github.io/docs...</a></p>
<p>（本文完）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack学习（三）—— webpack-dev-server

## 原文链接
[https://segmentfault.com/a/1190000007374078](https://segmentfault.com/a/1190000007374078)


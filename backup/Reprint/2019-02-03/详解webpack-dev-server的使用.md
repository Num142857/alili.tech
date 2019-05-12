---
title: '详解webpack-dev-server的使用' 
date: 2019-02-03 2:30:40
hidden: true
slug: rjs1q1m7g0a
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">webpack-dev-server</h1>
<p>webpack-dev-server是一个小型的<code>Node.js Express</code>服务器,它使用<code>webpack-dev-middleware</code>来服务于webpack的包,除此自外，它还有一个通过<a href="http://sockjs.org" rel="nofollow noreferrer" target="_blank">Sock.js</a>来连接到服务器的微型运行时.</p>
<p>我们来看一下下面的配置文件(<code>webpack.config.js</code>)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require(&quot;path&quot;);
module.exports = {
    entry:{
    app:[&quot;./app/main.js&quot;]
    },
    output:{
    path:path.resolve(__dirname,&quot;build&quot;),
    publicPath:&quot;/assets/&quot;,
    filename:&quot;bundle.js&quot;
}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>:{
    <span class="hljs-attr">app</span>:[<span class="hljs-string">"./app/main.js"</span>]
    },
    <span class="hljs-attr">output</span>:{
    <span class="hljs-attr">path</span>:path.resolve(__dirname,<span class="hljs-string">"build"</span>),
    <span class="hljs-attr">publicPath</span>:<span class="hljs-string">"/assets/"</span>,
    <span class="hljs-attr">filename</span>:<span class="hljs-string">"bundle.js"</span>
}
}</code></pre>
<p>这里你将你的源文件放在<code>app</code>文件夹下,并通过<code>webpack</code>将其打包到<code>build</code>文件夹下的<code>bundle.js</code>中.</p>
<p><strong>注意:</strong><code>webpack-dev-server</code>是一个独立的NPM包,你可以通过<code>npm install webpack-dev-server</code>来安装它.</p>
<h2 id="articleHeader1">基本目录</h2>
<p>webpack-dev-server默认会以当前目录为基本目录,除非你制定它.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server --content-base build/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">webpack-dev-server <span class="hljs-comment">--content-base build/</span></code></pre>
<p>上述命令是在命令行中执行的,它将<code>build</code>目录作为根目录.有一点需要注意的是:webpack-dev-server生成的包并没有放在你的真实目录中,而是放在了内存中.</p>
<p>我们在基本目录下新建一个<code>index.html</code>文件,然后在浏览器中输入<code>http://localhost:8080</code>访问.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <title>Document</title>
</head>
<body>
  <script src=&quot;assets/bundle.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"assets/bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader2">自动刷新</h2>
<p>webpack-dev-server支持两种模式来自动刷新页面.</p>
<ul>
<li><p>iframe模式(页面放在iframe中,当发生改变时重载)</p></li>
<li><p>inline模式(将webpack-dev-sever的客户端入口添加到包(bundle)中)</p></li>
</ul>
<p>两种模式都支持热模块替换(Hot Module Replacement).<strong>热模块替换的好处是只替换更新的部分,而不是页面重载</strong>.</p>
<h3 id="articleHeader3">iframe模式</h3>
<p>使用这种模式不需要额外的配置,只需要以下面这种URL格式访问即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://«host»:«port»/webpack-dev-server/«path»" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">http:<span class="hljs-regexp">//</span>«host»:«port»<span class="hljs-regexp">/webpack-dev-server/</span>«path»</code></pre>
<p>例如:<a href="http://localhost:8080/webpack-dev-server/index.html." rel="nofollow noreferrer" target="_blank">http://localhost:8080/webpack...</a></p>
<h3 id="articleHeader4">inline模式</h3>
<p>inline模式下我们访问的URL不用发生变化,启用这种模式分两种情况:</p>
<p>1 当以命令行启动webpack-dev-server时,需要做两点：</p>
<ul>
<li><p>在命令行中添加<code>--inline</code>命令</p></li>
<li><p>在<code>webpack.config.js</code>中添加<code>devServer:{inline:true}</code></p></li>
</ul>
<p>2 当以Node.js API启动<code>webpack-dev-server</code>时,我们也需要做两点:</p>
<ul>
<li><p>由于<code>webpack-dev-server</code>的配置中无<code>inline</code>选项,我们需要添加<code>webpack-dev-server/client?http://«path»:«port»/</code>到webpack配置的entry入口点中.</p></li>
<li><p>将<code>&lt;script src="http://localhost:8080/webpack-dev-server.js"&gt;&lt;/script&gt;</code>添加到html文件中</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var config = require(&quot;./webpack.config.js&quot;);
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');

config.entry.app.unshift(&quot;webpack-dev-server/client?http://localhost:8080/&quot;);

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    contentBase:'build/',
    publicPath: &quot;/assets/&quot;
});
server.listen(8080);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./webpack.config.js"</span>);
    <span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
    <span class="hljs-keyword">var</span> WebpackDevServer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-dev-server'</span>);

config.entry.app.unshift(<span class="hljs-string">"webpack-dev-server/client?http://localhost:8080/"</span>);

<span class="hljs-keyword">var</span> compiler = webpack(config);
<span class="hljs-keyword">var</span> server = <span class="hljs-keyword">new</span> WebpackDevServer(compiler, {
    <span class="hljs-attr">contentBase</span>:<span class="hljs-string">'build/'</span>,
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">"/assets/"</span>
});
server.listen(<span class="hljs-number">8080</span>);</code></pre>
<p>在<code>Node</code>中运行上面的代码即可。</p>
<p><strong>注意：</strong>webpack配置中的<code>devSever</code>配置项只对在命令行模式有效。</p>
<h2 id="articleHeader5">(Hot Module Replacement)热模块替换</h2>
<h3 id="articleHeader6">在命令行中运行inline模式，并启用热模块替换</h3>
<p>这里只需要多增加 <code>--hot</code>指令就OK了.如下所示.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server --content-base build --inline --hot" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">content</span><span class="hljs-literal">-</span><span class="hljs-comment">base</span> <span class="hljs-comment">build</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">inline</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">hot</span></code></pre>
<p><strong>注意:</strong>命令行模式下,<code>webpack.config.js</code>中一定要配置<code>output.publicPath</code>来指定编译后的包(bundle)的访问位置.</p>
<h3 id="articleHeader7">在Nodejs API中运行inline模式，并启用热模块替换</h3>
<p>这里需要做以下三点:</p>
<ul>
<li><p>在<code>webpack.config.js</code>的<code>entry</code>选项中添加:webpack/hot/dev-server</p></li>
<li><p>在<code>webpack.config.js</code>的<code>plugins</code>选项中添加:<code>new webpack.HotModuleReplacementPlugin()</code></p></li>
<li><p>在<code>webpack-dev-server</code>的配置中添加：<code>hot:true</code></p></li>
</ul>
<h2 id="articleHeader8">webpack-dev-server中的配置选项</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var WebpackDevServer = require(&quot;webpack-dev-server&quot;);
var webpack = require(&quot;webpack&quot;);

var compiler = webpack({
  // configuration
});
var server = new WebpackDevServer(compiler, {
  // webpack-dev-server options

  contentBase: &quot;/path/to/directory&quot;,
  // Can also be an array, or: contentBase: &quot;http://localhost/&quot;,

  hot: true,
  // Enable special support for Hot Module Replacement
  // Page is no longer updated, but a &quot;webpackHotUpdate&quot; message is send to the content
  // Use &quot;webpack/hot/dev-server&quot; as additional module in your entry point
  // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does. 

  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: false,

  // Set this if you want to enable gzip compression for assets
  compress: true,

  // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  // Use &quot;**&quot; to proxy all paths to the specified server.
  // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
  proxy: {
    &quot;**&quot;: &quot;http://localhost:9090&quot;
  },

  setup: function(app) {
    // Here you can access the Express app object and add your own custom middleware to it.
    // For example, to define custom handlers for some paths:
    // app.get('/some/path', function(req, res) {
    //   res.json({ custom: 'response' });
    // });
  },

  // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
  staticOptions: {
  },

  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,
  lazy: true,
  filename: &quot;bundle.js&quot;,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  // It's a required option.
  publicPath: &quot;/assets/&quot;,
  headers: { &quot;X-Custom-Header&quot;: &quot;yes&quot; },
  stats: { colors: true }
});
server.listen(8080, &quot;localhost&quot;, function() {});
// server.close();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> WebpackDevServer = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack-dev-server"</span>);
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);

<span class="hljs-keyword">var</span> compiler = webpack({
  <span class="hljs-comment">// configuration</span>
});
<span class="hljs-keyword">var</span> server = <span class="hljs-keyword">new</span> WebpackDevServer(compiler, {
  <span class="hljs-comment">// webpack-dev-server options</span>

  contentBase: <span class="hljs-string">"/path/to/directory"</span>,
  <span class="hljs-comment">// Can also be an array, or: contentBase: "http://localhost/",</span>

  hot: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// Enable special support for Hot Module Replacement</span>
  <span class="hljs-comment">// Page is no longer updated, but a "webpackHotUpdate" message is send to the content</span>
  <span class="hljs-comment">// Use "webpack/hot/dev-server" as additional module in your entry point</span>
  <span class="hljs-comment">// Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does. </span>

  <span class="hljs-comment">// Set this as true if you want to access dev server from arbitrary url.</span>
  <span class="hljs-comment">// This is handy if you are using a html5 router.</span>
  historyApiFallback: <span class="hljs-literal">false</span>,

  <span class="hljs-comment">// Set this if you want to enable gzip compression for assets</span>
  compress: <span class="hljs-literal">true</span>,

  <span class="hljs-comment">// Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.</span>
  <span class="hljs-comment">// Use "**" to proxy all paths to the specified server.</span>
  <span class="hljs-comment">// This is useful if you want to get rid of 'http://localhost:8080/' in script[src],</span>
  <span class="hljs-comment">// and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).</span>
  proxy: {
    <span class="hljs-string">"**"</span>: <span class="hljs-string">"http://localhost:9090"</span>
  },

  <span class="hljs-attr">setup</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">app</span>) </span>{
    <span class="hljs-comment">// Here you can access the Express app object and add your own custom middleware to it.</span>
    <span class="hljs-comment">// For example, to define custom handlers for some paths:</span>
    <span class="hljs-comment">// app.get('/some/path', function(req, res) {</span>
    <span class="hljs-comment">//   res.json({ custom: 'response' });</span>
    <span class="hljs-comment">// });</span>
  },

  <span class="hljs-comment">// pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server</span>
  staticOptions: {
  },

  <span class="hljs-comment">// webpack-dev-middleware options</span>
  quiet: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">noInfo</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">lazy</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">filename</span>: <span class="hljs-string">"bundle.js"</span>,
  <span class="hljs-attr">watchOptions</span>: {
    <span class="hljs-attr">aggregateTimeout</span>: <span class="hljs-number">300</span>,
    <span class="hljs-attr">poll</span>: <span class="hljs-number">1000</span>
  },
  <span class="hljs-comment">// It's a required option.</span>
  publicPath: <span class="hljs-string">"/assets/"</span>,
  <span class="hljs-attr">headers</span>: { <span class="hljs-string">"X-Custom-Header"</span>: <span class="hljs-string">"yes"</span> },
  <span class="hljs-attr">stats</span>: { <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span> }
});
server.listen(<span class="hljs-number">8080</span>, <span class="hljs-string">"localhost"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{});
<span class="hljs-comment">// server.close();</span></code></pre>
<p>参考:<a href="http://webpack.github.io/docs/webpack-dev-server.html" rel="nofollow noreferrer" target="_blank">http://webpack.github.io/docs...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详解webpack-dev-server的使用

## 原文链接
[https://segmentfault.com/a/1190000006964335](https://segmentfault.com/a/1190000006964335)


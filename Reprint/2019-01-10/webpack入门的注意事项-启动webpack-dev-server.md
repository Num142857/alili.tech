---
title: 'webpack入门的注意事项-启动webpack-dev-server' 
date: 2019-01-10 2:30:08
hidden: true
slug: uu9xqu44hxa
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">启动webpack-dev-server</h2>
<h3 id="articleHeader1">写在前面的话</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack入门常遇到的一些简单问题，做一个个人的小小记录！
webpack使用的版本为： 2.2.0
webpack-dev-server使用的版本为： 2.2.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">webpack</span>入门常遇到的一些简单问题，做一个个人的小小记录！
<span class="hljs-selector-tag">webpack</span>使用的版本为： 2<span class="hljs-selector-class">.2</span><span class="hljs-selector-class">.0</span>
<span class="hljs-selector-tag">webpack-dev-server</span>使用的版本为： 2<span class="hljs-selector-class">.2</span><span class="hljs-selector-class">.0</span></code></pre>
<h3 id="articleHeader2">注意事项</h3>
<blockquote><p>1、安装webpack与webpack-dev-server</p></blockquote>
<p>网络上有很多关于webpack和webpack-dev-server的教程，但是要注意webpack和webpack-dev-server的版本，由于版本的问题会导致很多异常。<br>推荐安装版本为 webpack: 2.2.0 与 webpack-dev-server: 2.2.0；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack
npm i webpack@2.2.0 --save-dev
// webpack-dev-server
npm i webpack-dev-server@2.2.0 --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack</span>
npm i webpack@<span class="hljs-number">2.2</span><span class="hljs-number">.0</span> --save-dev
<span class="hljs-comment">// webpack-dev-server</span>
npm i webpack-dev-server@<span class="hljs-number">2.2</span><span class="hljs-number">.0</span> --save-dev</code></pre>
<p>如果需要卸载可以参考下面的命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack
npm uninstall webpack --save-dev
// webpack-dev-server
npm uninstall  webpack-dev-server --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack</span>
npm uninstall webpack --save-dev
<span class="hljs-comment">// webpack-dev-server</span>
npm uninstall  webpack-dev-server --save-dev</code></pre>
<blockquote><p>2、配置webpack-dev-server，并且启动热模块</p></blockquote>
<p>先注意，由于webpack-dev-server启动生成打包文件（js文件）是<strong>虚拟文件</strong>，即没有生成实体文件，是存放在内存中的，所以启动webpack-dev-server发现没有打包文件是正常的。<br>热启动模块有<strong>iframe</strong>模式和<strong>inline</strong>模式，iframe模式比较简单，建议入门使用iframe模式，此处也是以iframe模式为例子。</p>
<p>需要注意的为<strong>devServer</strong>和<strong>plugins</strong>的参数，其他的参数按自己的项目来配置。<br>配置文件webpack.config.js，：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js

var path = require('path'); // 用于获取配置文件所在的路径
var webpack = require('webpack');

module.exports = {
    // 配置生成Source Maps，选择合适的选项
    // 开发环境建议使用：eval-source-map；\
    // 生产环境建议使用：source-map
    // cheap-module-eval-source-map方法构建速度更快，但是不利于调试，推荐在大型项目考虑da时间成本是使用。
    devtool: 'eval-source-map', 
    entry: [
        // 增加一个脚本当发生改动的时候去自动刷新应用，需要在配置中增加一个入口点。
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:10001',
        // 入口文件所在路径
        __dirname + &quot;/src/js/test-server/main.js&quot;
    ],
    output: {
        path: __dirname + &quot;/test-server/js&quot;,
        filename: 'test.js'
    },
    module: {
        loaders: []
    },
    // 设置测试服务
    devServer: {
        // 本地测试服务器加载的页面所在的目录，默认webpack-dev-server会为根文件夹提供本地服务器
        contentBase: &quot;./test-server&quot;,
        // 监听的端口，默认为8080
        port: 10001,
        // 不跳转
        historyApiFallback: true
    },
    plugins: [
        // 热更新模块需要的配置
        new webpack.HotModuleReplacementPlugin()
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.config.js</span>

<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>); <span class="hljs-comment">// 用于获取配置文件所在的路径</span>
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-comment">// 配置生成Source Maps，选择合适的选项</span>
    <span class="hljs-comment">// 开发环境建议使用：eval-source-map；\</span>
    <span class="hljs-comment">// 生产环境建议使用：source-map</span>
    <span class="hljs-comment">// cheap-module-eval-source-map方法构建速度更快，但是不利于调试，推荐在大型项目考虑da时间成本是使用。</span>
    devtool: <span class="hljs-string">'eval-source-map'</span>, 
    <span class="hljs-attr">entry</span>: [
        <span class="hljs-comment">// 增加一个脚本当发生改动的时候去自动刷新应用，需要在配置中增加一个入口点。</span>
        <span class="hljs-string">'webpack/hot/dev-server'</span>,
        <span class="hljs-string">'webpack-dev-server/client?http://localhost:10001'</span>,
        <span class="hljs-comment">// 入口文件所在路径</span>
        __dirname + <span class="hljs-string">"/src/js/test-server/main.js"</span>
    ],
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">"/test-server/js"</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'test.js'</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>: []
    },
    <span class="hljs-comment">// 设置测试服务</span>
    devServer: {
        <span class="hljs-comment">// 本地测试服务器加载的页面所在的目录，默认webpack-dev-server会为根文件夹提供本地服务器</span>
        contentBase: <span class="hljs-string">"./test-server"</span>,
        <span class="hljs-comment">// 监听的端口，默认为8080</span>
        port: <span class="hljs-number">10001</span>,
        <span class="hljs-comment">// 不跳转</span>
        historyApiFallback: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-comment">// 热更新模块需要的配置</span>
        <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
    ]
}</code></pre>
<p>启动测试服务的方法，由于我们在webpack.config.js中配置了<strong>devServer</strong>，因此直接在命令行中输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">webpack-dev-server</code></pre>
<p>在浏览器里预览，打开网址<a href="http://localhost:10001/webpack-dev-server/index.html" rel="nofollow noreferrer" target="_blank">http://localhost:10001/webpac...</a>，格式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://«host»:«port»/webpack-dev-server/«path»" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">http:<span class="hljs-comment">//«host»:«port»/webpack-dev-server/«path»</span></code></pre>
<blockquote><p>资料推荐</p></blockquote>
<p>webpack的详细说明：<a href="https://segmentfault.com/a/1190000006178770#articleHeader3">入门 Webpack，看这篇就够了</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack入门的注意事项-启动webpack-dev-server

## 原文链接
[https://segmentfault.com/a/1190000009967319](https://segmentfault.com/a/1190000009967319)


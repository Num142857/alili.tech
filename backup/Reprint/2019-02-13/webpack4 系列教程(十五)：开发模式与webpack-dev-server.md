---
title: 'webpack4 系列教程(十五)：开发模式与webpack-dev-server' 
date: 2019-02-13 2:31:23
hidden: true
slug: u5uwxenrbl
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>作者按：因为教程所示图片使用的是 github 仓库图片，网速过慢的朋友请移步<a href="https://godbmw.com/passage/74" rel="nofollow noreferrer" target="_blank">《webpack4 系列教程(十五)：开发模式与 webpack-dev-server》原文地址</a>。更欢迎来我的小站看更多原创内容：<a href="https://godbmw.com/" rel="nofollow noreferrer" target="_blank">godbmw.com</a>，进行“姿势”交流 ♪(^∇^*)</blockquote>
<h2 id="articleHeader0">0. 课程介绍和资料</h2>
<ul>
<li><a href="https://github.com/dongyuanxin/webpack-demos/tree/master/demo15" rel="nofollow noreferrer" target="_blank">&gt;&gt;&gt;本节课源码</a></li>
<li><a href="https://github.com/dongyuanxin/webpack-demos" rel="nofollow noreferrer" target="_blank">&gt;&gt;&gt;所有课程源码</a></li>
</ul>
<p>本节课的代码目录如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016754502?w=480&amp;h=329" src="https://static.alili.tech/img/remote/1460000016754502?w=480&amp;h=329" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>本节课用的 plugin 和 loader 的配置文件<code>package.json</code>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;webpack-dev-server --open&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;clean-webpack-plugin&quot;: &quot;^0.1.19&quot;,
    &quot;html-webpack-plugin&quot;: &quot;^3.2.0&quot;,
    &quot;jquery&quot;: &quot;^3.3.1&quot;,
    &quot;webpack&quot;: &quot;^4.16.1&quot;,
    &quot;webpack-cli&quot;: &quot;^3.1.0&quot;,
    &quot;webpack-dev-server&quot;: &quot;^3.1.4&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"webpack-dev-server --open"</span>
  },
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"clean-webpack-plugin"</span>: <span class="hljs-string">"^0.1.19"</span>,
    <span class="hljs-attr">"html-webpack-plugin"</span>: <span class="hljs-string">"^3.2.0"</span>,
    <span class="hljs-attr">"jquery"</span>: <span class="hljs-string">"^3.3.1"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^4.16.1"</span>,
    <span class="hljs-attr">"webpack-cli"</span>: <span class="hljs-string">"^3.1.0"</span>,
    <span class="hljs-attr">"webpack-dev-server"</span>: <span class="hljs-string">"^3.1.4"</span>
  }
}</code></pre>
<h2 id="articleHeader1">1. 为什么需要开发模式？</h2>
<p>在之前的课程中，我们都没有指定参数<code>mode</code>。但是执行<code>webpack</code>进行打包的时候，自动设置为<code>production</code>，但是控制台会爆出<code>warning</code>的提示。<strong>而开发模式就是指定<code>mode</code>为<code>development</code>。</strong></p>
<p>在开发模式下，我们需要对代码进行调试。对应的配置就是：<code>devtool</code>设置为<code>source-map</code>。在非开发模式下，需要关闭此选项，以减小打包体积。</p>
<p>在开发模式下，还需要热重载、路由重定向、挂代理等功能，<code>webpack4</code>已经提供了<code>devServer</code>选项，启动一个本地服务器，让开发者使用这些功能。</p>
<h2 id="articleHeader2">2. 如何使用开发模式？</h2>
<p>根据文章开头的<code>package.json</code>的配置，只需要在命令行输入：<code>npm run dev</code>即可启动开发者模式。</p>
<p>启动效果如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016754503" src="https://static.alili.tech/img/remote/1460000016754503" alt="" title="" style="cursor: pointer;"></span></p>
<p>虽然控制台输出了打包信息（假设我们已经配置了热重载），但是磁盘上并没有创建<code>/dist/</code>文件夹和打包文件。<strong>控制台的打包文件的相关内容是存储在内存之中的。</strong></p>
<h2 id="articleHeader3">3. 编写一些需要的文件</h2>
<p>首先，编写一下入口的 html 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- index.html -->
<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
  <title>Document</title>
</head>
<body>
  This is Index html
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- index.html --&gt;</span>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  This is Index html
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>然后，按照项目目录，简单封装下<code>/vendor/</code>下的三个 js 文件，以方便<code>app.js</code>调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// minus.js
module.exports = function(a, b) {
  return a - b;
};

// multi.js
define(function(require, factory) {
  &quot;use strict&quot;;
  return function(a, b) {
    return a * b;
  };
});

// sum.js
export default function(a, b) {
  console.log(&quot;I am sum.js&quot;);
  return a + b;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// minus.js</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> a - b;
};

<span class="hljs-comment">// multi.js</span>
define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, factory</span>) </span>{
<span class="hljs-meta">  "use strict"</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> a * b;
  };
});

<span class="hljs-comment">// sum.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I am sum.js"</span>);
  <span class="hljs-keyword">return</span> a + b;
}</code></pre>
<p>好了，准备进入正题。</p>
<h2 id="articleHeader4">4. 编写 webpack 配置文件</h2>
<h3 id="articleHeader5">4.1 配置代码</h3>
<p><em>由于配置内容有点多，所以放代码，再放讲解。</em></p>
<p><code>webpack.config.js</code>配置如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require(&quot;webpack&quot;);
const HtmlWebpackPlugin = require(&quot;html-webpack-plugin&quot;);

const path = require(&quot;path&quot;);

module.exports = {
  entry: {
    app: &quot;./app.js&quot;
  },
  output: {
    publicPath: &quot;/&quot;,
    path: path.resolve(__dirname, &quot;dist&quot;),
    filename: &quot;[name]-[hash:5].bundle.js&quot;,
    chunkFilename: &quot;[name]-[hash:5].chunk.js&quot;
  },
  mode: &quot;development&quot;, // 开发模式
  devtool: &quot;source-map&quot;, // 开启调试
  devServer: {
    contentBase: path.join(__dirname, &quot;dist&quot;),
    port: 8000, // 本地服务器端口号
    hot: true, // 热重载
    overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
    proxy: {
      // 跨域代理转发
      &quot;/comments&quot;: {
        target: &quot;https://m.weibo.cn&quot;,
        changeOrigin: true,
        logLevel: &quot;debug&quot;,
        headers: {
          Cookie: &quot;&quot;
        }
      }
    },
    historyApiFallback: {
      // HTML5 history模式
      rewrites: [{ from: /.*/, to: &quot;/index.html&quot; }]
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: &quot;index.html&quot;,
      template: &quot;./index.html&quot;,
      chunks: [&quot;app&quot;]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      $: &quot;jquery&quot;
    })
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"html-webpack-plugin"</span>);

<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">"./app.js"</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">"/"</span>,
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">"dist"</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">"[name]-[hash:5].bundle.js"</span>,
    <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">"[name]-[hash:5].chunk.js"</span>
  },
  <span class="hljs-attr">mode</span>: <span class="hljs-string">"development"</span>, <span class="hljs-comment">// 开发模式</span>
  devtool: <span class="hljs-string">"source-map"</span>, <span class="hljs-comment">// 开启调试</span>
  devServer: {
    <span class="hljs-attr">contentBase</span>: path.join(__dirname, <span class="hljs-string">"dist"</span>),
    <span class="hljs-attr">port</span>: <span class="hljs-number">8000</span>, <span class="hljs-comment">// 本地服务器端口号</span>
    hot: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 热重载</span>
    overlay: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架</span>
    proxy: {
      <span class="hljs-comment">// 跨域代理转发</span>
      <span class="hljs-string">"/comments"</span>: {
        <span class="hljs-attr">target</span>: <span class="hljs-string">"https://m.weibo.cn"</span>,
        <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">logLevel</span>: <span class="hljs-string">"debug"</span>,
        <span class="hljs-attr">headers</span>: {
          <span class="hljs-attr">Cookie</span>: <span class="hljs-string">""</span>
        }
      }
    },
    <span class="hljs-attr">historyApiFallback</span>: {
      <span class="hljs-comment">// HTML5 history模式</span>
      rewrites: [{ <span class="hljs-attr">from</span>: <span class="hljs-regexp">/.*/</span>, <span class="hljs-attr">to</span>: <span class="hljs-string">"/index.html"</span> }]
    }
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">"index.html"</span>,
      <span class="hljs-attr">template</span>: <span class="hljs-string">"./index.html"</span>,
      <span class="hljs-attr">chunks</span>: [<span class="hljs-string">"app"</span>]
    }),
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
    <span class="hljs-keyword">new</span> webpack.NamedModulesPlugin(),
    <span class="hljs-keyword">new</span> webpack.ProvidePlugin({
      <span class="hljs-attr">$</span>: <span class="hljs-string">"jquery"</span>
    })
  ]
};</code></pre>
<h3 id="articleHeader6">4.2 模块热更新</h3>
<p>模块热更新需要<code>HotModuleReplacementPlugin</code>和<code>NamedModulesPlugin</code>这两个插件，并且顺序不能错。并且指定<code>devServer.hot</code>为<code>true</code>。</p>
<p>有了这两个插件，在项目的 js 代码中可以针对侦测到变更的文件并且做出相关处理。</p>
<p>比如，我们启动开发模式后，修改了<code>vendor/sum.js</code>这个文件，此时，需要在浏览器的控制台打印一些信息。那么，<code>app.js</code>中就可以这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (module.hot) {
  // 检测是否有模块热更新
  module.hot.accept(&quot;./vendor/sum.js&quot;, function() {
    // 针对被更新的模块, 进行进一步操作
    console.log(&quot;/vendor/sum.js is changed&quot;);
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (<span class="hljs-built_in">module</span>.hot) {
  <span class="hljs-comment">// 检测是否有模块热更新</span>
  <span class="hljs-built_in">module</span>.hot.accept(<span class="hljs-string">"./vendor/sum.js"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 针对被更新的模块, 进行进一步操作</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"/vendor/sum.js is changed"</span>);
  });
}</code></pre>
<p>每当<code>sum.js</code>被修改后，都可以自动执行回调函数。</p>
<h3 id="articleHeader7">4.3 跨域代理</h3>
<p>随着前后端分离开发的普及，跨域请求变得越来越常见。为了快速开发，可以利用<code>devServer.proxy</code>做一个代理转发，来绕过浏览器的跨域限制。</p>
<p>按照前面的配置文件，如果想调用微博的一个接口：<code>https://m.weibo.cn/comments/hotflow</code>。只需要在代码中对<code>/comments/hotflow</code>进行请求即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.get(
  &quot;/comments/hotflow&quot;,
  {
    id: &quot;4263554020904293&quot;,
    mid: &quot;4263554020904293&quot;,
    max_id_type: &quot;0&quot;
  },
  function(data) {
    console.log(data);
  }
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.get(
  <span class="hljs-string">"/comments/hotflow"</span>,
  {
    <span class="hljs-attr">id</span>: <span class="hljs-string">"4263554020904293"</span>,
    <span class="hljs-attr">mid</span>: <span class="hljs-string">"4263554020904293"</span>,
    <span class="hljs-attr">max_id_type</span>: <span class="hljs-string">"0"</span>
  },
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(data);
  }
);</code></pre>
<h3 id="articleHeader8">4.4 HTML5--History</h3>
<p>当项目使用<code>HTML5 History API</code> 时，任意的 404 响应都可能需要被替代为 <code>index.html</code>。</p>
<p>在 SPA（单页应用）中，任何响应直接被替代为<code>index.html</code>。</p>
<p>在 vuejs 官方的脚手架<code>vue-cli</code>中，开发模式下配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
historyApiFallback: {
  rewrites: [{ from: /.*/, to: &quot;/index.html&quot; }];
}
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ...</span>
historyApiFallback: {
  <span class="hljs-attr">rewrites</span>: [{ <span class="hljs-attr">from</span>: <span class="hljs-regexp">/.*/</span>, <span class="hljs-attr">to</span>: <span class="hljs-string">"/index.html"</span> }];
}
<span class="hljs-comment">// ...</span></code></pre>
<h2 id="articleHeader9">5. 编写入口文件</h2>
<p>最后，在前面所有的基础上，让我们来编写下入口文件<code>app.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import sum from &quot;./vendor/sum&quot;;
console.log(&quot;sum(1, 2) = &quot;, sum(1, 2));
var minus = require(&quot;./vendor/minus&quot;);
console.log(&quot;minus(1, 2) = &quot;, minus(1, 2));
require([&quot;./vendor/multi&quot;], function(multi) {
  console.log(&quot;multi(1, 2) = &quot;, multi(1, 2));
});

$.get(
  &quot;/comments/hotflow&quot;,
  {
    id: &quot;4263554020904293&quot;,
    mid: &quot;4263554020904293&quot;,
    max_id_type: &quot;0&quot;
  },
  function(data) {
    console.log(data);
  }
);

if (module.hot) {
  // 检测是否有模块热更新
  module.hot.accept(&quot;./vendor/sum.js&quot;, function() {
    // 针对被更新的模块, 进行进一步操作
    console.log(&quot;/vendor/sum.js is changed&quot;);
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> sum <span class="hljs-keyword">from</span> <span class="hljs-string">"./vendor/sum"</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"sum(1, 2) = "</span>, sum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>));
<span class="hljs-keyword">var</span> minus = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./vendor/minus"</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"minus(1, 2) = "</span>, minus(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>));
<span class="hljs-built_in">require</span>([<span class="hljs-string">"./vendor/multi"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">multi</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"multi(1, 2) = "</span>, multi(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>));
});

$.get(
  <span class="hljs-string">"/comments/hotflow"</span>,
  {
    <span class="hljs-attr">id</span>: <span class="hljs-string">"4263554020904293"</span>,
    <span class="hljs-attr">mid</span>: <span class="hljs-string">"4263554020904293"</span>,
    <span class="hljs-attr">max_id_type</span>: <span class="hljs-string">"0"</span>
  },
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(data);
  }
);

<span class="hljs-keyword">if</span> (<span class="hljs-built_in">module</span>.hot) {
  <span class="hljs-comment">// 检测是否有模块热更新</span>
  <span class="hljs-built_in">module</span>.hot.accept(<span class="hljs-string">"./vendor/sum.js"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 针对被更新的模块, 进行进一步操作</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"/vendor/sum.js is changed"</span>);
  });
}</code></pre>
<h2 id="articleHeader10">6. 效果检测</h2>
<p>在命令行键入：<code>npm run dev</code>开启服务器后，会自动打开浏览器。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016754504" src="https://static.alili.tech/img/remote/1460000016754504" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>打开控制台，可以看到代码都正常运行没有出错。除此之外，由于开启了<code>source-map</code>，所以可以定位代码位置（下图绿框内）：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016754505" src="https://static.alili.tech/img/remote/1460000016754505" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader11">7. 参考资料</h2>
<ul>
<li>dev-server 文档: <a href="https://www.webpackjs.com/configuration/dev-server/" rel="nofollow noreferrer" target="_blank">https://www.webpackjs.com/configuration/dev-server/</a>
</li>
<li>开发模式 文档:<a href="https://www.webpackjs.com/guides/development/" rel="nofollow noreferrer" target="_blank">https://www.webpackjs.com/guides/development/</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack4 系列教程(十五)：开发模式与webpack-dev-server

## 原文链接
[https://segmentfault.com/a/1190000016754499](https://segmentfault.com/a/1190000016754499)


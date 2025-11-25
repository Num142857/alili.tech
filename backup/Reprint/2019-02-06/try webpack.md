---
title: 'try webpack' 
date: 2019-02-06 2:30:08
hidden: true
slug: 81yhc0ufm04
categories: [reprint]
---

{{< raw >}}

                    
<p>前不久把 sf 前端的构建工具进行了改进和优化，用上了目前非常火的 webpack 、babel 和 es6 等等新技术。</p>
<h2 id="articleHeader0">历史</h2>
<p>sf 前端的构建工具最早使用的是当时非常流行的 grunt，接下来是 gulp，然后就是现在的 webpack。</p>
<h2 id="articleHeader1">构建工具比较</h2>
<table>
<thead><tr>
<th>构建工具</th>
<th>Browserify</th>
<th>Grunt</th>
<th>Gulp</th>
<th>Webpack</th>
</tr></thead>
<tbody>
<tr>
<td>描述</td>
<td>browser-side require() the node way</td>
<td>The JavaScript Task Runner</td>
<td>The streaming build system</td>
<td>Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jade, coffee, css, less, ... and your custom stuff.</td>
</tr>
<tr>
<td>关键词</td>
<td>browser, require, commonjs, commonj-esque, bundle, npm, javascript</td>
<td>task, async, cli, minify, uglify, build, lodash, unit, test, qunit, nodeunit, server, init, scaffold, make, jake, tool</td>
<td> </td>
<td> </td>
</tr>
<tr>
<td>作者</td>
<td>James Halliday</td>
<td>Grunt Development Team</td>
<td>Fractal</td>
<td>Tobias Koppers @sokra</td>
</tr>
<tr>
<td>链接</td>
<td>
<a href="https://github.com/substack/node-browserify" rel="nofollow noreferrer" target="_blank">&nbsp;Homepage</a><a href="https://github.com/substack/node-browserify/issues" rel="nofollow noreferrer" target="_blank">&nbsp;Bug Report</a><a href="https://github.com/substack/node-browserify" rel="nofollow noreferrer" target="_blank">&nbsp;Github</a>
</td>
<td>
<a href="http://gruntjs.com/" rel="nofollow noreferrer" target="_blank">&nbsp;Homepage</a><a href="https://github.com/gruntjs/grunt/issues" rel="nofollow noreferrer" target="_blank">&nbsp;Bug Report</a><a href="https://github.com/gruntjs/grunt" rel="nofollow noreferrer" target="_blank">&nbsp;Github</a>
</td>
<td>
<a href="http://gulpjs.com/" rel="nofollow noreferrer" target="_blank">&nbsp;Homepage</a><a href="https://github.com/gulpjs/gulp/issues" rel="nofollow noreferrer" target="_blank">&nbsp;Bug Report</a><a href="https://github.com/gulpjs/gulp" rel="nofollow noreferrer" target="_blank">&nbsp;Github</a>
</td>
<td>
<a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">&nbsp;Homepage</a><a href="https://github.com/webpack/webpack/issues" rel="nofollow noreferrer" target="_blank">&nbsp;Bug Report</a><a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">&nbsp;Github</a>
</td>
</tr>
<tr>
<td><strong>比较</strong></td>
<td> </td>
<td> </td>
<td> </td>
<td> </td>
</tr>
<tr>
<td>Licenses</td>
<td>MIT</td>
<td>MIT</td>
<td>MIT</td>
<td>MIT</td>
</tr>
<tr>
<td>Created</td>
<td>5 years ago&nbsp;(Feb, 2011)</td>
<td>5 years ago&nbsp;(Jan, 2012)</td>
<td>3 years ago&nbsp;(Jul, 2013)</td>
<td>4 years ago&nbsp;(Mar, 2012)</td>
</tr>
<tr>
<td>版本数量</td>
<td><strong>459</strong></td>
<td>56</td>
<td>63</td>
<td>416</td>
</tr>
<tr>
<td>版本周期</td>
<td>every 4 days</td>
<td>every a month</td>
<td>every 18 days</td>
<td><strong>every 4 days</strong></td>
</tr>
<tr>
<td>依赖数</td>
<td>46</td>
<td>16</td>
<td><strong>13</strong></td>
<td>15</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader2">什么选择了它，它解决了什么</h2>
<ul>
<li>
<p>gulp</p>
<ul>
<li><p>配置简单，插件丰富，上手快</p></li>
<li><p>解决了 grunt 配置繁琐，不易维护的问题，通过插件扩展进一步提高了开发效率</p></li>
</ul>
</li>
<li>
<p>webpack</p>
<ul><li><p>解决模块自由引入，打包</p></li></ul>
</li>
</ul>
<p>webpack 解决了 sf 后台存在的历史问题，提高了开发效率</p>
<ol>
<li><p>html 模板、js 模块的自由引入，不再依赖配置表</p></li>
<li><p>每次添加新模块，不再需要加入一堆的 script 标签</p></li>
<li><p>代码压缩合并速度提升</p></li>
<li><p>coffee 换成了 js（es6）</p></li>
</ol>
<p>Webpack 增加了项目开发的灵活性，优化了性能</p>
<ol>
<li><p>提取公用 js 代码</p></li>
<li><p>只要有 loader ，可以自由使用多种语言</p></li>
<li><p>支持按需加载</p></li>
</ol>
<h2 id="articleHeader3">怎么用</h2>
<h4>gulp 入门&nbsp;</h4>
<p>去年在 SF 技术分享会安利过 gulp <a href="https://wtser.com/building-with-gulp/" rel="nofollow noreferrer" target="_blank">building width gulp</a></p>
<h4>我们是怎么用 webpack 的</h4>
<p>配置 webpack需要建一个 webpack.config.js 文件。建议搭配&nbsp;webpack-dev-server 使用：<a href="https://webpack.github.io/docs/webpack-dev-server.html" rel="nofollow noreferrer" target="_blank">webpack doc webpack-dev-server</a></p>
<p>我们的配置文件大概长这个样子。下面来分析一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');

var reusePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
 jQuery: 'jquery',
 _:'underscore',
 'window.jQuery': 'jquery',
 'root.jQuery': 'jquery'
});

var config = {
  context: __dirname + '/src',
  devtool: 'source-map',
  entry:{
    'chart':[
      './chart/ChartCtrl.js',
      './chart/ChartDirective.js',
    ],
    'log':'./log/ctrl.js',
    'dashboard':'./dashboard/ctrl.js',
    'operation':'./operation/ctrl.js'
  },
  output:{
    path: __dirname + '/dist',
    filename:'./[name]/ctrl.js',
    publicPath:'/static/dist/',
  },

  devServer: {
    hot: true,
    port: 3333,
    proxy: {
        '*': {
            target: 'http://xxadmin.domain.com',
            secure: false,
            changeOrigin: true
        },
    },
    },
  module:{
    loaders:[
      {
      test: /\.js$/,
      exclude: /(node_modules|bower_components|3rd)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['es2015']
      }
    },
    {
        test: /\.html$/,
        loader: &quot;html&quot;
    },
    {
        test:   /\.css$/,
        exclude: /(node_modules|bower_components|3rd)/,
        loader: &quot;style-loader!css-loader&quot;
    },
    {
        test: /\.scss$/,
        loaders: [&quot;style&quot;, &quot;css&quot;, &quot;sass&quot;]
     },
     { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  plugins: [
    reusePlugin,
 ]
};

module.exports = config;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-keyword">var</span> reusePlugin = <span class="hljs-keyword">new</span> webpack.ProvidePlugin({
  <span class="hljs-attr">$</span>: <span class="hljs-string">'jquery'</span>,
 <span class="hljs-attr">jQuery</span>: <span class="hljs-string">'jquery'</span>,
 <span class="hljs-attr">_</span>:<span class="hljs-string">'underscore'</span>,
 <span class="hljs-string">'window.jQuery'</span>: <span class="hljs-string">'jquery'</span>,
 <span class="hljs-string">'root.jQuery'</span>: <span class="hljs-string">'jquery'</span>
});

<span class="hljs-keyword">var</span> config = {
  <span class="hljs-attr">context</span>: __dirname + <span class="hljs-string">'/src'</span>,
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">'source-map'</span>,
  <span class="hljs-attr">entry</span>:{
    <span class="hljs-string">'chart'</span>:[
      <span class="hljs-string">'./chart/ChartCtrl.js'</span>,
      <span class="hljs-string">'./chart/ChartDirective.js'</span>,
    ],
    <span class="hljs-string">'log'</span>:<span class="hljs-string">'./log/ctrl.js'</span>,
    <span class="hljs-string">'dashboard'</span>:<span class="hljs-string">'./dashboard/ctrl.js'</span>,
    <span class="hljs-string">'operation'</span>:<span class="hljs-string">'./operation/ctrl.js'</span>
  },
  <span class="hljs-attr">output</span>:{
    <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">'/dist'</span>,
    <span class="hljs-attr">filename</span>:<span class="hljs-string">'./[name]/ctrl.js'</span>,
    <span class="hljs-attr">publicPath</span>:<span class="hljs-string">'/static/dist/'</span>,
  },

  <span class="hljs-attr">devServer</span>: {
    <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">port</span>: <span class="hljs-number">3333</span>,
    <span class="hljs-attr">proxy</span>: {
        <span class="hljs-string">'*'</span>: {
            <span class="hljs-attr">target</span>: <span class="hljs-string">'http://xxadmin.domain.com'</span>,
            <span class="hljs-attr">secure</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>
        },
    },
    },
  <span class="hljs-attr">module</span>:{
    <span class="hljs-attr">loaders</span>:[
      {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
      <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/(node_modules|bower_components|3rd)/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>, <span class="hljs-comment">// 'babel-loader' is also a legal name to reference</span>
      query: {
        <span class="hljs-attr">presets</span>: [<span class="hljs-string">'es2015'</span>]
      }
    },
    {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.html$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">"html"</span>
    },
    {
        <span class="hljs-attr">test</span>:   <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/(node_modules|bower_components|3rd)/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">"style-loader!css-loader"</span>
    },
    {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss$/</span>,
        <span class="hljs-attr">loaders</span>: [<span class="hljs-string">"style"</span>, <span class="hljs-string">"css"</span>, <span class="hljs-string">"sass"</span>]
     },
     { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|woff|woff2|eot|ttf|svg)$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader?limit=100000'</span> }
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    reusePlugin,
 ]
};

<span class="hljs-built_in">module</span>.exports = config;</code></pre>
<h5>entry</h5>
<p>处理的入口，配置需要处理的 js。entry 有三种写法，每个入口称为一个chunk。</p>
<ul><li><p><strong>字符串&nbsp;</strong> <code>entry: "./index/index.js"</code><br>  配置模块会被解析为模块，并在启动时加载。默认 chunk 名为 main， 具体打包文件名可在 output 中配置。</p></li></ul>
<ul><li><p><strong>数组&nbsp;</strong> <code>entry: ['./src/mod1.js', [...,] './src/index.js']</code><br>  所有的模块会在启动时&nbsp;<strong>按照配置顺序</strong>&nbsp;加载，合并到最后一个模块会被导出。默认 chunk 名也是 main。</p></li></ul>
<ul><li><p><strong>对象&nbsp;</strong> <code>entry: {index: '...', login : [...] }</code><br>  传入Object，则会生成多个入口打包文件， key 是 chunk 名，value可以是字符串，也可是数组。</p></li></ul>
<p>很明显我们采用的是第三种。</p>
<h5>output</h5>
<p>设置入口配置的文件的输出规则，通过output对象实现</p>
<ul>
<li><p><code>output.path</code>：输出文件路径，通常设置为 __dirname + ‘/build’</p></li>
<li>
<p><code>output.filename</code>：输出文件名称，有下面列出的四种可选的变量，filename 配置可以是这几种的任意一种或多种的组合</p>
<ul>
<li><p>[id]  chunk的id</p></li>
<li><p>[name]  chunk名</p></li>
<li><p>[hash]  编译哈希值</p></li>
<li><p>[chunkhash]  chunk的hash值</p></li>
</ul>
</li>
<li><p><code>output.publicPath</code>：设置为想要的资源访问路径。一般使用 webpack-dev-server 时，则需要通过类似 <a href="http://localhost:8080/asstes/index-1.js" rel="nofollow noreferrer" target="_blank">http://localhost:8080/asstes/index-1.js</a> 来访问资源，如果没有设置，则默认从站点根目录加载。</p></li>
</ul>
<h5>web_modules</h5>
<p>有些时候，我们用到的第三方库并没有采用 CommonJS 或 AMD 规范。这样我们无法通过 require() 来引用这些库。</p>
<p>Webpack 给出了解决方案，在项目根目录下，创建一个叫做 web_modules 的文件夹，将需要用到的第三方库存放到里面，就可以在逻辑代码中使用 <code>require(‘xx-lib.js’)</code> 来引用并使用了。</p>
<h5>去除多个文件中的频繁依赖</h5>
<p>当我们经常使用React、jQuery等外部第三方库的时候，通常在每个业务逻辑JS中都会遇到这些库。</p>
<p>如我们需要在各个文件中都是有jQuery的$对象，因此我们需要在每个用到jQuery的JS文件的头部通过require('jquery')来依赖jQuery。 这样做非常繁琐且重复。</p>
<p>webpack提供了我们一种比较高效的方法，我们可以通过在配置文件中配置使用到的变量名，那么webpack会自动分析，并且在编译时帮我们完成这些依赖的引入。</p>
<p>这样，我们在JS中，就不需要引入jQuery等常用模块了，直接使用配置的这些变量，webpack就会自动引入配置的库。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.ProvidePlugin({
  $: 'jquery',
 jQuery: 'jquery',
 _:'underscore',
 'window.jQuery': 'jquery',
 'root.jQuery': 'jquery'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> webpack.ProvidePlugin({
  <span class="hljs-attr">$</span>: <span class="hljs-string">'jquery'</span>,
 <span class="hljs-attr">jQuery</span>: <span class="hljs-string">'jquery'</span>,
 <span class="hljs-attr">_</span>:<span class="hljs-string">'underscore'</span>,
 <span class="hljs-string">'window.jQuery'</span>: <span class="hljs-string">'jquery'</span>,
 <span class="hljs-string">'root.jQuery'</span>: <span class="hljs-string">'jquery'</span>
});</code></pre>
<h5>功能标识（Feature flags）</h5>
<p>项目中有些代码我们只为在开发环境（例如日志）或者是内部测试环境（例如那些没有发布的新功能）中使用，又不想让这些调试内容在发布的时候泄露出去,那就需要引入下面这些魔法全局变量（magic globals）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (__DEV__) {
  console.warn('Extra logging');
}
// ...
if (__PRERELEASE__) {
  showSecretFeature();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">if</span> (__DEV__) {
  <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.warn</span>(<span class="hljs-string">'Extra logging'</span>);
}
<span class="hljs-comment">// ...</span>
<span class="hljs-selector-tag">if</span> (__PRERELEASE__) {
  <span class="hljs-selector-tag">showSecretFeature</span>();
}</code></pre>
<p>同时还要在webpack.config.js中配置这些变量，使得 webpack 能够识别他们。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js

// definePlugin 会把定义的string 变量插入到Js代码中。
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [definePlugin]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// webpack.config.js</span>

<span class="hljs-comment">// definePlugin 会把定义的string 变量插入到Js代码中。</span>
<span class="hljs-keyword">var</span> definePlugin = <span class="hljs-keyword">new</span> webpack.DefinePlugin({
  <span class="hljs-attr">__DEV__</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-built_in">JSON</span>.parse(process.env.BUILD_DEV || <span class="hljs-string">'true'</span>)),
  <span class="hljs-attr">__PRERELEASE__</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-built_in">JSON</span>.parse(process.env.BUILD_PRERELEASE || <span class="hljs-string">'false'</span>))
});

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./main.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-attr">plugins</span>: [definePlugin]
};</code></pre>
<p>配置完成后，就可以使用&nbsp;BUILD_DEV=1 BUILD_PRERELEASE=1 webpack来打包代码了。 值得注意的是，webpack -p&nbsp;会删除所有无作用代码，也就是说那些包裹在这些全局变量下的代码块都会被删除，这样就能保证这些代码不会因发布上线而泄露。</p>
<h5>异步加载</h5>
<p>虽然CommonJS是同步加载的，但是webpack也提供了异步加载的方式。这对于单页应用中使用的客户端路由非常有用。当真正路由到了某个页面的时候，它的代码才会被加载下来。</p>
<p>指定你要异步加载的&nbsp;拆分点。看下面的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (window.location.pathname === '/feed') {
  showLoadingState();
  require.ensure([], function() { // 这个语法痕奇怪，但是还是可以起作用的
    hideLoadingState();
    require('./feed').show(); // 当这个函数被调用的时候，此模块是一定已经被同步加载下来了
  });
} else if (window.location.pathname === '/profile') {
  showLoadingState();
  require.ensure([], function() {
    hideLoadingState();
    require('./profile').show();
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.location.pathname === <span class="hljs-string">'/feed'</span>) {
  showLoadingState();
  <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 这个语法痕奇怪，但是还是可以起作用的</span>
    hideLoadingState();
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'./feed'</span>).show(); <span class="hljs-comment">// 当这个函数被调用的时候，此模块是一定已经被同步加载下来了</span>
  });
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.location.pathname === <span class="hljs-string">'/profile'</span>) {
  showLoadingState();
  <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    hideLoadingState();
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'./profile'</span>).show();
  });
}</code></pre>
<p>剩下的事就可以交给webpack，它会为你生成并加载这些额外的&nbsp;chunk&nbsp;文件。</p>
<h5>简化执行代码</h5>
<p>我们可以在package.json中事先定义好命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {&nbsp;&nbsp;&nbsp;&nbsp;
  &quot;dev&quot;: &quot;BUILD_DEV=1 webpack-dev-server --progress --colors&quot;,&nbsp;&nbsp;&nbsp;&nbsp;
  &quot;build&quot;: &quot;BUILD_PRERELEASE=1 webpack -p&quot;&nbsp;&nbsp;} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"scripts"</span>: {&nbsp;&nbsp;&nbsp;&nbsp;
  <span class="hljs-string">"dev"</span>: <span class="hljs-string">"BUILD_DEV=1 webpack-dev-server --progress --colors"</span>,&nbsp;&nbsp;&nbsp;&nbsp;
  <span class="hljs-string">"build"</span>: <span class="hljs-string">"BUILD_PRERELEASE=1 webpack -p"</span>&nbsp;&nbsp;} </code></pre>
<p>那么就可以避免输入冗长的命令了</p>
<ul>
<li><p>开发时输入    <code>npm run dev</code></p></li>
<li><p>发布时输入    <code>npm run build</code></p></li>
</ul>
<h5>合并优化公共代码</h5>
<p>项目中，对于一些常用的组件，站点公用模块经常需要与其他逻辑分开，然后合并到同一个文件，以便于长时间的缓存。要实现这一功能，配置参照:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack            = require('webpack');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
...

entry: {

   a: './index/a.js',

   b: './idnex/b.js',

   c: './index/c.js',

   d: './index/d.js'

},

...

plugins: [

   new CommonsChunkPlugin('part1.js', ['a', 'b']),

   new CommonsChunkPlugin('common.js', ['part1', 'c'])

]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> webpack            = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-keyword">var</span> CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
...

entry: {

   <span class="hljs-attr">a</span>: <span class="hljs-string">'./index/a.js'</span>,

   <span class="hljs-attr">b</span>: <span class="hljs-string">'./idnex/b.js'</span>,

   <span class="hljs-attr">c</span>: <span class="hljs-string">'./index/c.js'</span>,

   <span class="hljs-attr">d</span>: <span class="hljs-string">'./index/d.js'</span>

},

...

plugins: [

   <span class="hljs-keyword">new</span> CommonsChunkPlugin(<span class="hljs-string">'part1.js'</span>, [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>]),

   <span class="hljs-keyword">new</span> CommonsChunkPlugin(<span class="hljs-string">'common.js'</span>, [<span class="hljs-string">'part1'</span>, <span class="hljs-string">'c'</span>])

]</code></pre>
<p>简单的情况下可以这样写&nbsp;newwebpack.optimize.CommonsChunkPlugin('common.js’);，这样就会提取所有模块的通用代码到 common.js。</p>
<h5>devtool 调试</h5>
<p>可以通过在配置中加入devtool项，选择预设调试工具来提高代码调试质量和效率：</p>
<ul>
<li><p>eval&nbsp;– 每个模块采用eval和&nbsp;//@ sourceURL&nbsp;来执行</p></li>
<li><p>source-map&nbsp;– sourceMap是发散的，和output.sourceMapFilename协调使用</p></li>
<li><p>hidden-source-map&nbsp;– 和source-map类似，但是不会添加一个打包文件的尾部添加引用注释</p></li>
<li><p>inline-source-map&nbsp;– SourceMap以DataUrl的方式插入打包文件的尾部</p></li>
<li><p>eval-source-map&nbsp;– 每个模块以eval方式执行并且SourceMap以DataUrl的方式添加进eval</p></li>
<li><p>cheap-source-map&nbsp;– 去除column-mappings的SourceMap， 来自于loader中的内容不会被使用。</p></li>
<li><p>cheap-module-source-map&nbsp;– 去除column-mappings的SourceMap, 来自于loader中的SourceMaps被简化为单个mapping文件</p></li>
</ul>
<table>
<thead><tr>
<th><strong>devtool</strong></th>
<th><strong>构建速度</strong></th>
<th><strong>再次构建速度</strong></th>
<th><strong>支持发布版</strong></th>
<th><strong>质量</strong></th>
</tr></thead>
<tbody>
<tr>
<td>eval</td>
<td>+++</td>
<td>+++</td>
<td>no</td>
<td>生成代码</td>
</tr>
<tr>
<td>cheap-eval-source-map</td>
<td>+</td>
<td>++</td>
<td>no</td>
<td>转换代码(lines only)</td>
</tr>
<tr>
<td>cheap-source-map</td>
<td>+</td>
<td>o</td>
<td>yes</td>
<td>转换代码(lines only)</td>
</tr>
<tr>
<td>cheap-module-eval-source-map</td>
<td>o</td>
<td>++</td>
<td>no</td>
<td>源代码 (lines only)</td>
</tr>
<tr>
<td>cheap-module-source-map</td>
<td>o</td>
<td>–</td>
<td>yes</td>
<td>源代码(lines only)</td>
</tr>
<tr>
<td>eval-source-map</td>
<td>—</td>
<td>+</td>
<td>no</td>
<td>源代码</td>
</tr>
<tr>
<td>source-map</td>
<td>—</td>
<td>—</td>
<td>yes</td>
<td>源代码</td>
</tr>
</tbody>
</table>
<h5>loader</h5>
<p>来自官方文档：</p>
<blockquote><p>Loaders allow you to preprocess files as you require() or “load” them. Loaders are kind of like “tasks” are in other build tools, and provide a powerful way to handle frontend build steps. Loaders can transform files from a different language like CoffeeScript to JavaScript, or inline images as data URLs. Loaders even allow you to do things like require() css files right in your JavaScript!</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {

entry: [&quot;./global.js&quot; , &quot;./app.js&quot;],

output: {

filename: &quot;bundle.js&quot;

},
module: {

loaders: [

  {
      test: /\.es6$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    query: {
          presets: ['react', 'es2015']
      }
  }
]

},
resolve: {
    extensions: ['', '.js', '.es6']
},
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>module.exports = {

entry: [<span class="hljs-string">"./global.js"</span> , <span class="hljs-string">"./app.js"</span>],

outpu<span class="hljs-variable">t:</span> {

filename: <span class="hljs-string">"bundle.js"</span>

},
module: {

loader<span class="hljs-variable">s:</span> [

  {
      tes<span class="hljs-variable">t:</span> /\.es6$/,
      exclude: /node_modules/,
      loader: <span class="hljs-string">'babel-loader'</span>,
    query: {
          preset<span class="hljs-variable">s:</span> [<span class="hljs-string">'react'</span>, <span class="hljs-string">'es2015'</span>]
      }
  }
]

},
<span class="hljs-built_in">resolve</span>: {
    extension<span class="hljs-variable">s:</span> [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.es6'</span>]
},
}</code></pre>
<p>我们的第一个loader 添加了3个键，下面分别做下解释。</p>
<ol>
<li><p><strong>test</strong> — 一个正则表达式，测试什么样的文件类型可以通过loader去执行。上面的例子意思是仅后缀为.es6的文件通过。</p></li>
<li><p><strong>exclude</strong> — 表示loader 应该忽略／不包含的文件／文件路径。例如 node_modules 文件夹.</p></li>
<li><p><strong>loader</strong> —表示我们正在使用的loader 名称 (babel-loader).</p></li>
<li><p><strong>query</strong> — 你可以传递一些选项参数到loader，写法类似一个&nbsp;<a href="https://github.com/webpack/loader-utils" rel="nofollow noreferrer" target="_blank">query string</a> 或者像上面的例子那样使用 query 属性。</p></li>
<li><p><strong>presets </strong>—让我们能够使用早先安装好的 react 和 es2015 的 presets。</p></li>
</ol>
<h4>another config example</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack            = require('webpack');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var ExtractTextPlugin  = require('extract-text-webpack-plugin');

//自定义&quot;魔力&quot;变量

var definePlugin = new webpack.DefinePlugin({

    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),

    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))

});

module.exports = {

    //上下文

    context: __dirname + '/src',

    //配置入口

    entry: {

        a: './view/index/index.js',

        b: './view/index/b.js',

        vender: ['./view/index/c.js', './view/index/d.js']

    },

    //配置输出

    output: {

        path: __dirname + '/build/',

        filename: '[name].js?[hash]',

        publicPath: '/assets/',

        sourceMapFilename: '[file].map'

    },

    devtool: '#source-map',

    //模块

    module: {

        loaders: [

            {

                //处理javascript

                test: /\.js$/,

                exclude: /node_modules/,

                loader: 'babel'

            }, {

                test: /\.css$/,

                loader: ExtractTextPlugin.extract(

                    &quot;style-loader&quot;,

                    &quot;css-loader?sourceMap&quot;

                )

            }, {

                test: /\.less$/,

                loader: ExtractTextPlugin.extract(

                    &quot;style-loader&quot;,

                    &quot;css-loader!less-loader&quot;

                )

            }, {

                test: /\.(png|jpg)$/,

                loader: 'url-loader?limit=1024'

            }, {

                //处理vue

                test: /\.vue$/,

                loader: 'vue-loader'

            },

            {

                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,

                loader: 'url?limit=10000&amp;minetype=application/font-woff'

            },

            {

                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,

                loader: 'url?limit=10&amp;minetype=application/font-woff'

            },

            {

                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,

                loader: 'url?limit=10&amp;minetype=application/octet-stream'

            },

            {

                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,

                loader: 'file'

            },

            {

                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,

                loader: 'url?limit=10&amp;minetype=image/svg+xml'

            }

        ]

    },

    plugins: [

        //公用模块

        new CommonsChunkPlugin('common.js', ['a', 'b']),

        //设置抽出css文件名

        new ExtractTextPlugin(&quot;css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]&quot;, {

            disable: false,

            allChunks: true

        }),

        //定义全局变量

        definePlugin,

        //设置此处，则在JS中不用类似require('./base')引入基础模块， 只要直接使用Base变量即可

        //此处通常可用做，对常用组件，库的提前设置

        new webpack.ProvidePlugin({

            Moment: 'moment', //直接从node_modules中获取

            Base: '../../base/index.js' //从文件中获取

        })

    ],

    //添加了此项，则表明从外部引入，内部不会打包合并进去

    externals: {

        jquery: 'window.jQuery',

        react: 'window.React',

        //...

    }

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> webpack            = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-keyword">var</span> CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

<span class="hljs-keyword">var</span> ExtractTextPlugin  = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);

<span class="hljs-comment">//自定义"魔力"变量</span>

<span class="hljs-keyword">var</span> definePlugin = <span class="hljs-keyword">new</span> webpack.DefinePlugin({

    __DEV__: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-built_in">JSON</span>.parse(process.env.BUILD_DEV || <span class="hljs-string">'false'</span>)),

    __PRERELEASE__: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-built_in">JSON</span>.parse(process.env.BUILD_PRERELEASE || <span class="hljs-string">'false'</span>))

});

<span class="hljs-built_in">module</span>.exports = {

    <span class="hljs-comment">//上下文</span>

    context: __dirname + <span class="hljs-string">'/src'</span>,

    <span class="hljs-comment">//配置入口</span>

    entry: {

        a: <span class="hljs-string">'./view/index/index.js'</span>,

        b: <span class="hljs-string">'./view/index/b.js'</span>,

        vender: [<span class="hljs-string">'./view/index/c.js'</span>, <span class="hljs-string">'./view/index/d.js'</span>]

    },

    <span class="hljs-comment">//配置输出</span>

    output: {

        path: __dirname + <span class="hljs-string">'/build/'</span>,

        filename: <span class="hljs-string">'[name].js?[hash]'</span>,

        publicPath: <span class="hljs-string">'/assets/'</span>,

        sourceMapFilename: <span class="hljs-string">'[file].map'</span>

    },

    devtool: <span class="hljs-string">'#source-map'</span>,

    <span class="hljs-comment">//模块</span>

    <span class="hljs-keyword">module</span>: {

        loaders: [

            {

                <span class="hljs-comment">//处理javascript</span>

                test: <span class="hljs-regexp">/\.js$/</span>,

                exclude: <span class="hljs-regexp">/node_modules/</span>,

                loader: <span class="hljs-string">'babel'</span>

            }, {

                test: <span class="hljs-regexp">/\.css$/</span>,

                loader: ExtractTextPlugin.extract(

                    <span class="hljs-string">"style-loader"</span>,

                    <span class="hljs-string">"css-loader?sourceMap"</span>

                )

            }, {

                test: <span class="hljs-regexp">/\.less$/</span>,

                loader: ExtractTextPlugin.extract(

                    <span class="hljs-string">"style-loader"</span>,

                    <span class="hljs-string">"css-loader!less-loader"</span>

                )

            }, {

                test: <span class="hljs-regexp">/\.(png|jpg)$/</span>,

                loader: <span class="hljs-string">'url-loader?limit=1024'</span>

            }, {

                <span class="hljs-comment">//处理vue</span>

                test: <span class="hljs-regexp">/\.vue$/</span>,

                loader: <span class="hljs-string">'vue-loader'</span>

            },

            {

                test: <span class="hljs-regexp">/\.woff(\?v=\d+\.\d+\.\d+)?$/</span>,

                loader: <span class="hljs-string">'url?limit=10000&amp;minetype=application/font-woff'</span>

            },

            {

                test: <span class="hljs-regexp">/\.woff2(\?v=\d+\.\d+\.\d+)?$/</span>,

                loader: <span class="hljs-string">'url?limit=10&amp;minetype=application/font-woff'</span>

            },

            {

                test: <span class="hljs-regexp">/\.ttf(\?v=\d+\.\d+\.\d+)?$/</span>,

                loader: <span class="hljs-string">'url?limit=10&amp;minetype=application/octet-stream'</span>

            },

            {

                test: <span class="hljs-regexp">/\.eot(\?v=\d+\.\d+\.\d+)?$/</span>,

                loader: <span class="hljs-string">'file'</span>

            },

            {

                test: <span class="hljs-regexp">/\.svg(\?v=\d+\.\d+\.\d+)?$/</span>,

                loader: <span class="hljs-string">'url?limit=10&amp;minetype=image/svg+xml'</span>

            }

        ]

    },

    plugins: [

        <span class="hljs-comment">//公用模块</span>

        <span class="hljs-keyword">new</span> CommonsChunkPlugin(<span class="hljs-string">'common.js'</span>, [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>]),

        <span class="hljs-comment">//设置抽出css文件名</span>

        <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">"css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]"</span>, {

            disable: <span class="hljs-literal">false</span>,

            allChunks: <span class="hljs-literal">true</span>

        }),

        <span class="hljs-comment">//定义全局变量</span>

        definePlugin,

        <span class="hljs-comment">//设置此处，则在JS中不用类似require('./base')引入基础模块， 只要直接使用Base变量即可</span>

        <span class="hljs-comment">//此处通常可用做，对常用组件，库的提前设置</span>

        <span class="hljs-keyword">new</span> webpack.ProvidePlugin({

            Moment: <span class="hljs-string">'moment'</span>, <span class="hljs-comment">//直接从node_modules中获取</span>

            Base: <span class="hljs-string">'../../base/index.js'</span> <span class="hljs-comment">//从文件中获取</span>

        })

    ],

    <span class="hljs-comment">//添加了此项，则表明从外部引入，内部不会打包合并进去</span>

    externals: {

        jquery: <span class="hljs-string">'window.jQuery'</span>,

        react: <span class="hljs-string">'window.React'</span>,

        <span class="hljs-comment">//...</span>

    }

};</code></pre>
<h2 id="articleHeader4">总结</h2>
<p>工欲善其事，必先利其器。</p>
<h2 id="articleHeader5">参考资料</h2>
<ol>
<li><p><a href="http://www.h-simon.com/42/" rel="nofollow noreferrer" target="_blank">webpack常用配置总结</a></p></li>
<li><p><a href="http://segmentfault.com/a/1190000002551952">Webpack</a> <a href="http://segmentfault.com/a/1190000002551952" target="_blank">入门指迷</a></p></li>
<li><p><a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">Webpack</a><a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">官方文档</a></p></li>
<li><p><a href="https://github.com/petehunt/webpack-howto/blob/master/README-zh.md" rel="nofollow noreferrer" target="_blank">webpack-howto</a></p></li>
<li><p><a href="https://medium.com/@dabit3/beginner-s-guide-to-webpack-b1f1a3638460#.mb01dbf12" rel="nofollow noreferrer" target="_blank">beginner-s-guide-to-webpack</a></p></li>
<li><p><a href="https://npmcompare.com/compare/browserify,grunt,gulp,webpack" rel="nofollow noreferrer" target="_blank">compare browserify,grunt,gulp,webpack</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
try webpack

## 原文链接
[https://segmentfault.com/a/1190000006194511](https://segmentfault.com/a/1190000006194511)


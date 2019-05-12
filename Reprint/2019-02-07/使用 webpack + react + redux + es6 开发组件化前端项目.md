---
title: '使用 webpack + react + redux + es6 开发组件化前端项目' 
date: 2019-02-07 2:30:15
hidden: true
slug: tiudy29d7mf
categories: [reprint]
---

{{< raw >}}

                    
<p>因为最近在工作中尝试了 <a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">webpack</a>、<a href="https://github.com/facebook/react" rel="nofollow noreferrer" target="_blank">react</a>、<a href="https://github.com/reactjs/redux" rel="nofollow noreferrer" target="_blank">redux</a>、<a href="http://babeljs.io/docs/learn-es2015/" rel="nofollow noreferrer" target="_blank">es6</a> 技术栈，所以总结出了一套 <a href="https://github.com/xiaoyann/webpack-best-practice" rel="nofollow noreferrer" target="_blank">boilerplate</a>，以便下次做项目时可以快速开始，并进行持续优化。对应的项目地址：<a href="https://github.com/xiaoyann/webpack-best-practice" rel="nofollow noreferrer" target="_blank">webpack-best-practice</a></p>
<p>该项目的 webpack 配置做了不少优化，所以构建速度还不错。文章的最后还对使用 webpack 的问题及性能优化作出了总结。</p>
<h2 id="articleHeader0">项目结构规划</h2>
<p>每个模块相关的 css、img、js 文件都放在一起，比较直观，删除模块时也会方便许多。测试文件也同样放在一起，哪些模块有没有写测试，哪些测试应该一起随模块删除，一目了然。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="build
|-- webpack.config.js               # 公共配置
|-- webpack.dev.js                  # 开发配置
|-- webpack.release.js              # 发布配置
docs                                # 项目文档
node_modules                        
src                                 # 项目源码
|-- conf                            # 配置文件
|-- pages                           # 页面目录
|   |-- page1                       
|   |   |-- index.js                # 页面逻辑
|   |   |-- index.scss              # 页面样式
|   |   |-- img                     # 页面图片
|   |   |   |-- xx.png          
|   |   |-- __tests__               # 测试文件
|   |   |   |-- xx.js
|   |-- app.html                    # 入口页
|   |-- app.js                      # 入口JS
|-- components                      # 组件目录
|   |-- loading
|   |   |-- index.js
|   |   |-- index.scss
|   |   |-- __tests__               
|   |   |   |-- xx.js
|-- js
|   |-- actions
|   |   |-- index.js
|   |   |-- __tests__               
|   |   |   |-- xx.js
|   |-- reducers 
|   |   |-- index.js
|   |   |-- __tests__               
|   |   |   |-- xx.js
|   |-- xx.js                 
|-- css                             # 公共CSS目录
|   |-- common.scss
|-- img                             # 公共图片目录
|   |-- xx.png
tests                               # 其他测试文件
package.json                        
READNE.md                           " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code class="shell">build
|<span class="hljs-string">-- webpack.config.js               # 公共配置
</span>|<span class="hljs-string">-- webpack.dev.js                  # 开发配置
</span>|<span class="hljs-string">-- webpack.release.js              # 发布配置
docs                                # 项目文档
node_modules                        
src                                 # 项目源码
</span>|<span class="hljs-string">-- conf                            # 配置文件
</span>|<span class="hljs-string">-- pages                           # 页面目录
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- page1                       
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- index.js                # 页面逻辑
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- index.scss              # 页面样式
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- img                     # 页面图片
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- xx.png          
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- __tests__               # 测试文件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- xx.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- app.html                    # 入口页
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- app.js                      # 入口JS
</span>|<span class="hljs-string">-- components                      # 组件目录
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- loading
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- index.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- index.scss
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- __tests__               
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- xx.js
</span>|<span class="hljs-string">-- js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- actions
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- index.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- __tests__               
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- xx.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- reducers 
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- index.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- __tests__               
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- xx.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- xx.js                 
</span>|<span class="hljs-string">-- css                             # 公共CSS目录
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- common.scss
</span>|<span class="hljs-string">-- img                             # 公共图片目录
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- xx.png
tests                               # 其他测试文件
package.json                        
READNE.md                           </span></code></pre>
<h2 id="articleHeader1">要完成的功能</h2>
<ol>
<li>编译 jsx、es6、scss 等资源</li>
<li>自动引入静态资源到相应 html 页面</li>
<li>实时编译和刷新浏览器</li>
<li>按指定模块化规范自动包装模块</li>
<li>自动给 css 添加浏览器内核前缀</li>
<li>按需打包合并 js、css</li>
<li>压缩 js、css、html</li>
<li>图片路径处理、压缩、CssSprite</li>
<li>对文件使用 hash 命名，做强缓存</li>
<li>语法检查</li>
<li>全局替换指定字符串</li>
<li>本地接口模拟服务</li>
<li>发布到远端机</li>
</ol>
<p>针对以上的几点功能，接下来将一步一步的来完成这个 <a href="https://github.com/xiaoyann/webpack-react-redux-es6-boilerplate" rel="nofollow noreferrer" target="_blank">boilerplate</a> 项目， 并记录下每一步的要点。</p>
<h3 id="articleHeader2">准备工作</h3>
<p>1、根据前面的项目结构规划创建项目骨架</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ make dir webpack-react-redux-es6-boilerplate
$ cd webpack-react-redux-es6-boilerplate
$ mkdir build docs src mock tests
$ touch build/webpack.config.js build/webpack.dev.js build/webpack.release.js
// 创建 package.json
$ npm init
$ ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">$ make dir webpack-react-redux-es6-boilerplate
$ cd webpack-react-redux-es6-boilerplate
$ mkdir build docs src mock tests
$ touch build/webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span> build/webpack<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.js</span> build/webpack<span class="hljs-selector-class">.release</span><span class="hljs-selector-class">.js</span>
<span class="hljs-comment">// 创建 package.json</span>
$ npm init
$ ...</code></pre>
<p>2、安装最基本的几个 npm 包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i webpack webpack-dev-server --save-dev
$ npm i react react-dom react-router redux react-redux redux-thunk --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code class="shell">$ npm i webpack webpack-<span class="hljs-built_in">dev</span>-server --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
$ npm i react react-dom react-router redux react-redux redux-thunk --<span class="hljs-built_in">save</span></code></pre>
<p>3、编写示例代码，最终代码直接查看 <a href="https://github.com/xiaoyann/webpack-react-redux-es6-boilerplate/tree/master/src/pages" rel="nofollow noreferrer" target="_blank">boilerplate</a></p>
<p>4、根据 <a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">webpack</a> 文档编写最基本的 webpack 配置，直接使用 NODE API 的方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* webpack.config.js */

var webpack = require('webpack');

// 辅助函数
var utils = require('./utils');
var fullPath  = utils.fullPath;
var pickFiles = utils.pickFiles;

// 项目根路径
var ROOT_PATH = fullPath('../');
// 项目源码路径
var SRC_PATH = ROOT_PATH + '/src';
// 产出路径
var DIST_PATH = ROOT_PATH + '/dist';

// 是否是开发环境
var __DEV__ = process.env.NODE_ENV !== 'production';

// conf
var alias = pickFiles({
  id: /(conf\/[^\/]+).js$/,
  pattern: SRC_PATH + '/conf/*.js'
});

// components
alias = Object.assign(alias, pickFiles({
  id: /(components\/[^\/]+)/,
  pattern: SRC_PATH + '/components/*/index.js'
}));

// reducers
alias = Object.assign(alias, pickFiles({
  id: /(reducers\/[^\/]+).js/,
  pattern: SRC_PATH + '/js/reducers/*'
}));

// actions
alias = Object.assign(alias, pickFiles({
  id: /(actions\/[^\/]+).js/,
  pattern: SRC_PATH + '/js/actions/*'
}));


var config = {
  context: SRC_PATH,
  entry: {
    app: ['./pages/app.js']
  },
  output: {
    path: DIST_PATH,
    filename: 'js/bundle.js'
  },
  module: {},
  resolve: {
    alias: alias
  },
  plugins: [
    new webpack.DefinePlugin({
      // http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
      &quot;process.env.NODE_ENV&quot;: JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
};

module.exports = config;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* webpack.config.js */</span>

<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-comment">// 辅助函数</span>
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>);
<span class="hljs-keyword">var</span> fullPath  = utils.fullPath;
<span class="hljs-keyword">var</span> pickFiles = utils.pickFiles;

<span class="hljs-comment">// 项目根路径</span>
<span class="hljs-keyword">var</span> ROOT_PATH = fullPath(<span class="hljs-string">'../'</span>);
<span class="hljs-comment">// 项目源码路径</span>
<span class="hljs-keyword">var</span> SRC_PATH = ROOT_PATH + <span class="hljs-string">'/src'</span>;
<span class="hljs-comment">// 产出路径</span>
<span class="hljs-keyword">var</span> DIST_PATH = ROOT_PATH + <span class="hljs-string">'/dist'</span>;

<span class="hljs-comment">// 是否是开发环境</span>
<span class="hljs-keyword">var</span> __DEV__ = process.env.NODE_ENV !== <span class="hljs-string">'production'</span>;

<span class="hljs-comment">// conf</span>
<span class="hljs-keyword">var</span> alias = pickFiles({
  <span class="hljs-attr">id</span>: <span class="hljs-regexp">/(conf\/[^\/]+).js$/</span>,
  <span class="hljs-attr">pattern</span>: SRC_PATH + <span class="hljs-string">'/conf/*.js'</span>
});

<span class="hljs-comment">// components</span>
alias = <span class="hljs-built_in">Object</span>.assign(alias, pickFiles({
  <span class="hljs-attr">id</span>: <span class="hljs-regexp">/(components\/[^\/]+)/</span>,
  <span class="hljs-attr">pattern</span>: SRC_PATH + <span class="hljs-string">'/components/*/index.js'</span>
}));

<span class="hljs-comment">// reducers</span>
alias = <span class="hljs-built_in">Object</span>.assign(alias, pickFiles({
  <span class="hljs-attr">id</span>: <span class="hljs-regexp">/(reducers\/[^\/]+).js/</span>,
  <span class="hljs-attr">pattern</span>: SRC_PATH + <span class="hljs-string">'/js/reducers/*'</span>
}));

<span class="hljs-comment">// actions</span>
alias = <span class="hljs-built_in">Object</span>.assign(alias, pickFiles({
  <span class="hljs-attr">id</span>: <span class="hljs-regexp">/(actions\/[^\/]+).js/</span>,
  <span class="hljs-attr">pattern</span>: SRC_PATH + <span class="hljs-string">'/js/actions/*'</span>
}));


<span class="hljs-keyword">var</span> config = {
  <span class="hljs-attr">context</span>: SRC_PATH,
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: [<span class="hljs-string">'./pages/app.js'</span>]
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: DIST_PATH,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'js/bundle.js'</span>
  },
  <span class="hljs-attr">module</span>: {},
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">alias</span>: alias
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-comment">// http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack</span>
      <span class="hljs-string">"process.env.NODE_ENV"</span>: <span class="hljs-built_in">JSON</span>.stringify(process.env.NODE_ENV || <span class="hljs-string">'development'</span>)
    })
  ]
};

<span class="hljs-built_in">module</span>.exports = config;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* webpack.dev.js */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var utils = require('./utils');

var PORT = 8080;
var HOST = utils.getIP();
var args = process.argv;
var hot = args.indexOf('--hot') > -1;
var deploy = args.indexOf('--deploy') > -1;

// 本地环境静态资源路径
var localPublicPath = 'http://' + HOST + ':' + PORT + '/';

config.output.publicPath = localPublicPath; 
config.entry.app.unshift('webpack-dev-server/client?' + localPublicPath);

new WebpackDevServer(webpack(config), {
  hot: hot,
  inline: true,
  compress: true,
  stats: {
    chunks: false,
    children: false,
    colors: true
  },
  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: true,
}).listen(PORT, HOST, function() {
  console.log(localPublicPath);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* webpack.dev.js */</span>

<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> WebpackDevServer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-dev-server'</span>);
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.config'</span>);
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>);

<span class="hljs-keyword">var</span> PORT = <span class="hljs-number">8080</span>;
<span class="hljs-keyword">var</span> HOST = utils.getIP();
<span class="hljs-keyword">var</span> args = process.argv;
<span class="hljs-keyword">var</span> hot = args.indexOf(<span class="hljs-string">'--hot'</span>) &gt; <span class="hljs-number">-1</span>;
<span class="hljs-keyword">var</span> deploy = args.indexOf(<span class="hljs-string">'--deploy'</span>) &gt; <span class="hljs-number">-1</span>;

<span class="hljs-comment">// 本地环境静态资源路径</span>
<span class="hljs-keyword">var</span> localPublicPath = <span class="hljs-string">'http://'</span> + HOST + <span class="hljs-string">':'</span> + PORT + <span class="hljs-string">'/'</span>;

config.output.publicPath = localPublicPath; 
config.entry.app.unshift(<span class="hljs-string">'webpack-dev-server/client?'</span> + localPublicPath);

<span class="hljs-keyword">new</span> WebpackDevServer(webpack(config), {
  <span class="hljs-attr">hot</span>: hot,
  <span class="hljs-attr">inline</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">compress</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">stats</span>: {
    <span class="hljs-attr">chunks</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">children</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-comment">// Set this as true if you want to access dev server from arbitrary url.</span>
  <span class="hljs-comment">// This is handy if you are using a html5 router.</span>
  historyApiFallback: <span class="hljs-literal">true</span>,
}).listen(PORT, HOST, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(localPublicPath);
});</code></pre>
<p>上面的配置写好后就可以开始构建了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node build/webpack.dev.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell" style="word-break: break-word; white-space: initial;">$ <span class="hljs-keyword">node</span> <span class="hljs-title">build</span>/webpack.dev.js</code></pre>
<p>因为项目中使用了 jsx、es6、scss，所以还要添加相应的 loader，否则会报如下类似错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ERROR in ./src/pages/app.js
Module parse failed: /Users/xiaoyan/working/webpack-react-redux-es6-boilerplate/src/pages/app.js Unexpected token (18:6)
You may need an appropriate loader to handle this file type." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">ERROR <span class="hljs-keyword">in</span> ./src/pages/app.js
Module parse failed: <span class="hljs-regexp">/Users/</span>xiaoyan/working/webpack-react-redux-es6-boilerplate/src/pages/app.js Unexpected token (<span class="hljs-number">18</span>:<span class="hljs-number">6</span>)
You may need an appropriate loader to handle <span class="hljs-keyword">this</span> file type.</code></pre>
<h3 id="articleHeader3">编译 jsx、es6、scss 等资源</h3>
<ul>
<li>使用 <a href="http://babeljs.io/" rel="nofollow noreferrer" target="_blank">bael</a> 和 <a href="https://github.com/babel/babel-loader" rel="nofollow noreferrer" target="_blank">babel-loader</a> 编译 jsx、es6</li>
<li>安装插件: <a href="http://babeljs.io/docs/plugins/preset-es2015/" rel="nofollow noreferrer" target="_blank">babel-preset-es2015</a> 用于解析 <code>es6</code>
</li>
<li>安装插件：<a href="http://babeljs.io/docs/plugins/preset-react/" rel="nofollow noreferrer" target="_blank">babel-preset-react</a> 用于解析 <code>jsx</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 首先需要安装 babel 
$ npm i babel-core --save-dev
// 安装插件 
$ npm i babel-preset-es2015 babel-preset-react --save-dev
// 安装 loader
$ npm i babel-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 首先需要安装 babel </span>
$ npm i babel-core --save-dev
<span class="hljs-comment">// 安装插件 </span>
$ npm i babel-preset-es2015 babel-preset-react --save-dev
<span class="hljs-comment">// 安装 loader</span>
$ npm i babel-loader --save-dev</code></pre>
<p>在项目根目录创建 <code>.babelrc</code> 文件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;es2015&quot;, &quot;react&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"es2015"</span>, <span class="hljs-string">"react"</span>]
}</code></pre>
<p>在 webpack.config.js 里添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用缓存
var CACHE_PATH = ROOT_PATH + '/cache';
// loaders
config.module.loaders = [];
// 使用 babel 编译 jsx、es6
config.module.loaders.push({
  test: /\.js$/,
  exclude: /node_modules/,
  include: SRC_PATH,
  // 这里使用 loaders ，因为后面还需要添加 loader
  loaders: ['babel?cacheDirectory=' + CACHE_PATH]
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 使用缓存</span>
<span class="hljs-keyword">var</span> CACHE_PATH = ROOT_PATH + <span class="hljs-string">'/cache'</span>;
<span class="hljs-comment">// loaders</span>
config.module.loaders = [];
<span class="hljs-comment">// 使用 babel 编译 jsx、es6</span>
config.module.loaders.push({
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
  <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
  <span class="hljs-attr">include</span>: SRC_PATH,
  <span class="hljs-comment">// 这里使用 loaders ，因为后面还需要添加 loader</span>
  loaders: [<span class="hljs-string">'babel?cacheDirectory='</span> + CACHE_PATH]
});
</code></pre>
<p>接下来使用 <a href="https://github.com/jtangelder/sass-loader" rel="nofollow noreferrer" target="_blank">sass-loader</a> 编译 sass:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i sass-loader node-sass css-loader style-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell" style="word-break: break-word; white-space: initial;">$ npm i sass-loader <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span> css-loader style-loader --save-dev</code></pre>
<ul>
<li>
<a href="https://github.com/webpack/css-loader" rel="nofollow noreferrer" target="_blank">css-loader</a> 用于将 css 当做模块一样来 <code>import</code>
</li>
<li>
<a href="https://github.com/webpack/style-loader" rel="nofollow noreferrer" target="_blank">style-loader</a> 用于自动将 css 添加到页面</li>
</ul>
<p>在 webpack.config.js 里添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 编译 sass
config.module.loaders.push({
  test: /\.(scss|css)$/,
  loaders: ['style', 'css', 'sass']
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 编译 sass</span>
config.module.loaders.push({
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(scss|css)$/</span>,
  <span class="hljs-attr">loaders</span>: [<span class="hljs-string">'style'</span>, <span class="hljs-string">'css'</span>, <span class="hljs-string">'sass'</span>]
});</code></pre>
<h3 id="articleHeader4">自动引入静态资源到相应 html 页面</h3>
<ul><li>使用 <a href="https://github.com/ampedandwired/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">html-webpack-plugin</a>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i html-webpack-plugin --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$ npm i html-webpack-plugin --save-dev</code></pre>
<p>在 webpack.config.js 里添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// html 页面
var HtmlwebpackPlugin = require('html-webpack-plugin');
config.plugins.push(
  new HtmlwebpackPlugin({
    filename: 'index.html',
    chunks: ['app'],
    template: SRC_PATH + '/pages/app.html'
  })
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// html 页面</span>
<span class="hljs-keyword">var</span> HtmlwebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
config.plugins.push(
  <span class="hljs-keyword">new</span> HtmlwebpackPlugin({
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,
    <span class="hljs-attr">chunks</span>: [<span class="hljs-string">'app'</span>],
    <span class="hljs-attr">template</span>: SRC_PATH + <span class="hljs-string">'/pages/app.html'</span>
  })
);</code></pre>
<p>至此，整个项目就可以正常跑起来了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node build/webpack.dev.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell" style="word-break: break-word; white-space: initial;">$ <span class="hljs-keyword">node</span> <span class="hljs-title">build</span>/webpack.dev.js</code></pre>
<h3 id="articleHeader5">实时编译和刷新浏览器</h3>
<p>完成前面的配置后，项目就已经可以实时编译和自动刷新浏览器了。接下来就配置下热更新，使用 <a href="https://github.com/gaearon/react-hot-loader" rel="nofollow noreferrer" target="_blank">react-hot-loader</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i react-hot-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$ npm i react-hot-loader --save-dev</code></pre>
<p>因为热更新只需要在开发时使用，所以在 webpack.dev.config 里添加如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 开启热替换相关设置
if (hot === true) {
  config.entry.app.unshift('webpack/hot/only-dev-server');
  // 注意这里 loaders[0] 是处理 .js 文件的 loader
  config.module.loaders[0].loaders.unshift('react-hot');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 开启热替换相关设置</span>
<span class="hljs-keyword">if</span> (hot === <span class="hljs-literal">true</span>) {
  config.entry.app.unshift(<span class="hljs-string">'webpack/hot/only-dev-server'</span>);
  <span class="hljs-comment">// 注意这里 loaders[0] 是处理 .js 文件的 loader</span>
  config.module.loaders[<span class="hljs-number">0</span>].loaders.unshift(<span class="hljs-string">'react-hot'</span>);
  config.plugins.push(<span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin());
}
</code></pre>
<p>执行下面的命令，并尝试更改 js、css：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node build/webpack.dev.js --hot" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell" style="word-break: break-word; white-space: initial;">$ <span class="hljs-keyword">node</span> <span class="hljs-title">build</span>/webpack.dev.js --hot</code></pre>
<h3 id="articleHeader6">按指定模块化规范自动包装模块</h3>
<p>webpack 支持 CommonJS、AMD 规范，具体如何使用直接查看文档</p>
<h3 id="articleHeader7">自动给 css 添加浏览器内核前缀</h3>
<p>使用 <a href="https://github.com/postcss/postcss-loader" rel="nofollow noreferrer" target="_blank">postcss-loader</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i postcss-loader precss autoprefixer --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code class="shell" style="word-break: break-word; white-space: initial;">npm i postcss-loader precss autoprefixer --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>在 webpack.config.js 里添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 编译 sass
config.module.loaders.push({
  test: /\.(scss|css)$/,
  loaders: ['style', 'css', 'sass', 'postcss']
});

// css autoprefix
var precss = require('precss');
var autoprefixer = require('autoprefixer');
config.postcss = function() {
  return [precss, autoprefixer];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 编译 sass</span>
config.module.loaders.push({
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(scss|css)$/</span>,
  <span class="hljs-attr">loaders</span>: [<span class="hljs-string">'style'</span>, <span class="hljs-string">'css'</span>, <span class="hljs-string">'sass'</span>, <span class="hljs-string">'postcss'</span>]
});

<span class="hljs-comment">// css autoprefix</span>
<span class="hljs-keyword">var</span> precss = <span class="hljs-built_in">require</span>(<span class="hljs-string">'precss'</span>);
<span class="hljs-keyword">var</span> autoprefixer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>);
config.postcss = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> [precss, autoprefixer];
}</code></pre>
<h3 id="articleHeader8">打包合并 js、css</h3>
<p>webpack 默认将所有模块都打包成一个 bundle，并提供了 <a href="http://webpack.github.io/docs/code-splitting.html" rel="nofollow noreferrer" target="_blank">Code Splitting</a> 功能便于我们按需拆分。在这个例子里我们把框架和库都拆分出来：</p>
<p>在 webpack.config.js 添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config.entry.lib = [
  'react', 'react-dom', 'react-router',
  'redux', 'react-redux', 'redux-thunk'
]

config.output.filename = 'js/[name].js';

config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin('lib', 'js/lib.js')
);

// 别忘了将 lib 添加到 html 页面
// chunks: ['app', 'lib']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">config.entry.lib = [
  <span class="hljs-string">'react'</span>, <span class="hljs-string">'react-dom'</span>, <span class="hljs-string">'react-router'</span>,
  <span class="hljs-string">'redux'</span>, <span class="hljs-string">'react-redux'</span>, <span class="hljs-string">'redux-thunk'</span>
]

config.output.filename = <span class="hljs-string">'js/[name].js'</span>;

config.plugins.push(
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'lib'</span>, <span class="hljs-string">'js/lib.js'</span>)
);

<span class="hljs-comment">// 别忘了将 lib 添加到 html 页面</span>
<span class="hljs-comment">// chunks: ['app', 'lib']</span></code></pre>
<p>如何拆分 CSS：<a href="http://webpack.github.io/docs/stylesheets.html" rel="nofollow noreferrer" target="_blank">separate css bundle</a></p>
<h3 id="articleHeader9">压缩 js、css、html、png 图片</h3>
<p>压缩资源最好只在生产环境时使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 压缩 js、css
config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
);

// 压缩 html
// html 页面
var HtmlwebpackPlugin = require('html-webpack-plugin');
config.plugins.push(
  new HtmlwebpackPlugin({
    filename: 'index.html',
    chunks: ['app', 'lib'],
    template: SRC_PATH + '/pages/app.html',
    minify: {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeComments: true
    }
  })
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 压缩 js、css</span>
config.plugins.push(
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
        <span class="hljs-attr">compress</span>: {
            <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
        }
    })
);

<span class="hljs-comment">// 压缩 html</span>
<span class="hljs-comment">// html 页面</span>
<span class="hljs-keyword">var</span> HtmlwebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
config.plugins.push(
  <span class="hljs-keyword">new</span> HtmlwebpackPlugin({
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,
    <span class="hljs-attr">chunks</span>: [<span class="hljs-string">'app'</span>, <span class="hljs-string">'lib'</span>],
    <span class="hljs-attr">template</span>: SRC_PATH + <span class="hljs-string">'/pages/app.html'</span>,
    <span class="hljs-attr">minify</span>: {
      <span class="hljs-attr">collapseWhitespace</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">collapseInlineTagWhitespace</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">removeRedundantAttributes</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">removeEmptyAttributes</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">removeScriptTypeAttributes</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">removeStyleLinkTypeAttributes</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">removeComments</span>: <span class="hljs-literal">true</span>
    }
  })
);
</code></pre>
<h3 id="articleHeader10">图片路径处理、压缩、CssSprite</h3>
<ul>
<li>压缩图片使用 <a href="https://github.com/tcoopman/image-webpack-loader" rel="nofollow noreferrer" target="_blank">image-webpack-loader</a>
</li>
<li>图片路径处理使用 <a href="https://github.com/webpack/url-loader" rel="nofollow noreferrer" target="_blank">url-loader</a>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i url-loader image-webpack-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code class="shell" style="word-break: break-word; white-space: initial;">$ npm i url-loader <span class="hljs-built_in">image</span>-webpack-loader --<span class="hljs-built_in">save</span>-dev</code></pre>
<p>在 webpack.config.js 里添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 图片路径处理，压缩
config.module.loaders.push({
  test: /\.(?:jpg|gif|png|svg)$/,
  loaders: [
    'url?limit=8000&amp;name=img/[hash].[ext]',
    'image-webpack'
  ]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 图片路径处理，压缩</span>
config.module.loaders.push({
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(?:jpg|gif|png|svg)$/</span>,
  <span class="hljs-attr">loaders</span>: [
    <span class="hljs-string">'url?limit=8000&amp;name=img/[hash].[ext]'</span>,
    <span class="hljs-string">'image-webpack'</span>
  ]
});</code></pre>
<p>雪碧图处理：<a href="http://kyon-df.com/2016/03/16/webpack_auto_sprites/" rel="nofollow noreferrer" target="_blank">webpack_auto_sprites</a></p>
<h3 id="articleHeader11">对文件使用 hash 命名，做强缓存</h3>
<p>根据 <a href="http://webpack.github.io/docs/long-term-caching.html" rel="nofollow noreferrer" target="_blank">docs</a>，在产出文件命名中加上 <code>[hash]</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config.output.filename = 'js/[name].[hash].js';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">config.output.filename = <span class="hljs-string">'js/[name].[hash].js'</span>;</code></pre>
<h3 id="articleHeader12">本地接口模拟服务</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 直接使用 epxress 创建一个本地服务
$ npm install epxress --save-dev
$ mkdir mock &amp;&amp; cd mock
$ touch app.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code class="shell"><span class="hljs-comment">// 直接使用 epxress 创建一个本地服务</span>
$ npm install epxress --<span class="hljs-keyword">save</span>-dev
$ <span class="hljs-keyword">mkdir</span> mock &amp;&amp; <span class="hljs-keyword">cd</span> mock
$ touch <span class="hljs-keyword">app</span>.js</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require('express');
var app = express();

// 设置跨域访问，方便开发
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// 具体接口设置
app.get('/api/test', function(req, res) {
    res.send({ code: 200, data: 'your data' });
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Mock server listening at http://%s:%s', host, port);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> app = express();

<span class="hljs-comment">// 设置跨域访问，方便开发</span>
app.all(<span class="hljs-string">'*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    res.header(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, <span class="hljs-string">'*'</span>);
    next();
});

<span class="hljs-comment">// 具体接口设置</span>
app.get(<span class="hljs-string">'/api/test'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.send({ <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">data</span>: <span class="hljs-string">'your data'</span> });
});

<span class="hljs-keyword">var</span> server = app.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> host = server.address().address;
    <span class="hljs-keyword">var</span> port = server.address().port;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Mock server listening at http://%s:%s'</span>, host, port);
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 启动服务，如果用 PM2 管理会更方便，增加接口不用自己手动重启服务
$ node app.js &amp;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell">// 启动服务，如果用 PM2 管理会更方便，增加接口不用自己手动重启服务
$ <span class="hljs-keyword">node</span> <span class="hljs-title">app</span>.js &amp;</code></pre>
<h3 id="articleHeader13">发布到远端机</h3>
<p>写一个 deploy 插件，使用 <a href="https://github.com/mscdex/node-ftp" rel="nofollow noreferrer" target="_blank">ftp</a> 上传文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i ftp --save-dev
$ touch build/deploy.plugin.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">$ npm <span class="hljs-selector-tag">i</span> ftp --save-dev
$ touch build/deploy<span class="hljs-selector-class">.plugin</span><span class="hljs-selector-class">.js</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// build/deploy.plugin.js

var Client = require('ftp');
var client = new Client();

// 待上传的文件
var __assets__ = [];
// 是否已连接
var __connected__ = false;

var __conf__ = null;

function uploadFile(startTime) {
  var file = __assets__.shift();
  // 没有文件就关闭连接
  if (!file) return client.end();
  // 开始上传
  client.put(file.source, file.remotePath, function(err) {
    // 本次上传耗时
    var timming = Date.now() - startTime;
    if (err) {
      console.log('error ', err);
      console.log('upload fail -', file.remotePath);
    } else {
      console.log('upload success -', file.remotePath, timming + 'ms');
    }
    // 每次上传之后检测下是否还有文件需要上传，如果没有就关闭连接
    if (__assets__.length === 0) {
      client.end();
    } else {
      uploadFile();
    }
  });
}

// 发起连接
function connect(conf) {
  if (!__connected__) {
    client.connect(__conf__);
  }
}

// 连接成功
client.on('ready', function() {
  __connected__ = true;
  uploadFile(Date.now());
});

// 连接已关闭
client.on('close', function() {
  __connected__ = false;
  // 连接关闭后，如果发现还有文件需要上传就重新发起连接
  if (__assets__.length > 0) connect();
});

/**
 * [deploy description]
 * @param  {Array}   assets  待 deploy 的文件
 * file.source      buffer
 * file.remotePath  path
 */
function deployWithFtp(conf, assets, callback) {
  __conf__ = conf;
  __assets__ = __assets__.concat(assets);
  connect();
}



var path = require('path');

/**
 * [DeployPlugin description]
 * @param {Array} options
 * option.reg 
 * option.to 
 */
function DeployPlugin(conf, options) {
  this.conf = conf;
  this.options = options;
}

DeployPlugin.prototype.apply = function(compiler) {
  var conf = this.conf;
  var options = this.options;
  compiler.plugin('done', function(stats) {
    var files = [];
    var assets = stats.compilation.assets;
    for (var name in assets) {
      options.map(function(cfg) {
        if (cfg.reg.test(name)) {
          files.push({
            localPath: name,
            remotePath: path.join(cfg.to, name),
            source: new Buffer(assets[name].source(), 'utf-8')
          });
        }
      });
    }
    deployWithFtp(conf, files);
  });
};


module.exports = DeployPlugin;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// build/deploy.plugin.js</span>

<span class="hljs-keyword">var</span> Client = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ftp'</span>);
<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> Client();

<span class="hljs-comment">// 待上传的文件</span>
<span class="hljs-keyword">var</span> __assets__ = [];
<span class="hljs-comment">// 是否已连接</span>
<span class="hljs-keyword">var</span> __connected__ = <span class="hljs-literal">false</span>;

<span class="hljs-keyword">var</span> __conf__ = <span class="hljs-literal">null</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">uploadFile</span>(<span class="hljs-params">startTime</span>) </span>{
  <span class="hljs-keyword">var</span> file = __assets__.shift();
  <span class="hljs-comment">// 没有文件就关闭连接</span>
  <span class="hljs-keyword">if</span> (!file) <span class="hljs-keyword">return</span> client.end();
  <span class="hljs-comment">// 开始上传</span>
  client.put(file.source, file.remotePath, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
    <span class="hljs-comment">// 本次上传耗时</span>
    <span class="hljs-keyword">var</span> timming = <span class="hljs-built_in">Date</span>.now() - startTime;
    <span class="hljs-keyword">if</span> (err) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error '</span>, err);
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'upload fail -'</span>, file.remotePath);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'upload success -'</span>, file.remotePath, timming + <span class="hljs-string">'ms'</span>);
    }
    <span class="hljs-comment">// 每次上传之后检测下是否还有文件需要上传，如果没有就关闭连接</span>
    <span class="hljs-keyword">if</span> (__assets__.length === <span class="hljs-number">0</span>) {
      client.end();
    } <span class="hljs-keyword">else</span> {
      uploadFile();
    }
  });
}

<span class="hljs-comment">// 发起连接</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">connect</span>(<span class="hljs-params">conf</span>) </span>{
  <span class="hljs-keyword">if</span> (!__connected__) {
    client.connect(__conf__);
  }
}

<span class="hljs-comment">// 连接成功</span>
client.on(<span class="hljs-string">'ready'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  __connected__ = <span class="hljs-literal">true</span>;
  uploadFile(<span class="hljs-built_in">Date</span>.now());
});

<span class="hljs-comment">// 连接已关闭</span>
client.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  __connected__ = <span class="hljs-literal">false</span>;
  <span class="hljs-comment">// 连接关闭后，如果发现还有文件需要上传就重新发起连接</span>
  <span class="hljs-keyword">if</span> (__assets__.length &gt; <span class="hljs-number">0</span>) connect();
});

<span class="hljs-comment">/**
 * [deploy description]
 * @param  {Array}   assets  待 deploy 的文件
 * file.source      buffer
 * file.remotePath  path
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deployWithFtp</span>(<span class="hljs-params">conf, assets, callback</span>) </span>{
  __conf__ = conf;
  __assets__ = __assets__.concat(assets);
  connect();
}



<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-comment">/**
 * [DeployPlugin description]
 * @param {Array} options
 * option.reg 
 * option.to 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">DeployPlugin</span>(<span class="hljs-params">conf, options</span>) </span>{
  <span class="hljs-keyword">this</span>.conf = conf;
  <span class="hljs-keyword">this</span>.options = options;
}

DeployPlugin.prototype.apply = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compiler</span>) </span>{
  <span class="hljs-keyword">var</span> conf = <span class="hljs-keyword">this</span>.conf;
  <span class="hljs-keyword">var</span> options = <span class="hljs-keyword">this</span>.options;
  compiler.plugin(<span class="hljs-string">'done'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">stats</span>) </span>{
    <span class="hljs-keyword">var</span> files = [];
    <span class="hljs-keyword">var</span> assets = stats.compilation.assets;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> name <span class="hljs-keyword">in</span> assets) {
      options.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cfg</span>) </span>{
        <span class="hljs-keyword">if</span> (cfg.reg.test(name)) {
          files.push({
            <span class="hljs-attr">localPath</span>: name,
            <span class="hljs-attr">remotePath</span>: path.join(cfg.to, name),
            <span class="hljs-attr">source</span>: <span class="hljs-keyword">new</span> Buffer(assets[name].source(), <span class="hljs-string">'utf-8'</span>)
          });
        }
      });
    }
    deployWithFtp(conf, files);
  });
};


<span class="hljs-built_in">module</span>.exports = DeployPlugin;
</code></pre>
<p>运用上面写的插件，实现同时在本地、测试环境开发，并能自动刷新和热更新。在 webpack.dev.js 里添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var DeployPlugin = require('./deploy.plugin');
// 是否发布到测试环境
if (deploy === true) {
  config.plugins.push(
    new DeployPlugin({
      user: 'username',
      password: 'password', 
      host: 'your host', 
      keepalive: 10000000
    }, 
    [{reg: /html$/, to: '/xxx/xxx/xxx/app/views/'}])
  );
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> DeployPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./deploy.plugin'</span>);
<span class="hljs-comment">// 是否发布到测试环境</span>
<span class="hljs-keyword">if</span> (deploy === <span class="hljs-literal">true</span>) {
  config.plugins.push(
    <span class="hljs-keyword">new</span> DeployPlugin({
      <span class="hljs-attr">user</span>: <span class="hljs-string">'username'</span>,
      <span class="hljs-attr">password</span>: <span class="hljs-string">'password'</span>, 
      <span class="hljs-attr">host</span>: <span class="hljs-string">'your host'</span>, 
      <span class="hljs-attr">keepalive</span>: <span class="hljs-number">10000000</span>
    }, 
    [{<span class="hljs-attr">reg</span>: <span class="hljs-regexp">/html$/</span>, <span class="hljs-attr">to</span>: <span class="hljs-string">'/xxx/xxx/xxx/app/views/'</span>}])
  );
}
</code></pre>
<p>在这个例子里，只将 html 文件发布到测试环境，静态资源还是使用的本地的webpack-dev-server，所以热更新、自动刷新还是可以正常使用</p>
<p>其他的发布插件：</p>
<ul>
<li>
<a href="https://github.com/xiaoyann/deploy-kit" rel="nofollow noreferrer" target="_blank">deploy-kit</a> (推荐)</li>
<li><a href="https://github.com/iAmHades/sftp-webpack-plugin" rel="nofollow noreferrer" target="_blank">sftp-webpack-plugin</a></li>
<li><a href="https://github.com/sqhtiamo/webpack-sftp-client" rel="nofollow noreferrer" target="_blank">webpack-sftp-client</a></li>
</ul>
<h2 id="articleHeader14">webpack 问题及优化</h2>
<h3 id="articleHeader15">改变代码时所有的 chunkhash 都会改变</h3>
<p>在这个项目中我们把框架和库都打包到了一个 chunk，这部分我们自己是不会修改的，但是当我们更改业务代码时这个 chunk 的 hash 却同时发生了变化。这将导致上线时用户又得重新下载这个根本没有变化的文件。</p>
<p>所以我们不能使用 webpack 提供的 chunkhash 来命名文件，那我们自己根据文件内容来计算 hash 命名不就好了吗。<br>开发的时候不需要使用 hash，或者使用 hash 也没问题，最终产出时我们使用自己的方式重新命名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i md5 --save-dev
$ touch build/rename.plugin.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">$ npm <span class="hljs-selector-tag">i</span> md5 --save-dev
$ touch build/rename<span class="hljs-selector-class">.plugin</span><span class="hljs-selector-class">.js</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// rename.plugin.js

var fs = require('fs');
var path = require('path');
var md5 = require('md5');


function RenamePlugin() {
}

RenamePlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function(stats) {
    var htmlFiles = [];
    var hashFiles = [];
    var assets = stats.compilation.assets;

    Object.keys(assets).forEach(function(fileName) {
      var file = assets[fileName];
      if (/\.(css|js)$/.test(fileName)) {
        var hash = md5(file.source());
        var newName = fileName.replace(/(.js|.css)$/, '.' + hash + '$1');
        hashFiles.push({
          originName: fileName,
          hashName: newName
        });
        fs.rename(file.existsAt, file.existsAt.replace(fileName, newName));
      } 
      else if (/\.html$/) {
        htmlFiles.push(fileName);
      }
    });

    htmlFiles.forEach(function(fileName) {
      var file = assets[fileName];
      var contents = file.source();
      hashFiles.forEach(function(item) {
        contents = contents.replace(item.originName, item.hashName);
      });
      fs.writeFile(file.existsAt, contents, 'utf-8');
    });
  });
};

module.exports = RenamePlugin;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// rename.plugin.js</span>

<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> md5 = <span class="hljs-built_in">require</span>(<span class="hljs-string">'md5'</span>);


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">RenamePlugin</span>(<span class="hljs-params"></span>) </span>{
}

RenamePlugin.prototype.apply = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compiler</span>) </span>{
  compiler.plugin(<span class="hljs-string">'done'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">stats</span>) </span>{
    <span class="hljs-keyword">var</span> htmlFiles = [];
    <span class="hljs-keyword">var</span> hashFiles = [];
    <span class="hljs-keyword">var</span> assets = stats.compilation.assets;

    <span class="hljs-built_in">Object</span>.keys(assets).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fileName</span>) </span>{
      <span class="hljs-keyword">var</span> file = assets[fileName];
      <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/\.(css|js)$/</span>.test(fileName)) {
        <span class="hljs-keyword">var</span> hash = md5(file.source());
        <span class="hljs-keyword">var</span> newName = fileName.replace(<span class="hljs-regexp">/(.js|.css)$/</span>, <span class="hljs-string">'.'</span> + hash + <span class="hljs-string">'$1'</span>);
        hashFiles.push({
          <span class="hljs-attr">originName</span>: fileName,
          <span class="hljs-attr">hashName</span>: newName
        });
        fs.rename(file.existsAt, file.existsAt.replace(fileName, newName));
      } 
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/\.html$/</span>) {
        htmlFiles.push(fileName);
      }
    });

    htmlFiles.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fileName</span>) </span>{
      <span class="hljs-keyword">var</span> file = assets[fileName];
      <span class="hljs-keyword">var</span> contents = file.source();
      hashFiles.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
        contents = contents.replace(item.originName, item.hashName);
      });
      fs.writeFile(file.existsAt, contents, <span class="hljs-string">'utf-8'</span>);
    });
  });
};

<span class="hljs-built_in">module</span>.exports = RenamePlugin;</code></pre>
<p>在 webpack.release.js 里添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.release.js

var RenamePlugin = require('./rename.plugin');
config.plugins.push(new RenamePlugin());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack.release.js</span>

<span class="hljs-keyword">var</span> RenamePlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./rename.plugin'</span>);
config.plugins.push(<span class="hljs-keyword">new</span> RenamePlugin());</code></pre>
<p>最后也推荐使用自己的方式，根据最终文件内容计算 hash，因为这样无论谁发布代码，或者无论在哪台机器上发布，计算出来的 hash 都是一样的。不会因为下次上线换了台机器就改变了不需要改变的 hash。</p>
<h5>2016年07月20日20:34:46 更新：</h5>
<p>上面的关于hash的说法有点武断了，抱歉。</p>
<p>关于这个问题有两个点需要知道：</p>
<p>1、 webpack 会根据模块第一次被引用的顺序来将模块放到一个数组里面，模块 id 就是它在数组中的位置。比如下面这个模块的 id 是 3, 如果这个模块第一次被引用的顺序变了，它就不是 3 了，所以最终文件的内容还是可能会发生不必要的改变。也就是说，即使我们使用自己的方式计算 hash，还是没有彻底解决这个问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 3 */
/***/ function(module, exports) {

    module.exports = 'module is ';

/***/ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 3 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports</span>) </span>{

    <span class="hljs-built_in">module</span>.exports = <span class="hljs-string">'module is '</span>;

<span class="hljs-comment">/***/</span> }</code></pre>
<p>2、我们使用webpack就不需要再使用其他的模块加载器，因为webpack自己实现了。这块代码保留了一份 chunk map，而这块代码被打包到了 lib。也就是说 lib 的内容会因为我们增加 chunk，或减少 chunk 而变，尤其是使用了 webpack hash 后，只要其他代码的内容变了，map 里的 hash 随着更新，lib 的内容又得变了，而这都不是我们期望的。坑啊。。。。。。。。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/******/             script.src = __webpack_require__.p + &quot;&quot; + chunkId + &quot;.&quot; + ({&quot;0&quot;:&quot;app&quot;}[chunkId]||chunkId) + &quot;.&quot; + {&quot;0&quot;:&quot;f829bbd875a74dae32a2&quot;}[chunkId] + &quot;.js&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-comment">/******/</span>             script.src = __webpack_require__.p + <span class="hljs-string">""</span> + chunkId + <span class="hljs-string">"."</span> + ({<span class="hljs-string">"0"</span>:<span class="hljs-string">"app"</span>}[chunkId]||chunkId) + <span class="hljs-string">"."</span> + {<span class="hljs-string">"0"</span>:<span class="hljs-string">"f829bbd875a74dae32a2"</span>}[chunkId] + <span class="hljs-string">".js"</span>;</code></pre>
<p>3、我们使用自己计算 hash 重命名产出文件有可能在使用异步加载时造成坑，因为webpack保留chunk map是为了异步加载能映射到正确的文件，但我们把名字给改了。衰。。。。。。。。</p>
<h4>2016年07月21日11:44:08 更新：</h4>
<p>看了下这个 <a href="https://github.com/webpack/webpack/issues/1315" rel="nofollow noreferrer" target="_blank">issue</a>，这个问题已经算是完美解决了：</p>
<p>1、 针对数字索引module id，解决方法有:</p>
<ul>
<li>使用<a href="http://webpack.github.io/docs/configuration.html#recordspath-recordsinputpath-recordsoutputpath" rel="nofollow noreferrer" target="_blank">recordsPath option</a>记录每次编译的结果，也就是知道哪些 ID 被使用了</li>
<li>不再使用数字索引做 module id，而使用 hash name，这也是社区上都赞成并希望的支持的方式，经过测试这种方式并不会对文件的大小造成大的影响。而且webpack已经完成了一个<a href="https://github.com/webpack/webpack/blob/master/lib/HashedModuleIdsPlugin.js" rel="nofollow noreferrer" target="_blank">插件</a>来支持，会在2.0正式发布</li>
</ul>
<p>2、针对 chunk map 那段代码，抽取出来就好了，插件 <a href="https://github.com/diurnalist/chunk-manifest-webpack-plugin" rel="nofollow noreferrer" target="_blank">https://github.com/diurnalist...</a></p>
<ul>
<li><a href="https://github.com/webpack/webpack/issues/1150" rel="nofollow noreferrer" target="_blank">github issue 对这个问题的讨论</a></li>
<li><a href="https://segmentfault.com/a/1190000005969643">使用webpack的dll功能解决这个问题</a></li>
</ul>
<hr>
<blockquote><p><strong>原文地址：<a href="https://52dachu.com/post/201606271753" rel="nofollow noreferrer" target="_blank">https://52dachu.com/post/201606271753</a></strong></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 webpack + react + redux + es6 开发组件化前端项目

## 原文链接
[https://segmentfault.com/a/1190000005969488](https://segmentfault.com/a/1190000005969488)


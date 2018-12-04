---
title: 'Webpack4 不深不浅的实践教程' 
date: 2018-12-05 2:30:09
hidden: true
slug: bjdcef3nxmt
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bV8RD2?w=700&amp;h=358" src="https://static.alili.tech/img/bV8RD2?w=700&amp;h=358" alt="Webpack Legato" title="Webpack Legato"></span></p>
<blockquote>本文偏入门&amp;实践，从零开始配置 Webpack； 实际项目开发，零配置是不存在的。</blockquote>
<h2>🚀 安装&amp;快速开始</h2>
<p>快速初始化配置文件 <code>package.json</code></p>
<pre><code>// npm i yarn -g
yarn init -y

// yarn init --yes
// yarn init --yes=true // 即全部选项默认为 yes </code></pre>
<p>接下来将 <code>webpack</code> 添加到 <code>package.json</code> =&gt; <code>devDependencies</code></p>
<pre><code>yarn add webpack -D</code></pre>
<p>安装成功后，创建目录 <code>src/index.js</code> 并添加如下内容 (默认入口为 <code>src</code>)</p>
<pre><code>document.write("Hello webpack4!");</code></pre>
<p>命令行输入：</p>
<pre><code>webpack --mode=development</code></pre>
<p>成功后显示，打开 <code>dist</code> 文件夹会看到 <code>main.js</code> (默认输出到 <code>dist</code>)</p>
<pre><code>Hash: 771a2645c2d430fa3bb4
Version: webpack 4.5.0
Time: 128ms
Built at: 2020-4-10 03:14:23
  Asset      Size  Chunks             Chunk Names
main.js  2.81 KiB    main  [emitted]  main
Entrypoint main = main.js
[./index.js] 34 bytes {main} [built]</code></pre>
<blockquote>
<code>--mode</code> 模式 (必选，不然会有 <code>WARNING</code>)，是 <code>webpack4</code> 新增的参数选项，默认是 <code>production</code>
</blockquote>
<ul>
<li>
<p><code>--mode production</code> 生产环境</p>
<ul>
<li>提供 <code>uglifyjs-webpack-plugin</code> 代码压缩</li>
<li>不需要定义 <code>new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") })</code> 默认 <code>production</code>
</li>
<li>默认开启 NoEmitOnErrorsPlugin -&gt; <code>optimization.noEmitOnErrors</code>, 编译出错时跳过输出，以确保输出资源不包含错误</li>
<li>默认开启 ModuleConcatenationPlugin -&gt; <code>optimization.concatenateModules</code>, webpack3 添加的作用域提升(Scope Hoisting)</li>
</ul>
</li>
<li>
<p><code>--mode development</code> 开发环境</p>
<ul>
<li>使用 eval 构建 module, 提升增量构建速度</li>
<li>不需要定义 <code>new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") })</code> 默认 <code>development</code>
</li>
<li>默认开启 NamedModulesPlugin -&gt; <code>optimization.namedModules</code> 使用模块热替换(HMR)时会显示模块的相对路径</li>
</ul>
</li>
</ul>
<p>接下来创建 <code>dist/index.html</code> 并引入 <code>main.js</code>, 浏览器中打开看内容。</p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;webpack-simple&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;script type="text/javascript" src="./main.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
<p>再创建一个文件 <code>src/content.js</code>, 在 <code>src/index.js</code> 中引入该模块</p>
<pre><code>// content.js
module.exports = 'Looooooooooooooong content!';</code></pre>
<pre><code>// index.js
document.write(`Hello webpack4!${require('./content.js')}`);</code></pre>
<p>再次执行 <code>webpack --mode=development</code> 完了打开 <code>index.html</code></p>
<pre><code>// 内容
Hello webpack4!Looooooooooooooong content!</code></pre>
<p><a href="https://github.com/wSLecHayfIeNdock/webpack4-article-demo/tree/master/simple" rel="nofollow noreferrer">Demo</a></p>
<h2>🍌 快速出土 <code>webpack.config.js</code>
</h2>
<p>安装 <code>webpack-cli</code> 来初始化配置</p>
<pre><code>yarn add webpack-cli -D</code></pre>
<pre><code>webpack-cli init

1. Will your application have multiple bundles? No // 单入口 string, 多页面 object
2. Which module will be the first to enter the application? [example: './src/index'] ./src/index // 程序入口
3. What is the location of "app"? [example: "./src/app"] './src/index' // 程序主文件
4. Which folder will your generated bundles be in? [default: dist]: // 输出目录，默认 dist
5. Are you going to use this in production? No // (Yes 第9步默认'config', No 则为 'prod')
6. Will you be using ES2015? Yes // 会添加 ES6 =&gt; ES5 的配置
7. Will you use one of the below CSS solutions? CSS // 选一种样式语言，会生成对应的 loader 配置
8. If you want to bundle your CSS files, what will you name the bundle? (press enter to skip) // 回车跳过
9. Name your 'webpack.[name].js?' [default: 'config']: // webpack.config.js

Congratulations! Your new webpack configuration file has been created!</code></pre>
<p>配置生成OK，如下</p>
<pre><code>// webpack.config.js

const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader' }
        ]
      }
    ]
  },

  plugins: [new UglifyJSPlugin()]
  // 这款插件用于压缩 JS 代码，减少资源体积大小
};
</code></pre>
<p>再度执行编译一切OK, 打开 <code>index.html</code> 查看内容</p>
<pre><code>webpack --mode=development

Hash: c30d4f489db4d568ee0b
Version: webpack 4.5.0
Time: 1308ms
Built at: 2020-4-11 04:14:23
Asset      Size  Chunks             Chunk Names
app.38de904fed135db4bf0a.js  1.17 KiB     app  [emitted]  app
Entrypoint app = app.38de904fed135db4bf0a.js
[./src/content.js] 62 bytes {app} [built]
[./src/index.js] 80 bytes {app} [built]</code></pre>
<p><a href="https://github.com/wSLecHayfIeNdock/webpack4-article-demo/tree/master/webpack-cli" rel="nofollow noreferrer">Demo</a></p>
<p><strong>接下来就是在这份配置上，做一些实践。</strong></p>
<h2>💄 使用 <code>html-webpack-plugin</code> 创建 html 文件</h2>
<ul>
<li>该插件简化了创建 HTML 文件的创建，服务于 webpack bundle。</li>
<li>解决的问题：每次编译完成后不用再去手动修改 <code>index.html</code>, 它会与 JS 生成在同一目录 <code>dist</code> 并引入 <code>app.38de904fed135db4bf0a.js</code>。</li>
</ul>
<pre><code>yarn add html-webpack-plugin -D</code></pre>
<p>安装完成后，在 <code>webpack.config.js</code> 下配置 <a href="https://github.com/jantimon/html-webpack-plugin#options" rel="nofollow noreferrer">更多可选的配置项</a></p>
<pre><code>// webpack.config.js
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

plugins: [
  new UglifyJSPlugin(),
+ new HtmlWebpackPlugin({
    title: 'webpack-cli'
  }),
]</code></pre>
<p>重新执行 <code>webpack --mode=development</code>, <code>dist</code> 目录就会多个 <code>index.html</code> 并引入了 <code>main.bundle.js</code>.</p>
<h2>⚛️ Webpack4 配置 React 开发环境</h2>
<p><em>上面配置中的 <code>module.rules</code> <a href="https://babeljs.io/repl/" rel="nofollow noreferrer">babel-loader</a> 的应用</em></p>
<blockquote>
<code>babel-loader</code> 将 ES6* 代码转化为 ES5 代码<p>Babel 默认只转换新的 JavaScript 句法 (<code>syntax</code>), 而不转换新的 API, 比如 <code>Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise</code> 等全局对象，以及一些定义在全局对象上的方法（比如 <code>Object.assign</code>）都不会转码。</p>
<p>举例来说，ES6 在 <code>Array</code> 对象上新增了 <code>Array.from</code> 方法。<code>Babel</code> 就不会转码这个方法。如果想让这个方法运行，必须使用 <code>babel-polyfill</code>,为当前环境提供一个垫片。—— 摘自 <a href="http://www.ruanyifeng.com/blog/2016/01/babel.html" rel="nofollow noreferrer">阮一峰 Babel 入门教程</a></p>
</blockquote>
<pre><code>yarn add react react-dom babel-preset-react</code></pre>
<blockquote>
<code>babel-preset-react</code> 用于解析 <code>react</code> 的语法；<p><code>babel-preset-env</code> 初始化配置时已经安装。它的前身是 <code>babel-preset-es2015/es2016/es2017</code> 以后要用新特性这个包就可以搞定一切。</p>
</blockquote>
<p>安装完成，修改 <code>src/index.js</code> 的内容为</p>
<pre><code>import React from 'react';
import { render } from 'react-dom';

render(&lt;h1&gt;Hello world!&lt;/h1&gt;, document.querySelector('#root'));</code></pre>
<p>把 <code>webpack.config.js module.rules</code> <code>babel-loader</code> 配置 <code>presets</code> 删掉。<br>在项目根目录新建 <code>.babelrc</code> 文件，内容如下</p>
<pre><code>// .babelrc
{
    "presets": [
        "env",
        "react"
    ]
}</code></pre>
<pre><code>// webpack.config.js
plugins: [
  new HtmlWebpackPlugin({
+   template: './index.html' // 添加模版文件
  }),
]</code></pre>
<pre><code>// index.html
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Webpack4-react16&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id="root" /&gt;
&lt;/html&gt;</code></pre>
<p>再次执行 <code>webpack --mode=development</code>, ok!</p>
<p><a href="https://github.com/wSLecHayfIeNdock/webpack4-article-demo/tree/master/webpack4-react16" rel="nofollow noreferrer">Demo</a></p>
<h2>🔄 实时刷新页面 <a href="https://webpack.js.org/configuration/dev-server/" rel="nofollow noreferrer">webpack-dev-server</a>
</h2>
<pre><code>yarn add webpack-dev-server -D</code></pre>
<p>打开 <code>package.json</code> 添加构建脚本</p>
<ul>
<li>
<code>--open</code> 自动打开浏览器并定向至 <code>http://localhost:8080/</code>
</li>
<li><a href="https://webpack.js.org/configuration/dev-server/" rel="nofollow noreferrer">👀 更多配置项</a></li>
</ul>
<pre><code>"scripts": {
    "dev": "webpack-dev-server --mode=development --open --hot"
    "//": "webpack-dev-server --mode=development --host 0.0.0.0"
    "//": "使用本机 IP 访问项目 [Your IP]:8080 =&gt; 192.168.0.111:8080"
},</code></pre>
<p>执行 <code>yarn dev</code>, 自动刷新完成。</p>
<h2>🔁 模块热替换 <a href="https://webpack.js.org/concepts/hot-module-replacement/" rel="nofollow noreferrer">Hot Module Replacement</a>
</h2>
<blockquote>即在不重载页面的情况下，实时替换更新修改的模块。提高开发效率。<br>本文使用 React, 所以用 <a href="https://github.com/gaearon/react-hot-loader" rel="nofollow noreferrer">react-hot-loader</a>
</blockquote>
<p><a href="https://zhuanlan.zhihu.com/p/30669007" rel="nofollow noreferrer">Webpack HMR 原理解析</a></p>
<pre><code>yarn add react-hot-loader -D</code></pre>
<p>项目根目录下新建文件 <code>.babelrc</code>, 添加内容：</p>
<pre><code>{
+  "plugins": ["react-hot-loader/babel"]
}</code></pre>
<p>在 <code>src</code> 目录下添加文件 <code>App.js</code></p>
<pre><code>// src/App.js
import React from 'react';
import { hot } from 'react-hot-loader';

const App = () =&gt; &lt;div&gt;Hello World!&lt;/div&gt;;

export default hot(module)(App)</code></pre>
<p>应用入口引入 <code>App.js</code></p>
<pre><code>// src/index.js
import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(&lt;App /&gt;, document.querySelector('#root'));</code></pre>
<p>重新执行 <code>yarn dev</code>, 修改下 <code>App.js</code> 的代码，注意看浏览器与 <code>console</code>.</p>
<pre><code>[HMR]  - ./src/App.js
log.js:24 [HMR] App is up to date.</code></pre>
<p><em>如果 <code>hot(module)(App)</code> 与 <code>render</code> 一个文件则会收到警告</em></p>
<h2>🌀 Webpack4 加载 CSS</h2>
<blockquote>在 4.x 版本之前，用的是 <code>extract-text-webpack-plugin</code>，不过 webpack@4.3.0 不支持使用。<p><a href="https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/763" rel="nofollow noreferrer">作者推荐使用</a> <a href="https://github.com/webpack-contrib/mini-css-extract-plugin" rel="nofollow noreferrer">mini-css-extract-plugin</a></p>
</blockquote>
<pre><code>yarn add mini-css-extract-plugin -D</code></pre>
<pre><code>// module.rules
{
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        
      }
    }
  ]
}

plugins: [
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
    chunkFilename: "[id].[contenthash].css"
  })
],</code></pre>
<h2>🔢 按需加载 React 组件</h2>
<p><a href="https://zhuanlan.zhihu.com/p/25874892" rel="nofollow noreferrer">React Loadable 简介</a></p>
<pre><code>yarn add react-loadable
yarn add babel-preset-stage-2 -D // for 动态 import() 语法</code></pre>
<pre><code>import Loadable from 'react-loadable';

const Loading = () =&gt; 'Loading...';
const Home = Loadable({ loader: () =&gt; import('./Home'), loading: Loading });</code></pre>
<p>效果如图</p>
<p><span class="img-wrap"><img data-src="/img/bV8RwM?w=321&amp;h=471" src="https://static.alili.tech/img/bV8RwM?w=321&amp;h=471" alt="按需加载" title="按需加载"></span></p>
<p>按需加载OK，不过发现个问题，这个 <code>Header</code> 组件被多处调用，样式&amp;JS都存在多次加载。</p>
<p><span class="img-wrap"><img data-src="/img/bV8Rw3?w=399&amp;h=156" src="https://static.alili.tech/img/bV8Rw3?w=399&amp;h=156" alt="样式JS重复加载" title="样式JS重复加载"></span></p>
<p>接下来要做的就是把共用的代码提取出来。</p>
<h2>🚾 Webpack4 提取公共 CSS&amp;JS</h2>
<p><a href="https://webpack.js.org/plugins/split-chunks-plugin/#optimization-splitchunks" rel="nofollow noreferrer">optimization.splitChunks 文档</a></p>
<p>配置如下</p>
<pre><code>// webpack.config.js
optimization: {
  splitChunks: {
    cacheGroups: {
      commons: {
        name: 'commons',
        priority: 10,
        chunks: 'initial'
      },
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        minChunks: 2,
        enforce: true
      }
    }
  }
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV8Rxh?w=298&amp;h=508" src="https://static.alili.tech/img/bV8Rxh?w=298&amp;h=508" alt="提取共同CSS" title="提取共同CSS"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV8Rxq?w=448&amp;h=158" src="https://static.alili.tech/img/bV8Rxq?w=448&amp;h=158" alt="css header 被单独提取到 styles.css" title="css header 被单独提取到 styles.css"></span></p>
<h2>🥝 分离第三方库</h2>
<pre><code>entry: {
  app: './src/index.js',
+ ramda: ['ramda'],
}

new HtmlWebpackPlugin({
  template: './index.html',
+ chunks: ['app', 'commons', 'ramda']
})

2.e9dc7e430f6a31c868b2.css   45 bytes        2  [emitted]
                   app.bundle.js    9.6 KiB      app  [emitted]  app
      0.decbf5b19337a4ce4aac.css   61 bytes        0  [emitted]
                     0.bundle.js   4.01 KiB        0  [emitted]
+                ramda.bundle.js   7.99 KiB    ramda  [emitted]  ramda
                      index.html  393 bytes           [emitted]</code></pre>
<h2>🎨 <a href="https://ant.design/docs/react/customize-theme-cn" rel="nofollow noreferrer">Antd 定制主题色</a>
</h2>
<pre><code>yarn add antd
yarn add less less-loader babel-plugin-import -D</code></pre>
<pre><code>// .babelrc 添加
{
  "plugins": [
    [
      "import",
      {
        "style": true,
        "libraryName": "antd"
      }
    ]
  ]
}</code></pre>
<pre><code>// webpack.config.js module.rules 添加

{
  test: /\.less$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'less-loader',
      options: {
        sourceMap: true,
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#531dab'
        }
      }
    }
  ]
}</code></pre>
<h2>🔨 autoprefixer 处理浏览器前缀</h2>
<pre><code>display: -webkit-box;
display: -ms-flexbox;
display: flex;</code></pre>
<pre><code>yarn add autoprefixer postcss-loader -D</code></pre>
<p>项目根目录新建 <code>postcss.config.js</code></p>
<pre><code>// postcss.config.js

module.exports = {
  plugins: [
    require('autoprefixer')({
      'browsers': ['&gt; 1%', 'last 2 versions']
    })
  ]
};</code></pre>
<pre><code>// webpack.config.js module.rules
{
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
+   'postcss-loader'
  ]
}</code></pre>
<p><a href="https://github.com/wSLecHayfIeNdock/webpack4-article-demo/tree/master/webpack4-react16-react-router4" rel="nofollow noreferrer">Demo: webpack4-react16-react-router4</a></p>
<h2>🚑 一些报错 &amp; 解决办法</h2>
<h3><code>Uncaught Error: [HMR] Hot Module Replacement is disabled.</code></h3>
<blockquote>运行 <code>webpack-dev-server --mode=development</code> 报错。</blockquote>
<p>把 <code>webpack.config.js devSever</code> <code>hot: true, inline: true</code> 删掉，<br>添加 <code>webpack-dev-server --mode=development --hot --inline</code></p>
<p>或者</p>
<pre><code>plugins: [
+    new webpack.HotModuleReplacementPlugin(),
]</code></pre>
<h3><code>ERROR in 0.js from UglifyJs TypeError: Cannot read property 'sections' of null</code></h3>
<p><a href="https://github.com/webpack/webpack/issues/1385" rel="nofollow noreferrer">查看 webpack/issues/1385</a></p>
<pre><code>TypeError: Cannot read property 'sections' of null 👉 Remove `new UglifyJsPlugin` from plugins part
schema id ignored LoaderOptionsPlugin              👉 Remove `new LoaderOptionsPlugin` plugin from config
schema id ignored SourceMapDevToolPlugin           👉 Remove `devtool` config</code></pre>
<h3><code>ERROR in chunk app [entry] [name].[chunkhash].js</code></h3>
<p><a href="https://github.com/webpack/webpack/issues/2393" rel="nofollow noreferrer">查看 webpack/issues/2393</a></p>
<h2>📚 参考资料</h2>
<p><a href="https://hackernoon.com/webpack-4-tutorial-all-you-need-to-know-from-0-conf-to-production-mode-d32759d0dc2d" rel="nofollow noreferrer">Webpack 4 tutorial: All You Need to Know, from 0 Conf to Production Mode</a><br><a href="https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1?source=search_post---------9" rel="nofollow noreferrer">A tale of Webpack 4 and how to finally configure it in the right way</a><br><a href="https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a" rel="nofollow noreferrer">webpack 4: mode and optimization</a><br><a href="https://webpack.js.org/plugins/split-chunks-plugin/" rel="nofollow noreferrer">webpack split chunks</a><br><a href="https://github.com/webpack/webpack-cli/blob/master/INIT.md" rel="nofollow noreferrer">webpack init</a><br><a href="https://zhuanlan.zhihu.com/p/30669007" rel="nofollow noreferrer">Webpack HMR 原理解析</a><br><a href="https://zhuanlan.zhihu.com/p/34446105" rel="nofollow noreferrer">精读《webpack4.0 升级指南》</a></p>
<blockquote>挤时间敲了几天，教程终于告一段落！后续还会继续完善其他的配置(HappyPack, DllReferencePlugin...)实践；<br>本文如有错误，欢迎指正，非常感谢。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack4 不深不浅的实践教程

## 原文链接
[https://segmentfault.com/a/1190000014466696](https://segmentfault.com/a/1190000014466696)


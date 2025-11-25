---
title: '使用React做同构应用' 
date: 2019-01-15 2:30:12
hidden: true
slug: 1euyieiqp8d
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">使用React做同构应用</h1>
<p>React是用于开发数据不断变化的大型应用程序的前端view框架，结合其他轮子例如<code>redux</code>和<code>react-router</code>就可以开发大型的前端应用。</p>
<p>React开发之初就有一个特别的优势，就是前后端同构。</p>
<p>什么是前后端同构呢？就是前后端都可以使用同一套代码生成页面，页面既可以由前端动态生成，也可以由后端服务器直接渲染出来</p>
<p>最简单的同构应用其实并不复杂，复杂的是结合webpack,router之后的各种复杂状态不容易解决</p>
<h2 id="articleHeader1">一个极简单的小例子</h2>
<p>html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
   <html>
   <head lang=&quot;en&quot;>
     <meta charset=&quot;UTF-8&quot;>
     <title>React同构</title>
     <link href=&quot;styles/main.css&quot; rel=&quot;stylesheet&quot; />
   </head>
   <body>
     <div id=&quot;app&quot;>
     <%- reactOutput %>
     </div>
     <script src=&quot;bundle.js&quot;></script>
   </body>
   </html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">head</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>React同构<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"styles/main.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> /&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">%-</span></span></span><span class="ruby"> reactOutput </span><span class="xml"><span class="hljs-tag">%&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   import path from 'path';
   import Express from 'express';
   import AppRoot from '../app/components/AppRoot'
   import React from 'react';
   import {renderToString} from 'react-dom/server'

   var app = Express();
   var server;
   const PATH_STYLES = path.resolve(__dirname, '../client/styles');
   const PATH_DIST = path.resolve(__dirname, '../../dist');
   app.use('/styles', Express.static(PATH_STYLES));
   app.use(Express.static(PATH_DIST));
   app.get('/', (req, res) => {
     var reactAppContent = renderToString(<AppRoot state="{{"} }/>);
     console.log(reactAppContent);
     res.render(path.resolve(__dirname, '../client/index.ejs'),
   {reactOutput: reactAppContent});
   });
   server = app.listen(process.env.PORT || 3000, () => {
     var port = server.address().port;
     console.log('Server is listening at %s', port);
   });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>   <span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>;
   <span class="hljs-keyword">import</span> Express <span class="hljs-keyword">from</span> <span class="hljs-string">'express'</span>;
   <span class="hljs-keyword">import</span> AppRoot <span class="hljs-keyword">from</span> <span class="hljs-string">'../app/components/AppRoot'</span>
   <span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
   <span class="hljs-keyword">import</span> {renderToString} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom/server'</span>

   <span class="hljs-keyword">var</span> app = Express();
   <span class="hljs-keyword">var</span> server;
   <span class="hljs-keyword">const</span> PATH_STYLES = path.resolve(__dirname, <span class="hljs-string">'../client/styles'</span>);
   <span class="hljs-keyword">const</span> PATH_DIST = path.resolve(__dirname, <span class="hljs-string">'../../dist'</span>);
   app.use(<span class="hljs-string">'/styles'</span>, Express.static(PATH_STYLES));
   app.use(Express.static(PATH_DIST));
   app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
     <span class="hljs-keyword">var</span> reactAppContent = renderToString(&lt;AppRoot state="{{"} }/&gt;);
     <span class="hljs-built_in">console</span>.log(reactAppContent);
     res.render(path.resolve(__dirname, <span class="hljs-string">'../client/index.ejs'</span>),
   {reactOutput: reactAppContent});
   });
   server = app.listen(process.env.PORT || <span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
     <span class="hljs-keyword">var</span> port = server.address().port;
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Server is listening at %s'</span>, port);
   });
</code></pre>
<p>你看服务端渲染的原理就是，服务端调用react的<code>renderToString</code>方法，在服务器端生成文本，插入到html文本之中，输出到浏览器客户端。然后客户端检测到这些已经生成的dom,就不会重新渲染，直接使用现有的html结构。</p>
<p>然而现实并不是这么单纯，使用react做前端开发的应该不会不使用<code>webpack</code>,<code>React-router</code>,<code>redux</code>等等一些提高效率，简化工作的一些辅助类库或者框架，这样的应用是不是就不太好做同构应用了？至少不会向上文这么简单吧？</p>
<p>做当然是可以做的，但复杂度确实也大了不少</p>
<h2 id="articleHeader2">结合框架的例子</h2>
<h3 id="articleHeader3">webpack-isomorphic-tools</h3>
<p>这个webpack插件的主要作用有两点</p>
<ol>
<li><p>获取webpack打包之后的入口文件路径，包括js,css</p></li>
<li><p>把一些特殊的文件例如大图片、编译之后css的映射保存下来，以便在服务器端使用</p></li>
</ol>
<p>webpack配置文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import path from &quot;path&quot;;
import webpack from &quot;webpack&quot;;
import WebpackIsomorphicToolsPlugin from &quot;webpack-isomorphic-tools/plugin&quot;;
import ExtractTextPlugin from &quot;extract-text-webpack-plugin&quot;;
import isomorphicToolsConfig from &quot;../isomorphic.tools.config&quot;;
import {client} from &quot;../../config&quot;;

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicToolsConfig)

const cssLoader = [
  'css?modules',
  'sourceMap',
  'importLoaders=1',
  'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&amp;')

const cssLoader2 = [
  'css?modules',
  'sourceMap',
  'importLoaders=1',
  'localIdentName=[local]'
].join('&amp;')


const config = {
  // 项目根目录
  context: path.join(__dirname, '../../'),
  devtool: 'cheap-module-eval-source-map',
  entry: [
    `webpack-hot-middleware/client?reload=true&amp;path=http://${client.host}:${client.port}/__webpack_hmr`,
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, '../../build'),
    filename: 'index.js',
    publicPath: '/build/',
    chunkFilename: '[name]-[chunkhash:8].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: [/node_modules/]
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('less'),
        loader: ExtractTextPlugin.extract('style', `${cssLoader}!less`)
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('css'),
        exclude: [/node_modules/],
        loader: ExtractTextPlugin.extract('style', `${cssLoader}`)
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('css'),
        include: [/node_modules/],
        loader: ExtractTextPlugin.extract('style', `${cssLoader2}`)
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url?limit=10000'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }),
    webpackIsomorphicToolsPlugin
  ]
}

export default config
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">"path"</span>;
<span class="hljs-keyword">import</span> webpack <span class="hljs-keyword">from</span> <span class="hljs-string">"webpack"</span>;
<span class="hljs-keyword">import</span> WebpackIsomorphicToolsPlugin <span class="hljs-keyword">from</span> <span class="hljs-string">"webpack-isomorphic-tools/plugin"</span>;
<span class="hljs-keyword">import</span> ExtractTextPlugin <span class="hljs-keyword">from</span> <span class="hljs-string">"extract-text-webpack-plugin"</span>;
<span class="hljs-keyword">import</span> isomorphicToolsConfig <span class="hljs-keyword">from</span> <span class="hljs-string">"../isomorphic.tools.config"</span>;
<span class="hljs-keyword">import</span> {client} <span class="hljs-keyword">from</span> <span class="hljs-string">"../../config"</span>;

<span class="hljs-keyword">const</span> webpackIsomorphicToolsPlugin = <span class="hljs-keyword">new</span> WebpackIsomorphicToolsPlugin(isomorphicToolsConfig)

<span class="hljs-keyword">const</span> cssLoader = [
  <span class="hljs-string">'css?modules'</span>,
  <span class="hljs-string">'sourceMap'</span>,
  <span class="hljs-string">'importLoaders=1'</span>,
  <span class="hljs-string">'localIdentName=[name]__[local]___[hash:base64:5]'</span>
].join(<span class="hljs-string">'&amp;'</span>)

<span class="hljs-keyword">const</span> cssLoader2 = [
  <span class="hljs-string">'css?modules'</span>,
  <span class="hljs-string">'sourceMap'</span>,
  <span class="hljs-string">'importLoaders=1'</span>,
  <span class="hljs-string">'localIdentName=[local]'</span>
].join(<span class="hljs-string">'&amp;'</span>)


<span class="hljs-keyword">const</span> config = {
  <span class="hljs-comment">// 项目根目录</span>
  context: path.join(__dirname, <span class="hljs-string">'../../'</span>),
  devtool: <span class="hljs-string">'cheap-module-eval-source-map'</span>,
  entry: [
    <span class="hljs-string">`webpack-hot-middleware/client?reload=true&amp;path=http://<span class="hljs-subst">${client.host}</span>:<span class="hljs-subst">${client.port}</span>/__webpack_hmr`</span>,
    <span class="hljs-string">'./client/index.js'</span>
  ],
  output: {
    path: path.join(__dirname, <span class="hljs-string">'../../build'</span>),
    filename: <span class="hljs-string">'index.js'</span>,
    publicPath: <span class="hljs-string">'/build/'</span>,
    chunkFilename: <span class="hljs-string">'[name]-[chunkhash:8].js'</span>
  },
  resolve: {
    extensions: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.jsx'</span>, <span class="hljs-string">'.json'</span>]
  },
  <span class="hljs-keyword">module</span>: {
    preLoaders: [
      {
        test: <span class="hljs-regexp">/\.jsx?$/</span>,
        exclude: <span class="hljs-regexp">/node_modules/</span>,
        loader: <span class="hljs-string">'eslint-loader'</span>
      }
    ],
    loaders: [
      {
        test: <span class="hljs-regexp">/\.jsx?$/</span>,
        loader: <span class="hljs-string">'babel'</span>,
        exclude: [<span class="hljs-regexp">/node_modules/</span>]
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression(<span class="hljs-string">'less'</span>),
        loader: ExtractTextPlugin.extract(<span class="hljs-string">'style'</span>, <span class="hljs-string">`<span class="hljs-subst">${cssLoader}</span>!less`</span>)
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression(<span class="hljs-string">'css'</span>),
        exclude: [<span class="hljs-regexp">/node_modules/</span>],
        loader: ExtractTextPlugin.extract(<span class="hljs-string">'style'</span>, <span class="hljs-string">`<span class="hljs-subst">${cssLoader}</span>`</span>)
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression(<span class="hljs-string">'css'</span>),
        include: [<span class="hljs-regexp">/node_modules/</span>],
        loader: ExtractTextPlugin.extract(<span class="hljs-string">'style'</span>, <span class="hljs-string">`<span class="hljs-subst">${cssLoader2}</span>`</span>)
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression(<span class="hljs-string">'images'</span>),
        loader: <span class="hljs-string">'url?limit=10000'</span>
      }
    ]
  },
  plugins: [
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'[name].css'</span>, {
      allChunks: <span class="hljs-literal">true</span>
    }),
    webpackIsomorphicToolsPlugin
  ]
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> config
</code></pre>
<p>webpack-isomorphic-tools 配置文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'

export default {
  assets: {
    images: {
      extensions: ['png', 'jpg', 'jpeg', 'gif', 'ico', 'svg']
    },
    css: {
      extensions: ['css'],
      filter(module, regex, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log)
        }
        return regex.test(module.name)
      },
      path(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        }
        return module.name
      },
      parser(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        }
        return module.source
      }
    },
    less: {
      extensions: ['less'],
      filter: function(module, regex, options, log)
      {
        if (options.development)
        {
          return webpack_isomorphic_tools_plugin.style_loader_filter(module, regex, options, log)
        }

        return regex.test(module.name)
      },

      path: function(module, options, log)
      {
        if (options.development)
        {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        }

        return module.name
      },

      parser: function(module, options, log)
      {
        if (options.development)
        {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        }

        return module.source
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>import WebpackIsomorphicToolsPlugin from <span class="hljs-string">'webpack-isomorphic-tools/plugin'</span>

export default {
  <span class="hljs-symbol">assets:</span> {
    <span class="hljs-symbol">images:</span> {
      <span class="hljs-symbol">extensions:</span> [<span class="hljs-string">'png'</span>, <span class="hljs-string">'jpg'</span>, <span class="hljs-string">'jpeg'</span>, <span class="hljs-string">'gif'</span>, <span class="hljs-string">'ico'</span>, <span class="hljs-string">'svg'</span>]
    },
    <span class="hljs-symbol">css:</span> {
      <span class="hljs-symbol">extensions:</span> [<span class="hljs-string">'css'</span>],
      filter(<span class="hljs-class"><span class="hljs-keyword">module</span>, <span class="hljs-title">regex</span>, <span class="hljs-title">options</span>, <span class="hljs-title">log</span>) {</span>
        <span class="hljs-keyword">if</span> (options.development) {
          <span class="hljs-keyword">return</span> WebpackIsomorphicToolsPlugin.style_loader_filter(<span class="hljs-class"><span class="hljs-keyword">module</span>, <span class="hljs-title">regex</span>, <span class="hljs-title">options</span>, <span class="hljs-title">log</span>)</span>
        }
        <span class="hljs-keyword">return</span> regex.test(<span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">name</span>)</span>
      },
      path(<span class="hljs-class"><span class="hljs-keyword">module</span>, <span class="hljs-title">options</span>, <span class="hljs-title">log</span>) {</span>
        <span class="hljs-keyword">if</span> (options.development) {
          <span class="hljs-keyword">return</span> WebpackIsomorphicToolsPlugin.style_loader_path_extractor(<span class="hljs-class"><span class="hljs-keyword">module</span>, <span class="hljs-title">options</span>, <span class="hljs-title">log</span>);</span>
        }
        <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">name</span></span>
      },
      parser(<span class="hljs-class"><span class="hljs-keyword">module</span>, <span class="hljs-title">options</span>, <span class="hljs-title">log</span>) {</span>
        <span class="hljs-keyword">if</span> (options.development) {
          <span class="hljs-keyword">return</span> WebpackIsomorphicToolsPlugin.css_modules_loader_parser(<span class="hljs-class"><span class="hljs-keyword">module</span>, <span class="hljs-title">options</span>, <span class="hljs-title">log</span>);</span>
        }
        <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">source</span></span>
      }
    },
    <span class="hljs-symbol">less:</span> {
      <span class="hljs-symbol">extensions:</span> [<span class="hljs-string">'less'</span>],
      <span class="hljs-symbol">filter:</span> function(<span class="hljs-class"><span class="hljs-keyword">module</span>, <span class="hljs-title">regex</span>, <span class="hljs-title">options</span>, <span class="hljs-title">log</span>)</span>
      {
        <span class="hljs-keyword">if</span> (options.development)
        {
          <span class="hljs-keyword">return</span> webpack_isomorphic_tools_plugin.style_loader_filter(<span class="hljs-class"><span class="hljs-keyword">module</span>, <span class="hljs-title">regex</span>, <span class="hljs-title">options</span>, <span class="hljs-title">log</span>)</span>
        }

        <span class="hljs-keyword">return</span> regex.test(<span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">name</span>)</span>
      },

      <span class="hljs-symbol">path:</span> function(<span class="hljs-class"><span class="hljs-keyword">module</span>, <span class="hljs-title">options</span>, <span class="hljs-title">log</span>)</span>
      {
        <span class="hljs-keyword">if</span> (options.development)
        {
          <span class="hljs-keyword">return</span> WebpackIsomorphicToolsPlugin.style_loader_path_extractor(<span class="hljs-class"><span class="hljs-keyword">module</span>, <span class="hljs-title">options</span>, <span class="hljs-title">log</span>);</span>
        }

        <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">name</span></span>
      },

      <span class="hljs-symbol">parser:</span> function(<span class="hljs-class"><span class="hljs-keyword">module</span>, <span class="hljs-title">options</span>, <span class="hljs-title">log</span>)</span>
      {
        <span class="hljs-keyword">if</span> (options.development)
        {
          <span class="hljs-keyword">return</span> WebpackIsomorphicToolsPlugin.css_modules_loader_parser(<span class="hljs-class"><span class="hljs-keyword">module</span>, <span class="hljs-title">options</span>, <span class="hljs-title">log</span>);</span>
        }

        <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">source</span></span>
      }
    }
  }
}</code></pre>
<p>这些文件配置好之后,当再运行webpack打包命令的时候就会生成一个叫做webpack-assets.json<br> 的文件，这个文件记录了刚才生成的如文件的路径以及css,img映射表</p>
<p>客户端的配置到这里就结束了，来看下服务端的配置</p>
<p>服务端的配置过程要复杂一些，因为需要使用到<code>WebpackIsomorphicToolsPlugin</code>生成的文件，<br> 我们直接使用它对应的服务端功能就可以了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import path from 'path'
import WebpackIsomorphicTools from 'webpack-isomorphic-tools'
import co from 'co'
import startDB from '../../server/model/'

import isomorphicToolsConfig from '../isomorphic.tools.config'

const startServer = require('./server')
var basePath = path.join(__dirname, '../../')

global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicToolsConfig)
  // .development(true)
  .server(basePath, () => {
    const startServer = require('./server')
    co(function *() {
      yield startDB
      yield startServer
    })
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>
<span class="hljs-keyword">import</span> WebpackIsomorphicTools <span class="hljs-keyword">from</span> <span class="hljs-string">'webpack-isomorphic-tools'</span>
<span class="hljs-keyword">import</span> co <span class="hljs-keyword">from</span> <span class="hljs-string">'co'</span>
<span class="hljs-keyword">import</span> startDB <span class="hljs-keyword">from</span> <span class="hljs-string">'../../server/model/'</span>

<span class="hljs-keyword">import</span> isomorphicToolsConfig <span class="hljs-keyword">from</span> <span class="hljs-string">'../isomorphic.tools.config'</span>

<span class="hljs-keyword">const</span> startServer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./server'</span>)
<span class="hljs-keyword">var</span> basePath = path.join(__dirname, <span class="hljs-string">'../../'</span>)

global.webpackIsomorphicTools = <span class="hljs-keyword">new</span> WebpackIsomorphicTools(isomorphicToolsConfig)
  <span class="hljs-comment">// .development(true)</span>
  .server(basePath, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> startServer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./server'</span>)
    co(<span class="hljs-function"><span class="hljs-keyword">function</span> *(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">yield</span> startDB
      <span class="hljs-keyword">yield</span> startServer
    })
  })</code></pre>
<p>一定要在<code>WebpackIsomorphicTools</code>初始化之后再启动服务器</p>
<p>文章开头我们知道react是可以运行在服务端的，其实不光是react,react-router,redux也都是可以运行在服务器端的<br>既然前端我们使用了react-router,也就是前端路由，那后端又怎么做处理呢</p>
<p>其实这些react-router在设计的时候已经想到了这些，设计了一个api: <code>match</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="match({routes, location}, (error, redirectLocation, renderProps) => {
    matchResult = {
      error,
      redirectLocation,
      renderProps
    }
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code>match({routes, location}, <span class="hljs-function"><span class="hljs-params">(<span class="hljs-built_in">error</span>, redirectLocation, renderProps)</span> =&gt;</span> {
    matchResult = {
      <span class="hljs-built_in">error</span>,
      redirectLocation,
      renderProps
    }
  })</code></pre>
<p>match方法在服务器端解析了当前请求路由，获取了当前路由的对应的请求参数和对应的组件</p>
<p>知道了这些还不足以做服务端渲染啊，比如一些页面自己作为一个组件，是需要在客户端向服务<br>器发请求，获取数据做渲染的，那我们怎么把渲染好数据的页面输出出来呢？</p>
<p>那就是需要做一个约定，就是前端单独放置一个获取数据，渲染页面的方法，由后端可以调用，这样逻辑就可以保持一份，<br>保持好的维护性</p>
<p>但是怎么实现呢？实现的过程比较简单，想法比较绕</p>
<p>1.调用的接口的方式必须前端通用</p>
<p>2.渲染页面的方式必须前后端通用</p>
<p>先来第一个，大家都知道前端调用接口的方式通过ajax,那后端怎么使用ajax呢？有一个库封装了服务器端的<br><code>fetch</code>方法实现，可以用来做这个</p>
<p>由于ajax方法需要前后端通用，那就要求这个方法里面不能夹杂着客户端或者服务端特有的api<br>调用。</p>
<p>还有个很重要的问题，就是权限的问题，前端有时候是需要登录之后才可以调用的接口，后端直接调用<br>显然是没有cookie的，怎么办呢？解决办法就是在用户第一个请求进来之后保存cookie甚至是全部的http<br>头信息，然后把这些信息传进fetch方法里面去</p>
<p>通用组件方法必须写成类的静态成员，否则后端获取不到，名称也必须统一</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="static getInitData (params = {}, cookie, dispatch, query = {}) {
    return getList({
      ...params,
      ...query
    }, cookie)
      .then(data => dispatch({
        type: constants.article.GET_LIST_VIEW_SUCCESS,
        data: data
      }))
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>static getInitData (<span class="hljs-keyword">params</span> = {}, cookie, dispatch, query = {}) {
    <span class="hljs-keyword">return</span> getList({
      <span class="hljs-params">...</span><span class="hljs-keyword">params</span>,
      <span class="hljs-params">...</span>query
    }, cookie)
      .then(<span class="hljs-built_in">data</span> =&gt; dispatch({
        <span class="hljs-keyword">type</span>: constants.article.GET_LIST_VIEW_SUCCESS,
        <span class="hljs-built_in">data</span>: <span class="hljs-built_in">data</span>
      }))
  }</code></pre>
<p>再看第二个问题，前端渲染页面自然就是改变state或者传入props就可以更新视图，服务器端怎么办呢？<br>redux是可以解决这个问题的</p>
<p>因为服务器端不像前端，需要在初始化之后再去更新视图，服务器端只需要先把数据准备好，然后直接一遍生成<br>视图就可以了，所以上图的<code>dispatch</code>方法是由前后端都可以传入</p>
<p>渲染页面的后端方法就比较简单了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component, PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import {client} from '../../config'

export default class Html extends Component {

  get scripts () {
    const { javascript } = this.props.assets

    return Object.keys(javascript).map((script, i) =>
      <script src={`http://${client.host}:${client.port}` + javascript[script]} key={i} />
    )
  }

  get styles () {
    const { assets } = this.props
    const { styles, assets: _assets } = assets
    const stylesArray = Object.keys(styles)

    // styles (will be present only in production with webpack extract text plugin)
    if (stylesArray.length !== 0) {
      return stylesArray.map((style, i) =>
        <link href={`http://${client.host}:${client.port}` + assets.styles[style]} key={i} rel=&quot;stylesheet&quot; type=&quot;text/css&quot; />
      )
    }

    // (will be present only in development mode)
    // It's not mandatory but recommended to speed up loading of styles
    // (resolves the initial style flash (flicker) on page load in development mode)
    // const scssPaths = Object.keys(_assets).filter(asset => asset.includes('.css'))
    // return scssPaths.map((style, i) =>
    //   <style dangerouslySetInnerHTML="{{" __html: _assets[style]._style "}}" key={i} />
    // )
  }

  render () {
    const { component, store } = this.props

    return (
      <html>
      <head>
        <meta charSet=&quot;utf-8&quot; />
        <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot; />
        <meta name=&quot;apple-mobile-web-app-capable&quot; content=&quot;yes&quot; />
        <meta name=&quot;apple-mobile-web-app-status-bar-style&quot; content=&quot;black&quot; />
        <title>前端博客</title>
        <link rel=&quot;icon&quot; href=&quot;/favicon.ico&quot; />
        {this.styles}
      </head>

      <body>
      <div id=&quot;root&quot; dangerouslySetInnerHTML="{{" __html: renderToString(component) "}}" />
      <script dangerouslySetInnerHTML="{{" __html: `window.__INITIAL_STATE__=${JSON.stringify(store.getState())};` "}}" />
      {this.scripts}
      </body>
      </html>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">import React, </span><span class="hljs-template-variable">{ Component, PropTypes }</span><span class="xml"> from 'react'
import </span><span class="hljs-template-variable">{ renderToString }</span><span class="xml"> from 'react-dom/server'
import </span><span class="hljs-template-variable">{client}</span><span class="xml"> from '../../config'

export default class Html extends Component </span><span class="hljs-template-variable">{

  get scripts () {
    const { javascript }</span><span class="xml"> = this.props.assets

    return Object.keys(javascript).map((script, i) =&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=</span></span><span class="hljs-template-variable">{`http://${client.host}</span><span class="xml"><span class="hljs-tag"><span class="hljs-attr">:</span>$</span></span><span class="hljs-template-variable">{client.port}</span><span class="xml"><span class="hljs-tag">` + <span class="hljs-attr">javascript</span>[<span class="hljs-attr">script</span>]} <span class="hljs-attr">key</span>=</span></span><span class="hljs-template-variable">{i}</span><span class="xml"><span class="hljs-tag"> /&gt;</span><span class="actionscript">
    )
  }

  <span class="hljs-keyword">get</span> styles () </span></span><span class="hljs-template-variable">{
    const { assets }</span><span class="xml"><span class="actionscript"> = <span class="hljs-keyword">this</span>.props
    <span class="hljs-keyword">const</span> </span></span><span class="hljs-template-variable">{ styles, assets: _assets }</span><span class="xml"><span class="javascript"> = assets
    <span class="hljs-keyword">const</span> stylesArray = <span class="hljs-built_in">Object</span>.keys(styles)

    <span class="hljs-comment">// styles (will be present only in production with webpack extract text plugin)</span>
    <span class="hljs-keyword">if</span> (stylesArray.length !== <span class="hljs-number">0</span>) </span></span><span class="hljs-template-variable">{
      return stylesArray.map((style, i) =&gt;
        &lt;link href={`http://${client.host}</span><span class="xml"><span class="undefined">:$</span></span><span class="hljs-template-variable">{client.port}</span><span class="xml"><span class="undefined">` + assets.styles[style]} key=</span></span><span class="hljs-template-variable">{i}</span><span class="xml"><span class="actionscript"> rel=<span class="hljs-string">"stylesheet"</span> type=<span class="hljs-string">"text/css"</span> /&gt;
      )
    }

    <span class="hljs-comment">// (will be present only in development mode)</span>
    <span class="hljs-comment">// It's not mandatory but recommended to speed up loading of styles</span>
    <span class="hljs-comment">// (resolves the initial style flash (flicker) on page load in development mode)</span>
    <span class="hljs-comment">// const scssPaths = Object.keys(_assets).filter(asset =&gt; asset.includes('.css'))</span>
    <span class="hljs-comment">// return scssPaths.map((style, i) =&gt;</span>
    <span class="hljs-comment">//   &lt;style dangerouslySetInnerHTML=</span></span></span><span class="hljs-template-variable">"{{" __html: _assets[style]._style }</span><span class="xml"><span class="undefined">} key=</span></span><span class="hljs-template-variable">{i}</span><span class="xml"><span class="actionscript"> /&gt;
    <span class="hljs-comment">// )</span>
  }

  render () </span></span><span class="hljs-template-variable">{
    const { component, store }</span><span class="xml"><span class="handlebars"><span class="xml"> = this.props

    return (
      <span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charSet</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-capable"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"yes"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-status-bar-style"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"black"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>前端博客<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/favicon.ico"</span> /&gt;</span>
        </span></span></span><span class="hljs-template-variable">{this.styles}</span><span class="xml"><span class="handlebars"><span class="xml">
      <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span> <span class="hljs-attr">dangerouslySetInnerHTML</span>=</span></span></span></span><span class="hljs-template-variable">"{{" __html: renderToString(component) }</span><span class="xml"><span class="javascript">} /&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">dangerouslySetInnerHTML</span>=</span></span></span></span><span class="hljs-template-variable">"{{" __html: `window.__INITIAL_STATE__=${JSON.stringify(store.getState())}</span><span class="xml"><span class="undefined">;` "}}" /&gt;
      </span></span><span class="hljs-template-variable">{this.scripts}</span><span class="xml"><span class="handlebars"><span class="xml">
      <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
    )
  }
}</span></span></span></code></pre>
<p>ok了，页面刷新的时候，是后端直出的，点击跳转的时候是前端渲染的</p>
<p>做了一个相对来说比较完整的案例，使用了react+redux+koa+mongodb开发的，还做了个爬虫，爬取了一本小说</p>
<p><a href="https://github.com/frontoldman/blog" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/frontoldman/blog" rel="nofollow noreferrer" target="_blank">https://github.com/frontoldma...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用React做同构应用

## 原文链接
[https://segmentfault.com/a/1190000009235324](https://segmentfault.com/a/1190000009235324)


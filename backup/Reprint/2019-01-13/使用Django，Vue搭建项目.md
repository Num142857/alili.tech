---
title: '使用Django，Vue搭建项目' 
date: 2019-01-13 2:30:11
hidden: true
slug: g27yk0j3oh6
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">写在前面</h1>
<p>为了解决后端人员不足又招聘不到的问题，决定用前后端分离的方式写项目，于是尝试用<code>django-rest-framework</code>跟<code>Vue.js</code>搭建一个项目。</p>
<p>基础搭建项目的参考了一下教程<a href="http://www.tuicool.com/articles/nmEVVjn" rel="nofollow noreferrer" target="_blank">使用Django + Vue.js快速而优雅地构建前后端分离项目</a><br>整体来说教程写的还可以，但是实际搭完之后，其实还是有很多问题需要解决。</p>
<p>首先，看一下我搭建的前端跟项目的结构。</p>
<h2 id="articleHeader1">结构</h2>
<p><span class="img-wrap"><img data-src="/img/bVOwt8?w=3120&amp;h=4160" src="https://static.alili.tech/img/bVOwt8?w=3120&amp;h=4160" alt="前端结构图" title="前端结构图" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVOwub?w=3120&amp;h=4160" src="https://static.alili.tech/img/bVOwub?w=3120&amp;h=4160" alt="项目结构图" title="项目结构图" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">web pack.config.js</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry:{
    build:'./src/main.js',
    index:'./src/index.js',
    foot:'./src/foot.js',
    login:'./src/login.js',
    about_us:'./src/about_us.js',
    sideList:'./src/sideList.js',
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/dist/',
    filename: 'static/js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the &quot;scss&quot; and &quot;sass&quot; values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test:/\.css$/,
        loader:'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'static/img/[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '&quot;production&quot;'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var path = require(<span class="hljs-string">'path'</span>)
var webpack = require(<span class="hljs-string">'webpack'</span>)

module.exports = {
  entry:{
    build:<span class="hljs-string">'./src/main.js'</span>,
    <span class="hljs-built_in">index</span>:<span class="hljs-string">'./src/index.js'</span>,
    foo<span class="hljs-variable">t:</span><span class="hljs-string">'./src/foot.js'</span>,
    login:<span class="hljs-string">'./src/login.js'</span>,
    about_u<span class="hljs-variable">s:</span><span class="hljs-string">'./src/about_us.js'</span>,
    sideLis<span class="hljs-variable">t:</span><span class="hljs-string">'./src/sideList.js'</span>,
  },
  outpu<span class="hljs-variable">t:</span> {
    path: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'./dist/'</span>),
    publicPath: <span class="hljs-string">'/dist/'</span>,
    filename: <span class="hljs-string">'static/js/[name].js'</span>
  },
  module: {
    rule<span class="hljs-variable">s:</span> [
      {
        tes<span class="hljs-variable">t:</span> /\.vue$/,
        loader: <span class="hljs-string">'vue-loader'</span>,
        option<span class="hljs-variable">s:</span> {
          loader<span class="hljs-variable">s:</span> {
            // Since sass-loader (weirdly) <span class="hljs-built_in">has</span> SCSS <span class="hljs-keyword">as</span> its default parse <span class="hljs-keyword">mode</span>, we <span class="hljs-keyword">map</span>
            // the <span class="hljs-string">"scss"</span> <span class="hljs-built_in">and</span> <span class="hljs-string">"sass"</span> <span class="hljs-built_in">values</span> <span class="hljs-keyword">for</span> the lang attribute <span class="hljs-keyword">to</span> the <span class="hljs-keyword">right</span> configs here.
            // other preprocessors should work out of the box, <span class="hljs-keyword">no</span> loader config like this necessary.
            <span class="hljs-string">'scss'</span>: <span class="hljs-string">'vue-style-loader!css-loader!sass-loader'</span>,
            <span class="hljs-string">'sass'</span>: <span class="hljs-string">'vue-style-loader!css-loader!sass-loader?indentedSyntax'</span>
          }
          // other vue-loader <span class="hljs-keyword">options</span> <span class="hljs-keyword">go</span> here
        }
      },
      {
        tes<span class="hljs-variable">t:</span>/\.css$/,
        loader:<span class="hljs-string">'style-loader!css-loader'</span>
      },
      {
        tes<span class="hljs-variable">t:</span> /\.js$/,
        loader: <span class="hljs-string">'babel-loader'</span>,
        exclude: /node_modules/
      },
      {
        tes<span class="hljs-variable">t:</span> /\.(png|jpg|gif|svg)$/,
        loader: <span class="hljs-string">'file-loader'</span>,
        option<span class="hljs-variable">s:</span> {
          name: <span class="hljs-string">'static/img/[name].[ext]?[hash]'</span>
        }
      }
    ]
  },
  <span class="hljs-built_in">resolve</span>: {
    alia<span class="hljs-variable">s:</span> {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hint<span class="hljs-variable">s:</span> false
  },
  devtoo<span class="hljs-variable">l:</span> <span class="hljs-string">'#eval-source-map'</span>
}

<span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'production'</span>) {
  module.exports.devtool = <span class="hljs-string">'#source-map'</span>
  // http://vue-loader.vuejs.org/<span class="hljs-keyword">en</span>/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: {
        NODE_ENV: <span class="hljs-string">'"production"'</span>
      }
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compres<span class="hljs-variable">s:</span> {
        warning<span class="hljs-variable">s:</span> false
      }
    }),
    <span class="hljs-keyword">new</span> webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
</code></pre>
<p>我把Django的static文件直接指向了dist.<br>在settings.py中设置。<br><code>STATIC_URL = '/fontend/dist/static/'</code><br><code>STATIC_ROOT = os.path.join(PROJECT_ROOT, "../fontend/dist/static")</code></p>
<p>Vue实现单页面渲染，把单个页面的css都压缩到js中，index.html页面代码直接引用一个js即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div id=&quot;app&quot;></div>
    <script src=&quot;/dist/static/js/index.js&quot;></script>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/dist/static/js/index.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>有个问题需要解决，就是这种目录结构下，vue的根目录是从<code>dist</code>开始，索引不到<code>fontend</code>,<br>而<code>django</code>是从<code>fontend</code>开始，所以上述路径<code>/dist/static/js/index.js</code>，vue是可以访问到的，而django访问不到，想让django访问到，就在访问静态文件时改写静态文件的路径。在urls.py中加入这样一行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="from django.views.static import serve
from mainsys import settings

url(r'^(?P<path>.*)$', serve, {'document_root': settings.DOCUMENT_ROOT, 'show_indexes': True})," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs python"><code><span class="hljs-keyword">from</span> django.views.static <span class="hljs-keyword">import</span> serve
<span class="hljs-keyword">from</span> mainsys <span class="hljs-keyword">import</span> settings

url(<span class="hljs-string">r'^(?P&lt;path&gt;.*)$'</span>, serve, {<span class="hljs-string">'document_root'</span>: settings.DOCUMENT_ROOT, <span class="hljs-string">'show_indexes'</span>: <span class="hljs-keyword">True</span>}),</code></pre>
<p>其中settings.py设置。<br><code>DOCUMENT_ROOT = os.path.join(BASE_DIR, 'fontend/')</code></p>
<p>先写这么多，以后遇到坑的时候再更新。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Django，Vue搭建项目

## 原文链接
[https://segmentfault.com/a/1190000009620202](https://segmentfault.com/a/1190000009620202)


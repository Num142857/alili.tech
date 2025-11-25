---
title: 'Webpack2 升级指南和特性摘要' 
date: 2019-01-27 2:31:00
hidden: true
slug: n2huuwceyp
categories: [reprint]
---

{{< raw >}}

                    
<p>历时多日，webpack2.2正式版终于赶在年前发布了，此次更新相对于1.X版本有了诸多的升级优化改进，笔者也在第一时间查阅了官方的文档，整理和翻译了由webpack1升级到2所需要了解的API变更和注意事项，翻译不足的地方也欢迎随时交流指正。</p>
<p><strong>原文链接：<a href="https://webpack.js.org/guides/migrating/" rel="nofollow noreferrer" target="_blank">Webpack2 Migrating</a></strong><br><strong>译者：<a href="https://github.com/taikongfeizhu" rel="nofollow noreferrer" target="_blank">Abcat</a>  &amp;&amp; <a href="https://github.com/lovesmilesha" rel="nofollow noreferrer" target="_blank">会飞的鱼</a></strong></p>
<h3 id="articleHeader0">
<code>resolve.root</code>, <code>resolve.fallback</code>, <code>resolve.modulesDirectories</code>
</h3>
<p>上述三个选项将被合并为一个标准配置项：<code>resolve.modules</code>. 更多关于resolve的信息信息可查阅 <a href="https://webpack.js.org/configuration/resolve/" rel="nofollow noreferrer" target="_blank">resolving</a> .</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  resolve: {
-   root: path.join(__dirname, &quot;src&quot;)
+   modules: [
+     path.join(__dirname, &quot;src&quot;),
+     &quot;node_modules&quot;
+   ]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  resolve: {
<span class="hljs-deletion">-   root: path.join(__dirname, "src")</span>
<span class="hljs-addition">+   modules: [</span>
<span class="hljs-addition">+     path.join(__dirname, "src"),</span>
<span class="hljs-addition">+     "node_modules"</span>
<span class="hljs-addition">+   ]</span>
  }</code></pre>
<h3 id="articleHeader1"><code>resolve.extensions</code></h3>
<p>该配置项将不再要求强制转入一个空字符串，而被改动到了<code>resolve.enforceExtension</code>下， 更多关于resolve的信息信息可查阅 <a href="https://webpack.js.org/configuration/resolve/" rel="nofollow noreferrer" target="_blank">resolving</a> .</p>
<h3 id="articleHeader2"><code>resolve.*</code></h3>
<p>更多相关改动和一些不常用的配置项在此不一一列举，大家如果在实际项目中用到可以到<a href="https://webpack.js.org/configuration/resolve/" rel="nofollow noreferrer" target="_blank">resolving</a> 中进行查看.</p>
<h3 id="articleHeader3">
<code>module.loaders</code> 将变为 <code>module.rules</code>
</h3>
<p>旧版本中loaders配置项将被功能更为强大的rules取代，同时考虑到新旧版本的兼容，之前旧版本的<code>module.loaders</code>的相关写法仍旧有效，loaders中的相关配置项也依旧可以被识别。</p>
<p>新的loader配置规则会变得更加通俗易用，因此官方也非常推荐用户能及时按<code>module.rules</code>中的相关配置进行调整升级。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  module: {
-   loaders: [
+   rules: [
      {
        test: /\.css$/,
-       loaders: [
+       use: [
          {
            loader: &quot;style-loader&quot;
          },
          {
            loader: &quot;css-loader&quot;,
-           query: {
+           options: {
              modules: true
            }
        ]
      },
      {
        test: /\.jsx$/,
        loader: &quot;babel-loader&quot;, // Do not use &quot;use&quot; here
        options: {
          // ...
        }
      }
    ]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  module: {
<span class="hljs-deletion">-   loaders: [</span>
<span class="hljs-addition">+   rules: [</span>
      {
        test: /\.css$/,
<span class="hljs-deletion">-       loaders: [</span>
<span class="hljs-addition">+       use: [</span>
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
<span class="hljs-deletion">-           query: {</span>
<span class="hljs-addition">+           options: {</span>
              modules: true
            }
        ]
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader", // Do not use "use" here
        options: {
          // ...
        }
      }
    ]
  }</code></pre>
<h3 id="articleHeader4">链式loaders</h3>
<p>同webpack1.X中类似，loaders继续支持链式写法，可将相关正则匹配到的文件资源数据在几个loader之间进行共享传递，详细使用说明可见  <a href="https://webpack.js.org/configuration/module/#rule-use" rel="nofollow noreferrer" target="_blank">rule.use</a>。</p>
<p>在wepback2中，用户可通过<code>use</code>项来指定需要用到的loaders列表（官方推荐），而在weback1中，如果需要配置多个loaders则需要依靠简单的 <code>!</code>符来切分，这种语法出于新旧兼容的考虑，只会在<code>module.loaders</code>中生效。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  module: {
-   loaders: {
+   rules: {
      test: /\.less$/,
-     loader: &quot;style-loader!css-loader!less-loader&quot;
+     use: [
+       &quot;style-loader&quot;,
+       &quot;css-loader&quot;,
+       &quot;less-loader&quot;
+     ]
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  module: {
<span class="hljs-deletion">-   loaders: {</span>
<span class="hljs-addition">+   rules: {</span>
      test: /\.less$/,
<span class="hljs-deletion">-     loader: "style-loader!css-loader!less-loader"</span>
<span class="hljs-addition">+     use: [</span>
<span class="hljs-addition">+       "style-loader",</span>
<span class="hljs-addition">+       "css-loader",</span>
<span class="hljs-addition">+       "less-loader"</span>
<span class="hljs-addition">+     ]</span>
    }
  }</code></pre>
<h3 id="articleHeader5">module名称后自动自动补全 <code>-loader</code>的功能将被移除</h3>
<p>在配置loader时，官方不再允许省略<code>-loader</code>扩展名，loader的配置写法上将逐步趋于严谨。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  module: {
    rules: [
      {
        use: [
-         &quot;style&quot;, // 请勿再省略'-loader'
+         &quot;style-loader&quot;,
-         &quot;css&quot;,
+         &quot;css-loader&quot;,
-         &quot;less&quot;,
+         &quot;less-loader&quot;,
        ]
      }
    ]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  module: {
    rules: [
      {
        use: [
<span class="hljs-deletion">-         "style", // 请勿再省略'-loader'</span>
<span class="hljs-addition">+         "style-loader",</span>
<span class="hljs-deletion">-         "css",</span>
<span class="hljs-addition">+         "css-loader",</span>
<span class="hljs-deletion">-         "less",</span>
<span class="hljs-addition">+         "less-loader",</span>
        ]
      }
    ]
  }</code></pre>
<p>当然，如果你想继续保持之前的省略写法，你写可以在<code>resolveLoader.moduleExtensions</code>中开启默认扩展名配置，不过这种做法并不被推荐。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+ resolveLoader: {
+   moduleExtensions: [&quot;-loader&quot;]
+ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff"><span class="hljs-addition">+ resolveLoader: {</span>
<span class="hljs-addition">+   moduleExtensions: ["-loader"]</span>
<span class="hljs-addition">+ }</span></code></pre>
<p>可以从这里查看 <a href="https://github.com/webpack/webpack/issues/2986" rel="nofollow noreferrer" target="_blank">#2986</a> 此次变更的原因；</p>
<h3 id="articleHeader6">
<code>json-loader</code> 无需要独立安装</h3>
<p>当我们需要读取json格式文件时，我们不再需要安装任何loader，webpack2中将会内置 <a href="https://github.com/webpack/json-loader" rel="nofollow noreferrer" target="_blank">json-loader</a>，自动支持json格式的读取（喜大普奔啊）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  module: {
    rules: [
-     {
-       test: /\.json/,
-       loader: &quot;json-loader&quot;
-     }
    ]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  module: {
    rules: [
<span class="hljs-deletion">-     {</span>
<span class="hljs-deletion">-       test: /\.json/,</span>
<span class="hljs-deletion">-       loader: "json-loader"</span>
<span class="hljs-deletion">-     }</span>
    ]
  }</code></pre>
<p><a href="https://github.com/webpack/webpack/issues/3363" rel="nofollow noreferrer" target="_blank">为何需要默认支持json格式</a>  官方的解释是为了在webpack, node.js and browserify三种构建环境下提供无差异的开发体验。</p>
<h3 id="articleHeader7">loader配置项将默认从context中读取</h3>
<p>在webpack 1中的一些特殊的loader在读取对应资源时，需要通过<code>require.resolve</code>指定后才能指定生效。从webpack 2后，配置loader在直接从<a href="https://webpack.js.org/configuration/entry-context/#context" rel="nofollow noreferrer" target="_blank">context</a>中进行读取，这就解决了一些在使用“npm链接”或引用模块之外的context造成的模块重复导入的问题。</p>
<p>配置中可以删除如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  module: {
    rules: [
      {
        // ...
-       loader: require.resolve(&quot;my-loader&quot;)
+       loader: &quot;my-loader&quot;
      }
    ]
  },
  resolveLoader: {
-   root: path.resolve(__dirname, &quot;node_modules&quot;)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  module: {
    rules: [
      {
        // ...
<span class="hljs-deletion">-       loader: require.resolve("my-loader")</span>
<span class="hljs-addition">+       loader: "my-loader"</span>
      }
    ]
  },
  resolveLoader: {
<span class="hljs-deletion">-   root: path.resolve(__dirname, "node_modules")</span>
  }</code></pre>
<h3 id="articleHeader8">
<code>module.preLoaders</code> 和 <code>module.postLoaders</code> 将被移除</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  module: {
-   preLoaders: [
+   rules: [
      {
        test: /\.js$/,
+       enforce: &quot;pre&quot;,
        loader: &quot;eslint-loader&quot;
      }
    ]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  module: {
<span class="hljs-deletion">-   preLoaders: [</span>
<span class="hljs-addition">+   rules: [</span>
      {
        test: /\.js$/,
<span class="hljs-addition">+       enforce: "pre",</span>
        loader: "eslint-loader"
      }
    ]
  }</code></pre>
<p>之前需要用到preLoader的地方可以改到rules的<code>enfore</code>中进行配置。</p>
<h3 id="articleHeader9">
<code>UglifyJsPlugin</code>中的 sourceMap配置项将默认关闭</h3>
<p><code>UglifyJsPlugin</code>中的<code>sourceMap</code> 默认项将从 <code>true</code>变为 <code>false</code>。</p>
<p>这就意味着当你的js编译压缩后，需要继续读取原始脚本信息的行数，位置，警告等有效调试信息时，你需要手动开启<code>UglifyJsPlugin</code>  的配置项：<code>sourceMap: true</code> 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  devtool: &quot;source-map&quot;,
  plugins: [
    new UglifyJsPlugin({
+     sourceMap: true
    })
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  devtool: "source-map",
  plugins: [
    new UglifyJsPlugin({
<span class="hljs-addition">+     sourceMap: true</span>
    })
  ]</code></pre>
<h3 id="articleHeader10">
<code>UglifyJsPlugin</code> 的警告配置将默认关闭</h3>
<p><code>UglifyJsPlugin</code>中的 <code>compress.warnings</code> 默认项将从 <code>true</code>变为 <code>false</code>。</p>
<p>这就意味着当你想在编译压缩的时候查看一部分js的警告信息时，你需要将<code>compress.warnings</code> 手动设置为 <code>true</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  devtool: &quot;source-map&quot;,
  plugins: [
    new UglifyJsPlugin({
+     compress: {
+       warnings: true
+     }
    })
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  devtool: "source-map",
  plugins: [
    new UglifyJsPlugin({
<span class="hljs-addition">+     compress: {</span>
<span class="hljs-addition">+       warnings: true</span>
<span class="hljs-addition">+     }</span>
    })
  ]</code></pre>
<h3 id="articleHeader11">
<code>UglifyJsPlugin</code> 不再支持让 Loaders 最小化文件的模式了</h3>
<p><code>UglifyJsPlugin</code>&nbsp;将不再支持让 Loaders 最小化文件的模式。<code>debug</code>&nbsp;选项已经被移除。Loaders 不能从 webpack 的配置中读取到他们的配置项。</p>
<p><strong>loader</strong>的最小化文件模式将会在webpack 3或者后续版本中被彻底取消掉.</p>
<p>为了兼容部分旧式loader，你可以通过&nbsp;<code>LoaderOptionsPlugin</code>&nbsp;的配置项来提供这些功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  plugins: [
+   new webpack.LoaderOptionsPlugin({
+     minimize: true
+   })
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  plugins: [
<span class="hljs-addition">+   new webpack.LoaderOptionsPlugin({</span>
<span class="hljs-addition">+     minimize: true</span>
<span class="hljs-addition">+   })</span>
  ]</code></pre>
<h3 id="articleHeader12">
<code>BannerPlugin</code> 配置项将有所改变</h3>
<p><code>BannerPlugin</code> 将不再允许接受两个参数，而是只提供一个对象配置项</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  plugins: [
-    new webpack.BannerPlugin('Banner', {raw: true, entryOnly: true});
+    new webpack.BannerPlugin({banner: 'Banner', raw: true, entryOnly: true});
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  plugins: [
<span class="hljs-deletion">-    new webpack.BannerPlugin('Banner', {raw: true, entryOnly: true});</span>
<span class="hljs-addition">+    new webpack.BannerPlugin({banner: 'Banner', raw: true, entryOnly: true});</span>
  ]</code></pre>
<h3 id="articleHeader13">
<code>OccurrenceOrderPlugin</code>将被内置加入</h3>
<p>不需要再针对<code>OccurrenceOrderPlugin</code>进行配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  plugins: [
-   new webpack.optimize.OccurrenceOrderPlugin()
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  plugins: [
<span class="hljs-deletion">-   new webpack.optimize.OccurrenceOrderPlugin()</span>
  ]</code></pre>
<h3 id="articleHeader14">
<code>ExtractTextWebpackPlugin</code> 配置项将有所改变</h3>
<p><a href="https://github.com/webpack/extract-text-webpack-plugin" rel="nofollow noreferrer" target="_blank">ExtractTextPlugin</a> 1.0.0 在webpack v2将无法使用，你需要重新指定安装<code>ExtractTextPlugin</code> 的webpack2的适配版本.</p>
<p><code>npm install --save-dev extract-text-webpack-plugin@beta</code></p>
<p>更新后的<code>ExtractTextPlugin</code>版本会针对wepback2进行相应的调整。</p>
<h3 id="articleHeader15">
<code>ExtractTextPlugin.extract</code>的配置书写方式将调整</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  rules: [
    test: /.css$/,
-    loader: ExtractTextPlugin.extract(&quot;style-loader&quot;, &quot;css-loader&quot;, { publicPath: &quot;/dist&quot; })
+    loader: ExtractTextPlugin.extract({
+      fallbackLoader: &quot;style-loader&quot;,
+      loader: &quot;css-loader&quot;,
+      publicPath: &quot;/dist&quot;
+    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">module: {
  rules: [
    test: /.css$/,
<span class="hljs-deletion">-    loader: ExtractTextPlugin.extract("style-loader", "css-loader", { publicPath: "/dist" })</span>
<span class="hljs-addition">+    loader: ExtractTextPlugin.extract({</span>
<span class="hljs-addition">+      fallbackLoader: "style-loader",</span>
<span class="hljs-addition">+      loader: "css-loader",</span>
<span class="hljs-addition">+      publicPath: "/dist"</span>
<span class="hljs-addition">+    })</span>
  ]
}</code></pre>
<h3 id="articleHeader16">
<code>new ExtractTextPlugin({options})</code>的配置书写方式将调整</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
-  new ExtractTextPlugin(&quot;bundle.css&quot;, { allChunks: true, disable: false })
+  new ExtractTextPlugin({
+    filename: &quot;bundle.css&quot;,
+    disable: false,
+    allChunks: true
+  })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">plugins: [
<span class="hljs-deletion">-  new ExtractTextPlugin("bundle.css", { allChunks: true, disable: false })</span>
<span class="hljs-addition">+  new ExtractTextPlugin({</span>
<span class="hljs-addition">+    filename: "bundle.css",</span>
<span class="hljs-addition">+    disable: false,</span>
<span class="hljs-addition">+    allChunks: true</span>
<span class="hljs-addition">+  })</span>
]</code></pre>
<h3 id="articleHeader17">全量动态加载资源将默认失效</h3>
<p>只有使用一个表达式的资源依赖引用(i. e. <code>require(expr)</code>)，现在将创建一个空的context，而不是一个context的完整目录。</p>
<p>当在es2015的模块化中无法工作时，请最好重构这部分的代码，如果无法进行修改这部分代码，你可以在<code>ContextReplacementPlugin</code>中来提示编译器做出正确处理。</p>
<h3 id="articleHeader18">Cli使用自定义参数作为配置项传入方式将做调整</h3>
<p>如果你随意将自定义参数通过cli传入到配置项中，如：</p>
<p><code>webpack --custom-stuff</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
var customStuff = process.argv.indexOf(&quot;--custom-stuff&quot;) >= 0;
/* ... */
module.exports = config;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">var</span> customStuff = process.argv.indexOf(<span class="hljs-string">"--custom-stuff"</span>) &gt;= <span class="hljs-number">0</span>;
<span class="hljs-comment">/* ... */</span>
<span class="hljs-built_in">module</span>.exports = config;</code></pre>
<p>你会发现这将不会被允许，cli的执行将会遵循更为严格的标准。</p>
<p>取而代之的是用一个接口来做传递参数配置。这应该是新的代替方案，未来的工具开发也可能依赖于此。</p>
<p><code>webpack --env.customStuff</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function(env) {
  var customStuff = env.customStuff;
  /* ... */
  return config;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">env</span>) </span>{
  <span class="hljs-keyword">var</span> customStuff = env.customStuff;
  <span class="hljs-comment">/* ... */</span>
  <span class="hljs-keyword">return</span> config;
};</code></pre>
<p>查看更多介绍 <a href="https://webpack.js.org/api/cli/" rel="nofollow noreferrer" target="_blank">CLI</a>.</p>
<h3 id="articleHeader19">
<code>require.ensure</code>&nbsp;和 AMD&nbsp;<code>require</code>将采用异步式调用</h3>
<p><code>require.ensure</code>和<code>amd require</code>将默认采用异步的加载方式来调用，而非之前的当模块请求加载完成后再在回调函数中同步触发。</p>
<p><strong><code>require.ensure</code>将基于原生的<code>Promise</code>对象重新实现，当你在使用&nbsp;<code>require.ensure</code>&nbsp;时请确保你的运行环境默认支持Promise对象，如果缺少则推荐使用安装polyfill. </strong></p>
<h3 id="articleHeader20">Loader的配置项将通过<code>options</code>来设置</h3>
<p>在<code>webpack.config.js</code>中将不再允许使用自定义属性来配置loder，这直接带来的一个影响是：在<code>ts</code>配置项中的自定义属性将无法在被在webpack2中正确使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = { 
  ...
  module: { 
    rules: [{ 
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }]
  },
  // does not work with webpack 2
  ts: { transpileOnly: false } 
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = { 
  ...
  module: { 
    <span class="hljs-attr">rules</span>: [{ 
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.tsx?$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'ts-loader'</span>
    }]
  },
  <span class="hljs-comment">// does not work with webpack 2</span>
  ts: { <span class="hljs-attr">transpileOnly</span>: <span class="hljs-literal">false</span> } 
} </code></pre>
<h5>什么是<code>options</code>?</h5>
<p>这是一个非常好的提问，严格意义上来说，<code>custom property</code>和<code>options</code>均是用于webpack loader的配置方式，从更通俗的说法上看，<code>options</code>应该被称作<code>query</code>，作为一种类似字符串的形式被追加到每一个loader的命名后面，非常类似我们用于url中的查询字符串，但在实际应用中功能要更为<a href="https://github.com/webpack/loader-utils#parsequery" rel="nofollow noreferrer" target="_blank">强大</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = { 
  ...
  module: { 
    rules: [{ 
      test: /\.tsx?$/,
      loader: 'ts-loader?' + JSON.stringify({ transpileOnly: false })
    }]
  }
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = { 
  ...
  module: { 
    <span class="hljs-attr">rules</span>: [{ 
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.tsx?$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'ts-loader?'</span> + <span class="hljs-built_in">JSON</span>.stringify({ <span class="hljs-attr">transpileOnly</span>: <span class="hljs-literal">false</span> })
    }]
  }
} </code></pre>
<p><code>options</code>也可作为一个独立的字面对象量，在loader的配置中搭配使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = { 
  ...
  module: { 
    rules: [{ 
      test: /\.tsx?$/,
      loader: 'ts-loader'
      options:  { transpileOnly: false }
    }]
  }
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = { 
  ...
  module: { 
    <span class="hljs-attr">rules</span>: [{ 
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.tsx?$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'ts-loader'</span>
      options:  { <span class="hljs-attr">transpileOnly</span>: <span class="hljs-literal">false</span> }
    }]
  }
} </code></pre>
<h3 id="articleHeader21">
<code>LoaderOptionsPlugin</code> context</h3>
<p>部分loader需要配置<code>context</code>信息， 并且支持从配置文件中读取。这需要loader通过用长选项传递进来，更多<code>loader</code>的明细配置项可以查阅相关文档。</p>
<p>为了兼容部分旧式的loader配置，也可以采用如下插件的形式来进行配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  plugins: [
+   new webpack.LoaderOptionsPlugin({
+     options: {
+       context: __dirname
+     }
+   })
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  plugins: [
<span class="hljs-addition">+   new webpack.LoaderOptionsPlugin({</span>
<span class="hljs-addition">+     options: {</span>
<span class="hljs-addition">+       context: __dirname</span>
<span class="hljs-addition">+     }</span>
<span class="hljs-addition">+   })</span>
  ]</code></pre>
<h3 id="articleHeader22"><code>debug</code></h3>
<p><code>debug</code>作为loader中的一个调试模式选项，可以在webpack1的配置中灵活切换。在webpack2中，则需要loader通过用长选项传递进来，更多<code>loader</code>的明细配置项可以查阅相关文档。</p>
<p>loder的<code>debug</code>模式在webpack3.0或者后续版本中将会被移除。</p>
<p>为了兼容部分旧式的loader配置，也可以采用如下插件的形式来进行配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- debug: true,
  plugins: [
+   new webpack.LoaderOptionsPlugin({
+     debug: true
+   })
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff"><span class="hljs-deletion">- debug: true,</span>
  plugins: [
<span class="hljs-addition">+   new webpack.LoaderOptionsPlugin({</span>
<span class="hljs-addition">+     debug: true</span>
<span class="hljs-addition">+   })</span>
  ]</code></pre>
<h3 id="articleHeader23">Code Splitting with ES2015</h3>
<p>在webpack1中，你需要使用<code>require.ensure</code>实现<code>chunks</code>的懒加载，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require.ensure([], function(require) {
  var foo = require(&quot;./module&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{
  <span class="hljs-keyword">var</span> foo = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./module"</span>);
});</code></pre>
<p>在es2015的 loader中通过定义<code>import()</code>作为资源加载方法，当读取到符合ES2015规范的模块时，可实现模块中的内容在运行时动态加载。</p>
<p>webpack在处理<code>import()</code>时可以实现按需提取开发中所用到的模块资源，再写入到各个独立的chunk中。webpack2已经支持原生的 ES6 的模块加载器了，这意味着 webpack 2 能够理解和处理&nbsp;<code>import</code>和<code>export</code>了。</p>
<p><code>import()</code>支持将模块名作为参数出入并且返回一个<code>Promise</code>对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function route(path, query) {
  return import(`./routes/${path}/route`)
    .then(route => new route.Route(query));
}
// This creates a separate chunk for each possible route" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">route</span>(<span class="hljs-params">path, query</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">`./routes/<span class="hljs-subst">${path}</span>/route`</span>)
    .then(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> <span class="hljs-keyword">new</span> route.Route(query));
}
<span class="hljs-comment">// This creates a separate chunk for each possible route</span></code></pre>
<p>这样做的还有一个额外的好处就是当我们的模块加载失败时也可以被捕获到了，因为这些都会遵循<code>Promise</code>的标准来实现。</p>
<p>值得注意的地方：<code>require.ensure</code>的第三个参数选项允许使用简单的chunk命名方式，但是<code>import</code> API中将不被支持，如果你希望继续采用函数式的写法，你可以继续使用<code>require.ensure</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require.ensure([], function(require) {
  var foo = require(&quot;./module&quot;);
}, &quot;custom-chunk-name&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{
  <span class="hljs-keyword">var</span> foo = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./module"</span>);
}, <span class="hljs-string">"custom-chunk-name"</span>);</code></pre>
<p>（注： <code>System.import</code>将会被弃用，webpack中将不再推荐使用 <code>System.import</code>，官方也推荐使用<code>import</code>进行替换，详见<a href="https://github.com/webpack/webpack/releases/tag/v2.1.0-beta.28" rel="nofollow noreferrer" target="_blank">v2.1.0-beta.28</a> ）</p>
<p>如果想要继续使用<a href="http://babeljs.io/" rel="nofollow noreferrer" target="_blank">Babel</a>中提供的<code>import</code>，你需要独立安装 <a href="http://babeljs.io/docs/plugins/syntax-dynamic-import/" rel="nofollow noreferrer" target="_blank">dynamic-import</a>插件并且选择babel的<code>Stage 3</code>来捕获时的错误， 当然这也可以根据实际情况来操作而不做强制约束。</p>
<h3 id="articleHeader24">Dynamic expressions 动态表达式</h3>
<p>现在<code>import()</code>中的传参可支持部分表达式的写法了，如果之前有接触过CommonJS中<code>require()</code>表达式写法，应该不会对此感到陌生,（它的操作其实和 CommonJS 是类似的，给所有可能的文件创建一个环境，当你传递那部分代码的模块还不确定的时候，webpack 会自动生成所有可能的模块，然后根据需求加载。这个特性在前端路由的时候很有用，可以实现按需加载资源）</p>
<p><code>import()</code> 会针对每一个读取到的module创建独立的<code>separte chunk</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function route(path, query) {
  return import(`./routes/${path}/route`)
    .then(route => new route.Route(query));
}
// This creates a separate chunk for each possible route" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">route</span>(<span class="hljs-params">path, query</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">`./routes/<span class="hljs-subst">${path}</span>/route`</span>)
    .then(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> <span class="hljs-keyword">new</span> route.Route(query));
}
<span class="hljs-comment">// This creates a separate chunk for each possible route</span></code></pre>
<h3 id="articleHeader25">可以混用 ES2015 和 AMD 和 CommonJS</h3>
<p>在 AMD 和 CommonJS 模块加载器中，你可以混合使用所有（三种）的模块类型（即使是在同一个文件里面）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// CommonJS consuming ES2015 Module
var book = require(&quot;./book&quot;);
book.currentPage;
book.readPage();
book.default === &quot;This is a book&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// CommonJS consuming ES2015 Module</span>
<span class="hljs-keyword">var</span> book = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./book"</span>);
book.currentPage;
book.readPage();
book.default === <span class="hljs-string">"This is a book"</span>;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES2015 Module consuming CommonJS
import fs from &quot;fs&quot;; // module.exports map to default
import { readFileSync } from &quot;fs&quot;; // named exports are read from returned object+

typeof fs.readFileSync === &quot;function&quot;;
typeof readFileSync === &quot;function&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ES2015 Module consuming CommonJS</span>
<span class="hljs-keyword">import</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">"fs"</span>; <span class="hljs-comment">// module.exports map to default</span>
<span class="hljs-keyword">import</span> { readFileSync } <span class="hljs-keyword">from</span> <span class="hljs-string">"fs"</span>; <span class="hljs-comment">// named exports are read from returned object+</span>

<span class="hljs-keyword">typeof</span> fs.readFileSync === <span class="hljs-string">"function"</span>;
<span class="hljs-keyword">typeof</span> readFileSync === <span class="hljs-string">"function"</span>;</code></pre>
<p>注：<code>es2015</code>&nbsp;balel 的默认预处理会把 ES6 模块加载器转化成 CommonJS 模块加载。要是想使用 webpack 新增的对原生 ES6 模块加载器的支持，你需要使用&nbsp;<code>es2015-webpack</code>&nbsp;来代替，另外如果你希望继续使用babel，则需要通过配置babel项，使其不会强制解析这部分的module symbols以便webpack能正确使用它们，babel的配置如下：</p>
<p><strong>.babelrc</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    [&quot;es2015&quot;, { &quot;modules&quot;: false }]
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"presets"</span>: [
    [<span class="hljs-string">"es2015"</span>, { <span class="hljs-attr">"modules"</span>: <span class="hljs-literal">false</span> }]
  ]
}</code></pre>
<h3 id="articleHeader26">Template strings 模板字符串</h3>
<p>webpack中的资源参数已经开始支持模板字符串了，这意味着你可以使用如下的配置写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- require(&quot;./templates/&quot; + name);
+ require(`./templates/${name}`);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff"><span class="hljs-deletion">- require("./templates/" + name);</span>
<span class="hljs-addition">+ require(`./templates/${name}`);</span></code></pre>
<h3 id="articleHeader27">配置支持项支持Promise</h3>
<p>webpack现在在配置文件项中返回<code>Promise</code>了，这就允许你在配置中可以进行一些异步的写法了，如下所示：</p>
<p><strong>webpack.config.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function() {
  // 异步读取语言包
  return fetchLangs().then(lang => ({
    entry: &quot;...&quot;,
    // ...
    plugins: [
      new DefinePlugin({ LANGUAGE: lang })
    ]
  }));
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 异步读取语言包</span>
  <span class="hljs-keyword">return</span> fetchLangs().then(<span class="hljs-function"><span class="hljs-params">lang</span> =&gt;</span> ({
    <span class="hljs-attr">entry</span>: <span class="hljs-string">"..."</span>,
    <span class="hljs-comment">// ...</span>
    plugins: [
      <span class="hljs-keyword">new</span> DefinePlugin({ <span class="hljs-attr">LANGUAGE</span>: lang })
    ]
  }));
};</code></pre>
<h3 id="articleHeader28">Loader匹配支持更多的高级写法</h3>
<p>webpack中的loader配置支持如下写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  rules: [
    {
      resource: /filename/, // matches &quot;/path/filename.js&quot;
      resourceQuery: /querystring/, // matches &quot;/filename.js?querystring&quot;
      issuer: /filename/, // matches &quot;/path/something.js&quot; if requested from &quot;/path/filename.js&quot;
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">rules</span>: [
    {
      <span class="hljs-attr">resource</span>: <span class="hljs-regexp">/filename/</span>, <span class="hljs-comment">// matches "/path/filename.js"</span>
      resourceQuery: <span class="hljs-regexp">/querystring/</span>, <span class="hljs-comment">// matches "/filename.js?querystring"</span>
      issuer: <span class="hljs-regexp">/filename/</span>, <span class="hljs-comment">// matches "/path/something.js" if requested from "/path/filename.js"</span>
    }
  ]
}</code></pre>
<h3 id="articleHeader29">更多的CLI参数项</h3>
<p>如下有更多的CLI 参数项可用：</p>
<p><code>--define process.env.NODE_ENV="production"</code> 支持直接配置<a href="https://webpack.js.org/plugins/define-plugin/" rel="nofollow noreferrer" target="_blank"><code>DefinePlugin</code></a>.</p>
<p><code>--display-depth</code> 能显示每个entry中的module的资源深度</p>
<p><code>--display-used-exports</code> 能显示每个module中依赖使用了哪些资源.</p>
<p><code>--display-max-modules</code> 能限制显示output中引用到的资源数量 (默认显示15个).</p>
<p><code>-p</code> 指定当前的编译环境为生产环境，即修改：<code>process.env.NODE_ENV</code> 为 <code>"production"</code></p>
<h3 id="articleHeader30">Cacheable 缓存项</h3>
<p>Loaders现在将默认开启资源缓存了，如果你不希望loader读缓存则需要在配置中指明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // Cacheable loader
  module.exports = function(source) {
-   this.cacheable();
    return source;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  // Cacheable loader
  module.exports = function(source) {
<span class="hljs-deletion">-   this.cacheable();</span>
    return source;
  }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // Not cacheable loader
  module.exports = function(source) {
+   this.cacheable(false);
    return source;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  // Not cacheable loader
  module.exports = function(source) {
<span class="hljs-addition">+   this.cacheable(false);</span>
    return source;
  }</code></pre>
<h3 id="articleHeader31">Complex options 复合参数项写法</h3>
<p>webpack1中的loader参数项中只支持<code>JSON.stringify</code>-able这种json字符串的写法；</p>
<p>webpack2中的loader参数项中已经可以支持任意的JS对象的写法了。</p>
<p>使用复合选项时会有一个限制，你需要配置一个<code>ident</code>作为项来保证能正确引用到其他的loader，这意味着通过配置我们可以在内联写法中去调用对应依赖的加载器，如下：</p>
<p><code>require("some-loader??by-ident!resource")</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /.../,
  loader: &quot;...&quot;,
  options: {
    ident: &quot;by-ident&quot;,
    magic: () => return Math.random()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/.../</span>,
  <span class="hljs-attr">loader</span>: <span class="hljs-string">"..."</span>,
  <span class="hljs-attr">options</span>: {
    <span class="hljs-attr">ident</span>: <span class="hljs-string">"by-ident"</span>,
    <span class="hljs-attr">magic</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.random()
  }
}</code></pre>
<p>这种写法在平常开发中用的不算多，但是有一种场景下会比较有用，就是当我们的loader需要去生成独立的代码片段时，如，我们在使用<code>style-loader</code>生成一个模块时，需要依赖前面的loader计算的结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// style-loader generated code (simplified)
var addStyle = require(&quot;./add-style&quot;);
var css = require(&quot;-!css-loader?{&quot;modules&quot;:true}!postcss-loader??postcss-ident&quot;);
addStyle(css);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// style-loader generated code (simplified)</span>
<span class="hljs-keyword">var</span> addStyle = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./add-style"</span>);
<span class="hljs-keyword">var</span> css = <span class="hljs-built_in">require</span>(<span class="hljs-string">"-!css-loader?{"</span>modules<span class="hljs-string">":true}!postcss-loader??postcss-ident"</span>);
addStyle(css);</code></pre>
<p>在这种复杂选项的使用时<code>ident</code>就有用武之地了。</p>
<h3 id="articleHeader32">结尾</h3>
<p>webpack2无论是从优化资源配置项，到向es6 module，Promise等新标准接轨，再到编译环境和性能的优化，再到API设计的整体规范性上，相对V1的改进还是非常显著的，希望大家多多尝试，及时反馈交流，让webapck的生态圈变得日益活跃强大。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack2 升级指南和特性摘要

## 原文链接
[https://segmentfault.com/a/1190000008181955](https://segmentfault.com/a/1190000008181955)


---
title: 'Webpack 配置详解及实现过程' 
date: 2019-01-04 2:30:10
hidden: true
slug: owmu0b66hdp
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Webpack 配置详解</h1>
<h2 id="articleHeader1">一、打包升级</h2>
<h3 id="articleHeader2">1.基础打包配置</h3>
<h4>1. <strong><a href="https://webpack.js.org/configuration/devtool/" rel="nofollow noreferrer" target="_blank">开发模式(devtool)</a></strong>
</h4>
<p><a href="https://github.com/chenzhiwei199/webpack_demo/tree/master/webpack.config.base" rel="nofollow noreferrer" target="_blank">demo_base版本</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
This option controls if and how source maps are generated.

开发建议使用eval模式，缺点是无法正确显示行号，想要正确显示行号，可以时候用source-map或者eval-source-map

生产环境： 建议使用cheap-module-source-map
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>
This option controls <span class="hljs-keyword">if</span> <span class="hljs-built_in">and</span> how <span class="hljs-keyword">source</span> maps are generated.

开发建议使用<span class="hljs-built_in">eval</span>模式，缺点是无法正确显示行号，想要正确显示行号，可以时候用<span class="hljs-keyword">source</span>-<span class="hljs-keyword">map</span>或者<span class="hljs-built_in">eval</span>-<span class="hljs-keyword">source</span>-<span class="hljs-keyword">map</span>

生产环境： 建议使用cheap-module-<span class="hljs-keyword">source</span>-<span class="hljs-keyword">map</span>
</code></pre>
<h4>2. <strong>入口配置(entry)</strong>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="string | [string] | object { <key>: string | [string] } | (function: () => string | [string] | object { <key>: string | [string] })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">string | [string] | object { &lt;key&gt;: string | [string] } | <span class="hljs-function">(<span class="hljs-params"><span class="hljs-keyword">function</span>: (</span>) =&gt;</span> string | [string] | object { &lt;key&gt;: string | [string] })</code></pre>
<p>入口打包根场景不同，入口配置也不同。</p>
<ul><li>单入口：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: './A/index.js'

entry: [
'./A/index.js',
]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">entry: <span class="hljs-string">'./A/index.js'</span>

entry: [
<span class="hljs-string">'./A/index.js'</span>,
],</code></pre>
<ul><li>多入口：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: [
'./A/index.js',
'./B/index.js'
],

entry: {
A: './A/index.js',
B: './B/index.js'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">entry: [
<span class="hljs-string">'./A/index.js'</span>,
<span class="hljs-string">'./B/index.js'</span>
],

<span class="hljs-attr">entry</span>: {
<span class="hljs-attr">A</span>: <span class="hljs-string">'./A/index.js'</span>,
<span class="hljs-attr">B</span>: <span class="hljs-string">'./B/index.js'</span>
}</code></pre>
<h4>3. <strong>输出配置(output)</strong>
</h4>
<ul><li>
<p>输出路径配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
    // path.resolve用来拼接文件多级目录
    // __dirname 为当前文件所在全路径地址
    path: path.resolve(__dirname,'dist'), 
    // 输出文件名字
   // filename: 'app.js', 
    // 以key作为文件名输出
    filename: '[name].js',
    // chunkhash 根据文件内容生成特点的hash，使用这个可以保证文件内容不变，那么文件名字就不会改变，可以用来作为热更新
    chunkFilename: '[chunkhash].js'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">output: {
    <span class="hljs-comment">// path.resolve用来拼接文件多级目录</span>
    <span class="hljs-comment">// __dirname 为当前文件所在全路径地址</span>
    path: path.resolve(__dirname,<span class="hljs-string">'dist'</span>), 
    <span class="hljs-comment">// 输出文件名字</span>
   <span class="hljs-comment">// filename: 'app.js', </span>
    <span class="hljs-comment">// 以key作为文件名输出</span>
    filename: <span class="hljs-string">'[name].js'</span>,
    <span class="hljs-comment">// chunkhash 根据文件内容生成特点的hash，使用这个可以保证文件内容不变，那么文件名字就不会改变，可以用来作为热更新</span>
    chunkFilename: <span class="hljs-string">'[chunkhash].js'</span>
}</code></pre>
</li></ul>
<h4>4. <a href="https://webpack.js.org/configuration/resolve/" rel="nofollow noreferrer" target="_blank">resolve</a>
</h4>
<p>Configure how modules are resolved. For example, when calling import "lodash" in ES2015, the resolve options can change where webpack goes to look for "lodash" (see modules).</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    resolve: {
        // 当你reuire时，不需要加上以下扩展名
        extensions: ['.js', '.md', '.txt'],
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    resolve: {
        <span class="hljs-comment">// 当你reuire时，不需要加上以下扩展名</span>
        extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.md'</span>, <span class="hljs-string">'.txt'</span>],
      },</code></pre>
<h4>5. 插件(plugin)</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    plugins: [
    // Webpack 2以后内置
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // 碰到错误warning但是不停止编译
    new webpack.NoEmitOnErrorsPlugin(),
    // 开发模式不需要压缩
    // new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
  ]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    plugins: [
    <span class="hljs-comment">// Webpack 2以后内置</span>
    <span class="hljs-comment">// new webpack.optimize.OccurrenceOrderPlugin(),</span>
    <span class="hljs-comment">// 碰到错误warning但是不停止编译</span>
    <span class="hljs-keyword">new</span> webpack.NoEmitOnErrorsPlugin(),
    <span class="hljs-comment">// 开发模式不需要压缩</span>
    <span class="hljs-comment">// new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),</span>
  ],</code></pre>
<h4>6. moudles</h4>
<ul>
<li>babel-loader(用来做js代码转化)</li>
<li>style-loader &amp; css-loader(用来转化css代码)</li>
<li>less-loader 转化less文件</li>
<li>raw-loader 把文件当做普通的文本文件读取</li>
<li>json-loader webpack 2以后就不需要配置了（内置了）</li>
<li>file-loader <del>用来处理文件，可以用url-loader代替，但是如果你资源文件是即时文件，那么就使用</del>fileload 指定一类对象作为文件，并且返回一个public 的url，这样可以利用浏览器的线程来加载文件，减小bundle.js的大小。</li>
<li>url-loader <del>用来处理eot|woff|woff2|ttf|svg|png|jpg这些文件，可以防止加载资源文件导致页面加载缓慢</del>url-loader 使用limit来指定一个size，当文件的大小小于这个size的时候，对象将会转化为Dataurl，直接嵌入在js中.</li>
</ul>
<h3 id="articleHeader3">2.多入口打多个包 （生成多个bundle.js）</h3>
<p>这个是webpack 3.1.0新出来的配置方式,可以用来解决多个入口文件，打包成多个文件夹的问题。</p>
<p><a href="https://github.com/chenzhiwei199/webpack_demo/tree/master/webpack.config.multi_compiler" rel="nofollow noreferrer" target="_blank">demo 将多个入口打成多个文件夹 </a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = [{
  output: {
    filename: './dist-amd.js',
    libraryTarget: 'amd'
  },
  entry: './app.js',
}, {
  output: {
    filename: './dist-commonjs.js',
    libraryTarget: 'commonjs'
  },
  entry: './app.js',
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = [{
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'./dist-amd.js'</span>,
    <span class="hljs-attr">libraryTarget</span>: <span class="hljs-string">'amd'</span>
  },
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./app.js'</span>,
}, {
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'./dist-commonjs.js'</span>,
    <span class="hljs-attr">libraryTarget</span>: <span class="hljs-string">'commonjs'</span>
  },
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./app.js'</span>,
}]</code></pre>
<h3 id="articleHeader4">3.兼容多浏览器，添加postcss-loader（生产环境使用，增加build和rebuild时间）</h3>
<p><a href="https://github.com/chenzhiwei199/webpack_demo/tree/master/webpack.config.postcss" rel="nofollow noreferrer" target="_blank">demo 添加postcss</a></p>
<p>添加postcss-loader，需要做如下配置</p>
<h6>webpack config 配置</h6>
<p>插件配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
+          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
-        use: 'style-loader!css-loader',
+        use: 'style-loader!css-loader!postcss-loader',
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">    {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
<span class="hljs-addition">+          'postcss-loader',</span>
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
<span class="hljs-deletion">-        use: 'style-loader!css-loader',</span>
<span class="hljs-addition">+        use: 'style-loader!css-loader!postcss-loader',</span>
      },</code></pre>
<h6>.postcss.config.js文件配置</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  plugins: {
    'postcss-import': {}, // 能够使用import语法 @import &quot;cssrecipes-defaults&quot;; 
    'postcss-cssnext': {}, //PostCSS-cssnext是一个PostCSS插件，可以帮助您使用最新的CSS语法。 它将CSS规范转换为更兼容的CSS，因此您不需要等待浏览器支持。
    'cssnano': {}
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">plugins</span>: {
    <span class="hljs-string">'postcss-import'</span>: {}, <span class="hljs-comment">// 能够使用import语法 @import "cssrecipes-defaults"; </span>
    <span class="hljs-string">'postcss-cssnext'</span>: {}, <span class="hljs-comment">//PostCSS-cssnext是一个PostCSS插件，可以帮助您使用最新的CSS语法。 它将CSS规范转换为更兼容的CSS，因此您不需要等待浏览器支持。</span>
    <span class="hljs-string">'cssnano'</span>: {}
  }
}</code></pre>
<h3 id="articleHeader5">4.css文件抽离 (生成环境使用，会增加build和rebuild时间)</h3>
<p><a href="https://github.com/chenzhiwei199/webpack_demo/tree/master/webpack.config.extractText" rel="nofollow noreferrer" target="_blank">demo css文件分离</a></p>
<h6>webpack config 配置</h6>
<p>插件配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
+const ExtractTextPlugin = require('extract-text-webpack-plugin');

+new ExtractTextPlugin('style.css'), //名字配置
    { 
        test: /\.less/,
_        use: [
_          'style-loader',
_          'css-loader',
_          'less-loader'
_        ]
+        use: ExtractTextPlugin.extract({
+          fallback: 'style-loader',
+          use: ['css-loader', 'less-loader']
+        })
      },
      {
        test: /\.css$/,
-        use: 'style-loader!css-loader',
+         use: ExtractTextPlugin.extract({
+          fallback: 'style-loader',
+          use: ['css-loader']
+        })
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">
<span class="hljs-addition">+const ExtractTextPlugin = require('extract-text-webpack-plugin');</span>

<span class="hljs-addition">+new ExtractTextPlugin('style.css'), //名字配置</span>
    { 
        test: /\.less/,
_        use: [
_          'style-loader',
_          'css-loader',
_          'less-loader'
_        ]
<span class="hljs-addition">+        use: ExtractTextPlugin.extract({</span>
<span class="hljs-addition">+          fallback: 'style-loader',</span>
<span class="hljs-addition">+          use: ['css-loader', 'less-loader']</span>
<span class="hljs-addition">+        })</span>
      },
      {
        test: /\.css$/,
<span class="hljs-deletion">-        use: 'style-loader!css-loader',</span>
<span class="hljs-addition">+         use: ExtractTextPlugin.extract({</span>
<span class="hljs-addition">+          fallback: 'style-loader',</span>
<span class="hljs-addition">+          use: ['css-loader']</span>
<span class="hljs-addition">+        })</span>
      },</code></pre>
<h6>.postcss.config.js文件配置</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  plugins: {
    'postcss-import': {}, // 能够使用import语法 @import &quot;cssrecipes-defaults&quot;; 
    'postcss-cssnext': {}, //PostCSS-cssnext是一个PostCSS插件，可以帮助您使用最新的CSS语法。 它将CSS规范转换为更兼容的CSS，因此您不需要等待浏览器支持。
    'cssnano': {}
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">plugins</span>: {
    <span class="hljs-string">'postcss-import'</span>: {}, <span class="hljs-comment">// 能够使用import语法 @import "cssrecipes-defaults"; </span>
    <span class="hljs-string">'postcss-cssnext'</span>: {}, <span class="hljs-comment">//PostCSS-cssnext是一个PostCSS插件，可以帮助您使用最新的CSS语法。 它将CSS规范转换为更兼容的CSS，因此您不需要等待浏览器支持。</span>
    <span class="hljs-string">'cssnano'</span>: {}
  }
}</code></pre>
<h3 id="articleHeader6">5.公共文件抽取 （抽取公共文件，可以减少build与rebuild时间）</h3>
<p>公共文件抽取一般依靠 CommonChunkPlguin 和 Dllplugin这两个插件.</p>
<p><a href="https://github.com/chenzhiwei199/webpack_demo/tree/master/webpack.config.commonchunk" rel="nofollow noreferrer" target="_blank">CommonChunkPlugin Demo</a></p>
<p><a href="https://github.com/chenzhiwei199/webpack_demo/tree/master/webpack.config.dll" rel="nofollow noreferrer" target="_blank">DllPlugin Demo</a></p>
<ul>
<li>
<p>共同点：</p>
<ul><li>都可以抽出公共模块</li></ul>
</li>
<li>
<p>不同点：</p>
<ul>
<li>
<p>CommonChunkPlguin</p>
<ol>
<li>CommonChunkPlguin可以抽出多个模块间公共模块</li>
<li>配置了HtmlWebpackPlugin后，不需要手动在html中导入</li>
</ol>
</li>
<li>
<p>dllPlugin</p>
<ol>
<li>dllPlugin 可以在multi compliler（多个webpack config 文件） 中使用</li>
<li>dllPlugin 生成的文件相当于独立的存在，就像jQuery一样，需要你在html进行引入之后才能使用。</li>
</ol>
</li>
</ul>
</li>
</ul>
<p>CommonChunkPlugin 配置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 如果有其他CommonsChunkPlugin生成的文件，将会引入
  // - If chunk has the name as specified in the chunkNames it is put in the list
  // - If no chunk with the name as given in chunkNames exists a new chunk is created and added to the list
 // 大概意思就是如果name在entry里面有，那就加入一个列表，如果entry里面没有，
 // 那么就创建一个新chunk列表,如果chunks里面相同模块代码出现次数超过minChunks,那就添加到这个新创建的list里面。
 new webpack.optimize.CommonsChunkPlugin({
      name: &quot;common&quot;,
      chunks: [&quot;a&quot;, &quot;b&quot;], //需要合并的文件
      // minChunks:3 //最少在出现过多少次才将其打入common中
    }),
    //如果
    new webpack.optimize.CommonsChunkPlugin({
      name: &quot;vendor&quot;,
      minChunks: Infinity 
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">// 如果有其他CommonsChunkPlugin生成的文件，将会引入</span>
  <span class="hljs-comment">// - If chunk has the name as specified in the chunkNames it is put in the list</span>
  <span class="hljs-comment">// - If no chunk with the name as given in chunkNames exists a new chunk is created and added to the list</span>
 <span class="hljs-comment">// 大概意思就是如果name在entry里面有，那就加入一个列表，如果entry里面没有，</span>
 <span class="hljs-comment">// 那么就创建一个新chunk列表,如果chunks里面相同模块代码出现次数超过minChunks,那就添加到这个新创建的list里面。</span>
 <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">"common"</span>,
      <span class="hljs-attr">chunks</span>: [<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>], <span class="hljs-comment">//需要合并的文件</span>
      <span class="hljs-comment">// minChunks:3 //最少在出现过多少次才将其打入common中</span>
    }),
    <span class="hljs-comment">//如果</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">"vendor"</span>,
      <span class="hljs-attr">minChunks</span>: <span class="hljs-literal">Infinity</span> 
    })</code></pre>
<p>DllPlugin 配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="添加文件
const webpackConfig = {
  name: &quot;vendor&quot;,
  entry: [&quot;react&quot;, &quot;react-dom&quot;],
  output: {
    path: buildPath, // 输出文件路径
    filename: &quot;vendor.js&quot;,
    library: &quot;vendor_[hash]&quot;
  },
  plugins: [
    new webpack.DllPlugin({
      name: &quot;vendor_[hash]&quot;,
      path: path.resolve(buildPath, &quot;manifest.json&quot;)
    })
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">添加文件
<span class="hljs-keyword">const</span> webpackConfig = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"vendor"</span>,
  <span class="hljs-attr">entry</span>: [<span class="hljs-string">"react"</span>, <span class="hljs-string">"react-dom"</span>],
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: buildPath, <span class="hljs-comment">// 输出文件路径</span>
    filename: <span class="hljs-string">"vendor.js"</span>,
    <span class="hljs-attr">library</span>: <span class="hljs-string">"vendor_[hash]"</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DllPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">"vendor_[hash]"</span>,
      <span class="hljs-attr">path</span>: path.resolve(buildPath, <span class="hljs-string">"manifest.json"</span>)
    })
  ]
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" name: &quot;app&quot;,
+ dependencies: [&quot;vendor&quot;],
 devtool: 'eval',

+  new webpack.DllReferencePlugin({
+     manifest: path.resolve(buildPath, &quot;manifest.json&quot;)
+    })," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff"> name: "app",
<span class="hljs-addition">+ dependencies: ["vendor"],</span>
 devtool: 'eval',

<span class="hljs-addition">+  new webpack.DllReferencePlugin({</span>
<span class="hljs-addition">+     manifest: path.resolve(buildPath, "manifest.json")</span>
<span class="hljs-addition">+    }),</span></code></pre>
<h3 id="articleHeader7">6.文件分析(visualizer)</h3>
<p>文件分析可以插件可以帮助查看我们生成的bundle.js和chunk的组成成分，可以根据这个进行代码优化。（开发环境使用）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+    const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
+    const Visualizer = require('webpack-visualizer-plugin');

+   new StatsWriterPlugin({
+      fields: null,
+      stats: { chunkModules: true }
+    }),
+    new Visualizer({
+      filename: './statistics.html' // visualizer 文件名称，在output 设置的path文件夹可以找到
+    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff"><span class="hljs-addition">+    const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;</span>
<span class="hljs-addition">+    const Visualizer = require('webpack-visualizer-plugin');</span>

<span class="hljs-addition">+   new StatsWriterPlugin({</span>
<span class="hljs-addition">+      fields: null,</span>
<span class="hljs-addition">+      stats: { chunkModules: true }</span>
<span class="hljs-addition">+    }),</span>
<span class="hljs-addition">+    new Visualizer({</span>
<span class="hljs-addition">+      filename: './statistics.html' // visualizer 文件名称，在output 设置的path文件夹可以找到</span>
<span class="hljs-addition">+    })</span></code></pre>
<h3 id="articleHeader8">7.<a href="https://webpack.js.org/plugins/define-plugin/" rel="nofollow noreferrer" target="_blank">DefinePlugin</a>(生产环境配置可以减少文件体积)</h3>
<p>这个减少文件体积是相对的，webpack打包的时候回删去无用的代码，而react-dom等一些文件中都有很多下面的代码形式，这样webpack 和 DefinePlugin插件配合可以减少部分文件体积</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (process.env.NODE_ENV !== 'production') {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> webpack.DefinePlugin({
  <span class="hljs-string">'process.env'</span>: {
    <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">'production'</span>)
  }
}),</code></pre>
<h3 id="articleHeader9">8.OccurrenceOrderPlugin内置加入，不需要配置</h3>
<h3 id="articleHeader10">9.<a href="https://www.npmjs.com/package/uglifyjs-webpack-plugin" rel="nofollow noreferrer" target="_blank">UglifyJsPlugin</a>（压缩文件，减小文件体积，生产环境使用）</h3>
<p>webpack 本身内置uglifyjs,如果你想控制uglifyjs的版本，可以使用这个。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> UglifyJSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'uglifyjs-webpack-plugin'</span>);
 <span class="hljs-keyword">new</span> uglifyJsPlugin({
      <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
      }
    })</code></pre>
<h3 id="articleHeader11">10.热替换配置(开发环境自动刷新)</h3>
<p><a href="https://segmentfault.com/a/1190000010599832">篇幅过大，移至此文章</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack 配置详解及实现过程

## 原文链接
[https://segmentfault.com/a/1190000010654308](https://segmentfault.com/a/1190000010654308)


---
title: 'webpack进阶之插件篇' 
date: 2019-02-09 2:30:58
hidden: true
slug: 584ekqeppw5
categories: [reprint]
---

{{< raw >}}

                    
<p>上一篇博客讲解了webpack环境的基本，这一篇讲解一些更深入的内容和开发技巧。基本环境搭建就不展开讲了<br><span class="img-wrap"><img data-src="http://static.xiaomo.info/images/webpack.png" src="https://static.alili.techhttp://static.xiaomo.info/images/webpack.png" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader0">一、插件篇</h2>
<h3 id="articleHeader1">1. 自动补全css3前缀</h3>
<p>autoprefixer</p>
<blockquote><p>官方是这样说的：<code>Parse CSS and add vendor prefixes to CSS rules using values from the Can I Use website</code><br>，也就是说它是一个自动检测兼容性给各个浏览器加个内核前缀的插件。</p></blockquote>
<p>举个栗子：最新的弹性盒模型flux<br>实际代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":fullscreen a {
    display: flex
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-pseudo">:fullscreen</span> <span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">display</span>: flex
}</code></pre>
<p>插件自动补充后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">display</span>: -webkit-box;
    <span class="hljs-attribute">display</span>: -webkit-flex;
    <span class="hljs-attribute">display</span>: -ms-flexbox;
    <span class="hljs-attribute">display</span>: flex
}</code></pre>
<p>效果显而易见，我们可以更专注于css布局和美化，而不需要花过多的精力都写相同的外码而加上不同的前缀，也减少了冗余代码。</p>
<p>使用方法:</p>
<p><code>cnpm install --save-dev autoprefixer postcss-loader</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var autoprefixer = require('autoprefixer');
module.exports={
  //其他配置这里就不写了

  module:{
    loaders:[
    {
      test:/\.css$/,
      //在原有基础上加上一个postcss的loader就可以了
      loaders:['style-loader','css-loader','postcss-loader']
      }
      ]
  },
  postcss:[autoprefixer({browsers:['last 2 versions']})]

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> autoprefixer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>);
<span class="hljs-built_in">module</span>.exports={
  <span class="hljs-comment">//其他配置这里就不写了</span>

  <span class="hljs-keyword">module</span>:{
    loaders:[
    {
      test:<span class="hljs-regexp">/\.css$/</span>,
      <span class="hljs-comment">//在原有基础上加上一个postcss的loader就可以了</span>
      loaders:[<span class="hljs-string">'style-loader'</span>,<span class="hljs-string">'css-loader'</span>,<span class="hljs-string">'postcss-loader'</span>]
      }
      ]
  },
  postcss:[autoprefixer({browsers:[<span class="hljs-string">'last 2 versions'</span>]})]

}</code></pre>
<h3 id="articleHeader2">2. 自动生成html插件</h3>
<p>html-webpack-plugin</p>
<p><code>cnpm install html-webpack-plugin --save-dev</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //webpack.config.js
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  module.exports={
    entry:'./index.js',
    output:{
      path:__dirname+'/dist',
      filename:'bundle.js'
    }
    plugins:[
      new HtmlWebpackPlugin()
    ]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-comment">//webpack.config.js</span>
  <span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
  <span class="hljs-built_in">module</span>.exports={
    <span class="hljs-attr">entry</span>:<span class="hljs-string">'./index.js'</span>,
    <span class="hljs-attr">output</span>:{
      <span class="hljs-attr">path</span>:__dirname+<span class="hljs-string">'/dist'</span>,
      <span class="hljs-attr">filename</span>:<span class="hljs-string">'bundle.js'</span>
    }
    plugins:[
      <span class="hljs-keyword">new</span> HtmlWebpackPlugin()
    ]
  }</code></pre>
<blockquote><p>作用:它会在dist目录下自动生成一个index.html</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Webpack App</title>
  </head>
  <body>
    <script src=&quot;bundle.js&quot;></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Webpack App<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>其他配置参数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'admin.html',
      template:'header.html',
      inject: 'body',
      favicon:'./images/favico.ico',
      minify:true,
      hash:true,
      cache:false,
      showErrors:false,
      &quot;chunks&quot;: {
      &quot;head&quot;: {
        &quot;entry&quot;: &quot;assets/head_bundle.js&quot;,
        &quot;css&quot;: [ &quot;main.css&quot; ]
      },
      xhtml:false
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>{
  <span class="hljs-attribute">entry</span>: <span class="hljs-string">'index.js'</span>,
  <span class="hljs-attribute">output</span>: {
    <span class="hljs-attribute">path</span>: <span class="hljs-string">'dist'</span>,
    <span class="hljs-attribute">filename</span>: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-attribute">plugins</span>: [
    new HtmlWebpackPlugin({
      <span class="hljs-attribute">title</span>: <span class="hljs-string">'My App'</span>,
      <span class="hljs-attribute">filename</span>: <span class="hljs-string">'admin.html'</span>,
      <span class="hljs-attribute">template</span>:<span class="hljs-string">'header.html'</span>,
      <span class="hljs-attribute">inject</span>: <span class="hljs-string">'body'</span>,
      <span class="hljs-attribute">favicon</span>:<span class="hljs-string">'./images/favico.ico'</span>,
      <span class="hljs-attribute">minify</span>:true,
      <span class="hljs-attribute">hash</span>:true,
      <span class="hljs-attribute">cache</span>:false,
      <span class="hljs-attribute">showErrors</span>:false,
      <span class="hljs-string">"chunks"</span>: {
      <span class="hljs-string">"head"</span>: {
        <span class="hljs-string">"entry"</span>: <span class="hljs-string">"assets/head_bundle.js"</span>,
        <span class="hljs-string">"css"</span>: [ <span class="hljs-string">"main.css"</span> ]
      },
      <span class="hljs-attribute">xhtml</span>:false
    })
  ]
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--- header.html ---
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv=&quot;Content-type&quot; content=&quot;text/html; charset=utf-8&quot;/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code><span class="xml">--- header.html ---
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=utf-8"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby"> htmlWebpackPlugin.options.title </span><span class="xml"><span class="hljs-tag">%&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>作用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  title: 设置title的名字   
  filename: 设置这个html的文件名   
  template:要使用的模块的路径  
  inject: 把模板注入到哪个标签后 'body',   
  favicon: 给html添加一个favicon  './images/favico.ico',   
  minify:是否压缩  {...} | false （最新api变动，原来是ture|false 感谢@onmi指正)
  hash:是否hash化 true false ,     
  cache:是否缓存,   
  showErrors:是否显示错误,  
  chunks:目前没太明白  
  xhtml:是否自动毕业标签 默认false  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>  title: 设置title的名字   
  filename: 设置这个html的文件名   
  <span class="hljs-keyword">template</span>:要使用的模块的路径  
  inject: 把模板注入到哪个标签后 'body',   
  favicon: 给html添加一个favicon  './images/favico.ico',   
  minify:是否压缩  <span class="hljs-meta">{...}</span> | <span class="hljs-literal">false</span> （最新api变动，原来是ture|<span class="hljs-literal">false</span> 感谢@onmi指正)
  hash:是否hash化 <span class="hljs-literal">true</span> <span class="hljs-literal">false</span> ,     
  cache:是否缓存,   
  showErrors:是否显示错误,  
  chunks:目前没太明白  
  xhtml:是否自动毕业标签 默认<span class="hljs-literal">false</span>  </code></pre>
<h3 id="articleHeader3">3. 提取样式插件</h3>
<p>extract-text-webpack-plugin</p>
<blockquote><p>官网是这么解释的<code>Extract text from bundle into a file.</code>,把额外的数据加到编译好的文件中</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);
module.exports = {
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract(&quot;style-loader&quot;, &quot;css-loader&quot;) }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
                template: './src/public/index.html',
                inject: 'body'
            }),
        new ExtractTextPlugin(&quot;[name].[hash].css&quot;)
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"extract-text-webpack-plugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-keyword">module</span>: {
        loaders: [
            { test: <span class="hljs-regexp">/\.css$/</span>, loader: ExtractTextPlugin.extract(<span class="hljs-string">"style-loader"</span>, <span class="hljs-string">"css-loader"</span>) }
        ]
    },
    plugins: [
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
                template: <span class="hljs-string">'./src/public/index.html'</span>,
                inject: <span class="hljs-string">'body'</span>
            }),
        <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">"[name].[hash].css"</span>)
    ]
}</code></pre>
<p>说明：将css放到index.html的body上面</p>
<h3 id="articleHeader4">4. 拷贝资源插件</h3>
<p>copy-webpack-plugin</p>
<blockquote><p>官方这样解释 <code>Copy files and directories in webpack</code>,在webpack中拷贝文件和文件夹</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install --save-dev copy-webpack-plugin

new CopyWebpackPlugin([{
    from: __dirname + '/src/public'
}])," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>cnpm install --save-dev <span class="hljs-keyword">copy</span><span class="bash">-webpack-plugin
</span>
new CopyWebpackPlugin([{
    <span class="hljs-keyword">from</span>: __dirname + <span class="hljs-string">'/src/public'</span>
}]),</code></pre>
<blockquote><p>作用：把public 里面的内容全部拷贝到编译目录</p></blockquote>
<table>
<thead><tr>
<th align="center">参数</th>
<th align="center">作用</th>
<th align="center">其他说明</th>
</tr></thead>
<tbody>
<tr>
<td align="center">from</td>
<td align="center">定义要拷贝的源目录</td>
<td align="center">from: __dirname + '/src/public'</td>
</tr>
<tr>
<td align="center">to</td>
<td align="center">定义要烤盘膛的目标目录</td>
<td align="center">from: __dirname + '/dist'</td>
</tr>
<tr>
<td align="center">toType</td>
<td align="center">
<code>file</code> 或者 <code>dir</code>
</td>
<td align="center">可选，默认是文件</td>
</tr>
<tr>
<td align="center">force</td>
<td align="center">强制覆盖先前的插件</td>
<td align="center">可选 默认false</td>
</tr>
<tr>
<td align="center">context</td>
<td align="center">不知道作用</td>
<td align="center">可选 默认 base context 可用  specific context</td>
</tr>
<tr>
<td align="center">flatten</td>
<td align="center">只拷贝文件不管文件夹</td>
<td align="center">默认是false</td>
</tr>
<tr>
<td align="center">ignore</td>
<td align="center">忽略拷贝指定的文件</td>
<td align="center">可以用模糊匹配</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader5">5. 全局挂载插件</h3>
<p>webpack.ProvidePlugin [webpack内置插件 ]</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.ProvidePlugin({
    $: &quot;jquery&quot;,
    jQuery: &quot;jquery&quot;,
    &quot;window.jQuery&quot;: &quot;jquery&quot;
}))
new webpack.NoErrorsPlugin(),
new webpack.optimize.DedupePlugin(),
new webpack.optimize.UglifyJsPlugin(),
new webpack.optimize.CommonsChunkPlugin('common.js')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>new webpack.ProvidePlugin({
    $: <span class="hljs-string">"jquery"</span>,
    jQuery: <span class="hljs-string">"jquery"</span>,
    <span class="hljs-string">"window.jQuery"</span>: <span class="hljs-string">"jquery"</span>
}))
new webpack.NoErrorsPlugin(),
new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.DedupePlugin</span>(),
new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.UglifyJsPlugin</span>(),
new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.CommonsChunkPlugin</span>(<span class="hljs-string">'common.js'</span>)</code></pre>
<p>作用: 和上面5个一一对应</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  当模块使用这些变量的时候,wepback会自动加载。（区别于window挂载，感谢@lihuanghe121指正）
  不显示错误插件
  查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
  丑化js 混淆代码而用
  提取公共代码的插件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>  当模块使用这些变量的时候,wepback会自动加载。（区别于<span class="hljs-built_in">window</span>挂载，感谢@lihuanghe121指正）
  不显示错误插件
  查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
  丑化js 混淆代码而用
  提取公共代码的插件</code></pre>
<h2 id="articleHeader6">二、一个完整的栗子</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
    var config = {};

    config.entry = isTest ? {} : {
        app: './src/app/app.js'
    };

    config.output = isTest ? {} : {
        // Absolute output directory
        path: __dirname + '/dist',

        publicPath: isProd ? '/' : 'http://localhost:8080/',

        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

        chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
    };

    if (isTest) {
        config.devtool = 'inline-source-map';
    } else if (isProd) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'eval-source-map';
    }

    config.module = {
        preLoaders: [],
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css/,
            loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file'
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.scss/,
            loader: 'style!css!sass'
        }, {
            test: /\.html$/,
            loader: 'raw'
        }]
    };
    if (isTest) {
        config.module.preLoaders.push({
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\.spec\.js$/
            ],
            loader: 'isparta-instrumenter'
        })
    }

    config.postcss = [
        autoprefixer({
            browsers: ['last 2 version']
        })
    ];

    config.plugins = [];
    if (!isTest) {
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: './src/public/index.html',
                inject: 'body'
            }),

            new ExtractTextPlugin('[name].[hash].css', {disable: !isProd})
        )
    }

    if (isProd) {
        config.plugins.push(
            new webpack.NoErrorsPlugin(),

            new webpack.optimize.DedupePlugin(),

            new webpack.optimize.UglifyJsPlugin(),

            new CopyWebpackPlugin([{
                from: __dirname + '/src/public'
            }]),
            new webpack.ProvidePlugin({
                $: &quot;jquery&quot;,
                jQuery: &quot;jquery&quot;,
                &quot;window.jQuery&quot;: &quot;jquery&quot;
            }))
    }

    config.devServer = {
        contentBase: './src/public',
        stats: 'minimal'
    };

    return config;
}();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>;

<span class="hljs-comment">// Modules</span>
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> autoprefixer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>);
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
<span class="hljs-keyword">var</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>);

<span class="hljs-comment">/**
 * Env
 * Get npm lifecycle event to identify the environment
 */</span>
<span class="hljs-keyword">var</span> ENV = process.env.npm_lifecycle_event;
<span class="hljs-keyword">var</span> isTest = ENV === <span class="hljs-string">'test'</span> || ENV === <span class="hljs-string">'test-watch'</span>;
<span class="hljs-keyword">var</span> isProd = ENV === <span class="hljs-string">'build'</span>;

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeWebpackConfig</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> config = {};

    config.entry = isTest ? {} : {
        <span class="hljs-attr">app</span>: <span class="hljs-string">'./src/app/app.js'</span>
    };

    config.output = isTest ? {} : {
        <span class="hljs-comment">// Absolute output directory</span>
        path: __dirname + <span class="hljs-string">'/dist'</span>,

        <span class="hljs-attr">publicPath</span>: isProd ? <span class="hljs-string">'/'</span> : <span class="hljs-string">'http://localhost:8080/'</span>,

        <span class="hljs-attr">filename</span>: isProd ? <span class="hljs-string">'[name].[hash].js'</span> : <span class="hljs-string">'[name].bundle.js'</span>,

        <span class="hljs-attr">chunkFilename</span>: isProd ? <span class="hljs-string">'[name].[hash].js'</span> : <span class="hljs-string">'[name].bundle.js'</span>
    };

    <span class="hljs-keyword">if</span> (isTest) {
        config.devtool = <span class="hljs-string">'inline-source-map'</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isProd) {
        config.devtool = <span class="hljs-string">'source-map'</span>;
    } <span class="hljs-keyword">else</span> {
        config.devtool = <span class="hljs-string">'eval-source-map'</span>;
    }

    config.module = {
        <span class="hljs-attr">preLoaders</span>: [],
        <span class="hljs-attr">loaders</span>: [{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
            <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
        }, {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css/</span>,
            <span class="hljs-attr">loader</span>: isTest ? <span class="hljs-string">'null'</span> : ExtractTextPlugin.extract(<span class="hljs-string">'style'</span>, <span class="hljs-string">'css?sourceMap!postcss'</span>)
        }, {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/</span>,
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'file'</span>
        }, {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.json$/</span>,
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'json'</span>
        }, {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss/</span>,
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'style!css!sass'</span>
        }, {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.html$/</span>,
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'raw'</span>
        }]
    };
    <span class="hljs-keyword">if</span> (isTest) {
        config.module.preLoaders.push({
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
            <span class="hljs-attr">exclude</span>: [
                <span class="hljs-regexp">/node_modules/</span>,
                /\.spec\.js$/
            ],
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'isparta-instrumenter'</span>
        })
    }

    config.postcss = [
        autoprefixer({
            <span class="hljs-attr">browsers</span>: [<span class="hljs-string">'last 2 version'</span>]
        })
    ];

    config.plugins = [];
    <span class="hljs-keyword">if</span> (!isTest) {
        config.plugins.push(
            <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
                <span class="hljs-attr">template</span>: <span class="hljs-string">'./src/public/index.html'</span>,
                <span class="hljs-attr">inject</span>: <span class="hljs-string">'body'</span>
            }),

            <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'[name].[hash].css'</span>, {<span class="hljs-attr">disable</span>: !isProd})
        )
    }

    <span class="hljs-keyword">if</span> (isProd) {
        config.plugins.push(
            <span class="hljs-keyword">new</span> webpack.NoErrorsPlugin(),

            <span class="hljs-keyword">new</span> webpack.optimize.DedupePlugin(),

            <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin(),

            <span class="hljs-keyword">new</span> CopyWebpackPlugin([{
                <span class="hljs-attr">from</span>: __dirname + <span class="hljs-string">'/src/public'</span>
            }]),
            <span class="hljs-keyword">new</span> webpack.ProvidePlugin({
                <span class="hljs-attr">$</span>: <span class="hljs-string">"jquery"</span>,
                <span class="hljs-attr">jQuery</span>: <span class="hljs-string">"jquery"</span>,
                <span class="hljs-string">"window.jQuery"</span>: <span class="hljs-string">"jquery"</span>
            }))
    }

    config.devServer = {
        <span class="hljs-attr">contentBase</span>: <span class="hljs-string">'./src/public'</span>,
        <span class="hljs-attr">stats</span>: <span class="hljs-string">'minimal'</span>
    };

    <span class="hljs-keyword">return</span> config;
}();
</code></pre>
<h2 id="articleHeader7">三、调试技巧</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (isTest) {
    config.devtool = 'inline-source-map';
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">if</span> (isTest) {
    <span class="hljs-built_in">config</span>.devtool = <span class="hljs-string">'inline-source-map'</span>;
} </code></pre>
<blockquote><p>作用: 使用source-map可以在debug的时候看到源代码，方便 查错</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack进阶之插件篇

## 原文链接
[https://segmentfault.com/a/1190000005742122](https://segmentfault.com/a/1190000005742122)


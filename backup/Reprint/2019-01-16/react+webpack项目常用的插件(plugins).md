---
title: 'react+webpack项目常用的插件(plugins)' 
date: 2019-01-16 2:30:08
hidden: true
slug: 4nuir2gxr65
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>一、HtmlWebpackPlugin使用：</strong></h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install html-webpack-plugin --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> html-webpack-<span class="hljs-keyword">plugin</span> <span class="hljs-comment">--save-dev</span></code></pre>
<p>解释：这个插件是简化创建生成html（h5）文件用的，如果你引入的文件带有hash值的话，这个尤为的有用，不需要手动去更改引入的文件名！</p>
<p>默认生成的是index.html,基本用法为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var HtmlWebpackPlugin</span> = require(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-attribute">var webpackConfig</span> = {
  entry: <span class="hljs-string">'index.js'</span>,
  output: {
    path: <span class="hljs-string">'dist'</span>,
    filename: <span class="hljs-string">'index_bundle.js'</span>
  },
  plugins: [new HtmlWebpackPlugin()]
};</code></pre>
<blockquote><p>js通过script的标签引入到body中！<br>如果你使用了ExtractTextPlugin来提取css，将通过link在head中引入！</p></blockquote>
<p>一般配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="title: 用于生成的HTML文档的标题,也就是html，head中`<title>ceshi</title>`
filename: 生成的文件名，default index.html
template: 模版（填写相对路径，与配置文件的相对路径，例如：'./index.html'
hash: 增加hash值，使每次生成的都是唯一的不重复的
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">title</span>: 用于生成的HTML文档的标题,也就是html，head中<span class="hljs-built_in">`&lt;title&gt;ceshi&lt;/title&gt;`</span>
<span class="hljs-attribute">filename</span>: 生成的文件名，default index.html
<span class="hljs-attribute">template</span>: 模版（填写相对路径，与配置文件的相对路径，例如：<span class="hljs-string">'./index.html'</span>
<span class="hljs-attribute">hash</span>: 增加hash值，使每次生成的都是唯一的不重复的
</code></pre>
<h2 id="articleHeader1"><strong>二、ExtractTextWebpackPlugin 分离我们的样式文件，例如css,sass,less</strong></h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev extract-text-webpack-plugin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-dev extract-<span class="hljs-built_in">text</span>-webpack-plugin</code></pre>
<p>基本用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: &quot;style-loader&quot;,
          use: &quot;css-loader&quot;
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(&quot;styles.css&quot;),
     //输出在根目录上，也可以这样写css/styles.css
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>const ExtractTextPlugin = require(<span class="hljs-string">"extract-text-webpack-plugin"</span>);

module.exports = {
<span class="hljs-symbol">  module:</span> {
<span class="hljs-symbol">    rules:</span> [
      {
<span class="hljs-symbol">        test:</span> /\.css$/,
<span class="hljs-symbol">        use:</span> ExtractTextPlugin.extract({
<span class="hljs-symbol">          fallback:</span> <span class="hljs-string">"style-loader"</span>,
<span class="hljs-symbol">          use:</span> <span class="hljs-string">"css-loader"</span>
        })
      }
    ]
  },
<span class="hljs-symbol">  plugins:</span> [
    new ExtractTextPlugin(<span class="hljs-string">"styles.css"</span>),
     <span class="hljs-comment">//输出在根目录上，也可以这样写css/styles.css</span>
  ]
}</code></pre>
<blockquote><p>其中plugins中的参数配置有：（string/object） id: 插件实例的唯一标识，默认情况下是自动生成的，不建议设置<br>filename: 生成文件的名称，可以包含[name], [id] and [contenthash]<br>allChunks：(bollean) 从所有附加块中提取（默认情况下，它仅从初始块中提取）</p></blockquote>
<blockquote><p>rules里面的参数配置有：（loader | object) options.use :<br>{String}/{Array}/{Object} 使用的编译loader options.fallback :<br>{String}/{Array}/{Object} 当css没有被提取的时候,可以当作保守用 options.publicPath :<br>可以覆盖output里的publickPath</p></blockquote>
<p>如果想生成多个css文件的话，可以这样写:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('css/[name]-one.css');
const extractLESS = new ExtractTextPlugin('css/[name]-two.css');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
      },
      {
        test: /\.less$/i,
        use: extractLESS.extract([ 'css-loader', 'less-loader' ])
      },
    ]
  },
  plugins: [
    extractCSS,  //两个实例
    extractLESS
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);

<span class="hljs-keyword">const</span> extractCSS = <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'css/[name]-one.css'</span>);
<span class="hljs-keyword">const</span> extractLESS = <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'css/[name]-two.css'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.css$/</span>,
        use: extractCSS.extract([ <span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'postcss-loader'</span> ])
      },
      {
        test: <span class="hljs-regexp">/\.less$/i</span>,
        use: extractLESS.extract([ <span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'less-loader'</span> ])
      },
    ]
  },
  plugins: [
    extractCSS,  <span class="hljs-comment">//两个实例</span>
    extractLESS
  ]
};</code></pre>
<h2 id="articleHeader2"><strong>三、DefinePlugin 定义变量</strong></h2>
<p>允许我们创建可在编译时配置的全局常量，这对与需要灵活配置的项目而言非常的重要，举个例子：<br>开发中我们需要devtool来查看redux树中stroe中的变量，但是生产环境中不需要，那么就可以这样定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const nodeEnv = process.env.NODE_ENV || 'development';
const isPro = nodeEnv === 'production';
new webpack.DefinePlugin({
    &quot;__dev__&quot;: JSON.stringify(isPro) 
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> nodeEnv = <span class="hljs-built_in">process</span>.env.NODE_ENV || <span class="hljs-string">'development'</span>;
<span class="hljs-keyword">const</span> isPro = nodeEnv === <span class="hljs-string">'production'</span>;
<span class="hljs-keyword">new</span> webpack.DefinePlugin({
    <span class="hljs-string">"__dev__"</span>: JSON.stringify(isPro) 
})</code></pre>
<p>那么在开发环境中__dev__为false，<br>打包的时候可以在CLI中输入NODE_ENV=production   这样__dev__就为true;</p>
<h2 id="articleHeader3"><strong>四、ProvidePlugin 提供识别码</strong></h2>
<p>通俗点讲就是使用一些字符代替复杂的字符，例如我想用 $ 代表 jquery, 那么就可以使用这个插件，或着我想用 'av' 代表 './ateon/values' 这个路径，也可以使用这个插件。</p>
<p>基本用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'av' : './ateon/values'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">new</span> webpack.ProvidePlugin({
  $: <span class="hljs-string">'jquery'</span>,
  jQuery: <span class="hljs-string">'jquery'</span>,
  <span class="hljs-string">'av'</span> : <span class="hljs-string">'./ateon/values'</span>
})</code></pre>
<p>在模块中使用，<code>import lives from 'av' === import lives from './ateon/values'</code></p>
<h2 id="articleHeader4"><strong>五、clean-webpack-plugin 清除你的build目录</strong></h2>
<p>基本用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CleanWebpackPlugin = require('clean-webpack-plugin')

// webpack config
{
  plugins: [
    new CleanWebpackPlugin(paths [, {options}])
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'clean-webpack-plugin'</span>)

<span class="hljs-comment">// webpack config</span>
{
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> CleanWebpackPlugin(paths [, {options}])
  ]
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[, {options}]为可选参数
`path` An [array] of string
options 参数
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>[, {options}]为可选参数
`path` An [array] <span class="hljs-keyword">of</span> string
options 参数
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
root: __dirname,默认根目录，也就是你的package的路径（绝对路径）
verbose: true, 在控制台console日志
dry: false, 默认为false，删除所有的文件， 为true时，模拟删除，并不删除文件
watch: false, 默认false， 为true时删除所有的编译文件
exclude: [ 'files', 'to', 'ignore' ] 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>{
<span class="hljs-string">root:</span> __dirname,默认根目录，也就是你的<span class="hljs-keyword">package</span>的路径（绝对路径）
<span class="hljs-string">verbose:</span> <span class="hljs-literal">true</span>, 在控制台console日志
<span class="hljs-string">dry:</span> <span class="hljs-literal">false</span>, 默认为<span class="hljs-literal">false</span>，删除所有的文件， 为<span class="hljs-literal">true</span>时，模拟删除，并不删除文件
<span class="hljs-string">watch:</span> <span class="hljs-literal">false</span>, 默认<span class="hljs-literal">false</span>， 为<span class="hljs-literal">true</span>时删除所有的编译文件
<span class="hljs-string">exclude:</span> [ <span class="hljs-string">'files'</span>, <span class="hljs-string">'to'</span>, <span class="hljs-string">'ignore'</span> ] 
}</code></pre>
<p>一般这一项我们都使用默认值，不去设置，只需要设置path就可以了！</p>
<p>总结，常用的就是这些了，后续还会在陆续的加入。。。其他相关插件！</p>
<blockquote><p>再次跟新一个插件，也是业务需求，将公用代码块独立打包，（六）</p></blockquote>
<h2 id="articleHeader5"><strong>六、CommonsChunkPlugin 公用模块独立打包</strong></h2>
<p>说到这个，可以说很多用webpack项目的都会使用到这一插件，可以提升些许编译的速度。直接上demo吧！首先假设是一个react-webpack项目，那必然每次新建js的时候都会</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React,{PropTypes} from 'react';
import {ReactDOM} from 'react-dom';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> React,{PropTypes} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> {ReactDOM} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;</code></pre>
<p>将react和reactdom独立打包到一个文件，配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
      index: ‘main.js’,
      vendor : ['react', 'react-dom']  
},
output: {
    chunkFilename:&quot;[name].[hash:8].js&quot;, //用hash解决缓存的问题，
}


plugins： [
new CommonsChunkPlugin({ //对指定的chunks进行公共模块的提取 多个 html共用一个js文件(chunk)，可用CommonsChunkPlugin
        names: ['vendor', 'manifest'],
}),
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">entry:</span> {
<span class="hljs-symbol">      index:</span> ‘main.js’,
      <span class="hljs-string">vendor :</span> [<span class="hljs-string">'react'</span>, <span class="hljs-string">'react-dom'</span>]  
},
<span class="hljs-string">output:</span> {
<span class="hljs-symbol">    chunkFilename:</span><span class="hljs-string">"[name].[hash:8].js"</span>, <span class="hljs-comment">//用hash解决缓存的问题，</span>
}


plugins： [
<span class="hljs-keyword">new</span> CommonsChunkPlugin({ <span class="hljs-comment">//对指定的chunks进行公共模块的提取 多个 html共用一个js文件(chunk)，可用CommonsChunkPlugin</span>
<span class="hljs-symbol">        names:</span> [<span class="hljs-string">'vendor'</span>, <span class="hljs-string">'manifest'</span>],
}),
]</code></pre>
<p>这个<code>names</code>是一个数组，<code>vendor</code>对应的是<code>entry</code>上面的键值，必须一致，打包后就会在cli(命令行)中看到多一个<code>vendor.js</code>文件，如果启动文件必须先引入这个js才行，否则会报错！</p>
<p>那么这个<code>manifest</code>是为了解决<code>vendor</code>再次编译的问题，如果只是写了<code>names:vendor</code>，你可以仔细检查<code>vendor</code>后面的<code>hash</code>值的变化，在热更新的时候，每次更改js文件，都会重新编译，vendor也会重新编译(看看hash就知道了)，按理说应该是不会更改了，因为我们就是用这个插件去解决公用代码库不用每次都打包，提升编译速度的！解决的方案就是加一个这个，目前我也在找原因，找到了会及时过来更新的！</p>
<p>这个还有其他的参数配置，这里稍微解释一下参数的配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
name: string,//or   names: Array 对应entry上的键值
filename: string    生成文件的名字，如果没有默认为输出文件名
minChunks: number|Infinity  模块被引用的次数多少才会被独立打包>=2
chunks: 表示需要在哪些chunk（也可以理解为webpack配置中entry的每一项）里寻找公共代码进行打包。不设置此参数则默认提取范围为所有的chunk
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>{
name: <span class="hljs-built_in">string</span>,//<span class="hljs-built_in">or</span>   name<span class="hljs-variable">s:</span> Array 对应entry上的键值
filename: <span class="hljs-built_in">string</span>    生成文件的名字，如果没有默认为输出文件名
minChunk<span class="hljs-variable">s:</span> <span class="hljs-keyword">number</span>|Infinity  模块被引用的次数多少才会被独立打包&gt;=<span class="hljs-number">2</span>
chunk<span class="hljs-variable">s:</span> 表示需要在哪些chunk（也可以理解为webpack配置中entry的每一项）里寻找公共代码进行打包。不设置此参数则默认提取范围为所有的chunk
}</code></pre>
<p>一般配置选项就是上面这些，</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react+webpack项目常用的插件(plugins)

## 原文链接
[https://segmentfault.com/a/1190000009120632](https://segmentfault.com/a/1190000009120632)


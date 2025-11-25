---
title: 'webpack多入口文件配置模板' 
date: 2019-01-31 2:31:16
hidden: true
slug: 74d4ozsps1w
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">概述</h2>
<p>本篇文章是目前多入口项目中使用的配置文件，配置文件匹配<a href="https://segmentfault.com/a/1190000006031855">目录规范</a>使用。</p>
<h2 id="articleHeader1">初始设置</h2>
<p>package.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;hot&quot;: &quot;set NODE_ENV=hotdev&amp;&amp;webpack-dev-server --inline --hot --colors --host 127.0.1.1 --port 80&quot;,
    &quot;dev&quot;: &quot;set NODE_ENV=development&amp;&amp;webpack --progress --colors&quot;,
    &quot;product&quot;: &quot;set NODE_ENV=production&amp;&amp;webpack --progress --colors&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-attr">"hot"</span>: <span class="hljs-string">"set NODE_ENV=hotdev&amp;&amp;webpack-dev-server --inline --hot --colors --host 127.0.1.1 --port 80"</span>,
    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"set NODE_ENV=development&amp;&amp;webpack --progress --colors"</span>,
    <span class="hljs-attr">"product"</span>: <span class="hljs-string">"set NODE_ENV=production&amp;&amp;webpack --progress --colors"</span>
  },</code></pre>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 判断生产&amp;&amp;测试环境
var isProduction = function() {
    return process.env.NODE_ENV ==='production';
};

// 判断开发(热加载)环境
var isHot = function() {
    return process.env.NODE_ENV === 'hotdev';
};

// 不同环境输出到不同文件夹
var sEnvironment = function() {
    switch(process.env.NODE_ENV){
        case 'hotdev':
            return '/hot/';
        case 'production':
            return '/dist/';
        default:
            return '/dev/';
    }
};

// 运行终端: 'mobile/'表示微信端;'basic/'表示PC端
// 项目原因有两套配置文件
var sSystem = 'basic/';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 判断生产&amp;&amp;测试环境</span>
<span class="hljs-keyword">var</span> isProduction = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> process.env.NODE_ENV ===<span class="hljs-string">'production'</span>;
};

<span class="hljs-comment">// 判断开发(热加载)环境</span>
<span class="hljs-keyword">var</span> isHot = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> process.env.NODE_ENV === <span class="hljs-string">'hotdev'</span>;
};

<span class="hljs-comment">// 不同环境输出到不同文件夹</span>
<span class="hljs-keyword">var</span> sEnvironment = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">switch</span>(process.env.NODE_ENV){
        <span class="hljs-keyword">case</span> <span class="hljs-string">'hotdev'</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">'/hot/'</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'production'</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">'/dist/'</span>;
        <span class="hljs-keyword">default</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">'/dev/'</span>;
    }
};

<span class="hljs-comment">// 运行终端: 'mobile/'表示微信端;'basic/'表示PC端</span>
<span class="hljs-comment">// 项目原因有两套配置文件</span>
<span class="hljs-keyword">var</span> sSystem = <span class="hljs-string">'basic/'</span>;</code></pre>
<h2 id="articleHeader2">需要安装的插件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack           = require('webpack');
var path              = require('path');
var glob              = require('glob');
var precss            = require('precss');
var autoprefixer      = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> webpack           = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> path              = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> glob              = <span class="hljs-built_in">require</span>(<span class="hljs-string">'glob'</span>);
<span class="hljs-keyword">var</span> precss            = <span class="hljs-built_in">require</span>(<span class="hljs-string">'precss'</span>);
<span class="hljs-keyword">var</span> autoprefixer      = <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>);
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);</code></pre>
<h2 id="articleHeader3">获取多入口文件方法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getEntry() {
    var entry = {};
    var nLength = sSystem.length - 1;
    var srcDirName = './src/ovdream/'+sSystem+'*/*/*.js'; //需要获取的文件路径
    
    glob.sync(srcDirName).forEach(function (name) {
        //name:./src/ovdream/basic/member/index/index.js
        
        //裁剪路径
        var n = name.slice(name.lastIndexOf(sSystem) + nLength, name.length - 3);
        //n:/member/index/index
        n = n.slice(0, n.lastIndexOf('/'));
        //n:/member/index
        
        entry[n] = name;
        
        if(sSystem==='mobile/'){
            //此处可引入第三方库文件等需要打包成公共模块的文件
            entry['vendor/vendor']=['./src/ovdream/global/global.css'];
        }else{
            entry['vendor/vendor']=['./src/ovdream/global/global.js','./src/libs/layer/need/layer.css',;
        }
    });
    console.log('是否压缩文件：'+isProduction());
    console.log('输出路径：'+sEnvironment()+'ovdream/'+sSystem);
    return entry;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getEntry</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> entry = {};
    <span class="hljs-keyword">var</span> nLength = sSystem.length - <span class="hljs-number">1</span>;
    <span class="hljs-keyword">var</span> srcDirName = <span class="hljs-string">'./src/ovdream/'</span>+sSystem+<span class="hljs-string">'*/*/*.js'</span>; <span class="hljs-comment">//需要获取的文件路径</span>
    
    glob.sync(srcDirName).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name</span>) </span>{
        <span class="hljs-comment">//name:./src/ovdream/basic/member/index/index.js</span>
        
        <span class="hljs-comment">//裁剪路径</span>
        <span class="hljs-keyword">var</span> n = name.slice(name.lastIndexOf(sSystem) + nLength, name.length - <span class="hljs-number">3</span>);
        <span class="hljs-comment">//n:/member/index/index</span>
        n = n.slice(<span class="hljs-number">0</span>, n.lastIndexOf(<span class="hljs-string">'/'</span>));
        <span class="hljs-comment">//n:/member/index</span>
        
        entry[n] = name;
        
        <span class="hljs-keyword">if</span>(sSystem===<span class="hljs-string">'mobile/'</span>){
            <span class="hljs-comment">//此处可引入第三方库文件等需要打包成公共模块的文件</span>
            entry[<span class="hljs-string">'vendor/vendor'</span>]=[<span class="hljs-string">'./src/ovdream/global/global.css'</span>];
        }<span class="hljs-keyword">else</span>{
            entry[<span class="hljs-string">'vendor/vendor'</span>]=[<span class="hljs-string">'./src/ovdream/global/global.js'</span>,<span class="hljs-string">'./src/libs/layer/need/layer.css'</span>,;
        }
    });
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'是否压缩文件：'</span>+isProduction());
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'输出路径：'</span>+sEnvironment()+<span class="hljs-string">'ovdream/'</span>+sSystem);
    <span class="hljs-keyword">return</span> entry;
}</code></pre>
<h2 id="articleHeader4">配置</h2>
<p><strong>别名</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var alias={};
if(sSystem==='mobile/'){
    alias={
        'layer': 'layer_mobile/layer',
        'layercss': 'layer_mobile/need/layer',
    };
}else{
    alias={
        'layer': 'layer/layer',
        'layercss': 'layer/need/layer',
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> alias={};
<span class="hljs-keyword">if</span>(sSystem===<span class="hljs-string">'mobile/'</span>){
    alias={
        <span class="hljs-string">'layer'</span>: <span class="hljs-string">'layer_mobile/layer'</span>,
        <span class="hljs-string">'layercss'</span>: <span class="hljs-string">'layer_mobile/need/layer'</span>,
    };
}<span class="hljs-keyword">else</span>{
    alias={
        <span class="hljs-string">'layer'</span>: <span class="hljs-string">'layer/layer'</span>,
        <span class="hljs-string">'layercss'</span>: <span class="hljs-string">'layer/need/layer'</span>,
    };
}</code></pre>
<p><strong>插件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var plugins = [
    //提供全局的变量，在模块中使用无需用require引入
    new webpack.ProvidePlugin({
        jQuery: &quot;jquery&quot;,
        $: &quot;jquery&quot;,
        &quot;window.jQuery&quot;: &quot;jquery&quot;
    }),
    //提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor/vendor',
        filename: '[name].min.js',
        //开发模式时不提取公共模块
        minChunks: isProduction() ? 10 : false
    }),
    //单独打包css
    new ExtractTextPlugin('[name].min.css'),
];
if (isProduction()) {
    plugins.push(
        //文件压缩/混淆
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: {
                except: ['$', 'webpackJsonpCallback']
            }
        })
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> plugins = [
    <span class="hljs-comment">//提供全局的变量，在模块中使用无需用require引入</span>
    <span class="hljs-keyword">new</span> webpack.ProvidePlugin({
        <span class="hljs-attr">jQuery</span>: <span class="hljs-string">"jquery"</span>,
        <span class="hljs-attr">$</span>: <span class="hljs-string">"jquery"</span>,
        <span class="hljs-string">"window.jQuery"</span>: <span class="hljs-string">"jquery"</span>
    }),
    <span class="hljs-comment">//提取公共模块</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
        <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor/vendor'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].min.js'</span>,
        <span class="hljs-comment">//开发模式时不提取公共模块</span>
        minChunks: isProduction() ? <span class="hljs-number">10</span> : <span class="hljs-literal">false</span>
    }),
    <span class="hljs-comment">//单独打包css</span>
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'[name].min.css'</span>),
];
<span class="hljs-keyword">if</span> (isProduction()) {
    plugins.push(
        <span class="hljs-comment">//文件压缩/混淆</span>
        <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
            <span class="hljs-attr">compress</span>: {
                <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
            },
            <span class="hljs-attr">mangle</span>: {
                <span class="hljs-attr">except</span>: [<span class="hljs-string">'$'</span>, <span class="hljs-string">'webpackJsonpCallback'</span>]
            }
        })
    );
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: getEntry(),//入口文件
    output: {
        path: path.join(__dirname,sEnvironment()+'ovdream/'+sSystem),
        /**
        用于配置文件发布路径；
        开发&amp;测试&amp;生产环境为'../'，加载路径动态获取
        热加载环境时配置域名及输出文件夹
        在入口文件中配置__webpack_public_path__（一般配置在vendor文件中）
        **/
        publicPath:isHot()?('http://common.statics.ovdream.com'+sEnvironment()+'ovdream/'+sSystem):'../',
        filename:'[name].min.js',
        //异步加载文件命名，hash值避免重命名
        chunkFilename: '[name].[chunkhash:8].js'
    },
    resolve: {
        extensions: ['', '.js', '.json', '.css'],//自动扩展文件后缀
        root: [//设置alias文件引用根目录
            path.resolve('./src/libs')
        ],
        alias:alias
    },
    module: {
        loaders:[
            { test: /\.css$/,  loader:ExtractTextPlugin.extract('style-loader','css-loader?sourceMap!postcss-loader')},
            { test: /\.(png|jpg|gif|svg)$/, loader: 'url-loader?limit=8192&amp;name=image/[name].[ext]'},
            {
               test: /\.(eot|ttf|woff)$/i,
               loader: 'url?limit=10000&amp;name=fonts/[name].[ext]'
            }
        ]
    },
    postcss: function() {
        if(sSystem==='mobile/'){
            return [
                precss,
                autoprefixer({ browsers: ['>5%', 'ios 7', 'ios 8'] })
            ];
        }else{
            return [
                precss,
                autoprefixer({ browsers: '>5%'})
            ];
        }
    },
    //外部变量jQuery，在页面script引入
    externals:{
        jquery:'jQuery'
    },
    plugins: plugins,
    //生产模式时关闭sourece-map模式
    devtool: isProduction()?null:'source-map',
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: getEntry(),<span class="hljs-comment">//入口文件</span>
    output: {
        <span class="hljs-attr">path</span>: path.join(__dirname,sEnvironment()+<span class="hljs-string">'ovdream/'</span>+sSystem),
        <span class="hljs-comment">/**
        用于配置文件发布路径；
        开发&amp;测试&amp;生产环境为'../'，加载路径动态获取
        热加载环境时配置域名及输出文件夹
        在入口文件中配置__webpack_public_path__（一般配置在vendor文件中）
        **/</span>
        publicPath:isHot()?(<span class="hljs-string">'http://common.statics.ovdream.com'</span>+sEnvironment()+<span class="hljs-string">'ovdream/'</span>+sSystem):<span class="hljs-string">'../'</span>,
        <span class="hljs-attr">filename</span>:<span class="hljs-string">'[name].min.js'</span>,
        <span class="hljs-comment">//异步加载文件命名，hash值避免重命名</span>
        chunkFilename: <span class="hljs-string">'[name].[chunkhash:8].js'</span>
    },
    <span class="hljs-attr">resolve</span>: {
        <span class="hljs-attr">extensions</span>: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.json'</span>, <span class="hljs-string">'.css'</span>],<span class="hljs-comment">//自动扩展文件后缀</span>
        root: [<span class="hljs-comment">//设置alias文件引用根目录</span>
            path.resolve(<span class="hljs-string">'./src/libs'</span>)
        ],
        <span class="hljs-attr">alias</span>:alias
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>:[
            { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,  <span class="hljs-attr">loader</span>:ExtractTextPlugin.extract(<span class="hljs-string">'style-loader'</span>,<span class="hljs-string">'css-loader?sourceMap!postcss-loader'</span>)},
            { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpg|gif|svg)$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader?limit=8192&amp;name=image/[name].[ext]'</span>},
            {
               <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(eot|ttf|woff)$/i</span>,
               <span class="hljs-attr">loader</span>: <span class="hljs-string">'url?limit=10000&amp;name=fonts/[name].[ext]'</span>
            }
        ]
    },
    <span class="hljs-attr">postcss</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span>(sSystem===<span class="hljs-string">'mobile/'</span>){
            <span class="hljs-keyword">return</span> [
                precss,
                autoprefixer({ <span class="hljs-attr">browsers</span>: [<span class="hljs-string">'&gt;5%'</span>, <span class="hljs-string">'ios 7'</span>, <span class="hljs-string">'ios 8'</span>] })
            ];
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">return</span> [
                precss,
                autoprefixer({ <span class="hljs-attr">browsers</span>: <span class="hljs-string">'&gt;5%'</span>})
            ];
        }
    },
    <span class="hljs-comment">//外部变量jQuery，在页面script引入</span>
    externals:{
        <span class="hljs-attr">jquery</span>:<span class="hljs-string">'jQuery'</span>
    },
    <span class="hljs-attr">plugins</span>: plugins,
    <span class="hljs-comment">//生产模式时关闭sourece-map模式</span>
    devtool: isProduction()?<span class="hljs-literal">null</span>:<span class="hljs-string">'source-map'</span>,
};</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack多入口文件配置模板

## 原文链接
[https://segmentfault.com/a/1190000007560814](https://segmentfault.com/a/1190000007560814)


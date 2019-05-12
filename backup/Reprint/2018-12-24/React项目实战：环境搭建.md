---
title: 'React项目实战：环境搭建' 
date: 2018-12-24 2:30:07
hidden: true
slug: w33bnr6hed
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>前面提到前端大统一的概念，如果感兴趣，欢迎说说自己的看法，<a href="https://segmentfault.com/a/1190000012150701">点击前往</a>。Web前端框架层出不穷，不可能面面俱到，这里给个小建议：</p>
<ul>
<li>如果对Weex App感兴趣，应该选择vue框架；</li>
<li>如果对React Native App感兴趣，应该选择React.js框架；</li>
</ul>
<p>本系列文章是React技术栈，Vue技术栈将会在本系列文章结束后陆续更新。</p>
<h1 id="articleHeader1">技术栈</h1>
<p>由于本系列的文章是项目实战，需要有相关的技术基础，可以到下方给出的链接进行深入学习。项目实战用到的主要框架和插件有：</p>
<ul>
<li>webpack：预编译模块打包工具。 <a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">官方文档</a> - <a href="https://doc.webpack-china.org/" rel="nofollow noreferrer" target="_blank">中文翻译</a>
</li>
<li>React：构建用户界面的JavaScript库。 <a href="https://reactjs.org/" rel="nofollow noreferrer" target="_blank">官方文档</a> - <a href="https://doc.react-china.org/" rel="nofollow noreferrer" target="_blank">中文翻译</a>
</li>
<li>Redux：管理整个应用的数据流。 <a href="https://redux.js.org/" rel="nofollow noreferrer" target="_blank">官方文档</a> - <a href="http://www.redux.org.cn/" rel="nofollow noreferrer" target="_blank">中文翻译</a>
</li>
<li>react-router：React应用路由库。 <a href="https://github.com/ReactTraining/react-router" rel="nofollow noreferrer" target="_blank">官方文档</a>
</li>
<li>styled-components：React中的CSS最佳实践。 <a href="https://www.styled-components.com/" rel="nofollow noreferrer" target="_blank">官方文档</a>
</li>
<li>isomorphic-fetch：fetch兼容库。 <a href="https://github.com/matthew-andrews/isomorphic-fetch" rel="nofollow noreferrer" target="_blank">官方文档</a>
</li>
<li>JRoll2：移动前端滑动插件。 <a href="http://www.chjtx.com/JRoll/" rel="nofollow noreferrer" target="_blank">官方文档</a>
</li>
<li>ECharts：基于html5 Canvas图表库。 <a href="http://echarts.baidu.com/" rel="nofollow noreferrer" target="_blank">官方文档</a>
</li>
</ul>
<p>建议学习时以官方文档为准，中文翻译或者第三方作者的教程可以帮助你理清思路；会用到的重要知识点我也会进行简明的解释，如遇到错误或者不理解的内容，欢迎实时指出。</p>
<h1 id="articleHeader2">环境搭建</h1>
<p>环境搭建是最为枯燥和最容易出错的地方，不过作为开发者，我们还是很有必要了解配置的具体步骤，在后面一段时间会发布一个简易版环境搭建教程。</p>
<blockquote><p>系统环境：Win10 + 关闭安全管家</p></blockquote>
<h2 id="articleHeader3">Node.js安装</h2>
<p>到官方网站下载安装包 <a href="https://nodejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">点击前往</a>，<code>选择LTS版本</code>（9.0以后的版本在安装styled-components时会报错）。</p>
<h2 id="articleHeader4">npm部署</h2>
<p>npm更新并部署至全局</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install npm  -g

#【可选】设置淘宝镜像
npm config set registry https://registry.npm.taobao.org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> install <span class="hljs-built_in">npm</span>  -g

<span class="hljs-comment">#【可选】设置淘宝镜像</span>
<span class="hljs-built_in">npm</span> config set registry https:<span class="hljs-regexp">//</span>registry.<span class="hljs-built_in">npm</span>.taobao.org</code></pre>
<p>npm常用命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init    #引导创建package.json文件
npm install ***    #本地安装；会在当前目录生成node_modules文件夹，并在此安装node模块
npm install *** -g    #全局安装；会在C:\Users\***\AppData\Roaming\npm\node_modules安装
npm install *** --save    #运行时依赖的模块；自动把模块和版本号添加到package.json文件dependencies部分
npm install *** --save-dev    #开发时依赖的模块；自动把模块和版本号添加到package.json文件devdependencies部分
npm update ***    #更新node模块
npm uninstall ***    #卸载node模块" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> init    <span class="hljs-comment">#引导创建package.json文件</span>
<span class="hljs-built_in">npm</span> install ***    <span class="hljs-comment">#本地安装；会在当前目录生成node_modules文件夹，并在此安装node模块</span>
<span class="hljs-built_in">npm</span> install *** -g    <span class="hljs-comment">#全局安装；会在C:\Users\***\AppData\Roaming\npm\node_modules安装</span>
<span class="hljs-built_in">npm</span> install *** --save    <span class="hljs-comment">#运行时依赖的模块；自动把模块和版本号添加到package.json文件dependencies部分</span>
<span class="hljs-built_in">npm</span> install *** --save-dev    <span class="hljs-comment">#开发时依赖的模块；自动把模块和版本号添加到package.json文件devdependencies部分</span>
<span class="hljs-built_in">npm</span> update ***    <span class="hljs-comment">#更新node模块</span>
<span class="hljs-built_in">npm</span> uninstall ***    <span class="hljs-comment">#卸载node模块</span></code></pre>
<h2 id="articleHeader5">创建package.json文件</h2>
<p>项目根目录：<code>D:\web\react-webapp-demo</code>，请根据自己实际情况设置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd D:\web\react-webapp-demo    #在PowerSell中打开项目目录
npm init -y    #跳过提问阶段，直接生成一个新的 package.json 文件。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-built_in">cd</span> D:\web\react-webapp-demo    <span class="hljs-comment">#在PowerSell中打开项目目录</span>
npm init -y    <span class="hljs-comment">#跳过提问阶段，直接生成一个新的 package.json 文件。</span>
</code></pre>
<h2 id="articleHeader6">安装模块</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save react react-dom redux react-redux redux-logger redux-thunk react-router react-router-redux@next history styled-components isomorphic-fetch jroll jroll-pulldown jroll-infinite echarts babel-polyfill
npm install --save-dev webpack webpack-dev-server webpack-merge clean-webpack-plugin babel-loader babel-core babel-preset-env babel-preset-react css-loader style-loader file-loader url-loader html-webpack-plugin uglifyjs-webpack-plugin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>npm <span class="hljs-keyword">install </span>--save react react-dom redux react-redux redux-logger redux-thunk react-router react-router-redux@next history styled-components isomorphic-fetch <span class="hljs-keyword">jroll </span><span class="hljs-keyword">jroll-pulldown </span><span class="hljs-keyword">jroll-infinite </span>echarts <span class="hljs-keyword">babel-polyfill
</span>npm <span class="hljs-keyword">install </span>--save-dev webpack webpack-dev-server webpack-merge clean-webpack-plugin <span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-preset-env </span><span class="hljs-keyword">babel-preset-react </span>css-loader style-loader file-loader url-loader html-webpack-plugin uglifyjs-webpack-plugin</code></pre>
<p>模块简要说明：</p>
<blockquote><p><code>react</code> <code>react-dom</code>：React依赖<br><code>redux</code> <code>react-redux</code> <code>redux-logger</code> <code>redux-thunk</code>：Redux依赖<br><code>react-router</code> <code>react-router-redux</code> <code>history</code>：react-router依赖<br><code>styled-components</code>：React中的CSS的实现依赖<br><code>isomorphic-fetch</code>：fetch兼容库<br><code>jroll</code> <code>jroll-pulldown</code> <code>jroll-infinite</code>：JRoll插件依赖<br><code>echarts</code>：基于html5 Canvas图表库<br><code>babel-polyfill</code>：用于实现浏览器不支持原生功能的代码<br><code>webpack</code>：预编译模块打包<br><code>webpack-dev-server</code>：实时重新加载的Web服务器<br><code>webpack-merge</code>：webpack配置分离插件<br><code>clean-webpack-plugin</code>：在building之前删除你以前build过的文件<br><code>babel-loader</code> <code>babel-core</code> <code>babel-preset-env</code> <code>babel-preset-react</code>：转码器babel依赖<br><code>css-loader</code> <code>style-loader</code> <code>file-loader</code> <code>url-loader</code>：各格式文件打包依赖<br><code>html-webpack-plugin</code>：生成HTML5文件的插件<br><code>uglifyjs-webpack-plugin</code>：代码压缩插件</p></blockquote>
<h2 id="articleHeader7">配置模块</h2>
<p>在项目根目录生成<code>.babelrc</code>文件（Windows系统下文件重命名为.babelrc.），并写入如下数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;presets&quot;: [&quot;env&quot;,&quot;react&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"env"</span>,<span class="hljs-string">"react"</span>]
}</code></pre>
<p>配置package.json：运行<code>npm run build</code>启动编译模式和<code>npm run start</code>热更新模式;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;start&quot;: &quot;webpack-dev-server --config webpack.dev.js&quot;,
    &quot;build&quot;: &quot;webpack --config webpack.prod.js&quot;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"webpack-dev-server --config webpack.dev.js"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack --config webpack.prod.js"</span>
},</code></pre>
<p>根目录新建webpack配置文件：<code>webpack.common.js</code>、<code>webpack.dev.js</code>、<code>webpack.prod.js</code>;</p>
<p><strong>webpack.common.js</strong>（共用配置）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill','./src/index.js'],    //项目的起点入口
    output: {    //项目输出配置
        path: path.resolve(__dirname, 'build'),    //文件的输出目录 
        filename: 'static/js/[name].[hash:5].js'
    },
    module: {    //模块加载
        rules: [
            {
                test: /\.css$/,    //匹配规则
                use: [
                    { loader: &quot;style-loader&quot; },
                    { loader: &quot;css-loader&quot; }
                ]
            },{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },{
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,    //小于8192B的文件转为base64文件
                        name: 'static/images/[name].[hash:5].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [    //插件配置
        new CleanWebpackPlugin(['build']),    //清空编译输出文件夹
        new HtmlWebpackPlugin({
            title: 'Cinglong\'s Demo',
            filename: 'index.html',
            template: path.resolve(__dirname, 'templates', 'index.html')
        }),    //生成Html5文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons'
        }),    //共用代码打包
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'clean-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
    entry: [<span class="hljs-string">'babel-polyfill'</span>,<span class="hljs-string">'./src/index.js'</span>],    <span class="hljs-comment">//项目的起点入口</span>
    output: {    <span class="hljs-comment">//项目输出配置</span>
        path: path.resolve(__dirname, <span class="hljs-string">'build'</span>),    <span class="hljs-comment">//文件的输出目录 </span>
        filename: <span class="hljs-string">'static/js/[name].[hash:5].js'</span>
    },
    <span class="hljs-keyword">module</span>: {    <span class="hljs-comment">//模块加载</span>
        rules: [
            {
                test: <span class="hljs-regexp">/\.css$/</span>,    <span class="hljs-comment">//匹配规则</span>
                use: [
                    { loader: <span class="hljs-string">"style-loader"</span> },
                    { loader: <span class="hljs-string">"css-loader"</span> }
                ]
            },{
                test: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
                exclude: <span class="hljs-regexp">/node_modules/</span>,
                use: {
                    loader: <span class="hljs-string">'babel-loader'</span>
                }
            },{
                test: <span class="hljs-regexp">/\.(png|svg|jpg|gif)$/</span>,
                use: {
                    loader: <span class="hljs-string">'url-loader'</span>,
                    options: {
                        limit: <span class="hljs-number">8192</span>,    <span class="hljs-comment">//小于8192B的文件转为base64文件</span>
                        name: <span class="hljs-string">'static/images/[name].[hash:5].[ext]'</span>
                    }
                }
            }
        ]
    },
    plugins: [    <span class="hljs-comment">//插件配置</span>
        <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">'build'</span>]),    <span class="hljs-comment">//清空编译输出文件夹</span>
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            title: <span class="hljs-string">'Cinglong\'s Demo'</span>,
            filename: <span class="hljs-string">'index.html'</span>,
            template: path.resolve(__dirname, <span class="hljs-string">'templates'</span>, <span class="hljs-string">'index.html'</span>)
        }),    <span class="hljs-comment">//生成Html5文件</span>
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
            name: <span class="hljs-string">'commons'</span>
        }),    <span class="hljs-comment">//共用代码打包</span>
    ]
};</code></pre>
<p><strong>webpack.dev.js</strong>（开发配置）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    devtool: 'inline-source-map',    //代码关联显示方式
    devServer: {
        historyApiFallback:true,    //文件重定向，和react-router相关
        hot: true,    //开启模块热替换
        port: 80,    //服务器端口
        host: &quot;192.168.23.101&quot;,    //服务器域名
        open: true    //自动打开浏览器标签
    },
    plugins: [
        new webpack.NamedModulesPlugin(),    //显示模块的相对路径
        new webpack.HotModuleReplacementPlugin()    //加载热替换插件
    ]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>);
<span class="hljs-keyword">const</span> common = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.common.js'</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = merge(common, {
    <span class="hljs-attr">devtool</span>: <span class="hljs-string">'inline-source-map'</span>,    <span class="hljs-comment">//代码关联显示方式</span>
    devServer: {
        <span class="hljs-attr">historyApiFallback</span>:<span class="hljs-literal">true</span>,    <span class="hljs-comment">//文件重定向，和react-router相关</span>
        hot: <span class="hljs-literal">true</span>,    <span class="hljs-comment">//开启模块热替换</span>
        port: <span class="hljs-number">80</span>,    <span class="hljs-comment">//服务器端口</span>
        host: <span class="hljs-string">"192.168.23.101"</span>,    <span class="hljs-comment">//服务器域名</span>
        open: <span class="hljs-literal">true</span>    <span class="hljs-comment">//自动打开浏览器标签</span>
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.NamedModulesPlugin(),    <span class="hljs-comment">//显示模块的相对路径</span>
        <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()    <span class="hljs-comment">//加载热替换插件</span>
    ]
});</code></pre>
<p><strong>webpack.prod.js</strong>（预编译配置）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin()    //代码压缩
    ]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>);
<span class="hljs-keyword">const</span> UglifyJSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'uglifyjs-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> common = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.common.js'</span>);

<span class="hljs-built_in">module</span>.exports = merge(common, {
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> UglifyJSPlugin()    <span class="hljs-comment">//代码压缩</span>
    ]
});</code></pre>
<h2 id="articleHeader8">项目目录</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" react-webapp-demo
  |- /node_modules    //模块安装目录
  |- /src    //代码目录
    |- /container    //容器组件
    |- /presentational    //展示组件
      |- /images    //图片目录
    |- /reducers    //reducers操作
    |- /utils    //其他
    |- index.js    //项目入口
  |- /templates    //模板目录
  |- .babelrc    //babel编译配置
  |- package.json    //项目目录配置
  |- package-lock.json    //模块信息（自动生成）
  |- webpack.common.js    //webpack共用配置
  |- webpack.dev.js    //webpack开发配置
  |- webpack.prod.js    //webpack编译配置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="nohighlight"> react-webapp-demo
  |- /node_modules    //模块安装目录
  |- /src    //代码目录
    |- /container    //容器组件
    |- /presentational    //展示组件
      |- /images    //图片目录
    |- /reducers    //reducers操作
    |- /utils    //其他
    |- index.js    //项目入口
  |- /templates    //模板目录
  |- .babelrc    //babel编译配置
  |- package.json    //项目目录配置
  |- package-lock.json    //模块信息（自动生成）
  |- webpack.common.js    //webpack共用配置
  |- webpack.dev.js    //webpack开发配置
  |- webpack.prod.js    //webpack编译配置</code></pre>
<h1 id="articleHeader9">系列目录</h1>
<ol>
<li><a href="http://sfau.lt/b5Y87d" rel="nofollow noreferrer" target="_blank">前端大统一时代即将来临？</a></li>
<li><a href="http://sfau.lt/b5ZcHH" rel="nofollow noreferrer" target="_blank">React项目实战：环境搭建</a></li>
<li><a href="http://sfau.lt/b5Zefv" rel="nofollow noreferrer" target="_blank">React项目实战：react-redux-router基本原理</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React项目实战：环境搭建

## 原文链接
[https://segmentfault.com/a/1190000012164495](https://segmentfault.com/a/1190000012164495)


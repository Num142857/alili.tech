---
title: 'webpack4 多入口，多页面项目构建案例' 
date: 2018-11-29 9:34:56
hidden: true
slug: 7ccqwambt8d
categories: [reprint]
---

{{< raw >}}

                    
<p>趁工作之余从零构建了一个webpack4.x多页面应用程序。过程中也遇到一些坑，就记录下来了。</p>
<hr>
<h3 id="articleHeader0">webpack核心概念</h3>
<ul>
<li>Entry：入口，Webpack 执行构建的第一步将从 Entry 开始。</li>
<li>Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。</li>
<li>Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。</li>
<li>Loader：模块转换器，用于把模块原内容按照需求转换成新内容。</li>
<li>Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。</li>
<li>Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。</li>
</ul>
<p>项目的运行主要围绕的就是这几大块 </p>
<p>首先看一下构建后目录<br>├── build<br>│   ├── webpack.base.conf.js<br>│   ├── webpack.dev.conf.js<br>│   ├── webpack.prod.conf.js<br>│   ├── webpack.rules.conf.js<br>├── src<br>│   ├── css<br>│   ├── js<br>│   ├── images<br>│   ├── assets<br>│   ├── pages<br>│   │   ├── index<br>│   │   │   ├── index.html<br>│   │   │   ├── index.js<br>│   │   │   └── index.scss<br>│   │   ├── login<br>│   │   │   ├── index.html<br>│   │   │   ├── index.js<br>│   │   │   └── index.scss</p>
<h3 id="articleHeader1">1.多页面的入口文件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="修改 webpack.base.conf.js代码
entry: {
        // 多入口文件
        index: ['./src/pages/index/index.js',],
        login: './src/pages/login/index.js',
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>修改 webpack<span class="hljs-selector-class">.base</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>代码
entry: {
        <span class="hljs-comment">// 多入口文件</span>
        index: [<span class="hljs-string">'./src/pages/index/index.js'</span>,],
        login: <span class="hljs-string">'./src/pages/login/index.js'</span>,
    },</code></pre>
<h3 id="articleHeader2">2.配置开发服务器</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack-dev-server --save-dev
//修改 webpack.dev.conf.js代码

devServer: {
    contentBase: path.join(__dirname, &quot;../dist&quot;),
    publicPath:'/',
    host: &quot;127.0.0.1&quot;,
    port: &quot;8089&quot;,
    overlay: true, // 浏览器页面上显示错误
    // open: true, // 开启自动打开浏览器
    // stats: &quot;errors-only&quot;, //stats: &quot;errors-only&quot;表示只打印错误：
    hot: true // 开启热更新
},
//修改package.json
scripts: {
    &quot;dev&quot;: &quot;cross-env NODE_ENV=development webpack-dev-server  --config build/webpack.dev.conf.js&quot;,
    &quot;build&quot;: &quot;cross-env NODE_ENV=production webpack --config build/webpack.prod.conf.js&quot;,
    &quot;server&quot;: &quot;live-server ./ --port=8888&quot;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>npm install webpack-dev-server --save-dev
<span class="hljs-comment">//修改 webpack.dev.conf.js代码</span>
<span class="hljs-symbol">
devServer:</span> {
<span class="hljs-symbol">    contentBase:</span> path.join(__dirname, <span class="hljs-string">"../dist"</span>),
<span class="hljs-symbol">    publicPath:</span><span class="hljs-string">'/'</span>,
<span class="hljs-symbol">    host:</span> <span class="hljs-string">"127.0.0.1"</span>,
<span class="hljs-symbol">    port:</span> <span class="hljs-string">"8089"</span>,
<span class="hljs-symbol">    overlay:</span> true, <span class="hljs-comment">// 浏览器页面上显示错误</span>
    <span class="hljs-comment">// open: true, // 开启自动打开浏览器</span>
    <span class="hljs-comment">// stats: "errors-only", //stats: "errors-only"表示只打印错误：</span>
<span class="hljs-symbol">    hot:</span> true <span class="hljs-comment">// 开启热更新</span>
},
<span class="hljs-comment">//修改package.json</span>
<span class="hljs-symbol">scripts:</span> {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"cross-env NODE_ENV=development webpack-dev-server  --config build/webpack.dev.conf.js"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"cross-env NODE_ENV=production webpack --config build/webpack.prod.conf.js"</span>,
    <span class="hljs-string">"server"</span>: <span class="hljs-string">"live-server ./ --port=8888"</span>
},</code></pre>
<h3 id="articleHeader3">3.配置loader</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.(css|scss|sass)$/,
    // 不分离的写法
    // use: [&quot;style-loader&quot;, &quot;css-loader&quot;,sass-loader&quot;]
    // 使用postcss不分离的写法
    // use: [&quot;style-loader&quot;, &quot;css-loader&quot;, sass-loader&quot;,&quot;postcss-loader&quot;]
    // 此处为分离css的写法
    /*use: extractTextPlugin.extract({
        fallback: &quot;style-loader&quot;,
        use: [&quot;css-loader&quot;, &quot;sass-loader&quot;],
        // css中的基础路径
        publicPath: &quot;../&quot;
    })*/
    // 此处为使用postcss分离css的写法
    use: extractTextPlugin.extract({
        fallback: &quot;style-loader&quot;,
        use: [&quot;css-loader&quot;, &quot;sass-loader&quot;, &quot;postcss-loader&quot;],
        // css中的基础路径
        publicPath: &quot;../&quot;

    })
},
{
    test: /\.js$/,
    use: [&quot;babel-loader&quot;],
    // 不检查node_modules下的js文件
    exclude: &quot;/node_modules/&quot;
}, {
    test: /\.(png|jpg|gif)$/,
    use: [{
        // 需要下载file-loader和url-loader
        loader: &quot;url-loader&quot;,
        options: {
            limit: 5 * 1024,//小于这个时将会已base64位图片打包处理
            // 图片文件输出的文件夹
            outputPath: &quot;images&quot;
        }
    }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs python"><code>{
    test: /\.(css|scss|sass)$/,
    // 不分离的写法
    // use: [<span class="hljs-string">"style-loader"</span>, <span class="hljs-string">"css-loader"</span>,sass-loade<span class="hljs-string">r"]
    // 使用postcss不分离的写法
    // use: ["</span>style-loade<span class="hljs-string">r", "</span>css-loade<span class="hljs-string">r", sass-loader"</span>,<span class="hljs-string">"postcss-loader"</span>]
    // 此处为分离css的写法
    /*use: extractTextPlugin.extract({
        fallback: <span class="hljs-string">"style-loader"</span>,
        use: [<span class="hljs-string">"css-loader"</span>, <span class="hljs-string">"sass-loader"</span>],
        // css中的基础路径
        publicPath: <span class="hljs-string">"../"</span>
    })*/
    // 此处为使用postcss分离css的写法
    use: extractTextPlugin.extract({
        fallback: <span class="hljs-string">"style-loader"</span>,
        use: [<span class="hljs-string">"css-loader"</span>, <span class="hljs-string">"sass-loader"</span>, <span class="hljs-string">"postcss-loader"</span>],
        // css中的基础路径
        publicPath: <span class="hljs-string">"../"</span>

    })
},
{
    test: /\.js$/,
    use: [<span class="hljs-string">"babel-loader"</span>],
    // 不检查node_modules下的js文件
    exclude: <span class="hljs-string">"/node_modules/"</span>
}, {
    test: /\.(png|jpg|gif)$/,
    use: [{
        // 需要下载file-loader和url-loader
        loader: <span class="hljs-string">"url-loader"</span>,
        options: {
            limit: <span class="hljs-number">5</span> * <span class="hljs-number">1024</span>,//小于这个时将会已base64位图片打包处理
            // 图片文件输出的文件夹
            outputPath: <span class="hljs-string">"images"</span>
        }
    }]
}</code></pre>
<h3 id="articleHeader4">4.从js中分离css</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install extract-text-webpack-plugin --save-dev 
//这个插件在webpack4.x 运行时会有点问题,后面会提到
//修改 webpack.base.conf.js代码
// 分离css插件参数为提取出去的路径
new extractTextPlugin({
    filename: 'css/[name].[hash:8].min.css',
})," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>npm install extract-<span class="hljs-built_in">text</span>-webpack-plugin --<span class="hljs-built_in">save</span>-dev 
<span class="hljs-comment">//这个插件在webpack4.x 运行时会有点问题,后面会提到</span>
<span class="hljs-comment">//修改 webpack.base.conf.js代码</span>
<span class="hljs-comment">// 分离css插件参数为提取出去的路径</span>
<span class="hljs-keyword">new</span> extractTextPlugin({
    filename: <span class="hljs-string">'css/[name].[hash:8].min.css'</span>,
}),</code></pre>
<h3 id="articleHeader5">5.处理css3属性前缀，消除冗余的css代码并压缩css</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//属性自动加前缀
npm install postcss-loader --save-dev 
//在根目录新建postcss.config.js
module.exports = {
    plugins: [
        require('autoprefixer')//自动添加css前缀
    ]
};
//loader里加入postcss
{
    test: /\.(css|scss|sass)$/,
    // 此处为使用postcss分离css的写法
    use: extractTextPlugin.extract({
        fallback: &quot;style-loader&quot;,
        use: [&quot;css-loader&quot;, &quot;sass-loader&quot;, &quot;postcss-loader&quot;],
        // css中的基础路径
        publicPath: &quot;../&quot;

    })
}
//修改package.json 加入css要兼容浏览器版本的代码
&quot;browserslist&quot;: [
    &quot;defaults&quot;,
    &quot;not ie < 11&quot;,
    &quot;last 2 versions&quot;,
    &quot;> 1%&quot;,
    &quot;iOS 7&quot;,
    &quot;last 3 iOS versions&quot;
]
//消除冗余css代码 使用glob模块去匹配文件所以还要安装glob模块
npm install purifycss-webpack --save-dev 
new purifyCssWebpack({
    paths: glob.sync(path.join(__dirname, &quot;../src/pages/*/*.html&quot;))
}),
//压缩css
npm install optimize-css-assets-webpack-plugin --save-dev 
//压缩css
//修改 webpack.prod.conf.js代码
new OptimizeCSSPlugin({
    cssProcessorOptions: {
        safe: true
    }
})," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">//属性自动加前缀</span>
npm install postcss-loader --<span class="hljs-built_in">save</span>-dev 
<span class="hljs-comment">//在根目录新建postcss.config.js</span>
module.exports = {
    plugins: [
        require(<span class="hljs-string">'autoprefixer'</span>)<span class="hljs-comment">//自动添加css前缀</span>
    ]
};
<span class="hljs-comment">//loader里加入postcss</span>
{
    test: /\.(css|scss|sass)$/,
    <span class="hljs-comment">// 此处为使用postcss分离css的写法</span>
    use: extractTextPlugin.extract({
        fallback: <span class="hljs-string">"style-loader"</span>,
        use: [<span class="hljs-string">"css-loader"</span>, <span class="hljs-string">"sass-loader"</span>, <span class="hljs-string">"postcss-loader"</span>],
        <span class="hljs-comment">// css中的基础路径</span>
        publicPath: <span class="hljs-string">"../"</span>

    })
}
<span class="hljs-comment">//修改package.json 加入css要兼容浏览器版本的代码</span>
<span class="hljs-string">"browserslist"</span>: [
    <span class="hljs-string">"defaults"</span>,
    <span class="hljs-string">"not ie &lt; 11"</span>,
    <span class="hljs-string">"last 2 versions"</span>,
    <span class="hljs-string">"&gt; 1%"</span>,
    <span class="hljs-string">"iOS 7"</span>,
    <span class="hljs-string">"last 3 iOS versions"</span>
]
<span class="hljs-comment">//消除冗余css代码 使用glob模块去匹配文件所以还要安装glob模块</span>
npm install purifycss-webpack --<span class="hljs-built_in">save</span>-dev 
<span class="hljs-keyword">new</span> purifyCssWebpack({
    paths: glob.sync(path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">"../src/pages/*/*.html"</span>))
}),
<span class="hljs-comment">//压缩css</span>
npm install optimize-css-assets-webpack-plugin --<span class="hljs-built_in">save</span>-dev 
<span class="hljs-comment">//压缩css</span>
<span class="hljs-comment">//修改 webpack.prod.conf.js代码</span>
<span class="hljs-keyword">new</span> OptimizeCSSPlugin({
    cssProcessorOptions: {
        safe: <span class="hljs-keyword">true</span>
    }
}),</code></pre>
<h3 id="articleHeader6">6.清空打包目录</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install clean-webpack-plugin --save-dev 
//修改 webpack.prod.conf.js代码
//删除dist目录
new cleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname, '../'), //根目录
    // verbose Write logs to console.
    verbose: true, //开启在控制台输出信息
    // dry Use boolean &quot;true&quot; to test/emulate delete. (will not remove files).
    // Default: false - remove files
    dry: false,
})," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> clean-webpack-<span class="hljs-keyword">plugin</span> <span class="hljs-comment">--save-dev </span>
//修改 webpack.prod.conf.js代码
//删除dist目录
<span class="hljs-keyword">new</span> cleanWebpackPlugin([<span class="hljs-string">'dist'</span>], {
    root: path.resolve(__dirname, <span class="hljs-string">'../'</span>), //根目录
    // verbose Write <span class="hljs-keyword">logs</span> <span class="hljs-keyword">to</span> console.
    verbose: <span class="hljs-literal">true</span>, //开启在控制台输出信息
    // dry <span class="hljs-keyword">Use</span> <span class="hljs-built_in">boolean</span> <span class="hljs-string">"true"</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">test</span>/emulate delete. (will <span class="hljs-keyword">not</span> remove files).
    // <span class="hljs-keyword">Default</span>: <span class="hljs-literal">false</span> - remove files
    dry: <span class="hljs-literal">false</span>,
}),</code></pre>
<h3 id="articleHeader7">7. 压缩js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install uglifyjs-webpack-plugin --save-dev 
//修改 webpack.prod.conf.js代码
//上线压缩 去除console等信息webpack4.x之后去除了webpack.optimize.UglifyJsPlugin
//https://github.com/mishoo/UglifyJS2/tree/harmony#compress-options
new UglifyJSPlugin({
    uglifyOptions: {
        compress: {
            warnings: false,
            drop_debugger: false,
            drop_console: true
        }
    }
})," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">npm</span> <span class="hljs-string">install</span> <span class="hljs-string">uglifyjs-webpack-plugin</span> <span class="hljs-bullet">--save-dev</span> 
<span class="hljs-string">//修改</span> <span class="hljs-string">webpack.prod.conf.js代码</span>
<span class="hljs-string">//上线压缩</span> <span class="hljs-string">去除console等信息webpack4.x之后去除了webpack.optimize.UglifyJsPlugin</span>
<span class="hljs-string">//https://github.com/mishoo/UglifyJS2/tree/harmony#compress-options</span>
<span class="hljs-string">new</span> <span class="hljs-string">UglifyJSPlugin({</span>
<span class="hljs-attr">    uglifyOptions:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        compress:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            warnings:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">            drop_debugger:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">            drop_console:</span> <span class="hljs-literal">true</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">}),</span></code></pre>
<h3 id="articleHeader8">8.提取js公共模块</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack4里面移除了commonChunksPulgin插件，放在了config.optimization里面,提取js， vendor名字可改
optimization: {
    splitChunks: {
        cacheGroups: {
            vendor: {
                // test: /\.js$/,
                test: /[\\/]node_modules[\\/]/,
                chunks: &quot;initial&quot;, //表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                name: &quot;vendor&quot;, //拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
                enforce: true,
            }
        }
    }
},
//项目里配置了自动提取node_modules里用到的模块如jquery，也可以在原模板里面通过第三方cdn引入，又是另一种配置了。在 webpack.base.conf.js利配置externals后webpack就不会去打包配置模块
externals: {
    'jquery': 'window.jQuery'
},
//externals就是webpack可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// webpack4里面移除了commonChunksPulgin插件，放在了config.optimization里面,提取js， vendor名字可改</span>
<span class="hljs-attribute">optimization</span>: {
    <span class="hljs-attribute">splitChunks</span>: {
        <span class="hljs-attribute">cacheGroups</span>: {
            <span class="hljs-attribute">vendor</span>: {
                <span class="hljs-comment">// test: /\.js$/,</span>
                <span class="hljs-attribute">test</span>: /[\\/]node_modules[\\/]/,
                <span class="hljs-attribute">chunks</span>: <span class="hljs-string">"initial"</span>, <span class="hljs-comment">//表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;</span>
                <span class="hljs-attribute">name</span>: <span class="hljs-string">"vendor"</span>, <span class="hljs-comment">//拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；</span>
                <span class="hljs-attribute">enforce</span>: true,
            }
        }
    }
},
<span class="hljs-comment">//项目里配置了自动提取node_modules里用到的模块如jquery，也可以在原模板里面通过第三方cdn引入，又是另一种配置了。在 webpack.base.conf.js利配置externals后webpack就不会去打包配置模块</span>
<span class="hljs-attribute">externals</span>: {
    <span class="hljs-string">'jquery'</span>: <span class="hljs-string">'window.jQuery'</span>
},
<span class="hljs-comment">//externals就是webpack可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问。</span></code></pre>
<h3 id="articleHeader9">9.复制静态资源</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install copy-webpack-plugin --save-dev 
//静态资源输出,将src目录下的assets文件夹复制到dist目录下
new copyWebpackPlugin([{
    from: path.resolve(__dirname, &quot;../src/assets&quot;),
    to: './assets',
    ignore: ['.*']
}])," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> copy-webpack-<span class="hljs-keyword">plugin</span> <span class="hljs-comment">--save-dev </span>
//静态资源输出,将src目录下的assets文件夹复制到dist目录下
<span class="hljs-keyword">new</span> copyWebpackPlugin([{
    <span class="hljs-keyword">from</span>: path.resolve(__dirname, <span class="hljs-string">"../src/assets"</span>),
    <span class="hljs-keyword">to</span>: <span class="hljs-string">'./assets'</span>,
    <span class="hljs-keyword">ignore</span>: [<span class="hljs-string">'.*'</span>]
}]),</code></pre>
<h3 id="articleHeader10">10.产出html</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install html-webpack-plugin --save-dev 
//修改webpack.base.conf.js代码
// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name, chunks) {
    return {
        template: `./src/pages/${name}/index.html`,
        filename: `${name}.html`,
        // favicon: './favicon.ico',
        // title: title,
        inject: true,
        hash: true, //开启hash  ?[hash]
        chunks: chunks,//页面要引入的包
        minify: process.env.NODE_ENV === &quot;development&quot; ? false : {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //折叠空白区域 也就是压缩代码
            removeAttributeQuotes: true, //去除属性引用
        },
    };
};
//配置页面
const htmlArray = [{
        _html: 'index',
        title: '首页',
        chunks: ['vendor', 'index']//页面用到的vendor模块
    },
    {
        _html: 'login',
        title: '登录',
        chunks: ['login']
    },
];
//自动生成html模板
htmlArray.forEach((element) => {
    module.exports.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>npm install html-webpack-plugin --save-dev 
<span class="hljs-comment">//修改webpack.base.conf.js代码</span>
<span class="hljs-comment">// 获取html-webpack-plugin参数的方法</span>
<span class="hljs-keyword">var</span> getHtmlConfig = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, chunks</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">template</span>: <span class="hljs-string">`./src/pages/<span class="hljs-subst">${name}</span>/index.html`</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">`<span class="hljs-subst">${name}</span>.html`</span>,
        <span class="hljs-comment">// favicon: './favicon.ico',</span>
        <span class="hljs-comment">// title: title,</span>
        inject: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">hash</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">//开启hash  ?[hash]</span>
        chunks: chunks,<span class="hljs-comment">//页面要引入的包</span>
        minify: process.env.NODE_ENV === <span class="hljs-string">"development"</span> ? <span class="hljs-literal">false</span> : {
            <span class="hljs-attr">removeComments</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">//移除HTML中的注释</span>
            collapseWhitespace: <span class="hljs-literal">true</span>, <span class="hljs-comment">//折叠空白区域 也就是压缩代码</span>
            removeAttributeQuotes: <span class="hljs-literal">true</span>, <span class="hljs-comment">//去除属性引用</span>
        },
    };
};
<span class="hljs-comment">//配置页面</span>
<span class="hljs-keyword">const</span> htmlArray = [{
        <span class="hljs-attr">_html</span>: <span class="hljs-string">'index'</span>,
        <span class="hljs-attr">title</span>: <span class="hljs-string">'首页'</span>,
        <span class="hljs-attr">chunks</span>: [<span class="hljs-string">'vendor'</span>, <span class="hljs-string">'index'</span>]<span class="hljs-comment">//页面用到的vendor模块</span>
    },
    {
        <span class="hljs-attr">_html</span>: <span class="hljs-string">'login'</span>,
        <span class="hljs-attr">title</span>: <span class="hljs-string">'登录'</span>,
        <span class="hljs-attr">chunks</span>: [<span class="hljs-string">'login'</span>]
    },
];
<span class="hljs-comment">//自动生成html模板</span>
htmlArray.forEach(<span class="hljs-function">(<span class="hljs-params">element</span>) =&gt;</span> {
    <span class="hljs-built_in">module</span>.exports.plugins.push(<span class="hljs-keyword">new</span> htmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})
</code></pre>
<h3 id="articleHeader11">11.性能优化 高大上的可视化分析模块</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack-bundle-analyzer --save-dev 
//修改 webpack.prod.conf.js代码
new BundleAnalyzerPlugin()
//npm run build 后会打开一个页面" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>npm install webpack-bundle-analyzer --<span class="hljs-keyword">save</span>-dev 
<span class="hljs-comment">//修改 webpack.prod.conf.js代码</span>
<span class="hljs-keyword">new</span> BundleAnalyzerPlugin()
<span class="hljs-comment">//npm run build 后会打开一个页面</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014984847?w=908&amp;h=547" src="https://static.alili.tech/img/remote/1460000014984847?w=908&amp;h=547" alt="cmd-markdown-logo" title="cmd-markdown-logo" style="cursor: pointer;"></span></p>
<p>通过这个页面可以看到哪些页面是由哪些模块组成的，通过这个可视化页面可以更加方便去定位哪个包臃肿了，然后去优化。</p>
<h3 id="articleHeader12">报错 &amp; 解决办法</h3>
<p>Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead <br>后来发现webpack4不支持extract-text-webpack-plugin 必须下载next版本安装这个插件  <br>npm install extract-text-webpack-plugin@next<br><a href="https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701" rel="nofollow noreferrer" target="_blank">https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701</a></p>
<h3 id="articleHeader13"><a href="https://github.com/zhouyupeng/webpack4.x_demo" rel="nofollow noreferrer" target="_blank"><strong>项目源码</strong></a></h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack4 多入口，多页面项目构建案例

## 原文链接
[https://segmentfault.com/a/1190000014984842](https://segmentfault.com/a/1190000014984842)


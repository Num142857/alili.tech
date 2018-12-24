---
title: 'webpack' 
date: 2018-12-22 2:30:10
hidden: true
slug: spdgldxj98j
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>webpack(v3.*)</strong></p>
<p><strong>1、webpack介绍</strong></p>
<p>webpack官网：<a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/</a><br>   webpack中文官网：<a href="https://doc.webpack-china.org/concepts/" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a><br>   webpack打包工具源代码：<a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">https://github.com/webpack/we...</a></p>
<p><strong>2、初始化项目</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd yourproject
npm init       //生成package.json文件
npm install webpack --save-dev   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>cd yourproject
npm init       <span class="hljs-comment">//生成package.json文件</span>
npm install webpack --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>   </code></pre>
<p><strong>3、webpack.config.js配置文件</strong></p>
<p>(1)、context：上下文，这里省略了，默认为当前文件模块的绝对路径，下面的entry和output中的路径都是相对于context上下文的相对路径.</p>
<p>(2)、output属性：(v3.10.0版本要求path是绝对路径，需要使用node.js的path模块)</p>
<p>注意： path.resolve方法用于将相对路径转为绝对路径。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require(&quot;path&quot;);  //使用前引入path模块
module.exports = {
    entry: './src/js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist/js'),
        publicPath: &quot;https://cdn.example.com/&quot;  //用publicPath配置打包后生成线上地址
    }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);  <span class="hljs-comment">//使用前引入path模块</span>
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/js/main.js'</span>,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>,
        <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'./dist/js'</span>),
        <span class="hljs-attr">publicPath</span>: <span class="hljs-string">"https://cdn.example.com/"</span>  <span class="hljs-comment">//用publicPath配置打包后生成线上地址</span>
    }
}

</code></pre>
<p><strong>注意：</strong> publicPath，当我们需要上线的时候设置此属性，最后打包的文件路径会被替换为publicPath设置的地址值。</p>
<p><strong>注意：</strong> filename: '[name]-[chunkhash].js',filename使用占位符确保每个文件具有唯一的名称。同时使用chunkhash可以达到控制文件版本号的作用，这点与gulp是相通的原理。所以，一旦文件做了修改，再执行webpack，则更改过的文件的chunkhash会发生改变，未做改动的文件的chunkhash不变。</p>
<p>（3）、plugins属性</p>
<p>介绍：plugins 是一个数组，里面是实例化的plugin，即new HtmlWepackPlugin（{//code}），这种形式。</p>
<p>① html-webpack-plugin插件：该插件用于生成一个HTML5文件，这个文件用script标签引用所有webpack包。(<a href="https://www.npmjs.com,npm%E5%AE%98%E7%BD%91%E6%9F%A5%E6%89%BE%E6%AF%8F%E4%B8%AA%E6%8F%92%E4%BB%B6%E7%9A%84Configuration%E5%B1%9E%E6%80%A7.)" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com,npm官网...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//安装
npm install html-webpack-plugin --save-dev

//webpack.config.js配置文件中引入
var HtmlWepackPlugin = require(&quot;html-webpack-plugin&quot;);

//设置配置项
plugins: [
    new HtmlWepackPlugin({
        filename:'index-[hash].html',  //输出文件名称
        template:'index.html',   //模板路径
        inject:&quot;head&quot;,     //值：body，head，false；script和link文件注入body或head中，或者false不注入。
        chunks：[&quot;index&quot;,&quot;common&quot;],      //允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的chunk注入到模板中。多页应用配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk.
        excludeChunks: [&quot;constan&quot;],     //这个与chunks配置项正好相反，用来配置不允许注入的thunk。
        showErrors: true,     //值：true/false,默认true；是否将错误信息输出到html页面中。这个很有用，在生成html文件的过程中有错误信息，输出到页面就能看到错误相关信息便于调试。
        title:&quot;MyApp&quot;,   //需要在引用template模板中调用此变量
        minify: {  //压缩代码
            collapseWhitespace: true,   //删除空格
            html5: true
        }
    })
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//安装</span>
npm install html-webpack-plugin --save-dev

<span class="hljs-comment">//webpack.config.js配置文件中引入</span>
<span class="hljs-keyword">var</span> HtmlWepackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"html-webpack-plugin"</span>);

<span class="hljs-comment">//设置配置项</span>
plugins: [
    <span class="hljs-keyword">new</span> HtmlWepackPlugin({
        <span class="hljs-attr">filename</span>:<span class="hljs-string">'index-[hash].html'</span>,  <span class="hljs-comment">//输出文件名称</span>
        template:<span class="hljs-string">'index.html'</span>,   <span class="hljs-comment">//模板路径</span>
        inject:<span class="hljs-string">"head"</span>,     <span class="hljs-comment">//值：body，head，false；script和link文件注入body或head中，或者false不注入。</span>
        chunks：[<span class="hljs-string">"index"</span>,<span class="hljs-string">"common"</span>],      <span class="hljs-comment">//允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的chunk注入到模板中。多页应用配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk.</span>
        excludeChunks: [<span class="hljs-string">"constan"</span>],     <span class="hljs-comment">//这个与chunks配置项正好相反，用来配置不允许注入的thunk。</span>
        showErrors: <span class="hljs-literal">true</span>,     <span class="hljs-comment">//值：true/false,默认true；是否将错误信息输出到html页面中。这个很有用，在生成html文件的过程中有错误信息，输出到页面就能看到错误相关信息便于调试。</span>
        title:<span class="hljs-string">"MyApp"</span>,   <span class="hljs-comment">//需要在引用template模板中调用此变量</span>
        minify: {  <span class="hljs-comment">//压缩代码</span>
            collapseWhitespace: <span class="hljs-literal">true</span>,   <span class="hljs-comment">//删除空格</span>
            html5: <span class="hljs-literal">true</span>
        }
    })
]
</code></pre>
<p><strong>注意：</strong> title属性的坑：var HtmlWebpackPlugin = require('html-webpack-plugin'); 这个变量随意。但是在模板中&lt;title&gt;&lt;%= htmlWebpackPlugin.options.title %&gt;&lt;/title&gt;必须使用驼峰式命令。不然会报错一直提示这个插件未定义。</p>
<p><strong>注意： 在页面中引入inline的script方法如下：</strong></p>
<p>在github上，<a href="https://github.com/jantimon/html-webpack-plugin/blob/master/examples/inline/template.jade%E4%B8%AD%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%88%B0%E4%BB%A3%E7%A0%81" rel="nofollow noreferrer" target="_blank">https://github.com/jantimon/h...</a>。共用的main.js以inline的形式引进，a.js,b.js,c.js以外链的形式引进.模板index.html中，</p>
<p><strong>首先在&lt;head&gt;中</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <script type=&quot;text/javascript&quot;>
        <%= compilation.assets[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source() %>
    </script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="handlebars"><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">compilation.assets</span>[<span class="hljs-attr">htmlWebpackPlugin.files.chunks.main.entry.substr</span>(<span class="hljs-attr">htmlWebpackPlugin.files.publicPath.length</span>)]<span class="hljs-attr">.source</span>() %&gt;</span>
    </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>重点：！！！compilation.assets是webpack暴露出来可以获取文件数据的方法。通过传文件名路径进这个对象，拿到这个文件的索引，通过调用source拿到文件内容。<br>compilation.assets需要的是不带publicPath，htmlWebpackPlugin.files.chunks.main.entry带publicPatch，所以用substr()截取。</p>
<p><strong>然后在&lt;body&gt;中：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <%= htmlWebpackPlugin.files.chunks[k].entry %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code style="word-break: break-word; white-space: initial;"><span class="xml">    <span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby"> htmlWebpackPlugin.files.chunks[k].entry </span><span class="xml"><span class="hljs-tag">%&gt;</span></span></code></pre>
<p><strong>最后在webpack.config.js中：</strong> inject属性设置为false即可。</p>
<p>（4）、loader属性(以babel-loader为例，用babel-loader将js文件转义为浏览器可识别的js)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module:{         
    rules:[    //模块规则
        {
            test: /\.js$/,    //正则匹配
            use: [{   
                loader:'babel-loader',
                options:{
                    presets: [&quot;env&quot;] //采用babel-loader的&quot;env&quot;规则将找的es6,es7,es5语法转码为浏览器可识别的js
                }
            }],
            include: [
             path.resolve(__dirname, &quot;/src&quot;)   //指定babel-loaders寻找的文件路径，注意需是绝对路径
            ],
            exclude: [
             path.resolve(__dirname, &quot;/node_modules/&quot;)   //排除node_modules文件下js，注意需是绝对路径
            ]
        }
    ]
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>module:{         
    rules:[    <span class="hljs-comment">//模块规则</span>
        {
            test: <span class="hljs-regexp">/\.js$/</span>,    <span class="hljs-comment">//正则匹配</span>
            use: [{   
                loader:<span class="hljs-string">'babel-loader'</span>,
                <span class="hljs-keyword">options</span>:{
                    presets: [<span class="hljs-string">"env"</span>] <span class="hljs-comment">//采用babel-loader的"env"规则将找的es6,es7,es5语法转码为浏览器可识别的js</span>
                }
            }],
            <span class="hljs-keyword">include</span>: [
             path.resolve(__dirname, <span class="hljs-string">"/src"</span>)   <span class="hljs-comment">//指定babel-loaders寻找的文件路径，注意需是绝对路径</span>
            ],
            <span class="hljs-keyword">exclude</span>: [
             path.resolve(__dirname, <span class="hljs-string">"/node_modules/"</span>)   <span class="hljs-comment">//排除node_modules文件下js，注意需是绝对路径</span>
            ]
        }
    ]
},
</code></pre>
<p><strong>注意：</strong> webpack官网介绍到：“Rule.loader is a shortcut to Rule.use: [ { loader } ]”. 即下图：</p>
<p><span class="img-wrap"><img data-src="/img/bV0czR?w=1326&amp;h=1000" src="https://static.alili.tech/img/bV0czR?w=1326&amp;h=1000" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>(5)、loader属性（css处理的loader）(postcss参考文章：<a href="https://segmentfault.com/a/1190000011595620)">https://segmentfault.com/a/11...</a></p>
<p>在web开发中浏览器兼容问题，我们不得不使用兼容性前缀，less语言在编译时可以补全css代码的兼容性前缀,但是针对css文件不全前缀需要使用postcss-loader。如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bV0dKP?w=1800&amp;h=1010" src="https://static.alili.tech/img/bV0dKP?w=1800&amp;h=1010" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在common.css中引入其他的css文件：<br><span class="img-wrap"><img data-src="/img/bV0rtQ?w=782&amp;h=584" src="https://static.alili.tech/img/bV0rtQ?w=782&amp;h=584" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在app.js入口文件中引入common.css，这样打包的时候就能将css文件进行打包：<br><span class="img-wrap"><img data-src="/img/bV0rtV?w=944&amp;h=468" src="https://static.alili.tech/img/bV0rtV?w=944&amp;h=468" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>（6）、wbpack-dev-server</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//首先安装插件
npm i webpack-dev-server  --save-dev
npm i cross-env  --save-dev
npm i html-webpack-plugin  --save-dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code><span class="hljs-comment">//首先安装插件</span>
npm i webpack-<span class="hljs-built_in">dev</span>-server  --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
npm i <span class="hljs-built_in">cross</span>-env  --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
npm i html-webpack-plugin  --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
</code></pre>
<p>package.json文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;:{
    //prod环境
    &quot;build&quot;: &quot;cross-env NODE_ENV=production webpack --config webpack.config.js&quot;,
    //dev环境
    &quot;dev&quot;: &quot;cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"scripts"</span>:{
    <span class="hljs-comment">//prod环境</span>
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"cross-env NODE_ENV=production webpack --config webpack.config.js"</span>,
    <span class="hljs-comment">//dev环境</span>
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"</span>
  }</code></pre>
<p>webpack.config.js文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&quot;path&quot;)  
const HTMLWebapckPlugin = require(&quot;html-webpack-plugin&quot;)
const webpack = require('webpack')  //引入webpack 

//在package.json中的“NODE_ENV=development”，可通过下面的process.env读到变量NODE_ENV
const isDev = process.env.NODE_ENV === &quot;development&quot;


const config = {

    target:&quot;web&quot;,//web平台

    entry: path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,&quot;dist&quot;)

    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name]-[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        //使用Vue、react框架时需要DefinePlugin这的插件，因为框架会根据不同环境打包依赖，所以要区分环境从而选择不同的依赖
        new webpack.DefinePlugin({
            //定义环境变量，对应上面的isDev判断
            'process.env':{
                NODE_ENV:isDev ? '&quot;development&quot;' : '&quot;production&quot;' //注意此处单引号内还需要双引号
            }
        }),
        //生成HTML页面
        new HTMLWebapckPlugin()
    ]
}

//dev环境
if(isDev){
    //通过devtool对代码进行映射，可以在浏览器端可以调试
    config.devtool = &quot;#cheap-module-eval-sourve-map&quot;
    //devserver 是在webpack2以后才出现的
    config.devServer = {
        port:'8020', //端口号
        host:&quot;0.0.0.0&quot;, //设置成这样后，移动端也可以通IP访问页面
        //webpack编译时任何错误显示在浏览器中
        overlay:{
            errors:true,
        },
        open:true,//自动打开浏览器
        hot:true //webpack功能：不再重新刷新整个页面，而是局部更新，即热更新
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),  //搭配hot:true一起使用
        new webpack.NoEmitOnErrorsPlugin()  //搭配hot:true一起使用，去除一些不需要展示的信息
    )
}


module.exports = config" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>)  
<span class="hljs-keyword">const</span> HTMLWebapckPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"html-webpack-plugin"</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)  <span class="hljs-comment">//引入webpack </span>

<span class="hljs-comment">//在package.json中的“NODE_ENV=development”，可通过下面的process.env读到变量NODE_ENV</span>
<span class="hljs-keyword">const</span> isDev = process.env.NODE_ENV === <span class="hljs-string">"development"</span>


<span class="hljs-keyword">const</span> config = {

    target:<span class="hljs-string">"web"</span>,<span class="hljs-comment">//web平台</span>

    entry: path.join(__dirname,<span class="hljs-string">'src/index.js'</span>),
    output:{
        filename:<span class="hljs-string">'bundle.js'</span>,
        path:path.join(__dirname,<span class="hljs-string">"dist"</span>)

    },
    <span class="hljs-keyword">module</span>:{
        rules:[
            {
                test:<span class="hljs-regexp">/\.vue$/</span>,
                loader:<span class="hljs-string">'vue-loader'</span>
            },
            {
                test:<span class="hljs-regexp">/\.css$/</span>,
                use:[
                    <span class="hljs-string">'style-loader'</span>,
                    <span class="hljs-string">'css-loader'</span>
                ]
            },
            {
                test:<span class="hljs-regexp">/\.(gif|jpg|jpeg|png|svg)$/</span>,
                use:[
                    {
                        loader:<span class="hljs-string">'url-loader'</span>,
                        options:{
                            limit:<span class="hljs-number">1024</span>,
                            name:<span class="hljs-string">'[name]-[hash].[ext]'</span>
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        <span class="hljs-comment">//使用Vue、react框架时需要DefinePlugin这的插件，因为框架会根据不同环境打包依赖，所以要区分环境从而选择不同的依赖</span>
        <span class="hljs-keyword">new</span> webpack.DefinePlugin({
            <span class="hljs-comment">//定义环境变量，对应上面的isDev判断</span>
            <span class="hljs-string">'process.env'</span>:{
                NODE_ENV:isDev ? <span class="hljs-string">'"development"'</span> : <span class="hljs-string">'"production"'</span> <span class="hljs-comment">//注意此处单引号内还需要双引号</span>
            }
        }),
        <span class="hljs-comment">//生成HTML页面</span>
        <span class="hljs-keyword">new</span> HTMLWebapckPlugin()
    ]
}

<span class="hljs-comment">//dev环境</span>
<span class="hljs-keyword">if</span>(isDev){
    <span class="hljs-comment">//通过devtool对代码进行映射，可以在浏览器端可以调试</span>
    config.devtool = <span class="hljs-string">"#cheap-module-eval-sourve-map"</span>
    <span class="hljs-comment">//devserver 是在webpack2以后才出现的</span>
    config.devServer = {
        port:<span class="hljs-string">'8020'</span>, <span class="hljs-comment">//端口号</span>
        host:<span class="hljs-string">"0.0.0.0"</span>, <span class="hljs-comment">//设置成这样后，移动端也可以通IP访问页面</span>
        <span class="hljs-comment">//webpack编译时任何错误显示在浏览器中</span>
        overlay:{
            errors:<span class="hljs-literal">true</span>,
        },
        open:<span class="hljs-literal">true</span>,<span class="hljs-comment">//自动打开浏览器</span>
        hot:<span class="hljs-literal">true</span> <span class="hljs-comment">//webpack功能：不再重新刷新整个页面，而是局部更新，即热更新</span>
    }
    config.plugins.push(
        <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),  <span class="hljs-comment">//搭配hot:true一起使用</span>
        <span class="hljs-keyword">new</span> webpack.NoEmitOnErrorsPlugin()  <span class="hljs-comment">//搭配hot:true一起使用，去除一些不需要展示的信息</span>
    )
}


<span class="hljs-built_in">module</span>.exports = config</code></pre>
<p>执行npm run dev 就可以通过localhost:8020打开页面</p>
<p>(7)、webpack单独打包css文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//安装依赖
npm i extract-text-webpack-plugin
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//安装依赖</span>
npm <span class="hljs-selector-tag">i</span> extract-text-webpack-plugin
</code></pre>
<p>在webpack.config.js文件中引用：(结合6中的配置文件)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//dev环境
if(isDev){
    config.module.rules.push(
        {
            test:/\.scss$/,
            use:[
                'style-loader',
                'css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true
                    }
                },
                'sass-loader'

            ]
        }
    )
    config.devtool = &quot;#cheap-module-eval-sourve-map&quot;
    //devserver 是在webpack2以后才出现的
    config.devServer = {
        port:'8020', //端口号
        host:&quot;0.0.0.0&quot;, //设置成这样后，移动端也可以通IP访问页面
        //webpack编译时任何错误显示在浏览器中
        overlay:{
            errors:true,
        },
        open:true,//自动打开浏览器
        hot:true //热更新
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}else{
//正式环境
    config.output.filename='[name].[chunkhash:8].js'  //正式环境使用chunkhash,dev环境不能使用chunkhash，可使用hash.
    config.module.rules.push({
        test:/\.scss$/,
        use:ExtractTextWebpack.extract({
            fallback:'style-loader',
            use:[
                'css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true
                    }
                },
                'sass-loader'
            ]
        })
    })
    config.plugins.push(
        new ExtractTextWebpack('style.[contentHash:8].css')
    )
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//dev环境</span>
<span class="hljs-function"><span class="hljs-title">if</span><span class="hljs-params">(isDev)</span></span>{
    config<span class="hljs-selector-class">.module</span><span class="hljs-selector-class">.rules</span><span class="hljs-selector-class">.push</span>(
        {
            test:/\.scss$/,
            use:[
                <span class="hljs-string">'style-loader'</span>,
                <span class="hljs-string">'css-loader'</span>,
                {
                    loader:<span class="hljs-string">'postcss-loader'</span>,
                    options:{
                        sourceMap:true
                    }
                },
                <span class="hljs-string">'sass-loader'</span>

            ]
        }
    )
    config<span class="hljs-selector-class">.devtool</span> = <span class="hljs-string">"#cheap-module-eval-sourve-map"</span>
    <span class="hljs-comment">//devserver 是在webpack2以后才出现的</span>
    config<span class="hljs-selector-class">.devServer</span> = {
        port:<span class="hljs-string">'8020'</span>, <span class="hljs-comment">//端口号</span>
        host:<span class="hljs-string">"0.0.0.0"</span>, <span class="hljs-comment">//设置成这样后，移动端也可以通IP访问页面</span>
        <span class="hljs-comment">//webpack编译时任何错误显示在浏览器中</span>
        overlay:{
            errors:true,
        },
        open:true,<span class="hljs-comment">//自动打开浏览器</span>
        hot:true <span class="hljs-comment">//热更新</span>
    }
    config<span class="hljs-selector-class">.plugins</span><span class="hljs-selector-class">.push</span>(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}<span class="hljs-keyword">else</span>{
<span class="hljs-comment">//正式环境</span>
    config<span class="hljs-selector-class">.output</span><span class="hljs-selector-class">.filename</span>=<span class="hljs-string">'[name].[chunkhash:8].js'</span>  <span class="hljs-comment">//正式环境使用chunkhash,dev环境不能使用chunkhash，可使用hash.</span>
    config<span class="hljs-selector-class">.module</span><span class="hljs-selector-class">.rules</span><span class="hljs-selector-class">.push</span>({
        test:/\.scss$/,
        use:ExtractTextWebpack.extract({
            fallback:<span class="hljs-string">'style-loader'</span>,
            use:[
                <span class="hljs-string">'css-loader'</span>,
                {
                    loader:<span class="hljs-string">'postcss-loader'</span>,
                    options:{
                        sourceMap:true
                    }
                },
                <span class="hljs-string">'sass-loader'</span>
            ]
        })
    })
    config<span class="hljs-selector-class">.plugins</span><span class="hljs-selector-class">.push</span>(
        new ExtractTextWebpack(<span class="hljs-string">'style.[contentHash:8].css'</span>)
    )
}
</code></pre>
<blockquote>注意：vue组件中的css样式是不会打包到上面的style.[contentHash:8].css文件中的，因为他是异步加载的。</blockquote>
<p>(8)、单独打包类库文件及hash</p>
<blockquote>将类库代码和业务代码分离打包，利用浏览器长期的缓存类库代码。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//正式环境配置
 {
    config.entry = {
    //业务逻辑代码
   app:path.join(__dirname,&quot;src/index.js&quot;),
   //类库代码在此声明，此处以Vue框架为例
    vendor: ['vue']
    }
    config.output.filename='[name].[chunkhash:8].js',
    config.module.rules.push({
    test:/\.scss$/,
    use:ExtractTextWebpack.extract({
    fallback:'style-loader',
    use:[
        'css-loader',
        {
            loader:'postcss-loader',
            options:{
                sourceMap:true
            }
        },
        'sass-loader'
    ]
    })
    }),
    config.plugins.push(
    new ExtractTextWebpack('style.[contentHash:8].css'),
    //单独打包，app中就不会出现类库代码，必须放在runtime之前
    new webpack.optimize.CommonsChunkPlugin({
    //name属性值要和上面定义的vendor一致
    name:'vendor'
    }),
    new webpack.optimize.commonsChunkPlugin({
    name:'runtime'
    })
    )
 }       " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//正式环境配置</span>
 {
    config<span class="hljs-selector-class">.entry</span> = {
    <span class="hljs-comment">//业务逻辑代码</span>
   app:path.join(__dirname,<span class="hljs-string">"src/index.js"</span>),
   <span class="hljs-comment">//类库代码在此声明，此处以Vue框架为例</span>
    vendor: [<span class="hljs-string">'vue'</span>]
    }
    config<span class="hljs-selector-class">.output</span><span class="hljs-selector-class">.filename</span>=<span class="hljs-string">'[name].[chunkhash:8].js'</span>,
    config<span class="hljs-selector-class">.module</span><span class="hljs-selector-class">.rules</span><span class="hljs-selector-class">.push</span>({
    test:/\.scss$/,
    use:ExtractTextWebpack.extract({
    fallback:<span class="hljs-string">'style-loader'</span>,
    use:[
        <span class="hljs-string">'css-loader'</span>,
        {
            loader:<span class="hljs-string">'postcss-loader'</span>,
            options:{
                sourceMap:true
            }
        },
        <span class="hljs-string">'sass-loader'</span>
    ]
    })
    }),
    config<span class="hljs-selector-class">.plugins</span><span class="hljs-selector-class">.push</span>(
    new ExtractTextWebpack(<span class="hljs-string">'style.[contentHash:8].css'</span>),
    <span class="hljs-comment">//单独打包，app中就不会出现类库代码，必须放在runtime之前</span>
    new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.CommonsChunkPlugin</span>({
    <span class="hljs-comment">//name属性值要和上面定义的vendor一致</span>
    name:<span class="hljs-string">'vendor'</span>
    }),
    new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.commonsChunkPlugin</span>({
    name:<span class="hljs-string">'runtime'</span>
    })
    )
 }       </code></pre>
<blockquote>hash与chunkhash区别：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hash:打包的所有文件共用的一个值
chunkhash:打包的不同的块拥有不同的chunkhash，所以正式环境应使用chunkhash,这样可以保证类库文件不会再每次更改业务重新打包后，又拥有一个新的hash值，而是一直使用之前的chunkhash，这样浏览器就不会在去下载那些依赖，从而实现了缓存。

详细请见：https://www.imooc.com/article/21538
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">hash:</span>打包的所有文件共用的一个值
<span class="hljs-string">chunkhash:</span>打包的不同的块拥有不同的chunkhash，所以正式环境应使用chunkhash,这样可以保证类库文件不会再每次更改业务重新打包后，又拥有一个新的hash值，而是一直使用之前的chunkhash，这样浏览器就不会在去下载那些依赖，从而实现了缓存。

详细请见：<span class="hljs-string">https:</span><span class="hljs-comment">//www.imooc.com/article/21538</span>
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack

## 原文链接
[https://segmentfault.com/a/1190000012426779](https://segmentfault.com/a/1190000012426779)


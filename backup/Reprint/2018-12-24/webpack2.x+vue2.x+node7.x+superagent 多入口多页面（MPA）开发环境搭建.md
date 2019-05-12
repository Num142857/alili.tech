---
title: 'webpack2.x+vue2.x+node7.x+superagent 多入口多页面（MPA）开发环境搭建' 
date: 2018-12-24 2:30:07
hidden: true
slug: 79qrf23greb
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>很早以前就想写这篇文章了，一直在犹豫，因为现在网上已经有很多大牛写了关于webpack+react、webpack+vue等入门的文章。我今天主要和大家分享的是我在实际项目中，利用webpack2.x+vue2.x+node7.x配置多入口多页面的开发环境搭建。</p>
<h1 id="articleHeader1">技术栈</h1>
<ul>
<li><p>整体：webpack2.x + vue2.x + node7.x</p></li>
<li><p>UI库：iview2</p></li>
<li><p>service层：superagent</p></li>
<li><p>多页面多入口方式开发，暂不使用vue-router</p></li>
<li><p>其他</p></li>
</ul>
<hr>
<h1 id="articleHeader2">目录结构</h1>
<p><span class="img-wrap"><img data-src="/img/bVY3ns?w=514&amp;h=1318" src="https://static.alili.tech/img/bVY3ns?w=514&amp;h=1318" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>对上面目录简单介绍下吧。</p>
<ol>
<li><p>config文件夹：放了代理服务的配置、不同环境下webpack打包配置和一些配置所需公共模块</p></li>
<li><p>data文件夹：用于调试的本地数据</p></li>
<li><p>node_modules文件夹：npm安装的模块</p></li>
<li><p>src文件夹：项目源文件，包括html、css、img、js等</p></li>
<li><p>package.json:项目依赖模块的配置信息</p></li>
<li><p>package-lock.json:npm安装过程中下载过模块具体版本记录信息，方便下次npm快速下载</p></li>
</ol>
<hr>
<h1 id="articleHeader3">配置介绍</h1>
<h2 id="articleHeader4">1.安装webpack和vue</h2>
<p>首先我们创建一个目录，初始化 npm，以及在本地安装 webpack：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir mc-fev2-dev &amp;&amp; cd mc-fev2-dev
npm init -y
npm install --save-dev webpack
npm install --save vue
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>mkdir mc-fev2-<span class="hljs-built_in">dev</span> &amp;&amp; cd mc-fev2-<span class="hljs-built_in">dev</span>
npm init -y
npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> webpack
npm install --<span class="hljs-built_in">save</span> vue
</code></pre>
<p>mc-fev2-dev目录接口如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── node_modules
└── package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>.
├── node_modules
└── <span class="hljs-class"><span class="hljs-keyword">package</span>.<span class="hljs-title">json</span></span></code></pre>
<h2 id="articleHeader5">2.项目目录构建</h2>
<h3 id="articleHeader6">1.config目录</h3>
<p><span class="img-wrap"><img data-src="/img/bVY3Mf?w=538&amp;h=526" src="https://static.alili.tech/img/bVY3Mf?w=538&amp;h=526" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>在根目录（mc-fev2-dev文件夹）下，创建config文件夹。</p>
<ol>
<li><p>CONFIG.js:本地接口代理配置文件</p></li>
<li><p>ENV.js:环境变量配置（可忽略）</p></li>
<li><p>PATHS.js：文件常用路径的公共模块</p></li>
<li><p>PORTS.js：本地开发启动的端口号设置</p></li>
<li><p>VENDORS.js：公共模块引用</p></li>
<li><p>webpack.base.config.js：webpack打包的公告模块配置</p></li>
<li><p>webpack.build.config.js：webpack预发环境打包压缩配置</p></li>
<li><p>webpack.dev.config.js：webpack本地调试启动配置</p></li>
<li><p>webpack.online.config.js：webpack生产环境打包压缩配置</p></li>
<li><p>webpack.sprite.config.js：webpack雪碧图打包压缩配置</p></li>
</ol>
<hr>
<p>webpack.base.config.js配置介绍</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*多页面webpack2+vue2页面配置*/
const webpack = require('webpack');
const path = require('path');
//把css样式从打包文件里面分离出来
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let VENDORS = require('./VENDORS'),
    PATHS = require('./PATHS'),
    PORTS = require('./PORTS'),
    UTIL = require('./UTIL');

//conf - postcss PostCss用来处理css的一个平台，需要npm安装postcss-loader 才能使用它下面的各种插件
let postcssConf = {
    loader: 'postcss-loader',
    options: {
        sourceMap: true,
        config: {
            path: 'config/postcss.config.js'//这里引用了PostCss下面autoprefixer这个插件，用来适配各种浏览器，给css增加前缀
        }
    }
};


//配置开始
let baseConfig = {
    //入口
    entry: {
        vendors: VENDORS
    },//因为是多入口多页面打包，所以入口参数entry是个对象，vendors是公告模块打包入口
    output: {
        path: PATHS.DIST,//打包编译完的文件根目录
        filename: 'js/[name].js',//打包编译完文件路径和名称，[name]对应entry多入口对象的key值，这里会生成vendors.js 公告模块js文件，和index.js业务逻辑模块js
        chunkFilename: 'js/[id][name].js'//按需加载的文件打包编译完路径，也分别打包在vendors、index两个js里
    },
    module: {
        rules: [
         //按照entry入口，对vue源文件里使用的css、scss语法进行提取打包
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            'css-loader?sourceMap',
                            postcssConf
                        ],
                    }),
                    scss: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            'css-loader?sourceMap',
                            postcssConf,
                            'sass-loader?sourceMap'
                        ]
                    })
                }
            }
        }, 
        //按照entry入口，对js源文件里的es6语法转换成浏览器可以识别的js语法
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: ['transform-runtime']
                }
            }
        }, 
        //按照entry入口，对css、scss、sass文件进行提取打包
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader?sourceMap',
                    postcssConf
                ]
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader?sourceMap',
                    postcssConf,
                    'sass-loader?sourceMap'
                ]
            })
        }, {
            test: /\.sass$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader?sourceMap',
                    postcssConf,
                    'sass-loader?sourceMap'
                ]
            })
        }, 
        //按照entry入口，对各种图片进行提取打包
        {
            test: /\.(gif|jpg|png)\??.*$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: 'img/[name].[ext]?[hash]'
                }
            }
        }, 
        //按照entry入口，对字体设置等文件进行提取打包
        {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: 'fonts/[name].[ext]?[hash]'
                }
            }
        }]
    },
    resolve: {
        modules: ['node_modules', &quot;src/assets&quot;],
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['.js', '.vue', '.json'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            ROOT: PATHS.ROOT,
            // 自定义路径别名
            MOCK: PATHS.MOCK,
            ASSETS: PATHS.SRC.join('assets'),
            COMPONENTS: PATHS.SRC.join('components'),
            DIRECTIVES: PATHS.SRC.join('directives'),
            FILTERS: PATHS.SRC.join('filters'),
            SERVICES: PATHS.SRC.join('services'),
            LIBS: PATHS.SRC.join('libs'),
            VIEWS: PATHS.SRC.join('views'),
            MIXINS: PATHS.SRC.join('mixins')
        },
    }
};

// 多入口  entry object 配置
//利用node.glob遍历项目需要打包的多个入口文件。（多页面开发搭建的关键）
let entries = UTIL.getEntry('./src/views/**/*.js');
Object.assign(baseConfig.entry, entries);

//exports
module.exports = baseConfig;

//ps：以上loader的模块都需要npm安装

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">/*多页面webpack2+vue2页面配置*/</span>
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-comment">//把css样式从打包文件里面分离出来</span>
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);

<span class="hljs-keyword">let</span> VENDORS = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./VENDORS'</span>),
    PATHS = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./PATHS'</span>),
    PORTS = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./PORTS'</span>),
    UTIL = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./UTIL'</span>);

<span class="hljs-comment">//conf - postcss PostCss用来处理css的一个平台，需要npm安装postcss-loader 才能使用它下面的各种插件</span>
<span class="hljs-keyword">let</span> postcssConf = {
    loader: <span class="hljs-string">'postcss-loader'</span>,
    options: {
        sourceMap: <span class="hljs-literal">true</span>,
        config: {
            path: <span class="hljs-string">'config/postcss.config.js'</span><span class="hljs-comment">//这里引用了PostCss下面autoprefixer这个插件，用来适配各种浏览器，给css增加前缀</span>
        }
    }
};


<span class="hljs-comment">//配置开始</span>
<span class="hljs-keyword">let</span> baseConfig = {
    <span class="hljs-comment">//入口</span>
    entry: {
        vendors: VENDORS
    },<span class="hljs-comment">//因为是多入口多页面打包，所以入口参数entry是个对象，vendors是公告模块打包入口</span>
    output: {
        path: PATHS.DIST,<span class="hljs-comment">//打包编译完的文件根目录</span>
        filename: <span class="hljs-string">'js/[name].js'</span>,<span class="hljs-comment">//打包编译完文件路径和名称，[name]对应entry多入口对象的key值，这里会生成vendors.js 公告模块js文件，和index.js业务逻辑模块js</span>
        chunkFilename: <span class="hljs-string">'js/[id][name].js'</span><span class="hljs-comment">//按需加载的文件打包编译完路径，也分别打包在vendors、index两个js里</span>
    },
    <span class="hljs-keyword">module</span>: {
        rules: [
         <span class="hljs-comment">//按照entry入口，对vue源文件里使用的css、scss语法进行提取打包</span>
        {
            test: <span class="hljs-regexp">/\.vue$/</span>,
            loader: <span class="hljs-string">'vue-loader'</span>,
            options: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        fallback: <span class="hljs-string">'vue-style-loader'</span>,
                        use: [
                            <span class="hljs-string">'css-loader?sourceMap'</span>,
                            postcssConf
                        ],
                    }),
                    scss: ExtractTextPlugin.extract({
                        fallback: <span class="hljs-string">'vue-style-loader'</span>,
                        use: [
                            <span class="hljs-string">'css-loader?sourceMap'</span>,
                            postcssConf,
                            <span class="hljs-string">'sass-loader?sourceMap'</span>
                        ]
                    })
                }
            }
        }, 
        <span class="hljs-comment">//按照entry入口，对js源文件里的es6语法转换成浏览器可以识别的js语法</span>
        {
            test: <span class="hljs-regexp">/\.js$/</span>,
            exclude: <span class="hljs-regexp">/node_modules/</span>,
            use: {
                loader: <span class="hljs-string">'babel-loader'</span>,
                options: {
                    presets: [<span class="hljs-string">'env'</span>],
                    plugins: [<span class="hljs-string">'transform-runtime'</span>]
                }
            }
        }, 
        <span class="hljs-comment">//按照entry入口，对css、scss、sass文件进行提取打包</span>
        {
            test: <span class="hljs-regexp">/\.css$/</span>,
            use: ExtractTextPlugin.extract({
                fallback: <span class="hljs-string">'style-loader'</span>,
                use: [
                    <span class="hljs-string">'css-loader?sourceMap'</span>,
                    postcssConf
                ]
            })
        }, {
            test: <span class="hljs-regexp">/\.scss$/</span>,
            use: ExtractTextPlugin.extract({
                fallback: <span class="hljs-string">'style-loader'</span>,
                use: [
                    <span class="hljs-string">'css-loader?sourceMap'</span>,
                    postcssConf,
                    <span class="hljs-string">'sass-loader?sourceMap'</span>
                ]
            })
        }, {
            test: <span class="hljs-regexp">/\.sass$/</span>,
            use: ExtractTextPlugin.extract({
                fallback: <span class="hljs-string">'style-loader'</span>,
                use: [
                    <span class="hljs-string">'css-loader?sourceMap'</span>,
                    postcssConf,
                    <span class="hljs-string">'sass-loader?sourceMap'</span>
                ]
            })
        }, 
        <span class="hljs-comment">//按照entry入口，对各种图片进行提取打包</span>
        {
            test: <span class="hljs-regexp">/\.(gif|jpg|png)\??.*$/</span>,
            use: {
                loader: <span class="hljs-string">'url-loader'</span>,
                options: {
                    limit: <span class="hljs-number">1024</span>,
                    name: <span class="hljs-string">'img/[name].[ext]?[hash]'</span>
                }
            }
        }, 
        <span class="hljs-comment">//按照entry入口，对字体设置等文件进行提取打包</span>
        {
            test: <span class="hljs-regexp">/\.(woff|svg|eot|ttf)\??.*$/</span>,
            use: {
                loader: <span class="hljs-string">'url-loader'</span>,
                options: {
                    limit: <span class="hljs-number">1024</span>,
                    name: <span class="hljs-string">'fonts/[name].[ext]?[hash]'</span>
                }
            }
        }]
    },
    resolve: {
        modules: [<span class="hljs-string">'node_modules'</span>, <span class="hljs-string">"src/assets"</span>],
        <span class="hljs-comment">// require时省略的扩展名，如：require('module') 不需要module.js</span>
        extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
        <span class="hljs-comment">// 别名，可以直接使用别名来代表设定的路径以及其他</span>
        alias: {
            ROOT: PATHS.ROOT,
            <span class="hljs-comment">// 自定义路径别名</span>
            MOCK: PATHS.MOCK,
            ASSETS: PATHS.SRC.join(<span class="hljs-string">'assets'</span>),
            COMPONENTS: PATHS.SRC.join(<span class="hljs-string">'components'</span>),
            DIRECTIVES: PATHS.SRC.join(<span class="hljs-string">'directives'</span>),
            FILTERS: PATHS.SRC.join(<span class="hljs-string">'filters'</span>),
            SERVICES: PATHS.SRC.join(<span class="hljs-string">'services'</span>),
            LIBS: PATHS.SRC.join(<span class="hljs-string">'libs'</span>),
            VIEWS: PATHS.SRC.join(<span class="hljs-string">'views'</span>),
            MIXINS: PATHS.SRC.join(<span class="hljs-string">'mixins'</span>)
        },
    }
};

<span class="hljs-comment">// 多入口  entry object 配置</span>
<span class="hljs-comment">//利用node.glob遍历项目需要打包的多个入口文件。（多页面开发搭建的关键）</span>
<span class="hljs-keyword">let</span> entries = UTIL.getEntry(<span class="hljs-string">'./src/views/**/*.js'</span>);
<span class="hljs-built_in">Object</span>.assign(baseConfig.entry, entries);

<span class="hljs-comment">//exports</span>
<span class="hljs-built_in">module</span>.exports = baseConfig;

<span class="hljs-comment">//ps：以上loader的模块都需要npm安装</span>

</code></pre>
<hr>
<p>webpack.build.config.js配置介绍（用于预发环境打包）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');
      //把一个入打包生成的js文件、css文件，都插入到自动生成的html页面里面
      HtmlWebpackPlugin = require('html-webpack-plugin');
      //把css样式从打包文件里面分离出来
      ExtractTextPlugin = require('extract-text-webpack-plugin');
      //webpack配置合并
      merge = require('webpack-merge');
      webpackBaseConfig = require('./webpack.base.config.js');
      //打包生成的js文件压缩 
      UglifyJSPlugin = require('uglifyjs-webpack-plugin');
      //打包过程中遇到的别名转化
      ReplacePlugin = require('webpack-plugin-replace');
      
const PATHS   = require('./PATHS'),
      UTIL = require('./UTIL');  
//配置
var webpackDevConfig = merge(webpackBaseConfig, {
    output: {
        publicPath:'/dist2/',//根据entry入口，打包生成的文件，在HtmlWebpackPlugin生成html下的引用路径，也叫资源路径。
    },
    plugins: [
        new ExtractTextPlugin({
            filename:'css/[name].css',
            allChunks: true
        }),
        //配合output的chunkFilename，生成打包按需加载的文件的路径
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'js/vendors.js',
            warn:false
        }),
        new UglifyJSPlugin(),
        new ReplacePlugin({
            include: PATHS.SERVICES.join('xhr'),
            values: {
                //更换接口域名 - sh
                &quot;rootPath = rootPathConf&quot;: 'rootPath = &quot;http://beta-workflow.m.xxx.com&quot;',
                //更换接口域名 - bj
                &quot;rootPathCore = rootPathCoreConf&quot;: 'rootPathCore = &quot;http://hd.xxx.com/api&quot;',
                //更换接口域名 - bj new
                &quot;rootPathBj = rootPathBjConf&quot;: 'rootPathBj = &quot;http://mac.xxx.com&quot;',
                //更换接口调用方式
                &quot;env = envConfig&quot;: 'env = &quot;beta&quot;'
            }
        })
    ]
});

//html files
//利用HtmlWebpackPlugin生成打包完成后多个页面。（多页面开发搭建的关键）
UTIL.generateHtml(webpackDevConfig, PATHS.DIST.join('/pages/'));
module.exports = webpackDevConfig;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
      <span class="hljs-comment">//把一个入打包生成的js文件、css文件，都插入到自动生成的html页面里面</span>
      HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
      <span class="hljs-comment">//把css样式从打包文件里面分离出来</span>
      ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
      <span class="hljs-comment">//webpack配置合并</span>
      merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>);
      webpackBaseConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.config.js'</span>);
      <span class="hljs-comment">//打包生成的js文件压缩 </span>
      UglifyJSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'uglifyjs-webpack-plugin'</span>);
      <span class="hljs-comment">//打包过程中遇到的别名转化</span>
      ReplacePlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-plugin-replace'</span>);
      
<span class="hljs-keyword">const</span> PATHS   = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./PATHS'</span>),
      UTIL = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./UTIL'</span>);  
<span class="hljs-comment">//配置</span>
<span class="hljs-keyword">var</span> webpackDevConfig = merge(webpackBaseConfig, {
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">publicPath</span>:<span class="hljs-string">'/dist2/'</span>,<span class="hljs-comment">//根据entry入口，打包生成的文件，在HtmlWebpackPlugin生成html下的引用路径，也叫资源路径。</span>
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> ExtractTextPlugin({
            <span class="hljs-attr">filename</span>:<span class="hljs-string">'css/[name].css'</span>,
            <span class="hljs-attr">allChunks</span>: <span class="hljs-literal">true</span>
        }),
        <span class="hljs-comment">//配合output的chunkFilename，生成打包按需加载的文件的路径</span>
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
            <span class="hljs-attr">name</span>: <span class="hljs-string">'vendors'</span>,
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'js/vendors.js'</span>,
            <span class="hljs-attr">warn</span>:<span class="hljs-literal">false</span>
        }),
        <span class="hljs-keyword">new</span> UglifyJSPlugin(),
        <span class="hljs-keyword">new</span> ReplacePlugin({
            <span class="hljs-attr">include</span>: PATHS.SERVICES.join(<span class="hljs-string">'xhr'</span>),
            <span class="hljs-attr">values</span>: {
                <span class="hljs-comment">//更换接口域名 - sh</span>
                <span class="hljs-string">"rootPath = rootPathConf"</span>: <span class="hljs-string">'rootPath = "http://beta-workflow.m.xxx.com"'</span>,
                <span class="hljs-comment">//更换接口域名 - bj</span>
                <span class="hljs-string">"rootPathCore = rootPathCoreConf"</span>: <span class="hljs-string">'rootPathCore = "http://hd.xxx.com/api"'</span>,
                <span class="hljs-comment">//更换接口域名 - bj new</span>
                <span class="hljs-string">"rootPathBj = rootPathBjConf"</span>: <span class="hljs-string">'rootPathBj = "http://mac.xxx.com"'</span>,
                <span class="hljs-comment">//更换接口调用方式</span>
                <span class="hljs-string">"env = envConfig"</span>: <span class="hljs-string">'env = "beta"'</span>
            }
        })
    ]
});

<span class="hljs-comment">//html files</span>
<span class="hljs-comment">//利用HtmlWebpackPlugin生成打包完成后多个页面。（多页面开发搭建的关键）</span>
UTIL.generateHtml(webpackDevConfig, PATHS.DIST.join(<span class="hljs-string">'/pages/'</span>));
<span class="hljs-built_in">module</span>.exports = webpackDevConfig;

</code></pre>
<hr>
<p>webpack.online.config.js配置介绍（用于生产环境打包） 跟预发类似不多做解释</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');
      HtmlWebpackPlugin = require('html-webpack-plugin');
      ExtractTextPlugin = require('extract-text-webpack-plugin');
      merge = require('webpack-merge');
      webpackBaseConfig = require('./webpack.base.config.js');
      UglifyJSPlugin = require('uglifyjs-webpack-plugin');
      ReplacePlugin = require('webpack-plugin-replace');
      
const PATHS   = require('./PATHS'),
      UTIL = require('./UTIL'); 
//配置
var webpackDevConfig = merge(webpackBaseConfig, {
    output: {
        path: PATHS.ROOT.join('dist2Online'),    //文件路径
        publicPath: '/dist2/',                  // 资源路径
    },
    plugins: [
        new ExtractTextPlugin({
            filename:'css/[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'js/vendors.js',
            warn:false
        }),
        new UglifyJSPlugin(),
        new ReplacePlugin({
            include: PATHS.SERVICES.join('xhr'),
            values: {
                //更换接口域名 - sh
                &quot;rootPath = rootPathConf&quot;: 'rootPath = &quot;http://workflow.m.xxx.com&quot;',
                //更换接口域名 - bj
                &quot;rootPathCore = rootPathCoreConf&quot;: 'rootPathCore = &quot;http://hd.xxx.com/api&quot;',
                //更换接口域名 - bj new
                &quot;rootPathBj = rootPathBjConf&quot;: 'rootPathBj = &quot;http://mac.xxx.com&quot;',
                //更换接口调用方式
                &quot;env = envConfig&quot;: 'env = &quot;prod&quot;'
            }
        })
    ]
});

//html files
UTIL.generateHtml(webpackDevConfig, PATHS.ROOT.join('dist2Online/pages/'));
module.exports = webpackDevConfig;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
      HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
      ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
      merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>);
      webpackBaseConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.config.js'</span>);
      UglifyJSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'uglifyjs-webpack-plugin'</span>);
      ReplacePlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-plugin-replace'</span>);
      
<span class="hljs-keyword">const</span> PATHS   = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./PATHS'</span>),
      UTIL = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./UTIL'</span>); 
<span class="hljs-comment">//配置</span>
<span class="hljs-keyword">var</span> webpackDevConfig = merge(webpackBaseConfig, {
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: PATHS.ROOT.join(<span class="hljs-string">'dist2Online'</span>),    <span class="hljs-comment">//文件路径</span>
        publicPath: <span class="hljs-string">'/dist2/'</span>,                  <span class="hljs-comment">// 资源路径</span>
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> ExtractTextPlugin({
            <span class="hljs-attr">filename</span>:<span class="hljs-string">'css/[name].css'</span>,
            <span class="hljs-attr">allChunks</span>: <span class="hljs-literal">true</span>
        }),
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
            <span class="hljs-attr">name</span>: <span class="hljs-string">'vendors'</span>,
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'js/vendors.js'</span>,
            <span class="hljs-attr">warn</span>:<span class="hljs-literal">false</span>
        }),
        <span class="hljs-keyword">new</span> UglifyJSPlugin(),
        <span class="hljs-keyword">new</span> ReplacePlugin({
            <span class="hljs-attr">include</span>: PATHS.SERVICES.join(<span class="hljs-string">'xhr'</span>),
            <span class="hljs-attr">values</span>: {
                <span class="hljs-comment">//更换接口域名 - sh</span>
                <span class="hljs-string">"rootPath = rootPathConf"</span>: <span class="hljs-string">'rootPath = "http://workflow.m.xxx.com"'</span>,
                <span class="hljs-comment">//更换接口域名 - bj</span>
                <span class="hljs-string">"rootPathCore = rootPathCoreConf"</span>: <span class="hljs-string">'rootPathCore = "http://hd.xxx.com/api"'</span>,
                <span class="hljs-comment">//更换接口域名 - bj new</span>
                <span class="hljs-string">"rootPathBj = rootPathBjConf"</span>: <span class="hljs-string">'rootPathBj = "http://mac.xxx.com"'</span>,
                <span class="hljs-comment">//更换接口调用方式</span>
                <span class="hljs-string">"env = envConfig"</span>: <span class="hljs-string">'env = "prod"'</span>
            }
        })
    ]
});

<span class="hljs-comment">//html files</span>
UTIL.generateHtml(webpackDevConfig, PATHS.ROOT.join(<span class="hljs-string">'dist2Online/pages/'</span>));
<span class="hljs-built_in">module</span>.exports = webpackDevConfig;

</code></pre>
<hr>
<p>webpack.dev.config.js配置介绍（用于本地开发环境）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack'),
    merge = require('webpack-merge'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    webpackBaseConfig = require('./webpack.base.config.js'),
    //本地启动服务控制浏览器打开页面路径
    OpenBrowserPlugin = require('open-browser-webpack-plugin');
    //启动服务过程，友好错误提示插件
    FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const PATHS = require('./PATHS'),
    PORTS = require('./PORTS'),
    CONFIG = require('./CONFIG'),
    UTIL = require('./UTIL');
//配置
var webpackDevConfig = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: 'http://localhost:' + PORTS.BROWSER_SYNC + '/views/',
    },
    plugins: [
        new ExtractTextPlugin({
            filename: PATHS.SRC.join('css/[name].css'),
            disable: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '&quot;development&quot;'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors'),
        new FriendlyErrorsPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:'+PORTS.BROWSER_SYNC+'/views/' })
    ],
    //配置本地服务命令
    devServer: {
        port: PORTS.BROWSER_SYNC,
        noInfo: true,
        proxy: CONFIG.proxy,
        //热加载
        hot: true,
        inline: true,
        compress: false
    }
});


//html files
UTIL.generateHtml(webpackDevConfig);
module.exports = webpackDevConfig;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>),
    merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>),
    HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>),
    ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>),
    webpackBaseConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.config.js'</span>),
    <span class="hljs-comment">//本地启动服务控制浏览器打开页面路径</span>
    OpenBrowserPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'open-browser-webpack-plugin'</span>);
    <span class="hljs-comment">//启动服务过程，友好错误提示插件</span>
    FriendlyErrorsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'friendly-errors-webpack-plugin'</span>);

<span class="hljs-keyword">const</span> PATHS = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./PATHS'</span>),
    PORTS = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./PORTS'</span>),
    CONFIG = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./CONFIG'</span>),
    UTIL = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./UTIL'</span>);
<span class="hljs-comment">//配置</span>
<span class="hljs-keyword">var</span> webpackDevConfig = merge(webpackBaseConfig, {
    <span class="hljs-attr">devtool</span>: <span class="hljs-string">'#source-map'</span>,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'http://localhost:'</span> + PORTS.BROWSER_SYNC + <span class="hljs-string">'/views/'</span>,
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> ExtractTextPlugin({
            <span class="hljs-attr">filename</span>: PATHS.SRC.join(<span class="hljs-string">'css/[name].css'</span>),
            <span class="hljs-attr">disable</span>: <span class="hljs-literal">true</span>
        }),
        <span class="hljs-keyword">new</span> webpack.DefinePlugin({
            <span class="hljs-string">'process.env'</span>: {
                <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-string">'"development"'</span>
            }
        }),
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'vendors'</span>),
        <span class="hljs-keyword">new</span> FriendlyErrorsPlugin(),
        <span class="hljs-keyword">new</span> OpenBrowserPlugin({ <span class="hljs-attr">url</span>: <span class="hljs-string">'http://localhost:'</span>+PORTS.BROWSER_SYNC+<span class="hljs-string">'/views/'</span> })
    ],
    <span class="hljs-comment">//配置本地服务命令</span>
    devServer: {
        <span class="hljs-attr">port</span>: PORTS.BROWSER_SYNC,
        <span class="hljs-attr">noInfo</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">proxy</span>: CONFIG.proxy,
        <span class="hljs-comment">//热加载</span>
        hot: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">inline</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">compress</span>: <span class="hljs-literal">false</span>
    }
});


<span class="hljs-comment">//html files</span>
UTIL.generateHtml(webpackDevConfig);
<span class="hljs-built_in">module</span>.exports = webpackDevConfig;

</code></pre>
<hr>
<p>UTIL.js配置介绍 主要是多入口文件检索和多页面生成两方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path'),
      /*多页面引入工具，glob*/
      glob = require('glob'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDORS = require('./VENDORS'),
      PATHS   = require('./PATHS'),
      PORTS   = require('./PORTS'),
      CONFIG  = require('./config');


 // filter path 
let filterPath = 'views';

// 获取对应的路径 util
function getEntry(globPath) {
    var entries = {},
        enrtryArr = [],
        entryLen = 0,
        basename, tmp, pathname;
    glob.sync(globPath).forEach(function(entry) {
        basename = path.basename(entry, path.extname(entry)); //获取entry路径下，文件名称
        /*
            仅支持index.js/html,否则排除entry
        */
        if(basename != 'index'){
            return true;
        }
        enrtryArr = entry.split('/');
        entrylen  = enrtryArr.length;
        tmp = enrtryArr.splice(2-entryLen);
        if(tmp[1] == filterPath){
            pathname = basename;
        } else {
            let delePos = tmp.length - 2;
            pathname = tmp.splice(1, delePos).join('/') + '/' + basename; // 正确输出js和html的路径    
       }
        entries[pathname] = entry;
    });
    return entries;
}
//utils-function 生成html页面
function generateHtml(config, htmlPath){
    var pages = getEntry('./src/views/**/*.html');
    var filepath = htmlPath ? htmlPath : '',
        pathName = &quot;&quot;;
    for (var pathname in pages) {
        // 配置生成的 html 文件，定义路径等
        pathName =  pathname.replace(/^\//,&quot;&quot;);
        var conf = {
            title: CONFIG.title,
            filename: filepath + pathName + '.html', // html 文件输出路径
            template: pages[pathname], // 模板路径
            inject: true, // js 插入位置
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        };
        if (pathname in config.entry) {
            conf.chunks = ['vendors', pathname];
            conf.hash = true;
        }
        // 需要生成几个 html 文件，就配置几个 HtmlWebpackPlugin 对象
        config.plugins.push(new HtmlWebpackPlugin(conf));
    }
}

var resolvePath = {
    self:this,
    filterPath:'views',
    getEntry:getEntry,
    generateHtml:generateHtml
}

module.exports = resolvePath;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>),
      <span class="hljs-comment">/*多页面引入工具，glob*/</span>
      glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">'glob'</span>),
      HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);

<span class="hljs-keyword">const</span> VENDORS = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./VENDORS'</span>),
      PATHS   = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./PATHS'</span>),
      PORTS   = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./PORTS'</span>),
      CONFIG  = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./config'</span>);


 <span class="hljs-comment">// filter path </span>
<span class="hljs-keyword">let</span> filterPath = <span class="hljs-string">'views'</span>;

<span class="hljs-comment">// 获取对应的路径 util</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getEntry</span>(<span class="hljs-params">globPath</span>) </span>{
    <span class="hljs-keyword">var</span> entries = {},
        enrtryArr = [],
        entryLen = <span class="hljs-number">0</span>,
        basename, tmp, pathname;
    glob.sync(globPath).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">entry</span>) </span>{
        basename = path.basename(entry, path.extname(entry)); <span class="hljs-comment">//获取entry路径下，文件名称</span>
        <span class="hljs-comment">/*
            仅支持index.js/html,否则排除entry
        */</span>
        <span class="hljs-keyword">if</span>(basename != <span class="hljs-string">'index'</span>){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
        enrtryArr = entry.split(<span class="hljs-string">'/'</span>);
        entrylen  = enrtryArr.length;
        tmp = enrtryArr.splice(<span class="hljs-number">2</span>-entryLen);
        <span class="hljs-keyword">if</span>(tmp[<span class="hljs-number">1</span>] == filterPath){
            pathname = basename;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">let</span> delePos = tmp.length - <span class="hljs-number">2</span>;
            pathname = tmp.splice(<span class="hljs-number">1</span>, delePos).join(<span class="hljs-string">'/'</span>) + <span class="hljs-string">'/'</span> + basename; <span class="hljs-comment">// 正确输出js和html的路径    </span>
       }
        entries[pathname] = entry;
    });
    <span class="hljs-keyword">return</span> entries;
}
<span class="hljs-comment">//utils-function 生成html页面</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateHtml</span>(<span class="hljs-params">config, htmlPath</span>)</span>{
    <span class="hljs-keyword">var</span> pages = getEntry(<span class="hljs-string">'./src/views/**/*.html'</span>);
    <span class="hljs-keyword">var</span> filepath = htmlPath ? htmlPath : <span class="hljs-string">''</span>,
        pathName = <span class="hljs-string">""</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> pathname <span class="hljs-keyword">in</span> pages) {
        <span class="hljs-comment">// 配置生成的 html 文件，定义路径等</span>
        pathName =  pathname.replace(<span class="hljs-regexp">/^\//</span>,<span class="hljs-string">""</span>);
        <span class="hljs-keyword">var</span> conf = {
            <span class="hljs-attr">title</span>: CONFIG.title,
            <span class="hljs-attr">filename</span>: filepath + pathName + <span class="hljs-string">'.html'</span>, <span class="hljs-comment">// html 文件输出路径</span>
            template: pages[pathname], <span class="hljs-comment">// 模板路径</span>
            inject: <span class="hljs-literal">true</span>, <span class="hljs-comment">// js 插入位置</span>
            minify: {
                <span class="hljs-attr">removeComments</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">collapseWhitespace</span>: <span class="hljs-literal">false</span>
            }
        };
        <span class="hljs-keyword">if</span> (pathname <span class="hljs-keyword">in</span> config.entry) {
            conf.chunks = [<span class="hljs-string">'vendors'</span>, pathname];
            conf.hash = <span class="hljs-literal">true</span>;
        }
        <span class="hljs-comment">// 需要生成几个 html 文件，就配置几个 HtmlWebpackPlugin 对象</span>
        config.plugins.push(<span class="hljs-keyword">new</span> HtmlWebpackPlugin(conf));
    }
}

<span class="hljs-keyword">var</span> resolvePath = {
    <span class="hljs-attr">self</span>:<span class="hljs-keyword">this</span>,
    <span class="hljs-attr">filterPath</span>:<span class="hljs-string">'views'</span>,
    <span class="hljs-attr">getEntry</span>:getEntry,
    <span class="hljs-attr">generateHtml</span>:generateHtml
}

<span class="hljs-built_in">module</span>.exports = resolvePath;

</code></pre>
<hr>
<p>PATHS.js配置介绍，主要是配置文件引用到的一些目录文件的绝对地址引用配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');

/**
 * 便捷求取路径原型函数
 * @param  {String} target
 * @return {String} path to target
 */
String.prototype.join = function (target) {
  return path.join(this.toString(), target);
};

// var ROOT = path.resolve(__dirname, '../..');
var ROOT = path.resolve(__dirname, '..');

module.exports = {
  ROOT: ROOT,                                // 项目根目录
  BUILD: ROOT.join('build'),                 // 构建工具配置目录
  DIST: ROOT.join('dist'),                   // build 后输出目录
  DOCS: ROOT.join('docs/_book'),             // build 后的文档
  MOCK: ROOT.join('mock'),                   // Mock Server 目录
  SRC: ROOT.join('src'),                     // 源码目录
  PAGES: ROOT.join('pages'),                 // 输出的html文件目录
  SERVICES: ROOT.join('src/services'),       // 服务层
};

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> path = <span class="hljs-keyword">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-comment">/**
 * 便捷求取路径原型函数
 * @param  {String} target
 * @return {String} path to target
 */</span>
<span class="hljs-built_in">String</span>.prototype.<span class="hljs-keyword">join</span> = function (target) {
  <span class="hljs-keyword">return</span> path.<span class="hljs-keyword">join</span>(this.toString(), target);
};

<span class="hljs-comment">// var ROOT = path.resolve(__dirname, '../..');</span>
<span class="hljs-built_in">var</span> ROOT = path.resolve(__dirname, <span class="hljs-string">'..'</span>);

module.exports = {
  ROOT: ROOT,                                <span class="hljs-comment">// 项目根目录</span>
  BUILD: ROOT.<span class="hljs-keyword">join</span>(<span class="hljs-string">'build'</span>),                 <span class="hljs-comment">// 构建工具配置目录</span>
  DIST: ROOT.<span class="hljs-keyword">join</span>(<span class="hljs-string">'dist'</span>),                   <span class="hljs-comment">// build 后输出目录</span>
  DOCS: ROOT.<span class="hljs-keyword">join</span>(<span class="hljs-string">'docs/_book'</span>),             <span class="hljs-comment">// build 后的文档</span>
  MOCK: ROOT.<span class="hljs-keyword">join</span>(<span class="hljs-string">'mock'</span>),                   <span class="hljs-comment">// Mock Server 目录</span>
  SRC: ROOT.<span class="hljs-keyword">join</span>(<span class="hljs-string">'src'</span>),                     <span class="hljs-comment">// 源码目录</span>
  PAGES: ROOT.<span class="hljs-keyword">join</span>(<span class="hljs-string">'pages'</span>),                 <span class="hljs-comment">// 输出的html文件目录</span>
  SERVICES: ROOT.<span class="hljs-keyword">join</span>(<span class="hljs-string">'src/services'</span>),       <span class="hljs-comment">// 服务层</span>
};

</code></pre>
<hr>
<h3 id="articleHeader7">2.src目录</h3>
<p><span class="img-wrap"><img data-src="/img/bVY4Il?w=390&amp;h=362" src="https://static.alili.tech/img/bVY4Il?w=390&amp;h=362" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>在根目录（mc-fev2-dev文件夹）下，创建src文件夹。</p>
<ol>
<li><p>assets:资源管理文件，里面放了一些公共css样式文件，img图片，字体文件等</p></li>
<li><p>components:共用组件模块（这里放了vue的公共组件）</p></li>
<li><p>libs：js公共库（封装了一些共用的业务上，或者功能上的js方法）</p></li>
<li><p>servies：服务层，封装了所有项目当中接口请求方法</p></li>
<li><p>views：视图层，多页面文件，具体不做展开</p></li>
</ol>
<p>其他几个是特定业务需要的，可忽略</p>
<hr>
<h2 id="articleHeader8">3.服务层介绍</h2>
<p>本项目用了superagent这个AJAX库，因为vue没有自己的AJAX库，结合es6的promise方法对superagent做了二次封装，便于在开发过程中，把异步逻辑，当作同步来写。<br>superagent.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import request from 'superagent'
import { rootPath, errHandler, env } from './config'


const xhr = ({ url, localUrl, body = null, method = 'get' , errFun}) => {
  //环境切换
  if(env == 'local' &amp;&amp; localUrl){//本地数据
    url = localUrl;
    method = 'get';
  }
  
  // P.S: 此处引入了 ES6 的 Promise 实现
  return new Promise((resolve, reject) => {
    request[method.toLowerCase()](url)
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      // 跨域允许带上 cookie（http://visionmedia.github.io/superagent/#cors）
      .withCredentials()
      .send(body)
      .end((err, re) => {
        if (err)
          return errFun ? errFun(err) : errHandler(err)
          // return errHandler(err)

        if (!re.body)
          return resolve(null)

        if (re.body._code)
          return errFun ? errFun(err) : errHandler(re.body._msg)
          // return errHandler(re.body._msg)

        resolve(re.body)
      })
  })
}

export default xhr

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> request <span class="hljs-keyword">from</span> <span class="hljs-string">'superagent'</span>
<span class="hljs-keyword">import</span> { rootPath, errHandler, env } <span class="hljs-keyword">from</span> <span class="hljs-string">'./config'</span>


<span class="hljs-keyword">const</span> xhr = <span class="hljs-function">(<span class="hljs-params">{ url, localUrl, body = <span class="hljs-literal">null</span>, method = <span class="hljs-string">'get'</span> , errFun}</span>) =&gt;</span> {
  <span class="hljs-comment">//环境切换</span>
  <span class="hljs-keyword">if</span>(env == <span class="hljs-string">'local'</span> &amp;&amp; localUrl){<span class="hljs-comment">//本地数据</span>
    url = localUrl;
    method = <span class="hljs-string">'get'</span>;
  }
  
  <span class="hljs-comment">// P.S: 此处引入了 ES6 的 Promise 实现</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    request[method.toLowerCase()](url)
      .set(<span class="hljs-string">'Content-Type'</span>, <span class="hljs-string">'application/x-www-form-urlencoded; charset=UTF-8'</span>)
      <span class="hljs-comment">// 跨域允许带上 cookie（http://visionmedia.github.io/superagent/#cors）</span>
      .withCredentials()
      .send(body)
      .end(<span class="hljs-function">(<span class="hljs-params">err, re</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (err)
          <span class="hljs-keyword">return</span> errFun ? errFun(err) : errHandler(err)
          <span class="hljs-comment">// return errHandler(err)</span>

        <span class="hljs-keyword">if</span> (!re.body)
          <span class="hljs-keyword">return</span> resolve(<span class="hljs-literal">null</span>)

        <span class="hljs-keyword">if</span> (re.body._code)
          <span class="hljs-keyword">return</span> errFun ? errFun(err) : errHandler(re.body._msg)
          <span class="hljs-comment">// return errHandler(re.body._msg)</span>

        resolve(re.body)
      })
  })
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> xhr

</code></pre>
<hr>
<h1 id="articleHeader9">总结</h1>
<p>第一次写这种框架性的文章，光大纲想了半天，不知道如何下手，写得不好各位大大勿喷，有什么疑问或者交流，欢迎留言+私信！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack2.x+vue2.x+node7.x+superagent 多入口多页面（MPA）开发环境搭建

## 原文链接
[https://segmentfault.com/a/1190000012134126](https://segmentfault.com/a/1190000012134126)


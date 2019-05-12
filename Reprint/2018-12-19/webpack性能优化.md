---
title: 'webpack性能优化' 
date: 2018-12-19 2:30:07
hidden: true
slug: xflb57edfon
categories: [reprint]
---

{{< raw >}}

                    
<p><code>webpack</code>是当下前端界中最著名的一个模块加载工具，<code>react</code>和<code>vue</code>也都是用其作为项目的开发工具之一。小组最近在二次开发一个开源项目，前端主要使用的技术栈试<code>react+redux+es6</code>。构建工具则采用的是<code>webpack</code>。起初整个项目的<code>2707 modules</code>打包花费时长大概有<code>112s</code>，经过对一番折腾，使整个打包编译时间降到<code>40s</code>左右。</p>
<p>下面是整个项目的<code>webpack.config.js</code>文件，可以参考这个文件进行下面的阅读。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;babel-register&quot;);
require(&quot;babel-polyfill&quot;);

var webpack = require('webpack');
var webpackPostcssTools = require('webpack-postcss-tools');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var UnusedFilesWebpackPlugin = require(&quot;unused-files-webpack-plugin&quot;).default;
var BannerWebpackPlugin = require('banner-webpack-plugin');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var HappyPack = require('happypack');
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

var _ = require('underscore');
var glob = require('glob');
var fs = require('fs');

var chevrotain = require(&quot;chevrotain&quot;);
var allTokens = require(&quot;./frontend/src/metabase/lib/expressions/tokens&quot;).allTokens;

function hasArg(arg) {
    var regex = new RegExp(&quot;^&quot; + ((arg.length === 2) ? (&quot;-\\w*&quot;+arg[1]+&quot;\\w*&quot;) : (arg)) + &quot;$&quot;);
    return process.argv.filter(regex.test.bind(regex)).length > 0;
}

var SRC_PATH = __dirname + '/frontend/src/metabase';
var BUILD_PATH = __dirname + '/resources/frontend_client';

// default NODE_ENV to development
var NODE_ENV = process.env[&quot;NODE_ENV&quot;] || &quot;development&quot;;

var IS_WATCHING = hasArg(&quot;-w&quot;) || hasArg(&quot;--watch&quot;);
if (IS_WATCHING) {
    process.stderr.write(&quot;Warning: in webpack watch mode you must restart webpack if you change any CSS variables or custom media queries\n&quot;);
}

// Babel:
var BABEL_CONFIG = {
    cacheDirectory: &quot;.babel_cache&quot;
};

// Build mapping of CSS variables
var CSS_SRC = glob.sync(SRC_PATH + '/css/**/*.css');
var CSS_MAPS = { vars: {}, media: {}, selector: {} };
CSS_SRC.map(webpackPostcssTools.makeVarMap).forEach(function(map) {
    for (var name in CSS_MAPS) _.extend(CSS_MAPS[name], map[name]);
});

// CSS Next:
var CSSNEXT_CONFIG = {
    features: {
        // pass in the variables and custom media we scanned for before
        customProperties: { variables: CSS_MAPS.vars },
        customMedia: { extensions: CSS_MAPS.media }
    },
    import: {
        path: ['resources/frontend_client/app/css']
    },
    compress: false
};

var CSS_CONFIG = {
    localIdentName: NODE_ENV !== &quot;production&quot; ?
        &quot;[name]__[local]___[hash:base64:5]&quot; :
        &quot;[hash:base64:5]&quot;,
    restructuring: false,
    compatibility: true,
    url: false, // disabled because we need to use relative url()
    importLoaders: 1
}

// happypack.config
var happyPackConfig = {
    plugins:[
        new HappyPack({
           id: 'happyBabel',
           threads: 4,
           cache: true,
           loaders:[
               {
                   path: 'babel',
                   query: BABEL_CONFIG
               }
           ]
        }),
        new HappyPack({
            id: 'happyEslint',
            threads: 4,
            cache: true,
            loaders: ['eslint']
        })
    ]
}

var config = module.exports = {
    context: SRC_PATH,
    entry: {
        &quot;app-main&quot;: './app-main.js',
        &quot;app-public&quot;: './app-public.js',
        &quot;app-embed&quot;: './app-embed.js',
        styles: './css/index.css',
    },

    // output to &quot;dist&quot;
    output: {
        path: BUILD_PATH + '/app/dist',
        filename: '[name].bundle.js?[hash]',
        publicPath: 'app/dist/'
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'HappyPack/loader?id=happyBabel'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules|\.spec\.js/,
                loader: 'HappyPack/loader?id=happyEslint'
            },
            {
                test: /\.(eot|woff2?|ttf|svg|png)$/,
                loader: &quot;file-loader&quot;
            },
            {
                test: /\.json$/,
                loader: &quot;json-loader&quot;
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(&quot;style-loader&quot;, &quot;css-loader?&quot; + JSON.stringify(CSS_CONFIG) + &quot;!postcss-loader&quot;)
            }
        ]
    },

    resolve: {
        extensions: [&quot;&quot;, &quot;.webpack.js&quot;, &quot;.web.js&quot;, &quot;.js&quot;, &quot;.jsx&quot;, &quot;.css&quot;],
        alias: {
            'metabase':             SRC_PATH,
            'style':                SRC_PATH + '/css/core/index.css',
            'ace':                  __dirname + '/node_modules/ace-builds/src-min-noconflict',
        }
    },

    plugins: [
        new UnusedFilesWebpackPlugin({
            globOptions: {
                ignore: [
                    &quot;**/types/*.js&quot;,
                    &quot;**/*.spec.*&quot;,
                    &quot;**/__support__/*.js&quot;
                ]
            }
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json'),
            name:&quot;vendors_dll&quot;
        }),
        // Extracts initial CSS into a standard stylesheet that can be loaded in parallel with JavaScript
        // NOTE: the filename on disk won't include &quot;?[chunkhash]&quot; but the URL in index.html generated by HtmlWebpackPlugin will:
        new ExtractTextPlugin('[name].bundle.css?[contenthash]'),
        new HtmlWebpackPlugin({
            filename: '../../index.html',
            chunks: [&quot;app-main&quot;, &quot;styles&quot;],
            template: __dirname + '/resources/frontend_client/index_template.html',
            inject: 'head',
            alwaysWriteToDisk: true,
        }),
        new HtmlWebpackPlugin({
            filename: '../../public.html',
            chunks: [&quot;app-public&quot;, &quot;styles&quot;],
            template: __dirname + '/resources/frontend_client/index_template.html',
            inject: 'head',
            alwaysWriteToDisk: true,
        }),
        new HtmlWebpackPlugin({
            filename: '../../embed.html',
            chunks: [&quot;app-embed&quot;, &quot;styles&quot;],
            template: __dirname + '/resources/frontend_client/index_template.html',
            inject: 'head',
            alwaysWriteToDisk: true,
        }),
        new AddAssetHtmlPlugin({
            filepath: BUILD_PATH + '/app/dist/*.dll.js',
            includeSourcemap: false
        }),
        new HtmlWebpackHarddiskPlugin({
            outputPath: __dirname + '/resources/frontend_client/app/dist'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        }),
        new BannerWebpackPlugin({
            chunks: {
                'app-main': {
                    beforeContent: &quot;/*\n* This file is subject to the terms and conditions defined in\n * file 'LICENSE.txt', which is part of this source code package.\n */\n&quot;,
                },
                'app-public': {
                    beforeContent: &quot;/*\n* This file is subject to the terms and conditions defined in\n * file 'LICENSE.txt', which is part of this source code package.\n */\n&quot;,
                },
                'app-embed': {
                    beforeContent: &quot;/*\n* This file is subject to the terms and conditions defined in\n * file 'LICENSE-EMBEDDING.txt', which is part of this source code package.\n */\n&quot;,
                },
            }
        }),
    ].concat(happyPackConfig.plugins),

    postcss: function (webpack) {
        return [
            require(&quot;postcss-import&quot;)(),
            require(&quot;postcss-url&quot;)(),
            require(&quot;postcss-cssnext&quot;)(CSSNEXT_CONFIG)
        ]
    }
};

if (NODE_ENV === &quot;hot&quot;) {
    // suffixing with &quot;.hot&quot; allows us to run both `yarn run build-hot` and `yarn run test` or `yarn run test-watch` simultaneously
    config.output.filename = &quot;[name].hot.bundle.js?[hash]&quot;;

    // point the publicPath (inlined in index.html by HtmlWebpackPlugin) to the hot-reloading server
    config.output.publicPath = &quot;http://localhost:8080/&quot; + config.output.publicPath;

    config.module.loaders.unshift({
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?'+JSON.stringify(BABEL_CONFIG)]
    });

    // disable ExtractTextPlugin
    config.module.loaders[config.module.loaders.length - 1].loader = &quot;style-loader!css-loader?&quot; + JSON.stringify(CSS_CONFIG) + &quot;!postcss-loader&quot;

    config.devServer = {
        hot: true,
        inline: true,
        contentBase: &quot;frontend&quot;
    };

    config.plugins.unshift(
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    );
}

if (NODE_ENV !== &quot;production&quot;) {
    // replace minified files with un-minified versions
    for (var name in config.resolve.alias) {
        var minified = config.resolve.alias[name];
        var unminified = minified.replace(/[.-\/]min\b/g, '');
        if (minified !== unminified &amp;&amp; fs.existsSync(unminified)) {
            config.resolve.alias[name] = unminified;
        }
    }

    // enable &quot;cheap&quot; source maps in hot or watch mode since re-build speed overhead is < 1 second
    config.devtool = &quot;cheap-module-source-map&quot;;
    config.output.devtoolModuleFilenameTemplate = '[absolute-resource-path]';
    config.output.pathinfo = true;
} else {
    config.plugins.push(new ParallelUglifyPlugin({
        uglifyJs:{
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
            mangle: {
                except: allTokens.map(function(currTok) {
                    return chevrotain.tokenName(currTok);
                })
            }
        },
        cacheDir: '.js-cache'
    }))

    config.devtool = &quot;source-map&quot;;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-register"</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-polyfill"</span>);

<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> webpackPostcssTools = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-postcss-tools'</span>);

<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">var</span> HtmlWebpackHarddiskPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-harddisk-plugin'</span>);
<span class="hljs-keyword">var</span> UnusedFilesWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"unused-files-webpack-plugin"</span>).default;
<span class="hljs-keyword">var</span> BannerWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'banner-webpack-plugin'</span>);
<span class="hljs-keyword">var</span> AddAssetHtmlPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'add-asset-html-webpack-plugin'</span>);
<span class="hljs-keyword">var</span> HappyPack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'happypack'</span>);
<span class="hljs-keyword">var</span> ParallelUglifyPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-parallel-uglify-plugin'</span>);

<span class="hljs-keyword">var</span> _ = <span class="hljs-built_in">require</span>(<span class="hljs-string">'underscore'</span>);
<span class="hljs-keyword">var</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">'glob'</span>);
<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);

<span class="hljs-keyword">var</span> chevrotain = <span class="hljs-built_in">require</span>(<span class="hljs-string">"chevrotain"</span>);
<span class="hljs-keyword">var</span> allTokens = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./frontend/src/metabase/lib/expressions/tokens"</span>).allTokens;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasArg</span>(<span class="hljs-params">arg</span>) </span>{
    <span class="hljs-keyword">var</span> regex = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"^"</span> + ((arg.length === <span class="hljs-number">2</span>) ? (<span class="hljs-string">"-\\w*"</span>+arg[<span class="hljs-number">1</span>]+<span class="hljs-string">"\\w*"</span>) : (arg)) + <span class="hljs-string">"$"</span>);
    <span class="hljs-keyword">return</span> process.argv.filter(regex.test.bind(regex)).length &gt; <span class="hljs-number">0</span>;
}

<span class="hljs-keyword">var</span> SRC_PATH = __dirname + <span class="hljs-string">'/frontend/src/metabase'</span>;
<span class="hljs-keyword">var</span> BUILD_PATH = __dirname + <span class="hljs-string">'/resources/frontend_client'</span>;

<span class="hljs-comment">// default NODE_ENV to development</span>
<span class="hljs-keyword">var</span> NODE_ENV = process.env[<span class="hljs-string">"NODE_ENV"</span>] || <span class="hljs-string">"development"</span>;

<span class="hljs-keyword">var</span> IS_WATCHING = hasArg(<span class="hljs-string">"-w"</span>) || hasArg(<span class="hljs-string">"--watch"</span>);
<span class="hljs-keyword">if</span> (IS_WATCHING) {
    process.stderr.write(<span class="hljs-string">"Warning: in webpack watch mode you must restart webpack if you change any CSS variables or custom media queries\n"</span>);
}

<span class="hljs-comment">// Babel:</span>
<span class="hljs-keyword">var</span> BABEL_CONFIG = {
    <span class="hljs-attr">cacheDirectory</span>: <span class="hljs-string">".babel_cache"</span>
};

<span class="hljs-comment">// Build mapping of CSS variables</span>
<span class="hljs-keyword">var</span> CSS_SRC = glob.sync(SRC_PATH + <span class="hljs-string">'/css/**/*.css'</span>);
<span class="hljs-keyword">var</span> CSS_MAPS = { <span class="hljs-attr">vars</span>: {}, <span class="hljs-attr">media</span>: {}, <span class="hljs-attr">selector</span>: {} };
CSS_SRC.map(webpackPostcssTools.makeVarMap).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">map</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> name <span class="hljs-keyword">in</span> CSS_MAPS) _.extend(CSS_MAPS[name], map[name]);
});

<span class="hljs-comment">// CSS Next:</span>
<span class="hljs-keyword">var</span> CSSNEXT_CONFIG = {
    <span class="hljs-attr">features</span>: {
        <span class="hljs-comment">// pass in the variables and custom media we scanned for before</span>
        customProperties: { <span class="hljs-attr">variables</span>: CSS_MAPS.vars },
        <span class="hljs-attr">customMedia</span>: { <span class="hljs-attr">extensions</span>: CSS_MAPS.media }
    },
    <span class="hljs-attr">import</span>: {
        <span class="hljs-attr">path</span>: [<span class="hljs-string">'resources/frontend_client/app/css'</span>]
    },
    <span class="hljs-attr">compress</span>: <span class="hljs-literal">false</span>
};

<span class="hljs-keyword">var</span> CSS_CONFIG = {
    <span class="hljs-attr">localIdentName</span>: NODE_ENV !== <span class="hljs-string">"production"</span> ?
        <span class="hljs-string">"[name]__[local]___[hash:base64:5]"</span> :
        <span class="hljs-string">"[hash:base64:5]"</span>,
    <span class="hljs-attr">restructuring</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">compatibility</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">url</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// disabled because we need to use relative url()</span>
    importLoaders: <span class="hljs-number">1</span>
}

<span class="hljs-comment">// happypack.config</span>
<span class="hljs-keyword">var</span> happyPackConfig = {
    <span class="hljs-attr">plugins</span>:[
        <span class="hljs-keyword">new</span> HappyPack({
           <span class="hljs-attr">id</span>: <span class="hljs-string">'happyBabel'</span>,
           <span class="hljs-attr">threads</span>: <span class="hljs-number">4</span>,
           <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span>,
           <span class="hljs-attr">loaders</span>:[
               {
                   <span class="hljs-attr">path</span>: <span class="hljs-string">'babel'</span>,
                   <span class="hljs-attr">query</span>: BABEL_CONFIG
               }
           ]
        }),
        <span class="hljs-keyword">new</span> HappyPack({
            <span class="hljs-attr">id</span>: <span class="hljs-string">'happyEslint'</span>,
            <span class="hljs-attr">threads</span>: <span class="hljs-number">4</span>,
            <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">loaders</span>: [<span class="hljs-string">'eslint'</span>]
        })
    ]
}

<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">context</span>: SRC_PATH,
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-string">"app-main"</span>: <span class="hljs-string">'./app-main.js'</span>,
        <span class="hljs-string">"app-public"</span>: <span class="hljs-string">'./app-public.js'</span>,
        <span class="hljs-string">"app-embed"</span>: <span class="hljs-string">'./app-embed.js'</span>,
        <span class="hljs-attr">styles</span>: <span class="hljs-string">'./css/index.css'</span>,
    },

    <span class="hljs-comment">// output to "dist"</span>
    output: {
        <span class="hljs-attr">path</span>: BUILD_PATH + <span class="hljs-string">'/app/dist'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].bundle.js?[hash]'</span>,
        <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'app/dist/'</span>
    },

    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">'HappyPack/loader?id=happyBabel'</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules|\.spec\.js/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">'HappyPack/loader?id=happyEslint'</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(eot|woff2?|ttf|svg|png)$/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"file-loader"</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.json$/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"json-loader"</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
                <span class="hljs-attr">loader</span>: ExtractTextPlugin.extract(<span class="hljs-string">"style-loader"</span>, <span class="hljs-string">"css-loader?"</span> + <span class="hljs-built_in">JSON</span>.stringify(CSS_CONFIG) + <span class="hljs-string">"!postcss-loader"</span>)
            }
        ]
    },

    <span class="hljs-attr">resolve</span>: {
        <span class="hljs-attr">extensions</span>: [<span class="hljs-string">""</span>, <span class="hljs-string">".webpack.js"</span>, <span class="hljs-string">".web.js"</span>, <span class="hljs-string">".js"</span>, <span class="hljs-string">".jsx"</span>, <span class="hljs-string">".css"</span>],
        <span class="hljs-attr">alias</span>: {
            <span class="hljs-string">'metabase'</span>:             SRC_PATH,
            <span class="hljs-string">'style'</span>:                SRC_PATH + <span class="hljs-string">'/css/core/index.css'</span>,
            <span class="hljs-string">'ace'</span>:                  __dirname + <span class="hljs-string">'/node_modules/ace-builds/src-min-noconflict'</span>,
        }
    },

    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> UnusedFilesWebpackPlugin({
            <span class="hljs-attr">globOptions</span>: {
                <span class="hljs-attr">ignore</span>: [
                    <span class="hljs-string">"**/types/*.js"</span>,
                    <span class="hljs-string">"**/*.spec.*"</span>,
                    <span class="hljs-string">"**/__support__/*.js"</span>
                ]
            }
        }),
        <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
            <span class="hljs-attr">context</span>: __dirname,
            <span class="hljs-attr">manifest</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./manifest.json'</span>),
            <span class="hljs-attr">name</span>:<span class="hljs-string">"vendors_dll"</span>
        }),
        <span class="hljs-comment">// Extracts initial CSS into a standard stylesheet that can be loaded in parallel with JavaScript</span>
        <span class="hljs-comment">// <span class="hljs-doctag">NOTE:</span> the filename on disk won't include "?[chunkhash]" but the URL in index.html generated by HtmlWebpackPlugin will:</span>
        <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'[name].bundle.css?[contenthash]'</span>),
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'../../index.html'</span>,
            <span class="hljs-attr">chunks</span>: [<span class="hljs-string">"app-main"</span>, <span class="hljs-string">"styles"</span>],
            <span class="hljs-attr">template</span>: __dirname + <span class="hljs-string">'/resources/frontend_client/index_template.html'</span>,
            <span class="hljs-attr">inject</span>: <span class="hljs-string">'head'</span>,
            <span class="hljs-attr">alwaysWriteToDisk</span>: <span class="hljs-literal">true</span>,
        }),
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'../../public.html'</span>,
            <span class="hljs-attr">chunks</span>: [<span class="hljs-string">"app-public"</span>, <span class="hljs-string">"styles"</span>],
            <span class="hljs-attr">template</span>: __dirname + <span class="hljs-string">'/resources/frontend_client/index_template.html'</span>,
            <span class="hljs-attr">inject</span>: <span class="hljs-string">'head'</span>,
            <span class="hljs-attr">alwaysWriteToDisk</span>: <span class="hljs-literal">true</span>,
        }),
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'../../embed.html'</span>,
            <span class="hljs-attr">chunks</span>: [<span class="hljs-string">"app-embed"</span>, <span class="hljs-string">"styles"</span>],
            <span class="hljs-attr">template</span>: __dirname + <span class="hljs-string">'/resources/frontend_client/index_template.html'</span>,
            <span class="hljs-attr">inject</span>: <span class="hljs-string">'head'</span>,
            <span class="hljs-attr">alwaysWriteToDisk</span>: <span class="hljs-literal">true</span>,
        }),
        <span class="hljs-keyword">new</span> AddAssetHtmlPlugin({
            <span class="hljs-attr">filepath</span>: BUILD_PATH + <span class="hljs-string">'/app/dist/*.dll.js'</span>,
            <span class="hljs-attr">includeSourcemap</span>: <span class="hljs-literal">false</span>
        }),
        <span class="hljs-keyword">new</span> HtmlWebpackHarddiskPlugin({
            <span class="hljs-attr">outputPath</span>: __dirname + <span class="hljs-string">'/resources/frontend_client/app/dist'</span>
        }),
        <span class="hljs-keyword">new</span> webpack.DefinePlugin({
            <span class="hljs-string">'process.env'</span>: {
                <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-built_in">JSON</span>.stringify(NODE_ENV)
            }
        }),
        <span class="hljs-keyword">new</span> BannerWebpackPlugin({
            <span class="hljs-attr">chunks</span>: {
                <span class="hljs-string">'app-main'</span>: {
                    <span class="hljs-attr">beforeContent</span>: <span class="hljs-string">"/*\n* This file is subject to the terms and conditions defined in\n * file 'LICENSE.txt', which is part of this source code package.\n */\n"</span>,
                },
                <span class="hljs-string">'app-public'</span>: {
                    <span class="hljs-attr">beforeContent</span>: <span class="hljs-string">"/*\n* This file is subject to the terms and conditions defined in\n * file 'LICENSE.txt', which is part of this source code package.\n */\n"</span>,
                },
                <span class="hljs-string">'app-embed'</span>: {
                    <span class="hljs-attr">beforeContent</span>: <span class="hljs-string">"/*\n* This file is subject to the terms and conditions defined in\n * file 'LICENSE-EMBEDDING.txt', which is part of this source code package.\n */\n"</span>,
                },
            }
        }),
    ].concat(happyPackConfig.plugins),

    <span class="hljs-attr">postcss</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">webpack</span>) </span>{
        <span class="hljs-keyword">return</span> [
            <span class="hljs-built_in">require</span>(<span class="hljs-string">"postcss-import"</span>)(),
            <span class="hljs-built_in">require</span>(<span class="hljs-string">"postcss-url"</span>)(),
            <span class="hljs-built_in">require</span>(<span class="hljs-string">"postcss-cssnext"</span>)(CSSNEXT_CONFIG)
        ]
    }
};

<span class="hljs-keyword">if</span> (NODE_ENV === <span class="hljs-string">"hot"</span>) {
    <span class="hljs-comment">// suffixing with ".hot" allows us to run both `yarn run build-hot` and `yarn run test` or `yarn run test-watch` simultaneously</span>
    config.output.filename = <span class="hljs-string">"[name].hot.bundle.js?[hash]"</span>;

    <span class="hljs-comment">// point the publicPath (inlined in index.html by HtmlWebpackPlugin) to the hot-reloading server</span>
    config.output.publicPath = <span class="hljs-string">"http://localhost:8080/"</span> + config.output.publicPath;

    config.module.loaders.unshift({
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">loaders</span>: [<span class="hljs-string">'react-hot'</span>, <span class="hljs-string">'babel?'</span>+<span class="hljs-built_in">JSON</span>.stringify(BABEL_CONFIG)]
    });

    <span class="hljs-comment">// disable ExtractTextPlugin</span>
    config.module.loaders[config.module.loaders.length - <span class="hljs-number">1</span>].loader = <span class="hljs-string">"style-loader!css-loader?"</span> + <span class="hljs-built_in">JSON</span>.stringify(CSS_CONFIG) + <span class="hljs-string">"!postcss-loader"</span>

    config.devServer = {
        <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">inline</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">contentBase</span>: <span class="hljs-string">"frontend"</span>
    };

    config.plugins.unshift(
        <span class="hljs-keyword">new</span> webpack.NoErrorsPlugin(),
        <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
    );
}

<span class="hljs-keyword">if</span> (NODE_ENV !== <span class="hljs-string">"production"</span>) {
    <span class="hljs-comment">// replace minified files with un-minified versions</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> name <span class="hljs-keyword">in</span> config.resolve.alias) {
        <span class="hljs-keyword">var</span> minified = config.resolve.alias[name];
        <span class="hljs-keyword">var</span> unminified = minified.replace(<span class="hljs-regexp">/[.-\/]min\b/g</span>, <span class="hljs-string">''</span>);
        <span class="hljs-keyword">if</span> (minified !== unminified &amp;&amp; fs.existsSync(unminified)) {
            config.resolve.alias[name] = unminified;
        }
    }

    <span class="hljs-comment">// enable "cheap" source maps in hot or watch mode since re-build speed overhead is &lt; 1 second</span>
    config.devtool = <span class="hljs-string">"cheap-module-source-map"</span>;
    config.output.devtoolModuleFilenameTemplate = <span class="hljs-string">'[absolute-resource-path]'</span>;
    config.output.pathinfo = <span class="hljs-literal">true</span>;
} <span class="hljs-keyword">else</span> {
    config.plugins.push(<span class="hljs-keyword">new</span> ParallelUglifyPlugin({
        <span class="hljs-attr">uglifyJs</span>:{
            <span class="hljs-attr">compress</span>: {
                <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>,
            },
            <span class="hljs-attr">output</span>: {
                <span class="hljs-attr">comments</span>: <span class="hljs-literal">false</span>,
            },
            <span class="hljs-attr">mangle</span>: {
                <span class="hljs-attr">except</span>: allTokens.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">currTok</span>) </span>{
                    <span class="hljs-keyword">return</span> chevrotain.tokenName(currTok);
                })
            }
        },
        <span class="hljs-attr">cacheDir</span>: <span class="hljs-string">'.js-cache'</span>
    }))

    config.devtool = <span class="hljs-string">"source-map"</span>;
}
</code></pre>
<p><code>webpack</code>编译缓慢一直是现代化前端开发的一个痛点。社区中很多优秀的开发者都贡献出非常多的插件来视图解决这个问题。下面就将本文中用到的插件抛出，在下面这几个插件的配合下，编译速度会得到显著的提升。</p>
<ul>
<li>
<code>happypack</code>: 让<code>loader</code>以多进程去处理文件，借助缓存机制，可以在<code>rebuild</code>的时候更快</li>
<li>
<code>webpack.DllPlugin</code>: 优先构建<code>npm</code>的第三方包</li>
<li>
<code>webpack.DllReferencePlugin</code>: 只负责用来引用由<code>webpack.DllPlugin</code>生成的第三方依赖项</li>
<li>
<code>webpack-parallel-uglify-plugin</code>: 并行压缩<code>javascript</code>文件(生产环境中使用，可以显著的提升构建速度)</li>
</ul>
<p>下面就对这些插件以及我踩下的坑进行一个简单的介绍。</p>
<h3 id="articleHeader0"><code>happypack</code></h3>
<blockquote><a href="https://github.com/amireh/happypack" rel="nofollow noreferrer" target="_blank">https://github.com/amireh/happypack</a></blockquote>
<p><code>happypack</code>允许<code>webpack</code>并行编译多个文件来提升构建速度。但是在某些情况下，其提升的效果并不是十分明显，这个时候就需要看一下自己电脑的<code>cpu</code>占用率，以及进程的运行情况。</p>
<p><code>happypack</code>作为<code>webpack</code>的一个插件，所以在使用之前应该先安装。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add happywebpack -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yarn add happywebpack -D</code></pre>
<p>配置过程很简单，只需要在<code>plugins</code>选项中创建其实例，可以创建一个或多个，然后在<code>loader</code>中引用即可。只需要注意一点，当创建多个<code>happypack</code>的实例的时候，给每个实例传递一个<code>id</code>参数。基本的变动如下：</p>
<p><strong>原配置文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 省略了部分的配置文件
var config = module.exports = {
    //................
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: BABEL_CONFIG
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules|\.spec\.js/,
                loader: 'eslint'
            },
            {
                test: /\.(eot|woff2?|ttf|svg|png)$/,
                loader: &quot;file-loader&quot;
            },
            {
                test: /\.json$/,
                loader: &quot;json-loader&quot;
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(&quot;style-loader&quot;, &quot;css-loader?&quot; + JSON.stringify(CSS_CONFIG) + &quot;!postcss-loader&quot;)
            }
        ]
    }
    //...............
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 省略了部分的配置文件</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-comment">//................</span>
    <span class="hljs-built_in">module</span>: {
        <span class="hljs-attr">loaders</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
                <span class="hljs-attr">query</span>: BABEL_CONFIG
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules|\.spec\.js/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">'eslint'</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(eot|woff2?|ttf|svg|png)$/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"file-loader"</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.json$/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"json-loader"</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
                <span class="hljs-attr">loader</span>: ExtractTextPlugin.extract(<span class="hljs-string">"style-loader"</span>, <span class="hljs-string">"css-loader?"</span> + <span class="hljs-built_in">JSON</span>.stringify(CSS_CONFIG) + <span class="hljs-string">"!postcss-loader"</span>)
            }
        ]
    }
    <span class="hljs-comment">//...............</span>
}</code></pre>
<p><strong>改动如下</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// happypack.config：更多的配置可以参考文档，按需索取。
var happyPackConfig = {
    plugins:[
        new HappyPack({
           id: 'happyBabel',
           threads: 4,
           cache: true,
           loaders:[
               {
                   path: 'babel',
                   query: BABEL_CONFIG
               }
           ]
        }),
        new HappyPack({
            id: 'happyEslint',
            threads: 4,
            cache: true,
            loaders: ['eslint']
        })
    ]
}
var config = module.exports = {
    //................
    module: {
        loaders: [
            // 变动这两个
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'HappyPack/loader?id=happyBabel'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules|\.spec\.js/,
                loader: 'HappyPack/loader?id=happyEslint'
            },
            // 其它的并未改动
            {
                test: /\.(eot|woff2?|ttf|svg|png)$/,
                loader: &quot;file-loader&quot;
            },
            {
                test: /\.json$/,
                loader: &quot;json-loader&quot;
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(&quot;style-loader&quot;, &quot;css-loader?&quot; + JSON.stringify(CSS_CONFIG) + &quot;!postcss-loader&quot;)
            }
        ]
    }
    //...............
}
// 在module.loader中引用" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// happypack.config：更多的配置可以参考文档，按需索取。</span>
<span class="hljs-keyword">var</span> happyPackConfig = {
    <span class="hljs-attr">plugins</span>:[
        <span class="hljs-keyword">new</span> HappyPack({
           <span class="hljs-attr">id</span>: <span class="hljs-string">'happyBabel'</span>,
           <span class="hljs-attr">threads</span>: <span class="hljs-number">4</span>,
           <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span>,
           <span class="hljs-attr">loaders</span>:[
               {
                   <span class="hljs-attr">path</span>: <span class="hljs-string">'babel'</span>,
                   <span class="hljs-attr">query</span>: BABEL_CONFIG
               }
           ]
        }),
        <span class="hljs-keyword">new</span> HappyPack({
            <span class="hljs-attr">id</span>: <span class="hljs-string">'happyEslint'</span>,
            <span class="hljs-attr">threads</span>: <span class="hljs-number">4</span>,
            <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">loaders</span>: [<span class="hljs-string">'eslint'</span>]
        })
    ]
}
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-comment">//................</span>
    <span class="hljs-built_in">module</span>: {
        <span class="hljs-attr">loaders</span>: [
            <span class="hljs-comment">// 变动这两个</span>
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">'HappyPack/loader?id=happyBabel'</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules|\.spec\.js/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">'HappyPack/loader?id=happyEslint'</span>
            },
            <span class="hljs-comment">// 其它的并未改动</span>
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(eot|woff2?|ttf|svg|png)$/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"file-loader"</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.json$/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"json-loader"</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
                <span class="hljs-attr">loader</span>: ExtractTextPlugin.extract(<span class="hljs-string">"style-loader"</span>, <span class="hljs-string">"css-loader?"</span> + <span class="hljs-built_in">JSON</span>.stringify(CSS_CONFIG) + <span class="hljs-string">"!postcss-loader"</span>)
            }
        ]
    }
    <span class="hljs-comment">//...............</span>
}
<span class="hljs-comment">// 在module.loader中引用</span></code></pre>
<p>然后，当我们运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yarn run build</code></pre>
<p>就会看到如下输出：</p>
<p><span class="img-wrap"><img data-src="/img/bV1kCO?w=1350&amp;h=272" src="https://static.alili.tech/img/bV1kCO?w=1350&amp;h=272" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>大概意思就是，<code>happupack</code>的版本是<code>3.1.0</code>，对<code>babel-loader</code>开启了四个线程并从缓存中加载了<code>627</code>个模块。</p>
<h3 id="articleHeader1">
<code>webpack.DllPlugin</code>和<code>webpack.DllReferencePlugin</code>
</h3>
<p>这两个插件在使用的时候，还是有几个小坑的，下面就会为大家讲述几个。</p>
<p>先说一下基本的用法，官方推荐在使用的时候，我们需要写两个<code>webpack</code>配置文件。其中一个配置文件主要用于<code>webpack.DllPlugin</code>插件进行第三方的预打包，另一个则是主<code>webpack</code>配置文件，在其中使用<code>webpack.DllReferencePlugin</code>插件引用第三方生成的依赖模块。</p>
<p>所以，我们其中一个配置文件可以命名如下：<code>ddl.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack')
const vendors = Object.keys(require('package.json')['dependencies'])
const SRC_PATH = __dirname + '/frontend/src/metabase'
const BUILD_PATH = __dirname + '/resources/frontend_client'

module.exports = {
  output: {
    path: BUILD_PATH + '/app/dist',
    filename: '[name].dll.js',
    library: '[name]_dll',
  },
  entry: {
    // 第三方依赖设置为打包的入口
    vendors: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]_dll',
      context: __dirname,
    }),
  ],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> vendors = <span class="hljs-built_in">Object</span>.keys(<span class="hljs-built_in">require</span>(<span class="hljs-string">'package.json'</span>)[<span class="hljs-string">'dependencies'</span>])
<span class="hljs-keyword">const</span> SRC_PATH = __dirname + <span class="hljs-string">'/frontend/src/metabase'</span>
<span class="hljs-keyword">const</span> BUILD_PATH = __dirname + <span class="hljs-string">'/resources/frontend_client'</span>

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: BUILD_PATH + <span class="hljs-string">'/app/dist'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].dll.js'</span>,
    <span class="hljs-attr">library</span>: <span class="hljs-string">'[name]_dll'</span>,
  },
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-comment">// 第三方依赖设置为打包的入口</span>
    vendors: vendors,
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DllPlugin({
      <span class="hljs-attr">path</span>: <span class="hljs-string">'manifest.json'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'[name]_dll'</span>,
      <span class="hljs-attr">context</span>: __dirname,
    }),
  ],
}</code></pre>
<p>接下来，在我们进行<code>webpack</code>的正式打包之前可以先来一个预打包，运行如下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack --config ddl.donfig.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">webpack --config ddl.donfig.js</code></pre>
<p>命令结束之后，我们可以在<code>BUILD_PATH</code>下面生成了一个<code>vendors.dll.js</code>(具体的名称根据你的配置而来)以及根目录下面的<code>manifset.json</code>文件。打开这个文件，可以看到<code>webpack.DllPlugin</code>插件为每个第三方包都生成了一个唯一的全局id。</p>
<blockquote>上面的这个插件的配置有几个需要注意的地方，<code>output.library</code>属性是必须的，同时<code>webpack.DllPlugin</code>参数对象的<code>name</code>属性和其保持一致。更详细的配置可以参考文档。</blockquote>
<p>预打包之后，我们需要对我们的主<code>webpack.config.js</code>文件做如下改动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//..........................
    plugins:[
        // ........
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json'),
            // 上述生成的文件的名称
            name:&quot;vendors_dll&quot;
        }),
        //.........
    ]
//.........................." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//..........................</span>
    plugins:[
        <span class="hljs-comment">// ........</span>
        <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
            <span class="hljs-attr">context</span>: __dirname,
            <span class="hljs-attr">manifest</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./manifest.json'</span>),
            <span class="hljs-comment">// 上述生成的文件的名称</span>
            name:<span class="hljs-string">"vendors_dll"</span>
        }),
        <span class="hljs-comment">//.........</span>
    ]
<span class="hljs-comment">//..........................</span></code></pre>
<p>配置很简单，详细的配置小伙伴可以参考文档按需索取。这里有几个需要注意的地方给大家说明一下。</p>
<ol><li>
<code>vendors.dll.js</code>文件一定要在引入我们的<code>html</code>文件中，而且在引入模块文件之前引入，否则你会看到这个错误。</li></ol>
<p><span class="img-wrap"><img data-src="/img/bV1kCY?w=1124&amp;h=628" src="https://static.alili.tech/img/bV1kCY?w=1124&amp;h=628" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>(骚年，有没有觉得菊花一紧)</p>
<ol><li>但是，有些情况下，我们使用的是<code>html-webpack-plugin</code>来动态创建我们的<code>html</code>模板，这个时候我们怎么把生成的<code>vendors.dll.js</code>引入到我们的页面中呢？路径可以写死，但是你试试，反正我遇到了这个错误。如果你的可以，欢迎在<code>github</code>上留言交流。</li></ol>
<p><span class="img-wrap"><img data-src="/img/bV1kEc?w=1232&amp;h=96" src="https://static.alili.tech/img/bV1kEc?w=1232&amp;h=96" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ol><li>当你遇到这个错误，别灰心，接着找解决方法。原来，还真有，就是下面即将介绍的这个插件：<a href="https://github.com/SimenB/add-asset-html-webpack-plugin" rel="nofollow noreferrer" target="_blank">add-asset-html-webpack-plugin</a>
</li></ol>
<p>。这个插件的主要作用就是将我们自己的静态文件插入到模版生成的<code>html</code>文件中。所以需要对<code>webpack.config.js</code>作出如下的改动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
//..........................
    plugins:[
        // ........
       new AddAssetHtmlPlugin({
            filepath: BUILD_PATH + '/app/dist/*.dll.js',
            includeSourcemap: false
        }),
        //.........
    ]
//.........................." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> AddAssetHtmlPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'add-asset-html-webpack-plugin'</span>);
<span class="hljs-comment">//..........................</span>
    plugins:[
        <span class="hljs-comment">// ........</span>
       <span class="hljs-keyword">new</span> AddAssetHtmlPlugin({
            <span class="hljs-attr">filepath</span>: BUILD_PATH + <span class="hljs-string">'/app/dist/*.dll.js'</span>,
            <span class="hljs-attr">includeSourcemap</span>: <span class="hljs-literal">false</span>
        }),
        <span class="hljs-comment">//.........</span>
    ]
<span class="hljs-comment">//..........................</span></code></pre>
<blockquote>
<code>includeSourcemap</code>选项如果不配置的话，可能会遇到<code>vendors.dll.js.map cannot found</code>的错误</blockquote>
<p>然后，运行，bingo。至此，打包时间已经从<code>100s</code>左右降到了<code>35s</code>左右。恭喜恭喜。</p>
<h3 id="articleHeader2"><code>webpack-parallel-uglify-plugin</code></h3>
<blockquote><a href="https://github.com/gdborton/webpack-parallel-uglify-plugin" rel="nofollow noreferrer" target="_blank">https://github.com/gdborton/webpack-parallel-uglify-plugin</a></blockquote>
<p>这个插件的用处十分的强大，并行压缩<code>javascript</code>，配置也十分简单，参考官方文档就能知道怎么使用，如我们的配置文件就做了如下的变动。</p>
<p><strong>原js文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    // suppress uglify warnings in production
    // output from these warnings was causing Heroku builds to fail (#5410)
    compress: {
        warnings: false,
    },
    output: {
        comments: false,
    },
    mangle: {
        // this is required to ensure we don't minify Chevrotain token identifiers
        // https://github.com/SAP/chevrotain/tree/master/examples/parser/minification
        except: allTokens.map(function(currTok) {
            return chevrotain.tokenName(currTok);
        })
    }
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">config.plugins.push(<span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
    <span class="hljs-comment">// suppress uglify warnings in production</span>
    <span class="hljs-comment">// output from these warnings was causing Heroku builds to fail (#5410)</span>
    compress: {
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>,
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">comments</span>: <span class="hljs-literal">false</span>,
    },
    <span class="hljs-attr">mangle</span>: {
        <span class="hljs-comment">// this is required to ensure we don't minify Chevrotain token identifiers</span>
        <span class="hljs-comment">// https://github.com/SAP/chevrotain/tree/master/examples/parser/minification</span>
        except: allTokens.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">currTok</span>) </span>{
            <span class="hljs-keyword">return</span> chevrotain.tokenName(currTok);
        })
    }
}))</code></pre>
<p><strong>变动后</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config.plugins.push(new ParallelUglifyPlugin({
        uglifyJs:{
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
            mangle: {
                // this is required to ensure we don't minify Chevrotain token identifiers
                // https://github.com/SAP/chevrotain/tree/master/examples/parser/minification
                except: allTokens.map(function(currTok) {
                    return chevrotain.tokenName(currTok);
                })
            }
        },
        cacheDir: '.js-cache'
    }))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">config.plugins.push(<span class="hljs-keyword">new</span> ParallelUglifyPlugin({
        <span class="hljs-attr">uglifyJs</span>:{
            <span class="hljs-attr">compress</span>: {
                <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>,
            },
            <span class="hljs-attr">output</span>: {
                <span class="hljs-attr">comments</span>: <span class="hljs-literal">false</span>,
            },
            <span class="hljs-attr">mangle</span>: {
                <span class="hljs-comment">// this is required to ensure we don't minify Chevrotain token identifiers</span>
                <span class="hljs-comment">// https://github.com/SAP/chevrotain/tree/master/examples/parser/minification</span>
                except: allTokens.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">currTok</span>) </span>{
                    <span class="hljs-keyword">return</span> chevrotain.tokenName(currTok);
                })
            }
        },
        <span class="hljs-attr">cacheDir</span>: <span class="hljs-string">'.js-cache'</span>
    }))</code></pre>
<p>至此，我们大部分的优化的内容已经完成，下面是我们打包时间的一个对比。<br><strong>优化前打包时间</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV1kC7?w=890&amp;h=322" src="https://static.alili.tech/img/bV1kC7?w=890&amp;h=322" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>优化后打包时间</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV1kD4?w=752&amp;h=280" src="https://static.alili.tech/img/bV1kD4?w=752&amp;h=280" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>除了上述的几个可以优化的地方，还有很多一些小点可以进行优化，比如：</p>
<ol>
<li>css-loader在0.15.0之后的版本打包时间明显增长</li>
<li>我们也可以适当的缩短一下模块的查询路径等</li>
</ol>
<p>如果你有好的优化点，欢迎在我的<a href="https://github.com/pavoooo" rel="nofollow noreferrer" target="_blank">github</a>留言交流哈！！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack性能优化

## 原文链接
[https://segmentfault.com/a/1190000012671743](https://segmentfault.com/a/1190000012671743)


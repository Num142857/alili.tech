---
title: '手把手教你webpack如何打包才能输出最优生产文件' 
date: 2018-12-17 2:30:07
hidden: true
slug: 6ynwh4gob8p
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>webpack打包大多数前端工程师们都已经用过，然后今天我想和大家分享的是webpack如何打包才能输出<strong>最优生产环境文件</strong>，主要针对两种人群：未自己手把手配置过webpack的人、配置过webpack但是不熟悉或者不知所以然的的人。如果fe大神看到请勿略此文，谢谢！</p>
<h1 id="articleHeader1">准备工作</h1>
<p>在做讲解之前，我希望大家先去我的<a href="https://github.com/ddvdd008/webpack-dabao/tree/master/webpack-dd" rel="nofollow noreferrer" target="_blank">github</a>上clone下我的demo项目，然后按照我的讲解亲自code一边！</p>
<h1 id="articleHeader2">最基本的打包构建</h1>
<p>这是项目目录结构：<br><span class="img-wrap"><img data-src="/img/bV13YM?w=662&amp;h=488" src="https://static.alili.tech/img/bV13YM?w=662&amp;h=488" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>ps：先来看下最简单的打包，这边为了模拟打包文件大点，index.js引入了一些用不到的模块，然后webpack只做了最简单的js压缩处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.js
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Redux from 'redux';
import reactRedux from 'react-redux';
import App from './app/App';
import antd from 'antd';
import 'antd/dist/antd.min.css';
import './assets/common.scss';
import './index.scss';

render(<App/>, document.getElementById(&quot;app&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//index.js</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> { Router, Route, IndexRoute, hashHistory } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;
<span class="hljs-keyword">import</span> Redux <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> reactRedux <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./app/App'</span>;
<span class="hljs-keyword">import</span> antd <span class="hljs-keyword">from</span> <span class="hljs-string">'antd'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'antd/dist/antd.min.css'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./assets/common.scss'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./index.scss'</span>;

render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span>/&gt;</span></span>, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"app"</span>));</code></pre>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack
....
 plugins: [
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        },
        compress: {
            warnings: false
        }
    })]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">//webpack</span>
<span class="hljs-string">....</span>
<span class="hljs-attr"> plugins:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">new</span> <span class="hljs-string">webpack.optimize.UglifyJsPlugin({</span>
<span class="hljs-attr">        output:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            comments:</span> <span class="hljs-literal">false</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        compress:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            warnings:</span> <span class="hljs-literal">false</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">})]</span></code></pre>
<p>在webpack刚出来的时候，大多数人使用webpack其实和用grunt、gulp一样，把项目中的引用到的模块、样式文件等都打包成一个js文件。这样做的缺点：<strong>项目越庞大，打包出来的js文件越大，打包时间越长，最关键的是在单页面应用当中，会很大程度加大首屏加载时间，用户体验不好</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV14fx?w=1282&amp;h=522" src="https://static.alili.tech/img/bV14fx?w=1282&amp;h=522" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上图可以看出打包时间7s左右，一个app.js文件达到352kb。然后这边还不包括antd.min.css(大概400kb antd-ui框架样式)，你要想这仅仅是我这边只加了react开发需要用的一些基本模块，业务逻辑和业务css样式基本没有的情况下的数据。实际项目这个数据肯定还要来的大得多。</p>
<h1 id="articleHeader3">开始优化</h1>
<p>首先我们考虑的是单个文件过大，拆分成多个打包。</p>
<h2 id="articleHeader4">css与js分离</h2>
<p>把一个超大文件，先按js和css拆分成两个文件，然后页面并行加载这两文件肯定比加载一个文件来的快的，然后文件体积大小肯定也是有所缩小的。</p>
<h3 id="articleHeader5">extract-text-webpack-plugin</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack
...
plugins: [
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        },
        compress: {
            warnings: false
        }
    }),
    new ExtractTextPlugin({
        filename:'css/[name].css',
        allChunks: true
    })
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">//webpack</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">plugins:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">new</span> <span class="hljs-string">webpack.optimize.UglifyJsPlugin({</span>
<span class="hljs-attr">        output:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            comments:</span> <span class="hljs-literal">false</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        compress:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            warnings:</span> <span class="hljs-literal">false</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}),</span>
    <span class="hljs-string">new</span> <span class="hljs-string">ExtractTextPlugin({</span>
<span class="hljs-attr">        filename:</span><span class="hljs-string">'css/[name].css'</span><span class="hljs-string">,</span>
<span class="hljs-attr">        allChunks:</span> <span class="hljs-literal">true</span>
    <span class="hljs-string">})</span>
<span class="hljs-string">]</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV14iB?w=1256&amp;h=464" src="https://static.alili.tech/img/bV14iB?w=1256&amp;h=464" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>打包时间有所缩短，app.js的文件体积也有所缩小。由于我这边业务css和业务逻辑代码基本没有，所以这次优化效果不显著。但是及时这样，app.js还是要比我们心里预计的来的大的多。</p>
<h2 id="articleHeader6">公共模块与业务模块分开打包</h2>
<p>在实际项目当中，我们引入的模块其实可以分为<strong>公共模块</strong>与<strong>业务模块</strong>。<br>webpack把入口分为两个，一个业务主入口，另一个公共模块打包入口</p>
<h3 id="articleHeader7">CommonsChunkPlugin</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack
entry:{
    vendors:['react',
    'redux',
    'react-dom',
    'react-redux',
    'react-router',
    'antd/dist/antd.min.css',//ui框架样式也打包进来
    PATHS.ASSETS.join('common.scss')],
    app:'./index.js'
},
...
plugins: [
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        },
        compress: {
            warnings: false
        }
    }),
    new ExtractTextPlugin({
        filename:'css/[name].css',
        allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: 'js/[name].js',
        warn:false
    }),
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">//webpack</span>
<span class="hljs-string">entry:</span>{
<span class="hljs-symbol">    vendors:</span>[<span class="hljs-string">'react'</span>,
    <span class="hljs-string">'redux'</span>,
    <span class="hljs-string">'react-dom'</span>,
    <span class="hljs-string">'react-redux'</span>,
    <span class="hljs-string">'react-router'</span>,
    <span class="hljs-string">'antd/dist/antd.min.css'</span>,<span class="hljs-comment">//ui框架样式也打包进来</span>
    PATHS.ASSETS.join(<span class="hljs-string">'common.scss'</span>)],
<span class="hljs-symbol">    app:</span><span class="hljs-string">'./index.js'</span>
},
...
<span class="hljs-string">plugins:</span> [
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
<span class="hljs-symbol">        output:</span> {
<span class="hljs-symbol">            comments:</span> <span class="hljs-literal">false</span>
        },
<span class="hljs-symbol">        compress:</span> {
<span class="hljs-symbol">            warnings:</span> <span class="hljs-literal">false</span>
        }
    }),
    <span class="hljs-keyword">new</span> ExtractTextPlugin({
<span class="hljs-symbol">        filename:</span><span class="hljs-string">'css/[name].css'</span>,
<span class="hljs-symbol">        allChunks:</span> <span class="hljs-literal">true</span>
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
<span class="hljs-symbol">        name:</span> <span class="hljs-string">'vendors'</span>,
<span class="hljs-symbol">        filename:</span> <span class="hljs-string">'js/[name].js'</span>,
<span class="hljs-symbol">        warn:</span><span class="hljs-literal">false</span>
    }),
]
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV14sI?w=1374&amp;h=576" src="https://static.alili.tech/img/bV14sI?w=1374&amp;h=576" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>时间为什么长了呢？其实这个不难理解，因为ui框架（antd）样式也打包进来了。打包成的四个文件：app.js/app.css、vendors.js/vendors.css。app是你业务逻辑代码和业务样式，vendors是你公共引用模块逻辑代码和公共样式。在实际大项目中，这四个文件js部分和css部分一般大小都差不多，所以分成四个文件后并行加载能大大缩减首页文件加载时间！ps：这边由于业务代码基本没有 所以app和vendors文件大小差异过大。</p>
<h2 id="articleHeader8">利用插件进一步优化打包文件</h2>
<p>通过上面js和css分离，模块划分分离两大步骤，在单页面开发当中基本上你的文件划分定了。在这样的情况下，如果还想减少加载时间，提高体验。在自动化工程这块我们只能在文件体积上做文章了，继续减少文件体积。</p>
<h3 id="articleHeader9">optimize-css-assets-webpack-plugin与ModuleConcatenationPlugin</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //css压缩
    new OptimizeCssAssetsPlugin({
    // assetNameRegExp: /.css$/g,
    // cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        },
        canPrint: true
    }),
    //webpack3.0以上
    new webpack.optimize.ModuleConcatenationPlugin(),
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-comment">//css压缩</span>
    <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">OptimizeCssAssetsPlugin</span>({
    <span class="hljs-comment">// assetNameRegExp: /.css$/g,</span>
    <span class="hljs-comment">// cssProcessor: require('cssnano'),</span>
        <span class="hljs-attribute">cssProcessorOptions</span>: {
            <span class="hljs-attribute">discardComments</span>: {
                <span class="hljs-attribute">removeAll</span>: true
            }
        },
        <span class="hljs-attribute">canPrint</span>: true
    }),
    <span class="hljs-comment">//webpack3.0以上</span>
    <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.ModuleConcatenationPlugin</span>(),
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV14w8?w=1528&amp;h=682" src="https://static.alili.tech/img/bV14w8?w=1528&amp;h=682" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>由于进一步压缩css和js导致时间打包会有所延长，但是效果还是有的上图可以看出js和css都一定程度缩小了。</p>
<h2 id="articleHeader10">衍生问题-打包时间过长怎么办</h2>
<p>每次修改业务代码打包都会重新打包公共模块，但是实际情况公共模块打包基本是不会去修改的，那么我么你如果把公共模块打包单独提出来，每次只打包业务模块，这样打包时间是不是会大大缩减？事实上，webpack确实提供了这样的功能-DllPlugin与DllReferencePlugin</p>
<h3 id="articleHeader11">DllPlugin与DllReferencePlugin</h3>
<p>Dll这个概念应该是借鉴了Windows系统的dll。一个dll包，就是一个纯纯的依赖库，它本身不能运行，是用来给你的app引用的。</p>
<p>打包dll的时候，Webpack会将所有包含的库做一个索引，写在一个manifest文件中，而引用dll的代码（dll user）在打包的时候，只需要读取这个manifest文件，就可以了。</p>
<p>这么一来有几个好处：</p>
<ol>
<li>Dll打包以后是独立存在的，只要其包含的库没有增减、升级，hash也不会变化，因此线上的dll代码不需要随着版本发布频繁更新。</li>
<li>App部分代码修改后，只需要编译app部分的代码，dll部分，只要包含的库没有增减、升级，就不需要重新打包。这样也大大提高了每次编译的速度。</li>
</ol>
<p>假设你有多个项目，使用了相同的一些依赖库，它们就可以共用一个dll。<br>如何使用呢？</p>
<p>首先要先建立一个dll的配置文件，entry只包含第三方库：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack-dll
/*webpack-dll页面配置*/
const path = require('path');
const webpack = require('webpack');
//把css样式从打包文件里面分离出来
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//css压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PATHS = require('./PATHS');
let dllConfig = {
    entry:{
        vendors:['react',
        'redux',
        'react-dom',
        'react-redux',
        'react-router',
        'antd/dist/antd.min.css',
        PATHS.ASSETS.join('common.scss')]
    },
    module:{
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: &quot;style-loader&quot;,
                use: 'css-loader?sourceMap'
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
            })
        }]
    },
    output:{
         path:PATHS.DIST,//打包编译完的文件根目录
         filename: &quot;js/[name].js&quot;,//打包编译完文件路径和名称
         library: '[name]',
    },
    plugins: [
        new ExtractTextPlugin({
            filename:'css/[name]-[contenthash:8]-dll.css',
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            // assetNameRegExp: /.css$/g,
            // cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
         //webpack3.0以上
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ]
};
module.exports = dllConfig;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//webpack-dll</span>
<span class="hljs-comment">/*webpack-dll页面配置*/</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-comment">//把css样式从打包文件里面分离出来</span>
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
<span class="hljs-comment">//css压缩</span>
<span class="hljs-keyword">const</span> OptimizeCssAssetsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'optimize-css-assets-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> PATHS = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./PATHS'</span>);
<span class="hljs-keyword">let</span> dllConfig = {
    entry:{
        vendors:[<span class="hljs-string">'react'</span>,
        <span class="hljs-string">'redux'</span>,
        <span class="hljs-string">'react-dom'</span>,
        <span class="hljs-string">'react-redux'</span>,
        <span class="hljs-string">'react-router'</span>,
        <span class="hljs-string">'antd/dist/antd.min.css'</span>,
        PATHS.ASSETS.join(<span class="hljs-string">'common.scss'</span>)]
    },
    <span class="hljs-keyword">module</span>:{
        rules: [{
            test: <span class="hljs-regexp">/\.css$/</span>,
            use: ExtractTextPlugin.extract({
                fallback: <span class="hljs-string">"style-loader"</span>,
                use: <span class="hljs-string">'css-loader?sourceMap'</span>
            })
        }, {
            test: <span class="hljs-regexp">/\.scss$/</span>,
            use: ExtractTextPlugin.extract({
                fallback: <span class="hljs-string">'style-loader'</span>,
                use: [<span class="hljs-string">'css-loader?sourceMap'</span>, <span class="hljs-string">'sass-loader?sourceMap'</span>]
            })
        }]
    },
    output:{
         path:PATHS.DIST,<span class="hljs-comment">//打包编译完的文件根目录</span>
         filename: <span class="hljs-string">"js/[name].js"</span>,<span class="hljs-comment">//打包编译完文件路径和名称</span>
         library: <span class="hljs-string">'[name]'</span>,
    },
    plugins: [
        <span class="hljs-keyword">new</span> ExtractTextPlugin({
            filename:<span class="hljs-string">'css/[name]-[contenthash:8]-dll.css'</span>,
            allChunks: <span class="hljs-literal">true</span>
        }),
        <span class="hljs-keyword">new</span> OptimizeCssAssetsPlugin({
            <span class="hljs-comment">// assetNameRegExp: /.css$/g,</span>
            <span class="hljs-comment">// cssProcessor: require('cssnano'),</span>
            cssProcessorOptions: {
                discardComments: {
                    removeAll: <span class="hljs-literal">true</span>
                }
            },
            canPrint: <span class="hljs-literal">true</span>
        }),
        <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
            output: {
                comments: <span class="hljs-literal">false</span>
            },
            compress: {
                warnings: <span class="hljs-literal">false</span>
            }
        }),
         <span class="hljs-comment">//webpack3.0以上</span>
        <span class="hljs-keyword">new</span> webpack.optimize.ModuleConcatenationPlugin(),
        <span class="hljs-keyword">new</span> webpack.DllPlugin({
            path: <span class="hljs-string">'manifest.json'</span>,
            name: <span class="hljs-string">'[name]'</span>,
            context: __dirname,
        }),
    ]
};
<span class="hljs-built_in">module</span>.exports = dllConfig;</code></pre>
<p>webpack.DllPlugin的选项中，path是manifest文件的输出路径；name是dll暴露的对象名，要跟output.library保持一致；context是解析包路径的上下文，这个要跟接下来配置的dll user一致。</p>
<p>运行Webpack，会输出两个文件一个是打包好的vendor.js，一个就是manifest.json，长这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;name&quot;: &quot;vendors&quot;,
    &quot;content&quot;: {
        &quot;./node_modules/process/browser.js&quot;: {
            &quot;id&quot;: 0,
            &quot;meta&quot;: {}
        },
        &quot;./node_modules/react/index.js&quot;: {
            &quot;id&quot;: 1,
            &quot;meta&quot;: {}
        },
        &quot;./node_modules/warning/browser.js&quot;: {
            &quot;id&quot;: 2,
            &quot;meta&quot;: {}
        },
        &quot;./node_modules/prop-types/index.js&quot;: {
            &quot;id&quot;: 3,
            &quot;meta&quot;: {}
        },
        &quot;./node_modules/invariant/browser.js&quot;: {
            &quot;id&quot;: 4,
            &quot;meta&quot;: {}
        },
        &quot;./node_modules/fbjs/lib/emptyFunction.js&quot;: {
            &quot;id&quot;: 5,
            &quot;meta&quot;: {}
        },
        &quot;./node_modules/object-assign/index.js&quot;: {
            &quot;id&quot;: 6,
            &quot;meta&quot;: {}
        },
        ......." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
    <span class="hljs-string">"name"</span>: <span class="hljs-string">"vendors"</span>,
    <span class="hljs-string">"content"</span>: {
        <span class="hljs-string">"./node_modules/process/browser.js"</span>: {
            <span class="hljs-string">"id"</span>: <span class="hljs-number">0</span>,
            <span class="hljs-string">"meta"</span>: {}
        },
        <span class="hljs-string">"./node_modules/react/index.js"</span>: {
            <span class="hljs-string">"id"</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">"meta"</span>: {}
        },
        <span class="hljs-string">"./node_modules/warning/browser.js"</span>: {
            <span class="hljs-string">"id"</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">"meta"</span>: {}
        },
        <span class="hljs-string">"./node_modules/prop-types/index.js"</span>: {
            <span class="hljs-string">"id"</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">"meta"</span>: {}
        },
        <span class="hljs-string">"./node_modules/invariant/browser.js"</span>: {
            <span class="hljs-string">"id"</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">"meta"</span>: {}
        },
        <span class="hljs-string">"./node_modules/fbjs/lib/emptyFunction.js"</span>: {
            <span class="hljs-string">"id"</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">"meta"</span>: {}
        },
        <span class="hljs-string">"./node_modules/object-assign/index.js"</span>: {
            <span class="hljs-string">"id"</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">"meta"</span>: {}
        },
        .......</code></pre>
<p>Webpack将每个库都进行了编号索引，之后的dll user可以读取这个文件，直接用id来引用。</p>
<p>Dll user的配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');

module.exports = {
  output: {
    path: 'build',
    filename: '[name].[chunkhash].js',
  },
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./manifest.json'),
    }),
  ],
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'build'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].[chunkhash].js'</span>,
  },
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">'./src/index.js'</span>,
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
      <span class="hljs-attr">context</span>: __dirname,
      <span class="hljs-attr">manifest</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./manifest.json'</span>),
    }),
  ],
};</code></pre>
<p>运行Webpack之后，结果如下：<br><span class="img-wrap"><img data-src="/img/bV14Gr?w=1740&amp;h=690" src="https://static.alili.tech/img/bV14Gr?w=1740&amp;h=690" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>明显速度快了，文件也小了。</p>
<p>平时开发的时候，修改代码后重新编译的速度会大大减少，节省时间。</p>
<h1 id="articleHeader12">结尾</h1>
<p>其实还有一些优化，高版本的webpack比低版本的webpack打包要快而且文件要小，这属于webpack本身的性能优化带给我们的，例如：</p>
<ol>
<li>Scope Hoisting-作用域提升 加快减少闭包函数数量从而加快js执行速度</li>
<li>本身打包速度提升 可以自己升级webpack去体验下。</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你webpack如何打包才能输出最优生产文件

## 原文链接
[https://segmentfault.com/a/1190000012848772](https://segmentfault.com/a/1190000012848772)


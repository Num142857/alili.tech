---
title: 'React系列---Webpack环境搭建（二）不同环境不同配置' 
date: 2019-01-11 2:30:07
hidden: true
slug: 1980255ddhki
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://segmentfault.com/a/1190000009902941">React系列---Webpack环境搭建（一）手动搭建</a><br>React系列---Webpack环境搭建（二）不同环境不同配置<br><a href="https://segmentfault.com/a/1190000010003262" target="_blank">React系列---Webpack环境搭建（三）打包性能优化</a></p>
<hr>
<p>实际项目中，往往不同环境有不同的构建需求。比如开发、测试和生产环境对应的后端接口地址不同，生产环境需要进行代码混淆、压缩等。</p>
<p>因此，往往还需要将webpack配置分成多个：</p>
<p>安装webpack-merge，用于合并配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack-merge --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> webpack-<span class="hljs-keyword">merge</span> <span class="hljs-comment">--save-dev</span></code></pre>
<p>安装uglifyjs-webpack-plugin，用于js代码压缩：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install uglifyjs-webpack-plugin --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> uglifyjs-webpack-<span class="hljs-keyword">plugin</span> <span class="hljs-comment">--save-dev</span></code></pre>
<p>webpack -p也可以用于代码压缩。相对而言，使用uglifyjs-webpack-plugin，可以对压缩进行更灵活的控制。</p>
<hr>
<p>拆分webpack.config.js为以下几个配置：</p>
<p>基础配置 webpack.base.config.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    entry: {
        index: path.resolve(SRC_PATH, 'index.jsx')
    },
    output: {
        path: BUILD_PATH,
        filename: 'js/[name].[hash:5].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint-loader'],
                include: SRC_PATH,
                enforce: 'pre'
            }, {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                include: SRC_PATH,
                exclude: path.resolve(ROOT_PATH, 'node_modules')
            }
        ]
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-keyword">const</span> ROOT_PATH = path.resolve(__dirname);
<span class="hljs-keyword">const</span> SRC_PATH = path.resolve(ROOT_PATH, <span class="hljs-string">'src'</span>);
<span class="hljs-keyword">const</span> BUILD_PATH = path.resolve(ROOT_PATH, <span class="hljs-string">'dist'</span>);

<span class="hljs-built_in">module</span>.exports = {
    entry: {
        index: path.resolve(SRC_PATH, <span class="hljs-string">'index.jsx'</span>)
    },
    output: {
        path: BUILD_PATH,
        filename: <span class="hljs-string">'js/[name].[hash:5].js'</span>
    },
    resolve: {
        extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.jsx'</span>]
    },
    <span class="hljs-keyword">module</span>: {
        loaders: [
            {
                test: <span class="hljs-regexp">/\.jsx?$/</span>,
                loaders: [<span class="hljs-string">'eslint-loader'</span>],
                include: SRC_PATH,
                enforce: <span class="hljs-string">'pre'</span>
            }, {
                test: <span class="hljs-regexp">/\.jsx?$/</span>,
                loaders: [<span class="hljs-string">'babel-loader'</span>],
                include: SRC_PATH,
                exclude: path.resolve(ROOT_PATH, <span class="hljs-string">'node_modules'</span>)
            }
        ]
    }
};</code></pre>
<p>开发环境配置,webpack.dev.config.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const devConfig = merge(baseConfig, {
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '&quot;development&quot;'
        }),
        new HtmlwebpackPlugin({
            title: 'react-webpack-demo',
            filename: 'index.html',
            template: path.resolve(SRC_PATH, 'templates', 'index.html')
        })
    ]
});

module.exports = devConfig;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">const</span> HtmlwebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>);
<span class="hljs-keyword">const</span> baseConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.config.js'</span>);

<span class="hljs-keyword">const</span> ROOT_PATH = path.resolve(__dirname);
<span class="hljs-keyword">const</span> SRC_PATH = path.resolve(ROOT_PATH, <span class="hljs-string">'src'</span>);
<span class="hljs-keyword">const</span> devConfig = merge(baseConfig, {
    <span class="hljs-attr">devtool</span>: <span class="hljs-string">'eval-source-map'</span>,
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.DefinePlugin({
            <span class="hljs-string">'process.env.NODE_ENV'</span>: <span class="hljs-string">'"development"'</span>
        }),
        <span class="hljs-keyword">new</span> HtmlwebpackPlugin({
            <span class="hljs-attr">title</span>: <span class="hljs-string">'react-webpack-demo'</span>,
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,
            <span class="hljs-attr">template</span>: path.resolve(SRC_PATH, <span class="hljs-string">'templates'</span>, <span class="hljs-string">'index.html'</span>)
        })
    ]
});

<span class="hljs-built_in">module</span>.exports = devConfig;</code></pre>
<p>测试环境配置,webpack.test.config.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const testConfig = merge(baseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '&quot;test&quot;'
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }),
        new HtmlwebpackPlugin({
            title: 'react-webpack-demo',
            filename: 'index.html',
            template: path.resolve(SRC_PATH, 'templates', 'index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeAttributeQuotes: true
            }
        })
    ]
});

module.exports = testConfig;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">const</span> HtmlwebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">const</span> baseConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.config.js'</span>);

<span class="hljs-keyword">const</span> ROOT_PATH = path.resolve(__dirname);
<span class="hljs-keyword">const</span> SRC_PATH = path.resolve(ROOT_PATH, <span class="hljs-string">'src'</span>);
<span class="hljs-keyword">const</span> testConfig = merge(baseConfig, {
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.DefinePlugin({
            <span class="hljs-string">'process.env.NODE_ENV'</span>: <span class="hljs-string">'"test"'</span>
        }),
        <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
            <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>,
        }),
        <span class="hljs-keyword">new</span> HtmlwebpackPlugin({
            <span class="hljs-attr">title</span>: <span class="hljs-string">'react-webpack-demo'</span>,
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,
            <span class="hljs-attr">template</span>: path.resolve(SRC_PATH, <span class="hljs-string">'templates'</span>, <span class="hljs-string">'index.html'</span>),
            <span class="hljs-attr">minify</span>: {
                <span class="hljs-attr">removeComments</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">collapseWhitespace</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">removeRedundantAttributes</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">removeScriptTypeAttributes</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">removeStyleLinkTypeAttributes</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">removeAttributeQuotes</span>: <span class="hljs-literal">true</span>
            }
        })
    ]
});

<span class="hljs-built_in">module</span>.exports = testConfig;</code></pre>
<p>生成环境配置,webpack.prod.config.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const prodConfig = merge(baseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '&quot;production&quot;'
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }),
        new HtmlwebpackPlugin({
            title: 'react-webpack-demo',
            filename: 'index.html',
            template: path.resolve(SRC_PATH, 'templates', 'index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeAttributeQuotes: true
            }
        })
    ]
});

module.exports = prodConfig;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">const</span> HtmlwebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">const</span> baseConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.config.js'</span>)

<span class="hljs-keyword">const</span> ROOT_PATH = path.resolve(__dirname);
<span class="hljs-keyword">const</span> SRC_PATH = path.resolve(ROOT_PATH, <span class="hljs-string">'src'</span>);
<span class="hljs-keyword">const</span> prodConfig = merge(baseConfig, {
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.DefinePlugin({
            <span class="hljs-string">'process.env.NODE_ENV'</span>: <span class="hljs-string">'"production"'</span>
        }),
        <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
            <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>,
        }),
        <span class="hljs-keyword">new</span> HtmlwebpackPlugin({
            <span class="hljs-attr">title</span>: <span class="hljs-string">'react-webpack-demo'</span>,
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,
            <span class="hljs-attr">template</span>: path.resolve(SRC_PATH, <span class="hljs-string">'templates'</span>, <span class="hljs-string">'index.html'</span>),
            <span class="hljs-attr">minify</span>: {
                <span class="hljs-attr">removeComments</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">collapseWhitespace</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">removeRedundantAttributes</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">removeScriptTypeAttributes</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">removeStyleLinkTypeAttributes</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">removeAttributeQuotes</span>: <span class="hljs-literal">true</span>
            }
        })
    ]
});

<span class="hljs-built_in">module</span>.exports = prodConfig;</code></pre>
<p>修改package.json：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;start&quot;: &quot;webpack-dev-server --hot --progress --config webpack.dev.config.js&quot;,
    &quot;build:dev&quot;: &quot;rimraf dist &amp;&amp; webpack --progress --config webpack.dev.config.js&quot;,
    &quot;build:test&quot;: &quot;rimraf dist &amp;&amp; webpack --progress --config webpack.test.config.js&quot;,
    &quot;build&quot;: &quot;rimraf dist &amp;&amp; webpack --progress --config webpack.prod.config.js&quot;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"webpack-dev-server --hot --progress --config webpack.dev.config.js"</span>,
    <span class="hljs-string">"build:dev"</span>: <span class="hljs-string">"rimraf dist &amp;&amp; webpack --progress --config webpack.dev.config.js"</span>,
    <span class="hljs-string">"build:test"</span>: <span class="hljs-string">"rimraf dist &amp;&amp; webpack --progress --config webpack.test.config.js"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"rimraf dist &amp;&amp; webpack --progress --config webpack.prod.config.js"</span>
},</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 启动开发调试
npm run start
# 开发环境构建
npm run build:dev
# 测试环境构建
npm run build:test
# 生产环境构建
npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-comment"># 启动开发调试</span>
npm <span class="hljs-keyword">run</span><span class="bash"> start
</span><span class="hljs-comment"># 开发环境构建</span>
npm <span class="hljs-keyword">run</span><span class="bash"> build:dev
</span><span class="hljs-comment"># 测试环境构建</span>
npm <span class="hljs-keyword">run</span><span class="bash"> build:<span class="hljs-built_in">test</span>
</span><span class="hljs-comment"># 生产环境构建</span>
npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<p>项目中就可以像下面这样子调用后端接口</p>
<p>接口HOST定义，host.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (process.env.NODE_ENV === 'development') {
  module.exports = `http://192.168.1.101:8000`
} else if (process.env.NODE_ENV === 'test') {
  module.exports = `http://192.168.1.102:8000`
} else {
  module.exports = `http://192.168.1.103:8000`
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'development'</span>) {
  <span class="hljs-built_in">module</span>.exports = `<span class="javascript">http:<span class="hljs-comment">//192.168.1.101:8000</span></span>`
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'test'</span>) {
  <span class="hljs-built_in">module</span>.exports = `<span class="javascript">http:<span class="hljs-comment">//192.168.1.102:8000</span></span>`
} <span class="hljs-keyword">else</span> {
  <span class="hljs-built_in">module</span>.exports = `<span class="javascript">http:<span class="hljs-comment">//192.168.1.103:8000</span></span>`
}</code></pre>
<p>接口API定义，apis.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import host from './host'

function getApi (api) {
  return host + api
}

export default {
  login: getApi('/login'),
  logout: getApi('/logout'),
  ...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> host <span class="hljs-keyword">from</span> <span class="hljs-string">'./host'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getApi</span> (<span class="hljs-params">api</span>) </span>{
  <span class="hljs-keyword">return</span> host + api
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">login</span>: getApi(<span class="hljs-string">'/login'</span>),
  <span class="hljs-attr">logout</span>: getApi(<span class="hljs-string">'/logout'</span>),
  ...
}
</code></pre>
<p>代码：<a href="https://github.com/zhutx/react-webpack-demo" rel="nofollow noreferrer" target="_blank">https://github.com/zhutx/reac...</a></p>
<hr>
<p><a href="https://segmentfault.com/a/1190000009902941">React系列---Webpack环境搭建（一）手动搭建</a><br>React系列---Webpack环境搭建（二）不同环境不同配置<br><a href="https://segmentfault.com/a/1190000010003262" target="_blank">React系列---Webpack环境搭建（三）打包性能优化</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列---Webpack环境搭建（二）不同环境不同配置

## 原文链接
[https://segmentfault.com/a/1190000009952845](https://segmentfault.com/a/1190000009952845)


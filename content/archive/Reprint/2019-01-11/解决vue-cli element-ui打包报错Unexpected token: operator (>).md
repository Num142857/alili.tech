---
title: '解决vue-cli element-ui打包报错Unexpected token: operator (>)' 
date: 2019-01-11 2:30:08
hidden: true
slug: kpkux2glt6s
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.问题描述</h2>
<p>我vue-cli写了项目，界面都是用element-ui写的，打包时报错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ERROR in assets/js/0.498ce690b229694d8858.js from UglifyJs
Unexpected token: operator (>) [./~/element-ui/src/mixins/emitter.js:2,0][assets/js/0.498ce690b229694d8858.js:3947,32]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>ERROR in assets/js/0.498ce690b229694d8858.js from UglifyJs
Unexpected token: operator (&gt;) [<span class="hljs-string">./~/element-ui/src/mixins/emitter.js:2,0</span>][<span class="hljs-symbol">assets/js/0.498ce690b229694d8858.js:3947,32</span>]</code></pre>
<h2 id="articleHeader1">2.问题理解</h2>
<p>我理解了一下报错信息：</p>
<p>报错说有一个错误在打包后的文件中：<code>assets/js/0.498ce690b229694d8858.js</code>，<br>错误的原因是：<code>Unexpected token: operator (&gt;)</code>，即：不能识别操作符（"&gt;"大于号）<br>源文件出错地方是：<code>element-ui/src/mixins/emitter.js</code>第<code>2</code>行第<code>0</code>列<br>打包文件出错地方：<code>assets/js/0.498ce690b229694d8858.js</code>第<code>3947</code>行第<code>32</code>列</p>
<p>于是我找到两个文件出错的代码一看，<code>发现代码是一样的！</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//element-ui/src/mixins/emitter.js
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {//第2行
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">//element-ui/src/mixins/emitter.js</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">broadcast</span><span class="hljs-params">(componentName, eventName, params)</span> </span>{
  this.$children.<span class="hljs-keyword">forEach</span>(child =&gt; {<span class="hljs-comment">//第2行</span>
    <span class="hljs-keyword">var</span> name = child.$options.componentName;

    <span class="hljs-keyword">if</span> (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } <span class="hljs-keyword">else</span> {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//assets/js/0.498ce690b229694d8858.js : 
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {//第3947行，第32列是“=”
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">//assets/js/0.498ce690b229694d8858.js : </span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">broadcast</span><span class="hljs-params">(componentName, eventName, params)</span> </span>{
  this.$children.<span class="hljs-keyword">forEach</span>(child =&gt; {<span class="hljs-comment">//第3947行，第32列是“=”</span>
    <span class="hljs-keyword">var</span> name = child.$options.componentName;

    <span class="hljs-keyword">if</span> (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } <span class="hljs-keyword">else</span> {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}</code></pre>
<p><code>this.$children.forEach(child =&gt; {});</code>中的<code>=&gt;</code>是es6的语法。但是现在很多浏览器不完成支持es6语法，所以才需要在打包过程中转换成es5语法。</p>
<p><code>assets/js/0.498ce690b229694d8858.js</code>是打包的结果，这个文件是会放在浏览器运行的，如果浏览器不支持es6语法，那代码就会出错。</p>
<p>所以<code>npm run build</code>报出错误信息，也是合理的，如果你不理会这个报错信息，把代码拿取浏览器运行，就会出错。</p>
<h2 id="articleHeader2">3.解决案例：vue-select</h2>
<p>于是我很清楚，需要找到一种办法，能够把源文件的es6语法的代码转换成es5语法的代码。最后我找到了vue-select的一个issue讨论是比较有帮助的：<a href="https://github.com/sagalbot/vue-select/issues/71" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/sagalbot/vue-select/issues/71" rel="nofollow noreferrer" target="_blank">https://github.com/sagalbot/v...</a></p>
<blockquote>
<p>This is a bug (#57, #69) that will be fixed in the next release - essentially babel doesn't get applied to the mixins in src/mixins/, so they are not transpiled to ES5. The next release will be precompiled so that dev's don't have to modify the build process.</p>
<p>What's your build process? If you are using webpack, you can configure babel-loader to run &gt;on the files.</p>
<p>{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   test: /\.js$/,
   loader: 'babel',
   include: [
     projectRoot + '/src',
     projectRoot + '/test',
     projectRoot + '/node_modules/vue-select'
   ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>   test: <span class="hljs-regexp">/\.js$/</span>,
   loader: <span class="hljs-string">'babel'</span>,
   <span class="hljs-keyword">include</span>: [
     projectRoot + <span class="hljs-string">'/src'</span>,
     projectRoot + <span class="hljs-string">'/test'</span>,
     projectRoot + <span class="hljs-string">'/node_modules/vue-select'</span>
   ]</code></pre>
<p>}</p>
<p>I'm using the latest webpack template for vue-cli. In case anyone else wants to know &gt;exactly where I put that, I updated the webpack.base.config.js file, this way:</p>
<p>{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   test: /\.js$/,
   loader: 'babel',
   include: [
       path.resolve(__dirname, '../config'),
       path.resolve(__dirname, '../build'),
       path.resolve(__dirname, '../src'),
       path.resolve(__dirname, '../node_modules/vue-select'),
     ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>   test: /\.js$/,
   loader: <span class="hljs-string">'babel'</span>,
   <span class="hljs-built_in">include</span>: [
       path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../config'</span>),
       path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../build'</span>),
       path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../src'</span>),
       path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../node_modules/vue-select'</span>),
     ]</code></pre>
<p>}</p>
</blockquote>
<p>原文大概意思是：在一个项目中依赖了vue-select库，打包时会报错：<code>Unexpected token punc «(», expected punc «:»</code>，原因是babel没有把node_modules/vue-select目录下的js文件转换成es5语法。于是就配置了一下，就解决了。</p>
<h2 id="articleHeader3">3.参考解决自己的问题</h2>
<p>我在自己项目中的<code>webpack.base.conf.js</code>找到了类似的地方，并加入配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.base.conf.js:

var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/element-ui/src/mixins/emitter.js'),//<------add
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>//webpack.base.<span class="hljs-keyword">conf</span>.<span class="hljs-keyword">j</span><span class="hljs-variable">s:</span>

var path = require(<span class="hljs-string">'path'</span>)
var utils = require(<span class="hljs-string">'./utils'</span>)
var config = require(<span class="hljs-string">'../config'</span>)
var vueLoaderConfig = require(<span class="hljs-string">'./vue-loader.conf'</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span> <span class="hljs-params">(dir)</span> {</span>
  <span class="hljs-keyword">return</span> path.<span class="hljs-keyword">join</span>(__dirname, <span class="hljs-string">'..'</span>, dir)
}

module.exports = {
  entry: {
    app: <span class="hljs-string">'./src/main.js'</span>
  },
  outpu<span class="hljs-variable">t:</span> {
    path: config.build.assetsRoot,
    filename: <span class="hljs-string">'[name].js'</span>,
    publicPath: process.env.NODE_ENV === <span class="hljs-string">'production'</span>
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  <span class="hljs-built_in">resolve</span>: {
    extension<span class="hljs-variable">s:</span> [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    alia<span class="hljs-variable">s:</span> {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
      <span class="hljs-string">'@'</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src'</span>)
    }
  },
  module: {
    rule<span class="hljs-variable">s:</span> [
      {
        tes<span class="hljs-variable">t:</span> /\.vue$/,
        loader: <span class="hljs-string">'vue-loader'</span>,
        option<span class="hljs-variable">s:</span> vueLoaderConfig
      },
      {
        tes<span class="hljs-variable">t:</span> /\.js$/,
        loader: <span class="hljs-string">'babel-loader'</span>,
        include: [
          <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src'</span>),
          <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'test'</span>),
          <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'node_modules/element-ui/src/mixins/emitter.js'</span>),//&lt;------<span class="hljs-built_in">add</span>
        ]
      },
      {
        tes<span class="hljs-variable">t:</span> /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: <span class="hljs-string">'url-loader'</span>,
        option<span class="hljs-variable">s:</span> {
          limi<span class="hljs-variable">t:</span> <span class="hljs-number">10000</span>,
          name: utils.assetsPath(<span class="hljs-string">'img/[name].[hash:7].[ext]'</span>)
        }
      },
      {
        tes<span class="hljs-variable">t:</span> /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: <span class="hljs-string">'url-loader'</span>,
        option<span class="hljs-variable">s:</span> {
          limi<span class="hljs-variable">t:</span> <span class="hljs-number">10000</span>,
          name: utils.assetsPath(<span class="hljs-string">'fonts/[name].[hash:7].[ext]'</span>)
        }
      }
    ]
  }
}</code></pre>
<p>如果您的vue-cli项目或webpack项目也遇到类似的错误，可以试试这样解决。</p>
<p>感慨一下：</p>
<p>了解问题的本质比知道问题的答案重要<br>遇到问题需要抽丝剥茧地逐层分析</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解决vue-cli element-ui打包报错Unexpected token: operator (>)

## 原文链接
[https://segmentfault.com/a/1190000009858385](https://segmentfault.com/a/1190000009858385)


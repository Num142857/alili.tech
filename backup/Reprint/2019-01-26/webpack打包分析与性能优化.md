---
title: 'webpack打包分析与性能优化' 
date: 2019-01-26 2:30:18
hidden: true
slug: qd7id14s35o
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">webpack打包分析与性能优化</h3>
<h3 id="articleHeader1">背景</h3>
<p>在去年年末参与的一个项目中，项目技术栈使用<code>react+es6+ant-design+webpack+babel</code>，生产环境全量构建将近三分钟，项目业务模块多达数百个，项目依赖数千个，并且该项目协同前后端开发人员较多，提高webpack 构建效率，成为了改善团队开发效率的关键之一。</p>
<p>下面我将在项目中遇到的问题和技术方案沉淀出来与大家做个分享</p>
<h3 id="articleHeader2">从项目自身出发</h3>
<p>我们的项目是将js分离，不同页面加载不同的js。然而分析webpack打包过程并针对性提出优化方案是一个比较繁琐的过程，首先我们需要知道webpack 打包的流程，从而找出时间消耗比较长的步骤，进而逐步进行优化。</p>
<p>在优化前，我们需要找出性能瓶颈在哪，代码组织是否合理，优化相关配置，从而提升webpack构建速度。</p>
<p>1.使用yarn而不是npm</p>
<p>由于项目使用npm安装包，容易导致在多关联依赖关系中，很可能某个库在指定依赖时没有指定版本号，进而导致不同设备上拉到的package版本不一。yarn不管安装顺序如何，相同的依赖关系将以相同的方式安装在任何机器上。当关联依赖中包括对某个软件包的重复引用，在实际安装时将尽量避免重复的创建。yarn不仅可以缓存它安装过的包，而且安装速度快，使用yarn无疑可以很大程度改善工作流和工作效率</p>
<p>2.删除没有使用的依赖</p>
<p>很多时候，我们由于项目人员变动比较大，参与项目的人也比较多，在分析项目时，我发现了一些问题，诸如：有些文件引入进来的库没有被使用到也没有及时删除，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import a from 'abc';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> a <span class="hljs-keyword">from</span> <span class="hljs-string">'abc'</span>;</code></pre>
<p>在业务中并没有使用到<code>a</code>  模块，但webpack 会针对该<code>import</code> 进行打包一遍，这无疑造成了性能的浪费。</p>
<h3 id="articleHeader3">webpack打包分析</h3>
<p>1.打包过程分析</p>
<p>我们知道，webpack 在打包过程中会针对不同的资源类型使用不同的loader处理，然后将所有静态资源整合到一个bundle里，以实现所有静态资源的加载。webpack最初的主要目的是在浏览器端复用符合CommonJS规范的代码模块，而CommonJS模块每次修改都需要重新构建(rebuild)后才能在浏览器端使用。</p>
<p>那么， webpack是如何进行资源的打包的呢？总结如下：</p>
<ul>
<li>对于单入口文件，每个入口文件把自己所依赖的资源全部打包到一起，即使一个资源循环加载的话，也只会打包一份</li>
<li>对于多入口文件的情况，分别独立执行单个入口的情况，每个入口文件各不相干</li>
</ul>
<p>我们的项目使用的就是多入口文件。在入口文件中，webpack会对每个资源文件进行配置一个id，即使多次加载，它的id也是一样的，因此只会打包一次。</p>
<p>实例如下：<br>main.js引用了chunk1、chunk2,chunk1又引用了chunk2，打包后：bundle.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" ...省略webpack生成代码
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

    __webpack_require__(1);//webpack分配的id
    __webpack_require__(2);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {
    //chunk1.js文件
    __webpack_require__(2);
    var chunk1=1;
    exports.chunk1=chunk1;

/***/ },
/* 2 */
/***/ function(module, exports) {
    //chunk2.js文件
    var chunk2=1;
    exports.chunk2=chunk2;

/***/ }
/******/ ]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> ...省略webpack生成代码
<span class="hljs-comment">/************************************************************************/</span>
<span class="hljs-comment">/******/</span> ([
<span class="hljs-comment">/* 0 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{

    __webpack_require__(<span class="hljs-number">1</span>);<span class="hljs-comment">//webpack分配的id</span>
    __webpack_require__(<span class="hljs-number">2</span>);

<span class="hljs-comment">/***/</span> },
<span class="hljs-comment">/* 1 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{
    <span class="hljs-comment">//chunk1.js文件</span>
    __webpack_require__(<span class="hljs-number">2</span>);
    <span class="hljs-keyword">var</span> chunk1=<span class="hljs-number">1</span>;
    exports.chunk1=chunk1;

<span class="hljs-comment">/***/</span> },
<span class="hljs-comment">/* 2 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports</span>) </span>{
    <span class="hljs-comment">//chunk2.js文件</span>
    <span class="hljs-keyword">var</span> chunk2=<span class="hljs-number">1</span>;
    exports.chunk2=chunk2;

<span class="hljs-comment">/***/</span> }
<span class="hljs-comment">/******/</span> ]);</code></pre>
<p>2.如何定位webpack打包速度慢的原因</p>
<p>我们首先需要定位webpack打包速度慢的原因，才能因地制宜采取合适的方案。我么可以在终端中输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack --profile --json > stats.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">$ webpack --profile --json &gt; stats.json</code></pre>
<p>然后将输出的json文件到如下两个网站进行分析</p>
<ul>
<li><a href="https://github.com/webpack/analyse" rel="nofollow noreferrer" target="_blank">https://github.com/webpack/an...</a></li>
<li><a href="http://alexkuz.github.io/webpack-chart/" rel="nofollow noreferrer" target="_blank">http://alexkuz.github.io/webp...</a></li>
</ul>
<p>这两个网站可以将构建后的组成用可视化的方式呈现出来，可以让你清楚的看到模块的组成部分，以及在项目中可能存在的多版本引用的问题，对于分析项目依赖有很大的帮助</p>
<h3 id="articleHeader4">优化方案与思路</h3>
<p>针对webpack构建大规模应用的优化往往比较复杂，我们需要抽丝剥茧，从性能提升点着手，可能没有一套通用的方案，但大体上的思路是通用的，核心思路可能包括但不限于如下：</p>
<p>1）：拆包，限制构建范围，减少资源搜索时间，无关资源不要参与构建</p>
<p>2）：使用增量构建而不是全量构建</p>
<p>3）：从webpack存在的不足出发，优化不足，提升效率</p>
<h3 id="articleHeader5">webpack打包优化</h3>
<p><strong>1.减小打包文件体积</strong></p>
<p>webpack+react的项目打包出来的文件经常动则几百kb甚至上兆，究其原因有：</p>
<ul>
<li>import css文件的时候，会直接作为模块一并打包到js文件中</li>
<li>所有js模块 + 依赖都会打包到一个文件</li>
<li>React、ReactDOM文件过大</li>
</ul>
<p>针对第一种情况，我们可以使用 <code>extract-text-webpack-plugin</code>，但缺点是会产生更长时间的编译，也没有HMR，还会增加额外的HTTP请求。对于css文件不是很大的情况最好还是不要使用该插件。</p>
<p>针对第二种情况，我们可以通过提取公共代码块，这也是比较普遍的做法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" new webpack.optimize.CommonsChunkPlugin('common.js');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"> <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'common.js'</span>);</code></pre>
<p>通过这种方法，我们可以有效减少不同入口文件之间重叠的代码，对于非单页应用来说非常重要。</p>
<p>针对第三种情况，我们可以把React、ReactDOM缓存起来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    entry: {
        vendor: ['react', 'react-dom']
    },
    new webpack.optimize.CommonsChunkPlugin('vendor','common.js'),
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    entry: {
        <span class="hljs-attr">vendor</span>: [<span class="hljs-string">'react'</span>, <span class="hljs-string">'react-dom'</span>]
    },
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'vendor'</span>,<span class="hljs-string">'common.js'</span>),
</code></pre>
<p>我们在开发环境使用react的开发版本，这里包含很多注释，警告等等，部署线上的时候可以通过 <code>webpack.DefinePlugin </code>来切换生产版本。</p>
<p>当然，我们还可以将React 直接放到CDN上，以此来减少体积。</p>
<p><strong>2.代码压缩</strong></p>
<p>webpack提供的UglifyJS插件由于采用单线程压缩，速度很慢 ,<br><code>webpack-parallel-uglify-plugin</code>插件可以并行运行UglifyJS插件，这可以有效减少构建时间，当然，该插件应用于生产环境而非开发环境，配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
new ParallelUglifyPlugin({
   cacheDir: '.cache/',
   uglifyJS:{
     output: {
       comments: false
     },
     compress: {
       warnings: false
     }
   }
 })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ParallelUglifyPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-parallel-uglify-plugin'</span>);
<span class="hljs-keyword">new</span> ParallelUglifyPlugin({
   <span class="hljs-attr">cacheDir</span>: <span class="hljs-string">'.cache/'</span>,
   <span class="hljs-attr">uglifyJS</span>:{
     <span class="hljs-attr">output</span>: {
       <span class="hljs-attr">comments</span>: <span class="hljs-literal">false</span>
     },
     <span class="hljs-attr">compress</span>: {
       <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
     }
   }
 })</code></pre>
<p><strong>3.happypack</strong></p>
<p><a href="https://github.com/amireh/happypack" rel="nofollow noreferrer" target="_blank">happypack</a> 的原理是让loader可以多进程去处理文件，原理如图示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008377198?w=800&amp;h=486" src="https://static.alili.tech/img/remote/1460000008377198?w=800&amp;h=486" alt="happypack" title="happypack" style="cursor: pointer;"></span></p>
<p>此外，happypack同时还利用缓存来使得rebuild 更快</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var HappyPack = require('happypack'),
  os = require('os'),
  happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

modules: {
    loaders: [
      {
        test: /\.js|jsx$/,
        loader: 'HappyPack/loader?id=jsHappy',
        exclude: /node_modules/
      }
    ]
}

plugins: [
    new HappyPack({
      id: 'jsHappy',
      cache: true,
      threadPool: happyThreadPool,
      loaders: [{
        path: 'babel',
        query: {
          cacheDirectory: '.webpack_cache',
          presets: [
            'es2015',
            'react'
          ]
        }
      }]
    }),
    //如果有单独提取css文件的话
    new HappyPack({
      id: 'lessHappy',
      loaders: ['style','css','less']
    })
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> HappyPack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'happypack'</span>),
  os = <span class="hljs-built_in">require</span>(<span class="hljs-string">'os'</span>),
  happyThreadPool = HappyPack.ThreadPool({ <span class="hljs-attr">size</span>: os.cpus().length });

modules: {
    <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js|jsx$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'HappyPack/loader?id=jsHappy'</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
      }
    ]
}

plugins: [
    <span class="hljs-keyword">new</span> HappyPack({
      <span class="hljs-attr">id</span>: <span class="hljs-string">'jsHappy'</span>,
      <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">threadPool</span>: happyThreadPool,
      <span class="hljs-attr">loaders</span>: [{
        <span class="hljs-attr">path</span>: <span class="hljs-string">'babel'</span>,
        <span class="hljs-attr">query</span>: {
          <span class="hljs-attr">cacheDirectory</span>: <span class="hljs-string">'.webpack_cache'</span>,
          <span class="hljs-attr">presets</span>: [
            <span class="hljs-string">'es2015'</span>,
            <span class="hljs-string">'react'</span>
          ]
        }
      }]
    }),
    <span class="hljs-comment">//如果有单独提取css文件的话</span>
    <span class="hljs-keyword">new</span> HappyPack({
      <span class="hljs-attr">id</span>: <span class="hljs-string">'lessHappy'</span>,
      <span class="hljs-attr">loaders</span>: [<span class="hljs-string">'style'</span>,<span class="hljs-string">'css'</span>,<span class="hljs-string">'less'</span>]
    })
  ]</code></pre>
<p><strong>4.缓存与增量构建</strong></p>
<p>由于项目中主要使用的是react.js和es6，结合webpack的babel-loader加载器进行编译，每次重新构建都需要重新编译一次，我们可以针对这个进行增量构建，而不需要每次都全量构建。</p>
<p><code>babel-loader</code>可以缓存处理过的模块，对于没有修改过的文件不会再重新编译，<code>cacheDirectory</code>有着2倍以上的速度提升，这对于rebuild 有着非常大的性能提升。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/react');
var pathToReactDOM = path.resolve(node_modules,'react-dom/index');

{
        test: /\.js|jsx$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loaders: ['react-hot','babel-loader?cacheDirectory'],
        noParse: [pathToReact,pathToReactDOM]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> node_modules = path.resolve(__dirname, <span class="hljs-string">'node_modules'</span>);
<span class="hljs-keyword">var</span> pathToReact = path.resolve(node_modules, <span class="hljs-string">'react/react'</span>);
<span class="hljs-keyword">var</span> pathToReactDOM = path.resolve(node_modules,<span class="hljs-string">'react-dom/index'</span>);

{
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js|jsx$/</span>,
        <span class="hljs-attr">include</span>: path.join(__dirname, <span class="hljs-string">'src'</span>),
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">loaders</span>: [<span class="hljs-string">'react-hot'</span>,<span class="hljs-string">'babel-loader?cacheDirectory'</span>],
        <span class="hljs-attr">noParse</span>: [pathToReact,pathToReactDOM]
}</code></pre>
<p><code>babel-loader</code>让除了<code>node_modules</code>目录下的js文件都支持es6语法，注意<code> exclude: /node_modules/</code>很重要，否则 babel 可能会把<code>node_modules</code>中所有模块都用 babel 编译一遍!<br>当然，你还需要一个像这样的<code>.babelrc</code>文件，配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;es2015&quot;, &quot;stage-0&quot;, &quot;react&quot;],
  &quot;plugins&quot;: [&quot;transform-runtime&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"es2015"</span>, <span class="hljs-string">"stage-0"</span>, <span class="hljs-string">"react"</span>],
  <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>]
}</code></pre>
<p>这是一劳永逸的做法，何乐而不为呢？除此之外，我们还可以使用webpack自带的cache，以缓存生成的模块和chunks以提高多个增量构建的性能。</p>
<p>在webpack的整个构建过程中，有多个地方提供了缓存的机会，如果我们打开了这些缓存，会大大加速我们的构建</p>
<p>而针对增量构建 ，我们一般使用:</p>
<p>webpack-dev-server或webpack-dev-middleware，这里我们使用<code>webpack-dev-middleware</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackDevMiddleware(compiler, {
                    publicPath: webpackConfig.output.publicPath,
                    stats: {
                      chunks: false,
                      colors: true
                    },
                    debug: true,
                    hot: true,
                    lazy: false,
                    historyApiFallback: true,
                    poll: true
                })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">webpackDevMiddleware(compiler, {
                    <span class="hljs-attr">publicPath</span>: webpackConfig.output.publicPath,
                    <span class="hljs-attr">stats</span>: {
                      <span class="hljs-attr">chunks</span>: <span class="hljs-literal">false</span>,
                      <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>
                    },
                    <span class="hljs-attr">debug</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">lazy</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">historyApiFallback</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">poll</span>: <span class="hljs-literal">true</span>
                })</code></pre>
<p>通过设置<code>chunks:false</code>，可以将控制台输出的代码块信息关闭</p>
<p><strong>5.减少构建搜索或编译路径</strong></p>
<p>为了加快webpack打包时对资源的搜索速度，有很多的做法：</p>
<ul><li>Resolove.root VS Resolove.moduledirectories</li></ul>
<p>大多数路径应该使用<code> resolve.root</code>，只对嵌套的路径使用 <code>Resolove.moduledirectories</code>，这可以获得显著的性能提升</p>
<p>原因是<code>Resolove.moduledirectories</code>是取相对路径，所以比起<code> resolve.root</code>会多parse很多路径：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
    root: path.resolve(__dirname,'src'),
    modulesDirectories: ['node_modules']
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">resolve: {
    <span class="hljs-attr">root</span>: path.resolve(__dirname,<span class="hljs-string">'src'</span>),
    <span class="hljs-attr">modulesDirectories</span>: [<span class="hljs-string">'node_modules'</span>]
  },</code></pre>
<ul><li>DLL &amp; DllReference</li></ul>
<p>针对第三方NPM包，这些包我们并不会修改它，但仍然每次都要在build的过程消耗构建性能，我们可以通过DllPlugin来前置这些包的构建，具体实例：<a href="https://github.com/webpack/webpack/tree/master/examples/dll" rel="nofollow noreferrer" target="_blank">https://github.com/webpack/we...</a></p>
<ul><li>alias和noPase</li></ul>
<p><code>resolve.alias </code>是webpack 的一个配置项，它的作用是把用户的一个请求重定向到另一个路径。 比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {  // 显示指出依赖查找路径
    alias: {
        comps: 'src/pages/components'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">resolve: {  <span class="hljs-comment">// 显示指出依赖查找路径</span>
    alias: {
        <span class="hljs-attr">comps</span>: <span class="hljs-string">'src/pages/components'</span>
    }
}</code></pre>
<p>这样我们在要打包的脚本中的使用 <code>require('comps/Loading.jsx');</code>其实就等价于<code>require('src/pages/components/Loading.jsx')</code>。</p>
<p>webpack 默认会去寻找所有 resolve.root 下的模块，但是有些目录我们是可以明确告知 webpack 不要管这里，从而减轻 webpack 的工作量。这时会用到<code>module.noParse</code> 参数</p>
<p>在项目中合理使用 alias 和 noParse 可以有效提升效率，虽然不是很明显</p>
<p>以上配置均由本人给出，仅供参考（有些插件的官方文档给的不是那么明晰）</p>
<p><strong>6.其他</strong></p>
<ul>
<li>开启devtool: "#inline-source-map"会增加编译时间</li>
<li>css-loader 0.15.0+ 使webpack加载变得缓慢</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//css-loader 0.16.0
Hash: 8d3652a9b4988c8ad221
Version: webpack 1.11.0
Time: 51612ms

//以下是css-loader 0.14.5
Hash: bd471e6f4aa10b195feb
Version: webpack 1.11.0
Time: 6121ms" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code>//css-loader 0.16.0
Hash: 8d3652a9b4988c8ad221
Version: webpack 1.11.0
<span class="hljs-keyword">Time:</span> 51612ms

//以下是css-loader 0.14.5
Hash: bd471e6f4aa10b195feb
Version: webpack 1.11.0
<span class="hljs-keyword">Time:</span> 6121ms</code></pre>
<ul>
<li>对于ant-design模块，使用<code>babel-plugin-import</code>插件来按需加载模块</li>
<li>DedupePlugin插件可以在打包的时候删除重复或者相似的文件，实际测试中应该是文件级别的重复的文件</li>
</ul>
<h3 id="articleHeader6">结尾</h3>
<p>虽然上面的做法减少了文件体积，加快了编译速度，整体构建(initial build)从最初的三分多钟到一分钟，rebuild十多秒，优化效果明显。但对于Webpack + React项目来说，性能优化方面远不止于此，还有很多的优化空间，比如服务端渲染，首屏优化，异步加载模块，按需加载，代码分割等等</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack打包分析与性能优化

## 原文链接
[https://segmentfault.com/a/1190000008377195](https://segmentfault.com/a/1190000008377195)


---
title: webpack详解
reprint: true
categories: reprint
abbrlink: '73362992'
date: 2018-10-23 00:00:00
---

{{% raw %}}

                    
<p>webpack是现代前端开发中最火的模块打包工具，只需要通过简单的配置，便可以完成模块的加载和打包。那它是怎么做到通过对一些插件的配置，便可以轻松实现对代码的构建呢？</p>
<h3 id="articleHeader0">webpack的配置</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
module.exports = {
  entry: &quot;./app/entry&quot;, // string | object | array
  // Webpack打包的入口
  output: {  // 定义webpack如何输出的选项
    path: path.resolve(__dirname, &quot;dist&quot;), // string
    // 所有输出文件的目标路径
    filename: &quot;[chunkhash].js&quot;, // string
    // 「入口(entry chunk)」文件命名模版
    publicPath: &quot;/assets/&quot;, // string
    // 构建文件的输出目录
    /* 其它高级配置 */
  },
  module: {  // 模块相关配置
    rules: [ // 配置模块loaders，解析规则
      {
        test: /\.jsx?$/,  // RegExp | string
        include: [ // 和test一样，必须匹配选项
          path.resolve(__dirname, &quot;app&quot;)
        ],
        exclude: [ // 必不匹配选项（优先级高于test和include）
          path.resolve(__dirname, &quot;app/demo-files&quot;)
        ],
        loader: &quot;babel-loader&quot;, // 模块上下文解析
        options: { // loader的可选项
          presets: [&quot;es2015&quot;]
        },
      },
  },
  resolve: { //  解析模块的可选项
    modules: [ // 模块的查找目录
      &quot;node_modules&quot;,
      path.resolve(__dirname, &quot;app&quot;)
    ],
    extensions: [&quot;.js&quot;, &quot;.json&quot;, &quot;.jsx&quot;, &quot;.css&quot;], // 用到的文件的扩展
    alias: { // 模块别名列表
      &quot;module&quot;: &quot;new-module&quot;
      },
  },
  devtool: &quot;source-map&quot;, // enum
  // 为浏览器开发者工具添加元数据增强调试
  plugins: [ // 附加插件列表
    // ...
  ],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">"./app/entry"</span>, <span class="hljs-comment">// string | object | array</span>
  <span class="hljs-comment">// Webpack打包的入口</span>
  output: {  <span class="hljs-comment">// 定义webpack如何输出的选项</span>
    path: path.resolve(__dirname, <span class="hljs-string">"dist"</span>), <span class="hljs-comment">// string</span>
    <span class="hljs-comment">// 所有输出文件的目标路径</span>
    filename: <span class="hljs-string">"[chunkhash].js"</span>, <span class="hljs-comment">// string</span>
    <span class="hljs-comment">// 「入口(entry chunk)」文件命名模版</span>
    publicPath: <span class="hljs-string">"/assets/"</span>, <span class="hljs-comment">// string</span>
    <span class="hljs-comment">// 构建文件的输出目录</span>
    <span class="hljs-comment">/* 其它高级配置 */</span>
  },
  <span class="hljs-attr">module</span>: {  <span class="hljs-comment">// 模块相关配置</span>
    rules: [ <span class="hljs-comment">// 配置模块loaders，解析规则</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,  <span class="hljs-comment">// RegExp | string</span>
        include: [ <span class="hljs-comment">// 和test一样，必须匹配选项</span>
          path.resolve(__dirname, <span class="hljs-string">"app"</span>)
        ],
        <span class="hljs-attr">exclude</span>: [ <span class="hljs-comment">// 必不匹配选项（优先级高于test和include）</span>
          path.resolve(__dirname, <span class="hljs-string">"app/demo-files"</span>)
        ],
        <span class="hljs-attr">loader</span>: <span class="hljs-string">"babel-loader"</span>, <span class="hljs-comment">// 模块上下文解析</span>
        options: { <span class="hljs-comment">// loader的可选项</span>
          presets: [<span class="hljs-string">"es2015"</span>]
        },
      },
  },
  <span class="hljs-attr">resolve</span>: { <span class="hljs-comment">//  解析模块的可选项</span>
    modules: [ <span class="hljs-comment">// 模块的查找目录</span>
      <span class="hljs-string">"node_modules"</span>,
      path.resolve(__dirname, <span class="hljs-string">"app"</span>)
    ],
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">".js"</span>, <span class="hljs-string">".json"</span>, <span class="hljs-string">".jsx"</span>, <span class="hljs-string">".css"</span>], <span class="hljs-comment">// 用到的文件的扩展</span>
    alias: { <span class="hljs-comment">// 模块别名列表</span>
      <span class="hljs-string">"module"</span>: <span class="hljs-string">"new-module"</span>
      },
  },
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">"source-map"</span>, <span class="hljs-comment">// enum</span>
  <span class="hljs-comment">// 为浏览器开发者工具添加元数据增强调试</span>
  plugins: [ <span class="hljs-comment">// 附加插件列表</span>
    <span class="hljs-comment">// ...</span>
  ],
}</code></pre>
<p>从上面我们可以看到，webpack配置中需要理解几个核心的概念<code>Entry</code> 、<code>Output</code>、<code>Loaders</code> 、<code>Plugins</code>、 <code>Chunk</code></p>
<ul>
<li>Entry：指定webpack开始构建的入口模块，从该模块开始构建并计算出直接或间接依赖的模块或者库</li>
<li>Output：告诉webpack如何命名输出的文件以及输出的目录</li>
<li>Loaders：由于webpack只能处理javascript，所以我们需要对一些非js文件处理成webpack能够处理的模块，比如sass文件</li>
<li>Plugins：<code>Loaders</code>将各类型的文件处理成webpack能够处理的模块，<code>plugins</code>有着很强的能力。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。但也是最复杂的一个。比如对js文件进行压缩优化的<code>UglifyJsPlugin</code>插件</li>
<li>Chunk：coding split的产物，我们可以对一些代码打包成一个单独的chunk，比如某些公共模块，去重，更好的利用缓存。或者按需加载某些功能模块，优化加载时间。在webpack3及以前我们都利用<code>CommonsChunkPlugin</code>将一些公共代码分割成一个chunk，实现单独加载。在webpack4 中<code>CommonsChunkPlugin</code>被废弃，使用<code>SplitChunksPlugin</code>
</li>
</ul>
<h3 id="articleHeader1">webpack详解</h3>
<p>读到这里，或许你对webpack有一个大概的了解，那webpack 是怎么运行的呢？我们都知道，webpack是高度复杂抽象的插件集合，理解webpack的运行机制，对于我们日常定位构建错误以及写一些插件处理构建任务有很大的帮助。</p>
<h4>不得不说的tapable</h4>
<p>webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是<a href="https://github.com/webpack/tapable" rel="nofollow noreferrer" target="_blank">Tapable</a>，webpack中最核心的负责编译的<code>Compiler</code>和负责创建bundles的<code>Compilation</code>都是Tapable的实例。在Tapable1.0之前，也就是webpack3及其以前使用的Tapable，提供了包括</p>
<ul>
<li>
<code>plugin(name:string, handler:function)</code>注册插件到Tapable对象中</li>
<li>
<code>apply(…pluginInstances: (AnyPlugin|function)[])</code>调用插件的定义，将事件监听器注册到Tapable实例注册表中</li>
<li>
<code>applyPlugins*(name:string, …)</code>多种策略细致地控制事件的触发，包括<code>applyPluginsAsync</code>、<code>applyPluginsParallel</code>等方法实现对事件触发的控制，实现</li>
</ul>
<p>（1）多个事件连续顺序执行<br>（2）并行执行<br>（3）异步执行<br>（4）一个接一个地执行插件，前面的输出是后一个插件的输入的瀑布流执行顺序<br>（5）在允许时停止执行插件，即某个插件返回了一个<code>undefined</code>的值，即退出执行<br>我们可以看到，Tapable就像nodejs中<code>EventEmitter</code>,提供对事件的注册<code>on</code>和触发<code>emit</code>,理解它很重要，看个栗子：比如我们来写一个插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function CustomPlugin() {}
CustomPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', pluginFunction);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CustomPlugin</span>(<span class="hljs-params"></span>) </span>{}
CustomPlugin.prototype.apply = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compiler</span>) </span>{
  compiler.plugin(<span class="hljs-string">'emit'</span>, pluginFunction);
}</code></pre>
<p>在webpack的生命周期中会适时的执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.apply*(&quot;emit&quot;,options)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.apply*(<span class="hljs-string">"emit"</span>,options)</code></pre>
<p>当然上面提到的Tapable都是1.0版本之前的，如果想深入学习，可以查看<a href="https://segmentfault.com/a/1190000008060440">Tapable 和 事件流</a><br>那1.0的Tapable又是什么样的呢？1.0版本发生了巨大的改变，不再是此前的通过<code>plugin</code>注册事件，通过<code>applyPlugins*</code>触发事件调用，那1.0的Tapable是什么呢？</p>
<blockquote>暴露出很多的钩子，可以使用它们为插件创建钩子函数</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
 } = require(&quot;tapable&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
 } = <span class="hljs-built_in">require</span>(<span class="hljs-string">"tapable"</span>);</code></pre>
<p>我们来看看 怎么使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Order {
    constructor() {
        this.hooks = { //hooks
            goods: new SyncHook(['goodsId', 'number']),
            consumer: new AsyncParallelHook(['userId', 'orderId'])
        }
    }

    queryGoods(goodsId, number) {
        this.hooks.goods.call(goodsId, number);
    }

    consumerInfoPromise(userId, orderId) {
        this.hooks.consumer.promise(userId, orderId).then(() => {
            //TODO
        })
    }

    consumerInfoAsync(userId, orderId) {
        this.hooks.consumer.callAsync(userId, orderId, (err, data) => {
            //TODO
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Order</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">this</span>.hooks = { <span class="hljs-comment">//hooks</span>
            goods: <span class="hljs-keyword">new</span> SyncHook([<span class="hljs-string">'goodsId'</span>, <span class="hljs-string">'number'</span>]),
            <span class="hljs-attr">consumer</span>: <span class="hljs-keyword">new</span> AsyncParallelHook([<span class="hljs-string">'userId'</span>, <span class="hljs-string">'orderId'</span>])
        }
    }

    queryGoods(goodsId, number) {
        <span class="hljs-keyword">this</span>.hooks.goods.call(goodsId, number);
    }

    consumerInfoPromise(userId, orderId) {
        <span class="hljs-keyword">this</span>.hooks.consumer.promise(userId, orderId).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-comment">//TODO</span>
        })
    }

    consumerInfoAsync(userId, orderId) {
        <span class="hljs-keyword">this</span>.hooks.consumer.callAsync(userId, orderId, (err, data) =&gt; {
            <span class="hljs-comment">//TODO</span>
        })
    }
}</code></pre>
<p>对于所有的hook的构造函数均接受一个可选的string类型的数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const hook = new SyncHook([&quot;arg1&quot;, &quot;arg2&quot;, &quot;arg3&quot;]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> hook = <span class="hljs-keyword">new</span> SyncHook([<span class="hljs-string">"arg1"</span>, <span class="hljs-string">"arg2"</span>, <span class="hljs-string">"arg3"</span>]);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 调用tap方法注册一个consument
order.hooks.goods.tap('QueryPlugin', (goodsId, number) => {
    return fetchGoods(goodsId, number);
})
// 再添加一个
order.hooks.goods.tap('LoggerPlugin', (goodsId, number) => {
    logger(goodsId, number);
})

// 调用
order.queryGoods('10000000', 1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 调用tap方法注册一个consument</span>
order.hooks.goods.tap(<span class="hljs-string">'QueryPlugin'</span>, (goodsId, number) =&gt; {
    <span class="hljs-keyword">return</span> fetchGoods(goodsId, number);
})
<span class="hljs-comment">// 再添加一个</span>
order.hooks.goods.tap(<span class="hljs-string">'LoggerPlugin'</span>, (goodsId, number) =&gt; {
    logger(goodsId, number);
})

<span class="hljs-comment">// 调用</span>
order.queryGoods(<span class="hljs-string">'10000000'</span>, <span class="hljs-number">1</span>)</code></pre>
<p>对于一个 <code>SyncHook</code>,我们通过<code>tap</code>来添加消费者，通过<code>call</code>来触发钩子的顺序执行。</p>
<p>对于一个非<code>sync*</code>类型的钩子，即<code>async*</code>类型的钩子，我们还可以通过其它方式注册消费者和调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注册一个sync 钩子
order.hooks.consumer.tap('LoggerPlugin', (userId, orderId) => {
   logger(userId, orderId);
})

order.hooks.consumer.tapAsync('LoginCheckPlugin', (userId, orderId, callback) => {
    LoginCheck(userId, callback);
})

order.hooks.consumer.tapPromise('PayPlugin', (userId, orderId) => {
    return Promise.resolve();
})

// 调用
// 返回Promise
order.consumerInfoPromise('user007', '1024');

//回调函数
order.consumerInfoAsync('user007', '1024')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 注册一个sync 钩子</span>
order.hooks.consumer.tap(<span class="hljs-string">'LoggerPlugin'</span>, (userId, orderId) =&gt; {
   logger(userId, orderId);
})

order.hooks.consumer.tapAsync(<span class="hljs-string">'LoginCheckPlugin'</span>, (userId, orderId, callback) =&gt; {
    LoginCheck(userId, callback);
})

order.hooks.consumer.tapPromise(<span class="hljs-string">'PayPlugin'</span>, (userId, orderId) =&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve();
})

<span class="hljs-comment">// 调用</span>
<span class="hljs-comment">// 返回Promise</span>
order.consumerInfoPromise(<span class="hljs-string">'user007'</span>, <span class="hljs-string">'1024'</span>);

<span class="hljs-comment">//回调函数</span>
order.consumerInfoAsync(<span class="hljs-string">'user007'</span>, <span class="hljs-string">'1024'</span>)</code></pre>
<p>通过上面的栗子，你可能已经大致了解了<code>Tapable</code>的用法，它的用法</p>
<ul>
<li>插件注册数量</li>
<li>插件注册的类型（sync, async, promise）</li>
<li>调用的方式（sync, async, promise）</li>
<li>实例钩子的时候参数数量</li>
<li>是否使用了<code>interception</code>
</li>
</ul>
<h4>Tapable详解</h4>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000013657047" src="https://static.alili.tech/img/remote/1460000013657047" alt="Alt text" title="Alt text" style="cursor: pointer; display: inline;"></span><br>对于<code>Sync*</code>类型的钩子来说。</p>
<ul>
<li>注册在该钩子下面的插件的执行顺序都是顺序执行。</li>
<li>只能使用<code>tap</code>注册，不能使用<code>tapPromise</code>和<code>tapAsync</code>注册</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 所有的钩子都继承于Hook
class Sync* extends Hook { 
    tapAsync() { // Sync*类型的钩子不支持tapAsync
        throw new Error(&quot;tapAsync is not supported on a Sync*&quot;);
    }
    tapPromise() {// Sync*类型的钩子不支持tapPromise
        throw new Error(&quot;tapPromise is not supported on a Sync*&quot;);
    }
    compile(options) { // 编译代码来按照一定的策略执行Plugin
        factory.setup(this, options);
        return factory.create(options);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 所有的钩子都继承于Hook</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Sync</span>* <span class="hljs-keyword">extends</span> <span class="hljs-title">Hook</span> </span>{ 
    tapAsync() { <span class="hljs-comment">// Sync*类型的钩子不支持tapAsync</span>
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"tapAsync is not supported on a Sync*"</span>);
    }
    tapPromise() {<span class="hljs-comment">// Sync*类型的钩子不支持tapPromise</span>
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"tapPromise is not supported on a Sync*"</span>);
    }
    compile(options) { <span class="hljs-comment">// 编译代码来按照一定的策略执行Plugin</span>
        factory.setup(<span class="hljs-keyword">this</span>, options);
        <span class="hljs-keyword">return</span> factory.create(options);
    }
}</code></pre>
<p>对于<code>Async*</code>类型钩子</p>
<ul><li>支持<code>tap</code>、<code>tapPromise</code>、<code>tapAsync</code>注册</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class AsyncParallelHook extends Hook {
    constructor(args) {
        super(args);
        this.call = this._call = undefined;
    }

    compile(options) {
        factory.setup(this, options);
        return factory.create(options);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AsyncParallelHook</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Hook</span> </span>{
    <span class="hljs-keyword">constructor</span>(args) {
        <span class="hljs-keyword">super</span>(args);
        <span class="hljs-keyword">this</span>.call = <span class="hljs-keyword">this</span>._call = <span class="hljs-literal">undefined</span>;
    }

    compile(options) {
        factory.setup(<span class="hljs-keyword">this</span>, options);
        <span class="hljs-keyword">return</span> factory.create(options);
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Hook {
    constructor(args) {
        if(!Array.isArray(args)) args = [];
        this._args = args; // 实例钩子的时候的string类型的数组
        this.taps = []; // 消费者
        this.interceptors = []; // interceptors
        this.call = this._call =  // 以sync类型方式来调用钩子
        this._createCompileDelegate(&quot;call&quot;, &quot;sync&quot;);
        this.promise = 
        this._promise = // 以promise方式
        this._createCompileDelegate(&quot;promise&quot;, &quot;promise&quot;);
        this.callAsync = 
        this._callAsync = // 以async类型方式来调用
        this._createCompileDelegate(&quot;callAsync&quot;, &quot;async&quot;);
        this._x = undefined; // 
    }

    _createCall(type) {
        return this.compile({
            taps: this.taps,
            interceptors: this.interceptors,
            args: this._args,
            type: type
        });
    }

    _createCompileDelegate(name, type) {
        const lazyCompileHook = (...args) => {
            this[name] = this._createCall(type);
            return this[name](...args);
        };
        return lazyCompileHook;
    }
    // 调用tap 类型注册
    tap(options, fn) {
        // ...
        options = Object.assign({ type: &quot;sync&quot;, fn: fn }, options);
        // ...
        this._insert(options);  // 添加到 this.taps中
    }
    // 注册 async类型的钩子
    tapAsync(options, fn) {
        // ...
        options = Object.assign({ type: &quot;async&quot;, fn: fn }, options);
        // ...
        this._insert(options); // 添加到 this.taps中
    }
    注册 promise类型钩子
    tapPromise(options, fn) {
        // ...
        options = Object.assign({ type: &quot;promise&quot;, fn: fn }, options);
        // ...
        this._insert(options); // 添加到 this.taps中
    }
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hook</span> </span>{
    <span class="hljs-keyword">constructor</span>(args) {
        <span class="hljs-keyword">if</span>(!<span class="hljs-built_in">Array</span>.isArray(args)) args = [];
        <span class="hljs-keyword">this</span>._args = args; <span class="hljs-comment">// 实例钩子的时候的string类型的数组</span>
        <span class="hljs-keyword">this</span>.taps = []; <span class="hljs-comment">// 消费者</span>
        <span class="hljs-keyword">this</span>.interceptors = []; <span class="hljs-comment">// interceptors</span>
        <span class="hljs-keyword">this</span>.call = <span class="hljs-keyword">this</span>._call =  <span class="hljs-comment">// 以sync类型方式来调用钩子</span>
        <span class="hljs-keyword">this</span>._createCompileDelegate(<span class="hljs-string">"call"</span>, <span class="hljs-string">"sync"</span>);
        <span class="hljs-keyword">this</span>.promise = 
        <span class="hljs-keyword">this</span>._promise = <span class="hljs-comment">// 以promise方式</span>
        <span class="hljs-keyword">this</span>._createCompileDelegate(<span class="hljs-string">"promise"</span>, <span class="hljs-string">"promise"</span>);
        <span class="hljs-keyword">this</span>.callAsync = 
        <span class="hljs-keyword">this</span>._callAsync = <span class="hljs-comment">// 以async类型方式来调用</span>
        <span class="hljs-keyword">this</span>._createCompileDelegate(<span class="hljs-string">"callAsync"</span>, <span class="hljs-string">"async"</span>);
        <span class="hljs-keyword">this</span>._x = <span class="hljs-literal">undefined</span>; <span class="hljs-comment">// </span>
    }

    _createCall(type) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.compile({
            <span class="hljs-attr">taps</span>: <span class="hljs-keyword">this</span>.taps,
            <span class="hljs-attr">interceptors</span>: <span class="hljs-keyword">this</span>.interceptors,
            <span class="hljs-attr">args</span>: <span class="hljs-keyword">this</span>._args,
            <span class="hljs-attr">type</span>: type
        });
    }

    _createCompileDelegate(name, type) {
        <span class="hljs-keyword">const</span> lazyCompileHook = <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> {
            <span class="hljs-keyword">this</span>[name] = <span class="hljs-keyword">this</span>._createCall(type);
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[name](...args);
        };
        <span class="hljs-keyword">return</span> lazyCompileHook;
    }
    <span class="hljs-comment">// 调用tap 类型注册</span>
    tap(options, fn) {
        <span class="hljs-comment">// ...</span>
        options = <span class="hljs-built_in">Object</span>.assign({ <span class="hljs-attr">type</span>: <span class="hljs-string">"sync"</span>, <span class="hljs-attr">fn</span>: fn }, options);
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">this</span>._insert(options);  <span class="hljs-comment">// 添加到 this.taps中</span>
    }
    <span class="hljs-comment">// 注册 async类型的钩子</span>
    tapAsync(options, fn) {
        <span class="hljs-comment">// ...</span>
        options = <span class="hljs-built_in">Object</span>.assign({ <span class="hljs-attr">type</span>: <span class="hljs-string">"async"</span>, <span class="hljs-attr">fn</span>: fn }, options);
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">this</span>._insert(options); <span class="hljs-comment">// 添加到 this.taps中</span>
    }
    注册 promise类型钩子
    tapPromise(options, fn) {
        <span class="hljs-comment">// ...</span>
        options = <span class="hljs-built_in">Object</span>.assign({ <span class="hljs-attr">type</span>: <span class="hljs-string">"promise"</span>, <span class="hljs-attr">fn</span>: fn }, options);
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">this</span>._insert(options); <span class="hljs-comment">// 添加到 this.taps中</span>
    }
    
}</code></pre>
<p>每次都是调用<code>tap</code>、<code>tapSync</code>、<code>tapPromise</code>注册不同类型的插件钩子，通过调用<code>call</code>、<code>callAsync</code> 、<code>promise</code>方式调用。其实调用的时候为了按照一定的执行策略执行，调用<code>compile</code>方法快速编译出一个方法来执行这些插件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const factory = new Sync*CodeFactory();
class Sync* extends Hook { 
    // ...
    compile(options) { // 编译代码来按照一定的策略执行Plugin
        factory.setup(this, options);
        return factory.create(options);
    }
}

class Sync*CodeFactory extends HookCodeFactory {
    content({ onError, onResult, onDone, rethrowIfPossible }) {
        return this.callTapsSeries({
            onError: (i, err) => onError(err),
            onDone,
            rethrowIfPossible
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> factory = <span class="hljs-keyword">new</span> Sync*CodeFactory();
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Sync</span>* <span class="hljs-keyword">extends</span> <span class="hljs-title">Hook</span> </span>{ 
    <span class="hljs-comment">// ...</span>
    compile(options) { <span class="hljs-comment">// 编译代码来按照一定的策略执行Plugin</span>
        factory.setup(<span class="hljs-keyword">this</span>, options);
        <span class="hljs-keyword">return</span> factory.create(options);
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Sync</span>*<span class="hljs-title">CodeFactory</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">HookCodeFactory</span> </span>{
    content({ onError, onResult, onDone, rethrowIfPossible }) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.callTapsSeries({
            <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">i, err</span>) =&gt;</span> onError(err),
            onDone,
            rethrowIfPossible
        });
    }
}</code></pre>
<p><code>compile</code>中调用<code>HookCodeFactory#create</code>方法编译生成执行代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
class HookCodeFactory {
    constructor(config) {
        this.config = config;
        this.options = undefined;
    }

    create(options) {
        this.init(options);
        switch(this.options.type) {
            case &quot;sync&quot;:  // 编译生成sync, 结果直接返回
                return new Function(this.args(), 
                &quot;\&quot;use strict\&quot;;\n&quot; + this.header() + this.content({
                    // ...
                    onResult: result => `return ${result};\n`,
                    // ...
                }));
            case &quot;async&quot;: // async类型, 异步执行，最后将调用插件执行结果来调用callback,
                return new Function(this.args({
                    after: &quot;_callback&quot;
                }), &quot;\&quot;use strict\&quot;;\n&quot; + this.header() + this.content({
                    // ...
                    onResult: result => `_callback(null, ${result});\n`,
                    onDone: () => &quot;_callback();\n&quot;
                }));
            case &quot;promise&quot;: // 返回promise类型，将结果放在resolve中
                // ...
                code += &quot;return new Promise((_resolve, _reject) => {\n&quot;;
                code += &quot;var _sync = true;\n&quot;;
                code += this.header();
                code += this.content({
                    // ...
                    onResult: result => `_resolve(${result});\n`,
                    onDone: () => &quot;_resolve();\n&quot;
                });
                // ...
                return new Function(this.args(), code);
        }
    }
    // callTap 就是执行一些插件，并将结果返回
    callTap(tapIndex, { onError, onResult, onDone, rethrowIfPossible }) {
        let code = &quot;&quot;;
        let hasTapCached = false;
        // ...
        code += `var _fn${tapIndex} = ${this.getTapFn(tapIndex)};\n`;
        const tap = this.options.taps[tapIndex];
        switch(tap.type) {
            case &quot;sync&quot;:
                // ...
                if(onResult) {
                    code += `var _result${tapIndex} = _fn${tapIndex}(${this.args({
                        before: tap.context ? &quot;_context&quot; : undefined
                    })});\n`;
                } else {
                    code += `_fn${tapIndex}(${this.args({
                        before: tap.context ? &quot;_context&quot; : undefined
                    })});\n`;
                }
                
                if(onResult) { // 结果透传
                    code += onResult(`_result${tapIndex}`);
                }
                if(onDone) { // 通知插件执行完毕，可以执行下一个插件
                    code += onDone();
                }
                break;
            case &quot;async&quot;: //异步执行，插件运行完后再将结果通过执行callback透传
                let cbCode = &quot;&quot;;
                if(onResult)
                    cbCode += `(_err${tapIndex}, _result${tapIndex}) => {\n`;
                else
                    cbCode += `_err${tapIndex} => {\n`;
                cbCode += `if(_err${tapIndex}) {\n`;
                cbCode += onError(`_err${tapIndex}`);
                cbCode += &quot;} else {\n&quot;;
                if(onResult) {
                    cbCode += onResult(`_result${tapIndex}`);
                }
                
                cbCode += &quot;}\n&quot;;
                cbCode += &quot;}&quot;;
                code += `_fn${tapIndex}(${this.args({
                    before: tap.context ? &quot;_context&quot; : undefined,
                    after: cbCode //cbCode将结果透传
                })});\n`;
                break;
            case &quot;promise&quot;: // _fn${tapIndex} 就是第tapIndex 个插件，它必须是个Promise类型的插件
                code += `var _hasResult${tapIndex} = false;\n`;
                code += `_fn${tapIndex}(${this.args({
                    before: tap.context ? &quot;_context&quot; : undefined
                })}).then(_result${tapIndex} => {\n`;
                code += `_hasResult${tapIndex} = true;\n`;
                if(onResult) {
                    code += onResult(`_result${tapIndex}`);
                }
            // ...
                break;
        }
        return code;
    }
    // 按照插件的注册顺序，按照顺序递归调用执行插件
    callTapsSeries({ onError, onResult, onDone, rethrowIfPossible }) {
        // ...
        const firstAsync = this.options.taps.findIndex(t => t.type !== &quot;sync&quot;);
        const next = i => {
            // ...
            const done = () => next(i + 1);
            // ...
            return this.callTap(i, {
                // ...
                onResult: onResult &amp;&amp; ((result) => {
                    return onResult(i, result, done, doneBreak);
                }),
                // ...
            });
        };
        return next(0);
    }

    callTapsLooping({ onError, onDone, rethrowIfPossible }) {
        
        const syncOnly = this.options.taps.every(t => t.type === &quot;sync&quot;);
        let code = &quot;&quot;;
        if(!syncOnly) {
            code += &quot;var _looper = () => {\n&quot;;
            code += &quot;var _loopAsync = false;\n&quot;;
        }
        code += &quot;var _loop;\n&quot;;
        code += &quot;do {\n&quot;;
        code += &quot;_loop = false;\n&quot;;
        // ...
        code += this.callTapsSeries({
            // ...
            onResult: (i, result, next, doneBreak) => { // 一旦某个插件返回不为undefined,  即一只调用某个插件执行，如果为undefined,开始调用下一个
                let code = &quot;&quot;;
                code += `if(${result} !== undefined) {\n`;
                code += &quot;_loop = true;\n&quot;;
                if(!syncOnly)
                    code += &quot;if(_loopAsync) _looper();\n&quot;;
                code += doneBreak(true);
                code += `} else {\n`;
                code += next();
                code += `}\n`;
                return code;
            },
            // ...
        })
        code += &quot;} while(_loop);\n&quot;;
        // ...
        return code;
    }
    // 并行调用插件执行
    callTapsParallel({ onError, onResult, onDone, rethrowIfPossible, onTap = (i, run) => run() }) {
        // ...
        // 遍历注册都所有插件，并调用
        for(let i = 0; i < this.options.taps.length; i++) {
            // ...
            code += &quot;if(_counter <= 0) break;\n&quot;;
            code += onTap(i, () => this.callTap(i, {
                // ...
                onResult: onResult &amp;&amp; ((result) => {
                    let code = &quot;&quot;;
                    code += &quot;if(_counter > 0) {\n&quot;;
                    code += onResult(i, result, done, doneBreak);
                    code += &quot;}\n&quot;;
                    return code;
                }),
                // ...
            }), done, doneBreak);
        }
        // ...
        return code;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HookCodeFactory</span> </span>{
    <span class="hljs-keyword">constructor</span>(config) {
        <span class="hljs-keyword">this</span>.config = config;
        <span class="hljs-keyword">this</span>.options = <span class="hljs-literal">undefined</span>;
    }

    create(options) {
        <span class="hljs-keyword">this</span>.init(options);
        <span class="hljs-keyword">switch</span>(<span class="hljs-keyword">this</span>.options.type) {
            <span class="hljs-keyword">case</span> <span class="hljs-string">"sync"</span>:  <span class="hljs-comment">// 编译生成sync, 结果直接返回</span>
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-keyword">this</span>.args(), 
                <span class="hljs-string">"\"use strict\";\n"</span> + <span class="hljs-keyword">this</span>.header() + <span class="hljs-keyword">this</span>.content({
                    <span class="hljs-comment">// ...</span>
                    onResult: <span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> <span class="hljs-string">`return <span class="hljs-subst">${result}</span>;\n`</span>,
                    <span class="hljs-comment">// ...</span>
                }));
            <span class="hljs-keyword">case</span> <span class="hljs-string">"async"</span>: <span class="hljs-comment">// async类型, 异步执行，最后将调用插件执行结果来调用callback,</span>
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-keyword">this</span>.args({
                    <span class="hljs-attr">after</span>: <span class="hljs-string">"_callback"</span>
                }), <span class="hljs-string">"\"use strict\";\n"</span> + <span class="hljs-keyword">this</span>.header() + <span class="hljs-keyword">this</span>.content({
                    <span class="hljs-comment">// ...</span>
                    onResult: <span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> <span class="hljs-string">`_callback(null, <span class="hljs-subst">${result}</span>);\n`</span>,
                    <span class="hljs-attr">onDone</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-string">"_callback();\n"</span>
                }));
            <span class="hljs-keyword">case</span> <span class="hljs-string">"promise"</span>: <span class="hljs-comment">// 返回promise类型，将结果放在resolve中</span>
                <span class="hljs-comment">// ...</span>
                code += <span class="hljs-string">"return new Promise((_resolve, _reject) =&gt; {\n"</span>;
                code += <span class="hljs-string">"var _sync = true;\n"</span>;
                code += <span class="hljs-keyword">this</span>.header();
                code += <span class="hljs-keyword">this</span>.content({
                    <span class="hljs-comment">// ...</span>
                    onResult: <span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> <span class="hljs-string">`_resolve(<span class="hljs-subst">${result}</span>);\n`</span>,
                    <span class="hljs-attr">onDone</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-string">"_resolve();\n"</span>
                });
                <span class="hljs-comment">// ...</span>
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-keyword">this</span>.args(), code);
        }
    }
    <span class="hljs-comment">// callTap 就是执行一些插件，并将结果返回</span>
    callTap(tapIndex, { onError, onResult, onDone, rethrowIfPossible }) {
        <span class="hljs-keyword">let</span> code = <span class="hljs-string">""</span>;
        <span class="hljs-keyword">let</span> hasTapCached = <span class="hljs-literal">false</span>;
        <span class="hljs-comment">// ...</span>
        code += <span class="hljs-string">`var _fn<span class="hljs-subst">${tapIndex}</span> = <span class="hljs-subst">${<span class="hljs-keyword">this</span>.getTapFn(tapIndex)}</span>;\n`</span>;
        <span class="hljs-keyword">const</span> tap = <span class="hljs-keyword">this</span>.options.taps[tapIndex];
        <span class="hljs-keyword">switch</span>(tap.type) {
            <span class="hljs-keyword">case</span> <span class="hljs-string">"sync"</span>:
                <span class="hljs-comment">// ...</span>
                <span class="hljs-keyword">if</span>(onResult) {
                    code += <span class="hljs-string">`var _result<span class="hljs-subst">${tapIndex}</span> = _fn<span class="hljs-subst">${tapIndex}</span>(<span class="hljs-subst">${<span class="hljs-keyword">this</span>.args({
                        before: tap.context ? <span class="hljs-string">"_context"</span> : <span class="hljs-literal">undefined</span>
                    }</span>)});\n`</span>;
                } <span class="hljs-keyword">else</span> {
                    code += <span class="hljs-string">`_fn<span class="hljs-subst">${tapIndex}</span>(<span class="hljs-subst">${<span class="hljs-keyword">this</span>.args({
                        before: tap.context ? <span class="hljs-string">"_context"</span> : <span class="hljs-literal">undefined</span>
                    }</span>)});\n`</span>;
                }
                
                <span class="hljs-keyword">if</span>(onResult) { <span class="hljs-comment">// 结果透传</span>
                    code += onResult(<span class="hljs-string">`_result<span class="hljs-subst">${tapIndex}</span>`</span>);
                }
                <span class="hljs-keyword">if</span>(onDone) { <span class="hljs-comment">// 通知插件执行完毕，可以执行下一个插件</span>
                    code += onDone();
                }
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">"async"</span>: <span class="hljs-comment">//异步执行，插件运行完后再将结果通过执行callback透传</span>
                <span class="hljs-keyword">let</span> cbCode = <span class="hljs-string">""</span>;
                <span class="hljs-keyword">if</span>(onResult)
                    cbCode += <span class="hljs-string">`(_err<span class="hljs-subst">${tapIndex}</span>, _result<span class="hljs-subst">${tapIndex}</span>) =&gt; {\n`</span>;
                <span class="hljs-keyword">else</span>
                    cbCode += <span class="hljs-string">`_err<span class="hljs-subst">${tapIndex}</span> =&gt; {\n`</span>;
                cbCode += <span class="hljs-string">`if(_err<span class="hljs-subst">${tapIndex}</span>) {\n`</span>;
                cbCode += onError(<span class="hljs-string">`_err<span class="hljs-subst">${tapIndex}</span>`</span>);
                cbCode += <span class="hljs-string">"} else {\n"</span>;
                <span class="hljs-keyword">if</span>(onResult) {
                    cbCode += onResult(<span class="hljs-string">`_result<span class="hljs-subst">${tapIndex}</span>`</span>);
                }
                
                cbCode += <span class="hljs-string">"}\n"</span>;
                cbCode += <span class="hljs-string">"}"</span>;
                code += <span class="hljs-string">`_fn<span class="hljs-subst">${tapIndex}</span>(<span class="hljs-subst">${<span class="hljs-keyword">this</span>.args({
                    before: tap.context ? <span class="hljs-string">"_context"</span> : <span class="hljs-literal">undefined</span>,
                    after: cbCode <span class="hljs-regexp">//</span>cbCode将结果透传
                }</span>)});\n`</span>;
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">"promise"</span>: <span class="hljs-comment">// _fn${tapIndex} 就是第tapIndex 个插件，它必须是个Promise类型的插件</span>
                code += <span class="hljs-string">`var _hasResult<span class="hljs-subst">${tapIndex}</span> = false;\n`</span>;
                code += <span class="hljs-string">`_fn<span class="hljs-subst">${tapIndex}</span>(<span class="hljs-subst">${<span class="hljs-keyword">this</span>.args({
                    before: tap.context ? <span class="hljs-string">"_context"</span> : <span class="hljs-literal">undefined</span>
                }</span>)}).then(_result<span class="hljs-subst">${tapIndex}</span> =&gt; {\n`</span>;
                code += <span class="hljs-string">`_hasResult<span class="hljs-subst">${tapIndex}</span> = true;\n`</span>;
                <span class="hljs-keyword">if</span>(onResult) {
                    code += onResult(<span class="hljs-string">`_result<span class="hljs-subst">${tapIndex}</span>`</span>);
                }
            <span class="hljs-comment">// ...</span>
                <span class="hljs-keyword">break</span>;
        }
        <span class="hljs-keyword">return</span> code;
    }
    <span class="hljs-comment">// 按照插件的注册顺序，按照顺序递归调用执行插件</span>
    callTapsSeries({ onError, onResult, onDone, rethrowIfPossible }) {
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">const</span> firstAsync = <span class="hljs-keyword">this</span>.options.taps.findIndex(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.type !== <span class="hljs-string">"sync"</span>);
        <span class="hljs-keyword">const</span> next = <span class="hljs-function"><span class="hljs-params">i</span> =&gt;</span> {
            <span class="hljs-comment">// ...</span>
            <span class="hljs-keyword">const</span> done = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> next(i + <span class="hljs-number">1</span>);
            <span class="hljs-comment">// ...</span>
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.callTap(i, {
                <span class="hljs-comment">// ...</span>
                onResult: onResult &amp;&amp; <span class="hljs-function">(<span class="hljs-params">(result</span>) =&gt;</span> {
                    <span class="hljs-keyword">return</span> onResult(i, result, done, doneBreak);
                }),
                <span class="hljs-comment">// ...</span>
            });
        };
        <span class="hljs-keyword">return</span> next(<span class="hljs-number">0</span>);
    }

    callTapsLooping({ onError, onDone, rethrowIfPossible }) {
        
        <span class="hljs-keyword">const</span> syncOnly = <span class="hljs-keyword">this</span>.options.taps.every(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.type === <span class="hljs-string">"sync"</span>);
        <span class="hljs-keyword">let</span> code = <span class="hljs-string">""</span>;
        <span class="hljs-keyword">if</span>(!syncOnly) {
            code += <span class="hljs-string">"var _looper = () =&gt; {\n"</span>;
            code += <span class="hljs-string">"var _loopAsync = false;\n"</span>;
        }
        code += <span class="hljs-string">"var _loop;\n"</span>;
        code += <span class="hljs-string">"do {\n"</span>;
        code += <span class="hljs-string">"_loop = false;\n"</span>;
        <span class="hljs-comment">// ...</span>
        code += <span class="hljs-keyword">this</span>.callTapsSeries({
            <span class="hljs-comment">// ...</span>
            onResult: <span class="hljs-function">(<span class="hljs-params">i, result, next, doneBreak</span>) =&gt;</span> { <span class="hljs-comment">// 一旦某个插件返回不为undefined,  即一只调用某个插件执行，如果为undefined,开始调用下一个</span>
                <span class="hljs-keyword">let</span> code = <span class="hljs-string">""</span>;
                code += <span class="hljs-string">`if(<span class="hljs-subst">${result}</span> !== undefined) {\n`</span>;
                code += <span class="hljs-string">"_loop = true;\n"</span>;
                <span class="hljs-keyword">if</span>(!syncOnly)
                    code += <span class="hljs-string">"if(_loopAsync) _looper();\n"</span>;
                code += doneBreak(<span class="hljs-literal">true</span>);
                code += <span class="hljs-string">`} else {\n`</span>;
                code += next();
                code += <span class="hljs-string">`}\n`</span>;
                <span class="hljs-keyword">return</span> code;
            },
            <span class="hljs-comment">// ...</span>
        })
        code += <span class="hljs-string">"} while(_loop);\n"</span>;
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">return</span> code;
    }
    <span class="hljs-comment">// 并行调用插件执行</span>
    callTapsParallel({ onError, onResult, onDone, rethrowIfPossible, onTap = <span class="hljs-function">(<span class="hljs-params">i, run</span>) =&gt;</span> run() }) {
        <span class="hljs-comment">// ...</span>
        <span class="hljs-comment">// 遍历注册都所有插件，并调用</span>
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.options.taps.length; i++) {
            <span class="hljs-comment">// ...</span>
            code += <span class="hljs-string">"if(_counter &lt;= 0) break;\n"</span>;
            code += onTap(i, () =&gt; <span class="hljs-keyword">this</span>.callTap(i, {
                <span class="hljs-comment">// ...</span>
                onResult: onResult &amp;&amp; <span class="hljs-function">(<span class="hljs-params">(result</span>) =&gt;</span> {
                    <span class="hljs-keyword">let</span> code = <span class="hljs-string">""</span>;
                    code += <span class="hljs-string">"if(_counter &gt; 0) {\n"</span>;
                    code += onResult(i, result, done, doneBreak);
                    code += <span class="hljs-string">"}\n"</span>;
                    <span class="hljs-keyword">return</span> code;
                }),
                <span class="hljs-comment">// ...</span>
            }), done, doneBreak);
        }
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">return</span> code;
    }
}</code></pre>
<p>在<code>HookCodeFactory#create</code>中调用到<code>content</code>方法，此方法将按照此钩子的执行策略，调用不同的方法来执行编译 生成最终的代码。</p>
<ul><li>SyncHook中调用<code>callTapsSeries</code>编译生成最终执行插件的函数，<code>callTapsSeries</code>做的就是将插件列表中插件按照注册顺序遍历执行。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class SyncHookCodeFactory extends HookCodeFactory {
    content({ onError, onResult, onDone, rethrowIfPossible }) {
        return this.callTapsSeries({
            onError: (i, err) => onError(err),
            onDone,
            rethrowIfPossible
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SyncHookCodeFactory</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">HookCodeFactory</span> </span>{
    content({ onError, onResult, onDone, rethrowIfPossible }) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.callTapsSeries({
            <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">i, err</span>) =&gt;</span> onError(err),
            onDone,
            rethrowIfPossible
        });
    }
}</code></pre>
<ul><li>SyncBailHook中当一旦某个返回值结果不为<code>undefined</code>便结束执行列表中的插件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" class SyncBailHookCodeFactory extends HookCodeFactory {
    content({ onError, onResult, onDone, rethrowIfPossible }) {
        return this.callTapsSeries({
            // ...
            onResult: (i, result, next) => `if(${result} !== undefined) {\n${onResult(result)};\n} else {\n${next()}}\n`,
            // ...
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SyncBailHookCodeFactory</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">HookCodeFactory</span> </span>{
    content({ onError, onResult, onDone, rethrowIfPossible }) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.callTapsSeries({
            <span class="hljs-comment">// ...</span>
            onResult: <span class="hljs-function">(<span class="hljs-params">i, result, next</span>) =&gt;</span> <span class="hljs-string">`if(<span class="hljs-subst">${result}</span> !== undefined) {\n<span class="hljs-subst">${onResult(result)}</span>;\n} else {\n<span class="hljs-subst">${next()}</span>}\n`</span>,
            <span class="hljs-comment">// ...</span>
        });
    }
}</code></pre>
<ul><li>SyncWaterfallHook中上一个插件执行结果当作下一个插件的入参</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class SyncWaterfallHookCodeFactory extends HookCodeFactory {
    content({ onError, onResult, onDone, rethrowIfPossible }) {
        return this.callTapsSeries({
            // ...
            onResult: (i, result, next) => {
                let code = &quot;&quot;;
                code += `if(${result} !== undefined) {\n`;
                code += `${this._args[0]} = ${result};\n`;
                code += `}\n`;
                code += next();
                return code;
            },
            onDone: () => onResult(this._args[0]),
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SyncWaterfallHookCodeFactory</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">HookCodeFactory</span> </span>{
    content({ onError, onResult, onDone, rethrowIfPossible }) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.callTapsSeries({
            <span class="hljs-comment">// ...</span>
            onResult: <span class="hljs-function">(<span class="hljs-params">i, result, next</span>) =&gt;</span> {
                <span class="hljs-keyword">let</span> code = <span class="hljs-string">""</span>;
                code += <span class="hljs-string">`if(<span class="hljs-subst">${result}</span> !== undefined) {\n`</span>;
                code += <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>._args[<span class="hljs-number">0</span>]}</span> = <span class="hljs-subst">${result}</span>;\n`</span>;
                code += <span class="hljs-string">`}\n`</span>;
                code += next();
                <span class="hljs-keyword">return</span> code;
            },
            <span class="hljs-attr">onDone</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> onResult(<span class="hljs-keyword">this</span>._args[<span class="hljs-number">0</span>]),
        });
    }
}</code></pre>
<ul><li>AsyncParallelHook调用<code>callTapsParallel</code>并行执行插件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class AsyncParallelHookCodeFactory extends HookCodeFactory {
    content({ onError, onDone }) {
        return this.callTapsParallel({
            onError: (i, err, done, doneBreak) => onError(err) + doneBreak(true),
            onDone
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AsyncParallelHookCodeFactory</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">HookCodeFactory</span> </span>{
    content({ onError, onDone }) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.callTapsParallel({
            <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">i, err, done, doneBreak</span>) =&gt;</span> onError(err) + doneBreak(<span class="hljs-literal">true</span>),
            onDone
        });
    }
}</code></pre>
<h3 id="articleHeader2">webpack流程篇</h3>
<p>本文关于webpack 的流程讲解是基于webpack4的。</p>
<h4>webpack 入口文件</h4>
<p>从webpack项目的package.json文件中我们找到了入口执行函数，在函数中引入webpack，那么入口将会是<code>lib/webpack.js</code>,而如果在shell中执行，那么将会走到<code>./bin/webpack.js</code>,我们就以<code>lib/webpack.js</code>为入口开始吧！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;webpack&quot;,
  &quot;version&quot;: &quot;4.1.1&quot;,
  ...
  &quot;main&quot;: &quot;lib/webpack.js&quot;,
  &quot;web&quot;: &quot;lib/webpack.web.js&quot;,
  &quot;bin&quot;: &quot;./bin/webpack.js&quot;,
  ...
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"webpack"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"4.1.1"</span>,
  ...
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"lib/webpack.js"</span>,
  <span class="hljs-attr">"web"</span>: <span class="hljs-string">"lib/webpack.web.js"</span>,
  <span class="hljs-attr">"bin"</span>: <span class="hljs-string">"./bin/webpack.js"</span>,
  ...
  }</code></pre>
<h4>webpack入口</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = (options, callback) => {
    // ...
    // 验证options正确性
    // 预处理options
    options = new WebpackOptionsDefaulter().process(options); // webpack4的默认配置
    compiler = new Compiler(options.context); // 实例Compiler
    // ...
    // 若options.watch === true &amp;&amp; callback 则开启watch线程
    compiler.watch(watchOptions, callback);
    compiler.run(callback);
    return compiler;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> webpack = <span class="hljs-function">(<span class="hljs-params">options, callback</span>) =&gt;</span> {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-comment">// 验证options正确性</span>
    <span class="hljs-comment">// 预处理options</span>
    options = <span class="hljs-keyword">new</span> WebpackOptionsDefaulter().process(options); <span class="hljs-comment">// webpack4的默认配置</span>
    compiler = <span class="hljs-keyword">new</span> Compiler(options.context); <span class="hljs-comment">// 实例Compiler</span>
    <span class="hljs-comment">// ...</span>
    <span class="hljs-comment">// 若options.watch === true &amp;&amp; callback 则开启watch线程</span>
    compiler.watch(watchOptions, callback);
    compiler.run(callback);
    <span class="hljs-keyword">return</span> compiler;
};</code></pre>
<p>webpack 的入口文件其实就实例了<code>Compiler</code>并调用了<code>run</code>方法开启了编译，webpack的编译都按照下面的钩子调用顺序执行。</p>
<ul>
<li>before-run 清除缓存</li>
<li>run 注册缓存数据钩子</li>
<li>before-compile</li>
<li>compile 开始编译</li>
<li>make 从入口分析依赖以及间接依赖模块，创建模块对象</li>
<li>build-module 模块构建</li>
<li>seal 构建结果封装， 不可再更改</li>
<li>after-compile 完成构建，缓存数据</li>
<li>emit 输出到dist目录</li>
</ul>
<h4>编译&amp;构建流程</h4>
<p>webpack中负责构建和编译都是<code>Compilation</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Compilation extends Tapable {
    constructor(compiler) {
        super();
        this.hooks = {
            // hooks
        };
        // ...
        this.compiler = compiler;
        // ...
        // template
        this.mainTemplate = new MainTemplate(this.outputOptions);
        this.chunkTemplate = new ChunkTemplate(this.outputOptions);
        this.hotUpdateChunkTemplate = new HotUpdateChunkTemplate(
            this.outputOptions
        );
        this.runtimeTemplate = new RuntimeTemplate(
            this.outputOptions,
            this.requestShortener
        );
        this.moduleTemplates = {
            javascript: new ModuleTemplate(this.runtimeTemplate),
            webassembly: new ModuleTemplate(this.runtimeTemplate)
        };

        // 构建生成的资源
        this.chunks = [];
        this.chunkGroups = [];
        this.modules = [];
        this.additionalChunkAssets = [];
        this.assets = {};
        this.children = [];
        // ...
    }
    // 
    buildModule(module, optional, origin, dependencies, thisCallback) {
        // ...
        // 调用module.build方法进行编译代码，build中 其实是利用acorn编译生成AST
        this.hooks.buildModule.call(module);
        module.build(/**param*/);
    }
    // 将模块添加到列表中，并编译模块
    _addModuleChain(context, dependency, onModule, callback) {
            // ...
            // moduleFactory.create创建模块，这里会先利用loader处理文件，然后生成模块对象
            moduleFactory.create(
                {
                    contextInfo: {
                        issuer: &quot;&quot;,
                        compiler: this.compiler.name
                    },
                    context: context,
                    dependencies: [dependency]
                },
                (err, module) => {
                    const addModuleResult = this.addModule(module);
                    module = addModuleResult.module;
                    onModule(module);
                    dependency.module = module;
                    
                    // ...
                    // 调用buildModule编译模块
                    this.buildModule(module, false, null, null, err => {});
                }
        });
    }
    // 添加入口模块，开始编译&amp;构建
    addEntry(context, entry, name, callback) {
        // ...
        this._addModuleChain( // 调用_addModuleChain添加模块
            context,
            entry,
            module => {
                this.entries.push(module);
            },
            // ...
        );
    }

    
    seal(callback) {
        this.hooks.seal.call();

        // ...
        const chunk = this.addChunk(name);
        const entrypoint = new Entrypoint(name);
        entrypoint.setRuntimeChunk(chunk);
        entrypoint.addOrigin(null, name, preparedEntrypoint.request);
        this.namedChunkGroups.set(name, entrypoint);
        this.entrypoints.set(name, entrypoint);
        this.chunkGroups.push(entrypoint);

        GraphHelpers.connectChunkGroupAndChunk(entrypoint, chunk);
        GraphHelpers.connectChunkAndModule(chunk, module);

        chunk.entryModule = module;
        chunk.name = name;

         // ...
        this.hooks.beforeHash.call();
        this.createHash();
        this.hooks.afterHash.call();
        this.hooks.beforeModuleAssets.call();
        this.createModuleAssets();
        if (this.hooks.shouldGenerateChunkAssets.call() !== false) {
            this.hooks.beforeChunkAssets.call();
            this.createChunkAssets();
        }
        // ...
    }


    createHash() {
        // ...
    }
    
    // 生成 assets 资源并 保存到 Compilation.assets 中 给webpack写插件的时候会用到
    createModuleAssets() {
        for (let i = 0; i < this.modules.length; i++) {
            const module = this.modules[i];
            if (module.buildInfo.assets) {
                for (const assetName of Object.keys(module.buildInfo.assets)) {
                    const fileName = this.getPath(assetName);
                    this.assets[fileName] = module.buildInfo.assets[assetName]; 
                    this.hooks.moduleAsset.call(module, fileName);
                }
            }
        }
    }

    createChunkAssets() {
     // ...
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Compilation</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Tapable</span> </span>{
    <span class="hljs-keyword">constructor</span>(compiler) {
        <span class="hljs-keyword">super</span>();
        <span class="hljs-keyword">this</span>.hooks = {
            <span class="hljs-comment">// hooks</span>
        };
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">this</span>.compiler = compiler;
        <span class="hljs-comment">// ...</span>
        <span class="hljs-comment">// template</span>
        <span class="hljs-keyword">this</span>.mainTemplate = <span class="hljs-keyword">new</span> MainTemplate(<span class="hljs-keyword">this</span>.outputOptions);
        <span class="hljs-keyword">this</span>.chunkTemplate = <span class="hljs-keyword">new</span> ChunkTemplate(<span class="hljs-keyword">this</span>.outputOptions);
        <span class="hljs-keyword">this</span>.hotUpdateChunkTemplate = <span class="hljs-keyword">new</span> HotUpdateChunkTemplate(
            <span class="hljs-keyword">this</span>.outputOptions
        );
        <span class="hljs-keyword">this</span>.runtimeTemplate = <span class="hljs-keyword">new</span> RuntimeTemplate(
            <span class="hljs-keyword">this</span>.outputOptions,
            <span class="hljs-keyword">this</span>.requestShortener
        );
        <span class="hljs-keyword">this</span>.moduleTemplates = {
            <span class="hljs-attr">javascript</span>: <span class="hljs-keyword">new</span> ModuleTemplate(<span class="hljs-keyword">this</span>.runtimeTemplate),
            <span class="hljs-attr">webassembly</span>: <span class="hljs-keyword">new</span> ModuleTemplate(<span class="hljs-keyword">this</span>.runtimeTemplate)
        };

        <span class="hljs-comment">// 构建生成的资源</span>
        <span class="hljs-keyword">this</span>.chunks = [];
        <span class="hljs-keyword">this</span>.chunkGroups = [];
        <span class="hljs-keyword">this</span>.modules = [];
        <span class="hljs-keyword">this</span>.additionalChunkAssets = [];
        <span class="hljs-keyword">this</span>.assets = {};
        <span class="hljs-keyword">this</span>.children = [];
        <span class="hljs-comment">// ...</span>
    }
    <span class="hljs-comment">// </span>
    buildModule(<span class="hljs-built_in">module</span>, optional, origin, dependencies, thisCallback) {
        <span class="hljs-comment">// ...</span>
        <span class="hljs-comment">// 调用module.build方法进行编译代码，build中 其实是利用acorn编译生成AST</span>
        <span class="hljs-keyword">this</span>.hooks.buildModule.call(<span class="hljs-built_in">module</span>);
        <span class="hljs-built_in">module</span>.build(<span class="hljs-comment">/**param*/</span>);
    }
    <span class="hljs-comment">// 将模块添加到列表中，并编译模块</span>
    _addModuleChain(context, dependency, onModule, callback) {
            <span class="hljs-comment">// ...</span>
            <span class="hljs-comment">// moduleFactory.create创建模块，这里会先利用loader处理文件，然后生成模块对象</span>
            moduleFactory.create(
                {
                    <span class="hljs-attr">contextInfo</span>: {
                        <span class="hljs-attr">issuer</span>: <span class="hljs-string">""</span>,
                        <span class="hljs-attr">compiler</span>: <span class="hljs-keyword">this</span>.compiler.name
                    },
                    <span class="hljs-attr">context</span>: context,
                    <span class="hljs-attr">dependencies</span>: [dependency]
                },
                (err, <span class="hljs-built_in">module</span>) =&gt; {
                    <span class="hljs-keyword">const</span> addModuleResult = <span class="hljs-keyword">this</span>.addModule(<span class="hljs-built_in">module</span>);
                    <span class="hljs-built_in">module</span> = addModuleResult.module;
                    onModule(<span class="hljs-built_in">module</span>);
                    dependency.module = <span class="hljs-built_in">module</span>;
                    
                    <span class="hljs-comment">// ...</span>
                    <span class="hljs-comment">// 调用buildModule编译模块</span>
                    <span class="hljs-keyword">this</span>.buildModule(<span class="hljs-built_in">module</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, err =&gt; {});
                }
        });
    }
    <span class="hljs-comment">// 添加入口模块，开始编译&amp;构建</span>
    addEntry(context, entry, name, callback) {
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">this</span>._addModuleChain( <span class="hljs-comment">// 调用_addModuleChain添加模块</span>
            context,
            entry,
            <span class="hljs-built_in">module</span> =&gt; {
                <span class="hljs-keyword">this</span>.entries.push(<span class="hljs-built_in">module</span>);
            },
            <span class="hljs-comment">// ...</span>
        );
    }

    
    seal(callback) {
        <span class="hljs-keyword">this</span>.hooks.seal.call();

        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">const</span> chunk = <span class="hljs-keyword">this</span>.addChunk(name);
        <span class="hljs-keyword">const</span> entrypoint = <span class="hljs-keyword">new</span> Entrypoint(name);
        entrypoint.setRuntimeChunk(chunk);
        entrypoint.addOrigin(<span class="hljs-literal">null</span>, name, preparedEntrypoint.request);
        <span class="hljs-keyword">this</span>.namedChunkGroups.set(name, entrypoint);
        <span class="hljs-keyword">this</span>.entrypoints.set(name, entrypoint);
        <span class="hljs-keyword">this</span>.chunkGroups.push(entrypoint);

        GraphHelpers.connectChunkGroupAndChunk(entrypoint, chunk);
        GraphHelpers.connectChunkAndModule(chunk, <span class="hljs-built_in">module</span>);

        chunk.entryModule = <span class="hljs-built_in">module</span>;
        chunk.name = name;

         <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">this</span>.hooks.beforeHash.call();
        <span class="hljs-keyword">this</span>.createHash();
        <span class="hljs-keyword">this</span>.hooks.afterHash.call();
        <span class="hljs-keyword">this</span>.hooks.beforeModuleAssets.call();
        <span class="hljs-keyword">this</span>.createModuleAssets();
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.hooks.shouldGenerateChunkAssets.call() !== <span class="hljs-literal">false</span>) {
            <span class="hljs-keyword">this</span>.hooks.beforeChunkAssets.call();
            <span class="hljs-keyword">this</span>.createChunkAssets();
        }
        <span class="hljs-comment">// ...</span>
    }


    createHash() {
        <span class="hljs-comment">// ...</span>
    }
    
    <span class="hljs-comment">// 生成 assets 资源并 保存到 Compilation.assets 中 给webpack写插件的时候会用到</span>
    createModuleAssets() {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.modules.length; i++) {
            <span class="hljs-keyword">const</span> <span class="hljs-built_in">module</span> = <span class="hljs-keyword">this</span>.modules[i];
            <span class="hljs-keyword">if</span> (<span class="hljs-built_in">module</span>.buildInfo.assets) {
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> assetName <span class="hljs-keyword">of</span> <span class="hljs-built_in">Object</span>.keys(<span class="hljs-built_in">module</span>.buildInfo.assets)) {
                    <span class="hljs-keyword">const</span> fileName = <span class="hljs-keyword">this</span>.getPath(assetName);
                    <span class="hljs-keyword">this</span>.assets[fileName] = <span class="hljs-built_in">module</span>.buildInfo.assets[assetName]; 
                    <span class="hljs-keyword">this</span>.hooks.moduleAsset.call(<span class="hljs-built_in">module</span>, fileName);
                }
            }
        }
    }

    createChunkAssets() {
     <span class="hljs-comment">// ...</span>
    }
}</code></pre>
<p>在webpack <code>make</code>钩子中, <code>tapAsync</code>注册了一个<code>DllEntryPlugin</code>, 就是将入口模块通过调用<code>compilation.addEntry</code>方法将所有的入口模块添加到编译构建队列中，开启编译流程。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="compiler.hooks.make.tapAsync(&quot;DllEntryPlugin&quot;, (compilation, callback) => {
        compilation.addEntry(
            this.context,
            new DllEntryDependency(
                this.entries.map((e, idx) => {
                    const dep = new SingleEntryDependency(e);
                    dep.loc = `${this.name}:${idx}`;
                    return dep;
                }),
                this.name
            ),
            // ...
        );
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">compiler.hooks.make.tapAsync(<span class="hljs-string">"DllEntryPlugin"</span>, (compilation, callback) =&gt; {
        compilation.addEntry(
            <span class="hljs-keyword">this</span>.context,
            <span class="hljs-keyword">new</span> DllEntryDependency(
                <span class="hljs-keyword">this</span>.entries.map(<span class="hljs-function">(<span class="hljs-params">e, idx</span>) =&gt;</span> {
                    <span class="hljs-keyword">const</span> dep = <span class="hljs-keyword">new</span> SingleEntryDependency(e);
                    dep.loc = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span>:<span class="hljs-subst">${idx}</span>`</span>;
                    <span class="hljs-keyword">return</span> dep;
                }),
                <span class="hljs-keyword">this</span>.name
            ),
            <span class="hljs-comment">// ...</span>
        );
    });</code></pre>
<p>随后在<code>addEntry</code> 中调用<code>_addModuleChain</code>开始编译。在<code>_addModuleChain</code>首先会生成模块，最后构建。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class NormalModuleFactory extends Tapable {
    // ...
    create(data, callback) {
        // ...
        this.hooks.beforeResolve.callAsync(
            {
                contextInfo,
                resolveOptions,
                context,
                request,
                dependencies
            },
            (err, result) => {
                if (err) return callback(err);

                // Ignored
                if (!result) return callback();
                // factory 钩子会触发 resolver 钩子执行，而resolver钩子中会利用acorn 处理js生成AST，再利用acorn处理前，会使用loader加载文件
                const factory = this.hooks.factory.call(null);

                factory(result, (err, module) => {
                    if (err) return callback(err);

                    if (module &amp;&amp; this.cachePredicate(module)) {
                        for (const d of dependencies) {
                            d.__NormalModuleFactoryCache = module;
                        }
                    }

                    callback(null, module);
                });
            }
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">NormalModuleFactory</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Tapable</span> </span>{
    <span class="hljs-comment">// ...</span>
    create(data, callback) {
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">this</span>.hooks.beforeResolve.callAsync(
            {
                contextInfo,
                resolveOptions,
                context,
                request,
                dependencies
            },
            (err, result) =&gt; {
                <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(err);

                <span class="hljs-comment">// Ignored</span>
                <span class="hljs-keyword">if</span> (!result) <span class="hljs-keyword">return</span> callback();
                <span class="hljs-comment">// factory 钩子会触发 resolver 钩子执行，而resolver钩子中会利用acorn 处理js生成AST，再利用acorn处理前，会使用loader加载文件</span>
                <span class="hljs-keyword">const</span> factory = <span class="hljs-keyword">this</span>.hooks.factory.call(<span class="hljs-literal">null</span>);

                factory(result, (err, <span class="hljs-built_in">module</span>) =&gt; {
                    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(err);

                    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">module</span> &amp;&amp; <span class="hljs-keyword">this</span>.cachePredicate(<span class="hljs-built_in">module</span>)) {
                        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> d <span class="hljs-keyword">of</span> dependencies) {
                            d.__NormalModuleFactoryCache = <span class="hljs-built_in">module</span>;
                        }
                    }

                    callback(<span class="hljs-literal">null</span>, <span class="hljs-built_in">module</span>);
                });
            }
        );
    }
}</code></pre>
<p>在编译完成后，调用<code>compilation.seal</code>方法封闭，生成资源，这些资源保存在<code>compilation.assets</code>, <code>compilation.chunk</code>, 在给webpack写插件的时候会用到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Compiler extends Tapable {
    constructor(context) {
        super();
        this.hooks = {
            beforeRun: new AsyncSeriesHook([&quot;compilation&quot;]),
            run: new AsyncSeriesHook([&quot;compilation&quot;]),
            emit: new AsyncSeriesHook([&quot;compilation&quot;]),
            afterEmit: new AsyncSeriesHook([&quot;compilation&quot;]),
            compilation: new SyncHook([&quot;compilation&quot;, &quot;params&quot;]),
            beforeCompile: new AsyncSeriesHook([&quot;params&quot;]),
            compile: new SyncHook([&quot;params&quot;]),
            make: new AsyncParallelHook([&quot;compilation&quot;]),
            afterCompile: new AsyncSeriesHook([&quot;compilation&quot;]),
            // other hooks
        };
        // ...
    }

    run(callback) {
        const startTime = Date.now();

        const onCompiled = (err, compilation) => {
            // ...

            this.emitAssets(compilation, err => {
                if (err) return callback(err);

                if (compilation.hooks.needAdditionalPass.call()) {
                    compilation.needAdditionalPass = true;

                    const stats = new Stats(compilation);
                    stats.startTime = startTime;
                    stats.endTime = Date.now();
                    this.hooks.done.callAsync(stats, err => {
                        if (err) return callback(err);

                        this.hooks.additionalPass.callAsync(err => {
                            if (err) return callback(err);
                            this.compile(onCompiled);
                        });
                    });
                    return;
                }
                // ...
            });
        };

        this.hooks.beforeRun.callAsync(this, err => {
            if (err) return callback(err);
            this.hooks.run.callAsync(this, err => {
                if (err) return callback(err);

                this.readRecords(err => {
                    if (err) return callback(err);

                    this.compile(onCompiled);
                });
            });
        });
    }
    // 输出文件到构建目录
    emitAssets(compilation, callback) {
        // ...
        this.hooks.emit.callAsync(compilation, err => {
            if (err) return callback(err);
            outputPath = compilation.getPath(this.outputPath);
            this.outputFileSystem.mkdirp(outputPath, emitFiles);
        });
    }
    
    newCompilationParams() {
        const params = {
            normalModuleFactory: this.createNormalModuleFactory(),
            contextModuleFactory: this.createContextModuleFactory(),
            compilationDependencies: new Set()
        };
        return params;
    }

    compile(callback) {
        const params = this.newCompilationParams();
        this.hooks.beforeCompile.callAsync(params, err => {
            if (err) return callback(err);
            this.hooks.compile.call(params);
            const compilation = this.newCompilation(params);

            this.hooks.make.callAsync(compilation, err => {
                if (err) return callback(err);
                compilation.finish();
                // make 钩子执行后，调用seal生成资源
                compilation.seal(err => {
                    if (err) return callback(err);
                    this.hooks.afterCompile.callAsync(compilation, err => {
                        if (err) return callback(err);
                        // emit, 生成最终文件
                        return callback(null, compilation);
                    });
                });
            });
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Compiler</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Tapable</span> </span>{
    <span class="hljs-keyword">constructor</span>(context) {
        <span class="hljs-keyword">super</span>();
        <span class="hljs-keyword">this</span>.hooks = {
            <span class="hljs-attr">beforeRun</span>: <span class="hljs-keyword">new</span> AsyncSeriesHook([<span class="hljs-string">"compilation"</span>]),
            <span class="hljs-attr">run</span>: <span class="hljs-keyword">new</span> AsyncSeriesHook([<span class="hljs-string">"compilation"</span>]),
            <span class="hljs-attr">emit</span>: <span class="hljs-keyword">new</span> AsyncSeriesHook([<span class="hljs-string">"compilation"</span>]),
            <span class="hljs-attr">afterEmit</span>: <span class="hljs-keyword">new</span> AsyncSeriesHook([<span class="hljs-string">"compilation"</span>]),
            <span class="hljs-attr">compilation</span>: <span class="hljs-keyword">new</span> SyncHook([<span class="hljs-string">"compilation"</span>, <span class="hljs-string">"params"</span>]),
            <span class="hljs-attr">beforeCompile</span>: <span class="hljs-keyword">new</span> AsyncSeriesHook([<span class="hljs-string">"params"</span>]),
            <span class="hljs-attr">compile</span>: <span class="hljs-keyword">new</span> SyncHook([<span class="hljs-string">"params"</span>]),
            <span class="hljs-attr">make</span>: <span class="hljs-keyword">new</span> AsyncParallelHook([<span class="hljs-string">"compilation"</span>]),
            <span class="hljs-attr">afterCompile</span>: <span class="hljs-keyword">new</span> AsyncSeriesHook([<span class="hljs-string">"compilation"</span>]),
            <span class="hljs-comment">// other hooks</span>
        };
        <span class="hljs-comment">// ...</span>
    }

    run(callback) {
        <span class="hljs-keyword">const</span> startTime = <span class="hljs-built_in">Date</span>.now();

        <span class="hljs-keyword">const</span> onCompiled = <span class="hljs-function">(<span class="hljs-params">err, compilation</span>) =&gt;</span> {
            <span class="hljs-comment">// ...</span>

            <span class="hljs-keyword">this</span>.emitAssets(compilation, err =&gt; {
                <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(err);

                <span class="hljs-keyword">if</span> (compilation.hooks.needAdditionalPass.call()) {
                    compilation.needAdditionalPass = <span class="hljs-literal">true</span>;

                    <span class="hljs-keyword">const</span> stats = <span class="hljs-keyword">new</span> Stats(compilation);
                    stats.startTime = startTime;
                    stats.endTime = <span class="hljs-built_in">Date</span>.now();
                    <span class="hljs-keyword">this</span>.hooks.done.callAsync(stats, err =&gt; {
                        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(err);

                        <span class="hljs-keyword">this</span>.hooks.additionalPass.callAsync(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
                            <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(err);
                            <span class="hljs-keyword">this</span>.compile(onCompiled);
                        });
                    });
                    <span class="hljs-keyword">return</span>;
                }
                <span class="hljs-comment">// ...</span>
            });
        };

        <span class="hljs-keyword">this</span>.hooks.beforeRun.callAsync(<span class="hljs-keyword">this</span>, err =&gt; {
            <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(err);
            <span class="hljs-keyword">this</span>.hooks.run.callAsync(<span class="hljs-keyword">this</span>, err =&gt; {
                <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(err);

                <span class="hljs-keyword">this</span>.readRecords(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
                    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(err);

                    <span class="hljs-keyword">this</span>.compile(onCompiled);
                });
            });
        });
    }
    <span class="hljs-comment">// 输出文件到构建目录</span>
    emitAssets(compilation, callback) {
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">this</span>.hooks.emit.callAsync(compilation, err =&gt; {
            <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(err);
            outputPath = compilation.getPath(<span class="hljs-keyword">this</span>.outputPath);
            <span class="hljs-keyword">this</span>.outputFileSystem.mkdirp(outputPath, emitFiles);
        });
    }
    
    newCompilationParams() {
        <span class="hljs-keyword">const</span> params = {
            <span class="hljs-attr">normalModuleFactory</span>: <span class="hljs-keyword">this</span>.createNormalModuleFactory(),
            <span class="hljs-attr">contextModuleFactory</span>: <span class="hljs-keyword">this</span>.createContextModuleFactory(),
            <span class="hljs-attr">compilationDependencies</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>()
        };
        <span class="hljs-keyword">return</span> params;
    }

    compile(callback) {
        <span class="hljs-keyword">const</span> params = <span class="hljs-keyword">this</span>.newCompilationParams();
        <span class="hljs-keyword">this</span>.hooks.beforeCompile.callAsync(params, err =&gt; {
            <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(err);
            <span class="hljs-keyword">this</span>.hooks.compile.call(params);
            <span class="hljs-keyword">const</span> compilation = <span class="hljs-keyword">this</span>.newCompilation(params);

            <span class="hljs-keyword">this</span>.hooks.make.callAsync(compilation, err =&gt; {
                <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(err);
                compilation.finish();
                <span class="hljs-comment">// make 钩子执行后，调用seal生成资源</span>
                compilation.seal(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
                    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(err);
                    <span class="hljs-keyword">this</span>.hooks.afterCompile.callAsync(compilation, err =&gt; {
                        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(err);
                        <span class="hljs-comment">// emit, 生成最终文件</span>
                        <span class="hljs-keyword">return</span> callback(<span class="hljs-literal">null</span>, compilation);
                    });
                });
            });
        });
    }
}</code></pre>
<h4>最后输出</h4>
<p>在<code>seal</code>执行后，便会调用<code>emit</code>钩子，根据webpack config文件的output配置的path属性，将文件输出到指定的path.</p>
<h3 id="articleHeader3">最后</h3>
<p>腾讯IVWEB团队的工程化解决方案<a href="https://github.com/feflow/feflow" rel="nofollow noreferrer" target="_blank">feflow</a>已经开源：Github主页：<a href="https://github.com/feflow/feflow" rel="nofollow noreferrer" target="_blank">https://github.com/feflow/feflow</a></p>
<p>如果对您的团队或者项目有帮助，请给个Star支持一下哈～</p>

                
{{% /raw %}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000013657042](https://segmentfault.com/a/1190000013657042)

## 原文标题
webpack详解

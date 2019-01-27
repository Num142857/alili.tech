---
title: 'webpack 中的 watch & cache （上）' 
date: 2019-01-28 2:30:09
hidden: true
slug: 6wanx5muaxy
categories: [reprint]
---

{{< raw >}}

                    
<p>我们在日常使用 <code>webpack</code> 或者是在以它为基础开发的时候，可能更多的时候关注的是配置以及配置的插件开发。在日常的开发过程中，会发现 <code>watch</code> 状态下的编译流程有一个规律是，第一次会较为缓慢，后续的编译会很快速，看起来像是有缓存的控制，那么具体内部的缓存流程存在哪些节点呢？下面进行一些探索总结，希望能为日常的插件 <code>plugin</code>、<code>loader</code> 开发起到帮助。</p>
<h2 id="articleHeader0">webpack --watch</h2>
<p>对于 cache 使用的入口，其实在我们日常构建中，大多是借助 <code>webpack</code> 启动一个构建 <code>watch 服务</code>。</p>
<h3 id="articleHeader1">入口</h3>
<p>最普通的相比于 <code>webpack</code> 不带参数直接执行的方式， <code>webpack --watch</code> 的执行逻辑存在较为明显的区别。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack/bin/webpack.js:

if(options.watch) {
  var primaryOptions = !Array.isArray(options) ? options : options[0];
  var watchOptions = primaryOptions.watchOptions || primaryOptions.watch || {};
  if(watchOptions.stdin) {
    process.stdin.on('end', function() {
      process.exit(0); // eslint-disable-line
    });
    process.stdin.resume();
  }
  compiler.watch(watchOptions, compilerCallback);
} else
  compiler.run(compilerCallback);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">webpack/bin/webpack.js:

<span class="hljs-keyword">if</span>(options.watch) {
  <span class="hljs-keyword">var</span> primaryOptions = !<span class="hljs-built_in">Array</span>.isArray(options) ? options : options[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">var</span> watchOptions = primaryOptions.watchOptions || primaryOptions.watch || {};
  <span class="hljs-keyword">if</span>(watchOptions.stdin) {
    process.stdin.on(<span class="hljs-string">'end'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      process.exit(<span class="hljs-number">0</span>); <span class="hljs-comment">// eslint-disable-line</span>
    });
    process.stdin.resume();
  }
  compiler.watch(watchOptions, compilerCallback);
} <span class="hljs-keyword">else</span>
  compiler.run(compilerCallback);</code></pre>
<p>从执行文件中 <code>webpack/bin/webpack.js</code> 找到 <code> --watch</code> 逻辑，相比于直接 <code>webpack</code> 不带参数执行对应的是 <code>compiler.run</code> 方法，<code>--watch</code> 则对应的是 <code>compiler.watch</code> 方法。</p>
<p>除了 <code>webpack --watch</code> 调用，这里还可以关联一下在日常使用中很平常的 <strong><a href="https://github.com/webpack/webpack-dev-middleware" rel="nofollow noreferrer" target="_blank">webpack-dev-middleware</a></strong> 模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-middleware/middleware.js:

if(!options.lazy) {
  var watching = compiler.watch(options.watchOptions, function(err) {
    if(err) throw err;
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">webpack-dev-middleware/middleware.js:

<span class="hljs-keyword">if</span>(!options.lazy) {
  <span class="hljs-keyword">var</span> watching = compiler.watch(options.watchOptions, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
    <span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">throw</span> err;
  });
}</code></pre>
<p>从代码可以看到，在非 <code>lazy</code>（<code>lazy</code> 模式指的是根据请求来源情况来直接调用 <code>compiler.run</code> 进行构建）模式下，实际上也是同样通过 <code>compiler.watch</code> 方法进行文件的监听编译。印证了前面的</p>
<blockquote><p>大多是借助 <code>webpack</code> 启动一个构建 <code>watch 服务</code></p></blockquote>
<p>更准确的说法是，通过 <code>compiler.watch</code> 来创建 <code>watch</code> 服务。</p>
<p><img alt="" title="" src="https://static.alili.techundefined" style="cursor: pointer;"></p>
<p>如图对应上文不同调用方式之间的差异。</p>
<h3 id="articleHeader2">watch 编译生命周期</h3>
<p>上面小结的内容，在整个 <code>webpack</code> 的过程中，是处在完成 <code>compiler = webpack(config)</code> 函数调用之后，得到一个 <code>Compiler</code> 实例之后，进行正式编译流程之前的节点，详细的编译流程文章推荐 [][]<a href="http://www.atatech.org/articles/67450" rel="nofollow noreferrer" target="_blank">Webpack 源码（二）—— 如何阅读源码</a>、<a href="http://taobaofed.org/blog/2016/09/09/webpack-flow/" rel="nofollow noreferrer" target="_blank">细说 webpack 之流程篇</a> ，后续我们也会不断输出一些细节实现的文章。</p>
<p>对于 <code>watch</code> 这种需要不断进行触发编译的流程的情况，会出现不断重复地经历几个相同流程，可以称之为 watch 的 <code>生命周期</code>，而 cache 的出现和使用同样也融入了在这个<code>生命周期</code>中。</p>
<ol><li>
<p>生成 <code> Watching</code> 实例 <code>watching</code>，将编译流程控制交给 <code>watching</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack/lib/Compiler.js

Compiler.prototype.watch = function(watchOptions, handler) {
  this.fileTimestamps = {};
  this.contextTimestamps = {};
  var watching = new Watching(this, watchOptions, handler);
  return watching;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">webpack/lib/Compiler.js

Compiler.prototype.watch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">watchOptions, handler</span>) </span>{
  <span class="hljs-keyword">this</span>.fileTimestamps = {};
  <span class="hljs-keyword">this</span>.contextTimestamps = {};
  <span class="hljs-keyword">var</span> watching = <span class="hljs-keyword">new</span> Watching(<span class="hljs-keyword">this</span>, watchOptions, handler);
  <span class="hljs-keyword">return</span> watching;
};</code></pre>
<p>无论是 <code>webpack --watch</code>，还是 <strong><a href="https://github.com/webpack/webpack-dev-middleware" rel="nofollow noreferrer" target="_blank">webpack-dev-middleware</a></strong> 模块，都是调用 <code>compiler.watch</code> 方法进行初始化 <code>watch</code> 流程，在 <code>Compiler.prototype.watch</code> 逻辑中，与 <code>Compiler.prototype.run</code> <strong>在方法中完成具体编译流程</strong>不同的是，会通过生成 <code>watching</code> 实例来<strong>接管具体编译流程</strong>。</p>
<ol>
<li>
<p>构造实例，进行第一次编译初始化<br><code>watching</code> 作为 <code>watch</code> 监听流程中的最上层对象，满足了 <code>watch</code> 流程在逻辑最上层的各个阶段衔接。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack/lib/Compiler.js

function Watching(compiler, watchOptions, handler) {
  this.startTime = null;
  this.invalid = false;
  this.error = null;
  this.stats = null;
  this.handler = handler;
  if(typeof watchOptions === &quot;number&quot;) {
    this.watchOptions = {
      aggregateTimeout: watchOptions
    };
  } else if(watchOptions &amp;&amp; typeof watchOptions === &quot;object&quot;) {
    this.watchOptions = Object.create(watchOptions);
  } else {
    this.watchOptions = {};
  }
  this.watchOptions.aggregateTimeout = this.watchOptions.aggregateTimeout || 200;
  this.compiler = compiler;
  this.running = true;
  this.compiler.readRecords(function(err) {
    if(err) return this._done(err);

    this._go();
  }.bind(this));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">webpack/lib/Compiler.js

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Watching</span>(<span class="hljs-params">compiler, watchOptions, handler</span>) </span>{
  <span class="hljs-keyword">this</span>.startTime = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">this</span>.invalid = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">this</span>.error = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">this</span>.stats = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">this</span>.handler = handler;
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> watchOptions === <span class="hljs-string">"number"</span>) {
    <span class="hljs-keyword">this</span>.watchOptions = {
      <span class="hljs-attr">aggregateTimeout</span>: watchOptions
    };
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(watchOptions &amp;&amp; <span class="hljs-keyword">typeof</span> watchOptions === <span class="hljs-string">"object"</span>) {
    <span class="hljs-keyword">this</span>.watchOptions = <span class="hljs-built_in">Object</span>.create(watchOptions);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.watchOptions = {};
  }
  <span class="hljs-keyword">this</span>.watchOptions.aggregateTimeout = <span class="hljs-keyword">this</span>.watchOptions.aggregateTimeout || <span class="hljs-number">200</span>;
  <span class="hljs-keyword">this</span>.compiler = compiler;
  <span class="hljs-keyword">this</span>.running = <span class="hljs-literal">true</span>;
  <span class="hljs-keyword">this</span>.compiler.readRecords(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
    <span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._done(err);

    <span class="hljs-keyword">this</span>._go();
  }.bind(<span class="hljs-keyword">this</span>));
}</code></pre>
<p>对于 <code>Watching</code> 构造函数，其实可以分成两个部分</p>
<ol>
<li>
<p>基础属性设置</p>
<ol>
<li><p><code>startTime</code>：执行每次编译时(<code>Watching.prototype._go</code> 方法调用)  ，会赋值编译启动时间，在后续文件是否需要再次编译时，作为重要根据之一</p></li>
<li><p><code>invalid</code>：表明现在 <code>watching </code> 的调用状态，例如在 <code>this.runing</code> 为 true 时，表明运行正常，会赋值该属性为 <code>true</code></p></li>
<li><p><code>error</code>：存放编译过程的错误对象，完成每次编译后会回传给 <code>handler</code> 回调</p></li>
<li><p><code>stats </code>：存放编译过程中的各个数值，同样也是会在每次编译后会回传给 <code>handler</code> 回调</p></li>
<li><p><code>handler</code>：指的是，每次编译完执行的回调函数，一个常见的例子是每次编译完在命令行中出现的资源列表就是通过这个函数实现</p></li>
<li><p><code>watchOptions</code>：<code>watch</code> 调用参数设置，其中 <code>aggregateTimeout</code> 参数代表的是每一次文件（夹）变化后在 <code>aggregateTimeout</code> 值内的变化都会进行合并发送</p></li>
<li><p><code>compiler</code>：生成 <code>watching</code> 对象的 <code>Compiler</code> 实例</p></li>
<li><p><code>running</code>： <code>watching </code>实例的运行状态</p></li>
</ol>
</li>
<li><p>执行初始化编译<br>从 <code>this._go</code> 调用开始，就会进入 <code>编译</code> -&gt; <code>watch监听编译</code> -&gt; <code>文件变更触发编译</code> -&gt;  <code>编译</code> 的循环</p></li>
</ol>
</li>
<li><p>执行编译<br>作为执行编译的入口 <code>Watching.prototype._go</code> 函数的结构与 <code>Compiler.prototype.run</code> 的结构类似，都是调用 <code>Compiler</code> 提供的诸如 <code>this.compile</code> 、this.<code>emitAssets</code> 等方法完成编译过程。<br><a href="http://gw.alicdn.com/tfs/TB1pvdmOVXXXXXDapXXXXXXXXXX-1064-488.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000008111796?w=1064&amp;h=488" src="https://static.alili.tech/img/remote/1460000008111796?w=1064&amp;h=488" alt="" title="" style="cursor: pointer;"></span></a><br>与 <code>run</code> 类似，<code>_go</code> 函数同样会调用 <code>compiler.compile</code> 方法进行编译，同时在完成 <code>emitAssets</code> (资源输出)、<code>emitRecords</code> (记录输出) 后，也就是完成这一次编译后，会调用 <code>this.done</code> 方法进行 <code>watch</code> 循环的最后一步</p></li>
<li>
<p>调用文件监听<br>  在完成编译后，为了在不重复启动编译进程的情况下，文件改动会自动重新编译。会在 <code>Watching.prototype._done</code> 中实时监听文件操作进行编译。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Watching.prototype._done = function(err, compilation) {
 // 省略部分流程(结束状态值设置、结束事件触发等)
 if(!this.error)
     this.watch(compilation.fileDependencies, compilation.contextDependencies, compilation.missingDependencies);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Watching.prototype._done = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, compilation</span>) </span>{
 <span class="hljs-comment">// 省略部分流程(结束状态值设置、结束事件触发等)</span>
 <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.error)
     <span class="hljs-keyword">this</span>.watch(compilation.fileDependencies, compilation.contextDependencies, compilation.missingDependencies);
};</code></pre>
<p>这里在 <code>_done</code> 的最后一个步骤，会调用 <code>Watching.prototype.watch</code> 来进行文件监听：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Watching.prototype.watch = function(files, dirs, missing) {
 this.watcher = this.compiler.watchFileSystem.watch(files, dirs, missing, this.startTime, this.watchOptions, function(err, filesModified, contextModified, missingModified, fileTimestamps, contextTimestamps) {
     this.watcher = null;
     if(err) return this.handler(err);

     this.compiler.fileTimestamps = fileTimestamps;
     this.compiler.contextTimestamps = contextTimestamps;
     this.invalidate();
 }.bind(this), function() {
     this.compiler.applyPlugins(&quot;invalid&quot;);
 }.bind(this));
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Watching.prototype.watch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">files, dirs, missing</span>) </span>{
 <span class="hljs-keyword">this</span>.watcher = <span class="hljs-keyword">this</span>.compiler.watchFileSystem.watch(files, dirs, missing, <span class="hljs-keyword">this</span>.startTime, <span class="hljs-keyword">this</span>.watchOptions, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, filesModified, contextModified, missingModified, fileTimestamps, contextTimestamps</span>) </span>{
     <span class="hljs-keyword">this</span>.watcher = <span class="hljs-literal">null</span>;
     <span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.handler(err);

     <span class="hljs-keyword">this</span>.compiler.fileTimestamps = fileTimestamps;
     <span class="hljs-keyword">this</span>.compiler.contextTimestamps = contextTimestamps;
     <span class="hljs-keyword">this</span>.invalidate();
 }.bind(<span class="hljs-keyword">this</span>), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
     <span class="hljs-keyword">this</span>.compiler.applyPlugins(<span class="hljs-string">"invalid"</span>);
 }.bind(<span class="hljs-keyword">this</span>));
};</code></pre>
</li>
</ol>
<p><code>Watching.prototype.watch</code> 通过 <code>compiler.watchFileSystem</code> 的 <code>watch</code> 方法实现，可以大致看出在文件（夹）变化触发编译后，会执行传递的回调函数，最终会调用 <code>Watching.prototype.invalidate</code> 进行编译触发：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Watching.prototype.invalidate = function() {
    if(this.watcher) {
        this.watcher.pause();
        this.watcher = null;
    }
    if(this.running) {
        this.invalid = true;
        return false;
    } else {
        this._go();
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Watching.prototype.invalidate = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.watcher) {
        <span class="hljs-keyword">this</span>.watcher.pause();
        <span class="hljs-keyword">this</span>.watcher = <span class="hljs-literal">null</span>;
    }
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.running) {
        <span class="hljs-keyword">this</span>.invalid = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>._go();
    }
};</code></pre>
<p>到了 <code>Watching.prototype.invalide</code> 这个方法后，又去从 <code>Watching.prototype._go</code> 函数开始进行新一轮的编译，到这里整个 watch 的流程就串起来了。</p>
</li></ol>
<p>在进入 <code>watchFileSystem</code> 之前，回顾上面的整个流程，<code>webpack</code> 中的 <code>watch</code> 流程大致就是 <code>Watching.prototype._go</code> -&gt; <code>Watching.prototype.watch</code> -&gt; <code>Watching.prototype.invalidate</code> 三个函数循环调用的过程。衔接初始化截图，大致如下图。</p>
<p><img alt="" title="" src="https://static.alili.techundefined" style="cursor: pointer;"></p>
<p>后续主要对 <code>监听</code> 和 <code>触发</code> 两个部分所涉及的一些细节进行深入。</p>
<h3 id="articleHeader3">watchFileSystem</h3>
<p>由上面内容看出对于 <code>Watching.prototype.watch</code> 实现文件监听的核心是 <code>compiler.watchFileSystem</code> 对象的 <code>watch</code> 方法。 <code>watchFileSystem</code> 在 <code>webpack</code> 中通过 <code>NodeEnvironmentPlugin</code> 来进行加载</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack/lib/node/NodeEnvironmentPlugin.js

var NodeWatchFileSystem = require(&quot;./NodeWatchFileSystem&quot;);

NodeEnvironmentPlugin.prototype.apply = function(compiler) {
    compiler.inputFileSystem = new NodeJsInputFileSystem();
    var inputFileSystem = compiler.inputFileSystem = new        CachedInputFileSystem(compiler.inputFileSystem, 60000);
    compiler.resolvers.normal.fileSystem = compiler.inputFileSystem;
    compiler.resolvers.context.fileSystem = compiler.inputFileSystem;
    compiler.resolvers.loader.fileSystem = compiler.inputFileSystem;
    compiler.outputFileSystem = new NodeOutputFileSystem();
    compiler.watchFileSystem = new NodeWatchFileSystem(compiler.inputFileSystem);
    compiler.plugin(&quot;run&quot;, function(compiler, callback) {
        if(compiler.inputFileSystem === inputFileSystem)
            inputFileSystem.purge();
        callback();
    });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">webpack/lib/node/NodeEnvironmentPlugin.js

<span class="hljs-keyword">var</span> NodeWatchFileSystem = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./NodeWatchFileSystem"</span>);

NodeEnvironmentPlugin.prototype.apply = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compiler</span>) </span>{
    compiler.inputFileSystem = <span class="hljs-keyword">new</span> NodeJsInputFileSystem();
    <span class="hljs-keyword">var</span> inputFileSystem = compiler.inputFileSystem = <span class="hljs-keyword">new</span>        CachedInputFileSystem(compiler.inputFileSystem, <span class="hljs-number">60000</span>);
    compiler.resolvers.normal.fileSystem = compiler.inputFileSystem;
    compiler.resolvers.context.fileSystem = compiler.inputFileSystem;
    compiler.resolvers.loader.fileSystem = compiler.inputFileSystem;
    compiler.outputFileSystem = <span class="hljs-keyword">new</span> NodeOutputFileSystem();
    compiler.watchFileSystem = <span class="hljs-keyword">new</span> NodeWatchFileSystem(compiler.inputFileSystem);
    compiler.plugin(<span class="hljs-string">"run"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compiler, callback</span>) </span>{
        <span class="hljs-keyword">if</span>(compiler.inputFileSystem === inputFileSystem)
            inputFileSystem.purge();
        callback();
    });
};</code></pre>
<p>这里会设置很多的 <code>fileSystem</code> ，而这样做的好处可以关联到前面的  <strong><a href="https://github.com/webpack/webpack-dev-middleware" rel="nofollow noreferrer" target="_blank">webpack-dev-middleware</a></strong> 模块，在本地调试等对编译性能有较高要求的场景下，需要尽量利用缓存的速度，而  <code>webpack-dev-middleware</code>  将物理 io 切换成缓存设置，通过修改 <code>fileSystem</code> 来实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-middleware/middleware.js

var fs = new MemoryFileSystem();

// the base output path for web and webworker bundles
var outputPath;

compiler.outputFileSystem = fs;
outputPath = compiler.outputPath;
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">webpack-dev-middleware/middleware.js

<span class="hljs-keyword">var</span> fs = <span class="hljs-keyword">new</span> MemoryFileSystem();

<span class="hljs-comment">// the base output path for web and webworker bundles</span>
<span class="hljs-keyword">var</span> outputPath;

compiler.outputFileSystem = fs;
outputPath = compiler.outputPath;
    </code></pre>
<p>将 <code>compiler</code> 的 <code>outputFileSystem</code> 设置成内存 (<code>MemoryFileSystem</code>) 的方式，将资源编译文件不落地输出，大大提高编译性能。在 <code>webpack</code> 中存在文件系统的抽象处理，方便一些优秀的文件系统处理模块功能（例如读取缓存、内存读写）接入利用。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008111797?w=730&amp;h=233" src="https://static.alili.tech/img/remote/1460000008111797?w=730&amp;h=233" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>例如 <code>webpack</code> 默认采用的是 <a href="http://web.npm.alibaba-inc.com/package/graceful-fs" rel="nofollow noreferrer" target="_blank">graceful-fs</a>，本身基于 Node.js 中的 fs 模块进行了许多优化，而 <code>webpack-dev-middleware</code> 则是采用内存读取的 <a href="http://web.npm.alibaba-inc.com/package/memory-fs" rel="nofollow noreferrer" target="_blank">memory-fs</a></p>
<p>对照 <code>NodeEnvironmentPlugin</code> 的代码，可以看到 <code>watchFileSystem</code> 指向的是同目录下的 <code>NodeWatchFileSystem.js</code> 导出的构造函数生成的实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack/lib/node/NodeWatchFileSystem.js

var Watchpack = require(&quot;watchpack&quot;);

function NodeWatchFileSystem(inputFileSystem) {
    this.inputFileSystem = inputFileSystem;
    this.watcherOptions = {
        aggregateTimeout: 0
    };
    this.watcher = new Watchpack(this.watcherOptions);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">webpack/lib/node/NodeWatchFileSystem.js

<span class="hljs-keyword">var</span> Watchpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"watchpack"</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">NodeWatchFileSystem</span>(<span class="hljs-params">inputFileSystem</span>) </span>{
    <span class="hljs-keyword">this</span>.inputFileSystem = inputFileSystem;
    <span class="hljs-keyword">this</span>.watcherOptions = {
        <span class="hljs-attr">aggregateTimeout</span>: <span class="hljs-number">0</span>
    };
    <span class="hljs-keyword">this</span>.watcher = <span class="hljs-keyword">new</span> Watchpack(<span class="hljs-keyword">this</span>.watcherOptions);
}</code></pre>
<p>在 <code>NodeWatchFileSystem.js</code> 中的实现再一次的依赖 <strong><a href="http://web.npm.alibaba-inc.com/package/watchpack" rel="nofollow noreferrer" target="_blank">watchpack</a></strong> 完成。通过封装 <code>watchpack</code> 的监听逻辑，完成绑定相应的文件变更事件，进行上层 <code>compiler.invalidate</code> 方法调用，触发再次编译流程。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack/lib/node/NodeWatchFileSystem.js

NodeWatchFileSystem.prototype.watch = function watch(files, dirs, missing, startTime, options, callback, callbackUndelayed) {
    // 省略异常处理
  
    if(callbackUndelayed)
        this.watcher.once(&quot;change&quot;, callbackUndelayed);

    this.watcher.once(&quot;aggregated&quot;, function(changes) {
        // 省略具体流程
        callback(...);
    }.bind(this));
      
      this.watcher.watch(files.concat(missing), dirs, startTime);
     // 省略返回
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">webpack/lib/node/NodeWatchFileSystem.js

NodeWatchFileSystem.prototype.watch = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">watch</span>(<span class="hljs-params">files, dirs, missing, startTime, options, callback, callbackUndelayed</span>) </span>{
    <span class="hljs-comment">// 省略异常处理</span>
  
    <span class="hljs-keyword">if</span>(callbackUndelayed)
        <span class="hljs-keyword">this</span>.watcher.once(<span class="hljs-string">"change"</span>, callbackUndelayed);

    <span class="hljs-keyword">this</span>.watcher.once(<span class="hljs-string">"aggregated"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">changes</span>) </span>{
        <span class="hljs-comment">// 省略具体流程</span>
        callback(...);
    }.bind(<span class="hljs-keyword">this</span>));
      
      <span class="hljs-keyword">this</span>.watcher.watch(files.concat(missing), dirs, startTime);
     <span class="hljs-comment">// 省略返回</span>
}</code></pre>
<p>这里的 <code>callback</code> 就是 <code>Watching.prototype.watch</code> 方法中调用 <code>this.compiler.watchFileSystem.watch</code> 传递的回调函数，当用户触发了 <code>watchpack</code> 提供的文件(夹)变化事件，那么就会通过 <code>callback</code> 回调中 <code>Watching.prototype.invalidate</code> 进行再次编译。在进入 <code>watchpack</code> 细节之前总结一下 <code>watch</code> 调用层级。</p>
<p><img alt="" title="" src="https://static.alili.techundefined" style="cursor: pointer;"></p>
<p>在 <code>webpack</code> 中的 <code>watch</code> 调用，每一层都叫做 <code>watch</code> 方法，在每一个 <code>watch</code> 方法中，都通过逐步对下一层的依赖调用，完成从 <code>watching</code> 实例与 <code>watcher</code> 实例的衔接解耦。</p>
<ul>
<li><p>在 <code>watching</code> 层，完成对重新编译的回调绑定</p></li>
<li><p>在 <code>watchfileSystem</code> 层，完成对下层监听文件（夹）触发逻辑之后信息返回的过滤处理，以及对上层回调的调用</p></li>
<li><p>在 <code>watcer</code> 层，只负责对文件（夹）的变化的事件监听</p></li>
</ul>
<p>通过多个层级的划分，解耦逻辑，方便函数进行调整和功能横向扩展。</p>
<h3 id="articleHeader4">watchpack 监听</h3>
<p>由上面 <code>NodeWatchFileSystem.js</code> 的代码截断中可以看到，对应的 <code>watch</code> 方法，核心逻辑是 <code>watchpack</code> 的实例 <code>watcher</code> 对应的 <code>watch</code> 方法。直接找到对应的 <code>Watchpack.prototype.watch</code> 方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/watchpack.js

var watcherManager = require(&quot;./watcherManager&quot;);
Watchpack.prototype.watch = function watch(files, directories, startTime) {
    this.paused = false;
    // 省略 old watchers 处理
  
    this.fileWatchers = files.map(function(file) {
        return this._fileWatcher(file, watcherManager.watchFile(file, this.watcherOptions, startTime));
    }, this);
    this.dirWatchers = directories.map(function(dir) {
        return this._dirWatcher(dir, watcherManager.watchDirectory(dir, this.watcherOptions, startTime));
    }, this);

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/watchpack.js

<span class="hljs-keyword">var</span> watcherManager = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./watcherManager"</span>);
Watchpack.prototype.watch = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">watch</span>(<span class="hljs-params">files, directories, startTime</span>) </span>{
    <span class="hljs-keyword">this</span>.paused = <span class="hljs-literal">false</span>;
    <span class="hljs-comment">// 省略 old watchers 处理</span>
  
    <span class="hljs-keyword">this</span>.fileWatchers = files.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._fileWatcher(file, watcherManager.watchFile(file, <span class="hljs-keyword">this</span>.watcherOptions, startTime));
    }, <span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.dirWatchers = directories.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dir</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._dirWatcher(dir, watcherManager.watchDirectory(dir, <span class="hljs-keyword">this</span>.watcherOptions, startTime));
    }, <span class="hljs-keyword">this</span>);

};</code></pre>
<p>衔接上一层在 <code>NodeWatchFileSystem.js</code> 中 <code>this.watcher.watch(files.concat(missing), dirs, startTime);</code> 的调用，在 <code>watchpack</code> 实例的 <code>watch</code> 方法中可以看到会针对 <strong>文件</strong> 、<strong>文件夹</strong> 类型分别调用 <code>watcherManager.watchFile</code>、<code>watcherManager.watchDirectory</code>进行监听。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/watcherManager.js

WatcherManager.prototype.watchFile = function watchFile(p, options, startTime) {
    var directory = path.dirname(p);
    return this.getDirectoryWatcher(directory, options).watch(p, startTime);
};
WatcherManager.prototype.watchDirectory = function watchDirectory(directory, options, startTime) {
    return this.getDirectoryWatcher(directory, options).watch(directory, startTime);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/watcherManager.js

WatcherManager.prototype.watchFile = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">watchFile</span>(<span class="hljs-params">p, options, startTime</span>) </span>{
    <span class="hljs-keyword">var</span> directory = path.dirname(p);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.getDirectoryWatcher(directory, options).watch(p, startTime);
};
WatcherManager.prototype.watchDirectory = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">watchDirectory</span>(<span class="hljs-params">directory, options, startTime</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.getDirectoryWatcher(directory, options).watch(directory, startTime);
};</code></pre>
<p>在 <code>watcherManager.js</code> 文件中的 <code>watchFile</code> 以及 <code>watchDirectory</code> 都传递了同类型的参数调用了 <code>this.getDirectoryWatcher</code> ，并在随后调用了返回实例的 <code>watch</code> 方法，并将 <code>watch</code> 方法的返回结果继续往上层 <code>watchpack.js</code> 的 <code>this._fileWatcher</code> 与 <code>this._dirWatcher</code> 方法进行传递。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/watcherManager.js

WatcherManager.prototype.getDirectoryWatcher = function(directory, options) {
 var DirectoryWatcher = require(&quot;./DirectoryWatcher&quot;);
 options = options || {};
 var key = directory + &quot; &quot; + JSON.stringify(options);
 if(!this.directoryWatchers[key]) {
  this.directoryWatchers[key] = new DirectoryWatcher(directory, options);
  this.directoryWatchers[key].on(&quot;closed&quot;, function() {
   delete this.directoryWatchers[key];
  }.bind(this));
 }
 return this.directoryWatchers[key];
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/watcherManager.js

WatcherManager.prototype.getDirectoryWatcher = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">directory, options</span>) </span>{
 <span class="hljs-keyword">var</span> DirectoryWatcher = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./DirectoryWatcher"</span>);
 options = options || {};
 <span class="hljs-keyword">var</span> key = directory + <span class="hljs-string">" "</span> + <span class="hljs-built_in">JSON</span>.stringify(options);
 <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.directoryWatchers[key]) {
  <span class="hljs-keyword">this</span>.directoryWatchers[key] = <span class="hljs-keyword">new</span> DirectoryWatcher(directory, options);
  <span class="hljs-keyword">this</span>.directoryWatchers[key].on(<span class="hljs-string">"closed"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-keyword">delete</span> <span class="hljs-keyword">this</span>.directoryWatchers[key];
  }.bind(<span class="hljs-keyword">this</span>));
 }
 <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.directoryWatchers[key];
};</code></pre>
<p>而 <code>getDirectoryWatcher</code> 的具体实现，则是创建一个由 <code>./DirectoryWatcher</code> 导出的构造函数所构造出来的实例。这里可以看到以文件夹路径(<code>directory</code>) 和配置 (<code>options</code>)两个属性作为实例的 <code>key</code> 并且在函数最后，将实例进行返回。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008111798?w=858&amp;h=277" src="https://static.alili.tech/img/remote/1460000008111798?w=858&amp;h=277" alt="" title="" style="cursor: pointer;"></span></p>
<p>整个逻辑通过 <code>watchManager</code> 进行底层逻辑创建，通过 <code>_dirWatcher</code>、<code>_fileWatcher</code> 完成对底层逻辑的处理封装。</p>
<h4>DirectoryWatcher 实例创建</h4>
<p>紧接着 <code>wacthManager</code> 的 <code>watchFile</code> 与 <code>watchDirectory</code> 中 <code>getDirectoryWatcher</code> 调用完成后，则调用实例的 <code>watch</code> 方法，逻辑就走到了 <code>DirectoryWatcher.js</code> 文件。关联在 <code>getDirectoryWatcher</code> 的实例生成过程，对应 <code>DirectoryWatcher</code> 的构造函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/DirectoryWatcher.js

var chokidar = require(&quot;chokidar&quot;);

function DirectoryWatcher(directoryPath, options) {
    EventEmitter.call(this);
    this.path = directoryPath;
    this.files = {};
    this.directories = {};
    this.watcher = chokidar.watch(directoryPath, {
        ignoreInitial: true,
        persistent: true,
        followSymlinks: false,
        depth: 0,
        atomic: false,
        alwaysStat: true,
        ignorePermissionErrors: true,
        usePolling: options.poll ? true : undefined,
        interval: typeof options.poll === &quot;number&quot; ? options.poll : undefined
    });
    this.watcher.on(&quot;add&quot;, this.onFileAdded.bind(this));
    this.watcher.on(&quot;addDir&quot;, this.onDirectoryAdded.bind(this));
    this.watcher.on(&quot;change&quot;, this.onChange.bind(this));
    this.watcher.on(&quot;unlink&quot;, this.onFileUnlinked.bind(this));
    this.watcher.on(&quot;unlinkDir&quot;, this.onDirectoryUnlinked.bind(this));
    this.watcher.on(&quot;error&quot;, this.onWatcherError.bind(this));
    this.initialScan = true;
    this.nestedWatching = false;
    this.initialScanRemoved = [];
    this.doInitialScan();
    this.watchers = {};
    this.refs = 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/DirectoryWatcher.js

<span class="hljs-keyword">var</span> chokidar = <span class="hljs-built_in">require</span>(<span class="hljs-string">"chokidar"</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">DirectoryWatcher</span>(<span class="hljs-params">directoryPath, options</span>) </span>{
    EventEmitter.call(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.path = directoryPath;
    <span class="hljs-keyword">this</span>.files = {};
    <span class="hljs-keyword">this</span>.directories = {};
    <span class="hljs-keyword">this</span>.watcher = chokidar.watch(directoryPath, {
        <span class="hljs-attr">ignoreInitial</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">persistent</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">followSymlinks</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">depth</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">atomic</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">alwaysStat</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">ignorePermissionErrors</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">usePolling</span>: options.poll ? <span class="hljs-literal">true</span> : <span class="hljs-literal">undefined</span>,
        <span class="hljs-attr">interval</span>: <span class="hljs-keyword">typeof</span> options.poll === <span class="hljs-string">"number"</span> ? options.poll : <span class="hljs-literal">undefined</span>
    });
    <span class="hljs-keyword">this</span>.watcher.on(<span class="hljs-string">"add"</span>, <span class="hljs-keyword">this</span>.onFileAdded.bind(<span class="hljs-keyword">this</span>));
    <span class="hljs-keyword">this</span>.watcher.on(<span class="hljs-string">"addDir"</span>, <span class="hljs-keyword">this</span>.onDirectoryAdded.bind(<span class="hljs-keyword">this</span>));
    <span class="hljs-keyword">this</span>.watcher.on(<span class="hljs-string">"change"</span>, <span class="hljs-keyword">this</span>.onChange.bind(<span class="hljs-keyword">this</span>));
    <span class="hljs-keyword">this</span>.watcher.on(<span class="hljs-string">"unlink"</span>, <span class="hljs-keyword">this</span>.onFileUnlinked.bind(<span class="hljs-keyword">this</span>));
    <span class="hljs-keyword">this</span>.watcher.on(<span class="hljs-string">"unlinkDir"</span>, <span class="hljs-keyword">this</span>.onDirectoryUnlinked.bind(<span class="hljs-keyword">this</span>));
    <span class="hljs-keyword">this</span>.watcher.on(<span class="hljs-string">"error"</span>, <span class="hljs-keyword">this</span>.onWatcherError.bind(<span class="hljs-keyword">this</span>));
    <span class="hljs-keyword">this</span>.initialScan = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">this</span>.nestedWatching = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">this</span>.initialScanRemoved = [];
    <span class="hljs-keyword">this</span>.doInitialScan();
    <span class="hljs-keyword">this</span>.watchers = {};
    <span class="hljs-keyword">this</span>.refs = <span class="hljs-number">0</span>;
}</code></pre>
<p>找到这里，可以看到，监听文件（夹）采用的是 <a href="https://github.com/paulmillr/chokidar" rel="nofollow noreferrer" target="_blank">chokidar</a> 的能力。关联前面的逻辑，可以大致看出，通过  <a href="https://github.com/paulmillr/chokidar" rel="nofollow noreferrer" target="_blank">chokidar</a> 绑定对应 <code>directoryPath</code> 的目录的 <code>add</code>、<code>addDir</code> 、<code>change</code>、<code>unlink</code> 、<code>unlinkDir</code>  的事件，通过对应的事件回调函数来向上层逻辑传递文件（夹）变更信息。</p>
<p>除了 <code>watcher</code> 对应  <a href="https://github.com/paulmillr/chokidar" rel="nofollow noreferrer" target="_blank">chokidar</a>  对象，这里还有一些辅助的属性来完成监听处理逻辑</p>
<ul>
<li><p><code>files</code>：保存文件改变状态（mtime）</p></li>
<li><p><code>directories</code>：保存文件夹监听状态，以及嵌套文件夹监听实例</p></li>
<li><p><code>initialScan</code>：初次文件扫描标识</p></li>
<li><p><code>nestedWatching</code>：是否存在嵌套文件夹监听</p></li>
<li><p><code>initialScanRemoved</code>： 首次查看过程中删除的文件（夹），对在首次查看过程中对已删除文件（夹）的过滤</p></li>
<li><p><code>watchers</code>：以监听路径(<code>filePath</code>) 为 key 的 <code>watcher</code> 数组为值的 map 对象</p></li>
<li><p><code>refs</code>：<code>watchers</code> 的数量</p></li>
</ul>
<p>在属性复制完成后，会类似 <code>Compiler.js</code> 中 <code>Watching</code> 实例在实例创建时会进行首次编译一样，会进行首次文件夹的查看<code>(doInitalScan)</code> ，这里会进行初始数据（<code>this.files</code>、<code>this.directories</code>）的生成。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DirectoryWatcher.prototype.doInitialScan = function doInitialScan() {
    fs.readdir(this.path, function(err, items) {
        if(err) {
            this.initialScan = false;
            return;
        }
        async.forEach(items, function(item, callback) {
            var itemPath = path.join(this.path, item);
            fs.stat(itemPath, function(err2, stat) {
                if(!this.initialScan) return;
                if(err2) {
                    callback();
                    return;
                }
                if(stat.isFile()) {
                    if(!this.files[itemPath])
                        this.setFileTime(itemPath, +stat.mtime, true);
                } else if(stat.isDirectory()) {
                    if(!this.directories[itemPath])
                        this.setDirectory(itemPath, true, true);
                }
                callback();
            }.bind(this));
        }.bind(this), function() {
            this.initialScan = false;
            this.initialScanRemoved = null;
        }.bind(this));
    }.bind(this));
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">DirectoryWatcher.prototype.doInitialScan = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doInitialScan</span>(<span class="hljs-params"></span>) </span>{
    fs.readdir(<span class="hljs-keyword">this</span>.path, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, items</span>) </span>{
        <span class="hljs-keyword">if</span>(err) {
            <span class="hljs-keyword">this</span>.initialScan = <span class="hljs-literal">false</span>;
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">async</span>.forEach(items, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, callback</span>) </span>{
            <span class="hljs-keyword">var</span> itemPath = path.join(<span class="hljs-keyword">this</span>.path, item);
            fs.stat(itemPath, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err2, stat</span>) </span>{
                <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.initialScan) <span class="hljs-keyword">return</span>;
                <span class="hljs-keyword">if</span>(err2) {
                    callback();
                    <span class="hljs-keyword">return</span>;
                }
                <span class="hljs-keyword">if</span>(stat.isFile()) {
                    <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.files[itemPath])
                        <span class="hljs-keyword">this</span>.setFileTime(itemPath, +stat.mtime, <span class="hljs-literal">true</span>);
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(stat.isDirectory()) {
                    <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.directories[itemPath])
                        <span class="hljs-keyword">this</span>.setDirectory(itemPath, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>);
                }
                callback();
            }.bind(<span class="hljs-keyword">this</span>));
        }.bind(<span class="hljs-keyword">this</span>), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.initialScan = <span class="hljs-literal">false</span>;
            <span class="hljs-keyword">this</span>.initialScanRemoved = <span class="hljs-literal">null</span>;
        }.bind(<span class="hljs-keyword">this</span>));
    }.bind(<span class="hljs-keyword">this</span>));
};</code></pre>
<p>这里是一个 <code>async.forEach</code> 撑起的函数结构，主要对传入 <code>directoryPath</code> 下的文件（夹）通过 <code>setFileTime</code>、<code>setDirectory</code> 进行 <code>DirectoryWatcher</code> 实例的 <code>files</code>、<code>directories</code> 属性赋值。</p>
<ul>
<li>
<p>对于文件情况 (<code>stat.isFile</code> 为 <code>true</code>) ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="调用 `setFileTime` 函数传入文件最后修改时间（ `stat.mtime`），函数本身分为两个步骤，而这里主要是**存储文件的变更记录**，而另一部则是**变更事件的触发**，在后面的内容也会提到。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>调用 `setFileTime` 函数传入文件最后修改时间（ `stat.mtime`），函数本身分为两个步骤，而这里主要是**存储文件的变更记录**，而另一部则是**变更事件的触发**，在后面的内容也会提到。
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DirectoryWatcher.prototype.setFileTime = function setFileTime(filePath, mtime, initial, type) {
  var now = Date.now();
  var old = this.files[filePath];
  this.files[filePath] = [initial ? Math.min(now, mtime) : now, mtime];
  // 省略变更触发
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">DirectoryWatcher.prototype.setFileTime = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setFileTime</span>(<span class="hljs-params">filePath, mtime, initial, type</span>) </span>{
  <span class="hljs-keyword">var</span> now = <span class="hljs-built_in">Date</span>.now();
  <span class="hljs-keyword">var</span> old = <span class="hljs-keyword">this</span>.files[filePath];
  <span class="hljs-keyword">this</span>.files[filePath] = [initial ? <span class="hljs-built_in">Math</span>.min(now, mtime) : now, mtime];
  <span class="hljs-comment">// 省略变更触发</span>
};</code></pre>
<p>这里会以数组的形式，存储 <code>变更流程执行时间点</code>、<code>文件最后修改时间点</code>。<br>一般 <code>setFileTime</code> 的调用的时候，就认为触发了文件触发了变更，进行文件变更记录更新，而对于初始化情况，主要目的是为了初始化数据，并不为变更而调用 <code>setFileTime</code>，所以对于初始化的返回是进行比较 <code>Math.min(now, mtime)</code> 而不是直接返回当前时间。</p>
</li>
<li>
<p>对于文件夹情况（<code>stat.isDirectory</code> 为 <code>true</code>）</p>
<p>调用 <code>setDirectory</code> 来进行子文件夹标记，方便后续进行子文件夹监听的创建：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DirectoryWatcher.prototype.setDirectory = function setDirectory(directoryPath, exist, initial) {
var old = this.directories[directoryPath];
if(!old) {
  if(exist) {
if(this.nestedWatching) {
  this.createNestedWatcher(directoryPath);
} else {
  this.directories[directoryPath] = true;
}
  }
} 
// 省略文件夹删除事件触发
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">DirectoryWatcher.prototype.setDirectory = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setDirectory</span>(<span class="hljs-params">directoryPath, exist, initial</span>) </span>{
<span class="hljs-keyword">var</span> old = <span class="hljs-keyword">this</span>.directories[directoryPath];
<span class="hljs-keyword">if</span>(!old) {
  <span class="hljs-keyword">if</span>(exist) {
<span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.nestedWatching) {
  <span class="hljs-keyword">this</span>.createNestedWatcher(directoryPath);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">this</span>.directories[directoryPath] = <span class="hljs-literal">true</span>;
}
  }
} 
<span class="hljs-comment">// 省略文件夹删除事件触发</span>
}</code></pre>
<p>在 <code>doInitalScan</code> 的场景下，会判断 <code>nestedWatching</code> 的情况，如果为 <code>false</code> 则赋值 <code>this.directories[directoryPath]</code> 为 <code>true</code>，表示文件夹没有创建对应的监听；或者是通过 <code>this.createNestedWatcher</code> 进行子文件夹监听的创建，最终也会赋值到 <code>this.directories[directoryPath]</code> 上的则是对应的内嵌 <code>Watcher</code> 实例。而这里的子文件夹的状态在后续也是可能发生变化的。<br>完成赋值过程后， 会将 <code>this.initialScan </code> 设置成 <code>false</code> 表示首次查看结束，设置 <code> this.initialScanRemoved</code> 为 <code>null</code> ，表示在首次查看过程中就删除的文件（夹）的处理也结束。</p>
</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008111799?w=615&amp;h=219" src="https://static.alili.tech/img/remote/1460000008111799?w=615&amp;h=219" alt="" title="" style="cursor: pointer;"></span></p>
<p>在完成基础  <code>this.watcher</code> 文件系统监听逻辑（<a href="https://github.com/paulmillr/chokidar" rel="nofollow noreferrer" target="_blank">chokidar</a> ）创建，基础属性 <code>this.files</code>、<code>this.directories</code> 初始化后，则完成了整个 <code>DirectoryWatcher</code> 实例的生成。</p>
<h4>搭建监听通道（创建内部 Watcher 实例）</h4>
<p>在 <code>getDirectoryWatcher</code> 完成调用返回 <code>DirectoryWatcher</code> 的实例之后，调用实例的 <code>watch</code> 方法，传入文件（夹）路径。对最上层 <code>Compiler</code> 传入的 <code>files</code>、<code>missings</code> 文件，<code>dirs</code> 文件夹进行循环调用，进行监听流程。<code>watch</code> 方法通过三个阶段完成底层到上层的监听信息通道的搭建。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008111800?w=650&amp;h=201" src="https://static.alili.tech/img/remote/1460000008111800?w=650&amp;h=201" alt="" title="" style="cursor: pointer;"></span></p>
<ol>
<li>
<p><strong>生成 <code>Watcher</code> 实例</strong><br>第一个部分是针对传入的路径生成对应的 <code>Watcher</code> 实例，最终通过 <code>WatcherManager</code> 的 <code>watchFile</code>、<code>watchDirectory</code> 返回到上层 <code>watchpack</code> 中的 <code>watch</code> 方法中 <code>this._fileWatcher</code> 、<code>this._dirname</code>调用的返回结果，就是这个内部 <code>Watcher</code> 实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/DirectoryWatcher.js

function Watcher(directoryWatcher, filePath, startTime) {
    EventEmitter.call(this);
    this.directoryWatcher = directoryWatcher;
    this.path = filePath;
    this.startTime = startTime &amp;&amp; +startTime;
    this.data = 0;
}

DirectoryWatcher.prototype.watch = function watch(filePath, startTime) {
  this.watchers[withoutCase(filePath)] = this.watchers[withoutCase(filePath)] || [];
  this.refs++;
  var watcher = new Watcher(this, filePath, startTime);
  
  watcher.on(&quot;closed&quot;, function() {
    // 省略 closed 事件处理
  }.bind(this));
  
  this.watchers[withoutCase(filePath)].push(watcher);
  // 省略设置子文件内嵌监听
  // 省略已有数据处理
  return watcher;  
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/DirectoryWatcher.js

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Watcher</span>(<span class="hljs-params">directoryWatcher, filePath, startTime</span>) </span>{
    EventEmitter.call(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.directoryWatcher = directoryWatcher;
    <span class="hljs-keyword">this</span>.path = filePath;
    <span class="hljs-keyword">this</span>.startTime = startTime &amp;&amp; +startTime;
    <span class="hljs-keyword">this</span>.data = <span class="hljs-number">0</span>;
}

DirectoryWatcher.prototype.watch = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">watch</span>(<span class="hljs-params">filePath, startTime</span>) </span>{
  <span class="hljs-keyword">this</span>.watchers[withoutCase(filePath)] = <span class="hljs-keyword">this</span>.watchers[withoutCase(filePath)] || [];
  <span class="hljs-keyword">this</span>.refs++;
  <span class="hljs-keyword">var</span> watcher = <span class="hljs-keyword">new</span> Watcher(<span class="hljs-keyword">this</span>, filePath, startTime);
  
  watcher.on(<span class="hljs-string">"closed"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 省略 closed 事件处理</span>
  }.bind(<span class="hljs-keyword">this</span>));
  
  <span class="hljs-keyword">this</span>.watchers[withoutCase(filePath)].push(watcher);
  <span class="hljs-comment">// 省略设置子文件内嵌监听</span>
  <span class="hljs-comment">// 省略已有数据处理</span>
  <span class="hljs-keyword">return</span> watcher;  
};</code></pre>
<p>这里内部 <code>Watcher</code> 实例主要是通过继承 <code>EventEmitter</code> 来实现实例的事件支持，那么传递回上层例如 <code>watchpack</code> 时，就可以绑定该 <code>Watcher</code> 实例的事件，<strong>底层的文件改动触发实例的事件，上层对事件处理，通过这个对象建立数据传递的通道，完成监听数据的传递</strong>。在完成 <code>watcher</code>实例创建后，会将实例 <code>push</code>  进 <code>this.watchers</code> 中以 <code>filePath</code> 为 key 的 <code>watcher</code> 数组，并将实例返回。</p>
</li>
<li>
<p><strong>设置子文件夹内嵌监听</strong><br><code>watch</code> 方法的另一部分，则是进行设置内嵌监听 <code>setNestedWatching</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/DirectoryWatcher.js

DirectoryWatcher.prototype.watch = function watch(filePath, startTime) {
    // 省略内部 Watcher 实例生成
    var data;
    if(filePath === this.path) {
        this.setNestedWatching(true);
    }
      // 省略已有数据处理
};

DirectoryWatcher.prototype.setNestedWatching = function(flag) {
    if(this.nestedWatching !== !!flag) {
        this.nestedWatching = !!flag;
        if(this.nestedWatching) {
            Object.keys(this.directories).forEach(function(directory) {
                this.createNestedWatcher(directory);
            }, this);
        } else {
            Object.keys(this.directories).forEach(function(directory) {
                this.directories[directory].close();
                this.directories[directory] = true;
            }, this);
        }
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/DirectoryWatcher.js

DirectoryWatcher.prototype.watch = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">watch</span>(<span class="hljs-params">filePath, startTime</span>) </span>{
    <span class="hljs-comment">// 省略内部 Watcher 实例生成</span>
    <span class="hljs-keyword">var</span> data;
    <span class="hljs-keyword">if</span>(filePath === <span class="hljs-keyword">this</span>.path) {
        <span class="hljs-keyword">this</span>.setNestedWatching(<span class="hljs-literal">true</span>);
    }
      <span class="hljs-comment">// 省略已有数据处理</span>
};

DirectoryWatcher.prototype.setNestedWatching = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">flag</span>) </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.nestedWatching !== !!flag) {
        <span class="hljs-keyword">this</span>.nestedWatching = !!flag;
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.nestedWatching) {
            <span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>.directories).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">directory</span>) </span>{
                <span class="hljs-keyword">this</span>.createNestedWatcher(directory);
            }, <span class="hljs-keyword">this</span>);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>.directories).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">directory</span>) </span>{
                <span class="hljs-keyword">this</span>.directories[directory].close();
                <span class="hljs-keyword">this</span>.directories[directory] = <span class="hljs-literal">true</span>;
            }, <span class="hljs-keyword">this</span>);
        }
    }
};</code></pre>
<p>在处理 <code>filePath == this.path</code> 的时候，也就是 <code>DirectoryWatcher.prototype.watch</code> 传入的路径与 <code>Directory</code> 生成实例的路径相同的时候（<code>watchManager.js</code> 中的 <code>watchDirectory</code> 方法的调用 <code>this.getDirectoryWatcher(directory, options).watch(directory, startTime)</code> 满足此条件）会在 <code>watch</code> 中调用 <code>DirectoryWatcher.prototype.setNestedWatching</code> 进行子文件夹的监听的创建。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/DirectoryWatcher.js

DirectoryWatcher.prototype.createNestedWatcher = function(directoryPath) {
  this.directories[directoryPath] = watcherManager.watchDirectory(directoryPath, this.options, 1);
  this.directories[directoryPath].on(&quot;change&quot;, function(filePath, mtime) {
    if(this.watchers[withoutCase(this.path)]) {
      this.watchers[withoutCase(this.path)].forEach(function(w) {
        if(w.checkStartTime(mtime, false)) {
          w.emit(&quot;change&quot;, filePath, mtime);
        }
      });
    }
  }.bind(this));
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/DirectoryWatcher.js

DirectoryWatcher.prototype.createNestedWatcher = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">directoryPath</span>) </span>{
  <span class="hljs-keyword">this</span>.directories[directoryPath] = watcherManager.watchDirectory(directoryPath, <span class="hljs-keyword">this</span>.options, <span class="hljs-number">1</span>);
  <span class="hljs-keyword">this</span>.directories[directoryPath].on(<span class="hljs-string">"change"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">filePath, mtime</span>) </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.watchers[withoutCase(<span class="hljs-keyword">this</span>.path)]) {
      <span class="hljs-keyword">this</span>.watchers[withoutCase(<span class="hljs-keyword">this</span>.path)].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">w</span>) </span>{
        <span class="hljs-keyword">if</span>(w.checkStartTime(mtime, <span class="hljs-literal">false</span>)) {
          w.emit(<span class="hljs-string">"change"</span>, filePath, mtime);
        }
      });
    }
  }.bind(<span class="hljs-keyword">this</span>));
};</code></pre>
<p>子文件夹的监听同样是通过上层<code>watchManager.js</code> 中的 <code>watchManager.watchDirectory</code> 的调用实现，同时这里会多绑定一次 <code>change</code> 事件，实现当子文件夹变化的时候触发父文件夹的 <code>change</code> 事件。</p>
</li>
<li>
<p><strong>处理已有数据</strong><br>在完成 <code>watcher</code> 实例创建之后，会针对在 <code>watch</code> <strong>实例创建过程</strong>中发生的文件（夹）变动进行处理，保证文件的变动能完备更新</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/DirectoryWatcher.js

DirectoryWatcher.prototype.watch = function watch(filePath, startTime) {
    // 省略内部 Watcher 实例生成
    var data;
      if(filePath === this.path) {
      // 省略设置子文件内嵌监听
      data = false;
      Object.keys(this.files).forEach(function(file) {
        var d = this.files[file];
        if(!data)
          data = d;
        else
          data = [Math.max(data[0], d[0]), Math.max(data[1], d[1])];
      }, this);
    } else {
      data = this.files[filePath];
    }
    process.nextTick(function() {
      if(data) {
        if(data[0] > startTime)
          watcher.emit(&quot;change&quot;, data[1]);
      } else if(this.initialScan &amp;&amp; this.initialScanRemoved.indexOf(filePath) >= 0) {
        watcher.emit(&quot;remove&quot;);
      }
    }.bind(this));
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/DirectoryWatcher.js

DirectoryWatcher.prototype.watch = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">watch</span>(<span class="hljs-params">filePath, startTime</span>) </span>{
    <span class="hljs-comment">// 省略内部 Watcher 实例生成</span>
    <span class="hljs-keyword">var</span> data;
      <span class="hljs-keyword">if</span>(filePath === <span class="hljs-keyword">this</span>.path) {
      <span class="hljs-comment">// 省略设置子文件内嵌监听</span>
      data = <span class="hljs-literal">false</span>;
      <span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>.files).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file</span>) </span>{
        <span class="hljs-keyword">var</span> d = <span class="hljs-keyword">this</span>.files[file];
        <span class="hljs-keyword">if</span>(!data)
          data = d;
        <span class="hljs-keyword">else</span>
          data = [<span class="hljs-built_in">Math</span>.max(data[<span class="hljs-number">0</span>], d[<span class="hljs-number">0</span>]), <span class="hljs-built_in">Math</span>.max(data[<span class="hljs-number">1</span>], d[<span class="hljs-number">1</span>])];
      }, <span class="hljs-keyword">this</span>);
    } <span class="hljs-keyword">else</span> {
      data = <span class="hljs-keyword">this</span>.files[filePath];
    }
    process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span>(data) {
        <span class="hljs-keyword">if</span>(data[<span class="hljs-number">0</span>] &gt; startTime)
          watcher.emit(<span class="hljs-string">"change"</span>, data[<span class="hljs-number">1</span>]);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.initialScan &amp;&amp; <span class="hljs-keyword">this</span>.initialScanRemoved.indexOf(filePath) &gt;= <span class="hljs-number">0</span>) {
        watcher.emit(<span class="hljs-string">"remove"</span>);
      }
    }.bind(<span class="hljs-keyword">this</span>));
};</code></pre>
<p>处理已有数据也是分成两个步骤</p>
<ol>
<li>
<p>读取数据<br>   这里对于文件、文件夹的处理，获取数据的方式也不同。<br>对于监听<strong>文件夹</strong>路径的情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.keys(this.files).forEach(function(file) {
var d = this.files[file];
if(!data)
  data = d;
else
  data = [Math.max(data[0], d[0]), Math.max(data[1], d[1])];
}, this);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>.files).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file</span>) </span>{
<span class="hljs-keyword">var</span> d = <span class="hljs-keyword">this</span>.files[file];
<span class="hljs-keyword">if</span>(!data)
  data = d;
<span class="hljs-keyword">else</span>
  data = [<span class="hljs-built_in">Math</span>.max(data[<span class="hljs-number">0</span>], d[<span class="hljs-number">0</span>]), <span class="hljs-built_in">Math</span>.max(data[<span class="hljs-number">1</span>], d[<span class="hljs-number">1</span>])];
}, <span class="hljs-keyword">this</span>);</code></pre>
<p>可以从对 <code>this.files</code> 的循环看出，这里实际上是取到的是该文件夹下所有文件中的<code>变更流程执行时间点</code>、<code>文件最后修改时间点</code> 的最大值。<br>对于<strong>单个文件</strong>路径的情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" data = this.files[filePath];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-keyword">data</span> = <span class="hljs-keyword">this</span>.files[filePath];</code></pre>
<p>则是直接取到当前监听文件路径的数据。</p>
</li>
<li>
<p>触发事件<br>   当数据完成获取后，就进入到 <code>触发事件</code> 的阶段，这个阶段会将前面取到的 <code>变更流程执行时间点</code> 与由 <code>Watching.prototype._go</code> 中设置的编译开始时间 <code>startTime</code> 进行比较：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.nextTick(function() {
if(data) {
  if(data[0] > startTime)
 watcher.emit(&quot;change&quot;, data[1]);
} else if(this.initialScan &amp;&amp; this.initialScanRemoved.indexOf(filePath) >= 0) {
  watcher.emit(&quot;remove&quot;);
}
}.bind(this));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-keyword">if</span>(data) {
  <span class="hljs-keyword">if</span>(data[<span class="hljs-number">0</span>] &gt; startTime)
 watcher.emit(<span class="hljs-string">"change"</span>, data[<span class="hljs-number">1</span>]);
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.initialScan &amp;&amp; <span class="hljs-keyword">this</span>.initialScanRemoved.indexOf(filePath) &gt;= <span class="hljs-number">0</span>) {
  watcher.emit(<span class="hljs-string">"remove"</span>);
}
}.bind(<span class="hljs-keyword">this</span>));</code></pre>
<p>当 <code>变更流程执行时间点</code> 比 <code>startTime</code> 时间晚的时候说明，在编译开始后，针对文件夹的情况是文件夹其中的文件发生了变化，对于单个文件的情况，则是该文件发生变化。则触发 <code>change</code> 事件。<br>这里还会有一个判断是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(this.initialScan &amp;&amp; this.initialScanRemoved.indexOf(filePath) >= 0) {
  watcher.emit(&quot;remove&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.initialScan &amp;&amp; <span class="hljs-keyword">this</span>.initialScanRemoved.indexOf(filePath) &gt;= <span class="hljs-number">0</span>) {
  watcher.emit(<span class="hljs-string">"remove"</span>);
}</code></pre>
<p>对于第一个条件 <code>this.initialScan</code>，上面提到在完成 <code>doInitialScan</code> 完成后会复制为 <code>false</code>。</p>
<blockquote><p>完成赋值过程后， 会将 <code>this.initialScan </code> 设置成 <code>false</code> 表示首次查看结束，设置 <code> this.initialScanRemoved</code> 为 <code>null</code> ，表示在首次查看过程中就删除的文件（夹）的处理也结束</p></blockquote>
<p>则这条判断是在 <code>watch</code> 进行的同时，<code>doInitialScan</code> 也还在进行的时候生效。<br>对于第二个条件 <code>this.initialScanRemoved.indexOf(filePath)</code> ，这里主要落脚点在于 <code>initialScanRemoved</code> 对这个数组的操作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/DirectoryWatcher.js
 
this.watcher.on(&quot;unlink&quot;, this.onFileUnlinked.bind(this));
this.watcher.on(&quot;unlinkDir&quot;, this.onDirectoryUnlinked.bind(this));
 
DirectoryWatcher.prototype.onFileUnlinked = function onFileUnlinked(filePath) {
  // 省略判断
  if(this.initialScan) {
   this.initialScanRemoved.push(filePath);
  }
};
 
DirectoryWatcher.prototype.onDirectoryUnlinked = function onDirectoryUnlinked(directoryPath) {
  // 省略判断
  if(this.initialScan) {
   this.initialScanRemoved.push(directoryPath);
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/DirectoryWatcher.js
 
<span class="hljs-keyword">this</span>.watcher.on(<span class="hljs-string">"unlink"</span>, <span class="hljs-keyword">this</span>.onFileUnlinked.bind(<span class="hljs-keyword">this</span>));
<span class="hljs-keyword">this</span>.watcher.on(<span class="hljs-string">"unlinkDir"</span>, <span class="hljs-keyword">this</span>.onDirectoryUnlinked.bind(<span class="hljs-keyword">this</span>));
 
DirectoryWatcher.prototype.onFileUnlinked = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onFileUnlinked</span>(<span class="hljs-params">filePath</span>) </span>{
  <span class="hljs-comment">// 省略判断</span>
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.initialScan) {
   <span class="hljs-keyword">this</span>.initialScanRemoved.push(filePath);
  }
};
 
DirectoryWatcher.prototype.onDirectoryUnlinked = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onDirectoryUnlinked</span>(<span class="hljs-params">directoryPath</span>) </span>{
  <span class="hljs-comment">// 省略判断</span>
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.initialScan) {
   <span class="hljs-keyword">this</span>.initialScanRemoved.push(directoryPath);
  }
};</code></pre>
<p>从事件绑定中可以看到，当在进行 <code>doInitialScan</code> 过程中，发生了文件（夹）删除的情况，则会将删除的路径 <code>push</code> 到 <code>initialScanRemoved</code> 数组中。<br>那么整合两个条件，在初始扫描的场景下，监听文件（夹）发生删除的情况时，则触发 <code>remove</code> 事件，避免增加无效的监听。</p>
</li>
</ol>
</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008111801?w=775&amp;h=66" src="https://static.alili.tech/img/remote/1460000008111801?w=775&amp;h=66" alt="" title="" style="cursor: pointer;"></span></p>
<p>在整个数据监听通道的流程中，都是围绕 <code>Watcher</code> 实例进行开展，通过 <code>Watcher</code> 承上启下衔接上下逻辑的作用。</p>
<h3 id="articleHeader5">触发流程</h3>
<p>在完成了从 <code>Watchpack.prototype.watch</code> -&gt; <code>WatcherManager.prototype.watchFile</code>、<code>WatcherManager.prototype.watchDirectory</code>  -&gt; <code>Directory.prototype.watch</code> 这条调用链之后，<code>webpack --watch </code> 就会等待文件的改动，进行编译的再次触发。</p>
<h4>chokidar</h4>
<p>目前 <code>watchpack</code> 中对文件（夹）的监听通过 <code>chokidar</code> 来实现，首先关联的逻辑就是 <code>chokidar</code> 的具体调用，关注到 <code>DirectoryWatcher</code> 中调用 <code>chokidar</code> 的部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/DirectoryWatcher.js

function DirectoryWatcher(directoryPath, options) {
    EventEmitter.call(this);
    this.watcher = chokidar.watch(directoryPath, {
        ignoreInitial: true,
        persistent: true,
        followSymlinks: false,
        depth: 0,
        atomic: false,
        alwaysStat: true,
        ignorePermissionErrors: true,
        usePolling: options.poll ? true : undefined,
        interval: typeof options.poll === &quot;number&quot; ? options.poll : undefined
    });
    this.watcher.on(&quot;add&quot;, this.onFileAdded.bind(this));
    this.watcher.on(&quot;addDir&quot;, this.onDirectoryAdded.bind(this));
    this.watcher.on(&quot;change&quot;, this.onChange.bind(this));
    this.watcher.on(&quot;unlink&quot;, this.onFileUnlinked.bind(this));
    this.watcher.on(&quot;unlinkDir&quot;, this.onDirectoryUnlinked.bind(this));
    this.watcher.on(&quot;error&quot;, this.onWatcherError.bind(this));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/DirectoryWatcher.js

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">DirectoryWatcher</span>(<span class="hljs-params">directoryPath, options</span>) </span>{
    EventEmitter.call(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.watcher = chokidar.watch(directoryPath, {
        <span class="hljs-attr">ignoreInitial</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">persistent</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">followSymlinks</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">depth</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">atomic</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">alwaysStat</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">ignorePermissionErrors</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">usePolling</span>: options.poll ? <span class="hljs-literal">true</span> : <span class="hljs-literal">undefined</span>,
        <span class="hljs-attr">interval</span>: <span class="hljs-keyword">typeof</span> options.poll === <span class="hljs-string">"number"</span> ? options.poll : <span class="hljs-literal">undefined</span>
    });
    <span class="hljs-keyword">this</span>.watcher.on(<span class="hljs-string">"add"</span>, <span class="hljs-keyword">this</span>.onFileAdded.bind(<span class="hljs-keyword">this</span>));
    <span class="hljs-keyword">this</span>.watcher.on(<span class="hljs-string">"addDir"</span>, <span class="hljs-keyword">this</span>.onDirectoryAdded.bind(<span class="hljs-keyword">this</span>));
    <span class="hljs-keyword">this</span>.watcher.on(<span class="hljs-string">"change"</span>, <span class="hljs-keyword">this</span>.onChange.bind(<span class="hljs-keyword">this</span>));
    <span class="hljs-keyword">this</span>.watcher.on(<span class="hljs-string">"unlink"</span>, <span class="hljs-keyword">this</span>.onFileUnlinked.bind(<span class="hljs-keyword">this</span>));
    <span class="hljs-keyword">this</span>.watcher.on(<span class="hljs-string">"unlinkDir"</span>, <span class="hljs-keyword">this</span>.onDirectoryUnlinked.bind(<span class="hljs-keyword">this</span>));
    <span class="hljs-keyword">this</span>.watcher.on(<span class="hljs-string">"error"</span>, <span class="hljs-keyword">this</span>.onWatcherError.bind(<span class="hljs-keyword">this</span>));
}</code></pre>
<p>首先是 <code>chokidar</code> 的初始化，</p>
<ul>
<li><p><code>ignoreInitial</code>：默认为<code>false</code>， 设置为 <code>true</code> ，避免在 <code>chokidar</code> 自身初始化的过程中触发 <code>add</code>、<code>addDir</code> 事件</p></li>
<li><p><code>persistent</code>：默认为 <code>true</code>，设置为 <code>true</code>，保持文件监听，为 <code>false</code> 的情况下，会在 <code>ready</code> 事件后不再触发事件</p></li>
<li><p><code>followSymlinks</code>：默认为 <code>true</code>，设置为 <code>false</code>，对 link 文件不监听真实文件内容的变化</p></li>
<li><p><code>depth</code>： 设置为 <code>0</code> ，表明对子文件夹不进行递归监听</p></li>
<li><p><code>atomic</code>：默认为 <code>false</code>，设置为 <code>false</code>，关闭对同一文件删除后 100ms 内重新增加的行为触发 <code>change</code> 事件，而不是 <code>unlink</code>、<code>add</code> 事件的默认行为</p></li>
<li><p><code>alwaysStat</code>：默认为<code>false</code>，设置为  <code>true</code>，保持传递 <code>fs.Stats</code>，即使可能存在不存在的情况</p></li>
<li><p><code>ignorePermissionErrors</code>：默认为 <code>false</code>，设置为 <code>true</code>，忽略权限错误的提示</p></li>
<li><p><code>usePolling</code>：默认为 <code>false</code>，根据实际配置来设置，是否开启 <code>polling</code> 轮询模式</p></li>
<li><p><code>interval</code>：轮询模式的周期时间，根据实际配置来设置，轮询模式的具体时间</p></li>
</ul>
<p>其次绑定对应的文件（夹）事件 <code>add</code>、<code>addDir</code>、<code>change</code>、<code>unlink</code>、<code>unlinkDir</code></p>
<p>完成初始化和事件绑定后，通过各个事件的回调函数来进行监听逻辑的触发和向上层传递。</p>
<h4>文件时间精确度数值（<code>FS_ACCURENCY</code>）确定</h4>
<p>根据上面提到的 <code>this.watcher.on("change", this.onChange.bind(this));</code>  当文件内容发生变化时，进入绑定的 <code>onChange</code> 回调函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/DirectoryWatcher.js

var FS_ACCURENCY = 10000;

DirectoryWatcher.prototype.onChange = function onChange(filePath, stat) {
    if(filePath.indexOf(this.path) !== 0) return;
    if(/[\\\/]/.test(filePath.substr(this.path.length + 1))) return;
    var mtime = +stat.mtime;
    if(FS_ACCURENCY > 1 &amp;&amp; mtime % 1 !== 0)
        FS_ACCURENCY = 1;
    else if(FS_ACCURENCY > 10 &amp;&amp; mtime % 10 !== 0)
        FS_ACCURENCY = 10;
    else if(FS_ACCURENCY > 100 &amp;&amp; mtime % 100 !== 0)
        FS_ACCURENCY = 100;
    else if(FS_ACCURENCY > 1000 &amp;&amp; mtime % 1000 !== 0)
        FS_ACCURENCY = 1000;
    else if(FS_ACCURENCY > 2000 &amp;&amp; mtime % 2000 !== 0)
        FS_ACCURENCY = 2000;
    this.setFileTime(filePath, mtime, false, &quot;change&quot;);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/DirectoryWatcher.js

<span class="hljs-keyword">var</span> FS_ACCURENCY = <span class="hljs-number">10000</span>;

DirectoryWatcher.prototype.onChange = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onChange</span>(<span class="hljs-params">filePath, stat</span>) </span>{
    <span class="hljs-keyword">if</span>(filePath.indexOf(<span class="hljs-keyword">this</span>.path) !== <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/[\\\/]/</span>.test(filePath.substr(<span class="hljs-keyword">this</span>.path.length + <span class="hljs-number">1</span>))) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">var</span> mtime = +stat.mtime;
    <span class="hljs-keyword">if</span>(FS_ACCURENCY &gt; <span class="hljs-number">1</span> &amp;&amp; mtime % <span class="hljs-number">1</span> !== <span class="hljs-number">0</span>)
        FS_ACCURENCY = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(FS_ACCURENCY &gt; <span class="hljs-number">10</span> &amp;&amp; mtime % <span class="hljs-number">10</span> !== <span class="hljs-number">0</span>)
        FS_ACCURENCY = <span class="hljs-number">10</span>;
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(FS_ACCURENCY &gt; <span class="hljs-number">100</span> &amp;&amp; mtime % <span class="hljs-number">100</span> !== <span class="hljs-number">0</span>)
        FS_ACCURENCY = <span class="hljs-number">100</span>;
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(FS_ACCURENCY &gt; <span class="hljs-number">1000</span> &amp;&amp; mtime % <span class="hljs-number">1000</span> !== <span class="hljs-number">0</span>)
        FS_ACCURENCY = <span class="hljs-number">1000</span>;
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(FS_ACCURENCY &gt; <span class="hljs-number">2000</span> &amp;&amp; mtime % <span class="hljs-number">2000</span> !== <span class="hljs-number">0</span>)
        FS_ACCURENCY = <span class="hljs-number">2000</span>;
    <span class="hljs-keyword">this</span>.setFileTime(filePath, mtime, <span class="hljs-literal">false</span>, <span class="hljs-string">"change"</span>);
};</code></pre>
<p>在 <code>onChange</code> 中，除了调用 <code>this.setFileTime</code> 进行文件变更数据更新、对应 <code>watcher</code> 实例事件触发之外，还会进行 <code>FS_ACCURENCY</code> 的校准逻辑。可以看到校准的规则是根据文件的修改时间取模的精度来确定值。关于这个变量值，这里从 <a href="https://github.com/webpack/watchpack/issues/25" rel="nofollow noreferrer" target="_blank">issue</a> 中找到 <code>webpack</code> 作者 <strong>sokra</strong> 的描述：</p>
<blockquote><p><code>FS_ACCURENCY</code>&nbsp;should&nbsp;<a href="https://github.com/webpack/watchpack/blob/master/lib/DirectoryWatcher.js#L230-L239" rel="nofollow noreferrer" target="_blank">automatically adjust</a>&nbsp;to your file system accuracy</p></blockquote>
<blockquote><p>With low fs accuracy files could have changed even if mime is equal</p></blockquote>
<p>其中说到，在文件系统数据低精确度的情况，可能出现 <code>mime</code> 相同，但也发生了改变的情况。通过在后面的变更判断中通过加入精确值的度量值计算，起到平衡数值的作用（例如<code>var startTime = this.startTime &amp;&amp; Math.floor(this.startTime / FS_ACCURENCY) * FS_ACCURENCY;</code>）。</p>
<h4>
<code>watcher</code> 实例事件触发</h4>
<p>之前提到，<code>watcher</code> 实例是文件变更信息的通道，通过在 <code>watcher</code> 上的事件绑定，将 <code>chokidar</code> 监听到的文件（夹）变更信息，传递到 <code>watchpack</code> 层的逻辑。进入 <code>this.setFileTime</code> 后，则进行对应事件的触发</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/DirectoryWatcher.js

DirectoryWatcher.prototype.setFileTime = function setFileTime(filePath, mtime, initial, type) {
    var now = Date.now();
    var old = this.files[filePath];
    this.files[filePath] = [initial ? Math.min(now, mtime) : now, mtime];
      
    if(!old) {
        if(mtime) {
            if(this.watchers[withoutCase(filePath)]) {
               // 文件事件触发具体逻辑
            }
        }
    } else if(!initial &amp;&amp; mtime &amp;&amp; type !== &quot;add&quot;) {
      // 文件事件触发具体逻辑
    } else if(!initial &amp;&amp; !mtime) {
      // 文件事件触发具体逻辑
    }
    if(this.watchers[withoutCase(this.path)]) {
      // 文件目录事件触发
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/DirectoryWatcher.js

DirectoryWatcher.prototype.setFileTime = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setFileTime</span>(<span class="hljs-params">filePath, mtime, initial, type</span>) </span>{
    <span class="hljs-keyword">var</span> now = <span class="hljs-built_in">Date</span>.now();
    <span class="hljs-keyword">var</span> old = <span class="hljs-keyword">this</span>.files[filePath];
    <span class="hljs-keyword">this</span>.files[filePath] = [initial ? <span class="hljs-built_in">Math</span>.min(now, mtime) : now, mtime];
      
    <span class="hljs-keyword">if</span>(!old) {
        <span class="hljs-keyword">if</span>(mtime) {
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.watchers[withoutCase(filePath)]) {
               <span class="hljs-comment">// 文件事件触发具体逻辑</span>
            }
        }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(!initial &amp;&amp; mtime &amp;&amp; type !== <span class="hljs-string">"add"</span>) {
      <span class="hljs-comment">// 文件事件触发具体逻辑</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(!initial &amp;&amp; !mtime) {
      <span class="hljs-comment">// 文件事件触发具体逻辑</span>
    }
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.watchers[withoutCase(<span class="hljs-keyword">this</span>.path)]) {
      <span class="hljs-comment">// 文件目录事件触发</span>
    }
};</code></pre>
<p>事件触发分为两个大的阶段，第一个阶段为对于 <code>filePath</code> 文件的事件触发，第二个阶段为对于当前 <code>DirectoryWatcher</code> 对应 <code>path</code> 属性文件夹的事件触发。</p>
<p>1.<code>filepath</code> 文件的事件触发</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/DirectoryWatcher.js

DirectoryWatcher.prototype.setFileTime = function setFileTime(filePath, mtime, initial, type) {
    var now = Date.now();
    var old = this.files[filePath];
    this.files[filePath] = [initial ? Math.min(now, mtime) : now, mtime];
    if(!old) {
        if(mtime) {
            if(this.watchers[withoutCase(filePath)]) {
                this.watchers[withoutCase(filePath)].forEach(function(w) {
                    if(!initial || w.checkStartTime(mtime, initial)) {
                        w.emit(&quot;change&quot;, mtime);
                    }
                });
            }
        }
    } else if(!initial &amp;&amp; mtime &amp;&amp; type !== &quot;add&quot;) {
        if(this.watchers[withoutCase(filePath)]) {
            this.watchers[withoutCase(filePath)].forEach(function(w) {
                w.emit(&quot;change&quot;, mtime);
            });
        }
    } else if(!initial &amp;&amp; !mtime) {
        if(this.watchers[withoutCase(filePath)]) {
            this.watchers[withoutCase(filePath)].forEach(function(w) {
                w.emit(&quot;remove&quot;);
            });
        }
    }
  
      // 省略文件夹触发
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/DirectoryWatcher.js

DirectoryWatcher.prototype.setFileTime = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setFileTime</span>(<span class="hljs-params">filePath, mtime, initial, type</span>) </span>{
    <span class="hljs-keyword">var</span> now = <span class="hljs-built_in">Date</span>.now();
    <span class="hljs-keyword">var</span> old = <span class="hljs-keyword">this</span>.files[filePath];
    <span class="hljs-keyword">this</span>.files[filePath] = [initial ? <span class="hljs-built_in">Math</span>.min(now, mtime) : now, mtime];
    <span class="hljs-keyword">if</span>(!old) {
        <span class="hljs-keyword">if</span>(mtime) {
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.watchers[withoutCase(filePath)]) {
                <span class="hljs-keyword">this</span>.watchers[withoutCase(filePath)].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">w</span>) </span>{
                    <span class="hljs-keyword">if</span>(!initial || w.checkStartTime(mtime, initial)) {
                        w.emit(<span class="hljs-string">"change"</span>, mtime);
                    }
                });
            }
        }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(!initial &amp;&amp; mtime &amp;&amp; type !== <span class="hljs-string">"add"</span>) {
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.watchers[withoutCase(filePath)]) {
            <span class="hljs-keyword">this</span>.watchers[withoutCase(filePath)].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">w</span>) </span>{
                w.emit(<span class="hljs-string">"change"</span>, mtime);
            });
        }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(!initial &amp;&amp; !mtime) {
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.watchers[withoutCase(filePath)]) {
            <span class="hljs-keyword">this</span>.watchers[withoutCase(filePath)].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">w</span>) </span>{
                w.emit(<span class="hljs-string">"remove"</span>);
            });
        }
    }
  
      <span class="hljs-comment">// 省略文件夹触发</span>
};</code></pre>
<p>文件事件触发，实际会涉及到三个逻辑，单纯已有文件改变的触发，对应第二个逻辑</p>
<ul>
<li>
<p><strong>对于 <code>filePath</code> 之前没有数据设置的情况 <code>if(!old)</code> </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   这里穿插到前面初始化的逻辑，在前面 `doIntialScan` 中 `initial` 的参数为 `true`， 则进入 `checkStartTime` 函数判断
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>   这里穿插到前面初始化的逻辑，在前面 `doIntialScan` 中 `initial` 的参数为 `true`， 则进入 `checkStartTime` 函数判断
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/DirectoryWatcher.js

Watcher.prototype.checkStartTime = function checkStartTime(mtime, initial) {
if(typeof this.startTime !== &quot;number&quot;) return !initial;
var startTime = this.startTime &amp;&amp; Math.floor(this.startTime / FS_ACCURENCY) * FS_ACCURENCY;
return startTime <= mtime;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/DirectoryWatcher.js

Watcher.prototype.checkStartTime = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkStartTime</span>(<span class="hljs-params">mtime, initial</span>) </span>{
<span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.startTime !== <span class="hljs-string">"number"</span>) <span class="hljs-keyword">return</span> !initial;
<span class="hljs-keyword">var</span> startTime = <span class="hljs-keyword">this</span>.startTime &amp;&amp; <span class="hljs-built_in">Math</span>.floor(<span class="hljs-keyword">this</span>.startTime / FS_ACCURENCY) * FS_ACCURENCY;
<span class="hljs-keyword">return</span> startTime &lt;= mtime;
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  会去比较编译开始时间 `statrTime` 与文件最后修改时间 `mtime` 来判断是否需要触发事件，`doInitialScan` 场景下，默认 `FS_ACCURENCY` 的值是 `10000` ，意思是在编译前的 10s 范围内的改动都会触发 `change` 事件，那么这样是否会存在初始化时多触发一次编译呢？在上面提到  [issue](https://github.com/webpack/watchpack/issues/25) 中，作者同样给出了解释
   > This may not happen fast enough if you have few files and the files are created unlucky on a timestamp modulo 10s

   > The watching may loop in a unlucky case, but this should not result in a different compilation hash. I. e. the webpack-dev-server doesn't trigger a update if the hash is equal.

   及时触发这样的 `unlucky case`，也只会在 `doInitailScan` 过程中文件内容真正发生变化导致 `hash` 变化的时候再次触发编译更新。

   这条判断同样适用当有新增文件，触发 `add` 事件的情况。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>  会去比较编译开始时间 <span class="hljs-code">`statrTime`</span> 与文件最后修改时间 <span class="hljs-code">`mtime`</span> 来判断是否需要触发事件，<span class="hljs-code">`doInitialScan`</span> 场景下，默认 <span class="hljs-code">`FS_ACCURENCY`</span> 的值是 <span class="hljs-code">`10000`</span> ，意思是在编译前的 10s 范围内的改动都会触发 <span class="hljs-code">`change`</span> 事件，那么这样是否会存在初始化时多触发一次编译呢？在上面提到  [<span class="hljs-string">issue</span>](<span class="hljs-link">https://github.com/webpack/watchpack/issues/25</span>) 中，作者同样给出了解释
   &gt; This may not happen fast enough if you have few files and the files are created unlucky on a timestamp modulo 10s

   &gt; The watching may loop in a unlucky case, but this should not result in a different compilation hash. I. e. the webpack-dev-server doesn't trigger a update if the hash is equal.

   及时触发这样的 <span class="hljs-code">`unlucky case`</span>，也只会在 <span class="hljs-code">`doInitailScan`</span> 过程中文件内容真正发生变化导致 <span class="hljs-code">`hash`</span> 变化的时候再次触发编译更新。

   这条判断同样适用当有新增文件，触发 <span class="hljs-code">`add`</span> 事件的情况。
</code></pre>
</li>
<li>
<p><strong>对于已有文件变化（非 <code>doInitial</code> 过程中、<code>add</code> 新增文件事件触发，<code>if(!initial &amp;&amp; mtime &amp;&amp; type !== "add")</code>）</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  对应这种情况，则直接会触发 `change` 事件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code style="word-break: break-word; white-space: initial;">  对应这种情况，则直接会触发 `change` 事件</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(this.watchers[withoutCase(filePath)]) {
  this.watchers[withoutCase(filePath)].forEach(function(w) {
w.emit(&quot;change&quot;, mtime);
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.watchers[withoutCase(filePath)]) {
  <span class="hljs-keyword">this</span>.watchers[withoutCase(filePath)].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">w</span>) </span>{
w.emit(<span class="hljs-string">"change"</span>, mtime);
  });
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   找到对应文件的监听 `watcher` 触发 `change` 事件，对应上层逻辑逻辑进行响应。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>   找到对应文件的监听 `watcher` 触发 `change` 事件，对应上层逻辑逻辑进行响应。
</code></pre>
</li>
<li>
<p><strong><code>mtime</code> 不存在的情况（文件删除）</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/DirectoryWatcher.js

this.watcher.on(&quot;unlink&quot;, this.onFileUnlinked.bind(this));
DirectoryWatcher.prototype.onFileUnlinked = function onFileUnlinked(filePath) {
  // 省略其他操作
  this.setFileTime(filePath, null, false, &quot;unlink&quot;);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/DirectoryWatcher.js

<span class="hljs-keyword">this</span>.watcher.on(<span class="hljs-string">"unlink"</span>, <span class="hljs-keyword">this</span>.onFileUnlinked.bind(<span class="hljs-keyword">this</span>));
DirectoryWatcher.prototype.onFileUnlinked = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onFileUnlinked</span>(<span class="hljs-params">filePath</span>) </span>{
  <span class="hljs-comment">// 省略其他操作</span>
  <span class="hljs-keyword">this</span>.setFileTime(filePath, <span class="hljs-literal">null</span>, <span class="hljs-literal">false</span>, <span class="hljs-string">"unlink"</span>);
};</code></pre>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 当文件删除触发 `unlink` 事件时，调用 `setFileTime` 时，则会传递 `mtime` 为 `null`。则事件触发逻辑与第二种情况方式相同，只是从 `change` 事件变成了 `remove` 事件。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code> 当文件删除触发 `unlink` 事件时，调用 `setFileTime` 时，则会传递 `mtime` 为 `null`。则事件触发逻辑与第二种情况方式相同，只是从 `change` 事件变成了 `remove` 事件。
</code></pre>
<p>2.<code>DirectoryWatcher</code> 对应 <code>path</code> 属性文件夹的事件触发</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DirectoryWatcher.prototype.setFileTime = function setFileTime(filePath, mtime, initial, type) {
      // 省略文件触发
  
    if(this.watchers[withoutCase(this.path)]) {
        this.watchers[withoutCase(this.path)].forEach(function(w) {
            if(!initial || w.checkStartTime(mtime, initial)) {
                w.emit(&quot;change&quot;, filePath, mtime);
            }
        });
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">DirectoryWatcher.prototype.setFileTime = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setFileTime</span>(<span class="hljs-params">filePath, mtime, initial, type</span>) </span>{
      <span class="hljs-comment">// 省略文件触发</span>
  
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.watchers[withoutCase(<span class="hljs-keyword">this</span>.path)]) {
        <span class="hljs-keyword">this</span>.watchers[withoutCase(<span class="hljs-keyword">this</span>.path)].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">w</span>) </span>{
            <span class="hljs-keyword">if</span>(!initial || w.checkStartTime(mtime, initial)) {
                w.emit(<span class="hljs-string">"change"</span>, filePath, mtime);
            }
        });
    }
};</code></pre>
<p>因为是监听的是文件夹下的文件发生的变化，所以在完成了对应文件事件的触发之后，会进行监听文件夹（路径为实例化 <code>DirectoryWatcher</code>  时传入的 <code>this.path</code>）的触发，这里除了会将文件的最后修改时间 <code>mtine</code> 传递，还会将对应的文件路径 <code>this.filePath</code> 也当做参数一起传递到绑定的事件回调参数中。</p>
<p>在通过 <code>watcher</code> 这个继承了 <code>EventEmitter</code> 对象的实例触发事件后，就完成了底层文件（夹）监听触发的功能，紧接着就是上层对象对于 <code>watcher</code> 实例的事件触发的对应处理，最终关联上 <code>webpack</code> 的编译启动流程。</p>
<h4>上层响应</h4>
<h5>watchpack.js</h5>
<p>在上面有提到</p>
<blockquote><p>在 <code>watcherManager.js</code> 文件中的 <code>watchFile</code> 以及 <code>watchDirectory</code> 都传递了同类型的参数调用了 <code>this.getDirectoryWatcher</code> ，并在随后调用了返回实例的 <code>watch</code> 方法，并将 <code>watch</code> 方法的返回继续往上层 <code>watchpack.js</code> 的 <code>this._fileWatcher</code> 与 <code>this._dirWatcher</code> 方法。</p></blockquote>
<p>则 <code>watch</code> 实例的上层响应的第一层在 <code>watchpack.js</code> 中的 <code>Watchpack.prototype._fileWatcher</code> 、<code>Watchpack.prototype._dirWatcher</code> 中完成，分别针对文件和文件夹的变更处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/watchpack.js

Watchpack.prototype._fileWatcher = function _fileWatcher(file, watcher) {
    watcher.on(&quot;change&quot;, this._onChange.bind(this, file));
    return watcher;
};

Watchpack.prototype._dirWatcher = function _dirWatcher(item, watcher) {
    watcher.on(&quot;change&quot;, function(file, mtime) {
        this._onChange(item, mtime, file);
    }.bind(this));
    return watcher;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/watchpack.js

Watchpack.prototype._fileWatcher = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_fileWatcher</span>(<span class="hljs-params">file, watcher</span>) </span>{
    watcher.on(<span class="hljs-string">"change"</span>, <span class="hljs-keyword">this</span>._onChange.bind(<span class="hljs-keyword">this</span>, file));
    <span class="hljs-keyword">return</span> watcher;
};

Watchpack.prototype._dirWatcher = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_dirWatcher</span>(<span class="hljs-params">item, watcher</span>) </span>{
    watcher.on(<span class="hljs-string">"change"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file, mtime</span>) </span>{
        <span class="hljs-keyword">this</span>._onChange(item, mtime, file);
    }.bind(<span class="hljs-keyword">this</span>));
    <span class="hljs-keyword">return</span> watcher;
};</code></pre>
<p>这里 <code>_fileWatcher</code> 和 <code>_dirWatcher</code> 对 <code>change</code> 的事件都是将逻辑导向了 <code>Watchpack.prototype._onChange</code> 中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/watchpack.js

Watchpack.prototype._onChange = function _onChange(item, mtime, file) {
    file = file || item;
    this.mtimes[file] = mtime;
    if(this.paused) return;
    this.emit(&quot;change&quot;, file, mtime);
    if(this.aggregateTimeout)
        clearTimeout(this.aggregateTimeout);
    if(this.aggregatedChanges.indexOf(item) < 0)
        this.aggregatedChanges.push(item);
    this.aggregateTimeout = setTimeout(this._onTimeout, this.options.aggregateTimeout);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/watchpack.js

Watchpack.prototype._onChange = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_onChange</span>(<span class="hljs-params">item, mtime, file</span>) </span>{
    file = file || item;
    <span class="hljs-keyword">this</span>.mtimes[file] = mtime;
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.paused) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">this</span>.emit(<span class="hljs-string">"change"</span>, file, mtime);
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.aggregateTimeout)
        clearTimeout(<span class="hljs-keyword">this</span>.aggregateTimeout);
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.aggregatedChanges.indexOf(item) &lt; <span class="hljs-number">0</span>)
        <span class="hljs-keyword">this</span>.aggregatedChanges.push(item);
    <span class="hljs-keyword">this</span>.aggregateTimeout = setTimeout(<span class="hljs-keyword">this</span>._onTimeout, <span class="hljs-keyword">this</span>.options.aggregateTimeout);
};</code></pre>
<p>函数会首先触发 <code>Watchpack</code> 实例的 <code>change</code> 事件，传入触发的文件（夹）的路径，以及最后修改时间，供上层逻辑操作。</p>
<p>然后开始进行 <code>aggregate</code> 逻辑的触发，可以看到这里的大致含义是在文件（夹）发生变更 <code>this.aggregateTimeout</code>  后，进行 <code>Watchpack.prototype._onTimeout</code> 逻辑，在此之前，会将修改的文件（夹）路径暂存到 <code>aggregatedChanges</code> 数组中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchpack/lib/watchpack.js

Watchpack.prototype._onTimeout = function _onTimeout() {
    this.aggregateTimeout = 0;
    var changes = this.aggregatedChanges;
    this.aggregatedChanges = [];
    this.emit(&quot;aggregated&quot;, changes);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watchpack/lib/watchpack.js

Watchpack.prototype._onTimeout = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_onTimeout</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.aggregateTimeout = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> changes = <span class="hljs-keyword">this</span>.aggregatedChanges;
    <span class="hljs-keyword">this</span>.aggregatedChanges = [];
    <span class="hljs-keyword">this</span>.emit(<span class="hljs-string">"aggregated"</span>, changes);
};</code></pre>
<p>而 <code>Watchpack.prototype._onTimeout</code> 则是当最后一次文件（夹）触发之后没有变更的 200ms 后，通过 <code>this.aggregatedChanges</code> 将接连不断的变更聚合通过 <code>aggregated</code> 事件传递给上层。</p>
<p>那么对应每一个变更，实际会牵涉触发一次 <code>change</code> 事件，以及关联一次 <code>aggregated</code> 事件，传给给上层，关联实际的编译重新触发逻辑。</p>
<h5>NodeWatchFileSystem.js</h5>
<p>前面提到</p>
<blockquote><p>在 <code>NodeWatchFileSystem.js</code> 中的实现再一次的依赖 <strong><a href="http://web.npm.alibaba-inc.com/package/watchpack" rel="nofollow noreferrer" target="_blank">watchpack</a></strong> 完成。通过封装 <code>watchpack</code> 的监听逻辑，完成绑定相应的文件变更事件，进行上层 <code>compiler.invalidate</code> 方法调用，触发再次编译流程。</p></blockquote>
<p>那么绑定 <code>watchpack</code> 实例的事件，来完成这一层的逻辑</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack/lib/NodeWatchFileSystem.js

NodeWatchFileSystem.prototype.watch = function watch(files, dirs, missing, startTime, options, callback, callbackUndelayed) {
    // 省略参数合法性检测
  
    this.watcher = new Watchpack(options);

    if(callbackUndelayed)
        this.watcher.once(&quot;change&quot;, callbackUndelayed);

    this.watcher.once(&quot;aggregated&quot;, function(changes) {
          //1.
        if(this.inputFileSystem &amp;&amp; this.inputFileSystem.purge) {
            this.inputFileSystem.purge(changes);
        }
          //2.
        var times = this.watcher.getTimes();
          //3.
        callback(null, changes.filter(function(file) {
            return files.indexOf(file) >= 0;
        }).sort(), changes.filter(function(file) {
            return dirs.indexOf(file) >= 0;
        }).sort(), changes.filter(function(file) {
            return missing.indexOf(file) >= 0;
        }).sort(), times, times);
    }.bind(this));

    this.watcher.watch(files.concat(missing), dirs, startTime);
  
    // 省略返回
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">webpack/lib/NodeWatchFileSystem.js

NodeWatchFileSystem.prototype.watch = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">watch</span>(<span class="hljs-params">files, dirs, missing, startTime, options, callback, callbackUndelayed</span>) </span>{
    <span class="hljs-comment">// 省略参数合法性检测</span>
  
    <span class="hljs-keyword">this</span>.watcher = <span class="hljs-keyword">new</span> Watchpack(options);

    <span class="hljs-keyword">if</span>(callbackUndelayed)
        <span class="hljs-keyword">this</span>.watcher.once(<span class="hljs-string">"change"</span>, callbackUndelayed);

    <span class="hljs-keyword">this</span>.watcher.once(<span class="hljs-string">"aggregated"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">changes</span>) </span>{
          <span class="hljs-comment">//1.</span>
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.inputFileSystem &amp;&amp; <span class="hljs-keyword">this</span>.inputFileSystem.purge) {
            <span class="hljs-keyword">this</span>.inputFileSystem.purge(changes);
        }
          <span class="hljs-comment">//2.</span>
        <span class="hljs-keyword">var</span> times = <span class="hljs-keyword">this</span>.watcher.getTimes();
          <span class="hljs-comment">//3.</span>
        callback(<span class="hljs-literal">null</span>, changes.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file</span>) </span>{
            <span class="hljs-keyword">return</span> files.indexOf(file) &gt;= <span class="hljs-number">0</span>;
        }).sort(), changes.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file</span>) </span>{
            <span class="hljs-keyword">return</span> dirs.indexOf(file) &gt;= <span class="hljs-number">0</span>;
        }).sort(), changes.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file</span>) </span>{
            <span class="hljs-keyword">return</span> missing.indexOf(file) &gt;= <span class="hljs-number">0</span>;
        }).sort(), times, times);
    }.bind(<span class="hljs-keyword">this</span>));

    <span class="hljs-keyword">this</span>.watcher.watch(files.concat(missing), dirs, startTime);
  
    <span class="hljs-comment">// 省略返回</span>
};</code></pre>
<p>与上面 <code>watchpack</code> 触发事件一致，在 <code>NodeWatchFileSystem</code> 这一层逻辑中，其实对下一层 <code>Watchpack</code> 的就是通过绑定主要的 <code>change</code>、<code>aggregated</code> 事件完成的。</p>
<p>对于 <code>change</code> 事件，会直接传递到上层的 <code>callbackUndelayed</code> 中</p>
<p>对于 <code>aggregated</code> 事件，</p>
<ol>
<li><p>首先会调用 <code>this.inputFileSystem.purge(changes)</code> ，将文件系统中涉及到变更的文件的记录清空。</p></li>
<li><p>其次调用 <code>Watchpack</code> 实例的 <code>getTimes()</code> 方法获取监听文件（夹）的 <code>变更流程执行时间点</code>、<code>文件最后修改时间点</code> 的最大值，便于在后续判断是否需要进行重新编译，例如 <code>cacheModule.needRebuild(this.fileTimestamps, this.contextTimestamps);</code>。</p></li>
<li><p>最后在调用上层回调之前，会将变化的文件（夹）根据监听时传入参数通过挨个过滤的方式进行分发到每个参数中，完成之后，流程就会走到最后一层也是最初调用监听的一层 <code>Compiler.js</code>。</p></li>
</ol>
<h5>Compiler.js</h5>
<p>在上文中提过</p>
<blockquote><p><code>Watching.prototype.watch</code> 通过 <code>compiler.watchFileSystem</code> 的 <code>watch</code> 方法实现，可以大致看出在变化触发编译后，会执行传递的回调函数，最终会调用 <code>Watching.prototype.invalidate</code> 进行编译触发</p></blockquote>
<p>从调用开始，通过最底层的 <code>chokidar</code> 完成文件（夹）监听事件的触发，通过事件传递的方式，又回到调用处，进行重新编译。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008111802?w=1022&amp;h=558" src="https://static.alili.tech/img/remote/1460000008111802?w=1022&amp;h=558" alt="" title="" style="cursor: pointer;"></span></p>
<p>回顾整个触发流程，纵向 4 个逻辑层级之间进行传递，</p>
<ul>
<li><p><code>DirectoryWatcher</code>：完成对文件（夹）的监听实现，以及初步监听数据加工</p></li>
<li><p><code>watchpack</code>：完成触发底层逻辑的封装，实现上层逻辑跟触发逻辑解耦</p></li>
<li><p><code>NodeWatchFileSystem</code>：完成对监听数据业务逻辑处理，进行最后回调处理</p></li>
<li><p><code>Compiler</code>：完成最终业务响应</p></li>
</ul>
<h3 id="articleHeader6">总结 &amp; 衔接</h3>
<p><code>watch</code> 流程利用事件模型，采用多个逻辑层的设计，对复杂的触发流程进行解耦拆分，实现了比较清晰可维护的代码结构。</p>
<p>在完成 <code>watch</code> 流程，触发重新编译后，与 <code>run</code> 流程相不同的是，<code>webpack</code> 为了提高编译速度，降低编译的时间消耗与提高编译性能，在重新编译的很多环节中都设置了缓存机制，让二次编译的速度得到大大提高。下一篇文章主要对 cache 的情况进行描述。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack 中的 watch & cache （上）

## 原文链接
[https://segmentfault.com/a/1190000008111793](https://segmentfault.com/a/1190000008111793)


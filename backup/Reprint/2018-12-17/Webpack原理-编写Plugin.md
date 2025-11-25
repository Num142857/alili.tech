---
title: 'Webpack原理-编写Plugin' 
date: 2018-12-17 2:30:07
hidden: true
slug: k35weh9499q
categories: [reprint]
---

{{< raw >}}

                    
<p>Webpack 通过 Plugin 机制让其更加灵活，以适应各种应用场景。<br>在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。</p>
<p>一个最基础的 Plugin 的代码是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class BasicPlugin{
  // 在构造函数中获取用户给该插件传入的配置
  constructor(options){
  }
  
  // Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply(compiler){
    compiler.plugin('compilation',function(compilation) {
    })
  }
}

// 导出 Plugin
module.exports = BasicPlugin;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BasicPlugin</span></span>{
  <span class="hljs-comment">// 在构造函数中获取用户给该插件传入的配置</span>
  <span class="hljs-keyword">constructor</span>(options){
  }
  
  <span class="hljs-comment">// Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象</span>
  apply(compiler){
    compiler.plugin(<span class="hljs-string">'compilation'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compilation</span>) </span>{
    })
  }
}

<span class="hljs-comment">// 导出 Plugin</span>
<span class="hljs-built_in">module</span>.exports = BasicPlugin;</code></pre>
<p>在使用这个 Plugin 时，相关配置代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const BasicPlugin = require('./BasicPlugin.js');
module.export = {
  plugins:[
    new BasicPlugin(options),
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> BasicPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./BasicPlugin.js'</span>);
<span class="hljs-built_in">module</span>.export = {
  <span class="hljs-attr">plugins</span>:[
    <span class="hljs-keyword">new</span> BasicPlugin(options),
  ]
}</code></pre>
<p>Webpack 启动后，在读取配置的过程中会先执行 <code>new BasicPlugin(options)</code> 初始化一个 BasicPlugin 获得其实例。<br>在初始化 compiler 对象后，再调用 <code>basicPlugin.apply(compiler)</code> 给插件实例传入 compiler 对象。<br>插件实例在获取到 compiler 对象后，就可以通过 <code>compiler.plugin(事件名称, 回调函数)</code> 监听到 Webpack 广播出来的事件。<br>并且可以通过 compiler 对象去操作 Webpack。</p>
<p>通过以上最简单的 Plugin 相信你大概明白了 Plugin 的工作原理，但实际开发中还有很多细节需要注意，下面来详细介绍。</p>
<h2 id="articleHeader0">Compiler 和 Compilation</h2>
<p>在开发 Plugin 时最常用的两个对象就是 Compiler 和 Compilation，它们是 Plugin 和 Webpack 之间的桥梁。<br>Compiler 和 Compilation 的含义如下：</p>
<ul>
<li>Compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例；</li>
<li>Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。</li>
</ul>
<p>Compiler 和 Compilation 的区别在于：Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只是代表了一次新的编译。</p>
<h2 id="articleHeader1">事件流</h2>
<p>Webpack 就像一条生产线，要经过一系列处理流程后才能将源文件转换成输出结果。<br>这条生产线上的每个处理流程的职责都是单一的，多个流程之间有存在依赖关系，只有完成当前处理后才能交给下一个流程去处理。<br>插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理。</p>
<p>Webpack 通过 <a href="https://github.com/webpack/tapable" rel="nofollow noreferrer" target="_blank">Tapable</a> 来组织这条复杂的生产线。<br>Webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条生产线中，去改变生产线的运作。<br>Webpack 的事件流机制保证了插件的有序性，使得整个系统扩展性很好。</p>
<p>Webpack 的事件流机制应用了观察者模式，和 Node.js 中的 EventEmitter 非常相似。<br>Compiler 和 Compilation 都继承自 Tapable，可以直接在 Compiler 和 Compilation 对象上广播和监听事件，方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
* 广播出事件
* event-name 为事件名称，注意不要和现有的事件重名
* params 为附带的参数
*/
compiler.apply('event-name',params);

/**
* 监听名称为 event-name 的事件，当 event-name 事件发生时，函数就会被执行。
* 同时函数中的 params 参数为广播事件时附带的参数。
*/
compiler.plugin('event-name',function(params) {
  
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
* 广播出事件
* event-name 为事件名称，注意不要和现有的事件重名
* params 为附带的参数
*/</span>
compiler.apply(<span class="hljs-string">'event-name'</span>,params);

<span class="hljs-comment">/**
* 监听名称为 event-name 的事件，当 event-name 事件发生时，函数就会被执行。
* 同时函数中的 params 参数为广播事件时附带的参数。
*/</span>
compiler.plugin(<span class="hljs-string">'event-name'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">params</span>) </span>{
  
});</code></pre>
<p>同理，compilation.apply 和 compilation.plugin 使用方法和上面一致。</p>
<p>在开发插件时，你可能会不知道该如何下手，因为你不知道该监听哪个事件才能完成任务。</p>
<p>在开发插件时，还需要注意以下两点：</p>
<ul>
<li>只要能拿到 Compiler 或 Compilation 对象，就能广播出新的事件，所以在新开发的插件中也能广播出事件，给其它插件监听使用。</li>
<li>传给每个插件的 Compiler 和 Compilation 对象都是同一个引用。也就是说在一个插件中修改了 Compiler 或 Compilation 对象上的属性，会影响到后面的插件。</li>
<li>
<p>有些事件是异步的，这些异步的事件会附带两个参数，第二个参数为回调函数，在插件处理完任务时需要调用回调函数通知 Webpack，才会进入下一处理流程。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="compiler.plugin('emit',function(compilation, callback) {
  // 支持处理逻辑

  // 处理完毕后执行 callback 以通知 Webpack 
  // 如果不执行 callback，运行流程将会一直卡在这不往下执行 
  callback();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">compiler.plugin(<span class="hljs-string">'emit'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compilation, callback</span>) </span>{
  <span class="hljs-comment">// 支持处理逻辑</span>

  <span class="hljs-comment">// 处理完毕后执行 callback 以通知 Webpack </span>
  <span class="hljs-comment">// 如果不执行 callback，运行流程将会一直卡在这不往下执行 </span>
  callback();
});</code></pre>
</li>
</ul>
<h2 id="articleHeader2">常用 API</h2>
<p>插件可以用来修改输出文件、增加输出文件、甚至可以提升 Webpack 性能、等等，总之插件通过调用 Webpack 提供的 API 能完成很多事情。<br>由于 Webpack 提供的 API 非常多，有很多 API 很少用的上，又加上篇幅有限，下面来介绍一些常用的 API。</p>
<h3 id="articleHeader3">读取输出资源、代码块、模块及其依赖</h3>
<p>有些插件可能需要读取 Webpack 的处理结果，例如输出资源、代码块、模块及其依赖，以便做下一步处理。</p>
<p>在 <code>emit</code> 事件发生时，代表源文件的转换和组装已经完成，在这里可以读取到最终将输出的资源、代码块、模块及其依赖，并且可以修改输出资源的内容。<br>插件代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Plugin {
  apply(compiler) {
    compiler.plugin('emit', function (compilation, callback) {
      // compilation.chunks 存放所有代码块，是一个数组
      compilation.chunks.forEach(function (chunk) {
        // chunk 代表一个代码块
        // 代码块由多个模块组成，通过 chunk.forEachModule 能读取组成代码块的每个模块
        chunk.forEachModule(function (module) {
          // module 代表一个模块
          // module.fileDependencies 存放当前模块的所有依赖的文件路径，是一个数组
          module.fileDependencies.forEach(function (filepath) {
          });
        });

        // Webpack 会根据 Chunk 去生成输出的文件资源，每个 Chunk 都对应一个及其以上的输出文件
        // 例如在 Chunk 中包含了 CSS 模块并且使用了 ExtractTextPlugin 时，
        // 该 Chunk 就会生成 .js 和 .css 两个文件
        chunk.files.forEach(function (filename) {
          // compilation.assets 存放当前所有即将输出的资源
          // 调用一个输出资源的 source() 方法能获取到输出资源的内容
          let source = compilation.assets[filename].source();
        });
      });

      // 这是一个异步事件，要记得调用 callback 通知 Webpack 本次事件监听处理结束。
      // 如果忘记了调用 callback，Webpack 将一直卡在这里而不会往后执行。
      callback();
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Plugin</span> </span>{
  apply(compiler) {
    compiler.plugin(<span class="hljs-string">'emit'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">compilation, callback</span>) </span>{
      <span class="hljs-comment">// compilation.chunks 存放所有代码块，是一个数组</span>
      compilation.chunks.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">chunk</span>) </span>{
        <span class="hljs-comment">// chunk 代表一个代码块</span>
        <span class="hljs-comment">// 代码块由多个模块组成，通过 chunk.forEachModule 能读取组成代码块的每个模块</span>
        chunk.forEachModule(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module</span>) </span>{
          <span class="hljs-comment">// module 代表一个模块</span>
          <span class="hljs-comment">// module.fileDependencies 存放当前模块的所有依赖的文件路径，是一个数组</span>
          <span class="hljs-built_in">module</span>.fileDependencies.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">filepath</span>) </span>{
          });
        });

        <span class="hljs-comment">// Webpack 会根据 Chunk 去生成输出的文件资源，每个 Chunk 都对应一个及其以上的输出文件</span>
        <span class="hljs-comment">// 例如在 Chunk 中包含了 CSS 模块并且使用了 ExtractTextPlugin 时，</span>
        <span class="hljs-comment">// 该 Chunk 就会生成 .js 和 .css 两个文件</span>
        chunk.files.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">filename</span>) </span>{
          <span class="hljs-comment">// compilation.assets 存放当前所有即将输出的资源</span>
          <span class="hljs-comment">// 调用一个输出资源的 source() 方法能获取到输出资源的内容</span>
          <span class="hljs-keyword">let</span> source = compilation.assets[filename].source();
        });
      });

      <span class="hljs-comment">// 这是一个异步事件，要记得调用 callback 通知 Webpack 本次事件监听处理结束。</span>
      <span class="hljs-comment">// 如果忘记了调用 callback，Webpack 将一直卡在这里而不会往后执行。</span>
      callback();
    })
  }
}</code></pre>
<h3 id="articleHeader4">监听文件变化</h3>
<p>在<a>4-5使用自动刷新</a> 中介绍过 Webpack 会从配置的入口模块出发，依次找出所有的依赖模块，当入口模块或者其依赖的模块发生变化时，<br>就会触发一次新的 Compilation。</p>
<p>在开发插件时经常需要知道是哪个文件发生变化导致了新的 Compilation，为此可以使用如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当依赖的文件发生变化时会触发 watch-run 事件
compiler.plugin('watch-run', (watching, callback) => {
    // 获取发生变化的文件列表
    const changedFiles = watching.compiler.watchFileSystem.watcher.mtimes;
    // changedFiles 格式为键值对，键为发生变化的文件路径。
    if (changedFiles[filePath] !== undefined) {
      // filePath 对应的文件发生了变化
    }
    callback();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 当依赖的文件发生变化时会触发 watch-run 事件</span>
compiler.plugin(<span class="hljs-string">'watch-run'</span>, (watching, callback) =&gt; {
    <span class="hljs-comment">// 获取发生变化的文件列表</span>
    <span class="hljs-keyword">const</span> changedFiles = watching.compiler.watchFileSystem.watcher.mtimes;
    <span class="hljs-comment">// changedFiles 格式为键值对，键为发生变化的文件路径。</span>
    <span class="hljs-keyword">if</span> (changedFiles[filePath] !== <span class="hljs-literal">undefined</span>) {
      <span class="hljs-comment">// filePath 对应的文件发生了变化</span>
    }
    callback();
});</code></pre>
<p>默认情况下 Webpack 只会监视入口和其依赖的模块是否发生变化，在有些情况下项目可能需要引入新的文件，例如引入一个 HTML 文件。<br>由于 JavaScript 文件不会去导入 HTML 文件，Webpack 就不会监听 HTML 文件的变化，编辑 HTML 文件时就不会重新触发新的 Compilation。<br>为了监听 HTML 文件的变化，我们需要把 HTML 文件加入到依赖列表中，为此可以使用如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="compiler.plugin('after-compile', (compilation, callback) => {
  // 把 HTML 文件添加到文件依赖列表，好让 Webpack 去监听 HTML 模块文件，在 HTML 模版文件发生变化时重新启动一次编译
    compilation.fileDependencies.push(filePath);
    callback();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">compiler.plugin(<span class="hljs-string">'after-compile'</span>, (compilation, callback) =&gt; {
  <span class="hljs-comment">// 把 HTML 文件添加到文件依赖列表，好让 Webpack 去监听 HTML 模块文件，在 HTML 模版文件发生变化时重新启动一次编译</span>
    compilation.fileDependencies.push(filePath);
    callback();
});</code></pre>
<h3 id="articleHeader5">修改输出资源</h3>
<p>有些场景下插件需要修改、增加、删除输出的资源，要做到这点需要监听 <code>emit</code> 事件，因为发生 <code>emit</code> 事件时所有模块的转换和代码块对应的文件已经生成好，<br>需要输出的资源即将输出，因此 <code>emit</code> 事件是修改 Webpack 输出资源的最后时机。</p>
<p>所有需要输出的资源会存放在 <code>compilation.assets</code> 中，<code>compilation.assets</code> 是一个键值对，键为需要输出的文件名称，值为文件对应的内容。</p>
<p>设置 <code>compilation.assets</code> 的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="compiler.plugin('emit', (compilation, callback) => {
  // 设置名称为 fileName 的输出资源
  compilation.assets[fileName] = {
    // 返回文件内容
    source: () => {
      // fileContent 既可以是代表文本文件的字符串，也可以是代表二进制文件的 Buffer
      return fileContent;
      },
    // 返回文件大小
      size: () => {
      return Buffer.byteLength(fileContent, 'utf8');
    }
  };
  callback();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">compiler.plugin(<span class="hljs-string">'emit'</span>, (compilation, callback) =&gt; {
  <span class="hljs-comment">// 设置名称为 fileName 的输出资源</span>
  compilation.assets[fileName] = {
    <span class="hljs-comment">// 返回文件内容</span>
    source: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-comment">// fileContent 既可以是代表文本文件的字符串，也可以是代表二进制文件的 Buffer</span>
      <span class="hljs-keyword">return</span> fileContent;
      },
    <span class="hljs-comment">// 返回文件大小</span>
      size: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> Buffer.byteLength(fileContent, <span class="hljs-string">'utf8'</span>);
    }
  };
  callback();
});</code></pre>
<p>读取 <code>compilation.assets</code> 的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="compiler.plugin('emit', (compilation, callback) => {
  // 读取名称为 fileName 的输出资源
  const asset = compilation.assets[fileName];
  // 获取输出资源的内容
  asset.source();
  // 获取输出资源的文件大小
  asset.size();
  callback();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">compiler.plugin(<span class="hljs-string">'emit'</span>, (compilation, callback) =&gt; {
  <span class="hljs-comment">// 读取名称为 fileName 的输出资源</span>
  <span class="hljs-keyword">const</span> asset = compilation.assets[fileName];
  <span class="hljs-comment">// 获取输出资源的内容</span>
  asset.source();
  <span class="hljs-comment">// 获取输出资源的文件大小</span>
  asset.size();
  callback();
});</code></pre>
<h3 id="articleHeader6">判断 Webpack 使用了哪些插件</h3>
<p>在开发一个插件时可能需要根据当前配置是否使用了其它某个插件而做下一步决定，因此需要读取 Webpack 当前的插件配置情况。<br>以判断当前是否使用了 ExtractTextPlugin 为例，可以使用如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 判断当前配置使用使用了 ExtractTextPlugin，
// compiler 参数即为 Webpack 在 apply(compiler) 中传入的参数
function hasExtractTextPlugin(compiler) {
  // 当前配置所有使用的插件列表
  const plugins = compiler.options.plugins;
  // 去 plugins 中寻找有没有 ExtractTextPlugin 的实例
  return plugins.find(plugin=>plugin.__proto__.constructor === ExtractTextPlugin) != null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 判断当前配置使用使用了 ExtractTextPlugin，</span>
<span class="hljs-comment">// compiler 参数即为 Webpack 在 apply(compiler) 中传入的参数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasExtractTextPlugin</span>(<span class="hljs-params">compiler</span>) </span>{
  <span class="hljs-comment">// 当前配置所有使用的插件列表</span>
  <span class="hljs-keyword">const</span> plugins = compiler.options.plugins;
  <span class="hljs-comment">// 去 plugins 中寻找有没有 ExtractTextPlugin 的实例</span>
  <span class="hljs-keyword">return</span> plugins.find(<span class="hljs-function"><span class="hljs-params">plugin</span>=&gt;</span>plugin.__proto__.constructor === ExtractTextPlugin) != <span class="hljs-literal">null</span>;
}</code></pre>
<h2 id="articleHeader7">实战</h2>
<p>下面我们举一个实际的例子，带你一步步去实现一个插件。</p>
<p>该插件的名称取名叫 EndWebpackPlugin，作用是在 Webpack 即将退出时再附加一些额外的操作，例如在 Webpack 成功编译和输出了文件后执行发布操作把输出的文件上传到服务器。<br>同时该插件还能区分 Webpack 构建是否执行成功。使用该插件时方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  plugins:[
    // 在初始化 EndWebpackPlugin 时传入了两个参数，分别是在成功时的回调函数和失败时的回调函数；
    new EndWebpackPlugin(() => {
      // Webpack 构建成功，并且文件输出了后会执行到这里，在这里可以做发布文件操作
    }, (err) => {
      // Webpack 构建失败，err 是导致错误的原因
      console.error(err);        
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">plugins</span>:[
    <span class="hljs-comment">// 在初始化 EndWebpackPlugin 时传入了两个参数，分别是在成功时的回调函数和失败时的回调函数；</span>
    <span class="hljs-keyword">new</span> EndWebpackPlugin(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-comment">// Webpack 构建成功，并且文件输出了后会执行到这里，在这里可以做发布文件操作</span>
    }, (err) =&gt; {
      <span class="hljs-comment">// Webpack 构建失败，err 是导致错误的原因</span>
      <span class="hljs-built_in">console</span>.error(err);        
    })
  ]
}</code></pre>
<p>要实现该插件，需要借助两个事件：</p>
<ul>
<li>
<strong>done</strong>：在成功构建并且输出了文件后，Webpack 即将退出时发生；</li>
<li>
<strong>failed</strong>：在构建出现异常导致构建失败，Webpack 即将退出时发生；</li>
</ul>
<p>实现该插件非常简单，完整代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class EndWebpackPlugin {

  constructor(doneCallback, failCallback) {
    // 存下在构造函数中传入的回调函数
    this.doneCallback = doneCallback;
    this.failCallback = failCallback;
  }

  apply(compiler) {
    compiler.plugin('done', (stats) => {
        // 在 done 事件中回调 doneCallback
        this.doneCallback(stats);
    });
    compiler.plugin('failed', (err) => {
        // 在 failed 事件中回调 failCallback
        this.failCallback(err);
    });
  }
}
// 导出插件 
module.exports = EndWebpackPlugin;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EndWebpackPlugin</span> </span>{

  <span class="hljs-keyword">constructor</span>(doneCallback, failCallback) {
    <span class="hljs-comment">// 存下在构造函数中传入的回调函数</span>
    <span class="hljs-keyword">this</span>.doneCallback = doneCallback;
    <span class="hljs-keyword">this</span>.failCallback = failCallback;
  }

  apply(compiler) {
    compiler.plugin(<span class="hljs-string">'done'</span>, (stats) =&gt; {
        <span class="hljs-comment">// 在 done 事件中回调 doneCallback</span>
        <span class="hljs-keyword">this</span>.doneCallback(stats);
    });
    compiler.plugin(<span class="hljs-string">'failed'</span>, (err) =&gt; {
        <span class="hljs-comment">// 在 failed 事件中回调 failCallback</span>
        <span class="hljs-keyword">this</span>.failCallback(err);
    });
  }
}
<span class="hljs-comment">// 导出插件 </span>
<span class="hljs-built_in">module</span>.exports = EndWebpackPlugin;</code></pre>
<p>从开发这个插件可以看出，找到合适的事件点去完成功能在开发插件时显得尤为重要。<br>在 <a>5-1工作原理概括</a> 中详细介绍过 Webpack 在运行过程中广播出常用事件，你可以从中找到你需要的事件。</p>
<blockquote>本实例<a href="https://github.com/gwuhaolin/end-webpack-plugin" rel="nofollow noreferrer" target="_blank">提供项目完整代码</a>
</blockquote>
<p><a href="http://webpack.wuhaolin.cn/" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000012544051?w=1348&amp;h=845" src="https://static.alili.tech/img/remote/1460000012544051?w=1348&amp;h=845" alt="" title="" style="cursor: pointer; display: inline;"></span></a></p>
<p><a href="http://webpack.wuhaolin.cn/" rel="nofollow noreferrer" target="_blank">《深入浅出Webpack》全书在线阅读链接</a></p>
<p><a href="http://webpack.wuhaolin.cn/5%E5%8E%9F%E7%90%86/5-4%E7%BC%96%E5%86%99Plugin.html" rel="nofollow noreferrer" target="_blank">阅读原文</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack原理-编写Plugin

## 原文链接
[https://segmentfault.com/a/1190000012840742](https://segmentfault.com/a/1190000012840742)


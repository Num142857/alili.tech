---
title: 'webpack源码之运行流程' 
date: 2018-12-07 2:30:09
hidden: true
slug: 5jjlnghbqq7
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">引言</h2>
<p>通过前面几张的铺垫,下面开始分析webpack源码核心流程,大体上可以分为初始化,编译,输出三个阶段,下面开始分析</p>
<h2 id="articleHeader1">初始化</h2>
<blockquote>这个阶段整体流程做了什么? 启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。</blockquote>
<h3 id="articleHeader2">详细分析</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//通过yargs获得shell中的参数
yargs.parse(process.argv.slice(2), (err, argv, output) => {
    //把webpack.config.js中的参数和shell参数整合到options对象上
    let options;
        options = require(&quot;./convert-argv&quot;)(argv);

    function processOptions(options) {

        const firstOptions = [].concat(options)[0];
        const webpack = require(&quot;webpack&quot;);

        let compiler;
            //通过webpack方法创建compile对象,Compiler 负责文件监听和启动编译。
            //Compiler 实例中包含了完整的 Webpack 配置，全局只有一个 Compiler 实例。
            compiler = webpack(options);


        if (firstOptions.watch || options.watch) {

            compiler.watch(watchOptions, compilerCallback);
            //启动一次新的编译。
        } else compiler.run(compilerCallback);
    }

    processOptions(options);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//通过yargs获得shell中的参数</span>
yargs.parse(process.argv.slice(<span class="hljs-number">2</span>), <span class="hljs-function">(<span class="hljs-params">err, argv, output</span>) =&gt;</span> {
    <span class="hljs-comment">//把webpack.config.js中的参数和shell参数整合到options对象上</span>
    <span class="hljs-keyword">let</span> options;
        options = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./convert-argv"</span>)(argv);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">processOptions</span>(<span class="hljs-params">options</span>) </span>{

        <span class="hljs-keyword">const</span> firstOptions = [].concat(options)[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);

        <span class="hljs-keyword">let</span> compiler;
            <span class="hljs-comment">//通过webpack方法创建compile对象,Compiler 负责文件监听和启动编译。</span>
            <span class="hljs-comment">//Compiler 实例中包含了完整的 Webpack 配置，全局只有一个 Compiler 实例。</span>
            compiler = webpack(options);


        <span class="hljs-keyword">if</span> (firstOptions.watch || options.watch) {

            compiler.watch(watchOptions, compilerCallback);
            <span class="hljs-comment">//启动一次新的编译。</span>
        } <span class="hljs-keyword">else</span> compiler.run(compilerCallback);
    }

    processOptions(options);
});</code></pre>
<p><strong>说明</strong> 从源码中摘取了初始化的的第一步,做了简化,当运行webpack命令的的时候,运行的是webpack-cli下webpack.js,其内容是一个自执行函数,上面是执行的第一步,进行参数的解析合并处理,并创建compiler实例,然后启动编译运行run方法,其中关键步骤 compiler = webpack(options); 详细展开如下所示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = (options, callback) => {
    //参数合法性校验
    const webpackOptionsValidationErrors = validateSchema(
        webpackOptionsSchema,
        options
    );

    let compiler;
    if (Array.isArray(options)) {
        compiler = new MultiCompiler(options.map(options => webpack(options)));
    } else if (typeof options === &quot;object&quot;) {
        options = new WebpackOptionsDefaulter().process(options);
        //创建compiler对象
        compiler = new Compiler(options.context);
        compiler.options = options;
        new NodeEnvironmentPlugin().apply(compiler);
        //注册配置文件中的插件,依次调用插件的 apply 方法，让插件可以监听后续的所有事件节点。同时给插件传入 compiler 实例的引用，以方便插件通过 compiler 调用 Webpack 提供的 API。
        if (options.plugins &amp;&amp; Array.isArray(options.plugins)) {
            for (const plugin of options.plugins) {
                plugin.apply(compiler);
            }
        }
        //开始应用 Node.js 风格的文件系统到 compiler 对象，以方便后续的文件寻找和读取。
        compiler.hooks.environment.call();
        compiler.hooks.afterEnvironment.call();
        //注册内部插件
        compiler.options = new WebpackOptionsApply().process(options, compiler);
    }

    return compiler;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>const webpack = (<span class="hljs-keyword">options</span>, callback) =&gt; {
    <span class="hljs-comment">//参数合法性校验</span>
    const webpackOptionsValidationErrors = validateSchema(
        webpackOptionsSchema,
        <span class="hljs-keyword">options</span>
    );

    let compiler;
    <span class="hljs-keyword">if</span> (Array.isArray(<span class="hljs-keyword">options</span>)) {
        compiler = <span class="hljs-keyword">new</span> MultiCompiler(<span class="hljs-keyword">options</span>.map(<span class="hljs-keyword">options</span> =&gt; webpack(<span class="hljs-keyword">options</span>)));
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (typeof <span class="hljs-keyword">options</span> === <span class="hljs-string">"object"</span>) {
        <span class="hljs-keyword">options</span> = <span class="hljs-keyword">new</span> WebpackOptionsDefaulter().process(<span class="hljs-keyword">options</span>);
        <span class="hljs-comment">//创建compiler对象</span>
        compiler = <span class="hljs-keyword">new</span> Compiler(<span class="hljs-keyword">options</span>.context);
        compiler.<span class="hljs-keyword">options</span> = <span class="hljs-keyword">options</span>;
        <span class="hljs-keyword">new</span> NodeEnvironmentPlugin().apply(compiler);
        <span class="hljs-comment">//注册配置文件中的插件,依次调用插件的 apply 方法，让插件可以监听后续的所有事件节点。同时给插件传入 compiler 实例的引用，以方便插件通过 compiler 调用 Webpack 提供的 API。</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">options</span>.plugins &amp;&amp; Array.isArray(<span class="hljs-keyword">options</span>.plugins)) {
            <span class="hljs-keyword">for</span> (const plugin of <span class="hljs-keyword">options</span>.plugins) {
                plugin.apply(compiler);
            }
        }
        <span class="hljs-comment">//开始应用 Node.js 风格的文件系统到 compiler 对象，以方便后续的文件寻找和读取。</span>
        compiler.hooks.environment.<span class="hljs-keyword">call</span>();
        compiler.hooks.afterEnvironment.<span class="hljs-keyword">call</span>();
        <span class="hljs-comment">//注册内部插件</span>
        compiler.<span class="hljs-keyword">options</span> = <span class="hljs-keyword">new</span> WebpackOptionsApply().process(<span class="hljs-keyword">options</span>, compiler);
    }

    <span class="hljs-keyword">return</span> compiler;
};</code></pre>
<p><strong>说明</strong>  注册插件过程不在展开,webpack内置插件真的很多啊</p>
<h2 id="articleHeader3">编译</h2>
<blockquote>这个阶段整体流程做了什么? 从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理。</blockquote>
<h3 id="articleHeader4">详细分析</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.hooks.beforeRun.callAsync(this, err => {
            if (err) return finalCallback(err);

            this.hooks.run.callAsync(this, err => {
                if (err) return finalCallback(err);

                this.readRecords(err => {
                    if (err) return finalCallback(err);

                    this.compile(onCompiled);
                });
            });
        });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.hooks.beforeRun.callAsync(<span class="hljs-keyword">this</span>, err =&gt; {
            <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> finalCallback(err);

            <span class="hljs-keyword">this</span>.hooks.run.callAsync(<span class="hljs-keyword">this</span>, err =&gt; {
                <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> finalCallback(err);

                <span class="hljs-keyword">this</span>.readRecords(err =&gt; {
                    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> finalCallback(err);

                    <span class="hljs-keyword">this</span>.compile(onCompiled);
                });
            });
        });</code></pre>
<p><strong>说明</strong> 从执行run方法开始,开始执行编译流程,run方法触发了before-run、run两个事件，然后通过readRecords读取文件，通过compile进行打包,该方法中实例化了一个Compilation类</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="compile(callback) {
        const params = this.newCompilationParams();
        this.hooks.beforeCompile.callAsync(params, err => {
            if (err) return callback(err);

            this.hooks.compile.call(params);
// 每编译一次都会创建一个compilation对象（比如watch 文件时，一改动就会执行），但是compile只会创建一次
            const compilation = this.newCompilation(params);
// make事件触发了  事件会触发SingleEntryPlugin监听函数，调用compilation.addEntry方法
            this.hooks.make.callAsync(compilation, err => {
                if (err) return callback(err);
                
            });
        });
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>compile(<span class="hljs-keyword">callback</span>) {
        const params = <span class="hljs-built_in">this</span>.<span class="hljs-keyword">new</span><span class="hljs-type">CompilationParams</span>();
        <span class="hljs-built_in">this</span>.hooks.beforeCompile.callAsync(params, err =&gt; {
            <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> <span class="hljs-keyword">callback</span>(err);

            <span class="hljs-built_in">this</span>.hooks.compile.call(params);
<span class="hljs-comment">// 每编译一次都会创建一个compilation对象（比如watch 文件时，一改动就会执行），但是compile只会创建一次</span>
            const compilation = <span class="hljs-built_in">this</span>.<span class="hljs-keyword">new</span><span class="hljs-type">Compilation</span>(params);
<span class="hljs-comment">// make事件触发了  事件会触发SingleEntryPlugin监听函数，调用compilation.addEntry方法</span>
            <span class="hljs-built_in">this</span>.hooks.make.callAsync(compilation, err =&gt; {
                <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> <span class="hljs-keyword">callback</span>(err);
                
            });
        });
    }</code></pre>
<p><strong>说明</strong>  打包时触发before-compile、compile、make等事件,同时创建非常重要的compilation对象,内部有声明了很多钩子,初始化模板等等</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.hooks = {
    buildModule: new SyncHook([&quot;module&quot;]),
    seal: new SyncHook([]),
    optimize: new SyncHook([]),
};
//拼接最终生成代码的主模板会用到
this.mainTemplate = new MainTemplate(this.outputOptions);
//拼接最终生成代码的chunk模板会用到
this.chunkTemplate = new ChunkTemplate(this.outputOptions); 
 //拼接最终生成代码的热更新模板会用到
this.hotUpdateChunkTemplate = new HotUpdateChunkTemplate()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">this</span>.hooks = {
    buildModule: <span class="hljs-keyword">new</span> SyncHook([<span class="hljs-string">"module"</span>]),
    seal: <span class="hljs-keyword">new</span> SyncHook([]),
    optimize: <span class="hljs-keyword">new</span> SyncHook([]),
};
<span class="hljs-comment">//拼接最终生成代码的主模板会用到</span>
<span class="hljs-keyword">this</span>.mainTemplate = <span class="hljs-keyword">new</span> MainTemplate(<span class="hljs-keyword">this</span>.outputOptions);
<span class="hljs-comment">//拼接最终生成代码的chunk模板会用到</span>
<span class="hljs-keyword">this</span>.chunkTemplate = <span class="hljs-keyword">new</span> ChunkTemplate(<span class="hljs-keyword">this</span>.outputOptions); 
 <span class="hljs-comment">//拼接最终生成代码的热更新模板会用到</span>
<span class="hljs-keyword">this</span>.hotUpdateChunkTemplate = <span class="hljs-keyword">new</span> HotUpdateChunkTemplate()
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//监听comple的make hooks事件，通过内部的 SingleEntryPlugin 从入口文件开始执行编译
        compiler.hooks.make.tapAsync(
            &quot;SingleEntryPlugin&quot;,
            (compilation, callback) => {
                const { entry, name, context } = this;

                const dep = SingleEntryPlugin.createDependency(entry, name);
                compilation.addEntry(context, dep, name, callback);
            }
        );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//监听comple的make hooks事件，通过内部的 SingleEntryPlugin 从入口文件开始执行编译</span>
        compiler.hooks.make.tapAsync(
            <span class="hljs-string">"SingleEntryPlugin"</span>,
            <span class="hljs-function">(<span class="hljs-params">compilation, callback</span>) =&gt;</span> {
                <span class="hljs-keyword">const</span> { entry, name, context } = <span class="hljs-keyword">this</span>;

                <span class="hljs-keyword">const</span> dep = SingleEntryPlugin.createDependency(entry, name);
                compilation.addEntry(context, dep, name, callback);
            }
        );</code></pre>
<p><strong>说明</strong>  监听compile的make hooks事件，通过内部的 SingleEntryPlugin 从入口文件开始执行编译,调用compilation.addEntry方法,根据模块的类型获取对应的模块工厂并创建模块,开始构建模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
doBuild(options, compilation, resolver, fs, callback) {
    const loaderContext = this.createLoaderContext(
        resolver,
        options,
        compilation,
        fs
    );
    //调用loader处理模块
    runLoaders(
        {
            resource: this.resource,
            loaders: this.loaders,
            context: loaderContext,
            readResource: fs.readFile.bind(fs)
        },
        (err, result) => {
           
            
            const resourceBuffer = result.resourceBuffer;
            const source = result.result[0];
            const sourceMap = result.result.length >= 1 ? result.result[1] : null;
            const extraInfo = result.result.length >= 2 ? result.result[2] : null;
            

            this._source = this.createSource(
                this.binary ? asBuffer(source) : asString(source),
                resourceBuffer,
                sourceMap
            );
            //loader处理完之后 得到_source  然后ast接着处理
            this._ast =
                typeof extraInfo === &quot;object&quot; &amp;&amp;
                extraInfo !== null &amp;&amp;
                extraInfo.webpackAST !== undefined
                    ? extraInfo.webpackAST
                    : null;
            return callback();
        }
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>
doBuild(options, compilation, resolver, fs, callback) {
    <span class="hljs-keyword">const</span> loaderContext = <span class="hljs-keyword">this</span>.createLoaderContext(
        resolver,
        options,
        compilation,
        fs
    );
    <span class="hljs-comment">//调用loader处理模块</span>
    runLoaders(
        {
            resource: <span class="hljs-keyword">this</span>.resource,
            loaders: <span class="hljs-keyword">this</span>.loaders,
            context: loaderContext,
            readResource: fs.readFile.bind(fs)
        },
        <span class="hljs-function">(<span class="hljs-params">err, result</span>) =&gt;</span> {
           
            
            <span class="hljs-keyword">const</span> resourceBuffer = result.resourceBuffer;
            <span class="hljs-keyword">const</span> source = result.result[<span class="hljs-number">0</span>];
            <span class="hljs-keyword">const</span> sourceMap = result.result.length &gt;= <span class="hljs-number">1</span> ? result.result[<span class="hljs-number">1</span>] : <span class="hljs-literal">null</span>;
            <span class="hljs-keyword">const</span> extraInfo = result.result.length &gt;= <span class="hljs-number">2</span> ? result.result[<span class="hljs-number">2</span>] : <span class="hljs-literal">null</span>;
            

            <span class="hljs-keyword">this</span>._source = <span class="hljs-keyword">this</span>.createSource(
                <span class="hljs-keyword">this</span>.binary ? asBuffer(source) : asString(source),
                resourceBuffer,
                sourceMap
            );
            <span class="hljs-comment">//loader处理完之后 得到_source  然后ast接着处理</span>
            <span class="hljs-keyword">this</span>._ast =
                <span class="hljs-keyword">typeof</span> extraInfo === <span class="hljs-string">"object"</span> &amp;&amp;
                extraInfo !== <span class="hljs-literal">null</span> &amp;&amp;
                extraInfo.webpackAST !== <span class="hljs-literal">undefined</span>
                    ? extraInfo.webpackAST
                    : <span class="hljs-literal">null</span>;
            <span class="hljs-keyword">return</span> callback();
        }
    );
}</code></pre>
<p><strong>说明</strong>  SingleEntryPlugin这个内存插件主要作用是从entry读取文件,根据文件类型和配置的 Loader 执行runLoaders,然后将loader处理后的文件通过acorn抽象成抽象语法树AST,遍历AST，构建该模块的所有依赖。</p>
<h2 id="articleHeader5">输出</h2>
<blockquote>这个阶段整体流程做了什么? 把编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统。</blockquote>
<h3 id="articleHeader6">详细分析</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //所有依赖build完成，开始对chunk进行优化（抽取公共模块、加hash等）
compilation.seal(err => {
    if (err) return callback(err);

    this.hooks.afterCompile.callAsync(compilation, err => {
        if (err) return callback(err);

        return callback(null, compilation);
    });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code> <span class="hljs-comment">//所有依赖build完成，开始对chunk进行优化（抽取公共模块、加hash等）</span>
compilation.seal(<span class="hljs-keyword">err</span> =&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span>) <span class="hljs-keyword">return</span> callback(<span class="hljs-keyword">err</span>)<span class="hljs-comment">;</span>

    this.hooks.afterCompile.callAsync(compilation, <span class="hljs-keyword">err</span> =&gt; {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span>) <span class="hljs-keyword">return</span> callback(<span class="hljs-keyword">err</span>)<span class="hljs-comment">;</span>

        <span class="hljs-keyword">return</span> callback(null, compilation)<span class="hljs-comment">;</span>
    })<span class="hljs-comment">;</span>
})<span class="hljs-comment">;</span>
</code></pre>
<p><strong>说明</strong>  compilation.seal主要是对chunk进行优化,生成编译后的源码,比较重要,详细展开如下所示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//代码生成前面优化
this.hooks.optimize.call();
this.hooks.optimizeTree.callAsync(this.chunks, this.modules, err => {
 
    this.hooks.beforeHash.call();
    this.createHash();
    this.hooks.afterHash.call();

    if (shouldRecord) this.hooks.recordHash.call(this.records);

    this.hooks.beforeModuleAssets.call();
    this.createModuleAssets();
    if (this.hooks.shouldGenerateChunkAssets.call() !== false) {
        this.hooks.beforeChunkAssets.call();
        //生成最终打包输出的chunk资源,根据template文件,详细步骤如下所示
        this.createChunkAssets();
    }
    
});
--------------------------------------
//取出最后文件需要的模板
const template = chunk.hasRuntime()
                    ? this.mainTemplate
                    : this.chunkTemplate;
//通过模板最终生成webpack_require格式的内容,他这个是内部封装的拼接渲染逻辑,也没用什么ejs,handlebar等这些模板工具
source = fileManifest.render();
//生成的资源保存在compilation.assets,方便下一步emitAssets步骤中,把文件输出到硬盘
this.assets[file] = source;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//代码生成前面优化</span>
<span class="hljs-keyword">this</span>.hooks.optimize.call();
<span class="hljs-keyword">this</span>.hooks.optimizeTree.callAsync(<span class="hljs-keyword">this</span>.chunks, <span class="hljs-keyword">this</span>.modules, err =&gt; {
 
    <span class="hljs-keyword">this</span>.hooks.beforeHash.call();
    <span class="hljs-keyword">this</span>.createHash();
    <span class="hljs-keyword">this</span>.hooks.afterHash.call();

    <span class="hljs-keyword">if</span> (shouldRecord) <span class="hljs-keyword">this</span>.hooks.recordHash.call(<span class="hljs-keyword">this</span>.records);

    <span class="hljs-keyword">this</span>.hooks.beforeModuleAssets.call();
    <span class="hljs-keyword">this</span>.createModuleAssets();
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.hooks.shouldGenerateChunkAssets.call() !== <span class="hljs-literal">false</span>) {
        <span class="hljs-keyword">this</span>.hooks.beforeChunkAssets.call();
        <span class="hljs-comment">//生成最终打包输出的chunk资源,根据template文件,详细步骤如下所示</span>
        <span class="hljs-keyword">this</span>.createChunkAssets();
    }
    
});
--------------------------------------
<span class="hljs-comment">//取出最后文件需要的模板</span>
const template = chunk.hasRuntime()
                    ? <span class="hljs-keyword">this</span>.mainTemplate
                    : <span class="hljs-keyword">this</span>.chunkTemplate;
<span class="hljs-comment">//通过模板最终生成webpack_require格式的内容,他这个是内部封装的拼接渲染逻辑,也没用什么ejs,handlebar等这些模板工具</span>
source = fileManifest.render();
<span class="hljs-comment">//生成的资源保存在compilation.assets,方便下一步emitAssets步骤中,把文件输出到硬盘</span>
<span class="hljs-keyword">this</span>.assets[file] = source;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //把处理好的assets输出到output的path中
    emitAssets(compilation, callback) {
        let outputPath;
    
        const emitFiles = err => {
            if (err) return callback(err);
    
            asyncLib.forEach(
                compilation.assets,
                (source, file, callback) => {
                    const writeOut = err => {
                        //输出打包后的文件到配置中指定的目录下
                        this.outputFileSystem.writeFile(targetPath, content, callback);
                    };
    
                    writeOut();
                }
            );
        };
    
        this.hooks.emit.callAsync(compilation, err => {
            if (err) return callback(err);
            outputPath = compilation.getPath(this.outputPath);
            this.outputFileSystem.mkdirp(outputPath, emitFiles);
        });
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>    <span class="hljs-comment">//把处理好的assets输出到output的path中</span>
    emitAssets(compilation, callback) {
        <span class="hljs-keyword">let</span> outputPath;
    
        <span class="hljs-keyword">const</span> emitFiles = <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(err);
    
            asyncLib.forEach(
                compilation.assets,
                <span class="hljs-function">(<span class="hljs-params">source, file, callback</span>) =&gt;</span> {
                    <span class="hljs-keyword">const</span> writeOut = <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
                        <span class="hljs-comment">//输出打包后的文件到配置中指定的目录下</span>
                        <span class="hljs-keyword">this</span>.outputFileSystem.writeFile(targetPath, content, callback);
                    };
    
                    writeOut();
                }
            );
        };
    
        <span class="hljs-keyword">this</span>.hooks.emit.callAsync(compilation, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(err);
            outputPath = compilation.getPath(<span class="hljs-keyword">this</span>.outputPath);
            <span class="hljs-keyword">this</span>.outputFileSystem.mkdirp(outputPath, emitFiles);
        });
    }
</code></pre>
<h2 id="articleHeader7">总结</h2>
<p>如果单独看这篇文章的话,理解起来会比较困难,推荐一下与之相关的系列铺垫文章,上面是我对webpack源码运行流程的总结,  整个流程已经跑通了,不过还有蛮多点值得深入挖掘的。清明在家宅了3天,过得好快,明天公司组织去奥森公园寻宝行动,期待ing 。</p>
<p>推荐<br><a href="https://segmentfault.com/a/1190000014031536">webpack源码之tapable</a><br><a href="https://segmentfault.com/a/1190000014056619" target="_blank">webpack源码之plugin机制</a><br><a href="https://segmentfault.com/a/1190000014178462">webpack源码之ast简介</a><br><a href="https://segmentfault.com/a/1190000014205729" target="_blank">webpack源码之loader机制</a></p>
<p>参考源码<br>webpack: "4.4.1"<br>webpack-cli: "2.0.13"</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack源码之运行流程

## 原文链接
[https://segmentfault.com/a/1190000014221014](https://segmentfault.com/a/1190000014221014)


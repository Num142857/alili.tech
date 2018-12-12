---
title: '腾讯IVWEB前端工程化工具feflow思考与实践' 
date: 2018-12-13 2:30:07
hidden: true
slug: sk5oogl3f3s
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000013362603?w=1200&amp;h=400" src="https://static.alili.tech/img/remote/1460000013362603?w=1200&amp;h=400" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>本篇文章主要介绍<a href="https://ivweb.io/" rel="nofollow noreferrer" target="_blank">腾讯IVWEB团队</a>从0到1在工程化的思考和实践。<a href="https://github.com/feflow/feflow" rel="nofollow noreferrer" target="_blank">feflow</a>的全称是Front-end flow（前端工作流），致力于提升研发效率和规范的工程化解决方案。愿景是通过feflow，可以使项目创建、开发、构建、规范检查到最终项目上线的整个过程更加自动化和标准化。</p>
<h3 id="articleHeader0">要解决的问题</h3>
<ul>
<li>项目的目录结构按约定生成</li>
<li>团队有一套开发规范进行约束</li>
<li>支持多种类型的构建，包括Fis构建和webpack构建</li>
<li>团队内部的代码贡献统计、离线包内置App等</li>
</ul>
<p>为了解决上述问题，我们于17年2月底开始投入工程化feflow工具的开发和相关规范的制定，目前已经研发出了 feflow 的 <a href="https://github.com/feflow/feflow" rel="nofollow noreferrer" target="_blank">CLI</a> 版本，后续会推出 GUI 版本。</p>
<h3 id="articleHeader1">架构设计</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013362604?w=1544&amp;h=809" src="https://static.alili.tech/img/remote/1460000013362604?w=1544&amp;h=809" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>为了让 feflow 的具有高可扩展性，我们设计了4层结构，分别是：插件生态、内核层、参数解析器和控制台。除了贯穿整个开发工作流的基础命令选择通过内部插件内置在CLI 的Core里面，其它非必要命令统一通过插件机制进行扩展。</p>
<p>另一方面，为了使得 feflow 能够适用多种类型的项目。我们开发了多种类型的业务脚手架，如：活动模板、App H5模板、RN模板和业务组件模板。</p>
<h3 id="articleHeader2">执行过程</h3>
<p>当用户在控制台里面输入某个命令。首先会通过CLI 的参数解析器，将这个命令解析成一个object对象，然后传递给CLI 的内核。所有的命令都是通过内核上下文提供的 register 函数 进行注册的，一方面内核自身会读取内置插件 注册的基础命令，另一方面，内核会读取本地已经安装的外部插件注册的命令。如果找到用户输入的命令则开始执行命令对应的回调函数。</p>
<h3 id="articleHeader3">基础命令设计</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 初始化项目
$ feflow init

# 本地开发
$ feflow dev

# 代码质量检查
$ feflow lint

# 打包构建
$ feflow build

# 代码发布
$ feflow publish

# 安装插件、脚手架等
$ feflow install package

# 配置本地客户端，如: npm 的源和 proxy
$ feflow config <key> <value>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-comment"># 初始化项目</span>
<span class="hljs-variable">$ </span>feflow init

<span class="hljs-comment"># 本地开发</span>
<span class="hljs-variable">$ </span>feflow dev

<span class="hljs-comment"># 代码质量检查</span>
<span class="hljs-variable">$ </span>feflow lint

<span class="hljs-comment"># 打包构建</span>
<span class="hljs-variable">$ </span>feflow build

<span class="hljs-comment"># 代码发布</span>
<span class="hljs-variable">$ </span>feflow publish

<span class="hljs-comment"># 安装插件、脚手架等</span>
<span class="hljs-variable">$ </span>feflow install package

<span class="hljs-comment"># 配置本地客户端，如: npm 的源和 proxy</span>
<span class="hljs-variable">$ </span>feflow config &lt;key&gt; &lt;value&gt;</code></pre>
<p>前面提到，CLI 的命令包含两部分，分别是内置在内核里的基础命令和外部插件提供的命令。那么外部插件要如何设计呢？</p>
<h3 id="articleHeader4">插件机制设计</h3>
<h4>插件实现原理</h4>
<p>这里有一个非常巧妙的设计，通过使用node提供的module和vm模块，可以通注入feflow全局变量来访问到cli的实例。从而能够访问cli上的各种属性，比如config, log和一些helper等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" loadPlugin(path, callback) {
    const self = this;

    return fs.readFile(path).then((script) => {

      const module = new Module(path);
      module.filename = path;
      module.paths = Module._nodeModulePaths(path);

      function require(path) {
          return module.require(path);
      }

      require.resolve = function(request) {
          return Module._resolveFilename(request, module);
      };

      require.main = process.mainModule;
      require.extensions = Module._extensions;
      require.cache = Module._cache;

      // Inject feflow variable
      script = '(function(exports, require, module, __filename, __dirname, feflow){' +
          script + '});';

      const fn = vm.runInThisContext(script, path);

      return fn(module.exports, require, module, path, pathFn.dirname(path), self);
      }).asCallback(callback);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> loadPlugin(path, callback) {
    <span class="hljs-keyword">const</span> self = <span class="hljs-keyword">this</span>;

    <span class="hljs-keyword">return</span> fs.readFile(path).then(<span class="hljs-function">(<span class="hljs-params">script</span>) =&gt;</span> {

      <span class="hljs-keyword">const</span> <span class="hljs-built_in">module</span> = <span class="hljs-keyword">new</span> Module(path);
      <span class="hljs-built_in">module</span>.filename = path;
      <span class="hljs-built_in">module</span>.paths = Module._nodeModulePaths(path);

      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">require</span>(<span class="hljs-params">path</span>) </span>{
          <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.require(path);
      }

      <span class="hljs-built_in">require</span>.resolve = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request</span>) </span>{
          <span class="hljs-keyword">return</span> Module._resolveFilename(request, <span class="hljs-built_in">module</span>);
      };

      <span class="hljs-built_in">require</span>.main = process.mainModule;
      <span class="hljs-built_in">require</span>.extensions = Module._extensions;
      <span class="hljs-built_in">require</span>.cache = Module._cache;

      <span class="hljs-comment">// Inject feflow variable</span>
      script = <span class="hljs-string">'(function(exports, require, module, __filename, __dirname, feflow){'</span> +
          script + <span class="hljs-string">'});'</span>;

      <span class="hljs-keyword">const</span> fn = vm.runInThisContext(script, path);

      <span class="hljs-keyword">return</span> fn(<span class="hljs-built_in">module</span>.exports, <span class="hljs-built_in">require</span>, <span class="hljs-built_in">module</span>, path, pathFn.dirname(path), self);
      }).asCallback(callback);
  }</code></pre>
<h4>命令注册：</h4>
<p>命令需要以feflow.cmd.register进行注册，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="feflow.cmd.register('deps', 'Config ivweb dependencies', function(args) {
    console.log(args);
    // Plugin logic here.
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>feflow.cmd.register(<span class="hljs-string">'deps'</span>, <span class="hljs-string">'Config ivweb dependencies'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">args</span>) </span>{
    <span class="hljs-built_in">console</span>.log(args);
    <span class="hljs-comment">// Plugin logic here.</span>
});</code></pre>
<p>说明：</p>
<ul>
<li>register有3个参数，第一个是子命令名称，第二个是命令描述说明信息，第三个是对应的子命令执行逻辑函数。</li>
<li>feflow会将命令行参数args解析成Object对象，传递给插件处理函数</li>
</ul>
<h4>配置</h4>
<p>可以通过feflow.version获取当前feflow的版本，feflow.baseDir 获取feflow跟目录（在用户目录下的.feflow），通过feflow.pluginDir 获取插件目录</p>
<h4>日志</h4>
<p>通过feflow.log来进行相关命令行日志输出</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const log = feflow.log;
log.info() &nbsp;  // 提示日志，控制台中显示绿色
log.debug() &nbsp; // 调试日志,  命令行增加--debug可以开启，控制台中显示灰色
log.warn() &nbsp;  // 警告日志，控制台中显示黄色背景
log.error() &nbsp; // 错误日志，控制台中显示红色
log.fatal() &nbsp; // 致命错误日志，，控制台中显示红色" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>const <span class="hljs-built_in">log</span> = feflow.<span class="hljs-built_in">log</span>;
<span class="hljs-built_in">log</span>.info() &nbsp;  <span class="hljs-comment">// 提示日志，控制台中显示绿色</span>
<span class="hljs-built_in">log</span>.<span class="hljs-keyword">debug</span>() &nbsp; <span class="hljs-comment">// 调试日志,  命令行增加--debug可以开启，控制台中显示灰色</span>
<span class="hljs-built_in">log</span>.warn() &nbsp;  <span class="hljs-comment">// 警告日志，控制台中显示黄色背景</span>
<span class="hljs-built_in">log</span>.<span class="hljs-built_in">error</span>() &nbsp; <span class="hljs-comment">// 错误日志，控制台中显示红色</span>
<span class="hljs-built_in">log</span>.fatal() &nbsp; <span class="hljs-comment">// 致命错误日志，，控制台中显示红色</span></code></pre>
<h4>安装</h4>
<p>插件开发完成后，可以通过 feflow 提供的 install 命令安装插件。安装的插件会放置在本地客户端 ~/.feflow/node_modules 文件夹下，并且写入到 ~/.feflow/package.json 中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ feflow install feflow-plugin-xxx   // 安装某个插件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">$ feflow <span class="hljs-keyword">install</span> feflow-<span class="hljs-keyword">plugin</span>-xxx   // 安装某个插件</code></pre>
<p>之后每次运行命令时，便会从本地加载插件所注册的命令</p>
<h3 id="articleHeader5">全量更新和增量更新</h3>
<p>当CLI发布了一个新的版本，可能我们会废弃掉某些功能或者提供了新功能。这个时候如果用户依然使用的是旧版本，由于某些服务已经废弃掉了则会报错。在这种新旧版本不兼容的情况下，如何强制用户进行CLI的升级呢？需要在运行命令之前检查本地的CLI是否和远程提供的新版本是否兼容。在新旧版本不兼容时，会强制全量更新。如何判断当前用户安装的本地版本和远程最新版本是否兼容呢？</p>
<p>这里非常巧妙的运用了一下 npm 的 registry机制，每次发布新版本，我们会在 package.json 里面新增一个自定义字段 compatibleVersion，它的值是一个 semver 的版本号。本地检查时，会读取本地已经安装的版本和远程最新的版本进行比较，看看是否满足 compatibleVersion 的要求。如果不满足，则会自动运行 <code>npm install feflow-cli</code> 到最新的版本。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &quot;configs&quot;: {
    &quot;compatibleVersion&quot;: &quot;>=0.13.0&quot;
 }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code> <span class="hljs-string">"configs"</span>: {
    <span class="hljs-string">"compatibleVersion"</span>: <span class="hljs-string">"&gt;=0.13.0"</span>
 },</code></pre>
<p>对于插件，采取的是增量更新机制。每个发布到 npm 上的插件的package.json 中同样会有上面的这个字段，对于本地安装的不兼容的插件列表，会采取增量更新。</p>
<h3 id="articleHeader6">多类型脚手架的架构设计</h3>
<p>项目拷贝存在的问题显而易见，大致有以下三个方面：</p>
<ul>
<li>容易出错；一旦某个关键文件拷贝丢失或者错误，很可能需要耗费半天到一天的时间排查环境问题。</li>
<li>不同场景下对目录结构要求不同；平时开发过程中，工程通常会分为运营活动、Hybrid业务、入口级别的项目（对性能和体验有极致和苛刻的要求）。需要基于RN或者Node.js的首屏直出，还有常用的业务组件等的开发。</li>
<li>新的Feature和BugFix难以同步；某个同学开发过程中增加的新方法或者解决的bug很难传递给其它同学并且沉淀成经验积累下来。</li>
</ul>
<p>社区里面提供了完美的Yeoman解决方案，它是为了自动化项目的创建而生。Yeoman创建项目包括以下几个阶段：</p>
<ul>
<li>initializing:  初始化一些状态之类的，通常是和用户输入的 options 或者 arguments 打交道</li>
<li>prompting: 和用户交互的时候（命令行问答之类的）调用</li>
<li>configuring: 保存配置文件（如 .babelrc 等）</li>
<li>writing: 生成模板文件</li>
<li>install: 安装依赖</li>
<li>end:  结束部分，初始代码自动提交</li>
</ul>
<p>我们只需要继承Yeoman的Generator类做模板定制化，基于Yeoman的脚手架设计思路应该如下图所示：<br><span class="img-wrap"><img data-src="/img/remote/1460000013362605" src="https://static.alili.tech/img/remote/1460000013362605" alt="" title="" style="cursor: pointer;"></span></p>
<p>当开发者输入 feflow init 命令时，开发者会告诉CLI需要创建哪一种类型的项目，CLI收到命令后。从本地已经安装的Yeoman脚手架里面选择某种类型的模板。然后，CLI会调用Gitlab API在远程创建仓库并且授予开发者master权限。接下来，会根据实际业务场景需要，自动化申请一些打点信息，常见的如离线包id，监控告警id等等。之后，在本地目录生成代码并且安装项目依赖的npm包，最后将本次初始化生成的所有代码自动提交到远程Git仓库。</p>
<h3 id="articleHeader7">多类型主流构建支持</h3>
<p>为了让feflow 支持多种类型的构建环境，比如 Fis3 和 webpack，或者前不久刚推出的号称零配置成本的 Parcel 构建。在每个项目的跟目录会放置一份配置文件，名称为 feflow.json。它的配置可能是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;builderType&quot;: &quot;builder-webpack3&quot;,
    &quot;builderOptions&quot;: {
        &quot;moduleName&quot;: &quot;mobile&quot;,
        &quot;bizName&quot;: &quot;category&quot;,
        &quot;minifyHTML&quot;: true,
        &quot;minifyCSS&quot;: true,
        &quot;minifyJS&quot;: true,
        &quot;usePx2rem&quot;: true,
        &quot;remUnit&quot;: 100,
        &quot;remPrecision&quot;: 8,
        &quot;inject&quot;: true,
        &quot;port&quot;: 8001
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"builderType"</span>: <span class="hljs-string">"builder-webpack3"</span>,
    <span class="hljs-attr">"builderOptions"</span>: {
        <span class="hljs-attr">"moduleName"</span>: <span class="hljs-string">"mobile"</span>,
        <span class="hljs-attr">"bizName"</span>: <span class="hljs-string">"category"</span>,
        <span class="hljs-attr">"minifyHTML"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"minifyCSS"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"minifyJS"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"usePx2rem"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"remUnit"</span>: <span class="hljs-number">100</span>,
        <span class="hljs-attr">"remPrecision"</span>: <span class="hljs-number">8</span>,
        <span class="hljs-attr">"inject"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"port"</span>: <span class="hljs-number">8001</span>
    }
}</code></pre>
<p>builderType为构建的npm包，builderOptions为构建的参数配置。</p>
<h3 id="articleHeader8">最后</h3>
<p>腾讯IVWEB团队的工程化解决方案feflow已经开源：Github主页：<a href="https://github.com/feflow/feflow" rel="nofollow noreferrer" target="_blank">https://github.com/feflow/feflow</a> </p>
<p>如果对您的团队或者项目有帮助，请给个Star支持一下哈～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
腾讯IVWEB前端工程化工具feflow思考与实践

## 原文链接
[https://segmentfault.com/a/1190000013362598](https://segmentfault.com/a/1190000013362598)


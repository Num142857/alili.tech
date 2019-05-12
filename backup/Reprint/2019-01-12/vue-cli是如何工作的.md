---
title: 'vue-cli是如何工作的' 
date: 2019-01-12 2:30:24
hidden: true
slug: p488k5svzjc
categories: [reprint]
---

{{< raw >}}

                    
<p>vue-cli是Vue.js官方脚手架命令行工具，我们可以用它快速搭建Vue.js项目，vue-cli最主要的功能就是初始化项目，既可以使用官方模板，也可以使用自定义模板生成项目，而且从2.8.0版本开始，vue-cli新增了<code>build</code>命令，能让你零配置启动一个Vue.js应用。接下来，我们一起探究一下vue-cli是如何工作的。</p>
<h4>全局安装</h4>
<p>首先，vue-cli是一个node包，且可以在终端直接通过<code>vue</code>命令调用，所以vue-cli需要全局安装，当npm全局安装一个包时，主要做了两件事：</p>
<ol>
<li><p>将包安装到全局的node_modules目录下。</p></li>
<li><p>在bin目录下创建对应的命令，并链接到对应的可执行脚本。</p></li>
</ol>
<p>看一下vue-cli的package.json，可以发现如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;bin&quot;: {
    &quot;vue&quot;: &quot;bin/vue&quot;,
    &quot;vue-init&quot;: &quot;bin/vue-init&quot;,
    &quot;vue-list&quot;: &quot;bin/vue-list&quot;,
    &quot;vue-build&quot;: &quot;bin/vue-build&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"bin"</span>: {
    <span class="hljs-attr">"vue"</span>: <span class="hljs-string">"bin/vue"</span>,
    <span class="hljs-attr">"vue-init"</span>: <span class="hljs-string">"bin/vue-init"</span>,
    <span class="hljs-attr">"vue-list"</span>: <span class="hljs-string">"bin/vue-list"</span>,
    <span class="hljs-attr">"vue-build"</span>: <span class="hljs-string">"bin/vue-build"</span>
  }
}</code></pre>
<p>这样在全局安装vue-cli后，npm会帮你注册<code>vue</code>, <code>vue-init</code>, <code>vue-list</code>, <code>vue-build</code>这几个命令。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009803946" src="https://static.alili.tech/img/remote/1460000009803946" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>项目结构</h4>
<p>vue-cli项目本身也不大，项目结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── bin
├── docs
├── lib
└── test
    └── e2e" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>.
├── bin
├── docs
├── <span class="hljs-class"><span class="hljs-keyword">lib</span></span>
└── test
    └── e2e</code></pre>
<p><code>bin</code>目录下是可执行文件，<code>docs</code>下是新特性<code>vue build</code>的文档，<code>lib</code>是拆分出来的类库，<code>test</code>下是测试文件，我们着重看<code>bin</code>目录下的文件即可。</p>
<h4>bin/vue</h4>
<p>首先看<code>bin/vue</code>，内容很简短，只有如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node

require('commander')
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('init', 'generate a new project from a template')
  .command('list', 'list available official templates')
  .command('build', 'prototype a new project')
  .parse(process.argv)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>#!/<span class="hljs-selector-tag">usr</span>/<span class="hljs-selector-tag">bin</span>/<span class="hljs-selector-tag">env</span> <span class="hljs-selector-tag">node</span>

<span class="hljs-selector-tag">require</span>(<span class="hljs-string">'commander'</span>)
  <span class="hljs-selector-class">.version</span>(require(<span class="hljs-string">'../package'</span>).version)
  <span class="hljs-selector-class">.usage</span>(<span class="hljs-string">'&lt;command&gt; [options]'</span>)
  <span class="hljs-selector-class">.command</span>(<span class="hljs-string">'init'</span>, <span class="hljs-string">'generate a new project from a template'</span>)
  <span class="hljs-selector-class">.command</span>(<span class="hljs-string">'list'</span>, <span class="hljs-string">'list available official templates'</span>)
  <span class="hljs-selector-class">.command</span>(<span class="hljs-string">'build'</span>, <span class="hljs-string">'prototype a new project'</span>)
  <span class="hljs-selector-class">.parse</span>(process.argv)</code></pre>
<p>vue-cli是基于<a href="https://github.com/tj/commander.js" rel="nofollow noreferrer" target="_blank">commander.js</a>写的，支持<a href="https://github.com/tj/commander.js#git-style-sub-commands" rel="nofollow noreferrer" target="_blank">Git-style sub-commands</a>,所以执行<code>vue init</code>可以达到和<code>vue-init</code>同样的效果。</p>
<h4>bin/vue-init</h4>
<p>接下来看<code>bin/vue-init</code>，<code>vue-init</code>的主要作用是根据指定模板生成项目原型。文件首先是引入一些依赖模块和lib中的辅助函数，因为init命令需要接收至少一个参数，所以<code>vue-init</code>第一个被执行到的就是检验入参的<a href="https://github.com/vuejs/vue-cli/blob/master/bin/vue-init#L54" rel="nofollow noreferrer" target="_blank"><code>help</code>函数</a>，如果没有传入参数，则打印提示，传入参数则继续运行。</p>
<p>再向下是解析参数的过程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var template = program.args[0]
var hasSlash = template.indexOf('/') > -1
var rawName = program.args[1]
var inPlace = !rawName || rawName === '.'
var name = inPlace ? path.relative('../', process.cwd()) : rawName
var to = path.resolve(rawName || '.')
var clone = program.clone || false

var tmp = path.join(home, '.vue-templates', template.replace(/\//g, '-'))
if (program.offline) {
  console.log(`> Use cached template at ${chalk.yellow(tildify(tmp))}`)
  template = tmp
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> template = program.args[<span class="hljs-number">0</span>]
<span class="hljs-keyword">var</span> hasSlash = template.indexOf(<span class="hljs-string">'/'</span>) &gt; <span class="hljs-number">-1</span>
<span class="hljs-keyword">var</span> rawName = program.args[<span class="hljs-number">1</span>]
<span class="hljs-keyword">var</span> inPlace = !rawName || rawName === <span class="hljs-string">'.'</span>
<span class="hljs-keyword">var</span> name = inPlace ? path.relative(<span class="hljs-string">'../'</span>, process.cwd()) : rawName
<span class="hljs-keyword">var</span> to = path.resolve(rawName || <span class="hljs-string">'.'</span>)
<span class="hljs-keyword">var</span> clone = program.clone || <span class="hljs-literal">false</span>

<span class="hljs-keyword">var</span> tmp = path.join(home, <span class="hljs-string">'.vue-templates'</span>, template.replace(<span class="hljs-regexp">/\//g</span>, <span class="hljs-string">'-'</span>))
<span class="hljs-keyword">if</span> (program.offline) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&gt; Use cached template at <span class="hljs-subst">${chalk.yellow(tildify(tmp))}</span>`</span>)
  template = tmp
}</code></pre>
<p><code>template</code>是模板名，第二个参数(<code>program.args[1]</code>)<code>rawName </code>为项目名，如果不存在或为<code>.</code>则视为在当前目录下初始化(<code>inPlace = true</code>)，默认项目名称<code>name</code>也为当前文件夹名。<code>to</code>是项目的输出路径，后面会用到。<code>clone</code>参数判断是否使用git clone的方式下载模板，当模板在私有仓库时用得上。<code>offline</code>参数决定是否使用离线模式，如果使用离线模式，vue-cli会尝试去<code>~/.vue-templates</code>下获取对应的模板，可以省去漫长的<code>downloading template</code>的等待时间，但是模板是不是最新的版本就无法确定了。</p>
<p>前面在处理参数时会得到一个变量<code>to</code>，表示即将生成的项目路径，如果已存在，则会输出警告，让用户确认是否继续，确认后执行<code>run</code>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (exists(to)) {
  inquirer.prompt([{
    type: 'confirm',
    message: inPlace
      ? 'Generate project in current directory?'
      : 'Target directory exists. Continue?',
    name: 'ok'
  }], function (answers) {
    if (answers.ok) {
      run()
    }
  })
} else {
  run()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">if</span> (exists(to)) {
  <span class="hljs-selector-tag">inquirer</span><span class="hljs-selector-class">.prompt</span>([{
    <span class="hljs-attribute">type</span>: <span class="hljs-string">'confirm'</span>,
    <span class="hljs-attribute">message</span>: inPlace
      ? <span class="hljs-string">'Generate project in current directory?'</span>
      : <span class="hljs-string">'Target directory exists. Continue?'</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'ok'</span>
  }], <span class="hljs-selector-tag">function</span> (answers) {
    <span class="hljs-selector-tag">if</span> (answers.ok) {
      <span class="hljs-selector-tag">run</span>()
    }
  })
} <span class="hljs-selector-tag">else</span> {
  <span class="hljs-selector-tag">run</span>()
}</code></pre>
<p><a href="https://github.com/vuejs/vue-cli/blob/master/bin/vue-init#L103" rel="nofollow noreferrer" target="_blank">run函数</a>主要检查了模板是否是本地模板，然后获取或下载模板，获取到模板后执行<code>generate</code>函数。</p>
<p>generate函数是生成项目的核心，主要代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function generate (name, src, dest, done) {
  var opts = getOptions(name, src)
  // Metalsmith读取template下所有资源
  var metalsmith = Metalsmith(path.join(src, 'template'))
  var data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    inPlace: dest === process.cwd(),
    noEscape: true
  })
  opts.helpers &amp;&amp; Object.keys(opts.helpers).map(function (key) {
    Handlebars.registerHelper(key, opts.helpers[key])
  })

  var helpers = {chalk, logger}

  if (opts.metalsmith &amp;&amp; typeof opts.metalsmith.before === 'function') {
    opts.metalsmith.before(metalsmith, opts, helpers)
  }
  // 一次使用askQuestions, filterFiles, renderTemplateFiles处理读取的内容
  metalsmith.use(askQuestions(opts.prompts))
    .use(filterFiles(opts.filters))
    .use(renderTemplateFiles(opts.skipInterpolation))

  if (typeof opts.metalsmith === 'function') {
    opts.metalsmith(metalsmith, opts, helpers)
  } else if (opts.metalsmith &amp;&amp; typeof opts.metalsmith.after === 'function') {
    opts.metalsmith.after(metalsmith, opts, helpers)
  }
  // 将处理后的文件输出
  metalsmith.clean(false)
    .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
    .destination(dest)
    .build(function (err, files) {
      done(err)
      if (typeof opts.complete === 'function') {
        var helpers = {chalk, logger, files}
        opts.complete(data, helpers)
      } else {
        logMessage(opts.completeMessage, data)
      }
    })

  return data
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generate</span> (<span class="hljs-params">name, src, dest, done</span>) </span>{
  <span class="hljs-keyword">var</span> opts = getOptions(name, src)
  <span class="hljs-comment">// Metalsmith读取template下所有资源</span>
  <span class="hljs-keyword">var</span> metalsmith = Metalsmith(path.join(src, <span class="hljs-string">'template'</span>))
  <span class="hljs-keyword">var</span> data = <span class="hljs-built_in">Object</span>.assign(metalsmith.metadata(), {
    <span class="hljs-attr">destDirName</span>: name,
    <span class="hljs-attr">inPlace</span>: dest === process.cwd(),
    <span class="hljs-attr">noEscape</span>: <span class="hljs-literal">true</span>
  })
  opts.helpers &amp;&amp; <span class="hljs-built_in">Object</span>.keys(opts.helpers).map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
    Handlebars.registerHelper(key, opts.helpers[key])
  })

  <span class="hljs-keyword">var</span> helpers = {chalk, logger}

  <span class="hljs-keyword">if</span> (opts.metalsmith &amp;&amp; <span class="hljs-keyword">typeof</span> opts.metalsmith.before === <span class="hljs-string">'function'</span>) {
    opts.metalsmith.before(metalsmith, opts, helpers)
  }
  <span class="hljs-comment">// 一次使用askQuestions, filterFiles, renderTemplateFiles处理读取的内容</span>
  metalsmith.use(askQuestions(opts.prompts))
    .use(filterFiles(opts.filters))
    .use(renderTemplateFiles(opts.skipInterpolation))

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> opts.metalsmith === <span class="hljs-string">'function'</span>) {
    opts.metalsmith(metalsmith, opts, helpers)
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (opts.metalsmith &amp;&amp; <span class="hljs-keyword">typeof</span> opts.metalsmith.after === <span class="hljs-string">'function'</span>) {
    opts.metalsmith.after(metalsmith, opts, helpers)
  }
  <span class="hljs-comment">// 将处理后的文件输出</span>
  metalsmith.clean(<span class="hljs-literal">false</span>)
    .source(<span class="hljs-string">'.'</span>) <span class="hljs-comment">// start from template root instead of `./src` which is Metalsmith's default for `source`</span>
    .destination(dest)
    .build(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, files</span>) </span>{
      done(err)
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> opts.complete === <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">var</span> helpers = {chalk, logger, files}
        opts.complete(data, helpers)
      } <span class="hljs-keyword">else</span> {
        logMessage(opts.completeMessage, data)
      }
    })

  <span class="hljs-keyword">return</span> data
}</code></pre>
<p>首先通过<a href="https://github.com/vuejs/vue-cli/blob/master/lib/options.js#L14" rel="nofollow noreferrer" target="_blank"><code>getOptions</code></a>获取了一些项目的基础配置信息，如项目名，git用户信息等。然后通过<code>metalsmith</code>结合<code>askQuestions</code>,<code>filterFiles</code>,<code>renderTemplateFiles</code>这几个中间件完成了项目模板的生成过程。<strong><a href="https://github.com/segmentio/metalsmith" rel="nofollow noreferrer" target="_blank">metalsmith</a></strong>是一个插件化的静态网站生成器，它的一切都是通过插件运作的，这样可以很方便地为其扩展。<br>通过generate函数的代码，很容易看出来生成项目的过程主要是以下几个阶段。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009803947?w=932&amp;h=252" src="https://static.alili.tech/img/remote/1460000009803947?w=932&amp;h=252" alt="" title="" style="cursor: pointer;"></span></p>
<p>每个过程主要用了以下库：</p>
<ul>
<li><p>getOptions: 主要是读取模板下的<code>meta.json</code>或<code>meta.js</code>，<code>meta.json</code>是必须的文件，为cli提供多种信息，例如自定义的helper，自定义选项，文件过滤规则等等。该如何写一个自定义模板，可以参考<a href="https://github.com/vuejs/vue-cli#writing-custom-templates-from-scratch" rel="nofollow noreferrer" target="_blank">这里</a></p></li>
<li><p>通过Metalsmith读取模板内容，需要注意的是，此时的模板内容还是未被处理的，所以大概长这样:</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* eslint-disable no-new */
new Vue({
  el: '#app',
  "{{"#router"}}"
  router,
  "{{"/router"}}"
  "{{"#if_eq build &quot;runtime&quot;"}}"
  render: h => h(App)"{{"#if_eq lintConfig &quot;airbnb&quot;"}}","{{"/if_eq"}}"
  "{{"/if_eq"}}"
  "{{"#if_eq build &quot;standalone&quot;"}}"
  template: '<App/>',
  components: { App }"{{"#if_eq lintConfig &quot;airbnb&quot;"}}","{{"/if_eq"}}"
  "{{"/if_eq"}}"
})"{{"#if_eq lintConfig &quot;airbnb&quot;"}}";"{{"/if_eq"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs handlebars"><code><span class="xml">/* eslint-disable no-new */
new Vue({
  el: '#app',
  </span><span class="hljs-template-tag">"{{"#<span class="hljs-name">router</span>"}}"</span><span class="xml">
  router,
  </span><span class="hljs-template-tag">"{{"/<span class="hljs-name">router</span>"}}"</span><span class="xml">
  </span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">if</span></span>_eq build <span class="hljs-string">"runtime"</span>"}}"</span><span class="xml">
  render: h =&gt; h(App)</span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">if</span></span>_eq lintConfig <span class="hljs-string">"airbnb"</span>"}}"</span><span class="xml">,</span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">if</span></span>_eq"}}"</span><span class="xml">
  </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">if</span></span>_eq"}}"</span><span class="xml">
  </span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">if</span></span>_eq build <span class="hljs-string">"standalone"</span>"}}"</span><span class="xml">
  template: '<span class="hljs-tag">&lt;<span class="hljs-name">App</span>/&gt;</span>',
  components: { App }</span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">if</span></span>_eq lintConfig <span class="hljs-string">"airbnb"</span>"}}"</span><span class="xml">,</span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">if</span></span>_eq"}}"</span><span class="xml">
  </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">if</span></span>_eq"}}"</span><span class="xml">
})</span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">if</span></span>_eq lintConfig <span class="hljs-string">"airbnb"</span>"}}"</span><span class="xml">;</span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">if</span></span>_eq"}}"</span></code><span class="xml"></span></pre>
<ul>
<li><p>获取自定义配置: 主要是通过<a href="https://github.com/caolan/async" rel="nofollow noreferrer" target="_blank">async</a>和<a href="https://github.com/SBoudrias/Inquirer.js" rel="nofollow noreferrer" target="_blank">inquirer</a>的配合完成收集用户自定义配置。</p></li>
<li><p>filterFiles: 对文件进行过滤，通过<a href="https://github.com/isaacs/minimatch" rel="nofollow noreferrer" target="_blank">minimatch</a>进行文件匹配。</p></li>
<li><p>渲染模板：通过<a href="https://github.com/tj/consolidate.js" rel="nofollow noreferrer" target="_blank">consolidate.js</a>配合<a href="https://github.com/wycats/handlebars.js/" rel="nofollow noreferrer" target="_blank">handlebars</a>渲染文件。</p></li>
<li><p>输出：直接输出</p></li>
</ul>
<p><code>vue-init</code>的整个工作流程大致就是这样，<code>vue-cli</code>作为一个便捷的命令行工具，其代码写的也简洁易懂，而且通过分析源码，可以发现其中用到的很多有意思的模块。</p>
<h4>bin/vue-list</h4>
<p><a href="https://github.com/vuejs/vue-cli/blob/master/bin/vue-list" rel="nofollow noreferrer" target="_blank">vue-list</a>功能很简单，拉取<a href="https://api.github.com/users/vuejs-templates" rel="nofollow noreferrer" target="_blank">vuejs-templates</a>的模板信息并输出。</p>
<h4>bin/vue-build</h4>
<p><a href="https://github.com/vuejs/vue-cli/blob/master/bin/vue-build" rel="nofollow noreferrer" target="_blank">vue-build</a>则是通过一份webpack配置将项目跑起来，如果是入口仅是一个<code>.vue</code>组件，就使用默认的<code>default-entry.es6</code>加载组件并渲染。</p>
<h4>其他</h4>
<p>在看vue-cli源码时，发现了<a href="https://github.com/sindresorhus/user-home" rel="nofollow noreferrer" target="_blank">user-home</a>这个模块，这个模块的内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';
module.exports = require('os-homedir')();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>;
<span class="hljs-built_in">module</span>.exports = <span class="hljs-built_in">require</span>(<span class="hljs-string">'os-homedir'</span>)();</code></pre>
<p><code>os-homedir</code>这个包是一个<code>os.homedir</code>的polyfill，在<a href="https://github.com/sindresorhus/user-home#why-not-just-use-the-os-home-module" rel="nofollow noreferrer" target="_blank">Why not just use the os-home module?</a>下，我看到了<a href="https://github.com/sindresorhus/ama/issues/10#issuecomment-117766328" rel="nofollow noreferrer" target="_blank">Modules are cheap in Node.js</a>这个blog。事实上<a href="https://github.com/sindresorhus" rel="nofollow noreferrer" target="_blank">sindresorhus</a>写了很多的One-line node modules，他也很喜欢One-line node moduels，因为模块越小，就意味着灵活性和重用性更高。当然对于One-line modules，每个人的看法不一样，毕竟也不是第一次听到<strong>“就这一个函数也tm能写个包”</strong>的话了。我认为这个要因人而异，sindresorhus何许人也，很多著名开源项目的作者，发布的npm包1000+，大多数他用到的模块，都是他自己写的，所以对他来说，使用各种“积木”去组建“高楼”得心应手。不过对于其他人来说，如果习惯于这种方式，可能会对这些东西依赖性变强，就像现在很多前端开发依赖框架而不重基础一样，所以我认为这种“拼积木”开发方式挺好，但最好还是要知其所以然。但是我感觉One-line modules的作用却不大，就像user-home这个模块，如果没有它，<code>const home = require('os-homedir')();</code>也可以达到目的，可能处于强迫症的原因，user-home才诞生了吧，而且像<a href="https://github.com/sindresorhus/negative-zero" rel="nofollow noreferrer" target="_blank">negative-zero</a>这样的One-line modules,使用场景少是其一，而且也没带来什么方便，尤其是2.0版本，这个包直接使用Object.is去判断了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';
module.exports = x => Object.is(x, -0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>;
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">Object</span>.is(x, <span class="hljs-number">-0</span>);</code></pre>
<p>不知道大家对One-line modules是什么看法？</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli是如何工作的

## 原文链接
[https://segmentfault.com/a/1190000009803941](https://segmentfault.com/a/1190000009803941)


---
title: '走进Vue-cli源码，自己动手搭建前端脚手架工具' 
date: 2018-12-09 2:30:08
hidden: true
slug: 2t0c52b56b
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>前段时间看了一些vue-cli的源码，收获颇深。本想找个时间更新一篇文章，但是最近事情比较多，没有时间去整理这些东西。趁这两天闲了下来，便整理了一下，然后跟大家分享一下。如果小伙伴们读完之后，跟我一样收获很多的话，还望各位小伙伴们多多点赞收藏支持一下哦。</p>
<h1 id="articleHeader1">Vue-cli介绍</h1>
<p>Vue-cli是一款非常优秀的用于迅速构建基于Vue的Web应用工具。他不同于creat-react-app这样的工具，开发者只需要关注项目逻辑的代码，而不需要关心webpack打包、启动Node服务等等诸如此类的这些问题。Vue-cli是一款基于模板化的开发工具，等于就是把别人的项目结构给照搬过来，所有的配置都是暴露出来的，你可以根据实际情况去做一些配置的修改，更加灵活自由一点。当然这对前端工程师提出更高的要求，考虑的东西也变多了。不过Vue-cli即将发布3.0的版本，整个Vue-cli发生了翻天覆地的变化，它采用跟creat-react-app这类工具的模式，开发者只需要关注项目逻辑的代码即可。不过目前3.0还没有出来，所以<strong>这次源码分析我采用的v2.9.3的源码，也就是2.0的代码</strong>。后面小伙们在阅读的时候要注意以下。</p>
<h1 id="articleHeader2">Vue-cli项目结构</h1>
<p><span class="img-wrap"><img data-src="/img/bV6MuO?w=403&amp;h=670" src="https://static.alili.tech/img/bV6MuO?w=403&amp;h=670" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>整个项目的目录结构如上图所示，下面我大概介绍每个文件夹的东西大致都是干嘛的。</p>
<ul>
<li>
<strong>bin</strong> //这里放的vue的一些命令文件，比如<strong>vue init</strong>这样的命令都是从由这里控制的</li>
<li>
<strong>docs</strong> //一些注意事项啥的，不重要的目录，可以直接忽略</li>
<li>
<strong>lib</strong>  //这里存放着一些vue-cli需要的一些自定义方法</li>
<li>
<strong>node_modules</strong>  //这里就不用我多说了</li>
<li>
<strong>test</strong>  // 单元测试 开会vue-cli工具时会用到，我们读源码的时候可以直接忽略掉</li>
<li>
<strong>一些杂七杂八的东西</strong> //比如eslint配置、.gitignore、LICENSE等等诸如此类这些东西。不影响阅读源码，直接忽略掉。</li>
<li>
<strong>package.json/README.md</strong> //这个也不用我多说了，大家都知道的</li>
</ul>
<blockquote><strong>综合来说，我们阅读源码所要关注的只有bin和lib下面即可，其他的都可忽略。下面开始阅读之旅吧</strong></blockquote>
<h1 id="articleHeader3">Vue-cli源码阅读之旅</h1>
<p>在开始读源码之前，首先我要介绍一个工具（<strong>commander</strong>），这是用来处理命令行的工具。具体的使用方法可查看github的README.md  <a href="https://github.com/tj/commander.js" rel="nofollow noreferrer" target="_blank">https://github.com/tj/command...</a> 。小伙伴们再阅读后面的内容之前，建议先去了解一下<strong>commander</strong>，方便后续的理解。这里我们对<strong>commander</strong>就不做详细介绍了。这里vue-cli采用了<strong>commander</strong>的git风格的写法。vue文件处理vue命令，vue-init处理vue init命令以此类推。接着我们一个一个命令看过去。</p>
<h2 id="articleHeader4">vue</h2>
<p><strong>引入的包：</strong></p>
<ul><li>
<strong>commander</strong>    //用于处理命令行</li></ul>
<p><strong>作用：</strong> vue这个文件代码很少，我就直接贴出来了。</p>
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
<p>这个文件主要是在用户输入“<strong>vue</strong>”时，终端上显示参数的使用说明。具体的写法可参考 <a href="https://github.com/tj/commander.js" rel="nofollow noreferrer" target="_blank">https://github.com/tj/command...</a> 上面的说明。</p>
<h2 id="articleHeader5">vue build</h2>
<p><strong>引入的包：</strong></p>
<ul><li>
<strong>chalk</strong>    //用于高亮终端打印出来的信息</li></ul>
<p><strong>作用：</strong> <strong>vue build</strong>命令在vue-cli之中已经删除了，源码上做了一定的说明。代码不多，我就直接贴出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const chalk = require('chalk')

console.log(chalk.yellow(
  '\n' +
  '  We are slimming down vue-cli to optimize the initial installation by ' +
  'removing the `vue build` command.\n' +
  '  Check out Poi (https://github.com/egoist/poi) which offers the same functionality!' +
  '\n'
))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code>
<span class="hljs-keyword">const</span> chalk = require(<span class="hljs-comment">'chalk')</span>

console.log(chalk.yellow(
  <span class="hljs-comment">'\n' +</span>
  <span class="hljs-comment">'  We are slimming down vue-cli to optimize the initial installation by ' +</span>
  <span class="hljs-comment">'removing the `vue build` command.\n' +</span>
  <span class="hljs-comment">'  Check out Poi (https://github.com/egoist/poi) which offers the same functionality!' +</span>
  <span class="hljs-comment">'\n'</span>
))</code></pre>
<h2 id="articleHeader6">vue list</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node
const logger = require('../lib/logger')
const request = require('request')
const chalk = require('chalk')

/**
 * Padding.
 */

console.log()
process.on('exit', () => {
  console.log()
})

/**
 * List repos.
 */

request({
  url: 'https://api.github.com/users/vuejs-templates/repos',
  headers: {
    'User-Agent': 'vue-cli'
  }
}, (err, res, body) => {
  if (err) logger.fatal(err)
  const requestBody = JSON.parse(body)
  if (Array.isArray(requestBody)) {
    console.log('  Available official templates:')
    console.log()
    requestBody.forEach(repo => {
      console.log(
        '  ' + chalk.yellow('★') +
        '  ' + chalk.blue(repo.name) +
        ' - ' + repo.description)
    })
  } else {
    console.error(requestBody.message)
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>#!<span class="hljs-regexp">/usr/</span>bin/env node
<span class="hljs-keyword">const</span> logger = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../lib/logger'</span>)
<span class="hljs-keyword">const</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">'request'</span>)
<span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)

<span class="hljs-comment">/**
 * Padding.
 */</span>

<span class="hljs-built_in">console</span>.log()
process.on(<span class="hljs-string">'exit'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log()
})

<span class="hljs-comment">/**
 * List repos.
 */</span>

request({
  url: <span class="hljs-string">'https://api.github.com/users/vuejs-templates/repos'</span>,
  headers: {
    <span class="hljs-string">'User-Agent'</span>: <span class="hljs-string">'vue-cli'</span>
  }
}, <span class="hljs-function">(<span class="hljs-params">err, res, body</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (err) logger.fatal(err)
  <span class="hljs-keyword">const</span> requestBody = <span class="hljs-built_in">JSON</span>.parse(body)
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(requestBody)) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'  Available official templates:'</span>)
    <span class="hljs-built_in">console</span>.log()
    requestBody.forEach(<span class="hljs-function"><span class="hljs-params">repo</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(
        <span class="hljs-string">'  '</span> + chalk.yellow(<span class="hljs-string">'★'</span>) +
        <span class="hljs-string">'  '</span> + chalk.blue(repo.name) +
        <span class="hljs-string">' - '</span> + repo.description)
    })
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.error(requestBody.message)
  }
})</code></pre>
<p><strong>引入的包：</strong></p>
<ul>
<li>
<strong>request</strong>  //发送http请求的工具。</li>
<li>
<strong>chalk</strong>    //用于高亮console.log打印出来的信息。</li>
<li>
<strong>logger</strong>   //自定义工具-用于日志打印。</li>
</ul>
<p><strong>作用：</strong>当输入"<strong>vue list</strong>"时（<strong>我们测试时，可以直接在当前源码文件目录下的终端上输入“bin/vue-list”</strong>），vue-cli会请求接口，获取官方模板的信息，然后做了一定处理，在终端上显示出来模板名称和对应的说明。</p>
<p><strong>效果如下：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  Available official templates:

  ★  browserify - A full-featured Browserify + vueify setup with hot-reload, linting &amp; unit testing.
  ★  browserify-simple - A simple Browserify + vueify setup for quick prototyping.
  ★  pwa - PWA template for vue-cli based on the webpack template
  ★  simple - The simplest possible Vue setup in a single HTML file
  ★  webpack - A full-featured Webpack + vue-loader setup with hot reload, linting, testing &amp; css extraction.
  ★  webpack-simple - A simple Webpack + vue-loader setup for quick prototyping." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>  Available official templates:

  ★  browserify - A full-featured Browserify + vueify setup <span class="hljs-built_in">with</span> hot-reload, linting &amp; unit testing.
  ★  browserify-<span class="hljs-built_in">simple</span> - A <span class="hljs-built_in">simple</span> Browserify + vueify setup <span class="hljs-keyword">for</span> quick prototyping.
  ★  pwa - PWA template <span class="hljs-keyword">for</span> vue-cli based on the webpack template
  ★  <span class="hljs-built_in">simple</span> - The simplest possible Vue setup <span class="hljs-built_in">in</span> a single HTML file
  ★  webpack - A full-featured Webpack + vue-loader setup <span class="hljs-built_in">with</span> hot reload, linting, testing &amp; css extraction.
  ★  webpack-<span class="hljs-built_in">simple</span> - A <span class="hljs-built_in">simple</span> Webpack + vue-loader setup <span class="hljs-keyword">for</span> quick prototyping.</code></pre>
<h2 id="articleHeader7">vue init</h2>
<p>“<strong>vue init</strong>”是用来构建项目的命令，也是vue-cli的核心文件，上面的三个都是非常简单的命令，算是我们阅读源码的开胃菜，真正的大餐在这里。</p>
<h3 id="articleHeader8">工作流程</h3>
<p>在讲代码之前，首先我们要讲一下整个vue-cli初始项目的流程，然后我们沿着流程一步一步走下去。</p>
<p><span class="img-wrap"><img data-src="/img/bV6yO4?w=1259&amp;h=667" src="https://static.alili.tech/img/bV6yO4?w=1259&amp;h=667" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>整个<strong>vue init</strong>大致流程如我上图所示，应该还是比较好理解的。这里我大致阐述一下大致的流程。</p>
<ol>
<li><strong>vue-cli会先判断你的模板在远程github仓库上还是在你的本地某个文件里面，若是本地文件夹则会立即跳到第3步，反之则走第2步。</strong></li>
<li><strong>第2步会判断是否为官方模板，官方模板则会从官方github仓库中下载模板到本地的默认仓库下，即根目录下.vue-templates文件夹下。</strong></li>
<li><strong>第3步则读取模板目录下meta.js或者meta.json文件，根据里面的内容会询问开发者，根据开发者的回答，确定一些修改。</strong></li>
<li><strong>根据模板内容以及开发者的回答，渲染出项目结构并生成到指定目录。</strong></li>
</ol>
<h3 id="articleHeader9">源码内容</h3>
<p>这里<strong>vue-init</strong>文件的代码比较多，我这里就拆分几块来看。首先我先把整个文件的结构列出来，方便后续的阅读。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  /**
   * 引入一大堆包
   */
    const program = require('commander')
    ...
  
   
   /**
    * 配置commander的使用方法
    */     
    
    program
      .usage('<template-name> [project-name]')
      .option('-c, --clone', 'use git clone')
      .option('--offline', 'use cached template')
      
  /**
    * 定义commander的help方法
    */  
    program.on('--help', () => {
      console.log('  Examples:')
      console.log()
      console.log(chalk.gray('    # create a new project with an official template'))
      console.log('    $ vue init webpack my-project')
      console.log()
      console.log(chalk.gray('    # create a new project straight from a github template'))
      console.log('    $ vue init username/repo my-project')
      console.log()
    })
    
    
    function help () {
      program.parse(process.argv)
      if (program.args.length < 1) return program.help() //如果没有输入参数，终端显示帮助
    }
    help()
    
    /**
     * 定义一大堆变量
     */
     
     let template = program.args[0]
     ...
     
     /**
      * 判断是否输入项目名  是 - 直接执行run函数  否- 询问开发者是否在当前目录下生成项目，开发者回答“是” 也执行run函数 否则不执行run函数
      */
     
     /**
     * 定义主函数 run
     */
     function run (){
         ...
     }
     
     /**
      * 定义下载模板并生产项目的函数 downloadAndGenerate
      */
      function downloadAndGenerate(){
          ...
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-comment">/**
   * 引入一大堆包
   */</span>
    <span class="hljs-keyword">const</span> program = <span class="hljs-built_in">require</span>(<span class="hljs-string">'commander'</span>)
    ...
  
   
   <span class="hljs-comment">/**
    * 配置commander的使用方法
    */</span>     
    
    program
      .usage(<span class="hljs-string">'&lt;template-name&gt; [project-name]'</span>)
      .option(<span class="hljs-string">'-c, --clone'</span>, <span class="hljs-string">'use git clone'</span>)
      .option(<span class="hljs-string">'--offline'</span>, <span class="hljs-string">'use cached template'</span>)
      
  <span class="hljs-comment">/**
    * 定义commander的help方法
    */</span>  
    program.on(<span class="hljs-string">'--help'</span>, () =&gt; {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'  Examples:'</span>)
      <span class="hljs-built_in">console</span>.log()
      <span class="hljs-built_in">console</span>.log(chalk.gray(<span class="hljs-string">'    # create a new project with an official template'</span>))
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'    $ vue init webpack my-project'</span>)
      <span class="hljs-built_in">console</span>.log()
      <span class="hljs-built_in">console</span>.log(chalk.gray(<span class="hljs-string">'    # create a new project straight from a github template'</span>))
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'    $ vue init username/repo my-project'</span>)
      <span class="hljs-built_in">console</span>.log()
    })
    
    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">help</span> (<span class="hljs-params"></span>) </span>{
      program.parse(process.argv)
      <span class="hljs-keyword">if</span> (program.args.length &lt; <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> program.help() <span class="hljs-comment">//如果没有输入参数，终端显示帮助</span>
    }
    help()
    
    <span class="hljs-comment">/**
     * 定义一大堆变量
     */</span>
     
     <span class="hljs-keyword">let</span> template = program.args[<span class="hljs-number">0</span>]
     ...
     
     <span class="hljs-comment">/**
      * 判断是否输入项目名  是 - 直接执行run函数  否- 询问开发者是否在当前目录下生成项目，开发者回答“是” 也执行run函数 否则不执行run函数
      */</span>
     
     <span class="hljs-comment">/**
     * 定义主函数 run
     */</span>
     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span> (<span class="hljs-params"></span>)</span>{
         ...
     }
     
     <span class="hljs-comment">/**
      * 定义下载模板并生产项目的函数 downloadAndGenerate
      */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">downloadAndGenerate</span>(<span class="hljs-params"></span>)</span>{
          ...
      }</code></pre>
<p>整个文件大致的东西入上面所示，后面我们将一块一块内容来看。</p>
<h4>引入的一堆包</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const download = require('download-git-repo')  //用于下载远程仓库至本地 支持GitHub、GitLab、Bitbucket
const program = require('commander') //命令行处理工具
const exists = require('fs').existsSync  //node自带的fs模块下的existsSync方法，用于检测路径是否存在。（会阻塞）
const path = require('path') //node自带的path模块，用于拼接路径
const ora = require('ora') //用于命令行上的加载效果
const home = require('user-home')  //用于获取用户的根目录
const tildify = require('tildify') //将绝对路径转换成带波浪符的路径
const chalk = require('chalk')// 用于高亮终端打印出的信息
const inquirer = require('inquirer') //用于命令行与开发者交互
const rm = require('rimraf').sync // 相当于UNIX的“rm -rf”命令
const logger = require('../lib/logger') //自定义工具-用于日志打印
const generate = require('../lib/generate')  //自定义工具-用于基于模板构建项目
const checkVersion = require('../lib/check-version') //自定义工具-用于检测vue-cli版本的工具
const warnings = require('../lib/warnings') //自定义工具-用于模板的警告
const localPath = require('../lib/local-path') //自定义工具-用于路径的处理

const isLocalPath = localPath.isLocalPath  //判断是否是本地路径
const getTemplatePath = localPath.getTemplatePath  //获取本地模板的绝对路径" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> download = <span class="hljs-built_in">require</span>(<span class="hljs-string">'download-git-repo'</span>)  <span class="hljs-comment">//用于下载远程仓库至本地 支持GitHub、GitLab、Bitbucket</span>
<span class="hljs-keyword">const</span> program = <span class="hljs-built_in">require</span>(<span class="hljs-string">'commander'</span>) <span class="hljs-comment">//命令行处理工具</span>
<span class="hljs-keyword">const</span> exists = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>).existsSync  <span class="hljs-comment">//node自带的fs模块下的existsSync方法，用于检测路径是否存在。（会阻塞）</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>) <span class="hljs-comment">//node自带的path模块，用于拼接路径</span>
<span class="hljs-keyword">const</span> ora = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ora'</span>) <span class="hljs-comment">//用于命令行上的加载效果</span>
<span class="hljs-keyword">const</span> home = <span class="hljs-built_in">require</span>(<span class="hljs-string">'user-home'</span>)  <span class="hljs-comment">//用于获取用户的根目录</span>
<span class="hljs-keyword">const</span> tildify = <span class="hljs-built_in">require</span>(<span class="hljs-string">'tildify'</span>) <span class="hljs-comment">//将绝对路径转换成带波浪符的路径</span>
<span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)<span class="hljs-comment">// 用于高亮终端打印出的信息</span>
<span class="hljs-keyword">const</span> inquirer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'inquirer'</span>) <span class="hljs-comment">//用于命令行与开发者交互</span>
<span class="hljs-keyword">const</span> rm = <span class="hljs-built_in">require</span>(<span class="hljs-string">'rimraf'</span>).sync <span class="hljs-comment">// 相当于UNIX的“rm -rf”命令</span>
<span class="hljs-keyword">const</span> logger = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../lib/logger'</span>) <span class="hljs-comment">//自定义工具-用于日志打印</span>
<span class="hljs-keyword">const</span> generate = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../lib/generate'</span>)  <span class="hljs-comment">//自定义工具-用于基于模板构建项目</span>
<span class="hljs-keyword">const</span> checkVersion = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../lib/check-version'</span>) <span class="hljs-comment">//自定义工具-用于检测vue-cli版本的工具</span>
<span class="hljs-keyword">const</span> warnings = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../lib/warnings'</span>) <span class="hljs-comment">//自定义工具-用于模板的警告</span>
<span class="hljs-keyword">const</span> localPath = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../lib/local-path'</span>) <span class="hljs-comment">//自定义工具-用于路径的处理</span>

<span class="hljs-keyword">const</span> isLocalPath = localPath.isLocalPath  <span class="hljs-comment">//判断是否是本地路径</span>
<span class="hljs-keyword">const</span> getTemplatePath = localPath.getTemplatePath  <span class="hljs-comment">//获取本地模板的绝对路径</span></code></pre>
<h4>定义的一堆变量</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let template = program.args[0]  //模板名称
const hasSlash = template.indexOf('/') > -1   //是否有斜杠，后面将会用来判定是否为官方模板   
const rawName = program.args[1]  //项目构建目录名
const inPlace = !rawName || rawName === '.'  // 没写或者“.”，表示当前目录下构建项目
const name = inPlace ? path.relative('../', process.cwd()) : rawName  //如果在当前目录下构建项目,当前目录名为项目构建目录名，否则是当前目录下的子目录【rawName】为项目构建目录名
const to = path.resolve(rawName || '.') //项目构建目录的绝对路径
const clone = program.clone || false  //是否采用clone模式，提供给“download-git-repo”的参数

const tmp = path.join(home, '.vue-templates', template.replace(/[\/:]/g, '-'))  //远程模板下载到本地的路径" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>let <span class="hljs-keyword">template</span> = program.args[<span class="hljs-number">0</span>]  <span class="hljs-comment">//模板名称</span>
<span class="hljs-keyword">const</span> hasSlash = <span class="hljs-keyword">template</span>.indexOf(<span class="hljs-string">'/'</span>) &gt; <span class="hljs-number">-1</span>   <span class="hljs-comment">//是否有斜杠，后面将会用来判定是否为官方模板   </span>
<span class="hljs-keyword">const</span> rawName = program.args[<span class="hljs-number">1</span>]  <span class="hljs-comment">//项目构建目录名</span>
<span class="hljs-keyword">const</span> inPlace = !rawName || rawName === <span class="hljs-string">'.'</span>  <span class="hljs-comment">// 没写或者“.”，表示当前目录下构建项目</span>
<span class="hljs-keyword">const</span> name = inPlace ? path.relative(<span class="hljs-string">'../'</span>, <span class="hljs-built_in">process</span>.cwd()) : rawName  <span class="hljs-comment">//如果在当前目录下构建项目,当前目录名为项目构建目录名，否则是当前目录下的子目录【rawName】为项目构建目录名</span>
<span class="hljs-keyword">const</span> to = path.resolve(rawName || <span class="hljs-string">'.'</span>) <span class="hljs-comment">//项目构建目录的绝对路径</span>
<span class="hljs-keyword">const</span> clone = program.clone || false  <span class="hljs-comment">//是否采用clone模式，提供给“download-git-repo”的参数</span>

<span class="hljs-keyword">const</span> tmp = path.join(<span class="hljs-built_in">home</span>, <span class="hljs-string">'.vue-templates'</span>, <span class="hljs-keyword">template</span>.replace(/[\/:]/g, <span class="hljs-string">'-'</span>))  <span class="hljs-comment">//远程模板下载到本地的路径</span></code></pre>
<h4>主逻辑</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (inPlace || exists(to)) {
  inquirer.prompt([{
    type: 'confirm',
    message: inPlace
      ? 'Generate project in current directory?'
      : 'Target directory exists. Continue?',
    name: 'ok'
  }]).then(answers => {
    if (answers.ok) {
      run()
    }
  }).catch(logger.fatal)
} else {
  run()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">if</span> (inPlace || exists(to)) {
  <span class="hljs-selector-tag">inquirer</span><span class="hljs-selector-class">.prompt</span>([{
    <span class="hljs-attribute">type</span>: <span class="hljs-string">'confirm'</span>,
    <span class="hljs-attribute">message</span>: inPlace
      ? <span class="hljs-string">'Generate project in current directory?'</span>
      : <span class="hljs-string">'Target directory exists. Continue?'</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'ok'</span>
  }])<span class="hljs-selector-class">.then</span>(answers =&gt; {
    <span class="hljs-selector-tag">if</span> (answers.ok) {
      <span class="hljs-selector-tag">run</span>()
    }
  })<span class="hljs-selector-class">.catch</span>(logger.fatal)
} <span class="hljs-selector-tag">else</span> {
  <span class="hljs-selector-tag">run</span>()
}</code></pre>
<p>对着上面代码，<strong>vue-cli</strong>会判断inPlace和<strong>exists(to)</strong>,true则询问开发者，当开发者回答“yes”的时候执行<strong>run函数</strong>，否则直接执行<strong>run函数</strong>。这里询问开发者的问题有如下两个：</p>
<ul>
<li>
<strong>Generate project in current directory?</strong>  //是否在当前目录下构建项目</li>
<li>
<strong>Target directory exists. Continue?</strong> //构建目录已存在,是否继续</li>
</ul>
<p>这两个问题依靠<strong>变量inPlace</strong>来选择，下面我看一下<strong>变量inPlace</strong>是怎么得来的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rawName = program.args[1]  //rawName为命令行的第二个参数（项目构建目录的相对目录）
const inPlace = !rawName || rawName === '.'  //rawName存在或者为“.”的时候，视为在当前目录下构建" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">const</span> rawName = <span class="hljs-keyword">program</span>.<span class="hljs-keyword">args</span>[1]  <span class="hljs-comment">//rawName为命令行的第二个参数（项目构建目录的相对目录）</span>
<span class="hljs-keyword">const</span> inPlace = !rawName || rawName === '.'  <span class="hljs-comment">//rawName存在或者为“.”的时候，视为在当前目录下构建</span></code></pre>
<p>通过上面的描述可知，<strong>变量inPlace</strong>用于判断是否在当前目录下构建，因此<strong>变量inPlace</strong>为true时，则会提示<strong>Generate project in current directory?</strong> ，反之当<strong>变量inPlace</strong>为false时，此时<strong>exists(to)</strong>一定为true，便提示<strong>Target directory exists. Continue?</strong>。</p>
<h4>Run函数</h4>
<p><strong>逻辑：</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV6GHD?w=1386&amp;h=784" src="https://static.alili.tech/img/bV6GHD?w=1386&amp;h=784" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>源码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function run () {
  // check if template is local
  if (isLocalPath(template)) {    //是否是本地模板
    const templatePath = getTemplatePath(template)  //获取绝对路径
    if (exists(templatePath)) {  //判断模板所在路径是否存在
       //渲染模板
      generate(name, templatePath, to, err => {
        if (err) logger.fatal(err)
        console.log()
        logger.success('Generated &quot;%s&quot;.', name)
      })
    } else {
       //打印错误日志，提示本地模板不存在
      logger.fatal('Local template &quot;%s&quot; not found.', template)
    }
  } else {
    checkVersion(() => {  //检查版本号
      if (!hasSlash) {  //官方模板还是第三方模板
        // use official templates
        // 从这句话以及download-git-repo的用法，我们得知了vue的官方的模板库的地址：https://github.com/vuejs-templates
        const officialTemplate = 'vuejs-templates/' + template
        if (template.indexOf('#') !== -1) {  //模板名是否带&quot;#&quot;
          downloadAndGenerate(officialTemplate) //下载模板
        } else {
          if (template.indexOf('-2.0') !== -1) { //是都带&quot;-2.0&quot;
             //发出警告
            warnings.v2SuffixTemplatesDeprecated(template, inPlace ? '' : name)
            return
          }

          // warnings.v2BranchIsNowDefault(template, inPlace ? '' : name)
          downloadAndGenerate(officialTemplate)//下载模板
        }
      } else {
        downloadAndGenerate(template)//下载模板
      }
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>function <span class="hljs-built_in">run</span> () {
  <span class="hljs-comment">// check if template is local</span>
  <span class="hljs-built_in">if</span> (isLocalPath(<span class="hljs-keyword">template</span>)) {    <span class="hljs-comment">//是否是本地模板</span>
    <span class="hljs-keyword">const</span> templatePath = getTemplatePath(<span class="hljs-keyword">template</span>)  <span class="hljs-comment">//获取绝对路径</span>
    <span class="hljs-built_in">if</span> (<span class="hljs-built_in">exists</span>(templatePath)) {  <span class="hljs-comment">//判断模板所在路径是否存在</span>
       <span class="hljs-comment">//渲染模板</span>
      generate(name, templatePath, to, err =&gt; {
        <span class="hljs-built_in">if</span> (err) logger.fatal(err)
        console.log()
        logger.success(<span class="hljs-string">'Generated "%s".'</span>, name)
      })
    } <span class="hljs-built_in">else</span> {
       <span class="hljs-comment">//打印错误日志，提示本地模板不存在</span>
      logger.fatal(<span class="hljs-string">'Local template "%s" not found.'</span>, <span class="hljs-keyword">template</span>)
    }
  } <span class="hljs-built_in">else</span> {
    checkVersion(() =&gt; {  <span class="hljs-comment">//检查版本号</span>
      <span class="hljs-built_in">if</span> (!hasSlash) {  <span class="hljs-comment">//官方模板还是第三方模板</span>
        <span class="hljs-comment">// use official templates</span>
        <span class="hljs-comment">// 从这句话以及download-git-repo的用法，我们得知了vue的官方的模板库的地址：https://github.com/vuejs-templates</span>
        <span class="hljs-keyword">const</span> officialTemplate = <span class="hljs-string">'vuejs-templates/'</span> + <span class="hljs-keyword">template</span>
        <span class="hljs-built_in">if</span> (<span class="hljs-keyword">template</span>.indexOf(<span class="hljs-string">'#'</span>) !== <span class="hljs-number">-1</span>) {  <span class="hljs-comment">//模板名是否带"#"</span>
          downloadAndGenerate(officialTemplate) <span class="hljs-comment">//下载模板</span>
        } <span class="hljs-built_in">else</span> {
          <span class="hljs-built_in">if</span> (<span class="hljs-keyword">template</span>.indexOf(<span class="hljs-string">'-2.0'</span>) !== <span class="hljs-number">-1</span>) { <span class="hljs-comment">//是都带"-2.0"</span>
             <span class="hljs-comment">//发出警告</span>
            warnings.v2SuffixTemplatesDeprecated(<span class="hljs-keyword">template</span>, inPlace ? <span class="hljs-string">''</span> : name)
            <span class="hljs-built_in">return</span>
          }

          <span class="hljs-comment">// warnings.v2BranchIsNowDefault(template, inPlace ? '' : name)</span>
          downloadAndGenerate(officialTemplate)<span class="hljs-comment">//下载模板</span>
        }
      } <span class="hljs-built_in">else</span> {
        downloadAndGenerate(<span class="hljs-keyword">template</span>)<span class="hljs-comment">//下载模板</span>
      }
    })
  }
}</code></pre>
<h4>downloadAndGenerate函数</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function downloadAndGenerate (template) {
  const spinner = ora('downloading template')  
  spinner.start()//显示加载状态
  // Remove if local template exists
  if (exists(tmp)) rm(tmp)  //当前模板库是否存在该模板，存在就删除
   //下载模板  template-模板名    tmp- 模板路径   clone-是否采用git clone模板   err-错误短信
    
  download(template, tmp, { clone }, err => {
    spinner.stop() //隐藏加载状态
    //如果有错误，打印错误日志
    if (err) logger.fatal('Failed to download repo ' + template + ': ' + err.message.trim())
    //渲染模板
    generate(name, tmp, to, err => {
      if (err) logger.fatal(err)
      console.log()
      logger.success('Generated &quot;%s&quot;.', name)
    })
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>function downloadAndGenerate (template) {
  <span class="hljs-keyword">const</span> spinner = ora('downloading template')  
  spinner.start()<span class="hljs-comment">//显示加载状态</span>
  <span class="hljs-comment">// Remove if local template exists</span>
  <span class="hljs-keyword">if</span> (exists(tmp)) <span class="hljs-keyword">rm</span>(tmp)  <span class="hljs-comment">//当前模板库是否存在该模板，存在就删除</span>
   <span class="hljs-comment">//下载模板  template-模板名    tmp- 模板路径   clone-是否采用git clone模板   err-错误短信</span>
    
  download(template, tmp, { clone }, <span class="hljs-keyword">err</span> =&gt; {
    spinner.stop() <span class="hljs-comment">//隐藏加载状态</span>
    <span class="hljs-comment">//如果有错误，打印错误日志</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span>) logger.fatal('Failed to download repo ' + template + ': ' + <span class="hljs-keyword">err</span>.message.<span class="hljs-built_in">trim</span>())
    <span class="hljs-comment">//渲染模板</span>
    <span class="hljs-keyword">generate</span>(name, tmp, to, <span class="hljs-keyword">err</span> =&gt; {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span>) logger.fatal(<span class="hljs-keyword">err</span>)
      console.<span class="hljs-built_in">log</span>()
      logger.success('Generated <span class="hljs-string">"%s"</span>.', name)
    })
  })
}</code></pre>
<h2 id="articleHeader10">lib</h2>
<h3 id="articleHeader11">generate.js （★）</h3>
<p>lib文件下最重要的js文件，他是我们构建项目中最重要的一环，根据模板渲染成我们需要的项目。这块内容是需要我们重点关注的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const chalk = require('chalk')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const async = require('async')
const render = require('consolidate').handlebars.render
const path = require('path')
const multimatch = require('multimatch')
const getOptions = require('./options')
const ask = require('./ask')
const filter = require('./filter')
const logger = require('./logger')

// register handlebars helper  注册handlebars的helper
Handlebars.registerHelper('if_eq', function (a, b, opts) {
  return a === b
    ? opts.fn(this)
    : opts.inverse(this)
})

Handlebars.registerHelper('unless_eq', function (a, b, opts) {
  return a === b
    ? opts.inverse(this)
    : opts.fn(this)
})

/**
 * Generate a template given a `src` and `dest`.
 *
 * @param {String} name
 * @param {String} src
 * @param {String} dest
 * @param {Function} done
 */

module.exports = function generate (name, src, dest, done) {
  const opts = getOptions(name, src)  //获取配置
  const metalsmith = Metalsmith(path.join(src, 'template'))  //初始化Metalsmith对象
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    inPlace: dest === process.cwd(),
    noEscape: true
  })//添加一些变量至metalsmith中，并获取metalsmith中全部变量
  
  //注册配置对象中的helper
  opts.helpers &amp;&amp; Object.keys(opts.helpers).map(key => {
    Handlebars.registerHelper(key, opts.helpers[key])
  })

  const helpers = { chalk, logger }

 //配置对象是否有before函数，是则执行
  if (opts.metalsmith &amp;&amp; typeof opts.metalsmith.before === 'function') {
    opts.metalsmith.before(metalsmith, opts, helpers)
  }

  metalsmith.use(askQuestions(opts.prompts))  //询问问题
    .use(filterFiles(opts.filters))  //过滤文件
    .use(renderTemplateFiles(opts.skipInterpolation)) //渲染模板文件


  //配置对象是否有after函数，是则执行
  if (typeof opts.metalsmith === 'function') {
    opts.metalsmith(metalsmith, opts, helpers)
  } else if (opts.metalsmith &amp;&amp; typeof opts.metalsmith.after === 'function') {
    opts.metalsmith.after(metalsmith, opts, helpers)
  }

  metalsmith.clean(false) 
    .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
    .destination(dest)
    .build((err, files) => {
      done(err)
      if (typeof opts.complete === 'function') {
      //配置对象有complete函数则执行
        const helpers = { chalk, logger, files }
        opts.complete(data, helpers)
      } else {
      //配置对象有completeMessage，执行logMessage函数
        logMessage(opts.completeMessage, data)
      }
    })

  return data
}

/**
 * Create a middleware for asking questions.
 *
 * @param {Object} prompts
 * @return {Function}
 */

function askQuestions (prompts) {
  return (files, metalsmith, done) => {
    ask(prompts, metalsmith.metadata(), done)
  }
}

/**
 * Create a middleware for filtering files.
 *
 * @param {Object} filters
 * @return {Function}
 */

function filterFiles (filters) {
  return (files, metalsmith, done) => {
    filter(files, filters, metalsmith.metadata(), done)
  }
}

/**
 * Template in place plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function renderTemplateFiles (skipInterpolation) {
  skipInterpolation = typeof skipInterpolation === 'string'
    ? [skipInterpolation]
    : skipInterpolation    //保证skipInterpolation是一个数组
  return (files, metalsmith, done) => {
    const keys = Object.keys(files) //获取files的所有key
    const metalsmithMetadata = metalsmith.metadata() //获取metalsmith的所有变量
    async.each(keys, (file, next) => { //异步处理所有files
      // skipping files with skipInterpolation option  
      // 跳过符合skipInterpolation的要求的file
      if (skipInterpolation &amp;&amp; multimatch([file], skipInterpolation, { dot: true }).length) {
        return next()
      }
      //获取文件的文本内容
      const str = files[file].contents.toString()
      // do not attempt to render files that do not have mustaches
      //跳过不符合handlebars语法的file
      if (!/"{{"([^{}]+)"}}"/g.test(str)) {  
        return next()
      }
      //渲染文件
      render(str, metalsmithMetadata, (err, res) => {
        if (err) {
          err.message = `[${file}] ${err.message}`
          return next(err)
        }
        files[file].contents = new Buffer(res)
        next()
      })
    }, done)
  }
}

/**
 * Display template complete message.
 *
 * @param {String} message
 * @param {Object} data
 */

function logMessage (message, data) {
  if (!message) return  //没有message直接退出函数
  render(message, data, (err, res) => {
    if (err) {
      console.error('\n   Error when rendering template complete message: ' + err.message.trim())  //渲染错误打印错误信息
    } else {
      console.log('\n' + res.split(/\r?\n/g).map(line => '   ' + line).join('\n'))
      //渲染成功打印最终渲染的结果
    }
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)
<span class="hljs-keyword">const</span> Metalsmith = <span class="hljs-built_in">require</span>(<span class="hljs-string">'metalsmith'</span>)
<span class="hljs-keyword">const</span> Handlebars = <span class="hljs-built_in">require</span>(<span class="hljs-string">'handlebars'</span>)
<span class="hljs-keyword">const</span> <span class="hljs-keyword">async</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">'async'</span>)
<span class="hljs-keyword">const</span> render = <span class="hljs-built_in">require</span>(<span class="hljs-string">'consolidate'</span>).handlebars.render
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> multimatch = <span class="hljs-built_in">require</span>(<span class="hljs-string">'multimatch'</span>)
<span class="hljs-keyword">const</span> getOptions = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./options'</span>)
<span class="hljs-keyword">const</span> ask = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./ask'</span>)
<span class="hljs-keyword">const</span> filter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./filter'</span>)
<span class="hljs-keyword">const</span> logger = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./logger'</span>)

<span class="hljs-comment">// register handlebars helper  注册handlebars的helper</span>
Handlebars.registerHelper(<span class="hljs-string">'if_eq'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a, b, opts</span>) </span>{
  <span class="hljs-keyword">return</span> a === b
    ? opts.fn(<span class="hljs-keyword">this</span>)
    : opts.inverse(<span class="hljs-keyword">this</span>)
})

Handlebars.registerHelper(<span class="hljs-string">'unless_eq'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a, b, opts</span>) </span>{
  <span class="hljs-keyword">return</span> a === b
    ? opts.inverse(<span class="hljs-keyword">this</span>)
    : opts.fn(<span class="hljs-keyword">this</span>)
})

<span class="hljs-comment">/**
 * Generate a template given a `src` and `dest`.
 *
 * @param {String} name
 * @param {String} src
 * @param {String} dest
 * @param {Function} done
 */</span>

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generate</span> (<span class="hljs-params">name, src, dest, done</span>) </span>{
  <span class="hljs-keyword">const</span> opts = getOptions(name, src)  <span class="hljs-comment">//获取配置</span>
  <span class="hljs-keyword">const</span> metalsmith = Metalsmith(path.join(src, <span class="hljs-string">'template'</span>))  <span class="hljs-comment">//初始化Metalsmith对象</span>
  <span class="hljs-keyword">const</span> data = <span class="hljs-built_in">Object</span>.assign(metalsmith.metadata(), {
    <span class="hljs-attr">destDirName</span>: name,
    <span class="hljs-attr">inPlace</span>: dest === process.cwd(),
    <span class="hljs-attr">noEscape</span>: <span class="hljs-literal">true</span>
  })<span class="hljs-comment">//添加一些变量至metalsmith中，并获取metalsmith中全部变量</span>
  
  <span class="hljs-comment">//注册配置对象中的helper</span>
  opts.helpers &amp;&amp; <span class="hljs-built_in">Object</span>.keys(opts.helpers).map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
    Handlebars.registerHelper(key, opts.helpers[key])
  })

  <span class="hljs-keyword">const</span> helpers = { chalk, logger }

 <span class="hljs-comment">//配置对象是否有before函数，是则执行</span>
  <span class="hljs-keyword">if</span> (opts.metalsmith &amp;&amp; <span class="hljs-keyword">typeof</span> opts.metalsmith.before === <span class="hljs-string">'function'</span>) {
    opts.metalsmith.before(metalsmith, opts, helpers)
  }

  metalsmith.use(askQuestions(opts.prompts))  <span class="hljs-comment">//询问问题</span>
    .use(filterFiles(opts.filters))  <span class="hljs-comment">//过滤文件</span>
    .use(renderTemplateFiles(opts.skipInterpolation)) <span class="hljs-comment">//渲染模板文件</span>


  <span class="hljs-comment">//配置对象是否有after函数，是则执行</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> opts.metalsmith === <span class="hljs-string">'function'</span>) {
    opts.metalsmith(metalsmith, opts, helpers)
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (opts.metalsmith &amp;&amp; <span class="hljs-keyword">typeof</span> opts.metalsmith.after === <span class="hljs-string">'function'</span>) {
    opts.metalsmith.after(metalsmith, opts, helpers)
  }

  metalsmith.clean(<span class="hljs-literal">false</span>) 
    .source(<span class="hljs-string">'.'</span>) <span class="hljs-comment">// start from template root instead of `./src` which is Metalsmith's default for `source`</span>
    .destination(dest)
    .build(<span class="hljs-function">(<span class="hljs-params">err, files</span>) =&gt;</span> {
      done(err)
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> opts.complete === <span class="hljs-string">'function'</span>) {
      <span class="hljs-comment">//配置对象有complete函数则执行</span>
        <span class="hljs-keyword">const</span> helpers = { chalk, logger, files }
        opts.complete(data, helpers)
      } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">//配置对象有completeMessage，执行logMessage函数</span>
        logMessage(opts.completeMessage, data)
      }
    })

  <span class="hljs-keyword">return</span> data
}

<span class="hljs-comment">/**
 * Create a middleware for asking questions.
 *
 * @param {Object} prompts
 * @return {Function}
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">askQuestions</span> (<span class="hljs-params">prompts</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">files, metalsmith, done</span>) =&gt;</span> {
    ask(prompts, metalsmith.metadata(), done)
  }
}

<span class="hljs-comment">/**
 * Create a middleware for filtering files.
 *
 * @param {Object} filters
 * @return {Function}
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">filterFiles</span> (<span class="hljs-params">filters</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">files, metalsmith, done</span>) =&gt;</span> {
    filter(files, filters, metalsmith.metadata(), done)
  }
}

<span class="hljs-comment">/**
 * Template in place plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderTemplateFiles</span> (<span class="hljs-params">skipInterpolation</span>) </span>{
  skipInterpolation = <span class="hljs-keyword">typeof</span> skipInterpolation === <span class="hljs-string">'string'</span>
    ? [skipInterpolation]
    : skipInterpolation    <span class="hljs-comment">//保证skipInterpolation是一个数组</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">files, metalsmith, done</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> keys = <span class="hljs-built_in">Object</span>.keys(files) <span class="hljs-comment">//获取files的所有key</span>
    <span class="hljs-keyword">const</span> metalsmithMetadata = metalsmith.metadata() <span class="hljs-comment">//获取metalsmith的所有变量</span>
    <span class="hljs-keyword">async</span>.each(keys, (file, next) =&gt; { <span class="hljs-comment">//异步处理所有files</span>
      <span class="hljs-comment">// skipping files with skipInterpolation option  </span>
      <span class="hljs-comment">// 跳过符合skipInterpolation的要求的file</span>
      <span class="hljs-keyword">if</span> (skipInterpolation &amp;&amp; multimatch([file], skipInterpolation, { <span class="hljs-attr">dot</span>: <span class="hljs-literal">true</span> }).length) {
        <span class="hljs-keyword">return</span> next()
      }
      <span class="hljs-comment">//获取文件的文本内容</span>
      <span class="hljs-keyword">const</span> str = files[file].contents.toString()
      <span class="hljs-comment">// do not attempt to render files that do not have mustaches</span>
      <span class="hljs-comment">//跳过不符合handlebars语法的file</span>
      <span class="hljs-keyword">if</span> (!<span class="hljs-regexp">/"{{"([^{}]+)"}}"/g</span>.test(str)) {  
        <span class="hljs-keyword">return</span> next()
      }
      <span class="hljs-comment">//渲染文件</span>
      render(str, metalsmithMetadata, (err, res) =&gt; {
        <span class="hljs-keyword">if</span> (err) {
          err.message = <span class="hljs-string">`[<span class="hljs-subst">${file}</span>] <span class="hljs-subst">${err.message}</span>`</span>
          <span class="hljs-keyword">return</span> next(err)
        }
        files[file].contents = <span class="hljs-keyword">new</span> Buffer(res)
        next()
      })
    }, done)
  }
}

<span class="hljs-comment">/**
 * Display template complete message.
 *
 * @param {String} message
 * @param {Object} data
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logMessage</span> (<span class="hljs-params">message, data</span>) </span>{
  <span class="hljs-keyword">if</span> (!message) <span class="hljs-keyword">return</span>  <span class="hljs-comment">//没有message直接退出函数</span>
  render(message, data, (err, res) =&gt; {
    <span class="hljs-keyword">if</span> (err) {
      <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'\n   Error when rendering template complete message: '</span> + err.message.trim())  <span class="hljs-comment">//渲染错误打印错误信息</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'\n'</span> + res.split(<span class="hljs-regexp">/\r?\n/g</span>).map(<span class="hljs-function"><span class="hljs-params">line</span> =&gt;</span> <span class="hljs-string">'   '</span> + line).join(<span class="hljs-string">'\n'</span>))
      <span class="hljs-comment">//渲染成功打印最终渲染的结果</span>
    }
  })
}
</code></pre>
<p><strong>引入的包：</strong></p>
<ul>
<li>
<strong>chalk</strong>    //用于高亮终端打印出来的信息。</li>
<li>
<strong>metalsmith</strong>   //静态网站生成器。</li>
<li>
<strong>handlebars</strong>  //知名的模板引擎。</li>
<li>
<strong>async</strong>  //非常强大的异步处理工具。</li>
<li>
<strong>consolidate</strong>  //支持各种模板引擎的渲染。</li>
<li>
<strong>path</strong>  //node自带path模块，用于路径的处理。</li>
<li>
<strong>multimatch</strong>  // 可以支持多个条件的匹配。</li>
<li>
<strong>options</strong>  //自定义工具-用于获取模板配置。</li>
<li>
<strong>ask</strong>  //自定义工具-用于询问开发者。</li>
<li>
<strong>filter</strong>  //自定义工具-用于文件过滤。</li>
<li>
<strong>logger</strong>  //自定义工具-用于日志打印。</li>
</ul>
<p><strong>主逻辑：</strong></p>
<p><strong>获取模板配置</strong> --&gt;<strong>初始化Metalsmith</strong> --&gt;<strong>添加一些变量至Metalsmith</strong> --&gt;<strong>handlebars模板注册helper</strong> --&gt;<strong>配置对象中是否有before函数，有则执行</strong> --&gt;<strong>询问问题</strong> --&gt;<strong>过滤文件</strong> --&gt;<strong>渲染模板文件</strong> --&gt;<strong>配置对象中是否有after函数，有则执行</strong> --&gt;<strong>最后构建项目内容</strong> --&gt;<strong>构建完成，成功若配置对象中有complete函数则执行，否则打印配置对象中的completeMessage信息，如果有错误，执行回调函数done(err)</strong> </p>
<p><strong>其他函数：</strong></p>
<ul>
<li>
<strong>askQuestions:</strong> 询问问题</li>
<li>
<strong>filterFiles:</strong> 过滤文件</li>
<li>
<strong>renderTemplateFiles:</strong> 渲染模板文件</li>
<li>
<strong>logMessage:</strong> 用于构建成功时，打印信息</li>
</ul>
<p><strong>Metalsmith插件格式：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function <function name> {
  return (files,metalsmith,done)=>{
    //逻辑代码
    ...
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-function"><span class="hljs-keyword">function</span></span> &lt;<span class="hljs-function"><span class="hljs-keyword">function</span></span> <span class="hljs-keyword">name</span>&gt; {
  <span class="hljs-keyword">return</span> (files,metalsmith,done)=&gt;{
    //逻辑代码
    ...
  }
}
</code></pre>
<h3 id="articleHeader12">options.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')
const metadata = require('read-metadata')
const exists = require('fs').existsSync
const getGitUser = require('./git-user')
const validateName = require('validate-npm-package-name')

/**
 * Read prompts metadata.
 *
 * @param {String} dir
 * @return {Object}
 */

module.exports = function options (name, dir) {
  const opts = getMetadata(dir)

  setDefault(opts, 'name', name)
  setValidateName(opts)

  const author = getGitUser()
  if (author) {
    setDefault(opts, 'author', author)
  }

  return opts
}

/**
 * Gets the metadata from either a meta.json or meta.js file.
 *
 * @param  {String} dir
 * @return {Object}
 */

function getMetadata (dir) {
  const json = path.join(dir, 'meta.json')
  const js = path.join(dir, 'meta.js')
  let opts = {}

  if (exists(json)) {
    opts = metadata.sync(json)
  } else if (exists(js)) {
    const req = require(path.resolve(js))
    if (req !== Object(req)) {
      throw new Error('meta.js needs to expose an object')
    }
    opts = req
  }

  return opts
}

/**
 * Set the default value for a prompt question
 *
 * @param {Object} opts
 * @param {String} key
 * @param {String} val
 */

function setDefault (opts, key, val) {
  if (opts.schema) {
    opts.prompts = opts.schema
    delete opts.schema
  }
  const prompts = opts.prompts || (opts.prompts = {})
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[key] = {
      'type': 'string',
      'default': val
    }
  } else {
    prompts[key]['default'] = val
  }
}

function setValidateName (opts) {
  const name = opts.prompts.name
  const customValidate = name.validate
  name.validate = name => {
    const its = validateName(name)
    if (!its.validForNewPackages) {
      const errors = (its.errors || []).concat(its.warnings || [])
      return 'Sorry, ' + errors.join(' and ') + '.'
    }
    if (typeof customValidate === 'function') return customValidate(name)
    return true
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> metadata = <span class="hljs-built_in">require</span>(<span class="hljs-string">'read-metadata'</span>)
<span class="hljs-keyword">const</span> exists = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>).existsSync
<span class="hljs-keyword">const</span> getGitUser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./git-user'</span>)
<span class="hljs-keyword">const</span> validateName = <span class="hljs-built_in">require</span>(<span class="hljs-string">'validate-npm-package-name'</span>)

<span class="hljs-comment">/**
 * Read prompts metadata.
 *
 * @param {String} dir
 * @return {Object}
 */</span>

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">options</span> (<span class="hljs-params">name, dir</span>) </span>{
  <span class="hljs-keyword">const</span> opts = getMetadata(dir)

  setDefault(opts, <span class="hljs-string">'name'</span>, name)
  setValidateName(opts)

  <span class="hljs-keyword">const</span> author = getGitUser()
  <span class="hljs-keyword">if</span> (author) {
    setDefault(opts, <span class="hljs-string">'author'</span>, author)
  }

  <span class="hljs-keyword">return</span> opts
}

<span class="hljs-comment">/**
 * Gets the metadata from either a meta.json or meta.js file.
 *
 * @param  {String} dir
 * @return {Object}
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getMetadata</span> (<span class="hljs-params">dir</span>) </span>{
  <span class="hljs-keyword">const</span> json = path.join(dir, <span class="hljs-string">'meta.json'</span>)
  <span class="hljs-keyword">const</span> js = path.join(dir, <span class="hljs-string">'meta.js'</span>)
  <span class="hljs-keyword">let</span> opts = {}

  <span class="hljs-keyword">if</span> (exists(json)) {
    opts = metadata.sync(json)
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (exists(js)) {
    <span class="hljs-keyword">const</span> req = <span class="hljs-built_in">require</span>(path.resolve(js))
    <span class="hljs-keyword">if</span> (req !== <span class="hljs-built_in">Object</span>(req)) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'meta.js needs to expose an object'</span>)
    }
    opts = req
  }

  <span class="hljs-keyword">return</span> opts
}

<span class="hljs-comment">/**
 * Set the default value for a prompt question
 *
 * @param {Object} opts
 * @param {String} key
 * @param {String} val
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setDefault</span> (<span class="hljs-params">opts, key, val</span>) </span>{
  <span class="hljs-keyword">if</span> (opts.schema) {
    opts.prompts = opts.schema
    <span class="hljs-keyword">delete</span> opts.schema
  }
  <span class="hljs-keyword">const</span> prompts = opts.prompts || (opts.prompts = {})
  <span class="hljs-keyword">if</span> (!prompts[key] || <span class="hljs-keyword">typeof</span> prompts[key] !== <span class="hljs-string">'object'</span>) {
    prompts[key] = {
      <span class="hljs-string">'type'</span>: <span class="hljs-string">'string'</span>,
      <span class="hljs-string">'default'</span>: val
    }
  } <span class="hljs-keyword">else</span> {
    prompts[key][<span class="hljs-string">'default'</span>] = val
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setValidateName</span> (<span class="hljs-params">opts</span>) </span>{
  <span class="hljs-keyword">const</span> name = opts.prompts.name
  <span class="hljs-keyword">const</span> customValidate = name.validate
  name.validate = <span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> its = validateName(name)
    <span class="hljs-keyword">if</span> (!its.validForNewPackages) {
      <span class="hljs-keyword">const</span> errors = (its.errors || []).concat(its.warnings || [])
      <span class="hljs-keyword">return</span> <span class="hljs-string">'Sorry, '</span> + errors.join(<span class="hljs-string">' and '</span>) + <span class="hljs-string">'.'</span>
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> customValidate === <span class="hljs-string">'function'</span>) <span class="hljs-keyword">return</span> customValidate(name)
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  }
}
</code></pre>
<p><strong>引入的包：</strong></p>
<ul>
<li>
<strong>path</strong>    //node自带path模块，用于路径的处理</li>
<li>
<strong>read-metadata</strong>    //用于读取json或者yaml元数据文件并返回一个对象</li>
<li>
<strong>fs.existsSync</strong>    //node自带fs模块的existsSync方法，用于检测路径是否存在</li>
<li>
<strong>git-user</strong>    //获取本地的git配置</li>
<li>
<strong>validate-npm-package-name</strong>  //用于npm包的名字是否是合法的</li>
</ul>
<p><strong>作用：</strong></p>
<ul>
<li>
<strong>主方法:</strong> 第一步：先获取模板的配置文件信息；第二步：设置name字段并检测name是否合法；第三步：只是author字段。</li>
<li>
<strong>getMetadata:</strong> 获取meta.js或则meta.json中的配置信息</li>
<li>
<strong>setDefault:</strong> 用于向配置对象中添加一下默认字段</li>
<li>
<strong>setValidateName:</strong> 用于检测配置对象中name字段是否合法</li>
</ul>
<h4>git-user.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const exec = require('child_process').execSync

module.exports = () => {
  let name
  let email

  try {
    name = exec('git config --get user.name')
    email = exec('git config --get user.email')
  } catch (e) {}

  name = name &amp;&amp; JSON.stringify(name.toString().trim()).slice(1, -1)
  email = email &amp;&amp; (' <' + email.toString().trim() + '>')
  return (name || '') + (email || '')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>const <span class="hljs-built_in">exec</span> = require(<span class="hljs-string">'child_process'</span>).execSync

module.exports = () =&gt; {
  let <span class="hljs-built_in">name</span>
  let email

  <span class="hljs-keyword">try</span> {
    <span class="hljs-built_in">name</span> = <span class="hljs-built_in">exec</span>(<span class="hljs-string">'git config --get user.name'</span>)
    email = <span class="hljs-built_in">exec</span>(<span class="hljs-string">'git config --get user.email'</span>)
  } <span class="hljs-keyword">catch</span> (e) {}

  <span class="hljs-built_in">name</span> = <span class="hljs-built_in">name</span> &amp;&amp; JSON.stringify(<span class="hljs-built_in">name</span>.<span class="hljs-built_in">toString</span>().trim()).slice(<span class="hljs-number">1</span>, -<span class="hljs-number">1</span>)
  email = email &amp;&amp; (<span class="hljs-string">' &lt;'</span> + email.<span class="hljs-built_in">toString</span>().trim() + <span class="hljs-string">'&gt;'</span>)
  return (<span class="hljs-built_in">name</span> || <span class="hljs-string">''</span>) + (email || <span class="hljs-string">''</span>)
}</code></pre>
<p><strong>引入的包：</strong></p>
<ul><li>
<strong>child_process.execSync</strong>    //node自带模块child_process中的execSync方法用于新开一个shell并执行相应的command，并返回相应的输出。</li></ul>
<p><strong>作用：</strong> 用于获取本地的git配置的用户名和邮件，并返回格式 <strong>姓名&lt;邮箱&gt;</strong> 的字符串。</p>
<h3 id="articleHeader13">eval.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const chalk = require('chalk')

/**
 * Evaluate an expression in meta.json in the context of
 * prompt answers data.
 */

module.exports = function evaluate (exp, data) {
  /* eslint-disable no-new-func */
  const fn = new Function('data', 'with (data) { return ' + exp + '}')
  try {
    return fn(data)
  } catch (e) {
    console.error(chalk.red('Error when evaluating filter condition: ' + exp))
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)

<span class="hljs-comment">/**
 * Evaluate an expression in meta.json in the context of
 * prompt answers data.
 */</span>

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">evaluate</span> (<span class="hljs-params">exp, data</span>) </span>{
  <span class="hljs-comment">/* eslint-disable no-new-func */</span>
  <span class="hljs-keyword">const</span> fn = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">'data'</span>, <span class="hljs-string">'with (data) { return '</span> + exp + <span class="hljs-string">'}'</span>)
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">return</span> fn(data)
  } <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-built_in">console</span>.error(chalk.red(<span class="hljs-string">'Error when evaluating filter condition: '</span> + exp))
  }
}</code></pre>
<p><strong>引入的包：</strong></p>
<ul><li>
<strong>chalk</strong>    //用于高亮终端打印出来的信息。</li></ul>
<p><strong>作用：</strong> 在data的作用域执行exp表达式并返回其执行得到的值</p>
<h3 id="articleHeader14">ask.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const async = require('async')
const inquirer = require('inquirer')
const evaluate = require('./eval')

// Support types from prompt-for which was used before
const promptMapping = {
  string: 'input',
  boolean: 'confirm'
}

/**
 * Ask questions, return results.
 *
 * @param {Object} prompts
 * @param {Object} data
 * @param {Function} done
 */
 
/**
 * prompts meta.js或者meta.json中的prompts字段
 * data metalsmith.metadata()
 * done 交于下一个metalsmith插件处理
 */
module.exports = function ask (prompts, data, done) {
 //遍历处理prompts下的每一个字段
  async.eachSeries(Object.keys(prompts), (key, next) => {
    prompt(data, key, prompts[key], next)
  }, done)
}

/**
 * Inquirer prompt wrapper.
 *
 * @param {Object} data
 * @param {String} key
 * @param {Object} prompt
 * @param {Function} done
 */

function prompt (data, key, prompt, done) {
  // skip prompts whose when condition is not met
  if (prompt.when &amp;&amp; !evaluate(prompt.when, data)) {
    return done()
  }

  //获取默认值
  let promptDefault = prompt.default
  if (typeof prompt.default === 'function') {
    promptDefault = function () {
      return prompt.default.bind(this)(data)
    }
  }
  //设置问题，具体使用方法可去https://github.com/SBoudrias/Inquirer.js上面查看
  inquirer.prompt([{
    type: promptMapping[prompt.type] || prompt.type,
    name: key,
    message: prompt.message || prompt.label || key,
    default: promptDefault,
    choices: prompt.choices || [],
    validate: prompt.validate || (() => true)
  }]).then(answers => {
    if (Array.isArray(answers[key])) { 
      //当答案是一个数组时
      data[key] = {}
      answers[key].forEach(multiChoiceAnswer => {
        data[key][multiChoiceAnswer] = true
      })
    } else if (typeof answers[key] === 'string') {
     //当答案是一个字符串时
      data[key] = answers[key].replace(/&quot;/g, '\\&quot;')
    } else {
     //其他情况
      data[key] = answers[key]
    }
    done()
  }).catch(done)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> <span class="hljs-keyword">async</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">'async'</span>)
<span class="hljs-keyword">const</span> inquirer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'inquirer'</span>)
<span class="hljs-keyword">const</span> evaluate = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./eval'</span>)

<span class="hljs-comment">// Support types from prompt-for which was used before</span>
<span class="hljs-keyword">const</span> promptMapping = {
  <span class="hljs-built_in">string</span>: <span class="hljs-string">'input'</span>,
  <span class="hljs-built_in">boolean</span>: <span class="hljs-string">'confirm'</span>
}

<span class="hljs-comment">/**
 * Ask questions, return results.
 *
 * @param {Object} prompts
 * @param {Object} data
 * @param {Function} done
 */</span>
 
<span class="hljs-comment">/**
 * prompts meta.js或者meta.json中的prompts字段
 * data metalsmith.metadata()
 * done 交于下一个metalsmith插件处理
 */</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ask</span> (<span class="hljs-params">prompts, data, done</span>) </span>{
 <span class="hljs-comment">//遍历处理prompts下的每一个字段</span>
  <span class="hljs-keyword">async</span>.eachSeries(<span class="hljs-built_in">Object</span>.keys(prompts), <span class="hljs-function">(<span class="hljs-params">key, next</span>) =&gt;</span> {
    prompt(data, key, prompts[key], next)
  }, done)
}

<span class="hljs-comment">/**
 * Inquirer prompt wrapper.
 *
 * @param {Object} data
 * @param {String} key
 * @param {Object} prompt
 * @param {Function} done
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">prompt</span> (<span class="hljs-params">data, key, prompt, done</span>) </span>{
  <span class="hljs-comment">// skip prompts whose when condition is not met</span>
  <span class="hljs-keyword">if</span> (prompt.when &amp;&amp; !evaluate(prompt.when, data)) {
    <span class="hljs-keyword">return</span> done()
  }

  <span class="hljs-comment">//获取默认值</span>
  <span class="hljs-keyword">let</span> promptDefault = prompt.default
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> prompt.default === <span class="hljs-string">'function'</span>) {
    promptDefault = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> prompt.default.bind(<span class="hljs-keyword">this</span>)(data)
    }
  }
  <span class="hljs-comment">//设置问题，具体使用方法可去https://github.com/SBoudrias/Inquirer.js上面查看</span>
  inquirer.prompt([{
    <span class="hljs-keyword">type</span>: promptMapping[prompt.type] || prompt.type,
    name: key,
    message: prompt.message || prompt.label || key,
    <span class="hljs-keyword">default</span>: promptDefault,
    choices: prompt.choices || [],
    validate: prompt.validate || <span class="hljs-function">(<span class="hljs-params">(<span class="hljs-params"></span>) =&gt; <span class="hljs-literal">true</span></span>)
  }]).<span class="hljs-params">then</span>(<span class="hljs-params">answers =&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-params"><span class="hljs-built_in">Array</span>.isArray(<span class="hljs-params">answers[key]</span>)</span>) { 
      <span class="hljs-comment">//当答案是一个数组时</span>
      data[key] = {}
      answers[key].forEach(<span class="hljs-params">multiChoiceAnswer =&gt; {
        data[key][multiChoiceAnswer] = <span class="hljs-literal">true</span>
      }</span>)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-params"><span class="hljs-keyword">typeof</span> answers[key] === '<span class="hljs-built_in">string</span>'</span>) {
     <span class="hljs-comment">//当答案是一个字符串时</span>
      data[key] = answers[key].replace(<span class="hljs-params">/"/g, '\\"'</span>)
    } <span class="hljs-keyword">else</span> {
     <span class="hljs-comment">//其他情况</span>
      data[key] = answers[key]
    }
    done(<span class="hljs-params"></span>)
  }</span>).<span class="hljs-params">catch</span>(<span class="hljs-params">done</span>)
}
</span></code></pre>
<p><strong>引入的包：</strong></p>
<ul>
<li>
<strong>async</strong>    //异步处理工具。</li>
<li>
<strong>inquirer</strong>  //命令行与用户之间的交互</li>
<li>
<strong>eval</strong>      //返回某作用下表达式的值</li>
</ul>
<p><strong>作用：</strong> 将meta.js或者meta.json中的prompts字段解析成对应的问题询问。</p>
<h3 id="articleHeader15">filter.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const match = require('minimatch')
const evaluate = require('./eval')
/**
 * files 模板内的所有文件
 * filters meta.js或者meta.json的filters字段
 * data metalsmith.metadata()
 * done  交于下一个metalsmith插件处理
 */
module.exports = (files, filters, data, done) => {
  if (!filters) {
    //meta.js或者meta.json没有filters字段直接跳过交于下一个metalsmith插件处理
    return done()
  }
  //获取所有文件的名字
  const fileNames = Object.keys(files)
  //遍历meta.js或者meta.json没有filters下的所有字段
  Object.keys(filters).forEach(glob => {
    //遍历所有文件名
    fileNames.forEach(file => {
      //如果有文件名跟filters下的某一个字段匹配上
      if (match(file, glob, { dot: true })) {        
        const condition = filters[glob]
        if (!evaluate(condition, data)) {
          //如果metalsmith.metadata()下condition表达式不成立，删除该文件
          delete files[file]
        }
      }
    })
  })
  done()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> match = <span class="hljs-built_in">require</span>(<span class="hljs-string">'minimatch'</span>)
<span class="hljs-keyword">const</span> evaluate = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./eval'</span>)
<span class="hljs-comment">/**
 * files 模板内的所有文件
 * filters meta.js或者meta.json的filters字段
 * data metalsmith.metadata()
 * done  交于下一个metalsmith插件处理
 */</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function">(<span class="hljs-params">files, filters, data, done</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (!filters) {
    <span class="hljs-comment">//meta.js或者meta.json没有filters字段直接跳过交于下一个metalsmith插件处理</span>
    <span class="hljs-keyword">return</span> done()
  }
  <span class="hljs-comment">//获取所有文件的名字</span>
  <span class="hljs-keyword">const</span> fileNames = <span class="hljs-built_in">Object</span>.keys(files)
  <span class="hljs-comment">//遍历meta.js或者meta.json没有filters下的所有字段</span>
  <span class="hljs-built_in">Object</span>.keys(filters).forEach(<span class="hljs-function"><span class="hljs-params">glob</span> =&gt;</span> {
    <span class="hljs-comment">//遍历所有文件名</span>
    fileNames.forEach(<span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> {
      <span class="hljs-comment">//如果有文件名跟filters下的某一个字段匹配上</span>
      <span class="hljs-keyword">if</span> (match(file, glob, { <span class="hljs-attr">dot</span>: <span class="hljs-literal">true</span> })) {        
        <span class="hljs-keyword">const</span> condition = filters[glob]
        <span class="hljs-keyword">if</span> (!evaluate(condition, data)) {
          <span class="hljs-comment">//如果metalsmith.metadata()下condition表达式不成立，删除该文件</span>
          <span class="hljs-keyword">delete</span> files[file]
        }
      }
    })
  })
  done()
}</code></pre>
<p><strong>引入的包：</strong></p>
<ul>
<li>
<strong>minimatch</strong>  //字符匹配工具</li>
<li>
<strong>eval</strong>      //返回某作用下表达式的值</li>
</ul>
<p><strong>作用：</strong> 根据metalsmith.metadata()删除一些不需要的模板文件，而metalsmith.metadata()主要在ask.js中改变的，也就是说ask.js中获取到用户的需求。</p>
<h3 id="articleHeader16">logger.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const chalk = require('chalk')
const format = require('util').format

/**
 * Prefix.
 */

const prefix = '   vue-cli'
const sep = chalk.gray('·')

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */

exports.log = function (...args) {
  const msg = format.apply(format, args)
  console.log(chalk.white(prefix), sep, msg)
}

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */

exports.fatal = function (...args) {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  const msg = format.apply(format, args)
  console.error(chalk.red(prefix), sep, msg)
  process.exit(1)
}

/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */

exports.success = function (...args) {
  const msg = format.apply(format, args)
  console.log(chalk.white(prefix), sep, msg)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> chalk = require(<span class="hljs-string">'chalk'</span>)
<span class="hljs-keyword">const</span> format = require(<span class="hljs-string">'util'</span>).format

<span class="hljs-comment">/**
 * Prefix.
 */</span>

<span class="hljs-keyword">const</span> prefix = <span class="hljs-string">'   vue-cli'</span>
<span class="hljs-keyword">const</span> sep = chalk.gray(<span class="hljs-string">'·'</span>)

<span class="hljs-comment">/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */</span>

exports.log = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
  <span class="hljs-keyword">const</span> msg = format.apply(format, args)
  console.log(chalk.white(prefix), sep, msg)
}

<span class="hljs-comment">/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */</span>

exports.fatal = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
  <span class="hljs-keyword">if</span> (args[<span class="hljs-number">0</span>] <span class="hljs-keyword">instanceof</span> Error) args[<span class="hljs-number">0</span>] = args[<span class="hljs-number">0</span>].message.trim()
  <span class="hljs-keyword">const</span> msg = format.apply(format, args)
  console.error(chalk.red(prefix), sep, msg)
  process.exit(<span class="hljs-number">1</span>)
}

<span class="hljs-comment">/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */</span>

exports.success = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
  <span class="hljs-keyword">const</span> msg = format.apply(format, args)
  console.log(chalk.white(prefix), sep, msg)
}</code></pre>
<p><strong>引入的包：</strong></p>
<ul>
<li>
<strong>chalk</strong>    //用于高亮终端打印出来的信息。</li>
<li>
<strong>format</strong>   //node自带的util模块中的format方法。</li>
</ul>
<p><strong>作用：</strong> logger.js主要提供三个方法log（常规日志）、fatal（错误日志）、success（成功日志）。每个方法都挺简单的，我就不错过多的解释了。</p>
<h3 id="articleHeader17">local-path.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')

module.exports = {
  isLocalPath (templatePath) {
    return /^[./]|(^[a-zA-Z]:)/.test(templatePath)
  },

  getTemplatePath (templatePath) {
    return path.isAbsolute(templatePath)
      ? templatePath
      : path.normalize(path.join(process.cwd(), templatePath))
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-keyword">const</span> path = require(<span class="hljs-string">'path'</span>)

module.exports = {
  isLocalPath (templatePath) {
    <span class="hljs-keyword">return</span> /^[./]|(^[a-zA-Z]:)/.test(templatePath)
  },

  getTemplatePath (templatePath) {
    <span class="hljs-keyword">return</span> path.isAbsolute(templatePath)
      ? templatePath
      : path.normalize(path.join(process.cwd(), templatePath))
  }
}</code></pre>
<p><strong>引入的包：</strong></p>
<ul><li>
<strong>path</strong>    //node自带的路径处理工具。</li></ul>
<p><strong>作用：</strong></p>
<ul>
<li>
<strong>isLocalPath:</strong>  UNIX (以“.”或者"/"开头)   WINDOWS(以形如：“C：”的方式开头)。</li>
<li>
<strong>getTemplatePath:</strong>  templatePath是否为绝对路径，是则返回templatePath 否则转换成绝对路径并规范化。</li>
</ul>
<h3 id="articleHeader18">check-version.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const request = require('request')
const semver = require('semver')
const chalk = require('chalk')
const packageConfig = require('../package.json')

module.exports = done => {
  // Ensure minimum supported node version is used
  if (!semver.satisfies(process.version, packageConfig.engines.node)) {
    return console.log(chalk.red(
      '  You must upgrade node to >=' + packageConfig.engines.node + '.x to use vue-cli'
    ))
  }

  request({
    url: 'https://registry.npmjs.org/vue-cli',
    timeout: 1000
  }, (err, res, body) => {
    if (!err &amp;&amp; res.statusCode === 200) {
      const latestVersion = JSON.parse(body)['dist-tags'].latest
      const localVersion = packageConfig.version
      if (semver.lt(localVersion, latestVersion)) {
        console.log(chalk.yellow('  A newer version of vue-cli is available.'))
        console.log()
        console.log('  latest:    ' + chalk.green(latestVersion))
        console.log('  installed: ' + chalk.red(localVersion))
        console.log()
      }
    }
    done()
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">'request'</span>)
<span class="hljs-keyword">const</span> semver = <span class="hljs-built_in">require</span>(<span class="hljs-string">'semver'</span>)
<span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)
<span class="hljs-keyword">const</span> packageConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../package.json'</span>)

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">done</span> =&gt;</span> {
  <span class="hljs-comment">// Ensure minimum supported node version is used</span>
  <span class="hljs-keyword">if</span> (!semver.satisfies(process.version, packageConfig.engines.node)) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(chalk.red(
      <span class="hljs-string">'  You must upgrade node to &gt;='</span> + packageConfig.engines.node + <span class="hljs-string">'.x to use vue-cli'</span>
    ))
  }

  request({
    url: <span class="hljs-string">'https://registry.npmjs.org/vue-cli'</span>,
    timeout: <span class="hljs-number">1000</span>
  }, <span class="hljs-function">(<span class="hljs-params">err, res, body</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (!err &amp;&amp; res.statusCode === <span class="hljs-number">200</span>) {
      <span class="hljs-keyword">const</span> latestVersion = <span class="hljs-built_in">JSON</span>.parse(body)[<span class="hljs-string">'dist-tags'</span>].latest
      <span class="hljs-keyword">const</span> localVersion = packageConfig.version
      <span class="hljs-keyword">if</span> (semver.lt(localVersion, latestVersion)) {
        <span class="hljs-built_in">console</span>.log(chalk.yellow(<span class="hljs-string">'  A newer version of vue-cli is available.'</span>))
        <span class="hljs-built_in">console</span>.log()
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'  latest:    '</span> + chalk.green(latestVersion))
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'  installed: '</span> + chalk.red(localVersion))
        <span class="hljs-built_in">console</span>.log()
      }
    }
    done()
  })
}
</code></pre>
<p><strong>引入的包：</strong></p>
<ul>
<li>
<strong>request</strong>    //http请求工具。</li>
<li>
<strong>semver</strong>    //版本号处理工具。</li>
<li>
<strong>chalk</strong>    //用于高亮终端打印出来的信息。</li>
</ul>
<p><strong>作用：</strong></p>
<ul>
<li>第一步：检查本地的node版本号，是否达到<strong>package.json</strong>文件中对node版本的要求，若低于node<strong>package.json</strong>文件中要求的版本，则直接要求开发者更新自己的node版本。反之，可开始第二步。</li>
<li>第二步： 通过请求<strong><a href="https://registry.npmjs.org/vue-cli" rel="nofollow noreferrer" target="_blank">https://registry.npmjs.org/vu...</a></strong>来获取<strong>vue-cli</strong>的最新版本号，跟<strong>package.json</strong>中的<strong>version</strong>字段进行比较，若本地的版本号小于最新的版本号，则提示有最新版本可以更新。这里需要注意的是，这里检查版本号并不影响后续的流程，即便本地的<strong>vue-cli</strong>版本不是最新的，也不影响构建，仅仅提示一下。</li>
</ul>
<h3 id="articleHeader19">warnings.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const chalk = require('chalk')

module.exports = {
  v2SuffixTemplatesDeprecated (template, name) {
    const initCommand = 'vue init ' + template.replace('-2.0', '') + ' ' + name

    console.log(chalk.red('  This template is deprecated, as the original template now uses Vue 2.0 by default.'))
    console.log()
    console.log(chalk.yellow('  Please use this command instead: ') + chalk.green(initCommand))
    console.log()
  },
  v2BranchIsNowDefault (template, name) {
    const vue1InitCommand = 'vue init ' + template + '#1.0' + ' ' + name

    console.log(chalk.green('  This will install Vue 2.x version of the template.'))
    console.log()
    console.log(chalk.yellow('  For Vue 1.x use: ') + chalk.green(vue1InitCommand))
    console.log()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-keyword">const</span> chalk = require(<span class="hljs-string">'chalk'</span>)

module.exports = {
  v2SuffixTemplatesDeprecated (template, name) {
    <span class="hljs-keyword">const</span> initCommand = <span class="hljs-string">'vue init '</span> + template.replace(<span class="hljs-string">'-2.0'</span>, <span class="hljs-string">''</span>) + <span class="hljs-string">' '</span> + name

    console.<span class="hljs-built_in">log</span>(chalk.<span class="hljs-built_in">red</span>(<span class="hljs-string">'  This template is deprecated, as the original template now uses Vue 2.0 by default.'</span>))
    console.<span class="hljs-built_in">log</span>()
    console.<span class="hljs-built_in">log</span>(chalk.yellow(<span class="hljs-string">'  Please use this command instead: '</span>) + chalk.<span class="hljs-built_in">green</span>(initCommand))
    console.<span class="hljs-built_in">log</span>()
  },
  v2BranchIsNowDefault (template, name) {
    <span class="hljs-keyword">const</span> vue1InitCommand = <span class="hljs-string">'vue init '</span> + template + <span class="hljs-string">'#1.0'</span> + <span class="hljs-string">' '</span> + name

    console.<span class="hljs-built_in">log</span>(chalk.<span class="hljs-built_in">green</span>(<span class="hljs-string">'  This will install Vue 2.x version of the template.'</span>))
    console.<span class="hljs-built_in">log</span>()
    console.<span class="hljs-built_in">log</span>(chalk.yellow(<span class="hljs-string">'  For Vue 1.x use: '</span>) + chalk.<span class="hljs-built_in">green</span>(vue1InitCommand))
    console.<span class="hljs-built_in">log</span>()
  }
}</code></pre>
<p><strong>引入的包：</strong></p>
<ul><li>
<strong>chalk</strong>    //用于高亮终端打印出来的信息。</li></ul>
<p><strong>作用：</strong></p>
<ul>
<li>
<strong>v2SuffixTemplatesDeprecated</strong>：提示带“-2.0”的模板已经弃用了，官方模板默认用2.0了。不需要用“-2.0”来区分vue1.0和vue2.0了。</li>
<li>
<strong>v2BranchIsNowDefault：</strong> 这个方法在<strong>vue-init文件中</strong>已经被注释掉，不再使用了。在vue1.0向vue2.0过渡的时候用到过，现在都是默认2.0了，自然也就不用了。</li>
</ul>
<h2 id="articleHeader20">总结</h2>
<p>由于代码比较多，很多代码我就没有一一细讲了，一些比较简单或者不是很重要的js文件，我就单单说明了它的作用了。但是重点的js文件，我还是加了很多注解在上面。其中我个人认为比较重点的文件就是<strong>vue-init</strong>、<strong>generate.js</strong>、<strong>options.js</strong>、<strong>ask.js</strong>、<strong>filter.js</strong>,这五个文件构成了<strong>vue-cli</strong>构建项目的主流程，因此需要我们花更多的时间在上面。另外，我们在读源码的过程中，一定要理清楚整个构建流程是什么样子的，心里得有一个谱。读完源码之后，我个人是建议自己动手搭建一个构建工具，这样的话印象才会更加深刻，个人成长会更大点。我自己在读完整个<strong>vue-cli</strong>之后，我自己根据<strong>vue-cli</strong>的流程也动手搞了一个脚手架工具，仅供大家参考学习一下。地址如下：</p>
<blockquote><a href="https://github.com/ruichengping/asuna-cli" rel="nofollow noreferrer" target="_blank">https://github.com/ruichengpi...</a></blockquote>
<p>最后祝愿大家可以在前端的道路上越走越好！如果喜欢我的文章，请记得关注我哦！后续会推出更多的优质的文章哦，敬请期待！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
走进Vue-cli源码，自己动手搭建前端脚手架工具

## 原文链接
[https://segmentfault.com/a/1190000013975247](https://segmentfault.com/a/1190000013975247)


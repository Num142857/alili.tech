---
title: '造轮子之 npm i -g creatshare-app-init 源码浅析' 
date: 2018-12-27 2:30:12
hidden: true
slug: ghsi4v3zl9
categories: [reprint]
---

{{< raw >}}

                    
<p>以我的小经验来看，软件萌新写出来的代码大多“无法直视”。具体现象包括空格和换行符乱用、文件夹和变量的命名多使用拼音等。坐不住的我，便想到了通过 ESLint 配置文件来规范实验室的 JavaScript 代码规范的 Idea。</p>
<p>于是巧遇前实验室毕业学长曾经发布的 npm 包——<a href="https://github.com/mennghao/creatshare-project-quick-init" rel="nofollow noreferrer" target="_blank">creatshare-project-quick-init</a>。安装好这个包，我们便可以在空文件夹下生成一个项目的基础骨架。</p>
<p><a href="https://www.npmjs.com/package/creatshare-app-init" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2558748-f96e77fb26a49852.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2558748-f96e77fb26a49852.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" title="" style="cursor: pointer; display: inline;"></span></a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dist  //发布目录，用于生产环境
src   //开发目录，开发时所需资源
|----dist  //测试环境目录
|     |----static
|             |----css  //编译打包后的css资源
|             |----js   //打包压缩后的js资源
|             |----imgs //测试环境图片资源
|----less  //开发所需less代码
|----js    //开发所需js代码
|    |----lib //库或框架资源
|----imgs  //开发所需图片资源
index.html    //开发页面
gulpfile.js
package.json
README.md" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-built_in">dist</span>  <span class="hljs-comment">//发布目录，用于生产环境</span>
src   <span class="hljs-comment">//开发目录，开发时所需资源</span>
|----<span class="hljs-built_in">dist</span>  <span class="hljs-comment">//测试环境目录</span>
|     |----<span class="hljs-keyword">static</span>
|             |----css  <span class="hljs-comment">//编译打包后的css资源</span>
|             |----js   <span class="hljs-comment">//打包压缩后的js资源</span>
|             |----imgs <span class="hljs-comment">//测试环境图片资源</span>
|----less  <span class="hljs-comment">//开发所需less代码</span>
|----js    <span class="hljs-comment">//开发所需js代码</span>
|    |----lib <span class="hljs-comment">//库或框架资源</span>
|----imgs  <span class="hljs-comment">//开发所需图片资源</span>
index.html    <span class="hljs-comment">//开发页面</span>
gulpfile.js
<span class="hljs-keyword">package</span>.json
README.md</code></pre>
<p><strong><em>What a good idea~!</em></strong></p>
<p>在学长的这个包中，主要构建了 gulp 配置，less 和测试文件的骨架。虽然再无更多内容，但这份构建基础骨架的灵感还是被我愉快的收走了——学前端的人很多，但大多都太缺工程化意识了。于是，这个灵感成为了不错突破口。</p>
<p>creatshare-app-init 脚手架孕育而生。</p>
<h1 id="articleHeader0">0</h1>
<p>通过这篇文章，你能了解到：</p>
<ul>
<li>如何用 NodeJS 编写命令行工具？</li>
<li>如何发布自己的 npm 包？</li>
<li>笔者与 creatshare-app-init 的故事？</li>
</ul>
<p>在本文中，或多或少出现过以下关键字，我的解释是：</p>
<ul>
<li>轮子：该词在前端开发日常用语中，表示一个基于原生代码实现，但并没有对前端行业产生积极意义的模块。虽然它的出现方便了一些人的使用，但更多的加大了我们的学习成本。</li>
<li>项目：该词在前端领域常指一个服务于用户的软件立项。</li>
<li>模块：<code>creatshare-app-init</code> 就是一个模块，是开发前端项目中的一个子集。正如汽车的各个部件一样，多个模块合理组装起来才是一辆汽车。</li>
</ul>
<h1 id="articleHeader1">1</h1>
<p>尝试解析源码，第一步，从模块根目录下的 <code>package.json</code> 来看。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dependencies&quot;: {
    &quot;commander&quot;: &quot;^2.11.0&quot;
},
&quot;devDependencies&quot;: {
    &quot;babel-plugin-transform-runtime&quot;: &quot;^6.23.0&quot;,
    &quot;babel-preset-es2015&quot;: &quot;^6.24.1&quot;,
    &quot;babel-preset-stage-2&quot;: &quot;^6.24.1&quot;,
    &quot;babel-runtime&quot;: &quot;^6.26.0&quot;,
    &quot;eslint-config-standard&quot;: &quot;^10.2.1&quot;,
    &quot;eslint-plugin-import&quot;: &quot;^2.8.0&quot;,
    &quot;eslint-plugin-node&quot;: &quot;^5.2.1&quot;,
    &quot;eslint-plugin-promise&quot;: &quot;^3.6.0&quot;,
    &quot;eslint-plugin-standard&quot;: &quot;^3.0.1&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"commander"</span>: <span class="hljs-string">"^2.11.0"</span>
},
<span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-string">"babel-plugin-transform-runtime"</span>: <span class="hljs-string">"^6.23.0"</span>,
    <span class="hljs-string">"babel-preset-es2015"</span>: <span class="hljs-string">"^6.24.1"</span>,
    <span class="hljs-string">"babel-preset-stage-2"</span>: <span class="hljs-string">"^6.24.1"</span>,
    <span class="hljs-string">"babel-runtime"</span>: <span class="hljs-string">"^6.26.0"</span>,
    <span class="hljs-string">"eslint-config-standard"</span>: <span class="hljs-string">"^10.2.1"</span>,
    <span class="hljs-string">"eslint-plugin-import"</span>: <span class="hljs-string">"^2.8.0"</span>,
    <span class="hljs-string">"eslint-plugin-node"</span>: <span class="hljs-string">"^5.2.1"</span>,
    <span class="hljs-string">"eslint-plugin-promise"</span>: <span class="hljs-string">"^3.6.0"</span>,
    <span class="hljs-string">"eslint-plugin-standard"</span>: <span class="hljs-string">"^3.0.1"</span>
}</code></pre>
<p>如上，<code>dependencies</code> 声明了模块上线时的依赖，<code>devDependencies</code> 声明了模块开发时的依赖。该模块在上线时，即 npm 包被用户用到时，只需要 <code>commander</code> 库。<code>commander</code> 库是 NodeJS 命令行接口开发的优选解决方案，受启发于 Ruby 的 commander。在解析 <code>bin/index.js</code> 源码时将详细拓展。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;name&quot;: &quot;creatshare-app-init&quot;,
&quot;version&quot;: &quot;2.1.0&quot;,
&quot;description&quot;: &quot;CreatShare 实验室前端项目初始化工具&quot;,
&quot;bin&quot;: {
  &quot;cs&quot;: &quot;bin/index.js&quot;
},
&quot;scripts&quot;: {
  &quot;compile&quot;: &quot;babel src/ -d lib/&quot;,
  &quot;prepublish&quot;: &quot;npm run compile&quot;,
  &quot;eslint&quot;: &quot;eslint src bin&quot;,
  &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-string">"name"</span>: <span class="hljs-string">"creatshare-app-init"</span>,
<span class="hljs-string">"version"</span>: <span class="hljs-string">"2.1.0"</span>,
<span class="hljs-string">"description"</span>: <span class="hljs-string">"CreatShare 实验室前端项目初始化工具"</span>,
<span class="hljs-string">"bin"</span>: {
  <span class="hljs-string">"cs"</span>: <span class="hljs-string">"bin/index.js"</span>
},
<span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"compile"</span>: <span class="hljs-string">"babel src/ -d lib/"</span>,
  <span class="hljs-string">"prepublish"</span>: <span class="hljs-string">"npm run compile"</span>,
  <span class="hljs-string">"eslint"</span>: <span class="hljs-string">"eslint src bin"</span>,
  <span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"</span><span class="hljs-keyword">Error</span>: <span class="hljs-keyword">no</span> <span class="hljs-keyword">test</span> specified\<span class="hljs-string">" &amp;&amp; exit 1"</span>
},</code></pre>
<p>上面一段是 <code>package.json</code> 最开头的内容，字段详情如下：</p>
<ul>
<li>
<code>name</code> 字段：声明模块名称。特殊注意该字段不允许大写字母及空格的出现，且其与 <code>version</code> 字段形成了 npm 模块的唯一标识符。</li>
<li>
<code>version</code> 字段：声明模块当前版本号。这里每当使用 <code>npm publish</code> 将模块发布到 npm 仓库中时，版本号都需要手动自增。</li>
<li>
<code>description</code> 字段：对模块进行描述，同时有助于被检索。</li>
<li>
<code>bin</code> 字段：npm 本身是通过 bin 属性配置一个或多个可解析到 PATH 路径下的可执行模块。模块若被全局安装，则 npm 会为 bin 中配置的文件在 bin 目录下创建一个软连接；模块若被局部安装，软连接会配置在项目内的 <code>./node_modules/.bin/</code>目录下。</li>
<li>
<code>script</code> 字段：定义模块的脚本配置。如，当我们在模块目录下使用 <code>npm run compile</code> 时，将自动执行 <code>babel src/ -d lib/</code> 命令，进行 ECMAScript6 代码的转译。</li>
</ul>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2558748-d75bd4916fafc450.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2558748-d75bd4916fafc450.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader2">2</h1>
<p>刚刚提到 <code>package.json</code> 配置文件下的 <code>bin</code> 字段声明了 npm 在生成软连接时的配置。这就便是用户在安装好这个目录后，可以随时使用 <code>cs</code> 命令的出处。</p>
<p>我们又提到了该模块在非开发环境下只需用到 <code>commander</code> 模块，这个模块是 NodeJS 命令行接口开发的优选解决方案。</p>
<p>基于这俩点，我们就从 <code>bin</code> 字段所指向的 <code>bin/index.js</code> 聊起。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node

var program = require('commander')
var cs = require('../lib/cs')

program
  .allowUnknownOption()
  .version('2.1.1')
  .description('CreatShare 互联网实验室前端 Web App 项目脚手架')
  .option('-e, --enjoy')

program.
  .command('create <dir>')
  .description('创建一个新的 Web App 项目骨架')
  .action(function (rootDir) {
    cs.create(rootDir)
})

program.parse(process.argv)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>#!/usr/bin/env node

<span class="hljs-keyword">var</span> <span class="hljs-keyword">program</span> = require(<span class="hljs-string">'commander'</span>)
<span class="hljs-keyword">var</span> cs = require(<span class="hljs-string">'../lib/cs'</span>)

<span class="hljs-keyword">program</span>
  .allowUnknownOption()
  .version(<span class="hljs-string">'2.1.1'</span>)
  .description(<span class="hljs-string">'CreatShare 互联网实验室前端 Web App 项目脚手架'</span>)
  .option(<span class="hljs-string">'-e, --enjoy'</span>)

<span class="hljs-keyword">program</span>.
  .command(<span class="hljs-string">'create &lt;dir&gt;'</span>)
  .description(<span class="hljs-string">'创建一个新的 Web App 项目骨架'</span>)
  .action(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(rootDir)</span> <span class="hljs-comment">{
    cs.create(rootDir)
}</span>)

<span class="hljs-title">program</span>.<span class="hljs-title">parse</span><span class="hljs-params">(process.argv)</span></span></code></pre>
<p>就这么二十来行。因为我们要写的模块是要运行在命令行下的，就需要 <code>#!/usr/bin/env node</code> 语句来告诉系统使用 node 环境来运行我们的文件，必不可少。</p>
<p>在引入 <code>commander</code> 并将其赋值给 <code>program</code> 变量后，我们对其使用了如下方法：</p>
<ul>
<li>
<code>.allowUnknownOption()</code> 方法：</li>
<li>
<code>.version()</code> 方法：用于设置命令程序的版本号。</li>
<li>
<code>.description()</code> 方法：用于设置命令的描述。可以绑定在跟命令下，这里是 <code>cs</code> 命令；或绑定在子命令下，如 <code>cs create &lt;dir&gt;</code> 命令。</li>
<li>
<code>.option()</code> 方法：定义命令的具体选项。</li>
<li>
<code>.command()</code> 方法：定义命令的子命令，这里是 <code>cs create &lt;dir&gt;</code> 命令。</li>
<li>
<code>.action()</code> 方法：用于设置命令执行的相关回调。这里绑定在 <code>cs create &lt;dir&gt;</code> 命令上，在使用该命令时触发执行回调函数。</li>
</ul>
<p>代码最后的 <code>process</code> 为进程对象，是 NodeJS 运行时存在的众多全局变量之一。process 对象中的 argv 属性用来捕获命令行参数。</p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2558748-9464c105f848f58b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2558748-9464c105f848f58b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader3">3</h1>
<p>刚刚在 <code>bin/index.js</code> 里说明的 <code>.action</code> 回调函数绑定在 <code>cs create &lt;dir&gt;</code> 命令下。当我们使用该命令时，会触发 <code>cs.create()</code> 语句的执行，这就要提及我们引入的 <code>lib/cs.js</code> 文件了。</p>
<p>打住，第一节里展示的 <code>package.json</code> 中，<code>script</code>字段里有这么一条语句：<code>"compile": "babel src/ -d lib/"</code>。这是说明 <code>lib/</code> 文件夹下的代码是通过 <code>src/</code> 文件夹下的代码转译过来的，真正我们需要去关注的是 <code>src/cs.js</code> 文件。</p>
<blockquote>为什么需要转译？src 里的 JavaScript 代码或多或少的使用到了 ECMAScript6 新特性，有些用户的 Node 环境并不一定能得到较好的解析。</blockquote>
<p><code>src/cs.js</code> 主要代码片段为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let create = require('./create')
let path = require('path')
let distPath = path.join(__dirname, '/../dist')
let dist = process.cwd() + '/'

/**
* [运行 create 命令]
* @return {[type]} [description]
*/
exports.create = (rootDir) => {
  console.log('\n项目目录开始创建\n')
  create.init(distPath, dist, rootDir)
  helpGuide()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> create = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./create'</span>)
<span class="hljs-keyword">let</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">let</span> distPath = path.join(__dirname, <span class="hljs-string">'/../dist'</span>)
<span class="hljs-keyword">let</span> dist = process.cwd() + <span class="hljs-string">'/'</span>

<span class="hljs-comment">/**
* [运行 create 命令]
* @return {[type]} [description]
*/</span>
exports.create = <span class="hljs-function">(<span class="hljs-params">rootDir</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'\n项目目录开始创建\n'</span>)
  create.init(distPath, dist, rootDir)
  helpGuide()
}</code></pre>
<p>不难理解，<code>create</code> 变量指向 <code>cs create &lt;dir&gt;</code> 所要执行的源代码；<code>path</code> 是 NodeJS 自带模块，提供文件目录解析功能。</p>
<p>最终 <code>src/index.js</code> 使用 <code>exports.create</code> 语句向外部暴露出 <code>create</code> 方法。<code>bin/index.js</code> 便可以将该方法通过 <code>.action()</code> 绑定到 <code>cs create &lt;dir&gt;</code> 命令上了。</p>
<h1 id="articleHeader4">4</h1>
<p>精彩的来了。都说 ECMAScript6 的指定振奋人心，JavaScript 的魅力越来越大，这里便是一次体验 JavaScript 在 NodeJS 上的新玩法有趣之旅。</p>
<p>在 <code>src/create.js</code> 文件中，主要用到了 NodeJS 自带的 <code>fs</code> 文件模块，来生成新项目的基础架构。文件最后暴露出的 <code>init</code> 方法源码如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.init = (path, dist, rootDir) => {
  createRootDir(rootDir)
  // 从新目录开始新建项目
  dist = dist + rootDir
  copyDir(path, dist)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>exports.init = (path, <span class="hljs-built_in">dist</span>, rootDir) =&gt; {
  createRootDir(rootDir)
  <span class="hljs-comment">// 从新目录开始新建项目</span>
  <span class="hljs-built_in">dist</span> = <span class="hljs-built_in">dist</span> + rootDir
  copyDir(path, <span class="hljs-built_in">dist</span>)
}</code></pre>
<p><code>init</code> 方法获取了 <code>path</code> 参数、<code>dist</code> 参数和 <code>rootDir</code> 参数。在该方法中，我们先将 <code>rootDir</code> 参数传入 <code>createRootDir()</code> 函数中创建项目根目录。</p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2558748-130ef6c78e5d5f27.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2558748-130ef6c78e5d5f27.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" title="" style="cursor: pointer;"></span></p>
<p>在哪里创建项目根目录呢？就在执行 <code>cs</code> 命令时的当前目录下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createRootDir = (rootDir) => {
  fs.access(process.cwd(), function (err) {
    if (err) {
      // 目录不存在时创建目录
      fs.mkdirSync(rootDir)
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> createRootDir = <span class="hljs-function">(<span class="hljs-params">rootDir</span>) =&gt;</span> {
  fs.access(process.cwd(), <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
    <span class="hljs-keyword">if</span> (err) {
      <span class="hljs-comment">// 目录不存在时创建目录</span>
      fs.mkdirSync(rootDir)
    }
  })
}</code></pre>
<p>有了项目根目录，就要将模块下 <code>dist/</code> 文件夹里的所有文件递归拷贝到根目录下。一个参数用来指向 <code>dist/</code> 文件夹，另一个参数用来指向根目录，便可以开始递归复制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * [初始化静态资源]
 * @param  {[type]} src  [初始化资源路径]
 * @param  {[type]} dist [当前终端所在目录]
 * @return {[type]}      [description]
 */
const copyDir = (src, dist) => {
  fs.access(dist, function (err) {
    if (err) {
      // 目录不存在时创建目录
      fs.mkdirSync(dist)
    }
    _copy(null, src, dist)
  })

  function _copy (err, src, dist) {
    if (err) { throw err }
    fs.readdir(src, function (err, files) {
      if (err) { throw err }
      // 过滤不生成的文件
      miscFiles.forEach(function (v) {
        if (!files.includes(v)) return
        files = files.filter(function (k) {
          return k !== v
        })
      })
      // 遍历目录中的文件
      files.forEach(function (path) {
        var _src = src + '/' + path
        var _dist = dist + '/' + path
        fs.stat(_src, function (err, st) {
          if (err) { throw err }
          // 判断是文件还是目录
          if (st.isFile()) {
            fs.writeFileSync(_dist, fs.readFileSync(_src))
          } else if (st.isDirectory()) {
            // 当是目录是，递归复制
            copyDir(_src, _dist)
          }
        })
      })
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">/**
 * [初始化静态资源]
 * <span class="hljs-doctag">@param</span>  {[type]} src  [初始化资源路径]
 * <span class="hljs-doctag">@param</span>  {[type]} dist [当前终端所在目录]
 * <span class="hljs-doctag">@return</span> {[type]}      [description]
 */</span>
<span class="hljs-keyword">const</span> copyDir = (src, dist) =&gt; {
  fs.access(dist, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(err)</span> </span>{
    <span class="hljs-keyword">if</span> (err) {
      <span class="hljs-comment">// 目录不存在时创建目录</span>
      fs.mkdirSync(dist)
    }
    _copy(<span class="hljs-keyword">null</span>, src, dist)
  })

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_copy</span> <span class="hljs-params">(err, src, dist)</span> </span>{
    <span class="hljs-keyword">if</span> (err) { <span class="hljs-keyword">throw</span> err }
    fs.readdir(src, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(err, files)</span> </span>{
      <span class="hljs-keyword">if</span> (err) { <span class="hljs-keyword">throw</span> err }
      <span class="hljs-comment">// 过滤不生成的文件</span>
      miscFiles.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(v)</span> </span>{
        <span class="hljs-keyword">if</span> (!files.includes(v)) <span class="hljs-keyword">return</span>
        files = files.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(k)</span> </span>{
          <span class="hljs-keyword">return</span> k !== v
        })
      })
      <span class="hljs-comment">// 遍历目录中的文件</span>
      files.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(path)</span> </span>{
        <span class="hljs-keyword">var</span> _src = src + <span class="hljs-string">'/'</span> + path
        <span class="hljs-keyword">var</span> _dist = dist + <span class="hljs-string">'/'</span> + path
        fs.stat(_src, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(err, st)</span> </span>{
          <span class="hljs-keyword">if</span> (err) { <span class="hljs-keyword">throw</span> err }
          <span class="hljs-comment">// 判断是文件还是目录</span>
          <span class="hljs-keyword">if</span> (st.isFile()) {
            fs.writeFileSync(_dist, fs.readFileSync(_src))
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (st.isDirectory()) {
            <span class="hljs-comment">// 当是目录是，递归复制</span>
            copyDir(_src, _dist)
          }
        })
      })
    })
  }
}</code></pre>
<p><code>fs</code> 文件模块的具体内容推荐阅读阮一峰的开源电子书——《JavaScript 标准参考教程》中的“NodeJS”章节，来深入浅出 <code>fs</code> 模块的用法。</p>
<p>完美，这时我们就可以发布我们的脚手架包了。</p>
<h1 id="articleHeader5">5</h1>
<p>如何发布一个 npm 包到 npm 仓库中，供其他人使用？当我们照着第一步，将 <code>package.json</code> 配置好后，其实模块的准备工作已经做好了。</p>
<p>还没有做的就是在域名为 npmjs.com 的官网上注册一个账号。这样，当我们直接在模块根目录使用 <code>npm publish</code> 命令的时候，输入正确的 npmjs.com 账号、密码，就能成功发布你的开源包了！</p>
<p>纵然读博文是一个有趣的体验，但也可以亲自动手试一试哦。</p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2558748-d2b38882c155aef1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2558748-d2b38882c155aef1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader6">6</h1>
<p>也就是说，酷炫的生成新项目骨架的来源，只是简单的递归复制该模块下的 <code>dist/</code> 文件夹到新项目中。但我们需要关注的重点在于，<code>dist/</code> 文件夹下，到底装了什么？</p>
<p>“初级 Web App 项目初始化工具”一说，也就名归有主了。<code>dist/</code> 模板，也就是新项目的骨架如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── .babelrc             # ES6 代码转义规则配置
├── .eslint.js           # JavaScript 代码规范
├── .gitignore           # Git 不跟踪的特殊文件
├── LICENSE              # 开源协议
├── README.md            # 项目介绍
├── material             # README.md 引用的图片库
├── package.json         # 项目配置文件
├── src                  # 源码开发目录
│&nbsp;&nbsp; ├── favicon.ico      # 网页标题小图标
│&nbsp;&nbsp; ├── html             # HTML 页面模板目录
│&nbsp;&nbsp; ├── image            # 图片资源目录
│&nbsp;&nbsp; ├── manifest.json    # 网络应用清单
│&nbsp;&nbsp; ├── script           # 脚本文件资源目录
│&nbsp;&nbsp; └── style            # 样式文件资源目录
├── webpack.config.js    # Webpack 多文件打包基础配置
├── webpack.dev.js       # Webpack 开发环境配置
├── webpack.prod.js      # Webpack 发布上线配置
└── yarn.lock            # yarn 包管理器的依赖说明" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>.
├── .<span class="hljs-keyword">babelrc </span>            <span class="hljs-comment"># ES6 代码转义规则配置</span>
├── .eslint.<span class="hljs-keyword">js </span>          <span class="hljs-comment"># JavaScript 代码规范</span>
├── .gitignore           <span class="hljs-comment"># Git 不跟踪的特殊文件</span>
├── LICENSE              <span class="hljs-comment"># 开源协议</span>
├── README.md            <span class="hljs-comment"># 项目介绍</span>
├── material             <span class="hljs-comment"># README.md 引用的图片库</span>
├── package.<span class="hljs-keyword">json </span>        <span class="hljs-comment"># 项目配置文件</span>
├── src                  <span class="hljs-comment"># 源码开发目录</span>
│&nbsp;&nbsp; ├── favicon.ico      <span class="hljs-comment"># 网页标题小图标</span>
│&nbsp;&nbsp; ├── html             <span class="hljs-comment"># HTML 页面模板目录</span>
│&nbsp;&nbsp; ├── image            <span class="hljs-comment"># 图片资源目录</span>
│&nbsp;&nbsp; ├── manifest.<span class="hljs-keyword">json </span>   <span class="hljs-comment"># 网络应用清单</span>
│&nbsp;&nbsp; ├── <span class="hljs-keyword">script </span>          <span class="hljs-comment"># 脚本文件资源目录</span>
│&nbsp;&nbsp; └── style            <span class="hljs-comment"># 样式文件资源目录</span>
├── webpack.config.<span class="hljs-keyword">js </span>   <span class="hljs-comment"># Webpack 多文件打包基础配置</span>
├── webpack.dev.<span class="hljs-keyword">js </span>      <span class="hljs-comment"># Webpack 开发环境配置</span>
├── webpack.prod.<span class="hljs-keyword">js </span>     <span class="hljs-comment"># Webpack 发布上线配置</span>
└── yarn.lock            <span class="hljs-comment"># yarn 包管理器的依赖说明</span></code></pre>
<p>新项目骨架中默认推荐了：</p>
<ul>
<li>使用 Webpack 来打包多页面；</li>
<li>使用 ESLint 来规范自己项目的 JavaScript 代码；</li>
<li>使用 Babel 来编译使用 ECMAScript 新特性的 JavaScript 代码。</li>
<li>使用 MIT 开源协议；</li>
<li>源代码都放在 <code>src/</code> 目录下；</li>
<li>
<code>src/</code> 目录要对不同的代码进行合理的分层。</li>
</ul>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2558748-0d9615b2209f0902.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2558748-0d9615b2209f0902.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader7">End</h1>
<p><strong><em>现在的不足，是未来的畅想。</em></strong></p>
<p>这个模块并不完美，一个健壮的命令还应该能支持足够多的参数，运行足够有意义的子命令。比如我们常用 <code>man</code> 命令来看另一个命令的使用手册，那要让用户能用到 <code>man cs</code> 命令，还需要我们在代码中加入 <code>man</code> 字段等等。。</p>
<p><strong><em>我又为什么，这么热衷于分享这个轮子？</em></strong></p>
<p>记得有一个前端群里曾有人问过：</p>
<blockquote>“怎么没有 VueJS 的源码解析？”</blockquote>
<p>时，我说过：</p>
<blockquote>“大牛很忙，关注的是前端前沿，不写这些源码解析博文是个好事。<p>“当我们想有一个源码解析教程的时候，这是一个打开新世界的契机——未尝不使我们亲自来写，通过分享走向学习效率金字塔的最高层？”</p>
</blockquote>
<p>这样的能力并不是人人都能具备，也不必要让人人都具备。我曾在大一傲气的说过“做最好的自己，影响该影响的人”，现在想起来除了有立刻找地洞钻进去的冲动外，反而还是觉得有一定的道理（笑。这时候允许我自称为一次“教主”，我们的理念是：</p>
<p><strong><em>读文档，读文档，读文档。</em></strong><br><strong><em>写博客，写博客，写博客。</em></strong></p>
<blockquote>
<ul>
<li>Hello，我是韩亦乐，现任本科软工男一枚。软件工程专业的一路学习中，我有很多感悟，也享受持续分享的过程。如果想了解更多或能及时收到我的最新文章，欢迎订阅我的个人微信号：韩亦乐。<a href="http://www.jianshu.com/u/ecbf49bf207b" rel="nofollow noreferrer" target="_blank">我的简书个人主页</a>中，有我的订阅号二维码和 <a href="https://github.com/hylerrix" rel="nofollow noreferrer" target="_blank">Github 主页地址</a>；<a href="https://www.zhihu.com/people/hylerrix/activities" rel="nofollow noreferrer" target="_blank">我的知乎主页</a> 中也会坚持产出，欢迎关注。</li>
<li>本文内部编号经由<a href="https://github.com/hylerrix/FSD-Debris/issues" rel="nofollow noreferrer" target="_blank">我的 Github 相关仓库</a>统一管理；本文可能发布在多个平台但仅在上述仓库中长期维护；本文同时采用<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh" rel="nofollow noreferrer" target="_blank">【知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议】</a>进行许可。</li>
</ul>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2558748-39f785a767794693.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2558748-39f785a767794693.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
造轮子之 npm i -g creatshare-app-init 源码浅析

## 原文链接
[https://segmentfault.com/a/1190000011837284](https://segmentfault.com/a/1190000011837284)


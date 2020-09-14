---
title: '初探前端自动化神器 （Gulp）' 
date: 2019-02-03 2:30:40
hidden: true
slug: a4sk701m6bb
categories: [reprint]
---

{{< raw >}}

                    
<p>如何对网站资源进行优化（比如编译预处理CSS，压缩JavaScript等），如何使用不同浏览器进行测试，是一个繁琐而费时的过程，我们往往把这个过程中的很多重复的任务通过一些前端工具来自动完成，来改进网站开发的过程。</p>
<p>说起前端自动化工具，自然少不了 <a href="http://gruntjs.com/" rel="nofollow noreferrer" target="_blank">Grunt</a>。而 <a href="http://gulpjs.com/" rel="nofollow noreferrer" target="_blank">Gulp</a> 的出现，则希望取其精华取而代之。</p>
<h2 id="articleHeader0">Gulp 简介</h2>
<p>Gulp 是一个构建系统，开发者可以使用它在网站开发过程中自动执行常见任务。Gulp 是基于 Node.js 构建的，因此 Gulp 源文件和你用来定义任务的 Gulp 文件都被写进了JavaScript（或者CoffeeScript）里。前端开发工程师还可以用自己熟悉的语言来编写任务去 lint JavaScript 和 CSS、解析模板以及在文件变动时编译LESS 文件（当然这些只是一小部分例子）。</p>
<p>Gulp 的 Github 页面上有着如下介绍：</p>
<blockquote>
<p>Automation - gulp is a toolkit that helps you automate painful or time-consuming tasks in your development workflow.</p>
<p>Platform-agnostic - Integrations are built into all major IDEs and people are using gulp with PHP, .NET, Node.js, Java, and other platforms.</p>
<p>Strong Ecosystem - Use npm modules to do anything you want + over 2000 curated plugins for streaming file transformations</p>
<p>Simple - By providing only a minimal API surface, gulp is easy to learn and simple to use</p>
</blockquote>
<p>使用Gulp的优势就是利用流的方式进行文件的处理，通过管道将多个任务和操作连接起来，因此只有一次I/O的过程，流程更清晰，更纯粹。Gulp去除了中间文件，只将最后的输出写入磁盘，整个过程因此变得更快。</p>
<h2 id="articleHeader1">gulp 的安装</h2>
<p>因为 gulp 是基于 Node.js 构建的，所以 gulp 一般是通过 npm 进行安装，如果 Mac 上没有安装 npm，我们可以通过 brew 进行 npm 的安装。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo brew install npm" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">sudo <span class="hljs-keyword">brew </span><span class="hljs-keyword">install </span>npm</code></pre>
<p>安装完毕，我们在终端执行 <code>npm -v</code> 可以查看版本号，如果正常显示，说明 npm 安装成功。</p>
<p><span class="img-wrap"><img data-src="/img/bVCq5P" src="https://static.alili.tech/img/bVCq5P" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">npm 镜像和代理设置及取消</h2>
<p>由于我们是<del>网络墙国</del>的原因，所以，我们官方的npm安装可能被墙或者慢。我们可以使用国内的一些镜像替换官方的。也可以增加一些代理加速跳转。</p>
<h3 id="articleHeader3">替换官方镜像</h3>
<p>原有官方地址：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://registry.npmjs.org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">https:</span>//registry.npmjs<span class="hljs-meta">.org</span></code></pre>
<p>替换命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config set registry https://registry.npm.taobao.org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tcl"><code style="word-break: break-word; white-space: initial;">npm config <span class="hljs-keyword">set</span> <span class="hljs-keyword">registry</span> https://<span class="hljs-keyword">registry</span>.npm.taobao.org</code></pre>
<p>如果要取消自定义镜像，只需将上述命令的镜像地址改回官方即可。</p>
<h3 id="articleHeader4">设置代理</h3>
<p>如果你的网络连接使用了代理服务器，为npm设置代理，输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config set proxy http://172.16.10.7:80" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">npm config <span class="hljs-keyword">set</span> proxy http:<span class="hljs-comment">//172.16.10.7:80</span></code></pre>
<p>以及</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config set http-proxy http://172.16.10.7:80
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>npm config <span class="hljs-built_in">set</span> <span class="hljs-keyword">http</span>-proxy <span class="hljs-keyword">http</span>://<span class="hljs-number">172.16</span><span class="hljs-number">.10</span><span class="hljs-number">.7</span>:<span class="hljs-number">80</span>
</code></pre>
<h3 id="articleHeader5">取消代理</h3>
<p>如果代理有误，可以通过以下命令取消</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config delete proxy
npm config delete https-proxy
npm config delete http-proxy" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>npm <span class="hljs-built_in">config</span> <span class="hljs-keyword">delete</span> proxy
npm <span class="hljs-built_in">config</span> <span class="hljs-keyword">delete</span> https-proxy
npm <span class="hljs-built_in">config</span> <span class="hljs-keyword">delete</span> http-proxy</code></pre>
<h3 id="articleHeader6">通过 VPN 进行安装</h3>
<p>最终我们发现设置镜像和代理貌似没有作用，还不如开启 VPN 来的方便。(⊙﹏⊙)b</p>
<p>还别说，开启 VPN 后，安装貌似顺畅很多。</p>
<p><strong>安装时，要注意，一定要有管理员权限，否则可能会出错。</strong></p>
<h3 id="articleHeader7">通过 <code>cnpm</code> 命令进行安装</h3>
<p>在我们中国，要下载 npm 包非常慢，如果你没有 VPN ，那么不妨试试<code>cnpm</code>，也许感觉就会爽很多啦。</p>
<h4>安装 cnpm</h4>
<p>最新消息和安装包可以参加 <a href="https://github.com/cnpm/cnpm" rel="nofollow noreferrer" target="_blank">cnpm 的 github 页面</a>，或者其<a href="https://cnpmjs.org/" rel="nofollow noreferrer" target="_blank">官方网站</a> 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo npm install cnpm -g

# 如果被墙的中国用户，可以试试如下命令，指定中国区镜像。
sudo npm install cnpm -g --registry=https://registry.npm.taobao.org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>sudo <span class="hljs-built_in">npm</span> install cnpm -g

<span class="hljs-comment"># 如果被墙的中国用户，可以试试如下命令，指定中国区镜像。</span>
sudo <span class="hljs-built_in">npm</span> install cnpm -g --registry=https:<span class="hljs-regexp">//</span>registry.<span class="hljs-built_in">npm</span>.taobao.org</code></pre>
<p>安装完毕，就可以用 <code>cnpm install</code> 命令安装插件啦。</p>
<p>但是 cnpm 也有几个问题：</p>
<ol>
<li><p>cnpm 的仓库只是 npm 仓库的一个拷贝，其中需要（<code>npm publish</code>）、注册用户(<code>npm adduser</code>)、或者修改 package 状态等命令都无法用 <code>cnpm</code>，要用回原生的 <code>npm</code> 命令。</p></li>
<li><p>有很多 npm 包都集成了 npm install，或者有些 npm API 会读取 ~/.npmrc 中的 registry，此时仍会访问原生仓库，此时的访问速度和你是不是采用 <code>cnpm</code> 是一样的。</p></li>
</ol>
<h4>通过 <code>cnpm</code> 安装插件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo cnpm sync [moduleName]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">sudo cnpm sync <span class="hljs-string">[moduleName]</span></code></pre>
<blockquote><p><strong>本文的所有操作在未开启 VPN 情况下，也没有方向网速问题，所以就不采用 <code>cnpm</code> 了。当然，有网速问题的伙伴也可将下面的命令中 <code>npm</code> 换成 <code>cnpm</code> ，效果同。</strong></p></blockquote>
<h3 id="articleHeader8">通过 <code>npm</code> 安装 <code>gulp</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 安装 gulp 附属
sudo npm install

// 全局安装 gulp，这种模式安装后，gulp 可以应用到所有项目
sudo npm install gulp -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">// 安装 gulp 附属</span>
sudo npm install

<span class="hljs-comment">// 全局安装 gulp，这种模式安装后，gulp 可以应用到所有项目</span>
sudo npm install gulp -g</code></pre>
<h3 id="articleHeader9">查看 gulp 版本</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp -v

[21:59:43] CLI version 3.9.1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">gulp</span> <span class="hljs-selector-tag">-v</span>

<span class="hljs-selector-attr">[21:59:43]</span> <span class="hljs-selector-tag">CLI</span> <span class="hljs-selector-tag">version</span> 3<span class="hljs-selector-class">.9</span><span class="hljs-selector-class">.1</span></code></pre>
<h2 id="articleHeader10">gulp 在项目中的部署</h2>
<p>我们先来练习一下 gulp 在项目中如何部署。这里建立一个你的项目目录，比如 test。</p>
<h3 id="articleHeader11">初始化你的项目目录:</h3>
<p>先<code>cd</code>到项目的根目录，然后执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-built_in">npm</span> init</code></pre>
<p>执行过程中，会要你输入一些初始化变量，你也可以一路回车下去，等以后再修改。<br>初始化完成后，当前目录下会多出一个<code>package.json</code>的文件，里面就是执行 init 时候的各种变量参数，用来保存项目信息。</p>
<h3 id="articleHeader12">安装 gulp 为项目依赖</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save-dev gulp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">$ npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> gulp</code></pre>
<p>初始化完成后，当前目录下会多出一个<code>node_modules</code>的目录，gulp 依赖都在该目录里面。以后再用 npm 命令安装的 gulp 插件也会存放在这个目录。</p>
<h3 id="articleHeader13">在你的项目根目录下建立<code>gulpfile.js</code>
</h3>
<p>初始内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入 gulp 模块
var gulp = require('gulp');

// 默认任务
gulp.task('default', function() {
  // 所有默认任务的代码放在这里，比如我输出一个 hello, wold
  console.log('hello, world');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 引入 gulp 模块</span>
<span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>);

<span class="hljs-comment">// 默认任务</span>
gulp.task(<span class="hljs-string">'default'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 所有默认任务的代码放在这里，比如我输出一个 hello, wold</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello, world'</span>);
});</code></pre>
<h3 id="articleHeader14">在项目根目录下执行 gulp</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">gulp</span></code></pre>
<p>如果出现下面类似信息，说明 gulp 部署成功。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[22:36:57] Using gulpfile ~/Desktop/theme/gulpfile.js
[22:36:57] Starting 'default'...
ok
[22:36:57] Finished 'default' after 217 μs
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>[<span class="hljs-number">22</span>:<span class="hljs-number">36</span>:<span class="hljs-number">57</span>] <span class="hljs-symbol">Using</span> gulpfile ~/<span class="hljs-symbol">Desktop</span>/theme/gulpfile.js
[<span class="hljs-number">22</span>:<span class="hljs-number">36</span>:<span class="hljs-number">57</span>] <span class="hljs-symbol">Starting</span> <span class="hljs-string">'default'</span>...
ok
[<span class="hljs-number">22</span>:<span class="hljs-number">36</span>:<span class="hljs-number">57</span>] <span class="hljs-symbol">Finished</span> <span class="hljs-string">'default'</span> after <span class="hljs-number">217</span> μs
</code></pre>
<h2 id="articleHeader15">gulp 的用法</h2>
<p>项目中 gulp 的应用主要还是通过一些插件去实现的。下面我们就开始安装一些常用插件：</p>
<h3 id="articleHeader16">常用插件安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装本地 gulp-sass 插件
sudo npm install gulp-sass --save-dev

# 安装本地 gulp-less 插件
sudo npm install gulp-less --save-dev

# 安装本地服务器插件：
npm install gulp-connect --save-dev 

# 安装合并文件插件：
npm install gulp-concat --save-dev 

# 安装压缩js文件插件：
npm install gulp-uglify --save-dev 

# 安装重命名插件：
npm install gulp-rename --save-dev 

# 安装压缩css文件插件：
npm install gulp-minify-css --save-dev 

# 低损耗压缩图像： 
npm install gulp-imagemin --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code><span class="hljs-comment"># 安装本地 gulp-sass 插件</span>
sudo npm <span class="hljs-keyword">install</span> gulp-sass --save-dev

<span class="hljs-comment"># 安装本地 gulp-less 插件</span>
sudo npm <span class="hljs-keyword">install</span> gulp-<span class="hljs-keyword">less</span> --save-dev

<span class="hljs-comment"># 安装本地服务器插件：</span>
npm <span class="hljs-keyword">install</span> gulp-connect --save-dev 

<span class="hljs-comment"># 安装合并文件插件：</span>
npm <span class="hljs-keyword">install</span> gulp-concat --save-dev 

<span class="hljs-comment"># 安装压缩js文件插件：</span>
npm <span class="hljs-keyword">install</span> gulp-uglify --save-dev 

<span class="hljs-comment"># 安装重命名插件：</span>
npm <span class="hljs-keyword">install</span> gulp-rename --save-dev 

<span class="hljs-comment"># 安装压缩css文件插件：</span>
npm <span class="hljs-keyword">install</span> gulp-minify-css --save-dev 

<span class="hljs-comment"># 低损耗压缩图像： </span>
npm <span class="hljs-keyword">install</span> gulp-imagemin --save-dev</code></pre>
<p>如果出现警告错误，请查看当前目录下的 <code>npm-debug.log</code> 文件，<br>当 log 中有如下错误提示</p>
<blockquote><p>error Please try running this command again as root/Administrator.</p></blockquote>
<p>请切换到 root 权限或者用 <code>sudo npm install </code>命令进行操作。</p>
<h3 id="articleHeader17">插件引入</h3>
<p>在<code>gulpfile.js</code>的顶部引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gulp = require('gulp');//将gulp插件包含进来 
var sass = require('gulp-sass'); //包含sass转换为css插件 
var less = require('gulp-less'); //包含less转换为css插件 
var connect = require('gulp-connect'); //包含服务器插件 var concat = require('gulp-concat');//合并文件 
var uglify = require('gulp-uglify');//压缩js 
var rename = require('gulp-rename');//重命名文件 
var minifyCSS = require('gulp-minify-css');//压缩css var imagemin = require('gulp-imagemin');//优化图片" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>);<span class="hljs-comment">//将gulp插件包含进来 </span>
<span class="hljs-keyword">var</span> sass = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-sass'</span>); <span class="hljs-comment">//包含sass转换为css插件 </span>
<span class="hljs-keyword">var</span> less = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-less'</span>); <span class="hljs-comment">//包含less转换为css插件 </span>
<span class="hljs-keyword">var</span> connect = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-connect'</span>); <span class="hljs-comment">//包含服务器插件 var concat = require('gulp-concat');//合并文件 </span>
<span class="hljs-keyword">var</span> uglify = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-uglify'</span>);<span class="hljs-comment">//压缩js </span>
<span class="hljs-keyword">var</span> rename = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-rename'</span>);<span class="hljs-comment">//重命名文件 </span>
<span class="hljs-keyword">var</span> minifyCSS = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-minify-css'</span>);<span class="hljs-comment">//压缩css var imagemin = require('gulp-imagemin');//优化图片</span></code></pre>
<h3 id="articleHeader18">插件用法</h3>
<p>以下所有代码都放在 <code>gulpfile.js</code> 文件里面。</p>
<h4>1. 复制文件到指定文件夹</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//复制文件到指定文件夹 
gulp.task('copy-index',function(){ 
    return gulp.src('index.html') 
    .pipe(gulp.dest('dist')) 
    .pipe(connect.reload()); }); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//复制文件到指定文件夹 </span>
gulp.task(<span class="hljs-string">'copy-index'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ 
    <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'index.html'</span>) 
    .pipe(gulp.dest(<span class="hljs-string">'dist'</span>)) 
    .pipe(connect.reload()); }); </code></pre>
<p>我们在项目目录下简历 index.html 文件和 dist 目录，<br>然后执行 <code>gulp copy-index</code> 命令，会发现 index.html 文件复制到了 dist 目录。<br>效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVCIj9" src="https://static.alili.tech/img/bVCIj9" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>2. 复制图片到指定文件夹</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 复制 assets/global/img 文件的匹配示例
// assets/global/img/**/* assets/global/img 目录下的所有子目录和所有东西(包含东西最多) 
// assets/global/img/*/* assets/global/img 目录下的东西和子目录下的东西 
// assets/global/img/*.{png,jpg} images目录下的所有以png和jpg为后缀名的图片  
gulp.task('images',function(){ 
    return gulp.src('assets/global/img/*.png') 
    .pipe(gulp.dest('dist/images'))
    .pipe(imagemin()) //未成功 
    ; 
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>/<span class="hljs-regexp">/ 复制 assets/global</span><span class="hljs-regexp">/img 文件的匹配示例
/</span><span class="hljs-regexp">/ assets/global</span><span class="hljs-regexp">/img/</span>**<span class="hljs-regexp">/* assets/global</span><span class="hljs-regexp">/img 目录下的所有子目录和所有东西(包含东西最多) 
/</span><span class="hljs-regexp">/ assets/global</span><span class="hljs-regexp">/img/</span>*<span class="hljs-regexp">/* assets/global</span><span class="hljs-regexp">/img 目录下的东西和子目录下的东西 
/</span><span class="hljs-regexp">/ assets/global</span><span class="hljs-regexp">/img/</span>*.{png,jpg} images目录下的所有以png和jpg为后缀名的图片  
gulp.task(<span class="hljs-string">'images'</span>,function(){ 
    <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'assets/global/img/*.png'</span>) 
    .pipe(gulp.dest(<span class="hljs-string">'dist/images'</span>))
    .pipe(imagemin()) /<span class="hljs-regexp">/未成功 
    ; 
});</span></code></pre>
<p>效果如下：<br><span class="img-wrap"><img data-src="/img/bVCIkq" src="https://static.alili.tech/img/bVCIkq" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>3. 多个数据文件复制</h4>
<p>后面的目录可以不存在，不存在的话会自动创建，在前面加叹号是排除这个（类）文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('data',function(){ 
    return gulp.src(['xml/*.xml','json/*.json','!json/secre-*.json'])
    .pipe(gulp.dest('dist/data')); 
    }); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>gulp.task(<span class="hljs-string">'data'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ 
    <span class="hljs-keyword">return</span> gulp.src([<span class="hljs-string">'xml/*.xml'</span>,<span class="hljs-string">'json/*.json'</span>,<span class="hljs-string">'!json/secre-*.json'</span>])
    .pipe(gulp.dest(<span class="hljs-string">'dist/data'</span>)); 
    }); </code></pre>
<blockquote><p>一般来说，<code>gulp.dest</code> 会自动创建不存在的目录，但是我在实际使用过程中却无法自动创建，只有将 <code>.pipe(gulp.dest('dist/data')); </code> 改为 <code>.pipe(gulp.dest('./dist/data')); </code>时才能自动创建。后来，我又安装了<code>gulp-sourcemaps</code>插件后，莫名其妙好了，而且删除<code>gulp-sourcemaps</code>插件也没问题，好奇怪。(⊙﹏⊙)b</p></blockquote>
<h3 id="articleHeader19">未完，待续。</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
初探前端自动化神器 （Gulp）

## 原文链接
[https://segmentfault.com/a/1190000006804354](https://segmentfault.com/a/1190000006804354)


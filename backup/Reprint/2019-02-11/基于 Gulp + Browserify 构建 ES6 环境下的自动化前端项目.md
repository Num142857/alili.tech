---
title: '基于 Gulp + Browserify 构建 ES6 环境下的自动化前端项目' 
date: 2019-02-11 2:30:49
hidden: true
slug: 274f0w2nnjk
categories: [reprint]
---

{{< raw >}}

                    
<p>随着<code>React</code>、<code>Angular2</code>、<code>Redux</code>等前沿的前端框架越来越流行，使用<code>webpack</code>、<code>gulp</code>等工具构建前端自动化项目也随之变得越来越重要。鉴于目前业界普遍更流行使用<code>webpack</code>来构建es6(ECMAScript 2015)前端项目，网上的相关教程也比较多；相对来说使用<code>gulp</code>来构建es6项目的中文教程就比较少。</p>
<p>经过一段时间的摸索，我觉得其实使用<code>gulp</code>也可以很方便地构建es6项目。以下是我感觉<code>gulp</code>和<code>webpack</code>主要的不同之处：</p>
<ul>
<li><p><code>gulp</code>的任务机制和流式管道函数和<code>webpack</code>的配置参数风格有着显著区别，它能使开发者更清晰地了解项目的构建流程。</p></li>
<li><p>由于<code>gulp</code>是编程式风格的，所以使用起来可定制化的功能也就更灵活一些，可应对一些构建过程较为复杂的情况。</p></li>
</ul>
<p>本文特此给大家介绍下如何使用<code>gulp</code>配合<code>browserify</code>来构建基于es6的前端项目。</p>
<h2 id="articleHeader0">Browserify vs Webpack</h2>
<p><code>browserify</code>与<code>webpack</code>都是当下流行的commonjs模块(或es6模块)合并打包工具，打包后的js文件可以直接运行在浏览器环境中。</p>
<p>很多人都知道，<code>webpack</code>功能全面，可以对js、css、甚至图片、字体文件统一进行合并打包，并且插件丰富。而<code>browserify</code>的特点是职责单一，只负责js模块合并打包，有些项目也并不需要将css等资源文件和js打包在一起的功能；它的代码风格也类似管道函数，和<code>gulp</code>的契合度较高；在github上也可以找到相当多的<code>browserify</code>插件，如<a href="https://github.com/AgentME/browserify-hmr" rel="nofollow noreferrer" target="_blank">热替换</a>、<a href="https://github.com/arian/partition-bundle" rel="nofollow noreferrer" target="_blank">代码分割</a>等等。</p>
<blockquote><p>有一篇文章对<code>browserify</code>和<code>webpack</code>的对比进行了探讨：<a href="https://www.zhihu.com/question/40598635" rel="nofollow noreferrer" target="_blank">webpack 跟 browserify 比到底有什么好?</a></p></blockquote>
<h2 id="articleHeader1">示例项目</h2>
<p>本文中使用的示例项目是我为重构过去搞的UI组件库而建的项目，使用<code>browserify</code>构建的分支地址<a href="https://github.com/joe-sky/flarej/tree/use_browserify" rel="nofollow noreferrer" target="_blank">请戳这里</a>。这个项目目前已改用<code>gulp</code>+<code>webpack</code>构建，但是保留了原先用<code>browserify</code>构建的分支代码可供参考。</p>
<h2 id="articleHeader2">项目结构目录</h2>
<p>项目目录</p>
<ul>
<li>
<p>dist <strong>(生产代码目录，存放生成合并后的各类文件)</strong></p>
<ul>
<li>
<p>js</p>
<ul><li><p>构建出的项目js文件</p></li></ul>
</li>
<li>
<p>fonts</p>
<ul><li><p>...</p></li></ul>
</li>
<li>
<p>css</p>
<ul><li><p>构建出的项目css文件</p></li></ul>
</li>
</ul>
</li>
<li><p>examples <strong>(示例目录)</strong></p></li>
<li>
<p>src <strong>(开发代码目录)</strong></p>
<ul>
<li><p>styles <strong>(样式文件目录)</strong></p></li>
<li><p>base.js <strong>(打包入口文件)</strong></p></li>
<li><p>...</p></li>
</ul>
</li>
<li><p>test <strong>(单元测试目录)</strong></p></li>
<li>
<p>vendor <strong>(第三方依赖库)</strong></p>
<ul>
<li><p>babelHelpers.js</p></li>
<li><p>...</p></li>
</ul>
</li>
<li><p>gulpfile.js <strong>(gulp配置文件)</strong></p></li>
<li><p>package.json</p></li>
<li><p>LICENSE</p></li>
<li><p>README.md</p></li>
</ul>
<p>示例项目目录大体如上所示，其中使用<code>babel</code>进行es6至es5转换，并使用<code>eslint</code>进行js代码检验。大家看到这里可能有疑问，为什么项目中没有babel及eslint的配置文件<code>.babelrc</code>和<code>.eslintrc</code>呢？原因就是这些配置文件里的内容其实是可以直接配置在<code>gulpfile.js</code>中的相关插件内的。</p>
<h2 id="articleHeader3">配置package.json</h2>
<p>在这里只列出项目依赖的各种包，大致分为如下几类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  ...
  &quot;devDependencies&quot;: {
    /*browserify包及相关插件*/
    &quot;browserify&quot;: &quot;^13.0.0&quot;,
    &quot;vinyl-buffer&quot;: &quot;^1.0.0&quot;,
    &quot;vinyl-source-stream&quot;: &quot;^1.1.0&quot;,
    &quot;standalonify&quot;: &quot;^0.1.3&quot;,
    /*babel相关插件*/
    &quot;babelify&quot;: &quot;^7.2.0&quot;,
    &quot;babel-plugin-external-helpers&quot;: &quot;^6.4.0&quot;,
    &quot;babel-plugin-transform-es2015-classes&quot;: &quot;^6.5.2&quot;,
    &quot;babel-plugin-transform-es2015-modules-commonjs&quot;: &quot;^6.5.2&quot;,
    &quot;babel-plugin-transform-object-assign&quot;: &quot;^6.3.13&quot;,
    &quot;babel-preset-es2015&quot;: &quot;^6.3.13&quot;,
    &quot;babel-preset-react&quot;: &quot;^6.3.13&quot;,
    &quot;babel-preset-stage-0&quot;: &quot;^6.3.13&quot;,
    /*eslint相关插件*/
    &quot;babel-eslint&quot;: &quot;^5.0.0&quot;,
    &quot;estraverse&quot;: &quot;^4.2.0&quot;,
    &quot;estraverse-fb&quot;: &quot;^1.3.1&quot;,
    /*gulp包及相关插件*/
    &quot;gulp&quot;: &quot;^3.9.0&quot;,
    &quot;gulp-clean&quot;: &quot;^0.3.1&quot;,
    &quot;gulp-concat&quot;: &quot;^2.6.0&quot;,
    &quot;gulp-cssnano&quot;: &quot;^2.1.1&quot;,
    &quot;gulp-eslint&quot;: &quot;^2.0.0&quot;,
    &quot;gulp-if&quot;: &quot;^2.0.0&quot;,
    &quot;gulp-jasmine&quot;: &quot;^2.2.1&quot;,
    &quot;gulp-less&quot;: &quot;^3.0.5&quot;,
    &quot;gulp-rename&quot;: &quot;^1.2.2&quot;,
    &quot;gulp-sequence&quot;: &quot;^0.4.4&quot;,
    &quot;gulp-uglify&quot;: &quot;^1.5.1&quot;,
    /*postcss相关插件*/
    &quot;gulp-postcss&quot;: &quot;^6.1.0&quot;,
    &quot;autoprefixer&quot;: &quot;^6.3.4&quot;,
    /*外部依赖包*/
    &quot;nornj&quot;: &quot;^0.3.0&quot;,
    &quot;react&quot;: &quot;^0.14.8&quot;,
    &quot;react-dom&quot;: &quot;^0.14.8&quot;,
    /*其他依赖包*/
    &quot;jsdom&quot;: &quot;^8.1.0&quot;,
    &quot;yargs&quot;: &quot;^4.2.0&quot;,
    ...
  },
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  ...
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-comment">/*browserify包及相关插件*/</span>
    <span class="hljs-string">"browserify"</span>: <span class="hljs-string">"^13.0.0"</span>,
    <span class="hljs-string">"vinyl-buffer"</span>: <span class="hljs-string">"^1.0.0"</span>,
    <span class="hljs-string">"vinyl-source-stream"</span>: <span class="hljs-string">"^1.1.0"</span>,
    <span class="hljs-string">"standalonify"</span>: <span class="hljs-string">"^0.1.3"</span>,
    <span class="hljs-comment">/*babel相关插件*/</span>
    <span class="hljs-string">"babelify"</span>: <span class="hljs-string">"^7.2.0"</span>,
    <span class="hljs-string">"babel-plugin-external-helpers"</span>: <span class="hljs-string">"^6.4.0"</span>,
    <span class="hljs-string">"babel-plugin-transform-es2015-classes"</span>: <span class="hljs-string">"^6.5.2"</span>,
    <span class="hljs-string">"babel-plugin-transform-es2015-modules-commonjs"</span>: <span class="hljs-string">"^6.5.2"</span>,
    <span class="hljs-string">"babel-plugin-transform-object-assign"</span>: <span class="hljs-string">"^6.3.13"</span>,
    <span class="hljs-string">"babel-preset-es2015"</span>: <span class="hljs-string">"^6.3.13"</span>,
    <span class="hljs-string">"babel-preset-react"</span>: <span class="hljs-string">"^6.3.13"</span>,
    <span class="hljs-string">"babel-preset-stage-0"</span>: <span class="hljs-string">"^6.3.13"</span>,
    <span class="hljs-comment">/*eslint相关插件*/</span>
    <span class="hljs-string">"babel-eslint"</span>: <span class="hljs-string">"^5.0.0"</span>,
    <span class="hljs-string">"estraverse"</span>: <span class="hljs-string">"^4.2.0"</span>,
    <span class="hljs-string">"estraverse-fb"</span>: <span class="hljs-string">"^1.3.1"</span>,
    <span class="hljs-comment">/*gulp包及相关插件*/</span>
    <span class="hljs-string">"gulp"</span>: <span class="hljs-string">"^3.9.0"</span>,
    <span class="hljs-string">"gulp-clean"</span>: <span class="hljs-string">"^0.3.1"</span>,
    <span class="hljs-string">"gulp-concat"</span>: <span class="hljs-string">"^2.6.0"</span>,
    <span class="hljs-string">"gulp-cssnano"</span>: <span class="hljs-string">"^2.1.1"</span>,
    <span class="hljs-string">"gulp-eslint"</span>: <span class="hljs-string">"^2.0.0"</span>,
    <span class="hljs-string">"gulp-if"</span>: <span class="hljs-string">"^2.0.0"</span>,
    <span class="hljs-string">"gulp-jasmine"</span>: <span class="hljs-string">"^2.2.1"</span>,
    <span class="hljs-string">"gulp-less"</span>: <span class="hljs-string">"^3.0.5"</span>,
    <span class="hljs-string">"gulp-rename"</span>: <span class="hljs-string">"^1.2.2"</span>,
    <span class="hljs-string">"gulp-sequence"</span>: <span class="hljs-string">"^0.4.4"</span>,
    <span class="hljs-string">"gulp-uglify"</span>: <span class="hljs-string">"^1.5.1"</span>,
    <span class="hljs-comment">/*postcss相关插件*/</span>
    <span class="hljs-string">"gulp-postcss"</span>: <span class="hljs-string">"^6.1.0"</span>,
    <span class="hljs-string">"autoprefixer"</span>: <span class="hljs-string">"^6.3.4"</span>,
    <span class="hljs-comment">/*外部依赖包*/</span>
    <span class="hljs-string">"nornj"</span>: <span class="hljs-string">"^0.3.0"</span>,
    <span class="hljs-string">"react"</span>: <span class="hljs-string">"^0.14.8"</span>,
    <span class="hljs-string">"react-dom"</span>: <span class="hljs-string">"^0.14.8"</span>,
    <span class="hljs-comment">/*其他依赖包*/</span>
    <span class="hljs-string">"jsdom"</span>: <span class="hljs-string">"^8.1.0"</span>,
    <span class="hljs-string">"yargs"</span>: <span class="hljs-string">"^4.2.0"</span>,
    ...
  },
  ...
}</code></pre>
<h2 id="articleHeader4">编写gulpfile.js</h2>
<p>gulpfile.js即为<code>gulp</code>的配置文件，其作用类似于<code>webpack</code>的webpack.config.js文件。在代码风格方面，与webpack.config.js的配置参数风格不同的是，gulpfile.js更偏向编程风格。gulpfile.js整体结构如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//引入依赖的各种包：
var gulp = require('gulp'),
  browserify = require('browserify'),
  ...

//定义一些全局函数及变量
function getJsLibName() {
  ...
}
...

//定义各种任务
gulp.task('build-all-js', ...);

gulp.task('build-all-css', ...);

gulp.task('build', ['build-all-js', 'build-all-css', ...]);
...

//定义默认任务
gulp.task('default', ['build']);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//引入依赖的各种包：</span>
<span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>),
  browserify = <span class="hljs-built_in">require</span>(<span class="hljs-string">'browserify'</span>),
  ...

<span class="hljs-comment">//定义一些全局函数及变量</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getJsLibName</span>(<span class="hljs-params"></span>) </span>{
  ...
}
...

<span class="hljs-comment">//定义各种任务</span>
gulp.task(<span class="hljs-string">'build-all-js'</span>, ...);

gulp.task(<span class="hljs-string">'build-all-css'</span>, ...);

gulp.task(<span class="hljs-string">'build'</span>, [<span class="hljs-string">'build-all-js'</span>, <span class="hljs-string">'build-all-css'</span>, ...]);
...

<span class="hljs-comment">//定义默认任务</span>
gulp.task(<span class="hljs-string">'default'</span>, [<span class="hljs-string">'build'</span>]);</code></pre>
<p>使用<code>gulp</code>需要定义各种任务来处理各类文件的构建生成。如例中所示，定义build-all-js任务来构建js文件，执行任务时须输入命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp build-all-js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code class="sh" style="word-break: break-word; white-space: initial;">gulp <span class="hljs-keyword">build</span>-<span class="hljs-keyword">all</span>-js</code></pre>
<p>可以定义一个默认任务，一般在这个任务里依次执行全部子任务，执行时输入命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code class="sh" style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">gulp</span></code></pre>
<blockquote><p>关于<code>gulp</code>基础使用方法的更多细节大家可以参考这篇文章：<a href="http://www.cnblogs.com/2050/p/4198792.html" rel="nofollow noreferrer" target="_blank">前端构建工具gulpjs的使用介绍及技巧</a></p></blockquote>
<h2 id="articleHeader5">使用Browserify进行js模块合并</h2>
<p>配合<code>gulp</code>使用<code>browserify</code>需要引入的包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  standalonify = require('standalonify'),
  argv = require('yargs').argv;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> browserify = <span class="hljs-built_in">require</span>(<span class="hljs-string">'browserify'</span>),
  source = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vinyl-source-stream'</span>),
  buffer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vinyl-buffer'</span>),
  standalonify = <span class="hljs-built_in">require</span>(<span class="hljs-string">'standalonify'</span>),
  argv = <span class="hljs-built_in">require</span>(<span class="hljs-string">'yargs'</span>).argv;</code></pre>
<p>创建<code>gulp</code>任务build-js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('build-js', function () {
  return browserify({
    entries: './src/base.js'  //指定打包入口文件
  })
    .plugin(standalonify, {  //使打包后的js文件符合UMD规范并指定外部依赖包
      name: 'FlareJ',
      deps: {
        'nornj': 'nj',
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    })
    .transform(babelify, ...)  //使用babel转换es6代码
    .bundle()  //合并打包
    .pipe(source(getJsLibName()))  //将常规流转换为包含Stream的vinyl对象，并且重命名
    .pipe(buffer())  //将vinyl对象内容中的Stream转换为Buffer
    .pipe(gulp.dest('./dist/js'));  //输出打包后的文件
});

function getJsLibName() {
  var libName = 'flarej.js';
  if (argv.min) {  //按命令参数&quot;--min&quot;判断是否为压缩版
    libName = 'flarej.min.js';
  }

  return libName;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">gulp.task(<span class="hljs-string">'build-js'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> browserify({
    <span class="hljs-attr">entries</span>: <span class="hljs-string">'./src/base.js'</span>  <span class="hljs-comment">//指定打包入口文件</span>
  })
    .plugin(standalonify, {  <span class="hljs-comment">//使打包后的js文件符合UMD规范并指定外部依赖包</span>
      name: <span class="hljs-string">'FlareJ'</span>,
      <span class="hljs-attr">deps</span>: {
        <span class="hljs-string">'nornj'</span>: <span class="hljs-string">'nj'</span>,
        <span class="hljs-string">'react'</span>: <span class="hljs-string">'React'</span>,
        <span class="hljs-string">'react-dom'</span>: <span class="hljs-string">'ReactDOM'</span>
      }
    })
    .transform(babelify, ...)  <span class="hljs-comment">//使用babel转换es6代码</span>
    .bundle()  <span class="hljs-comment">//合并打包</span>
    .pipe(source(getJsLibName()))  <span class="hljs-comment">//将常规流转换为包含Stream的vinyl对象，并且重命名</span>
    .pipe(buffer())  <span class="hljs-comment">//将vinyl对象内容中的Stream转换为Buffer</span>
    .pipe(gulp.dest(<span class="hljs-string">'./dist/js'</span>));  <span class="hljs-comment">//输出打包后的文件</span>
});

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getJsLibName</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> libName = <span class="hljs-string">'flarej.js'</span>;
  <span class="hljs-keyword">if</span> (argv.min) {  <span class="hljs-comment">//按命令参数"--min"判断是否为压缩版</span>
    libName = <span class="hljs-string">'flarej.min.js'</span>;
  }

  <span class="hljs-keyword">return</span> libName;
}</code></pre>
<ul>
<li><p>和<code>webpack</code>类似，<code>browserify</code>也需要指定打包的入口文件。在本例中只有一个入口文件，<code>browserify</code>会自动分析文件内依赖的各js模块，最终生成一个完整的打包文件。</p></li>
<li><p>使用<code>standalonify</code>插件使打包后的js文符合UMD规范，并可以指定不将一些外部依赖包打进包内。一开始我使用了<code>dependify</code>，之后发现它生成的包有bug且作者又不维护，于是就参考它重发了一个更完善的<code>standalonify</code>。使用这个插件打出来的包可以更好地生成依赖包的信息，此功能就类似于<code>webpack</code>中的externals参数。例如UMD中的AMD部分会这样生成：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
else if (typeof define === 'function' &amp;&amp; define.amd) { define([&quot;nornj&quot;,&quot;react&quot;,&quot;react-dom&quot;], ...)
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">...
else <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> define === <span class="hljs-string">'function'</span> &amp;&amp; define.amd) { define([<span class="hljs-string">"nornj"</span>,<span class="hljs-string">"react"</span>,<span class="hljs-string">"react-dom"</span>], ...)
...</code></pre>
<p>其实使用<code>browserify</code>自带的standalone属性也可以打出UMD包，并配合browserify-shim插件也可以排除外部依赖包，但是打包后依赖包的信息只能定义为全局的。</p>
<ul>
<li><p>然后使用bundle方法进行js模块合并打包，如代码为es6环境则需在此之前执行transform方法进行es6转es5。</p></li>
<li><p><code>browserify</code>在打包后须要进行Stream转换才可和<code>gulp</code>配合，在这里需要使用<code>vinyl-source-stream</code>和<code>vinyl-buffer</code>这两个包。</p></li>
<li>
<p>在使用<code>vinyl-source-stream</code>时可以将打包文件重命名，此时可用<code>yargs</code>包提供的获取命令参数功能来决定是否使用压缩版命名。例如命名为压缩版需输入命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp build-js --min" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code class="sh" style="word-break: break-word; white-space: initial;">gulp <span class="hljs-keyword">build</span>-js --<span class="hljs-built_in">min</span></code></pre>
</li>
<li><p>最后使用gulp.dest方法指定打包后文件保存的目录。</p></li>
</ul>
<blockquote><p>关于<code>browserify</code>更详细的技术资料大家可以参考这篇文章：<a href="http://www.cnblogs.com/liulangmao/p/4920534.html" rel="nofollow noreferrer" target="_blank">browserify使用手册</a></p></blockquote>
<h2 id="articleHeader6">使用Babel将es6代码转换为es5</h2>
<p>由于es6代码目前大部分浏览器还未能完全支持，因此一般都需要转换为es5后执行。本示例中使用<code>babel</code>配合<code>browserify</code>在打包的过程中进行转换，<code>babel</code>的版本为6.0+。需要引入<code>babelify</code>，这个包是<code>browserify</code>的一个transform插件。使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('build-js', function () {
  return browserify({
    entries: './src/base.js'
  })
    .plugin(standalonify, ...)
    .transform(babelify, {  //此处babel的各配置项格式与.babelrc文件相同
      presets: [
        'es2015',  //转换es6代码
        'stage-0',  //指定转换es7代码的语法提案阶段
        'react'  //转换React的jsx
      ],
      plugins: [
        'transform-object-assign',  //转换es6 Object.assign插件
        'external-helpers',  //将es6代码转换后使用的公用函数单独抽出来保存为babelHelpers
        ['transform-es2015-classes', { &quot;loose&quot;: false }],  //转换es6 class插件
        ['transform-es2015-modules-commonjs', { &quot;loose&quot;: false }]  //转换es6 module插件
        ...
      ]
    })
    .bundle()
    ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">gulp.task(<span class="hljs-string">'build-js'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> browserify({
    <span class="hljs-attr">entries</span>: <span class="hljs-string">'./src/base.js'</span>
  })
    .plugin(standalonify, ...)
    .transform(babelify, {  <span class="hljs-comment">//此处babel的各配置项格式与.babelrc文件相同</span>
      presets: [
        <span class="hljs-string">'es2015'</span>,  <span class="hljs-comment">//转换es6代码</span>
        <span class="hljs-string">'stage-0'</span>,  <span class="hljs-comment">//指定转换es7代码的语法提案阶段</span>
        <span class="hljs-string">'react'</span>  <span class="hljs-comment">//转换React的jsx</span>
      ],
      <span class="hljs-attr">plugins</span>: [
        <span class="hljs-string">'transform-object-assign'</span>,  <span class="hljs-comment">//转换es6 Object.assign插件</span>
        <span class="hljs-string">'external-helpers'</span>,  <span class="hljs-comment">//将es6代码转换后使用的公用函数单独抽出来保存为babelHelpers</span>
        [<span class="hljs-string">'transform-es2015-classes'</span>, { <span class="hljs-string">"loose"</span>: <span class="hljs-literal">false</span> }],  <span class="hljs-comment">//转换es6 class插件</span>
        [<span class="hljs-string">'transform-es2015-modules-commonjs'</span>, { <span class="hljs-string">"loose"</span>: <span class="hljs-literal">false</span> }]  <span class="hljs-comment">//转换es6 module插件</span>
        ...
      ]
    })
    .bundle()
    ...
});</code></pre>
<ul>
<li><p><code>babelify</code>插件的配置项格式与<code>.babelrc</code>文件完全相同。在<code>babel</code>升级6.0+后与之前的5.x差别较大，它拆分为了很多个模块需要分别引入。这些模块都需要单独安装各自的npm包，具体请查看package.json文件。</p></li>
<li>
<p>presets项需要使用es2015、stage-x、react三个模块：</p>
<ol>
<li><p><code>es2015</code>，用于转换es6代码</p></li>
<li><p><code>stage-x</code>，用于转换更新的es7语法，x是指es7不同阶段的语法提案，目前有0-3可用</p></li>
<li><p><code>react</code>，用于转换React的jsx代码。</p></li>
</ol>
</li>
<li>
<p>plugins项可引入转换时需要的插件。一般来说babel-preset-es2015这个包中已经包含了大多数转换es6代码的模块，但也有部分模块需要在plugins中引入。例如：</p>
<ol>
<li><p><code>transform-object-assign</code>，用于转换Object.assign</p></li>
<li><p>如转换时使用loose模式(设置了loose为true时代码才可适应IE8，默认为false)，则需要单独引入这些模块的包。如<code>transform-es2015-classes</code>即为转换es6 class的包，如有需要可设置loose模式为true。</p></li>
<li>
<p><code>external-helpers</code>，这个模块的作用是将babel转换后的一些公用函数单独抽出来，这样就可以减少转换后的冗余代码量。具体使用方法为先全局安装babel：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-cli -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code class="sh" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-cli </span>-g</code></pre>
<p>然后执行命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel-external-helpers #可加-t参数按不同方式生成，值为global|umd|var，默认为global" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code class="sh" style="word-break: break-word; white-space: initial;">babel-<span class="hljs-keyword">external</span>-helpers #可加-t参数按不同方式生成，值为<span class="hljs-keyword">global</span>|umd|<span class="hljs-keyword">var</span>，默认为<span class="hljs-keyword">global</span></code></pre>
</li>
</ol>
<p>这样就可以在命令行中生成babelHelpers的代码，然后将之保存为babelHelpers.js，在本例中放在vendor目录内。</p>
</li>
</ul>
<h2 id="articleHeader7">生成最终的js代码</h2>
<p>由于本例中使用external-helpers方式进行es6转换，故需要将babelHelpers.js与<code>browserify</code>打包后的项目js文件进行连接合并：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var concat = require('gulp-concat'),
  sequence = require('gulp-sequence'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify');

//定义连接js任务
gulp.task('concat-js', function () {
  var jsLibName = getJsLibName();
  return gulp.src(['./vendor/babelHelpers.js', './dist/js/' + jsLibName])
    .pipe(concat(jsLibName))
    .pipe(gulpif(argv.min, uglify()))
    .pipe(gulp.dest('./dist/js'));
});

//将两个任务串联起来
gulp.task('build-all-js', sequence('build-js', 'concat-js'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> concat = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-concat'</span>),
  sequence = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-sequence'</span>),
  gulpif = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-if'</span>),
  uglify = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-uglify'</span>);

<span class="hljs-comment">//定义连接js任务</span>
gulp.task(<span class="hljs-string">'concat-js'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> jsLibName = getJsLibName();
  <span class="hljs-keyword">return</span> gulp.src([<span class="hljs-string">'./vendor/babelHelpers.js'</span>, <span class="hljs-string">'./dist/js/'</span> + jsLibName])
    .pipe(concat(jsLibName))
    .pipe(gulpif(argv.min, uglify()))
    .pipe(gulp.dest(<span class="hljs-string">'./dist/js'</span>));
});

<span class="hljs-comment">//将两个任务串联起来</span>
gulp.task(<span class="hljs-string">'build-all-js'</span>, sequence(<span class="hljs-string">'build-js'</span>, <span class="hljs-string">'concat-js'</span>));</code></pre>
<ul>
<li><p>先使用<code>gulp-concat</code>插件将babelHelpers.js和项目js文件进行连接合并。</p></li>
<li><p>然后使用<code>gulp-if</code>插件判断当前执行命令是否输入了<code>--min</code>参数，如果是则使用<code>gulp-uglify</code>插件进行js代码压缩。</p></li>
<li><p>定义build-all-js任务来将build-js和concat-js任务串联起来，但是需要使用<code>gulp-sequence</code>插件才能保证这两个任务是按顺序执行的。</p></li>
<li><p>最后，在/dist/js目录下会生成最终的项目js文件。</p></li>
</ul>
<h2 id="articleHeader8">执行单元测试</h2>
<p>本例中使用<code>jasmine</code>进行单元测试。代码比较简单，执行所有test目录内以"Spec"结尾的文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var jasmine = require('gulp-jasmine');

gulp.task(&quot;test&quot;, function () {
  return gulp.src([&quot;./test/**/**Spec.js&quot;])
    .pipe(jasmine());
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> jasmine = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-jasmine'</span>);

gulp.task(<span class="hljs-string">"test"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src([<span class="hljs-string">"./test/**/**Spec.js"</span>])
    .pipe(jasmine());
});</code></pre>
<p>执行命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code class="sh" style="word-break: break-word; white-space: initial;">gulp <span class="hljs-built_in">test</span></code></pre>
<p>即可在命令行中查看测试结果。</p>
<h2 id="articleHeader9">执行js代码检验</h2>
<p>本例中使用<code>eslint</code>进行js代码检验，需引入<code>gulp-eslint</code>插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var eslint = require('gulp-eslint');

gulp.task('eslint', function () {
  return gulp.src(['./src/**/*.js'])  //获取src目录内全部js文件
    .pipe(eslint({  //此处eslint的各配置项格式与.eslintrc文件相同
      &quot;rules&quot;: {
        &quot;camelcase&quot;: [2, { &quot;properties&quot;: &quot;always&quot; }],
        &quot;comma-dangle&quot;: [2, &quot;never&quot;],
        &quot;semi&quot;: [2, &quot;always&quot;],
        &quot;quotes&quot;: [2, &quot;single&quot;],
        &quot;strict&quot;: [2, &quot;global&quot;]
      },
      &quot;parser&quot;: &quot;babel-eslint&quot;
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> eslint = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-eslint'</span>);

gulp.task(<span class="hljs-string">'eslint'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src([<span class="hljs-string">'./src/**/*.js'</span>])  <span class="hljs-comment">//获取src目录内全部js文件</span>
    .pipe(eslint({  <span class="hljs-comment">//此处eslint的各配置项格式与.eslintrc文件相同</span>
      <span class="hljs-string">"rules"</span>: {
        <span class="hljs-string">"camelcase"</span>: [<span class="hljs-number">2</span>, { <span class="hljs-string">"properties"</span>: <span class="hljs-string">"always"</span> }],
        <span class="hljs-string">"comma-dangle"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"never"</span>],
        <span class="hljs-string">"semi"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"always"</span>],
        <span class="hljs-string">"quotes"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"single"</span>],
        <span class="hljs-string">"strict"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"global"</span>]
      },
      <span class="hljs-string">"parser"</span>: <span class="hljs-string">"babel-eslint"</span>
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});</code></pre>
<p>执行命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp eslint" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code class="sh" style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">gulp eslint</span></code></pre>
<p>即可在命令行中查看js代码检测结果。</p>
<p>另外如果是在es6环境下使用<code>gulp-eslint</code>，那么还需要安装<code>babel-eslint</code>这个包。此处有个小坑，就是<code>babel-eslint</code>包是依赖<code>estraverse</code>和<code>estraverse-fb</code>包的，但这两个包其实却需要单独安装。</p>
<h2 id="articleHeader10">生成css及字体文件</h2>
<p>例中的css及字体文件也需要合并构建，这里只简单介绍一下构建css的流程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var less = require('gulp-less'),
  cssnano = require('gulp-cssnano'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer');

function getCssLibName() {
  var libName = 'flarej.css';
  if (argv.min) {
    libName = 'flarej.min.css';
  }

  return libName;
}

//构建项目css文件
gulp.task('build-css', function () {
  return gulp.src('./src/styles/base.less')
    .pipe(less())  //转换less
    .pipe(rename(getCssLibName()))  //重命名转换后的css文件
    .pipe(gulp.dest('./dist/css'));
});

//将normalize.css与项目css进行合并
gulp.task('concat-css', function () {
  var cssLibName = getCssLibName();
  return gulp.src(['./vendor/normalize.css', './dist/css/' + cssLibName])
    .pipe(concat(cssLibName))  //连接合并
    .pipe(gulpif(argv.min, cssnano()))  //执行css压缩
    .pipe(postcss([autoprefixer({ browsers: ['last 50 versions'] })]))  //自动补厂商前缀
    .pipe(gulp.dest('./dist/css'));
});

//将两个任务串联起来
gulp.task('build-all-css', sequence('build-css', 'concat-css'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> less = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-less'</span>),
  cssnano = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-cssnano'</span>),
  postcss = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-postcss'</span>),
  autoprefixer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCssLibName</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> libName = <span class="hljs-string">'flarej.css'</span>;
  <span class="hljs-keyword">if</span> (argv.min) {
    libName = <span class="hljs-string">'flarej.min.css'</span>;
  }

  <span class="hljs-keyword">return</span> libName;
}

<span class="hljs-comment">//构建项目css文件</span>
gulp.task(<span class="hljs-string">'build-css'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'./src/styles/base.less'</span>)
    .pipe(less())  <span class="hljs-comment">//转换less</span>
    .pipe(rename(getCssLibName()))  <span class="hljs-comment">//重命名转换后的css文件</span>
    .pipe(gulp.dest(<span class="hljs-string">'./dist/css'</span>));
});

<span class="hljs-comment">//将normalize.css与项目css进行合并</span>
gulp.task(<span class="hljs-string">'concat-css'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> cssLibName = getCssLibName();
  <span class="hljs-keyword">return</span> gulp.src([<span class="hljs-string">'./vendor/normalize.css'</span>, <span class="hljs-string">'./dist/css/'</span> + cssLibName])
    .pipe(concat(cssLibName))  <span class="hljs-comment">//连接合并</span>
    .pipe(gulpif(argv.min, cssnano()))  <span class="hljs-comment">//执行css压缩</span>
    .pipe(postcss([autoprefixer({ <span class="hljs-attr">browsers</span>: [<span class="hljs-string">'last 50 versions'</span>] })]))  <span class="hljs-comment">//自动补厂商前缀</span>
    .pipe(gulp.dest(<span class="hljs-string">'./dist/css'</span>));
});

<span class="hljs-comment">//将两个任务串联起来</span>
gulp.task(<span class="hljs-string">'build-all-css'</span>, sequence(<span class="hljs-string">'build-css'</span>, <span class="hljs-string">'concat-css'</span>));</code></pre>
<h2 id="articleHeader11">构建全部代码</h2>
<p>本例中的<code>gulp</code>默认任务即为构建全部代码，输入命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp #可加&quot;--min&quot;参数构建压缩版" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code class="sh" style="word-break: break-word; white-space: initial;">gulp <span class="hljs-meta">#可加<span class="hljs-string">"--min"</span>参数构建压缩版</span></code></pre>
<p>即可执行，具体构建流程如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVuNth" src="https://static.alili.tech/img/bVuNth" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>更多细节大家可以查看本文示例的<a href="https://github.com/joe-sky/flarej/tree/use_browserify" rel="nofollow noreferrer" target="_blank">源代码</a>。</p>
<p>（完）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 Gulp + Browserify 构建 ES6 环境下的自动化前端项目

## 原文链接
[https://segmentfault.com/a/1190000004917668](https://segmentfault.com/a/1190000004917668)


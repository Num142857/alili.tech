---
title: 'webpack + gulp 在前端中的应用' 
date: 2019-02-10 2:30:42
hidden: true
slug: vz8mf69a4zg
categories: [reprint]
---

{{< raw >}}

                    
<h4>概述</h4>
<p>从去年短时间内对现有系统的改造到如今稳定实施，已经好几个月，这套流程满足了日常前端开发的流程。由于之前项目组的模块化本身做的不是很好，基本算是推到一半重来，虽然阵痛，但回顾起来确实非常值得。webpack，简单来说就是前端静态资源的打包工具，确实好用，原理也很简单，比以AMD、CMD为标准的模块加载器好用多了，难怪玉伯说要给seajs、requirejs立一块墓碑了。在讲webpack这之前简单说下前端模块化历程。</p>
<h4>模块化1.0</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// a.js
(function(){
// todo a
})();

// b.js
(function(){
// todo b
})();

// index.html
<script src=&quot;a.js&quot;></script>
<script src=&quot;b.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// a.js</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-comment">// todo a</span>
})();

<span class="hljs-comment">// b.js</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-comment">// todo b</span>
})();

<span class="hljs-comment">// index.html</span>
&lt;script src=<span class="hljs-string">"a.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;script src=<span class="hljs-string">"b.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>以上是在CommonJS规范出来之前的编码方式，大家应该非常熟悉。另外还有通过命名空间的方式来进行模块化，其实也没有真正的解决问题。</p>
<h4>模块化2.0</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// a.js
define(function(require, exports, module){
    // todo a
})

// b.js
define(function(require, exports, module){
    var a = require('./a');
    // todo b
})

// index.html
<script src=&quot;sea.js&quot;></script>
<script>
    sea.use(['b.js'], function(b){
    // todo
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// a.js</span>
define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>)</span>{
    <span class="hljs-comment">// todo a</span>
})

<span class="hljs-comment">// b.js</span>
define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>)</span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./a'</span>);
    <span class="hljs-comment">// todo b</span>
})

<span class="hljs-comment">// index.html</span>
&lt;script src=<span class="hljs-string">"sea.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;script&gt;
    sea.use([<span class="hljs-string">'b.js'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">b</span>)</span>{
    <span class="hljs-comment">// todo</span>
    });
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>这就是过去几年大家都非常熟悉的模块化方式，在发布上线时通过构建工具，提取模块id、以及模块的依赖，合并压缩代码等等构建工作。</p>
<p>但是用requirejs或者seajs，还是有些问题：</p>
<ul>
<li><p>只能模块化加载js、css，而且还不帮你合并，需要自己写插件去做合并的逻辑，组件化并不简单。</p></li>
<li><p>异步加载也不好用，尤其是部署时，hash后的资源路径自动替换还比较麻烦。</p></li>
<li><p>程序还是要依赖seajs这个几kb的库，总感觉有点多余。</p></li>
</ul>
<h4>模块化3.0</h4>
<p>webpack出来后，优雅的解决了很多问题，并且简单好用。它能把各种资源，例如JS（含JSX）、coffee、样式（含less/sass）、html、图片等静态资源都作为模块来处理。同时拥有异步加载的能力，非常适用于大型复杂的webapp的场景。webpack有以下特点：</p>
<ul>
<li><p>兼容AMD/CMD的模块加载</p></li>
<li><p>js模块的写法遵循CommonJS规范</p></li>
<li><p>模块化所有静态资源（JS、CSS、html、图片、字体等）</p></li>
<li><p>开发、部署便捷，能替代大部分 grunt/gulp 的工作，比如打包、压缩混淆、图片转base64等</p></li>
</ul>
<p>通过一个简单的配置文件即可搞定这些。</p>
<h4>实战</h4>
<p>结合项目本身的特点，部分功能webpack无法做到，最终选用gulp+webpack方式来支撑前端的工作流，项目需求：</p>
<ul>
<li><p>最小化配置项（webpack.config.js）</p></li>
<li><p>所有资源使用增量发布策略，文件名全部 md5 版本化</p></li>
<li><p>支持多种模块化策略，使用 webpack 进行模块化打包</p></li>
<li><p>自动替换 html/js 内部资源引用路径，替换为 cdn/md5 版本化路径</p></li>
<li><p>轻松支持 js资源内嵌到页面</p></li>
<li><p>开发时监听文件，自动上传到开发机</p></li>
</ul>
<p>由于css是由重构同学写，雪碧图，压缩、发布等等都由他们来做，所以没有考虑加入到构建流程中来。</p>
<p>项目目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="src/
    js/
    widget/
    css/
    img/
    project_tpl/
    gulpfile.js
    app/
        js/
        css/
        img/
        index.html
        tpl/
        webpack.config.js
        gulpfile.js
app/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>src/
    js/
    widget/
    css/
    img/
    project_tpl/
    gulpfile<span class="hljs-selector-class">.js</span>
    app/
        js/
        css/
        img/
        index<span class="hljs-selector-class">.html</span>
        tpl/
        webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
        gulpfile<span class="hljs-selector-class">.js</span>
app/</code></pre>
<p>src目录下是项目的源代码，每个目录（app）即为一个项目，为了尽量避免冲突，一个人开发并维护一个项目下的代码。</p>
<p>project_tpl为项目的模板，通过gulp新建项目，完成一些初始化配置，初始化后基本无需配置即可进行项目开发。</p>
<p>js/css/img为站点的一些公共资源模块，widget为公共基础组件。</p>
<p>app项目下为业务的css、js、tpl目录，tpl为前端模板目录，可以通过webpack的html-loader插件加载。</p>
<p>gulpfile.js、webpack.config.js 为项目的构建工具配置文件。</p>
<p>这样一个项目的脚手架搭建完成，可以开始为项目添砖加瓦了。可以点击这里看github上的<a href="https://github.com/iamaddy/webpack-example" rel="nofollow noreferrer" target="_blank">例子</a>。</p>
<h4>webpack配置文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');
var globalConfig = require('../global.config');
var commonJSEntry = globalConfig.jsCommon;
var path          = require('path');

module.exports = {
// 如果项目有多个HTML，或者多个入口
// 配置js入口文件，base是公共库配置，除了打包工具自动化抽取共用的模块，也可以自定义配置哪些模块为共用的。
entry:{
    index: './js/index',
    base: commonJSEntry,
},
// 文件产出目录
output:{
    filename:'../test/js/[name].js',
    // 异步加载的chunk，命名规则，chunk我暂时理解为从合并的代码里分离出来的代码块，在处理非首屏逻辑，或者异步加载逻辑可以用这个。只要在js代码中用require.ensure来异步加载模块即可。
    chunkFilename: '../test/js/[chunkhash:8]_chunk.js',
    // 资源文件的CDN前缀
    publicPath: debug ? &quot;&quot; : '//cdn.xxx.com/webpack/test/'
},
resolve: {
    // 模块的别名，通常可以为第三方模块
    alias: {
        ajax: &quot;../../js/base/ajax&quot;,
        dom: &quot;../../js/base/dom&quot;
    },
    // root模块的根路径，可以指定从哪里找模块，可以为数组[]
    // 这样在模块依赖的时候就不要写require(../../../xx.js)
    // 直接为require(xx)
    root: path.resolve('../../js')
},
// 模块加载器，加载不同类型的文件，需要下载或者开发loader插件，以下为加载html模块的加载器
loader: [
    {test: /\.html$/,   loader: 'html'}
],
/*
1、可以通过配置文件指定哪位模块为公共模块，这样功能模块可以长期缓存。
解释下这个插件的意思，就是提取公共的chunk，base对应了entry中的配置，&quot;../test/js/common.js&quot;是产出的路径，也就是将commonJSEntry中的配置模块合并成一个common.js文件。
2、webpack也可自动提取页面之间公用的代码作为公共部分。下面的代码即是自动提取公共代码了。
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin(&quot;../test/js/common.js&quot;);
*/
plugins: [
    new webpack.optimize.CommonsChunkPlugin(&quot;base&quot;, &quot;../test/js/common.js&quot;)
]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> globalConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../global.config'</span>);
<span class="hljs-keyword">var</span> commonJSEntry = globalConfig.jsCommon;
<span class="hljs-keyword">var</span> path          = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-built_in">module</span>.exports = {
<span class="hljs-comment">// 如果项目有多个HTML，或者多个入口</span>
<span class="hljs-comment">// 配置js入口文件，base是公共库配置，除了打包工具自动化抽取共用的模块，也可以自定义配置哪些模块为共用的。</span>
entry:{
    <span class="hljs-attr">index</span>: <span class="hljs-string">'./js/index'</span>,
    <span class="hljs-attr">base</span>: commonJSEntry,
},
<span class="hljs-comment">// 文件产出目录</span>
output:{
    <span class="hljs-attr">filename</span>:<span class="hljs-string">'../test/js/[name].js'</span>,
    <span class="hljs-comment">// 异步加载的chunk，命名规则，chunk我暂时理解为从合并的代码里分离出来的代码块，在处理非首屏逻辑，或者异步加载逻辑可以用这个。只要在js代码中用require.ensure来异步加载模块即可。</span>
    chunkFilename: <span class="hljs-string">'../test/js/[chunkhash:8]_chunk.js'</span>,
    <span class="hljs-comment">// 资源文件的CDN前缀</span>
    publicPath: debug ? <span class="hljs-string">""</span> : <span class="hljs-string">'//cdn.xxx.com/webpack/test/'</span>
},
<span class="hljs-attr">resolve</span>: {
    <span class="hljs-comment">// 模块的别名，通常可以为第三方模块</span>
    alias: {
        <span class="hljs-attr">ajax</span>: <span class="hljs-string">"../../js/base/ajax"</span>,
        <span class="hljs-attr">dom</span>: <span class="hljs-string">"../../js/base/dom"</span>
    },
    <span class="hljs-comment">// root模块的根路径，可以指定从哪里找模块，可以为数组[]</span>
    <span class="hljs-comment">// 这样在模块依赖的时候就不要写require(../../../xx.js)</span>
    <span class="hljs-comment">// 直接为require(xx)</span>
    root: path.resolve(<span class="hljs-string">'../../js'</span>)
},
<span class="hljs-comment">// 模块加载器，加载不同类型的文件，需要下载或者开发loader插件，以下为加载html模块的加载器</span>
loader: [
    {<span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.html$/</span>,   <span class="hljs-attr">loader</span>: <span class="hljs-string">'html'</span>}
],
<span class="hljs-comment">/*
1、可以通过配置文件指定哪位模块为公共模块，这样功能模块可以长期缓存。
解释下这个插件的意思，就是提取公共的chunk，base对应了entry中的配置，"../test/js/common.js"是产出的路径，也就是将commonJSEntry中的配置模块合并成一个common.js文件。
2、webpack也可自动提取页面之间公用的代码作为公共部分。下面的代码即是自动提取公共代码了。
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin("../test/js/common.js");
*/</span>
plugins: [
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">"base"</span>, <span class="hljs-string">"../test/js/common.js"</span>)
]
};</code></pre>
<p>由于项目的特性，没有用到热插拔，所以就不进行讲解了。</p>
<h4>gulp跑起来</h4>
<p>webpack最终是当做gulp的一个插件来运行，读取的上述的webpack配置文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('watch-html', function() {
    // upload
});

gulp.task('watch-module', function() {
    var watchPath = [
        '../js/**',
        '../css/**',
        '../widget/**',
        'js/**',
        'css/**',
        'tpl/**'
    ];
    gulp.watch(watchPath, function(event){
        gulp.src(watchPath)
            .pipe(webpack(require('webpack.config')))
            .pipe(gulp.dest(releaseRelativePath + projectName))
            .pipe(upload(opt, function(err, data){})
    })
});

gulp.task('default', ['watch-html', 'watch-module']);

// release build webpack module
gulp.task('release-module', function() {
    var releasePath = [
        '../js/**',
        '../css/**',
        '../widget/**',
        'js/**',
        'css/**',
        'tpl/**'
    ];
    return gulp.src(watchPath)
                .pipe(webpack(require('webpack.config')))
                .pipe(uglify())
                .pipe(hash())
                .pipe(rename(function(path) {
                // 获取当前的日期，将发布文件已日期归类，更方便查找文件
                    path.dirname = path.dirname + '/' + year + month + day;
                })
                .pipe(gulp.dest(releaseRelativePath + projectName))
                .pipe(upload(opt, function(err, data){})
    })
});

// release build html
gulp.task('release', ['release-module'], function(){
    gulp.src(['**/*.html'])
        .pipe(parseHtml(releaseRelativePath + projectName, CDN_URL))
        .pipe(gulp.dest(releaseRelativePath + projectName))
        .pipe(upload(opt, function(err, data){})
        .pipe(uploadToCDN())
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>gulp.task(<span class="hljs-string">'watch-html'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// upload</span>
});

gulp.task(<span class="hljs-string">'watch-module'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> watchPath = [
        <span class="hljs-string">'../js/**'</span>,
        <span class="hljs-string">'../css/**'</span>,
        <span class="hljs-string">'../widget/**'</span>,
        <span class="hljs-string">'js/**'</span>,
        <span class="hljs-string">'css/**'</span>,
        <span class="hljs-string">'tpl/**'</span>
    ];
    gulp.watch(watchPath, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
        gulp.src(watchPath)
            .pipe(webpack(<span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack.config'</span>)))
            .pipe(gulp.dest(releaseRelativePath + projectName))
            .pipe(upload(opt, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, data</span>)</span>{})
    })
});

gulp.task(<span class="hljs-string">'default'</span>, [<span class="hljs-string">'watch-html'</span>, <span class="hljs-string">'watch-module'</span>]);

<span class="hljs-comment">// release build webpack module</span>
gulp.task(<span class="hljs-string">'release-module'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> releasePath = [
        <span class="hljs-string">'../js/**'</span>,
        <span class="hljs-string">'../css/**'</span>,
        <span class="hljs-string">'../widget/**'</span>,
        <span class="hljs-string">'js/**'</span>,
        <span class="hljs-string">'css/**'</span>,
        <span class="hljs-string">'tpl/**'</span>
    ];
    <span class="hljs-keyword">return</span> gulp.src(watchPath)
                .pipe(webpack(<span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack.config'</span>)))
                .pipe(uglify())
                .pipe(hash())
                .pipe(rename(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
                <span class="hljs-comment">// 获取当前的日期，将发布文件已日期归类，更方便查找文件</span>
                    path.dirname = path.dirname + <span class="hljs-string">'/'</span> + year + month + day;
                })
                .pipe(gulp.dest(releaseRelativePath + projectName))
                .pipe(upload(opt, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, data</span>)</span>{})
    })
});

<span class="hljs-comment">// release build html</span>
gulp.task(<span class="hljs-string">'release'</span>, [<span class="hljs-string">'release-module'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    gulp.src([<span class="hljs-string">'**/*.html'</span>])
        .pipe(parseHtml(releaseRelativePath + projectName, CDN_URL))
        .pipe(gulp.dest(releaseRelativePath + projectName))
        .pipe(upload(opt, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, data</span>)</span>{})
        .pipe(uploadToCDN())
})</code></pre>
<p>（以上用到的部分npm模块是自定义的）。</p>
<p>1、项目开始前，通过gulp init -p YourProjectName 来初始化项目<br>2、开发和发布两套命令，开发：gulp，发布：gulp release<br>3、需要自行编写gulp插件来替换html中引用资源的路径，原理也很简单，在构建webpack模块后，将产出的文件列表与原文件的映射关系保存在数组，查找html中引用的js路径，替换成hash后就可以了。</p>
<p>通过以上方法，就可以满足我们项目之前的需求，基本上做到自动化，自动构建，自动发布脚本，html文件走内部发布系统发布。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack + gulp 在前端中的应用

## 原文链接
[https://segmentfault.com/a/1190000005129121](https://segmentfault.com/a/1190000005129121)


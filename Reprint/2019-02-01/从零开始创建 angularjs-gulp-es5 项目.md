---
title: '从零开始创建 angularjs-gulp-es5 项目' 
date: 2019-02-01 2:30:10
hidden: true
slug: 69nesvdodfw
categories: [reprint]
---

{{< raw >}}

                    
<h4>源码地址：<a href="https://github.com/silence717/angular-gulp-seed" rel="nofollow noreferrer" target="_blank">https://github.com/silence717/angular-gulp-seed</a>
</h4>
<h2 id="articleHeader0">创建一个空文件夹名字任意，此项目为angular-gulp-seed</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir angular-gulp-seed" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">mkdir angular-gulp-seed</code></pre>
<h2 id="articleHeader1">初始化工程</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm init</code></pre>
<h2 id="articleHeader2">创建项目基本目录结构如下：</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+src
    +app            // 业务模块
        -app.js    // 应用入口
        +demo   // 业务模块目录，所有子模块均遵循此目录
            - module.js      // 模块声明文件
            - controller.js  // vm层
            - index.html     // 主入口模板
            - router.js      // 模块路由文件
            - style.css      // 模块样式
        +home
    +assets            // 静态资源目录
        -images
        -css
    +common            // 公共服务
    +components    // 公共组件
    +scripts         // gulp脚本
        - gulp.build.js   // build任务
        - gulp.common.js  // dev,build公共任务
        - gulp.config.js  // 基础配置
        - gulp.dev.js     // dev任务
    index.html  // 主页面

package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>+src
    +app            <span class="hljs-comment">// 业务模块</span>
        -app<span class="hljs-selector-class">.js</span>    <span class="hljs-comment">// 应用入口</span>
        +demo   <span class="hljs-comment">// 业务模块目录，所有子模块均遵循此目录</span>
            - module<span class="hljs-selector-class">.js</span>      <span class="hljs-comment">// 模块声明文件</span>
            - controller<span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// vm层</span>
            - index<span class="hljs-selector-class">.html</span>     <span class="hljs-comment">// 主入口模板</span>
            - router<span class="hljs-selector-class">.js</span>      <span class="hljs-comment">// 模块路由文件</span>
            - style<span class="hljs-selector-class">.css</span>      <span class="hljs-comment">// 模块样式</span>
        +home
    +assets            <span class="hljs-comment">// 静态资源目录</span>
        -images
        -css
    +common            <span class="hljs-comment">// 公共服务</span>
    +components    <span class="hljs-comment">// 公共组件</span>
    +scripts         <span class="hljs-comment">// gulp脚本</span>
        - gulp<span class="hljs-selector-class">.build</span><span class="hljs-selector-class">.js</span>   <span class="hljs-comment">// build任务</span>
        - gulp<span class="hljs-selector-class">.common</span><span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// dev,build公共任务</span>
        - gulp<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// 基础配置</span>
        - gulp<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.js</span>     <span class="hljs-comment">// dev任务</span>
    index<span class="hljs-selector-class">.html</span>  <span class="hljs-comment">// 主页面</span>

package.json</code></pre>
<h2 id="articleHeader3">正式开始coding</h2>
<h3 id="articleHeader4">gulp配置部分</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 安装gulp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;"><span class="hljs-bullet">1. </span>安装gulp</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install  gulp -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install  gulp -D</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2. 新建gulpfile文件，安装browser-sync包，配置第一个任务" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;"><span class="hljs-bullet">2. </span>新建gulpfile文件，安装browser-sync包，配置第一个任务</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var browserSync = require('browser-sync');
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './',
            index: 'src/index.html'
        }
    });
});
gulp.task('default', ['browserSync']);
// 执行gulp命令，浏览器启动，可以看到大致页面结构" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> browserSync = <span class="hljs-built_in">require</span>(<span class="hljs-string">'browser-sync'</span>);
gulp.task(<span class="hljs-string">'browserSync'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    browserSync({
        <span class="hljs-attr">server</span>: {
            <span class="hljs-attr">baseDir</span>: <span class="hljs-string">'./'</span>,
            <span class="hljs-attr">index</span>: <span class="hljs-string">'src/index.html'</span>
        }
    });
});
gulp.task(<span class="hljs-string">'default'</span>, [<span class="hljs-string">'browserSync'</span>]);
<span class="hljs-comment">// 执行gulp命令，浏览器启动，可以看到大致页面结构</span></code></pre>
<p>更多browser-sync的信息：<a href="http://www.browsersync.cn/" rel="nofollow noreferrer" target="_blank">http://www.browsersync.cn/</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3. 为了动态插入新加的js和css文件,且添加的文件有一定顺序，安装gulp系列包。  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;"><span class="hljs-bullet">3. </span>为了动态插入新加的js和css文件,且添加的文件有一定顺序，安装gulp系列包。  </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install gulp-watch gulp-inject gulp-order -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install gulp-watch gulp-inject gulp-order -D</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="4. 新建一个gulp.config.js文件,配置一些基本文件路径和顺序" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">4</span>. 新建一个gulp<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>文件,配置一些基本文件路径和顺序</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function () {

    var src = './src/';
    var build = './dist/';

    var config = {
        src: src,
        build: build,
        index: src + 'index.html',
        css: [src + '**/*.css'],
        appJs: [src + 'app/**/*.js'],
        commonJs: [src + 'common/**/*.js'],
        componentJs: [src + 'components/**/*.js'],
        jsOrder: [
            '**/app.js',    // 项目主入口
            '**/app.*.js',  // 主入口相应配置
            '**/module.js', // 模块声明
            '**/router.js', // 模块路由
            '**/index.js',  // 组件、resource入口
            '**/*.js'       // 其他
        ],
        cssOrder: [
            '**/app.css',       // 项目主模块
            '**/*.module.css',  // 业务子模块
            '**/*.css'          // 其他
        ]
    }
    return config;
}();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

    <span class="hljs-keyword">var</span> src = <span class="hljs-string">'./src/'</span>;
    <span class="hljs-keyword">var</span> build = <span class="hljs-string">'./dist/'</span>;

    <span class="hljs-keyword">var</span> config = {
        <span class="hljs-attr">src</span>: src,
        <span class="hljs-attr">build</span>: build,
        <span class="hljs-attr">index</span>: src + <span class="hljs-string">'index.html'</span>,
        <span class="hljs-attr">css</span>: [src + <span class="hljs-string">'**/*.css'</span>],
        <span class="hljs-attr">appJs</span>: [src + <span class="hljs-string">'app/**/*.js'</span>],
        <span class="hljs-attr">commonJs</span>: [src + <span class="hljs-string">'common/**/*.js'</span>],
        <span class="hljs-attr">componentJs</span>: [src + <span class="hljs-string">'components/**/*.js'</span>],
        <span class="hljs-attr">jsOrder</span>: [
            <span class="hljs-string">'**/app.js'</span>,    <span class="hljs-comment">// 项目主入口</span>
            <span class="hljs-string">'**/app.*.js'</span>,  <span class="hljs-comment">// 主入口相应配置</span>
            <span class="hljs-string">'**/module.js'</span>, <span class="hljs-comment">// 模块声明</span>
            <span class="hljs-string">'**/router.js'</span>, <span class="hljs-comment">// 模块路由</span>
            <span class="hljs-string">'**/index.js'</span>,  <span class="hljs-comment">// 组件、resource入口</span>
            <span class="hljs-string">'**/*.js'</span>       <span class="hljs-comment">// 其他</span>
        ],
        <span class="hljs-attr">cssOrder</span>: [
            <span class="hljs-string">'**/app.css'</span>,       <span class="hljs-comment">// 项目主模块</span>
            <span class="hljs-string">'**/*.module.css'</span>,  <span class="hljs-comment">// 业务子模块</span>
            <span class="hljs-string">'**/*.css'</span>          <span class="hljs-comment">// 其他</span>
        ]
    }
    <span class="hljs-keyword">return</span> config;
}();</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="5. 使用gulp-inject动态插入css和js  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;"><span class="hljs-bullet">5. </span>使用gulp-inject动态插入css和js  </code></pre>
<ul><li><p>js任务编写</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var config = require('./gulp.conf.js');
gulp.task('inject', function() {

    var js = gulp.src(config.js, {read: false}).pipe(order(config.jsOrder));
    var css = gulp.src(config.css, {read: false}).pipe(order(config.cssOrder));

    return gulp
        .src(config.index)
        .pipe(inject(js, {addPrefix: '../src', relative: true}))
        .pipe(inject(css, {addPrefix: '../src', relative: true}))
        .pipe(gulp.dest(config.src))
        .pipe(browserSync.reload({stream: true}));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./gulp.conf.js'</span>);
gulp.task(<span class="hljs-string">'inject'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

    <span class="hljs-keyword">var</span> js = gulp.src(config.js, {<span class="hljs-attr">read</span>: <span class="hljs-literal">false</span>}).pipe(order(config.jsOrder));
    <span class="hljs-keyword">var</span> css = gulp.src(config.css, {<span class="hljs-attr">read</span>: <span class="hljs-literal">false</span>}).pipe(order(config.cssOrder));

    <span class="hljs-keyword">return</span> gulp
        .src(config.index)
        .pipe(inject(js, {<span class="hljs-attr">addPrefix</span>: <span class="hljs-string">'../src'</span>, <span class="hljs-attr">relative</span>: <span class="hljs-literal">true</span>}))
        .pipe(inject(css, {<span class="hljs-attr">addPrefix</span>: <span class="hljs-string">'../src'</span>, <span class="hljs-attr">relative</span>: <span class="hljs-literal">true</span>}))
        .pipe(gulp.dest(config.src))
        .pipe(browserSync.reload({<span class="hljs-attr">stream</span>: <span class="hljs-literal">true</span>}));
});</code></pre>
<ul><li><p>页面添加inject标识</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- css -- >
<!-- inject:css -->
<!-- endinject -->

<!-- js -- >
<!-- inject:js -->
<!-- endinject -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- css -- &gt;
&lt;!-- inject:css --&gt;</span>
<span class="hljs-comment">&lt;!-- endinject --&gt;</span>

<span class="hljs-comment">&lt;!-- js -- &gt;
&lt;!-- inject:js --&gt;</span>
<span class="hljs-comment">&lt;!-- endinject --&gt;</span></code></pre>
<ul><li><p>添加到default任务中</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('default', ['inject', 'browserSync']);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">gulp.task(<span class="hljs-string">'default'</span>, [<span class="hljs-string">'inject'</span>, <span class="hljs-string">'browserSync'</span>]);</code></pre>
<ul><li><p>执行gulp命令，可看到如图页面效果,同时index.html页面内容发生变化</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- inject:css -->
<link rel=&quot;stylesheet&quot; href=&quot;../src/assets/css/app.css&quot;>
<!-- endinject -->

<!-- inject:js -->
<script src=&quot;../src/app/app.js&quot;></script>
<!-- endinject -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- inject:css --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"../src/assets/css/app.css"</span>&gt;</span>
<span class="hljs-comment">&lt;!-- endinject --&gt;</span>

<span class="hljs-comment">&lt;!-- inject:js --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../src/app/app.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!-- endinject --&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="6. 开发过程中会不断添加新的css和js文件，为了优化开发体验，引入gulp-watch包添加watch任务，当js和css文件发生变化的时候，去执行inject任务" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">6</span>. 开发过程中会不断添加新的css和<span class="hljs-keyword">js</span>文件，为了优化开发体验，引入gulp-watch包添加watch任务，当<span class="hljs-keyword">js</span>和css文件发生变化的时候，去执行inject任务</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var watch = require('gulp-watch');
gulp.task('watch', function() {
    watch('src/**/*.js', function() {
        gulp.run('inject');
    });
    watch('src/**/*.css', function() {
        gulp.run('inject');
    });
});
gulp.task('default', ['inject', 'browserSync', 'watch']);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> watch = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-watch'</span>);
gulp.task(<span class="hljs-string">'watch'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    watch(<span class="hljs-string">'src/**/*.js'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        gulp.run(<span class="hljs-string">'inject'</span>);
    });
    watch(<span class="hljs-string">'src/**/*.css'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        gulp.run(<span class="hljs-string">'inject'</span>);
    });
});
gulp.task(<span class="hljs-string">'default'</span>, [<span class="hljs-string">'inject'</span>, <span class="hljs-string">'browserSync'</span>, <span class="hljs-string">'watch'</span>]);</code></pre>
<h3 id="articleHeader5">编写业务代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 安装angular相关包" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;"><span class="hljs-bullet">1. </span>安装angular相关包</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install  angular angular-ui-router --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install  angular angular-ui-router --save</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2. 由于代码量过大，不贴出具体参见src/spp下面代码实现" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;"><span class="hljs-bullet">2. </span>由于代码量过大，不贴出具体参见src/spp下面代码实现</code></pre>
<ul>
<li><p>src/index.html</p></li>
<li><p>src/app.js 项目主入口</p></li>
<li><p>src/app.router.js 项目路由配置</p></li>
</ul>
<h3 id="articleHeader6">mock数据服务</h3>
<p>为了前端保持独立，使用express搭建一个mock服务，然后我们就能愉快的开始开发了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 首先安装依赖包：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;"><span class="hljs-bullet">1. </span>首先安装依赖包：</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install express body-parser json-server http-proxy-middleware -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install express body-parser json-server http-proxy-middleware -D</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2. 创建server.js，内容如下：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">2.</span> 创建<span class="hljs-keyword">server</span>.js，内容如下：</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var jsonServer = require('json-server');
var server = jsonServer.create();
var middlewares = jsonServer.defaults();
var bodyParser = require('body-parser');
var mockRouter = require('./mock/index');

// 添加默认的中间件 logger, static, cors and no-cache
server.use(middlewares);

// 解析 body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));

server.use(mockRouter);

server.listen(4000, function() {
    console.log('God bless me no bug, http://localhost:4000');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> jsonServer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'json-server'</span>);
<span class="hljs-keyword">var</span> server = jsonServer.create();
<span class="hljs-keyword">var</span> middlewares = jsonServer.defaults();
<span class="hljs-keyword">var</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>);
<span class="hljs-keyword">var</span> mockRouter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./mock/index'</span>);

<span class="hljs-comment">// 添加默认的中间件 logger, static, cors and no-cache</span>
server.use(middlewares);

<span class="hljs-comment">// 解析 body</span>
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    <span class="hljs-attr">extended</span>: <span class="hljs-literal">false</span>
}));

server.use(mockRouter);

server.listen(<span class="hljs-number">4000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'God bless me no bug, http://localhost:4000'</span>);
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3. mock文件夹下创建index.js,内容如下：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">3</span>. mock文件夹下创建index<span class="hljs-selector-class">.js</span>,内容如下：</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require('fs');
var express = require ('express');
var router = express.Router();

fs.readdirSync('mock').forEach(function(route) {
    if (route.indexOf('index') === -1) {
        require('./' + route)(router);
    }
});

module.exports = router;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span> (<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> router = express.Router();

fs.readdirSync(<span class="hljs-string">'mock'</span>).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">route</span>) </span>{
    <span class="hljs-keyword">if</span> (route.indexOf(<span class="hljs-string">'index'</span>) === <span class="hljs-number">-1</span>) {
        <span class="hljs-built_in">require</span>(<span class="hljs-string">'./'</span> + route)(router);
    }
});

<span class="hljs-built_in">module</span>.exports = router;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="4. 引入angular-resource.js，使用$resource服务" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">4.</span> 引入angular-resource.js，使用$resource服务</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install angular-resource --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install angular-resource --save</code></pre>
<p>在common/resource/创建一个utils,具体文件为resourceUtils，为所有请求添加统一前缀</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
    angular
        .module('app.resource')
        .factory('resourceUtils', resourceUtils)
        .factory('webResource', webResource);

    resourceUtils.$inject = ['$resource'];

    function resourceUtils($resource) {
        return function(apiPrefix) {
            return function(url, params, actions) {
                return $resource(apiPrefix + url, params, actions);
            };
        };
    }

    webResource.$inject = ['resourceUtils'];
    function webResource(resourceUtils) {
        // 其中***为后端服务的统一前缀
        return resourceUtils('/***/'); 
    }

})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    angular
        .module(<span class="hljs-string">'app.resource'</span>)
        .factory(<span class="hljs-string">'resourceUtils'</span>, resourceUtils)
        .factory(<span class="hljs-string">'webResource'</span>, webResource);

    resourceUtils.$inject = [<span class="hljs-string">'$resource'</span>];

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resourceUtils</span>(<span class="hljs-params">$resource</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">apiPrefix</span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url, params, actions</span>) </span>{
                <span class="hljs-keyword">return</span> $resource(apiPrefix + url, params, actions);
            };
        };
    }

    webResource.$inject = [<span class="hljs-string">'resourceUtils'</span>];
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">webResource</span>(<span class="hljs-params">resourceUtils</span>) </span>{
        <span class="hljs-comment">// 其中***为后端服务的统一前缀</span>
        <span class="hljs-keyword">return</span> resourceUtils(<span class="hljs-string">'/***/'</span>); 
    }

})();</code></pre>
<p>关于$resource服务的使用，请参考这篇文章。<a href="https://silence717.github.io/2016/09/28/creating-crud-app-minutes-angulars-resource/" rel="nofollow noreferrer" target="_blank">https://silence717.github.io/2016/09/28/creating-crud-app-minutes-angulars-resource/</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="5. 在gulpfile.js中统一配置代理，并且修改browserSync任务：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">5. 在<span class="hljs-selector-tag">gulpfile</span><span class="hljs-selector-class">.js</span>中统一配置代理，并且修改<span class="hljs-selector-tag">browserSync</span>任务：</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入http-proxy-middleware
var proxyMiddleware = require('http-proxy-middleware');

// 配置代理路径,是否为本地mock
var isLocal = true;
var target = '';

if (isLocal) {
    target = 'http://localhost:4000';
} else {
    // API address
}
// browserSync任务添加代理
gulp.task('browserSync', function() {
    var middleware = proxyMiddleware(['/***/'], {target: target, changeOrigin: true});
    browserSync({
        server: {
            baseDir: './',
            index: 'src/index.html',
            middleware: middleware
        }
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 引入http-proxy-middleware</span>
<span class="hljs-keyword">var</span> proxyMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>);

<span class="hljs-comment">// 配置代理路径,是否为本地mock</span>
<span class="hljs-keyword">var</span> isLocal = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">var</span> target = <span class="hljs-string">''</span>;

<span class="hljs-keyword">if</span> (isLocal) {
    target = <span class="hljs-string">'http://localhost:4000'</span>;
} <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// API address</span>
}
<span class="hljs-comment">// browserSync任务添加代理</span>
gulp.task(<span class="hljs-string">'browserSync'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> middleware = proxyMiddleware([<span class="hljs-string">'/***/'</span>], {<span class="hljs-attr">target</span>: target, <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>});
    browserSync({
        <span class="hljs-attr">server</span>: {
            <span class="hljs-attr">baseDir</span>: <span class="hljs-string">'./'</span>,
            <span class="hljs-attr">index</span>: <span class="hljs-string">'src/index.html'</span>,
            <span class="hljs-attr">middleware</span>: middleware
        }
    });
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="6. 你可能需要添加一些公共的interceptor去处理后端返回的数据或者请求出错的统一处理。具体参见[https://docs.angularjs.org/api/ng/service/$http](https://docs.angularjs.org/api/ng/service/$http).  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">6. </span>你可能需要添加一些公共的interceptor去处理后端返回的数据或者请求出错的统一处理。具体参见[<span class="hljs-string">https://docs.angularjs.org/api/ng/service/$http</span>](<span class="hljs-link">https://docs.angularjs.org/api/ng/service/$http</span>).  
</code></pre>
<p><strong>至此已经可以在本地愉快的开发了。</strong></p>
<h3 id="articleHeader7">配置gulp编译任务</h3>
<p>开发完成以后代码需要build上线，继续创建一些task。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 安装相关依赖包" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;"><span class="hljs-bullet">1. </span>安装相关依赖包</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install gulp-angular-templatecache gulp-minify-css gulp-if gulp-useref gulp-uglify gulp-replace -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install gulp-angular-templatecache gulp-minify-css gulp-if gulp-useref gulp-uglify gulp-replace -D</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2. 配置build任务，具体在scripts/gulp.build.js文件中.

3. 页面html遇到build的地方配置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>2. 配置<span class="hljs-keyword">build</span>任务，具体在scripts/gulp.<span class="hljs-keyword">build</span>.js文件中.

<span class="hljs-number">3.</span> 页面html遇到<span class="hljs-keyword">build</span>的地方配置</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" ...
 <!-- build:css css/app.css -->
 <!-- endbuild -->
 
 <!-- build:js js/common.js -->
 <!-- endbuild -->
 ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> ...
 <span class="hljs-comment">&lt;!-- build:css css/app.css --&gt;</span>
 <span class="hljs-comment">&lt;!-- endbuild --&gt;</span>
 
 <span class="hljs-comment">&lt;!-- build:js js/common.js --&gt;</span>
 <span class="hljs-comment">&lt;!-- endbuild --&gt;</span>
 ...</code></pre>
<h3 id="articleHeader8">我将gulp的任务全部独立出去管理，这样使得gulpfile.js更加清晰</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var config = require('./scripts/gulp.conf.js');
var buildTask = require('./scripts/gulp.build.js');
var devTask = require('./scripts/gulp.dev.js');
var commonTask = require('./scripts/gulp.common.js');

// 动态添加css和js到index.html
gulp.task('inject', function() {
    commonTask.inject();
});
// 添加监听任务
gulp.task('watch', function() {
    devTask.watch();
});
// 使用browerSync启动浏览器
gulp.task('browserSync', function() {
    devTask.browserSync();
});
// 清除dist文件
gulp.task('clean', function() {
    del(config.build);
});
// 打包组件模板
gulp.task('build:components-templates', function() {
    buildTask.componentsTemplate();
});
// 打包业务模板
gulp.task('build:app-templates', function () {
    buildTask.appTemplate();
});
// build index文件
gulp.task('build', ['build:components-templates', 'build:app-templates'], function() {
    buildTask.buildIndex();
});
// 本地开发
gulp.task('default', ['inject', 'browserSync', 'watch']);
// 线上环境打包
gulp.task('dist', ['clean'], function() {
    runSequence('inject', 'build');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>);
<span class="hljs-keyword">var</span> del = <span class="hljs-built_in">require</span>(<span class="hljs-string">'del'</span>);
<span class="hljs-keyword">var</span> runSequence = <span class="hljs-built_in">require</span>(<span class="hljs-string">'run-sequence'</span>);
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./scripts/gulp.conf.js'</span>);
<span class="hljs-keyword">var</span> buildTask = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./scripts/gulp.build.js'</span>);
<span class="hljs-keyword">var</span> devTask = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./scripts/gulp.dev.js'</span>);
<span class="hljs-keyword">var</span> commonTask = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./scripts/gulp.common.js'</span>);

<span class="hljs-comment">// 动态添加css和js到index.html</span>
gulp.task(<span class="hljs-string">'inject'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    commonTask.inject();
});
<span class="hljs-comment">// 添加监听任务</span>
gulp.task(<span class="hljs-string">'watch'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    devTask.watch();
});
<span class="hljs-comment">// 使用browerSync启动浏览器</span>
gulp.task(<span class="hljs-string">'browserSync'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    devTask.browserSync();
});
<span class="hljs-comment">// 清除dist文件</span>
gulp.task(<span class="hljs-string">'clean'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    del(config.build);
});
<span class="hljs-comment">// 打包组件模板</span>
gulp.task(<span class="hljs-string">'build:components-templates'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    buildTask.componentsTemplate();
});
<span class="hljs-comment">// 打包业务模板</span>
gulp.task(<span class="hljs-string">'build:app-templates'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    buildTask.appTemplate();
});
<span class="hljs-comment">// build index文件</span>
gulp.task(<span class="hljs-string">'build'</span>, [<span class="hljs-string">'build:components-templates'</span>, <span class="hljs-string">'build:app-templates'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    buildTask.buildIndex();
});
<span class="hljs-comment">// 本地开发</span>
gulp.task(<span class="hljs-string">'default'</span>, [<span class="hljs-string">'inject'</span>, <span class="hljs-string">'browserSync'</span>, <span class="hljs-string">'watch'</span>]);
<span class="hljs-comment">// 线上环境打包</span>
gulp.task(<span class="hljs-string">'dist'</span>, [<span class="hljs-string">'clean'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    runSequence(<span class="hljs-string">'inject'</span>, <span class="hljs-string">'build'</span>);
});</code></pre>
<h3 id="articleHeader9">在package.json中配置脚本</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;start&quot;: &quot;concurrently \&quot;gulp\&quot; \&quot;node server.js\&quot;&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbscript"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"concurrently \"</span>gulp\<span class="hljs-string">" \"</span>node <span class="hljs-built_in">server</span>.js\<span class="hljs-string">""</span>
  }</code></pre>
<ul>
<li><p>执行npm start即可本地启动项目</p></li>
<li><p>上线合并代码的时候执行<code>gulp dist</code>命令即可</p></li>
</ul>
<p>拖延症晚期，终于写完了。有时间会加入eslint校验,添加md5，添加sass等等。。。需要做的还有很多，看心情吧！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始创建 angularjs-gulp-es5 项目

## 原文链接
[https://segmentfault.com/a/1190000007445150](https://segmentfault.com/a/1190000007445150)


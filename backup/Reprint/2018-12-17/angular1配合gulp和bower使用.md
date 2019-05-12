---
title: 'angular1配合gulp和bower使用' 
date: 2018-12-17 2:30:07
hidden: true
slug: zx48desk9ik
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一 安装gulp和bower</h2>
<p>gulp安装: npm install -g gulp</p>
<p>bower安装: npm install -g bower</p>
<p>==注：== angularjs的一些包文件我们是通过bower来管理的</p>
<h2 id="articleHeader1">二 bower使用</h2>
<ol>
<li>使用bower初始化一个项目: bower init</li>
<li>填写工程名，描述等等那些东西</li>
<li>安装angularjs：bower install --save angular</li>
<li>创建.bowerrc文件（注意window最好用命令行创建）</li>
</ol>
<h2 id="articleHeader2">三 自动化工具gulp的使用</h2>
<ol>
<li>初始化文件：npm init(一直回车下去就可以)</li>
<li>在项目里面安装gulp：npm i --save-dev gulp</li>
<li>安装gulp的依赖插件（只介绍项目中用到的）gulp-clean，gulp-concat，gulp-connect，gulp-cssmin，gulp-imagemin，gulp-less，gulp-load-plugins，gulp-uglify,open（可以和上面安装gulp一样安装）</li>
<li>创建gulpfile.js来编写gulp的配置</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 依赖
var gulp = require('gulp');
// 进行实例化(gulp-load-plugins这个模块后面可以通过$来操作)
var $ = require('gulp-load-plugins')();

// open模块
var open = require('open');

var app = {
    srcPath: 'src/',   //源代码路径
    devPath: 'build/',  //整合后的路径，开发路径
    prdPath: 'dist/'  //生产环境路径
};

// 创建任务
gulp.task('lib', function () {
    gulp.src('bower_components/**/*.js')
    .pipe(gulp.dest(app.devPath + 'vendor'))
    .pipe(gulp.dest(app.prdPath + 'vendor'))
    .pipe($.connect.reload());
});

/*
*  html任务
*  创建目录src，在src下创建index.html
*  创建视图模版目录view，在其中存放视图view的模版
*/
gulp.task('html', function () {
    gulp.src(app.srcPath + '**/*.html')
    .pipe(gulp.dest(app.devPath))
    .pipe(gulp.dest(app.prdPath))
    .pipe($.connect.reload());
});

/*
*  json任务
*/
gulp.task('json', function () {
    gulp.src(app.srcPath + 'data/**/*.json')
    .pipe(gulp.dest(app.devPath + 'data'))
    .pipe(gulp.dest(app.prdPath + 'data'))
    .pipe($.connect.reload());
});

/*
*  css任务
*  在src下创建style文件夹，里面存放less文件。 
*/
gulp.task('less',function () {
    gulp.src(app.srcPath + 'style/index.less')
    .pipe($.less())
    .pipe(gulp.dest(app.devPath + 'css'))
    .pipe($.cssmin())
    .pipe(gulp.dest(app.prdPath + 'css'))
    .pipe($.connect.reload());
});


/*
*  js任务
*  在src目录下创建script文件夹，里面存放所有的js文件
*/
gulp.task('js', function () {
   gulp.src(app.srcPath + 'script/**/*.js')
   .pipe($.concat('index.js'))
   .pipe(gulp.dest(app.devPath + 'js'))
   .pipe($.uglify())
   .pipe(gulp.dest(app.prdPath + 'js'))
    .pipe($.connect.reload());
});


/*
*  image任务
* 
*/
gulp.task('image', function () {
    gulp.src(app.srcPath + 'image/**/*')
    .pipe(gulp.dest(app.devPath + 'image'))
    .pipe($.imagemin())  // 压缩图片
    .pipe(gulp.dest(app.prdPath + 'image'))
    .pipe($.connect.reload());
});

// 每次发布的时候，可能需要把之前目录内的内容清除，避免旧的文件对新的容有所影响。 需要在每次发布前删除dist和build目录
gulp.task('clean', function () {
    gulp.src([app.devPath, app.prdPath])
    .pipe($.clean());
});

// 总任务
gulp.task('build', ['image', 'js', 'less', 'lib', 'html', 'json']);

// 服务
gulp.task('serve', ['build'], function () {
    $.connect.server({   //启动一个服务器
        root: [app.devPath], // 服务器从哪个路径开始读取，默认从开发路径读取
        livereload: true,  // 自动刷新
        port: 1234
    });
    
    // 打开浏览器
    open('http://localhost:1234');
    
    // 监听
    gulp.watch('bower_components/**/*', ['lib']);
    gulp.watch(app.srcPath + '**/*.html', ['html']);
    gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
    gulp.watch(app.srcPath + 'style/**/*.less', ['less']);
    gulp.watch(app.srcPath + 'script/**/*.js', ['js']);
    gulp.watch(app.srcPath + 'image/**/*', ['image']);
});

// 定义default任务
gulp.task('default', ['serve']);

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 依赖</span>
<span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>);
<span class="hljs-comment">// 进行实例化(gulp-load-plugins这个模块后面可以通过$来操作)</span>
<span class="hljs-keyword">var</span> $ = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-load-plugins'</span>)();

<span class="hljs-comment">// open模块</span>
<span class="hljs-keyword">var</span> open = <span class="hljs-built_in">require</span>(<span class="hljs-string">'open'</span>);

<span class="hljs-keyword">var</span> app = {
    <span class="hljs-attr">srcPath</span>: <span class="hljs-string">'src/'</span>,   <span class="hljs-comment">//源代码路径</span>
    devPath: <span class="hljs-string">'build/'</span>,  <span class="hljs-comment">//整合后的路径，开发路径</span>
    prdPath: <span class="hljs-string">'dist/'</span>  <span class="hljs-comment">//生产环境路径</span>
};

<span class="hljs-comment">// 创建任务</span>
gulp.task(<span class="hljs-string">'lib'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    gulp.src(<span class="hljs-string">'bower_components/**/*.js'</span>)
    .pipe(gulp.dest(app.devPath + <span class="hljs-string">'vendor'</span>))
    .pipe(gulp.dest(app.prdPath + <span class="hljs-string">'vendor'</span>))
    .pipe($.connect.reload());
});

<span class="hljs-comment">/*
*  html任务
*  创建目录src，在src下创建index.html
*  创建视图模版目录view，在其中存放视图view的模版
*/</span>
gulp.task(<span class="hljs-string">'html'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    gulp.src(app.srcPath + <span class="hljs-string">'**/*.html'</span>)
    .pipe(gulp.dest(app.devPath))
    .pipe(gulp.dest(app.prdPath))
    .pipe($.connect.reload());
});

<span class="hljs-comment">/*
*  json任务
*/</span>
gulp.task(<span class="hljs-string">'json'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    gulp.src(app.srcPath + <span class="hljs-string">'data/**/*.json'</span>)
    .pipe(gulp.dest(app.devPath + <span class="hljs-string">'data'</span>))
    .pipe(gulp.dest(app.prdPath + <span class="hljs-string">'data'</span>))
    .pipe($.connect.reload());
});

<span class="hljs-comment">/*
*  css任务
*  在src下创建style文件夹，里面存放less文件。 
*/</span>
gulp.task(<span class="hljs-string">'less'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    gulp.src(app.srcPath + <span class="hljs-string">'style/index.less'</span>)
    .pipe($.less())
    .pipe(gulp.dest(app.devPath + <span class="hljs-string">'css'</span>))
    .pipe($.cssmin())
    .pipe(gulp.dest(app.prdPath + <span class="hljs-string">'css'</span>))
    .pipe($.connect.reload());
});


<span class="hljs-comment">/*
*  js任务
*  在src目录下创建script文件夹，里面存放所有的js文件
*/</span>
gulp.task(<span class="hljs-string">'js'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
   gulp.src(app.srcPath + <span class="hljs-string">'script/**/*.js'</span>)
   .pipe($.concat(<span class="hljs-string">'index.js'</span>))
   .pipe(gulp.dest(app.devPath + <span class="hljs-string">'js'</span>))
   .pipe($.uglify())
   .pipe(gulp.dest(app.prdPath + <span class="hljs-string">'js'</span>))
    .pipe($.connect.reload());
});


<span class="hljs-comment">/*
*  image任务
* 
*/</span>
gulp.task(<span class="hljs-string">'image'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    gulp.src(app.srcPath + <span class="hljs-string">'image/**/*'</span>)
    .pipe(gulp.dest(app.devPath + <span class="hljs-string">'image'</span>))
    .pipe($.imagemin())  <span class="hljs-comment">// 压缩图片</span>
    .pipe(gulp.dest(app.prdPath + <span class="hljs-string">'image'</span>))
    .pipe($.connect.reload());
});

<span class="hljs-comment">// 每次发布的时候，可能需要把之前目录内的内容清除，避免旧的文件对新的容有所影响。 需要在每次发布前删除dist和build目录</span>
gulp.task(<span class="hljs-string">'clean'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    gulp.src([app.devPath, app.prdPath])
    .pipe($.clean());
});

<span class="hljs-comment">// 总任务</span>
gulp.task(<span class="hljs-string">'build'</span>, [<span class="hljs-string">'image'</span>, <span class="hljs-string">'js'</span>, <span class="hljs-string">'less'</span>, <span class="hljs-string">'lib'</span>, <span class="hljs-string">'html'</span>, <span class="hljs-string">'json'</span>]);

<span class="hljs-comment">// 服务</span>
gulp.task(<span class="hljs-string">'serve'</span>, [<span class="hljs-string">'build'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $.connect.server({   <span class="hljs-comment">//启动一个服务器</span>
        root: [app.devPath], <span class="hljs-comment">// 服务器从哪个路径开始读取，默认从开发路径读取</span>
        livereload: <span class="hljs-literal">true</span>,  <span class="hljs-comment">// 自动刷新</span>
        port: <span class="hljs-number">1234</span>
    });
    
    <span class="hljs-comment">// 打开浏览器</span>
    open(<span class="hljs-string">'http://localhost:1234'</span>);
    
    <span class="hljs-comment">// 监听</span>
    gulp.watch(<span class="hljs-string">'bower_components/**/*'</span>, [<span class="hljs-string">'lib'</span>]);
    gulp.watch(app.srcPath + <span class="hljs-string">'**/*.html'</span>, [<span class="hljs-string">'html'</span>]);
    gulp.watch(app.srcPath + <span class="hljs-string">'data/**/*.json'</span>, [<span class="hljs-string">'json'</span>]);
    gulp.watch(app.srcPath + <span class="hljs-string">'style/**/*.less'</span>, [<span class="hljs-string">'less'</span>]);
    gulp.watch(app.srcPath + <span class="hljs-string">'script/**/*.js'</span>, [<span class="hljs-string">'js'</span>]);
    gulp.watch(app.srcPath + <span class="hljs-string">'image/**/*'</span>, [<span class="hljs-string">'image'</span>]);
});

<span class="hljs-comment">// 定义default任务</span>
gulp.task(<span class="hljs-string">'default'</span>, [<span class="hljs-string">'serve'</span>]);

</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
angular1配合gulp和bower使用

## 原文链接
[https://segmentfault.com/a/1190000012902311](https://segmentfault.com/a/1190000012902311)


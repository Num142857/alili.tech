---
title: '使用React、Node.js、MongoDB、Socket.IO开发一个角色投票应用的学习过程（一）' 
date: 2019-02-11 2:30:49
hidden: true
slug: kh8bg9fx2r
categories: [reprint]
---

{{< raw >}}

                    
<p>本项目是对<a href="http://www.kancloud.cn/kancloud/create-voting-app/63977" rel="nofollow noreferrer" target="_blank">使用React、Node.js、MongoDB、Socket.IO开发一个角色投票应用</a>的学习过程。</p>
<blockquote><p><a href="http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio/" rel="nofollow noreferrer" target="_blank">英文原文:Create a character voting app using React, Node.js, MongoDB and Socket.IO</a> <br><a href="https://github.com/sahat/newedenfaces-react" rel="nofollow noreferrer" target="_blank">原项目github</a></p></blockquote>
<h2 id="articleHeader0">学习过程</h2>
<p>要想系统的学习些新东西，网上看了很多代码片段，但很少有这样完整的一个系统来学习，基实我本来是比较偏向<a href="http://vuejs.org.cn/" rel="nofollow noreferrer" target="_blank">Vue</a>的但是看到了这个文章，太全面了，对于想入门的人来说，方方面面都有，有前端，有后端，所以忍不住想把它提供的代码全敲一遍。敲代码的过程，虽然只是个抄的过程，但比光看要很很多，有的时候往往看人家代码的时候，感觉是这样的，<strong><em>"哦，就是这样的啊.so easy,不过如此吗~"</em></strong>，但一句一句去敲的时候，感觉就是这样的，<strong><em>"WTF,这是什么鬼，这个函数哪里来的，这个库是干嘛用的，这里这么写到底是为了什么",</em></strong>所以当你把过程中的这些疑问都搞清楚了，才是真正的提高了，光看很多细节是注意不到的。</p>
<h3 id="articleHeader1">对原有的改动</h3>
<p>抄代码是好，但是最好在原来的基础上加点自己的相法，所以我做的改动主要有如下</p>
<ol>
<li><p>把所有不是用ES6的代码全部改成ES6的</p></li>
<li><p>用数据库从mongodb 改成了mysql</p></li>
<li><p>用waterline替换mongoose操作数据库</p></li>
</ol>
<blockquote>
<p>改动后的代码，我也全发布在github上了,还没改完，我会不定期commit的</p>
<blockquote><p><a href="https://github.com/papersnake/newdenfaces-es6" rel="nofollow noreferrer" target="_blank">https://github.com/papersnake/newdenfaces-es6</a></p></blockquote>
</blockquote>
<h3 id="articleHeader2">改写的过程和遇到的坑</h3>
<p>对ES6学也的也不深，改了这么多也发现语法上也只用到了import let const 和=&gt;,希望大家提出更多的改进意见<br>原文第一步的代码</p>
<h3 id="articleHeader3">原文第一步的改进</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> logger = <span class="hljs-built_in">require</span>(<span class="hljs-string">'morgan'</span>);
<span class="hljs-keyword">var</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>);

<span class="hljs-keyword">var</span> app = express();

app.set(<span class="hljs-string">'port'</span>, process.env.PORT || <span class="hljs-number">3000</span>);
app.use(logger(<span class="hljs-string">'dev'</span>));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ <span class="hljs-attr">extended</span>: <span class="hljs-literal">false</span> }));
app.use(express.static(path.join(__dirname, <span class="hljs-string">'public'</span>)));

app.listen(app.get(<span class="hljs-string">'port'</span>), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Express server listening on port '</span> + app.get(<span class="hljs-string">'port'</span>));
});</code></pre>
<p>改写后，变成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import express    from 'express';
import path       from 'path';
import logger     from 'morgan';
import bodyParser from 'body-parser';

let app = express();

app.set('port',process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'),() => {
    console.log('Express server listening on port ' + app.get('port'));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> express    <span class="hljs-keyword">from</span> <span class="hljs-string">'express'</span>;
<span class="hljs-keyword">import</span> path       <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>;
<span class="hljs-keyword">import</span> logger     <span class="hljs-keyword">from</span> <span class="hljs-string">'morgan'</span>;
<span class="hljs-keyword">import</span> bodyParser <span class="hljs-keyword">from</span> <span class="hljs-string">'body-parser'</span>;

<span class="hljs-keyword">let</span> app = express();

app.set(<span class="hljs-string">'port'</span>,process.env.PORT || <span class="hljs-number">3000</span>);
app.use(logger(<span class="hljs-string">'dev'</span>));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ <span class="hljs-attr">extended</span>: <span class="hljs-literal">false</span> }));
app.use(express.static(path.join(__dirname, <span class="hljs-string">'public'</span>)));

app.listen(app.get(<span class="hljs-string">'port'</span>),() =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Express server listening on port '</span> + app.get(<span class="hljs-string">'port'</span>));
});</code></pre>
<p>为了能让它跑起来，要在原有依赖的基础上添加</p>
<blockquote><p>npm install --save-dev babel-cli,babel-core,babel-preset-es2015,babel-preset-react,babel-register</p></blockquote>
<p>有几个依赖是后面才用到的，我这里一并安装了<br>在根目录新建一个.babelrc文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    &quot;es2015&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"presets"</span>: [
    <span class="hljs-string">"es2015"</span>
  ]
}</code></pre>
<blockquote><p>用babel-node server.js 就要以跑起来了</p></blockquote>
<h3 id="articleHeader4">原文第二步分 构建系统的改写</h3>
<p>为了节省篇幅，有些全篇的代码我就不粘贴，给出连接吧 <a href="https://github.com/sahat/newedenfaces-react/blob/master/gulpfile.js" rel="nofollow noreferrer" target="_blank">gulpfile.js</a></p>
<p>gulp 从3.9.0开始支持babel，但是要把文件名改为<strong>gulpfile.babel.js</strong><br>改写后的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import gulp from 'gulp';
import gutil from 'gulp-util';
import gulpif from 'gulp-if';
import streamify from 'gulp-streamify';
import autoprefixer from 'gulp-autoprefixer';
import cssmin from 'gulp-cssmin';
import less from 'gulp-less';
import concat from 'gulp-concat';
import plumber from 'gulp-plumber';
import source from 'vinyl-source-stream';
import babelify from 'babelify';
import browserify from 'browserify';
import watchify from 'watchify';
import uglify from 'gulp-uglify';

const production = process.env.NODE_ENV === 'production';

const dependencies = [
    'alt',
    'react',
    'react-router',
    'underscore'
];

/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task('vendor',()=>
    gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/bootstrap.js',
        'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
        'bower_components/toastr/toastr.js'
        ]).pipe(concat('vendor.js'))
          .pipe(gulpif(production,uglify({ mangle:false })))
          .pipe(gulp.dest('public/js'))
    );


/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-vendor', () =>
  browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(gulpif(production, streamify(uglify({ mangle: false }))))
    .pipe(gulp.dest('public/js'))
);

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify', ['browserify-vendor'], () =>
  browserify('app/main.js')
    .external(dependencies)
    .transform(babelify,{ presets: [&quot;es2015&quot;, &quot;react&quot;]}) //注意这里，只有加上presets配置才能正常编译
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulpif(production, streamify(uglify({ mangle: false }))))
    .pipe(gulp.dest('public/js'))
);

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-watch', ['browserify-vendor'], () =>{
  var bundler = watchify(browserify('app/main.js', watchify.args));
  bundler.external(dependencies);
  bundler.transform(babelify,{ presets: [&quot;es2015&quot;, &quot;react&quot;]});
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    var start = Date.now();
    bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', function() {
        gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('public/js/'));
  }
});


/*
 |--------------------------------------------------------------------------
 | Compile LESS stylesheets.
 |--------------------------------------------------------------------------
 */
gulp.task('styles', () =>
  gulp.src('app/stylesheets/main.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulpif(production, cssmin()))
    .pipe(gulp.dest('public/css'))
);

gulp.task('watch', () =>{
  gulp.watch('app/stylesheets/**/*.less', ['styles']);
});

gulp.task('default', ['styles', 'vendor', 'browserify-watch', 'watch']);
gulp.task('build', ['styles', 'vendor', 'browserify']);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">import</span> gulp <span class="hljs-keyword">from</span> <span class="hljs-string">'gulp'</span>;
<span class="hljs-keyword">import</span> gutil <span class="hljs-keyword">from</span> <span class="hljs-string">'gulp-util'</span>;
<span class="hljs-keyword">import</span> gulpif <span class="hljs-keyword">from</span> <span class="hljs-string">'gulp-if'</span>;
<span class="hljs-keyword">import</span> streamify <span class="hljs-keyword">from</span> <span class="hljs-string">'gulp-streamify'</span>;
<span class="hljs-keyword">import</span> autoprefixer <span class="hljs-keyword">from</span> <span class="hljs-string">'gulp-autoprefixer'</span>;
<span class="hljs-keyword">import</span> cssmin <span class="hljs-keyword">from</span> <span class="hljs-string">'gulp-cssmin'</span>;
<span class="hljs-keyword">import</span> less <span class="hljs-keyword">from</span> <span class="hljs-string">'gulp-less'</span>;
<span class="hljs-keyword">import</span> concat <span class="hljs-keyword">from</span> <span class="hljs-string">'gulp-concat'</span>;
<span class="hljs-keyword">import</span> plumber <span class="hljs-keyword">from</span> <span class="hljs-string">'gulp-plumber'</span>;
<span class="hljs-keyword">import</span> source <span class="hljs-keyword">from</span> <span class="hljs-string">'vinyl-source-stream'</span>;
<span class="hljs-keyword">import</span> babelify <span class="hljs-keyword">from</span> <span class="hljs-string">'babelify'</span>;
<span class="hljs-keyword">import</span> browserify <span class="hljs-keyword">from</span> <span class="hljs-string">'browserify'</span>;
<span class="hljs-keyword">import</span> watchify <span class="hljs-keyword">from</span> <span class="hljs-string">'watchify'</span>;
<span class="hljs-keyword">import</span> uglify <span class="hljs-keyword">from</span> <span class="hljs-string">'gulp-uglify'</span>;

<span class="hljs-keyword">const</span> production = process.env.NODE_ENV === <span class="hljs-string">'production'</span>;

<span class="hljs-keyword">const</span> dependencies = [
    <span class="hljs-string">'alt'</span>,
    <span class="hljs-string">'react'</span>,
    <span class="hljs-string">'react-router'</span>,
    <span class="hljs-string">'underscore'</span>
];

<span class="hljs-comment">/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */</span>
gulp.task(<span class="hljs-string">'vendor'</span>,()=&gt;
    gulp.src([
        <span class="hljs-string">'bower_components/jquery/dist/jquery.js'</span>,
        <span class="hljs-string">'bower_components/bootstrap/dist/bootstrap.js'</span>,
        <span class="hljs-string">'bower_components/magnific-popup/dist/jquery.magnific-popup.js'</span>,
        <span class="hljs-string">'bower_components/toastr/toastr.js'</span>
        ]).pipe(concat(<span class="hljs-string">'vendor.js'</span>))
          .pipe(gulpif(production,uglify({ <span class="hljs-attr">mangle</span>:<span class="hljs-literal">false</span> })))
          .pipe(gulp.dest(<span class="hljs-string">'public/js'</span>))
    );


<span class="hljs-comment">/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */</span>
gulp.task(<span class="hljs-string">'browserify-vendor'</span>, () =&gt;
  browserify()
    .require(dependencies)
    .bundle()
    .pipe(source(<span class="hljs-string">'vendor.bundle.js'</span>))
    .pipe(gulpif(production, streamify(uglify({ <span class="hljs-attr">mangle</span>: <span class="hljs-literal">false</span> }))))
    .pipe(gulp.dest(<span class="hljs-string">'public/js'</span>))
);

<span class="hljs-comment">/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */</span>
gulp.task(<span class="hljs-string">'browserify'</span>, [<span class="hljs-string">'browserify-vendor'</span>], () =&gt;
  browserify(<span class="hljs-string">'app/main.js'</span>)
    .external(dependencies)
    .transform(babelify,{ <span class="hljs-attr">presets</span>: [<span class="hljs-string">"es2015"</span>, <span class="hljs-string">"react"</span>]}) <span class="hljs-comment">//注意这里，只有加上presets配置才能正常编译</span>
    .bundle()
    .pipe(source(<span class="hljs-string">'bundle.js'</span>))
    .pipe(gulpif(production, streamify(uglify({ <span class="hljs-attr">mangle</span>: <span class="hljs-literal">false</span> }))))
    .pipe(gulp.dest(<span class="hljs-string">'public/js'</span>))
);

<span class="hljs-comment">/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */</span>
gulp.task(<span class="hljs-string">'browserify-watch'</span>, [<span class="hljs-string">'browserify-vendor'</span>], () =&gt;{
  <span class="hljs-keyword">var</span> bundler = watchify(browserify(<span class="hljs-string">'app/main.js'</span>, watchify.args));
  bundler.external(dependencies);
  bundler.transform(babelify,{ <span class="hljs-attr">presets</span>: [<span class="hljs-string">"es2015"</span>, <span class="hljs-string">"react"</span>]});
  bundler.on(<span class="hljs-string">'update'</span>, rebundle);
  <span class="hljs-keyword">return</span> rebundle();

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">rebundle</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> start = <span class="hljs-built_in">Date</span>.now();
    bundler.bundle()
      .on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on(<span class="hljs-string">'end'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        gutil.log(gutil.colors.green(<span class="hljs-string">'Finished rebundling in'</span>, (<span class="hljs-built_in">Date</span>.now() - start) + <span class="hljs-string">'ms.'</span>));
      })
      .pipe(source(<span class="hljs-string">'bundle.js'</span>))
      .pipe(gulp.dest(<span class="hljs-string">'public/js/'</span>));
  }
});


<span class="hljs-comment">/*
 |--------------------------------------------------------------------------
 | Compile LESS stylesheets.
 |--------------------------------------------------------------------------
 */</span>
gulp.task(<span class="hljs-string">'styles'</span>, () =&gt;
  gulp.src(<span class="hljs-string">'app/stylesheets/main.less'</span>)
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulpif(production, cssmin()))
    .pipe(gulp.dest(<span class="hljs-string">'public/css'</span>))
);

gulp.task(<span class="hljs-string">'watch'</span>, () =&gt;{
  gulp.watch(<span class="hljs-string">'app/stylesheets/**/*.less'</span>, [<span class="hljs-string">'styles'</span>]);
});

gulp.task(<span class="hljs-string">'default'</span>, [<span class="hljs-string">'styles'</span>, <span class="hljs-string">'vendor'</span>, <span class="hljs-string">'browserify-watch'</span>, <span class="hljs-string">'watch'</span>]);
gulp.task(<span class="hljs-string">'build'</span>, [<span class="hljs-string">'styles'</span>, <span class="hljs-string">'vendor'</span>, <span class="hljs-string">'browserify'</span>]);
</code></pre>
<p>由于到现在为止，还没有做其他工作，所以看不到打包的实际效果， 但是也是要控制台下运行一下gulp 看看有没有语法错误。</p>
<p>到这里为止没有遇到多大的坑，最多的往往是拼写错误引起的问题，唯一由于拼写导致，但不提示错误的是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(bodyParser.json());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">app.use(bodyParser.json());</code></pre>
<p>我打成了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(bodyParser.json);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">app.use(bodyParser.json);</code></pre>
<p>运行的时候服务器一直没有响应，找了好久才找到这个错误</p>
<h2 id="articleHeader5">后篇</h2>
<blockquote><p><a href="https://segmentfault.com/a/1190000005062639">使用React、Node.js、MongoDB、Socket.IO开发一个角色投票应用的学习过程（二）</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用React、Node.js、MongoDB、Socket.IO开发一个角色投票应用的学习过程（一）

## 原文链接
[https://segmentfault.com/a/1190000005040834](https://segmentfault.com/a/1190000005040834)


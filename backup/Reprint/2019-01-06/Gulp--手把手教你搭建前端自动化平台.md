---
title: 'Gulp--手把手教你搭建前端自动化平台' 
date: 2019-01-06 2:30:10
hidden: true
slug: s97kmmjn91
categories: [reprint]
---

{{< raw >}}

                    
<p>前端的发展真的是快，前几年还是刀耕火种的开个编辑器，几行html和js代码就能上浏览器跑了。现在呢？各种包，各种库，各种框架，各种编程范式。究其原因，就是我们高中社会课本中那句话</p>
<blockquote><p>人民日益增长的文质文化需求，同落后的社会生产之间的矛盾</p></blockquote>
<p>想想也是，以前刀耕火种的编写页面效率非常低，而我国到目前为止网民的数量已经超过7亿了，可想而知对网页数量和多样化的需求巨大，那有什么方法来提高页面的生产效率呢？这就是我今天要讲的基于gulp平台的自动化生产平台。<br>gulp是啥？官方的解释是<code>基于流的自动化构建工具</code>。好，那什么是流呢？这个流是从英语单词<code>stream</code>翻译过来的，不过还是不好理解。其实可以这么理解，流就是工厂的一个生产车间生产出来的半成品，一个个半成品在输送带上送往下一个加工车间的过程。把运动的半成品看成是数据，那么流动的数据就是流。唉！好难解释啊！还是看代码吧。我已经把代码上传到github了，需要的同学自取，麻烦点个小星星 <a href="https://github.com/NicknameID/gulp-flow" rel="nofollow noreferrer" target="_blank">https://github.com/NicknameID...</a></p>
<h3 id="articleHeader0">1.依赖npm</h3>
<p>由于npm在国内比较慢，所以推荐大家使用淘宝的cnpm，在国内访问比较快（搞不懂国家为什么立堵墙，难受）。<br><span class="img-wrap"><img data-src="/img/remote/1460000010428403" src="https://static.alili.tech/img/remote/1460000010428403" alt="安装cnpm" title="安装cnpm" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">2.cnpm init 初始化package.json文件</h3>
<ul><li>
<code>-y</code>的作用可以跳过询问步骤直接生成默认的package.json文件<br><span class="img-wrap"><img data-src="/img/remote/1460000010428404" src="https://static.alili.tech/img/remote/1460000010428404" alt="初始化package.json" title="初始化package.json" style="cursor: pointer; display: inline;"></span>
</li></ul>
<h3 id="articleHeader2">3.安装依赖包</h3>
<p>由于依赖包太多了，就不一个一个写了 主要通过 <code>cnpm install --save-dev 包的名字</code>的方式来安装的，<br>下图所列的就是自动化工具要用的包，我已经上传到github上了<a href="https://github.com/NicknameID/gulp-flow" rel="nofollow noreferrer" target="_blank">点击这里获取</a>，<br>下载后只要 <code>cnpm install</code>就可以了，就会根据package.json里的依赖去下载安装<br><span class="img-wrap"><img data-src="/img/remote/1460000010428405" src="https://static.alili.tech/img/remote/1460000010428405" alt="package.json文件中的开发依赖" title="package.json文件中的开发依赖" style="cursor: pointer; display: inline;"></span></p>
<p>在package.json中添加gulp字段方便调用本地安装的gulp命令,到这里package.json配置好了<br><span class="img-wrap"><img data-src="/img/remote/1460000010428406" src="https://static.alili.tech/img/remote/1460000010428406" alt="添加gulp字段到package.json中" title="添加gulp字段到package.json中" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">4.gulpfile.js文件的内容（<strong>重点</strong>）</h3>
<ul><li>功能1---自动化生成项目目录</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//gulpfile.js
/*首先在全局上加载gulp，这个很重要*/
const gulp = require('gulp');
/*在全局上定义项目的目录结构，供应后面使用*/
const dirs = {
  dist:'./dist',
  src: './src',
  css: './src/css',
  less: './src/less',
  js: './src/js',
  img: './src/img',
};
gulp.task('create-directory', () => {
  const mkdirp = require('mkdirp'); //这里要依赖mkdirp这个包，通过cnpm 安装
  for (let i in dirs) {
    mkdirp(dirs[i], err => {
      err ? console.log(err) : console.log('mkdir-->' + dirs[i]);;
    });
  }
});
//在终端运行cnpm run gulp create-directory" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//gulpfile.js</span>
<span class="hljs-comment">/*首先在全局上加载gulp，这个很重要*/</span>
<span class="hljs-keyword">const</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>);
<span class="hljs-comment">/*在全局上定义项目的目录结构，供应后面使用*/</span>
<span class="hljs-keyword">const</span> dirs = {
  dist:<span class="hljs-string">'./dist'</span>,
  src: <span class="hljs-string">'./src'</span>,
  css: <span class="hljs-string">'./src/css'</span>,
  less: <span class="hljs-string">'./src/less'</span>,
  js: <span class="hljs-string">'./src/js'</span>,
  img: <span class="hljs-string">'./src/img'</span>,
};
gulp.task(<span class="hljs-string">'create-directory'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> mkdirp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mkdirp'</span>); <span class="hljs-comment">//这里要依赖mkdirp这个包，通过cnpm 安装</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> dirs) {
    mkdirp(dirs[i], <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
      err ? <span class="hljs-built_in">console</span>.log(err) : <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'mkdir--&gt;'</span> + dirs[i]);;
    });
  }
});
<span class="hljs-comment">//在终端运行cnpm run gulp create-directory</span></code></pre>
<p>生成需要生成的项目目录，再也不用每次都去手工创建了，幸福感爆棚有木有！！！<br><span class="img-wrap"><img data-src="/img/remote/1460000010428407" src="https://static.alili.tech/img/remote/1460000010428407" alt="CMD运行截图" title="CMD运行截图" style="cursor: pointer; display: inline;"></span></p>
<ul><li>功能2---编译less，并且实现less注入功能，热更新页面，方便开发时调试<br>这个功能要依赖的插件有</li></ul>
<p>1.gulp-less<br>2.browser-sync<br>3.gulp-notify<br>4.gulp-plumber</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*全局定义要处理的文件*/
const files = {
  lessFiles: './src/less/go.less',
  cssFiles: './src/css/*.css',
  jsFiles: './src/js/*.js',
  imgFiles:'./src/img/*.*'
}
//编译less
gulp.task('compile-less', () => {
const less = require('gulp-less'); //依赖gulp-less的插件
const notify = require('gulp-notify'); 
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create(); //browser-sync同步服务器
const reload = browserSync.reload; //将browser-sync的reload方法存起来，方便调用
  return gulp.src(files.lessFiles)
  .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })) //使用gulp-notify和gulp-plumber用来阻止因为less语法写错跳出监视程序发生
  .pipe(less())
  .pipe(gulp.dest(dirs.css + '/'))
  .pipe(reload({stream: true}));
});

// 本地服务器功能，自动刷新（开发环境）
gulp.task('server', ['compile-less'],()=>{
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
  browserSync.init({
    server: './'
  });
  gulp.watch(dirs.less+'/**/*.less', ['compile-less']); //监视less文件夹中的所有less文件，有改动就调用compile-less任务编译less
  gulp.watch('./*.html').on('change', reload); //监视html文件，有改动就刷新浏览器
  gulp.watch(dirs.js+'/**/*.js').on('change', reload); //监视所有js文件有改动就刷新浏览器
});
//在cmd运行cnpm run gulp server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">/*全局定义要处理的文件*/</span>
<span class="hljs-keyword">const</span> files = {
  lessFiles: <span class="hljs-string">'./src/less/go.less'</span>,
  cssFiles: <span class="hljs-string">'./src/css/*.css'</span>,
  jsFiles: <span class="hljs-string">'./src/js/*.js'</span>,
  imgFiles:<span class="hljs-string">'./src/img/*.*'</span>
}
<span class="hljs-comment">//编译less</span>
gulp.task(<span class="hljs-string">'compile-less'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
<span class="hljs-keyword">const</span> less = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-less'</span>); <span class="hljs-comment">//依赖gulp-less的插件</span>
<span class="hljs-keyword">const</span> notify = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-notify'</span>); 
<span class="hljs-keyword">const</span> plumber = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-plumber'</span>);
<span class="hljs-keyword">const</span> browserSync = <span class="hljs-built_in">require</span>(<span class="hljs-string">'browser-sync'</span>).create(); <span class="hljs-comment">//browser-sync同步服务器</span>
<span class="hljs-keyword">const</span> reload = browserSync.reload; <span class="hljs-comment">//将browser-sync的reload方法存起来，方便调用</span>
  <span class="hljs-keyword">return</span> gulp.src(files.lessFiles)
  .pipe(plumber({ errorHandler: notify.onError(<span class="hljs-string">'Error: &lt;%= error.message %&gt;'</span>) })) <span class="hljs-comment">//使用gulp-notify和gulp-plumber用来阻止因为less语法写错跳出监视程序发生</span>
  .pipe(less())
  .pipe(gulp.dest(dirs.css + <span class="hljs-string">'/'</span>))
  .pipe(reload({stream: <span class="hljs-literal">true</span>}));
});

<span class="hljs-comment">// 本地服务器功能，自动刷新（开发环境）</span>
gulp.task(<span class="hljs-string">'server'</span>, [<span class="hljs-string">'compile-less'</span>],<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
<span class="hljs-keyword">const</span> browserSync = <span class="hljs-built_in">require</span>(<span class="hljs-string">'browser-sync'</span>).create();
<span class="hljs-keyword">const</span> reload = browserSync.reload;
  browserSync.init({
    server: <span class="hljs-string">'./'</span>
  });
  gulp.watch(dirs.less+<span class="hljs-string">'/**/*.less'</span>, [<span class="hljs-string">'compile-less'</span>]); <span class="hljs-comment">//监视less文件夹中的所有less文件，有改动就调用compile-less任务编译less</span>
  gulp.watch(<span class="hljs-string">'./*.html'</span>).on(<span class="hljs-string">'change'</span>, reload); <span class="hljs-comment">//监视html文件，有改动就刷新浏览器</span>
  gulp.watch(dirs.js+<span class="hljs-string">'/**/*.js'</span>).on(<span class="hljs-string">'change'</span>, reload); <span class="hljs-comment">//监视所有js文件有改动就刷新浏览器</span>
});
<span class="hljs-comment">//在cmd运行cnpm run gulp server</span></code></pre>
<p>可以看到程序正在后台运行，正在监听文件改动</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010428408" src="https://static.alili.tech/img/remote/1460000010428408" alt="运行cnpm run gulp server结果" title="运行cnpm run gulp server结果" style="cursor: pointer; display: inline;"></span></p>
<p>这样就可以左边开着编辑器写代码，右边开着浏览器看效果了，有木有很爽，人生别无他求了（感动中！！！）<br><span class="img-wrap"><img data-src="/img/remote/1460000010428409" src="https://static.alili.tech/img/remote/1460000010428409" alt="浏览器访问localhost:3000端口，实时加载" title="浏览器访问localhost:3000端口，实时加载" style="cursor: pointer; display: inline;"></span></p>
<ul><li>功能3---添加浏览器私有前缀<br>要用到的插件包</li></ul>
<p>1.gulp-postcss<br>2.gulp-sourcemaps<br>3.autoprefixer</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//添加浏览器私有前缀（生产环境）
gulp.task('autoprefixer', () => {
  const postcss = require('gulp-postcss');
  const sourcemaps = require('gulp-sourcemaps');
  const autoprefixer = require('autoprefixer');
  return gulp.src(files.cssFiles)
    .pipe(sourcemaps.init()) //添加sourcemap,方便调试
    .pipe(postcss([ autoprefixer() ])) //添加浏览器私有前缀，解决浏览器的兼容问题
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dirs.css+'/'))
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//添加浏览器私有前缀（生产环境）</span>
gulp.task(<span class="hljs-string">'autoprefixer'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> postcss = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-postcss'</span>);
  <span class="hljs-keyword">const</span> sourcemaps = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-sourcemaps'</span>);
  <span class="hljs-keyword">const</span> autoprefixer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>);
  <span class="hljs-keyword">return</span> gulp.src(files.cssFiles)
    .pipe(sourcemaps.init()) <span class="hljs-comment">//添加sourcemap,方便调试</span>
    .pipe(postcss([ autoprefixer() ])) <span class="hljs-comment">//添加浏览器私有前缀，解决浏览器的兼容问题</span>
    .pipe(sourcemaps.write(<span class="hljs-string">'.'</span>))
    .pipe(gulp.dest(dirs.css+<span class="hljs-string">'/'</span>))
});</code></pre>
<ul><li>功能4---压缩css<br>要用到的插件包</li></ul>
<p>1.gulp-minify-css<br>2.gulp-rename</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 压缩css(生产环境)
gulp.task('minify-css', function () {
  const minifyCSS = require('gulp-minify-css');
  const rename = require(&quot;gulp-rename&quot;);
  return gulp.src(dirs.css+'/**/*.css')
    .pipe(minifyCSS({/*keepBreaks: true*/}))
    .pipe(rename(path=>path.basename += '.min')) //重命名文件输出后的样式为 原文件名.min.css
    .pipe(gulp.dest('./dist/css/'))
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 压缩css(生产环境)</span>
gulp.task(<span class="hljs-string">'minify-css'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> minifyCSS = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-minify-css'</span>);
  <span class="hljs-keyword">const</span> rename = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp-rename"</span>);
  <span class="hljs-keyword">return</span> gulp.src(dirs.css+<span class="hljs-string">'/**/*.css'</span>)
    .pipe(minifyCSS({<span class="hljs-comment">/*keepBreaks: true*/</span>}))
    .pipe(rename(<span class="hljs-function"><span class="hljs-params">path</span>=&gt;</span>path.basename += <span class="hljs-string">'.min'</span>)) <span class="hljs-comment">//重命名文件输出后的样式为 原文件名.min.css</span>
    .pipe(gulp.dest(<span class="hljs-string">'./dist/css/'</span>))
});</code></pre>
<ul><li>功能5---合并压缩JavaScript文件<br>要用到的插件包</li></ul>
<p>1.gulp-concat<br>2.gulp-uglify<br>3.gulp-rename</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// js文件--合并--压缩(生产环境)
gulp.task('js-concat-compress', (cb)=>{
  let name = ''; //先定义一个变量将用于后面存文件名
  const concat = require('gulp-concat');
  const uglify = require('gulp-uglify');
  const rename = require(&quot;gulp-rename&quot;);
  return gulp.src(dirs.js+'/**/*.js')
  .pipe(rename(path=>{path.basename += '';name=path.basename;}))
  .pipe(concat('bundle.js'))   //合并js文件
  .pipe(uglify())         //压缩js文件
  .pipe(rename(path=>{
    path.basename = name+'.'+path.basename+'.min';  //改文件名加上 .min
  }))
  .pipe(gulp.dest('dist/js/')); 
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// js文件--合并--压缩(生产环境)</span>
gulp.task(<span class="hljs-string">'js-concat-compress'</span>, <span class="hljs-function">(<span class="hljs-params">cb</span>)=&gt;</span>{
  <span class="hljs-keyword">let</span> name = <span class="hljs-string">''</span>; <span class="hljs-comment">//先定义一个变量将用于后面存文件名</span>
  <span class="hljs-keyword">const</span> concat = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-concat'</span>);
  <span class="hljs-keyword">const</span> uglify = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-uglify'</span>);
  <span class="hljs-keyword">const</span> rename = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp-rename"</span>);
  <span class="hljs-keyword">return</span> gulp.src(dirs.js+<span class="hljs-string">'/**/*.js'</span>)
  .pipe(rename(<span class="hljs-function"><span class="hljs-params">path</span>=&gt;</span>{path.basename += <span class="hljs-string">''</span>;name=path.basename;}))
  .pipe(concat(<span class="hljs-string">'bundle.js'</span>))   <span class="hljs-comment">//合并js文件</span>
  .pipe(uglify())         <span class="hljs-comment">//压缩js文件</span>
  .pipe(rename(<span class="hljs-function"><span class="hljs-params">path</span>=&gt;</span>{
    path.basename = name+<span class="hljs-string">'.'</span>+path.basename+<span class="hljs-string">'.min'</span>;  <span class="hljs-comment">//改文件名加上 .min</span>
  }))
  .pipe(gulp.dest(<span class="hljs-string">'dist/js/'</span>)); 
});</code></pre>
<ul><li>功能6---图片无损压缩<br>要用到的插件包</li></ul>
<p>1.gulp-imagemin</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 图片无损压缩
gulp.task('img-handl',()=>{
  const imagemin = require('gulp-imagemin');
  return gulp.src(files.imgFiles)
    .pipe(imagemin())  //imagemin()里是可以写参数的，有需要的可以去github的页面看看
    .pipe(gulp.dest('./dist/img/'))
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 图片无损压缩</span>
gulp.task(<span class="hljs-string">'img-handl'</span>,<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
  <span class="hljs-keyword">const</span> imagemin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-imagemin'</span>);
  <span class="hljs-keyword">return</span> gulp.src(files.imgFiles)
    .pipe(imagemin())  <span class="hljs-comment">//imagemin()里是可以写参数的，有需要的可以去github的页面看看</span>
    .pipe(gulp.dest(<span class="hljs-string">'./dist/img/'</span>))
});</code></pre>
<ul><li>功能7---项目的打包<br>有时候我们做完东西需要打包，方便传输，而有些文件又是不需要打包进去的，比如说<code>node_modules</code>文件夹，一键打包的快感体验过绝对会爱上的</li></ul>
<p>依赖的插件包<br>1.gulp-zip</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 项目打包(生产环境)
gulp.task('zip',()=>{
  const zip = require('gulp-zip');
  return gulp.src(['./*.html','**/dist/**/*.*','!**/node_modules/**/*.*']) //这里需要注意的是，在写要打包的文件时，避免打包的文件不能写在开头，这里'!**/node_modules/**/*.*'放在了最后
  .pipe(zip('project.zip'))   //打包后的文件名，自己随意取
  .pipe(gulp.dest('./'))
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 项目打包(生产环境)</span>
gulp.task(<span class="hljs-string">'zip'</span>,<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
  <span class="hljs-keyword">const</span> zip = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-zip'</span>);
  <span class="hljs-keyword">return</span> gulp.src([<span class="hljs-string">'./*.html'</span>,<span class="hljs-string">'**/dist/**/*.*'</span>,<span class="hljs-string">'!**/node_modules/**/*.*'</span>]) <span class="hljs-comment">//这里需要注意的是，在写要打包的文件时，避免打包的文件不能写在开头，这里'!**/node_modules/**/*.*'放在了最后</span>
  .pipe(zip(<span class="hljs-string">'project.zip'</span>))   <span class="hljs-comment">//打包后的文件名，自己随意取</span>
  .pipe(gulp.dest(<span class="hljs-string">'./'</span>))
});</code></pre>
<h3 id="articleHeader4">5.整理任务执行，方便调用任务</h3>
<p>因为gulp执行任务时是以最大的任务并发数同时进行的，所以有时候我们需要按步骤进行，就需要插件<code>gulp-sequence</code>，将任务按顺序写入，就会按顺序执行<br>写了这么多功能模块，需要好好的整理一下，方便调用。我已经把完整的代码上传到github了，需要的同学自取，麻烦点个小星星 <a href="https://github.com/NicknameID/gulp-flow" rel="nofollow noreferrer" target="_blank">https://github.com/NicknameID...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ------------------开发阶段命令----------------------------------------------------
gulp.task('start', ['create-directory']); //项目初始化的第一个命令
gulp.task('dev-watch', ['server']); //开始编写项目后开启服务器实时更新

// ------------------生产阶段命令------------------------------------------------------
gulp.task('prefixer', ['autoprefixer']); //给css文件添加浏览器私有前缀 files.cssFiles ==>> .src/css/
gulp.task('min-css', ['minify-css']); //压缩css文件 files.cssFiles ==>> dist/css/
gulp.task('js-handl', ['js-concat-compress']); //合js文件  dirs.js/**/*.js ==>> ./dist/js/concated.js
gulp.task('img-handl', ['img-handl']) //处理图片，对图片进行无损的压缩

//----------------一键生成项目文件命令-----------------------------------------------
       //因为gulp执行任务时是以最大的任务并发数同时进行的，所以有时候我们需要按步骤进行，就需要插件`gulp-sequence`，将任务按顺序写入，就会按顺序执行
const runSequence = require('gulp-sequence').use(gulp);
gulp.task('bunld-project',runSequence('clean-dist','compile-less','autoprefixer','minify-css','js-concat-compress','img-handl','zip'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-comment">// ------------------开发阶段命令----------------------------------------------------</span>
gulp.<span class="hljs-keyword">task</span>(<span class="hljs-string">'start'</span>, [<span class="hljs-string">'create-directory'</span>]); <span class="hljs-comment">//项目初始化的第一个命令</span>
gulp.<span class="hljs-keyword">task</span>(<span class="hljs-string">'dev-watch'</span>, [<span class="hljs-string">'server'</span>]); <span class="hljs-comment">//开始编写项目后开启服务器实时更新</span>

<span class="hljs-comment">// ------------------生产阶段命令------------------------------------------------------</span>
gulp.<span class="hljs-keyword">task</span>(<span class="hljs-string">'prefixer'</span>, [<span class="hljs-string">'autoprefixer'</span>]); <span class="hljs-comment">//给css文件添加浏览器私有前缀 files.cssFiles ==&gt;&gt; .src/css/</span>
gulp.<span class="hljs-keyword">task</span>(<span class="hljs-string">'min-css'</span>, [<span class="hljs-string">'minify-css'</span>]); <span class="hljs-comment">//压缩css文件 files.cssFiles ==&gt;&gt; dist/css/</span>
gulp.<span class="hljs-keyword">task</span>(<span class="hljs-string">'js-handl'</span>, [<span class="hljs-string">'js-concat-compress'</span>]); <span class="hljs-comment">//合js文件  dirs.js/**/*.js ==&gt;&gt; ./dist/js/concated.js</span>
gulp.<span class="hljs-keyword">task</span>(<span class="hljs-string">'img-handl'</span>, [<span class="hljs-string">'img-handl'</span>]) <span class="hljs-comment">//处理图片，对图片进行无损的压缩</span>

<span class="hljs-comment">//----------------一键生成项目文件命令-----------------------------------------------</span>
       <span class="hljs-comment">//因为gulp执行任务时是以最大的任务并发数同时进行的，所以有时候我们需要按步骤进行，就需要插件`gulp-sequence`，将任务按顺序写入，就会按顺序执行</span>
const runSequence = require(<span class="hljs-string">'gulp-sequence'</span>).use(gulp);
gulp.<span class="hljs-keyword">task</span>(<span class="hljs-string">'bunld-project'</span>,runSequence(<span class="hljs-string">'clean-dist'</span>,<span class="hljs-string">'compile-less'</span>,<span class="hljs-string">'autoprefixer'</span>,<span class="hljs-string">'minify-css'</span>,<span class="hljs-string">'js-concat-compress'</span>,<span class="hljs-string">'img-handl'</span>,<span class="hljs-string">'zip'</span>))</code></pre>
<h3 id="articleHeader5">6.小结</h3>
<p>看到没有，使用gulp其实并没有用到很多本身的API，都是通过不同的插件来实现的处理过程，所以gulp更加像一个处理平台，而非大包大揽的处理程序，他只负责数据的流向，从pipe(管道)的这头流向另外一头，剩下的事情就交给各个插件了，像不像现代社会的细化分工。分工明确才能提高效率，这是社会发展的经验总结。文章有点长，感谢看完的小伙伴！！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Gulp--手把手教你搭建前端自动化平台

## 原文链接
[https://segmentfault.com/a/1190000010428396](https://segmentfault.com/a/1190000010428396)


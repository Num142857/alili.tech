---
title: '精益 React 学习指南 （Lean React）- 2.4 webpack + gulp 构建完整前端工作流' 
date: 2019-02-09 2:30:59
hidden: true
slug: 4mobbvoqxib
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://segmentfault.com/a/1190000005136764">书籍完整目录</a></p></blockquote>
<h1 id="articleHeader0">2.4 webpack + gulp 构建完整前端工作流</h1>
<p><span class="img-wrap"><img data-src="/img/bVxUol" src="https://static.alili.tech/img/bVxUol" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在前面的两个小节中已经完整的讲了 webpack 和 gulp 相关的内容，本小节中将会结合二者构建一个完整的前端工作流，内容目录为：</p>
<ul>
<li><p>前端工程结构和目标</p></li>
<li><p>前端工程目录结构</p></li>
<li><p>gulp clean</p></li>
<li><p>gulp copy</p></li>
<li><p>gulp less</p></li>
<li><p>gulp autoprefixer</p></li>
<li><p>gulp webpack</p></li>
<li><p>gulp eslint</p></li>
<li><p>gulp watch</p></li>
<li><p>gulp connect 和 livereload</p></li>
<li><p>gulp mock server</p></li>
<li><p>gulp test</p></li>
</ul>
<h2 id="articleHeader1">2.4.1 前端工程结构和目标</h2>
<p>React 在大多数情况被当做当 SPA （单页面应用）的框架，实际上在真实业务开发过程中，非单页面应用的业务框架居多。所以我们在构建前端工程的时候，以多个页面的方式维护。下面定义前端工程的目标：</p>
<h3 id="articleHeader2">基础技术</h3>
<ol>
<li><p>react(es6 + jsx)</p></li>
<li><p>less</p></li>
<li><p>gulp + webpack</p></li>
</ol>
<h3 id="articleHeader3">应用模式</h3>
<p>多页面应用：以多页面应用方式，能同时构建多个页面</p>
<h3 id="articleHeader4">样式结构</h3>
<p>在样式的架构上的一些基本需求:</p>
<ol>
<li><p>基于 less 或者 sass 或者其他样式语言</p></li>
<li><p>基础库</p></li>
<li><p>共享变量和工具类</p></li>
</ol>
<p>样式的设计上，大可归为两种方式：</p>
<ol>
<li><p><strong>独立样式</strong>：样式的开发和其他代码尽量分离独立；</p></li>
<li><p><strong>Inline Style</strong>：样式通过 javascript 变量维护，或者通过工具将 css 转化为 javascript，再应用到 React 的 style 中；</p></li>
</ol>
<p>样式文件在工程中的位置也可以分为两种：</p>
<ol>
<li><p><strong>逻辑样式隔离</strong>：javascript 文件和样式文件在不同的工程目录，这是传统的样式逻辑分离设计，符合大多数的业务场景；</p></li>
<li><p><strong>component pod</strong>：也就是一个组件的目录结构包括样式，逻辑和模板，在 React 中模板和逻辑是在一起的，也就是一个组件包括一个 <code>component.js</code> 和 <code>component.css</code> 。 这种模式的目的是出于组件的 <strong>独立性</strong>，所以基于 pod 的组件好处是能够更好的共享，但坏处是和不方便共享变量和工具类（共享就会产生耦合，也就违背了 pod 的目的）</p></li>
</ol>
<p>所以在样式的设计上，我们应用如下这些设计：</p>
<ol>
<li><p>基于 Less</p></li>
<li><p>Less 相关的基础库和公共变量独立出来，变量主要是用于主题设置</p></li>
<li><p>样式统一放在 style 目录下面，业务组件需要共享变量，以非 pod 的方式设计样式，放置在 style 目录独立文件中，文件名称和组件名相同</p></li>
<li><p>需要独立的组件以 npm 的方式维护，样式以 pod 和 inline style 的方式设计</p></li>
</ol>
<h3 id="articleHeader5">兼容的第三方库引入方式</h3>
<p>在第三方库的引入上，可能以 bower_components 的方式，可能是自己公司内部维护的第三方库和基础组件，也可能是 npm 组件，所以为了兼容这些第三方库的引入，确定一下规范:</p>
<ol>
<li><p>vendor 目录下面放在第三方库，包括样式和逻辑，为了优化编译速度，这些目录的文件在编译的时候只做合并，避免和业务代码的编译做过多的耦合（vendor 库文件通常比较大）</p></li>
<li><p>bower_components 中的库同 vendor</p></li>
<li><p>npm 中的第三方库做代码分割，统一打包到 vendor.bundle.js 中</p></li>
</ol>
<h3 id="articleHeader6">配置自动化</h3>
<p>业务代码可能在不断增加，在工程 build 的时候，尽量以 glob 的方式匹配文件，避免增加一个业务文件就需要修改配置</p>
<h3 id="articleHeader7">高效的编译</h3>
<p>代码编译的时间如果太长，会极大的影响开发体验，所以在编译的时候要考虑提高编译的效率：</p>
<ol>
<li><p>避免全局编译</p></li>
<li><p>增量编译：利用上一节介绍的 gulp-cached 和 gulp-remember</p></li>
<li><p>只在 prodution 的时候才做代码压缩优化</p></li>
</ol>
<h3 id="articleHeader8">后端数据 mock 和代理</h3>
<p>能够支持数据 mock 和代理功能</p>
<h2 id="articleHeader9">2.4.2 前端工程目录结构</h2>
<p>基于这些目标定义如下工程结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── package.json                 
├── README.md                    
├── gulpfile.js                  // gulp 配置文件
├── webpack.config.js            // webpack 配置文件
├── doc                          // doc  目录：放置应用文档
├── test                         // test 目录：测试文件
├── dist                         // dist 目录：放置开发时候的临时打包文件
├── bin                          // bin  目录：放置 prodcution 打包文件
├── mocks                        // 数据 mock 相关  
├── src                          // 源文件目录
│&nbsp;&nbsp; ├── html                     // html 目录 
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── index.html
│&nbsp;&nbsp; │&nbsp;&nbsp; └── page2.html
│&nbsp;&nbsp; ├── js                       // js 目录 
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── common               // 所有页面的共享区域，可能包含共享组件，共享工具类
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── home                 // home 页面 js 目录
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── App.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── index.js         // 每个页面会有一个入口，统一为 index.js
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── page2                // page2 页面 js 目录
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── App.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── index.js
│&nbsp;&nbsp; └── style                    // style 目录
│&nbsp;&nbsp;     ├── common               // 公共样式区域
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── varables.less    // 公共共享变量
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── index.less       // 公共样式入口
│&nbsp;&nbsp;     ├── home                 // home 页面样式目录    
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── components       // home 页面组件样式目录
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── App.less 
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── index.less       // home 页面样式入口
│&nbsp;&nbsp;     ├── page2                // page2 页面样式目录
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── components       
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── App.less
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── index.less       
├── vendor
│&nbsp;&nbsp; └── bootstrap
└── └── jquery" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├── package<span class="hljs-selector-class">.json</span>                 
├── README<span class="hljs-selector-class">.md</span>                    
├── gulpfile<span class="hljs-selector-class">.js</span>                  <span class="hljs-comment">// gulp 配置文件</span>
├── webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>            <span class="hljs-comment">// webpack 配置文件</span>
├── doc                          <span class="hljs-comment">// doc  目录：放置应用文档</span>
├── test                         <span class="hljs-comment">// test 目录：测试文件</span>
├── dist                         <span class="hljs-comment">// dist 目录：放置开发时候的临时打包文件</span>
├── bin                          <span class="hljs-comment">// bin  目录：放置 prodcution 打包文件</span>
├── mocks                        <span class="hljs-comment">// 数据 mock 相关  </span>
├── src                          <span class="hljs-comment">// 源文件目录</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">html</span>                     <span class="hljs-comment">// html 目录 </span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.html</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── page2<span class="hljs-selector-class">.html</span>
│&nbsp;&nbsp; ├── js                       <span class="hljs-comment">// js 目录 </span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── common               <span class="hljs-comment">// 所有页面的共享区域，可能包含共享组件，共享工具类</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── home                 <span class="hljs-comment">// home 页面 js 目录</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── App<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.js</span>         <span class="hljs-comment">// 每个页面会有一个入口，统一为 index.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── page2                <span class="hljs-comment">// page2 页面 js 目录</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── App<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── style                    <span class="hljs-comment">// style 目录</span>
│&nbsp;&nbsp;     ├── common               <span class="hljs-comment">// 公共样式区域</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── varables<span class="hljs-selector-class">.less</span>    <span class="hljs-comment">// 公共共享变量</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.less</span>       <span class="hljs-comment">// 公共样式入口</span>
│&nbsp;&nbsp;     ├── home                 <span class="hljs-comment">// home 页面样式目录    </span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── components       <span class="hljs-comment">// home 页面组件样式目录</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── App<span class="hljs-selector-class">.less</span> 
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.less</span>       <span class="hljs-comment">// home 页面样式入口</span>
│&nbsp;&nbsp;     ├── page2                <span class="hljs-comment">// page2 页面样式目录</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── components       
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── App<span class="hljs-selector-class">.less</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── index<span class="hljs-selector-class">.less</span>       
├── vendor
│&nbsp;&nbsp; └── bootstrap
└── └── jquery</code></pre>
<h2 id="articleHeader10">2.4.3 安装基础依赖</h2>
<p>目录创建好过后，进入项目目录，安装 webpack ，gulp，react 相关的基础依赖</p>
<p>// react 相关</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd project
$ npm install react react-dom --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code class="shell">$ cd <span class="hljs-keyword">project</span>
$ npm <span class="hljs-keyword">install</span> react react-dom --save</code></pre>
<p>// webpack 相关</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install webpack-dev-server webpack --save-dev
$ npm install babel-loader babel-preset-es2015 babel-preset-stage-0 babel-preset-react babel-polyfill --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code class="shell">$ npm <span class="hljs-keyword">install </span>webpack-dev-server webpack --save-dev
$ npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-preset-es2015 </span><span class="hljs-keyword">babel-preset-stage-0 </span><span class="hljs-keyword">babel-preset-react </span><span class="hljs-keyword">babel-polyfill </span>--save-dev</code></pre>
<p>// gulp 相关</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install gulpjs/gulp-cli -g
$ npm install gulpjs/gulp.git#4.0 --save-dev
$ npm install gulp-util del gulp-rename gulp-less gulp-connect connect-rest@1.9.5  --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="shell">$ npm <span class="hljs-keyword">install</span> gulpjs/gulp-cli -g
$ npm <span class="hljs-keyword">install</span> gulpjs/gulp.git#<span class="hljs-number">4.0</span> <span class="hljs-comment">--save-dev</span>
$ npm <span class="hljs-keyword">install</span> gulp-util del gulp-<span class="hljs-keyword">rename</span> gulp-<span class="hljs-keyword">less</span> gulp-<span class="hljs-keyword">connect</span> <span class="hljs-keyword">connect</span>-rest@<span class="hljs-number">1.9</span><span class="hljs-number">.5</span>  <span class="hljs-comment">--save-dev</span></code></pre>
<h2 id="articleHeader11">2.4.4 创建 gulpfile.js</h2>
<p>创建 gulpfile.js 并全局定义打包源文件和打包目标相关的配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// gulpfile.js
var gulp = require(&quot;gulp&quot;);
var gutil = require(&quot;gulp-util&quot;);
var src = {
  // html 文件
  html: &quot;src/html/*.html&quot;,                          
  // vendor 目录和 bower_components
  vendor: [&quot;vendor/**/*&quot;, &quot;bower_components/**/*&quot;], 
  // style 目录下所有 xx/index.less
  style: &quot;src/style/*/index.less&quot;,                 
  // 图片等应用资源
  assets: &quot;assets/**/*&quot;                             
};

var dist = {
  root: &quot;dist/&quot;,
  html: &quot;dist/&quot;,
  style: &quot;dist/style&quot;,
  vendor: &quot;dist/vendor&quot;,
  assets: &quot;dist/assets&quot;
};

var bin = {
  root: &quot;bin/&quot;,
  html: &quot;bin/&quot;,
  style: &quot;bin/style&quot;,
  vendor: &quot;bin/vendor&quot;,
  assets: &quot;bin/assets&quot;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// gulpfile.js</span>
<span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp"</span>);
<span class="hljs-keyword">var</span> gutil = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp-util"</span>);
<span class="hljs-keyword">var</span> src = {
  <span class="hljs-comment">// html 文件</span>
  html: <span class="hljs-string">"src/html/*.html"</span>,                          
  <span class="hljs-comment">// vendor 目录和 bower_components</span>
  vendor: [<span class="hljs-string">"vendor/**/*"</span>, <span class="hljs-string">"bower_components/**/*"</span>], 
  <span class="hljs-comment">// style 目录下所有 xx/index.less</span>
  style: <span class="hljs-string">"src/style/*/index.less"</span>,                 
  <span class="hljs-comment">// 图片等应用资源</span>
  assets: <span class="hljs-string">"assets/**/*"</span>                             
};

<span class="hljs-keyword">var</span> dist = {
  <span class="hljs-attr">root</span>: <span class="hljs-string">"dist/"</span>,
  <span class="hljs-attr">html</span>: <span class="hljs-string">"dist/"</span>,
  <span class="hljs-attr">style</span>: <span class="hljs-string">"dist/style"</span>,
  <span class="hljs-attr">vendor</span>: <span class="hljs-string">"dist/vendor"</span>,
  <span class="hljs-attr">assets</span>: <span class="hljs-string">"dist/assets"</span>
};

<span class="hljs-keyword">var</span> bin = {
  <span class="hljs-attr">root</span>: <span class="hljs-string">"bin/"</span>,
  <span class="hljs-attr">html</span>: <span class="hljs-string">"bin/"</span>,
  <span class="hljs-attr">style</span>: <span class="hljs-string">"bin/style"</span>,
  <span class="hljs-attr">vendor</span>: <span class="hljs-string">"bin/vendor"</span>,
  <span class="hljs-attr">assets</span>: <span class="hljs-string">"bin/assets"</span>
};</code></pre>
<h2 id="articleHeader12">2.4.5 清理和拷贝任务</h2>
<p>在每次启动 build 的时候，需要先清除之间的 build 结果，然后将最新的文件如 html, assets, vendor 这些文件拷贝到 dist 目录中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var del = require(&quot;del&quot;);

/**
 * clean build dir
 */
function clean(done) {
  del.sync(dist.root);
  done();
}

/**
 * [cleanBin description]
 * @return {[type]} [description]
 */
function cleanBin(done) {
  del.sync(bin.root);
  done();
}

/**
 * [copyVendor description]
 * @return {[type]} [description]
 */
function copyVendor() {
  return gulp.src(src.vendor)
    .pipe(gulp.dest(dist.vendor));
}

/**
 * [copyAssets description]
 * @return {[type]} [description]
 */
function copyAssets() {
  return gulp.src(src.assets)
    .pipe(gulp.dest(dist.assets));
}

/**
 * [copyDist description]
 * @return {[type]} [description]
 */
function copyDist() {
  return gulp.src(dist.root + '**/*')
    .pipe(gulp.dest(bin.root));
}

/**
 * [html description]
 * @return {[type]} [description]
 */
function html() {
    return gulp.src(src.html)
      .pipe(gulp.dest(dist.html))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> del = <span class="hljs-built_in">require</span>(<span class="hljs-string">"del"</span>);

<span class="hljs-comment">/**
 * clean build dir
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">clean</span>(<span class="hljs-params">done</span>) </span>{
  del.sync(dist.root);
  done();
}

<span class="hljs-comment">/**
 * [cleanBin description]
 * @return {[type]} [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cleanBin</span>(<span class="hljs-params">done</span>) </span>{
  del.sync(bin.root);
  done();
}

<span class="hljs-comment">/**
 * [copyVendor description]
 * @return {[type]} [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copyVendor</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src(src.vendor)
    .pipe(gulp.dest(dist.vendor));
}

<span class="hljs-comment">/**
 * [copyAssets description]
 * @return {[type]} [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copyAssets</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src(src.assets)
    .pipe(gulp.dest(dist.assets));
}

<span class="hljs-comment">/**
 * [copyDist description]
 * @return {[type]} [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copyDist</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src(dist.root + <span class="hljs-string">'**/*'</span>)
    .pipe(gulp.dest(bin.root));
}

<span class="hljs-comment">/**
 * [html description]
 * @return {[type]} [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">html</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> gulp.src(src.html)
      .pipe(gulp.dest(dist.html))
}</code></pre>
<h2 id="articleHeader13">2.4.6 样式转换</h2>
<p>样式使用了 gulp-less 插件，其中需要注意的一点是，less 文件如果出错可能会将整个 build 进程结束，需要添加 error 时候的处理函数，同时也能自定义的输出 error 相关的信息，样式的转换使用了 autoprefixer 代码补全</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');

/**
 * [style description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function style() {
    return gulp.src(src.style)
      .pipe(cached('style'))
      .pipe(less())
      .on('error', handleError)
      .pipe(autoprefixer({
        browsers: ['last 3 version']
      }))
      .pipe(gulp.dest(dist.style))
}

exports.style = style;

/**
 * [handleError description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
function handleError(err) {
  if (err.message) {
    console.log(err.message)
  } else {
    console.log(err)
  }
  this.emit('end')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> less = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-less'</span>);
<span class="hljs-keyword">var</span> autoprefixer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-autoprefixer'</span>);

<span class="hljs-comment">/**
 * [style description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">style</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> gulp.src(src.style)
      .pipe(cached(<span class="hljs-string">'style'</span>))
      .pipe(less())
      .on(<span class="hljs-string">'error'</span>, handleError)
      .pipe(autoprefixer({
        <span class="hljs-attr">browsers</span>: [<span class="hljs-string">'last 3 version'</span>]
      }))
      .pipe(gulp.dest(dist.style))
}

exports.style = style;

<span class="hljs-comment">/**
 * [handleError description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleError</span>(<span class="hljs-params">err</span>) </span>{
  <span class="hljs-keyword">if</span> (err.message) {
    <span class="hljs-built_in">console</span>.log(err.message)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(err)
  }
  <span class="hljs-keyword">this</span>.emit(<span class="hljs-string">'end'</span>)
}</code></pre>
<p>执行 gulp style 测试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ gulp style
[21:00:35] Starting 'style'...
[21:00:36] Finished 'style' after 87 ms" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code class="shell">$ gulp style
[<span class="hljs-number">21</span>:<span class="hljs-number">00</span>:<span class="hljs-number">35</span>] <span class="hljs-symbol">Starting</span> <span class="hljs-string">'style'</span>...
[<span class="hljs-number">21</span>:<span class="hljs-number">00</span>:<span class="hljs-number">36</span>] <span class="hljs-symbol">Finished</span> <span class="hljs-string">'style'</span> after <span class="hljs-number">87</span> ms</code></pre>
<p>home/index.less</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * before
 */
body {
  background: white;
  color: #333;
  transform: rotate(45deg);
  display: flex;
}

/**
 * after
 */
body {
  background: white;
  color: #333;
  -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
          transform: rotate(45deg);
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/**
 * before
 */</span>
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">background</span>: white;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(45deg);
  <span class="hljs-attribute">display</span>: flex;
}

<span class="hljs-comment">/**
 * after
 */</span>
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">background</span>: white;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
  <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">rotate</span>(45deg);
      <span class="hljs-attribute">-ms-transform</span>: <span class="hljs-built_in">rotate</span>(45deg);
          <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(45deg);
  <span class="hljs-attribute">display</span>: -webkit-flex;
  <span class="hljs-attribute">display</span>: -ms-flexbox;
  <span class="hljs-attribute">display</span>: flex;
}</code></pre>
<p>如果需要做样式的 lint 可以通过 ，gulp-stylelint 来实现。</p>
<p>更多信息可参考：</p>
<blockquote><p>gulp-autoprefixer: <a href="https://www.npmjs.com/package/gulp-autoprefixer" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package/gulp-autoprefixer</a><br>gulp-stylelint: <a href="https://github.com/stylelint/stylelint" rel="nofollow noreferrer" target="_blank">https://github.com/stylelint/stylelint</a></p></blockquote>
<h2 id="articleHeader14">2.4.7 webpack 配置</h2>
<p>首先创建 webpack.config.js，这里使用的一个技巧是使用 glob 动态添加 entry，让配置做到自动化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
var webpack = require(&quot;webpack&quot;);
const glob = require('glob');

var config = {
  entry: {
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: __dirname + '/dist/js/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: [ 'es2015', 'stage-0', 'react' ] }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ]
};

/**
 * find entries
 */
var files = glob.sync('./src/js/*/index.js');
var newEntries = files.reduce(function(memo, file) {
  var name = /.*\/(.*?)\/index\.js/.exec(file)[1];
  memo[name] = entry(name);
  return memo;
}, {});

config.entry = Object.assign({}, config.entry, newEntries);

/**
 * [entry description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function entry(name) {
  return './src/js/' + name + '/index.js';
}

module.exports = config;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);
<span class="hljs-keyword">const</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">'glob'</span>);

<span class="hljs-keyword">var</span> config = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">vendor</span>: [
      <span class="hljs-string">'react'</span>,
      <span class="hljs-string">'react-dom'</span>
    ]
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">'/dist/js/'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
        <span class="hljs-attr">query</span>: { <span class="hljs-attr">presets</span>: [ <span class="hljs-string">'es2015'</span>, <span class="hljs-string">'stage-0'</span>, <span class="hljs-string">'react'</span> ] }
      }
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'vendor'</span>, <span class="hljs-string">'vendor.bundle.js'</span>)
  ]
};

<span class="hljs-comment">/**
 * find entries
 */</span>
<span class="hljs-keyword">var</span> files = glob.sync(<span class="hljs-string">'./src/js/*/index.js'</span>);
<span class="hljs-keyword">var</span> newEntries = files.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">memo, file</span>) </span>{
  <span class="hljs-keyword">var</span> name = <span class="hljs-regexp">/.*\/(.*?)\/index\.js/</span>.exec(file)[<span class="hljs-number">1</span>];
  memo[name] = entry(name);
  <span class="hljs-keyword">return</span> memo;
}, {});

config.entry = <span class="hljs-built_in">Object</span>.assign({}, config.entry, newEntries);

<span class="hljs-comment">/**
 * [entry description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">entry</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">'./src/js/'</span> + name + <span class="hljs-string">'/index.js'</span>;
}

<span class="hljs-built_in">module</span>.exports = config;</code></pre>
<p>在 gulpfile 中定义 webpack 任务，因为 webpack.config.js 为一个 node 模块，可直接引入，<br>又因为在 production 环境和 development 环境的模式是不同的，可以定义两个不同的任务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * [webpack 相关的依赖]
 * @type {[type]}
 */
var webpack = require(&quot;webpack&quot;);
var WebpackDevServer = require(&quot;webpack-dev-server&quot;);
var webpackConfig = require(&quot;./webpack.config.js&quot;);

/**
 * [webpackDevelopment description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
var devConfig, devCompiler;

devConfig = Object.create(webpackConfig);
devConfig.devtool = &quot;sourcemap&quot;;
devConfig.debug = true;
devCompiler = webpack(devConfig);

function webpackDevelopment(done) {
  devCompiler.run(function(err, stats) {
    if (err) {
      throw new gutil.PluginError(&quot;webpack:build-dev&quot;, err);
      return;
    }
    gutil.log(&quot;[webpack:build-dev]&quot;, stats.toString({
      colors: true
    }));
    done();
  });
}

/**
 * [webpackProduction description]
 * production 任务中添加了压缩和打包优化组件，且没有 sourcemap
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function webpackProduction(done) {
  var config = Object.create(webpackConfig);
  config.plugins = config.plugins.concat(
    new webpack.DefinePlugin({
      &quot;process.env&quot;: {
        &quot;NODE_ENV&quot;: &quot;production&quot;
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  webpack(config, function(err, stats) {
    if(err) throw new gutil.PluginError(&quot;webpack:build&quot;, err);
    gutil.log(&quot;[webpack:production]&quot;, stats.toString({
      colors: true
    }));
    done();
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * [webpack 相关的依赖]
 * @type {[type]}
 */</span>
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);
<span class="hljs-keyword">var</span> WebpackDevServer = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack-dev-server"</span>);
<span class="hljs-keyword">var</span> webpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./webpack.config.js"</span>);

<span class="hljs-comment">/**
 * [webpackDevelopment description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */</span>
<span class="hljs-keyword">var</span> devConfig, devCompiler;

devConfig = <span class="hljs-built_in">Object</span>.create(webpackConfig);
devConfig.devtool = <span class="hljs-string">"sourcemap"</span>;
devConfig.debug = <span class="hljs-literal">true</span>;
devCompiler = webpack(devConfig);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">webpackDevelopment</span>(<span class="hljs-params">done</span>) </span>{
  devCompiler.run(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, stats</span>) </span>{
    <span class="hljs-keyword">if</span> (err) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> gutil.PluginError(<span class="hljs-string">"webpack:build-dev"</span>, err);
      <span class="hljs-keyword">return</span>;
    }
    gutil.log(<span class="hljs-string">"[webpack:build-dev]"</span>, stats.toString({
      <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>
    }));
    done();
  });
}

<span class="hljs-comment">/**
 * [webpackProduction description]
 * production 任务中添加了压缩和打包优化组件，且没有 sourcemap
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">webpackProduction</span>(<span class="hljs-params">done</span>) </span>{
  <span class="hljs-keyword">var</span> config = <span class="hljs-built_in">Object</span>.create(webpackConfig);
  config.plugins = config.plugins.concat(
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">"process.env"</span>: {
        <span class="hljs-string">"NODE_ENV"</span>: <span class="hljs-string">"production"</span>
      }
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.DedupePlugin(),
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin()
  );

  webpack(config, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, stats</span>) </span>{
    <span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> gutil.PluginError(<span class="hljs-string">"webpack:build"</span>, err);
    gutil.log(<span class="hljs-string">"[webpack:production]"</span>, stats.toString({
      <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>
    }));
    done();
  });
}</code></pre>
<h2 id="articleHeader15">2.4.8 javascript lint</h2>
<p>为了能够 lint Es6 和 jsx 的 javascript ，可以基于 Eslint 来实现，Eslint 的基本配置：</p>
<p><strong>安装相关依赖</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install eslint eslint-loader eslint-plugin-react  --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="shell" style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> eslint eslint-loader eslint-<span class="hljs-keyword">plugin</span>-react  <span class="hljs-comment">--save-dev</span></code></pre>
<p><strong>添加 .eslintrc 配置文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // Extend existing configuration
  // from ESlint and eslint-plugin-react defaults.
  &quot;extends&quot;: [
    &quot;eslint:recommended&quot;, 
    &quot;plugin:react/recommended&quot;
  ],
  // Enable ES6 support. If you want to use custom Babel
  // features, you will need to enable a custom parser
  // as described in a section below.
  &quot;parserOptions&quot;: {
    &quot;ecmaVersion&quot;: 6,
    &quot;sourceType&quot;: &quot;module&quot;
  },
  &quot;env&quot;: {
    &quot;browser&quot;: true,
    &quot;node&quot;: true
  },
  // Enable custom plugin known as eslint-plugin-react
  &quot;plugins&quot;: [
    &quot;react&quot;
  ],
  &quot;rules&quot;: {
    // Disable `no-console` rule
    &quot;no-console&quot;: 0,
    // Give a warning if identifiers contain underscores
    &quot;no-underscore-dangle&quot;: 1,
    // Default to single quotes and raise an error if something
    // else is used
    &quot;quotes&quot;: [2, &quot;single&quot;]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  // Extend existing configuration
  // from ESlint and eslint-plugin-react defaults.
  <span class="hljs-attr">"extends"</span>: [
    <span class="hljs-string">"eslint:recommended"</span>, 
    <span class="hljs-string">"plugin:react/recommended"</span>
  ],
  // Enable ES6 support. If you want to use custom Babel
  // features, you will need to enable a custom parser
  // as described in a section below.
  <span class="hljs-attr">"parserOptions"</span>: {
    <span class="hljs-attr">"ecmaVersion"</span>: <span class="hljs-number">6</span>,
    <span class="hljs-attr">"sourceType"</span>: <span class="hljs-string">"module"</span>
  },
  <span class="hljs-attr">"env"</span>: {
    <span class="hljs-attr">"browser"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"node"</span>: <span class="hljs-literal">true</span>
  },
  // Enable custom plugin known as eslint-plugin-react
  <span class="hljs-attr">"plugins"</span>: [
    <span class="hljs-string">"react"</span>
  ],
  <span class="hljs-attr">"rules"</span>: {
    // Disable `no-console` rule
    <span class="hljs-attr">"no-console"</span>: <span class="hljs-number">0</span>,
    // Give a warning if identifiers contain underscores
    <span class="hljs-attr">"no-underscore-dangle"</span>: <span class="hljs-number">1</span>,
    // Default to single quotes and raise an error if something
    // else is used
    <span class="hljs-attr">"quotes"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"single"</span>]
  }
}</code></pre>
<p><strong>修改 webpack.config.js 配置</strong></p>
<p>在 webpack.config.js 中添加 preloaders (preloader 会在其他 loader 前应用)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  preLoaders:[{
    test: /\.js$/, 
    loader: &quot;eslint-loader&quot;, 
    exclude: /node_modules/
  }]
},
eslint: {
  configFile: './.eslintrc'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">preLoaders</span>:[{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>, 
    <span class="hljs-attr">loader</span>: <span class="hljs-string">"eslint-loader"</span>, 
    <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
  }]
},
<span class="hljs-attr">eslint</span>: {
  <span class="hljs-attr">configFile</span>: <span class="hljs-string">'./.eslintrc'</span>
}</code></pre>
<p><strong>测试</strong></p>
<p>修改 index.js 添加如下的代码块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const d = a ? b : c;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> d = a ? b : c;</code></pre>
<p>运行 webpack 测试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack

ERROR in ./src/js/home/index.js
......./src/js/home/index.js
  1:7   error  'd' is defined but never used  no-unused-vars
  1:11  error  'a' is not defined             no-undef
  1:15  error  'b' is not defined             no-undef
  1:19  error  'c' is not defined             no-undef

✖ 4 problems (4 errors, 0 warnings)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code class="shell">$ webpack

ERROR in ./src/js/home/index.js
......./src/js/home/index.js
  <span class="hljs-number">1</span>:<span class="hljs-number">7</span>   error  <span class="hljs-string">'d'</span> is <span class="hljs-keyword">defined</span> but never used  <span class="hljs-keyword">no</span>-unused-vars
  <span class="hljs-number">1</span>:<span class="hljs-number">11</span>  error  <span class="hljs-string">'a'</span> is <span class="hljs-keyword">not</span> <span class="hljs-keyword">defined</span>             <span class="hljs-keyword">no</span>-<span class="hljs-keyword">undef</span>
  <span class="hljs-number">1</span>:<span class="hljs-number">15</span>  error  <span class="hljs-string">'b'</span> is <span class="hljs-keyword">not</span> <span class="hljs-keyword">defined</span>             <span class="hljs-keyword">no</span>-<span class="hljs-keyword">undef</span>
  <span class="hljs-number">1</span>:<span class="hljs-number">19</span>  error  <span class="hljs-string">'c'</span> is <span class="hljs-keyword">not</span> <span class="hljs-keyword">defined</span>             <span class="hljs-keyword">no</span>-<span class="hljs-keyword">undef</span>

✖ <span class="hljs-number">4</span> problems (<span class="hljs-number">4</span> errors, <span class="hljs-number">0</span> warnings)</code></pre>
<p>更多的 eslint 的定义可以参考官网：<a href="http://eslint.org" rel="nofollow noreferrer" target="_blank">http://eslint.org</a></p>
<h2 id="articleHeader16">2.4.9 自动刷新和数据 mock</h2>
<p>代码的自动刷新用到了 gulp-connect 插件，并通过 connect-rest 模块实现 rest 接口的数据 mock。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * [connectServer description]
 * @return {[type]} [description]
 */
function connectServer(done) {
  connect.server({
      root: dist.root,
      port: 8080,
      livereload: true,
      middleware: function(connect, opt) {
        return [rest.rester({
          context: &quot;/&quot;
        })]
      }
  });
  mocks(rest);
  done();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * [connectServer description]
 * @return {[type]} [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">connectServer</span>(<span class="hljs-params">done</span>) </span>{
  connect.server({
      <span class="hljs-attr">root</span>: dist.root,
      <span class="hljs-attr">port</span>: <span class="hljs-number">8080</span>,
      <span class="hljs-attr">livereload</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">middleware</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">connect, opt</span>) </span>{
        <span class="hljs-keyword">return</span> [rest.rester({
          <span class="hljs-attr">context</span>: <span class="hljs-string">"/"</span>
        })]
      }
  });
  mocks(rest);
  done();
}</code></pre>
<p>mocks 目录下面定义了一个 index.js 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * [mocks]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
module.exports = function(app) {
    app.get(&quot;rest&quot;, function(req, content, callback) {
        setTimeout(function() {
            callback(null, {
                a: 1,
                b: 2
            });
        }, 500)
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * [mocks]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">app</span>) </span>{
    app.get(<span class="hljs-string">"rest"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, content, callback</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            callback(<span class="hljs-literal">null</span>, {
                <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
                <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>
            });
        }, <span class="hljs-number">500</span>)
    })
}</code></pre>
<p>connect-rest 不仅可以做数据 mock 的 rest 接口，同时也能实现 proxy 转发。更多可参见 <a href="https://github.com/imrefazekas/connect-rest/tree/v2" rel="nofollow noreferrer" target="_blank">https://github.com/imrefazekas/connect-rest/tree/v2</a></p>
<blockquote><p>需要注意的是 connect-rest 用到的版本为 1.9.5, 高版本不兼容。</p></blockquote>
<h2 id="articleHeader17">2.4.10 代码监控</h2>
<p>为了能够监控文件改变能实现自动刷新，还需要通过定义 watch 任务，监控文件的改变。 这里使用到了一个 trick，只监控 dist 目录的文件，如果该目录文件改变了，使用 pipe 的方式调用 connect.reload(), 直接调用不会自动刷新</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * [watch description]
 * @return {[type]} [description]
 */
function watch() {
  gulp.watch(src.html, html);
  gulp.watch(&quot;src/**/*.js&quot;, webpackDevelopment);
  gulp.watch(&quot;src/**/*.less&quot;, style);
  gulp.watch(&quot;dist/**/*&quot;).on('change', function(file) {
    gulp.src('dist/')
      .pipe(connect.reload());
  });
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * [watch description]
 * @return {[type]} [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">watch</span>(<span class="hljs-params"></span>) </span>{
  gulp.watch(src.html, html);
  gulp.watch(<span class="hljs-string">"src/**/*.js"</span>, webpackDevelopment);
  gulp.watch(<span class="hljs-string">"src/**/*.less"</span>, style);
  gulp.watch(<span class="hljs-string">"dist/**/*"</span>).on(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file</span>) </span>{
    gulp.src(<span class="hljs-string">'dist/'</span>)
      .pipe(connect.reload());
  });
}
</code></pre>
<h2 id="articleHeader18">2.4.11 任务编排</h2>
<p>最后将之前定义的任务通过 parallel 和 series 方法进行编排， 默认任务为开发任务，build 任务为 production 任务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * default task
 */
gulp.task(&quot;default&quot;, gulp.series(
  clean, 
  gulp.parallel(copyAssets, copyVendor, html, style, webpackDevelopment), 
  connectServer, 
  watch
));

/** 
 * production build task
 */
gulp.task(&quot;build&quot;, gulp.series(
  clean, 
  gulp.parallel(copyAssets, copyVendor, html, style, webpackProduction), 
  cleanBin, 
  copyDist, 
  function(done) {
    console.log('build success');
    done();
  }
));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * default task
 */</span>
gulp.task(<span class="hljs-string">"default"</span>, gulp.series(
  clean, 
  gulp.parallel(copyAssets, copyVendor, html, style, webpackDevelopment), 
  connectServer, 
  watch
));

<span class="hljs-comment">/** 
 * production build task
 */</span>
gulp.task(<span class="hljs-string">"build"</span>, gulp.series(
  clean, 
  gulp.parallel(copyAssets, copyVendor, html, style, webpackProduction), 
  cleanBin, 
  copyDist, 
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">done</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'build success'</span>);
    done();
  }
));</code></pre>
<h2 id="articleHeader19">2.4.12 webpack-dev-server vs gulp-connect</h2>
<p>在 webpack 小节也介绍过 webpack-dev-server 可以实现自动刷新并能实现局部的热加载 ，那为什么不使用 webpack-dev-server 而是使用 gulp-connect？</p>
<p>我的观点是对于一般的项目来说两者都可以使用，甚至可以只使用 webpack 就能完整工程构建任务，但是引入了 gulp 过后，能够更加清晰可控的编排任务，通过使用 gulp-connect 能够很方便的通过中间件的方式实现数据 mock，并且也能和 gulp.watch 整合。</p>
<h2 id="articleHeader20">附件：完整代码</h2>
<p>// webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require(&quot;webpack&quot;);
const glob = require('glob');
var config = {
    entry: {
        vendor: ['react', 'react-dom']
    },
    output: {
        path: __dirname + '/dist/js/',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
        }],
        preLoaders:[{
            test: /\.js$/, 
            loader: &quot;eslint-loader&quot;, 
            exclude: /node_modules/
        }],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ],
    eslint: {
        configFile: './.eslintrc'
    }
};
/**
 * find entries
 */
var files = glob.sync('./src/js/*/index.js');
var newEntries = files.reduce(function(memo, file) {
    var name = /.*\/(.*?)\/index\.js/.exec(file)[1];
    memo[name] = entry(name);
    return memo;
}, {});
config.entry = Object.assign({}, config.entry, newEntries);
/**
 * [entry description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function entry(name) {
    return './src/js/' + name + '/index.js';
}
module.exports = config;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);
<span class="hljs-keyword">const</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">'glob'</span>);
<span class="hljs-keyword">var</span> config = {
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">vendor</span>: [<span class="hljs-string">'react'</span>, <span class="hljs-string">'react-dom'</span>]
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">'/dist/js/'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>: [{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
            <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
            <span class="hljs-attr">query</span>: {
                <span class="hljs-attr">presets</span>: [<span class="hljs-string">'es2015'</span>, <span class="hljs-string">'stage-0'</span>, <span class="hljs-string">'react'</span>]
            }
        }],
        <span class="hljs-attr">preLoaders</span>:[{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>, 
            <span class="hljs-attr">loader</span>: <span class="hljs-string">"eslint-loader"</span>, 
            <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
        }],
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'vendor'</span>, <span class="hljs-string">'vendor.bundle.js'</span>)
    ],
    <span class="hljs-attr">eslint</span>: {
        <span class="hljs-attr">configFile</span>: <span class="hljs-string">'./.eslintrc'</span>
    }
};
<span class="hljs-comment">/**
 * find entries
 */</span>
<span class="hljs-keyword">var</span> files = glob.sync(<span class="hljs-string">'./src/js/*/index.js'</span>);
<span class="hljs-keyword">var</span> newEntries = files.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">memo, file</span>) </span>{
    <span class="hljs-keyword">var</span> name = <span class="hljs-regexp">/.*\/(.*?)\/index\.js/</span>.exec(file)[<span class="hljs-number">1</span>];
    memo[name] = entry(name);
    <span class="hljs-keyword">return</span> memo;
}, {});
config.entry = <span class="hljs-built_in">Object</span>.assign({}, config.entry, newEntries);
<span class="hljs-comment">/**
 * [entry description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">entry</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'./src/js/'</span> + name + <span class="hljs-string">'/index.js'</span>;
}
<span class="hljs-built_in">module</span>.exports = config;</code></pre>
<p>// gulpfile.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * [gulp description]
 * @type {[type]}
 */
var gulp = require(&quot;gulp&quot;);
var gutil = require(&quot;gulp-util&quot;);
var del = require(&quot;del&quot;);
var rename = require('gulp-rename');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cached = require('gulp-cached');
var remember = require('gulp-remember');

var webpack = require(&quot;webpack&quot;);
var WebpackDevServer = require(&quot;webpack-dev-server&quot;);
var webpackConfig = require(&quot;./webpack.config.js&quot;);

var connect = require('gulp-connect');
var rest = require('connect-rest');
var mocks = require('./mocks');

/**
 * ----------------------------------------------------
 * source configuration
 * ----------------------------------------------------
 */

var src = {
  html: &quot;src/html/*.html&quot;,                          // html 文件
  vendor: [&quot;vendor/**/*&quot;, &quot;bower_components/**/*&quot;], // vendor 目录和 bower_components
  style: &quot;src/style/*/index.less&quot;,                  // style 目录下所有 xx/index.less
  assets: &quot;assets/**/*&quot;                             // 图片等应用资源
};

var dist = {
  root: &quot;dist/&quot;,
  html: &quot;dist/&quot;,
  style: &quot;dist/style&quot;,
  vendor: &quot;dist/vendor&quot;,
  assets: &quot;dist/assets&quot;
};

var bin = {
  root: &quot;bin/&quot;,
  html: &quot;bin/&quot;,
  style: &quot;bin/style&quot;,
  vendor: &quot;bin/vendor&quot;,
  assets: &quot;bin/assets&quot;
};

/**
 * ----------------------------------------------------
 *  tasks
 * ----------------------------------------------------
 */

/**
 * clean build dir
 */
function clean(done) {
  del.sync(dist.root);
  done();
}

/**
 * [cleanBin description]
 * @return {[type]} [description]
 */
function cleanBin(done) {
  del.sync(bin.root);
  done();
}

/**
 * [copyVendor description]
 * @return {[type]} [description]
 */
function copyVendor() {
  return gulp.src(src.vendor)
    .pipe(gulp.dest(dist.vendor));
}

/**
 * [copyAssets description]
 * @return {[type]} [description]
 */
function copyAssets() {
  return gulp.src(src.assets)
    .pipe(gulp.dest(dist.assets));
}

/**
 * [copyDist description]
 * @return {[type]} [description]
 */
function copyDist() {
  return gulp.src(dist.root + '**/*')
    .pipe(gulp.dest(bin.root));
}

/**
 * [html description]
 * @return {[type]} [description]
 */
function html() {
    return gulp.src(src.html)
      .pipe(gulp.dest(dist.html))
}

/**
 * [style description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function style() {
    return gulp.src(src.style)
      .pipe(cached('style'))
      .pipe(less())
      .on('error', handleError)
      .pipe(autoprefixer({
        browsers: ['last 3 version']
      }))
      .pipe(gulp.dest(dist.style))
}

exports.style = style;

/**
 * [webpackProduction description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function webpackProduction(done) {
  var config = Object.create(webpackConfig);
  config.plugins = config.plugins.concat(
    new webpack.DefinePlugin({
      &quot;process.env&quot;: {
        &quot;NODE_ENV&quot;: &quot;production&quot;
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  webpack(config, function(err, stats) {
    if(err) throw new gutil.PluginError(&quot;webpack:build&quot;, err);
    gutil.log(&quot;[webpack:production]&quot;, stats.toString({
      colors: true
    }));
    done();
  });
}


/**
 * [webpackDevelopment description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
var devConfig, devCompiler;

devConfig = Object.create(webpackConfig);
devConfig.devtool = &quot;sourcemap&quot;;
devConfig.debug = true;
devCompiler = webpack(devConfig);

function webpackDevelopment(done) {
  devCompiler.run(function(err, stats) {
    if (err) {
      throw new gutil.PluginError(&quot;webpack:build-dev&quot;, err);
      return;
    }
    gutil.log(&quot;[webpack:build-dev]&quot;, stats.toString({
      colors: true
    }));
    done();
  });
}

/**
 * webpack develop server
 */
// devConfig.plugins = devConfig.plugins || []
// devConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
// function webpackDevelopmentServer(done) {
//   new WebpackDevServer(devCompiler, {
//    contentBase: dist.root,
//     lazy: false,
//     hot: true
//   }).listen(8080, 'localhost', function (err) {
//     if (err) throw new gutil.PluginError('webpack-dev-server', err)
//     gutil.log('[webpack-dev-server]', 'http://localhost:8080/')
//  reload();
//  done();
//   });
// }

/**
 * [connectServer description]
 * @return {[type]} [description]
 */
function connectServer(done) {
  connect.server({
      root: dist.root,
      port: 8080,
      livereload: true,
      middleware: function(connect, opt) {
        return [rest.rester({
          context: &quot;/&quot;
        })]
      }
  });
  mocks(rest);
  done();
}

/**
 * [watch description]
 * @return {[type]} [description]
 */
function watch() {
  gulp.watch(src.html, html);
  gulp.watch(&quot;src/**/*.js&quot;, webpackDevelopment);
  gulp.watch(&quot;src/**/*.less&quot;, style);
  gulp.watch(&quot;dist/**/*&quot;).on('change', function(file) {
    gulp.src('dist/')
      .pipe(connect.reload());
  });
}

/**
 * default task
 */
gulp.task(&quot;default&quot;, gulp.series(
  clean, 
  gulp.parallel(copyAssets, copyVendor, html, style, webpackDevelopment), 
  connectServer, 
  watch
));

/** 
 * production build task
 */
gulp.task(&quot;build&quot;, gulp.series(
  clean, 
  gulp.parallel(copyAssets, copyVendor, html, style, webpackProduction), 
  cleanBin, 
  copyDist, 
  function(done) {
    console.log('build success');
    done();
  }
));

/**
 * [handleError description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
function handleError(err) {
  if (err.message) {
    console.log(err.message)
  } else {
    console.log(err)
  }
  this.emit('end')
}

/**
 * [reload description]
 * @return {[type]} [description]
 */
function reload() {
  connect.reload();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * [gulp description]
 * @type {[type]}
 */</span>
<span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp"</span>);
<span class="hljs-keyword">var</span> gutil = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp-util"</span>);
<span class="hljs-keyword">var</span> del = <span class="hljs-built_in">require</span>(<span class="hljs-string">"del"</span>);
<span class="hljs-keyword">var</span> rename = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-rename'</span>);
<span class="hljs-keyword">var</span> less = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-less'</span>);
<span class="hljs-keyword">var</span> autoprefixer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-autoprefixer'</span>);
<span class="hljs-keyword">var</span> cached = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-cached'</span>);
<span class="hljs-keyword">var</span> remember = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-remember'</span>);

<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);
<span class="hljs-keyword">var</span> WebpackDevServer = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack-dev-server"</span>);
<span class="hljs-keyword">var</span> webpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./webpack.config.js"</span>);

<span class="hljs-keyword">var</span> connect = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-connect'</span>);
<span class="hljs-keyword">var</span> rest = <span class="hljs-built_in">require</span>(<span class="hljs-string">'connect-rest'</span>);
<span class="hljs-keyword">var</span> mocks = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./mocks'</span>);

<span class="hljs-comment">/**
 * ----------------------------------------------------
 * source configuration
 * ----------------------------------------------------
 */</span>

<span class="hljs-keyword">var</span> src = {
  <span class="hljs-attr">html</span>: <span class="hljs-string">"src/html/*.html"</span>,                          <span class="hljs-comment">// html 文件</span>
  vendor: [<span class="hljs-string">"vendor/**/*"</span>, <span class="hljs-string">"bower_components/**/*"</span>], <span class="hljs-comment">// vendor 目录和 bower_components</span>
  style: <span class="hljs-string">"src/style/*/index.less"</span>,                  <span class="hljs-comment">// style 目录下所有 xx/index.less</span>
  assets: <span class="hljs-string">"assets/**/*"</span>                             <span class="hljs-comment">// 图片等应用资源</span>
};

<span class="hljs-keyword">var</span> dist = {
  <span class="hljs-attr">root</span>: <span class="hljs-string">"dist/"</span>,
  <span class="hljs-attr">html</span>: <span class="hljs-string">"dist/"</span>,
  <span class="hljs-attr">style</span>: <span class="hljs-string">"dist/style"</span>,
  <span class="hljs-attr">vendor</span>: <span class="hljs-string">"dist/vendor"</span>,
  <span class="hljs-attr">assets</span>: <span class="hljs-string">"dist/assets"</span>
};

<span class="hljs-keyword">var</span> bin = {
  <span class="hljs-attr">root</span>: <span class="hljs-string">"bin/"</span>,
  <span class="hljs-attr">html</span>: <span class="hljs-string">"bin/"</span>,
  <span class="hljs-attr">style</span>: <span class="hljs-string">"bin/style"</span>,
  <span class="hljs-attr">vendor</span>: <span class="hljs-string">"bin/vendor"</span>,
  <span class="hljs-attr">assets</span>: <span class="hljs-string">"bin/assets"</span>
};

<span class="hljs-comment">/**
 * ----------------------------------------------------
 *  tasks
 * ----------------------------------------------------
 */</span>

<span class="hljs-comment">/**
 * clean build dir
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">clean</span>(<span class="hljs-params">done</span>) </span>{
  del.sync(dist.root);
  done();
}

<span class="hljs-comment">/**
 * [cleanBin description]
 * @return {[type]} [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cleanBin</span>(<span class="hljs-params">done</span>) </span>{
  del.sync(bin.root);
  done();
}

<span class="hljs-comment">/**
 * [copyVendor description]
 * @return {[type]} [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copyVendor</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src(src.vendor)
    .pipe(gulp.dest(dist.vendor));
}

<span class="hljs-comment">/**
 * [copyAssets description]
 * @return {[type]} [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copyAssets</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src(src.assets)
    .pipe(gulp.dest(dist.assets));
}

<span class="hljs-comment">/**
 * [copyDist description]
 * @return {[type]} [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copyDist</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src(dist.root + <span class="hljs-string">'**/*'</span>)
    .pipe(gulp.dest(bin.root));
}

<span class="hljs-comment">/**
 * [html description]
 * @return {[type]} [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">html</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> gulp.src(src.html)
      .pipe(gulp.dest(dist.html))
}

<span class="hljs-comment">/**
 * [style description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">style</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> gulp.src(src.style)
      .pipe(cached(<span class="hljs-string">'style'</span>))
      .pipe(less())
      .on(<span class="hljs-string">'error'</span>, handleError)
      .pipe(autoprefixer({
        <span class="hljs-attr">browsers</span>: [<span class="hljs-string">'last 3 version'</span>]
      }))
      .pipe(gulp.dest(dist.style))
}

exports.style = style;

<span class="hljs-comment">/**
 * [webpackProduction description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">webpackProduction</span>(<span class="hljs-params">done</span>) </span>{
  <span class="hljs-keyword">var</span> config = <span class="hljs-built_in">Object</span>.create(webpackConfig);
  config.plugins = config.plugins.concat(
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">"process.env"</span>: {
        <span class="hljs-string">"NODE_ENV"</span>: <span class="hljs-string">"production"</span>
      }
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.DedupePlugin(),
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin()
  );

  webpack(config, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, stats</span>) </span>{
    <span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> gutil.PluginError(<span class="hljs-string">"webpack:build"</span>, err);
    gutil.log(<span class="hljs-string">"[webpack:production]"</span>, stats.toString({
      <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>
    }));
    done();
  });
}


<span class="hljs-comment">/**
 * [webpackDevelopment description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */</span>
<span class="hljs-keyword">var</span> devConfig, devCompiler;

devConfig = <span class="hljs-built_in">Object</span>.create(webpackConfig);
devConfig.devtool = <span class="hljs-string">"sourcemap"</span>;
devConfig.debug = <span class="hljs-literal">true</span>;
devCompiler = webpack(devConfig);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">webpackDevelopment</span>(<span class="hljs-params">done</span>) </span>{
  devCompiler.run(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, stats</span>) </span>{
    <span class="hljs-keyword">if</span> (err) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> gutil.PluginError(<span class="hljs-string">"webpack:build-dev"</span>, err);
      <span class="hljs-keyword">return</span>;
    }
    gutil.log(<span class="hljs-string">"[webpack:build-dev]"</span>, stats.toString({
      <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>
    }));
    done();
  });
}

<span class="hljs-comment">/**
 * webpack develop server
 */</span>
<span class="hljs-comment">// devConfig.plugins = devConfig.plugins || []</span>
<span class="hljs-comment">// devConfig.plugins.push(new webpack.HotModuleReplacementPlugin())</span>
<span class="hljs-comment">// function webpackDevelopmentServer(done) {</span>
<span class="hljs-comment">//   new WebpackDevServer(devCompiler, {</span>
<span class="hljs-comment">//    contentBase: dist.root,</span>
<span class="hljs-comment">//     lazy: false,</span>
<span class="hljs-comment">//     hot: true</span>
<span class="hljs-comment">//   }).listen(8080, 'localhost', function (err) {</span>
<span class="hljs-comment">//     if (err) throw new gutil.PluginError('webpack-dev-server', err)</span>
<span class="hljs-comment">//     gutil.log('[webpack-dev-server]', 'http://localhost:8080/')</span>
<span class="hljs-comment">//  reload();</span>
<span class="hljs-comment">//  done();</span>
<span class="hljs-comment">//   });</span>
<span class="hljs-comment">// }</span>

<span class="hljs-comment">/**
 * [connectServer description]
 * @return {[type]} [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">connectServer</span>(<span class="hljs-params">done</span>) </span>{
  connect.server({
      <span class="hljs-attr">root</span>: dist.root,
      <span class="hljs-attr">port</span>: <span class="hljs-number">8080</span>,
      <span class="hljs-attr">livereload</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">middleware</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">connect, opt</span>) </span>{
        <span class="hljs-keyword">return</span> [rest.rester({
          <span class="hljs-attr">context</span>: <span class="hljs-string">"/"</span>
        })]
      }
  });
  mocks(rest);
  done();
}

<span class="hljs-comment">/**
 * [watch description]
 * @return {[type]} [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">watch</span>(<span class="hljs-params"></span>) </span>{
  gulp.watch(src.html, html);
  gulp.watch(<span class="hljs-string">"src/**/*.js"</span>, webpackDevelopment);
  gulp.watch(<span class="hljs-string">"src/**/*.less"</span>, style);
  gulp.watch(<span class="hljs-string">"dist/**/*"</span>).on(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file</span>) </span>{
    gulp.src(<span class="hljs-string">'dist/'</span>)
      .pipe(connect.reload());
  });
}

<span class="hljs-comment">/**
 * default task
 */</span>
gulp.task(<span class="hljs-string">"default"</span>, gulp.series(
  clean, 
  gulp.parallel(copyAssets, copyVendor, html, style, webpackDevelopment), 
  connectServer, 
  watch
));

<span class="hljs-comment">/** 
 * production build task
 */</span>
gulp.task(<span class="hljs-string">"build"</span>, gulp.series(
  clean, 
  gulp.parallel(copyAssets, copyVendor, html, style, webpackProduction), 
  cleanBin, 
  copyDist, 
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">done</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'build success'</span>);
    done();
  }
));

<span class="hljs-comment">/**
 * [handleError description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleError</span>(<span class="hljs-params">err</span>) </span>{
  <span class="hljs-keyword">if</span> (err.message) {
    <span class="hljs-built_in">console</span>.log(err.message)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(err)
  }
  <span class="hljs-keyword">this</span>.emit(<span class="hljs-string">'end'</span>)
}

<span class="hljs-comment">/**
 * [reload description]
 * @return {[type]} [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reload</span>(<span class="hljs-params"></span>) </span>{
  connect.reload();
}</code></pre>
<p>// .eslintrc</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // Extend existing configuration
  // from ESlint and eslint-plugin-react defaults.
  &quot;extends&quot;: [
    &quot;eslint:recommended&quot;, 
    &quot;plugin:react/recommended&quot;
  ],
  // Enable ES6 support. If you want to use custom Babel
  // features, you will need to enable a custom parser
  // as described in a section below.
  &quot;parserOptions&quot;: {
    &quot;ecmaVersion&quot;: 6,
    &quot;sourceType&quot;: &quot;module&quot;
  },
  &quot;env&quot;: {
    &quot;browser&quot;: true,
    &quot;node&quot;: true
  },
  // Enable custom plugin known as eslint-plugin-react
  &quot;plugins&quot;: [
    &quot;react&quot;
  ],
  &quot;rules&quot;: {
    // Disable `no-console` rule
    &quot;no-console&quot;: 0,
    // Give a warning if identifiers contain underscores
    &quot;no-underscore-dangle&quot;: 1,
    // Default to single quotes and raise an error if something
    // else is used
    &quot;quotes&quot;: [2, &quot;single&quot;]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  // Extend existing configuration
  // from ESlint and eslint-plugin-react defaults.
  <span class="hljs-attr">"extends"</span>: [
    <span class="hljs-string">"eslint:recommended"</span>, 
    <span class="hljs-string">"plugin:react/recommended"</span>
  ],
  // Enable ES6 support. If you want to use custom Babel
  // features, you will need to enable a custom parser
  // as described in a section below.
  <span class="hljs-attr">"parserOptions"</span>: {
    <span class="hljs-attr">"ecmaVersion"</span>: <span class="hljs-number">6</span>,
    <span class="hljs-attr">"sourceType"</span>: <span class="hljs-string">"module"</span>
  },
  <span class="hljs-attr">"env"</span>: {
    <span class="hljs-attr">"browser"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"node"</span>: <span class="hljs-literal">true</span>
  },
  // Enable custom plugin known as eslint-plugin-react
  <span class="hljs-attr">"plugins"</span>: [
    <span class="hljs-string">"react"</span>
  ],
  <span class="hljs-attr">"rules"</span>: {
    // Disable `no-console` rule
    <span class="hljs-attr">"no-console"</span>: <span class="hljs-number">0</span>,
    // Give a warning if identifiers contain underscores
    <span class="hljs-attr">"no-underscore-dangle"</span>: <span class="hljs-number">1</span>,
    // Default to single quotes and raise an error if something
    // else is used
    <span class="hljs-attr">"quotes"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"single"</span>]
  }
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精益 React 学习指南 （Lean React）- 2.4 webpack + gulp 构建完整前端工作流

## 原文链接
[https://segmentfault.com/a/1190000005657651](https://segmentfault.com/a/1190000005657651)


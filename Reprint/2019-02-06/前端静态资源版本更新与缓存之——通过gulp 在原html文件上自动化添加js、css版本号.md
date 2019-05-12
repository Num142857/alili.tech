---
title: '前端静态资源版本更新与缓存之——通过gulp 在原html文件上自动化添加js、css版本号' 
date: 2019-02-06 2:30:08
hidden: true
slug: mevh58hh59
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">原理</h3>
<ol>
<li><p>修改js和css文件</p></li>
<li><p>通过对js,css文件内容进行hash运算，生成一个文件的唯一hash字符串(如果文件修改则hash号会发生变化)</p></li>
<li><p>替换html中的js,css文件名，生成一个带版本号的文件名</p></li>
</ol>
<h3 id="articleHeader1">方案</h3>
<p>现在网上的方案都是生成一个新的dist目录，里面包含了要发布的html,js,css等文件。但是在实际的公司的项目中，会有情况不能生成新的HTML进行发布，需要在原来的HTML文件上进行js ,css版本的替换. 这里分享下我在实际项目中通过改动插件然后在原目录结构下进行版本的控制方案。</p>
<p>原html文件代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;../css/default.css&quot;>
<script src=&quot;../js/app.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"../css/default.css"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/app.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>预期效果：在原目录结构下html文件代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;../css/default.css?v=5a636d79c4&quot;>
<script src=&quot;../js/app.js?v=3a0d844594&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"../css/default.css?v=5a636d79c4"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/app.js?v=3a0d844594"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>1：安装gulp和gulp插件</strong><br>执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev gulp
npm install --save-dev gulp-rev
npm install --save-dev gulp-rev-collector
npm install --save-dev run-sequence
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm install --save-dev gulp
npm install --save-dev gulp-rev
npm install --save-dev gulp-rev-collector
npm install --save-dev run-sequence
</code></pre>
<p><strong>2：编写gulpfile.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

//引入gulp和gulp插件
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');

//定义css、js源文件路径
var cssSrc = 'css/*.css',
    jsSrc = 'js/*.js';


//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
    return gulp.src(cssSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});


//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
    return gulp.src(jsSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});


//Html替换css、js文件版本
gulp.task('revHtml', function () {
    return gulp.src(['rev/**/*.json', 'View/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('View'));
});


//开发构建
gulp.task('dev', function (done) {
    condition = false;
    runSequence(
        ['revCss'],
        ['revJs'],
        ['revHtml'],
        done);
});


gulp.task('default', ['dev']);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">

<span class="hljs-comment">//引入gulp和gulp插件</span>
<span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>),
    runSequence = <span class="hljs-built_in">require</span>(<span class="hljs-string">'run-sequence'</span>),
    rev = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-rev'</span>),
    revCollector = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-rev-collector'</span>);

<span class="hljs-comment">//定义css、js源文件路径</span>
<span class="hljs-keyword">var</span> cssSrc = <span class="hljs-string">'css/*.css'</span>,
    jsSrc = <span class="hljs-string">'js/*.js'</span>;


<span class="hljs-comment">//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射</span>
gulp.task(<span class="hljs-string">'revCss'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> gulp.src(cssSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(<span class="hljs-string">'rev/css'</span>));
});


<span class="hljs-comment">//js生成文件hash编码并生成 rev-manifest.json文件名对照映射</span>
gulp.task(<span class="hljs-string">'revJs'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> gulp.src(jsSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(<span class="hljs-string">'rev/js'</span>));
});


<span class="hljs-comment">//Html替换css、js文件版本</span>
gulp.task(<span class="hljs-string">'revHtml'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> gulp.src([<span class="hljs-string">'rev/**/*.json'</span>, <span class="hljs-string">'View/*.html'</span>])
        .pipe(revCollector())
        .pipe(gulp.dest(<span class="hljs-string">'View'</span>));
});


<span class="hljs-comment">//开发构建</span>
gulp.task(<span class="hljs-string">'dev'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">done</span>) </span>{
    condition = <span class="hljs-literal">false</span>;
    runSequence(
        [<span class="hljs-string">'revCss'</span>],
        [<span class="hljs-string">'revJs'</span>],
        [<span class="hljs-string">'revHtml'</span>],
        done);
});


gulp.task(<span class="hljs-string">'default'</span>, [<span class="hljs-string">'dev'</span>]);
</code></pre>
<p><strong>执行gulp命令后的效果</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//rev目录下生成了manifest.json对应文件
{
  &quot;default.css&quot;: &quot;default-803a7fe4ae.css&quot;
}


<link rel=&quot;stylesheet&quot; href=&quot;../css/default-803a7fe4ae.css&quot;>
<script src=&quot;../js/app-3a0d844594.js&quot;></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//rev目录下生成了manifest.json对应文件</span>
{
  <span class="hljs-string">"default.css"</span>: <span class="hljs-string">"default-803a7fe4ae.css"</span>
}


&lt;link rel=<span class="hljs-string">"stylesheet"</span> href=<span class="hljs-string">"../css/default-803a7fe4ae.css"</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/app-3a0d844594.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>很显然这不是我们需要的效果</p>
<p><strong>3.更改gulp-rev和gulp-rev-collector</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="打开node_modules\gulp-rev\index.js
第144行 manifest[originalFile] = revisionedFile;
更新为: manifest[originalFile] = originalFile + '?v=' + file.revHash;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">打开node_modules\gulp-rev\index.js
第144行 manifest[originalFile] = revisionedFile;
更新为: manifest[originalFile] = originalFile + <span class="hljs-string">'?v='</span> + file.revHash;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="打开nodemodules\gulp-rev\nodemodules\rev-path\index.js
10行 return filename + '-' + hash + ext;
更新为: return filename + ext;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">打开nodemodules\gulp-rev\nodemodules\rev-path\index.js
10行 <span class="hljs-built_in">return</span> filename + <span class="hljs-string">'-'</span> + <span class="hljs-built_in">hash</span> + ext;
更新为: <span class="hljs-built_in">return</span> filename + ext;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="打开node_modules\gulp-rev-collector\index.js
31行if ( !_.isString(json[key]) || path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' ) !==  path.basename(key) ) {
更新为: if ( !_.isString(json[key]) || path.basename(json[key]).split('?')[0] !== path.basename(key) ) {" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">打开node_modules\gulp-rev-collector\index.js
31行<span class="hljs-keyword">if</span> ( !_.isString(json[key]) || path.basename(json[key]).replace(new RegExp( opts.revSuffix ), <span class="hljs-string">''</span> ) !==  path.basename(key) ) {
更新为: <span class="hljs-keyword">if</span> ( !_.isString(json[key]) || path.basename(json[key]).split(<span class="hljs-string">'?'</span>)[0] !== path.basename(key) ) {</code></pre>
<p>再执行gulp命令，得到的结果如下(效果正确):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;../css/default.css?v=803a7fe4ae&quot;>
<script src=&quot;../js/app.js?v=3a0d844594&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"../css/default.css?v=803a7fe4ae"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/app.js?v=3a0d844594"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>但是假如我们更改了css和js后，再执行gulp命令，得到的结果会如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;../css/default.css?v=33379df310?v=803a7fe4ae&quot;>
<script src=&quot;../js/app.js?v=3a0d844594?v=3a0d844594&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"../css/default.css?v=33379df310?v=803a7fe4ae"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/app.js?v=3a0d844594?v=3a0d844594"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>有没有发现，会在版本号后面再添加一个版本号，因为gulp只替换了原来文件名，这样又不符合预期效果了，所以我们想到，还需要修改插件的替换正则表达式。</p>
<p><strong>4.继续更改gulp-rev-collector</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="打开node_modules\gulp-rev-collector\index.js
第107行 regexp: new RegExp( '([\/\\\\\'&quot;])' + pattern, 'g' ),
更新为: regexp: new RegExp( '([\/\\\\\'&quot;])' + pattern+'(\\?v=\\w{10})?', 'g' )," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">打开node_modules\gulp-rev-collector\index.js
第107行 regexp: new RegExp( <span class="hljs-string">'([\/\\\\\'</span><span class="hljs-string">"])' + pattern, 'g' ),
更新为: regexp: new RegExp( '([\/\\\\\'"</span>])<span class="hljs-string">' + pattern+'</span>(\\?v=\\w{10})?<span class="hljs-string">', '</span>g<span class="hljs-string">' ),</span></code></pre>
<p>现在你不管执行多少遍gulp命令，得到的html效果都是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;../css/default.css?v=5a636d79c4&quot;>
<script src=&quot;../js/app.js?v=3a0d844594&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"../css/default.css?v=5a636d79c4"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/app.js?v=3a0d844594"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><a href="https://pan.baidu.com/s/1nvcwamP" rel="nofollow noreferrer" target="_blank">附上改过后的node_modules文件</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端静态资源版本更新与缓存之——通过gulp 在原html文件上自动化添加js、css版本号

## 原文链接
[https://segmentfault.com/a/1190000006204457](https://segmentfault.com/a/1190000006204457)


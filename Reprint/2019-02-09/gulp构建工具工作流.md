---
title: 'gulp构建工具工作流' 
date: 2019-02-09 2:30:58
hidden: true
slug: tkpucgy6epj
categories: [reprint]
---

{{< raw >}}

                    
<p>先前学习了webpack,但是总是感觉webpack略显复杂，并且现在很多公司gulp工作流用的比较多，因此就入gulp的坑来踩一踩，技多不压身，霍霍霍...。<br><span class="img-wrap"><img data-src="http://static.xiaomo.info/images/gulp.png" src="https://static.alili.techhttp://static.xiaomo.info/images/gulp.png" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader0">一、简介(增强和使你的工作自动化)</h2>
<h3 id="articleHeader1">1. 使用简单</h3>
<p>没有繁琐的配置，一个任务一个task。通过代码优于配置的策略，Gulp 让简单的任务简单，复杂的任务可管理。</p>
<h3 id="articleHeader2">2. 高效</h3>
<p>利用node强大的工作流，快速的构建项目并减少频繁的 IO 操作。</p>
<h3 id="articleHeader3">3. 高质量</h3>
<p>gulp生态圈有相当多优秀的插件以供我们使用，Gulp 严格的插件指南确保插件如你期望的那样简洁高质得工作。</p>
<h3 id="articleHeader4">4. 易学</h3>
<p>通过最少的 API，掌握 Gulp 毫不费力，构建工作尽在掌握：如同一系列流管道。</p>
<h2 id="articleHeader5">二、gulp相关api</h2>
<h3 id="articleHeader6">1. <code>gulp.src</code>: 来源</h3>
<h3 id="articleHeader7">2. <code>gulp.dest</code>: 目标</h3>
<h3 id="articleHeader8">3. <code>gulp.pipe</code>: 管道</h3>
<h3 id="articleHeader9">4. <code>gulp.watch</code>: 热加载</h3>
<h3 id="articleHeader10">5. <code>gulp.task</code>: 任务</h3>
<h3 id="articleHeader11">6. <code>gulp.task</code>('default')</h3>
<p>默认任务,必须存在</p>
<h2 id="articleHeader12">三、使用(工作流程)</h2>
<h3 id="articleHeader13">1. 全局安装gulp</h3>
<p><code>npm install -g gulp</code></p>
<h3 id="articleHeader14">2. 建立项目</h3>
<p><code>mkdir gulp-test &amp;&amp; cd gulp-test</code></p>
<h3 id="articleHeader15">3. 初始化项目</h3>
<p><code>npm init -y</code>  (会生成package.json)</p>
<h3 id="articleHeader16">4. 安装项目依赖</h3>
<p><code>npm install --save-dev gulp</code></p>
<ol><li><p>创建配置文件<br><code>touch gulpfile.js</code></p></li></ol>
<h3 id="articleHeader17">6. gulp常用的功能</h3>
<p>转码（<code>gulp-babel</code> <code>babel-preset-es2015</code> <code>gulp-sass</code> <code>gulp-less</code> <code>gulp-react</code>）、合并（<code>gulp-concat</code>）、压缩（<code>gulp-uglify</code>）、模块化（<code>gulp-browserify</code>）、测试（gulp-jasmine），请依次安装这些依赖。</p>
<h3 id="articleHeader18">7. 小常识</h3>
<p>因为国外的网站比较慢 npm经常会卡住。我们可以设置镜像源或使用<code>cnpm</code>或者设置镜像源<code>npm config set registry https://registry.npm.taobao.org </code></p>
<h3 id="articleHeader19">8. 写配置</h3>
<p>（gulpfile一定有一个default的任务，你可以把每个任务分文件书写然后再require进来，这种方式适合多人同时书写任务时，可以防止多人修改同一文件导致的冲突）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gulp = require(&quot;gulp&quot;);
var babel = require(&quot;gulp-babel&quot;);
var react = require(&quot;gulp-react&quot;);
var sass = require(&quot;gulp-sass&quot;);
var less = require(&quot;gulp-less&quot;);
var uglify = require(&quot;gulp-uglify&quot;);
var jasmine = require(&quot;gulp-jasmine&quot;);
var concat = require(&quot;gulp-concat&quot;);

//定义常量
const transformJs = &quot;transformJs&quot;;
const transformSass = &quot;transformSass&quot;;
const transformLess = &quot;transformLess&quot;;
const test = 'test';


//js
gulp.task(transformJs, function () {
    return gulp.src(&quot;src/*.js&quot;)
        .pipe(react())
        .pipe(babel(
            {
                presets: [&quot;babel-preset-es2015&quot;]
            }
        ))
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(&quot;./dist&quot;))
});

// scss
gulp.task(transformSass, function () {
    return gulp.src(&quot;src/css/*.scss&quot;)
        .pipe(sass())
        .pipe(gulp.dest(&quot;./dist&quot;))
});


// less
gulp.task(transformLess, function () {
    return gulp.src(&quot;src/css/*.less&quot;)
        .pipe(less())
        .pipe(gulp.dest(&quot;./dist&quot;))
});


// jasmine
gulp.task(test, function () {
    return gulp.src(&quot;./test/*.js&quot;)
        .pipe(jasmine())
});

gulp.task(&quot;default&quot;, [transformJs, transformSass, transformLess, test]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp"</span>);
<span class="hljs-keyword">var</span> babel = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp-babel"</span>);
<span class="hljs-keyword">var</span> react = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp-react"</span>);
<span class="hljs-keyword">var</span> sass = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp-sass"</span>);
<span class="hljs-keyword">var</span> less = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp-less"</span>);
<span class="hljs-keyword">var</span> uglify = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp-uglify"</span>);
<span class="hljs-keyword">var</span> jasmine = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp-jasmine"</span>);
<span class="hljs-keyword">var</span> concat = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp-concat"</span>);

<span class="hljs-comment">//定义常量</span>
<span class="hljs-keyword">const</span> transformJs = <span class="hljs-string">"transformJs"</span>;
<span class="hljs-keyword">const</span> transformSass = <span class="hljs-string">"transformSass"</span>;
<span class="hljs-keyword">const</span> transformLess = <span class="hljs-string">"transformLess"</span>;
<span class="hljs-keyword">const</span> test = <span class="hljs-string">'test'</span>;


<span class="hljs-comment">//js</span>
gulp.task(transformJs, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">"src/*.js"</span>)
        .pipe(react())
        .pipe(babel(
            {
                <span class="hljs-attr">presets</span>: [<span class="hljs-string">"babel-preset-es2015"</span>]
            }
        ))
        .pipe(concat(<span class="hljs-string">'bundle.min.js'</span>))
        .pipe(uglify())
        .pipe(gulp.dest(<span class="hljs-string">"./dist"</span>))
});

<span class="hljs-comment">// scss</span>
gulp.task(transformSass, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">"src/css/*.scss"</span>)
        .pipe(sass())
        .pipe(gulp.dest(<span class="hljs-string">"./dist"</span>))
});


<span class="hljs-comment">// less</span>
gulp.task(transformLess, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">"src/css/*.less"</span>)
        .pipe(less())
        .pipe(gulp.dest(<span class="hljs-string">"./dist"</span>))
});


<span class="hljs-comment">// jasmine</span>
gulp.task(test, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">"./test/*.js"</span>)
        .pipe(jasmine())
});

gulp.task(<span class="hljs-string">"default"</span>, [transformJs, transformSass, transformLess, test]);</code></pre>
<h2 id="articleHeader20">四、配置文件解读</h2>
<h3 id="articleHeader21">1. 第一部分</h3>
<p>一堆<code>reqire</code>,是引用gulp相应的插件。在引用之前要确保己经安装。</p>
<h3 id="articleHeader22">2. 第二部分</h3>
<p>几个<code>const</code>,是定义任务名常量，有多几任务就定义多少常量。</p>
<h3 id="articleHeader23">3. 第三部分</h3>
<p>几个<code>task</code>,每个task对应一个任务，具有不同的功能。可以使用 <code>gulp xxx</code>来启动这个任务。</p>
<h3 id="articleHeader24">4. 第四部分</h3>
<p><code>default</code>,是执行<code>gulp</code>之后就会开始的任务 常用参数(<code>'default',[task1,task2,...],callback[可选]</code>)。</p>
<h2 id="articleHeader25">五、执行</h2>
<ol><li><p>如果要执行<code>default</code>任务，直接<code>gulp</code></p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  [09:56:04] Using gulpfile e:\oscchina\gulp-start-kit\gulpfile.js
  [09:56:04] Starting 'transformJs'...
  [09:56:04] Starting 'transformSass'...
  [09:56:04] Starting 'transformLess'...
  [09:56:04] Starting 'test'...
  .

  1 spec, 0 failures
  Finished in 0 seconds
  [09:56:04] Finished 'test' after 62 ms
  [09:56:06] Finished 'transformLess' after 2.66 s
  [09:56:06] Finished 'transformSass' after 2.68 s
  [09:56:06] Finished 'transformJs' after 2.7 s
  [09:56:06] Finished 'default' after 32 μs

  Process finished with exit code 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>  [<span class="hljs-number">09</span>:<span class="hljs-number">56</span>:<span class="hljs-number">04</span>] <span class="hljs-symbol">Using</span> gulpfile e:\oscchina\gulp-start-kit\gulpfile.js
  [<span class="hljs-number">09</span>:<span class="hljs-number">56</span>:<span class="hljs-number">04</span>] <span class="hljs-symbol">Starting</span> <span class="hljs-string">'transformJs'</span>...
  [<span class="hljs-number">09</span>:<span class="hljs-number">56</span>:<span class="hljs-number">04</span>] <span class="hljs-symbol">Starting</span> <span class="hljs-string">'transformSass'</span>...
  [<span class="hljs-number">09</span>:<span class="hljs-number">56</span>:<span class="hljs-number">04</span>] <span class="hljs-symbol">Starting</span> <span class="hljs-string">'transformLess'</span>...
  [<span class="hljs-number">09</span>:<span class="hljs-number">56</span>:<span class="hljs-number">04</span>] <span class="hljs-symbol">Starting</span> <span class="hljs-string">'test'</span>...
  .

  <span class="hljs-number">1</span> spec, <span class="hljs-number">0</span> failures
  <span class="hljs-symbol">Finished</span> in <span class="hljs-number">0</span> seconds
  [<span class="hljs-number">09</span>:<span class="hljs-number">56</span>:<span class="hljs-number">04</span>] <span class="hljs-symbol">Finished</span> <span class="hljs-string">'test'</span> after <span class="hljs-number">62</span> ms
  [<span class="hljs-number">09</span>:<span class="hljs-number">56</span>:<span class="hljs-number">06</span>] <span class="hljs-symbol">Finished</span> <span class="hljs-string">'transformLess'</span> after <span class="hljs-number">2.66</span> s
  [<span class="hljs-number">09</span>:<span class="hljs-number">56</span>:<span class="hljs-number">06</span>] <span class="hljs-symbol">Finished</span> <span class="hljs-string">'transformSass'</span> after <span class="hljs-number">2.68</span> s
  [<span class="hljs-number">09</span>:<span class="hljs-number">56</span>:<span class="hljs-number">06</span>] <span class="hljs-symbol">Finished</span> <span class="hljs-string">'transformJs'</span> after <span class="hljs-number">2.7</span> s
  [<span class="hljs-number">09</span>:<span class="hljs-number">56</span>:<span class="hljs-number">06</span>] <span class="hljs-symbol">Finished</span> <span class="hljs-string">'default'</span> after <span class="hljs-number">32</span> μs

  <span class="hljs-symbol">Process</span> finished with exit code <span class="hljs-number">0</span></code></pre>
<ol><li><p>如果想要执行单个任务，请输入 <code>gulp taskName</code>,例如<code>gulp test</code></p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  [09:56:47] Using gulpfile e:\oscchina\gulp-start-kit\gulpfile.js
  [09:56:47] Starting 'test'...
  .

  1 spec, 0 failures
  Finished in 0 seconds
  [09:56:47] Finished 'test' after 77 ms

  Process finished with exit code 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>  [<span class="hljs-number">09</span>:<span class="hljs-number">56</span>:<span class="hljs-number">47</span>] Using gulpfile e:\oscchina\gulp-start-kit\gulpfile.js
  [<span class="hljs-number">09</span>:<span class="hljs-number">56</span>:<span class="hljs-number">47</span>] Starting <span class="hljs-string">'test'</span>...
  .

  <span class="hljs-number">1</span> spec, <span class="hljs-number">0</span> failures
  Finished <span class="hljs-keyword">in</span> <span class="hljs-number">0</span> seconds
  [<span class="hljs-number">09</span>:<span class="hljs-number">56</span>:<span class="hljs-number">47</span>] Finished <span class="hljs-string">'test'</span> after <span class="hljs-number">77</span> ms

  Process finished with <span class="hljs-keyword">exit</span> code <span class="hljs-number">0</span></code></pre>
<h2 id="articleHeader26">六、gulp常见任务</h2>
<h3 id="articleHeader27">1. 处理js</h3>
<p>（包括转码、合并、压缩）  <a href="https://npm.taobao.org/package/gulp-babel" rel="nofollow noreferrer" target="_blank">gulp-babel</a> <a href="https://npm.taobao.org/package/babel-preset-es2015" rel="nofollow noreferrer" target="_blank">babel-preset-es2015</a> <a href="https://npm.taobao.org/package/gulp-concat" rel="nofollow noreferrer" target="_blank">gulp-concat</a> <a href="https://npm.taobao.org/package/gulp-uglify" rel="nofollow noreferrer" target="_blank">gulp-uglify</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task(transformJs, function () {
  return gulp.src(&quot;src/*.js&quot;)
      .pipe(react())
      .pipe(babel(
          {
              presets: [&quot;babel-preset-es2015&quot;]
          }
      ))
      .pipe(concat('bundle.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(&quot;./dist&quot;))
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">gulp</span><span class="hljs-selector-class">.task</span>(transformJs, function () {
  <span class="hljs-selector-tag">return</span> <span class="hljs-selector-tag">gulp</span><span class="hljs-selector-class">.src</span>(<span class="hljs-string">"src/*.js"</span>)
      <span class="hljs-selector-class">.pipe</span>(react())
      <span class="hljs-selector-class">.pipe</span>(babel(
          {
              <span class="hljs-attribute">presets</span>: [<span class="hljs-string">"babel-preset-es2015"</span>]
          }
      ))
      <span class="hljs-selector-class">.pipe</span>(concat(<span class="hljs-string">'bundle.min.js'</span>))
      <span class="hljs-selector-class">.pipe</span>(uglify())
      <span class="hljs-selector-class">.pipe</span>(gulp.dest(<span class="hljs-string">"./dist"</span>))
});</code></pre>
<h3 id="articleHeader28">2. 处理scss</h3>
<p>(包括转码、合并、压缩)  <a href="https://npm.taobao.org/package/gulp-sass" rel="nofollow noreferrer" target="_blank">gulp-sass</a>  <a href="https://npm.taobao.org/package/gulp-concat" rel="nofollow noreferrer" target="_blank">gulp-concat</a> <a href="https://npm.taobao.org/package/gulp-uglify" rel="nofollow noreferrer" target="_blank">gulp-uglify</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // scss
  gulp.task(transformSass, function () {
      return gulp.src(&quot;src/css/*.scss&quot;)
          .pipe(sass())
          .pipe(gulp.dest(&quot;./dist&quot;))
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>  <span class="hljs-comment">// scss</span>
  gulp.task(transformSass, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">"src/css/*.scss"</span>)
          .pipe(sass())
          .pipe(gulp.dest(<span class="hljs-string">"./dist"</span>))
  });</code></pre>
<h3 id="articleHeader29">3. 处理less</h3>
<p>(包括转码、合并、压缩)  <a href="https://npm.taobao.org/package/gulp-less" rel="nofollow noreferrer" target="_blank">gulp-less</a>  <a href="https://npm.taobao.org/package/gulp-concat" rel="nofollow noreferrer" target="_blank">gulp-concat</a> <a href="https://npm.taobao.org/package/gulp-uglify" rel="nofollow noreferrer" target="_blank">gulp-uglify</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // less
  gulp.task(transformLess, function () {
    return gulp.src(&quot;src/css/*.less&quot;)
        .pipe(less())
        .pipe(gulp.dest(&quot;./dist&quot;))
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>  <span class="hljs-comment">// less</span>
  gulp.task(transformLess, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">"src/css/*.less"</span>)
        .pipe(less())
        .pipe(gulp.dest(<span class="hljs-string">"./dist"</span>))
  });</code></pre>
<h3 id="articleHeader30">4. 测试</h3>
<p><a href="https://npm.taobao.org/package/gulp-jasmine" rel="nofollow noreferrer" target="_blank">gulp-jasmine</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // jasmine
  gulp.task(test, function () {
      return gulp.src(&quot;./test/*.js&quot;)
          .pipe(jasmine())
  });

  //测试文件 test.spec.js
  describe('test one', function () {
      it('test', function () {
          expect(true).toBe(true);
      })
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>  <span class="hljs-comment">// jasmine</span>
  gulp.task(test, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">"./test/*.js"</span>)
          .pipe(jasmine())
  });

  <span class="hljs-comment">//测试文件 test.spec.js</span>
  describe(<span class="hljs-string">'test one'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      it(<span class="hljs-string">'test'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
          expect(<span class="hljs-literal">true</span>).toBe(<span class="hljs-literal">true</span>);
      })
  });</code></pre>
<h3 id="articleHeader31">5. 清理</h3>
<p><a href="https://npm.taobao.org/package/gulp-clean" rel="nofollow noreferrer" target="_blank">gulp-clean</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('clean', function () {
  return gulp.src(config.dist + '/*', {read: false})
      .pipe(clean());
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>gulp.task(<span class="hljs-string">'clean'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span> {
  <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-built_in">config</span>.dist + <span class="hljs-string">'/*'</span>, {<span class="hljs-built_in">read</span>: <span class="hljs-literal">false</span>})
      .pipe(clean());
});</code></pre>
<h3 id="articleHeader32">6. 热加载</h3>
<p><a href="https://npm.taobao.org/package/gulp-util" rel="nofollow noreferrer" target="_blank">gulp-util</a> <a href="https://npm.taobao.org/package/gulp-watch" rel="nofollow noreferrer" target="_blank">gulp-watch</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var util = require('gulp-util');
  var watch = require('gulp-watch');
  var config = {};
  config.dist = 'dist';
  config.static = [
    'bin/**/*',
    'package.json'
  ];
  // sync static resource in production mode
  gulp.task('static-sync', function () {
    return gulp.src(config.static, {base: './'})
        .pipe(gulp.dest(config.dist));
  });

  gulp.task('static-sync:dev', ['static-sync'], function () {
    util.log('[Sync] starting file watch');
    return watch(config.static, function (obj) {
      if (obj.event === 'change' || obj.event === 'add')
        return gulp.src(obj.path, {base: './'})
            .pipe(gulp.dest(config.dist))
            .pipe(print(function () {
              return '[Sync] file sync success: ' + obj.path.replace(obj.base, '');
            }));
      else if (obj.event === 'unlink') {
        var distFilePath = obj.path.replace(__dirname, __dirname + '/' + config.dist);
        return gulp.src(distFilePath)
            .pipe(clean())
            .pipe(print(function () {
              return '[Sync] file remove success: ' + obj.path.replace(obj.base, '');
            }));
      }
    });
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>  var util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-util'</span>);
  var watch = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-watch'</span>);
  var <span class="hljs-built_in">config</span> = {};
  <span class="hljs-built_in">config</span>.dist = <span class="hljs-string">'dist'</span>;
  <span class="hljs-built_in">config</span>.static = [
    <span class="hljs-string">'bin/**/*'</span>,
    <span class="hljs-string">'package.json'</span>
  ];
  // sync static resource <span class="hljs-keyword">in</span> production mode
  gulp.task(<span class="hljs-string">'static-sync'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-built_in">config</span>.static, {base: <span class="hljs-string">'./'</span>})
        .pipe(gulp.dest(<span class="hljs-built_in">config</span>.dist));
  });

  gulp.task(<span class="hljs-string">'static-sync:dev'</span>, [<span class="hljs-string">'static-sync'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span> {
    util.log(<span class="hljs-string">'[Sync] starting file watch'</span>);
    <span class="hljs-keyword">return</span> watch(<span class="hljs-built_in">config</span>.static, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(obj)</span></span> {
      <span class="hljs-keyword">if</span> (obj.event === <span class="hljs-string">'change'</span> || obj.event === <span class="hljs-string">'add'</span>)
        <span class="hljs-keyword">return</span> gulp.src(obj.path, {base: <span class="hljs-string">'./'</span>})
            .pipe(gulp.dest(<span class="hljs-built_in">config</span>.dist))
            .pipe(<span class="hljs-built_in">print</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span> {
              <span class="hljs-keyword">return</span> <span class="hljs-string">'[Sync] file sync success: '</span> + obj.path.replace(obj.base, <span class="hljs-string">''</span>);
            }));
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (obj.event === <span class="hljs-string">'unlink'</span>) {
        var distFilePath = obj.path.replace(__dirname, __dirname + <span class="hljs-string">'/'</span> + <span class="hljs-built_in">config</span>.dist);
        <span class="hljs-keyword">return</span> gulp.src(distFilePath)
            .pipe(clean())
            .pipe(<span class="hljs-built_in">print</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span> {
              <span class="hljs-keyword">return</span> <span class="hljs-string">'[Sync] file remove success: '</span> + obj.path.replace(obj.base, <span class="hljs-string">''</span>);
            }));
      }
    });
  });
</code></pre>
<h3 id="articleHeader33">7. debug</h3>
<p><a href="https://npm.taobao.org/package/gulp-print" rel="nofollow noreferrer" target="_blank">gulp-print</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//下载
npm install gulp-print
//引用
var gulp = require('gulp');
var print = require('gulp-print');
// 注册任务
gulp.task('print', function() {
  gulp.src('test/*.js')
    .pipe(print())
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">//下载</span>
npm install gulp-<span class="hljs-keyword">print</span>
<span class="hljs-comment">//引用</span>
<span class="hljs-keyword">var</span> gulp = <span class="hljs-keyword">require</span>(<span class="hljs-string">'gulp'</span>);
<span class="hljs-keyword">var</span> <span class="hljs-keyword">print</span> = <span class="hljs-keyword">require</span>(<span class="hljs-string">'gulp-print'</span>);
<span class="hljs-comment">// 注册任务</span>
gulp.task(<span class="hljs-string">'print'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
  gulp.src(<span class="hljs-string">'test/*.js'</span>)
    .pipe(<span class="hljs-keyword">print</span>())
});</code></pre>
<h3 id="articleHeader34">8. sourceMap</h3>
<p><a href="https://npm.taobao.org/package/gulp-sourcemaps" rel="nofollow noreferrer" target="_blank">gulp-sourcemaps</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var sourcemaps = require('gulp-sourcemaps');
  // compile server script in production mode
  gulp.task('compile:server', function () {
    if (config.babel.sourceMaps){
      return gulp.src('**/*.es6', {base: './'})
          .pipe(sourcemaps.init())
          .pipe(babel(config.babel))
          .pipe(sourcemaps.write('.', {sourceRoot: '/ustar'}))
          .pipe(gulp.dest(config.dist));
    }else{
      return gulp.src('**/*.es6', {base: './'})
          .pipe(babel({
            preset:'babel-preset-es2015'
            }))
          .pipe(gulp.dest('./dist'));
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>  var sourcemaps = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-sourcemaps'</span>);
  // compile server script <span class="hljs-keyword">in</span> production mode
  gulp.task(<span class="hljs-string">'compile:server'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">config</span>.babel.sourceMaps){
      <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'**/*.es6'</span>, {base: <span class="hljs-string">'./'</span>})
          .pipe(sourcemaps.init())
          .pipe(babel(<span class="hljs-built_in">config</span>.babel))
          .pipe(sourcemaps.<span class="hljs-built_in">write</span>(<span class="hljs-string">'.'</span>, {sourceRoot: <span class="hljs-string">'/ustar'</span>}))
          .pipe(gulp.dest(<span class="hljs-built_in">config</span>.dist));
    }<span class="hljs-keyword">else</span>{
      <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'**/*.es6'</span>, {base: <span class="hljs-string">'./'</span>})
          .pipe(babel({
            preset:<span class="hljs-string">'babel-preset-es2015'</span>
            }))
          .pipe(gulp.dest(<span class="hljs-string">'./dist'</span>));
  });</code></pre>
<h3 id="articleHeader35">9. 复制静态资源</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('static-sync', function () {
    return gulp.src('src/css/*', {base: './'})
        .pipe(gulp.dest('./dist'));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>gulp.task(<span class="hljs-string">'static-sync'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'src/css/*'</span>, {base: <span class="hljs-string">'./'</span>})
        .pipe(gulp.dest(<span class="hljs-string">'./dist'</span>));
});</code></pre>
<h3 id="articleHeader36">10. 处理css雪碧图</h3>
<p><a href="https://npm.taobao.org/package/gulp-css-spriter" rel="nofollow noreferrer" target="_blank">gulp-css-spriter</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var gulp = require('gulp');
  var spriter = require('gulp-css-spriter');

  gulp.task('css', function() {
    return gulp.src('./src/css/styles.css')
        .pipe(spriter({
            // The path and file name of where we will save the sprite sheet
            'spriteSheet': './dist/images/spritesheet.png',
            // Because we don't know where you will end up saving the CSS file at this point in the pipe,
            // we need a litle help identifying where it will be.
            'pathToSpriteSheetFromCSS': '../images/spritesheet.png'
        }))
        .pipe(gulp.dest('./dist/css'));
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>);
  <span class="hljs-keyword">var</span> spriter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-css-spriter'</span>);

  gulp.task(<span class="hljs-string">'css'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'./src/css/styles.css'</span>)
        .pipe(spriter({
            <span class="hljs-comment">// The path and file name of where we will save the sprite sheet</span>
            <span class="hljs-string">'spriteSheet'</span>: <span class="hljs-string">'./dist/images/spritesheet.png'</span>,
            <span class="hljs-comment">// Because we don't know where you will end up saving the CSS file at this point in the pipe,</span>
            <span class="hljs-comment">// we need a litle help identifying where it will be.</span>
            <span class="hljs-string">'pathToSpriteSheetFromCSS'</span>: <span class="hljs-string">'../images/spritesheet.png'</span>
        }))
        .pipe(gulp.dest(<span class="hljs-string">'./dist/css'</span>));
  });</code></pre>
<h3 id="articleHeader37">11. 压缩css</h3>
<p><a href="https://npm.taobao.org/package/gulp-minify-css" rel="nofollow noreferrer" target="_blank">gulp-minify-css</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  gulp.task(gulp_minify_css,function () {
     return gulp.src('./dist/*.css')
         .pipe(print())
         .pipe(minifycss())
         .pipe(gulp.dest(config.dist))
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>  gulp.task(gulp_minify_css,<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span> {
     <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'./dist/*.css'</span>)
         .pipe(<span class="hljs-built_in">print</span>())
         .pipe(minifycss())
         .pipe(gulp.dest(<span class="hljs-built_in">config</span>.dist))
  });</code></pre>
<h3 id="articleHeader38">12. 压缩图片</h3>
<p><a href="https://npm.taobao.org/package/gulp-imagemin" rel="nofollow noreferrer" target="_blank">gulp-imagemin</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 压缩图片
  gulp.task('img', function() {
    return gulp.src('src/images/*')
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngcrush()]
      }))
      .pipe(gulp.dest('./dest/images/'))
      .pipe(notify({ message: 'img task ok' }));
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 压缩图片</span>
  <span class="hljs-selector-tag">gulp</span><span class="hljs-selector-class">.task</span>(<span class="hljs-string">'img'</span>, function() {
    <span class="hljs-selector-tag">return</span> <span class="hljs-selector-tag">gulp</span><span class="hljs-selector-class">.src</span>(<span class="hljs-string">'src/images/*'</span>)
      <span class="hljs-selector-class">.pipe</span>(imagemin({
          <span class="hljs-attribute">progressive</span>: true,
          <span class="hljs-attribute">svgoPlugins</span>: [{<span class="hljs-attribute">removeViewBox</span>: false}],
          <span class="hljs-attribute">use</span>: [pngcrush()]
      }))
      <span class="hljs-selector-class">.pipe</span>(gulp.dest(<span class="hljs-string">'./dest/images/'</span>))
      <span class="hljs-selector-class">.pipe</span>(notify({ <span class="hljs-attribute">message</span>: <span class="hljs-string">'img task ok'</span> }));
  });</code></pre>
<h3 id="articleHeader39">13. 检查js</h3>
<p><a href="https://npm.taobao.org/package/gulp-jshint" rel="nofollow noreferrer" target="_blank">gulp-jshint</a>  <a href="https://npm.taobao.org/package/jshint" rel="nofollow noreferrer" target="_blank">gulp-jshint</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 检查js
  gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(notify({ message: 'lint task ok' }));
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 检查js</span>
  <span class="hljs-selector-tag">gulp</span><span class="hljs-selector-class">.task</span>(<span class="hljs-string">'lint'</span>, function() {
    <span class="hljs-selector-tag">return</span> <span class="hljs-selector-tag">gulp</span><span class="hljs-selector-class">.src</span>(<span class="hljs-string">'src/js/*.js'</span>)
      <span class="hljs-selector-class">.pipe</span>(jshint())
      <span class="hljs-selector-class">.pipe</span>(jshint.reporter(<span class="hljs-string">'default'</span>))
      <span class="hljs-selector-class">.pipe</span>(notify({ <span class="hljs-attribute">message</span>: <span class="hljs-string">'lint task ok'</span> }));
  });</code></pre>
<h3 id="articleHeader40">14. gzip压缩</h3>
<p><a href="https://npm.taobao.org/package/gulp-gzip" rel="nofollow noreferrer" target="_blank">gulp-gzip</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var gulp = require('gulp');
  var gzip = require('gulp-gzip');

  gulp.task('compress', function() {
      gulp.src('./dev/scripts/*.js')
      .pipe(gzip())
      .pipe(gulp.dest('./public/scripts'));
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>);
  <span class="hljs-keyword">var</span> gzip = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-gzip'</span>);

  gulp.task(<span class="hljs-string">'compress'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      gulp.src(<span class="hljs-string">'./dev/scripts/*.js'</span>)
      .pipe(gzip())
      .pipe(gulp.dest(<span class="hljs-string">'./public/scripts'</span>));
  });</code></pre>
<h3 id="articleHeader41">15. 处理前缀</h3>
<p><a href="https://npm.taobao.org/package/gulp-autoprefixer" rel="nofollow noreferrer" target="_blank">gulp-autoprefixer</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var gulp = require('gulp');
  var autoprefixer = require('gulp-autoprefixer');

  gulp.task('default', function () {
    return gulp.src('src/app.css')
      .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('all.css'))
        .pipe(sourcemaps.write('.',{sourceRoot:config.dist}))
        .pipe(gulp.dest('dist'));
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>  <span class="hljs-keyword">var</span> gulp = <span class="hljs-keyword">require</span>(<span class="hljs-string">'gulp'</span>);
  <span class="hljs-keyword">var</span> autoprefixer = <span class="hljs-keyword">require</span>(<span class="hljs-string">'gulp-autoprefixer'</span>);

  gulp.task(<span class="hljs-string">'default'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> <span class="hljs-comment">{
    return gulp.src('src/app.css')
      .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }</span>))
        .<span class="hljs-title">pipe</span><span class="hljs-params">(<span class="hljs-keyword">concat</span>(<span class="hljs-string">'all.css'</span>)</span>)
        .<span class="hljs-title">pipe</span><span class="hljs-params">(sourcemaps.<span class="hljs-keyword">write</span>(<span class="hljs-string">'.'</span>,{sourceRoot:config.dist})</span>)
        .<span class="hljs-title">pipe</span><span class="hljs-params">(gulp.dest(<span class="hljs-string">'dist'</span>)</span>);</span>
  });</code></pre>
<h2 id="articleHeader42">七、项目地址</h2>
<p><a href="https://github.com/qq83387856/gulp-start-kit" rel="nofollow noreferrer" target="_blank">gulp-start-kit</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
gulp构建工具工作流

## 原文链接
[https://segmentfault.com/a/1190000005662009](https://segmentfault.com/a/1190000005662009)


---
title: 'postcss-lazysprite: 一种生成CSS 雪碧图的懒惰姿势' 
date: 2019-01-12 2:30:24
hidden: true
slug: zzked80oked
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文原文链接：<a href="https://devework.com/postcss-lazysprite.html" rel="nofollow noreferrer" target="_blank">https://devework.com/postcss-...</a>，转载请注明原始来源，谢谢！</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVPmaC?w=1692&amp;h=754" src="https://static.alili.tech/img/bVPmaC?w=1692&amp;h=754" alt="411939171020170422.png" title="411939171020170422.png" style="cursor: pointer; display: inline;"></span></p>
<p>postcss-lazysprite 是一个基于PostCSS 开发的用于生成雪碧图图片及其CSS 的插件，经过半年持续迭代，现已稳定用在微信旗下两款产品的Web 业务中。其与市面上的雪碧图插件不同在于生成雪碧图的“懒惰”姿势。</p>
<h2 id="articleHeader0">前言</h2>
<p>前端界，伴随着雪碧图这个概念出现，自动化工具产生雪碧图这类工具就层出不穷。无论是早期GUI 工具，还是现在流行的配合Gulp/Grunt/Webpack 这类构建工具而产生的雪碧图插件。总之是百花齐放，长江后浪推前浪。</p>
<p>根据输入方式的不同，现在市面上基于Node.js 的雪碧图构建工具一般可分为如下两种（如有不实，望予以指出）：</p>
<p>一种是现在国外常见的基于spritesmith 的各类通过构建工具注册任务进行合并产生雪碧图的插件，如gulp-sprite、css-sprite、sprity 等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 本段代码来自sprity 的sample
gulp.task('sprites', function () {
  return sprity.src({
    src: './src/images/**/*.{png,jpg}',
    style: './sprite.css',
    processor: 'sass',
  })
  .pipe(gulpif('*.png', gulp.dest('./dist/img/'), gulp.dest('./dist/css/')))
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 本段代码来自sprity 的sample</span>
gulp.task(<span class="hljs-string">'sprites'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> sprity.src({
    <span class="hljs-attr">src</span>: <span class="hljs-string">'./src/images/**/*.{png,jpg}'</span>,
    <span class="hljs-attr">style</span>: <span class="hljs-string">'./sprite.css'</span>,
    <span class="hljs-attr">processor</span>: <span class="hljs-string">'sass'</span>,
  })
  .pipe(gulpif(<span class="hljs-string">'*.png'</span>, gulp.dest(<span class="hljs-string">'./dist/img/'</span>), gulp.dest(<span class="hljs-string">'./dist/css/'</span>)))
});</code></pre>
<p>另一种是国内以cssgaga、<a href="https://www.npmjs.com/package/gulp-tmtsprite" rel="nofollow noreferrer" target="_blank">gulp-tmtsprite</a> 为代表的，在开发阶段是写单个小图的CSS 样式，然后也是通过构建工具的注册任务进行合并产生雪碧图的插件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 本段代码来自gulp-tmtsprite 的sample
// Input
.icon-test {
    width: 32px;
    height: 32px;
    background-image: url(../slice/test.png);
}

// Output
.icon-test {
    background-image: url(../sprite/style-index.png);
}
 
@media only screen and (-webkit-min-device-pixel-ratio: 2), 
only screen and (min--moz-device-pixel-ratio: 2), 
only screen and (-webkit-min-device-pixel-ratio: 2.5), 
only screen and (min-resolution: 240dpi) {
.icon-test { 
    background-image:url(&quot;../sprite/style-index@2x.png&quot;);
    background-position: -36px -66px;
    background-size: 32px;
}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 本段代码来自gulp-tmtsprite 的sample</span>
<span class="hljs-comment">// Input</span>
<span class="hljs-selector-class">.icon-test</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">32px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">32px</span>;
    <span class="hljs-attribute">background-image</span>: url(<span class="hljs-string">../slice/test.png</span>);
}

<span class="hljs-comment">// Output</span>
<span class="hljs-selector-class">.icon-test</span> {
    <span class="hljs-attribute">background-image</span>: url(<span class="hljs-string">../sprite/style-index.png</span>);
}
 
<span class="hljs-keyword">@media</span> only screen and (<span class="hljs-attribute">-webkit-min-device-pixel-ratio</span>: <span class="hljs-number">2</span>), 
only screen and (<span class="hljs-attribute">min--moz-device-pixel-ratio</span>: <span class="hljs-number">2</span>), 
only screen and (<span class="hljs-attribute">-webkit-min-device-pixel-ratio</span>: <span class="hljs-number">2.5</span>), 
only screen and (<span class="hljs-attribute">min-resolution</span>: <span class="hljs-number">240dpi</span>) {
<span class="hljs-selector-class">.icon-test</span> { 
    <span class="hljs-attribute">background-image</span>:url(<span class="hljs-string">"../sprite/style-index@2x.png"</span>);
    <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">36px</span> -<span class="hljs-number">66px</span>;
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">32px</span>;
}
}</code></pre>
<h2 id="articleHeader1">对比与不同</h2>
<p>各类工具本身有其合理存在的理由与最适合的使用场景，去褒贬来衬托我这个插件并不是本文的目的。如上面介绍的两种类型的插件，一种是将雪碧图合成从常规的写CSS 行为中抽离出来，一种是后编译的雪碧图合成，其使用场景各不相同。本文介绍的postcss-lazysprite，在于解决的场景是：我想在开发阶段就生成雪碧图并用上其CSS，同时我又想很方便地产生，用起来越简单越好。所谓lazysprite，就是期许一种“懒惰”的方式去生成雪碧图。</p>
<p>postcss-lazysprite 用起来就是那么简单，经过配置后，你只需要这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* ./src/css/index.css */
@lazysprite &quot;filetype&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* ./src/css/index.css */</span>
@<span class="hljs-keyword">lazysprite</span> <span class="hljs-string">"filetype"</span>;</code></pre>
<p>输出的自然是完整的雪碧图以及相应CSS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* ./dist/css/index.css */
.icon-filetype-doc {
    background-image: url(../sprites/filetype.3f1f178013.png);
    background-position: 0 0;
    width: 80px;
    height: 80px;
}

@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio:2), only screen and (-o-min-device-pixel-ratio:2/1), only screen and (min-device-pixel-ratio:2), only screen and (min-resolution:2dppx), only screen and (min-resolution:192dpi) {
    .icon-filetype-doc {
        background-image: url(../sprites/filetype@2x.cbed5ca6a9.png);
        background-position: 0 0;
        background-size: 170px 170px;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* ./dist/css/index.css */</span>
<span class="hljs-selector-class">.icon-filetype-doc</span> {
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(../sprites/filetype.3f1f178013.png);
    <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
}

@<span class="hljs-keyword">media</span> only screen and (-webkit-min-device-pixel-ratio: <span class="hljs-number">2</span>), only screen and (min--moz-device-pixel-ratio:<span class="hljs-number">2</span>), only screen and (-o-min-device-pixel-ratio:<span class="hljs-number">2</span>/<span class="hljs-number">1</span>), only screen and (min-device-pixel-ratio:<span class="hljs-number">2</span>), only screen and (min-resolution:<span class="hljs-number">2dppx</span>), only screen and (min-resolution:<span class="hljs-number">192dpi</span>) {
    <span class="hljs-selector-class">.icon-filetype-doc</span> {
        <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(../sprites/filetype@2x.cbed5ca6a9.png);
        <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
        <span class="hljs-attribute">background-size</span>: <span class="hljs-number">170px</span> <span class="hljs-number">170px</span>;
    }
}</code></pre>
<p>假设后面要新增图片到filetype 文件夹，那么直接丢进去就能自动重新合并并更新CSS；如果要新建一个与filetype 同级的文件夹（如logos），那么在需要的位置<code>@lazysprite "logos";</code>即可。一切就是那么简单，所谓lazy，即是如此。</p>
<p>如果你有用过Sass 框架Compass 的话，你会觉得跟Compass 的雪碧图产生方式是如此类似。是的，这个插件就是沿用了Compass 的雪碧图思路，甚至这个插件的的底层就是spritesmith 驱动的，而我在写这个插件的时候参考了postcss-sprite 的写法——整个插件其实是在前端开源环境下，结合自身的需求而来的产物。</p>
<h2 id="articleHeader2">介绍</h2>
<p>可能有读者看到这里还不是很清楚postcss-sprite 的运作方式。这里以Gulp 构建流为例，讲述下其运作方式。</p>
<p>假设你的项目目录如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── gulpfile.js
├── dist
└── src
    ├── css
    │   └── index.css
    ├── html
    │   └── index.html
    └── slice
        └── filetype
            ├── doc.png
            ├── doc@2x.png
            ├── pdf.png
            └── pdf@2x.png" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├── gulpfile<span class="hljs-selector-class">.js</span>
├── dist
└── src
    ├── css
    │   └── index<span class="hljs-selector-class">.css</span>
    ├── <span class="hljs-selector-tag">html</span>
    │   └── index<span class="hljs-selector-class">.html</span>
    └── slice
        └── filetype
            ├── doc<span class="hljs-selector-class">.png</span>
            ├── doc@<span class="hljs-number">2</span>x<span class="hljs-selector-class">.png</span>
            ├── pdf<span class="hljs-selector-class">.png</span>
            └── pdf@<span class="hljs-number">2</span>x.png</code></pre>
<p><code>src</code> 是放编译前的CSS（现在一般是Sass 或Less 的源文件）以及雪碧图源图（即单个小图）；<code>dist</code>则是编译后 CSS 及产生的雪碧图图片及其CSS。</p>
<p>然后在<code>gulpfile.js</code> 配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gulp = require('gulp');
var postcss = require('gulp-postcss');
var lazysprite = require('postcss-lazysprite');

gulp.task('css', function () {
    return gulp.src('./src/css/**/*.css')
        .pipe(postcss([lazysprite({
            imagePath:'./src/slice',
            stylesheetInput: './src/css',
            stylesheetRelative: './dist/css',
            spritePath: './dist/slice',
            smartUpdate: true,
            nameSpace: 'icon-'
        })]))
        .pipe(gulp.dest('./test/dist/css'));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>);
<span class="hljs-keyword">var</span> postcss = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-postcss'</span>);
<span class="hljs-keyword">var</span> lazysprite = <span class="hljs-built_in">require</span>(<span class="hljs-string">'postcss-lazysprite'</span>);

gulp.task(<span class="hljs-string">'css'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'./src/css/**/*.css'</span>)
        .pipe(postcss([lazysprite({
            <span class="hljs-attr">imagePath</span>:<span class="hljs-string">'./src/slice'</span>,
            <span class="hljs-attr">stylesheetInput</span>: <span class="hljs-string">'./src/css'</span>,
            <span class="hljs-attr">stylesheetRelative</span>: <span class="hljs-string">'./dist/css'</span>,
            <span class="hljs-attr">spritePath</span>: <span class="hljs-string">'./dist/slice'</span>,
            <span class="hljs-attr">smartUpdate</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">nameSpace</span>: <span class="hljs-string">'icon-'</span>
        })]))
        .pipe(gulp.dest(<span class="hljs-string">'./test/dist/css'</span>));
});</code></pre>
<p>上面的每个option 解释下：</p>
<p><code>imagePath</code>：雪碧图小图所在目录；<br><code>stylesheetInput</code>：CSS 文件所在的目录，一般与<code>gulp.src</code>的路径相关；<br><code>stylesheetRelative</code>：为了在生成的CSS 中构造相对路径而引入，一般与<code>gulp.dest</code>的路径相关；<br><code>spritePath</code>：生成的雪碧图放置的目录；<br><code>smartUpdate</code>： 是否启用智能更新机制，关于smartUpdate，请见下一章节的介绍。<br><code>nameSpace</code>：CSS 的命名空间。</p>
<p>注意下你的<code>gulp css</code>任务一般是<code>gulp.watch</code>以及默认任务的一部分。</p>
<p>然后你在<code>src/css/index.css</code>里面写下这段话：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@lazysprite &quot;filetype&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">@<span class="hljs-keyword">lazysprite</span> <span class="hljs-string">"filetype"</span>;</code></pre>
<p>输出内容见上一章节相同部分，就不重复了。</p>
<p><code>filetype</code>即是在<code>spritePath: './dist/slice'</code>定义的目录下的子目录，这个目录下的所有雪碧图小图会合成为一张雪碧图，图片名称默认是以<code>filetype.png</code>命名。</p>
<p>同时<code>filetype</code>也会作为生成的小图对应CSS class 的一部分。CSS class 的构成即是“命名空间+目录名+小图片名”。如<code>doc.png</code>生成的对应类名为<code>.icon-filetype-doc</code>——然后你在HTML 中引入CSS 文件，通过<code>&lt;i class="icon-filetype-doc"&gt;&lt;/i&gt;</code>用即可。</p>
<p>postcss-lazysprite 虽然是站在巨人的肩膀上的产物，但其还是有不少亮点值得一说。</p>
<h2 id="articleHeader3">亮点</h2>
<ul>
<li><p>支持 Retina 不是什么新鲜事，但postcss-lazysprite 支持<code>@2x, @3x, _2x, _3x</code>这四种后缀的 Retina 图片，而且'@'与'_'的命名完全可以混用。</p></li>
<li><p>检测到非标准 Retina 图片会予以提示，如@2x 图片非偶数尺寸的时候。</p></li>
<li><p>支持Source Map，这个不多说，之所以是基于 Postcss 开发，就是为了能支持Source Map。</p></li>
<li><p>支持<code>:hover、:active </code>这类场景，即一些如鼠标 hover 上去需要变logo 的场景。</p></li>
<li><p>采用缓存方式以及SmartUpdate 以提升运行时候的性能。如本文开头所言，postcss-lazysprite 目标是开发阶段就能用上雪碧图，所以缓存机制很重要，总不能在开发阶段每保存一次 CSS 就重新走一遍“遍历所有图片并生成雪碧图”的流程。所以只要在开发阶段没有动过图片或修改@lazysprite 的代码，除开发阶段第一次启动 Gulp 任务的时候，其它时间均不会重复运行相关流程。另外在配置了SmartUpdate后，会将生成的图片文件名加入 hash，这样下一次启动 Gulp 任务的时候，只要源图片没有变化，也不会重复雪碧图流程。</p></li>
</ul>
<h2 id="articleHeader4">更多</h2>
<p>npm 安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i postcss-lazysprite -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> postcss-lazysprite -S</code></pre>
<p>插件本身拥有近十个 opiton 方便用户根据实际需求自定义相关细节，请参考 README 。</p>
<p>postcss-lazysprite 托管到 Github 上：<a href="https://github.com/Jeff2Ma/postcss-lazysprite" rel="nofollow noreferrer" target="_blank">https://github.com/Jeff2Ma/postcss-lazysprite</a>，欢迎前往提 issues 或参与开发。<strong>当然，欢迎先送个star ~</strong></p>
<p>相关文章：</p>
<p><a href="https://devework.com/postcss-plugin-best-practice.html" rel="nofollow noreferrer" target="_blank">从0到1：PostCSS 插件开发最佳实践</a></p>
<p><a href="https://devework.com/postcss-lazyimagecss.html" rel="nofollow noreferrer" target="_blank">PostCSS 插件postcss-lazyimagecss：自动填写width / height 属性</a></p>
<blockquote><p>本文原文链接：<a href="https://devework.com/postcss-lazysprite.html" rel="nofollow noreferrer" target="_blank">https://devework.com/postcss-...</a>，转载请注明原始来源，谢谢！</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
postcss-lazysprite: 一种生成CSS 雪碧图的懒惰姿势

## 原文链接
[https://segmentfault.com/a/1190000009817616](https://segmentfault.com/a/1190000009817616)


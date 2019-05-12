---
title: '应该了解的 Web 图标解决方案' 
date: 2019-02-09 2:30:59
hidden: true
slug: ocodi9lc9i
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000006774999" src="https://static.alili.tech/img/remote/1460000006774999" alt="" title="" style="cursor: pointer; display: inline;"></span><br><strong>A picture is worth a thousand words, 一图胜千言。</strong> 没错，从 Web 诞生的那天开始，图标就成为视觉层面不可或缺的一个元素，在一个 Web 页面中，一个图标不仅仅能从视觉上带来优雅感，更重要的是，它对此处的功能起到了点睛之笔的作用，它会使得用户更容易理解你的产品。那么，在我们当下的 Web 前端开发中，最常见的图标解决方案有哪些呢？大概是三种，图片、IconFont 和 Svg。图片就不说了，就是整一坨小的 png 图片作为图标，最终把他们合在一个图片里，此种技术还有一个好听的名字 <code>CSS Sprites</code>，国人称为 <code>雪碧图</code>，此种方案还是 Web 前端性能优化军规之一，降低 http 请求数来达到提速的目的。</p>
<p>图片咱们今天不说了，没啥意思。咱们今天聊聊 IconFont 和 inline SVG，然后把这两个方案的优劣进行一个对比，然后再介绍介绍常见的 IconFont 库及 inline SVG 的库，最后再展示一个小 Demo 给大家看一看具体在页面上 IconFont 和 Svg 有什么不同。</p>
<h2 id="articleHeader0">IconFont 介绍</h2>
<p>IconFont 使用的技术是 CSS 自定义字体，用户可以把图标集合打包成字体文件 ( <a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">如何打包，可使用 iconfont.cn</a> )，然后通过 @font-face 来自定义一个字体，最后通过设置 <code>font-family</code> 以及通过使用图标字体的 <code>unicode编码</code> 来使用图标。</p>
<p>在 CSS 里声明字体，编写 unicode 编码对应的图标：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@font-face {
  font-family: 'FontAwesome';
  src: url('../fonts/fontawesome-webfont.eot?v=4.6.3');
  src: url('../fonts/fontawesome-webfont.eot?#iefix&amp;v=4.6.3') format('embedded-opentype'),         
        url('../fonts/fontawesome-webfont.woff2?v=4.6.3') format('woff2'), 
        url('../fonts/fontawesome-webfont.woff?v=4.6.3') format('woff'), 
        url('../fonts/fontawesome-webfont.ttf?v=4.6.3') format('truetype'), 
        url('../fonts/fontawesome-webfont.svg?v=4.6.3#fontawesomeregular') format('svg');
  font-weight: normal;
  font-style: normal;
}

.fa {
 font-family: 'FontAwesome';
 display: inline-block;
}

.fa-icon:after {
  content: '\f00c'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">font-face</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'FontAwesome'</span>;
  <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'../fonts/fontawesome-webfont.eot?v=4.6.3'</span>);
  <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'../fonts/fontawesome-webfont.eot?#iefix&amp;v=4.6.3'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'embedded-opentype'</span>),         
        <span class="hljs-built_in">url</span>(<span class="hljs-string">'../fonts/fontawesome-webfont.woff2?v=4.6.3'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'woff2'</span>), 
        <span class="hljs-built_in">url</span>(<span class="hljs-string">'../fonts/fontawesome-webfont.woff?v=4.6.3'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'woff'</span>), 
        <span class="hljs-built_in">url</span>(<span class="hljs-string">'../fonts/fontawesome-webfont.ttf?v=4.6.3'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'truetype'</span>), 
        <span class="hljs-built_in">url</span>(<span class="hljs-string">'../fonts/fontawesome-webfont.svg?v=4.6.3#fontawesomeregular'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'svg'</span>);
  <span class="hljs-attribute">font-weight</span>: normal;
  <span class="hljs-attribute">font-style</span>: normal;
}

<span class="hljs-selector-class">.fa</span> {
 <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'FontAwesome'</span>;
 <span class="hljs-attribute">display</span>: inline-block;
}

<span class="hljs-selector-class">.fa-icon</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">'\f00c'</span>
}</code></pre>
<p>在 HTML 里这么写就可以了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<i class=&quot;fa-icon&quot;></i>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa-icon"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></code></pre>
<p>IconFont 有大量的开源解决方案，而且有很多现成的图标，比较具有代表性的如下：</p>
<ul>
<li><p><a href="https://github.com/FortAwesome/Font-Awesome" rel="nofollow noreferrer" target="_blank">FontAwesome</a>，具备完善大量的图标库，对于定制化程度不高的项目，可以直接拿过来用</p></li>
<li><p><a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">Iconfont.cn</a>，阿里的解决方案，不但有现成的图标供你选择，还可以上传自己的图标来制作 IconFont</p></li>
</ul>
<p>IconFont 的最大的好处就是浏览器兼容性好（IE6+），可以通过 CSS 来控制图标大小、颜色。</p>
<h2 id="articleHeader1">inline SVG 介绍</h2>
<p>使用 IconFont 是把已有的矢量文件（通常是很多 .svg 文件）打包成字体文件，而 inline SVG 则是把 .svg 文件合并成一个大的 .svg 文件，然后在 HTML 中引用这个文件即可，具体步骤参考下面。</p>
<h3 id="articleHeader2">合并 svg</h3>
<p>在这里搞了三个 svg 文件，准备把他们合并在一起：</p>
<p>&lt;img style="display:block;width:100%;float:none;" src="<a href="http://ww4.sinaimg.cn/large/8df27f17gw1f4b11i2l79j20xe0i0acj.jpg%22/&gt;" rel="nofollow noreferrer" target="_blank">http://ww4.sinaimg.cn/large/8df27f17gw1f4b11i2l79j20xe0i0acj.jpg"/&gt;</a></p>
<h3 id="articleHeader3">SVG Symbol</h3>
<p>我这里使用的是 <a href="https://css-tricks.com/svg-symbol-good-choice-icons/" rel="nofollow noreferrer" target="_blank">svg-symbol</a> 方案来合并 svg。</p>
<blockquote><p>还有一个合并方法是 <a href="https://css-tricks.com/svg-sprites-use-better-icon-fonts/" rel="nofollow noreferrer" target="_blank">SVG defs</a>，这个比 <code>SVG Symbol</code> 要鸡肋很多，在此就不介绍了。</p></blockquote>
<p>通过使用 <a href="https://github.com/Hiswe/gulp-svg-symbols" rel="nofollow noreferrer" target="_blank">gulp-svg-symbols</a> 来把 svg 文件合并：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gulp       = require('gulp');
var svgSymbols = require('gulp-svg-symbols');

gulp.task('sprites', function () {
  return gulp.src('assets/svg/*.svg')
    .pipe(svgSymbols())
    .pipe(gulp.dest('assets'));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> gulp       = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>);
<span class="hljs-keyword">var</span> svgSymbols = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-svg-symbols'</span>);

gulp.task(<span class="hljs-string">'sprites'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'assets/svg/*.svg'</span>)
    .pipe(svgSymbols())
    .pipe(gulp.dest(<span class="hljs-string">'assets'</span>));
});</code></pre>
<p>最终得到的 svg 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; style=&quot;width:0; height:0; visibility:hidden;&quot;>
    <symbol id=&quot;circle&quot; viewBox=&quot;0 0 200 200&quot;>
      <g class=&quot;transform-group&quot;>
        <g transform=&quot;scale(0.1953125, 0.1953125)&quot;>
          <path d=&quot;...&quot; fill=&quot;#272636&quot;/>
        </g>
      </g>
    </symbol>
    <symbol id=&quot;password&quot; viewBox=&quot;0 0 200 200&quot;>
      <g class=&quot;transform-group&quot;>
        <g transform=&quot;scale(0.1953125, 0.1953125)&quot;>
          <path d=&quot;...&quot; fill=&quot;#272636&quot;/>
        </g>
      </g>
    </symbol>
    <symbol id=&quot;profile&quot; viewBox=&quot;0 0 200 200&quot;>
      <g class=&quot;transform-group&quot;>
        <g transform=&quot;scale(0.1953125, 0.1953125)&quot;>
          <path d=&quot;...&quot; fill=&quot;#272636&quot;/>
        </g>
      </g>
    </symbol>
</svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/2000/svg"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:0; height:0; visibility:hidden;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">symbol</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"circle"</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 200 200"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"transform-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">transform</span>=<span class="hljs-string">"scale(0.1953125, 0.1953125)"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">d</span>=<span class="hljs-string">"..."</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"#272636"</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">symbol</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">symbol</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 200 200"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"transform-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">transform</span>=<span class="hljs-string">"scale(0.1953125, 0.1953125)"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">d</span>=<span class="hljs-string">"..."</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"#272636"</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">symbol</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">symbol</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"profile"</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 200 200"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"transform-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">transform</span>=<span class="hljs-string">"scale(0.1953125, 0.1953125)"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">d</span>=<span class="hljs-string">"..."</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"#272636"</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">symbol</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<h3 id="articleHeader4">使用方法</h3>
<p>在 HTML 文件中声明 svg，然后通过 <code>&lt;svg&gt;&lt;use xlink:href="#id" /&gt;&lt;/svg&gt;</code> 来使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; style=&quot;width:0; height:0; visibility:hidden;&quot;>
    <symbol id=&quot;circle&quot; viewBox=&quot;0 0 200 200&quot;>
      <g class=&quot;transform-group&quot;>
        <g transform=&quot;scale(0.1953125, 0.1953125)&quot;>
          <path d=&quot;...&quot; fill=&quot;#272636&quot;/>
        </g>
      </g>
    </symbol>
    <symbol id=&quot;password&quot; viewBox=&quot;0 0 200 200&quot;>
      <g class=&quot;transform-group&quot;>
        <g transform=&quot;scale(0.1953125, 0.1953125)&quot;>
          <path d=&quot;...&quot; fill=&quot;#272636&quot;/>
        </g>
      </g>
    </symbol>
    <symbol id=&quot;profile&quot; viewBox=&quot;0 0 200 200&quot;>
      <g class=&quot;transform-group&quot;>
        <g transform=&quot;scale(0.1953125, 0.1953125)&quot;>
          <path d=&quot;...&quot; fill=&quot;#272636&quot;/>
        </g>
      </g>
    </symbol>
</svg>

<svg class=&quot;icon&quot;><use xlink:href=&quot;#profile&quot; /></svg>
<svg class=&quot;icon&quot;><use xlink:href=&quot;#password&quot; /></svg>
<svg class=&quot;icon&quot;><use xlink:href=&quot;#circle&quot; /></svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/2000/svg"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:0; height:0; visibility:hidden;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">symbol</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"circle"</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 200 200"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"transform-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">transform</span>=<span class="hljs-string">"scale(0.1953125, 0.1953125)"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">d</span>=<span class="hljs-string">"..."</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"#272636"</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">symbol</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">symbol</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 200 200"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"transform-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">transform</span>=<span class="hljs-string">"scale(0.1953125, 0.1953125)"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">d</span>=<span class="hljs-string">"..."</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"#272636"</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">symbol</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">symbol</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"profile"</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 200 200"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"transform-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">transform</span>=<span class="hljs-string">"scale(0.1953125, 0.1953125)"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">d</span>=<span class="hljs-string">"..."</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"#272636"</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">symbol</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#profile"</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#password"</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#circle"</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<p>你也可以通过 <code>&lt;svg&gt;&lt;use xlink:href="http://cdn.com/assets/symbols.svg#id" /&gt;&lt;/svg&gt;</code> 来直接使用存储在 CDN 上的 svg 文件，如果感觉每个都要写 CDN 的地址太麻烦，则可以封装 JS 工具，统一维护，统一管理。</p>
<p>inline SVG 目前没有什么特别推荐的开源解决方案，一般情况下，图标都是自己的，自己通过工具打包就已经很方便了，而且很难通过纯 CSS 或 JS 来解决，因为它跟 HTML 的关联性太大了，即使是这样，还是推荐一个库给大家了解了解：</p>
<blockquote><p><a href="https://github.com/iconic/SVGInjector" rel="nofollow noreferrer" target="_blank">SVGInjector</a></p></blockquote>
<h2 id="articleHeader5">IconFont 与 inline SVG 方案对比</h2>
<h3 id="articleHeader6">浏览器兼容性</h3>
<table>
<thead><tr>
<th>IconFont</th>
<th>inline SVG</th>
</tr></thead>
<tbody><tr>
<td><code>IE6+</code></td>
<td>IE9+ , Android 3.0+ 移动端支持很好，现在可以使用</td>
</tr></tbody>
</table>
<h3 id="articleHeader7">尺寸、颜色是否容易控制</h3>
<table>
<thead><tr>
<th>IconFont</th>
<th>inline SVG</th>
</tr></thead>
<tbody><tr>
<td>浏览器会认为它是一个字体，因此只能使用 color 和 font-size 控制，而且尺寸特别不精细</td>
<td><code>支持多色、局部颜色控制、控制尺寸使用 width 和 height</code></td>
</tr></tbody>
</table>
<h3 id="articleHeader8">访问的稳定性</h3>
<table>
<thead><tr>
<th>IconFont</th>
<th>inline SVG</th>
</tr></thead>
<tbody><tr>
<td>Font 在 CDN 上会有跨域问题；而且字体下载不下来是很常见的事；还有一些<a href="http://blog.typekit.com/2014/02/04/chrome-bug-affecting-web-fonts/" rel="nofollow noreferrer" target="_blank">已知的Chrome的Bug</a> ；貌似代理性质的浏览器，像 UC ，就不支持自定义 Font；一些浏览器拦截插件会拦截自定义字体......</td>
<td><code>Svg很正常</code></td>
</tr></tbody>
</table>
<h3 id="articleHeader9">语义化</h3>
<table>
<thead><tr>
<th>IconFont</th>
<th>inline SVG</th>
</tr></thead>
<tbody><tr>
<td>根本不语义化，你要写多余没有意义的标签，对 SEO 很不利</td>
<td><code>Svg 是图形，人家就是图形，而且 SVG Symbol 支持 title 和 description 属性，非常友好 </code></td>
</tr></tbody>
</table>
<h3 id="articleHeader10">用起来是否顺滑</h3>
<table>
<thead><tr>
<th>IconFont</th>
<th>inline SVG</th>
</tr></thead>
<tbody><tr>
<td>自己生成 svg 然后使用工具打包成多个字体文件，然后用 unicode 对应使用</td>
<td><code>SVG Symbol 使用打包工具生成 SVG 集合，直接通过 ID 使用</code></td>
</tr></tbody>
</table>
<h2 id="articleHeader11">IconFont 与 SVG 的 Demo</h2>
<p><a href="http://codepen.io/lpgray/pen/xOxEWY" rel="nofollow noreferrer" target="_blank">请去我的CodePen</a><button class="btn btn-xs btn-default ml10 preview" data-url="lpgray/pen/xOxEWY" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader12">总结</h2>
<p>如果，你的产品需要支持 IE8 及以下，还是推荐使用 IconFont ，因为使用 SVG Symbol 的话，你需要考虑在低端浏览器下的兼容性，常见的做法是，生成一些 png 的图片做 fallback，然后在低端浏览器下显示，把 svg 隐藏.....</p>
<p>如果，你只需要考虑 IE9+ 和 Android 3.0 + ，毫无疑问，inline SVG 是唯一选择！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
应该了解的 Web 图标解决方案

## 原文链接
[https://segmentfault.com/a/1190000005555786](https://segmentfault.com/a/1190000005555786)


---
title: 'Web-Fontmin -- 在线提取你需要的字体' 
date: 2019-02-13 2:31:22
hidden: true
slug: s89khc8ru4l
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">关于@font-face</h1>
<p><strong><a href="http://www.w3.org/TR/css3-fonts/" rel="nofollow noreferrer" target="_blank">@font-face</a></strong>是<a href="http://www.w3.org/TR/CSS/#css3" rel="nofollow noreferrer" target="_blank">CSS3</a>中的一个模块，使用 @font-face 可以自定义网页字体，即使用户的电脑没有安装某种字体。怎么用 @font-face 呢？你可能见过类似下面的代码片段，它可以让 @font-face 兼容所有浏览器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@font-face {
    font-family: &quot;SentyZHAO&quot;;
    src: url(&quot;/fonts/SentyZHAO.eot&quot;); /* IE9 */
    src: url(&quot;/fonts/SentyZHAO.eot?#iefix&quot;) format(&quot;embedded-opentype&quot;), /* IE6-IE8 */
    url(&quot;/fonts/SentyZHAO.woff&quot;) format(&quot;woff&quot;), /* chrome, firefox */
    
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url(&quot;/fonts/SentyZHAO.ttf&quot;) format(&quot;truetype&quot;), 
    url(&quot;/fonts/SentyZHAO.svg#SentyZHAO&quot;) format(&quot;svg&quot;); /* iOS 4.1- */
    font-style: normal;
    font-weight: normal;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">font-face</span> {
    <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"SentyZHAO"</span>;
    <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"/fonts/SentyZHAO.eot"</span>); <span class="hljs-comment">/* IE9 */</span>
    <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"/fonts/SentyZHAO.eot?#iefix"</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">"embedded-opentype"</span>), <span class="hljs-comment">/* IE6-IE8 */</span>
    <span class="hljs-built_in">url</span>(<span class="hljs-string">"/fonts/SentyZHAO.woff"</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">"woff"</span>), <span class="hljs-comment">/* chrome, firefox */</span>
    
    <span class="hljs-comment">/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */</span>
    <span class="hljs-built_in">url</span>(<span class="hljs-string">"/fonts/SentyZHAO.ttf"</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">"truetype"</span>), 
    <span class="hljs-built_in">url</span>(<span class="hljs-string">"/fonts/SentyZHAO.svg#SentyZHAO"</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">"svg"</span>); <span class="hljs-comment">/* iOS 4.1- */</span>
    <span class="hljs-attribute">font-style</span>: normal;
    <span class="hljs-attribute">font-weight</span>: normal;
}</code></pre>
<h1 id="articleHeader1">Webfont Generator - Font Squirrel</h1>
<p>在上面的代码片段可以看出，要兼容性好的使用 @font-face，我们同时需要 eot 、woff、ttf、svg 格式的字体。常用的工具是 <a href="http://www.fontsquirrel.com/fontface/generator" rel="nofollow noreferrer" target="_blank">fontsquirrel</a>，一个字体生成器，可以在线生成  eot 、woff、ttf、svg 格式的字体，相信很多前端用过，具体用法可以官网试试。</p>
<h1 id="articleHeader2">Fontmin</h1>
<p>第一个纯 JavaScript 字体子集化方案，一个百度出品的优秀工具。<br>Fontmin 有什么用呢？</p>
<blockquote><p>提供了&nbsp;ttf子集化，eot/woff/svg格式转换，css生成 等功能，助推 webfont 发展，提升网页文字体验。</p></blockquote>
<p>上面是官方的说法，通俗地理解有3个作用：</p>
<ol>
<li><p>提取部分字体</p></li>
<li><p>转换字体格式</p></li>
<li><p>生成 webfont 和对应 CSS 样式</p></li>
</ol>
<h2 id="articleHeader3">Fontmin 应用场景</h2>
<p>有时候，我们想给网站的 Logo 、 Slogan 、标题、活动页等的中文自定义字体，我们可以使用 @font-face 引入 Web 字体，但是完整的中文字体库都是 8M 10M ，加载性能非常差，所以我们提取部分我们使用到的字体，这样可以把字体文件变成几KB。</p>
<h2 id="articleHeader4">Fontmin 用法</h2>
<p>Fontmin 的用法很简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Fontmin = require('fontmin');

var fontmin = new Fontmin()
    .src('fonts/*.ttf')
    .dest('build/fonts');

fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }

    console.log(files[0]);
    // => { contents: <Buffer 00 01 00 ...> }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Fontmin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fontmin'</span>);

<span class="hljs-keyword">var</span> fontmin = <span class="hljs-keyword">new</span> Fontmin()
    .src(<span class="hljs-string">'fonts/*.ttf'</span>)
    .dest(<span class="hljs-string">'build/fonts'</span>);

fontmin.run(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, files</span>) </span>{
    <span class="hljs-keyword">if</span> (err) {
        <span class="hljs-keyword">throw</span> err;
    }

    <span class="hljs-built_in">console</span>.log(files[<span class="hljs-number">0</span>]);
    <span class="hljs-comment">// =&gt; { contents: &lt;Buffer 00 01 00 ...&gt; }</span>
});</code></pre>
<p>详细介绍和用法可以看这篇文章： <a href="http://efe.baidu.com/blog/fontmin-getting-started/" rel="nofollow noreferrer" target="_blank">http://efe.baidu.com/blog/fontmin-getting-started/</a></p>
<h2 id="articleHeader5">基于 Fontmin 的工具</h2>
<ul>
<li><p><strong><a href="https://github.com/ecomfe/fontmin-app" rel="nofollow noreferrer" target="_blank">fontmin-app</a></strong> - Fontmin 桌面版 App，需下载安装使用</p></li>
<li><p><strong><a href="https://github.com/ecomfe/gulp-fontmin" rel="nofollow noreferrer" target="_blank">gulp-fontmin</a></strong> - Fontmin 的 Gulp 插件</p></li>
<li><p><strong><a href="https://github.com/aui/font-spider" rel="nofollow noreferrer" target="_blank">font-spider</a></strong> - 自动分析页面使用的 WebFont 并进行按需压缩</p></li>
</ul>
<h1 id="articleHeader6">Web-fontmin</h1>
<p>好吧，扯了这么多，终于到文章的主题。</p>
<p>Web-fontmin 不是什么高大上的东西，一个基于 Fontmin 构建的字体工具，它的用处只有两个：</p>
<ol>
<li><p>提取字体</p></li>
<li><p>字体格式转换</p></li>
</ol>
<p>通俗的理解，Web-fontmin 是一个这样的工具：Squirrel + fontmin-app，他是两者的结合体。</p>
<p>Squirrel 只有单纯的生成不同格式的webfont，且不支持中文。Web-fontmin不单止可以转换格式同时支持中文，还可以提取字体，并且有更快的上传和转换速度。</p>
<p>Fontmin-app 主要作用是提取字体，需要下载安装，且不支持Linux。Web-Fontmin 拥有Fontmin-app的所有功能，并且在线即可用。</p>
<p>使用Web-fontmin：<a href="http://fontmin.forsigner.com/" rel="nofollow noreferrer" target="_blank">http://fontmin.forsigner.com/</a></p>
<p>Github 地址：<strong><a href="https://github.com/forsigner/web-fontmin" rel="nofollow noreferrer" target="_blank">web-fontmin</a></strong></p>
<p>网页效果：</p>
<p><span class="img-wrap"><img data-src="http://forsigner.com/images/web-fontmin/page-1.png" src="https://static.alili.techhttp://forsigner.com/images/web-fontmin/page-1.png" alt="page-1" title="page-1" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="http://forsigner.com/images/web-fontmin/page-2.png" src="https://static.alili.techhttp://forsigner.com/images/web-fontmin/page-2.png" alt="page-2" title="page-2" style="cursor: pointer;"></span></p>
<h1 id="articleHeader7">常用免费字体网站</h1>
<p>推荐几个常用的字体下载王章：</p>
<ul>
<li><p><a href="https://www.google.com/fonts/" rel="nofollow noreferrer" target="_blank">Google fonts</a></p></li>
<li><p><a href="http://www.dafont.com/" rel="nofollow noreferrer" target="_blank">Dafont</a></p></li>
<li><p><a href="https://typekit.com/" rel="nofollow noreferrer" target="_blank">Typekit</a></p></li>
</ul>
<p>博客原文：<a href="http://forsigner.com/2016/03/13/web-fontmin/" rel="nofollow noreferrer" target="_blank">http://forsigner.com/2016/03/13/web-fontmin/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web-Fontmin -- 在线提取你需要的字体

## 原文链接
[https://segmentfault.com/a/1190000004600376](https://segmentfault.com/a/1190000004600376)


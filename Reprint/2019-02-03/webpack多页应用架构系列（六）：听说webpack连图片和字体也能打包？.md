---
title: 'webpack多页应用架构系列（六）：听说webpack连图片和字体也能打包？' 
date: 2019-02-03 2:30:40
hidden: true
slug: l20zu13qrog
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<code>https://segmentfault.com/a/1190000006907701</code><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>上一篇<a href="https://segmentfault.com/a/1190000006897458" target="_blank">《听说webpack连less/css也能打包？》</a>说到使用loader来加载CSS，这一篇来讲讲如何<strong>笼统</strong>地加载其它类型的资源。为什么强调是<strong>“笼统”</strong>呢？这是因为本文介绍的方法并不针对任何类型的资源，这意味着，什么类型的资源都能用，但效果也都只是有限的。</p>
<h2 id="articleHeader1">用的什么loader呢？</h2>
<p>本文介绍俩loader：file-loader和url-loader。</p>
<h3 id="articleHeader2"><code>file-loader</code></h3>
<p>file-loader的主要功能是：把源文件迁移到指定的目录（可以简单理解为从源文件目录迁移到<code>build</code>目录），并返回新文件的路径（简单拼接而成）。</p>
<p>file-loader需要传入<code>name</code>参数，该参数接受以下变量（以下讨论的前提是：源文件<code>src/public-resource/imgs/login-bg.jpg</code>;在根目录内执行<code>webpack</code>命令，也就是当前的上下文环境与<code>src</code>目录同级）：</p>
<ul>
<li>[ext]：文件的后缀名，示例为'jpg'。</li>
<li>[name]：文件名本身，示例为'login-bg'。</li>
<li>[path]：相对于当前执行webpack命令的目录的相对路径（不含文件名本身），示例为'src/public-resource/imgs/'。这个参数我感觉用处不大，除非你想把迁移后的文件放回源文件的目录或其子目录里。</li>
<li>[hash]：源文件内容的hash，用于<strong>缓存解决方案</strong>。</li>
</ul>
<p>我的做法是，<code>require('!file-loader?name=static/images/[name].[ext]!../imgs/login-bg.jpg')</code>，这样<code>login-bg.jpg</code>的路径就变成<code>static/images/login-bg.jpg</code>了，注意这还不是完整的路径，最终还是要拼上webpack配置中的<code>output.publicPath</code>参数的；比如说我的<code>output.publicPath</code>参数是<code>../../../../build/</code>，那么最终从<code>require()</code>里获得的完整路径就会是<code>../../../../build/static/images/login-bg.jpg</code>了。</p>
<h3 id="articleHeader3"><code>url-loader</code></h3>
<p>url-loader的主要功能是：将源文件转换成DataUrl(声明文件mimetype的base64编码)。据我所知，在前端范畴里，图片和字体文件的DataUrl都是可以被浏览器所识别的，因此可以把图片和字体都转化成DataUrl收纳在HTML/CSS/JS文件里，以减少HTTP连接数。</p>
<p>url-loader主要接受以下参数：</p>
<ul>
<li>limit参数，数据类型为整型，表示<em>目标文件的体积</em>大于多少<strong>字节</strong>就换用file-loader来处理了，不填则永远不会交给file-loader处理。例如<code>require("url?limit=10000!./file.png");</code>，表示如果目标文件大于10000字节，就交给file-loader处理了。</li>
<li>mimetype参数，前面说了，DataUrl是需要声明文件的mimetype的，因此我们可以通过这个参数来强行设置mimetype，不填写的话则默认从目标文件的后缀名进行判断。例如<code>require("url?mimetype=image/png!./file.jpg");</code>，强行把jpg当png使哈。</li>
<li>一切file-loader的参数，这些参数会在启用file-loader时传参给file-loader，比如最重要的name参数。</li>
</ul>
<h2 id="articleHeader4">实操演示</h2>
<p>接下来还是用我的脚手架项目<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">webpack-seed</a>来介绍如何利用url-loader和file-loader来加载各类资源。</p>
<h3 id="articleHeader5">图片</h3>
<p>这一块我是直接在webpack配置文件里设置的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        {
          // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
          // 如下配置，将小于8192byte的图片转成base64码
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader?limit=8192&amp;name=./static/img/[hash].[ext]',
        }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">        {
          <span class="hljs-comment">// 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求</span>
          <span class="hljs-comment">// 如下配置，将小于8192byte的图片转成base64码</span>
          test: <span class="hljs-regexp">/\.(png|jpg|gif)$/</span>,
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader?limit=8192&amp;name=./static/img/[hash].[ext]'</span>,
        },</code></pre>
<p>由于使用了[hash]，因此即便是不同页面引用了相同名字但实际内容不同的图片，也不会造成“覆盖”的情况出现；进一步讲，如果不同页面引用了在不同位置但实际内容相同的图片，这还可以归并成一张图片，方便浏览器缓存呢。</p>
<h3 id="articleHeader6">字体文件</h3>
<p>这一块我也还是直接在webpack配置里配置的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        {
          // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
          test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
          loader: 'file?name=./static/fonts/[name].[ext]',
        }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">        {
          <span class="hljs-comment">// 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到</span>
          test: <span class="hljs-regexp">/\.(woff|woff2|svg|eot|ttf)\??.*$/</span>,
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'file?name=./static/fonts/[name].[ext]'</span>,
        },</code></pre>
<p>需要声明的是，由于我使用的是阿里妈妈的iconfont方案，此方案加载字体文件的方式有一点点特殊，所以正则匹配的时候要注意一点，iconfont的CSS是这样的，你们看看就明白了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@font-face {font-family: &quot;iconfont&quot;;
  src: url('iconfont.eot?t=1473142795'); /* IE9*/
  src: url('iconfont.eot?t=1473142795#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('iconfont.woff?t=1473142795') format('woff'), /* chrome, firefox */
  url('iconfont.ttf?t=1473142795') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('iconfont.svg?t=1473142795#iconfont') format('svg'); /* iOS 4.1- */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">font-face</span> {<span class="hljs-attribute">font-family</span>: <span class="hljs-string">"iconfont"</span>;
  <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'iconfont.eot?t=1473142795'</span>); <span class="hljs-comment">/* IE9*/</span>
  <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'iconfont.eot?t=1473142795#iefix'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'embedded-opentype'</span>), <span class="hljs-comment">/* IE6-IE8 */</span>
  <span class="hljs-built_in">url</span>(<span class="hljs-string">'iconfont.woff?t=1473142795'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'woff'</span>), <span class="hljs-comment">/* chrome, firefox */</span>
  <span class="hljs-built_in">url</span>(<span class="hljs-string">'iconfont.ttf?t=1473142795'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'truetype'</span>), <span class="hljs-comment">/* chrome, firefox, opera, Safari, Android, iOS 4.2+*/</span>
  <span class="hljs-built_in">url</span>(<span class="hljs-string">'iconfont.svg?t=1473142795#iconfont'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'svg'</span>); <span class="hljs-comment">/* iOS 4.1- */</span>
}</code></pre>
<h3 id="articleHeader7">其它资源</h3>
<p>也许你会问，我们为什么还需要转移其它资源呢？直接引用不就可以了吗？</p>
<p>我之前也是这么做的，直接引用源文件目录<code>src</code>里的资源，比如说<code>webuploader</code>用到的swf文件，比如说用来兼容IE而又不需要打包的js文件。但是后来我发现，这样做的话，就导致部署上线的时候要把<code>build</code>目录和<code>src</code>目录同时放上去了；而且由于<code>build</code>目录和<code>src</code>目录同级，我就只能用<code>build</code>目录和<code>src</code>目录的上一级目录作为网站的根目录了（因为如果把<code>build</code>目录设为网站，用户就读取不到<code>src</code>目录了），反正就是各种的不方便。</p>
<p>那么，我是怎么做的呢？</p>
<p>我建了一个config文件，名为<code>build-file.config.js</code>，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  js: {
    xdomain: require('!file-loader?name=static/js/[name].[ext]!../../../vendor/ie-fix/xdomain.all.js'),
    html5shiv: require('!file-loader?name=static/js/[name].[ext]!../../../vendor/ie-fix/html5shiv.min.js'),
    respond: require('!file-loader?name=static/js/[name].[ext]!../../../vendor/ie-fix/respond.min.js'),
  },
  images: {
    'login-bg': require('!file-loader?name=static/images/[name].[ext]!../imgs/login-bg.jpg'),
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">js</span>: {
    <span class="hljs-attr">xdomain</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'!file-loader?name=static/js/[name].[ext]!../../../vendor/ie-fix/xdomain.all.js'</span>),
    <span class="hljs-attr">html5shiv</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'!file-loader?name=static/js/[name].[ext]!../../../vendor/ie-fix/html5shiv.min.js'</span>),
    <span class="hljs-attr">respond</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'!file-loader?name=static/js/[name].[ext]!../../../vendor/ie-fix/respond.min.js'</span>),
  },
  <span class="hljs-attr">images</span>: {
    <span class="hljs-string">'login-bg'</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'!file-loader?name=static/images/[name].[ext]!../imgs/login-bg.jpg'</span>),
  },
};</code></pre>
<p>这个config文件起到两个作用：</p>
<ol>
<li>每次加载到这个config文件的时候，会执行那些<code>require()</code>语句，对目标文件进行转移（从<code>src</code>目录到<code>build</code>目录）。</li>
<li>调用目标文件的代码段，可以从这个config文件取出目标文件转移后的完整路径，例如我在<code>src/public-resource/components/header/html.ejs</code>里是这么用的：</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;zh-cmn-Hans&quot;>
<head>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot; />
  <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=UTF-8&quot; />
  <title><% if (pageTitle) { %> <%= pageTitle %> - <% } %> XXXX后台</title>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1,maximum-scale=1&quot; /> 
  <meta name=&quot;renderer&quot; content=&quot;webkit&quot; />

  <!--[if lt IE 10]>
    <script src=&quot;<%= BUILD_FILE.js.xdomain %>&quot; slave=&quot;<%= SERVER_API_URL %>cors-proxy.html&quot;></script>
    <script src=&quot;<%= BUILD_FILE.js.html5shiv %>&quot;></script>
  <![endif]-->
</head>
<body>
  <!--[if lt IE 9]>
    <script src=&quot;<%= BUILD_FILE.js.respond %>&quot;></script>
  <![endif]-->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code class="ejs"><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh-cmn-Hans"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=edge"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=UTF-8"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"> <span class="hljs-keyword">if</span> (pageTitle) { </span><span class="xml"><span class="hljs-tag">%&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby"> pageTitle </span><span class="xml"><span class="hljs-tag">%&gt;</span> - <span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"> } </span><span class="xml"><span class="hljs-tag">%&gt;</span> XXXX后台<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1,maximum-scale=1"</span> /&gt;</span> 
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"renderer"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"webkit"</span> /&gt;</span>

  <span class="hljs-comment">&lt;!--[if lt IE 10]&gt;
    &lt;script src="&lt;%=</span></span><span class="ruby"> BUILD_FILE.js.xdomain </span><span class="xml"><span class="hljs-comment">%&gt;" slave="&lt;%=</span></span><span class="ruby"> SERVER_API_URL </span><span class="xml"><span class="hljs-comment">%&gt;cors-proxy.html"&gt;&lt;/script&gt;
    &lt;script src="&lt;%=</span></span><span class="ruby"> BUILD_FILE.js.html5shiv </span><span class="xml"><span class="hljs-comment">%&gt;"&gt;&lt;/script&gt;
  &lt;![endif]--&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-comment">&lt;!--[if lt IE 9]&gt;
    &lt;script src="&lt;%=</span></span><span class="ruby"> BUILD_FILE.js.respond </span><span class="xml"><span class="hljs-comment">%&gt;"&gt;&lt;/script&gt;
  &lt;![endif]--&gt;</span></span></code></pre>
<p>恩，你可能会好奇这HTML里怎么能直接引用js的值，哈哈哈，超纲了超纲了，这是我后面要讲到的内容了。</p>
<h2 id="articleHeader8">示例代码</h2>
<p>诸位看本系列文章，搭配我在Github上的脚手架项目食用更佳哦（笑）：<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed(<code>https://github.com/Array-Huang/webpack-seed</code>)</a>。</p>
<h2 id="articleHeader9">附系列文章目录（同步更新）</h2>
<ul>
<li><a href="https://segmentfault.com/a/1190000006843916">webpack多页应用架构系列（一）：一步一步解决架构痛点：<code>https://segmentfault.com/a/1190000006843916</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006863968" target="_blank">webpack多页应用架构系列（二）：webpack配置常用部分有哪些？:<code>https://segmentfault.com/a/1190000006863968</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006871991">webpack多页应用架构系列（三）：怎么打包公共代码才能避免重复？：<code>https://segmentfault.com/a/1190000006871991</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006887523" target="_blank">webpack多页应用架构系列（四）：老式jQuery插件还不能丢，怎么兼容？:<code>https://segmentfault.com/a/1190000006887523</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006897458">webpack多页应用架构系列（五）：听说webpack连less/css也能打包？:<code>https://segmentfault.com/a/1190000006897458</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006907701" target="_blank">webpack多页应用架构系列（六）：听说webpack连图片和字体也能打包？:<code>https://segmentfault.com/a/1190000006907701</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006952432">webpack多页应用架构系列（七）：开发环境、生产环境傻傻分不清楚？:<code>https://segmentfault.com/a/1190000006952432</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006992218" target="_blank">webpack多页应用架构系列（八）：教练我要写ES6！webpack怎么整合Babel？:<code>https://segmentfault.com/a/1190000006992218</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007030775">webpack多页应用架构系列（九）：总有刁民想害朕！ESLint为你阻击垃圾代码:<code>https://segmentfault.com/a/1190000007030775</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007043716" target="_blank">webpack多页应用架构系列（十）：如何打造一个自定义的bootstrap:<code>https://segmentfault.com/a/1190000007043716</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007104372">webpack多页应用架构系列（十一）：预打包Dll，实现webpack音速编译:<code>https://segmentfault.com/a/1190000007104372</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007126268" target="_blank">webpack多页应用架构系列（十二）：利用webpack生成HTML普通网页&amp;页面模板:<code>https://segmentfault.com/a/1190000007126268</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007159115">webpack多页应用架构系列（十三）：构建一个简单的模板布局系统:<code>https://segmentfault.com/a/1190000007159115</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007301770" target="_blank">webpack多页应用架构系列（十四）：No复制粘贴！多项目共用基础设施</a></li>
<li><a href="https://segmentfault.com/a/1190000008203380">webpack多页应用架构系列（十五）：论前端如何在后端渲染开发模式下夹缝生存</a></li>
<li><a href="https://segmentfault.com/a/1190000010317802" target="_blank">webpack多页应用架构系列（十六）：善用浏览器缓存，该去则去，该留则留</a></li>
</ul>
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<code>https://segmentfault.com/a/1190000006907701</code><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack多页应用架构系列（六）：听说webpack连图片和字体也能打包？

## 原文链接
[https://segmentfault.com/a/1190000006907701](https://segmentfault.com/a/1190000006907701)


---
title: '利用 webpack 处理开发与线上环境静态资源切换问题' 
date: 2019-02-02 2:30:10
hidden: true
slug: u3ldvzk86w
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>webpack，作为一个处理模块加载、资源依赖管理、构建化的工具，已经逐渐成为了前端工程化领域的新贵。其创造性的把每个静态资源归为一个 module（模块）并能被其强大的 loader 所加载的这种方式，成功的开辟了前端工程界的另一大生态。基于其官网文档的完善度较高，这篇文章就不对 webpack 的主要内容做过多的介绍，而是回归到本文的主题，即通过介绍几款 webpack 相关的插件，来解决一个常见的工程问题：如何做到静态资源路径可以在不同的环境下自动切换。</p>
<h3 id="articleHeader1">问题说明</h3>
<p>这到底是个怎样的问题？设想一下，在使用 webpack 打包编译之后，它会生成一个 js 文件，随后我们需要在 html 或者模板文件里指定这个文件的路径确保其被正确的引入，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;javascript&quot; src=&quot;app.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"app.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>对于开发环境下的单入口文件（稍后会介绍 webpack 打包到多个入口的解决方案 ）,这个标签内的引入文件路径完全可以写死，而且在 webpack-dev-server 热替换机制的帮助下，我们也无须通过对打包生成的文件添加 hash 值来处理因浏览器缓存的缘故引起的引用不到最新资源。</p>
<p>但在产品模式下，我们非常有必要在 webpack 的 output 属性里的 filename 里配置一个 <em>chunkhash</em> 来变向的为静态资源注入版本号，如下，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
 filename: [name].[chunkhash].js,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">output</span>: {
 <span class="hljs-attribute">filename</span>: [name].[chunkhash].js,
}</code></pre>
<p>以便上线之后页面可以引入版本更新后的代码。<em>chunkhash</em> 是一个基于文件内容，通过摘要算法（如md5）生成的一个被称之为<code>文件指纹</code>的序号，即只有当文件内容发生改变的时候，这个值才会相应更改。</p>
<blockquote><p>通过给静态资源注入 hash 值来作为版本号的好处主要有两个：</p></blockquote>
<ol>
<li><p>实现 <em><a href="http://webpack.github.io/docs/long-term-caching.html" rel="nofollow noreferrer" target="_blank">long term caching</a></em> 策略。当发布新版本时，我们只需要更新更改了的资源。这比起将新版资源存放在例如<code>/v1.3/xx.js</code>这种带版本号的路径或文件夹下的部署方式会显得更科学一点：减少手动配置版本号的额外操作、已经缓存过且缓存尚未过期的浏览器只需请求更新过的资源，确保未变更过的资源可以依旧从缓存内读取。</p></li>
<li><p>实现<em><a href="https://github.com/fouber/blog/issues/6" rel="nofollow noreferrer" target="_blank">非覆盖式发布</a></em>策略。<a href="https://www.zhihu.com/people/fouber" rel="nofollow noreferrer" target="_blank">张云龙</a>老师的原文中提到的这种平滑的版本升级方式更加完美的解决了静态资源部署至CDN出现的问题。</p></li>
</ol>
<p>这个时候我们再来看下线上的 script 引入,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;javascript&quot; src=&quot;http://xxx.cdn.com/app.82076244596568c8c929.js
&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://xxx.cdn.com/app.82076244596568c8c929.js
"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>Fine, 也许你会说我可以手动 copy/paste 这个版本号当你需要从开发切到产品环境，额额，单个入口文件这么处理虽是可以，但想象下当有多个入口文件的时候。。。（感觉我的左手大拇指肌腱炎又要犯了。。），这么经典的问题webpack早已准备好了它的解决方案。</p>
<h3 id="articleHeader2">从 webpack 的编译数据里获取开发与生产的资源路径对应关系</h3>
<p>这一部分的工作可以说是解决这个问题的一个核心环节，即我们需要通过 webpack 来生成类似如下一张对应关系图：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    'app.js': 'http://xxx.cdn.com/app.82076244596568c8c929.js'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs rust"><code>{
    <span class="hljs-symbol">'app</span>.js': <span class="hljs-symbol">'http</span>:<span class="hljs-comment">//xxx.cdn.com/app.82076244596568c8c929.js'</span>
}</code></pre>
<p>像在 webpack 的 plugin 属性里配置如下，我们就可以通过返回 webpack 的编译数据里获取到带有 chunkhash 的文件信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
module.exports = {
  ...
  plugins: [
    function() {
      this.plugin(&quot;done&quot;, function(stats) {
        require(&quot;fs&quot;).writeFileSync(
          path.join(__dirname, &quot;..&quot;, &quot;stats.json&quot;),
          JSON.stringify(stats.toJson()));
      });
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
  ...
  plugins: [
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">this</span>.plugin(<span class="hljs-string">"done"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">stats</span>) </span>{
        <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>).writeFileSync(
          path.join(__dirname, <span class="hljs-string">".."</span>, <span class="hljs-string">"stats.json"</span>),
          <span class="hljs-built_in">JSON</span>.stringify(stats.toJson()));
      });
    }
  ]
}</code></pre>
<p>将 <code>stats.json</code> require 到项目中，通过读取 <code>publicPath</code>、 <code>assetsByChunkName</code> 属性，可以得到开发与线上环境资源路径的对应关系。</p>
<p>webpack 官方也推荐了几个有同样效果，我个人觉得更好用的插件：<a href="https://github.com/kossnocorp/assets-webpack-plugin" rel="nofollow noreferrer" target="_blank">assets-webpack-plugin</a> 或者 <a href="https://github.com/danethurber/webpack-manifest-plugin" rel="nofollow noreferrer" target="_blank">webpack-manifest-plugin</a> 来生成出一个 JSON 对应关系文件。</p>
<h3 id="articleHeader3">切换资源路径</h3>
<p>接下来的工作基本上就是如何利用这个对应关系来切换对应环境下的路径。这个还要取决于你的页面是否会涉及到服务端的渲染。</p>
<p><strong>服务端渲染资源路径</strong></p>
<p>以 node 作为服务端语言，handlebars（或者ejs）为模板语言为例，我们通过编写模板语言的 helper 来读取由 <code>assets-webpack-plugin</code> 生成的 stats.json，在不同的环境下实现路径切换：</p>
<p>stats.json -- webpack 跑开发配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;app&quot;: {
        &quot;js&quot;: &quot;app.js&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"app"</span>: {
        <span class="hljs-attr">"js"</span>: <span class="hljs-string">"app.js"</span>
    }
}</code></pre>
<p>stats.json -- webpack 跑生产配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;app&quot;: {
        &quot;js&quot;: &quot;http://xxx.cdn.com/app.82076244596568c8c929.js&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"app"</span>: {
        <span class="hljs-attr">"js"</span>: <span class="hljs-string">"http://xxx.cdn.com/app.82076244596568c8c929.js"</span>
    }
}</code></pre>
<p>example.handlebars</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot; src=&quot;"{{"app.js"}}"&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"app.js"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>后台通过 require <code>stats.json</code> 数据并传入到模板即可实现根据环境动态渲染资源路径。</p>
<p>如果你的后台是使用 Rails 来搭建的话，那么这篇<a href="http://clarkdave.net/2015/01/how-to-use-webpack-with-rails/#including-precompiled-assets-in-views" rel="nofollow noreferrer" target="_blank">文章</a>更详细的介绍了处理这种情况下处理资源切换的问题</p>
<p><strong>前端渲染页面模板</strong></p>
<p>如果你的项目不依赖任何后端渲染，那么 <code>html-webpack-plugin</code> 这款插件可以为你动态生成一个带有 css、js 等资源路径的 html 文件。</p>
<p><code>html-webpack-plugin</code> 具体的用法可以点击<a href="https://github.com/ampedandwired/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">这里</a>，其中 <code>inject</code> 这个属性可以让你将 script 标签插入到 dom 的指定位置。为了能够更大权限的将 webpack 编译过的资源可以插入到 html 文件的任意位置，我们可以在 <code>HtmlWebpackPlugin</code> 里指定的 template 文件里写入如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <% for (var css in htmlWebpackPlugin.files.css) { %>
  <link href=&quot;<%= htmlWebpackPlugin.files.css[css] %>&quot; rel=&quot;stylesheet&quot;>
  <% } %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code><span class="xml">  <span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"> <span class="hljs-keyword">for</span> (var css <span class="hljs-keyword">in</span> htmlWebpackPlugin.files.css) { </span><span class="xml"><span class="hljs-tag">%&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%=</span></span></span><span class="ruby"> htmlWebpackPlugin.files.css[css] </span><span class="xml"><span class="hljs-tag"><span class="hljs-string">%&gt;"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"> } </span><span class="xml"><span class="hljs-tag">%&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<% for (var chunk in htmlWebpackPlugin.files.chunks) { %>
<script src=&quot;<%= htmlWebpackPlugin.files.chunks[chunk].entry %>&quot;></script>
<% } %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"> <span class="hljs-keyword">for</span> (var chunk <span class="hljs-keyword">in</span> htmlWebpackPlugin.files.chunks) { </span><span class="xml"><span class="hljs-tag">%&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"&lt;%=</span></span></span><span class="ruby"> htmlWebpackPlugin.files.chunks[chunk].entry </span><span class="xml"><span class="hljs-tag"><span class="hljs-string">%&gt;"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"> } </span><span class="xml"><span class="hljs-tag">%&gt;</span></span></code></pre>
<p>就可以同样实现静态资源的切换，所以对于前端渲染模板的这种情况，我们无须再生成一个 json 文件，对于使用诸如 react、vue 这种框架，仅使用这个插件也是极好的。</p>
<p><code>htmlWebpackPlugin</code> 具体还有哪些属性可以配置，可以参考下这个 <a href="https://github.com/jaketrent/html-webpack-template/blob/86f285d5c790a6c15263f5cc50fd666d51f974fd/index.html" rel="nofollow noreferrer" target="_blank">default template</a> 查看完整例子</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用 webpack 处理开发与线上环境静态资源切换问题

## 原文链接
[https://segmentfault.com/a/1190000007178900](https://segmentfault.com/a/1190000007178900)


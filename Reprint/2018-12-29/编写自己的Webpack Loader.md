---
title: '编写自己的Webpack Loader' 
date: 2018-12-29 2:30:10
hidden: true
slug: aucuy5cgmp
categories: [reprint]
---

{{< raw >}}

                    
<p>本文将简单介绍webpack loader，以及如何去编写一个loader来满足自身的需求，从而也能提高对webpack的认识与使用，努力进阶为webpack配置工程师。</p>
<h2 id="articleHeader0">Webpack Loader</h2>
<p><a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">webpack</a>想必前端圈的人都知道了，大多数人也都或多或少的用过。简单的说就是它能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中。可以说，它作为一个打包工具，在前端工程化浪潮中，起到了中流砥柱的作用。</p>
<p>那webpack其中非常重要的一环就是，能够对加载的资源文件，进行一些处理。比如把less、sass文件编译成css文件，负责这个处理过程的，就是webpack的loader。</p>
<blockquote><p>loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011524376?w=2148&amp;h=1104" src="https://static.alili.tech/img/remote/1460000011524376?w=2148&amp;h=1104" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>举个稍微复杂的例子，<a href="https://github.com/vuejs/vue-loader" rel="nofollow noreferrer" target="_blank">vue-loader</a>，它官网介绍如下：</p>
<blockquote><p>vue-loader 是一个 Webpack 的 loader，可以将指定格式编写的 Vue 组件转换为 JavaScript 模块。</p></blockquote>
<p>Vue组件默认分成三部分，<code>&lt;template&gt;</code>、<code>&lt;script&gt;</code> 和 <code>&lt;style&gt;</code>，我们可以把一个组件要有的html，js，css写在一个组件文件中，而<code>vue-loader</code>，会帮助我们去处理这个vue组件，把其中的html，js，css分别编译处理，最终打包成一个模块。</p>
<h2 id="articleHeader1">明确自己需要什么Loader</h2>
<p>我们知道了webpack的强大依托于一个个强大的 loader（当然还有plugin，本文就不介绍了）。如果想真的玩溜webpack，我们就必须掌握loader的使用。在我们使用它们前，我们得知道自己需要什么loader。如果想编译less，可以用<code>less-loader</code>；想加载html文件并打包它内链的静态文件，可以使用<code>html-loader</code>。只要我们想对文件进行处理时，我们都可以去找想对应的loader。</p>
<p>那么问题来了，万一找不到想要的loader该怎么办？</p>
<p>比如我前几天遇到了一个需求，我希望我加载的html文件，都嵌套在一个 layout.html 文件中。如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- layout.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>Pure Web</title>
  <meta name=viewport content=&quot;width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no&quot;>
</head>
<body>
  <header>This is Header</header>

  <!-- 我希望我webpack加载的html，都会被嵌套在这个"{{"__content__"}}"部分 -->
  "{{"__content__"}}"

  <footer>This is footer</header>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- layout.html --&gt;</span>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Pure Web<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">viewport</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>This is Header<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- 我希望我webpack加载的html，都会被嵌套在这个"{{"__content__"}}"部分 --&gt;</span>
  "{{"__content__"}}"

  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>This is footer<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>这样如果是编写多页应用，我就只需要编写唯一不一样的中心内容，而把网站公共的部分作为layout抽离开来。</p>
<p>可惜<code>html-loader</code>它只能帮我在一个html文件中去加载另外一个html文件，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
  ${require('@/htmls/header.html')}
  ${require('@/htmls/index.html')}
  ${require('@/htmls/footer.html')}
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  ${require('@/htmls/header.html')}
  ${require('@/htmls/index.html')}
  ${require('@/htmls/footer.html')}
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>这样虽然能抽离公共部分，但我依旧需要在每个html文件中去引用，而且为了保证html结构顺序，我得每个文件都再引一次<code>header</code>，<code>footer</code>，没法将他们作为一个单独的<code>layout</code>来引入。所以它并不完全符合我的需求。</p>
<p>那该怎么办，我们没有办法，只能自己动手写啊。</p>
<h2 id="articleHeader2">动手写一个webpack loader</h2>
<p>首先，我们要先阅读一遍webpack官网的介绍：<a href="https://doc.webpack-china.org/development/how-to-write-a-loader/" rel="nofollow noreferrer" target="_blank">如何编写一个loader?</a></p>
<p>看完后，我们能知道，loader本质就是接收字符串(或者buffer)，再返回处理完的字符串(或者buffer)的过程。webpack会将加载的资源作为参数传入loader方法，交于loader处理，再返回。</p>
<p>在我这个需求中，就是将我加载的html，套在我设定的layout中，再将这个处理完的html返回。大致的代码就是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// {string} source: 加载的html的字符串值
module.exports = function (source) {
  return getLayoutHtml().replace('"{{"__content__"}}"', source)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// {string} source: 加载的html的字符串值</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">source</span>) </span>{
  <span class="hljs-keyword">return</span> getLayoutHtml().replace(<span class="hljs-string">'"{{"__content__"}}"'</span>, source)
}</code></pre>
<p>简单思考后，发现可行，那么开始编写。</p>
<h3 id="articleHeader3">开始尝试</h3>
<p>所以，我们第一步，只要实现一个<code>getLayoutHtml</code>方法，能得到设定的layout.html文件就好。仔细想想，layout文件应该是通过配置声明的，然后在loader里去根据配置，调用node的api去加载文件就好。</p>
<p>查阅node与webpack文档，我们可以通过<a href="https://doc.webpack-china.org/development/how-to-write-a-loader/#-loader-utils" rel="nofollow noreferrer" target="_blank">loader-utils</a>来获取loader的配置项。通过node的<a href="http://nodejs.cn/api/fs.html#fs_fs_readfilesync_path_options" rel="nofollow noreferrer" target="_blank">fs.readFileSync</a>去加载文件，那我们的代码大概可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  const layoutHtml = fs.readFileSync(options.layout, 'utf-8')
  return layoutHtml.replace('"{{"__content__"}}"', source)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">source</span>) </span>{
  <span class="hljs-keyword">const</span> options = loaderUtils.getOptions(<span class="hljs-keyword">this</span>)
  <span class="hljs-keyword">const</span> layoutHtml = fs.readFileSync(options.layout, <span class="hljs-string">'utf-8'</span>)
  <span class="hljs-keyword">return</span> layoutHtml.replace(<span class="hljs-string">'"{{"__content__"}}"'</span>, source)
}</code></pre>
<p>webpack的config增加如下loader配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.(html)$/,
  loader: 'html-layout-loader',
  include: htmlPath, // the htmls you want inject to layout
  options: {
    layout: layoutHtmlPath // the path of default layout html
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(html)$/</span>,
  <span class="hljs-attr">loader</span>: <span class="hljs-string">'html-layout-loader'</span>,
  <span class="hljs-attr">include</span>: htmlPath, <span class="hljs-comment">// the htmls you want inject to layout</span>
  options: {
    <span class="hljs-attr">layout</span>: layoutHtmlPath <span class="hljs-comment">// the path of default layout html</span>
  }
}</code></pre>
<p>难以置信，这样就完成一个基础的<code>html-layout-loader</code>了。当然，这才是真正的开始，真正让loader变得可用，好用。我们还需要考虑很多情况。</p>
<h3 id="articleHeader4">完善自己的loader</h3>
<p>明确代码可行后，我们得完善自己的功能点，我仔细想想，大概需要考虑如下功能：</p>
<ol>
<li>针对每个加载的html，应该可以设定自己的layout文件，而不是所有的html，都必须加载同一个layout。</li>
<li>替换的占位符<code>"{{"__content__"}}"</code>也应该可以配置。</li>
</ol>
<p>另外，还需要考虑一些异常的处理，如模板文件找不到。</p>
<p>完善自身的需求后，我们又可以编写代码了，这回我就不一行行阐述代码了，直接放链接：<a href="https://github.com/wuomzfx/html-layout-loader" rel="nofollow noreferrer" target="_blank">html-layout-loader</a>。</p>
<p>代码也比较简单，算是实现了自己的基本需求，大家有兴趣的话可以先看看readme的介绍。</p>
<h2 id="articleHeader5">写在最后</h2>
<p>当我们在遇到大问题时，首先想到的总是去搜搜看有没有现成的解决方案，但现实却难免是没有解决方案。在这种情况下，我们也可以尝试着去写一些插件、组件、或者一个通用化的解决方案，来解决自身的问题，同时对自己掌握一些知识也会有帮助。而且尝试过后可能发现，它也没那么难嘛。</p>
<p>另外，如果这个<code>loader</code>，也对读者们有帮助的话，请尽情使用，有什么问题、想法可以提issue或PR。</p>
<p>--<a href="https://github.com/wuomzfx/blog/blob/master/webpack-loader.md" rel="nofollow noreferrer" target="_blank">阅读原文</a> --转载请先经过本人授权-<a href="https://zhuanlan.zhihu.com/dxyf2e" rel="nofollow noreferrer" target="_blank">丁香园F2E</a> <a href="https://www.zhihu.com/people/xiang-xue-zhang" rel="nofollow noreferrer" target="_blank">@相学长</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
编写自己的Webpack Loader

## 原文链接
[https://segmentfault.com/a/1190000011524373](https://segmentfault.com/a/1190000011524373)


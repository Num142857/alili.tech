---
title: 'Webpack 指南（整理 草稿）' 
date: 2019-02-09 2:30:58
hidden: true
slug: dsev9nv5neo
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>此篇终结，请直接看 <a href="https://doc.webpack-china.org/" rel="nofollow noreferrer" target="_blank">Webpack2 中文版</a>！</strong><br><strong>此篇终结，请直接看 <a href="https://doc.webpack-china.org/" rel="nofollow noreferrer" target="_blank">Webpack2 中文版</a>！</strong><br><strong>此篇终结，请直接看 <a href="https://doc.webpack-china.org/" rel="nofollow noreferrer" target="_blank">Webpack2 中文版</a>！</strong></p>
<h1 id="articleHeader0">基础</h1>
<h2 id="articleHeader1">安装</h2>
<p>首先要安装 Node.js， Node.js 自带了软件包管理器 npm。用 npm 全局安装  Webpack：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install webpack -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> webpack -g</code></pre>
<p>通常我们会将 Webpack 安装到项目的依赖中，这样就可以使用项目本地版本的 Webpack。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 进入项目目录，初始化，创建 package.json。
# 若存在 package.json 文件，则不运行。
$ npm init
# 确定已经有 package.json
# 安装 webpack 依赖
$ npm install webpack --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># 进入项目目录，初始化，创建 package.json。</span>
<span class="hljs-meta"># 若存在 package.json 文件，则不运行。</span>
$ npm init
<span class="hljs-meta"># 确定已经有 package.json</span>
<span class="hljs-meta"># 安装 webpack 依赖</span>
$ npm install webpack --save-dev</code></pre>
<p>如果需要使用 Webpack 开发工具，要单独安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install webpack-dev-server --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">$ npm install webpack-<span class="hljs-built_in">dev</span>-server --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<h2 id="articleHeader2">使用</h2>
<p>首先创建一个静态页面 <code>index.html</code> 和一个 JS 入口文件 <code>entry.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- index.html -->
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
</head>
<body>
  <script src=&quot;bundle.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- index.html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// entry.js
document.write('It works.')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// entry.js</span>
<span class="hljs-built_in">document</span>.write(<span class="hljs-string">'It works.'</span>)</code></pre>
<p>然后编译 <code>entry.js</code> 并打包到 <code>bundle.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack entry.js bundle.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">$ webpack entry<span class="hljs-selector-class">.js</span> bundle.js</code></pre>
<p>用浏览器打开 <code>index.html</code> 将会看到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="It works. " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">It </span>works. </code></pre>
<p>最终目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── entry.js
├── index.html
├── package.json
├── node_modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├── entry<span class="hljs-selector-class">.js</span>
├── index<span class="hljs-selector-class">.html</span>
├── package<span class="hljs-selector-class">.json</span>
├── node_modules</code></pre>
<hr>
<p>接下来添加一个模块 <code>module.js</code> 并修改入口 <code>entry.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// module.js
module.exports = 'It works from module.js.'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-comment">// module.js</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = <span class="hljs-string">'It works from module.js.'</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// entry.js
document.write('It works.')
document.write(require('./module.js')) // 添加模块" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// entry.js</span>
<span class="hljs-built_in">document</span>.write(<span class="hljs-string">'It works.'</span>)
<span class="hljs-built_in">document</span>.write(<span class="hljs-built_in">require</span>(<span class="hljs-string">'./module.js'</span>)) <span class="hljs-comment">// 添加模块</span></code></pre>
<p>重新打包 <code>webpack entry.js bundle.js</code> 后刷新页面看到变化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="It works.It works from module.js." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">It works<span class="hljs-selector-class">.It</span> works from module<span class="hljs-selector-class">.js</span>.</code></pre>
<p>最终目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── bundle.js
├── entry.js
├── index.html
├── module.js
├── package.json
├── node_modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├── bundle<span class="hljs-selector-class">.js</span>
├── entry<span class="hljs-selector-class">.js</span>
├── index<span class="hljs-selector-class">.html</span>
├── module<span class="hljs-selector-class">.js</span>
├── package<span class="hljs-selector-class">.json</span>
├── node_modules</code></pre>
<h1 id="articleHeader3">进阶</h1>
<h2 id="articleHeader4">使用 Loader</h2>
<p>Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。<br>Loader 可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过 require 来加载任何类型的模块或文件，比如 CoffeeScript、 JSX、 LESS 或图片。</p>
<p>先来看看 loader 有哪些特性？</p>
<ul>
<li><p>Loader 可以通过管道方式链式调用，每个 loader 可以把资源转换成任意格式并传递给下一个 loader ，但是最后一个 loader 必须返回 JavaScript。</p></li>
<li><p>Loader 可以同步或异步执行。</p></li>
<li><p>Loader 运行在 node.js 环境中，所以可以做任何可能的事情。</p></li>
<li><p>Loader 可以接受参数，以此来传递配置项给 loader。</p></li>
<li><p>Loader 可以通过文件扩展名（或正则表达式）绑定给不同类型的文件。</p></li>
<li><p>Loader 可以通过 npm 发布和安装。</p></li>
<li><p>除了通过 package.json 的 main 指定，通常的模块也可以导出一个 loader 来使用。</p></li>
<li><p>Loader 可以访问配置。</p></li>
<li><p>插件可以让 loader 拥有更多特性。</p></li>
<li><p>Loader 可以分发出附加的任意文件。</p></li>
</ul>
<p>Loader 本身也是运行在 node.js 环境中的 JavaScript 模块，它通常会返回一个函数。大多数情况下，我们通过 npm 来管理 loader，但是你也可以在项目中自己写 loader 模块。</p>
<p>按照惯例，而非必须，loader 一般以 <code>xxx-loader</code> 的方式命名，<code>xxx</code> 代表了这个 loader 要做的转换功能，比如 <code>json-loader</code>。</p>
<p>除了npm安装模块的时候以外，在任何场景下，loader名字都是可以简写的。例如：安装时必须用全名，即：<code>npm install json-loader</code>，而在引用 loader 的时候可以使用全名 <code>json-loader</code>，也可以使用短名 <code>json</code>。这个命名规则和搜索优先级顺序在 webpack 的 <code>resolveLoader.moduleTemplates</code> api 中定义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Default: [&quot;*-webpack-loader&quot;, &quot;*-web-loader&quot;, &quot;*-loader&quot;, &quot;*&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Default</span>: [<span class="hljs-string">"*-webpack-loader"</span>, <span class="hljs-string">"*-web-loader"</span>, <span class="hljs-string">"*-loader"</span>, <span class="hljs-string">"*"</span>]</code></pre>
<p>Loader 可以在 <code>require()</code> 引用模块的时候添加，也可以在 webpack 全局配置中进行绑定，还可以通过命令行的方式使用。</p>
<p>loader是可以串联使用的，也就是说，一个文件可以先经过A-loader再经过B-loader最后再经过C-loader处理。而在经过所有的loader处理之前，webpack会先取到文件内容交给第一个loader。</p>
<p>接上一节的例子，我们要在页面中引入一个 CSS 文件 <code>style.css</code>，首先将 <code>style.css</code> 也看成是一个模块，然后用 <code>css-loader</code> 来读取处理（路径处理、import处理等），然后经过 <code>style-loader</code> 处理（包装成JS文件，运行的时候直接将样式插入DOM中）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* style.css */
body { background: yellow; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* style.css */</span>
<span class="hljs-selector-tag">body</span> { <span class="hljs-attribute">background</span>: yellow; }</code></pre>
<p>修改 <code>entry.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// entry.js
require(&quot;!style!css!./style.css&quot;) // 载入 style.css
document.write('It works.')
document.write(require('./module.js'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// entry.js</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">"!style!css!./style.css"</span>) <span class="hljs-comment">// 载入 style.css</span>
<span class="hljs-built_in">document</span>.write(<span class="hljs-string">'It works.'</span>)
<span class="hljs-built_in">document</span>.write(<span class="hljs-built_in">require</span>(<span class="hljs-string">'./module.js'</span>))</code></pre>
<p>安装 loader：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# css-loader：读取 css 文件
# style-loader：将 css 文件插入页面
$ npm install css-loader style-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># css-loader：读取 css 文件</span>
<span class="hljs-meta"># style-loader：将 css 文件插入页面</span>
$ npm install css-loader style-loader --save-dev</code></pre>
<p>重新编译打包，刷新页面，就可以看到黄色的页面背景了。</p>
<p>如果每次 require CSS 文件的时候都要写 loader 前缀，是一件很繁琐的事情。我们可以根据模块类型（扩展名）来自动绑定需要的 loader。</p>
<p>将 <code>entry.js</code> 中的 <code>require("!style!css!./style.css")</code> 修改为 <code>require("./style.css")</code> ，然后执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack entry.js bundle.js --module-bind 'css=style!css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">$ webpack entry<span class="hljs-selector-class">.js</span> bundle<span class="hljs-selector-class">.js</span> --module-bind <span class="hljs-string">'css=style!css'</span></code></pre>
<p>显然，这两种使用 loader 的方式，效果是一样的。<br>最终的目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── bundle.js
├── entry.js
├── index.html
├── module.js
├── node_modules
├── package.json
├── style.css" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├── bundle<span class="hljs-selector-class">.js</span>
├── entry<span class="hljs-selector-class">.js</span>
├── index<span class="hljs-selector-class">.html</span>
├── module<span class="hljs-selector-class">.js</span>
├── node_modules
├── package<span class="hljs-selector-class">.json</span>
├── style.css</code></pre>
<p>loader还可以接受参数，不同的参数可以让loader有不同的行为（前提是loader确实支持不同的行为），具体每个loader支持什么样的参数可以参考loader的文档。loader的使用有三种方法，分别是：</p>
<ul>
<li><p>在require中显式指定，如：</p></li>
<li><p>在命令行中指定，如：<code>$ webpack entry.js output.js --module-bind 'css=style!css'</code></p></li>
<li><p>在配置项（webpack.config.js）中指定，如：</p></li>
</ul>
<p>第一种显式指定，即在 <code>JS</code> 文件中指定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('style!css!./style.css');`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;">require(<span class="hljs-string">'style!css!./style.css'</span>);`</code></pre>
<p>第二种在命令行中指定参数的用法用得较少，可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack --module-bind jade --module-bind 'css=style!css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>webpack --<span class="hljs-keyword">module</span>-bind jade --<span class="hljs-keyword">module</span>-bind <span class="hljs-string">'css=style!css'</span></code></pre>
<p>使用 <code>--module-bind</code> 指定loader，如果后缀和loader一样，直接写就好了，比如jade表示.jade文件用jade-loader处理，如果不一样，则需要显示指定，如 <code>css=style!css</code> 表示分别使用 <code>css-loader</code> 和 <code>style-loader</code> 处理 <code>.css</code> 文件。</p>
<p>第三种在配置项中指定是最灵活的方式，它的指定方式是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    // loaders是一个数组，每个元素都用来指定loader
    loaders: [{
        test: /\.jade$/,    //test值为正则表达式，当文件路径匹配时启用
        loader: 'jade',    //指定使用什么loader，可以用字符串，也可以用数组
        exclude: /regexp/, //可以使用exclude来排除一部分文件

        //可以使用query来指定参数，也可以在loader中用和require一样的用法指定参数，如`jade?p1=1`
        query: {
            p1:'1'
        }
    },
    {
        test: /\.css$/,
        loader: 'style!css'    //loader可以和require用法一样串联
    },
    {
        test: /\.css$/,
        loaders: ['style', 'css']    //也可以用数组指定loader
    }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>: {
    <span class="hljs-comment">// loaders是一个数组，每个元素都用来指定loader</span>
    loaders: [{
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jade$/</span>,    <span class="hljs-comment">//test值为正则表达式，当文件路径匹配时启用</span>
        loader: <span class="hljs-string">'jade'</span>,    <span class="hljs-comment">//指定使用什么loader，可以用字符串，也可以用数组</span>
        exclude: <span class="hljs-regexp">/regexp/</span>, <span class="hljs-comment">//可以使用exclude来排除一部分文件</span>

        <span class="hljs-comment">//可以使用query来指定参数，也可以在loader中用和require一样的用法指定参数，如`jade?p1=1`</span>
        query: {
            <span class="hljs-attr">p1</span>:<span class="hljs-string">'1'</span>
        }
    },
    {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'style!css'</span>    <span class="hljs-comment">//loader可以和require用法一样串联</span>
    },
    {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">loaders</span>: [<span class="hljs-string">'style'</span>, <span class="hljs-string">'css'</span>]    <span class="hljs-comment">//也可以用数组指定loader</span>
    }]
}</code></pre>
<p>注意： 用数组指定串联loader时，配置文件中要写 <code>loaders</code>，而非 <code>loader</code>。</p>
<h2 id="articleHeader5">配置文件</h2>
<p>Webpack 在执行的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。默认情况下，会搜索当前目录的 webpack.config.js 文件，这个文件是一个 node.js 模块，返回一个 json 格式的配置信息对象，或者通过 --config 选项来指定配置文件。</p>
<p>继续我们的案例，创建配置文件 <code>webpack.config.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require(&quot;webpack&quot;)
module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
        filename: &quot;bundle.js&quot;
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' }
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>)
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: <span class="hljs-string">'./entry.js'</span>,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: __dirname,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">"bundle.js"</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>: [
            { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">'style!css'</span> }
        ]
    }
}</code></pre>
<p>同时简化 entry.js 中的 style.css 加载方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('./style.css')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">'./style.css'</span>)</code></pre>
<p>最后运行 <code>webpack</code>，可以看到 webpack 通过配置文件执行的结果和上一节通过命令行 <code>webpack entry.js bundle.js --module-bind 'css=style!css'</code> 执行的结果是一样的。</p>
<h2 id="articleHeader6">插件</h2>
<p>插件可以完成更多 loader 不能完成的功能。<br>插件的使用一般是在 webpack 的配置信息 plugins 选项中指定。<br>Webpack 本身内置了一些常用的插件，还可以通过 npm 安装第三方插件。<br>接下来，我们利用一个最简单的 BannerPlugin 内置插件来实践插件的配置和运行，这个插件的作用是给输出的文件头部添加注释信息。</p>
<p>修改 webpack.config.js，添加 plugins：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack')

module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by zhaoda')
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./entry.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: __dirname,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {<span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">'style!css'</span>}
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.BannerPlugin(<span class="hljs-string">'This file is created by zhaoda'</span>)
  ]
}</code></pre>
<p>然后运行 webpack，打开 bundle.js，可以看到文件头部出现了我们指定的注释信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*! This file is created by zhaoda */
/******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};
// 后面代码省略" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">/*! This file is created by zhaoda */</span>
<span class="hljs-comment">/******/</span> (<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(modules)</span> </span>{ <span class="hljs-comment">// webpackBootstrap</span>
<span class="hljs-comment">/******/</span>  <span class="hljs-comment">// The module cache</span>
<span class="hljs-comment">/******/</span>  <span class="hljs-keyword">var</span> installedModules = {};
<span class="hljs-comment">// 后面代码省略</span></code></pre>
<h1 id="articleHeader7">参数详解</h1>
<h2 id="articleHeader8">entry</h2>
<p>entry参数定义了打包后的入口文件，可以是个字符串或数组或者是对象；如果是数组，数组中的所有文件会打包生成一个filename文件；如果是对象，可以将不同的文件构建成不同的文件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    entry: {
        page1: &quot;./page1&quot;,
        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        page2: [&quot;./entry1&quot;, &quot;./entry2&quot;],
        
        // 如果想保持目录结构，则直接按照目录结构命名
       'subapp1/page': './app/subapp1/page.js',
       'subapp2/page': './app/subapp2/page.js',
    },
    output: {
        path: &quot;dist/js/page&quot;,
        publicPath: &quot;/output/&quot;,
        filename: &quot;[name].bundle.js&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>{
    <span class="hljs-attribute">entry</span>: {
        <span class="hljs-attribute">page1</span>: <span class="hljs-string">"./page1"</span>,
        <span class="hljs-comment">//支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出</span>
        <span class="hljs-attribute">page2</span>: [<span class="hljs-string">"./entry1"</span>, <span class="hljs-string">"./entry2"</span>],
        
        <span class="hljs-comment">// 如果想保持目录结构，则直接按照目录结构命名</span>
       <span class="hljs-string">'subapp1/page'</span>: <span class="hljs-string">'./app/subapp1/page.js'</span>,
       <span class="hljs-string">'subapp2/page'</span>: <span class="hljs-string">'./app/subapp2/page.js'</span>,
    },
    <span class="hljs-attribute">output</span>: {
        <span class="hljs-attribute">path</span>: <span class="hljs-string">"dist/js/page"</span>,
        <span class="hljs-attribute">publicPath</span>: <span class="hljs-string">"/output/"</span>,
        <span class="hljs-attribute">filename</span>: <span class="hljs-string">"[name].bundle.js"</span>
    }
}</code></pre>
<p>该段代码最终会在 <code>./dist/js/page </code> 文件夹下生成如下结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="│  page1.bundle.js 
│  page2.bundle.js
│
├─subapp1
│      page.bundle.js
│      
└─ssubapp2
       page.bundle.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>│  page1<span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span> 
│  page2<span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span>
│
├─subapp1
│      page<span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span>
│      
└─ssubapp2
       page<span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span></code></pre>
<p>保持目录结构命名的方式，在构架大型应用中非常有用。</p>
<h2 id="articleHeader9">output</h2>
<p>output参数是个对象，定义了输出文件的位置及名字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3000/static/',
    filename: &quot;js/[name].bundle.js&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">output</span>: {
    <span class="hljs-attribute">path</span>: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'dist'</span>),
    publicPath: <span class="hljs-string">'http://localhost:3000/static/'</span>,
    filename: <span class="hljs-string">"js/[name].bundle.js"</span>
}</code></pre>
<ul>
<li><p><code>path</code>: 打包文件存放的绝对路径</p></li>
<li><p><code>publicPath</code>: 网站运行时的访问路径</p></li>
<li><p><code>filename</code>：打包后的文件名</p></li>
</ul>
<p>当我们在<code>entry</code>中定义构建多个文件时，<code>filename</code>可以对应的更改为<code>[name].js</code>用于定义不同文件构建后的名字。<br>如下 <code>'http://localhost:3000/static/'</code> 一般我们做调试时的路径，如果我们要在网页中引用 js 文件，html 文件中的路径写为：<code>http://localhost:3000/static/js/&lt;name&gt;.bundle.js</code>，<br>即 <code>&lt;publicPath&gt;</code>+<code>&lt;filename&gt;</code>。</p>
<h2 id="articleHeader10">module</h2>
<p>在webpack中JavaScript，CSS，LESS，TypeScript，JSX，CoffeeScript，图片等静态文件都是模块，不同模块的加载是通过模块加载器（webpack-loader）来统一管理的。loaders之间是可以串联的，一个加载器的输出可以作为下一个加载器的输入，最终返回到JavaScript上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
        //加载器配置
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.js 文件使用 jsx-loader 来编译处理
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">module:</span> {
        <span class="hljs-comment">//加载器配置</span>
<span class="hljs-symbol">        loaders:</span> [
            <span class="hljs-comment">//.css 文件使用 style-loader 和 css-loader 来处理</span>
            { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'style-loader!css-loader'</span> },
            <span class="hljs-comment">//.js 文件使用 jsx-loader 来编译处理</span>
            { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'jsx-loader?harmony'</span> },
            <span class="hljs-comment">//.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理</span>
            { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.scss$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'style!css!sass?sourceMap'</span>},
            <span class="hljs-comment">//图片文件使用 url-loader 来处理，小于8kb的直接转为base64</span>
            { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.(png|jpg)$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'url-loader?limit=8192'</span>}
        ]
    }</code></pre>
<table>
<thead><tr>
<th align="left">字段</th>
<th align="left">说明</th>
</tr></thead>
<tbody>
<tr>
<td align="left"><code>test</code></td>
<td align="left">表示匹配的资源类型</td>
</tr>
<tr>
<td align="left">
<code>loader</code> 或 <code>loaders</code>
</td>
<td align="left">表示用来加载这种类型的资源的loader</td>
</tr>
<tr>
<td align="left"><code>！</code></td>
<td align="left">定义loader的串联关系，多个loader之间用“!”连接起来</td>
</tr>
</tbody>
</table>
<p>此外，还可以添加用来定义png、jpg这样的图片资源在小于10k时自动处理为base64图片的加载器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ test: /\.(png|jpg)$/,loader: 'url-loader?limit=10000'}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">{ <span class="hljs-attribute">test</span>: /\.(png|jpg)$/,loader: <span class="hljs-string">'url-loader?limit=10000'</span>}</code></pre>
<p>给css和less还有图片添加了loader之后，我们不仅可以像在node中那样 <code>require()</code> js文件了，我们还可以 <code>require()</code> css、less甚至图片文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" require('./bootstrap.css');
 require('./myapp.less');
 var img = document.createElement('img');
 img.src = require('./glyph.png');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-built_in">require</span>(<span class="hljs-string">'./bootstrap.css'</span>);
 <span class="hljs-built_in">require</span>(<span class="hljs-string">'./myapp.less'</span>);
 <span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'img'</span>);
 img.src = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./glyph.png'</span>);</code></pre>
<p>注意，<code>require()</code> 还支持在资源path前面指定loader，即 <code>require(![loaders list]![source path])</code>形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;!style!css!less!bootstrap/less/bootstrap.less&quot;);
// “bootstrap.less”这个资源会先被&quot;less-loader&quot;处理，
// 其结果又会被&quot;css-loader&quot;处理，接着是&quot;style-loader&quot;
// 可类比pipe操作" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>require(<span class="hljs-string">"!style!css!less!bootstrap/less/bootstrap.less"</span>);
<span class="hljs-regexp">//</span> “bootstrap.less”这个资源会先被<span class="hljs-string">"less-loader"</span>处理，
<span class="hljs-regexp">//</span> 其结果又会被<span class="hljs-string">"css-loader"</span>处理，接着是<span class="hljs-string">"style-loader"</span>
<span class="hljs-regexp">//</span> 可类比pipe操作</code></pre>
<p><code>require()</code> 时指定的loader会覆盖配置文件里对应的loader配置项。</p>
<h2 id="articleHeader11">resolve</h2>
<p>webpack在构建包的时候会按目录的进行文件的查找，<code>resolve</code> 属性中的 <code>extensions</code> 数组中用于配置程序可以自行补全哪些文件后缀：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" resolve: {
        //查找module的话从这里开始查找
        root: '/pomy/github/flux-example/src', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code> <span class="hljs-attribute">resolve</span>: {
        <span class="hljs-comment">//查找module的话从这里开始查找</span>
        <span class="hljs-attribute">root</span>: <span class="hljs-string">'/pomy/github/flux-example/src'</span>, <span class="hljs-comment">//绝对路径</span>
        <span class="hljs-comment">//自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名</span>
        <span class="hljs-attribute">extensions</span>: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.json'</span>, <span class="hljs-string">'.scss'</span>],
        <span class="hljs-comment">//模块别名定义，方便后续直接引用别名，无须多写长长的地址</span>
        <span class="hljs-attribute">alias</span>: {
            <span class="hljs-attribute">AppStore </span>: <span class="hljs-string">'js/stores/AppStores.js'</span>,<span class="hljs-comment">//后续直接 require('AppStore') 即可</span>
            <span class="hljs-attribute">ActionType </span>: <span class="hljs-string">'js/actions/ActionType.js'</span>,
            <span class="hljs-attribute">AppAction </span>: <span class="hljs-string">'js/actions/AppAction.js'</span>
        }
    }</code></pre>
<p>然后我们想要加载一个js文件时，只要 <code>require('common')</code> 就可以加载 <code>common.js</code> 文件了。<br>注意一下, <code>extensions</code> 第一个是空字符串! 对应不需要后缀的情况.</p>
<h2 id="articleHeader12">plugin</h2>
<p>webpack提供了[丰富的组件]用来满足不同的需求，当然我们也可以自行实现一个组件来满足自己的需求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
     //your plugins list
 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">plugins:</span> [
     <span class="hljs-comment">//your plugins list</span>
 ]</code></pre>
<p>在webpack中编写js文件时，可以通过require的方式引入其他的静态资源，可通过loader对文件自动解析并打包文件。通常会将js文件打包合并，css文件会在页面的header中嵌入style的方式载入页面。但开发过程中我们并不想将样式打在脚本中，最好可以独立生成css文件，以外链的形式加载。这时 <code>extract-text-webpack-plugin</code> 插件可以帮我们达到想要的效果。需要使用npm的方式加载插件，然后参见下面的配置，就可以将js中的css文件提取，并以指定的文件名来进行加载。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install extract-text-webpack-plugin –-save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">extract</span>-<span class="hljs-built_in">text</span>-webpack-<span class="hljs-keyword">plugin</span> –-<span class="hljs-keyword">save</span>-dev</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    new ExtractTextPlugin('styles.css')
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">plugins:</span> [
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'styles.css'</span>)
]</code></pre>
<h2 id="articleHeader13">externals</h2>
<p>当我们想在项目中require一些其他的类库或者API，而又不想让这些类库的源码被构建到运行时文件中，这在实际开发中很有必要。此时我们就可以通过配置externals参数来解决这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" externals: {
     &quot;jquery&quot;: &quot;jQuery&quot;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol"> externals:</span> {
     <span class="hljs-string">"jquery"</span>: <span class="hljs-string">"jQuery"</span>
 }</code></pre>
<p>这样我们就可以放心的在项目中使用这些API了：<code>var jQuery = require(“jquery”)</code>;</p>
<h2 id="articleHeader14">context</h2>
<p>当我们在require一个模块的时候，如果在require中包含变量，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" require(&quot;./mods/&quot; + name + &quot;.js&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;"> require(<span class="hljs-string">"./mods/"</span> + <span class="hljs-built_in">name</span> + <span class="hljs-string">".js"</span>);</code></pre>
<p>那么在编译的时候我们是不能知道具体的模块的。但这个时候，webpack也会为我们做些分析工作：</p>
<p>1.分析目录：’./mods’； <br>2.提取正则表达式：’/^.*.js$/’；</p>
<p>于是这个时候为了更好地配合wenpack进行编译，我们可以给它指明路径，像在cake-webpack-config中所做的那样（我们在这里先忽略abcoption的作用）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var currentBase = process.cwd();
 var context = abcOptions.options.context ? abcOptions.options.context : 
 path.isAbsolute(entryDir) ? entryDir : path.join(currentBase, entryDir);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code> <span class="hljs-built_in">var</span> currentBase = process.cwd();
 <span class="hljs-built_in">var</span> <span class="hljs-built_in">context</span> = abcOptions.options.<span class="hljs-built_in">context</span> ? abcOptions.options.<span class="hljs-built_in">context</span> : 
 path.isAbsolute(entryDir) ? entryDir : path.<span class="hljs-built_in">join</span>(currentBase, entryDir);</code></pre>
<p>关于 webpack.config.js 更详尽的配置可以参考 <a href="http://webpack.github.io/docs/configuration.html" rel="nofollow noreferrer" target="_blank">Webpack Configuration</a>。</p>
<h1 id="articleHeader15">开发环境</h1>
<p>当项目逐渐变大，webpack 的编译时间会变长，可以通过参数让编译的输出内容带有进度和颜色。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack --progress --colors" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">$</span> <span class="hljs-comment">webpack</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors</span></code></pre>
<p>如果不想每次修改模块后都重新编译，那么可以启动监听模式。开启监听模式后，没有变化的模块会在编译后缓存到内存中，而不会每次都被重新编译，所以监听模式的整体速度是很快的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack --progress --colors --watch" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">$</span> <span class="hljs-comment">webpack</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">watch</span></code></pre>
<p>当然，使用 <code>webpack-dev-server</code> 开发服务是一个更好的选择。它将在 localhost:8080 启动一个 express 静态资源 web 服务器，并且会以监听模式自动运行 webpack，在浏览器打开 <a href="http://localhost:8080/" rel="nofollow noreferrer" target="_blank">http://localhost:8080/</a> 或 <a href="http://localhost:8080/webpack-dev-server/" rel="nofollow noreferrer" target="_blank">http://localhost:8080/webpack...</a> 可以浏览项目中的页面和编译后的资源输出，并且通过一个 socket.io 服务实时监听它们的变化并自动刷新页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装
$ npm install webpack-dev-server -g

# 运行
$ webpack-dev-server --progress --colors" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-meta"># 安装</span>
$ npm install webpack-dev-<span class="hljs-keyword">server</span> -g

<span class="hljs-meta"># 运行</span>
$ webpack-dev-<span class="hljs-keyword">server</span> --progress --colors</code></pre>
<h1 id="articleHeader16">React 开发环境的配置</h1>
<p>Webpack相关：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install webpack -g
$ npm install webpack-dev-server -g
# 安装必要的 loader：
## 编译 JSX
$ npm install --save-dev babel-loader
## CSS 文件处理
$ npm install --save-dev css-loader style-loader
## React
$ npm install --save-dev react-hot-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>$ npm <span class="hljs-keyword">install </span>webpack -g
$ npm <span class="hljs-keyword">install </span>webpack-dev-server -g
<span class="hljs-comment"># 安装必要的 loader：</span>
<span class="hljs-comment">## 编译 JSX</span>
$ npm <span class="hljs-keyword">install </span>--save-dev <span class="hljs-keyword">babel-loader
</span><span class="hljs-comment">## CSS 文件处理</span>
$ npm <span class="hljs-keyword">install </span>--save-dev css-loader style-loader
<span class="hljs-comment">## React</span>
$ npm <span class="hljs-keyword">install </span>--save-dev react-hot-loader</code></pre>
<p>Babel 相关：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save-dev babel-core
# 添加 ES6 支持
$ npm install --save-dev babel-preset-es2015
$ npm install --save-dev babel-react" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>$ npm <span class="hljs-keyword">install </span>--save-dev <span class="hljs-keyword">babel-core
</span><span class="hljs-comment"># 添加 ES6 支持</span>
$ npm <span class="hljs-keyword">install </span>--save-dev <span class="hljs-keyword">babel-preset-es2015
</span>$ npm <span class="hljs-keyword">install </span>--save-dev <span class="hljs-keyword">babel-react</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');
module.exports = {
    entry: [
      'webpack/hot/only-dev-server',
      &quot;./js/app.js&quot;
    ],
    output: {
        path: './build',
        filename: &quot;bundle.js&quot;
    },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: &quot;style!css&quot; }
        ]
    },
    resolve:{
        extensions:['','.js','.json']
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: [
      <span class="hljs-string">'webpack/hot/only-dev-server'</span>,
      <span class="hljs-string">"./js/app.js"</span>
    ],
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'./build'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">"bundle.js"</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>: [
            { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js?$/</span>, <span class="hljs-attr">loaders</span>: [<span class="hljs-string">'react-hot'</span>, <span class="hljs-string">'babel'</span>], <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span> },
            { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>},
            { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">"style!css"</span> }
        ]
    },
    <span class="hljs-attr">resolve</span>:{
        <span class="hljs-attr">extensions</span>:[<span class="hljs-string">''</span>,<span class="hljs-string">'.js'</span>,<span class="hljs-string">'.json'</span>]
    },
    <span class="hljs-attr">plugins</span>: [
      <span class="hljs-keyword">new</span> webpack.NoErrorsPlugin()
    ]
};</code></pre>
<p>参考资料：</p>
<ul>
<li><p><a href="https://fakefish.github.io/react-webpack-cookbook/Loading-CSS.html" rel="nofollow noreferrer" target="_blank">React Webpack Cookbook</a></p></li>
<li><p><a href="http://www.ruanyifeng.com/blog/2016/01/babel.html" rel="nofollow noreferrer" target="_blank">Babel 入门教程</a></p></li>
<li><p><a href="https://zhaoda.gitbooks.io/webpack/content/" rel="nofollow noreferrer" target="_blank">Webpack 中文指南</a></p></li>
<li><p><a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">Webpack 官方文档</a></p></li>
</ul>
<h1 id="articleHeader17">webpack-dev-server</h1>
<p>webpack-dev-server 是一个基于 Node.js Express 框架的开发服务器，它是一个静态资源 Web 服务器，对于简单静态页面或者仅依赖于独立服务的前端页面，都可以直接使用这个开发服务器进行开发。在开发过程中，开发服务器会监听每一个文件的变化，进行实时打包，并且可以推送通知前端页面代码发生了变化，从而可以实现页面的自动刷新。</p>
<p>简单来说，webpack-dev-server就是一个小型的静态文件服务器。使用它，可以为webpack打包生成的资源文件提供Web服务。</p>
<p>webpack-dev-server有两种模式支持自动刷新——iframe模式和inline模式。</p>
<h2 id="articleHeader18">iframe模式</h2>
<p>在iframe模式下：页面是嵌套在一个iframe下的，在代码发生改动的时候，这个iframe会重新加载。使用iframe模式无需额外的配置，只需在浏览器输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://localhost:8080/webpack-dev-server/index.html
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>http:<span class="hljs-regexp">//</span>localhost:<span class="hljs-number">8080</span><span class="hljs-regexp">/webpack-dev-server/i</span>ndex.html
</code></pre>
<h2 id="articleHeader19">inline模式</h2>
<p>在inline模式下：一个小型的webpack-dev-server客户端会作为入口文件打包，这个客户端会在后端代码改变的时候刷新页面。使用inline模式有两种方式：命令行方式和Node.js API。</p>
<p><strong>命令行方式</strong>比较简单，只需加入--line选项即可。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server --inline" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">webpack-dev-server <span class="hljs-comment">--inline</span></code></pre>
<p>使用<code>--inline</code>选项会自动把webpack-dev-server客户端加到webpack的入口文件配置中。<br>注意：默认配置文件名称为：<code>webpack.config.js</code>，若要更改需要在命令行中指明。例如，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server --inline --config webpack.config.dev.js。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">webpack-dev-server --inline --config webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.js</span>。</code></pre>
<p>若用<strong>Node.js API方式</strong>，因为webpack-dev-server没有inline:true这个配置项，所以需要手动把</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server/client?http://localhost:8080" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">webpack-dev-<span class="hljs-keyword">server</span>/<span class="hljs-keyword">client</span>?http:<span class="hljs-comment">//localhost:8080</span></code></pre>
<p>加到配置文件的入口文件配置处。</p>
<h2 id="articleHeader20">模块热替换</h2>
<p>webpac-dev-server 支持 Hot Module Replacement，即模块热替换，在前端代码变动的时候无需整个刷新页面，只把变化的部分替换掉。使用HMR功能也有两种方式：命令行方式和Node.js API。</p>
<p>命令行方式同样比较简单，只需加入<code>--line --hot</code>选项。<code>--hot</code>这个选项干了一件事情，它把<code>webpack/hot/dev-server</code>入口点加入到了webpack配置文件中。这时访问浏览器，你会看见控制台的log信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[HMR] Waiting for update signal from WDS...
[WDS] Hot Module Replacement enabled." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>[<span class="hljs-symbol">HMR</span>] <span class="hljs-symbol">Waiting</span> for update signal from <span class="hljs-symbol">WDS</span>...
[<span class="hljs-symbol">WDS</span>] <span class="hljs-symbol">Hot</span> <span class="hljs-symbol">Module</span> <span class="hljs-symbol">Replacement</span> enabled.</code></pre>
<p><code>HMR前缀</code>的信息由webpack/hot/dev-server模块产生，<code>WDS前缀</code>的信息由webpack-dev-server客户端产生。</p>
<p>Node.js API方式需要做三个配置：</p>
<ol>
<li><p>把 <code>webpack/hot/dev-server</code> 加入到webpack配置文件的 <code>entry</code> 项；</p></li>
<li><p>把 <code>new webpack.HotModuleReplacementPlugin()</code> 加入到webpack配置文件的<code>plugins</code>项；</p></li>
<li><p>把 <code>hot:true</code> 加入到 Webpack 配置文件的 <code>webpack-dev-server</code> 的配置项里面。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServer:{
    hot:true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">devServer</span>:{
    <span class="hljs-attribute">hot</span>:true
}</code></pre>
<p>注意：要使HMR功能生效，还需要做一件事情，就是要在应用热替换的模块或者根模块里面加入允许热替换的代码。否则，热替换不会生效，还是会重刷整个页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(module.hot)
    module.hot.accept();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span>(<span class="hljs-built_in">module</span>.hot)
    <span class="hljs-built_in">module</span>.hot.accept();</code></pre>
<p>也可以使用一些插件去完成这个工作，例如webpack-module-hot-accept插件。不过，webpack-dev-server HMR结合react-hot-loader使用的时候，react-hot-loader会去做这个工作。<br>综合上述，使用wepack-dev-server辅助开发，使得开发者在开发前端代码的过程中无需频繁手动刷新页面，使用HMR甚至不用等待页面刷新，确实可以给开发者带来很好的体验。</p>
<p>但是，问题又来了。我要进行前后端联调的时候怎么办呢？毕竟webpack-dev-server只是一个静态文件服务器，不具备动态处理的能力。这个时候就需要将后端服务器与webpack-dev-server结合使用了。webpack-dev-server只用来为webpack打包生成的资源文件提供服务，比如js文件、图片文件、css文件等；后端服务器除提供API接口外，还提供入口HTML。</p>
<p>要将webpack-dev-server与后端服务器结合使用，需要做三件事情。</p>
<p><strong>第一</strong> 首页HTML文件是从后端服务器发出的，这时页面的根地址变成了后端服务器地址，怎么使得webpack产生的资源文件在请求资源的时候是向web-dev-server请求而不是后端服务器请求？只需在webpack配置文件中的 <code>output.publicPath</code> 配置项写上绝对URL地址，例如<code>output.publicPath = "http://localhost:8080/assets/"</code>。这时，webpack打包产生的资源文件里面的url地址都会是绝对地址，而不是相对地址。<br><strong>第二</strong> 后端服务器产生的入口HTML文件要向webpack-dev-server请求资源文件，这个简单，只需在HTML文件中加入资源文件的绝对地址，例如：<code>&lt;script src="http://localhost:8080/assets/bundle.js"&gt;</code><br><strong>第三</strong> 要使webpack-dev-server和它的运行时程序连接起来。这个简单，只需要使用iline模式即可。</p>
<h1 id="articleHeader21">提取公共代码与压缩</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
    ... ...
    // plugins 项配置中增加
    plugins: [
    
        ... ...  
        // 提取公共代码
        commonsPlugin,
        //压缩
        new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
        })
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> commonsPlugin = <span class="hljs-literal">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'common.js'</span>);
module.exports = {
    <span class="hljs-params">...</span> <span class="hljs-params">...</span>
    <span class="hljs-comment">// plugins 项配置中增加</span>
    plugins: <span class="hljs-meta">[</span>
    
        <span class="hljs-params">...</span> <span class="hljs-params">...</span>  
        <span class="hljs-comment">// 提取公共代码</span>
        commonsPlugin,
        <span class="hljs-comment">//压缩</span>
        <span class="hljs-literal">new</span> webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: <span class="hljs-literal">false</span>
                }
        })
    <span class="hljs-meta">]</span>
}</code></pre>
<p>参见：<br><a href="http://www.jianshu.com/p/941bfaf13be1" rel="nofollow noreferrer" target="_blank">WEBPACK DEV SERVER</a><br><a href="https://webpack.github.io/docs/webpack-dev-server.html" rel="nofollow noreferrer" target="_blank">webpack-dev-server 官方文档</a><br><a href="http://www.bcodey.com/?p=517" rel="nofollow noreferrer" target="_blank">前端模块加载工具——webpack(二)</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack 指南（整理 草稿）

## 原文链接
[https://segmentfault.com/a/1190000005690280](https://segmentfault.com/a/1190000005690280)


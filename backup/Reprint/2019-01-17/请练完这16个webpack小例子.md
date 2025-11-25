---
title: '请练完这16个webpack小例子' 
date: 2019-01-17 2:30:25
hidden: true
slug: zrk82vafx9
categories: [reprint]
---

{{< raw >}}

                    
<p>16个demo，webpack+react搭配使用</p>
<p>首先教大家2个新技能</p>
<ul>
<li>
<p>1.按照正常github地址情况下，你的github本身不能访问目录。</p>
<ul><li><p>例如要访问vue-demo下的vueCpu文件夹:<a href="https://github.com/holidaying/vue-demo/vueCpu" rel="nofollow noreferrer" target="_blank">https://github.com/holidaying...</a>（显示404）但是在目录上加上tree/master/：<a href="https://github.com/holidaying/vue-demo/tree/master/vueCpu" rel="nofollow noreferrer" target="_blank">https://github.com/holidaying...</a> （master是分支名）就可以访问。</p></li></ul>
</li>
<li>
<p>2.github目录的制作</p>
<ul>
<li><p>明确一个问题。一个标题就是一个目录名称</p></li>
<li><p>写法[xx](#题目名称)#不能少</p></li>
<li><p>题目名称的写法规则：abc demo-&gt; abc-demo,Abc-Demo-&gt;abc-demo。会忽略:和()即就是题目中所有可见字符的空格均用-连接，中、英文空格要分开，中文空格对应中文-。并且全为小写</p></li>
</ul>
</li>
</ul>
<h2 id="articleHeader0">步骤</h2>
<p>首先，install <a href="https://www.npmjs.com/package/webpack" rel="nofollow noreferrer" target="_blank">Webpack</a> 和 <a href="https://www.npmjs.com/package/webpack-dev-server" rel="nofollow noreferrer" target="_blank">webpack-dev-server</a>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i -g webpack webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-selector-tag">i</span> -g webpack webpack-dev-server</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Linux &amp; Mac
$ git clone git@github.com:holidaying/webpack-demo.git

# Windows
$ git clone https://github.com/holidaying/webpack-demo.git
:
$ cd webpack-demos
$ npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-comment"># Linux &amp; Mac</span>
$ git <span class="hljs-keyword">clone</span> <span class="hljs-title">git</span>@github.com:holidaying/webpack-demo.git

<span class="hljs-comment"># Windows</span>
$ git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/holidaying/webpack-demo.git
:
$ cd webpack-demos
$ npm install</code></pre>
<p>接下来就可以进行demo演示了.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd demo01
$ webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>cd demo01
<span class="hljs-variable">$ </span>webpack-dev-server</code></pre>
<p>用浏览器访问 <a href="http://127.0.0.1:8080." rel="nofollow noreferrer" target="_blank">http://127.0.0.1:8080.</a></p>
<h2 id="articleHeader1">什么是webpack？</h2>
<p>Webpack 是前端的打包工具类类似于 Grunt and Gulp.但是有区别，因为它是模块化构建机制，Webpack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。<br><code>WebPack和Grunt以及Gulp相比有什么特性</code><br>其实Webpack和另外两个并没有太多的可比性，Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack可以替代Gulp/Grunt类的工具。<br>Grunt和Gulp的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，这个工具之后可以自动替你完成这些任务。<br><a href="http://webpack.github.io/docs/what-is-webpack.html" rel="nofollow noreferrer" target="_blank">更多信息</a>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
$ webpack main.js bundle.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
$ webpack main<span class="hljs-selector-class">.js</span> bundle.js</code></pre>
<p>它的配置文件是 <code>webpack.config.js</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./main.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  }
};</code></pre>
<p>有了<code>webpack.config.js</code>,你可以不带参数使用webpack</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>webpack</code></pre>
<p>一些命令行选项你应该知道。</p>
<ul>
<li><p><code>webpack</code> – 构建文件</p></li>
<li><p><code>webpack -p</code> – 发布</p></li>
<li><p><code>webpack --watch</code> – 监听项目</p></li>
<li><p><code>webpack -d</code> – 包含 source maps方便调试</p></li>
<li><p><code>webpack --colors</code> – 让打包界面更好看</p></li>
</ul>
<p>去构建你的项目, 你可以把启动项写进package.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// package.json
{
  // ...
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;webpack-dev-server --devtool eval --progress --colors&quot;,
    &quot;deploy&quot;: &quot;NODE_ENV=production webpack -p&quot;
  },
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// package.json</span>
{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server --devtool eval --progress --colors"</span>,
    <span class="hljs-string">"deploy"</span>: <span class="hljs-string">"NODE_ENV=production webpack -p"</span>
  },
  <span class="hljs-comment">// ...</span>
}</code></pre>
<h2 id="articleHeader2">目录</h2>
<ol>
<li><p><a>单文件入口</a></p></li>
<li><p><a>多文件入口</a></p></li>
<li><p><a>Babel-loader</a></p></li>
<li><p><a>CSS-loader</a></p></li>
<li><p><a>Image loader</a></p></li>
<li><p><a>CSS Module</a></p></li>
<li><p><a>UglifyJs Plugin插件</a></p></li>
<li><p><a>HTML Webpack Plugin and Open Browser Webpack Plugin</a></p></li>
<li><p><a>Environment flags环境变量</a></p></li>
<li><p><a>Code splitting代码分割</a></p></li>
<li><p><a>Code splitting with bundle-loader</a></p></li>
<li><p><a>Common chunk提取公共文件</a></p></li>
<li><p><a>Vendor chunk提取公共的第三方代码</a></p></li>
<li><p><a>externals全局变量</a></p></li>
<li><p><a>热模块替代/热更新</a></p></li>
<li><p><a>React router</a></p></li>
</ol>
<h2 id="articleHeader3">Demo01: 单文件入口 (<a href="https://github.com/holidaying/webpack-demo/tree/master/demo01" rel="nofollow noreferrer" target="_blank">源码</a>)</h2>
<p>Webpack会入口文件进行打包成bundle.js.</p>
<p>例子, <code>main.js</code> 是单文件入口.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
document.write('<h1>Hello World</h1>');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// main.js</span>
<span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;h1&gt;Hello World&lt;/h1&gt;'</span>);</code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
  <body>
    <script type=&quot;text/javascript&quot; src=&quot;bundle.js&quot;></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>Webpack follows <code>webpack.config.js</code> to build <code>bundle.js</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./main.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  }
};</code></pre>
<p>启动服务, 访问 <a href="http://127.0.0.1:8080" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:8080</a> .</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ webpack-dev-server</code></pre>
<h2 id="articleHeader4">Demo02: 多文件入口(<a href="https://github.com/holidaying/webpack-demo/tree/master/demo02" rel="nofollow noreferrer" target="_blank">源码</a>)</h2>
<p>多个入口文件，实用于多个页面的应用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main1.js
document.write('<h1>Hello World</h1>');

// main2.js
document.write('<h2>Hello Webpack</h2>');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// main1.js</span>
<span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;h1&gt;Hello World&lt;/h1&gt;'</span>);

<span class="hljs-comment">// main2.js</span>
<span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;h2&gt;Hello Webpack&lt;/h2&gt;'</span>);</code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
  <body>
    <script src=&quot;bundle1.js&quot;></script>
    <script src=&quot;bundle2.js&quot;></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle1.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle2.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: {
    bundle1: './main1.js',
    bundle2: './main2.js'
  },
  output: {
    filename: '[name].js'
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">bundle1</span>: <span class="hljs-string">'./main1.js'</span>,
    <span class="hljs-attr">bundle2</span>: <span class="hljs-string">'./main2.js'</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
  }
};</code></pre>
<h2 id="articleHeader5">Demo03: Babel-loader (<a href="https://github.com/holidaying/webpack-demo/tree/master/demo03" rel="nofollow noreferrer" target="_blank">源码</a>)</h2>
<p>通过使用不同的loader，webpack通过调用外部的脚本或工具可以对各种各样的格式的文件进行处理(<a href="http://webpack.github.io/docs/using-loaders.html" rel="nofollow noreferrer" target="_blank">更多信息</a>). 例如, <a href="https://www.npmjs.com/package/babel-loader" rel="nofollow noreferrer" target="_blank">Babel-loader</a> Babel其实是一个编译JavaScript的平台可以将 JSX/ES6 文件转换成浏览器可以识别的js文件. 官方文档<a href="http://webpack.github.io/docs/list-of-loaders.html" rel="nofollow noreferrer" target="_blank">loaders</a>.</p>
<p><code>main.jsx</code> is a JSX 文件.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.querySelector('#wrapper')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react'</span>);
<span class="hljs-keyword">const</span> ReactDOM = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-dom'</span>);

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, world!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>,
  <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#wrapper'</span>)
);</code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
  <body>
    <div id=&quot;wrapper&quot;></div>
    <script src=&quot;bundle.js&quot;></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"wrapper"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&amp;presets[]=react'
      },
    ]
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./main.jsx'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>:[
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js[x]?$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader?presets[]=es2015&amp;presets[]=react'</span>
      },
    ]
  }
};</code></pre>
<p>在 <code>webpack.config.js</code>, <code>module.loaders</code> 区域是用来分配loader的. 像上面的代码片段使用了 <code>babel-loader</code> 需要安装插件 <a href="https://www.npmjs.com/package/babel-preset-es2015" rel="nofollow noreferrer" target="_blank">babel-preset-es2015</a> 和 <a href="https://www.npmjs.com/package/babel-preset-react" rel="nofollow noreferrer" target="_blank">babel-preset-react</a> to 编译成 ES6 and React. 可以用query配置参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">loaders</span>: [
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,
      <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
      <span class="hljs-attr">query</span>: {
        <span class="hljs-attr">presets</span>: [<span class="hljs-string">'es2015'</span>, <span class="hljs-string">'react'</span>]
      }
    }
  ]
}</code></pre>
<h2 id="articleHeader6">Demo04: CSS-loader (<a href="https://github.com/holidaying/webpack-demo/tree/master/demo04" rel="nofollow noreferrer" target="_blank">源码</a>)</h2>
<p>Webpack 允许你在js文件中require CSS , 通过 CSS-loader来预处理css文件.</p>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('./app.css');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">'./app.css'</span>);</code></pre>
<p>app.css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  background-color: blue;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">background-color</span>: blue;
}</code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
  <head>
    <script type=&quot;text/javascript&quot; src=&quot;bundle.js&quot;></script>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./main.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>:[
      { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">'style-loader!css-loader'</span> },
    ]
  }
};</code></pre>
<p>但是,你需要使用2中loaders来转换CSS 文件. 第一个是 <a href="https://www.npmjs.com/package/css-loader" rel="nofollow noreferrer" target="_blank">CSS-loader</a> 来读取CSS文件, 另外一个是<a href="https://www.npmjs.com/package/style-loader" rel="nofollow noreferrer" target="_blank">Style-loader</a> 是将style样式插入到html中。 中间用！连接</p>
<p>启动服务后, <code>index.html</code> 有内部样式.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
  <script type=&quot;text/javascript&quot; src=&quot;bundle.js&quot;></script>
  <style type=&quot;text/css&quot;>
    body {
      background-color: blue;
    }
  </style>
</head>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
      <span class="hljs-attribute">background-color</span>: blue;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></code></pre>
<h2 id="articleHeader7">Demo05: Image loader (<a href="https://github.com/holidaying/webpack-demo/tree/master/demo05" rel="nofollow noreferrer" target="_blank">源码</a>)</h2>
<p>Webpack 允许你在js文件中require图片 , 通过 url-loader和file-loader来预处理图片文件.</p>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var img1 = document.createElement(&quot;img&quot;);
img1.src = require(&quot;./small.png&quot;);
document.body.appendChild(img1);

var img2 = document.createElement(&quot;img&quot;);
img2.src = require(&quot;./big.png&quot;);
document.body.appendChild(img2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> img1 = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"img"</span>);
img1.src = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./small.png"</span>);
<span class="hljs-built_in">document</span>.body.appendChild(img1);

<span class="hljs-keyword">var</span> img2 = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"img"</span>);
img2.src = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./big.png"</span>);
<span class="hljs-built_in">document</span>.body.appendChild(img2);</code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
  <body>
    <script type=&quot;text/javascript&quot; src=&quot;bundle.js&quot;></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ]
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./main.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>:[
      { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpg)$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader?limit=8192'</span> }
    ]
  }
};</code></pre>
<p><a href="https://www.npmjs.com/package/url-loader" rel="nofollow noreferrer" target="_blank">url-loader</a> 转换图片文件. 如果图片的大小小于 8192 bytes,它将会转成base64位的地址; 相反, 它就是普通地址. <br>参数前是用？连接的</p>
<p>启动服务后, <code>small.png</code> and <code>big.png</code> 将会有一下的地址.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;data:image/png;base64,iVBOR...uQmCC&quot;>
<img src=&quot;4853ca667a2b8b8844eb2693ac1b2578.png&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"data:image/png;base64,iVBOR...uQmCC"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"4853ca667a2b8b8844eb2693ac1b2578.png"</span>&gt;</span></code></pre>
<h2 id="articleHeader8">Demo06: CSS Module (<a href="https://github.com/holidaying/webpack-demo/tree/master/demo06" rel="nofollow noreferrer" target="_blank">源码</a>)</h2>
<p><code>css-loader?modules</code> (the query parameter modules) enables the <a href="https://github.com/css-modules/css-modules" rel="nofollow noreferrer" target="_blank">CSS Modules</a> spec.</p>
<p>CSS Module可以开启全局变量和局部变量，:global(...)表示全局变量，可以在全局中使用样式(<a href="https://css-modules.github.io/webpack-demo/" rel="nofollow noreferrer" target="_blank">更多信息</a>)</p>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<body>
  <h1 class=&quot;h1&quot;>Hello World</h1>
  <h2 class=&quot;h2&quot;>Hello Webpack</h2>
  <div id=&quot;example&quot;></div>
  <script src=&quot;./bundle.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"h1"</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"h2"</span>&gt;</span>Hello Webpack<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>app.css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".h1 {
  color:red;
}

:global(.h2) {
  color: blue;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.h1</span> {
  <span class="hljs-attribute">color</span>:red;
}

<span class="hljs-selector-pseudo">:global(.h2)</span> {
  <span class="hljs-attribute">color</span>: blue;
}</code></pre>
<p>main.jsx</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var React = require('react');
var ReactDOM = require('react-dom');
var style = require('./app.css');

ReactDOM.render(
  <div>
    <h1 className={style.h1}>Hello World</h1>
    <h2 className=&quot;h2&quot;>Hello Webpack</h2>
  </div>,
  document.getElementById('example')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react'</span>);
<span class="hljs-keyword">var</span> ReactDOM = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-dom'</span>);
<span class="hljs-keyword">var</span> style = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./app.css'</span>);

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{style.h1}</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"h2"</span>&gt;</span>Hello Webpack<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'example'</span>)
);</code></pre>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
      }
    ]
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./main.jsx'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>:[
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js[x]?$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
        <span class="hljs-attr">query</span>: {
          <span class="hljs-attr">presets</span>: [<span class="hljs-string">'es2015'</span>, <span class="hljs-string">'react'</span>]
        }
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'style-loader!css-loader?modules'</span>
      }
    ]
  }
};</code></pre>
<p>启动服务.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">$ webpack-dev-<span class="hljs-keyword">server</span></code></pre>
<p>访问 <a href="http://127.0.0.1:8080" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:8080</a> , 你将看到只有第二个 <code>h1</code> 是红的,因为它是局部, 同时 <code>h2</code> 是蓝色的, 因为是<code>h2</code>全局的.</p>
<h2 id="articleHeader9">Demo07: UglifyJs Plugin (<a href="https://github.com/holidaying/webpack-demo/tree/master/demo07" rel="nofollow noreferrer" target="_blank">源码</a>)</h2>
<p>Webpack 可以去掉本身附加的东西，优化代码 <a href="http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin" rel="nofollow noreferrer" target="_blank">UglifyJs Plugin</a> will minify output(<code>bundle.js</code>) JS codes.</p>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var longVariableName = 'Hello';
longVariableName += ' World';
document.write('<h1>' + longVariableName + '</h1>');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> longVariableName = <span class="hljs-string">'Hello'</span>;
longVariableName += <span class="hljs-string">' World'</span>;
<span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;h1&gt;'</span> + longVariableName + <span class="hljs-string">'&lt;/h1&gt;'</span>);</code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<body>
  <script src=&quot;bundle.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./main.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> uglifyJsPlugin({
      <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
      }
    })
  ]
};</code></pre>
<p>启动服务后, <code>main.js</code> 将会压缩如下.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o=&quot;Hello&quot;;o+=&quot; World&quot;,document.write(&quot;<h1>&quot;+o+&quot;</h1>&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> o=<span class="hljs-string">"Hello"</span>;o+=<span class="hljs-string">" World"</span>,<span class="hljs-built_in">document</span>.write(<span class="hljs-string">"&lt;h1&gt;"</span>+o+<span class="hljs-string">"&lt;/h1&gt;"</span>)</code></pre>
<h2 id="articleHeader10">Demo08: HTML Webpack Plugin and Open Browser Webpack Plugin (<a href="https://github.com/holidaying/webpack-demo/tree/master/demo08" rel="nofollow noreferrer" target="_blank">源码</a>)</h2>
<p>这个例子需要加载三个插件</p>
<p><a href="https://github.com/ampedandwired/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">html-webpack-plugin</a> 创建 <code>index.html</code> ，<a href="https://github.com/baldore/open-browser-webpack-plugin" rel="nofollow noreferrer" target="_blank">open-browser-webpack-plugin</a> 打开浏览器</p>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.write('<h1>Hello World</h1>');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;h1&gt;Hello World&lt;/h1&gt;'</span>);</code></pre>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Webpack-demos',
      filename: 'index.html'
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    })
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> HtmlwebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">var</span> OpenBrowserPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'open-browser-webpack-plugin'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./main.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> HtmlwebpackPlugin({
      <span class="hljs-attr">title</span>: <span class="hljs-string">'Webpack-demos'</span>,
      <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>
    }),
    <span class="hljs-keyword">new</span> OpenBrowserPlugin({
      <span class="hljs-attr">url</span>: <span class="hljs-string">'http://localhost:8080'</span>
    })
  ]
};</code></pre>
<p>启动 <code>webpack-dev-server</code>.启动这个需要node7版本以上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">$ webpack-dev-<span class="hljs-keyword">server</span></code></pre>
<p>不用手写<code>index.html</code> 也不用手动打开浏览器 Webpack 可以为你做这些事.</p>
<h2 id="articleHeader11">Demo09: 设置环境变量 (<a href="https://github.com/holidaying/webpack-demo/tree/master/demo09" rel="nofollow noreferrer" target="_blank">源码</a>)</h2>
<p>你可以利用环境变量来控制特定代码的输出</p>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.write('<h1>Hello World</h1>');

if (__DEV__) {
  document.write(new Date());
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;h1&gt;Hello World&lt;/h1&gt;'</span>);

<span class="hljs-keyword">if</span> (__DEV__) {
  <span class="hljs-built_in">document</span>.write(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>());
}</code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<body>
  <script src=&quot;bundle.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [devFlagPlugin]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-keyword">var</span> devFlagPlugin = <span class="hljs-keyword">new</span> webpack.DefinePlugin({
  <span class="hljs-attr">__DEV__</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-built_in">JSON</span>.parse(process.env.DEBUG || <span class="hljs-string">'false'</span>))
});

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./main.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-attr">plugins</span>: [devFlagPlugin]
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Linux &amp; Mac
$ env DEBUG=true webpack-dev-server

# Windows
$ set DEBUG=true
$ webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-comment"># Linux &amp; Mac</span>
<span class="hljs-variable">$ </span>env DEBUG=<span class="hljs-keyword">true</span> webpack-dev-server

<span class="hljs-comment"># Windows</span>
<span class="hljs-variable">$ </span>set DEBUG=<span class="hljs-keyword">true</span>
<span class="hljs-variable">$ </span>webpack-dev-server</code></pre>
<h2 id="articleHeader12">Demo10: Code splitting (<a href="https://github.com/holidaying/webpack-demo/tree/master/demo10" rel="nofollow noreferrer" target="_blank">源码</a>)</h2>
<p>对于大型项目，把所有代码编译到一个文件并不是有效的, Webpack 允许你把代码分成好多块. 特别是某种情况下，只需要个别代码这些块可以按需加载。<br>在commonjs中有一个Modules/Async/A规范，里面定义了require.ensure语法。webpack实现了它，作用是可以在打包的时候进行代码分片，并异步加载分片后的代码。用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require.ensure([], function(require){
    var list = require('./list');
    list.show();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(require)</span></span>{
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">list</span> = <span class="hljs-keyword">require</span>(<span class="hljs-string">'./list'</span>);
    <span class="hljs-keyword">list</span>.show();
});</code></pre>
<p>此时list.js会被打包成一个单独的chunk文件，大概长这样：<br>1.fb874860b35831bc96a8.js<br>可读性比较差。我在上一篇结尾也提到了，给它命名的方式，那就是给require.ensure传递第三个参数，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require.ensure([], function(require){
    var list = require('./list');
    list.show();
}, 'list');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(require)</span></span>{
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">list</span> = <span class="hljs-keyword">require</span>(<span class="hljs-string">'./list'</span>);
    <span class="hljs-keyword">list</span>.show();
}, <span class="hljs-string">'list'</span>);</code></pre>
<p>这样就能得到你想要的文件名称：<br>首先，你需要用 <code>require.ensure</code> to 来定义一个分割的点. (<a href="http://webpack.github.io/docs/code-splitting.html" rel="nofollow noreferrer" target="_blank">官方文档</a>)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
require.ensure(['./a'], function(require) {
  var content = require('./a');
  document.open();
  document.write('<h1>' + content + '</h1>');
  document.close();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// main.js</span>
<span class="hljs-built_in">require</span>.ensure([<span class="hljs-string">'./a'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{
  <span class="hljs-keyword">var</span> content = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./a'</span>);
  <span class="hljs-built_in">document</span>.open();
  <span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;h1&gt;'</span> + content + <span class="hljs-string">'&lt;/h1&gt;'</span>);
  <span class="hljs-built_in">document</span>.close();
});</code></pre>
<p><code>require.ensure</code> 告诉 Webpack  <code>./a.js</code> 应该从 <code>bundle.js</code> 中分离成一个单独的块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// a.js
module.exports = 'Hello World';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// a.js</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-string">'Hello World'</span>;</code></pre>
<p>Now Webpack takes care of the dependencies, output files and runtime stuff. You don't have to put any redundancy into your <code>index.html</code> and <code>webpack.config.js</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
  <body>
    <script src=&quot;bundle.js&quot;></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./main.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  }
};</code></pre>
<p>启动服务.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">$ webpack-dev-<span class="hljs-keyword">server</span></code></pre>
<p>在界面上, 你感觉不到任何不一样的地方. 但是, Webpack 已经把 <code>main.js</code> 和 <code>a.js</code> 编译成(<code>bundle.js</code> 和 <code>1.bundle.js</code>)的块。</p>
<h2 id="articleHeader13">Demo11: 通过bundle-loader进行代码分裂 (<a href="https://github.com/holidaying/webpack-demo/tree/master/demo11" rel="nofollow noreferrer" target="_blank">源码</a>)</h2>
<p>dem10是一种，另一种是利用<a href="https://www.npmjs.com/package/bundle-loader" rel="nofollow noreferrer" target="_blank">bundle-loader</a>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js

// Now a.js is requested, it will be bundled into another file
var load = require('bundle-loader!./a.js');

// To wait until a.js is available (and get the exports)
//  you need to async wait for it.
load(function(file) {
  document.open();
  document.write('<h1>' + file + '</h1>');
  document.close();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// main.js</span>

<span class="hljs-comment">// Now a.js is requested, it will be bundled into another file</span>
<span class="hljs-keyword">var</span> load = <span class="hljs-built_in">require</span>(<span class="hljs-string">'bundle-loader!./a.js'</span>);

<span class="hljs-comment">// To wait until a.js is available (and get the exports)</span>
<span class="hljs-comment">//  you need to async wait for it.</span>
load(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file</span>) </span>{
  <span class="hljs-built_in">document</span>.open();
  <span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;h1&gt;'</span> + file + <span class="hljs-string">'&lt;/h1&gt;'</span>);
  <span class="hljs-built_in">document</span>.close();
});</code></pre>
<p><code>require('bundle-loader!./a.js')</code> tells Webpack to load <code>a.js</code> from another chunk.</p>
<p>Now Webpack will build <code>main.js</code> into <code>bundle.js</code>, and <code>a.js</code> into <code>1.bundle.js</code>.</p>
<h2 id="articleHeader14">Demo12: Common chunk (<a href="https://github.com/holidaying/webpack-demo/tree/master/demo12" rel="nofollow noreferrer" target="_blank">源码</a>)</h2>
<p>利用webpack.optimize.CommonsChunkPlugin，你可以共通的组件，代码块分离出来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main1.jsx
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello World</h1>,
  document.getElementById('a')
);

// main2.jsx
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h2>Hello Webpack</h2>,
  document.getElementById('b')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// main1.jsx</span>
<span class="hljs-keyword">var</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react'</span>);
<span class="hljs-keyword">var</span> ReactDOM = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-dom'</span>);

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'a'</span>)
);

<span class="hljs-comment">// main2.jsx</span>
<span class="hljs-keyword">var</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react'</span>);
<span class="hljs-keyword">var</span> ReactDOM = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-dom'</span>);

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Hello Webpack<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'b'</span>)
);</code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
  <body>
    <div id=&quot;a&quot;></div>
    <div id=&quot;b&quot;></div>
    <script src=&quot;init.js&quot;></script>
    <script src=&quot;bundle1.js&quot;></script>
    <script src=&quot;bundle2.js&quot;></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"a"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"b"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"init.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle1.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle2.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
  entry: {
    bundle1: './main1.jsx',
    bundle2: './main2.jsx'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  },
  plugins: [
    new CommonsChunkPlugin('init.js')
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> CommonsChunkPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">bundle1</span>: <span class="hljs-string">'./main1.jsx'</span>,
    <span class="hljs-attr">bundle2</span>: <span class="hljs-string">'./main2.jsx'</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>:[
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js[x]?$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
        <span class="hljs-attr">query</span>: {
          <span class="hljs-attr">presets</span>: [<span class="hljs-string">'es2015'</span>, <span class="hljs-string">'react'</span>]
        }
      },
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> CommonsChunkPlugin(<span class="hljs-string">'init.js'</span>)
  ]
}</code></pre>
<h2 id="articleHeader15">Demo13: Vendor chunk (<a href="https://github.com/holidaying/webpack-demo/tree/master/demo13" rel="nofollow noreferrer" target="_blank">源码</a>)</h2>
<p>利用webpack.optimize.CommonsChunkPlugin，你可以把第三方库抽离出来</p>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $ = require('jquery');
$('h1').text('Hello World');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> $ = <span class="hljs-built_in">require</span>(<span class="hljs-string">'jquery'</span>);
$(<span class="hljs-string">'h1'</span>).text(<span class="hljs-string">'Hello World'</span>);</code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
  <body>
    <h1></h1>
    <script src=&quot;vendor.js&quot;></script>
    <script src=&quot;bundle.js&quot;></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vendor.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');

module.exports = {
  entry: {
    app: './main.js',
    vendor: ['jquery'],
  },
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js')
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">'./main.js'</span>,
    <span class="hljs-attr">vendor</span>: [<span class="hljs-string">'jquery'</span>],
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-comment">/* chunkName= */</span><span class="hljs-string">'vendor'</span>, <span class="hljs-comment">/* filename= */</span><span class="hljs-string">'vendor.js'</span>)
  ]
};</code></pre>
<p>If you want a module available as variable in every module, such as making $ and jQuery available in every module without writing <code>require("jquery")</code>. You should use <code>ProvidePlugin</code> (<a href="http://webpack.github.io/docs/shimming-modules.html" rel="nofollow noreferrer" target="_blank">官方文档</a>).</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
$('h1').text('Hello World');


// webpack.config.js
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './main.js'
  },
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: &quot;jquery&quot;,
      jQuery: &quot;jquery&quot;,
      &quot;window.jQuery&quot;: &quot;jquery&quot;
    })
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// main.js</span>
$(<span class="hljs-string">'h1'</span>).text(<span class="hljs-string">'Hello World'</span>);


<span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">'./main.js'</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.ProvidePlugin({
      <span class="hljs-attr">$</span>: <span class="hljs-string">"jquery"</span>,
      <span class="hljs-attr">jQuery</span>: <span class="hljs-string">"jquery"</span>,
      <span class="hljs-string">"window.jQuery"</span>: <span class="hljs-string">"jquery"</span>
    })
  ]
};</code></pre>
<p>插件会执行两次这个方法，第一次将公共的第三方代码抽离移到vendor的块中，这个过程之前也讲过会将运行时runtime也转移到vendor块中，第二次执行则是将运行时runtime抽离出来转移到manifest块中。这步操作解决了缓存问题。<br>这样处理，最后会生成3个打包文件chunk，app.js是业务代码，vendor则是公共的第三方代码，manifest.js则是运行时。</p>
<h2 id="articleHeader16">Demo14: Exposing global variables (<a href="https://github.com/holidaying/webpack-demo/tree/master/demo14" rel="nofollow noreferrer" target="_blank">源码</a>)</h2>
<p>webpack可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问。如果你想引入一些全局变量, 但是不想被加载处理, 你可以在 <code>webpack.config.js</code> 使用 <code>externals</code> 模块 (<a href="http://webpack.github.io/docs/library-and-externals.html" rel="nofollow noreferrer" target="_blank">官方文档</a>).<br>有时我们希望我们通过script引入的库，如用CDN的方式引入的jquery，我们在使用时，依旧用require的方式来使用，但是却不希望webpack将它又编译进文件中。<br>&lt;script src="<a href="http://code.jquery.com/jquery-1.12.0.min.js%22&gt;&lt;/script&gt;" rel="nofollow noreferrer" target="_blank">http://code.jquery.com/jquery...</a><br>例子, <code>data.js</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = 'Hello World';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> data = <span class="hljs-string">'Hello World'</span>;</code></pre>
<p>We can expose <code>data</code> as a global variable.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
module.exports = {
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  },
  externals: {
    // require('data') is external and available
    //  on the global var data
    'data': 'data'
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./main.jsx'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>:[
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js[x]?$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
        <span class="hljs-attr">query</span>: {
          <span class="hljs-attr">presets</span>: [<span class="hljs-string">'es2015'</span>, <span class="hljs-string">'react'</span>]
        }
      },
    ]
  },
  <span class="hljs-attr">externals</span>: {
    <span class="hljs-comment">// require('data') is external and available</span>
    <span class="hljs-comment">//  on the global var data</span>
    <span class="hljs-string">'data'</span>: <span class="hljs-string">'data'</span>
  }
};</code></pre>
<p>现在, 你可以require <code>data</code> 作为模块化引入进来使用. 但是实际上是一个全局变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.jsx
var data = require('data');
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>{data}</h1>,
  document.body
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// main.jsx</span>
<span class="hljs-keyword">var</span> data = <span class="hljs-built_in">require</span>(<span class="hljs-string">'data'</span>);
<span class="hljs-keyword">var</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react'</span>);
<span class="hljs-keyword">var</span> ReactDOM = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-dom'</span>);

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{data}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>,
  <span class="hljs-built_in">document</span>.body
);</code></pre>
<h2 id="articleHeader17">Demo15: 热模块替换/热更新 (<a href="https://github.com/holidaying/webpack-demo/tree/master/demo15" rel="nofollow noreferrer" target="_blank">源码</a>)</h2>
<p><a href="https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack" rel="nofollow noreferrer" target="_blank">Hot Module Replacement</a> (HMR) exchanges, adds, or removes modules while an application is running <strong>without a page reload</strong>.</p>
<p>通过webpack-dev-server.你可以使用<a href="http://webpack.github.io/docs/webpack-dev-server.html#hot-module-replacement" rel="nofollow noreferrer" target="_blank">2中方式</a> 来进行热模块替换</p>
<p>(1) Specify <code>--hot</code> and <code>--inline</code> on the command line</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server --hot --inline" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">$</span> <span class="hljs-comment">webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">hot</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">inline</span></code></pre>
<p>参数的意思:</p>
<ul>
<li><p><code>--hot</code>: adds the HotModuleReplacementPlugin and switch the server to hot mode.</p></li>
<li><p><code>--inline</code>: embed the webpack-dev-server runtime into the bundle.</p></li>
<li><p><code>--hot --inline</code>: also adds the webpack/hot/dev-server entry.</p></li>
</ul>
<p>(2) 修改 <code>webpack.config.js</code>.</p>
<ul>
<li><p>添加 <code>new webpack.HotModuleReplacementPlugin()</code> to the <code>plugins</code> 模块</p></li>
<li><p>添加 <code>webpack/hot/dev-server</code> 和 <code>webpack-dev-server/client?http://localhost:8080</code> to the <code>entry</code> 模块</p></li>
</ul>
<p><code>webpack.config.js</code> 如下所示.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './index.js'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      },
      include: path.join(__dirname, '.')
    }]
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: [
    <span class="hljs-string">'webpack/hot/dev-server'</span>,
    <span class="hljs-string">'webpack-dev-server/client?http://localhost:8080'</span>,
    <span class="hljs-string">'./index.js'</span>
  ],
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>,
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/static/'</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
  ],
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [{
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,
      <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
      <span class="hljs-attr">query</span>: {
        <span class="hljs-attr">presets</span>: [<span class="hljs-string">'es2015'</span>, <span class="hljs-string">'react'</span>]
      },
      <span class="hljs-attr">include</span>: path.join(__dirname, <span class="hljs-string">'.'</span>)
    }]
  }
};</code></pre>
<p>启动服务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">$ webpack-dev-<span class="hljs-keyword">server</span></code></pre>
<p>访问 <a href="http://localhost:8080," rel="nofollow noreferrer" target="_blank">http://localhost:8080,</a> 你可以在浏览器上看到 'Hello World' .</p>
<p>不要关闭服务.打开终端找到 <code>App.js</code>, 同时修改 'Hello World' 为 'Hello Webpack'. 保存后，你就可以在浏览器上看到数据更新了</p>
<p>App.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <h1>Hello World</h1>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
    );
  }
}</code></pre>
<p>index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>;

ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>, document.getElementById('root'));</span></code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
  <body>
    <div id='root'></div>
    <script src=&quot;/static/bundle.js&quot;></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'root'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/static/bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader18">Demo16: React router例子 (<a href="https://github.com/holidaying/webpack-demo/tree/master/demo16" rel="nofollow noreferrer" target="_blank">源码</a>)</h2>
<p>利用webpack做的例子 <a href="https://github.com/rackt/react-router/blob/0.13.x/docs/guides/overview.md" rel="nofollow noreferrer" target="_blank">React-router</a>'s 官方例子.</p>
<p>Let's imagine a little app with a dashboard, inbox, and calendar.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+---------------------------------------------------------+
| +---------+ +-------+ +--------+                        |
| |Dashboard| | Inbox | |Calendar|      Logged in as Jane |
| +---------+ +-------+ +--------+                        |
+---------------------------------------------------------+
|                                                         |
|                        Dashboard                        |
|                                                         |
|                                                         |
|   +---------------------+    +----------------------+   |
|   |                     |    |                      |   |
|   | +              +    |    +--------->            |   |
|   | |              |    |    |                      |   |
|   | |   +          |    |    +------------->        |   |
|   | |   |    +     |    |    |                      |   |
|   | |   |    |     |    |    |                      |   |
|   +-+---+----+-----+----+    +----------------------+   |
|                                                         |
+---------------------------------------------------------+" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>+---------------------------------------------------------+
|<span class="hljs-string"> +---------+ +-------+ +--------+                        </span>|
|<span class="hljs-string"> </span>|<span class="hljs-string">Dashboard</span>|<span class="hljs-string"> </span>|<span class="hljs-string"> Inbox </span>|<span class="hljs-string"> </span>|<span class="hljs-string">Calendar</span>|<span class="hljs-string">      Logged in as Jane </span>|
|<span class="hljs-string"> +---------+ +-------+ +--------+                        </span>|
+---------------------------------------------------------+
|<span class="hljs-string">                                                         </span>|
|<span class="hljs-string">                        Dashboard                        </span>|
|<span class="hljs-string">                                                         </span>|
|<span class="hljs-string">                                                         </span>|
|<span class="hljs-string">   +---------------------+    +----------------------+   </span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">                     </span>|<span class="hljs-string">    </span>|<span class="hljs-string">                      </span>|<span class="hljs-string">   </span>|
|<span class="hljs-string">   </span>|<span class="hljs-string"> +              +    </span>|<span class="hljs-string">    +---------&gt;            </span>|<span class="hljs-string">   </span>|
|<span class="hljs-string">   </span>|<span class="hljs-string"> </span>|<span class="hljs-string">              </span>|<span class="hljs-string">    </span>|<span class="hljs-string">    </span>|<span class="hljs-string">                      </span>|<span class="hljs-string">   </span>|
|<span class="hljs-string">   </span>|<span class="hljs-string"> </span>|<span class="hljs-string">   +          </span>|<span class="hljs-string">    </span>|<span class="hljs-string">    +-------------&gt;        </span>|<span class="hljs-string">   </span>|
|<span class="hljs-string">   </span>|<span class="hljs-string"> </span>|<span class="hljs-string">   </span>|<span class="hljs-string">    +     </span>|<span class="hljs-string">    </span>|<span class="hljs-string">    </span>|<span class="hljs-string">                      </span>|<span class="hljs-string">   </span>|
|<span class="hljs-string">   </span>|<span class="hljs-string"> </span>|<span class="hljs-string">   </span>|<span class="hljs-string">    </span>|<span class="hljs-string">     </span>|<span class="hljs-string">    </span>|<span class="hljs-string">    </span>|<span class="hljs-string">                      </span>|<span class="hljs-string">   </span>|
|<span class="hljs-string">   +-+---+----+-----+----+    +----------------------+   </span>|
|<span class="hljs-string">                                                         </span>|
+---------------------------------------------------------+</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server --history-api-fallback" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">$ webpack-dev-server <span class="hljs-comment">--history-api-fallback</span></code></pre>
<h2 id="articleHeader19">参照文档</h2>
<ul>
<li><p><a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">Webpack docs</a></p></li>
<li><p><a href="https://github.com/petehunt/webpack-howto" rel="nofollow noreferrer" target="_blank">webpack-howto</a>, by Pete Hunt</p></li>
<li><p><a href="https://web-design-weekly.com/2014/09/24/diving-webpack/" rel="nofollow noreferrer" target="_blank">Diving into Webpack</a>, by Web Design Weekly</p></li>
<li><p><a href="http://www.christianalfoni.com/articles/2014_12_13_Webpack-and-react-is-awesome" rel="nofollow noreferrer" target="_blank">Webpack and React is awesome</a>, by Christian Alfoni</p></li>
<li><p><a href="https://medium.com/@housecor/browserify-vs-webpack-b3d7ca08a0a9" rel="nofollow noreferrer" target="_blank">Browserify vs Webpack</a>, by Cory House</p></li>
<li><p><a href="https://christianalfoni.github.io/react-webpack-cookbook/index.html" rel="nofollow noreferrer" target="_blank">React Webpack cookbook</a>, by Christian Alfoni</p></li>
</ul>
<p><a href="https://github.com/holidaying/ui-home/wiki" rel="nofollow noreferrer" target="_blank">免费送上UI资源库</a></p>
<blockquote><p>全文参考阮老师的教程。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
请练完这16个webpack小例子

## 原文链接
[https://segmentfault.com/a/1190000009038067](https://segmentfault.com/a/1190000009038067)


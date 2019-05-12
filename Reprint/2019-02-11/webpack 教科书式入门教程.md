---
title: 'webpack 教科书式入门教程' 
date: 2019-02-11 2:30:49
hidden: true
slug: asbuqi0b516
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><a href="https://segmentfault.com/a/1190000014466696">Webpack4.x 教程</a></h2>
<blockquote>最近刚用完 <code>gulp</code> 又来捣鼓捣鼓 <code>webpack</code> ，这只是个简单的新手入门教程...不多说；<br><em>注意：安装<code>webpack</code>前检查nodejs的安装目录路径是否存在空格( <code>Program Files (x86)</code> )，建议安装在无空格文件夹目录下。</em>
</blockquote>
<h2 id="articleHeader1">安装</h2>
<p>全局安装（<em>以管理员身份运行命令行</em>）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install webpack -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> webpack -g</code></pre>
<p>初始配置文件 <code>package.json</code> （<em>一直回车，就会在项目目录下生成该文件</em>）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-built_in">npm</span> init</code></pre>
<p>到项目目录安装，将 <code>webpack</code> 添加到 <code>package.json</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install webpack --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">$ npm install webpack --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>安装完成后，打开 <code>package.json</code> 将会看到如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;webpack-test&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;,
  &quot;devDependencies&quot;: {
    &quot;webpack&quot;: &quot;^1.13.0&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"webpack-test"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"ISC"</span>,
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^1.13.0"</span>
  }
}</code></pre>
<p><em>同时还可以选择，安装不同的版本</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install webpack@1.2.x --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>npm install webpack<span class="hljs-variable">@1</span>.<span class="hljs-number">2</span>.x --save-dev</code></pre>
<h2 id="articleHeader2">举颗栗子</h2>
<p>在项目目录下创建入口文件 <code>entry.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim entry.js

document.write(&quot;hello webpack!&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>vim entry.<span class="hljs-keyword">js
</span>
document.write(<span class="hljs-string">"hello webpack!"</span>)<span class="hljs-comment">;</span></code></pre>
<p>创建 <code>index.html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim index.html

<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>webpack</title>    
</head>
<body>
    <script type=&quot;text/javascript&quot; src=&quot;./bundle.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>vim index.html

<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>webpack<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>    
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>Run一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack ./entry.js bundle.js --colors" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">$ webpack ./entry<span class="hljs-selector-class">.js</span> bundle<span class="hljs-selector-class">.js</span> --colors</code></pre>
<p>如果成功，会显示如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Version: webpack 1.13.0
Time: 34ms
    Asset     Size  Chunks             Chunk Names
bunble.js  1.42 kB       0  [emitted]  main
   [0] ./entry.js 33 bytes {0} [built]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code>Version: webpack 1.13.0
<span class="hljs-keyword">Time:</span> 34ms
    Asset     Size  Chunks             Chunk Names
bunble.js  1.42 kB       0  [emitted]  main
   [0] ./entry.js 33 bytes {0} [built]</code></pre>
<p>接下来打开 <code>index.html</code> 如果页面上显示 hello webpack 说明已经成功第一步了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hello webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">hello webpack</span></code></pre>
<h2 id="articleHeader3">添加一个文件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim content.js

module.exports = &quot;这里是 content.js 的内容！&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code>vim content.js

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = <span class="hljs-string">"这里是 content.js 的内容！"</span>;</code></pre>
<p>更新一下 <code>entry.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.write(require(&quot;./content.js&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.write(<span class="hljs-built_in">require</span>(<span class="hljs-string">"./content.js"</span>));</code></pre>
<p>继续Run一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack ./entry.js bundle.js --colors" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">$ webpack ./entry<span class="hljs-selector-class">.js</span> bundle<span class="hljs-selector-class">.js</span> --colors</code></pre>
<p>打开 <code>index.html</code> 将会看到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="这里是 content.js 的内容！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">这里是 <span class="hljs-selector-tag">content</span><span class="hljs-selector-class">.js</span> 的内容！</code></pre>
<h2 id="articleHeader4">打包CSS</h2>
<p>安装 <code>css-loader</code> , <code>style-loader</code> 模块<br>其他模块：<a href="http://webpack.github.io/docs/loader-conventions.html" rel="nofollow noreferrer" target="_blank">http://webpack.github.io/docs...</a></p>
<blockquote>
<code>.css</code> 文件使用 <code>style-loader</code> 和 <code>css-loader</code> 来处理<br><code>.js</code> 文件使用 <code>jsx-loader</code> 来编译处理<br><code>.scss</code> 文件使用 <code>style-loader</code>、<code>css-loader</code> 和 <code>sass-loader</code> 来编译处理</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install css-loader --save or $ npm install css-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">$ npm install css-loader --<span class="hljs-built_in">save</span> <span class="hljs-built_in">or</span> $ npm install css-loader --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>添加文件 <code>style.css</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim css/style.css

body{
    font-size: 36px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>vim css/style<span class="hljs-selector-class">.css</span>

body{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">36px</span>;
}</code></pre>
<p>更新 <code>entry.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;!style!css!./css/style.css&quot;);
document.write(require(&quot;./content.js&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">"!style!css!./css/style.css"</span>);
<span class="hljs-built_in">document</span>.write(<span class="hljs-built_in">require</span>(<span class="hljs-string">"./content.js"</span>));</code></pre>
<p>Run一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack ./entry.js bundle.js --colors" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">$ webpack ./entry<span class="hljs-selector-class">.js</span> bundle<span class="hljs-selector-class">.js</span> --colors</code></pre>
<h2 id="articleHeader5">加载器测试</h2>
<p>更新 <code>entry.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- require(&quot;!style!css!./css/style.css&quot;);
+ require(&quot;./css/style.css&quot;);
document.write(require(&quot;./content.js&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>- <span class="hljs-built_in">require</span>(<span class="hljs-string">"!style!css!./css/style.css"</span>);
+ <span class="hljs-built_in">require</span>(<span class="hljs-string">"./css/style.css"</span>);
<span class="hljs-built_in">document</span>.write(<span class="hljs-built_in">require</span>(<span class="hljs-string">"./content.js"</span>));</code></pre>
<p>Run一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack ./entry.js bundle.js --module-bind 'css=style!css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">$ webpack ./entry<span class="hljs-selector-class">.js</span> bundle<span class="hljs-selector-class">.js</span> --module-bind <span class="hljs-string">'css=style!css'</span></code></pre>
<h2 id="articleHeader6">使用 <code>webpack.config.js</code>
</h2>
<p><em>每个项目下都必须配置有一个 <code>webpack.config.js</code> ，它的作用如同常规的 <code>gulpfile.js/Gruntfile.js</code> ，就是一个配置项，告诉 <code>webpack</code> 它需要做什么。</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim webpack.config.js

module.exports = {
    entry: &quot;./entry.js&quot;,
    output: {
        path: __dirname,
        filename: &quot;bundle.js&quot;
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: &quot;style!css&quot; }
        ]
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>vim webpack.config.js

module.exports = {
<span class="hljs-symbol">    entry:</span> <span class="hljs-string">"./entry.js"</span>,
<span class="hljs-symbol">    output:</span> {
<span class="hljs-symbol">        path:</span> __dirname,
<span class="hljs-symbol">        filename:</span> <span class="hljs-string">"bundle.js"</span>
    },
<span class="hljs-symbol">    module:</span> {
<span class="hljs-symbol">        loaders:</span> [
            { test: /\.css$/, loader: <span class="hljs-string">"style!css"</span> }
        ]
    }
};</code></pre>
<p>Now we can just run</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>webpack</code></pre>
<p><em><code>webpack</code> 命令会优先读取项目中的 <code>webpack.config.js</code> 文件</em></p>
<h2 id="articleHeader7">一些参数</h2>
<ul>
<li>--progress 打印打包日志</li>
<li>--colors  带颜色的日志</li>
<li>--watch  监控自动打包</li>
<li>-d 生成map映射文件</li>
<li>-p 压缩混淆脚本</li>
</ul>
<h2 id="articleHeader8">开发服务器</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install webpack-dev-server -g
$ webpack-dev-server --progress --colors" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>$ npm <span class="hljs-keyword">install</span> webpack-dev-<span class="hljs-keyword">server</span> -g
$ webpack-dev-<span class="hljs-keyword">server</span> <span class="hljs-comment">--progress --colors</span></code></pre>
<p>服务器可以自动生成和刷新，修改代码保存后自动更新画面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://localhost:8080/webpack-dev-server/bundle" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">http:<span class="hljs-regexp">//</span>localhost:<span class="hljs-number">8080</span><span class="hljs-regexp">/webpack-dev-server/</span>bundle</code></pre>
<h2 id="articleHeader9">很棒的DEMO</h2>
<p><em>我是写完这个才发现这个教程的...不过不晚</em><br>传送门：<a href="https://github.com/ruanyf/webpack-demos" rel="nofollow noreferrer" target="_blank">https://github.com/ruanyf/web...</a></p>
<h2 id="articleHeader10">Reference API</h2>
<p>官网： <a href="http://webpack.github.io/" rel="nofollow noreferrer" target="_blank">http://webpack.github.io/</a><br>文档： <a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">http://webpack.github.io/docs/</a></p>
<blockquote>如有不正之处，欢迎指正。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack 教科书式入门教程

## 原文链接
[https://segmentfault.com/a/1190000005022872](https://segmentfault.com/a/1190000005022872)


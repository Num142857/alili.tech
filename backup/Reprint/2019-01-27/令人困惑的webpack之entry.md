---
title: '令人困惑的webpack之entry' 
date: 2019-01-27 2:30:59
hidden: true
slug: bf6ozh58fso
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>使用webpack快一年了，现在1.X版本都过气了，但是感觉自己对它那复杂的配置还是很不熟悉，各种路径，各种loader，各种plugin，又是单页面又是多页面... 在vue-cli出来的时候，都不敢用他的webpack模板，主要就是因为webpack的配置文件看不懂，不敢自己根据需要做修改。现在沉下心来，一点一点的玩弄常用属性和插件，尽力能自如的进行配置。先拿配置中的<code>entry</code>开始。</p></blockquote>
<h2 id="articleHeader0">从最简单开始</h2>
<p>最简单的webpack.config.js文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: './app.js',
    output: {
        path: './output',
        filename: 'output-file.js'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    entry: <span class="hljs-string">'./app.js'</span>,
    output: {
        path: <span class="hljs-string">'./output'</span>,
        filename: <span class="hljs-string">'output-file.js'</span>
    }
}</code></pre>
<p>这个足够简单，进行webpack之后，会在命令的执行目录下新建output目录（如果需要的话），并将打包app.js和它的依赖，生成output-file.js放在output目录中：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008288243?w=287&amp;h=115" src="https://static.alili.tech/img/remote/1460000008288243?w=287&amp;h=115" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果不希望这里涉及到的路径和执行webpack命令时的具体路径相关，而是希望相对于配置文件的路径的话，就需要使用<code>path</code>模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')

module.exports = {
    entry: path.resolve(__dirname, './app.js'),
    output: {
        path: path.resolve(__dirname, './output'),
        filename: 'output-file.js'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> path = require(<span class="hljs-string">'path'</span>)

module<span class="hljs-selector-class">.exports</span> = {
    entry: path.resolve(__dirname, <span class="hljs-string">'./app.js'</span>),
    output: {
        path: path.resolve(__dirname, <span class="hljs-string">'./output'</span>),
        filename: <span class="hljs-string">'output-file.js'</span>
    }
}</code></pre>
<h2 id="articleHeader1">entry的三种形式</h2>
<p>配置文件中<code>entry</code>接受三种形式的值：字符串，数组和对象</p>
<h3 id="articleHeader2">对象entry</h3>
<p>对象形式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    <key>: <value>
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">entry:</span> {
    <span class="hljs-params">&lt;key&gt;</span>: <span class="hljs-params">&lt;value&gt;</span>
    ...
}</code></pre>
<p>最先介绍对象形式，是因为这个是最完整的entry配置，其他形式只是它的简化形式而已。对象中的每一对属性对，都代表着一个入口文件，因此多页面配置时，肯定是要用这种形式的entry配置。</p>
<p><strong>key</strong></p>
<p>key可以是简单的字符串，比如：'app', 'main', 'entry-1'等。并且对应着<code>output.filename</code>配置中的<code>[name]</code>变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    'app-entry': './app.js'
},
output: {
    path: './output',
    filename: '[name].js'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">entry</span>: {
    <span class="hljs-string">'app-entry'</span>: <span class="hljs-string">'./app.js'</span>
},
<span class="hljs-attribute">output</span>: {
    <span class="hljs-attribute">path</span>: <span class="hljs-string">'./output'</span>,
    <span class="hljs-attribute">filename</span>: <span class="hljs-string">'[name].js'</span>
}</code></pre>
<p>上面的配置打包后生成：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008288244?w=262&amp;h=118" src="https://static.alili.tech/img/remote/1460000008288244?w=262&amp;h=118" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>key还可以是路径字符串。此时webpack会自动生成路径目录，并将路径的最后作为<code>[name]</code>。这个特性在多页面配置下也是很有用的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    'path/of/entry': './deep-app.js',
    'app': './app.js'
},
output: {
    path: './output',
    filename: '[name].js'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">entry</span>: {
    <span class="hljs-string">'path/of/entry'</span>: <span class="hljs-string">'./deep-app.js'</span>,
    <span class="hljs-string">'app'</span>: <span class="hljs-string">'./app.js'</span>
},
<span class="hljs-attribute">output</span>: {
    <span class="hljs-attribute">path</span>: <span class="hljs-string">'./output'</span>,
    <span class="hljs-attribute">filename</span>: <span class="hljs-string">'[name].js'</span>
}</code></pre>
<p>上面的配置打包后生成：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008288245?w=263&amp;h=189" src="https://static.alili.tech/img/remote/1460000008288245?w=263&amp;h=189" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>value</strong></p>
<p>value如果是字符串，而且必须是合理的node<code>require</code>函数参数字符串。比如<strong>文件路径</strong>：'./app.js'(<code>require('./app.js')</code>)；比如<strong>安装的npm模块</strong>：'lodash'(<code>require('lodash')</code>)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    'my-lodash': 'lodash'
},
output: {
    path: './output',
    filename: '[name].js'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">entry</span>: {
    <span class="hljs-string">'my-lodash'</span>: <span class="hljs-string">'lodash'</span>
},
<span class="hljs-attribute">output</span>: {
    <span class="hljs-attribute">path</span>: <span class="hljs-string">'./output'</span>,
    <span class="hljs-attribute">filename</span>: <span class="hljs-string">'[name].js'</span>
}</code></pre>
<p>上面的配置打包后生成：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008288246?w=259&amp;h=119" src="https://static.alili.tech/img/remote/1460000008288246?w=259&amp;h=119" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>value如果是数组，则数组中元素需要是上面描述的合理字符串值。数组中的文件一般是没有相互依赖关系的，但是又处于某些原因需要将它们打包在一起。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    vendor: ['jquery', 'lodash']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">entry</span>: {
    <span class="hljs-attribute">vendor</span>: [<span class="hljs-string">'jquery'</span>, <span class="hljs-string">'lodash'</span>]
}</code></pre>
<h3 id="articleHeader3">字符串entry</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: './app.js'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">entry:</span> <span class="hljs-string">'./app.js'</span></code></pre>
<p>等价于下面的对象形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    main: './app.js'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">entry</span>: {
    <span class="hljs-attribute">main</span>: <span class="hljs-string">'./app.js'</span>
}</code></pre>
<h3 id="articleHeader4">数组entry</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: ['./app.js', 'lodash']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">entry:</span> [<span class="hljs-string">'./app.js'</span>, <span class="hljs-string">'lodash'</span>]</code></pre>
<p>等价于下面的对象形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    main: ['./app.js', 'lodash']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">entry</span>: {
    <span class="hljs-attribute">main</span>: [<span class="hljs-string">'./app.js'</span>, <span class="hljs-string">'lodash'</span>]
}</code></pre>
<h2 id="articleHeader5">应用</h2>
<p>具备了上面的能力，就可以开始配置一个简单的多页面webpack开发环境了。</p>
<p>开始前，要考虑清楚项目目录结构，使用wepback时，一般要有个src源代码目录和一个build的打包目录。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-build
|-src
webpack.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">|-build</span>
<span class="hljs-string">|-src</span>
webpack.config.js</code></pre>
<h3 id="articleHeader6">src目录结构</h3>
<p>假设我们有两个页面home和about，两个main.js分别是两个页面的入口文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-src
    |-pages
          |-about
                about.html
                main.js
          |-home
                home.html
                main.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">|-src</span>
    <span class="hljs-string">|-pages</span>
          <span class="hljs-string">|-about</span>
                about.html
                main.js
          <span class="hljs-string">|-home</span>
                home.html
                main.js</code></pre>
<h3 id="articleHeader7">build目录结构</h3>
<p>对于复杂点的webpack项目，先决定打包后的目录结构很重要。webpack就像画笔，打包后的目录就像你打算画的画，要朝着目标去画。</p>
<p>假如我希望“画”是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-build
      |-assets
             |-js
                 home.bundle.js
                 about.bundle.js
      home.html
      about.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">|-build</span>
      <span class="hljs-string">|-assets</span>
             <span class="hljs-string">|-js</span>
                 home.bundle.js
                 about.bundle.js
      home.html
      about.html</code></pre>
<p>有了这个结构，html中如何引入js文件就清楚了，例如在src/pages/home/home.html中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;utf-8&quot;>
    <title>Home</title>
  </head>
  <body>
    Home Page
  </body>
  <script src=&quot;assets/js/home.bundle.js&quot;></script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    Home Page
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"assets/js/home.bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader8">webpack配置文件</h3>
<p>接下来，朝着build的结构，写配置文件webpack.config.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')

module.exports = {
  entry: {
    'assets/js/home': path.resolve(__dirname, './src/pages/home/main.js'),
    'assets/js/about': path.resolve(__dirname, './src/pages/about/main.js')
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].bundle.js'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>var <span class="hljs-built_in">path</span> = require(<span class="hljs-string">'path'</span>)

module.exports = {
  entry: {
    <span class="hljs-string">'assets/js/home'</span>: <span class="hljs-built_in">path</span>.resolve(__dirname, <span class="hljs-string">'./src/pages/home/main.js'</span>),
    <span class="hljs-string">'assets/js/about'</span>: <span class="hljs-built_in">path</span>.resolve(__dirname, <span class="hljs-string">'./src/pages/about/main.js'</span>)
  },
  output: {
    <span class="hljs-built_in">path</span>: <span class="hljs-built_in">path</span>.resolve(__dirname, <span class="hljs-string">'./build'</span>),
    filename: <span class="hljs-string">'[name].bundle.js'</span>
  }
}</code></pre>
<h3 id="articleHeader9">打包</h3>
<p>在webpack.config.js目录下执行webpack命令，然后手动将两个html文件从src/pages下拷贝到build目录下，这样在build目录下就是一个打包好的多页面结构了。</p>
<p>后面将用各种插件，让webpack打包全自动化，这里只是一个简单的应用例子来了解entry的用法。</p>
<h2 id="articleHeader10">结语</h2>
<p><code>entry</code>一个人能玩的基本就这么多，一些复杂的配置无非是通过变量的形式给其赋值，完成更灵活的配置。<code>entry</code>是webpack的起点，后面所有的文件生成，提取CSS，生成HTML或者是CommonChunk都是在其基础上进行的加工处理。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
令人困惑的webpack之entry

## 原文链接
[https://segmentfault.com/a/1190000008288240](https://segmentfault.com/a/1190000008288240)


---
title: '手把手教你基于ES6架构自己的React Boilerplate项目' 
date: 2019-02-11 2:30:49
hidden: true
slug: fw3kd8954xp
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p><code>React</code>技术之火爆无须多言，其与<code>webpack</code>的完美结合，也让二者毋庸置疑的成为天生一对。为了进行<code>React</code>的快速和规范化开发，开源社区中涌现了很多<code>React</code>+<code>webpack</code>的<code>boilerplate</code>项目。通过使用这些<code>boilerplate</code>，我们可以快速的创建一个React项目的架构。</p>
<p><a href="https://github.com/jiji262" rel="nofollow noreferrer" target="_blank">葱哥</a>之前专门创建了一个Github项目用于收集这些<code>boilerplate</code>：<a href="http://jiji262.github.io/awesome-react-boilerplate/" rel="nofollow noreferrer" target="_blank">awesome-react-boilerplate</a>。当然这里不可能完整收录，但是目前为止已经有近30个了。连boilerplate都这么多，真让我们眼花缭乱，无从下手。</p>
<p>当然，由于每个人的使用习惯和技术背景的不同，每个<code>boilerplate</code>都会有自己的侧重点，因此即便是公认比较好的boilerplate项目也未必适合所有人。我们拿到这些开源项目，只是知其然但是并不知其所以然。<a href="https://github.com/jiji262" rel="nofollow noreferrer" target="_blank">葱哥</a>相信，只有适合自己的，才是最好的。这就是本文的初衷，<a href="https://github.com/jiji262" rel="nofollow noreferrer" target="_blank">葱哥</a>会追根溯源，从项目开发的蛮荒阶段开始，搭建开发环境，配置<code>webpack</code>，在<code>React</code>项目中使用<code>webpack</code>，搭建项目的测试环境，一步一步构建适合适合自己的<code>React</code> + <code>webpack</code>起始项目。</p>
<p>本文陆陆续续写了将近一个月的时间，所使用的技术和依赖库均选用目前最新版本，其间大大小小的坑踩过不知道多少。本文供入门参考，如果你是前端大牛，请直接忽略此文。当然，如果读后觉得对你有帮助，还请关注<a href="https://github.com/jiji262" rel="nofollow noreferrer" target="_blank">葱哥的Github</a>。</p>
<p>TL;DR</p>
<h3 id="articleHeader1">将使用的技术栈</h3>
<p>如前所述，本文的主要目的是构建适合适合自己的<code>React</code> + <code>webpack</code>起始项目。与其他多数类似项目不同的是，我们不仅要支持ES6，使用webpack，而且要搭建一套相对完整的单元测试和自动化测试体系。本文主要使用到的相关技术如下：</p>
<ul>
<li><p>React</p></li>
<li><p>webpack</p></li>
<li><p>babel</p></li>
<li><p>ES6</p></li>
<li><p>mocha</p></li>
<li><p>chai</p></li>
<li><p>sinon</p></li>
<li><p>karma</p></li>
<li><p>phantomJS</p></li>
</ul>
<p>&lt;!--more--&gt;</p>
<h1 id="articleHeader2">webpack快速入门</h1>
<h2 id="articleHeader3">webpack介绍</h2>
<p>Webpack是一个前端模块管理工具，有点类似browserify，出自Facebook的Instagram团队，但功能比browserify更为强大，可以说是目前最为强大的前端模块管理和打包工具。</p>
<p>Webpack将项目中的所有静态资源都当做模块，模块之间可以互相依赖，由webpack对它们进行统一的管理和打包发布，下图为官方网站说明：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004839887" src="https://static.alili.tech/img/remote/1460000004839887" alt="web pack" title="web pack" style="cursor: pointer;"></span></p>
<p>webpack对React有着与生俱来的良好支持，随着React的流行，webpack也成了React项目中必不可少的一部分。特别是随着ES6的普及，使得webpack有了更广阔的用武之地。</p>
<h2 id="articleHeader4">安装配置webpack</h2>
<h3 id="articleHeader5">安装nodejs</h3>
<p>安装webpack之前，需要确认本机已经安装好了nodejs。</p>
<p>如果还没有安装，请去<a href="https://nodejs.org" rel="nofollow noreferrer" target="_blank">nodejs官网</a>下载安装即可。这里使用的node版本是V4.4.1.</p>
<h3 id="articleHeader6">初始化项目环境</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mkdir react_boilerplate
$ cd react_boilerplate\

$ npm init -y
Wrote to .\react_boilerplate\package.json:

{
  &quot;name&quot;: &quot;react_boilerplate&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;keywords&quot;: [],
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>$ <span class="hljs-keyword">mkdir</span> react_boilerplate
$ <span class="hljs-keyword">cd</span> react_boilerplate\

$ npm init -<span class="hljs-built_in">y</span>
Wrote to .\react_boilerplate\package.json:

{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"react_boilerplate"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-string">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-string">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"</span><span class="hljs-keyword">Error</span>: <span class="hljs-keyword">no</span> <span class="hljs-keyword">test</span> specified\<span class="hljs-string">" &amp;&amp; exit 1"</span>
  },
  <span class="hljs-string">"keywords"</span>: [],
  <span class="hljs-string">"author"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-string">"license"</span>: <span class="hljs-string">"ISC"</span>
}
</code></pre>
<p><code>npm init</code> 加上一个<code>-y</code>选项会生成一个默认的<code>package.json</code>,关于这个文件，不是本文重点，在此不会详述，可以参考<a href="https://docs.npmjs.com/files/package.json" rel="nofollow noreferrer" target="_blank">官方文档</a>。可以简单的理解，这个文件是用于管理项目里面的依赖包的。</p>
<h3 id="articleHeader7">设置.gitignore</h3>
<p>如果我们使用git进行版本管理，一个.gitignore文件是必要的。这里我们可以先将项目需要安装的node包目录添加进去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node_modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">node_modules</code></pre>
<p>使用<code>npm install</code>安装的node包都会在<code>node_modules</code>目录下，这个目录是不需要commit到git的。</p>
<h3 id="articleHeader8">安装webpack</h3>
<p>安装webpack很简单，命令如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i webpack --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm i webpack --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>其中<code>--save-dev</code>表示该包为开发环境依赖包。安装完后会生成一个<code>node_modules</code>目录，并且在<code>package.json</code>文件中多出如下几行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="......
  &quot;devDependencies&quot;: {
    &quot;webpack&quot;: &quot;^1.13.0&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>......
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-string">"webpack"</span>: <span class="hljs-string">"^1.13.0"</span>
  }
}
</code></pre>
<p>如果写为<code>--save</code>则表示该包为生产环境依赖包，在<code>package.json</code>文件中会新增或者修改<code>dependencies</code> 字段。</p>
<h3 id="articleHeader9">初始化项目结构和代码</h3>
<p>安装完<code>webpack</code>后，我们可以给项目中增加一些内容了。项目的简单结构如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006766281" src="https://static.alili.tech/img/remote/1460000006766281" alt="目录结构" title="目录结构" style="cursor: pointer;"></span></p>
<p><code>app</code>目录用于存放项目代码，<code>dist</code>目录为编译后的项目文件，<code>webpack.config.js</code>为<code>webpack</code>的配置文件。</p>
<p>我们给项目中的文件添加一些简单的代码，首先是组件代码：</p>
<h5>app/component.js</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function () {
  var element = document.createElement('h1');

  element.innerHTML = 'Hello world';

  return element;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'h1'</span>);

  element.innerHTML = <span class="hljs-string">'Hello world'</span>;

  <span class="hljs-keyword">return</span> element;
};</code></pre>
<p>然后需要一个入口文件，在入口文件中使用上面定义的组件：</p>
<h5>app/index.js</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var component = require('./component');

document.body.appendChild(component());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> component = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./component'</span>);

<span class="hljs-built_in">document</span>.body.appendChild(component());</code></pre>
<h3 id="articleHeader10">配置webpack</h3>
<p>我们需要让webpack知道如何处理我们的项目目录结构，因此需要配置文件<code>webpack.config.js</code>。一个简单的配置文件如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack'); 
var path = require('path');                 //引入node的path库

var config = {
  entry: ['./app/index.js'],                //入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),  // 指定编译后的代码位置为 dist/bundle.js
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      // 为webpack指定loaders
      //{ test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ }   
    ]
  }
}

module.exports = config;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>); 
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);                 <span class="hljs-comment">//引入node的path库</span>

<span class="hljs-keyword">var</span> config = {
  entry: [<span class="hljs-string">'./app/index.js'</span>],                <span class="hljs-comment">//入口文件</span>
  output: {
    path: path.resolve(__dirname, <span class="hljs-string">'dist'</span>),  <span class="hljs-comment">// 指定编译后的代码位置为 dist/bundle.js</span>
    filename: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-keyword">module</span>: {
    loaders: [
      <span class="hljs-comment">// 为webpack指定loaders</span>
      <span class="hljs-comment">//{ test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ }   </span>
    ]
  }
}

<span class="hljs-built_in">module</span>.exports = config;</code></pre>
<p>到目前为止，我们已经可以让webpack工作了，在命令行执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">webpack</span></code></pre>
<p>我们看到，会有一个新的文件<code>/dist/bundle.js</code>生成出来了。但是我们还需要一个html文件来加载编译后的代码，这就需要用到一个webpack插件：<code>html-webpack-plugin</code>。</p>
<h3 id="articleHeader11">安装<code>html-webpack-plugin</code>
</h3>
<p>使用如下命令安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install html-webpack-plugin --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> html-webpack-<span class="hljs-keyword">plugin</span> <span class="hljs-comment">--save-dev</span></code></pre>
<p>然后在我们的<code>webpack.config.js</code>中增加下面几行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  plugins: [
    new HtmlwebpackPlugin({
      title: 'React Biolerplate by Linghucong'
    })
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-attribute">plugins</span>: [
    new HtmlwebpackPlugin({
      <span class="hljs-attribute">title</span>: <span class="hljs-string">'React Biolerplate by Linghucong'</span>
    })
  ]</code></pre>
<p>现在在命令行下再次执行<code>webpack</code>命令，会看到在<code>dist</code>目录下生成了两个文件：<code>bundle.js</code>和<code>index.html</code>。其中<code>index.html</code>内容如下：</p>
<h5>dist/index.html</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;UTF-8&quot;>
    <title>React Biolerplate by Linghucong</title>
  </head>
  <body>
  <script src=&quot;bundle.js&quot;></script></body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>React Biolerplate by Linghucong<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>有必要提一下，如果我们安装webpack的时候使用的是全局安装选项（<code>npm install -g webpack</code>），可以在命令行中直接执行<code>webpack</code>命令；如果没有使用<code>-g</code>，那么要用的<code>webpack</code>可执行文件位于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./node_modules/.bin/webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">.<span class="hljs-regexp">/node_modules/</span>.bin<span class="hljs-regexp">/webpack</span></code></pre>
<p>我们可以在<code>package.json</code>中为此命令增加一个快捷方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# package.json
... other stuff
&quot;scripts&quot;: {
  &quot;build&quot;: &quot;./node_modules/.bin/webpack&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code># package.json
... other stuff
<span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"build"</span>: <span class="hljs-string">"./node_modules/.bin/webpack"</span>
}</code></pre>
<p>现在就可以直接使用命令<code>npm run build</code>来执行webpack了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run build

> react_boilerplate@1.0.0 build D:\node\react_boilerplate
> webpack

Hash: cbf754a65493b4d791d7
Version: webpack 1.13.0
Time: 919ms
     Asset       Size  Chunks             Chunk Names
 bundle.js     233 kB       0  [emitted]  main
index.html  179 bytes          [emitted]
   [0] multi main 52 bytes {0} [built]
  [75] ./app/index.js 82 bytes {0} [built]
  [76] ./app/component.js 142 bytes {0} [built]
    + 74 hidden modules
Child html-webpack-plugin for &quot;index.html&quot;:
        + 3 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>$ npm run <span class="hljs-keyword">build
</span>
&gt; react_boilerplate<span class="hljs-comment">@1.0.0 build D:\node\react_boilerplate</span>
&gt; webpack
<span class="hljs-symbol">
Hash:</span> cbf754a65493b4d791d7
<span class="hljs-symbol">Version</span>: webpack <span class="hljs-number">1</span>.<span class="hljs-number">13</span>.<span class="hljs-number">0</span>
<span class="hljs-symbol">Time</span>: <span class="hljs-number">919</span>ms
     Asset       Size  Chunks             Chunk Names
 <span class="hljs-keyword">bundle.js </span>    <span class="hljs-number">233</span> kB       <span class="hljs-number">0</span>  [emitted]  main
<span class="hljs-symbol">index.html</span>  <span class="hljs-number">179</span> <span class="hljs-keyword">bytes </span>         [emitted]
   [<span class="hljs-number">0</span>] <span class="hljs-keyword">multi </span>main <span class="hljs-number">52</span> <span class="hljs-keyword">bytes </span>{<span class="hljs-number">0</span>} [<span class="hljs-keyword">built]
</span>  [<span class="hljs-number">75</span>] ./app/index.js <span class="hljs-number">82</span> <span class="hljs-keyword">bytes </span>{<span class="hljs-number">0</span>} [<span class="hljs-keyword">built]
</span>  [<span class="hljs-number">76</span>] ./app/component.js <span class="hljs-number">142</span> <span class="hljs-keyword">bytes </span>{<span class="hljs-number">0</span>} [<span class="hljs-keyword">built]
</span>    + <span class="hljs-number">74</span> hidden modules
<span class="hljs-symbol">Child</span> html-webpack-plugin for <span class="hljs-string">"index.html"</span>:
        + <span class="hljs-number">3</span> hidden modules</code></pre>
<h3 id="articleHeader12">安装<code>webpack-dev-server</code>
</h3>
<p><code>webpack-dev-server</code>可以让我们在本地启动一个web服务器，使我们更方便的查看正在开发的项目。其安装也十分简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i webpack-dev-server --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm i webpack-<span class="hljs-built_in">dev</span>-server --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>然后在<code>webpack.config.js</code>文件中作如下修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# webpack.config.js
# ...
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000',
    './app/index.js'      //入口文件
    ],  
# ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># webpack.config.js</span>
<span class="hljs-meta"># ...</span>
  entry: [
    <span class="hljs-string">'webpack/hot/dev-server'</span>,
    <span class="hljs-string">'webpack-dev-server/client?http://localhost:3000'</span>,
    <span class="hljs-string">'./app/index.js'</span>      <span class="hljs-comment">//入口文件</span>
    ],  
<span class="hljs-meta"># ...</span></code></pre>
<p>我们可以在<code>package.json</code>中增加<code>webpack-dev-server</code>的快捷方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# package.json
... other stuff
&quot;scripts&quot;: {
  &quot;dev&quot;: &quot;webpack-dev-server --port 3000 --devtool eval --progress --colors --hot --content-base dist&quot;,
  &quot;build&quot;: &quot;./node_modules/.bin/webpack&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code># package.json
... other stuff
<span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server --port 3000 --devtool eval --progress --colors --hot --content-base dist"</span>,
  <span class="hljs-string">"build"</span>: <span class="hljs-string">"./node_modules/.bin/webpack"</span>
}</code></pre>
<p>配置中指定web服务器端口号为3000，指定目录为dist。<br>运行<code>npm run dev</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run dev

> react_boilerplate@1.0.0 dev D:\node\react_boilerplate
> webpack-dev-server --port 3000 --devtool eval --progress --colors --hot --content-base dist

......
Time: 1109ms
     Asset       Size  Chunks             Chunk Names
 bundle.js     274 kB       0  [emitted]  main
index.html  179 bytes          [emitted]
chunk    {0} bundle.js (main) 216 kB [rendered]
    [0] multi main 52 bytes {0} [built]
 ......
 ......
 ......
   [77] ./app/component.js 142 bytes {0} [built]
Child html-webpack-plugin for &quot;index.html&quot;:
    chunk    {0} index.html 505 kB [rendered]
        [0] ./~/html-webpack-plugin/lib/loader.js!./~/html-webpack-plugin/default_index.ejs 540 bytes {0} [buil
t]
        [1] ./~/lodash/lodash.js 504 kB {0} [built]
        [2] (webpack)/buildin/module.js 251 bytes {0} [built]
webpack: bundle is now VALID.
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>$ npm run dev

&gt; react_boilerplate@<span class="hljs-number">1.0</span><span class="hljs-number">.0</span> dev <span class="hljs-symbol">D</span>:\node\react_boilerplate
&gt; webpack-dev-server --port <span class="hljs-number">3000</span> --devtool eval --progress --colors --hot --content-base dist

......
<span class="hljs-symbol">Time</span>: <span class="hljs-number">1109</span>ms
     <span class="hljs-symbol">Asset</span>       <span class="hljs-symbol">Size</span>  <span class="hljs-symbol">Chunks</span>             <span class="hljs-symbol">Chunk</span> <span class="hljs-symbol">Names</span>
 bundle.js     <span class="hljs-number">274</span> kB       <span class="hljs-number">0</span>  [emitted]  main
index.html  <span class="hljs-number">179</span> bytes          [emitted]
chunk    {<span class="hljs-number">0</span>} bundle.js (main) <span class="hljs-number">216</span> kB [rendered]
    [<span class="hljs-number">0</span>] multi main <span class="hljs-number">52</span> bytes {<span class="hljs-number">0</span>} [built]
 ......
 ......
 ......
   [<span class="hljs-number">77</span>] ./app/component.js <span class="hljs-number">142</span> bytes {<span class="hljs-number">0</span>} [built]
<span class="hljs-symbol">Child</span> html-webpack-plugin for <span class="hljs-string">"index.html"</span>:
    chunk    {<span class="hljs-number">0</span>} index.html <span class="hljs-number">505</span> kB [rendered]
        [<span class="hljs-number">0</span>] ./~/html-webpack-plugin/lib/loader.js!./~/html-webpack-plugin/default_index.ejs <span class="hljs-number">540</span> bytes {<span class="hljs-number">0</span>} [buil
t]
        [<span class="hljs-number">1</span>] ./~/lodash/lodash.js <span class="hljs-number">504</span> kB {<span class="hljs-number">0</span>} [built]
        [<span class="hljs-number">2</span>] (webpack)/buildin/module.js <span class="hljs-number">251</span> bytes {<span class="hljs-number">0</span>} [built]
webpack: bundle is now <span class="hljs-symbol">VALID</span>.
</code></pre>
<p>web服务器启动完毕，此时访问 <a href="http://localhost:3000/" rel="nofollow noreferrer" target="_blank">http://localhost:3000/</a> 就可以看到我们的“Hello world”了。<br><span class="img-wrap"><img data-src="/img/remote/1460000005037312" src="https://static.alili.tech/img/remote/1460000005037312" alt="hello world" title="hello world" style="cursor: pointer; display: inline;"></span></p>
<p>需要特别说明的是，<code>webpack-dev-server</code>是支持热加载的，也就是说我们对代码的改动，保存的时候会自动更新页面。比如我们在文件中将“Hello world”改为“Linghucong”，会看到页面实时更新了，无须再按F5刷新，爽吧？！<br><span class="img-wrap"><img data-src="/img/remote/1460000005037314" src="https://static.alili.tech/img/remote/1460000005037314" alt="linghucong" title="linghucong" style="cursor: pointer; display: inline;"></span></p>
<p><code>webpack-dev-server</code>的配置还可以放在<code>webpack.config.js</code>中，需要使用一个<code>devServer</code>属性，详细可以<a href="https://webpack.github.io/docs/webpack-dev-server.html" rel="nofollow noreferrer" target="_blank">参考官方文档</a>。</p>
<h3 id="articleHeader13">处理CSS样式</h3>
<p>项目中使用CSS是必不可少的。webpack中使用<br>loader的方式来处理各种各样的资源，根据设定的规则，会找到相应的文件路径，然后使用各自的loader来处理。CSS文件也需要特定的loader，一般需要使用两个：<code>css-loader</code>和 <code>style-loader</code>，如果使用LESS或者SASS还需要加载对应的loader。这里我们使用LESS，因此安装loaders:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install css-loader style-loader less-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> css-loader <span class="hljs-keyword">style</span>-loader <span class="hljs-keyword">less</span>-loader <span class="hljs-comment">--save-dev</span></code></pre>
<h5>踩坑提醒</h5>
<p>npm3.0以上需要单独安装less：<code>npm install less --save-dev</code>。</p>
<p>然后在文件<code>webpack.config.js</code>中配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less'],
        include: path.resolve(__dirname, 'app')
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>      {
        <span class="hljs-attribute">test</span>: /\.less$/,
        loaders: [<span class="hljs-string">'style'</span>, <span class="hljs-string">'css'</span>, <span class="hljs-string">'less'</span>],
        include: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'app'</span>)
      }</code></pre>
<p>可以看到，test里面包含一个正则，包含需要匹配的文件，loaders是一个数组，包含要处理这些文件的loaders，注意loaders的执行顺序是从右到左的。</p>
<p>新建一个LESS文件<code>/app/index.less</code>，其内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h1 {
    color: green;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">h1</span> {
    <span class="hljs-attribute">color</span>: green;
}</code></pre>
<p>在入口文件<code>index.js</code>中引入这个文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('./index.less');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">'./index.less'</span>);</code></pre>
<p>然后运行webpack进行编译：<code>npm run build</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run build

> react_boilerplate@1.0.0 build D:\node\react_boilerplate
> webpack

Hash: 0c25c4bacdc334db1e04
Version: webpack 1.13.0
Time: 1902ms
     Asset       Size  Chunks             Chunk Names
 bundle.js     243 kB       0  [emitted]  main
index.html  179 bytes          [emitted]
   [0] multi main 52 bytes {0} [built]
  [75] ./app/index.js 110 bytes {0} [built]
  [80] ./app/component.js 141 bytes {0} [built]
    + 78 hidden modules
Child html-webpack-plugin for &quot;index.html&quot;:
        + 3 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>$ npm run <span class="hljs-keyword">build
</span>
&gt; react_boilerplate<span class="hljs-comment">@1.0.0 build D:\node\react_boilerplate</span>
&gt; webpack
<span class="hljs-symbol">
Hash:</span> <span class="hljs-number">0</span>c25c4bacdc334db1e04
<span class="hljs-symbol">Version</span>: webpack <span class="hljs-number">1</span>.<span class="hljs-number">13</span>.<span class="hljs-number">0</span>
<span class="hljs-symbol">Time</span>: <span class="hljs-number">1902</span>ms
     Asset       Size  Chunks             Chunk Names
 <span class="hljs-keyword">bundle.js </span>    <span class="hljs-number">243</span> kB       <span class="hljs-number">0</span>  [emitted]  main
<span class="hljs-symbol">index.html</span>  <span class="hljs-number">179</span> <span class="hljs-keyword">bytes </span>         [emitted]
   [<span class="hljs-number">0</span>] <span class="hljs-keyword">multi </span>main <span class="hljs-number">52</span> <span class="hljs-keyword">bytes </span>{<span class="hljs-number">0</span>} [<span class="hljs-keyword">built]
</span>  [<span class="hljs-number">75</span>] ./app/index.js <span class="hljs-number">110</span> <span class="hljs-keyword">bytes </span>{<span class="hljs-number">0</span>} [<span class="hljs-keyword">built]
</span>  [<span class="hljs-number">80</span>] ./app/component.js <span class="hljs-number">141</span> <span class="hljs-keyword">bytes </span>{<span class="hljs-number">0</span>} [<span class="hljs-keyword">built]
</span>    + <span class="hljs-number">78</span> hidden modules
<span class="hljs-symbol">Child</span> html-webpack-plugin for <span class="hljs-string">"index.html"</span>:
        + <span class="hljs-number">3</span> hidden modules</code></pre>
<p>可以看到， <a href="http://localhost:3000/" rel="nofollow noreferrer" target="_blank">http://localhost:3000/</a> 页面上的文字已经变成绿色了。<br><span class="img-wrap"><img data-src="/img/remote/1460000005037316" src="https://static.alili.tech/img/remote/1460000005037316" alt="green" title="green" style="cursor: pointer;"></span></p>
<p>到目前为止的代码可以在<a href="https://github.com/jiji262/react_boilerplate/tree/master/_tutorial_/react_boilerplate_v1" rel="nofollow noreferrer" target="_blank">react_boilerplate _v1</a>中查看。</p>
<h1 id="articleHeader14">webpack 支持ES6</h1>
<h2 id="articleHeader15">Javascript包管理格式</h2>
<p>Javascript中的包管理比较常见的有几种方式：</p>
<h4>CommonJS</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//CommonJS 定义的是模块的同步加载，主要用于NodeJS

var MyModule = require('./MyModule');

// export at module root
module.exports = function() { ... };

// alternatively, export individual functions
exports.hello = function() {...};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-comment">//CommonJS 定义的是模块的同步加载，主要用于NodeJS</span>

<span class="hljs-keyword">var</span> MyModule = require(<span class="hljs-string">'./MyModule'</span>);

<span class="hljs-comment">// export at module root</span>
module.<span class="hljs-keyword">exports</span> = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> <span class="hljs-comment">{ ... }</span>;</span>

<span class="hljs-comment">// alternatively, export individual functions</span>
<span class="hljs-keyword">exports</span>.hello = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> <span class="hljs-comment">{...}</span>;</span>
</code></pre>
<h4>AMD</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//AMD 是异步加载，比如require.js使用这种规范
define(['./MyModule.js'], function (MyModule) {
  // export at module root
  return function() {};
});

// or
define(['./MyModule.js'], function (MyModule) {
  // export as module function
  return {
    hello: function() {...}
  };
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//AMD 是异步加载，比如require.js使用这种规范</span>
define([<span class="hljs-string">'./MyModule.js'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(MyModule)</span> </span>{
  <span class="hljs-comment">// export at module root</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{};
});

<span class="hljs-comment">// or</span>
define([<span class="hljs-string">'./MyModule.js'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(MyModule)</span> </span>{
  <span class="hljs-comment">// export as module function</span>
  <span class="hljs-keyword">return</span> {
    hello: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{...}
  };
});
</code></pre>
<h4>ES6</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//ES6 变得越来越主流了

import MyModule from './MyModule.js';

// export at module root
export default function () { ... };

// or export as module function,
// you can have multiple of these per module
export function hello() {...};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>//<span class="hljs-type">ES6</span> 变得越来越主流了

<span class="hljs-keyword">import</span> <span class="hljs-type">MyModule</span> <span class="hljs-keyword">from</span> './<span class="hljs-type">MyModule</span>.js';

// <span class="hljs-keyword">export</span> at module root
<span class="hljs-keyword">export</span> default function () { ... };

// <span class="hljs-keyword">or</span> <span class="hljs-keyword">export</span> <span class="hljs-keyword">as</span> module function,
// you can have multiple <span class="hljs-keyword">of</span> these per module
<span class="hljs-keyword">export</span> function hello() <span class="hljs-meta">{...}</span>;
</code></pre>
<p>还有其他格式如UMD、CMD等，在此不再一一介绍。webpack对这些模块格式都可以很好的支持。在我们之前的项目中使用的是CommonJS格式的模块管理，但是随着ES6的普及和应用，同时得益于强大的<a href="https://babeljs.io/" rel="nofollow noreferrer" target="_blank">Babel</a>的存在，使我们可以方便的使用ES6的语法，而不必考虑浏览器支持的问题。</p>
<h2 id="articleHeader16">webpack支持ES6语法</h2>
<p>在webpack中支持ES6同样只需要安装配置相应的loader就可以了。</p>
<p>安装如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-loader babel-core babel-preset-es2015 babel-preset-react --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-preset-es2015 </span><span class="hljs-keyword">babel-preset-react </span>--save-dev</code></pre>
<p>在<code>webpack.config.js</code>中添加loader如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  { 
    test: /\.jsx?$/, 
    loader: 'babel', 
    exclude: /node_modules/,
    query: {
      presets: ['react', 'es2015'] 
    }
  } " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>  { 
    <span class="hljs-attribute">test</span>: /\.jsx?$/, 
    loader: <span class="hljs-string">'babel'</span>, 
    exclude: /node_modules/,
    query: {
      presets: [<span class="hljs-string">'react'</span>, <span class="hljs-string">'es2015'</span>] 
    }
  } </code></pre>
<p>由于后边需要支持React的jsx文件，所以我们在这里安装了<code>babel-preset-react</code>。</p>
<p>顺便提一下，我们可以在项目根目录下创建一个<code>.babelrc</code>文件，将loader中的<code>presets</code>放在文件<code>.babelrc</code>中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# .babelrc
{
  &quot;presets&quot;: [&quot;react&quot;, &quot;es2015&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># .babelrc</span>
{
  <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"react"</span>, <span class="hljs-string">"es2015"</span>]
}</code></pre>
<p>此时我们运行<code>npm run build</code>，正常编译后，使用<code>npm run dev</code>，启动web服务器，打开 <a href="http://localhost:3000/" rel="nofollow noreferrer" target="_blank">http://localhost:3000/</a> 可以看到页面已经可以正常显示了。</p>
<h5>踩坑提醒</h5>
<p>如果上面对于loader的配置写为（注意这里是<code>loaders</code>不是<code>loader</code>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ 
    test: /\.jsx?$/, 
    loaders: ['babel'], 
    exclude: /node_modules/,
    query: {
      presets: ['es2015', 'react'] 
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{ 
    <span class="hljs-attribute">test</span>: /\.jsx?$/, 
    loaders: [<span class="hljs-string">'babel'</span>], 
    exclude: /node_modules/,
    query: {
      presets: [<span class="hljs-string">'es2015'</span>, <span class="hljs-string">'react'</span>] 
    }
}</code></pre>
<p>则可能会出现这样的错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run build

> react_boilerplate@1.0.0 build D:\node\react_boilerplate
> webpack

D:\node\react_boilerplate\node_modules\webpack-core\lib\LoadersList.js:54
                if(!element.loader || element.loader.indexOf(&quot;!&quot;) >= 0) throw new Error(&quot;Cannot define 'query' and multiple loaders in loaders list&quot;);
                                                                        ^

Error: Cannot define 'query' and multiple loaders in loaders list
    at getLoadersFromObject (D:\node\react_boilerplate\node_modules\webpack-core\lib\LoadersList.js:54:65)
    at LoadersList. (D:\node\react_boilerplate\node_modules\webpack-core\lib\LoadersList.js:78:12)
    at Array.map (native)
    at LoadersList.match 
    ...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>$ npm run build

&gt; react_boilerplate@<span class="hljs-number">1.0</span>.<span class="hljs-number">0</span> build <span class="hljs-symbol">D:</span>\node\react_boilerplate
&gt; webpack

<span class="hljs-symbol">D:</span>\node\react_boilerplate\node_modules\webpack-core\<span class="hljs-class"><span class="hljs-keyword">lib</span>\<span class="hljs-title">LoadersList</span>.<span class="hljs-title">js</span>:54</span>
                <span class="hljs-keyword">if</span>(!element.loader || element.loader.indexOf(<span class="hljs-string">"!"</span>) &gt;= <span class="hljs-number">0</span>) throw new Error(<span class="hljs-string">"Cannot define 'query' and multiple loaders in loaders list"</span>);
                                                                        ^

<span class="hljs-symbol">Error:</span> Cannot define <span class="hljs-string">'query'</span> and multiple loaders in loaders list
    at getLoadersFromObject (<span class="hljs-symbol">D:</span>\node\react_boilerplate\node_modules\webpack-core\<span class="hljs-class"><span class="hljs-keyword">lib</span>\<span class="hljs-title">LoadersList</span>.<span class="hljs-title">js</span>:54:65)</span>
    at LoadersList. (<span class="hljs-symbol">D:</span>\node\react_boilerplate\node_modules\webpack-core\<span class="hljs-class"><span class="hljs-keyword">lib</span>\<span class="hljs-title">LoadersList</span>.<span class="hljs-title">js</span>:78:12)</span>
    at Array.map (native)
    at LoadersList.match 
    ...
</code></pre>
<p>原因是使用了多个<code>loader</code>，而<code>query</code>仅仅作用于<code>babel-loader</code>。如果非要使用<code>loaders</code>加载多个<code>loader</code>，可以做如下修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var babelPresets = {presets: ['react', 'es2015']};
......
loaders: ['other-loader', 'babel-loader?'+JSON.stringify(babelPresets)]
......" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code>var babelPresets = {presets: [<span class="hljs-emphasis">'react'</span>, <span class="hljs-emphasis">'es2015'</span>]};
<span class="hljs-code">......
loaders: ['other-loader', 'babel-loader?'+JSON.stringify(babelPresets)]
......</span></code></pre>
<p>到目前为止的代码可以在<a href="https://github.com/jiji262/react_boilerplate/tree/master/_tutorial_/react_boilerplate_v2" rel="nofollow noreferrer" target="_blank">react_boilerplate _v2</a>中查看。</p>
<h1 id="articleHeader17">在项目中支持使用React</h1>
<p>关于React的介绍和基本概念相信你已经有所了解，如果需要，可以参考本文最后的“参考阅读”中的链接，在此不再详述。</p>
<h2 id="articleHeader18">安装React</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install react react-dom --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> react react-dom <span class="hljs-comment">--save</span></code></pre>
<p>这里我们使用的版本是15.0.1。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install react react-dom --save
react_boilerplate@1.0.0 D:\node\react_boilerplate
+-- react@15.0.1
| `-- fbjs@0.8.1
|   +-- isomorphic-fetch@2.2.1
|   | +-- node-fetch@1.5.1
|   | | +-- encoding@0.1.12
|   | | | `-- iconv-lite@0.4.13
|   | | `-- is-stream@1.1.0
|   | `-- whatwg-fetch@0.11.0
|   `-- ua-parser-js@0.7.10
`-- react-dom@15.0.1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>$ npm install react react-dom --save
react_boilerplate<span class="hljs-meta">@1.0.0</span> D:\node\react_boilerplate
+-- react<span class="hljs-meta">@15.0.1</span>
|<span class="hljs-string"> `-- fbjs@0.8.1
</span>|<span class="hljs-string">   +-- isomorphic-fetch@2.2.1
</span>|<span class="hljs-string">   </span>|<span class="hljs-string"> +-- node-fetch@1.5.1
</span>|<span class="hljs-string">   </span>|<span class="hljs-string"> </span>|<span class="hljs-string"> +-- encoding@0.1.12
</span>|<span class="hljs-string">   </span>|<span class="hljs-string"> </span>|<span class="hljs-string"> </span>|<span class="hljs-string"> `-- iconv-lite@0.4.13
</span>|<span class="hljs-string">   </span>|<span class="hljs-string"> </span>|<span class="hljs-string"> `-- is-stream@1.1.0
</span>|<span class="hljs-string">   </span>|<span class="hljs-string"> `-- whatwg-fetch@0.11.0
</span>|<span class="hljs-string">   `-- ua-parser-js@0.7.10
`-- react-dom@15.0.1</span></code></pre>
<h2 id="articleHeader19">改造项目结构</h2>
<p>在项目中我们使用了html-webpack-plugin插件来用webpack自动生成入口的index.html文件，但是里面的内容我们没法控制。html-webpack-plugin提供了一种模板的机制，可以让我们对生成的文件内容进行定制。</p>
<h3 id="articleHeader20">创建模板文件</h3>
<p>我们使用一个新的目录templates用于存放模板文件，新建一个index.ejs文件：</p>
<h5>templates/index.ejs</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

  
    
    <%= htmlWebpackPlugin.options.title %>
  
  
  Welcome to New Page
  
  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>

<span class="erb"><span class="xml">  
    
    <span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby"> htmlWebpackPlugin.options.title </span><span class="xml"><span class="hljs-tag">%&gt;</span>
  
  
  Welcome to New Page
  
  
</span></span></code></pre>
<h3 id="articleHeader21">修改 html-webpack-plugin 设置</h3>
<p>修改<code>webpack.config.js</code>文件如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  plugins: [
    new HtmlwebpackPlugin({
      title: 'React Biolerplate by Linghucong',
      template: path.resolve(__dirname, 'templates/index.ejs'),
      inject: 'body'
    })
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-attribute">plugins</span>: [
    new HtmlwebpackPlugin({
      <span class="hljs-attribute">title</span>: <span class="hljs-string">'React Biolerplate by Linghucong'</span>,
      <span class="hljs-attribute">template</span>: path.resolve(__dirname, <span class="hljs-string">'templates/index.ejs'</span>),
      <span class="hljs-attribute">inject</span>: <span class="hljs-string">'body'</span>
    })
  ]</code></pre>
<p>关于 html-webpack-plugin 更多高级用法可以<a href="https://github.com/ampedandwired/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">参考其项目主页</a>。</p>
<h3 id="articleHeader22">支持sourcemap</h3>
<p>sourcemap的作用各位自行Google吧。要生成编译出的js文件的sourcemap文件，只需要在webpack配置文件中加入如下一行配置即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devtool: 'source-map'," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">devtool:</span> <span class="hljs-string">'source-map'</span>,</code></pre>
<p>运行<code>npm run build</code>可以看到一个会在<code>dist</code>目录生成一个新的文件<code>bundle.js.map</code>，这就是sourcemap文件。</p>
<h3 id="articleHeader23">Minification 代码压缩</h3>
<p>要对生成的js文件进行压缩，需要使用一个新的插件：UglifyJsPlugin。<br>修改<code>webpack.config.js</code>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="......
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var config = {
......
  plugins: [
    ......
    new UglifyJsPlugin({ minimize: true })
  ]
}

module.exports = config;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-code">......
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var config = {
......</span>
<span class="hljs-code">  plugins: [</span>
<span class="hljs-code">    ......</span>
<span class="hljs-code">    new UglifyJsPlugin({ minimize: true })</span>
<span class="hljs-code">  ]</span>
}

module.exports = config;</code></pre>
<p>运行<code>npm run build</code>可以看到生成的bundle.js文件已经被minify了。</p>
<p>在实际的项目开发中，我们在开发阶段一般不需要将代码minify，因为压缩之后很不方便调试。因此，我们有必要将开发模式和发布模式区分开。我们通过设置<code>process.env.WEBPACK_ENV</code>来做区分。<br>修改<code>webpack.config.js</code>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="......
var env = process.env.WEBPACK_ENV;
var outputFile;
var plugins = [new HtmlwebpackPlugin({
      title: 'React Biolerplate by Linghucong',
      template: path.resolve(__dirname, 'templates/index.ejs'),
      inject: 'body'
    })];

if (env === 'build') {
  var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = 'bundle.min.js';
} else {  
  outputFile = 'bundle.js';
}

var config = {
......              
  output: {
    path: path.resolve(__dirname, 'dist'),  
    filename: outputFile
  },
......
  plugins: plugins
}

module.exports = config;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>......
var env = process.env.WEBPACK_ENV;
var outputFile;
var plugins = [new HtmlwebpackPlugin({
      title: <span class="hljs-string">'React Biolerplate by Linghucong'</span>,
      template: path.resolve(__dirname, <span class="hljs-string">'templates/index.ejs'</span>),
      inject: <span class="hljs-string">'body'</span>
    })];

<span class="hljs-keyword">if</span> (env === <span class="hljs-string">'build'</span>) {
  var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = <span class="hljs-string">'bundle.min.js'</span>;
} else {  
  outputFile = <span class="hljs-string">'bundle.js'</span>;
}

var config = {
......              
  output: {
    path: path.resolve(__dirname, <span class="hljs-string">'dist'</span>),  
    filename: outputFile
  },
......
  plugins: plugins
}

<span class="hljs-keyword">module</span>.exports = config;</code></pre>
<p>同时需要修改npm run的快捷方式，在<code>package.json</code>文件中修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;WEBPACK_ENV=dev webpack-dev-server --port 3000 --devtool eval --progress --colors --hot --content-base dist&quot;,
    &quot;build&quot;: &quot;WEBPACK_ENV=build webpack&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code>  <span class="hljs-comment">"scripts":</span> <span class="hljs-comment">{</span>
    <span class="hljs-comment">"dev":</span> <span class="hljs-comment">"WEBPACK_ENV=dev</span> <span class="hljs-comment">webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">port</span> <span class="hljs-comment">3000</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">devtool</span> <span class="hljs-comment">eval</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">hot</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">content</span><span class="hljs-literal">-</span><span class="hljs-comment">base</span> <span class="hljs-comment">dist"</span><span class="hljs-string">,</span>
    <span class="hljs-comment">"build":</span> <span class="hljs-comment">"WEBPACK_ENV=build</span> <span class="hljs-comment">webpack"</span>
  <span class="hljs-comment">}</span><span class="hljs-string">,</span></code></pre>
<h5>踩坑提醒</h5>
<p>在Windows系统上不能像上述那样设置<code>WEBPACK_ENV</code>，可以使用<code>set</code>来设置，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;mocha --compilers js:babel-register --require ./test/test_helper.js --recursive ./test&quot;,
    &quot;test:watch&quot;: &quot;npm test -- --watch&quot;,
    &quot;dev&quot;: &quot;set WEBPACK_ENV=dev&amp;&amp;webpack-dev-server --port 3000 --devtool eval --progress --colors --hot --content-base dist&quot;,
    &quot;build&quot;: &quot;set WEBPACK_ENV=build&amp;&amp;webpack&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code>  <span class="hljs-comment">"scripts":</span> <span class="hljs-comment">{</span>
    <span class="hljs-comment">"test":</span> <span class="hljs-comment">"mocha</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">compilers</span> <span class="hljs-comment">js:babel</span><span class="hljs-literal">-</span><span class="hljs-comment">register</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">require</span> <span class="hljs-string">.</span><span class="hljs-comment">/test/test_helper</span><span class="hljs-string">.</span><span class="hljs-comment">js</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">recursive</span> <span class="hljs-string">.</span><span class="hljs-comment">/test"</span><span class="hljs-string">,</span>
    <span class="hljs-comment">"test:watch":</span> <span class="hljs-comment">"npm</span> <span class="hljs-comment">test</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">watch"</span><span class="hljs-string">,</span>
    <span class="hljs-comment">"dev":</span> <span class="hljs-comment">"set</span> <span class="hljs-comment">WEBPACK_ENV=dev&amp;&amp;webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">port</span> <span class="hljs-comment">3000</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">devtool</span> <span class="hljs-comment">eval</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">hot</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">content</span><span class="hljs-literal">-</span><span class="hljs-comment">base</span> <span class="hljs-comment">dist"</span><span class="hljs-string">,</span>
    <span class="hljs-comment">"build":</span> <span class="hljs-comment">"set</span> <span class="hljs-comment">WEBPACK_ENV=build&amp;&amp;webpack"</span>
  <span class="hljs-comment">}</span><span class="hljs-string">,</span></code></pre>
<h3 id="articleHeader24">更新项目代码</h3>
<p>对我们的组件稍作修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import './index.less';

import component from './component';

let content = document.getElementById(&quot;content&quot;);
content.appendChild(component());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> <span class="hljs-string">'./index.less'</span>;

<span class="hljs-keyword">import</span> component <span class="hljs-keyword">from</span> <span class="hljs-string">'./component'</span>;

<span class="hljs-keyword">let</span> content = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"content"</span>);
content.appendChild(component());</code></pre>
<p>然后编译，运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run build
$ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>$ npm <span class="hljs-keyword">run</span><span class="bash"> build
</span>$ npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>可以看到，目前访问 <a href="http://localhost:3000/" rel="nofollow noreferrer" target="_blank">http://localhost:3000/</a> 的页面显示已经发生了变化。<br><span class="img-wrap"><img data-src="/img/remote/1460000005037342" src="https://static.alili.tech/img/remote/1460000005037342" alt="linghucong" title="linghucong" style="cursor: pointer;"></span></p>
<p>通过查看源代码，可以看到我们页面正是应用了我们的模板文件。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005037344" src="https://static.alili.tech/img/remote/1460000005037344" alt="source" title="source" style="cursor: pointer;"></span></p>
<p>到目前为止的代码可以在<a href="https://github.com/jiji262/react_boilerplate/tree/master/_tutorial_/react_boilerplate_v3" rel="nofollow noreferrer" target="_blank">react_boilerplate _v3</a>中查看。</p>
<h2 id="articleHeader25">创建React组件</h2>
<p>我们将<code>app/index.js</code>修改一下，创建一个新的React组件。</p>
<h5>app/index.js</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';
 
class HelloReact extends React.Component {
  render() {
    return Hello React!
  }
}
 
ReactDOM.render(, document.getElementById('content'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> <span class="hljs-type">ReactDOM</span> from <span class="hljs-symbol">'react</span>-dom';
 
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloReact</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> <span class="hljs-type">Hello</span> <span class="hljs-type">React</span>!
  }
}
 
<span class="hljs-type">ReactDOM</span>.render(, document.getElementById(<span class="hljs-symbol">'conten</span>t'));</code></pre>
<p>代码十分简单，引入了<code>react</code>和<code>react-dom</code>，创建了一个叫做HelloReact的组件，并将其渲染到页面上id为<code>content</code>的DOM元素内。</p>
<h2 id="articleHeader26">编译React代码</h2>
<p>我们在之前已经在webpack的配置中配置好了对React的支持，因此目前不需要做什么修改了。</p>
<p><code>npm run build</code>之后就可以在页面上看到“Hello React!”了。</p>
<p>至此，我们基于ES6并使用webpack和Babel的React初始项目已经可以完美运行了。<br>到目前为止的代码可以在<a href="https://github.com/jiji262/react_boilerplate/tree/master/_tutorial_/react_boilerplate_v1" rel="nofollow noreferrer" target="_blank">react_boilerplate _v4</a>中查看。</p>
<h1 id="articleHeader27">测试环境搭建（Mocha + Chai + Sinon）</h1>
<h2 id="articleHeader28">所用技术介绍</h2>
<p>如上所见，我在这里使用Mocha + Chai + Sinon 这几个技术来搭建我们的测试环境，简单介绍如下：</p>
<ul>
<li><p>Mocha：用于运行我们的测试用例。</p></li>
<li><p>Chai：Mocha用的断言库。</p></li>
<li><p>Sinon：用于创建一些mocks/stubs/spys。</p></li>
</ul>
<p>另外值得一提的是，AirBnB创建了一个专门针对React代码测试的开源程序：Enzyme，有兴趣的可以研究一下。</p>
<h2 id="articleHeader29">Mocha安装及环境配置</h2>
<h3 id="articleHeader30">安装Mocha、Chai以及Sinon</h3>
<p>安装很简单，命令如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i mocha chai sinon --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm i mocha chai sinon --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>因为我们要支持ES6的语法，因此还需要安装一个额外的插件<code>babel-register</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i babel-register --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm i babel-register --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<h3 id="articleHeader31">写一个简单的测试用例</h3>
<p>Mocha默认会去当前目录下找test目录，然后在其中去找后缀为.js的文件。如果需要修改这个目录，可以使用Mocha的参数进行设置。<br>我们这里创建一个新的目录，叫做test，然后一个新的Spec文件：</p>
<h5>index.spec.js</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { expect } from 'chai';

describe('hello react spec', () => {
  it('works!', () => {
    expect(true).to.be.true;
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { expect } <span class="hljs-keyword">from</span> <span class="hljs-string">'chai'</span>;

describe(<span class="hljs-string">'hello react spec'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  it(<span class="hljs-string">'works!'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    expect(<span class="hljs-literal">true</span>).to.be.<span class="hljs-literal">true</span>;
  });
});</code></pre>
<p>这个时候我们在命令行中使用命令<code>mocha --compilers js:babel-register</code>运行mocha，如果顺利的话，可以看到如下结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mocha --compilers js:babel-register
  hello react spec
    √ works!
    
  1 passing (11ms)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>$ mocha <span class="hljs-comment">--compilers js:babel-register</span>
  hello react spec
    √ works!
    
  <span class="hljs-number">1</span> passing (<span class="hljs-number">11</span>ms)</code></pre>
<p>简单解释一下这里的<code>babel-register</code>。如果这里没有添加<code>--compilers</code>选项，则mocha会按照默认的方式执行，也就是“读取spec文件”-&gt;“运行测试用例”。使用了<code>babel-register</code>之后，则执行顺序为“读取spec文件”-&gt;“将ES6代码编译为ES5代码”-&gt;“运行测试用例”。</p>
<h4>踩坑提醒</h4>
<p>如果执行<code>mocha --compilers js:babel-register</code>命令的时候，出现如下的错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mocha --compilers js:babel-register
D:\node\react_boilerplate\test\index.spec.js:1
(function (exports, require, module, __filename, __dirname) { import { expect } from 'chai';
                                                              ^^^^^^
SyntaxError: Unexpected reserved word
    at exports.runInThisContext (vm.js:53:16)
    at Module._compile (module.js:373:25)
    at loader (D:\node\react_boilerplate\node_modules\babel-register\lib\node.js:126:5)
    at Object.require.extensions.(anonymous function) [as .js] (D:\node\react_boilerplate\node_modules\babel-register\lib\node.js:136:7)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Module.require (module.js:353:17)
    at require (internal/module.js:12:17)
    at C:\Users\i301792\AppData\Roaming\npm\node_modules\mocha\lib\mocha.js:219:27
    at Array.forEach (native)
    at Mocha.loadFiles (C:\Users\i301792\AppData\Roaming\npm\node_modules\mocha\lib\mocha.js:216:14)
    at Mocha.run (C:\Users\i301792\AppData\Roaming\npm\node_modules\mocha\lib\mocha.js:468:10)
    at Object. (C:\Users\i301792\AppData\Roaming\npm\node_modules\mocha\bin\_mocha:403:18)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)
    at startup (node.js:139:18)
    at node.js:968:3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>$ mocha --compilers <span class="hljs-symbol">js:</span>babel-register
<span class="hljs-symbol">D:</span>\node\react_boilerplate\test\index.spec.<span class="hljs-symbol">js:</span><span class="hljs-number">1</span>
(function (exports, <span class="hljs-keyword">require</span>, <span class="hljs-class"><span class="hljs-keyword">module</span>, <span class="hljs-title">__filename</span>, <span class="hljs-title">__dirname</span>) { <span class="hljs-title">import</span> { <span class="hljs-title">expect</span> } <span class="hljs-title">from</span> '<span class="hljs-title">chai</span>';</span>
                                                              ^^^^^^
<span class="hljs-symbol">SyntaxError:</span> Unexpected reserved word
    at exports.runInThisContext (vm.<span class="hljs-symbol">js:</span><span class="hljs-number">53</span>:<span class="hljs-number">16</span>)
    at Module._compile (<span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">js</span>:373:25)</span>
    at loader (<span class="hljs-symbol">D:</span>\node\react_boilerplate\node_modules\babel-register\<span class="hljs-class"><span class="hljs-keyword">lib</span>\<span class="hljs-title">node</span>.<span class="hljs-title">js</span>:126:5)</span>
    at Object.<span class="hljs-keyword">require</span>.extensions.(anonymous function) [<span class="hljs-keyword">as</span> .js] (<span class="hljs-symbol">D:</span>\node\react_boilerplate\node_modules\babel-register\<span class="hljs-class"><span class="hljs-keyword">lib</span>\<span class="hljs-title">node</span>.<span class="hljs-title">js</span>:136:7)</span>
    at Module.load (<span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">js</span>:343:32)</span>
    at Function.Module._load (<span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">js</span>:300:12)</span>
    at Module.<span class="hljs-keyword">require</span> (<span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">js</span>:353:17)</span>
    at <span class="hljs-keyword">require</span> (internal/<span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">js</span>:12:17)</span>
    at <span class="hljs-symbol">C:</span>\Users\i301792\AppData\Roaming\npm\node_modules\mocha\<span class="hljs-class"><span class="hljs-keyword">lib</span>\<span class="hljs-title">mocha</span>.<span class="hljs-title">js</span>:219:27</span>
    at Array.forEach (native)
    at Mocha.loadFiles (<span class="hljs-symbol">C:</span>\Users\i301792\AppData\Roaming\npm\node_modules\mocha\<span class="hljs-class"><span class="hljs-keyword">lib</span>\<span class="hljs-title">mocha</span>.<span class="hljs-title">js</span>:216:14)</span>
    at Mocha.run (<span class="hljs-symbol">C:</span>\Users\i301792\AppData\Roaming\npm\node_modules\mocha\<span class="hljs-class"><span class="hljs-keyword">lib</span>\<span class="hljs-title">mocha</span>.<span class="hljs-title">js</span>:468:10)</span>
    at Object. (<span class="hljs-symbol">C:</span>\Users\i301792\AppData\Roaming\npm\node_modules\mocha\bin\<span class="hljs-symbol">_mocha:</span><span class="hljs-number">403</span>:<span class="hljs-number">18</span>)
    at Module._compile (<span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">js</span>:409:26)</span>
    at Object.Module._extensions..js (<span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">js</span>:416:10)</span>
    at Module.load (<span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">js</span>:343:32)</span>
    at Function.Module._load (<span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">js</span>:300:12)</span>
    at Function.Module.runMain (<span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">js</span>:441:10)</span>
    at startup (node.<span class="hljs-symbol">js:</span><span class="hljs-number">139</span>:<span class="hljs-number">18</span>)
    at node.<span class="hljs-symbol">js:</span><span class="hljs-number">968</span>:<span class="hljs-number">3</span></code></pre>
<p>这个错误可能是由于Babel的版本引入的。<a href="https://github.com/mochajs/mocha/issues/2054" rel="nofollow noreferrer" target="_blank">在这里</a>提供了一个解决方案：</p>
<p>在我们项目中创建一个.babelrc文件，其内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;react&quot;, &quot;es2015&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"react"</span>, <span class="hljs-string">"es2015"</span>]
}</code></pre>
<p>其作用之前讲过了。现在就可以将我们<code>webpack.config.js</code>中对应设置删除了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#webpack.config.js
...
      { 
        test: /\.jsx?$/, 
        loader: 'babel', 
        exclude: /node_modules/
      },  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#webpack</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
...
      { 
        <span class="hljs-attribute">test</span>: /\.jsx?$/, 
        loader: <span class="hljs-string">'babel'</span>, 
        exclude: /node_modules/
      },  </code></pre>
<h3 id="articleHeader32">创建测试工具库test_helper.js</h3>
<p>注意到我们在每个测试spec文件中，都会需要引入chai库的expect，这样就会有很多重复代码。当然还有其他一些通用的帮助性代码，因此我们需要一个库来集中进行管理。这里我们创建一个新的文件<code>/test/test_helper.js</code>:</p>
<h5>/test/test_helper.js</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { expect } from 'chai';
import sinon from 'sinon';

global.expect = expect;
global.sinon = sinon;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { expect } <span class="hljs-keyword">from</span> <span class="hljs-string">'chai'</span>;
<span class="hljs-keyword">import</span> sinon <span class="hljs-keyword">from</span> <span class="hljs-string">'sinon'</span>;

<span class="hljs-built_in">global</span>.expect = expect;
<span class="hljs-built_in">global</span>.sinon = sinon;</code></pre>
<p>在这里我只是添加了chai的expect，以及引入了sinon。</p>
<p>现在就可以将<code>index.spec.js</code>文件的第一行删除，然后通过如下的命令来执行mocha命令了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mocha --compilers js:babel-register --require ./test/test_helper.js --recursive" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">mocha</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">compilers</span> <span class="hljs-comment">js:babel</span><span class="hljs-literal">-</span><span class="hljs-comment">register</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">require</span> <span class="hljs-string">.</span><span class="hljs-comment">/test/test_helper</span><span class="hljs-string">.</span><span class="hljs-comment">js</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">recursive</span></code></pre>
<p>执行结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="λ mocha --compilers js:babel-register --require ./test/test_helper.js --recursive
  hello react spec
    √ works!
  1 passing (12ms)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">λ</span> <span class="hljs-comment">mocha</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">compilers</span> <span class="hljs-comment">js:babel</span><span class="hljs-literal">-</span><span class="hljs-comment">register</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">require</span> <span class="hljs-string">.</span><span class="hljs-comment">/test/test_helper</span><span class="hljs-string">.</span><span class="hljs-comment">js</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">recursive</span>
  <span class="hljs-comment">hello</span> <span class="hljs-comment">react</span> <span class="hljs-comment">spec</span>
    <span class="hljs-comment">√</span> <span class="hljs-comment">works!</span>
  <span class="hljs-comment">1</span> <span class="hljs-comment">passing</span> <span class="hljs-comment">(12ms)</span></code></pre>
<h3 id="articleHeader33">配置<code>package.json</code>中的快捷方式</h3>
<p>在<code>package.json</code>中我们可以创建上述mocha命令的快捷方式。在<code>scripts</code>字段中作如下修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#package.json

  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;mocha --compilers js:babel-register --require ./test/test_helper.js --recursive ./test&quot;,
    &quot;test:watch&quot;: &quot;npm test -- --watch&quot;,
    &quot;dev&quot;: &quot;webpack-dev-server --port 3000 --devtool eval --progress --colors --hot --content-base dist&quot;,
    &quot;build&quot;: &quot;webpack&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-id">#package</span><span class="hljs-selector-class">.json</span>

  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"mocha --compilers js:babel-register --require ./test/test_helper.js --recursive ./test"</span>,
    <span class="hljs-string">"test:watch"</span>: <span class="hljs-string">"npm test -- --watch"</span>,
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server --port 3000 --devtool eval --progress --colors --hot --content-base dist"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack"</span>
  },</code></pre>
<p>然后就可以使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> <span class="hljs-built_in">test</span></span></code></pre>
<p>来直接运行mocha了。</p>
<p>注意这里我还新增加了一个<code>npm run test:watch</code>快捷方式，其实就是使用了mocha的<code>--watch</code>选项。有了它，当我们在对代码进行修改的时候，就会自动运行test了。</p>
<p>到目前为止的代码可以在<a href="https://github.com/jiji262/react_boilerplate/tree/master/_tutorial_/react_boilerplate_v1" rel="nofollow noreferrer" target="_blank">react_boilerplate _v5</a>中查看。</p>
<h1 id="articleHeader34">使用Karma测试</h1>
<h2 id="articleHeader35">karma安装与配置</h2>
<p>Karma是一个基于Node.js的前端测试启动器（Test Runner），它出自Google的Angularjs团队。该工具可用于测试所有主流Web浏览器，可以支持Chrome、Safari、Firefox、IE、Opera甚至PhantomJS。</p>
<p>安装Karma：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install karma --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install karma --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>然后还需要安装我们需要用到的一些依赖库：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install lolex phantomjs-prebuilt phantomjs --save-dev

npm install karma-chai karma-chai-plugins karma-chai-sinon karma-mocha karma-mocha-reporter karma-phantomjs-launcher karma-sinon karma-sinon-chai karma-sourcemap-loader karma-webpack --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> lolex phantomjs-<span class="hljs-keyword">prebuilt</span> phantomjs <span class="hljs-comment">--save-dev</span>

npm <span class="hljs-keyword">install</span> karma-chai karma-chai-plugins karma-chai-sinon karma-mocha karma-mocha-reporter karma-phantomjs-launcher karma-sinon karma-sinon-chai karma-sourcemap-loader karma-webpack <span class="hljs-comment">--save-dev</span></code></pre>
<h5>踩坑提醒</h5>
<p>不要问我为什么装那么多扩展，因为我踩过很多坑，这里就直接跳过了:&lt;</p>
<p>然后我们就可以使用karma命令来生成一个配置文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="λ .\node_modules\.bin\karma.cmd init karma.conf.js

Which testing framework do you want to use ?
Press tab to list possible options. Enter to move to the next question.
> mocha

Do you want to use Require.js ?
This will add Require.js plugin.
Press tab to list possible options. Enter to move to the next question.
> no

Do you want to capture any browsers automatically ?
Press tab to list possible options. Enter empty string to move to the next question.
> PhantomJS
> Chrome
>

What is the location of your source and test files ?
You can use glob patterns, eg. &quot;js/*.js&quot; or &quot;test/**/*Spec.js&quot;.
Enter empty string to move to the next question.
> app/*.js
> test/*.spec.js
>

Should any of the files included by the previous patterns be excluded ?
You can use glob patterns, eg. &quot;**/*.swp&quot;.
Enter empty string to move to the next question.
>

Do you want Karma to watch all the files and run the tests on change ?
Press tab to list possible options.
> yes


Config file generated at &quot;D:\node\react_boilerplate\karma.conf.js&quot;." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>λ .\node_modules\.bin\karma.cmd init karma.<span class="hljs-keyword">conf</span>.js

Which testing framework <span class="hljs-keyword">do</span> you want <span class="hljs-keyword">to</span> use ?
Press <span class="hljs-keyword">tab</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">list</span> possible <span class="hljs-keyword">options</span>. Enter <span class="hljs-keyword">to</span> <span class="hljs-keyword">move</span> <span class="hljs-keyword">to</span> the <span class="hljs-keyword">next</span> question.
&gt; mocha

Do you want <span class="hljs-keyword">to</span> use Require.js ?
This will <span class="hljs-built_in">add</span> Require.js plugin.
Press <span class="hljs-keyword">tab</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">list</span> possible <span class="hljs-keyword">options</span>. Enter <span class="hljs-keyword">to</span> <span class="hljs-keyword">move</span> <span class="hljs-keyword">to</span> the <span class="hljs-keyword">next</span> question.
&gt; <span class="hljs-keyword">no</span>

Do you want <span class="hljs-keyword">to</span> capture any browsers automatically ?
Press <span class="hljs-keyword">tab</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">list</span> possible <span class="hljs-keyword">options</span>. Enter <span class="hljs-built_in">empty</span> <span class="hljs-built_in">string</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">move</span> <span class="hljs-keyword">to</span> the <span class="hljs-keyword">next</span> question.
&gt; PhantomJS
&gt; Chrome
&gt;

What <span class="hljs-keyword">is</span> the location of your <span class="hljs-keyword">source</span> <span class="hljs-built_in">and</span> test <span class="hljs-keyword">files</span> ?
You can use <span class="hljs-built_in">glob</span> patterns, eg. <span class="hljs-string">"js/*.js"</span> <span class="hljs-built_in">or</span> <span class="hljs-string">"test/**/*Spec.js"</span>.
Enter <span class="hljs-built_in">empty</span> <span class="hljs-built_in">string</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">move</span> <span class="hljs-keyword">to</span> the <span class="hljs-keyword">next</span> question.
&gt; app/*.js
&gt; test/*.spec.js
&gt;

Should any of the <span class="hljs-keyword">files</span> included by the <span class="hljs-keyword">previous</span> patterns <span class="hljs-keyword">be</span> excluded ?
You can use <span class="hljs-built_in">glob</span> patterns, eg. <span class="hljs-string">"**/*.swp"</span>.
Enter <span class="hljs-built_in">empty</span> <span class="hljs-built_in">string</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">move</span> <span class="hljs-keyword">to</span> the <span class="hljs-keyword">next</span> question.
&gt;

Do you want Karma <span class="hljs-keyword">to</span> watch <span class="hljs-keyword">all</span> the <span class="hljs-keyword">files</span> <span class="hljs-built_in">and</span> run the tests <span class="hljs-keyword">on</span> <span class="hljs-keyword">change</span> ?
Press <span class="hljs-keyword">tab</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">list</span> possible <span class="hljs-keyword">options</span>.
&gt; yes


Config <span class="hljs-keyword">file</span> generated at <span class="hljs-string">"D:\node\react_boilerplate\karma.conf.js"</span>.</code></pre>
<p>然后我们就可以使用<code>karma start</code>命令来运行我们的测试用例了。不过现在直接运行可能还有一些问题，暂时先不管。</p>
<h2 id="articleHeader36">优化Karma配置文件</h2>
<p>我们使用一个单独的文件<code>test.webpack.js</code>来保存测试文件的路径，方便在karma设置中进行预处理。新建文件<code>test.webpack.js</code>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

var modules = requireAll(require.context(&quot;./test&quot;, true, /.+\.spec\.jsx?$/));

module.exports = modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requireAll</span>(<span class="hljs-params">requireContext</span>) </span>{
  <span class="hljs-keyword">return</span> requireContext.keys().map(requireContext);
}

<span class="hljs-built_in">var</span> modules = requireAll(<span class="hljs-built_in">require</span>.context(<span class="hljs-string">"./test"</span>, <span class="hljs-literal">true</span>, <span class="hljs-regexp">/.+\.spec\.jsx?$/</span>));

<span class="hljs-built_in">module</span>.exports = modules</code></pre>
<p>然后修改<code>karma.config.js</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpackConfig = require('./webpack.config');
webpackConfig.devtool = 'inline-source-map';

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    singleRun: true,
    frameworks: [ 'mocha', 'chai', 'sinon', 'sinon-chai' ],
    files: [
      'test.webpack.js'
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-sinon',
      'karma-sinon-chai'
    ],
    preprocessors: {
      'test.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha' ],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    autoWatch: true
  });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sml"><code>var webpackConfig = require(<span class="hljs-string">'./webpack.config'</span>);
webpackConfig.devtool = <span class="hljs-symbol">'inline</span>-source-map';

module.exports = function (config) {
  config.set({
    browsers: [ <span class="hljs-symbol">'PhantomJS'</span> ],
    singleRun: <span class="hljs-literal">true</span>,
    frameworks: [ <span class="hljs-symbol">'mocha'</span>, <span class="hljs-symbol">'chai'</span>, <span class="hljs-symbol">'sinon'</span>, <span class="hljs-symbol">'sinon</span>-chai' ],
    files: [
      <span class="hljs-symbol">'test</span>.webpack.js'
    ],
    plugins: [
      <span class="hljs-symbol">'karma</span>-phantomjs-launcher',
      <span class="hljs-symbol">'karma</span>-chrome-launcher',
      <span class="hljs-symbol">'karma</span>-chai',
      <span class="hljs-symbol">'karma</span>-mocha',
      <span class="hljs-symbol">'karma</span>-sourcemap-loader',
      <span class="hljs-symbol">'karma</span>-webpack',
      <span class="hljs-symbol">'karma</span>-mocha-reporter',
      <span class="hljs-symbol">'karma</span>-sinon',
      <span class="hljs-symbol">'karma</span>-sinon-chai'
    ],
    preprocessors: {
      <span class="hljs-symbol">'test</span>.webpack.js': [ <span class="hljs-symbol">'webpack'</span>, <span class="hljs-symbol">'sourcemap'</span> ]
    },
    reporters: [ <span class="hljs-symbol">'mocha'</span> ],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: <span class="hljs-literal">true</span>
    },
    autoWatch: <span class="hljs-literal">true</span>
  });
};</code></pre>
<h2 id="articleHeader37">运行Karma</h2>
<p>好了，到现在为止，我们可以正常运行我们的测试用例了。使用命令<code>karma start</code>运行结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ karma start

START:
29 04 2016 13:26:50.350:INFO [karma]: Karma v0.13.22 server started at http://localhost:9876/
29 04 2016 13:26:50.375:INFO [launcher]: Starting browser PhantomJS
29 04 2016 13:26:52.072:INFO [PhantomJS 2.1.1 (Windows 8 0.0.0)]: Connected on socket /#05AECTTMgBTkXK4kAAAA with id 76498752
  hello react spec
    √ works!!!

Finished in 0.008 secs / 0.001 secs

SUMMARY:
√ 1 test completed" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>$ karma <span class="hljs-keyword">start</span>

<span class="hljs-keyword">START</span>:
<span class="hljs-number">29</span> <span class="hljs-number">04</span> <span class="hljs-number">2016</span> <span class="hljs-number">13</span>:<span class="hljs-number">26</span>:<span class="hljs-number">50.350</span>:INFO [karma]: Karma v0<span class="hljs-number">.13</span><span class="hljs-number">.22</span> <span class="hljs-keyword">server</span> started <span class="hljs-keyword">at</span> <span class="hljs-keyword">http</span>://localhost:<span class="hljs-number">9876</span>/
<span class="hljs-number">29</span> <span class="hljs-number">04</span> <span class="hljs-number">2016</span> <span class="hljs-number">13</span>:<span class="hljs-number">26</span>:<span class="hljs-number">50.375</span>:INFO [launcher]: <span class="hljs-keyword">Starting</span> browser PhantomJS
<span class="hljs-number">29</span> <span class="hljs-number">04</span> <span class="hljs-number">2016</span> <span class="hljs-number">13</span>:<span class="hljs-number">26</span>:<span class="hljs-number">52.072</span>:INFO [PhantomJS <span class="hljs-number">2.1</span><span class="hljs-number">.1</span> (Windows <span class="hljs-number">8</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span>)]: Connected <span class="hljs-keyword">on</span> socket /#<span class="hljs-number">05</span>AECTTMgBTkXK4kAAAA <span class="hljs-keyword">with</span> <span class="hljs-keyword">id</span> <span class="hljs-number">76498752</span>
  hello react spec
    √ works!!!

Finished <span class="hljs-keyword">in</span> <span class="hljs-number">0.008</span> secs / <span class="hljs-number">0.001</span> secs

SUMMARY:
√ <span class="hljs-number">1</span> <span class="hljs-keyword">test</span> completed</code></pre>
<p>可以看到，测试用例测试通过了。</p>
<p>目前我们在karma的配置文件中设置的浏览器类型是“browsers: [ 'PhantomJS' ]”，也就是会使用PhantomJS来运行。如果需要使用其他浏览器，可以做相应修改，甚至添加多个。比如我们要支持打开Chrome浏览器运行测试，修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="browsers: [ 'Chrome' ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">browsers:</span> [ <span class="hljs-string">'Chrome'</span> ]</code></pre>
<p>正常运作的前提是，必须事先安装好了对应的插件，对应Chrome的就是'karma-chrome-launcher'，其他浏览器类型类似处理。</p>
<h2 id="articleHeader38">添加karma快捷方式到npm</h2>
<p>我们之前使用<code>npm run test</code>来运行测试，<code>npm run test:watch</code>来监听文件改变并运行测试。使用karma之后，需要在<code>package.json</code>中作如下修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;karma start&quot;,
    &quot;test:watch&quot;: &quot;watch \&quot;npm run test\&quot; app/&quot;,
    ......
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"karma start"</span>,
    <span class="hljs-string">"test:watch"</span>: <span class="hljs-string">"watch \"npm run test\" app/"</span>,
    ......
  }</code></pre>
<p>另外需要安装一个npm包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install watch --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install watch --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>这样我们就可以使用<code>npm run test</code>来运行测试，<code>npm run test:watch</code>来监听文件改变并自动运行测试了：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005037337" src="https://static.alili.tech/img/remote/1460000005037337" alt="karma" title="karma" style="cursor: pointer;"></span></p>
<p>到目前为止我们自己的react boilerplate已经创建完毕了！代码可以在<a href="https://github.com/jiji262/react_boilerplate/tree/master/_tutorial_/react_boilerplate_v6" rel="nofollow noreferrer" target="_blank">react_boilerplate _v6</a>中查看。</p>
<h1 id="articleHeader39">后记</h1>
<p>本文带你一步步建立了自己的react boilerplate项目，但是需要知道的是，文中所述甚浅，只是带你入门罢了。其中每一个话题，都可以展开来再写一系列的文章。比如测试所用的mocha+chai+sinon套装，比如React测试利器Enzyme等。即便是文中已经成型的代码，亦多有可优化的地方。如果你有好的意见或者建议，也欢迎到这个Github repo上来提pull request或者issue：</p>
<p><a href="https://github.com/jiji262/react_boilerplate" rel="nofollow noreferrer" target="_blank">https://github.com/jiji262/react_boilerplate</a></p>
<p>最后，感谢阅读。</p>
<h1 id="articleHeader40">参考链接</h1>
<p><a href="http://blog.david-reid.com/2016/02/07/webpack-dev-server/" rel="nofollow noreferrer" target="_blank">Webpack Dev Server</a></p>
<p><a href="https://medium.com/learning-new-stuff/building-your-first-react-js-app-d53b0c98dc#.8bo5cmbs9" rel="nofollow noreferrer" target="_blank">Building Your First React.js App</a></p>
<p><a href="https://medium.com/@yamalight/building-modular-javascript-applications-in-es6-with-react-webpack-and-babel-538189cd485f" rel="nofollow noreferrer" target="_blank">Building modular javascript applications in ES6 with React, Webpack and Babel</a></p>
<p><a href="https://medium.com/@MoBinni/a-modern-isomorphic-stack-6609c7c9d057" rel="nofollow noreferrer" target="_blank">A Modern Isomorphic Stack</a></p>
<p><a href="http://jxnblk.com/writing/posts/static-site-generation-with-react-and-webpack/" rel="nofollow noreferrer" target="_blank">STATIC SITE GENERATION WITH REACT AND WEBPACK</a></p>
<p><a href="http://smashingboxes.com/blog/learn-react-part-1" rel="nofollow noreferrer" target="_blank">LEARN REACT.JS A LITTLE AT A TIME, PART 1</a></p>
<p><a href="https://www.twilio.com/blog/2015/08/setting-up-react-for-es6-with-webpack-and-babel-2.html" rel="nofollow noreferrer" target="_blank">Setting up React for ES6 with Webpack and Babel</a></p>
<p><a href="https://onsen.io/blog/mocha-chaijs-unit-test-coverage-es6/" rel="nofollow noreferrer" target="_blank">Mocha + Chai.js unit testing for ES6 with Istanbul code coverage</a></p>
<p><a href="https://github.com/davezuko/react-redux-starter-kit" rel="nofollow noreferrer" target="_blank">davezuko/react-redux-starter-kit</a></p>
<p><a href="https://github.com/jiji262/awesome-react-boilerplate" rel="nofollow noreferrer" target="_blank">awesome-react-boilerplate</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你基于ES6架构自己的React Boilerplate项目

## 原文链接
[https://segmentfault.com/a/1190000005037309](https://segmentfault.com/a/1190000005037309)


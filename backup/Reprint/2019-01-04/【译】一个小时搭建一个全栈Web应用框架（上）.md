---
title: '【译】一个小时搭建一个全栈Web应用框架（上）' 
date: 2019-01-04 2:30:10
hidden: true
slug: 9dxk2unbmx9
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>翻译：疯狂的技术宅<br>英文标题：Creating a full-stack web application with Python, NPM, Webpack and React<br>英文原文：<a href="https://codeburst.io/creating-a-full-stack-web-application-with-python-npm-webpack-and-react-8925800503d9" rel="nofollow noreferrer" target="_blank">https://codeburst.io/creating...</a><br>本文首发微信公众号：充实的脑洞 。转载需注明出处！</p></blockquote>
<p>把想法变为现实的能力是空想家与实干家的区别。不管你是在一家跨国公司工作，还是正在为自己的创业公司而努力，那些有能力将创意转化为真正产品的人，都具有宝贵的技能并拥有明显的实力。如果你能在不到一个小时的时间里创建一个全栈的Web应用，那么你就有能力为自己下一个伟大的想法迅速的的创建一个简单的MVP，或者在工作中快速构建一个新的应用程序。</p>
<p><strong>本文介绍了创建一个简单的全栈Web应用所需的步骤，其中包括一个Python服务器和一个React前端。</strong>你可以轻松的在其基础上进行构建，根据你的实际需求进行修改，或是添加一些其他技术特性，例如Redux。</p>
<p>世界在互联网的驱动下，计算机的基本技术和简单工具已经成为现代商业人士的必备技能。本文适合想要学习怎样制作一个简单的基于web的应用程序，并且具备基本编程技能的人。</p>
<p>尽管你可以在我的<a href="https://github.com/angineering/FullStackTemplate" rel="nofollow noreferrer" target="_blank">GitHub</a>上找到本文所有的源代码，但是如果你能够从头开始创建这个程序，将会得到最好的学习成果。</p>
<h2 id="articleHeader0">初始项目设置</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── README.md
└── fullstack_template/
    ├── server/
    └── static/
        ├── css/
        ├── dist/
        ├── images/
        └── js/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">.
├── README.md
└── fullstack_template/
    ├── server/
    └── static/
        ├── css/
        ├── dist/
        ├── images/
        └── js/</code></pre>
<p>我们将使用npm包管理器来处理Javascript依赖项。Npm是非常棒的，因为它易于使用，有良好的文档支持，有将近50万个包可供使用，以及合理的默认项目设置方案。</p>
<blockquote><p>使用包管理器可以使您的项目依赖项保持最新状态，并能够获取和安装最新的包。</p></blockquote>
<p>让我们初始化项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd fullstack_template/static
$ npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ <span class="hljs-built_in">cd</span> fullstack_template/static
$ npm init</code></pre>
<p>在初始化的过程中可以接受默认设置，但是你最好填写自己的程序名称和Git库等参数，结束后会自动在你的static目录下生成一个名为package.json 的文件。</p>
<p><strong>package.json文件有如下几个作用：</strong></p>
<ol>
<li><p>跟踪所有的依赖项及其版本。</p></li>
<li><p>它可是使其他开发人员了解你的项目，比如应用的名称、说明、所有者和所在存储库的位置。</p></li>
<li><p>可以非常容易的通过npm进行自动化安装、运行和更新。</p></li>
</ol>
<h2 id="articleHeader1">安装和配置Webpack</h2>
<p>Webpack是一个模块打包器。它可以处理你所有的模块依赖，并生成静态资源。 使用模块打包器可以减少浏览器需要加载的模块数量，从而大大缩短了网页的加载时间。</p>
<p><span class="img-wrap"><img data-src="/img/bVS8hC?w=1400&amp;h=596" src="https://static.alili.tech/img/bVS8hC?w=1400&amp;h=596" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br><em>演示了Webpack是怎样工作的</em></p>
<p>安装Webpack：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i webpack --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm i webpack --save-dev</code></pre>
<p>要使用Webpack，我们需要添加一个 Webpack 配置文件。这个配置告诉 Webpack 在哪里可以找到 JavaScript 和 React 文件，以及在哪里放置生成的JavaScript包。</p>
<p>在static目录中添加一个名为webpack.config.js的文件，下面的内容如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');
const config = {
    entry:  __dirname + '/js/index.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
};
module.exports = config;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">const</span> config = {
    <span class="hljs-attr">entry</span>:  __dirname + <span class="hljs-string">'/js/index.jsx'</span>,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">'/dist'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>,
    },
    <span class="hljs-attr">resolve</span>: {
        <span class="hljs-attr">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.jsx'</span>, <span class="hljs-string">'.css'</span>]
    },
};
<span class="hljs-built_in">module</span>.exports = config;</code></pre>
<h2 id="articleHeader2">添加运行命令</h2>
<p>向package.json文件中添加一些运行命令会是你的开发过程更加顺畅。我总是在自己的package.json 文件中添加一些<em>build</em>, <em>dev-build</em> 和 <em>watch</em> 命令。</p>
<p><em>build</em>用于构建生产环境版本, <em>dev-build</em>用于开发时的构建版本，<em>watch</em>的作用和<em>dev-build</em>类似，只不过可以自动监视项目文件是否修改，并且自动重新构建被修改的部分，你只需要刷新浏览器就可以看到改动后的结果。</p>
<p>自动化构建你的项目还有一个好处，那就是你不会耗费时间去思考为什么修改了代码却看不到效果，一般遇到这种情况纯粹是因为你忘记了构建它们！</p>
<p>以下是我的 package.json 文件内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;FullStackTemplate&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;A Template for creating a Full Stack Web Application using Python, NPM, Webpack and React&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;webpack -p --progress --config webpack.config.js&quot;,
    &quot;dev-build&quot;: &quot;webpack --progress -d --config webpack.config.js&quot;,
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;watch&quot;: &quot;webpack --progress -d --config webpack.config.js --watch&quot;
  },
  &quot;keywords&quot;: [
    &quot;fullstack&quot;,
    &quot;template&quot;,
    &quot;python&quot;,
    &quot;react&quot;,
    &quot;npm&quot;,
    &quot;webpack&quot;
  ],
  &quot;author&quot;: &quot;Angela Branaes&quot;,
  &quot;license&quot;: &quot;MIT&quot;,
  &quot;devDependencies&quot;: {
    &quot;webpack&quot;: &quot;^3.0.0&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"FullStackTemplate"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"A Template for creating a Full Stack Web Application using Python, NPM, Webpack and React"</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"webpack -p --progress --config webpack.config.js"</span>,
    <span class="hljs-attr">"dev-build"</span>: <span class="hljs-string">"webpack --progress -d --config webpack.config.js"</span>,
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>,
    <span class="hljs-attr">"watch"</span>: <span class="hljs-string">"webpack --progress -d --config webpack.config.js --watch"</span>
  },
  <span class="hljs-attr">"keywords"</span>: [
    <span class="hljs-string">"fullstack"</span>,
    <span class="hljs-string">"template"</span>,
    <span class="hljs-string">"python"</span>,
    <span class="hljs-string">"react"</span>,
    <span class="hljs-string">"npm"</span>,
    <span class="hljs-string">"webpack"</span>
  ],
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">"Angela Branaes"</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"MIT"</span>,
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^3.0.0"</span>
  }
}</code></pre>
<h2 id="articleHeader3">添加Babel支持</h2>
<p>Babel能够允许我们使用最新的JavaScript特性编码，即便是浏览器还没有支持它们。通过安装ES2015和react presets，Babel能够把使用 Javascript 新特性和 React jsx 的代码转换为与当前浏览器兼容的 JavaScript 语法。</p>
<p><span class="img-wrap"><img data-src="/img/bVS8fT?w=800&amp;h=222" src="https://static.alili.tech/img/bVS8fT?w=800&amp;h=222" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><em>Babel转换JavaScript代码的示例</em></p>
<p>安装Babel：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i babel-core babel-loader babel-preset-es2015 babel-preset-react --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;">$ npm i <span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-preset-es2015 </span><span class="hljs-keyword">babel-preset-react </span>--save-dev</code></pre>
<p>添加Babel presets到package.json文件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;babel&quot;: {
  &quot;presets&quot;: [
    &quot;es2015&quot;,
    &quot;react&quot;
  ]
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code><span class="hljs-string">"babel"</span>: {
  <span class="hljs-string">"presets"</span>: [
    <span class="hljs-string">"es2015"</span>,
    <span class="hljs-string">"react"</span>
  ]
},</code></pre>
<p>在 Webpack 的配置中添加一条 babel-loader 规则。注意，我们在规则中排除了node_modules。这可以保证 Babel 不会尝不会对 node 模块进行转换，从而不会影响到node程序的加载速度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  rules: [
    {
      test: /\.jsx?/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">module: {
  rules: [
    {
      test: /\.jsx?/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }
  ]
}</code></pre>
<p>创建 index.jsx 和 index.html </p>
<p>为了能在浏览器中看到一些东西，我们将创建一个简单的index.html页面，这个页面只显示一个由JavaScript弹出的“Hello World!”对话框，以此来证明设置是正确的。</p>
<p>在static目录中创建一个index.html文件，并填写下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!— index.html —>
<html>
  <head>
    <meta charset=&quot;utf-8&quot;>
    <!-- Latest compiled and minified bootstrap CSS -->
    <link rel=&quot;stylesheet&quot; href=&quot;https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css&quot;>
    <title>Creating a Full-Stack Python Application with NPM, React.js and Webpack</title>
  </head>
  <body>
    <div id=&quot;content&quot; />
    <script src=&quot;dist/bundle.js&quot; type=&quot;text/javascript&quot;></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">!—</span> <span class="hljs-attr">index.html</span> —&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- Latest compiled and minified bootstrap CSS --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Creating a Full-Stack Python Application with NPM, React.js and Webpack<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/bundle.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>在static/js目录下创建一个index.jsx文件，并添加下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert(“Hello World!”);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">alert(“Hello World!”);</code></pre>
<p>启动一个独立的终端窗口来运行前面创建的 Webpack watch 命令，这样当我们在工作时，它可以在后台一直运行。它会在没有编码错误的前提下自动构建你的包。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run watch" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm run watch</code></pre>
<p>打开浏览器并访问index.html，应该能够看到弹出一个写着“Hello World!”的提示窗口。</p>
<p><span class="img-wrap"><img data-src="/img/bVS8hY?w=800&amp;h=418" src="https://static.alili.tech/img/bVS8hY?w=800&amp;h=418" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">创建一个简单的 React 应用</h2>
<p>首先需要安装React：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i react react-dom --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm i react react-dom --save-dev</code></pre>
<p>下一步让我们用一个简单的 React 应用替换掉前面的index.jsx，并让它加载一个创建在单独的 App.js 文件中的 React 类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.jsx
import React from &quot;react&quot;;
import ReactDOM from &quot;react-dom&quot;;
import App from &quot;./App&quot;;
ReactDOM.render(<App />, document.getElementById(&quot;content&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// index.jsx</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">"react-dom"</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">"./App"</span>;
ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>, document.getElementById("content"));</span></code></pre>
<p>React 类需要在不同的React源码文件中做导出，以方便后面的使用。通常每个文件中只写一个类，并且导出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App.jsx
import React from “react”;
export default class App extends React.Component {
  render () {
    return <p> Hello React!</p>;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// App.jsx</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> “react”;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> Hello React!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;
  }
}</code></pre>
<p>如果我们现在刷新浏览器，页面上将会显示“Hello React!”，而不再是“Hello World!”提示框。</p>
<p><span class="img-wrap"><img data-src="/img/bVS8h5?w=800&amp;h=419" src="https://static.alili.tech/img/bVS8h5?w=800&amp;h=419" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">配置Python服务</h2>
<p>关于Python服务器我们将会使用Flask。Flask是小型Python应用的最佳选择之一。“微框架（microframework）”可以使你在短短几分钟内轻松快速的使一个服务跑起来。对于大型应用和某些专业领域，企业通常会使用 Pyramid 或 Django。如果你想在自己的环境中拥有很大的灵活性和能够自定义配置的特性，Pyramid是一个不错的选择。Django则提供了一个全功能的Web框架，同时使你不必为应用的配置花费太多的时间，比如在数据库配置等方面。</p>
<p>创建一个新的<a href="http://python-guide-pt-br.readthedocs.io/en/latest/dev/virtualenvs/" rel="nofollow noreferrer" target="_blank">virtualenv</a>并安装<a href="http://flask.pocoo.org/" rel="nofollow noreferrer" target="_blank">Flask</a></p>
<p>在server目录中创建Flask服务源码文件，添加一个用来返回返回“Hello World!”的端点路由“/hello”，再添加一个主页面端点路由 “/“ 用来渲染index.html 模版。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# server.py
from flask import Flask, render_template

app = Flask(__name__, static_folder=&quot;../static/dist&quot;, template_folder=&quot;../static&quot;)

@app.route(&quot;/&quot;)
def index():
    return render_template(&quot;index.html&quot;)

@app.route(&quot;/hello&quot;)
def hello():
    return &quot;Hello World!”

if __name__ == &quot;__main__&quot;:
app.run()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="python hljs"><code class="python"><span class="hljs-comment"># server.py</span>
<span class="hljs-keyword">from</span> flask <span class="hljs-keyword">import</span> Flask, render_template

app = Flask(__name__, static_folder=<span class="hljs-string">"../static/dist"</span>, template_folder=<span class="hljs-string">"../static"</span>)

<span class="hljs-meta">@app.route("/")</span>
<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">index</span><span class="hljs-params">()</span>:</span>
    <span class="hljs-keyword">return</span> render_template(<span class="hljs-string">"index.html"</span>)

<span class="hljs-meta">@app.route("/hello")</span>
<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">hello</span><span class="hljs-params">()</span>:</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">"Hello World!”

if __name__ == "</span>__main__<span class="hljs-string">":
app.run()</span></code></pre>
<p>运行python服务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ python server.py" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ python server.py</code></pre>
<p>接下来访问<a href="http://localhost:5000/" rel="nofollow noreferrer" target="_blank">http://localhost:5000/</a>就可以看到 react 应用提供的的“Hello React!”提示。访问<a href="http://localhost:5000/hello" rel="nofollow noreferrer" target="_blank">http://localhost:5000/hello</a> 将会看到由Python端点路由返回的“Hello World!” </p>
<p><strong>恭喜，现在你已经有了一个基本的全栈应用</strong></p>
<p>如果你想要学习如何与服务器进行通信，以及怎样使自己的程序更加美观，请等待本文的下半部分：《<a href="https://segmentfault.com/a/1190000010942617">一个小时搭建一个全栈Web应用框架——界面美化与功能实现</a>》</p>
<table>
<thead><tr><th colspan="2">本文首发于公众号：<strong>充实的脑洞</strong>
</th></tr></thead>
<tbody>
<tr><td colspan="2"><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVSRRl?w=430&amp;h=430" src="https://static.alili.techhttps://segmentfault.com/img/bVSRRl?w=430&amp;h=430" alt="" title="" style="cursor: pointer;"></span></td></tr>
<tr><td colspan="2">欢迎扫码关注，一个技术宅的保留地</td></tr>
</tbody>
</table>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】一个小时搭建一个全栈Web应用框架（上）

## 原文链接
[https://segmentfault.com/a/1190000010717720](https://segmentfault.com/a/1190000010717720)


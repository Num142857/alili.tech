---
title: '【译】关于Webpack中一些让人困惑的地方的解答' 
date: 2019-02-06 2:30:08
hidden: true
slug: 9j7yc8ms06s
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文连接：<a href="https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.jvse0h7j5" rel="nofollow noreferrer" target="_blank">Webpack — The Confusing Parts</a></p></blockquote>
<hr>
<p>Webpack是React和Redux项目的主要模块加载器。我认为使用Angular2和其他的框架的人在如今也大量使用Webpack进行开发。</p>
<p>当我第一次查看Webpack的配置文件时，我是懵逼的。在使用过一段时间以后，我觉得这是因为Webpack有着独一无二的语法和标新立异的哲学思想，所以在刚开始使用的时候可能会造成一定的困惑。凑巧的是，这些哲学思想也是让它如此受欢迎的原因。</p>
<p>正因为Webpack的起步比较容易产生困惑，所以我希望写一些什么出来，好让更多人更容易上手并且体验它强大的特性。</p>
<p>接下来是第一部分。</p>
<h1 id="articleHeader0">Webpack的核心哲学思想</h1>
<p>两个核心哲学思想是：</p>
<ol>
<li><p><strong>一切都是模块</strong>——就像JS文件可以视作“模块”一样，其他所有的一切（CSS，图片，HTML）都可以被视作模块。也就是说，你可以<code>require(“myJSfile.js”)</code>或者<code>require(“myCSSfile.css”)</code>。这意味着我们可以把任何静态资源分割成可控的模块，以供重复使用等不同的操作。</p></li>
<li><p><strong>只加载“你需要的”和“你何时需要”的</strong>——典型的模块加载器会把所有的模块最终打包生成一个巨大的“bundle.js”文件。<strong>但在很多实际的项目当中，这个“bundle.js”文件体积可能会达到10MB~15MB，并且会一直不停进行加载！</strong>所以Webpack通过大量的特性去<strong>分割你的代码</strong>，生成多个“bundle”片段，并且<strong>异步地加载项目的不同部分</strong>，因此只会为你加载“你需要的”和“你何时需要”的部分。</p></li>
</ol>
<p>OK，让我们一起来看看那些“让人困惑”的部分吧。</p>
<h1 id="articleHeader1">1. 开发环境 VS 生产环境</h1>
<p>第一件需要意识到的事情是Webpack拥有着大量的特性。有一些是“开发环境专用”的，一些是“生产环境专用”的，还有一些是“通用”的。<br><span class="img-wrap"><img data-src="/img/bVzXIH" src="https://static.alili.tech/img/bVzXIH" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>一般来说，大部分的项目都使用了许多Webpack的特性，所以它们通常有两个大的<code>webpack config</code>文件，用于区分开发环境和生产环境。</p></blockquote>
<h1 id="articleHeader2">2. webpack CLI Vs webpack-dev-server</h1>
<p>明白Webpack这个模块加载器拥有两个接口是非常重要的：</p>
<ol>
<li><p>Webpack CLI tool ——默认的接口（和Webpack一并被安装）</p></li>
<li><p>webpack-dev-server tool ——这个工具通过来自CLI和配置文件（默认：<code>webpack.config.js</code>）的配置项来控制Webpack的打包动作。</p></li>
</ol>
<blockquote><p>你刚开始学习Webpack的时候可能是从CLI入手的，但你接下来很可能只会用它去建立生产环境的项目。</p></blockquote>
<p>使用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="OPTION 1: 
//全局安装
npm install webpack --g

//在终端使用
$ webpack //<--通过webpack.bundle.js进行打包

OPTION 2 :
//本地安装并写入package.json依赖
npm install webpack --save

//添加到package.json的script内
“scripts”: {
 “build”: “webpack --config webpack.config.prod.js -p”,
 ...
 }

//开始构建
npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>OPTION <span class="hljs-number">1</span>: 
<span class="hljs-comment">//全局安装</span>
npm install webpack --g

<span class="hljs-comment">//在终端使用</span>
$ webpack <span class="hljs-comment">//&lt;--通过webpack.bundle.js进行打包</span>

OPTION <span class="hljs-number">2</span> :
<span class="hljs-comment">//本地安装并写入package.json依赖</span>
npm install webpack --save

<span class="hljs-comment">//添加到package.json的script内</span>
“scripts”: {
 “build”: “webpack --config webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.js</span> -p”,
 ...
 }

<span class="hljs-comment">//开始构建</span>
npm run build</code></pre>
<h3 id="articleHeader3">Webpack-dev-server (有利于开发环境使用)</h3>
<p>这是一个运行在8080端口的基于Express的node.js服务器。这个服务器会在内部调用Webpack。它的优势是提供了额外的能力——类似可以刷新浏览器的“<strong>Live Reloading</strong>”，以及（或者）局部更新模块的<strong>“模块热重载”功能（HMR）</strong>。</p>
<p>使用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="OPTION 1:
//全局安装
npm install webpack-dev-server --save

//终端使用
$ webpack-dev-server --inline --hot

OPTION 2:
//添加到package.json的script内
“scripts”: {
 “start”: “webpack-dev-server --inline --hot”,
 ...
 }

//输入下列命令行进行使用
$ npm start

浏览器打开下列地址
http://localhost:8080" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>OPTION 1:
//全局安装
npm <span class="hljs-keyword">install</span> webpack-dev-<span class="hljs-keyword">server</span> <span class="hljs-comment">--save</span>

//终端使用
$ webpack-dev-<span class="hljs-keyword">server</span> <span class="hljs-comment">--inline --hot</span>

<span class="hljs-keyword">OPTION</span> <span class="hljs-number">2</span>:
//添加到package.json的script内
“scripts”: {
 “<span class="hljs-keyword">start</span>”: “webpack-dev-<span class="hljs-keyword">server</span> <span class="hljs-comment">--inline --hot”,</span>
 ...
 }

//输入下列命令行进行使用
$ npm <span class="hljs-keyword">start</span>

浏览器打开下列地址
<span class="hljs-keyword">http</span>://localhost:<span class="hljs-number">8080</span></code></pre>
<h3 id="articleHeader4">Webpack Vs webpack-dev-server options</h3>
<p>值得注意的是，有一些选项比如“inline”和“hot”仅用于webpack-dev-server，而比如“hide-modules”仅用于CLI。</p>
<h3 id="articleHeader5">webpack-dev-server CLI options Vs config options</h3>
<p>另外一件需要知道的事情是你可以通过两种方式对webpack-dev-server进行配置：</p>
<ol>
<li><p>通过<code>webpack.config.js</code>的“devServer”对象。</p></li>
<li><p>通过CLI选项。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//使用CLI
webpack-dev-server --hot --inline

//使用webpack.config.js
devServer: {
 inline: true,
 hot:true
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">//使用CLI</span>
<span class="hljs-string">webpack-dev-server</span> <span class="hljs-bullet">--hot</span> <span class="hljs-bullet">--inline</span>

<span class="hljs-string">//使用webpack.config.js</span>
<span class="hljs-attr">devServer:</span> <span class="hljs-string">{</span>
<span class="hljs-attr"> inline:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr"> hot:</span><span class="hljs-literal">true</span>
 <span class="hljs-string">}</span></code></pre>
<blockquote><p>我发现有时候devServer的配置并不管用！所以我更倾向于把这些选项以CLI的方式写入<code>package.json</code>里面：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//package.json
{
scripts: 
   {“start”: “webpack-dev-server --hot --inline”}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>//<span class="hljs-keyword">package</span>.json
{
scripts: 
   {“start”: “webpack-dev-server <span class="hljs-comment">--hot --inline”}</span>
}</code></pre>
<blockquote><p>注意：确保你木有把<code>hot:true</code>和<code>-hot</code>写在一块儿。</p></blockquote>
<h3 id="articleHeader6">“hot” Vs “inline” webpack-dev-server options</h3>
<p>“inline”选项为整个页面提供了“Live reloading”功能。“hot”选项提供了“模块热重载”功能，它会尝试仅仅更新组件被改变的部分（而不是整个页面）。如果我们把这两个选项都写上，那么当文件被改动时，webpack-dev-server会先尝试HMR，如果这不管用，它就会重新加载整个页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//当文件被改动后，下面的三个选项都会生成新的bundle，但是，
 
//1. 页面不会刷新
$ webpack-dev-server

//2. 刷新整个页面
$ webpack-dev-server --inline

//3. 仅仅刷新被改动的部分（HMR），如果HMR失败则刷新整个页面
$ webpack-dev-server  --inline --hot" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-comment">//当文件被改动后，下面的三个选项都会生成新的bundle，但是，</span>
 
<span class="hljs-comment">//1. 页面不会刷新</span>
$ webpack-dev-<span class="hljs-keyword">server</span>

<span class="hljs-comment">//2. 刷新整个页面</span>
$ webpack-dev-<span class="hljs-keyword">server</span> --inline

<span class="hljs-comment">//3. 仅仅刷新被改动的部分（HMR），如果HMR失败则刷新整个页面</span>
$ webpack-dev-<span class="hljs-keyword">server</span>  --inline --hot</code></pre>
<h1 id="articleHeader7">“entry”——字符串VS数组VS对象</h1>
<p><strong>entry</strong>告诉Webpack入口文件或者起点在哪里。它可以是一个字符串，一个数组或者一个对象。这可能会使你感到困惑，但不同的类型适用于不同的场合。</p>
<p>如果你使用的是单个起点（大部分项目都是如此），那么你可以使用任意的类型，它们的结果都会是一样的。<br><span class="img-wrap"><img data-src="/img/bVzXOB" src="https://static.alili.tech/img/bVzXOB" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">entry——数组</h3>
<p>但是，如果你想要添加互不依赖的多个文件，你可以使用数组的格式。</p>
<p>举个栗子，你的HTML可能需要“googleAnalytics.js”。你可以告诉Webpack在bundle.js的后面把它添加进去：<br><span class="img-wrap"><img data-src="/img/bVzXOV" src="https://static.alili.tech/img/bVzXOV" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader9">entry——对象</h3>
<p>现在，当你有一个包含多个HTML文件的多页应用，而不是单页应用的项目的时候（index.html和profile.html），你可以通过对象格式告诉Webpack去一次性生成多个bundle文件。</p>
<p>下面的配置会生成两个JS文件：<code>indexEntry.js</code>和<code>profileEntry.js</code>，你可以在<code>index.html</code>和<code>profile.html</code><strong>分别使用它们</strong>：<br><span class="img-wrap"><img data-src="/img/bVzXPs" src="https://static.alili.tech/img/bVzXPs" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>使用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//profile.html
<script src=”dist/profileEntry.js”></script>

//index.html
<script src=”dist/indexEntry.js”></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>//profile.html
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">”dist/profileEntry.js”</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

//index.html
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">”dist/indexEntry.js”</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<blockquote><p>注意：文件名来自“entry”对象的key。</p></blockquote>
<h3 id="articleHeader10">entry——组合格式</h3>
<p>你也可以在entry对象中使用数组。下面的例子会生成三个文件：一个包含三个文件的<code>vendor.js</code>，一个<code>index.js</code>和一个<code>profile.js</code>。<br><span class="img-wrap"><img data-src="/img/bVzXP3" src="https://static.alili.tech/img/bVzXP3" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader11">4. output — “path” Vs “publicPath”</h1>
<p><strong>output</strong>告诉Webpack应该在哪里以怎样的方式去放置打包好的文件。它有两个属性：“path”和“publicPath”，这也许会对用户造成一定的困惑。</p>
<p>“path”会简单地告诉Webpack生成文件输出位置。“publicPath”多被一些Webpack的插件使用，在HTML文件以<strong>生产环境</strong>方式被构建的时候，更新CSS文件内的URL地址。<br><span class="img-wrap"><img data-src="/img/bVzXQX" src="https://static.alili.tech/img/bVzXQX" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>举个栗子，在你的CSS文件里面，你可能会在URL里面加载<code>./test.png</code>。但是在生产环境中，<code>test.png</code>很可能放在CDN内——比如当你的node.js服务器运行在Heroku的时候。<strong>这意味着，你可能在生产环境内不得不手动更新文件内的URL指向</strong>。</p>
<p>相反，你可以使用Webpack的<code>publicPath</code>以及其他适用于这个属性的插件在生产环境中自动地更新文件内部的URL指向。<br><span class="img-wrap"><img data-src="/img/bVzXRl" src="https://static.alili.tech/img/bVzXRl" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//开发环境：服务器和图片都放在本地
.image { 
  background-image: url(‘./test.png’);
 }

//生产环境：服务器在Heroku而图片在CDN
.image { 
  background-image: url(‘https://someCDN/test.png’);
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">//开发环境：服务器和图片都放在本地</span>
.<span class="hljs-built_in">image</span> { 
  <span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>: url(‘./test.png’);
 }

<span class="hljs-comment">//生产环境：服务器在Heroku而图片在CDN</span>
.<span class="hljs-built_in">image</span> { 
  <span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>: url(‘https:<span class="hljs-comment">//someCDN/test.png’);</span>
 }</code></pre>
<h1 id="articleHeader12">5. 加载器和链式加载器</h1>
<p>加载器是额外的node模块，用于“加载”或者“引入”不同类型的文件，并把他们转化成浏览器能够识别的格式——比如JS文件、内联样式表或其他格式。另外，加载器也允许以“require”或者ES6的“import”的方式把这些文件引入到JS文件当中。</p>
<p>例如，你可以使用<code>babel-loader</code>把ES6代码转化成ES5代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
 loaders: [{
  test: /\.js$/, // 判断文件格式，若为“.js”文件则调用loader
  exclude: /node_modules/, // 排除node_modules文件夹
  loader: ‘babel’ // 使用babel（babel-loader的缩写）
 }]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">module:</span> {
<span class="hljs-symbol"> loaders:</span> [{
<span class="hljs-symbol">  test:</span> /\.js$/, <span class="hljs-comment">// 判断文件格式，若为“.js”文件则调用loader</span>
<span class="hljs-symbol">  exclude:</span> /node_modules/, <span class="hljs-comment">// 排除node_modules文件夹</span>
<span class="hljs-symbol">  loader:</span> ‘babel’ <span class="hljs-comment">// 使用babel（babel-loader的缩写）</span>
 }]</code></pre>
<h3 id="articleHeader13">链式加载器（从右到左的顺序进行工作）</h3>
<p>不同的加载器可以链式地在针对同一个文件类型进行工作。<strong>链式加载器的工作顺序是从右到左的，并且通过“！”分割</strong>。</p>
<p>举个栗子，我们有一个叫做<code>myCssFile.css</code>的CSS文件，现在想把它以<code>&lt;style&gt;&lt;/style&gt;</code>的方式在我们的HTML文件中使用，可以通过两个加载器去完成这个需求：<code>css-loader</code>和<code>style-loader</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
 loaders: [{
  test: /\.css$/,
  loader: ‘style!css’ // style-loader!css-loader的缩写
 }]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">module:</span> {
<span class="hljs-symbol"> loaders:</span> [{
<span class="hljs-symbol">  test:</span> /\.css$/,
<span class="hljs-symbol">  loader:</span> ‘style!css’ <span class="hljs-comment">// style-loader!css-loader的缩写</span>
 }]</code></pre>
<p>这是运行原理：<br><span class="img-wrap"><img data-src="/img/bVzXR1" src="https://static.alili.tech/img/bVzXR1" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ol>
<li><p>Webpack搜寻被模块所引用的CSS文件。意思是Webpack会检查一个JS文件内是否有<code>require(myCssFile.css)</code>，如果有这句话并且找到了这个依赖，它会首先把这个文件交给<code>css-loader</code>。</p></li>
<li><p><code>css-loader</code>加载所有的CSS文件及其依赖包（例如通过<code>@import</code>引入的其他CSS文件）到一个JSON文件中。随后Webpack会把结果交给<code>style-loader</code>。</p></li>
<li><p><code>style-loader</code>拿到这个JSON文件并把它注入到<code>&lt;style&gt;&lt;/style&gt;</code>标签当中，并把这个标签添加到<code>index.html</code>文件内。</p></li>
</ol>
<h1 id="articleHeader14">6.加载器自身是可配置的</h1>
<p>加载器其自身可以通过配置不同的参数实现不同的功能。</p>
<p>在下面的例子中，我们配置了<code>url-loader</code>，当图片小于1024byte的时候使用DataURL，当图片大雨1024byte的时候使用URL。我们通过下面两个传入<code>limit</code>参数的方法来实现这个功能：<br><span class="img-wrap"><img data-src="/img/bVzXT5" src="https://static.alili.tech/img/bVzXT5" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader15">7. babelrc文件</h1>
<p><code>babel-loader</code>使用<code>presets</code>去规定如何把ES6代码转化为ES5代码，以及如何把React的JSX转化为JS。我们可以通过<code>query</code>方法进行配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
  <span class="hljs-attribute">loaders</span>: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: <span class="hljs-string">'babel'</span>,
      query: {
        presets: [<span class="hljs-string">'react'</span>, <span class="hljs-string">'es2015'</span>]
      }
    }
  ]
}</code></pre>
<p>然而，在许多项目中babel的配置项会非常巨大。所以作为替代，你可以把这些配置项写入一个叫做<code>.babelrc</code>的文件中。如果这个文件存在的话<code>bable-loader</code>会自动的加载这个文件。</p>
<p>所以在许多例子中，你会看到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js 
module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }
  ]
}

//.bablerc
{
 “presets”: [“react”, “es2015”]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//webpack.config.js </span>
<span class="hljs-keyword">module</span>: {
  loaders: [
    {
      test: <span class="hljs-regexp">/\.jsx?$/</span>,
      exclude: <span class="hljs-regexp">/(node_modules|bower_components)/</span>,
      loader: <span class="hljs-string">'babel'</span>
    }
  ]
}

<span class="hljs-comment">//.bablerc</span>
{
 “presets”: [“react”, “es2015”]
}</code></pre>
<h1 id="articleHeader16">8. 插件</h1>
<p>插件是额外的node模块，多用于处理输出文件。</p>
<p>例如，<code>uglifyJSPlugin</code>会压缩并混淆JS代码，使其体积减小。</p>
<p>同样的，<code>extract-text-webpack-plugin</code>会在内部使用<code>css-loader</code>和<code>style-loader</code>去把所有的CSS合并为一个文件，并且最终把结果提取到一个分离在外部的<code>style.css</code>文件中，最后在<code>index.html</code>中引用这个CSS文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js
//Take all the .css files, combine their contents and it extract them to a single &quot;styles.css&quot;
var ETP = require(&quot;extract-text-webpack-plugin&quot;);

module: {
 loaders: [
  {test: /\.css$/, loader:ETP.extract(&quot;style-loader&quot;,&quot;css-loader&quot;) }
  ]
},
plugins: [
    new ExtractTextPlugin(&quot;styles.css&quot;) //Extract to styles.css file
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//webpack.config.js</span>
<span class="hljs-comment">//Take all the .css files, combine their contents and it extract them to a single "styles.css"</span>
<span class="hljs-keyword">var</span> ETP = <span class="hljs-built_in">require</span>(<span class="hljs-string">"extract-text-webpack-plugin"</span>);

<span class="hljs-keyword">module</span>: {
 loaders: [
  {test: <span class="hljs-regexp">/\.css$/</span>, loader:ETP.extract(<span class="hljs-string">"style-loader"</span>,<span class="hljs-string">"css-loader"</span>) }
  ]
},
plugins: [
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">"styles.css"</span>) <span class="hljs-comment">//Extract to styles.css file</span>
  ]
}</code></pre>
<p>注意，如果你只打算把CSS以行内样式的形式在HTML中引用，你可以仅仅使用<code>css-loader</code>和<code>style-loader</code>，像下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
 loaders: [{
  test: /\.css$/,
  loader: ‘style!css’ // style-loader!css-loader的缩写
 }]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">module:</span> {
<span class="hljs-symbol"> loaders:</span> [{
<span class="hljs-symbol">  test:</span> /\.css$/,
<span class="hljs-symbol">  loader:</span> ‘style!css’ <span class="hljs-comment">// style-loader!css-loader的缩写</span>
 }]</code></pre>
<h1 id="articleHeader17">9. 加载器 VS 插件</h1>
<p>正如你可能已经弄明白的，<strong>加载器在单个文件的程度上，在打包结束之前或者打包的过程中运行</strong>。</p>
<p>而<strong>插件是在打包或者数据块的程度上，在输出打包文件的过程中进行运作</strong>。一些插件比如commonsChunksPlugins甚至在更早的阶段开始运作，可以用来修改打包的方式。</p>
<h1 id="articleHeader18">10. 解析文件扩展名</h1>
<p>一些Webpack配置文件带有解析扩展文件名的属性，它们像下面的例子一样，包含了一些<strong>空字符串</strong>。这些空字符串被用于帮助加载一些没有扩展名的文件，比如<code>require("./myJSFile")</code>或者<code>import myJSFile from './myJSFile'</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
 resolve: {
   extensions: [‘’, ‘.js’, ‘.jsx’]
 }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
 <span class="hljs-attribute">resolve</span>: {
   extensions: [‘’, ‘.js’, ‘.jsx’]
 }
}</code></pre>
<p>全文完。</p>
<p>感谢Tobias Koppers（Webpack的作者）帮我审阅这篇文章！</p>
<hr>
<p>感谢你的阅读。我是Jrain，欢迎关注<a href="https://segmentfault.com/blog/jrain">我的专栏</a>，将不定期分享自己的学习体验，开发心得，搬运墙外的干货。下次见啦！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】关于Webpack中一些让人困惑的地方的解答

## 原文链接
[https://segmentfault.com/a/1190000006151512](https://segmentfault.com/a/1190000006151512)


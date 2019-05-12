---
title: '[译] Webpack——令人困惑的地方' 
date: 2019-02-10 2:30:42
hidden: true
slug: 2s7b5a8iwmi
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文 <a href="https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.jaqo97f72" rel="nofollow noreferrer" target="_blank">Webpack—The Confusing Parts</a><br><a href="https://github.com/chemdemo/chemdemo.github.io/issues/13" rel="nofollow noreferrer" target="_blank">issue讨论</a></p></blockquote>
<p>Webpack是目前基于React和Redux开发的应用的主要打包工具。我想使用Angular 2或其他框架开发的应用也有很多在使用Webpack。</p>
<p>当我第一次看到Webpack的配置文件时，它看起来非常的陌生，我非常的疑惑。经过一段时间的尝试之后我认为这是因为Webpack只是使用了比较特别的语法和引入了新的原理，因此会让使用者感到疑惑。这些也是导致Webpack不被人熟悉的原因。</p>
<p>因为刚开始使用Webpack很让人疑惑，我觉得有必要写几篇介绍Webpack的功能和特性的文章以帮助初学者快速理解。此文是最开始的一篇。</p>
<h3 id="articleHeader0">Webpack的核心原理</h3>
<p>Webpack的两个最核心的原理分别是：</p>
<p><strong>1. 一切皆模块</strong></p>
<p>正如js文件可以是一个“模块（module）”一样，其他的（如css、image或html）文件也可视作模 块。因此，你可以<code>require('myJSfile.js')</code>亦可以<code>require('myCSSfile.css')</code>。这意味着我们可以将事物（业务）分割成更小的易于管理的片段，从而达到重复利用等的目的。</p>
<p><strong>2. 按需加载</strong></p>
<p>传统的模块打包工具（module bundlers）最终将所有的模块编译生成一个庞大的<code>bundle.js</code>文件。但是在真实的app里边，“bundle.js”文件可能有10M到15M之大可能会导致应用一直处于加载中状态。因此Webpack使用许多特性来分割代码然后生成多个“bundle”文件，而且异步加载部分代码以实现按需加载。</p>
<p>好了，下面来看看那些令人困惑的部分吧。</p>
<h3 id="articleHeader1">1. 开发模式和生产模式</h3>
<p>首先要知道的是Webpack有许许多多的特性，一些是”开发模式“下才有的，一些是”生产模式“下才有的，还有一些是两种模式下都有的。</p>
<p><span class="img-wrap"><img data-src="https://camo.githubusercontent.com/769d362aaca4e1bea0c9f3abd1fd67f656c649d1/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a574341644d69303449464557646e674b38626b4663772e706e67" src="https://static.alili.techhttps://camo.githubusercontent.com/769d362aaca4e1bea0c9f3abd1fd67f656c649d1/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a574341644d69303449464557646e674b38626b4663772e706e67" alt="A sample dev v/s prod Webpack files" title="A sample dev v/s prod Webpack files" style="cursor: pointer;"></span></p>
<blockquote><p>通常使用到Webpack如此多特性的项目都会有两个比较大的Webpack配置文件</p></blockquote>
<p>为了生成bundles文件你可能在<code>package.json</code>文件加入如下的scripts项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  // 运行npm run build 来编译生成生产模式下的bundles
  &quot;build&quot;: &quot;webpack --config webpack.config.prod.js&quot;,
  // 运行npm run dev来生成开发模式下的bundles以及启动本地server
  &quot;dev&quot;: &quot;webpack-dev-server&quot;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-comment">// 运行npm run build 来编译生成生产模式下的bundles</span>
  <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack --config webpack.config.prod.js"</span>,
  <span class="hljs-comment">// 运行npm run dev来生成开发模式下的bundles以及启动本地server</span>
  <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server"</span>
 }</code></pre>
<h3 id="articleHeader2">2. webpack CLI 和webpack-dev-server</h3>
<p>值得注意的是，Webpack作为模块打包工具，提供两种用户交互接口：</p>
<ol>
<li><p>Webpack CLI tool：默认的交互方式（已随Webpack本身安装到本地）</p></li>
<li><p>webpack-dev-server：一个Node.js服务器（需要开发者从npm自行安装）</p></li>
</ol>
<h5>Webpack CLI（有利于生产模式下打包）</h5>
<p>这种方式可以从命令行获取参数也可以从配置文件（默认叫webpack.config.js）获取，将获取到的参数传入Webpack来打包。</p>
<blockquote><p>当然你也可以从命令行（CLI）开始学习Webpack，以后你可能主要在生产模式下使用到它。</p></blockquote>
<p>用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="方式1: 
// 全局模式安装webpack
npm install webpack --g
// 在终端输入
$ webpack // <--使用webpack.config.js生成bundle

方式 2 :
// 费全局模式安装webpack然后添加到package.json依赖里边
npm install webpack --save
// 添加build命令到package.json的scripts配置项
&quot;scripts&quot;: {
 &quot;build&quot;: &quot;webpack --config webpack.config.prod.js -p&quot;,
 ...
 }
// 用法：
&quot;npm run build&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">方式<span class="hljs-number">1</span>: 
<span class="hljs-comment">// 全局模式安装webpack</span>
npm install webpack --g
<span class="hljs-comment">// 在终端输入</span>
$ webpack <span class="hljs-comment">// &lt;--使用webpack.config.js生成bundle</span>

方式 <span class="hljs-number">2</span> :
<span class="hljs-comment">// 费全局模式安装webpack然后添加到package.json依赖里边</span>
npm install webpack --save
<span class="hljs-comment">// 添加build命令到package.json的scripts配置项</span>
<span class="hljs-string">"scripts"</span>: {
 <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack --config webpack.config.prod.js -p"</span>,
 ...
 }
<span class="hljs-comment">// 用法：</span>
<span class="hljs-string">"npm run build"</span></code></pre>
<h5>webpack-dev-server（有利于在开发模式下编译）</h5>
<p>这是一个基于Express.js框架开发的web server，默认监听8080端口。server内部调用Webpack，这样做的好处是提供了额外的功能如热更新“Live Reload”以及热替换“Hot Module Replacement”（即HMR）。</p>
<p>用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="方式 1:
// 全局安装
npm install webpack-dev-server --save
// 终端输入
$ webpack-dev-server --inline --hot

用法 2:
// 添加到package.json scripts
&quot;scripts&quot;: {
 &quot;start&quot;: &quot;webpack-dev-server --inline --hot&quot;,
 ...
 }
// 运行： 
$ npm start

// 浏览器预览：
http://localhost:8080" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">方式 <span class="hljs-number">1</span>:
<span class="hljs-comment">// 全局安装</span>
npm install webpack-dev-server --save
<span class="hljs-comment">// 终端输入</span>
$ webpack-dev-server --inline --hot

用法 <span class="hljs-number">2</span>:
<span class="hljs-comment">// 添加到package.json scripts</span>
<span class="hljs-string">"scripts"</span>: {
 <span class="hljs-string">"start"</span>: <span class="hljs-string">"webpack-dev-server --inline --hot"</span>,
 ...
 }
<span class="hljs-comment">// 运行： </span>
$ npm start

<span class="hljs-comment">// 浏览器预览：</span>
http:<span class="hljs-comment">//localhost:8080</span></code></pre>
<h5>Webpack VS Webpack-dev-server选项</h5>
<p>注意像<code>inline</code>和<code>hot</code>这些选项是Webpack-dev-server特有的，而另外的如<code>hide-modules</code>则是CLI模式特有的选项。</p>
<h5>webpack-dev-server CLI选项和配置项</h5>
<p>另外值得注意的是你可以通过以下两种方式向webpack-dev-server传入参数：</p>
<ol>
<li><p>通过webpack.config.js文件的"devServer"对象</p></li>
<li><p>通过CLI选项</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通过CLI传参
webpack-dev-server --hot --inline
// 通过webpack.config.js传参
devServer: {
  inline: true,
  hot:true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 通过CLI传参</span>
webpack-dev-server --hot --inline
<span class="hljs-comment">// 通过webpack.config.js传参</span>
devServer: {
  <span class="hljs-attr">inline</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">hot</span>:<span class="hljs-literal">true</span>
}</code></pre>
<blockquote><p>我发现有时devServer配置项（hot: true 和inline: true）不生效，我更偏向使用如下的方式向CLI传递参数：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// package.json
{
    &quot;scripts&quot;: &quot;webpack-dev-server --hot --inline&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// package.json</span>
{
    <span class="hljs-string">"scripts"</span>: <span class="hljs-string">"webpack-dev-server --hot --inline"</span>
}</code></pre>
<blockquote><p>注意：确定你没有同时传入<code>hot:true</code>和<code>-hot</code></p></blockquote>
<h5>webpack-dev-server的“hot” 和 “inline”选项</h5>
<p>“inline”选项会为入口页面添加“热加载”功能，“hot”选项则开启“热替换（Hot Module Reloading）”，即尝试重新加载组件改变的部分（而不是重新加载整个页面）。如果两个参数都传入，当资源改变时，webpack-dev-server将会先尝试HRM（即热替换），如果失败则重新加载整个入口页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当资源发生改变，以下三种方式都会生成新的bundle，但是又有区别：
 
// 1. 不会刷新浏览器
$ webpack-dev-server
//2. 刷新浏览器
$ webpack-dev-server --inline
//3. 重新加载改变的部分，HRM失败则刷新页面
$ webpack-dev-server  --inline --hot" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 当资源发生改变，以下三种方式都会生成新的bundle，但是又有区别：</span>
 
<span class="hljs-comment">// 1. 不会刷新浏览器</span>
$ webpack-dev-server
<span class="hljs-comment">//2. 刷新浏览器</span>
$ webpack-dev-server --inline
<span class="hljs-comment">//3. 重新加载改变的部分，HRM失败则刷新页面</span>
$ webpack-dev-server  --inline --hot</code></pre>
<h3 id="articleHeader3">3. “entry”：值分别是字符串、数组和对象的情况</h3>
<p>Enter配置项告诉Webpack应用的根模块或起始点在哪里，它的值可以是字符串、数组或对象。这看起来可能令人困惑，因为不同类型的值有着不同的目的。</p>
<p>像绝大多数app一样，倘若你的应用只有一个单一的入口，enter项的值你可以使用任意类型，最终输出的结果都是一样的。</p>
<p><span class="img-wrap"><img data-src="https://camo.githubusercontent.com/94d5882d5d4c236cf6a550f604358193fd9a8ec4/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a4f6e58706676347a6a4c2d357a4f324861366d5844772e706e67" src="https://static.alili.techhttps://camo.githubusercontent.com/94d5882d5d4c236cf6a550f604358193fd9a8ec4/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a4f6e58706676347a6a4c2d357a4f324861366d5844772e706e67" alt="Different entry types but same output" title="Different entry types but same output" style="cursor: pointer;"></span></p>
<h5>enter：数组类型</h5>
<p>但是，如果你想添加多个彼此不互相依赖的文件，你可以使用数组格式的值。</p>
<p>例如，你可能在html文件里引用了“googleAnalytics.js”文件，可以告诉Webpack将其加到bundle.js的最后。</p>
<p><span class="img-wrap"><img data-src="https://camo.githubusercontent.com/cbc2ac1d6c1059654ddc9ab03d0fd5e3369c6d9a/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a794c566453336f4e34586f384b496e6f5449666930412e706e67" src="https://static.alili.techhttps://camo.githubusercontent.com/cbc2ac1d6c1059654ddc9ab03d0fd5e3369c6d9a/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a794c566453336f4e34586f384b496e6f5449666930412e706e67" alt="enter array" title="enter array" style="cursor: pointer; display: inline;"></span></p>
<h5>enter：对象</h5>
<p>现在，假设你的应用是多页面的（multi-page application）而不是SPA，有多个html文件（index.html和profile.html）。然后你通过一个对象告诉Webpack为每一个html生成一个bundle文件。</p>
<p>以下的配置将会生成两个js文件：indexEntry.js和profileEntry.js分别会在index.html和profile.html中被引用。</p>
<p><span class="img-wrap"><img data-src="https://camo.githubusercontent.com/2ee6bc5c88b5cdb9452f3389a6e2e7060402b3f0/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a7842353152524334696b36424250326c4a39304975772e706e67" src="https://static.alili.techhttps://camo.githubusercontent.com/2ee6bc5c88b5cdb9452f3389a6e2e7060402b3f0/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a7842353152524334696b36424250326c4a39304975772e706e67" alt="entry object" title="entry object" style="cursor: pointer; display: inline;"></span></p>
<p>用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//profile.html
<script src=”dist/profileEntry.js”></script>
//index.html
<script src=”dist/indexEntry.js”></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//profile.html</span>
&lt;script src=”dist/profileEntry.js”&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="hljs-comment">//index.html</span>
&lt;script src=”dist/indexEntry.js”&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>注意：文件名取自“entry”对象的键名。</p>
<h5>enter：混合类型</h5>
<p>你也可以在enter对象里使用数组类型，例如下面的配置将会生成3个文件：vender.js（包含三个文件），index.js和profile.js文件。</p>
<p><span class="img-wrap"><img data-src="https://camo.githubusercontent.com/7cb0c356dff08cfca479e68a5165a381c70aa613/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a797a373651593166567a42474b4a2d365836456c65672e706e67" src="https://static.alili.techhttps://camo.githubusercontent.com/7cb0c356dff08cfca479e68a5165a381c70aa613/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a797a373651593166567a42474b4a2d365836456c65672e706e67" alt="enter combination" title="enter combination" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">4. output：“path”项和“publicPath”项</h3>
<p>output项告诉webpack怎样存储输出结果以及存储到哪里。output的两个配置项“path”和“publicPath”可能会造成困惑。</p>
<p>“path”仅仅告诉Webpack结果存储在哪里，然而“publicPath”项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值。</p>
<p><span class="img-wrap"><img data-src="https://camo.githubusercontent.com/4802b6cfbcdfbb7cada7121ae14ba616c716edab/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a36335a7461346d62435f336f343451647963724437512e706e67" src="https://static.alili.techhttps://camo.githubusercontent.com/4802b6cfbcdfbb7cada7121ae14ba616c716edab/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a36335a7461346d62435f336f343451647963724437512e706e67" alt="publicPath in Development vs Production" title="publicPath in Development vs Production" style="cursor: pointer;"></span></p>
<p>例如，在localhost（译者注：即本地开发模式）里的css文件中边你可能用“./test.png”这样的url来加载图片，但是在生产模式下“test.png”文件可能会定位到CDN上并且你的Node.js服务器可能是运行在HeroKu上边的。这就意味着在生产环境你必须手动更新所有文件里的url为CDN的路径。</p>
<p>然而你也可以使用Webpack的“publicPath”选项和一些插件来在生产模式下编译输出文件时自动更新这些url。</p>
<p><span class="img-wrap"><img data-src="https://camo.githubusercontent.com/3cc10014e06c18fda61c2f5fa6b31f5275d4cafd/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a614f4d355a4638616c574c723442433043665a6530772e706e67" src="https://static.alili.techhttps://camo.githubusercontent.com/3cc10014e06c18fda61c2f5fa6b31f5275d4cafd/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a614f4d355a4638616c574c723442433043665a6530772e706e67" alt="publicPath Production example" title="publicPath Production example" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 开发环境：Server和图片都是在localhost（域名）下
.image { 
  background-image: url('./test.png');
 }
// 生产环境：Server部署下HeroKu但是图片在CDN上
.image { 
  background-image: url('https://someCDN/test.png');
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 开发环境：Server和图片都是在localhost（域名）下</span>
.image { 
  background-image: url(<span class="hljs-string">'./test.png'</span>);
 }
<span class="hljs-comment">// 生产环境：Server部署下HeroKu但是图片在CDN上</span>
.image { 
  background-image: url(<span class="hljs-string">'https://someCDN/test.png'</span>);
 }</code></pre>
<h3 id="articleHeader5">5. 模块加载和链式模块加载</h3>
<p>模块加载器是可自由添加的Node模块，用于将不同类型的文件“load”或“import”并转换成浏览器可以识别的类型，如js、Stylesheet等。更高级的模块加载器甚至可以支持使用ES6里边的“require”或“import”引入模块。</p>
<p>例如，你可以使用<code>babel-loader</code>来将使用ES6语法写成的文件转换成ES5：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
 loaders: [{
  test: /\.js$/, // 匹配.js文件，如果通过则使用下面的loader
  exclude: /node_modules/, // 排除node_modules文件夹
  loader: 'babel' // 使用babel（babel-loader的简写）作为loader
 }]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>: {
 <span class="hljs-attr">loaders</span>: [{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-comment">// 匹配.js文件，如果通过则使用下面的loader</span>
  exclude: <span class="hljs-regexp">/node_modules/</span>, <span class="hljs-comment">// 排除node_modules文件夹</span>
  loader: <span class="hljs-string">'babel'</span> <span class="hljs-comment">// 使用babel（babel-loader的简写）作为loader</span>
 }]</code></pre>
<h5>链式（管道式）的加载器（从右往左执行）</h5>
<p>多个loader可以用在同一个文件上并且被链式调用。链式调用时从右到左执行且loader之间用“!”来分割。</p>
<p>例如，假设我们有一个名为“myCssFile.css”的css文件，然后我们想将它的内容使用style标签内联到最终输出的html里边。我们可以使用css-loader和style-loader两个loader来达到目的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
 loaders: [{
  test: /\.css$/,
  loader: 'style!css' //(short for style-loader!css-loader)
 }]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>: {
 <span class="hljs-attr">loaders</span>: [{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
  <span class="hljs-attr">loader</span>: <span class="hljs-string">'style!css'</span> <span class="hljs-comment">//(short for style-loader!css-loader)</span>
 }]</code></pre>
<p>这里展示它是如何工作的：</p>
<p><span class="img-wrap"><img data-src="https://camo.githubusercontent.com/9c306d1bcc8f5fc732f772afd6101dcc88309eba/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a6e657339694c6d736b6d734438467034456b33752d412e706e67" src="https://static.alili.techhttps://camo.githubusercontent.com/9c306d1bcc8f5fc732f772afd6101dcc88309eba/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a6e657339694c6d736b6d734438467034456b33752d412e706e67" alt="chaining loaders" title="chaining loaders" style="cursor: pointer;"></span></p>
<ol>
<li><p>Webpack在模块颞部搜索在css的依赖项，即Webpack检查js文件是否有“require('myCssFile.css')”的引用，如果它发现有css的依赖，Webpack将css文件交给“css-loader”去处理</p></li>
<li><p>css-loader加载所有的css文件以及css自身的依赖（如，<a href="/u/import">@import</a> 其他css）到JSON对象里，Webpack然后将处理结果传给“style-loader”</p></li>
<li><p>style-loader接受JSON值然后添加一个style标签并将其内嵌到html文件里</p></li>
</ol>
<h3 id="articleHeader6">6. loader自身可以配置</h3>
<p>模块加载器（loader）自身可以根据传入不同的参数进行配置。</p>
<p>在下面的例子中，我们可以配置url-loader来将小于1024字节的图片使用DataUrl替换而大于1024字节的图片使用url，我们可以用如下两种方式通过传入“limit“参数来实现这一目的：</p>
<p><span class="img-wrap"><img data-src="https://camo.githubusercontent.com/df52305c7926e1071636fa6ad8e60a6da91df9cc/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a2d71566463413345384a536474737a784871664964412e706e67" src="https://static.alili.techhttps://camo.githubusercontent.com/df52305c7926e1071636fa6ad8e60a6da91df9cc/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a2d71566463413345384a536474737a784871664964412e706e67" alt="configure loaders" title="configure loaders" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">7. <code>.babelrc</code> 文件</h3>
<p>babal-loader使用”presets“配置项来标识如何将ES6语法转成ES5以及如何转换React的JSX成js文件。我们可以用如下的方式使用”query“参数传入配置：</p>
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">loaders</span>: [
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,
      <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/(node_modules|bower_components)/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
      <span class="hljs-attr">query</span>: {
        <span class="hljs-attr">presets</span>: [<span class="hljs-string">'react'</span>, <span class="hljs-string">'es2015'</span>]
      }
    }
  ]
}</code></pre>
<p>然而在很多项目里babal的配置可能比较大，因此你可以把babal-loader的配置项单独保存在一个名为”.babelrc“的文件中，在执行时babal-loader将会自动加载.babelrc文件。</p>
<p>所以在很多例子里，你可能会看到：</p>
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
 presets: ['react', 'es2015']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//webpack.config.js </span>
<span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">loaders</span>: [
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,
      <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/(node_modules|bower_components)/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>
    }
  ]
}

<span class="hljs-comment">//.bablerc</span>
{
 <span class="hljs-attr">presets</span>: [<span class="hljs-string">'react'</span>, <span class="hljs-string">'es2015'</span>]
}</code></pre>
<h3 id="articleHeader8">8. 插件</h3>
<p>插件一般都是用于输出bundle的node模块。</p>
<p>例如，<a href="https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin" rel="nofollow noreferrer" target="_blank">uglifyJSPlugin</a>获取bundle.js然后压缩和混淆内容以减小文件体积。</p>
<p>类似的<a href="https://github.com/webpack/extract-text-webpack-plugin" rel="nofollow noreferrer" target="_blank">extract-text-webpack-plugin</a>内部使用css-loader和style-loader来收集所有的css到一个地方最终将结果提取结果到一个独立的”styles.css“文件，并且在html里边引用style.css文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js
// 获取所有的.css文件，合并它们的内容然后提取css内容到一个独立的”styles.css“里
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//webpack.config.js</span>
<span class="hljs-comment">// 获取所有的.css文件，合并它们的内容然后提取css内容到一个独立的”styles.css“里</span>
<span class="hljs-keyword">var</span> ETP = <span class="hljs-built_in">require</span>(<span class="hljs-string">"extract-text-webpack-plugin"</span>);

<span class="hljs-built_in">module</span>: {
 <span class="hljs-attr">loaders</span>: [
  {<span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-attr">loader</span>:ETP.extract(<span class="hljs-string">"style-loader"</span>,<span class="hljs-string">"css-loader"</span>) }
  ]
},
<span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">"styles.css"</span>) <span class="hljs-comment">//Extract to styles.css file</span>
  ]
}</code></pre>
<p>注意：如果你只是想把css使用style标签内联到html里，你不必使用extract-text-webpack-plugin，仅仅使用css loader和style loader即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
 loaders: [{
  test: /\.css$/,
  loader: 'style!css' // (short for style-loader!css-loader)
 }]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>: {
 <span class="hljs-attr">loaders</span>: [{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
  <span class="hljs-attr">loader</span>: <span class="hljs-string">'style!css'</span> <span class="hljs-comment">// (short for style-loader!css-loader)</span>
 }]</code></pre>
<h3 id="articleHeader9">9. 加载器（loader）和插件</h3>
<p>你可能已经意识到了，Loader处理单独的文件级别并且通常作用于包生成之前或生成的过程中。</p>
<p>而插件则是处理包（bundle）或者chunk级别，且通常是bundle生成的最后阶段。一些插件如<a href="https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin" rel="nofollow noreferrer" target="_blank">commonschunkplugin</a>甚至更直接修改bundle的生成方式。</p>
<h3 id="articleHeader10">10. 处理文件的扩展名</h3>
<p>很多Webpack的配置文件都有一个<code>resolve</code>属性，然后就像下面代码所示有一个空字符串的值。空字符串在此是为了resolve一些在import文件时不带文件扩展名的表达式，如<code>require('./myJSFile')</code>或者<code>import myJSFile from './myJSFile'</code>（译者注：实际就是自动添加后缀，默认是当成js文件来查找路径）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
 resolve: {
   extensions: ['', '.js', '.jsx']
 }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
 <span class="hljs-attr">resolve</span>: {
   <span class="hljs-attr">extensions</span>: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.jsx'</span>]
 }
}</code></pre>
<p>就这么多。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] Webpack——令人困惑的地方

## 原文链接
[https://segmentfault.com/a/1190000005089993](https://segmentfault.com/a/1190000005089993)


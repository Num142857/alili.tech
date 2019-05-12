---
title: '[译] Webpack 前端构建集成方案' 
date: 2019-02-09 2:30:58
hidden: true
slug: gm74pqyyg3h
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><strong>构建工具</strong>逐渐成为前端工程必备的工具，Grunt、Gulp、Fis、Webpack等等，译者有幸使用过Fis、Gulp。<br>前者是百度的集成化方案，提供了一整套前端构建方案，优点是基本帮你搞定了，但是灵活性相对比较低，社区也没那么大；后者提供了非常灵活的配置，简单的语法可以配置出强大的功能，流控制也减少了编译时的时间，可以和各种插件配合使用。<br>译者因为要使用AMD模块机制，开始接触了webpack，发现官网上讲的晦涩难懂，无法实践，而国内虽有博客也讲解一些入门的教程，但是要么篇幅过短，要么只讲各种配置贴各种代码，然后谷歌发现了国外大牛写的这篇<a href="https://blog.madewithlove.be/post/webpack-your-bags/" rel="nofollow noreferrer" target="_blank">博客</a>，发现讲的非常通俗易懂，配合实践和代码，让译者感慨万千，瞬间打开了一扇大门。</p></blockquote>
<p>原文链接：<a href="https://blog.madewithlove.be/post/webpack-your-bags/" rel="nofollow noreferrer" target="_blank">https://blog.madewithlove.be/post/webpack-your-bags/</a><br>作者：<a href="https://twitter.com/anahkiasen" rel="nofollow noreferrer" target="_blank">Maxime Fabre</a><br>译者：<a href="https://github.com/chenjsh36" rel="nofollow noreferrer" target="_blank">陈坚生</a></p>
<hr>
<p>也许你已经听说过这个叫做webpack的新工具了。有些人称它是一个像gulp一样的构建工具， 有些人则认为它是像browserify一样的打包工具， 如果你并没有深入去了解它你可能就会产生疑惑。就算你仔细地研究它你也可能依旧困惑，因为webpack的官网介绍webpack的时候同时提到了这两个功能。</p>
<p>一开始对"webpack 是什么"的模糊概念使得我很挫败以至于我直接关掉了webpack的网页。到了现在，我已经有了一套自己的构建系统并为此觉得很开心。如果你和我一样紧跟javascript的潮流，那么错过如此好的工具将是非常可惜的事情。（这句话翻译的不好：And if you follow closely the very fast Javascript scene, like me, you’ve probably been burnt in the past by jumping on the bandwagon too soon.&nbsp;）因为对webpack有了一定的实践和经验，我决定写这篇文章来更加清晰地解释“什么是webpack”还有webpack的重要性和优势。</p>
<h2 id="articleHeader0">什么是webpack？</h2>
<p>首先让我们来回答标题中的问题：webpack到底是一个构建系统还是一个打包工具？好吧， 它都有——但不是说它做了两者而是说它合并了两者。webpack并不构建你的资源（assets），然后分别对你的模块进行打包，它认为你的资源都是模块</p>
<p>更精确地说webpack并不是构建所有的sass文件，优化你的图片，并将它们包括在一边，而是打包你所有的模块，然后在另一个页面引用它们，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import stylesheet from 'styles/my-styles.scss';
import logo from 'img/my-logo.svg';
import someTemplate from 'html/some-template.html';
console.log(stylesheet); // &quot;body{font-size:12px}&quot;
console.log(logo); // &quot;data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5[...]&quot;
console.log(someTemplate) // &quot;<html><body><h1>Hello</h1></body></html>&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">import stylesheet from <span class="hljs-string">'styles/my-styles.scss'</span>;
import logo from <span class="hljs-string">'img/my-logo.svg'</span>;
import someTemplate from <span class="hljs-string">'html/some-template.html'</span>;
console.log(stylesheet); // <span class="hljs-string">"body{font-size:12px}"</span>
console.log(logo); // <span class="hljs-string">"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5[...]"</span>
console.log(someTemplate) // <span class="hljs-string">"&lt;html&gt;&lt;body&gt;&lt;h1&gt;Hello&lt;/h1&gt;&lt;/body&gt;&lt;/html&gt;"</span></code></pre>
<p>你所有的资源都被认为是模块，因此是可以被引用的、修改、操作，最后可以被打包进你的终极模块中。</p>
<p>为了使得这样能够运行，你需要在你的webpack配置中注册<strong>loaders</strong>。 Loaders 可以认为是一些小型的插件，简单地说就是让webpack在处理的时候，当遇到这种类型的文件时，做这样的操作（操作就是Loaders也就是你的配置）。以下是Loaders配置的一些例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ // When you import a .ts file, parse it with Typescript 
    test: /\.ts/, 
    loader: 'typescript',
},{
    // When you encounter images, compress them with image-webpack (wrapper around imagemin) 
    // and then inline them as data64 URLs 
    test: /\.(png|jpg|svg)/, 
    loaders: ['url', 'image-webpack'],
},{ 
    // When you encounter SCSS files, parse them with node-sass, then pass autoprefixer on them 
    // then return the results as a string of CSS 
    test: /\.scss/, 
    loaders: ['css', 'autoprefixer', 'sass'],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">{ // When you import a .ts file, parse it with Typescript 
    <span class="hljs-built_in">test</span>: /\.ts/, 
    loader: <span class="hljs-string">'typescript'</span>,
},{
    // When you encounter images, compress them with image-webpack (wrapper around imagemin) 
    // and <span class="hljs-keyword">then</span> inline them as data64 URLs 
    <span class="hljs-built_in">test</span>: /\.(png|jpg|svg)/, 
    loaders: [<span class="hljs-string">'url'</span>, <span class="hljs-string">'image-webpack'</span>],
},{ 
    // When you encounter SCSS files, parse them with node-sass, <span class="hljs-keyword">then</span> pass autoprefixer on them 
    // <span class="hljs-keyword">then</span> <span class="hljs-built_in">return</span> the results as a string of CSS 
    <span class="hljs-built_in">test</span>: /\.scss/, 
    loaders: [<span class="hljs-string">'css'</span>, <span class="hljs-string">'autoprefixer'</span>, <span class="hljs-string">'sass'</span>],
}</code></pre>
<p>总之到食物链的末尾，所有的Loaders返回字符串。这个机制使得Webpack可以将它们引进到javascript的包中。当你的sass文件被Loaders转化后，它在内部会像这样被传递：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default 'body{font-size:12px}';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">export</span> default <span class="hljs-string">'body{font-size:12px}'</span>;</code></pre>
<h2 id="articleHeader1">为什么要这样做？</h2>
<p>当你明白webpack做了什么后，随之而来的问题大部分是这样做的好处是什么？ “图片、css在我的JS中？这是什么鬼？” 好吧，思考下我们最近一直推崇的并被教育应该这样做的，把所有的东西打包成一个文件，以减少http请求……</p>
<p>这导致了一个很大的缺点就是大多数人把当前的所有资源都打包到一个app.js文件中，然后包含在所有的页面。这意味着任何给定页面上大部分加载的资源都是非必须的。如果你不这样做，那么你很可能要手工引入资源，导致需要维护和跟踪一个巨大的依赖书，用来记录那个页面用到了样式表A和样式表B。</p>
<p>无论方法是正确的还是错误的。 想象一下webpack作为一个中间者，它不止是一个构建系统或者一个打包工具，它是一个顽皮的智能模块包装系统。一旦被很好地配置，它会比你更加了解你的栈，所以它会比你更加清楚如何更好地优化。</p>
<h2 id="articleHeader2">让我们一起构建一个简单的APP</h2>
<p>为了让你更简单地了解webpack的优点，我们将一起构建一个小型的App并对资源进行打包。对于本教程，我建议运行Node4或者Node5以及NPM3的平行依赖树以避免在使用webpack时遇到坑爹地问题。如果你还没有NPM3，你可以通过</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install npm@3 -g " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> install <span class="hljs-built_in">npm</span>@<span class="hljs-number">3</span> -g </code></pre>
<p>来安装。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node --version
v5.7.1
$ npm --version
3.6.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="base">$ <span class="hljs-keyword">node</span> <span class="hljs-title">--version</span>
v5.<span class="hljs-number">7.1</span>
$ npm --<span class="hljs-keyword">version</span>
<span class="hljs-number">3.6</span>.<span class="hljs-number">0</span></code></pre>
<p>我也建议你添加node_modules/.bin 到你的环境变量中以避免每次都输入 <code>node_modules/.bin/webpack</code> 来运行命令。后面的所有例子我将不会使用node_modules/.bin这个命令了。</p>
<h3 id="articleHeader3">基本的使用</h3>
<p>让我们创建我们的项目并安装webpack，同时我们引入jQuery以便后面使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm init -y
$ npm install jquery --save
$ npm install webpack --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ npm init -y
$ npm install jquery --save
$ npm install webpack --save-dev</code></pre>
<p>现在，让我们创建项目的入口，并使用es2015:</p>
<p><em>src/index.js</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $ = require('jquery');
$('body').html('hello');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">var $ = require(<span class="hljs-string">'jquery'</span>);
$(<span class="hljs-string">'body'</span>).html(<span class="hljs-string">'hello'</span>);</code></pre>
<p>然后创建我们的webpack配置，文件名为webpack.config.js， webpack的配置文件是一个javascript，并且需要export成一个object（对象）</p>
<p><em>webpack.config.js</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    module.exports = {
      entry: './src',
      output: {
        path: 'builds',
        filename: 'bundle.js',
      }
    };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">
    module.exports = {
      entry: <span class="hljs-string">'./src'</span>,
      output: {
        path: <span class="hljs-string">'builds'</span>,
        filename: <span class="hljs-string">'bundle.js'</span>,
      }
    };
</code></pre>
<p>在这里，entry告诉webpack那些文件是你应用的入口。入口文件位于你依赖树的顶部。然后我们告诉它去编译我们的文件到__builds__这个文件夹中并使用((bundle.js这个名字。接下来我们创建我们的index.html：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    <!DOCTYPE html>
    <html lang=&quot;en&quot;>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <title>webpack</title>
    </head>
    <body>
        <h1>my title</h1>
        <a href=&quot;&quot;>click me</a>
        <script src=&quot;builds/bundle.js&quot;></script>
    </body>
    </html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">
    &lt;!DOCTYPE html&gt;
    &lt;html lang=<span class="hljs-string">"en"</span>&gt;
    &lt;head&gt;
        &lt;meta charset=<span class="hljs-string">"UTF-8"</span>&gt;
        &lt;title&gt;webpack&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h1&gt;my title&lt;/h1&gt;
        &lt;a href=<span class="hljs-string">""</span>&gt;click me&lt;/a&gt;
        &lt;script src=<span class="hljs-string">"builds/bundle.js"</span>&gt;&lt;/script&gt;
    &lt;/body&gt;
    &lt;/html&gt;
</code></pre>
<p>运行webpack，如果一切运行正常，我们会收到一段信息告诉我们webpack成功编译打包到了bundle.js中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Version: webpack 1.13.1
Time: 382ms
    Asset    Size  Chunks             Chunk Names
bundle.js  267 kB       0  [emitted]  main
   [0] ./src/index.js 58 bytes {0} [built]
    + 1 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">Version: webpack 1.13.1
Time: 382ms
    Asset    Size  Chunks             Chunk Names
bundle.js  267 kB       0  [emitted]  main
   [0] ./src/index.js 58 bytes {0} [built]
    + 1 hidden modules</code></pre>
<p>在这里你可以看到webpack告诉你你的bundle.js包含了我们的入口文件index.js同时还有一个隐藏的模块。这个隐藏的模块便是jquery，webpack默认会隐藏不属于你的模块，如果要看所有被webpack隐藏的模块，我们可以向webpack传参 --display-modules：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=">webpack --display-modules
Hash: 20aea3445ac35ac27c32
Version: webpack 1.13.1
Time: 382ms
    Asset    Size  Chunks             Chunk Names
bundle.js  267 kB       0  [emitted]  main
   [0] ./src/index.js 58 bytes {0} [built]
   [1] ./~/jquery/dist/jquery.js 258 kB {0} [built]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt;webpack --display-modules
Hash: 20aea3445ac35ac27c32
Version: webpack 1.13.1
Time: 382ms
    Asset    Size  Chunks             Chunk Names
bundle.js  267 kB       0  [emitted]  main
   [0] ./src/index.js 58 bytes {0} [built]
   [1] ./~/jquery/dist/jquery.js 258 kB {0} [built]</code></pre>
<p>你也可以运行 <strong>webpack --watch</strong> 让webpack去监听你的文件，一旦有改变则自动编译。</p>
<h3 id="articleHeader4">建立我们的第一个Loader</h3>
<p>还记得我们讨论过的webpack如何引进css和html以及其他所有类型的资源吗？在那里适合？如果你有投身到这几年的web组件化发展的事业中（angular2， vue, react, polymer, x-tag等等），你应该听说过关于构建webapp的一个新的概念，不适用单一集成的ui模块，而是将ui分解为多个小型的可重用的ui。现在为了让组件真正独立，他们需要能够将所有依赖都引入他们自身中。想象一下一个按钮肯定有html、一些脚本让它能够交互，当然也需要一些样式。最好能在需要到这个组件的时候所有这些资源才被加载。只有当我们引入这个按钮的时候，我们才拿到相关的资源。</p>
<p>让我们来写button组件。首先，我假设大多数人都习惯了es2015，我们将添加第一个Loader： babel。安装Loader于webpack中需要做两件事情：**npm install {whatever}-loader, 然后添加它到你webpack配置中，即module.loaders。如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install babel-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm install babel-loader --save-dev</code></pre>
<p>由于babel-loader并不会自动安装babel， 我们需要自己安装babel-core还有es2015 preset：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install babel-core babel-preset-es2015 --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm install babel-core babel-preset-es2015 --save-dev</code></pre>
<p>然后我们创建.babelrc来告诉babel应该用哪一种preset，文件是json格式，在本例子中，我们告诉它使用es2015 preset</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".babelrc { &quot;presets&quot;: [&quot;es2015&quot;]}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.babelrc</span> { <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"es2015"</span>]}</code></pre>
<p>现在已经配置并安装好babel了。我们需要babel运行在所有的以.js结尾的文件中，但是由于webpack会遍历包括第三方在内的所有依赖包，因此我们要防止babel运行在如jquery这样的第三方库中。Loaders可以拥有一个include或者一个exclude规则，它可以是一个字符串、一个正则表达、一个回调函数或者其他任何你想要的。在本例子中，我们想要babel只运行在我们的文件上，因此我们将<strong>include</strong>我们的资源文件夹：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: './src',
    output: {
        path: 'builds',
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                include: __dirname + '/src',
            }
        ],
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">module.exports = {
    entry: <span class="hljs-string">'./src'</span>,
    output: {
        path: <span class="hljs-string">'builds'</span>,
        filename: <span class="hljs-string">'[name].js'</span>,
    },
    module: {
        loaders: [
            {
                <span class="hljs-built_in">test</span>: /\.js/,
                loader: <span class="hljs-string">'babel'</span>,
                include: __dirname + <span class="hljs-string">'/src'</span>,
            }
        ],
    }
};</code></pre>
<p>现在我们可以重写我们的index.js（我们在之前引入了babel）。并且接下来的例子我们也将使用es6</p>
<h3 id="articleHeader5">写一个小型的组件</h3>
<p>现在我们开始写一个小型的button组件， 它将有一些scss样式，一个html模板，还有一些行为。我们将安装我们需要的东西。手下我们需要mustache，一个非常轻量级的模板渲染库，同时还有sasss和html的Loaders。同时，由于Loader可以像管道一样将处理后的结果顺序传递下去，我们将需要一个cssloader来处理sass Loader处理后的结果。现在，我们有了我们的css， 有很多方式可以处理他们，这次我们使用的是style-loader，它可以动态地将css注入到页面中去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install mustache --save
$ npm install css-loader style-loader html-loader sass-loader node-sass --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ npm install mustache --save
$ npm install css-loader style-loader html-loader sass-loader node-sass --save-dev</code></pre>
<p>我们由右到左以‘！’为分割向配置文件传递loader以告诉webpack如何将匹配到的文件顺序传递给Loaders，你也可以使用数组来进行传递，当然顺序也要是由右到左</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: './src',
    output: {
        path: 'builds',
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                include: __dirname + '/src',
            }
        ],
        {
            test: '\.scss',
            loader: 'style!css!sass',
            // loaders: ['style', 'css', 'sass'],
        },
        {
            test: /\.html/,
            loader: 'html',
        }
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">module.exports = {
    entry: <span class="hljs-string">'./src'</span>,
    output: {
        path: <span class="hljs-string">'builds'</span>,
        filename: <span class="hljs-string">'[name].js'</span>,
    },
    module: {
        loaders: [
            {
                <span class="hljs-built_in">test</span>: /\.js/,
                loader: <span class="hljs-string">'babel'</span>,
                include: __dirname + <span class="hljs-string">'/src'</span>,
            }
        ],
        {
            <span class="hljs-built_in">test</span>: <span class="hljs-string">'\.scss'</span>,
            loader: <span class="hljs-string">'style!css!sass'</span>,
            // loaders: [<span class="hljs-string">'style'</span>, <span class="hljs-string">'css'</span>, <span class="hljs-string">'sass'</span>],
        },
        {
            <span class="hljs-built_in">test</span>: /\.html/,
            loader: <span class="hljs-string">'html'</span>,
        }
    }
};</code></pre>
<p>loaders已经配置安装好了，我们可以开始写我们的按钮了</p>
<p><em>src/Components/Button.scss</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".button {
    background: tomato;
    color: white;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">.button {
    background: tomato;
    color: white;
}</code></pre>
<p><em>src/Components/Button.html</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;"{{"link"}}"&quot; class=&quot;button&quot;>"{{"text"}}"</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">&lt;a href=<span class="hljs-string">""{{"link"}}""</span> class=<span class="hljs-string">"button"</span>&gt;"{{"text"}}"&lt;/a&gt;</code></pre>
<p><em>src/Components/Button.js</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import $ from 'jquery';
import template from './Button.html';
import Mustache from 'mustache';
import './Button.scss';

export default class Button {
    constructor(link) {
        this.link = link;
    }
    onClick(event) {
        event.preventDefault();
        alert(this.link);
    }
    render(node) {
        const text = $(node).text();

        $(node).html(
            Mustache.render(template, {text})
            );

        $('.button').click(this.onClick.bind(this));
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">import $ from <span class="hljs-string">'jquery'</span>;
import template from <span class="hljs-string">'./Button.html'</span>;
import Mustache from <span class="hljs-string">'mustache'</span>;
import <span class="hljs-string">'./Button.scss'</span>;

<span class="hljs-built_in">export</span> default class Button {
    constructor(link) {
        this.link = link;
    }
    onClick(event) {
        event.preventDefault();
        alert(this.link);
    }
    render(node) {
        const text = $(node).text();

        $(node).html(
            Mustache.render(template, {text})
            );

        $(<span class="hljs-string">'.button'</span>).click(this.onClick.bind(this));
    }
}</code></pre>
<p>你的button.js现在是100%自引用并且在那里都可以被引用， 现在我们只需要将button渲染到我们的页面来</p>
<p><em>src/index.js</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Button from './Components/Button';
Button = Button.default
const button  = new Button('google.com');
button.render('a');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">import Button from <span class="hljs-string">'./Components/Button'</span>;
Button = Button.default
const button  = new Button(<span class="hljs-string">'google.com'</span>);
button.render(<span class="hljs-string">'a'</span>);</code></pre>
<p>运行webpack，刷新页面，你应该可以看到我们丑陋的按钮，并有对应的行为，（这一步有问题，编译成功了，但是无法new一个，提示<strong> _Button2.default is not a constructor</strong> 错误）<br>至此你学会了如何建立loaders以及如何定义应用每一部分的依赖。现在貌似还不不出有什么用处，让我们更加深入到例子中去。</p>
<h3 id="articleHeader6">代码分割</h3>
<p>上面的例子会一直引用button，当然，这并没有什么问题，但我们并不总是一直需要我们的按钮。也许在一些页面没有按钮需要渲染。在这种情况下，我们不想去引入按钮的样式、模板等。这个时候就是代码分割出场的时候了（code spliting）。代码分割便是webpack用来解决之前所说的单集成模块 VS 不可维护的引用的问题。分割点（split points）：你的代码被分割为多个文件并被按需请求加载。语法非常简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import $ from 'jquery';

// This is a split point
require.ensure([], () => {
  // All the code in here, and everything that is imported
  // will be in a separate file
  const library = require('some-big-library');
  $('foo').click(() => library.doSomething());
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">import $ from <span class="hljs-string">'jquery'</span>;

// This is a split point
require.ensure([], () =&gt; {
  // All the code <span class="hljs-keyword">in</span> here, and everything that is imported
  // will be <span class="hljs-keyword">in</span> a separate file
  const library = require(<span class="hljs-string">'some-big-library'</span>);
  $(<span class="hljs-string">'foo'</span>).click(() =&gt; library.doSomething());
});</code></pre>
<p>任何写在require.ensure回调中的东西会被分隔到一个数据块，一个隔离的文件，webpack会在需要的时候，通过ajax请求去加载。这意味着，我们会看到如下面的依赖树：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bundle.js
|- jquery.js
|- index.js // our main file
chunk1.js
|- some-big-libray.js
|- index-chunk.js // the code in the callback" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">bundle.js
|- jquery.js
|- index.js // our main file
chunk1.js
|- some-big-libray.js
|- index-chunk.js // the code <span class="hljs-keyword">in</span> the callback</code></pre>
<p>并且我们不用去引入chunk1.js或者去加载它，webpack已经帮我们做了这些事情。这意味着我们可以通过各种各样的逻辑去分割我们的代码。在接下来的例子中，我们只想在页面有链接的时候去加载我们的button组件</p>
<p><em>src/index.js</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (document.querySelectorAll('a').length) {
    require.ensure([], () => {
        const Button = require('./Components/Button').default;
        const button = new Button('google.com');

        button.render('a');
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-keyword">if</span> (document.querySelectorAll(<span class="hljs-string">'a'</span>).length) {
    require.ensure([], () =&gt; {
        const Button = require(<span class="hljs-string">'./Components/Button'</span>).default;
        const button = new Button(<span class="hljs-string">'google.com'</span>);

        button.render(<span class="hljs-string">'a'</span>);
    });
}</code></pre>
<p>注意当使用require的时候，如果你想要默认的导出时，你需要手动的包裹它（default)。原因在于require无法同时处理default和正常的导出，所以你需要显示申明想要用哪一个。而import则有一个系统来解决这个问题，所以它知道如何处理。（eg. <code>import foo from 'bar'</code> vs <code>import {baz} from 'bar'</code>)</p>
<p>现在webpack的输出信息应该不一样了，让我们运行--display-chunks来看数据块的关系：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack --display-modules --display-chunks
Hash: 43b51e6cec5eb6572608
Version: webpack 1.12.14
Time: 1185ms
      Asset     Size  Chunks             Chunk Names
  bundle.js  3.82 kB       0  [emitted]  main
1.bundle.js   300 kB       1  [emitted]
chunk    {0} bundle.js (main) 235 bytes [rendered]
    [0] ./src/index.js 235 bytes {0} [built]
chunk    {1} 1.bundle.js 290 kB {0} [rendered]
    [1] ./src/Components/Button.js 1.94 kB {1} [built]
    [2] ./~/jquery/dist/jquery.js 259 kB {1} [built]
    [3] ./src/Components/Button.html 72 bytes {1} [built]
    [4] ./~/mustache/mustache.js 19.4 kB {1} [built]
    [5] ./src/Components/Button.scss 1.05 kB {1} [built]
    [6] ./~/css-loader!./~/sass-loader!./src/Components/Button.scss 212 bytes {1} [built]
    [7] ./~/css-loader/lib/css-base.js 1.51 kB {1} [built]
    [8] ./~/style-loader/addStyles.js 7.21 kB {1} [built]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ webpack --display-modules --display-chunks
Hash: 43b51e6cec5eb6572608
Version: webpack 1.12.14
Time: 1185ms
      Asset     Size  Chunks             Chunk Names
  bundle.js  3.82 kB       0  [emitted]  main
1.bundle.js   300 kB       1  [emitted]
chunk    {0} bundle.js (main) 235 bytes [rendered]
    [0] ./src/index.js 235 bytes {0} [built]
chunk    {1} 1.bundle.js 290 kB {0} [rendered]
    [1] ./src/Components/Button.js 1.94 kB {1} [built]
    [2] ./~/jquery/dist/jquery.js 259 kB {1} [built]
    [3] ./src/Components/Button.html 72 bytes {1} [built]
    [4] ./~/mustache/mustache.js 19.4 kB {1} [built]
    [5] ./src/Components/Button.scss 1.05 kB {1} [built]
    [6] ./~/css-loader!./~/sass-loader!./src/Components/Button.scss 212 bytes {1} [built]
    [7] ./~/css-loader/lib/css-base.js 1.51 kB {1} [built]
    [8] ./~/style-loader/addStyles.js 7.21 kB {1} [built]</code></pre>
<p>从输出数据你可以看到，我们的入口文件（bundle.js)现在只包含webpack的逻辑，其他的脚本（jquery、mustache、button）全都在1.bundle.js中，并只有当我们页面中有连接的时候才会加载进来。现在为了让webpack知道到哪里去ajax我们的数据块，我们需要配置下我们的文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="path: 'builds',
filename: 'bundle.js',
publicPath: 'builds/'," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">path: <span class="hljs-string">'builds'</span>,
filename: <span class="hljs-string">'bundle.js'</span>,
publicPath: <span class="hljs-string">'builds/'</span>,</code></pre>
<p>publishPath告诉webpack到哪里去找资源， 至此，我们运行webpack，由于页面有连接，因此webpack加载了button组件。注意： 我们可以对数据块进行命名来替代默认的1.bundle.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (document.querySelectorAll('a').length) {
    require.ensure([], () => {
        const Button = require('./Components/Button').default;
        const button = new Button('google.com');

        button.render('a');
    }, 'button');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-keyword">if</span> (document.querySelectorAll(<span class="hljs-string">'a'</span>).length) {
    require.ensure([], () =&gt; {
        const Button = require(<span class="hljs-string">'./Components/Button'</span>).default;
        const button = new Button(<span class="hljs-string">'google.com'</span>);

        button.render(<span class="hljs-string">'a'</span>);
    }, <span class="hljs-string">'button'</span>);
}</code></pre>
<p>尝试了，发现并没有什么用……是我打开的方式不对么</p>
<h3 id="articleHeader7">添加第二个组件</h3>
<p><em>src/Components/Header.scss</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".header {
  font-size: 3rem;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">.header {
  font-size: 3rem;
}</code></pre>
<p><em>src/Components/Header.html</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<header class=&quot;header&quot;>"{{"text"}}"</header>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">&lt;header class=<span class="hljs-string">"header"</span>&gt;"{{"text"}}"&lt;/header&gt;</code></pre>
<p><em>src/Components/Header.js</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import $ from 'jquery';
import Mustache from 'mustache';
import template from './Header.html';
import './Header.scss';

export default class Header {
    render(node) {
        const text = $(node).text();

        $(node).html(
            Mustache.render(template, {text})
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">import $ from <span class="hljs-string">'jquery'</span>;
import Mustache from <span class="hljs-string">'mustache'</span>;
import template from <span class="hljs-string">'./Header.html'</span>;
import <span class="hljs-string">'./Header.scss'</span>;

<span class="hljs-built_in">export</span> default class Header {
    render(node) {
        const text = $(node).text();

        $(node).html(
            Mustache.render(template, {text})
        );
    }
}</code></pre>
<p>然后在应用中渲染它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// If we have an anchor, render the Button component on it
if (document.querySelectorAll('a').length) {
    require.ensure([], () => {
        const Button = require('./Components/Button').default;
        const button = new Button('google.com');

        button.render('a');
    });
}

// If we have a title, render the Header component on it
if (document.querySelectorAll('h1').length) {
    require.ensure([], () => {
        const Header = require('./Components/Header').default;

        new Header().render('h1');
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">// If we have an anchor, render the Button component on it
<span class="hljs-keyword">if</span> (document.querySelectorAll(<span class="hljs-string">'a'</span>).length) {
    require.ensure([], () =&gt; {
        const Button = require(<span class="hljs-string">'./Components/Button'</span>).default;
        const button = new Button(<span class="hljs-string">'google.com'</span>);

        button.render(<span class="hljs-string">'a'</span>);
    });
}

// If we have a title, render the Header component on it
<span class="hljs-keyword">if</span> (document.querySelectorAll(<span class="hljs-string">'h1'</span>).length) {
    require.ensure([], () =&gt; {
        const Header = require(<span class="hljs-string">'./Components/Header'</span>).default;

        new Header().render(<span class="hljs-string">'h1'</span>);
    });
}</code></pre>
<p>再次运行webpack查看依赖情况，你会发现两个组件都需要jquery、mustache，意味着这些依赖模块被重复定义于我们的数据块中，这并不是我们想要的。默认情况webpack并不对此进行优化。但是webpack可以通过插件的形式提供强力的优化方案。</p>
<p>插件（plugins)和loaders不同，loaders只执行与特定类型的文件，plugins执行于所有的文件并提供更多丰富的功能。webpack拥有大量的插件来处理各种各样的优化。<strong>CommonChunksPlugin</strong>可以用来解决这个问题的插件， 它通过递归分析你的依赖包，找到公用的模块并将它们分离成一个独立的文件中，当然你也可以写入到入口文件中。</p>
<p>在接下来的例子中，我们将公用的模块放到了我们的入口文件中，因为如果所有的页面有引用了jquery和mustache，我们就把它们放到顶端。接下来让我们更新下我们的配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name:      'main', // Move dependencies to our main file
        children:  true, // Look for common dependencies in all children,
        minChunks: 2, // How many times a dependency must come up before being extracted
    })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name:      <span class="hljs-string">'main'</span>, // Move dependencies to our main file
        children:  <span class="hljs-literal">true</span>, // Look <span class="hljs-keyword">for</span> common dependencies <span class="hljs-keyword">in</span> all children,
        minChunks: 2, // How many <span class="hljs-built_in">times</span> a dependency must come up before being extracted
    })
]</code></pre>
<p>如果我们再次运行webpack， 我们可以发现公用的组件已经被提取到了顶部：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chunk    {0} bundle.js (main) 287 kB [rendered]
    [0] ./src/index.js 550 bytes {0} [built]
    [2] ./~/jquery/dist/jquery.js 259 kB {0} [built]
    [4] ./~/mustache/mustache.js 19.4 kB {0} [built]
    [7] ./~/css-loader/lib/css-base.js 1.51 kB {0} [built]
    [8] ./~/style-loader/addStyles.js 7.21 kB {0} [built]
chunk    {1} 1.bundle.js 3.28 kB {0} [rendered]
    [1] ./src/Components/Button.js 1.94 kB {1} [built]
    [3] ./src/Components/Button.html 72 bytes {1} [built]
    [5] ./src/Components/Button.scss 1.05 kB {1} [built]
    [6] ./~/css-loader!./~/sass-loader!./src/Components/Button.scss 212 bytes {1} [built]
chunk    {2} 2.bundle.js 2.92 kB {0} [rendered]
    [9] ./src/Components/Header.js 1.62 kB {2} [built]
   [10] ./src/Components/Header.html 64 bytes {2} [built]
   [11] ./src/Components/Header.scss 1.05 kB {2} [built]
   [12] ./~/css-loader!./~/sass-loader!./src/Components/Header.scss 192 bytes {2} [built]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">chunk    {0} bundle.js (main) 287 kB [rendered]
    [0] ./src/index.js 550 bytes {0} [built]
    [2] ./~/jquery/dist/jquery.js 259 kB {0} [built]
    [4] ./~/mustache/mustache.js 19.4 kB {0} [built]
    [7] ./~/css-loader/lib/css-base.js 1.51 kB {0} [built]
    [8] ./~/style-loader/addStyles.js 7.21 kB {0} [built]
chunk    {1} 1.bundle.js 3.28 kB {0} [rendered]
    [1] ./src/Components/Button.js 1.94 kB {1} [built]
    [3] ./src/Components/Button.html 72 bytes {1} [built]
    [5] ./src/Components/Button.scss 1.05 kB {1} [built]
    [6] ./~/css-loader!./~/sass-loader!./src/Components/Button.scss 212 bytes {1} [built]
chunk    {2} 2.bundle.js 2.92 kB {0} [rendered]
    [9] ./src/Components/Header.js 1.62 kB {2} [built]
   [10] ./src/Components/Header.html 64 bytes {2} [built]
   [11] ./src/Components/Header.scss 1.05 kB {2} [built]
   [12] ./~/css-loader!./~/sass-loader!./src/Components/Header.scss 192 bytes {2} [built]</code></pre>
<p>如果我们将name改为'vender‘：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.CommonsChunkPlugin({
    name:      'verder', // Move dependencies to our main file
    children:  true, // Look for common dependencies in all children,
    minChunks: 2, // How many times a dependency must come up before being extracted
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">new webpack.optimize.CommonsChunkPlugin({
    name:      <span class="hljs-string">'verder'</span>, // Move dependencies to our main file
    children:  <span class="hljs-literal">true</span>, // Look <span class="hljs-keyword">for</span> common dependencies <span class="hljs-keyword">in</span> all children,
    minChunks: 2, // How many <span class="hljs-built_in">times</span> a dependency must come up before being extracted
})</code></pre>
<p>由于该数据块还没有创建出来，webpack会自动创建builds/verder.js的文件，然后供我们在html中引用，这一步笔者试了，发现无法创建vender这个依赖，所有公用依赖也没有被提取出来，不知道是不是windows的问题。</p>
<p>你还可以使得公用模块文件以异步请求的方式加载进来，设置属性async: true便可以了。webpack还有大量的功能强大智能化的插件，我无法一个个介绍它们，但是作为练习，让我们为应用创建一个生产环境</p>
<h3 id="articleHeader8">生产和超越</h3>
<p>首先，我们将添加几个插件到我们的配置中去，但我们只想要在生产环境中去加载并使用这些插件。所以我们要添加逻辑来控制我们的配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack    = require('webpack');
var production = process.env.NODE_ENV === 'production';

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name:      'main', // Move dependencies to our main file
        children:  true, // Look for common dependencies in all children,
        minChunks: 2, // How many times a dependency must come up before being extracted
    }),
];

if (production) {
    plugins = plugins.concat([
       // Production plugins go here
    ]);
}

module.exports = {
    entry:   './src',
    output:  {
        path:       'builds',
        filename:   'bundle.js',
        publicPath: 'builds/',
    },
    plugins: plugins,
    // ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="base"><span class="hljs-keyword">var</span> webpack    = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> production = process.env.NODE_ENV === <span class="hljs-string">'production'</span>;

<span class="hljs-keyword">var</span> plugins = [
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
        <span class="hljs-attr">name</span>:      <span class="hljs-string">'main'</span>, <span class="hljs-comment">// Move dependencies to our main file</span>
        children:  <span class="hljs-literal">true</span>, <span class="hljs-comment">// Look for common dependencies in all children,</span>
        minChunks: <span class="hljs-number">2</span>, <span class="hljs-comment">// How many times a dependency must come up before being extracted</span>
    }),
];

<span class="hljs-keyword">if</span> (production) {
    plugins = plugins.concat([
       <span class="hljs-comment">// Production plugins go here</span>
    ]);
}

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>:   <span class="hljs-string">'./src'</span>,
    <span class="hljs-attr">output</span>:  {
        <span class="hljs-attr">path</span>:       <span class="hljs-string">'builds'</span>,
        <span class="hljs-attr">filename</span>:   <span class="hljs-string">'bundle.js'</span>,
        <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'builds/'</span>,
    },
    <span class="hljs-attr">plugins</span>: plugins,
    <span class="hljs-comment">// ...</span>
};</code></pre>
<p>webpack 有多个设置我们可以在生产环境中关掉：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    debug:   !production,
    devtool: production ? false : 'eval'," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">module.exports = {
    debug:   !production,
    devtool: production ? <span class="hljs-literal">false</span> : <span class="hljs-string">'eval'</span>,</code></pre>
<p>debug意味着不会打包过多的代码以让你在本地调试的时候更加容易，第二个是关于资源映射的方式（sourcemaps generation），webpack有几个方式来渲染sourcemaps，eval是在本地开发中最好的一种，但在生产环境中，我们并不在意这些，所以在生产环境中我们禁止了它。接下来我们可以添加生产环境中用到的插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (production) {
    plugins = plugins.concat([

        // This plugin looks for similar chunks and files
        // and merges them for better caching by the user
        new webpack.optimize.DedupePlugin(),

        // This plugins optimizes chunks and modules by
        // how much they are used in your app
        new webpack.optimize.OccurenceOrderPlugin(),

        // This plugin prevents Webpack from creating chunks
        // that would be too small to be worth loading separately
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200, // ~50kb
        }),

        // This plugin minifies all the Javascript code of the final bundle
        new webpack.optimize.UglifyJsPlugin({
            mangle:   true,
            compress: {
                warnings: false, // Suppress uglification warnings
            },
        }),

        // This plugins defines various variables that we can set to false
        // in production to avoid code related to them from being compiled
        // in our final bundle
        new webpack.DefinePlugin({
            __SERVER__:      !production,
            __DEVELOPMENT__: !production,
            __DEVTOOLS__:    !production,
            'process.env':   {
                BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),

    ]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-keyword">if</span> (production) {
    plugins = plugins.concat([

        // This plugin looks <span class="hljs-keyword">for</span> similar chunks and files
        // and merges them <span class="hljs-keyword">for</span> better caching by the user
        new webpack.optimize.DedupePlugin(),

        // This plugins optimizes chunks and modules by
        // how much they are used <span class="hljs-keyword">in</span> your app
        new webpack.optimize.OccurenceOrderPlugin(),

        // This plugin prevents Webpack from creating chunks
        // that would be too small to be worth loading separately
        new webpack.optimize.M<span class="hljs-keyword">in</span>ChunkSizePlugin({
            minChunkSize: 51200, // ~50kb
        }),

        // This plugin minifies all the Javascript code of the final bundle
        new webpack.optimize.UglifyJsPlugin({
            mangle:   <span class="hljs-literal">true</span>,
            compress: {
                warnings: <span class="hljs-literal">false</span>, // Suppress uglification warnings
            },
        }),

        // This plugins defines various variables that we can <span class="hljs-built_in">set</span> to <span class="hljs-literal">false</span>
        // <span class="hljs-keyword">in</span> production to avoid code related to them from being compiled
        // <span class="hljs-keyword">in</span> our final bundle
        new webpack.DefinePlugin({
            __SERVER__:      !production,
            __DEVELOPMENT__: !production,
            __DEVTOOLS__:    !production,
            <span class="hljs-string">'process.env'</span>:   {
                BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),

    ]);
}</code></pre>
<p>这些我最常使用到的插件，webpack还提供了很多其他的插件供你去协调你的模块和数据块。同时在npm上也有自由开发者开发贡献出来的拥有强大功能的插件。具体可以参考文章最后的链接。</p>
<p>现在你希望你生产环境下的资源能按版本发布。还记得我们为bundle.js设置过的output.filename属性吗？这里有几个变量供你使用，一个是[hash], 和最终生成的bundle.js内容的哈希值保持一致。我们也想我们的数据块（chunks)也版本话，我们将设置output.chunkFilename属性来实现同样的功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
    path:          'builds',
    filename:      production ? '[name]-[hash].js' : 'bundle.js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath:    'builds/',
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">output: {
    path:          <span class="hljs-string">'builds'</span>,
    filename:      production ? <span class="hljs-string">'[name]-[hash].js'</span> : <span class="hljs-string">'bundle.js'</span>,
    chunkFilename: <span class="hljs-string">'[name]-[chunkhash].js'</span>,
    publicPath:    <span class="hljs-string">'builds/'</span>,
},</code></pre>
<p>在我们这个简单的应用中并没有一个方法来动态检索编译后文件的名字啊，我们将只在生产环境中使用版本化的资源。同时我们想在生产环境中清空我们的打包环境，让我们添加一个三方插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev clean-webpack-plugin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install --save-dev clean-webpack-plugin</code></pre>
<p>将这个插件配置到webpack中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack     = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');

// ...

if (production) {
    plugins = plugins.concat([

        // Cleanup the builds/ folder before
        // compiling our final assets
        new CleanPlugin('builds')," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">var webpack     = require(<span class="hljs-string">'webpack'</span>);
var CleanPlugin = require(<span class="hljs-string">'clean-webpack-plugin'</span>);

// ...

<span class="hljs-keyword">if</span> (production) {
    plugins = plugins.concat([

        // Cleanup the builds/ folder before
        // compiling our final assets
        new CleanPlugin(<span class="hljs-string">'builds'</span>),</code></pre>
<p>好了，我们已经做了一些优化的方案，让我们来比较下结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack
                bundle.js   314 kB       0  [emitted]  main
1-21660ec268fe9de7776c.js  4.46 kB       1  [emitted]
2-fcc95abf34773e79afda.js  4.15 kB       2  [emitted]
$ NODE_ENV=production webpack
main-937cc23ccbf192c9edd6.js  97.2 kB       0  [emitted]  main" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ webpack
                bundle.js   314 kB       0  [emitted]  main
1-21660ec268fe9de7776c.js  4.46 kB       1  [emitted]
2-fcc95abf34773e79afda.js  4.15 kB       2  [emitted]
$ NODE_ENV=production webpack
main-937cc23ccbf192c9edd6.js  97.2 kB       0  [emitted]  main</code></pre>
<p>所以webpack到底做了什么：一开始，由于我们的例子非常的简单轻量级，我们的两个异步数据块不值得使用两个异步请求去获取，所以webpack将它们合并回了入口文件中；其次，所有的文件都被合理地压缩了。我们从原本的3个请求总大小为322kb变成了一个97kb大小的文件。</p>
<blockquote><p>But wasn’t the point of Webpack to stem away for one big ass JS file?<br>但是webpack不是不提倡合并成一个文件吗？</p></blockquote>
<p>是的，它的确不提倡，当时如果我们的app很小，代码量很少，它是提倡这样做的。但请考虑如下情况，你不需要去考虑什么时候什么地方做什么合并。如果你的数据块突然间依赖了很多模块，那么webpack会让它变成异步加载而不是合并到入口文件中， 同时如果这些模块的依赖有公用的，那么这些模块也会被抽离出来等等。你只需要设立好规则，然后，webpack变回自动提供最好的优化方案。不用手册，不用思考模块依赖的顺序，所有的东西都自动化了。</p>
<p>你可能发现我并没有设置任何东西去压缩我们的HTML和CSS，这是因为CSS-loader和html-loader已经默认完成了这些事情。</p>
<p>因为webpack是本身就是一个JS-loader，因此在webpack中没有js-loader，这也是uglify是一个独立引进来的插件的原因。</p>
<h3 id="articleHeader9">信息抽取</h3>
<p>现在你可能发现，一开始我们顶一个的样式被分开几段插入到页面从而导致了FOUAP（Flash of Ugly Ass Page），如果我们可以把所有的样式都合并到一个文件中不是更好吗？是的，我们可以使用另一个插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install extract-text-webpack-plugin --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm install extract-text-webpack-plugin --save-dev</code></pre>
<p>这个组件做了我刚才说的事情，它收集了你最后的bundle后内容里所有的样式，并将它们合成到一个文件中。</p>
<p>让我们把它引入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack    = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var production = process.env.NODE_ENV === 'production';

var plugins = [
    new ExtractPlugin('bundle.css'), // <=== where should content be piped
    new webpack.optimize.CommonsChunkPlugin({
        name:      'main', // Move dependencies to our main file
        children:  true, // Look for common dependencies in all children,
        minChunks: 2, // How many times a dependency must come up before being extracted
    }),
];

// ...

module.exports = {
    // ...
    plugins: plugins,
    module:  {
        loaders: [
            {
                test:   /\.scss/,
                loader: ExtractPlugin.extract('style', 'css!sass'),
            },
            // ...
        ],
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">var webpack    = require(<span class="hljs-string">'webpack'</span>);
var CleanPlugin = require(<span class="hljs-string">'clean-webpack-plugin'</span>);
var ExtractPlugin = require(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
var production = process.env.NODE_ENV === <span class="hljs-string">'production'</span>;

var plugins = [
    new ExtractPlugin(<span class="hljs-string">'bundle.css'</span>), // &lt;=== <span class="hljs-built_in">where</span> should content be piped
    new webpack.optimize.CommonsChunkPlugin({
        name:      <span class="hljs-string">'main'</span>, // Move dependencies to our main file
        children:  <span class="hljs-literal">true</span>, // Look <span class="hljs-keyword">for</span> common dependencies <span class="hljs-keyword">in</span> all children,
        minChunks: 2, // How many <span class="hljs-built_in">times</span> a dependency must come up before being extracted
    }),
];

// ...

module.exports = {
    // ...
    plugins: plugins,
    module:  {
        loaders: [
            {
                <span class="hljs-built_in">test</span>:   /\.scss/,
                loader: ExtractPlugin.extract(<span class="hljs-string">'style'</span>, <span class="hljs-string">'css!sass'</span>),
            },
            // ...
        ],
    }
};</code></pre>
<blockquote><p>Now the extract method takes two arguments: first is what to do with the extracted contents when we’re in a chunk ('style'), second is what to do when we’re in a main file ('css!sass'). Now if we’re in a chunk, we can’t just magically append our CSS to the generated one so we use the style loader here as before, but for all the styles that are found in the main file, pipe them to a builds/bundle.css file. Let’s test it out, let’s add a small main stylesheet for our application:</p></blockquote>
<p>（这一段翻译得不好，请看上面的原文）</p>
<p>现在可以看到 <strong>extract</strong> 方法传入了两个参数： 第一个是当我们在<strong>style</strong>数据块中我们要对引出的内容做什么；第二是当我们在入口文件<strong>css!sass</strong>中要做的事情。如果我们在一个数据块中，我们不能简单地把我们的CSS添加到我们的css文件中，所以我们在此之前使用<strong>style</strong>加载器，但对于在入口函数找到的所有样式，我们将它们传递到builds/bundle.css文件中。让我们为应用添加一个主样式表。</p>
<p><strong>问题</strong>：这里遇到一个问题，每次修改主样式表（styles.scss)后，如果是有监听的话，webpack的自动重编译是会出错的，需要重新保存一次脚本才能让其正确编译成功，不知道是什么问题导致的。</p>
<p><em>src/styles.scss</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  font-family: sans-serif; 
  background: darken(white, 0.2);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">font-family</span>: sans-serif; 
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">darken</span>(white, 0.2);
}</code></pre>
<p><em>src/index.js</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import './styles.scss';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-meta"><span class="hljs-meta-keyword">import</span> './styles.scss';</span></code></pre>
<p>如果你想导出所有的样式，你也可以向ExtractTextPlugin传参（’bundle.css', {allChunks: true})。如果你想在你的文件名中使用变量，你也可以传入 [name]-[hash].css。</p>
<p>图片处理</p>
<p>脚本处理已经基本可以，但是我们还没有处理如图片、字体等资源。在webpack中要怎么处理这些资源并得到最好的优化？接下来让我们下载一张图片并让它作为我们的背景，因为我觉得它很酷：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008753573" src="https://static.alili.tech/img/remote/1460000008753573" alt="" title="" style="cursor: pointer;"></span></p>
<p>将这张图片保存在<strong>img/puppy.png&amp;</strong> 并更新我们的sass文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    font-family: sans-serif;
    background-color: #333;
    background-image: url('../img/puppy.jpg');
    background-size: cover;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">font-family</span>: sans-serif;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'../img/puppy.jpg'</span>);
    <span class="hljs-attribute">background-size</span>: cover;
}</code></pre>
<p>如果你这样做的话，webpack会和你说：“我tmd要我怎么处理jpg这东西？”，因为我们没有一个Loader用来处理它。有两个自带的加载器可以用来处理这些资源，一个是file-loader，另一个是url-loader，第一个不会做什么改变，只会返回一个url，并可以版本化设置，第二个可以将资源转化为base64的url</p>
<p>这两个加载器各有优缺点：如果你的背景图片是2mb大的图片，你不会想将它作为base64引入到样式表中而更加倾向于单独去加载它。如果它只是一个2kb的图片，那么则引入它从而减少http请求次数会更好：</p>
<p>所以我们把这两个加载器都安装上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save-dev url-loader file-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code style="word-break: break-word; white-space: initial;">$ npm install --<span class="hljs-keyword">save</span>-dev url-loader <span class="hljs-keyword">file</span>-loader</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.(png|gif|jpe?g|svg)$/i,
    loader: 'url?limit=10000',
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">{
    <span class="hljs-built_in">test</span>: /\.(png|gif|jpe?g|svg)$/i,
    loader: <span class="hljs-string">'url?limit=10000'</span>,
},</code></pre>
<p>我们在这里向url-loader传递了限制类的参数，告诉它：如果资源文件小于10kb则引入，否则，使用file-loader去处理它。语法使用的是查询字符串，你也可以使用对象去配置加载器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.(png|gif|jpe?g|svg)$/i,
    // loader: 'url?limit=10000',
    loader: 'url',
    query: {
        limit: 10000,
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">{
    <span class="hljs-built_in">test</span>: /\.(png|gif|jpe?g|svg)$/i,
    // loader: <span class="hljs-string">'url?limit=10000'</span>,
    loader: <span class="hljs-string">'url'</span>,
    query: {
        <span class="hljs-built_in">limit</span>: 10000,
    }
},</code></pre>
<p>好了，让我们来试试看</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                bundle.js   15 kB       0  [emitted]  main
1-b8256867498f4be01fd7.js  317 kB       1  [emitted]
2-e1bc215a6b91d55a09aa.js  317 kB       2  [emitted]
               bundle.css  2.9 kB       0  [emitted]  main" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">                bundle.js   15 kB       0  [emitted]  main
1-b8256867498f4be01fd7.js  317 kB       1  [emitted]
2<span class="hljs-_">-e</span>1bc215a6b91d55a09aa.js  317 kB       2  [emitted]
               bundle.css  2.9 kB       0  [emitted]  main</code></pre>
<p>我们可以看到并没有提到jpg文件，因为我们的puppy图片太小了，它被直接引入到bundle.css文件中了。</p>
<p>webpack会智能地根据大小或者http请求来优化资源文件。还有很多加载器可以更好地处理，最常用的一个是<a href="https://github.com/tcoopman/image-webpack-loader" rel="nofollow noreferrer" target="_blank">image-loader</a>，可以在合并的时候对图片进行压缩，甚至可以设置?bypassOnDebug让你只在生产环境中使用。像这样的插件还有很多，我鼓励你在文章的末尾去看看这些插件。</p>
<h3 id="articleHeader10">实时监听编译</h3>
<p>我们的生产环境已经搭建好了，接下来就是实时重载：LiveReload、BrowserSync，这可能是你想要的。但是刷新整个页面很消耗性能，让我们使用更吊的装备<strong>hot module replacement</strong>或者叫做<strong>hot reload</strong>。由于webpack知道我们依赖树的每一个模块的位置，修改的时候就可以很简单地替换树上的某一块文件。更清晰地说，当你修改文件的时候，浏览器不用刷新整个页面就可以看到实时变化。</p>
<p>要使用HMR，我们需要一个支持hot assets的服务器。Webpack有一个dev-server供我们使用，安装下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install webpack-dev-server --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">$ npm install webpack-<span class="hljs-built_in">dev</span>-server --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>然后运行该服务器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server --inline --hot" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">$</span> <span class="hljs-comment">webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">inline</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">hot</span></code></pre>
<p>第一个参数告诉webpack将HMR逻辑引入到页面中（而不使用一个iframe去包含页面），第二个参数是启动HMR（hot module reload）。现在让我们访问web-server的地址：<a href="http://localhost:8080/webpack-dev-server/" rel="nofollow noreferrer" target="_blank">http://localhost:8080/webpack-dev-server/</a> 。尝试改变文件，会看到浏览器上实时的变化</p>
<p>你可以使用这个插件作为你的本地服务器。如果你计划一直使用它来做HMR，你可以将其配置到webpack中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
    path:          'builds',
    filename:      production ? '[name]-[hash].js' : 'bundle.js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath:    'builds/',
},
devServer: {
    hot: true,
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">output: {
    path:          <span class="hljs-string">'builds'</span>,
    filename:      production ? <span class="hljs-string">'[name]-[hash].js'</span> : <span class="hljs-string">'bundle.js'</span>,
    chunkFilename: <span class="hljs-string">'[name]-[chunkhash].js'</span>,
    publicPath:    <span class="hljs-string">'builds/'</span>,
},
devServer: {
    hot: <span class="hljs-literal">true</span>,
},</code></pre>
<p>配置后，无论我们什么时候运行ewbpack-dev-server，它都会在HMR模式。当然，还有很多配置供你配置，例如提供一个中间件供你在express服务器中使用HMR模式。</p>
<h3 id="articleHeader11">规范的代码</h3>
<p>如果你一直跟着本文实践，你肯定发现了奇怪的地方：为什么Loaders被放在了Module.loaders中，而plugins却没有？这当然是因为还有其他东西你可以放在module中！Webpack不仅有loaders，它也有pre-loaders和post-loaders：它们会在主加载器加载前/加载后执行。来个例子，很明显我的代码非常糟糕，所以在转化前我们使用eslint来检测我们的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install eslint eslint-loader babel-eslint --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install </span>eslint eslint-loader <span class="hljs-keyword">babel-eslint </span>--save-dev</code></pre>
<p>创建一个小型的eslintrc文件：</p>
<p><em>.eslintrc</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parser: 'babel-eslint'
rules: 
  quotes: 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">parser</span>: <span class="hljs-string">'babel-eslint'</span>
<span class="hljs-attribute">rules</span>: 
  <span class="hljs-attribute">quotes</span>: <span class="hljs-number">2</span></code></pre>
<p>现在我们添加我们的preloader，我们使用和之前一样的语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        preLoaders: [
            {
                test: /\.js/,
                loader: 'eslint',
            }
        ]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">        preLoaders: [
            {
                <span class="hljs-built_in">test</span>: /\.js/,
                loader: <span class="hljs-string">'eslint'</span>,
            }
        ],</code></pre>
<p>然后运行webpack，当然，它会报错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack
Hash: 33cc307122f0a9608812
Version: webpack 1.12.2
Time: 1307ms
                    Asset      Size  Chunks             Chunk Names
                bundle.js    305 kB       0  [emitted]  main
1-551ae2634fda70fd8502.js    4.5 kB       1  [emitted]
2-999713ac2cd9c7cf079b.js   4.17 kB       2  [emitted]
               bundle.css  59 bytes       0  [emitted]  main
    + 15 hidden modules

ERROR in ./src/index.js

/Users/anahkiasen/Sites/webpack/src/index.js
   1:8   error  Strings must use doublequote  quotes
   4:31  error  Strings must use doublequote  quotes
   6:32  error  Strings must use doublequote  quotes
   7:35  error  Strings must use doublequote  quotes
   9:23  error  Strings must use doublequote  quotes
  14:31  error  Strings must use doublequote  quotes
  16:32  error  Strings must use doublequote  quotes
  18:29  error  Strings must use doublequote  quotes" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ webpack
Hash: 33cc307122f0a9608812
Version: webpack 1.12.2
Time: 1307ms
                    Asset      Size  Chunks             Chunk Names
                bundle.js    305 kB       0  [emitted]  main
1-551ae2634fda70fd8502.js    4.5 kB       1  [emitted]
2-999713ac2<span class="hljs-built_in">cd</span>9c7cf079b.js   4.17 kB       2  [emitted]
               bundle.css  59 bytes       0  [emitted]  main
    + 15 hidden modules

ERROR <span class="hljs-keyword">in</span> ./src/index.js

/Users/anahkiasen/Sites/webpack/src/index.js
   1:8   error  Strings must use doublequote  quotes
   4:31  error  Strings must use doublequote  quotes
   6:32  error  Strings must use doublequote  quotes
   7:35  error  Strings must use doublequote  quotes
   9:23  error  Strings must use doublequote  quotes
  14:31  error  Strings must use doublequote  quotes
  16:32  error  Strings must use doublequote  quotes
  18:29  error  Strings must use doublequote  quotes</code></pre>
<p>在举另一个例子，现在我们的组件都会引入同样名字的样式表以及模板。让我们使用一个预加载器来自动加载：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install baggage-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install </span><span class="hljs-keyword">baggage-loader </span>--save-dev</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.js/,
    loader: 'baggage?[file].html=template&amp;[file].scss',
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">{
    <span class="hljs-built_in">test</span>: /\.js/,
    loader: <span class="hljs-string">'baggage?[file].html=template&amp;[file].scss'</span>,
}</code></pre>
<p>这告诉webpack，如果你定义了一个同样名字的html文件，会把它以template的名字引入，同样的也会引入同名的sass文件。现在我们可以修改我们的组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import $ from 'jquery'
import Mustache from 'mustache'
// import template from './Header.html'
// import './Header.scss'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">import $ from <span class="hljs-string">'jquery'</span>
import Mustache from <span class="hljs-string">'mustache'</span>
// import template from <span class="hljs-string">'./Header.html'</span>
// import <span class="hljs-string">'./Header.scss'</span></code></pre>
<p>pre-loader的功能强大，post-loader也一样，你也可以从文章末尾看到很多有用的加载器并使用它们。</p>
<h3 id="articleHeader12">你还想了解更多吗？</h3>
<p>现在我们的应用还很小，但随着应用的增大，了解正式的依赖树情况是很有用的。可以帮助我们了解我们做的是否正确，我们的应用的瓶颈在哪里。webpack知道所有这些事情，但我们需要告诉他显示给我们看，我们可以到处一个profile文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack --profile --json > stats.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">webpack --profile --json &gt; stats.json</code></pre>
<p>第一个参数告诉webpack生成一个profile 文件，第一个指定生成的格式。有多个站点提供分析并可视化这些文件的功能，webpack官方也提供解析这些信息的功能。所以你可以到<a href="http://webpack.github.io/analyse/" rel="nofollow noreferrer" target="_blank">webpack analysis</a>引入你的文件。选择modules 标签然后便可以看到你的可视化依赖树。另一个我比较喜欢的是<a href="http://chrisbateman.github.io/webpack-visualizer/" rel="nofollow noreferrer" target="_blank">webpack visualizer</a><br>用圆环图的形式表示你的包大小占据情况。</p>
<h3 id="articleHeader13">That's all folks</h3>
<p>我知道在我的案例中，Webpack已经完全取代了Grunt或者gulp了，大部分功能已经由webpack来渠道，剩下的值通过npm script。过去使用Aglio转化我们的API文档为html我们使用的是任务型，现在可以这样做：</p>
<p><em>package.json</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;webpack&quot;,
    &quot;build:api&quot;: &quot;aglio -i docs/api/index.apib -o docs/api/index.html&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">{
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack"</span>,
    <span class="hljs-string">"build:api"</span>: <span class="hljs-string">"aglio -i docs/api/index.apib -o docs/api/index.html"</span>
  }
}</code></pre>
<p>无论你在gulp中有多么复杂不关乎打包的任务，Webpack都可以很好地配合。提供一个在Gulp中集成webpack的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gulp = require('gulp');
var gutil = require('gutil');
var webpack = require('webpack');
var config = require('./webpack.config');

gulp.task('default', function(callback) {
  webpack(config, function(error, stats) {
    if (error) throw new gutil.PluginError('webpack', error);
    gutil.log('[webpack]', stats.toString());

    callback();
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">var gulp = require(<span class="hljs-string">'gulp'</span>);
var gutil = require(<span class="hljs-string">'gutil'</span>);
var webpack = require(<span class="hljs-string">'webpack'</span>);
var config = require(<span class="hljs-string">'./webpack.config'</span>);

gulp.task(<span class="hljs-string">'default'</span>, <span class="hljs-keyword">function</span>(callback) {
  webpack(config, <span class="hljs-keyword">function</span>(error, stats) {
    <span class="hljs-keyword">if</span> (error) throw new gutil.PluginError(<span class="hljs-string">'webpack'</span>, error);
    gutil.log(<span class="hljs-string">'[webpack]'</span>, stats.toString());

    callback();
  });
});</code></pre>
<p>webpack也有Node API，所以在其他构建系统中可以很容易地被使用和包容。</p>
<p>以上我只讲述了webpack的冰山一角，也许你认为我们已经通过这篇文章了解了很多，但是我们只讲述了写皮毛： multiple entry points、prefetching、context replacement等等。Webpack是一个强大的工具，当然代价是更多的配置需要你去写。不过一旦你知道如何驯服它，它会给你最好的优化方案。我在几个项目中使用了它，它也提供了强大的优化方案和自动化，让我无法不用它。</p>
<h2 id="articleHeader14">资源</h2>
<ul>
<li><p><a href="https://webpack.github.io/" rel="nofollow noreferrer" target="_blank">Webpack documentation</a></p></li>
<li><p><a href="http://webpack.github.io/docs/list-of-loaders.html" rel="nofollow noreferrer" target="_blank">List of loaders</a></p></li>
<li><p><a href="http://webpack.github.io/docs/list-of-plugins.html" rel="nofollow noreferrer" target="_blank">List of plugins</a></p></li>
<li><p><a href="https://github.com/madewithlove/webpack-article/commits/master" rel="nofollow noreferrer" target="_blank">Sources for this article</a></p></li>
<li><p><a href="https://github.com/madewithlove/webpack-config" rel="nofollow noreferrer" target="_blank">Our Webpack configuration package</a></p></li>
</ul>
<p>译者拓展链接：</p>
<ul><li><p><a href="http://npm.taobao.org/package/style-loader" rel="nofollow noreferrer" target="_blank">style-loader文档</a></p></li></ul>
<h2 id="articleHeader15">备注</h2>
<p>开发过程遇到的问题可以查看原文下的评论或和译者交流学习。</p>
<p>译者英文水平有限，如果哪里翻译的不好欢迎指正，相关的代码可参考译者的<a href="https://github.com/chenjsh36/webpackdemos/tree/master/demo2" rel="nofollow noreferrer" target="_blank">demo2</a>和<a href="https://github.com/chenjsh36/webpackdemos/tree/master/demo6" rel="nofollow noreferrer" target="_blank">demo6</a>，<a href="https://github.com/chenjsh36/webpackdemos/tree/master/demo4" rel="nofollow noreferrer" target="_blank">demo4</a>是使用Webpack + Vue写的DEMO，有兴趣的同学也可以看看。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] Webpack 前端构建集成方案

## 原文链接
[https://segmentfault.com/a/1190000005659878](https://segmentfault.com/a/1190000005659878)


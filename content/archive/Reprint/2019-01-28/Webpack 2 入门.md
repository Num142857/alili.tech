---
title: 'Webpack 2 入门' 
date: 2019-01-28 2:30:09
hidden: true
slug: msx73unnlto
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#webpack2-入门"></a>Webpack 2 入门</h1>
<p>Webpack 2 <a href="https://github.com/webpack/webpack/issues/1545#issuecomment-255446425">一旦文档完成</a>，就将结束 Beta 测试期。不过这并不意味着你现在不能开始使用第 2 版，前提是你知道怎么配置它。</p>
<h3><a href="#webpack-是什么"></a>Webpack 是什么</h3>
<p>简单来说，Webpack 是一个 JavaScript 模块打包器。然而，自从它发布以来，它发展成为了你所有的前端代码的管理工具（或许是有意的，或许是社区的意愿）。</p>
<p><a href="https://camo.githubusercontent.com/c5a705703c737acdee08b84e1e9241bea8de6fb8/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a7942743272466a324462636b466c694745304c4579672e706e67"><img src="https://p1.ssl.qhimg.com/t01bee0089f8424fded.png" alt=""></a></p>
<p><em>老式的任务运行器的方式：你的标记、样式和 JavaScript 是分离的。你必须分别管理它们每一个，并且你需要确保每一样都达到产品级</em></p>
<p>任务运行器（task runner），例如 Gulp，可以处理许多不同的预处理器（preprocesser）和转换器（transpiler），但是在所有的情景下，它都需要一个输入源并将其压缩到一个编译好的输出文件中。然而，它是在每个部分的基础上这样做的，而没有考虑到整个系统。这就造成了开发者的负担：找到任务运行器所不能处理的地方，并找到适当的方式将所有这些模块在生产环境中联合在一起。</p>
<p>Webpack 试图通过提出一个大胆的想法来减轻开发者的负担：如果有一部分开发过程可以自动处理依赖关系会怎样？如果我们可以简单地写代码，让构建过程最终只根据需求管理自己会怎样？</p>
<p><a href="https://camo.githubusercontent.com/16d39d346d31315fe72887338f9b7bc471b31b8a/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a544f46666f483063585463384733595f46366a334a672e706e67"><img src="https://p0.ssl.qhimg.com/t01364d765ae4a82a77.png" alt=""></a></p>
<p><em>Webpack 的方式：如果 Webpack 了解依赖关系，它会仅捆绑我们在生产环境中实际需要的部分</em></p>
<p>如果你过去几年一直参与 web 社区，你已经知道解决问题的首选方法：使用 JavaScript 来构建。而且 Webpack 尝试通过 JavaScript 传递依赖关系使得构建过程更加容易。不过这个设计真正的亮点不是简化代码管理部分，而是管理层由 100% 有效的 JavaScript 实现（具有 Nodejs 特性）。Webpack 能够让你编写有效的 JavaScript，更好更全面地了解系统。</p>
<p>换句话来说：你不需要为 Webpack 写代码。你只需要写项目代码。而且 Webpack 就会持续工作（当然需要一些配置）。</p>
<p>简而言之，如果你曾经遇到过以下任何一种情况：</p>
<ul>
<li>载入有问题的依赖项</li>
<li>意外引入一些你不需要在生产中用上的 CSS 样式表和 JS 库，使项目膨胀</li>
<li>意外的两次载入（或三次）库</li>
<li>遇到作用域的问题 —— CSS 和 JavaScript 都会有</li>
<li>寻找一个让你在 JavaScript 中使用 Node/Bower 模块的构建系统，要么就得依靠一个令人发狂的后端配置才能正确地使用这些模块</li>
<li>需要优化资产（asset）交付，但你担心会弄坏一些东西</li>
</ul>
<p>等等……</p>
<p>那么你可以从 Webpack 中收益了。它通过让 JavaScript 轻松处理你的依赖关系和加载顺序，而不是通过开发者的大脑。最好的部分是，Webpack 甚至可以纯粹在服务器端运行，这意味着你还可以使用 Webpack 构建<a href="https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/">渐进增强式</a>网站。</p>
<h3><a href="#第一步"></a>第一步</h3>
<p>我们将在本教程中使用 <a href="https://yarnpkg.com/">Yarn</a>（运行命令 <code>brew install yarn</code>） 代替 <code>npm</code>，不过这完全取决于你的喜好，它们做同样的事情。在我们的项目文件夹中，我们将在终端窗口中运行以下代码，将 Webpack 2 添加到我们的全局软件包以及本地项目中：</p>
<pre><code class="hljs lsl">yarn global add webpack@<span class="hljs-number">2.1</span><span class="hljs-number">.0</span>-beta<span class="hljs-number">.25</span> webpack-dev-server@<span class="hljs-number">2.1</span><span class="hljs-number">.0</span>-beta<span class="hljs-number">.9</span>
yarn add --dev webpack@<span class="hljs-number">2.1</span><span class="hljs-number">.0</span>-beta<span class="hljs-number">.25</span> webpack-dev-server@<span class="hljs-number">2.1</span><span class="hljs-number">.0</span>-beta<span class="hljs-number">.9</span>

</code></pre><p>我们接着会通过项目根目录的一个 <code>webpack.config.js</code> 文件来声明 webpack 的配置：</p>
<pre><code class="hljs javascript"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">context</span>: __dirname + <span class="hljs-string">'/src'</span>,
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">'./app.js'</span>,
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">'/dist'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].bundle.js'</span>,
  },
};

</code></pre><p>注意：此处 <code>__dirname</code> 是指你的项目根目录</p>
<p>记住，Webpack “知道”你的项目发生了什么。它通过阅读你的代码来实现（别担心，它签署了保密协议 :D ）。Webpack 基本上执行以下操作：</p>
<ol>
<li>从 <code>context</code> 文件夹开始……</li>
<li>……它查找 <code>entry</code> 下的文件名……</li>
<li>……并读取其内容。每一个 <code>import</code>（<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import">ES6</a>）或 <code>require()</code>（Nodejs）的依赖会在它解析代码的时候找到，它会在最终构建的时候打包这些依赖项。然后，它会搜索那些依赖项以及那些依赖项所依赖的依赖项，直到它到达“树”的最底端 —— 只打包它所需要的，没有其它东西。</li>
<li>Webpack 从 <code>context</code> 文件夹打包所有东西到 <code>output.path</code> 文件夹，使用 <code>output.filename</code> 命名模板来为其命名（其中 <code>[name]</code> 被替换成来自 <code>entry</code> 的对象的键）。</li>
</ol>
<p>所以如果我们的 <code>src/app.js</code> 文件看起来像这样（假设我们事先运行了 <code>yarn add --dev moment</code>）：</p>
<pre><code class="hljs javascript"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">import</span> moment <span class="hljs-keyword">from</span> <span class="hljs-string">'moment'</span>;
<span class="hljs-keyword">var</span> rightNow = moment().format(<span class="hljs-string">'MMMM Do YYYY, h:mm:ss a'</span>);
<span class="hljs-built_in">console</span>.log( rightNow );

<span class="hljs-comment">// "October 23rd 2016, 9:30:24 pm"</span>

</code></pre><p>我们应该运行：</p>
<pre><code class="hljs stylus">webpack -<span class="hljs-selector-tag">p</span>

</code></pre><p>注意：<code>p</code> 标志表示“生产”模式，这会压缩输出文件。</p>
<p>它会输出一个 <code>dist/app.bundle.js</code>，并将当前日期和时间打印到控制台。要注意 Webpack 会自动识别 上面的 <code>'moment'</code> 指代的是什么（比如说，虽然如果你有一个 <code>moment.js</code> 文件在你的目录，默认情况下 Webpack 会优先考虑你的 <code>moment</code> Node 模块）。</p>
<h3><a href="#使用多个文件"></a>使用多个文件</h3>
<p>你可以通过仅仅修改 <code>entry</code> 对象来指定任意数量的入口（entry）/输出点（output）。</p>
<h4><a href="#打包多个文件"></a>打包多个文件</h4>
<pre><code class="hljs javascript"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">context</span>: __dirname + <span class="hljs-string">"/src"</span>,
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: [<span class="hljs-string">"./home.js"</span>, <span class="hljs-string">"./events.js"</span>, <span class="hljs-string">"./vendor.js"</span>],
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">"/dist"</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">"[name].bundle.js"</span>,
  },
};

</code></pre><p>所有文件都会按照数组的顺序一起被打包成一个 <code>dist/app.bundle.js</code> 文件。</p>
<h4><a href="#输出多个文件"></a>输出多个文件</h4>
<pre><code class="hljs dts">const webpack = require(<span class="hljs-string">"webpack"</span>);

module.exports = {
<span class="hljs-symbol">  context:</span> __dirname + <span class="hljs-string">"/src"</span>,
<span class="hljs-symbol">  entry:</span> {
<span class="hljs-symbol">    home:</span> <span class="hljs-string">"./home.js"</span>,
<span class="hljs-symbol">    events:</span> <span class="hljs-string">"./events.js"</span>,
<span class="hljs-symbol">    contact:</span> <span class="hljs-string">"./contact.js"</span>,
  },
<span class="hljs-symbol">  output:</span> {
<span class="hljs-symbol">    path:</span> __dirname + <span class="hljs-string">"/dist"</span>,
<span class="hljs-symbol">    filename:</span> <span class="hljs-string">"[name].bundle.js"</span>,
  },
};

</code></pre><p>或者，你可以选择打包成多个 JS 文件以便于分割应用的某些模块。这将被打包成 3 个文件：<code>dist/home.bundle.js</code>，<code>dist/events.bundle.js</code> 和 <code>dist/contact.bundle.js</code>。</p>
<h4><a href="#高级打包自动化"></a>高级打包自动化</h4>
<p>如果你将你的应用分割成多个 <code>output</code> 输出项（如果你的应用的一部分有大量你不需要预加载的 JS，这会很有用），你可能会重用这些文件的代码，因为它将分别解析每个依赖关系。幸运的是，Webpack 有一个内置的 <code>CommonsChunk</code> 插件来处理这个：</p>
<pre><code class="hljs dts">module.exports = {
  <span class="hljs-comment">// …</span>
<span class="hljs-symbol">
  plugins:</span> [
    new webpack.optimize.CommonsChunkPlugin({
<span class="hljs-symbol">      name:</span> <span class="hljs-string">"commons"</span>,
<span class="hljs-symbol">      filename:</span> <span class="hljs-string">"commons.bundle.js"</span>,
<span class="hljs-symbol">      minChunks:</span> <span class="hljs-number">2</span>,
    }),
  ],

  <span class="hljs-comment">// …</span>
};

</code></pre><p>现在，在你的 <code>output</code> 文件中，如果你有任何模块被加载 2 次以上（通过 <code>minChunks</code> 设置），它会把那个模块打包到 <code>common.js</code> 文件中，然后你可以将其缓存在客户端。这将生成一个额外的请求头，但是你防止了客户端多次下载同一个库。因此，在很多情景下，这会大大提升速度。</p>
<h3><a href="#开发"></a>开发</h3>
<p>Webpack 实际上有自己的开发服务器，所以无论你是开发一个静态网站还是只是你的网站前端原型，它都是无可挑剔的。要运行那个服务器，只需要添加一个 <code>devServer</code> 对象到 <code>webpack.config.js</code>：</p>
<pre><code class="hljs dts">module.exports = {
<span class="hljs-symbol">  context:</span> __dirname + <span class="hljs-string">"/src"</span>,
<span class="hljs-symbol">  entry:</span> {
<span class="hljs-symbol">    app:</span> <span class="hljs-string">"./app.js"</span>,
  },
<span class="hljs-symbol">  output:</span> {
<span class="hljs-symbol">    filename:</span> <span class="hljs-string">"[name].bundle.js"</span>,
<span class="hljs-symbol">    path:</span> __dirname + <span class="hljs-string">"/dist/assets"</span>,
<span class="hljs-symbol">    publicPath:</span> <span class="hljs-string">"/assets"</span>,            <span class="hljs-comment">// New</span>
  },
<span class="hljs-symbol">  devServer:</span> {
<span class="hljs-symbol">    contentBase:</span> __dirname + <span class="hljs-string">"/src"</span>,  <span class="hljs-comment">// New</span>
  },
};

</code></pre><p>现在创建一个包含以下代码的 <code>src/index.html</code> 文件：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/assets/app.bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre><p>……在你的终端中运行：</p>
<pre><code class="hljs axapta">webpack-dev-<span class="hljs-keyword">server</span>

</code></pre><p>你的服务器现在运行在 <code>localhost:8080</code>。注意 <code>script</code> 标签里面的 <code>/assets</code> 是怎么匹配到 <code>output.publicPath</code> 的 —— 你可以随意更改它的名称（如果你需要一个 CDN 的时候这会很有用）。</p>
<p>Webpack 会热加载所有 JavaScript 更改，而不需要刷新你的浏览器。但是，所有 <code>webpack.config.js</code> 文件里面的更改都需要重新启动服务器才能生效。</p>
<h3><a href="#全局访问方法"></a>全局访问方法</h3>
<p>需要在全局空间使用你的函数？在 <code>webpack.config.js</code> 里面简单地设置 <code>output.library</code>：</p>
<pre><code class="hljs java"><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  output: {
    library: <span class="hljs-string">'myClassName'</span>,
  }
};

</code></pre><p>……这会将你打包好的文件附加到一个 <code>window.myClassName</code> 实例。因此，使用该命名空间，你可以调用入口文件的可用方法（可以在<a href="https://webpack.js.org/concepts/output/#output-library">该文档</a>中阅读有关此设置的更多信息）。</p>
<h3><a href="#加载器"></a>加载器</h3>
<p>到目前为止，我们所做的一切只涉及 JavaScript。从一开始就使用 JavaScript 是重要的，因为它是 Webpack 唯一支持的语言。事实上我们可以处理几乎所有文件类型，只要我们将其转换成 JavaScript。我们用加载器（loader）来实现这个功能。</p>
<p>加载器可以是 Sass 这样的预处理器，或者是 Babel 这样的转译器。在 NPM 上，它们通常被命名为 <code>*-loader</code>，例如 <code>sass-loader</code> 和 <code>babel-loader</code>。</p>
<h4><a href="#babel-和es6"></a>Babel 和 ES6</h4>
<p>如果我们想在项目中通过 <a href="https://babeljs.io/">Babel</a> 来使用 ES6，我们首先需要在本地安装合适的加载器：</p>
<pre><code class="hljs armasm"><span class="hljs-symbol">yarn</span> <span class="hljs-keyword">add </span>--dev <span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-preset-es2015
</span>
</code></pre><p>然后将它添加到 <code>webpack.config.js</code>，让 Webpack 知道在哪里使用它。</p>
<pre><code class="hljs dts">module.exports = {
  <span class="hljs-comment">// …</span>
<span class="hljs-symbol">
  module:</span> {
<span class="hljs-symbol">    rules:</span> [
      {
<span class="hljs-symbol">        test:</span> /\.js$/,
<span class="hljs-symbol">        use:</span> [{
<span class="hljs-symbol">          loader:</span> <span class="hljs-string">"babel-loader"</span>,
<span class="hljs-symbol">          options:</span> { presets: [<span class="hljs-string">"es2015"</span>] }
        }],
      },

      <span class="hljs-comment">// Loaders for other file types can go here</span>
    ],
  },

  <span class="hljs-comment">// …</span>
};

</code></pre><p>Webpack 1 的用户注意：加载器的核心概念没有任何改变，但是语法改进了。直到官方文档完成之前，这可能不是确切的首选语法。</p>
<p><code>/\.js$/</code> 这个正则表达式查找所有以 <code>.js</code> 结尾的待通过 Babel 加载的文件。Webpack 依靠正则检查给予你完全的控制权 —— 它不限制你的文件扩展名或者假定你的代码必须以某种方式组织。例如：也许你的 <code>/my_legacy_code/</code> 文件夹下的内容不是用 ES6 写的，所以你可以修改上述的 <code>test</code> 为 <code>/^((?!my_legacy_folder).)\.js$/</code>，这将会排除那个特定的文件夹，不过会用 Babel 处理其余的文件。</p>
<h4><a href="#css-和-style加载器"></a>CSS 和 Style 加载器</h4>
<p>如果我们只想为我们的应用所需加载 CSS，我们也可以这样做。假设我们有一个 <code>index.js</code> 文件，我们将从那里引入：</p>
<pre><code class="hljs clean"><span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">'./assets/stylesheets/application.css'</span>;

</code></pre><p>我们会得到以下错误：<code>你可能需要一个合适的加载器来处理这种类型的文件</code>。记住，Webpack 只能识别 JavaScript，所以我们必须安装合适的加载器：</p>
<pre><code class="hljs dockerfile">yarn <span class="hljs-keyword">add</span><span class="bash"> --dev css-loader style-loader
</span>
</code></pre><p>然后添加一条规则到 <code>webpack.config.js</code>：</p>
<pre><code class="hljs openscad"><span class="hljs-function"><span class="hljs-keyword">module</span>.<span class="hljs-title">exports</span> =</span> {
  <span class="hljs-comment">// …</span>

  <span class="hljs-function"><span class="hljs-keyword">module</span>: {</span>
    rules: [
      {
        test: /\.css$/,
        <span class="hljs-keyword">use</span>: [<span class="hljs-string">"style-loader"</span>, <span class="hljs-string">"css-loader"</span>],
      },

      <span class="hljs-comment">// …</span>
    ],
  },
};

</code></pre><p>加载器以数组的逆序处理。这意味着 <code>css-loader</code> 会比 <code>style-loader</code> 先执行。</p>
<p>你可能会注意到，即使在生产版本中，这实际上是将你的 CSS 和 JavaScript 打包在一起，<code>style-loader</code> 手动将你的样式写到 <code>&lt;head&gt;</code>。乍一看，它可能看起来有点怪异，但你仔细想想就会发现这就慢慢开始变得更加有意义了。你已经节省了一个头部请求 —— 节省了一些连接上的时间。如果你用 JavaScript 来加载你的 DOM，无论如何，这从本质上消除了 <a href="https://en.wikipedia.org/wiki/Flash_of_unstyled_content">FOUC</a>。</p>
<p>你还会注意到一个开箱即用的特性 —— Webpack 已经通过将这些文件打包在一起以自动解决你所有的 <code>@import</code> 查询（而不是依靠 CSS 默认的 import 方式，这会导致无谓的头部请求以及资源加载缓慢）。</p>
<p>从你的 JS 加载 CSS 是非常惊人的，因为你现在可以用一种新的强大的方式将你的 CSS 模块化。比如说你要只通过 <code>button.js</code> 来加载 <code>button.css</code>，这将意味着如果 <code>button.js</code> 从来没有真正使用过的话，它的 CSS 就不会膨胀我们的生产版本。如果你坚持面向组件的 CSS 实践，如 SMACSS 或 BEM，你会看到更紧密地结合你的 CSS 和你的标记和 JavaScript 的价值。</p>
<h4><a href="#css-和-node模块"></a>CSS 和 Node 模块</h4>
<p>我们可以使用 Webpack 来利用 Node.js 使用 <code>~</code> 前缀导入 Node 模块的优势。如果我们运行 <code>yarn add normalize.css</code>，我们可以使用：</p>
<pre><code class="hljs css">@<span class="hljs-keyword">import</span> <span class="hljs-string">"~normalize.css"</span>;

</code></pre><p>……并且充分利用 NPM 来管理我们的第三方样式 —— 版本控制、没有任何副本和粘贴的部分。此外，让 Webpack 为我们打包 CSS 比起使用 CSS 的默认导入方式有明显的优势 —— 节省无谓的头部请求和加载时间。</p>
<p>更新：这一节和下面一节已经更新为准确的用法，不再使用 CSS 模块简单地导入 Node 的模块。感谢 <a href="https://medium.com/u/901a038e32e5">Albert Fernández</a> 的帮助！</p>
<h4><a href="#css-模块"></a>CSS 模块</h4>
<p>你可能听说过 <a href="https://github.com/css-modules/css-modules">CSS 模块</a>，它把 CSS 变成了 SS，消除了 CSS 的层叠性（Cascading）。通常它的最适用场景是只有当你使用 JavaScript 构建 DOM 的时候，但实质上，它神奇地将你的 CSS 类放置到加载它的 JavaScript 文件里（<a href="https://github.com/css-modules/css-modules">在这里了解更多</a>）。如果你打算使用它，CSS 模块已经与 <code>css-loader</code> 封装在一起（<code>yarn add --dev css-loader</code>）：</p>
<pre><code class="hljs openscad"><span class="hljs-function"><span class="hljs-keyword">module</span>.<span class="hljs-title">exports</span> =</span> {
  <span class="hljs-comment">// …</span>

  <span class="hljs-function"><span class="hljs-keyword">module</span>: {</span>
    rules: [
      {
        test: /\.css$/,
        <span class="hljs-keyword">use</span>: [
          <span class="hljs-string">"style-loader"</span>,
          { loader: <span class="hljs-string">"css-loader"</span>, options: { modules: <span class="hljs-literal">true</span> } }
        ],
      },

      <span class="hljs-comment">// …</span>
    ],
  },
};

</code></pre><p>注意：对于 <code>css-loader</code>，我们现在使用扩展对象语法（expanded object syntax）来给它传递一个选项。你可以使用一个更为精简的字符串来取代默认选项，正如我们仍然使用了 <code>style-loader</code>。</p>
<hr>
<p>值得注意的是，当允许导入 CSS 模块的时候（例如：<code>@import 'normalize.css';</code>），你完全可以删除掉 <code>~</code>。但是，当你 <code>@import</code> 你自己的 CSS 的时候，你可能会遇到构建错误。如果你遇到“无法找到 ____”的错误，尝试添加一个 <code>resolve</code> 对象到 <code>webpack.config.js</code>，让 Webpack 更好地理解你的模块加载顺序。</p>
<pre><code class="hljs java"><span class="hljs-keyword">const</span> path = require(<span class="hljs-string">"path"</span>);

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  <span class="hljs-comment">//…</span>

  resolve: {
    modules: [path.resolve(__dirname, <span class="hljs-string">"src"</span>), <span class="hljs-string">"node_modules"</span>]
  },
};

</code></pre><p>我们首先指定源目录，然后指定 <code>node_modules</code>。这样，Webpack 会更好地处理解析，按照既定的顺序（分别用你的源目录和 Node 模块的目录替换 <code>"src"</code> 和 <code>"node_modules"</code>），首先查找我们的源目录，然后再查找已安装的 Node 模块。</p>
<h4><a href="#sass"></a>Sass</h4>
<p>需要使用 Sass？没问题。安装：</p>
<pre><code class="hljs crmsh">yarn add --dev sass-loader <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span>

</code></pre><p>并添加新的规则：</p>
<pre><code class="hljs openscad"><span class="hljs-function"><span class="hljs-keyword">module</span>.<span class="hljs-title">exports</span> =</span> {
  <span class="hljs-comment">// …</span>

  <span class="hljs-function"><span class="hljs-keyword">module</span>: {</span>
    rules: [
      {
        test: /\.(sass|scss)$/,
        <span class="hljs-keyword">use</span>: [
          <span class="hljs-string">"style-loader"</span>,
          <span class="hljs-string">"css-loader"</span>,
          <span class="hljs-string">"sass-loader"</span>,
        ]
      }

      <span class="hljs-comment">// …</span>
    ],
  },
};

</code></pre><p>然后当你的 Javascript 对一个 <code>.scss</code> 或 <code>.sass</code> 文件调用 <code>import</code> 方法的时候，Webpack 会处理的。</p>
<h4><a href="#css-独立打包"></a>CSS 独立打包</h4>
<p>或许你在处理渐进增强的问题；或许你因为其它原因需要一个单独的 CSS 文件。我们可以通过在我们的配置中用 <code>extract-text-webpack-plugin</code> 替换 <code>style-loader</code> 而轻易地做到这一点，这不需要更改任何代码。以我们的 <code>app.js</code> 文件为例：</p>
<pre><code class="hljs clean"><span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">'./assets/stylesheets/application.css'</span>;

</code></pre><p>让我们安装这个插件到本地（我们需要 2016 年 10 月的测试版本）：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">yarn</span> <span class="hljs-selector-tag">add</span> <span class="hljs-selector-tag">--dev</span> <span class="hljs-selector-tag">extract-text-webpack-plugin</span>@<span class="hljs-keyword">2</span>.<span class="hljs-keyword">0</span>.<span class="hljs-keyword">0</span>-<span class="hljs-keyword">beta</span>.<span class="hljs-keyword">4</span>

</code></pre><p>并且添加到 <code>webpack.config.js</code>：</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"extract-text-webpack-plugin"</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// …</span>

  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.css$/</span>,
        use: [
          ExtractTextPlugin.extract(<span class="hljs-string">"css"</span>),
          { loader: <span class="hljs-string">"css-loader"</span>, options: { modules: <span class="hljs-literal">true</span> } },
        ],
      },

      <span class="hljs-comment">// …</span>
    ]
  },
  plugins: [
    <span class="hljs-keyword">new</span> ExtractTextPlugin({
      filename: <span class="hljs-string">"[name].bundle.css"</span>,
      allChunks: <span class="hljs-literal">true</span>,
    }),
  ],
};

</code></pre><p>现在当运行 <code>webpack -p</code> 的时候，你的 <code>output</code> 目录还会有一个 <code>app.bundle.css</code> 文件。只需要像往常一样简单地在你的 HTML 中向该文件添加一个 <code>&lt;link&gt;</code> 标签即可。</p>
<h4><a href="#html"></a>HTML</h4>
<p>正如你可能已经猜到，Webpack 还有一个 <code>[html-loader][6]</code> 插件。但是，当我们用 JavaScript 加载 HTML 时，我们针对不同的场景分成了不同的方法，我无法想出一个单一的例子来为你计划下一步做什么。通常，你需要加载 HTML 以便于在更大的系统（如 <a href="https://facebook.github.io/react/">React</a>、<a href="https://angularjs.org/">Angular</a>、<a href="http://vuejs.org/">Vue</a> 或 <a href="http://emberjs.com/">Ember</a>）中使用 JavaScript 风格的标记，如 <a href="https://jsx.github.io/">JSX</a>、<a href="https://github.com/janl/mustache.js/">Mustache</a> 或 <a href="http://handlebarsjs.com/">Handlebars</a>。或者你可以使用类似 <a href="https://github.com/pugjs/pug-loader">Pug</a> （以前叫 Jade）或 <a href="https://github.com/AlexanderPavlenko/haml-loader">Haml</a> 这样的 HTML 预处理器，抑或你可以直接把同样的 HTML 从你的源代码目录推送到你的构建目录。你怎么做都行。</p>
<p>教程到此为止了：你可以用 Webpack 加载标记，但是进展到这一步的时候，关于你的架构，你将做出自己的决定，我和 Webpack 都无法左右你。不过参考以上的例子以及搜索 NPM 上适用的加载器应该足够你发展下去了。</p>
<h3><a href="#从模块的角度思考"></a>从模块的角度思考</h3>
<p>为了充分使用 Webpack，你必须从模块的角度来思考：细粒度的、可复用的、用于高效处理每一件事的独立的处理程序。这意味着采取这样的方式：</p>
<pre><code class="hljs stylus">└── js/
    └── application<span class="hljs-selector-class">.js</span>   <span class="hljs-comment">// 300KB of spaghetti code</span>

</code></pre><p>将其转变成这样：</p>
<pre><code class="hljs stylus">└── js/
    ├── components/
    │   ├── <span class="hljs-selector-tag">button</span><span class="hljs-selector-class">.js</span>
    │   ├── calendar<span class="hljs-selector-class">.js</span>
    │   ├── comment<span class="hljs-selector-class">.js</span>
    │   ├── modal<span class="hljs-selector-class">.js</span>
    │   ├── tab<span class="hljs-selector-class">.js</span>
    │   ├── timer<span class="hljs-selector-class">.js</span>
    │   ├── <span class="hljs-selector-tag">video</span><span class="hljs-selector-class">.js</span>
    │   └── wysiwyg<span class="hljs-selector-class">.js</span>
    │
    └── application<span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// ~ 1KB of code; imports from ./components/</span>

</code></pre><p>结果呈现了整洁的、可复用的代码。每一个独立的组件通过 <code>import</code> 来引入自身的依赖，并 <code>export</code> 它想要暴露给其它模块的部分。结合 Babel 和 ES6，你可以利用 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">JavaScript 类</a> 来实现更强大的模块化，而不用考虑它的工作原理。</p>
<p>有关模块的更多信息，请参阅 Preethi Kasreddy <a href="https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc">这篇优秀的文章</a>。</p>
<hr>
<h3><a href="#延伸阅读"></a>延伸阅读</h3>
<ul>
<li><a href="https://gist.github.com/sokra/27b24881210b56bbaff7">Webpack 2 的新特性</a></li>
<li><a href="https://webpack.js.org/configuration/">Webpack 配置文档</a></li>
<li><a href="https://github.com/webpack/webpack/tree/master/examples">Webpack 范例</a></li>
<li><a href="https://github.com/kriasoft/react-starter-kit">React + Webpack 入门套件</a></li>
<li><a href="https://github.com/petehunt/webpack-howto">怎么使用 Webpack</a></li>
</ul>
<hr>
<p>via: <a href="https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783#.oozfpppao">https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783#.oozfpppao</a></p>
<p>作者：<a href="https://blog.madewithenvy.com/@an_ennui">Drew Powers</a> 译者：<a href="https://github.com/OneNewLife">OneNewLife</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack 2 入门

## 原文链接
[https://www.zcfy.cc/article/getting-started-with-webpack-2](https://www.zcfy.cc/article/getting-started-with-webpack-2)


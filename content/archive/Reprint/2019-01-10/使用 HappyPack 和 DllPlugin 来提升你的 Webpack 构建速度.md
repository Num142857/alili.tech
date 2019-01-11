---
title: '使用 HappyPack 和 DllPlugin 来提升你的 Webpack 构建速度' 
date: 2019-01-10 2:30:08
hidden: true
slug: eoy349e761g
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文原文发表在：<a href="https://medium.com/@Erichain/%E4%BD%BF%E7%94%A8-happypack-%E5%92%8C-dllplugin-%E6%9D%A5%E6%8F%90%E5%8D%87%E4%BD%A0%E7%9A%84-webpack-%E6%9E%84%E5%BB%BA%E9%80%9F%E5%BA%A6-7a1c41c5e78b" rel="nofollow noreferrer" target="_blank">https://medium.com/@Erichain/...</a><br>本文采用的 Webpack 版本为 2.0+<br>本文源代码地址：<a href="https://github.com/Erichain/webpack-build-speed-testing" rel="nofollow noreferrer" target="_blank">https://github.com/Erichain/w...</a></p></blockquote>
<p>如果你问我对 Webpack 什么印象的话，我只能告诉你，慢，真的慢。即使他的配置如文档所说（当然，它的文档也不是那么好）很简单，不像 Grunt 或者 Gulp 那样需要一堆配置，只需那么几十行就能够配置一个构建系统，我依然觉得，这个构建工具很慢。或许，是从它的文档开始，我就印象不好了？OK，这个话题到此为止，我们开始我们的正题吧。</p>
<p>本篇文章面向的不是 Webpack 新手，如果你对 Webpack 还不太熟悉的话，建议去阅读它的<a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">官方文档</a>。当然，我们肯定也会涉及到一些基础的东西。</p>
<p>本文重点讲解对生产环境的构建的性能的提升，如果需要对本地构建的性能进行提升的话，可以在本文结束之后，自己寻找一下解决方案哦。当然，还有一点需要说明的是，本文中的代码在本地不一定真正能够在浏览器中运行，有需要的可以自行搭建本地的构建系统。</p>
<hr>
<h4>一点基础</h4>
<p>使用过 Webpack 的朋友肯定知道，Webpack 的最简单的配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: {
    app: './src/app.js'
  },
  
  output: {
    path: path.join(__dirname, 'dist-[hash]'),
    filename: '[name].[hash].js'
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">'./src/app.js'</span>
  },
  
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dist-[hash]'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].[hash].js'</span>
  }
};</code></pre>
<p>这样的配置会将我们的文件打包成为一个 <code>app.[hash].js</code> 文件。这样针对的一般是我们的项目不算大的情况，并且公用模块比较少的情况（当然，公用模块较多的话，配置肯定也不会这么简单了）。</p>
<p>对于项目中有用到预处理器，ES2015+ 或者其余的需要编译后在浏览器上运行的语言，我们需要做的就是为这些东西添加上对应的 loader，然后，Webpack 就会自动的帮我们进行处理了（老实说，这一步还是挺方便的）。</p>
<p>一些 loader 配置示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rules: [
  {
    test: /\.jsx?$/,
    loader: ['babel-loader?presets[]=react,presets[]=latest&amp;compact=false'],
  }, {
    test: /\.scss$/,
    loader: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ],
  }, {
    test: /\.jpe?g|png|svg|gif/,
    loader: ['url-loader?limit=8192&amp;name=assets/images/[name]-[hash].[ext]'],
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">rules: [
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,
    <span class="hljs-attr">loader</span>: [<span class="hljs-string">'babel-loader?presets[]=react,presets[]=latest&amp;compact=false'</span>],
  }, {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss$/</span>,
    <span class="hljs-attr">loader</span>: [
      <span class="hljs-string">'style-loader'</span>,
      <span class="hljs-string">'css-loader'</span>,
      <span class="hljs-string">'postcss-loader'</span>,
      <span class="hljs-string">'sass-loader'</span>
    ],
  }, {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jpe?g|png|svg|gif/</span>,
    <span class="hljs-attr">loader</span>: [<span class="hljs-string">'url-loader?limit=8192&amp;name=assets/images/[name]-[hash].[ext]'</span>],
  }
]</code></pre>
<p>另外，我们还可以通过一些插件来更多的定义 Webpack 的打包行为。比如，如果我们有很多第三方库的引用，并且，多个地方都会引用到这些库，我们就可以使用 Webpack 的 <code>CommonsChunkPlugin</code> 来将这些公用的代码打包成一个文件（当然，至于速度嘛，我们后面再说），然后，将我们页面的业务代码打包成为一个文件。</p>
<p>Webpack 的主要配置就这几项，其他更多的更深入的配置可以查看 <a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">Webpack 的官方文档</a>。</p>
<h4>速度慢</h4>
<p>尽管 Webpack 配置起来很方便，但是，按照一般的配置来的话，构建的速度真的是太慢了，每构建一次都会花掉相当长的时间，这对于开发者们来说简直是噩梦。</p>
<p>可是，速度为什么会这么慢呢？</p>
<p>以我所在的项目为例，由于我们的项目存在多个 entries（大概四十多个），所以，我们的 Webpack 采用的配置是将公用的第三方库通过 <code>CommonsChunkPlugin</code> 来打包成为一个 <code>common.js</code>。</p>
<p>根据这个 <code>common.js</code> 的内容来看，这里面存放的就是各个 entry 引用的公有的代码，比如，我们的很多组件都会用到 React 或者 Redux 这些第三方库。通过将公有的代码单独打包成一个文件，然后再将业务代码打包成一个文件，这样一来，业务代码模块本身的体积就会减小很多，页面的加载速度也能够得到很大的提升。</p>
<p>虽然这样打包的方式能够在一定程度上提升页面的加载速度，但是，我们简单的想一想也知道，<code>CommonsChunkPlugin</code> 会去将所有 entry 中的公有模块遍历出来再进行编译压缩混淆，这个过程是非常缓慢的（我们的项目以前在使用这种方式的时候，在这一步会花上至少十二分钟的时间，你可以想象这个过程有多么漫长）。</p>
<p>经过了几个迭代的痛苦的打包上线的过程之后，我们终于不能忍了，决定对这个构建系统进行改造。</p>
<h4>改造的过程</h4>
<p>说实话，一开始我其实是没有任何头绪的，我只知道这个构建的过程慢，但是，并不清楚应该从何处开始进行改造。</p>
<p>与同事们进行了一些商讨之后，我准备从以下几个方面入手：</p>
<ul>
<li><p>减少构建的文件，减小文件大小：我们的项目中存在太多的无用的文件和代码，我决定先删除这些无用的东西</p></li>
<li><p>移除 <code>CommonsChunkPlugin</code></p></li>
<li><p>Search with Google</p></li>
</ul>
<p>第一步的作用其实并不明显，我删除了很大一部分的无用的图片和代码，但是，构建速度并没有明显的提升。</p>
<p>第二步，简单的移除掉 <code>CommonsChunkPlugin</code> 的话，构建速度确实会快很多，但是，这样打包出来的项目就不能够运行了，所以，还需要结合第三步（必须要感谢这个世界存在 Google）。</p>
<p>我在网上找到了许多相关的问题，关键性的建议有以下几个：</p>
<ul>
<li><p>将 <code>css-loader</code> 的版本回溯到 <code>0.15</code> 及其以前的版本</p></li>
<li><p>使用 <a href="https://github.com/amireh/happypack" rel="nofollow noreferrer" target="_blank">HappyPack</a></p></li>
<li><p>使用 <a href="https://webpack.js.org/plugins/dll-plugin/" rel="nofollow noreferrer" target="_blank">DllPlugin</a></p></li>
</ul>
<p>首先，第一点，降低 <code>css-loader</code> 的版本。</p>
<p>在 GitHub 上有这样一个 issue：<a href="https://github.com/webpack-contrib/css-loader/issues/124" rel="nofollow noreferrer" target="_blank">0.15.0+ makes Webpack load slowly</a>。按照 issue 中大家的讨论，我将我们项目中的 <code>css-loader</code> 的版本降到了 <code>0.14.5</code>。满怀期待的以为这样就能够提升一部分速度，但是，结果是令人失望的——构建的速度并没有明显的改变。我试着构建了好几遍，速度依然没有提升，所以，第一个方法失败，我将 <code>css-loader</code> 的版本恢复了回来。</p>
<p>那么，继续尝试第二个方法，也是本文将要重点说明的方法之一，那就是使用 HappyPack。</p>
<h4>使用 HappyPack</h4>
<p>HappyPack 允许 Webpack 使用 Node 多线程进行构建来提升构建的速度。</p>
<p>使用的方法与在 Webpack 中定义 loader 的方法类似，只是说，我们把构建需要的 loader 放到了 HappyPack 中，让 HappyPack 来为我们进行相应的操作，我们只需要在 Webpack 的配置中引入 HappyPack 的 loader 的配置就好了。</p>
<p>比如，我们编译 <code>.jsx</code> 文件的 loader 就可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new HappyPack({
  id: 'jsx',
  threads: 4,
  loaders: ['babel-loader?presets[]=react,presets[]=latest&amp;compact=false'],
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> HappyPack({
  <span class="hljs-attr">id</span>: <span class="hljs-string">'jsx'</span>,
  <span class="hljs-attr">threads</span>: <span class="hljs-number">4</span>,
  <span class="hljs-attr">loaders</span>: [<span class="hljs-string">'babel-loader?presets[]=react,presets[]=latest&amp;compact=false'</span>],
})</code></pre>
<p>其中，<code>threads</code> 指明 HappyPack 使用多少子进程来进行编译，一般设置为 4 为最佳。</p>
<p>编译 <code>.scss</code> 文件的 loader 这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new HappyPack({
  id: 'scss',
  threads: 4,
  loaders: [
    'style-loader',
    'css-loader',
    'postcss-loader',
    'sass-loader',
  ],
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> HappyPack({
  <span class="hljs-attr">id</span>: <span class="hljs-string">'scss'</span>,
  <span class="hljs-attr">threads</span>: <span class="hljs-number">4</span>,
  <span class="hljs-attr">loaders</span>: [
    <span class="hljs-string">'style-loader'</span>,
    <span class="hljs-string">'css-loader'</span>,
    <span class="hljs-string">'postcss-loader'</span>,
    <span class="hljs-string">'sass-loader'</span>,
  ],
})</code></pre>
<blockquote><p>其中，需要注意的一点就是，在使用 HappyPack 的情况下，我们需要单独创建一个 <code>postcss.config.js</code> 文件，不然，在编译的时候，就会报错。</p></blockquote>
<p>由于 HappyPack 对 <code>url-loader</code> 和 <code>file-loader</code> 的支持度的问题，所以，我们此处，打包图片文件的时候，并没有使用 HappyPack。</p>
<p><code>postcss.config.js</code> 的配置就像下面这样（根据你的需求，定制你自己的配置）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  autoprefixer: {
    browsers: ['last 3 versions'],
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">autoprefixer</span>: {
    <span class="hljs-attr">browsers</span>: [<span class="hljs-string">'last 3 versions'</span>],
  }
};</code></pre>
<p>定义好了我们 HappyPack 的 loader 之后，我们直接在我们的 Webpack 的配置的 <code>plugins</code> 一项中，引入就好了。</p>
<p>那么，我们在编译的时候，就会看到下面的输出：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010045695?w=379&amp;h=83" src="https://static.alili.tech/img/remote/1460000010045695?w=379&amp;h=83" alt="@HappyPack 输出|center" title="@HappyPack 输出|center" style="cursor: pointer; display: inline;"></span></p>
<p>这就是 HappyPack 在编译的时候的输出内容。</p>
<p>但是，我们的关注点不是它输出了什么，而是说，我们的构建速度有没有提升。</p>
<p>当然，结果是令人失望的，我们单独使用 HappyPack 的情况下，构建速度并没有明显的提升（当然，或许有所提升但是我没有发现也有可能）。</p>
<p>所以，为了进一步的提升我们的构建速度，我们将采取第三种方案，那就是 DllPlugin。</p>
<h4>使用 DllPlugin</h4>
<p>仔细阅读过 Webpack 文档的朋友肯定对这个插件会有印象，或者说知道这个插件是干嘛用的。其实，我们此处也是基于 Webpack 的文档的一些说明，然后，结合我在项目中的实践来为大家讲解这个插件。</p>
<p>在 Webpack 中，DllPlugin 并不是单独的使用的，而是需要与一个名为 <code>DllReferencePlugin</code> 的插件结合起来使用的。</p>
<p>熟悉 Windows 的朋友就应该知道，DLL 所代表的含义。在 Windows 中，有大量的 <code>.dll</code> 文件，称为动态链接库。</p>
<p>在 <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/ms682589%28v=vs.85%29.aspx" rel="nofollow noreferrer" target="_blank">MSDN</a> 上，微软是这样解释动态链接库的：</p>
<blockquote><p>A dynamic-link library (DLL) is a module that contains functions and data that can be used by another module (application or DLL).</p></blockquote>
<p>大概的意思就是说，动态链接库包含的是，可以在其他模块中进行调用的函数和数据。</p>
<p>文档里面还有一句话是这样说的：</p>
<blockquote><p>DLLs provide a way to modularize applications so that their functionality can be updated and reused more easily.</p></blockquote>
<p>动态链接库提供了将应用模块化的方式，应用的功能可以在此基础上更容易被复用。</p>
<p>回到我们的项目中，类似的，我们其实要做的也是将各个模块中公用的部分给打包成为一个公用的模块。这个模块就包含了我们的其他模块中需要的函数和数据（比如，其他组件所需的 React 库）。</p>
<p>使用 DllPlugin 的时候，会生成一个 <code>manifest.json</code> 这个文件，所存储的就是各个模块和所需公用模块的对应关系。</p>
<p>说了这么多，我们不如直接来看看这个插件到底是怎么使用的：</p>
<p>首先，我们需要一个文件，这个文件包含所有的第三方或者公用的模块和库，我们在此将其命名为 <code>vendor.js</code>，文件的内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'react';
import 'react-dom';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'react-dom'</span>;</code></pre>
<p>由于我们的示例项目中只用到了这两个公用的第三方库，所以，我们此处只需要引入这两个库就行了。</p>
<p>在打包的时候，我们将这些公用的模块单独打包成一个文件，然后，通过生成的 <code>manifest.json</code> 文件对应过去。所以，我们需要单独创建一个 <code>webpack.config.vendor.js</code>。</p>
<p>文件内容其实很简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    vendor: [path.join(__dirname, 'src', 'vendor.js')],
  },

  output: {
    path: path.join(__dirname, 'dist-[hash]'),
    filename: '[name].js',
    library: '[name]',
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      filename: '[name].js',
      name: '[name]',
    }),
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">vendor</span>: [path.join(__dirname, <span class="hljs-string">'src'</span>, <span class="hljs-string">'vendor.js'</span>)],
  },

  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dist-[hash]'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>,
    <span class="hljs-attr">library</span>: <span class="hljs-string">'[name]'</span>,
  },

  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DllPlugin({
      <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dll'</span>, <span class="hljs-string">'[name]-manifest.json'</span>),
      <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'[name]'</span>,
    }),
  ]
};</code></pre>
<p>可以看到，我们主要的操作是在 <code>plugins</code> 配置中，生成的文件名就是我们所定义的 <code>entry</code> 的名称，JSON 文件名可以根据自己的需要来命名。像上面这样，我们就可以将我们的一些公用模块打包出来了。</p>
<p>运行以下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack -p --progress --config webpack.config.vendor.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">webpack -p --progress --config webpack.config.vendor.js</code></pre>
<p>我们就可以看到这样的输出：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010045696?w=499&amp;h=387" src="https://static.alili.tech/img/remote/1460000010045696?w=499&amp;h=387" alt="@DllPlugin 打包输出|center" title="@DllPlugin 打包输出|center" style="cursor: pointer; display: inline;"></span></p>
<p>这样，我们就完成了构建的第一步。下一步，我们需要在构建应用的配置文件中，加入我们的 DllPlugin 的配置。</p>
<p>这时候，我们就需要用到 <code>DllReferencePlugin</code> 了。</p>
<p>在我们的主要配置文件中，加入以下的配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const manifest = require('./dll/vendor-manifest.json');

// ... 其他完美的配置

plugins: [
  new webpack.DllReferencePlugin({
    manifest,
  }),
]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> manifest = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./dll/vendor-manifest.json'</span>);

<span class="hljs-comment">// ... 其他完美的配置</span>

plugins: [
  <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
    manifest,
  }),
],</code></pre>
<p>就这样，我们的所有工作就完成了，我们只需要运行一条命令，就能够看到构建速度的巨大提升。</p>
<p>当然，为了更完美，我们可以将 DllPlugin 和 HappyPack 结合起来使用，效果会更好。具体的代码细节，此处不予展示，朋友们可以直接去 GitHub 上查看。</p>
<p>为了方便构建，我们可以写一个脚本将构建过程简单化。在我的 GitHub 项目里面有相关的脚本，包含了一些基础的操作，有需要的朋友可以去查看。此处，我们就认为我们的命令可以直接构建了。</p>
<p>为了体现出构建速度的区别，我们先运行 <code>npm run build</code>，这是采用普通方式进行构建的命令。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010045697?w=408&amp;h=116" src="https://static.alili.tech/img/remote/1460000010045697?w=408&amp;h=116" alt="@采用普通构建方式的构建时间|center" title="@采用普通构建方式的构建时间|center" style="cursor: pointer;"></span></p>
<p>可以看到，构建时间为 20353ms，换算下来为 20s 左右。</p>
<p>接下来，我们运行 <code>npm run build dll</code>，通过 DllPlugin 和 HappyPack 进行构建。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010045698?w=366&amp;h=63" src="https://static.alili.tech/img/remote/1460000010045698?w=366&amp;h=63" alt="@构建 vendor.js 文件的时间|center" title="@构建 vendor.js 文件的时间|center" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010045699?w=397&amp;h=102" src="https://static.alili.tech/img/remote/1460000010045699?w=397&amp;h=102" alt="@构建 app.js 文件的时间|center" title="@构建 app.js 文件的时间|center" style="cursor: pointer;"></span></p>
<p>我们将两个时间加起来，总共为 12184ms，换算下来为 12s 左右。快了将近一倍的时间！这还只是文件少的情况。在我们的实际项目中，构建时间提升了 3 倍多，所以，可以看到 DllPlugin 的强大之处。</p>
<h4>一点总结</h4>
<p>本文只是寻找了这样几种能够提升构建速度的解决方案，我相信，方法肯定不止这些，一定还有更多的解决方案等待我们去发现。所以，希望各位朋友能够对本文中不足的地方提出建议，希望与大家共同学习，共同进步。</p>
<hr>
<h3 id="articleHeader0">References</h3>
<p><a href="http://engineering.invisionapp.com/post/optimizing-webpack/" rel="nofollow noreferrer" target="_blank">OPTIMIZING WEBPACK FOR FASTER REACT BUILDS</a></p>
<p><a href="https://robertknight.github.io/posts/webpack-dll-plugins/" rel="nofollow noreferrer" target="_blank">Optimizing Webpack build times and improving caching with DLL bundles</a></p>
<p><a href="https://msdn.microsoft.com/en-us/library/windows/desktop/ms682589%28v=vs.85%29.aspx" rel="nofollow noreferrer" target="_blank">Dynamic-Link Libraries</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 HappyPack 和 DllPlugin 来提升你的 Webpack 构建速度

## 原文链接
[https://segmentfault.com/a/1190000010045690](https://segmentfault.com/a/1190000010045690)


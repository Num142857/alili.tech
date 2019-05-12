---
title: '【30分钟】吃透webpack，也许这一篇就够了' 
date: 2018-12-20 2:30:10
hidden: true
slug: lbvc54rx4db
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文webpack是在Mac平台下基于官方最新版本v3.10，对于webpack@v2会有小的差异，待全文完成后会补充webpack@v2与v3版本之间的差异</blockquote>
<h2 id="articleHeader0">使用webpack前的准备</h2>
<h3 id="articleHeader1">1、初始化一个前端项目</h3>
<p>为了方便之后自己更好的使用这个webpack_starter，引入git的支持，一是可以把一些通用的东西放在主分支，二是可以把后面不同的配置支持可以通过<code>branch</code>或者<code>tag</code>的方式分门别类。</p>
<ul><li>在github初始化一个<code>webpack_starter</code>项目，如下图所示，初始化<code>.gitignore</code>支持<code>Node</code>语言</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV0WoU?w=1446&amp;h=1238" src="https://static.alili.tech/img/bV0WoU?w=1446&amp;h=1238" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#clone项目到本地
git clone https://github.com/mpandar/webpack_starter.git
cd webpack_starter" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-comment">#clone项目到本地</span>
git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/mpandar/webpack_starter.git
cd webpack_starter</code></pre>
<ul><li>利用yarn初始化项目（当然同样可以使用npm，无太大差异，此处不再补充npm使用方法）</li></ul>
<blockquote>初始化过程按照提示完成即可，唯一注意的是<code>entry point</code>，这是webpack进行打包时的入口文件，默认是根目录下的<code>index.js</code>，不过通常情况下，我们的源码都是在<code>src</code>目录下，所以修改为<code>src/index.js</code>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> yarn init
yarn init v1.3.2
question name (webpack_starter): 
question version (1.0.0): 0.1.0
question description: a webpack start project
question entry point (index.js): src/index.js
question repository url (https://github.com/mpandar/webpack_starter.git): 
question author (mpandar <mshp_****@126.com>): 
question license (MIT): 
question private: 
success Saved package.json
✨  Done in 53.55s." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>&gt; <span class="hljs-selector-tag">yarn</span> <span class="hljs-selector-tag">init</span>
<span class="hljs-selector-tag">yarn</span> <span class="hljs-selector-tag">init</span> <span class="hljs-selector-tag">v1</span><span class="hljs-selector-class">.3</span><span class="hljs-selector-class">.2</span>
<span class="hljs-selector-tag">question</span> <span class="hljs-selector-tag">name</span> (webpack_starter): 
<span class="hljs-selector-tag">question</span> <span class="hljs-selector-tag">version</span> (<span class="hljs-number">1.0</span>.<span class="hljs-number">0</span>): <span class="hljs-selector-tag">0</span><span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.0</span>
<span class="hljs-selector-tag">question</span> <span class="hljs-selector-tag">description</span>: <span class="hljs-selector-tag">a</span> <span class="hljs-selector-tag">webpack</span> <span class="hljs-selector-tag">start</span> <span class="hljs-selector-tag">project</span>
<span class="hljs-selector-tag">question</span> <span class="hljs-selector-tag">entry</span> <span class="hljs-selector-tag">point</span> (index.js): <span class="hljs-selector-tag">src</span>/<span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
<span class="hljs-selector-tag">question</span> <span class="hljs-selector-tag">repository</span> <span class="hljs-selector-tag">url</span> (<span class="hljs-attribute">https</span>:<span class="hljs-comment">//github.com/mpandar/webpack_starter.git): </span>
question author (mpandar &lt;mshp_****<span class="hljs-variable">@126</span>.com&gt;): 
question license (MIT): 
question <span class="hljs-attribute">private</span>: 
success Saved package.json
✨  Done in <span class="hljs-number">53.55s</span>.</code></pre>
<h3 id="articleHeader2">2、安装webpack</h3>
<blockquote>单独安装与全局安装对于webpack的使用并无太大差异，但推荐即使全局安装以后，仍要在项目中进行单独的安装，方便项目移植。否则可能会导致全局安装的webpack版本与项目中的配置文件可能存在不匹配。当然单独安装后，使用一些npm或yarn命令，它们会优先使用本地安装的webpack</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#全局安装
yarn global add webpack
#单项目使用
yarn add webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-comment">#全局安装</span>
yarn global <span class="hljs-keyword">add</span><span class="bash"> webpack
</span><span class="hljs-comment">#单项目使用</span>
yarn <span class="hljs-keyword">add</span><span class="bash"> webpack</span></code></pre>
<h3 id="articleHeader3">3、初始化项目目录</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" |---
    |--dist    //存放webpack打包后相关文件
    |--src     //存放项目源码
       |--index.js 
    |--config  //项目相关的配置文件
       |--webpack.config.js   //webpack默认读取项目根目录下的webpack.config.js文件作为配置信息，为了规范化移入到config目录下
    |--package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> |---
    |--dist    <span class="hljs-comment">//存放webpack打包后相关文件</span>
    |--src     <span class="hljs-comment">//存放项目源码</span>
       |--index.js 
    |--config  <span class="hljs-comment">//项目相关的配置文件</span>
       |--webpack.config.js   <span class="hljs-comment">//webpack默认读取项目根目录下的webpack.config.js文件作为配置信息，为了规范化移入到config目录下</span>
    |--package.json</code></pre>
<h2 id="articleHeader4">了解webpack配置文件webpack.config.js</h2>
<p>当然，即使没有配置文件，直接运行webpack命令，同样可以直接对js文件完成打包工作，这里是一篇分析webpack打包后的代码的文章：<a href="https://www.jianshu.com/p/0e5247f9975f" rel="nofollow noreferrer" target="_blank">简要分析webpack打包后代码</a>，其中用到的一个新命令npx，很简单，介绍<a href="https://segmentfault.com/a/1190000010149499">点这里</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#直接打包
npx webpack src/index.js dist/bundle.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment">#直接打包</span>
npx webpack src/index.js dist/bundle.js</code></pre>
<p>为了应对更灵活的使用场景，webpack支持配置文件，并且默认情况下，在项目根目录下，如果存在<code>webpack.config.js</code>文件，那么webpack会主动读取该文件作为配置内容，不过Demo下，为了更加符合我们的目录规范，我们将config文件移到了<code>config</code>目录下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//当配置文件内容为空时，运行该命令会提示`Configuration file found but no entry configured`
npx webpack src/index.js --config config/webpack.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//当配置文件内容为空时，运行该命令会提示`Configuration file found but no entry configured`</span>
npx webpack src/index<span class="hljs-selector-class">.js</span> --config config/webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span></code></pre>
<p>接下来，让我们看一下一个webpack配置文件，最简单只需要包含entry（定义入口文件）和output（定义打包输出文件）这两个部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const base = path.join(__dirname, '..')

module.exports = {
  entry: path.resolve(base, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(base, 'dist')
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> base = path.join(__dirname, <span class="hljs-string">'..'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: path.resolve(base, <span class="hljs-string">'src'</span>, <span class="hljs-string">'index.js'</span>),
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>,
    <span class="hljs-attr">path</span>: path.resolve(base, <span class="hljs-string">'dist'</span>)
  }
};</code></pre>
<blockquote>注：使用path模块只是为了代码清晰，你完全可以不用，直接用<code>__dirname+'/../src'</code>类似代码拼接</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这样就不需要在命令行定义输入输出文件啦
npx webpack --config config/webpack.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">//这样就不需要在命令行定义输入输出文件啦</span>
npx webpack --<span class="hljs-built_in">config</span> <span class="hljs-built_in">config</span>/webpack.<span class="hljs-built_in">config</span>.js</code></pre>
<p>除了<code>entry</code>和<code>output</code>，webpack中最常见的就是<code>module</code>、<code>resolve</code>、<code>plugins</code>，大致结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: path.resolve(base, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(base, 'dist')
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(base, 'dist'),
    historyApiFallback: true,
    inline: true,
    proxy: {
      &quot;/api&quot;: &quot;http://localhost:8000&quot;
    }
  },
  module: {
    rules: [
    ]
  },
  resolve: {
  },
  plugins: [
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: path.resolve(base, <span class="hljs-string">'src'</span>, <span class="hljs-string">'index.js'</span>),
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>,
    <span class="hljs-attr">path</span>: path.resolve(base, <span class="hljs-string">'dist'</span>)
  },
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">'eval-source-map'</span>,
  <span class="hljs-attr">devServer</span>: {
    <span class="hljs-attr">contentBase</span>: path.resolve(base, <span class="hljs-string">'dist'</span>),
    <span class="hljs-attr">historyApiFallback</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">inline</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">proxy</span>: {
      <span class="hljs-string">"/api"</span>: <span class="hljs-string">"http://localhost:8000"</span>
    }
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
    ]
  },
  <span class="hljs-attr">resolve</span>: {
  },
  <span class="hljs-attr">plugins</span>: [
  ]
};</code></pre>
<p>当然了解webpack最好的地方永远是官方文档，<a href="https://webpack.js.org/configuration/" rel="nofollow noreferrer" target="_blank">传送门</a>，接下来，自然是在目前配置的基础上，增添更多令人兴奋的特性</p>
<h2 id="articleHeader5">为开发增加更多利器</h2>
<h3 id="articleHeader6">生成Source Map，为调试助力</h3>
<p>开发离不开调试，但经过编码后的代码并不利于调试，很找到出错的地方对应的你写的代码，而Source Maps就是来帮我们解决这个问题的。<br>而webpack支持Source Maps仅仅是增加一行 <code>devtool</code> 配置选项，具体配置选项可以<a href="https://webpack.js.org/configuration/devtool/#devtool" rel="nofollow noreferrer" target="_blank">看这里的官方文档</a>，其中两个选项 <code>eval-source-map</code> 与 <code>source-map</code> 是比较常用的选项，前一个选项推荐仅仅用在开发环境，而后一个通常在一些第三方库中，提供给开发者调试使用。当然对于任何上线项目，实际上都推荐使用*.min.js并不使用Source Map以加快网络加载。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: path.resolve(base, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(base, 'dist')
  },
  devtool: 'eval-source-map'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>module.exports = {
  entry: path.<span class="hljs-built_in">resolve</span>(base, <span class="hljs-string">'src'</span>, <span class="hljs-string">'index.js'</span>),
  outpu<span class="hljs-variable">t:</span> {
    filename: <span class="hljs-string">'bundle.js'</span>,
    path: path.<span class="hljs-built_in">resolve</span>(base, <span class="hljs-string">'dist'</span>)
  },
  devtoo<span class="hljs-variable">l:</span> <span class="hljs-string">'eval-source-map'</span>
}</code></pre>
<h3 id="articleHeader7">自动监控代码更新，自动编译，自动浏览器刷新</h3>
<p>作为开发者，总不希望把时间浪费在执行命令和刷新页面上，webpack提供一个单独的组件<code>webpack-dev-server</code>为我们提供一个基于nodejs的本地服务器、文件修改监控及编译以及浏览器自动刷新等特性。</p>
<p>首先是安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add webpack-dev-server --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-keyword">add</span><span class="bash"> webpack-dev-server --dev</span></code></pre>
<p>详细配置参数可查阅<a href="https://webpack.js.org/configuration/dev-server/" rel="nofollow noreferrer" target="_blank">官方文档</a>，常使用参数如下：</p>
<ul>
<li>contentBase 指定项目根目录</li>
<li>historyApiFallback 主要应用在单页应用的开发场景，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html</li>
<li>inline 主要是解决了自动浏览器自动刷新问题</li>
<li>lazy 默认为false，若开启后，则webpack-dev-server不再监测文件变化自动编译，只有等到我们手动刷新浏览器的时候才会编译文件</li>
<li>proxy 可以有效的解决开发阶段的跨域问题，毕竟不是所有的前端项目，都有独立的nodejs作为中间件去请求服务，更多的还是把前端项目编译后与后端服务部署在一起。而开发阶段又相对独立，这时候就可以利用proxy将前端请求转发到后端测试服务器，不影响开发</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: path.resolve(base, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(base, 'dist')
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(base, 'dist'),
    historyApiFallback: true,
    inline: true,
    proxy: {
      &quot;/api&quot;: &quot;http://localhost:8000&quot;
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: path.resolve(base, <span class="hljs-string">'src'</span>, <span class="hljs-string">'index.js'</span>),
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>,
    <span class="hljs-attr">path</span>: path.resolve(base, <span class="hljs-string">'dist'</span>)
  },
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">'eval-source-map'</span>,
  <span class="hljs-attr">devServer</span>: {
    <span class="hljs-attr">contentBase</span>: path.resolve(base, <span class="hljs-string">'dist'</span>),
    <span class="hljs-attr">historyApiFallback</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">inline</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">proxy</span>: {
      <span class="hljs-string">"/api"</span>: <span class="hljs-string">"http://localhost:8000"</span>
    }
  }
}</code></pre>
<blockquote>小插曲，本来测试proxy的时候，自己利用php -S localhost:8000快速起了一个监听进程，但是访问前端的时候却提示转发去请求被拒绝，后来发现webpack-dev-server去转发请求的时候是把localhost转化为了地址，即127.0.0.1:8000，所以在php启动监听进程时候，需要使用<code>php -S 127.0.0.1:8000</code>或者<code>php -S 0.0.0.0:8000</code>监听所有网卡地址</blockquote>
<p>webpack-dev-server的使用同webpack基本运行一样，只是webpack-dev-server是一个不会退出的进程，并自动监控文件变化等（Ctrl+C退出)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npx webpack-dev-server --config config/webpack.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">npx webpack-dev-server --<span class="hljs-built_in">config</span> <span class="hljs-built_in">config</span>/webpack.<span class="hljs-built_in">config</span>.js</code></pre>
<h3 id="articleHeader8">更方便的打包命令</h3>
<p>使用<code>npx webpack --config config/webpack.config.js</code>进行打包实际上已经很方便了，但是当我们需要又有开发环境的配置，又有生产环境的配置，甚至还要为命令增加其他的环境变量的时候，这个命令简直是又臭又长，我们总不能每次都输入这个繁琐的命令，其实我们可以利用npm scripts，这里是一篇<a href="https://www.jianshu.com/p/42e11515c10f" rel="nofollow noreferrer" target="_blank">阮一峰大神对npm脚本的介绍</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//package.json
{  
  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;webpack --config config/webpack.config.js&quot;,
    &quot;dev&quot;: &quot;webpack-dev-server --config config/webpack.config.js&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//package.json</span>
{  
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack --config config/webpack.config.js"</span>,
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server --config config/webpack.config.js"</span>
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> build
</span>npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<blockquote>需要注意的是在配置build&amp;dev脚本的时候，我们并没有用<code>npx</code>命令，实际上，在npm脚本中的命令，npm默认都是优先查找本项目下node_modules下是否存在对应的模块及命令，如果没找到，才会查找全局的命令</blockquote>
<h3 id="articleHeader9">多文件入口</h3>
<p>通常一个项目中，并不是只有一个js文件，而entry默认支持多文件入口，修改output跟随入口文件名字命名即可，简单做如下修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: {
    index: path.resolve(base, 'src', 'index.js'),
    main: path.resolve(base, 'src', 'main.js')
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(base, 'dist')
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>module.exports = {
  entry: {
    <span class="hljs-built_in">index</span>: path.<span class="hljs-built_in">resolve</span>(base, <span class="hljs-string">'src'</span>, <span class="hljs-string">'index.js'</span>),
    main: path.<span class="hljs-built_in">resolve</span>(base, <span class="hljs-string">'src'</span>, <span class="hljs-string">'main.js'</span>)
  },
  outpu<span class="hljs-variable">t:</span> {
    filename: <span class="hljs-string">'js/[name].js'</span>,
    path: path.<span class="hljs-built_in">resolve</span>(base, <span class="hljs-string">'dist'</span>)
  }
}</code></pre>
<p>同时创建一个简单的main.js进行测试，再次编译会发现在dist/js目录下存在编译后的index.js和main.js文件</p>
<h2 id="articleHeader10">一切皆为Module</h2>
<p>webpack令人兴奋的一个特性就是模块化，易于扩展其功能。webpack支持大量的模块导入方法，比如ES6（import）、CommonJS（require）、AMD等规范，并且加入了一些<a href="https://webpack.js.org/api/module-methods/#webpack" rel="nofollow noreferrer" target="_blank">自由方法</a>，具体的可以看<a href="https://webpack.js.org/api/module-methods/" rel="nofollow noreferrer" target="_blank">官方说明</a>文档。</p>
<p>用通俗的语言描述就是，<strong>webpack通过某个入口，去匹配各种模块导入规范，发现一个模块就根据对应配置寻找对应的loader去处理，如此往复，直到处理完毕所有依赖。</strong></p>
<p>使用起来就是在modules字段中的rules（老版本名字为loaders，为保证兼容性，还是支持这个字段的）中配置test，去匹配文件（js、css、图片资源等等），然后把这个文件交给合适的loader处理即可，所以但凡新出的框架，如果用到了独特的语法功能，都会配套提供对应的loader工具</p>
<h3 id="articleHeader11">使用ES6等新特性</h3>
<p>目前虽然浏览器对ES6新特性的支持度都非常高，但仍是有部分场景下，我们只能运行ES5的代码，这时候就需要利用到js转码届的特斯拉Bebel及其插件了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add babel-loader babel-core babel-preset-env" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yarn add babel-loader babel-core babel-preset-env</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },</code></pre>
<p>显然<code>test</code>中匹配了所有的js文件，<code>exclude</code>字段去除了项目中依赖库里的文件，<code>use</code>则是配置对应的loader。其中对于options，是作为参数传递给babel-loader的，babel的相关参数可以参考babel的<a href="http://babeljs.io/docs/usage/api/#options" rel="nofollow noreferrer" target="_blank">官方网站</a>，其中presets作为最主要的参数，告诉babel按照那种规则去解析代码，当然<code>env</code>是一个组合，包含es2015、es2016等，当presets参数包含多个值时，babel的处理规则是倒序的，<code>"es2017","es2016"</code>，babel会先去匹配<code>es2016</code>的规则。另外，对于babel的配置，也可以通过在根目录建立<code>.babelrc</code>方式去配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//.babelrc
{
  &quot;presets&quot;: [
    &quot;env&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">//.babelrc</span>
{
  <span class="hljs-string">"presets"</span>: [
    <span class="hljs-string">"env"</span>
  ]
}</code></pre>
<p>当然除了扩展js的语法，有时候我们还需要扩展js的功能，比如在某些低版本的浏览器上运行<code>'Hello World'.includes('Hello')</code>，这可以使用<code>babel-polyfill</code>这个组件，点击<a href="https://segmentfault.com/a/1190000008706628">这里</a>可以了解其使用方法。</p>
<h3 id="articleHeader12">CSS</h3>
<p>当然，我们可以只让webpack处理js文件，继续在html文件中通过<code>link</code>标签引入css文件。但显然webpack希望前端攻城狮们也能像模块化编写js一样，进行css的编写。我们在src下创建css目录，并创建main.css文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* src/css/main.css */
body{
  background-color: deepskyblue; /* 我喜欢填空的蓝色 */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* src/css/main.css */</span>
<span class="hljs-selector-tag">body</span>{
  <span class="hljs-attribute">background-color</span>: deepskyblue; <span class="hljs-comment">/* 我喜欢填空的蓝色 */</span>
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//src/index.js
import style from './css/main.css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">//src/index.js</span>
<span class="hljs-keyword">import</span> style <span class="hljs-keyword">from</span> <span class="hljs-string">'./css/main.css'</span></code></pre>
<p>这时候使用<code>npm run build</code>会发现编译报错，这是因为webpack无法处理载入main.css后的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ERROR in ./src/css/main.css
Module parse failed: Unexpected token (1:4)
You may need an appropriate loader to handle this file type.
| body{
|   background-color: red;
| }
 @ ./src/index.js 3:12-37" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="nohighlight">ERROR in ./src/css/main.css
Module parse failed: Unexpected token (1:4)
You may need an appropriate loader to handle this file type.
| body{
|   background-color: red;
| }
 @ ./src/index.js 3:12-37</code></pre>
<p>webpack官方提供<code>css-loader</code>专门处理导入的css模块，当然<code>css-loader</code>也仅仅是完成了模块的导入处理，使webpack在编译时候不再报错，实际上，还需要<code>style-loader</code>处理导入后的css数据，自动添加到html的style标签中。如果你在测试过程中，仅仅添加<code>css-loader</code>loader，你会发现body实际上并没有变成背景蓝</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add style-loader css-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yarn add style-loader css-loader</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//config webpack.config.js module->rules
      {
        test: /\.css$/,
        use: [
          {
            loader: &quot;style-loader&quot;
          }, {
            loader: &quot;css-loader&quot;,
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
          }
        ]
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">//config webpack.config.js module-&gt;rules
      {
        test: /\.css$/,
        use: [
          {
            loader: <span class="hljs-string">"style-loader"</span>
          }, {
            loader: <span class="hljs-string">"css-loader"</span>,
            options: {
              modules: <span class="hljs-literal">true</span>,
              localIdentName: '[path][name]__[local]--[hash:base64:<span class="hljs-number">5</span>]'
              }
          }
        ]
      }</code></pre>
<p>当然<code>css-loader</code>还有一个重要配置选项，<code>modules</code>参数，它支持导入的css中的类名自动重命名，这样即使在不同组件使用了相同的css类命名，经处理后互相之间也不会出现影响。看下效果：<br><span class="img-wrap"><img data-src="/img/bV1ext?w=2516&amp;h=560" src="https://static.alili.tech/img/bV1ext?w=2516&amp;h=560" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader13">CSS预编译工具</h3>
<p>比较常见的预编译工具也就是Sass、Less、Stylus。在使用这三个预编译工具前，需要安装其对应的专属处理程序，比如Sass的处理工具node-sass。为了配合与webpack使用，还要安装对应的loader，比如sass-loader</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add sass-loader node-sass --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">yarn add sass-loader <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span> --dev</code></pre>
<p>在webpack.config.js中添加对scss（Sass 3引入的新的语法格式，推荐新项目都用此）文件的支持，再起强调，webpack中loader执行顺序是从右往左，从下往上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: &quot;style-loader&quot;
            }, {
                loader: &quot;css-loader&quot;,
                options: {
                  modules: true,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }, {
                loader: &quot;sass-loader&quot;
                }
            }]
        }]
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
    ...
    module: {
        <span class="hljs-attr">rules</span>: [{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss$/</span>,
            <span class="hljs-attr">use</span>: [{
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"style-loader"</span>
            }, {
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"css-loader"</span>,
                <span class="hljs-attr">options</span>: {
                  <span class="hljs-attr">modules</span>: <span class="hljs-literal">true</span>,
                  <span class="hljs-attr">localIdentName</span>: <span class="hljs-string">'[path][name]__[local]--[hash:base64:5]'</span>
              }
            }, {
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"sass-loader"</span>
                }
            }]
        }]
    }
};</code></pre>
<p>测试一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* src/sass/main.scss  */
body {
  background-color: blue;
}
.main {
  background-color: grey
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* src/sass/main.scss  */</span>
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">background-color</span>: blue;
}
<span class="hljs-selector-class">.main</span> {
  <span class="hljs-attribute">background-color</span>: grey
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//src/index.js
// import style from './css/main.css'
import style from './sass/main.scss'
let es6 = () => {
  console.log('run in es6')
  console.log(style)
}
es6();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span>src/index.js
<span class="hljs-regexp">//</span> <span class="hljs-keyword">import</span> style <span class="hljs-keyword">from</span> <span class="hljs-string">'./css/main.css'</span>
<span class="hljs-keyword">import</span> style <span class="hljs-keyword">from</span> <span class="hljs-string">'./sass/main.scss'</span>
let es6 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'run in es6'</span>)
  <span class="hljs-built_in">console</span>.log(style)
}
es6();</code></pre>
<p>其他两种预编译器可以参考各自官方文档：<a href="https://webpack.js.org/loaders/less-loader/" rel="nofollow noreferrer" target="_blank">less-loader</a>、<a href="https://github.com/shama/stylus-loader" rel="nofollow noreferrer" target="_blank">stylus-loader</a></p>
<h3 id="articleHeader14">像处理JS一样处理CSS -- PostCSS</h3>
<p>PostCSS官网介绍是，利用js转译css的一个工具。对PostCSS的介绍，我比较认可<a href="https://segmentfault.com/a/1190000003909268">这篇文章</a>，PostCSS提供了一个解析器，把css转换为抽象语法树（AST），当然这个AST是能够被js处理的，然后交给各种插件处理后，再将AST转为css代码，所以关键是这些插件能完成哪些功能。</p>
<h4>Autoprefixer</h4>
<p>Autoprefixer 是一个流行的 PostCSS 插件，其作用是为 CSS 中的属性添加浏览器特定的前缀。</p>
<h4>cssnext</h4>
<p>cssnext 插件允许开发人员在当前的项目中使用 CSS 将来版本中可能会加入的新特性。需要注意这个插件本身包含了Autoprefixer功能，所以如果使用了这个插件，则不需要Autoprefixer插件。<br>当然PostCSS中其实也包含支持Sass、Less等的插件，这个看个人喜好，不过我本人倒是蛮期待尝试下cssnext，毕竟大部分特性可能就是未来css支持的特性，提前熟悉下也算是预习。<br>更多插件可以读<a href="https://www.ibm.com/developerworks/cn/web/1604-postcss-css/" rel="nofollow noreferrer" target="_blank">这篇文章</a>，不再叙述</p>
<p>安装postcss-loader及其插件autoprefixer</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add postcss-loader autoprefixer --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yarn add postcss-loader autoprefixer --dev</code></pre>
<p>在<code>webpack.config.js</code>中添加postcss支持，注意postcss处理css文件的位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
              loader: &quot;style-loader&quot;
            }, {
              loader: &quot;css-loader&quot;,
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                minimize: false
              }
            }, {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(base, 'config', 'postcss.config.js')
                }
              }
            }, {
              loader: &quot;sass-loader&quot;
            }]
        }]
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
    ...
    module: {
        <span class="hljs-attr">rules</span>: [{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss$/</span>,
            <span class="hljs-attr">use</span>: [{
              <span class="hljs-attr">loader</span>: <span class="hljs-string">"style-loader"</span>
            }, {
              <span class="hljs-attr">loader</span>: <span class="hljs-string">"css-loader"</span>,
              <span class="hljs-attr">options</span>: {
                <span class="hljs-attr">modules</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">localIdentName</span>: <span class="hljs-string">'[path][name]__[local]--[hash:base64:5]'</span>,
                <span class="hljs-attr">minimize</span>: <span class="hljs-literal">false</span>
              }
            }, {
              <span class="hljs-attr">loader</span>: <span class="hljs-string">'postcss-loader'</span>,
              <span class="hljs-attr">options</span>: {
                <span class="hljs-attr">config</span>: {
                  <span class="hljs-attr">path</span>: path.resolve(base, <span class="hljs-string">'config'</span>, <span class="hljs-string">'postcss.config.js'</span>)
                }
              }
            }, {
              <span class="hljs-attr">loader</span>: <span class="hljs-string">"sass-loader"</span>
            }]
        }]
    }
};</code></pre>
<p>如上面配置，postcss需要单独的配置文件，创建<code>config/postcss.config.js</code>，添加如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//config/postcss.config.js
module.exports = {
  plugins: {
    'autoprefixer': {}
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//config/postcss.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">plugins</span>: {
    <span class="hljs-string">'autoprefixer'</span>: {}
  }
}</code></pre>
<h3 id="articleHeader15">图片资源</h3>
<p>file-loader提供了对图片资源的loader功能，并且利用 <code>publicPath</code> 选项还能很好的支持cdn，配合url-loader还能对小图片直接进行数字序列化（DataURL），减少网络请求，提高加载速度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add url-loader file-loader --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-built_in">add</span> url-loader <span class="hljs-built_in">file</span>-loader <span class="hljs-comment">--dev</span></code></pre>
<p>增加相关配置；url-loader的默认 <code>fallback</code> loader就是 <code>file-loader</code> 为了更直观就写了出来，传递给 <code>file-loader</code> 的参数也只需要写在options中即可。这样<br><code>background-image: url('../image/logo.jpg')</code> 当我们在css文件中使用这种方式引入图片时，就会触发url-loader去处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//config/webpack.config.js
module.exports = {
    ...
    module: {
      rules: [    
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
              name: '[hash:5].[ext]',
              // publicPath: 'https://cdn.j2do.com/',
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//config/webpack.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
    ...
    module: {
      <span class="hljs-attr">rules</span>: [    
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpg|gif)$/</span>,
        <span class="hljs-attr">use</span>: [
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
            <span class="hljs-attr">options</span>: {
              <span class="hljs-attr">limit</span>: <span class="hljs-number">8192</span>,
              <span class="hljs-attr">fallback</span>: <span class="hljs-string">'file-loader'</span>,
              <span class="hljs-attr">name</span>: <span class="hljs-string">'[hash:5].[ext]'</span>,
              <span class="hljs-comment">// publicPath: 'https://cdn.j2do.com/',</span>
              outputPath: <span class="hljs-string">'images/'</span>
            }
          }
        ]
      }
    ]
  }
}</code></pre>
<h2 id="articleHeader16">虽不是万能，但却异常强大的插件（Plugins）系统</h2>
<p>Loader是专注于处理Webpack导入的资源模块，而插件是对Webpack功能的扩展。除了Webpack内置的插件，开发社区提供了大量优秀的插件。当然插件也是解决问题的，我们还是以问题为导向，去介绍几款插件。</p>
<h3 id="articleHeader17">利用 <code>extract-text-webpack-plugin</code> 分离css到独立文件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add extract-text-webpack-plugin --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yarn add extract-text-webpack-plugin --dev</code></pre>
<p>其中ExtractTextPlugin中fallback是指定了如果不需要提取到独立css文件中的样式文件，则交给 <code>style-loade</code> 处理，其他loader配置，跟之前没有差异。同样如果是预编译文件（Sass、Less等）的话，也只需要增加对应的loader即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: &quot;style-loader&quot;,
          use: [
            {
              loader: &quot;css-loader&quot;,
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }, {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(base, 'config', 'postcss.config.js')
                }
              }
            }
          ]
        })
      }
    ]
  }
  ...
  plugins: [
    new ExtractTextPlugin(&quot;css/[name].css&quot;)
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  ...
  module: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">use</span>: ExtractTextPlugin.extract({
          <span class="hljs-attr">fallback</span>: <span class="hljs-string">"style-loader"</span>,
          <span class="hljs-attr">use</span>: [
            {
              <span class="hljs-attr">loader</span>: <span class="hljs-string">"css-loader"</span>,
              <span class="hljs-attr">options</span>: {
                <span class="hljs-attr">modules</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">localIdentName</span>: <span class="hljs-string">'[path][name]__[local]--[hash:base64:5]'</span>
              }
            }, {
              <span class="hljs-attr">loader</span>: <span class="hljs-string">'postcss-loader'</span>,
              <span class="hljs-attr">options</span>: {
                <span class="hljs-attr">config</span>: {
                  <span class="hljs-attr">path</span>: path.resolve(base, <span class="hljs-string">'config'</span>, <span class="hljs-string">'postcss.config.js'</span>)
                }
              }
            }
          ]
        })
      }
    ]
  }
  ...
  plugins: [
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">"css/[name].css"</span>)
  ]
};</code></pre>
<p>再次运行 <code>yarn run build</code> 会发现生成了独立的css文件</p>
<h3 id="articleHeader18">利用 <code>html-webpack-plugin</code> 自动生成 <code>index.html</code> 等入口文件</h3>
<p>随着多入口以及css的分离，手动去写html的入口文件也是一件麻烦事，这时候 <code>html-webpack-plugin</code> 就排上用途了， <code>html-webpack-plugin</code> 能够根据某个模板文件自动生成入口的html，包括多个入口，安装及配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add html-webpack-plugin --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yarn add html-webpack-plugin --dev</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  ...
  plugins: [
    new ExtractTextPlugin(&quot;[name].css&quot;),
    new HtmlWebpackPlugin({
      title: 'Index Page',
      template: path.resolve(base, 'src', 'template/index.html.tmpl'),
      filename: &quot;index.html&quot;,
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      title: 'Main Page',
      template: path.resolve(base, 'src', 'template/index.html.tmpl'),
      filename: &quot;main.html&quot;,
      chunks: ['main']
    }),
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  ...
  plugins: [
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">"[name].css"</span>),
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">title</span>: <span class="hljs-string">'Index Page'</span>,
      <span class="hljs-attr">template</span>: path.resolve(base, <span class="hljs-string">'src'</span>, <span class="hljs-string">'template/index.html.tmpl'</span>),
      <span class="hljs-attr">filename</span>: <span class="hljs-string">"index.html"</span>,
      <span class="hljs-attr">chunks</span>: [<span class="hljs-string">'index'</span>]
    }),
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">title</span>: <span class="hljs-string">'Main Page'</span>,
      <span class="hljs-attr">template</span>: path.resolve(base, <span class="hljs-string">'src'</span>, <span class="hljs-string">'template/index.html.tmpl'</span>),
      <span class="hljs-attr">filename</span>: <span class="hljs-string">"main.html"</span>,
      <span class="hljs-attr">chunks</span>: [<span class="hljs-string">'main'</span>]
    }),
  ]
};</code></pre>
<p>创建模板文件，注意之所以命名为 <code>.tmpl</code> 是为了防止 .html 可能会被loader解析，<code>&lt;%= ... %&gt;</code> 将不会被插件识别，完成变量替换。如下图，我们的 <code>title</code> 是以变量形式在 <code>webpack.config.js</code> 中配置。该插件还支持多种模板文件，具体可见<a href="https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- src/template/index.html.tmpl -->
<!DOCTYPE html>
<html>

<head>
  <meta charset=&quot;UTF-8&quot;>
  <title>
    <%= htmlWebpackPlugin.options.title %>
  </title>
</head>

<body>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code><span class="xml"><span class="hljs-comment">&lt;!-- src/template/index.html.tmpl --&gt;</span>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby"> htmlWebpackPlugin.options.title </span><span class="xml"><span class="hljs-tag">%&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<h3 id="articleHeader19">代码优化压缩</h3>
<p>前面已经将js、css等分离到单独文件，接下来就是优化压缩这些代码。</p>
<p>对于css而言，只需要配置 <code>css-loader</code> 的 <code>minimize</code> 参数为 <code>true</code> 即可；当然还可以利用postcss的 <code>cssnano</code> 插件进行代码的压缩和优化，据说 <code>cssnano</code> 是目前css压缩优化中效果最好的工具。</p>
<p>对于js的压缩，我们借助于 <code>uglifyjs-webpack-plugin</code> 插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add uglifyjs-webpack-plugin --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-keyword">add</span><span class="bash"> uglifyjs-webpack-plugin --dev</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  ...
  plugins: [
    new ExtractTextPlugin(&quot;css/[name].css&quot;),
    new HtmlWebpackPlugin({
      title: 'Index Page',
      template: path.resolve(base, 'src', 'template/index.html.tmpl'),
      filename: &quot;index.html&quot;,
      chunks: ['index']
    }),
    new UglifyJsPlugin()
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  ...
  plugins: [
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">"css/[name].css"</span>),
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">title</span>: <span class="hljs-string">'Index Page'</span>,
      <span class="hljs-attr">template</span>: path.resolve(base, <span class="hljs-string">'src'</span>, <span class="hljs-string">'template/index.html.tmpl'</span>),
      <span class="hljs-attr">filename</span>: <span class="hljs-string">"index.html"</span>,
      <span class="hljs-attr">chunks</span>: [<span class="hljs-string">'index'</span>]
    }),
    <span class="hljs-keyword">new</span> UglifyJsPlugin()
  ]
};</code></pre>
<h3 id="articleHeader20">借助Eslint自动代码规范检测及格式化</h3>
<p>Eslint不再介绍，在webpack下使用Eslint需要如下依赖包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add eslint eslint-loader babel-eslint eslint-config-standard --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yarn add eslint eslint-loader babel-eslint eslint-config-standard --dev</code></pre>
<p>其中eslint是必须的，<code>eslint-loader</code> 是连接eslint与webpack的loader，<code>babel-eslint</code> 是一个eslint解析器，使其能支持es6等语法检测，<code>eslint-config-standard</code>是Airbnb的规范配置，目前最流行的js规范。</p>
<blockquote>安装过程中如果有提示<code>eslint-config-standard@11.0.0-beta.0" has unmet peer dependency "eslint-plugin-import@&gt;=2.2.0"</code>等等，直接安装对应的包即可，比如：<code>yarn add eslint-plugin-import --dev</code>即可<br>eslint是规范js语法，所以他需要处理的是js文件，而且应该是先于所有loader去处理js文件，如果出错或者不规范则纠正之，这里可以利用webpack的 <code>enforce</code> 属性，设置eslint检查，先于其他loader</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  ...
  module: {
    rules: [
      {
        enforce: &quot;pre&quot;,
        test: /\.js$/,
        exclude: /node_modules/,//注意不要检测node_modules里面的代码
        loader: &quot;eslint-loader&quot;,
        options: {
          fix: true //自动修复不规范的代码，并不是所有代码都能自动修复的，一些缩进，引号等能直接处理
        }
      }
      ...
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  ...
  module: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">enforce</span>: <span class="hljs-string">"pre"</span>,
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,<span class="hljs-comment">//注意不要检测node_modules里面的代码</span>
        loader: <span class="hljs-string">"eslint-loader"</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">fix</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">//自动修复不规范的代码，并不是所有代码都能自动修复的，一些缩进，引号等能直接处理</span>
        }
      }
      ...
    ]
  }
}</code></pre>
<p>同时还要为eslint增加对应的配置文件 <code>.eslintrc</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;parser&quot;: &quot;babel-eslint&quot;,
  &quot;extends&quot;: &quot;standard&quot;,
  &quot;rules&quot;: {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"parser"</span>: <span class="hljs-string">"babel-eslint"</span>,
  <span class="hljs-attr">"extends"</span>: <span class="hljs-string">"standard"</span>,
  <span class="hljs-attr">"rules"</span>: {}
}</code></pre>
<p>这时候再尝试build吧，会发现一些不规范的代码被自动修复，当然有些不规范的代码，无法自动修复的，会直接导致错误；比如，声明了一个函数，却没有使用！</p>
<p>未完待续~~（近几天更新）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【30分钟】吃透webpack，也许这一篇就够了

## 原文链接
[https://segmentfault.com/a/1190000012631766](https://segmentfault.com/a/1190000012631766)


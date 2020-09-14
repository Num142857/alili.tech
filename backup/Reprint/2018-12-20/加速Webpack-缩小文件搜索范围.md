---
title: '加速Webpack-缩小文件搜索范围' 
date: 2018-12-20 2:30:10
hidden: true
slug: puzn7cmog2
categories: [reprint]
---

{{< raw >}}

                    
<p>Webpack 启动后会从配置的 Entry 出发，解析出文件中的导入语句，再递归的解析。<br>在遇到导入语句时 Webpack 会做两件事情：</p>
<ol>
<li>根据导入语句去寻找对应的要导入的文件。例如 <code>require('react')</code> 导入语句对应的文件是 <code>./node_modules/react/react.js</code>，<code>require('./util')</code> 对应的文件是 <code>./util.js</code>。</li>
<li>根据找到的要导入文件的后缀，使用配置中的 Loader 去处理文件。例如使用 ES6 开发的 JavaScript 文件需要使用 babel-loader 去处理。</li>
</ol>
<p>以上两件事情虽然对于处理一个文件非常快，但是当项目大了以后文件量会变的非常多，这时候构建速度慢的问题就会暴露出来。<br>虽然以上两件事情无法避免，但需要尽量减少以上两件事情的发生，以提高速度。</p>
<p>接下来一一介绍可以优化它们的途径。</p>
<h2 id="articleHeader0">优化 loader 配置</h2>
<p>由于 Loader 对文件的转换操作很耗时，需要让尽可能少的文件被 Loader 处理。</p>
<p>在<a href="http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-3Module.html" rel="nofollow noreferrer" target="_blank">2-3 Module</a> 中介绍过在使用 Loader 时可以通过 <code>test</code> 、 <code>include</code> 、 <code>exclude</code> 三个配置项来命中 Loader 要应用规则的文件。<br>为了尽可能少的让文件被 Loader 处理，可以通过 <code>include</code> 去命中只有哪些文件需要被处理。</p>
<p>以采用 ES6 的项目为例，在配置 babel-loader 时，可以这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  module: {
    rules: [
      {
        // 如果项目源码中只有 js 文件就不要写成 /\.jsx?$/，提升正则表达式性能
        test: /\.js$/,
        // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
        use: ['babel-loader?cacheDirectory'],
        // 只对项目根目录下的 src 目录中的文件采用 babel-loader
        include: path.resolve(__dirname, 'src'),
      },
    ]
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-comment">// 如果项目源码中只有 js 文件就不要写成 /\.jsx?$/，提升正则表达式性能</span>
        test: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-comment">// babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启</span>
        use: [<span class="hljs-string">'babel-loader?cacheDirectory'</span>],
        <span class="hljs-comment">// 只对项目根目录下的 src 目录中的文件采用 babel-loader</span>
        include: path.resolve(__dirname, <span class="hljs-string">'src'</span>),
      },
    ]
  },
};</code></pre>
<blockquote>你可以适当的调整项目的目录结构，以方便在配置 Loader 时通过 <code>include</code> 去缩小命中范围。</blockquote>
<h2 id="articleHeader1">优化 resolve.modules 配置</h2>
<p>在<a href="http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-4Resolve.html#modules" rel="nofollow noreferrer" target="_blank">2-4 Resolve</a> 中介绍过 <code>resolve.modules</code> 用于配置 Webpack 去哪些目录下寻找第三方模块。</p>
<p><code>resolve.modules</code> 的默认值是 <code>['node_modules']</code>，含义是先去当前目录下的 <code>./node_modules</code> 目录下去找想找的模块，如果没找到就去上一级目录 <code>../node_modules</code> 中找，再没有就去 <code>../../node_modules</code> 中找，以此类推，这和 Node.js 的模块寻找机制很相似。</p>
<p>当安装的第三方模块都放在项目根目录下的 <code>./node_modules</code> 目录下时，没有必要按照默认的方式去一层层的寻找，可以指明存放第三方模块的绝对路径，以减少寻找，配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    // 其中 __dirname 表示当前工作目录，也就是项目根目录
    modules: [path.resolve(__dirname, 'node_modules')]
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-comment">// 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤</span>
    <span class="hljs-comment">// 其中 __dirname 表示当前工作目录，也就是项目根目录</span>
    modules: [path.resolve(__dirname, <span class="hljs-string">'node_modules'</span>)]
  },
};</code></pre>
<h2 id="articleHeader2">优化 resolve.mainFields 配置</h2>
<p>在<a href="http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-4Resolve.html#mainFields" rel="nofollow noreferrer" target="_blank">2-4 Resolve</a> 中介绍过 <code>resolve.mainFields</code> 用于配置第三方模块使用哪个入口文件。</p>
<p>安装的第三方模块中都会有一个 <code>package.json</code> 文件用于描述这个模块的属性，其中有些字段用于描述入口文件在哪里，<code>resolve.mainFields</code> 用于配置采用哪个字段作为入口文件的描述。</p>
<p>可以存在多个字段描述入口文件的原因是因为有些模块可以同时用在多个环境中，准对不同的运行环境需要使用不同的代码。<br>以 <a href="https://github.com/matthew-andrews/isomorphic-fetch" rel="nofollow noreferrer" target="_blank">isomorphic-fetch</a> 为例，它是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API" rel="nofollow noreferrer" target="_blank">fetch API</a> 的一个实现，但可同时用于浏览器和 Node.js 环境。<br>它的 <code>package.json</code> 中就有2个入口文件描述字段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;browser&quot;: &quot;fetch-npm-browserify.js&quot;,
  &quot;main&quot;: &quot;fetch-npm-node.js&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"browser"</span>: <span class="hljs-string">"fetch-npm-browserify.js"</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"fetch-npm-node.js"</span>
}</code></pre>
<blockquote>isomorphic-fetch 在不同的运行环境下使用不同的代码是因为 fetch API 的实现机制不一样，在浏览器中通过原生的 <code>fetch</code> 或者 <code>XMLHttpRequest</code> 实现，在 Node.js 中通过 <code>http</code> 模块实现。</blockquote>
<p><code>resolve.mainFields</code> 的默认值和当前的 <code>target</code> 配置有关系，对应关系如下：</p>
<ul>
<li>当 <code>target</code> 为 <code>web</code> 或者 <code>webworker</code> 时，值是 <code>["browser", "module", "main"]</code>
</li>
<li>当 <code>target</code> 为其它情况时，值是 <code>["module", "main"]</code>
</li>
</ul>
<p>以 <code>target</code> 等于 <code>web</code> 为例，Webpack 会先采用第三方模块中的 <code>browser</code> 字段去寻找模块的入口文件，如果不存在就采用 <code>module</code> 字段，以此类推。</p>
<p>为了减少搜索步骤，在你明确第三方模块的入口文件描述字段时，你可以把它设置的尽量少。<br>由于大多数第三方模块都采用 <code>main</code> 字段去描述入口文件的位置，可以这样配置 Webpack：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  resolve: {
    // 只采用 main 字段作为入口文件描述字段，以减少搜索步骤
    mainFields: ['main'],
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-comment">// 只采用 main 字段作为入口文件描述字段，以减少搜索步骤</span>
    mainFields: [<span class="hljs-string">'main'</span>],
  },
};</code></pre>
<blockquote>使用本方法优化时，你需要考虑到所有运行时依赖的第三方模块的入口文件描述字段，就算有一个模块搞错了都可能会造成构建出的代码无法正常运行。</blockquote>
<h2 id="articleHeader3">优化 resolve.alias 配置</h2>
<p>在<a href="http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-4Resolve.html#alias" rel="nofollow noreferrer" target="_blank">2-4 Resolve</a> 中介绍过 <code>resolve.alias</code> 配置项通过别名来把原导入路径映射成一个新的导入路径。</p>
<p>在实战项目中经常会依赖一些庞大的第三方模块，以 React 库为例，安装到 <code>node_modules</code> 目录下的 React 库的目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── dist
│&nbsp;&nbsp; ├── react.js
│&nbsp;&nbsp; └── react.min.js
├── lib
│&nbsp;&nbsp; ... 还有几十个文件被忽略
│&nbsp;&nbsp; ├── LinkedStateMixin.js
│&nbsp;&nbsp; ├── createClass.js
│&nbsp;&nbsp; └── React.js
├── package.json
└── react.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── dist
│&nbsp;&nbsp; ├── react<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── react<span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.js</span>
├── lib
│&nbsp;&nbsp; ... 还有几十个文件被忽略
│&nbsp;&nbsp; ├── LinkedStateMixin<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── createClass<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── React<span class="hljs-selector-class">.js</span>
├── package<span class="hljs-selector-class">.json</span>
└── react.js</code></pre>
<p>可以看到发布出去的 React 库中包含两套代码：</p>
<ul>
<li>一套是采用 CommonJS 规范的模块化代码，这些文件都放在 <code>lib</code> 目录下，以 <code>package.json</code> 中指定的入口文件 <code>react.js</code> 为模块的入口。</li>
<li>一套是把 React 所有相关的代码打包好的完整代码放到一个单独的文件中，这些代码没有采用模块化可以直接执行。其中 <code>dist/react.js</code> 是用于开发环境，里面包含检查和警告的代码。<code>dist/react.min.js</code> 是用于线上环境，被最小化了。</li>
</ul>
<p>默认情况下 Webpack 会从入口文件 <code>./node_modules/react/react.js</code> 开始递归的解析和处理依赖的几十个文件，这会时一个耗时的操作。<br>通过配置 <code>resolve.alias</code> 可以让 Webpack 在处理 React 库时，直接使用单独完整的 <code>react.min.js</code> 文件，从而跳过耗时的递归解析操作。</p>
<p>相关 Webpack 配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  resolve: {
    // 使用 alias 把导入 react 的语句换成直接使用单独完整的 react.min.js 文件，
    // 减少耗时的递归解析操作
    alias: {
      'react': path.resolve(__dirname, './node_modules/react/dist/react.min.js'),
    }
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-comment">// 使用 alias 把导入 react 的语句换成直接使用单独完整的 react.min.js 文件，</span>
    <span class="hljs-comment">// 减少耗时的递归解析操作</span>
    alias: {
      <span class="hljs-string">'react'</span>: path.resolve(__dirname, <span class="hljs-string">'./node_modules/react/dist/react.min.js'</span>),
    }
  },
};</code></pre>
<blockquote>除了 React 库外，大多数库发布到 Npm 仓库中时都会包含打包好的完整文件，对于这些库你也可以对它们配置 alias。<p>但是对于有些库使用本优化方法后会影响到后面要讲的<a href="http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-10%E4%BD%BF%E7%94%A8TreeShaking.html" rel="nofollow noreferrer" target="_blank">使用 Tree-Shaking 去除无效代码</a>的优化，因为打包好的完整文件中有部分代码你的项目可能永远用不上。<br>一般对整体性比较强的库采用本方法优化，因为完整文件中的代码是一个整体，每一行都是不可或缺的。<br>但是对于一些工具类的库，例如 <a href="https://github.com/lodash/lodash" rel="nofollow noreferrer" target="_blank">lodash</a>，你的项目可能只用到了其中几个工具函数，你就不能使用本方法去优化，因为这会导致你的输出代码中包含很多永远不会执行的代码。</p>
</blockquote>
<h2 id="articleHeader4">优化 resolve.extensions 配置</h2>
<p>在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试询问文件是否存在。<br>在<a href="http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-4Resolve.html#extensions" rel="nofollow noreferrer" target="_blank">2-4 Resolve</a> 中介绍过 <code>resolve.extensions</code> 用于配置在尝试过程中用到的后缀列表，默认是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="extensions: ['.js', '.json']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.json'</span>]</code></pre>
<p>也就是说当遇到 <code>require('./data')</code> 这样的导入语句时，Webpack 会先去寻找 <code>./data.js</code> 文件，如果该文件不存在就去寻找 <code>./data.json</code> 文件，如果还是找不到就报错。</p>
<p>如果这个列表越长，或者正确的后缀在越后面，就会造成尝试的次数越多，所以 <code>resolve.extensions</code> 的配置也会影响到构建的性能。<br>在配置 <code>resolve.extensions</code> 时你需要遵守以下几点，以做到尽可能的优化构建性能：</p>
<ul>
<li>后缀尝试列表要尽可能的小，不要把项目中不可能存在的情况写到后缀尝试列表中。</li>
<li>频率出现最高的文件后缀要优先放在最前面，以做到尽快的退出寻找过程。</li>
<li>在源码中写导入语句时，要尽可能的带上后缀，从而可以避免寻找过程。例如在你确定的情况下把 <code>require('./data')</code> 写成 <code>require('./data.json')</code>。</li>
</ul>
<p>相关 Webpack 配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  resolve: {
    // 尽可能的减少后缀尝试的可能性
    extensions: ['js'],
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-comment">// 尽可能的减少后缀尝试的可能性</span>
    extensions: [<span class="hljs-string">'js'</span>],
  },
};</code></pre>
<h2 id="articleHeader5">优化 module.noParse 配置</h2>
<p>在<a href="http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-3Module.html#noParse" rel="nofollow noreferrer" target="_blank">2-3 Module</a> 中介绍过 <code>module.noParse</code> 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析处理，这样做的好处是能提高构建性能。<br>原因是一些库，例如 jQuery 、ChartJS， 它们庞大又没有采用模块化标准，让 Webpack 去解析这些文件耗时又没有意义。</p>
<p>在上面的 <em>优化 resolve.alias 配置</em> 中讲到单独完整的 <code>react.min.js</code> 文件就没有采用模块化，让我们来通过配置 <code>module.noParse</code> 忽略对 <code>react.min.js</code> 文件的递归解析处理，<br>相关 Webpack 配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');

module.exports = {
  module: {
    // 独完整的 `react.min.js` 文件就没有采用模块化，忽略对 `react.min.js` 文件的递归解析处理
    noParse: [/react\.min\.js$/],
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-comment">// 独完整的 `react.min.js` 文件就没有采用模块化，忽略对 `react.min.js` 文件的递归解析处理</span>
    noParse: [<span class="hljs-regexp">/react\.min\.js$/</span>],
  },
};</code></pre>
<blockquote>注意被忽略掉的文件里不应该包含 <code>import</code> 、 <code>require</code> 、 <code>define</code> 等模块化语句，不然会导致构建出的代码中包含无法在浏览器环境下执行的模块化语句。</blockquote>
<hr>
<p>以上就是所有和缩小文件搜索范围相关的构建性能优化了，在根据自己项目的需要去按照以上方法改造后，你的构建速度一定会有所提升。</p>
<blockquote>本实例<a href="http://webpack.wuhaolin.cn/4-1" rel="nofollow noreferrer" target="_blank">提供项目完整代码</a>
</blockquote>
<p><a href="http://webpack.wuhaolin.cn/" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000012544051?w=1348&amp;h=845" src="https://static.alili.tech/img/remote/1460000012544051?w=1348&amp;h=845" alt="" title="" style="cursor: pointer; display: inline;"></span></a></p>
<p><a href="http://webpack.wuhaolin.cn/" rel="nofollow noreferrer" target="_blank">《深入浅出Webpack》全书在线阅读链接</a></p>
<p><a href="http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-1%E7%BC%A9%E5%B0%8F%E6%96%87%E4%BB%B6%E6%90%9C%E7%B4%A2%E8%8C%83%E5%9B%B4.html" rel="nofollow noreferrer" target="_blank">阅读原文</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
加速Webpack-缩小文件搜索范围

## 原文链接
[https://segmentfault.com/a/1190000012565948](https://segmentfault.com/a/1190000012565948)


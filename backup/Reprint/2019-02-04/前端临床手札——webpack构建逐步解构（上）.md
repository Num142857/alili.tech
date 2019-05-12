---
title: '前端临床手札——webpack构建逐步解构（上）' 
date: 2019-02-04 2:30:58
hidden: true
slug: qtv4tolsale
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>由于博主最近又闲下来了，之前觉得webpack的官方文档比较难啃一直放到现在。细心阅读多个webpack配置案例后觉得还是得自己写个手脚架，当然这个案例是基于vue的，但是并不影响你使用其他库（jquery这些）。文章会逐步分析每个处理的用意（当然是博主自己的理解），不足之处欢迎指出沟通交流。</p>
<h1 id="articleHeader1">案例</h1>
<p>一个通用简单的手脚架，只需修改简单配置就可使用，同时满足多页面需求。</p>
<blockquote><p><a href="https://github.com/lpreterite/multiple-page-vue-webpack-example" rel="nofollow noreferrer" target="_blank">multiple-page-vue-webpack-example</a></p></blockquote>
<p><strong>最近添加了雪碧图功能，并把<code>sass-loader</code>替换成<code>postcss</code>的<code>press</code>，详细可以看分支<code>develop</code></strong></p>
<h2 id="articleHeader2">使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装依赖
$ npm i

# 运行本地服务，访问 http://localhost:6002 进行开发调试
$ npm run dev

# 构建发行版本到./dist目录
$ npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-comment"># 安装依赖</span>
$ npm i

<span class="hljs-comment"># 运行本地服务，访问 http://localhost:6002 进行开发调试</span>
$ npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span>
<span class="hljs-comment"># 构建发行版本到./dist目录</span>
$ npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<h2 id="articleHeader3">目录结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="build/         #构建配置目录
src/           #源代码目录
    clients/   #入口文件
    imports/   #js代码目录，此为js引入的root目录
    styles/    #全局样式目录
    templates/ #页面模板文件（建议和入口文件名字对应）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code>build/         <span class="hljs-meta">#构建配置目录</span>
src/           <span class="hljs-meta">#源代码目录</span>
    clients/   <span class="hljs-meta">#入口文件</span>
    <span class="hljs-keyword">imports</span>/   <span class="hljs-meta">#js代码目录，此为js引入的root目录</span>
    styles/    <span class="hljs-meta">#全局样式目录</span>
    templates/ <span class="hljs-meta">#页面模板文件（建议和入口文件名字对应）</span></code></pre>
<h1 id="articleHeader4">分析案例</h1>
<p>乍看案例<code>build</code>目录下代码挺多的，而且很多刚入手webpack的人都会瞬间懵逼。但是如果逐步分析理解后就会发觉其实还挺简单易懂，下面先介绍一下每个文件作用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/build
    build.js               #构建生产代码
    config.js              #配置
    dev-client.js 
    dev-server.js          #执行本地服务器
    utils.js               #额外的通用方法
    webpack.base.conf.js   #默认的webpack配置
    webpack.dev.conf.js    #本地开发的webpack配置
    webpack.prod.conf.js   #构建生产的webpack配置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>/build
    build<span class="hljs-selector-class">.js</span>               #构建生产代码
    config<span class="hljs-selector-class">.js</span>              #配置
    dev-client<span class="hljs-selector-class">.js</span> 
    dev-server<span class="hljs-selector-class">.js</span>          #执行本地服务器
    utils<span class="hljs-selector-class">.js</span>               #额外的通用方法
    webpack<span class="hljs-selector-class">.base</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>   #默认的webpack配置
    webpack<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>    #本地开发的webpack配置
    webpack<span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>   #构建生产的webpack配置</code></pre>
<h2 id="articleHeader5">工作流程</h2>
<p><span class="img-wrap"><img data-src="/img/bVCT2m?w=793&amp;h=410" src="https://static.alili.tech/img/bVCT2m?w=793&amp;h=410" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">本地测试</h3>
<p>结合上面流程图和<code>build</code>目录下的文件介绍能看出主要webpack本地测试建立在<code>webpack</code>和<code>express</code>两个工具上面。</p>
<p>首先我们执行下面代码，能得到一个测试服务器，并能在浏览器预览到我们的代码效果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>打开<code>package.json</code> 找到<code>scripts</code>能看到实际执行的是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node build/dev-server.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-keyword">node</span> <span class="hljs-title">build</span>/dev-server.js</code></pre>
<p>接下来就先从<a href="https://github.com/lpreterite/multiple-page-vue-webpack-example/blob/master/build/dev-server.js" rel="nofollow noreferrer" target="_blank">dev-server.js</a>开始分析</p>
<p>打开<code>dev-server.js</code>能看到引用这些核心依赖</p>
<ol>
<li><p>./config</p></li>
<li><p>./webpack.dev.conf</p></li>
<li><p>webpack</p></li>
<li><p>express</p></li>
<li><p>webpack-dev-middleware</p></li>
<li><p>webpack-hot-middleware</p></li>
<li><p>connect-history-api-fallback</p></li>
</ol>
<p>前两个是配置文件，<code>webpack</code>和<code>express</code>就不用多说了，主要看剩下那三个。</p>
<h4>webpack-dev-middleware</h4>
<p><code>webpack-dev-middleware</code> 是一个结合了<code>webpack</code>配置的<code>express</code>中间件插件(不熟悉<code>express</code>的可以看<a href="http://expressjs.com/zh-cn/guide/using-middleware.html" rel="nofollow noreferrer" target="_blank">这里</a>)，哪他都干了些什么呢？<a href="https://github.com/webpack/webpack-dev-middleware#what-is-it" rel="nofollow noreferrer" target="_blank">官方文档</a>是这样说的：</p>
<ul>
<li><p>这是一个简单webpack中间件。它提供一个连接服务器并处理访问webpack中的文件。</p></li>
<li><p>webpack中的文件寄存在内存，不会生成文件。</p></li>
<li><p>如果在观测模式下修改的文件，中间件不再提供旧包，但会延迟请求，直到编译完成，在文件变化后页面刷新之前你无需等待。</p></li>
</ul>
<p>简单来说就是提供一个可以让你访问经过webpack处理后的服务，然后看一下<code>dev-server.js</code>下这块的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/', 
  stats: {
    colors: true,
    chunks: false
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">compiler</span> <span class="hljs-string">=</span> <span class="hljs-string">webpack(webpackConfig)</span>

<span class="hljs-string">const</span> <span class="hljs-string">devMiddleware</span> <span class="hljs-string">=</span> <span class="hljs-string">require('webpack-dev-middleware')(compiler,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  publicPath:</span> <span class="hljs-string">'/'</span><span class="hljs-string">,</span> 
<span class="hljs-attr">  stats:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    colors:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    chunks:</span> <span class="hljs-literal">false</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">})</span></code></pre>
<p><code>compiler</code>就是webpack实例，然后这里的说明一下<code>publicPath</code>其实是访问的目录根，如果改为<code>/app/</code>那么你访问的地址就必须是<code>http://localhost:6002/app/index.html</code>。</p>
<h4>webpack-hot-middleware</h4>
<p>使用它的目的是让代码变化时能更新代码而无需刷新整个页面，但是这块配置就较为繁琐。除了需要在<code>express</code>挂载这个中间件之外还得修改<code>webpack</code>配置。</p>
<p>首先得在每个入口前加上<code>webpack-hot-middleware/client</code>，还需要添加一下<code>plugin</code>到<code>webpack</code>配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这块由于是多入口处理有点不同，后续解析多入口问题和为何使用'./build/dev-client'而不是'webpack-hot-middleware/client'
Object.keys(webpackConfig.entry).forEach(function (name) {
  webpackConfig.entry[name] = ['./build/dev-client'].concat(webpackConfig.entry[name])
})

plugins: [
    ...
    // webpack 1.0
    new webpack.optimize.OccurrenceOrderPlugin(),
    // webpack 2.0
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
    ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// 这块由于是多入口处理有点不同，后续解析多入口问题和为何使用'./build/dev-client'而不是'webpack-hot-middleware/client'</span>
Object.keys(webpackConfig.entry).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> </span>(name) {
  webpackConfig.entry[name] = [<span class="hljs-string">'./build/dev-client'</span>].concat(webpackConfig.entry[name])
})

plugins: <span class="hljs-type"></span>[
    ...
    <span class="hljs-comment">// webpack 1.0</span>
    <span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.optimize.OccurrenceOrderPlugin(),
    <span class="hljs-comment">// webpack 2.0</span>
    <span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.HotModuleReplacementPlugin(),
    <span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.NoErrorsPlugin()
    ...
]</code></pre>
<p>看到这类估计你会有所疑问，为何入口加上的是<code>./build/dev-client</code>而不是<code>webpack-hot-middleware/client</code>？因为这里由于使用了<code>html-webpack-plugin</code>而当修改了html我们需要它整个页面刷新，而写了个简单的处理，具体可以看<a href="https://github.com/lpreterite/multiple-page-vue-webpack-example/blob/master/build/dev-client.js" rel="nofollow noreferrer" target="_blank">dev-client.js</a>，至于其他配置细节可以看<a href="https://github.com/glenjamin/webpack-hot-middleware#config" rel="nofollow noreferrer" target="_blank">官方文档</a>。</p>
<h4>connect-history-api-fallback</h4>
<p>这个不多说一笔带过，就是让你的单页面路由处理更自然（比如vue-router的mode设置为html5时），具体看<a href="https://github.com/bripkens/connect-history-api-fallback" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<h4>关于多页面处理</h4>
<p>这里页面处理使用了<code>html-webpack-plugin</code>插件处理，至于配置需要看三个地方，首先是入口配置<a href="https://github.com/lpreterite/multiple-page-vue-webpack-example/blob/master/build/webpack.base.conf.js#L12" rel="nofollow noreferrer" target="_blank">webpack.base.conf.js</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let webpackConfig = {
    entry: utils.getEntry(config.entry),
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs roboconf"><code>let webpackConfig = {
    <span class="hljs-attribute">entry</span>: utils<span class="hljs-variable">.getEntry</span>(config<span class="hljs-variable">.entry</span>),
    ...
}</code></pre>
<p>由于使用固定目录结构的关系，原理就是把<code>src/clients/</code>目录下的文件都视为入口文件加载到配置。</p>
<p>还有模板处理<a href="https://github.com/lpreterite/multiple-page-vue-webpack-example/blob/master/build/webpack.dev.conf.js#L34" rel="nofollow noreferrer" target="_blank">webpack.dev.conf.js</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackConfig.plugins = [].concat(webpackConfig.plugins, utils.htmlLoaders(config.template, webpackConfig.entry))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">webpackConfig<span class="hljs-selector-class">.plugins</span> = [].concat(webpackConfig<span class="hljs-selector-class">.plugins</span>, utils.htmlLoaders(config<span class="hljs-selector-class">.template</span>, webpackConfig.entry))</code></pre>
<p>模板处理也是一样，这里建立与一个潜规则：<strong>入口文件必须和模板文件的目录结构和名字一致</strong>。</p>
<p>在这样的条件下，多页面处理就简单很多了，具体细节可看<a href="https://github.com/lpreterite/multiple-page-vue-webpack-example/blob/master/build/utils.js#L65" rel="nofollow noreferrer" target="_blank"><code>utils@getEntry()</code></a>和<a href="https://github.com/lpreterite/multiple-page-vue-webpack-example/blob/master/build/utils.js#L86" rel="nofollow noreferrer" target="_blank"><code>utils@htmlLoaders()</code></a>。关于<code>html-webpack-plugin</code>配置细节可看<a href="https://github.com/ampedandwired/html-webpack-plugin#configuration" rel="nofollow noreferrer" target="_blank">官方文档</a>。</p>
<p>后续将会补上构建生产的配置分析，<em>案例参考：vue-cli</em>。</p>
<blockquote><p><a href="https://segmentfault.com/a/1190000006863919">前端临床手札——webpack构建逐步解构（下）</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端临床手札——webpack构建逐步解构（上）

## 原文链接
[https://segmentfault.com/a/1190000006851575](https://segmentfault.com/a/1190000006851575)


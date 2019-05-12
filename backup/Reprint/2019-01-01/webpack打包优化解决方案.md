---
title: 'webpack打包优化解决方案' 
date: 2019-01-01 2:30:07
hidden: true
slug: p8broa3cpca
categories: [reprint]
---

{{< raw >}}

                    
<p>单页应用首次进入项目会获取一部分数据，之后将JS包分片，走到那块再去加载那块的JS。<br>这样跨页面重复的JS，CSS不必再去获取，跨页面就不会出现进度条。这样减少了等待时间，提升了用户体验，省去了不必要的流量。<br>但是单页应用也有一个显著的问题：首次进入的时候，加载的资源太多，白屏时间太长。</p>
<p>这里介绍一些常用的webpack打包优化解决方案</p>
<ol>
<li>使用插件查看项目所有包及体积大小</li>
<li>webpack外部扩展</li>
<li>DLL方式</li>
</ol>
<h1 id="articleHeader0">一、查看项目打包</h1>
<p>webpack有个插件，可以查看项目一共打了多少包，每个包的体积，每个包里面的包情况。<br>首先下载插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm intall webpack-bundle-analyzer --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm intall webpack-bundle-analyzer --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>同时在webpack.config.js配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

webpackConfig.plugins.push(new BundleAnalyzerPlugin());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> BundleAnalyzerPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-bundle-analyzer'</span>).BundleAnalyzerPlugin;

webpackConfig.plugins.push(<span class="hljs-keyword">new</span> BundleAnalyzerPlugin());</code></pre>
<p>在package.json中添加命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="“script”: {
    &quot;analyz&quot;: &quot;NODE_ENV=production npm_config_report=true npm run deploy:prod&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>“<span class="hljs-keyword">script</span>”: {
    <span class="hljs-string">"analyz"</span>: <span class="hljs-string">"NODE_ENV=production npm_config_report=true npm run deploy:prod"</span>
}</code></pre>
<p>我的webpack是1.X的 webpack 2.X的同学<a href="http://www.css88.com/doc/webpack2/api/cli/" rel="nofollow noreferrer" target="_blank">请看</a></p>
<p>然后命令行输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run analyz " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> analyz </span></code></pre>
<p>开始构建，根据项目大小不同，时间也不同。<br>过一会输出结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVUTE3?w=2870&amp;h=1648" src="https://static.alili.tech/img/bVUTE3?w=2870&amp;h=1648" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以清晰的看到项目中一共有多少个包，包的体积是多少，里面加载了哪些东西，大小是多少。<br>这里演示的是一个干净的demo，打的包很少，体积也都很小，在真正项目中可能截图如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVUTE6?w=1917&amp;h=1007" src="https://static.alili.tech/img/bVUTE6?w=1917&amp;h=1007" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>可以看到五颜六色的十分好看。<br>这里面 app.js 和 vendor.js是项目的主文件，其中包含了少部分业务代码和大部分公共依赖。<br>剩余的 number.hash.chunk.js是业务分片的代码，其中包含了大部分业务代码和少部分公共依赖。<br>到这里，我们就是用工具完成对项目打包的展示。</p>
<h1 id="articleHeader1">二、webpack外部扩展</h1>
<p>列出了项目中较大的包，剩下的事情就是想办法如何减小这些包的体积（将一个大包拆成多个小包）。<br>项目中产生较大的包的原因可以从两个方面去考虑：</p>
<ol>
<li>项目中引入的依赖包过于庞大；</li>
<li>业务代码集中在一块写，或者是业务代码写的比较繁琐；</li>
</ol>
<p>对于这两个问题，我们可以从两个方面着手解决：</p>
<ol>
<li>抽离项目中公共依赖的、不常变动的、体积较大的包；</li>
<li>将一个较大的业务代码文件，拆成多个较小的文件，异步加载（或者优化业务代码）。</li>
</ol>
<p>这里面第二项涉及到改动业务代码，具体的情况就不同了，适合查看 如何优化JS代码。<br>我们来讨论第一种方法，在不改动业务代码的情况下，如何减小公共依赖。</p>
<p>要知道这些依赖是我们需要的，不可能排除不引入。<br>但是他们都是全局依赖的，万年不变的，可以使用浏览器自己的缓存来实现不重复加载。<br>具体做法就是：<br>将项目中需要的一些公共依赖包，并且不常变动的，单独取出，不再每次都打包编译（如React，Redux等）。<br>而是通过使用script标签形式cdn引入，这样在有缓存的情况下，这些资源均走缓存，不必加载。</p>
<p>具体做法：</p>
<h2 id="articleHeader2">总结需要抽离的公共依赖。</h2>
<p>这些依赖需要满足一定的条件：</p>
<ol>
<li>体积较大；</li>
<li>不常更新；</li>
<li>依赖较多；</li>
<li>是前置依赖；</li>
</ol>
<p>常见的满足这类条件的包有：</p>
<ol>
<li>react</li>
<li>react-dom</li>
<li>redux</li>
<li>react-redux</li>
<li>moment</li>
<li>jquery</li>
</ol>
<p>另外一些包文件如 Antd库文件，整个包较大，但是每次用什么取什么的话，库文件也会按需加载，不必单独取出。<br>还有这类库文件不建议单独取出，因为里面可能会有bug，需要更新。</p>
<h2 id="articleHeader3">使用CDN引入资源</h2>
<p>以我的demo为例：我需要抽离出的文件有 react，react-dom，react-router，redux，react-redux，history。<br>将这些文件放到cnd上，注意，这些文件要是压缩版本，并且是用ES5编写的，否则浏览器报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
  <title>React Starter Kit</title>
  <meta charset=&quot;utf-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;>
  <!-- 体积较大的包 -->
  <script src=&quot;https://cdn.bootcss.com/react/15.0.0/react-with-addons.min.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/react/15.0.0/react-dom.min.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/react-router/3.0.0/ReactRouter.min.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/redux/3.6.0/redux.min.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/react-redux/5.0.1/react-redux.min.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/history/4.5.0/history.min.js&quot;></script>
</head>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>React Starter Kit<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1"</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 体积较大的包 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/react/15.0.0/react-with-addons.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/react/15.0.0/react-dom.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/react-router/3.0.0/ReactRouter.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/redux/3.6.0/redux.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/react-redux/5.0.1/react-redux.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/history/4.5.0/history.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></code></pre>
<h2 id="articleHeader4">配置webpack.conf.js</h2>
<p>资源已经引入，接下来需要配置webpack，使其打包的时候不在将这些资源打包。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpackConfig = {
    name: 'client',
    target: 'web',
    devtool: config.compiler_devtool,
    resolve: {
        root: paths.client(),
        extensions: ['', '.js', '.jsx', '.json'],
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouter',
        'redux': 'Redux',
        'history': 'History'
    },
    module: {},
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>const webpackConfig = {
    name: <span class="hljs-string">'client'</span>,
    targe<span class="hljs-variable">t:</span> <span class="hljs-string">'web'</span>,
    devtoo<span class="hljs-variable">l:</span> config.compiler_devtool,
    <span class="hljs-built_in">resolve</span>: {
        roo<span class="hljs-variable">t:</span> paths.client(),
        extension<span class="hljs-variable">s:</span> [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.jsx'</span>, <span class="hljs-string">'.json'</span>],
    },
    external<span class="hljs-variable">s:</span> {
        <span class="hljs-string">'react'</span>: <span class="hljs-string">'React'</span>,
        <span class="hljs-string">'react-dom'</span>: <span class="hljs-string">'ReactDOM'</span>,
        <span class="hljs-string">'react-router'</span>: <span class="hljs-string">'ReactRouter'</span>,
        <span class="hljs-string">'redux'</span>: <span class="hljs-string">'Redux'</span>,
        <span class="hljs-string">'history'</span>: <span class="hljs-string">'History'</span>
    },
    module: {},
}</code></pre>
<p>这里externals告诉webpack那些资源从哪里寻找。<br>该对象的键表示 require 或者 import 时候的字符串<br>值表示的当前环境下的变量，比如引入React之后，React被作为全局对象，webpack就回去寻找React对象。<br>如果其中有一个找不到，打包就会失败。</p>
<h2 id="articleHeader5">配置vendor.js</h2>
<p>接下来配置vendor，使vendor也不打包该些JS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="compiler_vendors : [
    // 'react',
    // 'react-redux',
    // 'react-router',
    // 'redux',
]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>compiler_vendors : [
    <span class="hljs-regexp">//</span> <span class="hljs-string">'react'</span>,
    <span class="hljs-regexp">//</span> <span class="hljs-string">'react-redux'</span>,
    <span class="hljs-regexp">//</span> <span class="hljs-string">'react-router'</span>,
    <span class="hljs-regexp">//</span> <span class="hljs-string">'redux'</span>,
],</code></pre>
<p>接下来再次运行 <code>npm run analyz</code></p>
<p><span class="img-wrap"><img data-src="/img/bVUTFR?w=1916&amp;h=1007" src="https://static.alili.tech/img/bVUTFR?w=1916&amp;h=1007" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>对比第一次的效果图，很明显app.js由原来的625kb减少到了78kb，<br>原来第二大的vendor.js现在已经很小了。<br>但是要注意的是，并不是包越小越好，越小的包反而越耗费链接。<br>应该让你的包里面的业务代码占大多数。<br>后来被告知，最大的包的体积压缩之后80k以内就可以。</p>
<h1 id="articleHeader6">三、DLL方式</h1>
<p>dll 全称是：dynamic link library（动态链接库）<br>dll方式也就是通过配置，告诉webpack指定库在项目中的位置，从而直接引入，不将其打包在内。<br>上面介绍的方式是将包放到cdn上，build的时候不在引入对应的包；<br>dll方式就是指定包在项目中，build的时候不在打包对应的包，使用的时候引入。<br><code>webpack</code>通过<code>webpack.DllPlugin</code>与<code>webpack.DllReferencePlugin</code>两个内嵌插件实现此功能。</p>
<h2 id="articleHeader7">新建webpack.dll.config.js</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');

module.exports = {
    entry: {
        bundle: [
            'react',
            'react-dom',
            //其他库
            ],
    },
    output: {
        path: './build',
        filename: '[name].js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: './build/bundle.manifest.json',
            name: '[name]_library',
        })
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> webpack = require(<span class="hljs-string">'webpack'</span>);

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    entry: {
        bundle: [
            <span class="hljs-string">'react'</span>,
            <span class="hljs-string">'react-dom'</span>,
            <span class="hljs-comment">//其他库</span>
            ],
    },
    output: {
        path: <span class="hljs-string">'./build'</span>,
        filename: <span class="hljs-string">'[name].js'</span>,
        library: <span class="hljs-string">'[name]_library'</span>
    },
    plugins: [
        <span class="hljs-keyword">new</span> webpack.DllPlugin({
            path: <span class="hljs-string">'./build/bundle.manifest.json'</span>,
            name: <span class="hljs-string">'[name]_library'</span>,
        })
    ]
};</code></pre>
<p>webpack.DllPlugin选项：</p>
<ul>
<li>path：manifest.json文件的输出路径，这个文件会用于后续的业务代码打包；</li>
<li>name：dll暴露的对象名，要跟output.library保持一致;</li>
<li>context：解析包路径的上下文，这个要跟接下来配置的 webpack.config.js 一致。</li>
</ul>
<h2 id="articleHeader8">运行文件</h2>
<p>运行：<code>webpack --config webpack.dll.config.js</code></p>
<p>生成两个文件，一个是打包好的bundlejs，另外一个是bundle.mainifest.json，大致内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;bundle_library&quot;,
  &quot;content&quot;: {
    &quot;./node_modules/react/react.js&quot;: 1,
    &quot;./node_modules/react/lib/React.js&quot;: 2,
    &quot;./node_modules/process/browser.js&quot;: 3,
    &quot;./node_modules/object-assign/index.js&quot;: 4,
    &quot;./node_modules/react/lib/ReactChildren.js&quot;: 5,
    &quot;./node_modules/react/lib/PooledClass.js&quot;: 6,
    &quot;./node_modules/react/lib/reactProdInvariant.js&quot;: 7,
    //其他引用
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"bundle_library"</span>,
  <span class="hljs-string">"content"</span>: {
    <span class="hljs-string">"./node_modules/react/react.js"</span>: <span class="hljs-number">1</span>,
    <span class="hljs-string">"./node_modules/react/lib/React.js"</span>: <span class="hljs-number">2</span>,
    <span class="hljs-string">"./node_modules/process/browser.js"</span>: <span class="hljs-number">3</span>,
    <span class="hljs-string">"./node_modules/object-assign/index.js"</span>: <span class="hljs-number">4</span>,
    <span class="hljs-string">"./node_modules/react/lib/ReactChildren.js"</span>: <span class="hljs-number">5</span>,
    <span class="hljs-string">"./node_modules/react/lib/PooledClass.js"</span>: <span class="hljs-number">6</span>,
    <span class="hljs-string">"./node_modules/react/lib/reactProdInvariant.js"</span>: <span class="hljs-number">7</span>,
    <span class="hljs-comment">//其他引用</span>
}</code></pre>
<h2 id="articleHeader9">配置webpack.config.js</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: {
    main: './main.js',
  },
  output: {
    path: path.join(__dirname, &quot;build&quot;),
    publicPath: './',
    filename: '[name].js'
  },
  module: {
    loaders:[
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader?presets[]=es2015&amp;presets[]=react'],
        include: path.join(__dirname, '.')
      }
    ]
  },
  plugins: [
     new webpack.DllReferencePlugin({
      context: '.',
      manifest: require(&quot;./build/bundle.manifest.json&quot;),
        }),
  ]
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-built_in">module</span>.exports = {
  entry: {
    main: <span class="hljs-string">'./main.js'</span>,
  },
  output: {
    path: path.join(__dirname, <span class="hljs-string">"build"</span>),
    publicPath: <span class="hljs-string">'./'</span>,
    filename: <span class="hljs-string">'[name].js'</span>
  },
  <span class="hljs-keyword">module</span>: {
    loaders:[
      { test: <span class="hljs-regexp">/\.(png|jpg)$/</span>, loader: <span class="hljs-string">'url-loader?limit=8192'</span>},
      {
        test: <span class="hljs-regexp">/\.jsx?$/</span>,
        loaders: [<span class="hljs-string">'babel-loader?presets[]=es2015&amp;presets[]=react'</span>],
        include: path.join(__dirname, <span class="hljs-string">'.'</span>)
      }
    ]
  },
  plugins: [
     <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
      context: <span class="hljs-string">'.'</span>,
      manifest: <span class="hljs-built_in">require</span>(<span class="hljs-string">"./build/bundle.manifest.json"</span>),
        }),
  ]
};
</code></pre>
<p>webpack.DllReferencePlugin的选项中：</p>
<ul>
<li>context：需要跟之前保持一致，这个用来指导webpack匹配manifest.json中库的路径；</li>
<li>manifest：用来引入刚才输出的manifest.json文件。</li>
</ul>
<p>参考链接：</p>
<ol>
<li><a href="http://www.jianshu.com/p/ce95b259b45e" rel="nofollow noreferrer" target="_blank">层层优化webpack打包体积</a></li>
<li><a href="https://github.com/youngwind/blog/issues/65" rel="nofollow noreferrer" target="_blank">webpack打包bundle.js体积大小优化</a></li>
<li><a href="https://github.com/eyasliu/blog/issues/8" rel="nofollow noreferrer" target="_blank">webpack 按需打包加载</a></li>
<li><a href="https://github.com/chenchunyong/webpack-dllPlugin" rel="nofollow noreferrer" target="_blank">webpack dllPlugin 使用</a></li>
</ol>
<p><a href="https://github.com/Aus0049/react-redux-demo" rel="nofollow noreferrer" target="_blank">完整的项目demo</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack打包优化解决方案

## 原文链接
[https://segmentfault.com/a/1190000011138081](https://segmentfault.com/a/1190000011138081)


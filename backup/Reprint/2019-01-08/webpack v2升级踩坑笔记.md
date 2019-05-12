---
title: 'webpack v2升级踩坑笔记' 
date: 2019-01-08 2:30:11
hidden: true
slug: wwwd0ukjont
categories: [reprint]
---

{{< raw >}}

                    
<p>从Grunt-&gt;gulp-&gt;webpack,再到目前当红明星<a href="https://rollupjs.org/" rel="nofollow noreferrer" target="_blank">rollup</a>，前端模块打包技术日新月异，webpack在今年1月份和6月份左右接连更新了v2和v3版本,为了减少冗余模块，缩减bundle文件大小，webpack v2中也加入了tree-shacking,关于tree-shacking的特征，可以查看知乎<a href="https://www.zhihu.com/question/41922432" rel="nofollow noreferrer" target="_blank">如何评价 Webpack 2 新引入的 Tree-shaking 代码优化技术？</a>的讨论。</p>
<p>webpack在推出 v2之后迅速推出了v3版本，前段时间在知乎看到webpack<a href="https://segmentfault.com/u/thelarkinn">作者LarkInn(他已经入驻sf)</a>说后续会维持一个更快、一致和更稳定的发布周期<a href="https://www.zhihu.com/question/61533563" rel="nofollow noreferrer" target="_blank">点这</a>，难道要步Angular的后尘，作为吃瓜群众表示很震惊，因为目前自己这边项目webpack还停留在1.x版本，鉴于减少日后升级难度的想法，包括后续要做代码和流程优化，我将webpack升级到了v2版本，在这主要想把这个升级过程遇到的一些问题分享出来，也方便大家踩坑。</p>
<h5>1. 更新版本号</h5>
<p>我能想到最简单粗暴的做法就是直接把版本号改了下载新包看下会发生什么。使用<em>npm info webpack</em>查看了一下版本的发布信息，我更新到2.6.1版本，也是3.0前的最后一个版本，<br>期待一大堆报错，很尴尬，发现webpack仍然使用1.x版本工作，也就是说包并没有更新到，查了一下发现可能缓存造成的，使用<em>npm cache clean</em>但貌似也不管用，索性直接把node_module删除了，重新安装了一下模块，打包，果然报错了：</p>
<h5>2.resolve变更</h5>
<p>报错信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="throw new WebpackOptionsValidationError  
configuration.resolve.extensions[0] should not be empty
...    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> WebpackOptionsValidationError  
configuration.<span class="hljs-built_in">resolve</span>.extensions[<span class="hljs-number">0</span>] should not <span class="hljs-keyword">be</span> <span class="hljs-built_in">empty</span>
...    </code></pre>
<p>提示是resolve.extensions写法有问题，查看了一下<a href="https://webpack.js.org/configuration/resolve/" rel="nofollow noreferrer" target="_blank">extensions文档</a></p>
<blockquote><p><em>This option no longer requires passing an empty string.</em> 不再支持空字符的写法了。</p></blockquote>
<p>webpack1.x写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    resolve: {
        root: ....
        extensions: ['', '.js', '.jsx', '.json']
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    resolve: {
        <span class="hljs-attr">root</span>: ....
        extensions: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.jsx'</span>, <span class="hljs-string">'.json'</span>]
    },</code></pre>
<p>webpack2写法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    resolve: {
        root: ....
        extensions: ['*', '.js', '.jsx', '.json']
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    resolve: {
        <span class="hljs-attr">root</span>: ....
        extensions: [<span class="hljs-string">'*'</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.jsx'</span>, <span class="hljs-string">'.json'</span>]
    },</code></pre>
<p>报错信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="configuration.resolve has an unknown property 'root'. These properties are valid:
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>configuration.resolve has an unknown <span class="hljs-keyword">property</span><span class="hljs-title"> </span>'root'. These properties are valid:
...</code></pre>
<p>原来root写法也变了,root放在modules里了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    resolve: {
        modules: [
            path.resolve(__dirname, 'src'), 'node_modules'
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-tag">resolve</span>: {
        <span class="hljs-attribute">modules</span>: [
            path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'src'</span>), <span class="hljs-string">'node_modules'</span>
        ]
    }
}</code></pre>
<h5>3.loaders =&gt; rules</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" configuration.module.rules[0].use should be one of these: ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"> configuration<span class="hljs-selector-class">.module</span><span class="hljs-selector-class">.rules</span>[<span class="hljs-number">0</span>]<span class="hljs-selector-class">.use</span> should be one of these: ...</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010186852" src="https://static.alili.tech/img/remote/1460000010186852" alt="webpack2-loader-error" title="webpack2-loader-error" style="cursor: pointer;"></span></p>
<p>接下来应该就是一堆loader写法有问题，loader已经全部改成了rules的写法，并且为了更加严谨？之前省略的loader后缀也得加上。由于webpack2会自动给加载json文件，所以json-loader也就不再需要了，查看<a href="https://webpack.js.org/guides/migrating/" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p>webpack1.x写法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackConfig.module.loaders = [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: ''
}, {
    test: /\.json$/,
    loader: 'json'
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>webpackConfig.<span class="hljs-built_in">module</span>.loaders = [{
    test: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
    exclude: <span class="hljs-regexp">/node_modules/</span>,
    loader: <span class="hljs-string">'babel'</span>,
    query: <span class="hljs-string">''</span>
}, {
    test: <span class="hljs-regexp">/\.json$/</span>,
    loader: <span class="hljs-string">'json'</span>
}]</code></pre>
<p>webpack2.x写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackConfig.module.loaders = [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [{
        loader: 'babel-loader',
        query: {
            cacheDirectory: true,
            plugins: [..plugins],
            presets: [..presets]
        }
    }]
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">webpackConfig.module.loaders</span> <span class="hljs-string">=</span> <span class="hljs-string">[{</span>
<span class="hljs-attr">    test:</span> <span class="hljs-string">/\.(js|jsx)$/,</span>
<span class="hljs-attr">    exclude:</span> <span class="hljs-string">/node_modules/,</span>
<span class="hljs-attr">    use:</span> <span class="hljs-string">[{</span>
<span class="hljs-attr">        loader:</span> <span class="hljs-string">'babel-loader'</span><span class="hljs-string">,</span>
<span class="hljs-attr">        query:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            cacheDirectory:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">            plugins:</span> <span class="hljs-string">[..plugins],</span>
<span class="hljs-attr">            presets:</span> <span class="hljs-string">[..presets]</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}]</span>
<span class="hljs-string">}]</span></code></pre>
<p>css-loader，style-loader的配置：</p>
<p>webpack1.x写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackConfig.module.loaders.push({
    test: /\.css$/,
    exclude: null,
    loaders: [
        'style',
        'css?modules&amp;importLoaders=1&amp;sourceMap&amp;minimize',
        'postcss?pack=default'
    ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">webpackConfig</span><span class="hljs-selector-class">.module</span><span class="hljs-selector-class">.loaders</span><span class="hljs-selector-class">.push</span>({
    <span class="hljs-attribute">test</span>: /\.css$/,
    exclude: null,
    loaders: [
        <span class="hljs-string">'style'</span>,
        <span class="hljs-string">'css?modules&amp;importLoaders=1&amp;sourceMap&amp;minimize'</span>,
        <span class="hljs-string">'postcss?pack=default'</span>
    ]
})</code></pre>
<p>webpack2.x写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackConfig.module.rules.push({
    test: /\.css$/,
    exclude: null,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            opitions: {
                modules: true,
                sourceMap: true,
                minimize: true,
                importLoaders: 1
            }
        },
        'postcss-loader'
    ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">webpackConfig.module.rules.push({</span>
<span class="hljs-attr">    test:</span> <span class="hljs-string">/\.css$/,</span>
<span class="hljs-attr">    exclude:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">    use:</span> <span class="hljs-string">[</span>
        <span class="hljs-string">'style-loader'</span><span class="hljs-string">,</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">            loader:</span> <span class="hljs-string">'css-loader'</span><span class="hljs-string">,</span>
<span class="hljs-attr">            opitions:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                modules:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">                sourceMap:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">                minimize:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">                importLoaders:</span> <span class="hljs-number">1</span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">},</span>
        <span class="hljs-string">'postcss-loader'</span>
    <span class="hljs-string">]</span>
<span class="hljs-string">})</span></code></pre>
<p>==注意==  这里css-loder的minimize默认是不开启的，建议开启压缩可以缩小文件大小。babel-loader的cacheDirectory开启缓存可以加速编译过程。</p>
<h5>4.<a href="https://github.com/webpack-contrib/extract-text-webpack-plugin" rel="nofollow noreferrer" target="_blank">extract-text-webpack-plugin</a>
</h5>
<p>修改原来的ExtractTextPlugin插件配置，对css文件进行处理，发现报如下错误：</p>
<p>报错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" throw new Error(&quot;Chunk.entry was removed. Use hasRuntime()&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Error</span>(<span class="hljs-string">"Chunk.entry was removed. Use hasRuntime()"</span>);</code></pre>
<p>google了一下发现是当前版本(1.0.1)已经不适用， 升级到2.0。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
webpackConfig.module.rules.push({
    test: /\.css$/,
    use: extractText.extract({
        use:[
        { loader: 'style-loader' },
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                minimize: true,
                importLoaders: 1,
                modules: true
            }
        },
        { loader: 'postcss-loader' }
    ] })
})

const extractText = new ExtractTextPlugin({
  filename: 'styles/[name].[contenthash].css',
  allChunks: true,
  disable: __DEV__
})

webpackConfig.plugins.push(extractStyles)

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code>
<span class="hljs-string">webpackConfig.module.rules.push({</span>
<span class="hljs-attr">    test:</span> <span class="hljs-string">/\.css$/,</span>
<span class="hljs-attr">    use:</span> <span class="hljs-string">extractText.extract({</span>
<span class="hljs-attr">        use:</span><span class="hljs-string">[</span>
        <span class="hljs-string">{</span> <span class="hljs-attr">loader:</span> <span class="hljs-string">'style-loader'</span> <span class="hljs-string">},</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">            loader:</span> <span class="hljs-string">'css-loader'</span><span class="hljs-string">,</span>
<span class="hljs-attr">            options:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                sourceMap:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">                minimize:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">                importLoaders:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">                modules:</span> <span class="hljs-literal">true</span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">},</span>
        <span class="hljs-string">{</span> <span class="hljs-attr">loader:</span> <span class="hljs-string">'postcss-loader'</span> <span class="hljs-string">}</span>
    <span class="hljs-string">]</span> <span class="hljs-string">})</span>
<span class="hljs-string">})</span>

<span class="hljs-string">const</span> <span class="hljs-string">extractText</span> <span class="hljs-string">=</span> <span class="hljs-string">new</span> <span class="hljs-string">ExtractTextPlugin({</span>
<span class="hljs-attr">  filename:</span> <span class="hljs-string">'styles/[name].[contenthash].css'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  allChunks:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  disable:</span> <span class="hljs-string">__DEV__</span>
<span class="hljs-string">})</span>

<span class="hljs-string">webpackConfig.plugins.push(extractStyles)</span>

</code></pre>
<h5>5.postcss-loader</h5>
<p>postcss-loader插件配置会麻烦一些，有两种方法：  <br>一种是新建postcss.config.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    plugins: [
        require('autoprefixer')({ /* ...options */ })
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    plugins: [
        require(<span class="hljs-string">'autoprefixer'</span>)({ <span class="hljs-comment">/* ...options */</span> })
    ]
}</code></pre>
<p>另一种：  <br>在webpack.config.js使用LoaderOptionsPlugin</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
        options: {
            postcssLoader: () => {
                require('autoprefixer')(/* ...options */ )
            }
        }
    }）
）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">webpackConfig</span><span class="hljs-selector-class">.plugins</span><span class="hljs-selector-class">.push</span>(
    <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.LoaderOptionsPlugin</span>({
        <span class="hljs-attribute">options</span>: {
            postcssLoader: () =&gt; {
                <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>)(/* ...options */ )
            }
        }
    }）
）</code></pre>
<h5>6.loaderUtils Warning</h5>
<blockquote><p>DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic, see <a href="https://github.com/webpack/loader-utils/issues/56" rel="nofollow noreferrer" target="_blank">https://github.com/webpack/lo...</a></p></blockquote>
<p>貌似是loader-utils模块引起的，没有太明白问题出在哪，<a href="https://github.com/webpack/loader-utils/issues/56" rel="nofollow noreferrer" target="_blank">issues地址</a>,我在webpack.config.js在加上下面代码解决了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.noDeprecation = true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">process</span>.noDeprecation = <span class="hljs-literal">true</span></code></pre>
<h5>升级总结</h5>
<p>v1.x的时候大家都在吐槽webpack文档问题，v2文档确实提升不少，包括这次的升级如果跟着指南走，基本不会出什么大问题，只是中途在配置ExtractTextPlugin、postcss插件时折腾了一些时间。完成这次的升级后，后续准备对流程再进一步的优化，缩减打包时间、减少bundle大小等。<br>这里推荐一款插件<a href="https://www.npmjs.com/package/webpack-visualizer-plugin" rel="nofollow noreferrer" target="_blank">webpack-visualizer-plugin</a>，可以将项目的打包情况可视化，清楚了解到每个模块的大小、占比，方便后续的优化。</p>
<p>如果对v2版配置还有问题的同学，可以查看我之前的一个v3.1版本的<a href="https://github.com/M1seRy/react-redux-webpack-starter/blob/master/build/webpack.config.js" rel="nofollow noreferrer" target="_blank">webpack.config.js</a>。</p>
<p>附：   <br>1.webpack v1至v2升级指南  <br><a href="https://webpack.js.org/guides/migrating/" rel="nofollow noreferrer" target="_blank">官方webapck 1-&gt;2升级guides</a>  <br><a href="http://www.zcfy.cc/article/migrating-from-v1-to-v2-2378.html" rel="nofollow noreferrer" target="_blank">另一位同学翻译的升级指南中文版</a>  <br>2.几篇关于升级优化的好文章：  <br><a href="https://github.com/pigcan/blog/issues/1" rel="nofollow noreferrer" target="_blank">Boost webpack build performance | Optimising webpack build performance | Webpack 构建性能优化探索</a>  <br><a href="https://github.com/gwuhaolin/blog/issues/2" rel="nofollow noreferrer" target="_blank">webpack2 终极优化</a>  <br>3.关于webpack的好文章集合(awesome-webpack)  <br><a href="https://github.com/webpack-china/awesome-webpack-cn" rel="nofollow noreferrer" target="_blank">搜罗一切webpack的好文章好工具</a></p>
<p>（ps:第一次写关于webpack的文章，不免有误，请及时斧正）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack v2升级踩坑笔记

## 原文链接
[https://segmentfault.com/a/1190000010186847](https://segmentfault.com/a/1190000010186847)


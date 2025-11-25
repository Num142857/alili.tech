---
title: 'Webpack中hash的用法' 
date: 2019-01-08 2:30:11
hidden: true
slug: 1bbqcn0kqyi
categories: [reprint]
---

{{< raw >}}

                    
<p>在<a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">webpack</a>的配置项中，可能会见到<code>hash</code>这样的字符。</p>
<p>当存在<code>hash</code>配置的时候，webpack的输出将可以得到形如这样的文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="page1_bundle_54e8c56e.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">page1_bundle_54e8c56e</span><span class="hljs-selector-class">.js</span></code></pre>
<p>这种带哈希值的文件名，可以帮助实现静态资源的长期缓存，在生产环境中非常有用。关于这一点的详细内容，可以参考这篇久远的<a href="https://github.com/fouber/blog/issues/6" rel="nofollow noreferrer" target="_blank">大公司里怎样开发和部署前端代码</a>。</p>
<h2 id="articleHeader0">在webpack中配置hash</h2>
<p>下面是一个带hash输出的webpack配置的例子(webpack v3.0.0)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var env = {
    src: path.resolve(__dirname, './src'),
    output: path.resolve(__dirname, './dist'),
    publicPath: '/'
};

module.exports = {
    entry: {
        'page1': './page1',
        'page2': './page2'
    },
    context: env.src,
    output: {
        path: env.output,
        filename: './[name]/bundle_[chunkhash:8].js',
        publicPath: env.publicPath
    },
    devtool: false,
    module: {
        rules: [{
            test: /\.(png|jpg)$/,
            use: 'url-loader?limit=8192&amp;name=[path][name]_[hash:8].[ext]'
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './[name]/style_[contenthash:8].css'
        })
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> env = {
    <span class="hljs-attr">src</span>: path.resolve(__dirname, <span class="hljs-string">'./src'</span>),
    <span class="hljs-attr">output</span>: path.resolve(__dirname, <span class="hljs-string">'./dist'</span>),
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/'</span>
};

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-string">'page1'</span>: <span class="hljs-string">'./page1'</span>,
        <span class="hljs-string">'page2'</span>: <span class="hljs-string">'./page2'</span>
    },
    <span class="hljs-attr">context</span>: env.src,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: env.output,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'./[name]/bundle_[chunkhash:8].js'</span>,
        <span class="hljs-attr">publicPath</span>: env.publicPath
    },
    <span class="hljs-attr">devtool</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">rules</span>: [{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpg)$/</span>,
            <span class="hljs-attr">use</span>: <span class="hljs-string">'url-loader?limit=8192&amp;name=[path][name]_[hash:8].[ext]'</span>
        }, {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
            <span class="hljs-attr">use</span>: ExtractTextPlugin.extract({
                <span class="hljs-attr">fallback</span>: <span class="hljs-string">'style-loader'</span>,
                <span class="hljs-attr">use</span>: <span class="hljs-string">'css-loader'</span>
            })
        }]
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> ExtractTextPlugin({
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'./[name]/style_[contenthash:8].css'</span>
        })
    ]
};</code></pre>
<p>可以看到，有多个地方都出现了<code>hash</code>这个词，但形式不太一样。</p>
<h3 id="articleHeader1">output的情况</h3>
<p>output的<code>filename</code>可以指定hash。有两个值可以选择：</p>
<ul>
<li><p><code>[hash]</code>。hash值是特定于整个构建过程的。</p></li>
<li><p><code>[chunkhash]</code>。hash值是特定于每一个文件的内容的。</p></li>
</ul>
<p>我们理想的缓存设计是，在一次版本更新(重新构建)后，只有当一个文件的内容确实发生了变化，它才需要被重新下载，否则应使用缓存。</p>
<p>因此，以上两个值中更推荐的是<code>[chunkhash]</code>。你也可以阅读这篇官方的<a href="https://doc.webpack-china.org/guides/caching/" rel="nofollow noreferrer" target="_blank">缓存指南</a>了解更多细节。</p>
<h3 id="articleHeader2">file-loader的情况</h3>
<p><code>url-loader</code>和<code>file-loader</code>是同一家，参照<a href="https://github.com/webpack-contrib/file-loader" rel="nofollow noreferrer" target="_blank">file-loader文档</a>可知，文件名<code>name</code>可以使用标识符<code>[hash]</code>来启用hash。此外，你还可以按照<code>[&lt;hashType&gt;:hash:&lt;digestType&gt;:&lt;length&gt;]</code>的格式更详细地定制hash结果。</p>
<p><code>[hash:8]</code>中的<code>:8</code>则和前面output的一样，指定了hash结果的截取长度。</p>
<h3 id="articleHeader3">extract-text-webpack-plugin的情况</h3>
<p>被引用的css通过<code>extract-text-webpack-plugin</code>来得到带hash的文件。参照<a href="https://github.com/webpack-contrib/extract-text-webpack-plugin" rel="nofollow noreferrer" target="_blank">extract-text-webpack-plugin文档</a>，在指定生成文件的文件名<code>filename</code>时可以使用标识符<code>[contenthash]</code>(可以看到，和之前的并不相同)。</p>
<h2 id="articleHeader4">引用带hash的文件</h2>
<p>当静态资源的文件名变成这样的带哈希值的版本后，引用这些静态资源就需要稍多花一点工夫。</p>
<h3 id="articleHeader5">纯前端的情况</h3>
<p><strong>如果没有任何服务端，只是纯html、css、js的前端应用的话，一般使用<a href="https://github.com/jantimon/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">html-webpack-plugin</a></strong>。</p>
<p>例如，新建一个<code>index.ejs</code>模板文件如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>App Example</title>
</head>

<body>
    <main id=&quot;root&quot;></main>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>App Example<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>然后增加html-webpack-plugin到webpack：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs'
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">template</span>: <span class="hljs-string">'index.ejs'</span>
    })
  ]
}</code></pre>
<p>执行一次webpack构建，得到生成的<code>index.html</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>App Example</title>
    <link href=&quot;/page1/style_626f7c3f.css&quot; rel=&quot;stylesheet&quot;>
</head>

<body>
    <main id=&quot;root&quot;></main>
    <script type=&quot;text/javascript&quot; src=&quot;/page1/bundle_0f33bdc8.js&quot;></script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>App Example<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/page1/style_626f7c3f.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/page1/bundle_0f33bdc8.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>可以看到，html-webpack-plugin在模板文件内容的基础上，就添加好了需要引用的bundle js。如果还有生成的css文件(通过<code>extract-text-webpack-plugin</code>)，也会被添加到适当的位置。</p>
<h3 id="articleHeader6">纯前端、多页的情况</h3>
<p>如果webpack有多个entry文件，例如本文最前面给出的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    entry: {
        'page1': './page1',
        'page2': './page2'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-string">'page1'</span>: <span class="hljs-string">'./page1'</span>,
        <span class="hljs-string">'page2'</span>: <span class="hljs-string">'./page2'</span>
    }
}</code></pre>
<p>在这种情况下，html-webpack-plugin会把全部entry的输出都集中到一个<code>.html</code>里。所以，这可能并不是我们想要的。</p>
<p>我们更希望的是为每一个entry生成一个<code>.html</code>。这时候，可以使用的是<a href="https://github.com/mutualofomaha/multipage-webpack-plugin" rel="nofollow noreferrer" target="_blank">multipage-webpack-plugin</a>。这个插件实际也依赖了html-webpack-plugin。</p>
<p>例如，有这样的目录结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├─ package.json
├─ src
│   ├─ page1
│   │   ├─ index.css
│   │   ├─ index.ejs
│   │   ├─ index.js
│   │   └─ potofu.jpg
│   └─ page2
│       ├─ index.css
│       ├─ index.ejs
│       └─ index.js
└─ webpack.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├─ package<span class="hljs-selector-class">.json</span>
├─ src
│   ├─ page1
│   │   ├─ index<span class="hljs-selector-class">.css</span>
│   │   ├─ index<span class="hljs-selector-class">.ejs</span>
│   │   ├─ index<span class="hljs-selector-class">.js</span>
│   │   └─ potofu<span class="hljs-selector-class">.jpg</span>
│   └─ page2
│       ├─ index<span class="hljs-selector-class">.css</span>
│       ├─ index<span class="hljs-selector-class">.ejs</span>
│       └─ index<span class="hljs-selector-class">.js</span>
└─ webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span></code></pre>
<p>然后在webpack配置文件中加入multipage-webpack-plugin：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  plugins: [
    new MultipageWebpackPlugin({
        htmlTemplatePath: '[name]/index.ejs',   // 源模板文件的位置
        bootstrapFilename: 'manifest.js',
        templatePath: '[name]'  // 输出html文件的路径
    }),
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> MultipageWebpackPlugin({
        <span class="hljs-attr">htmlTemplatePath</span>: <span class="hljs-string">'[name]/index.ejs'</span>,   <span class="hljs-comment">// 源模板文件的位置</span>
        bootstrapFilename: <span class="hljs-string">'manifest.js'</span>,
        <span class="hljs-attr">templatePath</span>: <span class="hljs-string">'[name]'</span>  <span class="hljs-comment">// 输出html文件的路径</span>
    }),
  ]
}</code></pre>
<p><code>[name]</code>标识符对应的是每一个entry的名称(注意，在本文的时间点，需要使用multipage-webpack-plugin的master分支，也就是最新版，才支持此标识符)。在这个例子中，只有两个取值：<code>page1</code>，<code>page2</code>。</p>
<p><code>bootstrapFilename</code>如字面意义，是指保存webpack的bootstrap代码的文件命名。而webpack的bootstrap代码被这样单独放到一个文件里，是因为multipage-webpack-plugin在内部(<del>强行</del>)为你启用了<code>CommonsChunkPlugin</code>。</p>
<p>执行一次webpack构建，得到的输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dist
├─ manifest.js
├─ page1
│   ├─ bundle_29862ad6.js
│   ├─ index.html
│   ├─ potofu_26766d43.jpg
│   └─ style_0b5ab6ef.css
├─ page2
│   ├─ bundle_6a9c6f12.js
│   ├─ index.html
│   └─ style_914dffd0.css
└─ shared
    └─ bundle_9fa1a762.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>dist
├─ manifest<span class="hljs-selector-class">.js</span>
├─ page1
│   ├─ bundle_29862ad6<span class="hljs-selector-class">.js</span>
│   ├─ index<span class="hljs-selector-class">.html</span>
│   ├─ potofu_26766d43<span class="hljs-selector-class">.jpg</span>
│   └─ style_0b5ab6ef<span class="hljs-selector-class">.css</span>
├─ page2
│   ├─ bundle_6a9c6f12<span class="hljs-selector-class">.js</span>
│   ├─ index<span class="hljs-selector-class">.html</span>
│   └─ style_914dffd0<span class="hljs-selector-class">.css</span>
└─ shared
    └─ bundle_9fa1a762.js</code></pre>
<p>取其中一个<code>page1/index.html</code>，内容是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>page1</title>
    <link href=&quot;/page1/style_0b5ab6ef.css&quot; rel=&quot;stylesheet&quot;>
</head>

<body>
    <div class=&quot;page-box&quot;>page1</div>
    <script type=&quot;text/javascript&quot; src=&quot;/manifest.js&quot;></script>
    <script type=&quot;text/javascript&quot; src=&quot;/shared/bundle_9fa1a762.js&quot;></script>
    <script type=&quot;text/javascript&quot; src=&quot;/page1/bundle_29862ad6.js&quot;></script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>page1<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/page1/style_0b5ab6ef.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page-box"</span>&gt;</span>page1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/manifest.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/shared/bundle_9fa1a762.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/page1/bundle_29862ad6.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>可以看到，关联的css、js静态资源，都已被正确添加。</p>
<h3 id="articleHeader7">带服务端的情况</h3>
<p>如果是带服务端的应用，引用带hash的资源文件将是另一个思路。</p>
<p>常见的做法是，<strong>为所有的静态资源生成一个<code>.json</code>清单文件，然后在服务端读取这个<code>.json</code>，然后把清单信息提供给模板文件，由此来正确地引用所需的静态资源</strong>。</p>
<p>插件<a href="https://github.com/danethurber/webpack-manifest-plugin" rel="nofollow noreferrer" target="_blank">webpack-manifest-plugin</a>或<a href="https://github.com/kossnocorp/assets-webpack-plugin" rel="nofollow noreferrer" target="_blank">assets-webpack-plugin</a>都可以帮助完成这一点。</p>
<h3 id="articleHeader8">服务端例子 - Spring Boot &amp; Thymeleaf</h3>
<p>请看一个Spring Boot(<code>1.5.3.RELEASE</code>) &amp; Thymeleaf(<code>2.1</code>)的例子。这里选择webpack-manifest-plugin。</p>
<p>首先，在webpack的配置中加入这个插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  plugins: [
     new ManifestPlugin()
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">plugins</span>: [
     <span class="hljs-keyword">new</span> ManifestPlugin()
  ]
}</code></pre>
<p>执行webpack构建，即生成一个资源清单文件<code>manifest.json</code>(位置取决于webpack的output配置，这里是<code>src/main/resources/static</code>)，它的内容是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;account/login.css&quot;: &quot;account/login_style_f549ea0a.css&quot;,
  &quot;account/login.js&quot;: &quot;account/login_bundle_279af402.js&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"account/login.css"</span>: <span class="hljs-string">"account/login_style_f549ea0a.css"</span>,
  <span class="hljs-attr">"account/login.js"</span>: <span class="hljs-string">"account/login_bundle_279af402.js"</span>
}</code></pre>
<p>接下来，创建一个帮助类<code>ResourceFormatter</code>(名称自拟)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class ResourceFormatter{

    private JsonNode resourceMap;

    public ResourceFormatter(){
        ObjectMapper mapper = new ObjectMapper();
        Resource resource = new ClassPathResource(&quot;static/manifest.json&quot;);

        try {
            resourceMap = mapper.readValue(resource.getFile(), JsonNode.class);
        } catch (IOException e) {
            resourceMap = null;
        }
    }

    public String format(String originPath){

        if(resourceMap != null &amp;&amp; resourceMap.has(originPath)){
            return &quot;/&quot; + resourceMap.get(originPath).asText();
        }

        return &quot;/&quot; + originPath;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ResourceFormatter</span></span>{

    <span class="hljs-keyword">private</span> JsonNode resourceMap;

    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">ResourceFormatter</span><span class="hljs-params">()</span></span>{
        ObjectMapper mapper = <span class="hljs-keyword">new</span> ObjectMapper();
        Resource resource = <span class="hljs-keyword">new</span> ClassPathResource(<span class="hljs-string">"static/manifest.json"</span>);

        <span class="hljs-keyword">try</span> {
            resourceMap = mapper.readValue(resource.getFile(), JsonNode.class);
        } <span class="hljs-keyword">catch</span> (IOException e) {
            resourceMap = <span class="hljs-keyword">null</span>;
        }
    }

    <span class="hljs-function"><span class="hljs-keyword">public</span> String <span class="hljs-title">format</span><span class="hljs-params">(String originPath)</span></span>{

        <span class="hljs-keyword">if</span>(resourceMap != <span class="hljs-keyword">null</span> &amp;&amp; resourceMap.has(originPath)){
            <span class="hljs-keyword">return</span> <span class="hljs-string">"/"</span> + resourceMap.get(originPath).asText();
        }

        <span class="hljs-keyword">return</span> <span class="hljs-string">"/"</span> + originPath;
    }
}</code></pre>
<p>这个帮助类在初始化的时候就会读取<code>manifest.json</code>，而在<code>format()</code>方法里则会利用清单信息对路径进行转换。</p>
<p>然后，把这个帮助类添加到模板引擎Thymeleaf内，包含两步。</p>
<p>第一步，创建一个Dialect类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class ResourceDialect extends AbstractDialect implements IExpressionEnhancingDialect {

    public ResourceDialect() {
        super();
    }

    @Override
    public String getPrefix() {
        return &quot;resource&quot;;
    }

    @Override
    public Map<String, Object> getAdditionalExpressionObjects(IProcessingContext processingContext) {
        Map<String, Object> expressions = new HashMap<>();
        expressions.put(&quot;resourceFormatter&quot;, new ResourceFormatter());
        return expressions;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ResourceDialect</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">AbstractDialect</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">IExpressionEnhancingDialect</span> </span>{

    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">ResourceDialect</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">super</span>();
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> String <span class="hljs-title">getPrefix</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">"resource"</span>;
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> Map&lt;String, Object&gt; <span class="hljs-title">getAdditionalExpressionObjects</span><span class="hljs-params">(IProcessingContext processingContext)</span> </span>{
        Map&lt;String, Object&gt; expressions = <span class="hljs-keyword">new</span> HashMap&lt;&gt;();
        expressions.put(<span class="hljs-string">"resourceFormatter"</span>, <span class="hljs-keyword">new</span> ResourceFormatter());
        <span class="hljs-keyword">return</span> expressions;
    }
}</code></pre>
<p>可以看到<code>ResourceFormatter</code>在这里被实例化并添加。</p>
<p>第二步，在Spring应用中注册这个Dialect类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Configuration
public class ThymeleafConfig {
    @Bean
    public ResourceDialect resourceDialect() {
        return new ResourceDialect();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-meta">@Configuration</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ThymeleafConfig</span> </span>{
    <span class="hljs-meta">@Bean</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> ResourceDialect <span class="hljs-title">resourceDialect</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> ResourceDialect();
    }
}</code></pre>
<p>到此，就可以在Thymeleaf视图模板文件中使用了。修改视图文件如下(只包含修改的部分)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; th:href=&quot;@{${#resourceFormatter.format('account/login.css')"}}"&quot; th:unless=&quot;${@environment.acceptsProfiles('dev')}&quot; />
<!-- ... -->
<script th:src=&quot;@{${#resourceFormatter.format('account/login.js')"}}"&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">th:href</span>=<span class="hljs-string">"@{${#resourceFormatter.format('account/login.css')"}}""</span> <span class="hljs-attr">th:unless</span>=<span class="hljs-string">"${@environment.acceptsProfiles('dev')}"</span> /&gt;</span>
<span class="hljs-comment">&lt;!-- ... --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">th:src</span>=<span class="hljs-string">"@{${#resourceFormatter.format('account/login.js')"}}""</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>最后，启动服务，访问该页，可以看到最终的输出信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;/account/login_style_f549ea0a.css&quot;>
<!-- ... -->
<script src=&quot;/account/login_bundle_279af402.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/account/login_style_f549ea0a.css"</span>&gt;</span>
<span class="hljs-comment">&lt;!-- ... --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/account/login_bundle_279af402.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这就是我们要的带hash的文件了。</p>
<p>此外，关于如何在Spring Boot中引入webpack，可以参考这个<a href="https://github.com/Efk3/spring-boot-angular2-seed" rel="nofollow noreferrer" target="_blank">spring-boot-angular2-seed</a>。</p>
<h3 id="articleHeader9">服务端例子 - Koa</h3>
<p>看完了一个传统Java应用的例子，再来看看现代的Node应用。[Koa]<a>Koa</a>是简洁的Node服务端框架，在它的基础上引用带hash的资源文件，也是同样的思路。</p>
<p>首先，同样是在webpack配置中加入webpack-manifest-plugin。</p>
<p>运行webpack构建生成<code>manifest.json</code>，内容大概会像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;page1.css&quot;: &quot;page1/style_0b5ab6ef.css&quot;,
  &quot;page1.js&quot;: &quot;page1/bundle_0f33bdc8.js&quot;,
  &quot;page1\\potofu.jpg&quot;: &quot;page1/potofu_26766d43.jpg&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"page1.css"</span>: <span class="hljs-string">"page1/style_0b5ab6ef.css"</span>,
  <span class="hljs-attr">"page1.js"</span>: <span class="hljs-string">"page1/bundle_0f33bdc8.js"</span>,
  <span class="hljs-attr">"page1\\potofu.jpg"</span>: <span class="hljs-string">"page1/potofu_26766d43.jpg"</span>
}</code></pre>
<p>然后，读取这个json，为Koa(通过<code>ctx.state</code>)添加一个资源路径转换的帮助方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import manifest from './public/manifest.json';

app.use(async(ctx, next) => {
    ctx.state.resourceFormat = (originPath) => {

        if (originPath in manifest) {
            return &quot;/&quot; + manifest[originPath];
        }

        return &quot;/&quot; + originPath;
    };
    await next();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> manifest <span class="hljs-keyword">from</span> <span class="hljs-string">'./public/manifest.json'</span>;

app.use(<span class="hljs-keyword">async</span>(ctx, next) =&gt; {
    ctx.state.resourceFormat = <span class="hljs-function">(<span class="hljs-params">originPath</span>) =&gt;</span> {

        <span class="hljs-keyword">if</span> (originPath <span class="hljs-keyword">in</span> manifest) {
            <span class="hljs-keyword">return</span> <span class="hljs-string">"/"</span> + manifest[originPath];
        }

        <span class="hljs-keyword">return</span> <span class="hljs-string">"/"</span> + originPath;
    };
    <span class="hljs-keyword">await</span> next();
});</code></pre>
<p>最后，在视图模板(这里的模板引擎是<a href="https://github.com/tj/ejs" rel="nofollow noreferrer" target="_blank">ejs</a>)内，引用所需的静态资源：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;<%= resourceFormat('page1.css') %>&quot;>
<!-- ... -->
<script src=&quot;<%= resourceFormat('page1.js') %>&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%= resourceFormat('page1.css') %&gt;"</span>&gt;</span>
<span class="hljs-comment">&lt;!-- ... --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"&lt;%= resourceFormat('page1.js') %&gt;"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>到此，Koa的例子就完成了。</p>
<h2 id="articleHeader10">结语</h2>
<p>带hash的文件是现在web启用缓存来提升性能比较建议的形式，如果你也有类似的生产环境优化的需要，很推荐你也试试。</p>
<p>（重新编辑自我的博客，原文地址：<a href="http://acgtofe.com/posts/2017/07/webpack-hash-names" rel="nofollow noreferrer" target="_blank">http://acgtofe.com/posts/2017...</a>）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack中hash的用法

## 原文链接
[https://segmentfault.com/a/1190000010256415](https://segmentfault.com/a/1190000010256415)


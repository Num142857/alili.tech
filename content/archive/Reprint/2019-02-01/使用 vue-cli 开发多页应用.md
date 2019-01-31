---
title: '使用 vue-cli 开发多页应用' 
date: 2019-02-01 2:30:10
hidden: true
slug: ynfirljvjqn
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">修改的webpack配置文件</h1>
<h2 id="articleHeader1">全局配置</h2>
<h3 id="articleHeader2">修改 webpack.base.conf.js</h3>
<p>打开 <code>~\build\webpack.base.conf.js</code> ，找到<code>entry</code>，添加多入口</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    app: './src/main.js',
    app2: './src/main2.js',
    app3: './src/main3.js',
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">entry: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">'./src/main.js'</span>,
    <span class="hljs-attr">app2</span>: <span class="hljs-string">'./src/main2.js'</span>,
    <span class="hljs-attr">app3</span>: <span class="hljs-string">'./src/main3.js'</span>,
},</code></pre>
<blockquote><p>运行、编译的时候每一个入口都会对应一个<code>Chunk</code></p></blockquote>
<h2 id="articleHeader3">run dev 开发环境</h2>
<h3 id="articleHeader4">修改 webpack.dev.conf.js</h3>
<p>打开 <code>~\build\webpack.dev.conf.js</code> ，在<code>plugins</code>下找到<code>new HtmlWebpackPlugin</code>，在其后面添加对应的多页，并为每个页面添加<code>Chunk</code>配置</p>
<blockquote><p><code>chunks: ['app']</code>中的app对应的是<code>webpack.base.conf.js</code>中<code>entry</code>设置的入口文件</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins:[
    // https://github.com/ampedandwired/html-webpack-plugin
    // 多页:index.html → app.js
    new HtmlWebpackPlugin({
      filename: 'index.html',//生成的html
      template: 'index.html',//来源html
      inject: true,//是否开启注入
      chunks: ['app']//需要引入的Chunk，不配置就会引入所有页面的资源
    }),
    // 多页:index2.html → app2.js
    new HtmlWebpackPlugin({
      filename: 'index2.html',//生成的html
      template: 'index2.html',//来源html
      inject: true,//是否开启注入
      chunks: ['app2']//需要引入的Chunk，不配置就会引入所有页面的资源
    }),
    // 多页:index3.html → app3.js
    new HtmlWebpackPlugin({
      filename: 'index3.html',//生成的html
      template: 'index3.html',//来源html
      inject: true,//是否开启注入
      chunks: ['app3']//需要引入的Chunk，不配置就会引入所有页面的资源
    })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">plugins:[
    <span class="hljs-comment">// https://github.com/ampedandwired/html-webpack-plugin</span>
    <span class="hljs-comment">// 多页:index.html → app.js</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,<span class="hljs-comment">//生成的html</span>
      template: <span class="hljs-string">'index.html'</span>,<span class="hljs-comment">//来源html</span>
      inject: <span class="hljs-literal">true</span>,<span class="hljs-comment">//是否开启注入</span>
      chunks: [<span class="hljs-string">'app'</span>]<span class="hljs-comment">//需要引入的Chunk，不配置就会引入所有页面的资源</span>
    }),
    <span class="hljs-comment">// 多页:index2.html → app2.js</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">'index2.html'</span>,<span class="hljs-comment">//生成的html</span>
      template: <span class="hljs-string">'index2.html'</span>,<span class="hljs-comment">//来源html</span>
      inject: <span class="hljs-literal">true</span>,<span class="hljs-comment">//是否开启注入</span>
      chunks: [<span class="hljs-string">'app2'</span>]<span class="hljs-comment">//需要引入的Chunk，不配置就会引入所有页面的资源</span>
    }),
    <span class="hljs-comment">// 多页:index3.html → app3.js</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">'index3.html'</span>,<span class="hljs-comment">//生成的html</span>
      template: <span class="hljs-string">'index3.html'</span>,<span class="hljs-comment">//来源html</span>
      inject: <span class="hljs-literal">true</span>,<span class="hljs-comment">//是否开启注入</span>
      chunks: [<span class="hljs-string">'app3'</span>]<span class="hljs-comment">//需要引入的Chunk，不配置就会引入所有页面的资源</span>
    })
]</code></pre>
<h2 id="articleHeader5">run build 编译</h2>
<h3 id="articleHeader6">修改 config/index.js</h3>
<p>打开<code>~\config\index.js</code>，找到<code>build</code>下的<code>index: path.resolve(__dirname, '../dist/index.html')</code>，在其后添加多页</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    index2: path.resolve(__dirname, '../dist/index2.html'),
    index3: path.resolve(__dirname, '../dist/index3.html'),
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">build: {
    <span class="hljs-attr">index</span>: path.resolve(__dirname, <span class="hljs-string">'../dist/index.html'</span>),
    <span class="hljs-attr">index2</span>: path.resolve(__dirname, <span class="hljs-string">'../dist/index2.html'</span>),
    <span class="hljs-attr">index3</span>: path.resolve(__dirname, <span class="hljs-string">'../dist/index3.html'</span>),
},</code></pre>
<h3 id="articleHeader7">修改 webpack.prod.conf.js</h3>
<p>打开<code>~\build\webpack.prod.conf.js</code>，在<code>plugins</code>下找到<code>new HtmlWebpackPlugin</code>，在其后面添加对应的多页，并为每个页面添加<code>Chunk</code>配置</p>
<blockquote><p><code>HtmlWebpackPlugin</code> 中的 <code>filename</code> 引用的是 config/index.js 中对应的 <code>build</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    // 多页:index.html → app.js
    new HtmlWebpackPlugin({
        filename: config.build.index,
        template: 'index.html',
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency',
        chunks: ['manifest','vendor','app']//需要引入的Chunk，不配置就会引入所有页面的资源
    }),
    // 多页:index2.html → app2.js
    new HtmlWebpackPlugin({
        filename: config.build.index2,
        template: 'index2.html',
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency',
        chunks: ['manifest','vendor','app2']//需要引入的Chunk，不配置就会引入所有页面的资源
    }),
    // 多页:index3.html → app3.js
    new HtmlWebpackPlugin({
        filename: config.build.index3,
        template: 'index3.html',
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency',
        chunks: ['manifest','vendor','app3']//需要引入的Chunk，不配置就会引入所有页面的资源
    }),
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">plugins: [
    <span class="hljs-comment">// 多页:index.html → app.js</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        <span class="hljs-attr">filename</span>: config.build.index,
        <span class="hljs-attr">template</span>: <span class="hljs-string">'index.html'</span>,
        <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">minify</span>: {
            <span class="hljs-attr">removeComments</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">collapseWhitespace</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">removeAttributeQuotes</span>: <span class="hljs-literal">true</span>
            <span class="hljs-comment">// more options:</span>
            <span class="hljs-comment">// https://github.com/kangax/html-minifier#options-quick-reference</span>
        },
        <span class="hljs-comment">// necessary to consistently work with multiple chunks via CommonsChunkPlugin</span>
        chunksSortMode: <span class="hljs-string">'dependency'</span>,
        <span class="hljs-attr">chunks</span>: [<span class="hljs-string">'manifest'</span>,<span class="hljs-string">'vendor'</span>,<span class="hljs-string">'app'</span>]<span class="hljs-comment">//需要引入的Chunk，不配置就会引入所有页面的资源</span>
    }),
    <span class="hljs-comment">// 多页:index2.html → app2.js</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        <span class="hljs-attr">filename</span>: config.build.index2,
        <span class="hljs-attr">template</span>: <span class="hljs-string">'index2.html'</span>,
        <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">minify</span>: {
            <span class="hljs-attr">removeComments</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">collapseWhitespace</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">removeAttributeQuotes</span>: <span class="hljs-literal">true</span>
        },
        <span class="hljs-attr">chunksSortMode</span>: <span class="hljs-string">'dependency'</span>,
        <span class="hljs-attr">chunks</span>: [<span class="hljs-string">'manifest'</span>,<span class="hljs-string">'vendor'</span>,<span class="hljs-string">'app2'</span>]<span class="hljs-comment">//需要引入的Chunk，不配置就会引入所有页面的资源</span>
    }),
    <span class="hljs-comment">// 多页:index3.html → app3.js</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        <span class="hljs-attr">filename</span>: config.build.index3,
        <span class="hljs-attr">template</span>: <span class="hljs-string">'index3.html'</span>,
        <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">minify</span>: {
            <span class="hljs-attr">removeComments</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">collapseWhitespace</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">removeAttributeQuotes</span>: <span class="hljs-literal">true</span>
        },
        <span class="hljs-attr">chunksSortMode</span>: <span class="hljs-string">'dependency'</span>,
        <span class="hljs-attr">chunks</span>: [<span class="hljs-string">'manifest'</span>,<span class="hljs-string">'vendor'</span>,<span class="hljs-string">'app3'</span>]<span class="hljs-comment">//需要引入的Chunk，不配置就会引入所有页面的资源</span>
    }),
]</code></pre>
<blockquote><p><strong>参考:</strong><br><a href="https://github.com/bhnddowinf/vuejs2-learn" rel="nofollow noreferrer" target="_blank">小凡哥视频 - 讲解 vuejs2 ，使用 vue-cli 怎么搭起 多页应用</a></p></blockquote>
<hr>
<blockquote><p>如果页面比较多，可以考虑使用循环将 <code>HtmlWebpackPlugin</code> 添加到 <code>plugins</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// utils.js
exports.getEntry = function(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[pathname] = ['./' + entry];
    }
    return entries;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// utils.js</span>
exports.getEntry = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">globPath, pathDir</span>) </span>{
    <span class="hljs-keyword">var</span> files = glob.sync(globPath);
    <span class="hljs-keyword">var</span> entries = {},
        entry, dirname, basename, pathname, extname;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'^'</span> + pathDir), <span class="hljs-string">''</span>) : pathname;
        entries[pathname] = [<span class="hljs-string">'./'</span> + entry];
    }
    <span class="hljs-keyword">return</span> entries;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.base.conf.js
var pages = Object.keys(utils.getEntry('../src/views/**/*.html', '../src/views/'));
pages.forEach(function (pathname) {
    // https://github.com/ampedandwired/html-webpack-plugin
    var conf = {
        filename: '../views/' + pathname + '.html', //生成的html存放路径，相对于path
        template: '../src/views/' + pathname + '.html', //html模板路径
        inject: false,    //js插入的位置，true/'head'/'body'/false
        /*
         * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
         * 如在html标签属性上使用"{{"..."}}"表达式，所以很多情况下并不需要在此配置压缩项，
         * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
         * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
         */
        // minify: { //压缩HTML文件
        //     removeComments: true, //移除HTML中的注释
        //     collapseWhitespace: false //删除空白符与换行符
        // }
    };
    if (pathname in config.entry) {
        conf.favicon = 'src/images/favicon.ico';
        conf.inject = 'body';
        conf.chunks = ['vendors', pathname];
        conf.hash = true;
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.base.conf.js</span>
<span class="hljs-keyword">var</span> pages = <span class="hljs-built_in">Object</span>.keys(utils.getEntry(<span class="hljs-string">'../src/views/**/*.html'</span>, <span class="hljs-string">'../src/views/'</span>));
pages.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">pathname</span>) </span>{
    <span class="hljs-comment">// https://github.com/ampedandwired/html-webpack-plugin</span>
    <span class="hljs-keyword">var</span> conf = {
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'../views/'</span> + pathname + <span class="hljs-string">'.html'</span>, <span class="hljs-comment">//生成的html存放路径，相对于path</span>
        template: <span class="hljs-string">'../src/views/'</span> + pathname + <span class="hljs-string">'.html'</span>, <span class="hljs-comment">//html模板路径</span>
        inject: <span class="hljs-literal">false</span>,    <span class="hljs-comment">//js插入的位置，true/'head'/'body'/false</span>
        <span class="hljs-comment">/*
         * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
         * 如在html标签属性上使用"{{"..."}}"表达式，所以很多情况下并不需要在此配置压缩项，
         * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
         * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
         */</span>
        <span class="hljs-comment">// minify: { //压缩HTML文件</span>
        <span class="hljs-comment">//     removeComments: true, //移除HTML中的注释</span>
        <span class="hljs-comment">//     collapseWhitespace: false //删除空白符与换行符</span>
        <span class="hljs-comment">// }</span>
    };
    <span class="hljs-keyword">if</span> (pathname <span class="hljs-keyword">in</span> config.entry) {
        conf.favicon = <span class="hljs-string">'src/images/favicon.ico'</span>;
        conf.inject = <span class="hljs-string">'body'</span>;
        conf.chunks = [<span class="hljs-string">'vendors'</span>, pathname];
        conf.hash = <span class="hljs-literal">true</span>;
    }
    config.plugins.push(<span class="hljs-keyword">new</span> HtmlWebpackPlugin(conf));
});</code></pre>
<blockquote><p>同样入口 <code>entry</code> 也可以使用</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.base.conf.js
entry: {
    app: utils.getEntry('../src/scripts/**/*.js', '../src/scripts/')
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.base.conf.js</span>
entry: {
    <span class="hljs-attr">app</span>: utils.getEntry(<span class="hljs-string">'../src/scripts/**/*.js'</span>, <span class="hljs-string">'../src/scripts/'</span>)
},</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 vue-cli 开发多页应用

## 原文链接
[https://segmentfault.com/a/1190000007287998](https://segmentfault.com/a/1190000007287998)


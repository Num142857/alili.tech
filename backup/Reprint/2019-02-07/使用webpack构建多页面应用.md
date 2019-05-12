---
title: '使用webpack构建多页面应用' 
date: 2019-02-07 2:30:15
hidden: true
slug: myqkan4pjzg
categories: [reprint]
---

{{< raw >}}

                    
<p>原文：<a href="https://github.com/Coffcer/Blog/issues/1" rel="nofollow noreferrer" target="_blank">https://github.com/Coffcer/Blog/issues/1</a></p>
<p>关于webpack的配置和使用，网上已经有许多文章了，大多是在讲单页应用，当我们需要打包多个html时，事情就变得麻烦起来。怎么在webpack-dev-server里使用路由？怎么打包多个html和js chunk并自动更新md5？本文讲的就是如何解决这些问题。</p>
<blockquote><p>这里假设你对Webpack已经有最基础的了解</p></blockquote>
<h1 id="articleHeader0">需求</h1>
<p>来看下我们的需求:</p>
<ol>
<li><p>使用webpack-dev-server做开发时的服务器</p></li>
<li><p>在webpack-dev-server里使用路由，访问/a时候显示a.html，/b显示b.html</p></li>
<li><p>打包成多个html，给其中引用到资源加md5戳</p></li>
</ol>
<h1 id="articleHeader1">主要目录结构</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── src                       
│   └── views                 # 每一个文件夹对应一个页面
│       └── a                 
│           └── index.js
│       └── b                 
│           └── index.js
├── output                    # 打包输出的目录
|   └── ...
└── template.html             # 将根据这个模版，生成各个页面的html
└── webpack.config.js
└── dev-server.js             # webpack-dev-server + express       " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>├── src                       
│   └── views                 <span class="hljs-meta"># 每一个文件夹对应一个页面</span>
│       └── a                 
│           └── <span class="hljs-keyword">index</span>.js
│       └── b                 
│           └── <span class="hljs-keyword">index</span>.js
├── output                    <span class="hljs-meta"># 打包输出的目录</span>
|   └── ...
└── template.html             <span class="hljs-meta"># 将根据这个模版，生成各个页面的html</span>
└── webpack.config.js
└── dev-<span class="hljs-keyword">server</span>.js             <span class="hljs-meta"># webpack-dev-server + express       </span></code></pre>
<p>只列出了主要的目录，这里我们根据一个template.html来生成多个页面的html，他们之间只有引用的资源路径不同。当然，你也可以每个页面单独使用一个html模版。</p>
<h1 id="articleHeader2">Webpack 配置</h1>
<p>这里主要解决两个小问题。</p>
<p><strong>1. 打包多个页面的js文件</strong></p>
<p>读取src/views下的目录，约定每一个目录当成一个页面，打包成一个js chunk。</p>
<p><strong>2. 打包多个html</strong></p>
<p>循环生成多个HtmlWebpackPlugin插件，把每一个插件的chunks各自指向上面打包的js chunk。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
var glob = require('glob');

var webpackConfig = {
    /* 一些webpack基础配置 */   
};

// 获取指定路径下的入口文件
function getEntries(globPath) {
     var files = glob.sync(globPath),
       entries = {};

     files.forEach(function(filepath) {
         // 取倒数第二层(view下面的文件夹)做包名
         var split = filepath.split('/');
         var name = split[split.length - 2];

         entries[name] = './' + filepath;
     });

     return entries;
}
        
var entries = getEntries('src/view/**/index.js');

Object.keys(entries).forEach(function(name) {
    // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
    webpackConfig.entry[name] = entries[name];
    
    // 每个页面生成一个html
    var plugin = new HtmlWebpackPlugin({
        // 生成出来的html文件名
        filename: name + '.html',
        // 每个html的模版，这里多个页面使用同一个模版
        template: './template.html',
        // 自动将引用插入html
        inject: true,
        // 每个html引用的js模块，也可以在这里加上vendor等公用模块
        chunks: [name]
    });
    webpackConfig.plugins.push(plugin);
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">var</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">'glob'</span>);

<span class="hljs-keyword">var</span> webpackConfig = {
    <span class="hljs-comment">/* 一些webpack基础配置 */</span>   
};

<span class="hljs-comment">// 获取指定路径下的入口文件</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getEntries</span>(<span class="hljs-params">globPath</span>) </span>{
     <span class="hljs-keyword">var</span> files = glob.sync(globPath),
       entries = {};

     files.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">filepath</span>) </span>{
         <span class="hljs-comment">// 取倒数第二层(view下面的文件夹)做包名</span>
         <span class="hljs-keyword">var</span> split = filepath.split(<span class="hljs-string">'/'</span>);
         <span class="hljs-keyword">var</span> name = split[split.length - <span class="hljs-number">2</span>];

         entries[name] = <span class="hljs-string">'./'</span> + filepath;
     });

     <span class="hljs-keyword">return</span> entries;
}
        
<span class="hljs-keyword">var</span> entries = getEntries(<span class="hljs-string">'src/view/**/index.js'</span>);

<span class="hljs-built_in">Object</span>.keys(entries).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-comment">// 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry</span>
    webpackConfig.entry[name] = entries[name];
    
    <span class="hljs-comment">// 每个页面生成一个html</span>
    <span class="hljs-keyword">var</span> plugin = <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        <span class="hljs-comment">// 生成出来的html文件名</span>
        filename: name + <span class="hljs-string">'.html'</span>,
        <span class="hljs-comment">// 每个html的模版，这里多个页面使用同一个模版</span>
        template: <span class="hljs-string">'./template.html'</span>,
        <span class="hljs-comment">// 自动将引用插入html</span>
        inject: <span class="hljs-literal">true</span>,
        <span class="hljs-comment">// 每个html引用的js模块，也可以在这里加上vendor等公用模块</span>
        chunks: [name]
    });
    webpackConfig.plugins.push(plugin);
})
</code></pre>
<h1 id="articleHeader3">路由配置</h1>
<p>在多页应用下，我们希望访问的是localhost:8080/a，而不是localhost:8080/a.html。<br>由于webpack-dev-server只是将文件打包在内存里，所以你没法在express里直接<code>sendfile('output/views/a.html')</code>，因为这个文件实际上还不存在。还好webpack提供了一个outputFileStream，用来输出其内存里的文件，我们可以利用它来做路由。</p>
<p>注意，为了自定义路由，你可能需要引进express或koa之类的库，然后将webpack-dev-server作为中间件处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// dev-server.js
var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('./webpack.config')

var app = express();

// webpack编译器
var compiler = webpack(webpackConfig);

// webpack-dev-server中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});

app.use(devMiddleware)

// 路由
app.get('/:viewname?', function(req, res, next) {
    
    var viewname = req.params.viewname 
        ? req.params.viewname + '.html' 
        : 'index.html';
        
    var filepath = path.join(compiler.outputPath, viewname);
    
    // 使用webpack提供的outputFileSystem
    compiler.outputFileSystem.readFile(filepath, function(err, result) {
        if (err) {
            // something error
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});

module.exports = app.listen(8080, function(err) {
    if (err) {
        // do something
        return;
    }
    
    console.log('Listening at http://localhost:' + port + '\n')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// dev-server.js</span>
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">var</span> webpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.config'</span>)

<span class="hljs-keyword">var</span> app = express();

<span class="hljs-comment">// webpack编译器</span>
<span class="hljs-keyword">var</span> compiler = webpack(webpackConfig);

<span class="hljs-comment">// webpack-dev-server中间件</span>
<span class="hljs-keyword">var</span> devMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-dev-middleware'</span>)(compiler, {
    <span class="hljs-attr">publicPath</span>: webpackConfig.output.publicPath,
    <span class="hljs-attr">stats</span>: {
        <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">chunks</span>: <span class="hljs-literal">false</span>
    }
});

app.use(devMiddleware)

<span class="hljs-comment">// 路由</span>
app.get(<span class="hljs-string">'/:viewname?'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    
    <span class="hljs-keyword">var</span> viewname = req.params.viewname 
        ? req.params.viewname + <span class="hljs-string">'.html'</span> 
        : <span class="hljs-string">'index.html'</span>;
        
    <span class="hljs-keyword">var</span> filepath = path.join(compiler.outputPath, viewname);
    
    <span class="hljs-comment">// 使用webpack提供的outputFileSystem</span>
    compiler.outputFileSystem.readFile(filepath, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-comment">// something error</span>
            <span class="hljs-keyword">return</span> next(err);
        }
        res.set(<span class="hljs-string">'content-type'</span>, <span class="hljs-string">'text/html'</span>);
        res.send(result);
        res.end();
    });
});

<span class="hljs-built_in">module</span>.exports = app.listen(<span class="hljs-number">8080</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
    <span class="hljs-keyword">if</span> (err) {
        <span class="hljs-comment">// do something</span>
        <span class="hljs-keyword">return</span>;
    }
    
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Listening at http://localhost:'</span> + port + <span class="hljs-string">'\n'</span>)
})</code></pre>
<p>最后，在package.json里定义下启动命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// package.json
{
    scripts: {
        &quot;dev&quot;: &quot;node ./dev-server.js&quot;   
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">// package.json
{
    scripts: {
        <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node ./dev-server.js"</span>   
    }
}</code></pre>
<p>运行 <code>npm run dev</code>，然后在浏览器访问localhost:8080/各个页面，你应该可以看到想要的结果。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用webpack构建多页面应用

## 原文链接
[https://segmentfault.com/a/1190000005920125](https://segmentfault.com/a/1190000005920125)


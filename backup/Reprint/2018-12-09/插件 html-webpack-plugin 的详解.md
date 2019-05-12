---
title: '插件 html-webpack-plugin 的详解' 
date: 2018-12-09 2:30:08
hidden: true
slug: z56veaq246d
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在学习webpack，接触到的第一个插件就是<code>html-webpack-plugin</code>,那么今天就来详解一下它的用法吧。</p>
<ul><li>先来上一个例子：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var htmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
module.exports = {
    entry: './src/script/main.js',
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'head'
        })
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> htmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)

<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/script/main.js'</span>,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'js/bundle.js'</span>,
        <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'dist'</span>)
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> htmlWebpackPlugin({
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,
            <span class="hljs-attr">template</span>: <span class="hljs-string">'index.html'</span>,
            <span class="hljs-attr">inject</span>: <span class="hljs-string">'head'</span>
        })
    ]
}</code></pre>
<hr>
<blockquote>配置属性</blockquote>
<p><strong>title</strong></p>
<p>生成html文件的标题</p>
<p><strong>filename</strong></p>
<p>就是html文件的文件名，默认是index.html</p>
<p><strong>template</strong></p>
<p>指定你生成的文件所依赖哪一个html文件模板，模板类型可以是html、jade、ejs等。但是要注意的是，如果想使用自定义的模板文件的时候，你需要安装对应的<code>loader</code>哦。</p>
<p>举例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install jade-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install </span><span class="hljs-keyword">jade-loader </span>--save-dev</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
loaders: {
    ...
    {
        test: /\.jade$/,
        loader: 'jade'
    }
}
plugins: [
    new HtmlWebpackPlugin({
        ...
        jade: 'path/to/yourfile.jade'
    })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.config.js</span>
...
loaders: {
    ...
    {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jade$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'jade'</span>
    }
}
plugins: [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        ...
        jade: <span class="hljs-string">'path/to/yourfile.jade'</span>
    })
]</code></pre>
<p>如果你设置的 <code> title</code> 和 <code>filename</code>于模板中发生了冲突，那么以你的<code>title</code> 和 <code>filename</code> 的配置值为准。</p>
<p><strong>inject</strong></p>
<p>inject有四个值： <code>true</code> <code>body</code> <code>head</code> <code>false</code></p>
<p><code>true</code> 默认值，script标签位于html文件的 body 底部<br><code>body</code> script标签位于html文件的 body 底部<br><code>head</code> script标签位于html文件的 head中<br><code>false</code> 不插入生成的js文件，这个几乎不会用到的</p>
<p><strong>favicon</strong></p>
<p>给你生成的html文件生成一个 <code>favicon</code> ,值是一个路径</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    new HtmlWebpackPlugin({
        ...
        favicon: 'path/to/my_favicon.ico'
    }) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">plugins:</span> [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        ...
<span class="hljs-symbol">        favicon:</span> <span class="hljs-string">'path/to/my_favicon.ico'</span>
    }) </code></pre>
<p>然后再生成的html中就有了一个 <code>link</code> 标签</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;shortcut icon&quot; href=&quot;example.ico&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"shortcut icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"example.ico"</span>&gt;</span></code></pre>
<p><strong>minify</strong></p>
<p>使用minify会对生成的html文件进行压缩。默认是false。html-webpack-plugin内部集成了 <code>html-minifier</code>,因此，还可以对minify进行配置：（注意，虽然minify支持BooleanObject,但是不能直接这样写：minify: true , 这样会报错    <code>ERROR in   TypeError: Cannot use 'in' operator to search for 'html5' in true</code> , 使用时候必须给定一个 <code> { } </code>对象  ）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
plugins: [
    new HtmlWebpackPlugin({
        ...
        minify: {
            removeAttributeQuotes: true // 移除属性的引号
        }
    })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">...
plugins: [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        ...
        minify: {
            <span class="hljs-attr">removeAttributeQuotes</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">// 移除属性的引号</span>
        }
    })
]</code></pre>
<p><strong>cache</strong></p>
<p>默认是true的，表示内容变化的时候生成一个新的文件。</p>
<p><strong>showErrors</strong></p>
<p>当webpack报错的时候，会把错误信息包裹再一个<code>pre</code>中，默认是true。</p>
<p><strong>chunks</strong></p>
<p>chunks主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么<code>chunks</code> 就能选择你要使用那些js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    index: path.resolve(__dirname, './src/index.js'),
    devor: path.resolve(__dirname, './src/devor.js'),
    main: path.resolve(__dirname, './src/main.js')
}

plugins: [
    new httpWebpackPlugin({
        chunks: ['index','main']
    })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">entry: {
    <span class="hljs-attr">index</span>: path.resolve(__dirname, <span class="hljs-string">'./src/index.js'</span>),
    <span class="hljs-attr">devor</span>: path.resolve(__dirname, <span class="hljs-string">'./src/devor.js'</span>),
    <span class="hljs-attr">main</span>: path.resolve(__dirname, <span class="hljs-string">'./src/main.js'</span>)
}

plugins: [
    <span class="hljs-keyword">new</span> httpWebpackPlugin({
        <span class="hljs-attr">chunks</span>: [<span class="hljs-string">'index'</span>,<span class="hljs-string">'main'</span>]
    })
]</code></pre>
<p>那么编译后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=text/javascript src=&quot;index.js&quot;></script>
<script type=text/javascript src=&quot;main.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">text/javascript</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"index.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">text/javascript</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li>如果你没有设置chunks选项，那么默认是全部显示</li></ul>
<p><strong>excludeChunks</strong></p>
<p>排除掉一些js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="excludeChunks: ['devor.js']
// 等价于上面的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">excludeChunks: [<span class="hljs-string">'devor.js'</span>]
<span class="hljs-comment">// 等价于上面的</span></code></pre>
<p><strong>xhtml</strong></p>
<p>一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件。</p>
<p><strong>chunksSortMode</strong></p>
<p>script的顺序，默认四个选项： <code>none</code> <code>auto</code> <code>dependency</code> <code>{function}</code></p>
<p>'dependency' 不用说，按照不同文件的依赖关系来排序。</p>
<p>'auto' 默认值，插件的内置的排序方式，具体顺序....</p>
<p>'none' 无序？</p>
<p>{function} 提供一个函数？</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
插件 html-webpack-plugin 的详解

## 原文链接
[https://segmentfault.com/a/1190000013883242](https://segmentfault.com/a/1190000013883242)


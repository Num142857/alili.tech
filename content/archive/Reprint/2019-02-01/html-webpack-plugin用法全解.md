---
title: 'html-webpack-plugin用法全解' 
date: 2019-02-01 2:30:10
hidden: true
slug: 6ky6j3hsnx5
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文只在个人博客和 SegmentFault 社区个人专栏发表，转载请注明出处  <br>个人博客: <a href="https://zengxiaotao.github.io" rel="nofollow noreferrer" target="_blank">https://zengxiaotao.github.io</a>  <br>SegmentFault 个人专栏: <a href="https://segmentfault.com/blog/zengxiaotao">https://segmentfault.com/blog...</a></p></blockquote>
<p>html-webpack-plugin 可能用过的 webpack 的童鞋都用过这个 plugin ,就算没用过可能也听过。我们在学习webpack的时候，可能经常会看到这样的一段代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
module.exports = {
    entry: path.resolve(__dirname, './app/index.js'),
    output:{
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    }
    ...
    plugins: [
        new HtmlWebpackPlugin()
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: path.resolve(__dirname, <span class="hljs-string">'./app/index.js'</span>),
    <span class="hljs-attr">output</span>:{
        <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'./build'</span>),
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
    }
    ...
    plugins: [
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin()
    ]
}</code></pre>
<p>之后在终端输入 webpack 命令后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">webpack</code></pre>
<p>你会神奇的看到在你的 build 文件夹会生成一个 index.html 文件和一个 bundle.js 文件，而且 index.html 文件中自动引用 webpack 生成的 bundle.js 文件。</p>
<p>所有的这些都是 html-webpack-plugin 的功劳。它会自动帮你生成一个 html 文件，并且引用相关的 assets 文件(如 css, js)。</p>
<p>自己在六月第一次接触前端自动化构建，学习 webpack 和 react 时，曾经简单使用过这个插件，但也只是用了常见的几个选项，今天就跟着官方文档走一走，看看它的所有用法。</p>
<h3 id="articleHeader0">title</h3>
<p>顾名思义，设置生成的 html 文件的标题。</p>
<h3 id="articleHeader1">filename</h3>
<p>也没什么说的，生成 html 文件的文件名。默认为 index.html.</p>
<h3 id="articleHeader2">template</h3>
<p>根据自己的指定的模板文件来生成特定的 html 文件。这里的模板类型可以是任意你喜欢的模板，可以是 html, jade, ejs, hbs, 等等，但是要注意的是，使用自定义的模板文件时，需要提前安装对应的 loader， 否则webpack不能正确解析。以 jade 为例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install jade-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install jade-loader --save-dev</code></pre>
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
<p>最终在build文件夹内会生成一个 yourfile.html 和 bundle.js 文件。现在我们再回头来看看之前将的 title 属性。</p>
<p>如果你既指定了 template 选项，又指定了 title 选项，那么webpack 会选择哪一个？ 事实上，这时候会选择你指定的模板文件的 title, <strong>即使你的模板文件中未设置 title</strong>。</p>
<p>那么 filename 呢，是否也会覆盖，其实不是，会以指定的 filename 作为文件名。</p>
<h3 id="articleHeader3">inject</h3>
<p>注入选项。有四个选项值 true, body, head, false.</p>
<ul>
<li>
<p>true</p>
<ul><li><p>默认值，script标签位于html文件的 body 底部</p></li></ul>
</li>
<li>
<p>body</p>
<ul><li><p>同 true</p></li></ul>
</li>
<li>
<p>head</p>
<ul><li><p>script 标签位于 head 标签内</p></li></ul>
</li>
<li>
<p>false</p>
<ul><li><p>不插入生成的 js 文件，只是单纯的生成一个 html 文件</p></li></ul>
</li>
</ul>
<h3 id="articleHeader4">favicon</h3>
<p>给生成的 html 文件生成一个 favicon。属性值为 favicon 文件所在的路径名。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
plugins: [
    new HtmlWebpackPlugin({
        ...
        favicon: 'path/to/yourfile.ico'
    }) 
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.config.js</span>
...
plugins: [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        ...
        favicon: <span class="hljs-string">'path/to/yourfile.ico'</span>
    }) 
]</code></pre>
<p>生成的 html 标签中会包含这样一个 link 标签</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;shortcut icon&quot; href=&quot;example.ico&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"shortcut icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"example.ico"</span>&gt;</span></code></pre>
<p>同 title 和 filename 一样，如果在模板文件指定了 favicon，会忽略该属性。</p>
<h3 id="articleHeader5">minify</h3>
<p>minify 的作用是对 html 文件进行压缩，minify 的属性值是一个压缩选项或者 false 。默认值为false, 不对生成的 html 文件进行压缩。来看看这个压缩选项。</p>
<p>html-webpack-plugin 内部集成了 <a href="https://github.com/kangax/html-minifier#options-quick-reference" rel="nofollow noreferrer" target="_blank">html-minifier</a> ,这个压缩选项同 html-minify 的压缩选项完全一样，<br>看一个简单的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
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
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.config.js</span>
...
plugins: [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        ...
        minify: {
            <span class="hljs-attr">removeAttributeQuotes</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">// 移除属性的引号</span>
        }
    })
]</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 原html片段 -->
<div id=&quot;example&quot; class=&quot;example&quot;>test minify</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 原html片段 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"example"</span>&gt;</span>test minify<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 生成的html片段 -->
<div id=example class=example>test minify</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 生成的html片段 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">example</span> <span class="hljs-attr">class</span>=<span class="hljs-string">example</span>&gt;</span>test minify<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader6">hash</h3>
<p>hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值为 false 。同样看一个例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
plugins: [
    new HtmlWebpackPlugin({
        ...
        hash: true
    })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.config.js</span>
plugins: [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        ...
        hash: <span class="hljs-literal">true</span>
    })
]</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=text/javascript src=bundle.js?22b9692e22e7be37b57e></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">text/javascript</span> <span class="hljs-attr">src</span>=<span class="hljs-string">bundle.js?22b9692e22e7be37b57e</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>执行 webpack 命令后，你会看到你的生成的 html 文件的 script 标签内引用的 js 文件，是不是有点变化了。<br>bundle.js 文件后跟的一串 hash 值就是此次 webpack 编译对应的 hash 值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack
Hash: 22b9692e22e7be37b57e
Version: webpack 1.13.2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ webpack
Hash: 22b9692e22e7be37b57e
Version: webpack 1.13.2</code></pre>
<h3 id="articleHeader7">cache</h3>
<p>默认值是 true。表示只有在内容变化时才生成一个新的文件。</p>
<h3 id="articleHeader8">showErrors</h3>
<p>showErrors 的作用是，如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true ，也就是显示错误信息。</p>
<h3 id="articleHeader9">chunks</h3>
<p>chunks 选项的作用主要是针对多入口(entry)文件。当你有多个入口文件的时候，对应就会生成多个编译后的 js 文件。那么 chunks 选项就可以决定是否都使用这些生成的 js 文件。</p>
<p>chunks 默认会在生成的 html 文件中引用所有的 js 文件，当然你也可以指定引入哪些特定的文件。</p>
<p>看一个小例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
entry: {
    index: path.resolve(__dirname, './src/index.js'),
    index1: path.resolve(__dirname, './src/index1.js'),
    index2: path.resolve(__dirname, './src/index2.js')
}
...
plugins: [
    new HtmlWebpackPlugin({
        ...
        chunks: ['index','index2']
    })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.config.js</span>
entry: {
    <span class="hljs-attr">index</span>: path.resolve(__dirname, <span class="hljs-string">'./src/index.js'</span>),
    <span class="hljs-attr">index1</span>: path.resolve(__dirname, <span class="hljs-string">'./src/index1.js'</span>),
    <span class="hljs-attr">index2</span>: path.resolve(__dirname, <span class="hljs-string">'./src/index2.js'</span>)
}
...
plugins: [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        ...
        chunks: [<span class="hljs-string">'index'</span>,<span class="hljs-string">'index2'</span>]
    })
]</code></pre>
<p>执行 webpack 命令之后，你会看到生成的 index.html 文件中，只引用了 index.js 和 index2.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
<script type=text/javascript src=index.js></script>
<script type=text/javascript src=index2.js></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">...
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">text/javascript</span> <span class="hljs-attr">src</span>=<span class="hljs-string">index.js</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">text/javascript</span> <span class="hljs-attr">src</span>=<span class="hljs-string">index2.js</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>而如果没有指定 chunks 选项，默认会全部引用。</p>
<h3 id="articleHeader10">excludeChunks</h3>
<p>弄懂了 chunks 之后，excludeChunks 选项也就好理解了，跟 chunks 是相反的，排除掉某些 js 文件。 比如上面的例子，其实等价于下面这一行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
excludeChunks: ['index1.js']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">...
excludeChunks: [<span class="hljs-string">'index1.js'</span>]</code></pre>
<h3 id="articleHeader11">chunksSortMode</h3>
<p>这个选项决定了 script 标签的引用顺序。默认有四个选项，'none', 'auto', 'dependency', '{function}'。</p>
<ul>
<li><p>'dependency' 不用说，按照不同文件的依赖关系来排序。</p></li>
<li><p>'auto' 默认值，插件的内置的排序方式，具体顺序这里我也不太清楚...</p></li>
<li><p>'none' 无序？ 不太清楚...</p></li>
<li><p>{function} 提供一个函数？但是函数的参数又是什么? 不太清楚...</p></li>
</ul>
<blockquote><p>如果有使用过这个选项或者知道其具体含义的同学，还请告知一下。。。</p></blockquote>
<h3 id="articleHeader12">xhtml</h3>
<p>一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件。</p>
<h3 id="articleHeader13">总结</h3>
<p>以上，就总结完了传入 <code>new HtmlWebpackPlugin()</code> 的选项，了解全部选项的含义后，可以在项目构建时更灵活的使用。</p>
<blockquote><p>全文完</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
html-webpack-plugin用法全解

## 原文链接
[https://segmentfault.com/a/1190000007294861](https://segmentfault.com/a/1190000007294861)


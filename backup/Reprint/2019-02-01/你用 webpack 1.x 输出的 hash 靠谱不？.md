---
title: '你用 webpack 1.x 输出的 hash 靠谱不？' 
date: 2019-02-01 2:30:10
hidden: true
slug: tbphltc7pb9
categories: [reprint]
---

{{< raw >}}

                    
<p>来自 <a href="http://zhenyong.site/2016/10/27/webpack-long-term-hash/" rel="nofollow noreferrer" target="_blank">http://zhenyong.site/2016/10/...</a></p>
<blockquote><p>使用 webpack 构建输出文件时，通常会给文件名加上 hash，该 hash 值根据文件内容计算得到，只要文件内容不变，hash 就不变，于是就可以利用浏览器缓存来节省下载流量。可是 webpack 提供的 hash 似乎不那么靠谱...</p></blockquote>
<p>本文只围绕如何保证 webpack 1.x 在 <strong>生产发布阶段</strong> 输出稳定的 hash 值展开讨论，如果对 webpack 还没了解的，可以戳 <a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">webpack</a>。</p>
<p>本文 基于 webpack 1.x 的背景展开讨论，毕竟有些问题在 webpack 2 已经得到解决。为了方便描述问题，文中展示的代码、配置可能很挫，也许不是工程最佳实践，请轻拍。</p>
<p>懒得看文章的可以考虑直接读插件源码 <a href="https://github.com/zhenyong/webpack-stable-module-id-and-hash" rel="nofollow noreferrer" target="_blank">zhenyong/webpack-stable-module-id-and-hash</a></p>
<h2 id="articleHeader0">目标</h2>
<p>除了 html 文件以外，其他静态资源文件名都带上哈希值，根据文件本身的内容计算得到，保证文件没变化，则构建后的文件名跟上次一样。</p>
<h2 id="articleHeader1">webpack 提供的 hash</h2>
<h3 id="articleHeader2">[hash]</h3>
<p>假设<strong>文件目录</strong>长这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/src
  |- pageA.js (入口1)
  |- pageB.js (入口2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>/src
  <span class="hljs-string">|- pageA.js (入口1)</span>
  <span class="hljs-string">|- pageB.js (入口2)</span></code></pre>
<p>使用 <strong>webpack 配置</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    pageA: './src/pageA.js',
    pageB: './src/pageB.js',
},
output: {
    path: __dirname + '/build',
    // [hash:4] 表示截取 [hash] 前四位
    filename: '[name].[hash:4].js'
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">entry: {
    <span class="hljs-attr">pageA</span>: <span class="hljs-string">'./src/pageA.js'</span>,
    <span class="hljs-attr">pageB</span>: <span class="hljs-string">'./src/pageB.js'</span>,
},
<span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">'/build'</span>,
    <span class="hljs-comment">// [hash:4] 表示截取 [hash] 前四位</span>
    filename: <span class="hljs-string">'[name].[hash:4].js'</span>
},</code></pre>
<p><strong>首次</strong>构建输出:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pageA.c56c.js  1.47 kB       0  [emitted]  pageA
pageB.c56c.js  1.47 kB       1  [emitted]  pageB" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">pageA</span><span class="hljs-selector-class">.c56c</span><span class="hljs-selector-class">.js</span>  1<span class="hljs-selector-class">.47</span> <span class="hljs-selector-tag">kB</span>       0  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageA</span>
<span class="hljs-selector-tag">pageB</span><span class="hljs-selector-class">.c56c</span><span class="hljs-selector-class">.js</span>  1<span class="hljs-selector-class">.47</span> <span class="hljs-selector-tag">kB</span>       1  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageB</span></code></pre>
<p><strong>再次</strong>构建输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pageA.c56c.js  1.47 kB       0  [emitted]  pageA
pageB.c56c.js  1.47 kB       1  [emitted]  pageB" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">pageA</span><span class="hljs-selector-class">.c56c</span><span class="hljs-selector-class">.js</span>  1<span class="hljs-selector-class">.47</span> <span class="hljs-selector-tag">kB</span>       0  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageA</span>
<span class="hljs-selector-tag">pageB</span><span class="hljs-selector-class">.c56c</span><span class="hljs-selector-class">.js</span>  1<span class="hljs-selector-class">.47</span> <span class="hljs-selector-tag">kB</span>       1  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageB</span></code></pre>
<p>hash 值是稳定的呀，是不是就可以了呢？且慢！</p>
<p>根据 <a href="https://github.com/webpack/docs/wiki/Configuration#outputfilename" rel="nofollow noreferrer" target="_blank">Configuration · webpack/docs Wiki</a> ：</p>
<blockquote><p>[hash] is replaced by the hash of the compilation.</p></blockquote>
<p>意译：</p>
<blockquote><p>[hash] 是根据一个 compilation 对象计算得出的哈希值，如果 compilation 对象的信息不变，则 [hash] 不变</p></blockquote>
<p>结合 <a href="http://webpack.github.io/docs/how-to-write-a-plugin.html#compiler-and-compilation" rel="nofollow noreferrer" target="_blank">how to write a plugin</a> 提到：</p>
<blockquote><p>A <code>compilation</code> object represents a single build of versioned assets. While running Webpack development middleware, a new compilation will be created each time a file change is detected, thus generating a new set of compiled assets. A compilation surfaces information about the present state of module resources, compiled assets, changed files, and watched dependencies.</p></blockquote>
<p>意译：</p>
<blockquote><p><code>compilation</code> 对象代表对某个版本进行一次编译构建的过程，如果在开发模式下（例如用 --watch 检测变化，实时编译），则每次内容变化时会新建一个 complidation，包含了构建所需的上下文信息（构建器配置、文件、文件依赖）。</p></blockquote>
<p>我们来动一下 <code>pageA.js</code>，再次构建：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pageA.e6a9.js  1.48 kB       0  [emitted]  pageA
pageB.e6a9.js  1.47 kB       1  [emitted]  pageB" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">pageA</span><span class="hljs-selector-class">.e6a9</span><span class="hljs-selector-class">.js</span>  1<span class="hljs-selector-class">.48</span> <span class="hljs-selector-tag">kB</span>       0  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageA</span>
<span class="hljs-selector-tag">pageB</span><span class="hljs-selector-class">.e6a9</span><span class="hljs-selector-class">.js</span>  1<span class="hljs-selector-class">.47</span> <span class="hljs-selector-tag">kB</span>       1  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageB</span></code></pre>
<p>发现 hash 变了，并且所有文件的 hash 值总是一样，这似乎就跟文档描述的一致，只要构建过程依赖的任何资源（代码）发生变化，<code>compilation</code> 的信息就会跟上一次不一样了。</p>
<p>那是不是肯定说，源码不变的话，hash 值就一定稳定呢？也不是的，我们改一下 webpack 配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    pageA: './src/pageA.js',
    // 不再构建入口 pageB
    // pageB: './src/pageB.js',
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">entry: {
    <span class="hljs-attr">pageA</span>: <span class="hljs-string">'./src/pageA.js'</span>,
    <span class="hljs-comment">// 不再构建入口 pageB</span>
    <span class="hljs-comment">// pageB: './src/pageB.js',</span>
},</code></pre>
<p>再次构建：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pageA.1f01.js  1.48 kB       0  [emitted]  pageA" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">pageA</span><span class="hljs-selector-class">.1f01</span><span class="hljs-selector-class">.js</span>  1<span class="hljs-selector-class">.48</span> <span class="hljs-selector-tag">kB</span>       0  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageA</span></code></pre>
<p><code>compilation</code> 的信息还包括构建上下文，所以，移除入口或者换个loader 都会引起 hash 改变。</p>
<p><code>[hash]</code> 的缺点很明显，不是根据内容来计算哈希，但是 hash 值是"稳定的"，用这种方案能保证『每次上线，浏览器访问到的静态资源都是新的（url 变了）』</p>
<p>你接受用 <code>[hash]</code> 吗，我是接受不了？于是我们看 webpack 提供的另一种根据内容计算 hash 的配置。</p>
<h3 id="articleHeader3">[chunkhash]</h3>
<blockquote><p>[chunkhash] is replaced by the hash of the chunk.</p></blockquote>
<p>意译：</p>
<blockquote><p>[chunkhash] 根据 chunk 的内容计算得到。（chunk 可以理解成一个输出文件，其中可能包含多个 js 模块）</p></blockquote>
<p>我们改下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    pageA: './src/pageA.js',
    pageB: './src/pageB.js',
},
output: {
    path: __dirname + '/build',
    filename: '[name].[chunkhash:4].js',
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">entry</span>: {
    <span class="hljs-attribute">pageA</span>: <span class="hljs-string">'./src/pageA.js'</span>,
    pageB: <span class="hljs-string">'./src/pageB.js'</span>,
},
<span class="hljs-selector-tag">output</span>: {
    <span class="hljs-attribute">path</span>: __dirname + <span class="hljs-string">'/build'</span>,
    filename: <span class="hljs-string">'[name].[chunkhash:4].js'</span>,
},</code></pre>
<p>构建试试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pageA.f308.js  1.48 kB       0  [emitted]  pageA
pageB.53a9.js  1.47 kB       1  [emitted]  pageB" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">pageA</span><span class="hljs-selector-class">.f308</span><span class="hljs-selector-class">.js</span>  1<span class="hljs-selector-class">.48</span> <span class="hljs-selector-tag">kB</span>       0  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageA</span>
<span class="hljs-selector-tag">pageB</span><span class="hljs-selector-class">.53a9</span><span class="hljs-selector-class">.js</span>  1<span class="hljs-selector-class">.47</span> <span class="hljs-selector-tag">kB</span>       1  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageB</span></code></pre>
<p>动下 <code>pageA.js</code> 再构建：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pageA.16d6.js  1.48 kB       0  [emitted]  pageA
pageB.53a9.js  1.47 kB       1  [emitted]  pageB" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">pageA</span><span class="hljs-selector-class">.16d6</span><span class="hljs-selector-class">.js</span>  1<span class="hljs-selector-class">.48</span> <span class="hljs-selector-tag">kB</span>       0  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageA</span>
<span class="hljs-selector-tag">pageB</span><span class="hljs-selector-class">.53a9</span><span class="hljs-selector-class">.js</span>  1<span class="hljs-selector-class">.47</span> <span class="hljs-selector-tag">kB</span>       1  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageB</span></code></pre>
<p>发现只有 pageA 的 hash 变了，似乎 [chunkhash] 就能解决问题了？且慢！</p>
<p>我们目前的代码没涉及到 css，先加点 css 文件依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/src
  |- pageA.js
  |- pageA.css

//pageA.js
require('./a.css');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>/src
  <span class="hljs-string">|- pageA.js</span>
  <span class="hljs-string">|- pageA.css</span>

<span class="hljs-comment">//pageA.js</span>
require('./a.css');
</code></pre>
<p>给 webpack 配置 css 文件的 loader，并且抽取所有样式输出到一个文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    loaders: [{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }],
},
plugins: [
    // 这里的 contenthash 是 ExtractTextPlugin 根据抽取输出的文件内容计算得到
    new ExtractTextPlugin('[name].[contenthash:4].css')
]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">module:</span> {
<span class="hljs-symbol">    loaders:</span> [{
<span class="hljs-symbol">        test:</span> <span class="hljs-regexp">/\.css$/</span>,
<span class="hljs-symbol">        loader:</span> ExtractTextPlugin.extract(<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>)
    }],
},
<span class="hljs-string">plugins:</span> [
    <span class="hljs-comment">// 这里的 contenthash 是 ExtractTextPlugin 根据抽取输出的文件内容计算得到</span>
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'[name].[contenthash:4].css'</span>)
],</code></pre>
<p>构建：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pageA.ab4b.js    1.6 kB       0  [emitted]  pageA
pageA.b9bc.css  36 bytes       0  [emitted]  pageA" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">pageA</span><span class="hljs-selector-class">.ab4b</span><span class="hljs-selector-class">.js</span>    1<span class="hljs-selector-class">.6</span> <span class="hljs-selector-tag">kB</span>       0  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageA</span>
<span class="hljs-selector-tag">pageA</span><span class="hljs-selector-class">.b9bc</span><span class="hljs-selector-class">.css</span>  36 <span class="hljs-selector-tag">bytes</span>       0  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageA</span></code></pre>
<p>改一下样式，那么样式的 hash 肯定会变的，那 pageA.js 的 hash 变不变呢?</p>
<p>答案是『变了』：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pageA.0482.js    1.6 kB       0  [emitted]  pageA
pageA.c61a.css  31 bytes       0  [emitted]  pageA" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">pageA</span><span class="hljs-selector-class">.0482</span><span class="hljs-selector-class">.js</span>    1<span class="hljs-selector-class">.6</span> <span class="hljs-selector-tag">kB</span>       0  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageA</span>
<span class="hljs-selector-tag">pageA</span><span class="hljs-selector-class">.c61a</span><span class="hljs-selector-class">.css</span>  31 <span class="hljs-selector-tag">bytes</span>       0  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageA</span></code></pre>
<p>记得之前说 webpack 的 <code>[chunkhash]</code> 是根据 chunk 的内容计算的，而 pageA.js 这个 chunk 的输出在 webpack 看来是包括 css 文件的，只不过被你抽取出来罢了，所以你改 css 也就改了这个 chunk 的内容，这体验很不好吧，怎么让 css 不影响 js 的 hash 呢？</p>
<h2 id="articleHeader4">自定义 chunkhash</h2>
<p>源码 <a href="https://github.com/webpack/webpack/blob/75caa169bcf63c66ab069c38c73c3ab0e873cdc2/lib/Compilation.js#L915,L928" rel="nofollow noreferrer" target="_blank">webpack/Compilation.js</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
this.applyPlugins(&quot;chunk-hash&quot;, chunk, chunkHash);
chunk.hash = chunkHash.digest(hashDigest);
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>...
this.applyPlugins(<span class="hljs-string">"chunk-hash"</span>, chunk, chunkHash);
chunk.hash = chunkHash.digest(hashDigest);
...</code></pre>
<p>通过这段代码可以发现，通过在 'chunk-hash' "钩子" 中替换掉 chunk 的 digest 方法，就可以自定义 <code>chunk.hash</code> 了。</p>
<p>查看文档 <a href="http://webpack.github.io/docs/how-to-write-a-plugin.html#accessing-the-compilation" rel="nofollow noreferrer" target="_blank">how to write a plugin</a> 了解怎么写插件来注册一个钩子方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
        ...
        new ContentHashPlugin() // 添加插件（生产发布阶段使用）
    ],
};

// 插件函数
function ContentHashPlugin() {}
// webpack 会执行插件函数的 apply 方法
ContentHashPlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('chunk-hash', function(chunk, chunkHash) {
            // 这里注册了之前说到的 'chunk-hash' 钩子
            chunk.digest = function () {
                return '这就是自定义的 hash 值';
            }
        });
    });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">plugins: [
        ...
        new ContentHashPlugin() <span class="hljs-comment">// 添加插件（生产发布阶段使用）</span>
    ],
};

<span class="hljs-comment">// 插件函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ContentHashPlugin</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-comment">// webpack 会执行插件函数的 apply 方法</span>
ContentHashPlugin.prototype.apply = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compiler</span>) </span>{
    compiler.plugin(<span class="hljs-string">'compilation'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compilation</span>) </span>{
        compilation.plugin(<span class="hljs-string">'chunk-hash'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">chunk, chunkHash</span>) </span>{
            <span class="hljs-comment">// 这里注册了之前说到的 'chunk-hash' 钩子</span>
            chunk.digest = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-string">'这就是自定义的 hash 值'</span>;
            }
        });
    });
};</code></pre>
<p>那么这个 hash 值如何计算好呢？</p>
<p>可以将 chunk 所依赖的各个模块 (单个源码文件) 的内容拼接后计算一个 md5 作为 hash 值，当然需要对所有文件排序后再拼接：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var crypto = require('crypto');

var md5Cache = {}

function md5(content) {
    if (!md5Cache[content]) {
        md5Cache[content] = crypto.createHash('md5') //
            .update(content, 'utf-8').digest('hex')
    }
    return md5Cache[content];
}

function ContentHashPlugin() {}

ContentHashPlugin.prototype.apply = function(compiler) {
    var context = compiler.options.context;

    function getModFilePath(mod) {
        // 获取形如 './src/pageA.css' 这样的路径
        // libIdent 方法会处理好不同平台的路径分隔符问题
        return mod.libIdent({
            context: context
        });
    }

    // 根据模块对应的文件路径排序
    //（可以根据模块ID，但是暂时不靠谱，后面会讲）
    function compareMod(modA, modB) {
        var modAPath = getModFilePath(modA);
        var modBPath = getModFilePath(modB);
        return modAPath > modBPath ? 1 : modAPath < modBPath ? -1 : 0;
    }

    // 获取模块源码，开发阶段别用
    function getModSrc(mod) {
        return mod._source &amp;&amp; mod._source._value || '';
    }

    compiler.plugin(&quot;compilation&quot;, function(compilation) {
        compilation.plugin(&quot;chunk-hash&quot;, function(chunk, chunkHash) {
            var source = chunk.modules.sort(compareMod).map(getModSrc).join('');
            chunkHash.digest = function() {
                return md5(source);
            };
        });
    });
};

module.exports = ContentHashPlugin;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> crypto = <span class="hljs-built_in">require</span>(<span class="hljs-string">'crypto'</span>);

<span class="hljs-keyword">var</span> md5Cache = {}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">md5</span>(<span class="hljs-params">content</span>) </span>{
    <span class="hljs-keyword">if</span> (!md5Cache[content]) {
        md5Cache[content] = crypto.createHash(<span class="hljs-string">'md5'</span>) <span class="hljs-comment">//</span>
            .update(content, <span class="hljs-string">'utf-8'</span>).digest(<span class="hljs-string">'hex'</span>)
    }
    <span class="hljs-keyword">return</span> md5Cache[content];
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ContentHashPlugin</span>(<span class="hljs-params"></span>) </span>{}

ContentHashPlugin.prototype.apply = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compiler</span>) </span>{
    <span class="hljs-keyword">var</span> context = compiler.options.context;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getModFilePath</span>(<span class="hljs-params">mod</span>) </span>{
        <span class="hljs-comment">// 获取形如 './src/pageA.css' 这样的路径</span>
        <span class="hljs-comment">// libIdent 方法会处理好不同平台的路径分隔符问题</span>
        <span class="hljs-keyword">return</span> mod.libIdent({
            <span class="hljs-attr">context</span>: context
        });
    }

    <span class="hljs-comment">// 根据模块对应的文件路径排序</span>
    <span class="hljs-comment">//（可以根据模块ID，但是暂时不靠谱，后面会讲）</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compareMod</span>(<span class="hljs-params">modA, modB</span>) </span>{
        <span class="hljs-keyword">var</span> modAPath = getModFilePath(modA);
        <span class="hljs-keyword">var</span> modBPath = getModFilePath(modB);
        <span class="hljs-keyword">return</span> modAPath &gt; modBPath ? <span class="hljs-number">1</span> : modAPath &lt; modBPath ? <span class="hljs-number">-1</span> : <span class="hljs-number">0</span>;
    }

    <span class="hljs-comment">// 获取模块源码，开发阶段别用</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getModSrc</span>(<span class="hljs-params">mod</span>) </span>{
        <span class="hljs-keyword">return</span> mod._source &amp;&amp; mod._source._value || <span class="hljs-string">''</span>;
    }

    compiler.plugin(<span class="hljs-string">"compilation"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compilation</span>) </span>{
        compilation.plugin(<span class="hljs-string">"chunk-hash"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">chunk, chunkHash</span>) </span>{
            <span class="hljs-keyword">var</span> source = chunk.modules.sort(compareMod).map(getModSrc).join(<span class="hljs-string">''</span>);
            chunkHash.digest = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> md5(source);
            };
        });
    });
};

<span class="hljs-built_in">module</span>.exports = ContentHashPlugin;</code></pre>
<p>此时，pageA.css 修改之后，再也不会影响 pageA.js 的 hash 值。</p>
<p>另外要注意，ExtractTextPlugin 会把 pageA.css 的内容抽取之后，替换该模块的内容 <code>mod._source._value</code> 为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// removed by extract-text-webpack-plugin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">// removed <span class="hljs-keyword">by</span> extract-<span class="hljs-keyword">text</span>-webpack-plugin</code></pre>
<p>由于每一个 css 模块都对应这段内容，所以不会影响效果。</p>
<p><a href="https://github.com/erm0l0v/webpack-md5-hash" rel="nofollow noreferrer" target="_blank">erm0l0v/webpack-md5-hash</a> 插件也是为了解决类似问题，但是它其中的『排序』算法是基于模块的 id，而模块的 id 理论上是不稳定的，接下来我们就讨论不稳定的模块 ID 带来的坑。</p>
<h2 id="articleHeader5">模块 ID 的坑</h2>
<p>我们简单的把每个文件理解为一个模块（module），在 webpack 处理模块依赖关系时，会给每个模块定义一个 ID，查看 <a href="https://github.com/webpack/webpack/blob/75caa169bcf63c66ab069c38c73c3ab0e873cdc2/lib/Compilation.js#L748" rel="nofollow noreferrer" target="_blank">webpack/Compilation.js </a> 发现，webpack 根据收集 module 的顺序给每个模块分配递增数字作为 ID，至于『收集的 module 顺序』，在你开发生涯里，这玩意绝对是不稳定！不稳定的！</p>
<h3 id="articleHeader6">Module ID 不稳定怎么了</h3>
<p>我们的<strong>文件结构</strong>现在长这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/src
    |- pageA.js
    |- pageB.js
    |- a.js
    |- b.js
    |- c.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>/src
    <span class="hljs-string">|- pageA.js</span>
    <span class="hljs-string">|- pageB.js</span>
    <span class="hljs-string">|- a.js</span>
    <span class="hljs-string">|- b.js</span>
    <span class="hljs-string">|- c.js</span></code></pre>
<p>pageA.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('./a.js') // a.js
require('./b.js') // b.js
var a = 'this is pageA';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">'./a.js'</span>) <span class="hljs-comment">// a.js</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'./b.js'</span>) <span class="hljs-comment">// b.js</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-string">'this is pageA'</span>;</code></pre>
<p>pageB.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('./b.js') //  b.js'
require('./c.js') // c.js
var b = 'this is pageB';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">'./b.js'</span>) <span class="hljs-comment">//  b.js'</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'./c.js'</span>) <span class="hljs-comment">// c.js</span>
<span class="hljs-keyword">var</span> b = <span class="hljs-string">'this is pageB'</span>;</code></pre>
<p>更新配置，把引用达到 2 次的模块抽取出来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  output: {
        chunkFilename: &quot;[id].[chunkhash:4].bundle.js&quot;,
    ...
plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: &quot;commons&quot;,
        minChunks: 2,
        chunks: [&quot;pageA&quot;, &quot;pageB&quot;],
    }),
    ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  output: {
        <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">"[id].[chunkhash:4].bundle.js"</span>,
    ...
plugins: [
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
        <span class="hljs-attr">name</span>: <span class="hljs-string">"commons"</span>,
        <span class="hljs-attr">minChunks</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">chunks</span>: [<span class="hljs-string">"pageA"</span>, <span class="hljs-string">"pageB"</span>],
    }),
    ...</code></pre>
<p>build build build:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  pageA.1cda.js  262 bytes       0  [emitted]  pageA
  pageB.0752.js  280 bytes       1  [emitted]  pageB
commons.14bf.js    3.64 kB       2  [emitted]  commons" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>  <span class="hljs-selector-tag">pageA</span><span class="hljs-selector-class">.1cda</span><span class="hljs-selector-class">.js</span>  262 <span class="hljs-selector-tag">bytes</span>       0  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageA</span>
  <span class="hljs-selector-tag">pageB</span><span class="hljs-selector-class">.0752</span><span class="hljs-selector-class">.js</span>  280 <span class="hljs-selector-tag">bytes</span>       1  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageB</span>
<span class="hljs-selector-tag">commons</span><span class="hljs-selector-class">.14bf</span><span class="hljs-selector-class">.js</span>    3<span class="hljs-selector-class">.64</span> <span class="hljs-selector-tag">kB</span>       2  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">commons</span></code></pre>
<p>观察 pageB.0752.js，有一段:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="__webpack_require__(2) //  b.js'
__webpack_require__(3) // c.js
var b = 'this is pageB';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">__webpack_require__(<span class="hljs-number">2</span>) <span class="hljs-comment">//  b.js'</span>
__webpack_require__(<span class="hljs-number">3</span>) <span class="hljs-comment">// c.js</span>
<span class="hljs-keyword">var</span> b = <span class="hljs-string">'this is pageB'</span>;</code></pre>
<p>从上面看出，webpack 构建时给 <code>b.js</code> 的模块 ID 为 <strong>2</strong></p>
<p>这时，我们改一下 <strong>pageA.js</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 移除对 a.js 的依赖
// require('./a.js') // a.js
require('./b.js') // b.js
var a = 'this is pageA';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 移除对 a.js 的依赖</span>
<span class="hljs-comment">// require('./a.js') // a.js</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'./b.js'</span>) <span class="hljs-comment">// b.js</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-string">'this is pageA'</span>;</code></pre>
<p>build build build ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  pageA.a945.js  200 bytes       0  [emitted]  pageA
  pageB.0752.js  271 bytes       1  [emitted]  pageB
commons.14bf.js    3.65 kB       2  [emitted]  commons" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>  <span class="hljs-selector-tag">pageA</span><span class="hljs-selector-class">.a945</span><span class="hljs-selector-class">.js</span>  200 <span class="hljs-selector-tag">bytes</span>       0  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageA</span>
  <span class="hljs-selector-tag">pageB</span><span class="hljs-selector-class">.0752</span><span class="hljs-selector-class">.js</span>  271 <span class="hljs-selector-tag">bytes</span>       1  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">pageB</span>
<span class="hljs-selector-tag">commons</span><span class="hljs-selector-class">.14bf</span><span class="hljs-selector-class">.js</span>    3<span class="hljs-selector-class">.65</span> <span class="hljs-selector-tag">kB</span>       2  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-tag">commons</span></code></pre>
<p>嗯! 只有 pageA.js 的 hash 变了，挺合理合理，我们进去 pageB.0752.js 看看</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    __webpack_require__(1) //  b.js'
    __webpack_require__(2) // c.js
    var b = 'this is pageB';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    __webpack_require__(<span class="hljs-number">1</span>) <span class="hljs-comment">//  b.js'</span>
    __webpack_require__(<span class="hljs-number">2</span>) <span class="hljs-comment">// c.js</span>
    <span class="hljs-keyword">var</span> b = <span class="hljs-string">'this is pageB'</span>;</code></pre>
<p>看出来了没！这次构建，webpack 给 <code>b.js</code> 的 ID 是 <strong>1</strong>。</p>
<p>我们 pageB.js 的 hash 没变，因为背后依赖的模块内容 (b.js、c.js) 没有变呀，但是此时 pageB.0752.js 的内容确实变了，如果你用 CDN 上传这个文件，<strong>也许</strong>会传不上去，因为文件大小和名称一模一样，就是这个不稳定的模块 ID 给坑的！</p>
<p>怎么解决呢？</p>
<p>第一念头：把原来计算 hash 的方式改一下，就那构建输出后的文件内容来计算？</p>
<p>细想: 不要，明明 pageB 这一次就不用重新上传的，浪费。</p>
<p>比较优雅的思路就是：让模块 ID 给我稳定下来！！！</p>
<h3 id="articleHeader7">给我稳定的 Module ID</h3>
<h4>webpack 1 的官方方案</h4>
<p>webpack 文档提供了几种方案</p>
<ul>
<li>
<p><a href="http://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin" rel="nofollow noreferrer" target="_blank">OccurrenceOrderPlugin</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="这个插件根据 module 被引用的次数（被 entry 引用、被 chunk 引用）来排序分配 ID，如果你的整个应用的文件依赖是没太多变化，那么模块 ID 就稳定，但是谁能保证呢？
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>这个插件根据 <span class="hljs-class"><span class="hljs-keyword">module</span> 被引用的次数（被 <span class="hljs-title">entry</span> 引用、被 <span class="hljs-title">chunk</span> 引用）来排序分配 <span class="hljs-title">ID</span>，如果你的整个应用的文件依赖是没太多变化，那么模块 <span class="hljs-title">ID</span> 就稳定，但是谁能保证呢？</span>
</code></pre>
</li>
<li>
<p><a href="http://webpack.github.io/docs/configuration.html#recordspath-recordsinputpath-recordsoutputpath" rel="nofollow noreferrer" target="_blank"><code>recordsPath 配置</code></a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=">Store/Load compiler state from/to a json file. This will result in persistent ids of modules and chunks.

会记录每一次打包的模块的&quot;文件处理路径&quot;使用的 ID，下次打包同样的模块直接使用记录中的 ID:
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>&gt;Store/Load compiler state <span class="hljs-built_in">from</span>/<span class="hljs-built_in">to</span> <span class="hljs-keyword">a</span> json <span class="hljs-built_in">file</span>. This will <span class="hljs-built_in">result</span> <span class="hljs-keyword">in</span> persistent ids <span class="hljs-keyword">of</span> modules <span class="hljs-keyword">and</span> chunks.

会记录每一次打包的模块的<span class="hljs-string">"文件处理路径"</span>使用的 ID，下次打包同样的模块直接使用记录中的 ID:
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;node_modules/style-loader/index.js!node_modules/css-loader/index.js!src/b.css&quot;: 9," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code style="word-break: break-word; white-space: initial;">  "node_modules/style-loader/<span class="hljs-keyword">index</span>.js!node_modules/css-loader/<span class="hljs-keyword">index</span>.js!src/b.css<span class="hljs-string">": 9,</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

这就要求每个人都得提交这份文件了，港真，我觉得体验很差咯。

另外一旦你修改文件名，或者是增减 loader，原来的路径就无效了，从而再次入坑！
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>

<span class="undefined">这就要求每个人都得提交这份文件了，港真，我觉得体验很差咯。

另外一旦你修改文件名，或者是增减 loader，原来的路径就无效了，从而再次入坑！
</span></code></pre>
</li>
<li>
<p><a href="http://webpack.github.io/docs/list-of-plugins.html#dllplugin" rel="nofollow noreferrer" target="_blank">DllPlugin 和 DllReferencePlugin</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="原理就是在你打包源码前，你得新建一个构建配置用 [DllPlugin](https://github.com/webpack/webpack/tree/master/examples/dll) 单独打包生成一份模块文件路径对应的 ID 记录，然后在你的原来配置使用 [DllReferencePlugin](https://github.com/webpack/webpack/tree/master/examples/dll-user) 引用这份记录，跟 recordsPath 大同小异，但是更高效和稳定，但是这个额外的构建，我觉得不够优雅，至于能快多少呢，我目前还不在意这个速度，另外还是得提交多一份记录文件。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>原理就是在你打包源码前，你得新建一个构建配置用 [<span class="hljs-string">DllPlugin</span>](<span class="hljs-link">https://github.com/webpack/webpack/tree/master/examples/dll</span>) 单独打包生成一份模块文件路径对应的 ID 记录，然后在你的原来配置使用 [<span class="hljs-string">DllReferencePlugin</span>](<span class="hljs-link">https://github.com/webpack/webpack/tree/master/examples/dll-user</span>) 引用这份记录，跟 recordsPath 大同小异，但是更高效和稳定，但是这个额外的构建，我觉得不够优雅，至于能快多少呢，我目前还不在意这个速度，另外还是得提交多一份记录文件。
</code></pre>
</li>
</ul>
<h4>webpack 2 的思路</h4>
<ul>
<li><p><a href="https://github.com/webpack/webpack/blob/master/lib/HashedModuleIdsPlugin.js" rel="nofollow noreferrer" target="_blank">webpack/HashedModuleIdsPlugin.js at master · webpack/webpack</a></p></li>
<li><p><a href="https://github.com/webpack/webpack/blob/master/lib/NamedModulesPlugin.js" rel="nofollow noreferrer" target="_blank">webpack/NamedModulesPlugin.js at master · webpack/webpack</a></p></li>
</ul>
<p>以上两个插件的思路都是用模块对应的文件路径直接作为模块 ID，而不是 webpack 1 中的默认使用数字，另外 webpack 1 不接受非数字作为 模块 ID。</p>
<h4>我们的思路</h4>
<p>把模块对应的文件路径通过一个哈希计算映射为数字，用这个全局唯一的数字作为 ID 就解决了，妥妥的！</p>
<p>参考：</p>
<ul>
<li><p><a href="https://github.com/webpack/webpack/blob/75caa169bcf63c66ab069c38c73c3ab0e873cdc2/lib/Compilation.js#L569,L571" rel="nofollow noreferrer" target="_blank">webpack/Compilation.js 中暴露的 before-module-ids 钩子</a></p></li>
<li><p><a href="https://github.com/webpack/webpack/blob/54aa3cd0d6167943713491fd5e1110b777336be6/lib/HashedModuleIdsPlugin.js" rel="nofollow noreferrer" target="_blank">webpack/HashedModuleIdsPlugin.js</a></p></li>
</ul>
<p>给出 webpack 1.x 中的解决方案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...

xx.prototype.apply = function(compiler) {

  function hexToNum(str) {
    str = str.toUpperCase();
    var code = ''
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i) + '';
      if ((c + '').length < 2) {
        c = '0' + c
      }
      code += c
    }
    return parseInt(code, 10);
  }

  var usedIds = {};

  function genModuleId(module) {
    var modulePath = module.libIdent({
      context: compiler.options.context
    });
    var id = md5(modulePath);
    var len = 4;
    while (usedIds[id.substr(0, len)]) {
      len++;
    }
    id = id.substr(0, len);
    return hexToNum(id)
  }

  compiler.plugin(&quot;compilation&quot;, function(compilation) {
    compilation.plugin(&quot;before-module-ids&quot;, function(modules) {
      modules.forEach(function(module) {
        if (module.libIdent &amp;&amp; module.id === null) {
          module.id = genModuleId(module);
          usedIds[module.id] = true;
        }
      });
    });
  });
};
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>...

xx.prototype.apply = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compiler</span>) </span>{

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hexToNum</span>(<span class="hljs-params">str</span>) </span>{
    str = str.toUpperCase();
    <span class="hljs-keyword">var</span> code = <span class="hljs-string">''</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; str.length; i++) {
      <span class="hljs-keyword">var</span> c = str.charCodeAt(i) + <span class="hljs-string">''</span>;
      <span class="hljs-keyword">if</span> ((c + <span class="hljs-string">''</span>).length &lt; <span class="hljs-number">2</span>) {
        c = <span class="hljs-string">'0'</span> + c
      }
      code += c
    }
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">parseInt</span>(code, <span class="hljs-number">10</span>);
  }

  <span class="hljs-keyword">var</span> usedIds = {};

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">genModuleId</span>(<span class="hljs-params">module</span>) </span>{
    <span class="hljs-keyword">var</span> modulePath = <span class="hljs-built_in">module</span>.libIdent({
      <span class="hljs-attr">context</span>: compiler.options.context
    });
    <span class="hljs-keyword">var</span> id = md5(modulePath);
    <span class="hljs-keyword">var</span> len = <span class="hljs-number">4</span>;
    <span class="hljs-keyword">while</span> (usedIds[id.substr(<span class="hljs-number">0</span>, len)]) {
      len++;
    }
    id = id.substr(<span class="hljs-number">0</span>, len);
    <span class="hljs-keyword">return</span> hexToNum(id)
  }

  compiler.plugin(<span class="hljs-string">"compilation"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compilation</span>) </span>{
    compilation.plugin(<span class="hljs-string">"before-module-ids"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">modules</span>) </span>{
      modules.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">module</span>.libIdent &amp;&amp; <span class="hljs-built_in">module</span>.id === <span class="hljs-literal">null</span>) {
          <span class="hljs-built_in">module</span>.id = genModuleId(<span class="hljs-built_in">module</span>);
          usedIds[<span class="hljs-built_in">module</span>.id] = <span class="hljs-literal">true</span>;
        }
      });
    });
  });
};
...</code></pre>
<p>注册钩子的思路跟之前的 content hash 插件差不多，获取到模块文件路径后，通过 md5 计算输出 16 进制的字符串（[0-9A-E]），再把字符串的字符逐个转为 ascii 形式的整数，由于 16 进制字符串只会包含 <code>[0-9A-E]</code>，所以保证单个字符转化的整数是两位就能保证这个算法是有效的。</p>
<p>举例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="path = '/node_module/xxx'
md5Hash = md5(path) // => A3E...
nul = hexToNum(md5Hash) // => 650369 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">path</span> = <span class="hljs-string">'/node_module/xxx'</span>
<span class="hljs-attr">md5Hash</span> = md5(path) // =&gt; A3E...
<span class="hljs-attr">nul</span> = hexToNum(md5Hash) // =&gt; <span class="hljs-number">650369</span> </code></pre>
<p>这个方案还有些小缺点，就是用模块文件路径作为哈希输入还不是百分百完美，如果文件名改了，那么模块 ID 就 "不稳定了"。其实，可以用模块文件内容作为哈希输入，考虑到效率问题，权衡之下还是用路径好了。</p>
<h2 id="articleHeader8">总结</h2>
<p>为了保证 webpack 1.x 生产阶段的文件 hash 值能够完美跟文件内容一一映射，查阅了大量信息，根据目前 github 上讨论的解决方案算是大体解决了问题，但是还不够优雅和完美，于是借鉴 webpack 2 的思路加上一点小技巧，比较优雅地解决了这个问题。</p>
<p>插件放在 Github: <a href="https://github.com/zhenyong/webpack-stable-module-id-and-hash" rel="nofollow noreferrer" target="_blank">zhenyong/webpack-stable-module-id-and-hash</a>『有用的话给个 star 嘛 O(∩_∩)O』</p>
<h2 id="articleHeader9">参考资料</h2>
<ul>
<li><p><a href="https://github.com/webpack/webpack/issues/1315" rel="nofollow noreferrer" target="_blank">Vendor chunkhash changes when app code changes · Issue #1315 · webpack/webpack</a></p></li>
<li><p><a href="https://github.com/webpack/webpack/issues/1315" rel="nofollow noreferrer" target="_blank">Vendor chunkhash changes when app code changes · Issue #1315 · webpack/webpack</a></p></li>
<li><p><a href="http://www.cnblogs.com/ihardcoder/p/5623411.html" rel="nofollow noreferrer" target="_blank">Webpack中hash与chunkhash的区别，以及js与css的hash指纹解耦方案 - zhoujunpeng - 博客园</a></p></li>
<li><p><a href="http://www.alloyteam.com/2016/01/webpack-use-optimization/" rel="nofollow noreferrer" target="_blank">webpack使用优化 | Web前端 腾讯AlloyTeam Blog | 愿景: 成为地球卓越的Web团队！</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你用 webpack 1.x 输出的 hash 靠谱不？

## 原文链接
[https://segmentfault.com/a/1190000007309850](https://segmentfault.com/a/1190000007309850)


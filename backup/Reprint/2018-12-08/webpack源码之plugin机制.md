---
title: 'webpack源码之plugin机制' 
date: 2018-12-08 2:30:30
hidden: true
slug: kgu346mk19
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">引言</h3>
<blockquote>在上一篇文章Tapable中介绍了其概念和一些原理用法,和这次讨论分析webpack plugin的关联很大。下面从实现一个插件入手。</blockquote>
<h3 id="articleHeader1">demo插件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function FileListPlugin(options) {}

FileListPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    var filelist = 'In this build:\n\n';
    for (var filename in compilation.assets) {
      filelist += ('- '+ filename +'\n');
    }
    compilation.assets['filelist.md'] = {
      source: function() {
        return filelist;
      },
      size: function() {
        return filelist.length;
      }
    };

    callback();
  });
};

module.exports = FileListPlugin;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FileListPlugin</span>(<span class="hljs-params">options</span>) </span>{}

FileListPlugin.prototype.apply = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compiler</span>) </span>{
  compiler.plugin(<span class="hljs-string">'emit'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compilation, callback</span>) </span>{
    <span class="hljs-keyword">var</span> filelist = <span class="hljs-string">'In this build:\n\n'</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> filename <span class="hljs-keyword">in</span> compilation.assets) {
      filelist += (<span class="hljs-string">'- '</span>+ filename +<span class="hljs-string">'\n'</span>);
    }
    compilation.assets[<span class="hljs-string">'filelist.md'</span>] = {
      <span class="hljs-attr">source</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> filelist;
      },
      <span class="hljs-attr">size</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> filelist.length;
      }
    };

    callback();
  });
};

<span class="hljs-built_in">module</span>.exports = FileListPlugin;</code></pre>
<p><strong>说明</strong> demo例子参考了webpack的<a href="https://webpack.js.org/contribute/writing-a-plugin/" rel="nofollow noreferrer" target="_blank">官方文档</a>,使用这个简短的demo作为我们分析的入口,一步一步来分析。<br>首先我们写插件都是这种结构形式,只有这样webpack才能解析。而上面这个简短的插件的作用是将build后asset目录下的所有的文件遍历后取出文件名,然后生成一个filelist.md文件。<br>原型上为什么要有apply方法呢?因为在安装插件时，apply方法会被 webpack compiler 调用一次。调用的目的是为了注册你的逻辑,指定一个绑定到 webpack 自身的事件钩子。</p>
<p>webpack的事件钩子有很多如下所示,列举几个比较重要常用的的,加深下印象</p>
<blockquote><ul>
<li>compile 编译器开始编译</li>
<li>compilation 编译器开始一个新的编译过程</li>
<li>emit  在生成资源并输出到目录之前</li>
<li>done  完成编译</li>
</ul></blockquote>
<p>查看更多事件<a href="https://doc.webpack-china.org/api/compiler/#event-hooks" rel="nofollow noreferrer" target="_blank">钩子</a><br>在上<a href="https://segmentfault.com/a/1190000014031536">一篇文章</a>中分析谈到过compiler是继承自tapable,正是因为它mix了Tapable 类，才具备注册和调用插件功能,而执行plugin方法其实就相当hook.tap(tapOpt, options.fn)进行存储, 然后webpack在启动运行期间,到达某个阶段,就会触发调用相应的事件。额外传入一个 callback 回调函数,只有在插件中操作是异步的时候才需要,同步操作不需要传入和执行这个callback。<br>还有一点需要注意的是compiler和compilation区别?</p>
<blockquote>compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。<p>compilation 对象代表了一次资源版本构建。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。</p>
</blockquote>
<h2 id="articleHeader2">安装使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const FileListPlugin = require('fileList');
module.exports = {
    entry: './src/main.js',
    output:{
        path: path.join(__dirname,'dist'), 
        filename: '[name].js'
    },
    plugins: [
        new FileListPlugin({options: true})
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> FileListPlugin = require(<span class="hljs-string">'fileList'</span>);
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    entry: <span class="hljs-string">'./src/main.js'</span>,
    output:{
        path: path.join(__dirname,<span class="hljs-string">'dist'</span>), 
        filename: <span class="hljs-string">'[name].js'</span>
    },
    plugins: [
        <span class="hljs-keyword">new</span> FileListPlugin({options: <span class="hljs-keyword">true</span>})
    ]
}</code></pre>
<p>输出结果<br><span class="img-wrap"><img data-src="/img/remote/1460000014056624?w=780&amp;h=548" src="https://static.alili.tech/img/remote/1460000014056624?w=780&amp;h=548" alt="webpack-plugin-jsdt" title="webpack-plugin-jsdt" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://github.com/gcyStar/daily-practice/tree/master/webpack/webpack4/case1" rel="nofollow noreferrer" target="_blank">demo完整链接</a></p>
<p>参考链接</p>
<p><a href="https://doc.webpack-china.org/contribute/writing-a-plugin" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a><br><a href="https://doc.webpack-china.org/api/compiler/#event-hooks" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a><br><a href="https://webpack.js.org/contribute/writing-a-plugin/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/contri...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack源码之plugin机制

## 原文链接
[https://segmentfault.com/a/1190000014056619](https://segmentfault.com/a/1190000014056619)


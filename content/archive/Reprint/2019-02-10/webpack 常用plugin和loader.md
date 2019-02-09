---
title: 'webpack 常用plugin和loader' 
date: 2019-02-10 2:30:42
hidden: true
slug: p50waoqhf4l
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">常用Loaders</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="less-loader, sass-loader
    处理样式
    
url-loader, file-loader
    两个都必须用上。否则超过大小限制的图片无法生成到目标文件夹中

babel-loader，babel-preset-es2015，babel-preset-react
    js处理，转码

expose?*
    eg:
    {
        test: require.resolve('react'),
        loader: 'expose?React'
    }

expose-loader
    将js模块暴露到全局，如果
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">less-loader</span>, <span class="hljs-selector-tag">sass-loader</span>
    处理样式
    
<span class="hljs-selector-tag">url-loader</span>, <span class="hljs-selector-tag">file-loader</span>
    两个都必须用上。否则超过大小限制的图片无法生成到目标文件夹中

<span class="hljs-selector-tag">babel-loader</span>，<span class="hljs-selector-tag">babel-preset-es2015</span>，<span class="hljs-selector-tag">babel-preset-react</span>
    <span class="hljs-selector-tag">js</span>处理，转码

<span class="hljs-selector-tag">expose</span>?*
    <span class="hljs-selector-tag">eg</span>:
    {
        <span class="hljs-attribute">test</span>: require.<span class="hljs-built_in">resolve</span>(<span class="hljs-string">'react'</span>),
        loader: <span class="hljs-string">'expose?React'</span>
    }

<span class="hljs-selector-tag">expose-loader</span>
    将<span class="hljs-selector-tag">js</span>模块暴露到全局，如果
</code></pre>
<h1 id="articleHeader1">常用插件Plugin</h1>
<h2 id="articleHeader2">config类</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    NormalModuleReplacementPlugin
        匹配resourceRegExp，替换为newResource

        
    ContextReplacementPlugin
        替换上下文的插件
        
    IgnorePlugin
        不打包匹配文件
    
    PrefetchPlugin
        预加载的插件，提高性能
    
    ResolverPlugin
        替换上下文的插件
    
    ContextReplacementPlugin
        替换上下文的插件
    
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>    NormalModuleReplacementPlugin
        匹配resourceRegExp，替换为<span class="hljs-keyword">new</span><span class="hljs-type">Resource</span>

        
    ContextReplacementPlugin
        替换上下文的插件
        
    IgnorePlugin
        不打包匹配文件
    
    PrefetchPlugin
        预加载的插件，提高性能
    
    ResolverPlugin
        替换上下文的插件
    
    ContextReplacementPlugin
        替换上下文的插件
    
    
</code></pre>
<h2 id="articleHeader3">optimize</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    DedupePlugin
        打包的时候删除重复或者相似的文件
        
    MinChunkSizePlugin
        把多个小模块进行合并，以减少文件的大小
        
    LimitChunkCountPlugin
        限制打包文件的个数
        
    MinChunkSizePlugin
        根据chars大小，如果小于设定的最小值，就合并这些小模块，以减少文件的大小
    
    OccurrenceOrderPlugin
        根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
        
    UglifyJsPlugin
        压缩js
        
    ngAnnotatePlugin
        使用ng-annotate来管理AngularJS的一些依赖
     
    CommonsChunkPlugin
        多个 html共用一个js文件(chunk)
    
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>    DedupePlugin
        打包的时候删除重复或者相似的文件
        
    M<span class="hljs-keyword">in</span>ChunkSizePlugin
        把多个小模块进行合并，以减少文件的大小
        
    LimitChunkCountPlugin
        限制打包文件的个数
        
    M<span class="hljs-keyword">in</span>ChunkSizePlugin
        根据chars大小，如果小于设定的最小值，就合并这些小模块，以减少文件的大小
    
    OccurrenceOrderPlugin
        根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
        
    UglifyJsPlugin
        压缩js
        
    ngAnnotatePlugin
        使用ng-annotate来管理AngularJS的一些依赖
     
    CommonsChunkPlugin
        多个 html共用一个js文件(chunk)
    
    
</code></pre>
<h2 id="articleHeader4">dependency injection</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    DefinePlugin
        定义变量，一般用于开发环境log或者全局变量
    
    ProvidePlugin
        自动加载模块，当配置（$:'jquery'）例如当使用$时，自动加载jquery
        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>    DefinePlugin
        定义变量，一般用于开发环境<span class="hljs-keyword">log</span>或者全局变量
    
    ProvidePlugin
        自动加载模块，当配置（$:<span class="hljs-string">'jquery'</span>）例如当使用$时，自动加载jquery
        </code></pre>
<h2 id="articleHeader5">other</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    HotModuleReplacementPlugin
        模块热替换,如果不在dev-server模式下，需要记录数据，recordPath，生成每个模块的热更新模块
    
    ProgressPlugin
        编译进度
        
    NoErrorsPlugin
        报错但不退出webpack进程
    
    HtmlWebpackPlugin 
        生成html
        
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    HotModuleReplacementPlugin
        模块热替换,如果不在dev-server模式下，需要记录数据，recordPath，生成每个模块的热更新模块
    
    ProgressPlugin
        编译进度
        
    NoErrorsPlugin
        报错但不退出webpack进程
    
    HtmlWebpackPlugin 
        生成<span class="hljs-selector-tag">html</span>
        
</code></pre>
<h1 id="articleHeader6">常用alias</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alias的配置项目，能够让开发者指定一些模块的引用路径。对一些经常要被import或者require的库，如react,我们最好可以直接指定它们的位置，这样webpack可以省下不少搜索硬盘的时间。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">alias</span>的配置项目，能够让开发者指定一些模块的引用路径。对一些经常要被<span class="hljs-meta">import</span>或者<span class="hljs-meta">require</span>的库，如react,我们最好可以直接指定它们的位置，这样webpack可以省下不少搜索硬盘的时间。
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVvAy7?w=575&amp;h=126" src="https://static.alili.tech/img/bVvAy7?w=575&amp;h=126" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>webpack好文推荐：<br>上面模块只是大概了解，详细可见：<a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">http://webpack.github.io/docs/</a><br>webpack优化使用：<a href="http://www.alloyteam.com/2016/01/webpack-use-optimization/" rel="nofollow noreferrer" target="_blank">http://www.alloyteam.com/2016...</a><br>中文文档：<a href="http://zhaoda.net/webpack-handbook/loader.html" rel="nofollow noreferrer" target="_blank">http://zhaoda.net/webpack-han...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack 常用plugin和loader

## 原文链接
[https://segmentfault.com/a/1190000005106383](https://segmentfault.com/a/1190000005106383)


---
title: 'webpack插件配置及常用插件' 
date: 2019-01-17 2:30:25
hidden: true
slug: c5dhwh7wz7t
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">webpack插件</h1>
<h2 id="articleHeader1">用法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    new webpack.ProvidePlugin({}),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>plugins: [
    <span class="hljs-keyword">new</span> webpack.ProvidePlugin({}),
    <span class="hljs-keyword">new</span> webpack.IgnorePlugin(<span class="hljs-regexp">/^\.\/locale$/</span>, <span class="hljs-regexp">/moment$/</span>),
]</code></pre>
<p>有的插件是开发模式不用，到生产模式下才用,可如下设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//PRODUCTION 指生产模式
PRODUCTION &amp;&amp; Array.prototype.push.apply(config.plugins, [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">//PRODUCTION 指生产模式</span>
PRODUCTION &amp;&amp; <span class="hljs-keyword">Array</span>.prototype.push.apply(config.plugins, [
    <span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.optimize.UglifyJsPlugin(),
    <span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.optimize.OccurrenceOrderPlugin(<span class="hljs-literal">true</span>),
]);</code></pre>
<h2 id="articleHeader2">分类</h2>
<p>一直很疑惑，为什么有的插件是包装在webpack中的<code>webpack.plugin</code>，有的是裸奔的<code>plugin</code>，专门去官方关注了一下这个问题，终于搞清楚了</p>
<h3 id="articleHeader3">内置模块（built-in）</h3>
<p>官方解释如下<br><span class="img-wrap"><img data-src="http://note.youdao.com/yws/api/personal/file/FC193B3BF0684635A028BEC7CDAE4AE8?method=download&amp;shareKey=54a83e317bcd8f3ecd943b5ef361e3ee" src="https://static.alili.techhttp://note.youdao.com/yws/api/personal/file/FC193B3BF0684635A028BEC7CDAE4AE8?method=download&amp;shareKey=54a83e317bcd8f3ecd943b5ef361e3ee" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>翻译一下，通过webpack配置的属性包含在你模块中的插件，再简单易懂点，就是webpack自己的，所有权问题，嘿嘿。。。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.ProvidePlugin({})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.ProvidePlugin</span>({})</code></pre>
<h3 id="articleHeader4">其他模块 (not-built-in)</h3>
<p>非内置，通过npm或其他方法发布的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new HtmlWebpackPlugin({
    template: './src/index.html'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">HtmlWebpackPlugin</span>({
    <span class="hljs-attribute">template</span>: <span class="hljs-string">'./src/index.html'</span>
})</code></pre>
<h2 id="articleHeader5">常用插件</h2>
<h3 id="articleHeader6">config 配置类</h3>
<h4>ProvidePlugin</h4>
<p>用途：<code>$</code>出现，就会自动加载模块；<code>$</code>默认为<code>'jquery'</code>的exports</p>
<p>用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.ProvidePlugin({
  $: 'jquery',
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">new</span> webpack.ProvidePlugin({
  $: <span class="hljs-string">'jquery'</span>,
})</code></pre>
<h4>DefinePlugin</h4>
<p>用途：定义全局常量</p>
<p>用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    },
    PRODUCTION: JSON.stringify(PRODUCTION),
    APP_CONFIG: JSON.stringify(appConfig[process.env.NODE_ENV]),
})," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs roboconf"><code>new webpack.DefinePlugin({
    '<span class="hljs-attribute">process.env'</span>: {
        NODE_ENV: JSON<span class="hljs-variable">.stringify</span>(process<span class="hljs-variable">.env</span><span class="hljs-variable">.NODE_ENV</span>)
    },
    PRODUCTION: JSON<span class="hljs-variable">.stringify</span>(PRODUCTION),
    APP_CONFIG: JSON<span class="hljs-variable">.stringify</span>(appConfig[process<span class="hljs-variable">.env</span><span class="hljs-variable">.NODE_ENV</span>]),
}),</code></pre>
<h4>IgnorePlugin</h4>
<p>用途：忽略<code>regExp</code>匹配的模块</p>
<p>用法： <code>new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)</code></p>
<h4>ExtractTextPlugin</h4>
<p>用途：分离css文件</p>
<p>用法： <code>new ExtractTextPlugin(PRODUCTION ? '[name]-[chunkhash].css' : '[name].css')</code></p>
<h4>HtmlWebpackPlugin</h4>
<p>用途：重构入口html，动态添加<code>&lt;link&gt;</code>和<code>&lt;script&gt;</code>，在以hash命名的文件上非常有用，因为每次编译都会改变</p>
<p>用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new HtmlWebpackPlugin({
    template: './src/index.html'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">HtmlWebpackPlugin</span>({
    <span class="hljs-attribute">template</span>: <span class="hljs-string">'./src/index.html'</span>
})</code></pre>
<h3 id="articleHeader7">optimize 优化类</h3>
<h4>UglifyJsPlugin</h4>
<p>用途：js压缩</p>
<p>用法： <code>new webpack.optimize.UglifyJsPlugin()</code></p>
<h4>OccurrenceOrderPlugin</h4>
<p>用途：排序输出<br><span class="img-wrap"><img data-src="http://note.youdao.com/yws/api/personal/file/525558CAE3C946858AA5CA95C76A17D2?method=download&amp;shareKey=cac1e5d0c999fa1c510f3fa59c04bd08" src="https://static.alili.techhttp://note.youdao.com/yws/api/personal/file/525558CAE3C946858AA5CA95C76A17D2?method=download&amp;shareKey=cac1e5d0c999fa1c510f3fa59c04bd08" alt="image" title="image" style="cursor: pointer; display: inline;"></span><br>通过模块调用次数给模块分配ids，常用的ids就会分配更短的id，使ids可预测，减小文件大小，推荐使用</p>
<p>用法： <code>new webpack.optimize.OccurrenceOrderPlugin(true)</code></p>
<h4>CommonsChunkPlugin</h4>
<p>用途：合并公共模块为单独文件，比如全局通用的js等，长期不会修改的，从而可以从缓存中取，优化网页性能</p>
<p>用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.CommonsChunkPlugin</span>({
    <span class="hljs-attribute">names</span>: [<span class="hljs-string">'vendor'</span>]
})</code></pre>
<h3 id="articleHeader8">webpack1迁移到webpack2过渡专用</h3>
<h4>LoaderOptionsPlugin</h4>
<p>用途：webpack1到webpack2迁移过渡专用，就像名字说的那样，loader选项插件，对于暂时不支持loader的options的属性，使用此插件</p>
<p>用法：如下，为vue 配置postcss</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.LoaderOptionsPlugin({
    vue: {
        // use custom postcss plugins
        postcss: function(webpack) {
            return [              
                require('postcss-mixins'),
            ];
        }
    }
})," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.LoaderOptionsPlugin</span>({
    <span class="hljs-attribute">vue</span>: {
        // use custom postcss plugins
        postcss: <span class="hljs-built_in">function</span>(webpack) {
            return [              
                <span class="hljs-built_in">require</span>(<span class="hljs-string">'postcss-mixins'</span>),
            ];
        }
    }
}),</code></pre>
<h2 id="articleHeader9">参考链接</h2>
<p><a href="https://webpack.js.org/configuration/" rel="nofollow noreferrer" target="_blank">webpack官方</a></p>
<p><a href="https://webpack.github.io/docs/using-plugins.html" rel="nofollow noreferrer" target="_blank">webpack-using-plugins</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack插件配置及常用插件

## 原文链接
[https://segmentfault.com/a/1190000008847145](https://segmentfault.com/a/1190000008847145)


---
title: 'webpack4升级完全指南' 
date: 2018-12-07 2:30:09
hidden: true
slug: hyiueowb0mw
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>webpack4官方已经于近日升级到了V4.5的稳定版本，对应的一些必备插件(webpack-contrib)也陆续完成了更新支持，笔者在第一时间完成了项目由V3到V4的迁移，在此记录一下升级过程中遇到的种种问题和对应的解决手段，方便后续入坑者及时查阅，减少重复工作，如果觉得本篇文章对你有帮助，欢迎点赞😁</blockquote>
<h2 id="articleHeader0">一、Node版本依赖重新调整</h2>
<p>官方不再支持node4以下的版本，依赖node的环境版本&gt;=6.11.5，当然考虑到最佳的es6特性实现，建议node版本可以升级到V8.9.4或以上版本，具体更新说明部分可以见：<a href="https://github.com/webpack/webpack/releases/tag/v4.0.0" rel="nofollow noreferrer" target="_blank">webpack4更新日志</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;engines&quot;: {
    &quot;node&quot;: &quot;>=6.11.5&quot; // >=8.9.4 (recommendation version) 
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"engines"</span>: {
    <span class="hljs-string">"node"</span>: <span class="hljs-string">"&gt;=6.11.5"</span> <span class="hljs-comment">// &gt;=8.9.4 (recommendation version) </span>
  },</code></pre>
<h2 id="articleHeader1">二、用更加快捷的mode模式来优化配置文件</h2>
<p>webpack4中提供的mode有两个值：development和production，默认值是 production。mode是我们为减小生产环境构建体积以及节约开发环境的构建时间提供的一种优化方案，提供对应的构建参数项的默认开启或关闭，降低配置成本。</p>
<h3 id="articleHeader2">开启方式 1：直接在启动命令后加入参数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;dev&quot;: &quot;webpack --mode development&quot;,
  &quot;build&quot;: &quot;webpack --mode production&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack --mode development"</span>,
  <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack --mode production"</span>
}</code></pre>
<h3 id="articleHeader3">开启方式 2：可以在配置文件中加入一个mode属性：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  mode: 'production' // development
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'production'</span> <span class="hljs-comment">// development</span>
};</code></pre>
<h3 id="articleHeader4">development模式下，将侧重于功能调试和优化开发体验，包含如下内容：</h3>
<blockquote><ol>
<li>浏览器调试工具</li>
<li>开发阶段的详细错误日志和提示</li>
<li>快速和优化的增量构建机制</li>
</ol></blockquote>
<h3 id="articleHeader5">production模式下，将侧重于模块体积优化和线上部署，包含如下内容：</h3>
<blockquote><ol>
<li>开启所有的优化代码</li>
<li>更小的bundle大小</li>
<li>去除掉只在开发阶段运行的代码</li>
<li>Scope hoisting和Tree-shaking</li>
<li>自动启用uglifyjs对代码进行压缩</li>
</ol></blockquote>
<p>webpack一直以来最饱受诟病的就是其配置门槛极高，配置内容复杂而繁琐，容易让人从入门到放弃，而它的后起之秀如rollup，parcel等均在配置流程上做了极大的优化，做到开箱即用，webpack在V4中应该也从中借鉴了不少经验来提升自身的配置效率，详见内容可以参考这篇文章<a href="https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a" rel="nofollow noreferrer" target="_blank">《webpack 4: mode and optimization》</a></p>
<h2 id="articleHeader6">三、再见commonchunk，你好optimization</h2>
<p>从webpack4开始官方移除了commonchunk插件，改用了optimization属性进行更加灵活的配置，这也应该是从V3升级到V4的代码修改过程中最为复杂的一部分，下面的代码即是optimize.splitChunks 中的一些配置参考，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: true, // [new UglifyJsPlugin({...})]
    splitChunks:{
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">optimization</span>: {
    <span class="hljs-attr">runtimeChunk</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'manifest'</span>
    },
    <span class="hljs-attr">minimizer</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// [new UglifyJsPlugin({...})]</span>
    splitChunks:{
      <span class="hljs-attr">chunks</span>: <span class="hljs-string">'async'</span>,
      <span class="hljs-attr">minSize</span>: <span class="hljs-number">30000</span>,
      <span class="hljs-attr">minChunks</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">maxAsyncRequests</span>: <span class="hljs-number">5</span>,
      <span class="hljs-attr">maxInitialRequests</span>: <span class="hljs-number">3</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">cacheGroups</span>: {
        <span class="hljs-attr">vendor</span>: {
          <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor'</span>,
          <span class="hljs-attr">chunks</span>: <span class="hljs-string">'initial'</span>,
          <span class="hljs-attr">priority</span>: <span class="hljs-number">-10</span>,
          <span class="hljs-attr">reuseExistingChunk</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">test</span>: <span class="hljs-regexp">/node_modules\/(.*)\.js/</span>
        },
        <span class="hljs-attr">styles</span>: {
          <span class="hljs-attr">name</span>: <span class="hljs-string">'styles'</span>,
          <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(scss|css)$/</span>,
          <span class="hljs-attr">chunks</span>: <span class="hljs-string">'all'</span>,
          <span class="hljs-attr">minChunks</span>: <span class="hljs-number">1</span>,
          <span class="hljs-attr">reuseExistingChunk</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">enforce</span>: <span class="hljs-literal">true</span>
        }
      }
    }
  }
}</code></pre>
<h3 id="articleHeader7">从中我们不难发现，其主要变化有如下几个方面：</h3>
<blockquote><ol>
<li>commonchunk配置项被彻底去掉，之前需要通过配置两次new webpack.optimize.CommonsChunkPlugin来分别获取vendor和manifest的通用chunk方式已经做了整合，<strong> 直接在optimization中配置runtimeChunk和splitChunks即可 </strong> ，提取功能也更为强大，具体配置见：<a href="https://webpack.js.org/plugins/split-chunks-plugin/#optimization-splitchunks" rel="nofollow noreferrer" target="_blank">splitChunks</a>
</li>
<li>runtimeChunk可以配置成true，single或者对象，用自动计算当前构建的一些基础chunk信息，类似之前版本中的manifest信息获取方式。</li>
<li>webpack.optimize.UglifyJsPlugin现在也不需要了，只需要使用optimization.minimize为true就行，production mode下面自动为true，当然如果想使用第三方的压缩插件也可以在optimization.minimizer的数组列表中进行配置</li>
</ol></blockquote>
<h2 id="articleHeader8">四、ExtractTextWebpackPlugin调整，建议选用新的CSS文件提取插件mini-css-extract-plugin</h2>
<p>由于webpack4以后对css模块支持的逐步完善和commonchunk插件的移除，在处理css文件提取的计算方式上也做了些调整，之前我们首选使用的<a href="https://github.com/webpack-contrib/extract-text-webpack-plugin" rel="nofollow noreferrer" target="_blank">extract-text-webpack-plugin</a>也完成了其历史使命，将让位于<a href="https://github.com/webpack-contrib/mini-css-extract-plugin" rel="nofollow noreferrer" target="_blank">mini-css-extract-plugin</a></p>
<h3 id="articleHeader9">基本配置如下：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const MiniCssExtractPlugin = require(&quot;mini-css-extract-plugin&quot;);
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: &quot;[name].css&quot;,
      chunkFilename: &quot;[id].css&quot;
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,  // replace ExtractTextPlugin.extract({..})
          &quot;css-loader&quot;
        ]
      }
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> MiniCssExtractPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"mini-css-extract-plugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> MiniCssExtractPlugin({
      <span class="hljs-comment">// Options similar to the same options in webpackOptions.output</span>
      <span class="hljs-comment">// both options are optional</span>
      filename: <span class="hljs-string">"[name].css"</span>,
      <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">"[id].css"</span>
    })
  ],
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">use</span>: [
          MiniCssExtractPlugin.loader,  <span class="hljs-comment">// replace ExtractTextPlugin.extract({..})</span>
          <span class="hljs-string">"css-loader"</span>
        ]
      }
    ]
  }
}</code></pre>
<h3 id="articleHeader10">生产环境下的配置优化：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const UglifyJsPlugin = require(&quot;uglifyjs-webpack-plugin&quot;);
const MiniCssExtractPlugin = require(&quot;mini-css-extract-plugin&quot;);
const OptimizeCSSAssetsPlugin = require(&quot;optimize-css-assets-webpack-plugin&quot;);
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true 
      }),
      new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/app.[name].css',
      chunkFilename: 'css/app.[contenthash:12].css'  // use contenthash *
    })
  ]
  ....
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> UglifyJsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"uglifyjs-webpack-plugin"</span>);
<span class="hljs-keyword">const</span> MiniCssExtractPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"mini-css-extract-plugin"</span>);
<span class="hljs-keyword">const</span> OptimizeCSSAssetsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"optimize-css-assets-webpack-plugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">optimization</span>: {
    <span class="hljs-attr">minimizer</span>: [
      <span class="hljs-keyword">new</span> UglifyJsPlugin({
        <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">parallel</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span> 
      }),
      <span class="hljs-keyword">new</span> OptimizeCSSAssetsPlugin({})  <span class="hljs-comment">// use OptimizeCSSAssetsPlugin</span>
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> MiniCssExtractPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">'css/app.[name].css'</span>,
      <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">'css/app.[contenthash:12].css'</span>  <span class="hljs-comment">// use contenthash *</span>
    })
  ]
  ....
}
</code></pre>
<h3 id="articleHeader11">将多个css chunk合并成一个css文件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const MiniCssExtractPlugin = require(&quot;mini-css-extract-plugin&quot;);
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {            
          name: 'styles',
          test: /\.scss|css$/,
          chunks: 'all',    // merge all the css chunk to one file
          enforce: true
        }
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> MiniCssExtractPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"mini-css-extract-plugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">optimization</span>: {
    <span class="hljs-attr">splitChunks</span>: {
      <span class="hljs-attr">cacheGroups</span>: {
        <span class="hljs-attr">styles</span>: {            
          <span class="hljs-attr">name</span>: <span class="hljs-string">'styles'</span>,
          <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss|css$/</span>,
          <span class="hljs-attr">chunks</span>: <span class="hljs-string">'all'</span>,    <span class="hljs-comment">// merge all the css chunk to one file</span>
          enforce: <span class="hljs-literal">true</span>
        }
      }
    }
  }
}</code></pre>
<h2 id="articleHeader12">五、其他调整项备忘</h2>
<blockquote><ol>
<li>NoEmitOnErrorsPlugin- &gt; optimization.noEmitOnErrors（默认情况下处于生产模式）</li>
<li>ModuleConcatenationPlugin- &gt; optimization.concatenateModules（默认情况下处于生产模式）</li>
<li>NamedModulesPlugin- &gt; optimization.namedModules（在开发模式下默认开启）</li>
<li>webpack命令优化 -&gt; 发布了独立的 <a href="https://webpack.js.org/api/cli/" rel="nofollow noreferrer" target="_blank">webpack-cli</a> 命令行工具包</li>
<li>webpack-dev-server -&gt; 建议升级到最新版本</li>
<li>html-webpack-plugin -&gt; 建议升级到的最新版本</li>
<li>file-loader -&gt; 建议升级到最新版本</li>
<li>url-loader -&gt; 建议升级到最新版本</li>
</ol></blockquote>
<h2 id="articleHeader13">六、参考工程</h2>
<p><a href="https://github.com/taikongfeizhu/react-mobx-react-router4-boilerplate" rel="nofollow noreferrer" target="_blank">webpack4配置工程实例</a></p>
<h2 id="articleHeader14">七、参阅资料</h2>
<ol>
<li><a href="https://blog.csdn.net/qq_20334295/article/details/79401231" rel="nofollow noreferrer" target="_blank">webpack4</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/34028750" rel="nofollow noreferrer" target="_blank">webpack4发布概览</a></li>
<li><a href="https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a" rel="nofollow noreferrer" target="_blank">webpack 4: mode and optimization</a></li>
<li><a href="https://segmentfault.com/a/1190000013970017">webpack4新特性介绍</a></li>
<li><a href="https://segmentfault.com/a/1190000013420383" target="_blank">webpack4升级指北</a></li>
<li><a href="https://blog.csdn.net/qq_26733915/article/details/79446460" rel="nofollow noreferrer" target="_blank">webpack4升级指南以及从webpack3.x迁移</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack4升级完全指南

## 原文链接
[https://segmentfault.com/a/1190000014247030](https://segmentfault.com/a/1190000014247030)


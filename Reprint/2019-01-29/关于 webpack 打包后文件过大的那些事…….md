---
title: '关于 webpack 打包后文件过大的那些事……' 
date: 2019-01-29 2:30:10
hidden: true
slug: ibcku2coijf
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>react 配合 webpack 打包固然好用,但比较尴尬的是打包过后的 react 文件的体积……</p></blockquote>
<p>首屏加载过慢,怎么办？慢慢优化呗……<br>一般正常的网站首屏应该在1s左右加载出来,这个体验性简直极好的。<br>既然优化那就先从资源文件大小开始。<br>可能有的人会说既然优化，那就做个按需。这确实是个好主意，但是如果你打包后的文件不是很大的话，其实没必要做按需。</p>
<h3 id="articleHeader0">首先配置全局变量</h3>
<p>告诉 webpack 我要发布 production 了,按照 production 方式去打包。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   new webpack.DefinePlugin({
        'process.env': {
            //注意一个单引号一个双引号…… 这里是要将 &quot;production&quot; 替换到文件里面
            NODE_ENV: '&quot;production&quot;'
        }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">   <span class="hljs-keyword">new</span> webpack.DefinePlugin({
        <span class="hljs-string">'process.env'</span>: {
            <span class="hljs-comment">//注意一个单引号一个双引号…… 这里是要将 "production" 替换到文件里面</span>
            NODE_ENV: <span class="hljs-string">'"production"'</span>
        }
    })</code></pre>
<h3 id="articleHeader1">1. 注意 devtool 中的 source-map。</h3>
<p>如果你打包后的文件莫名其妙的好几 MB的大小…… 看到这个文件心里真是一万只奔腾的……</p>
<p>如果好几 MB, 那不用想了肯定是 source-map 的问题, 注意 source-map 的那种几种类型使用.</p>
<p><a href="https://segmentfault.com/a/1190000004280859">webpack sourcemap 选项多种模式的一些解释</a><br><a href="https://webpack.github.io/docs/configuration.html#devtool" rel="nofollow noreferrer" target="_blank">https://webpack.github.io/docs/configuration.html#devtool</a></p>
<p>source map 在开发调试的时候确实是好用，但也只是开发的时候……<br>生产环境没多大必要去用这个了，当然也有人选择在生产环境开启 source-map ,方便调试, 但我觉得真心没必要, 在生产环境调试的方法多的是,没必要用这个方式.</p>
<p>可以试一下,当开启 devtool打包后的文件</p>
<p><code>devtool: "inline-source-map"</code></p>
<p><span class="img-wrap"><img data-src="/img/bVHgYH?w=1241&amp;h=42" src="https://static.alili.tech/img/bVHgYH?w=1241&amp;h=42" alt="打包后3.9MB..." title="打包后3.9MB..." style="cursor: pointer;"></span></p>
<p>瞬间高潮了,这个js挂在服务器上没有10s出不来的,记得当我第一次在服务器上打包后,满怀期待的打开页面后的场景……</p>
<p>其实了解下 source-map 的不同方式就知道了, <code> inline-source-map</code> 为每一个文件添加 sourcemap 的 DataUrl，注意这里的文件是打包前的每一个文件而不是最后打包出来的，同时这个 DataUrl 是包含一个文件完整 souremap 信息的 Base64 格式化后的字符串，而不是一个 url。</p>
<p>建议在production环境打包的时候关闭 <code>devtool</code>.</p>
<p>如果非得在线上使用 source-map, 可以配置为</p>
<p><code>devtool: "#source-map",</code></p>
<p>这样只会在文件后面跟一个 url,这样对源文件影响就很小了</p>
<p><span class="img-wrap"><img data-src="/img/bVHg36?w=830&amp;h=109" src="https://static.alili.tech/img/bVHg36?w=830&amp;h=109" alt="这样还有1.52MB" title="这样还有1.52MB" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到使用<code>#source-map</code>后 vendor.js 已经从3.9M 减到 1.52MB。<br><strong>如果非要在生成环境使用 source-map, 请严谨选择。</strong></p>
<h3 id="articleHeader2">2. 使 css 剥离 js 文件, 将 css 单独打包。</h3>
<p><code>依赖插件 npm install --save-dev extract-text-webpack-plugin 先安装再使用</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var ExtractTextPlugin = require('extract-text-webpack-plugin');
    
    //在 plugins 中配置
    plugins: [ new ExtractTextPlugin('[name].[contenthash].css') ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
    
    <span class="hljs-comment">//在 plugins 中配置</span>
    plugins: [ <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'[name].[contenthash].css'</span>) ]</code></pre>
<p>把 css 单独打包出来，免得以后只修改 css 导致 浏览器端 js 的缓存也失效了。<br>这里使用了 contenthash, webpack 会按照内容去生成 hash 值。</p>
<h3 id="articleHeader3">3. 压缩, 去除注释</h3>
<blockquote><p>注意如果开启了source-map选择inline-source-map压缩后依然好几MB的</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //在 plugins 中添加
    new webpack.optimize.UglifyJsPlugin({
        comments: false,        //去掉注释
        compress: {
            warnings: false    //忽略警告,要不然会有一大堆的黄色字体出现……
        }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">//在 plugins 中添加</span>
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
        <span class="hljs-attr">comments</span>: <span class="hljs-literal">false</span>,        <span class="hljs-comment">//去掉注释</span>
        compress: {
            <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>    <span class="hljs-comment">//忽略警告,要不然会有一大堆的黄色字体出现……</span>
        }
    })</code></pre>
<p>最好开启去掉代码注释。<br>代码压缩后提升简直不是一点两点的……</p>
<p><span class="img-wrap"><img data-src="/img/bVHg7U?w=1434&amp;h=37" src="https://static.alili.tech/img/bVHg7U?w=1434&amp;h=37" alt="压缩后只有410kb" title="压缩后只有410kb" style="cursor: pointer;"></span></p>
<p>哇塞很赞哎. 其实还是不行的,这样首屏加载还会慢点, 怎么办 gzip 咯。</p>
<h3 id="articleHeader4">4. 开启 gzip 压缩</h3>
<p><code>依赖插件 npm install --save-dev compression-webpack-plugin</code></p>
<p>git 地址：<a href="https://github.com/webpack/compression-webpack-plugin" rel="nofollow noreferrer" target="_blank">compression-webpack-plugin</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var CompressionWebpackPlugin = require('compression-webpack-plugin');

    //在 plugin 中添加
    new CompressionWebpackPlugin({ //gzip 压缩
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
            '\\.(js|css)$'    //压缩 js 与 css
        ),
        threshold: 10240,
        minRatio: 0.8
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> CompressionWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'compression-webpack-plugin'</span>);

    <span class="hljs-comment">//在 plugin 中添加</span>
    <span class="hljs-keyword">new</span> CompressionWebpackPlugin({ <span class="hljs-comment">//gzip 压缩</span>
        asset: <span class="hljs-string">'[path].gz[query]'</span>,
        <span class="hljs-attr">algorithm</span>: <span class="hljs-string">'gzip'</span>,
        <span class="hljs-attr">test</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(
            <span class="hljs-string">'\\.(js|css)$'</span>    <span class="hljs-comment">//压缩 js 与 css</span>
        ),
        <span class="hljs-attr">threshold</span>: <span class="hljs-number">10240</span>,
        <span class="hljs-attr">minRatio</span>: <span class="hljs-number">0.8</span>
    })</code></pre>
<p>这个就很满意……</p>
<p><span class="img-wrap"><img data-src="/img/bVHg85?w=771&amp;h=16" src="https://static.alili.tech/img/bVHg85?w=771&amp;h=16" alt="只有115KB了" title="只有115KB了" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVHhdv?w=1147&amp;h=721" src="https://static.alili.tech/img/bVHhdv?w=1147&amp;h=721" alt="gzip" title="gzip" style="cursor: pointer; display: inline;"></span></p>
<p>这个截图是请求服务器上的 js。之前这个 js 要10多秒的……（云服务器最低配置的那种）<br><span class="img-wrap"><img data-src="/img/bVHhdU?w=2097&amp;h=51" src="https://static.alili.tech/img/bVHhdU?w=2097&amp;h=51" alt="请求截图" title="请求截图" style="cursor: pointer;"></span></p>
<p>从3.9MB 到 115KB！！！ 真是极好的。</p>
<h3 id="articleHeader5">5. 压缩 html, 自动添加上面生成的静态资源。</h3>
<p><code>依赖插件 npm install --save-dev html-webpack-plugin</code></p>
<p>git 地址：<a href="https://github.com/ampedandwired/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">html-webpack-plugin</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var HtmlWebpackPlugin = require('html-webpack-plugin');
    
    new HtmlWebpackPlugin({
        filename: 'react.html',    //生成的文件，从 output.path 开始 output.path + &quot;/react.html&quot;
        template: '../client/react.html',  //读取的模板文件,这个路径是相对于当前这个配置文件的
        inject: true, // 自动注入
        minify: {
            removeComments: true,        //去注释
            collapseWhitespace: true,    //压缩空格
            removeAttributeQuotes: true  //去除属性引用
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        },
        //必须通过上面的 CommonsChunkPlugin 的依赖关系自动添加 js，css 等
        chunksSortMode: 'dependency'
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
    
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'react.html'</span>,    <span class="hljs-comment">//生成的文件，从 output.path 开始 output.path + "/react.html"</span>
        template: <span class="hljs-string">'../client/react.html'</span>,  <span class="hljs-comment">//读取的模板文件,这个路径是相对于当前这个配置文件的</span>
        inject: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 自动注入</span>
        minify: {
            <span class="hljs-attr">removeComments</span>: <span class="hljs-literal">true</span>,        <span class="hljs-comment">//去注释</span>
            collapseWhitespace: <span class="hljs-literal">true</span>,    <span class="hljs-comment">//压缩空格</span>
            removeAttributeQuotes: <span class="hljs-literal">true</span>  <span class="hljs-comment">//去除属性引用</span>
            <span class="hljs-comment">// more options:</span>
            <span class="hljs-comment">// https://github.com/kangax/html-minifier#options-quick-reference</span>
        },
        <span class="hljs-comment">//必须通过上面的 CommonsChunkPlugin 的依赖关系自动添加 js，css 等</span>
        chunksSortMode: <span class="hljs-string">'dependency'</span>
    })</code></pre>
<p>这样就大功告成了, css，js 开启 gzip 压缩后, 会将生成的文件名自动注入到 html 中。 如果有多个 html 配置再添加一个 <code>new HtmlWebpackPlugin()</code> 即可。</p>
<h3 id="articleHeader6">小结</h3>
<ol>
<li><p>确定不会在生产环境打包多余的代码, 比如 <em>热加载</em> 只是举个例子</p></li>
<li><p>检查只在 dev 使用的配置,在生产环境将其去掉. 可使用配置文件，灵活配置，灵活切换</p></li>
<li><p>去除所有注释, 压缩所有可压缩的资源文件.</p></li>
<li><p>开启 gzip压缩.</p></li>
</ol>
<p>总而言之为了让文件变小,为了让浏览器加载的更快，我们真的要无所不用其极……</p>
<h5>以上, 致那颗骚动的心……</h5>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于 webpack 打包后文件过大的那些事……

## 原文链接
[https://segmentfault.com/a/1190000007892189](https://segmentfault.com/a/1190000007892189)


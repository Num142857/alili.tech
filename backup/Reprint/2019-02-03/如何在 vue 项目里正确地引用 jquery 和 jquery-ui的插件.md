---
title: '如何在 vue 项目里正确地引用 jquery 和 jquery-ui的插件' 
date: 2019-02-03 2:30:39
hidden: true
slug: 1uxg7kbiell
categories: [reprint]
---

{{< raw >}}

                    
<p>使用vue-cli构建的vue项目，webpack的配置文件是分散在很多地方的，而我们需要修改的是<code>build/webpack.base.conf.js</code>，修改两处的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在开头引入webpack，后面的plugins那里需要
var webpack = require('webpack')
// resolve

module.exports = {
   // 其他代码...
   resolve: {
      extensions: ['', '.js', '.vue'],
      fallback: [path.join(__dirname, '../node_modules')],
      alias: {
          'src': path.resolve(__dirname, '../src'),
          'assets': path.resolve(__dirname, '../src/assets'),
          'components': path.resolve(__dirname, '../src/components'),

          // webpack 使用 jQuery，如果是自行下载的
          // 'jquery': path.resolve(__dirname, '../src/assets/libs/jquery/jquery.min'),
          // 如果使用NPM安装的jQuery
          'jquery': 'jquery' 
      }
   },

   // 增加一个plugins
   plugins: [
      new webpack.ProvidePlugin({
          $: &quot;jquery&quot;,
          jQuery: &quot;jquery&quot;
      })
   ],

   // 其他代码...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 在开头引入webpack，后面的plugins那里需要</span>
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-comment">// resolve</span>

<span class="hljs-built_in">module</span>.exports = {
   <span class="hljs-comment">// 其他代码...</span>
   resolve: {
      <span class="hljs-attr">extensions</span>: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>],
      <span class="hljs-attr">fallback</span>: [path.join(__dirname, <span class="hljs-string">'../node_modules'</span>)],
      <span class="hljs-attr">alias</span>: {
          <span class="hljs-string">'src'</span>: path.resolve(__dirname, <span class="hljs-string">'../src'</span>),
          <span class="hljs-string">'assets'</span>: path.resolve(__dirname, <span class="hljs-string">'../src/assets'</span>),
          <span class="hljs-string">'components'</span>: path.resolve(__dirname, <span class="hljs-string">'../src/components'</span>),

          <span class="hljs-comment">// webpack 使用 jQuery，如果是自行下载的</span>
          <span class="hljs-comment">// 'jquery': path.resolve(__dirname, '../src/assets/libs/jquery/jquery.min'),</span>
          <span class="hljs-comment">// 如果使用NPM安装的jQuery</span>
          <span class="hljs-string">'jquery'</span>: <span class="hljs-string">'jquery'</span> 
      }
   },

   <span class="hljs-comment">// 增加一个plugins</span>
   plugins: [
      <span class="hljs-keyword">new</span> webpack.ProvidePlugin({
          <span class="hljs-attr">$</span>: <span class="hljs-string">"jquery"</span>,
          <span class="hljs-attr">jQuery</span>: <span class="hljs-string">"jquery"</span>
      })
   ],

   <span class="hljs-comment">// 其他代码...</span>
}</code></pre>
<p>这样就可以正确的使用jQuery了，比如我要引入<code>Bootstrap</code>，我们在vue的入口js文件<code>src/main.js</code>开头加入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用Bootstrap
import './assets/libs/bootstrap/css/bootstrap.min.css'
import './assets/libs/bootstrap/js/bootstrap.min'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 使用Bootstrap</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./assets/libs/bootstrap/css/bootstrap.min.css'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./assets/libs/bootstrap/js/bootstrap.min'</span></code></pre>
<p>这样Bootstrap就正确的被引用并构建。<br>在比如使用<code>toastr</code>组件，只需要在需要的地方<code>import</code>进来，或者全局引入css在需要的地方引用js，然后直接使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用toastr
import 'assets/libs/toastr/toastr.min.css'
import toastr from 'assets/libs/toastr/toastr.min'

toastr.success('Hello')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 使用toastr</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'assets/libs/toastr/toastr.min.css'</span>
<span class="hljs-keyword">import</span> toastr <span class="hljs-keyword">from</span> <span class="hljs-string">'assets/libs/toastr/toastr.min'</span>

toastr.success(<span class="hljs-string">'Hello'</span>)</code></pre>
<p><strong>参考: </strong></p>
<ul>
<li><p><a href="http://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack" rel="nofollow noreferrer" target="_blank">Managing Jquery plugin dependency in webpack</a></p></li>
<li><p><a href="https://forum.vuejs.org/topic/4976/%E5%A6%82%E4%BD%95%E5%9C%A8-vue-%E9%A1%B9%E7%9B%AE%E9%87%8C%E6%AD%A3%E7%A1%AE%E5%9C%B0%E5%BC%95%E7%94%A8-jquery-%E5%92%8C-jquery-ui%E7%9A%84%E6%8F%92%E4%BB%B6/2" rel="nofollow noreferrer" target="_blank">如何在vue项目里正确地引用jquery和jquery-ui的插件</a></p></li>
</ul>
<h1 id="articleHeader0">vue-cli webpack全局引入jquery</h1>
<ol>
<li>
<p>首先在<code>package.json</code>里加入，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dependencies:{
 &quot;jquery&quot; : &quot;^2.2.3&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">dependencies:{
 <span class="hljs-string">"jquery"</span> : <span class="hljs-string">"^2.2.3"</span>
}</code></pre>
<p>然后 nmp install</p>
</li>
<li>
<p>在<code>webpack.base.conf.js</code>里加入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require(&quot;webpack&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>)</code></pre>
</li>
<li>
<p>在module.exports的最后加入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
 new webpack.optimize.CommonsChunkPlugin('common.js'),
 new webpack.ProvidePlugin({
     jQuery: &quot;jquery&quot;,
     $: &quot;jquery&quot;
 })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">plugins: [
 <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'common.js'</span>),
 <span class="hljs-keyword">new</span> webpack.ProvidePlugin({
     <span class="hljs-attr">jQuery</span>: <span class="hljs-string">"jquery"</span>,
     <span class="hljs-attr">$</span>: <span class="hljs-string">"jquery"</span>
 })
]</code></pre>
</li>
<li><p>然后一定要重新 <strong>run dev</strong></p></li>
<li>
<p>在main.js 引入就ok了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import $ from 'jquery'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> $ <span class="hljs-keyword">from</span> <span class="hljs-string">'jquery'</span></code></pre>
</li>
</ol>
<p>参考: <a href="http://618cj.com/2016/08/24/vue-cli%E6%80%8E%E4%B9%88%E5%BC%95%E5%85%A5jquery/" rel="nofollow noreferrer" target="_blank">vue-cli怎么引入jquery</a></p>
<h1 id="articleHeader1">在.vue文件中引入第三方非NPM模块</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Showbo = require(&quot;exports?Showbo!./path/to/showbo.js&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> Showbo = <span class="hljs-built_in">require</span>(<span class="hljs-string">"exports?Showbo!./path/to/showbo.js"</span>);</code></pre>
<p>参考: <a href="http://webpack.github.io/docs/shimming-modules.html#exporting" rel="nofollow noreferrer" target="_blank">exports-loader</a></p>
<h1 id="articleHeader2">vue-cli引入外部文件</h1>
<p>在 <code>webpack.base.conf.js</code> 中添加<strong>externals</strong><br><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVvRpA" src="https://static.alili.techhttps://segmentfault.com/img/bVvRpA" alt="" title="" style="cursor: pointer; display: inline;"></span><br>externals 中 swiper 是键，对应的值一定的是插件 swiper.js 所定义的变量 Swiper :<br><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVvRpK" src="https://static.alili.techhttps://segmentfault.com/img/bVvRpK" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVvRpL" src="https://static.alili.techhttps://segmentfault.com/img/bVvRpL" alt="" title="" style="cursor: pointer;"></span><br>之后再在根目录下的index.html文件里引入文件：<code>&lt;script src="static/lib/swiper.js"&gt;&lt;/script&gt;</code><br>这样子就可以在需要用到swiper.js的文件里加入这行代码：<code>import Swiper from 'swiper'</code>，这样就能正常使用了。<br>参考:  <a href="https://segmentfault.com/q/1010000005169531?_ea=806312">https://segmentfault.com/q/1010000005169531?_ea=806312</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 vue 项目里正确地引用 jquery 和 jquery-ui的插件

## 原文链接
[https://segmentfault.com/a/1190000007020623](https://segmentfault.com/a/1190000007020623)


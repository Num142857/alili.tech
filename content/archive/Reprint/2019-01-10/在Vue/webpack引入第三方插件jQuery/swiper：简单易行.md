---
title: '在Vue/webpack引入第三方插件jQuery/swiper：简单易行' 
date: 2019-01-10 2:30:08
hidden: true
slug: px48t7obrcg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p>日前，在学习使用<code>Vue2.0</code>开发新的项目。然而目前用<code>Vue</code>实现的<code>UI</code>框架里面，尚未出现具有像<code>bootstrap</code>一样统治力的框架。一番纠结后，老夫抄起家伙就是一梭...</p>
<blockquote>那么问题来了，在<code>Vue</code>中如何引入<code>jQuery</code>和<code>swiper</code>呢？</blockquote>
<p>经历半天搜索、比对、尝试之后，得出了下面的结论，单用 <code>webpack</code> 时设置同理。</p>
<h2 id="articleHeader1">引入<code>jQuery</code>
</h2>
<blockquote>这个问度娘就有很多方案，我这里选取的是将<code>jQuery</code>暴露到全局的方式，这样就不用每个用到的地方都要<code>import</code>一次</blockquote>
<h3 id="articleHeader2">安装 <code>jQuery</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -S jQuery //等同于 npm install --save jQuery" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> -S jQuery <span class="hljs-comment">//等同于 npm install --save jQuery</span></code></pre>
<h3 id="articleHeader3">设置 <code>webpack.config.js</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack')
const ProvidePlugin = new webpack.ProvidePlugin({//引入外部类库
  $: 'jquery',
  jQuery: 'jquery',
});
module.exports = {
...
plugins: [
    ProvidePlugin,
  ],
...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> ProvidePlugin = <span class="hljs-keyword">new</span> webpack.ProvidePlugin({<span class="hljs-comment">//引入外部类库</span>
  $: <span class="hljs-string">'jquery'</span>,
  <span class="hljs-attr">jQuery</span>: <span class="hljs-string">'jquery'</span>,
});
<span class="hljs-built_in">module</span>.exports = {
...
plugins: [
    ProvidePlugin,
  ],
...
}</code></pre>
<p>至此，可全局使用熟悉的<code>$</code>符号了。</p>
<h3 id="articleHeader4">更多办法</h3>
<ul>
<li>使用 <a href="https://github.com/webpack/exports-loader" rel="nofollow noreferrer" target="_blank"><code>exports-loader</code></a>（按照官方例子实测，配置简单成谜，然而无效，求指点）</li>
<li>设置 <code>externals</code>（<a href="https://segmentfault.com/q/1010000005169531/a-1020000005170343">详情参考推荐答案</a>）</li>
<li>普通 <code>import</code>（也就是接下来要说的办法）</li>
</ul>
<h2 id="articleHeader5">引入<code>swiper</code>插件</h2>
<blockquote>本来设置<code>externals</code>后再在<code>index.html</code>中引用的办法也是挺好的，但在我的项目中只有一个页面用到，而且<code>externals</code>方式不知如何设置<code>css</code>（还望高人指点），故选择普通<code>import</code>的方式。<p>vue-awesome-swiper的使用可以参考 <a href="https://segmentfault.com/a/1190000010142118" target="_blank">这篇文章</a></p>
<p>此法无需在<code>index.html</code>引用其<code>JS</code>或<code>CSS</code>，但每个用到的页面都需要<code>import</code>一次，<code>jQuery</code>也可用此法引入。</p>
</blockquote>
<h3 id="articleHeader6">简单粗暴<code>import</code>
</h3>
<blockquote>在 <code>script</code> 中 <code>import</code> 其<code>js</code>文件</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Swiper from '../assets/lib/swiper-3.4.2.min.js'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> Swiper <span class="hljs-keyword">from</span> <span class="hljs-string">'../assets/lib/swiper-3.4.2.min.js'</span></code></pre>
<blockquote>在 <code>style</code> 中 <code>@import</code> 其<code>css</code>文件</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import '../assets/lib/swiper-3.4.2.min.css';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">@<span class="hljs-keyword">import</span> <span class="hljs-string">'../assets/lib/swiper-3.4.2.min.css'</span>;</code></pre>
<p>至此，可以像往常一样使用又爱又恨的<code>swiper</code>了。</p>
<h2 id="articleHeader7">最后</h2>
<blockquote>这里只举了<code>jq</code>和<code>swiper</code>的例子，同理<code>其他插件</code>也是可用同样的方法引入。虽以上皆经过实战检验，但若有错误欢迎指正。如果对你有帮助，那就点个赞呗。逃。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在Vue/webpack引入第三方插件jQuery/swiper：简单易行

## 原文链接
[https://segmentfault.com/a/1190000010033481](https://segmentfault.com/a/1190000010033481)


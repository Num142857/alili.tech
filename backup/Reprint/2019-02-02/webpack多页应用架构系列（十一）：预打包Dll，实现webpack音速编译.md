---
title: 'webpack多页应用架构系列（十一）：预打包Dll，实现webpack音速编译' 
date: 2019-02-02 2:30:11
hidden: true
slug: wob9zu76vv
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000007104372"><code>https://segmentfault.com/a/1190000007104372</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>书承上文《<a href="https://segmentfault.com/a/1190000007043716">webpack多页应用架构系列（十）：如何打造一个自定义的bootstrap</a>》。</p>
<p>上文说到我们利用webpack来打包一个可配置的bootstrap，但<a href="https://segmentfault.com/a/1190000007043716#articleHeader7" target="_blank">文末</a>留下一个问题：由于bootstrap十分庞大，因此每次编译都要耗费大部分的时间在打包bootstrap这一块，而换来的仅仅是配置的便利，十分不划算。</p>
<p>我也并非是故意卖关子，这的确是我自己开发中碰到的问题，而在撰写完该文后，我立即着手探索解决之道。终于，发现了webpack这一大杀器：<code>DllPlugin</code>&amp;<code>DllReferencePlugin</code>，打包时间过长的问题得到完美解决。</p>
<h2 id="articleHeader1">解决方案的机制和原理</h2>
<p><code>DllPlugin</code>&amp;<code>DllReferencePlugin</code>这一方案，实际上也是属于代码分割的范畴，但与<a href="https://segmentfault.com/a/1190000006871991">CommonsChunkPlugin</a>不一样的是，它不仅仅是把公用代码提取出来放到一个独立的文件供不同的页面来使用，它更重要的一点是：把公用代码和它的使用者（业务代码）从编译这一步就分离出来，换句话说，我们可以分别来编译公用代码和业务代码了。这有什么好处呢？很简单，业务代码常改，而公用代码不常改，那么，我们在日常修改业务代码的过程中，就可以省出编译公用代码那一部分所耗费的时间了（是不是马上就联想到坑爹的bootstrap了呢）。</p>
<p>整个过程大概是这样的：</p>
<ol>
<li>利用<code>DllPlugin</code>把公用代码打包成一个<strong>“Dll文件”</strong>（其实本质上还是js，只是套用概念而已）；除了Dll文件外，<code>DllPlugin</code>还会生成一个manifest.json文件作为公用代码的索引供<code>DllReferencePlugin</code>使用。</li>
<li>在业务代码的webpack配置文件中配置好<code>DllReferencePlugin</code>并进行编译，达到利用<code>DllReferencePlugin</code>让业务代码和Dll文件实现关联的目的。</li>
<li>在各个页面&lt;head&gt;中，先加载Dll文件，再加载业务代码文件。</li>
</ol>
<h3 id="articleHeader2">适用范围</h3>
<p>Dll文件里只适合放置不常改动的代码，比如说第三方库（谁也不会有事无事就升级一下第三方库吧），尤其是本身就庞大或者依赖众多的库。如果你自己整理了一套成熟的框架，开发项目时只需要在上面添砖加瓦的，那么也可以把这套框架也打包进Dll文件里，甚至可以做到多个项目共用这一份Dll文件。</p>
<h3 id="articleHeader3">如何配置哪些代码需要打包进Dll文件？</h3>
<p>我们需要专门为Dll文件建一份webpack配置文件，不能与业务代码共用同一份配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dirVars = require('./webpack-config/base/dir-vars.config.js'); // 与业务代码共用同一份路径的配置表

module.exports = {
  output: {
    path: dirVars.dllDir,
    filename: '[name].js',
    library: '[name]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  },
  entry: {
    /*
      指定需要打包的js模块
      或是css/less/图片/字体文件等资源，但注意要在module参数配置好相应的loader
    */
    dll: [
      'jquery', '!!bootstrap-webpack!bootstrapConfig',
      'metisMenu/metisMenu.min', 'metisMenu/metisMenu.min.css',
    ],
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json', // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
      context: dirVars.staticRootDir, // 指定一个路径作为上下文环境，需要与DllReferencePlugin的context参数保持一致，建议统一设置为项目根目录
    }),
    /* 跟业务代码一样，该兼容的还是得兼容 */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new ExtractTextPlugin('[name].css'), // 打包css/less的时候会用到ExtractTextPlugin
  ],
  module: require('./webpack-config/module.config.js'), // 沿用业务代码的module配置
  resolve: require('./webpack-config/resolve.config.js'), // 沿用业务代码的resolve配置
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> dirVars = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack-config/base/dir-vars.config.js'</span>); <span class="hljs-comment">// 与业务代码共用同一份路径的配置表</span>

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: dirVars.dllDir,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>,
    <span class="hljs-attr">library</span>: <span class="hljs-string">'[name]'</span>, <span class="hljs-comment">// 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致</span>
  },
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-comment">/*
      指定需要打包的js模块
      或是css/less/图片/字体文件等资源，但注意要在module参数配置好相应的loader
    */</span>
    dll: [
      <span class="hljs-string">'jquery'</span>, <span class="hljs-string">'!!bootstrap-webpack!bootstrapConfig'</span>,
      <span class="hljs-string">'metisMenu/metisMenu.min'</span>, <span class="hljs-string">'metisMenu/metisMenu.min.css'</span>,
    ],
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DllPlugin({
      <span class="hljs-attr">path</span>: <span class="hljs-string">'manifest.json'</span>, <span class="hljs-comment">// 本Dll文件中各模块的索引，供DllReferencePlugin读取使用</span>
      name: <span class="hljs-string">'[name]'</span>,  <span class="hljs-comment">// 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致</span>
      context: dirVars.staticRootDir, <span class="hljs-comment">// 指定一个路径作为上下文环境，需要与DllReferencePlugin的context参数保持一致，建议统一设置为项目根目录</span>
    }),
    <span class="hljs-comment">/* 跟业务代码一样，该兼容的还是得兼容 */</span>
    <span class="hljs-keyword">new</span> webpack.ProvidePlugin({
      <span class="hljs-attr">$</span>: <span class="hljs-string">'jquery'</span>,
      <span class="hljs-attr">jQuery</span>: <span class="hljs-string">'jquery'</span>,
      <span class="hljs-string">'window.jQuery'</span>: <span class="hljs-string">'jquery'</span>,
      <span class="hljs-string">'window.$'</span>: <span class="hljs-string">'jquery'</span>,
    }),
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'[name].css'</span>), <span class="hljs-comment">// 打包css/less的时候会用到ExtractTextPlugin</span>
  ],
  <span class="hljs-attr">module</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack-config/module.config.js'</span>), <span class="hljs-comment">// 沿用业务代码的module配置</span>
  resolve: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack-config/resolve.config.js'</span>), <span class="hljs-comment">// 沿用业务代码的resolve配置</span>
};</code></pre>
<h3 id="articleHeader4">如何编译Dll文件？</h3>
<p>编译Dll文件的代码实际上跟编译业务代码是一样的，记得利用<code>--config</code>指定上述专供Dll使用的webpack配置文件就好了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack --progress --colors --config ./webpack-dll.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ webpack --progress --colors --config ./webpack-dll.config.js</code></pre>
<p>另外，建议可以把该语句写到<code>npm scripts</code>里，好记一点哈。</p>
<h3 id="articleHeader5">如何让业务代码关联Dll文件？</h3>
<p>我们需要在供编译业务代码的webpack配置文件里设好<code>DllReferencePlugin</code>的配置项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.DllReferencePlugin({
  context: dirVars.staticRootDir, // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
  manifest: require('../../manifest.json'), // 指定manifest.json
  name: 'dll',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
  <span class="hljs-attr">context</span>: dirVars.staticRootDir, <span class="hljs-comment">// 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录</span>
  manifest: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../../manifest.json'</span>), <span class="hljs-comment">// 指定manifest.json</span>
  name: <span class="hljs-string">'dll'</span>,  <span class="hljs-comment">// 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致</span>
});</code></pre>
<p>配置好<code>DllReferencePlugin</code>了以后，正常编译业务代码即可。不过要注意，必须要先编译Dll并生成manifest.json后再编译业务代码；而以后每次修改Dll并重新编译后，也要重新编译一下业务代码。</p>
<h3 id="articleHeader6">如何在业务代码里使用Dll文件打包的module/资源？</h3>
<p>不需要刻意做些什么，该怎么require就怎么require，webpack都会帮你处理好的了。</p>
<h3 id="articleHeader7">如何整合Dll？</h3>
<p>在每个页面里，都要按这个顺序来加载js文件：Dll文件 =&gt; <code>CommonsChunkPlugin</code>生成的公用chunk文件（如果没用<code>CommonsChunkPlugin</code>那就忽略啦） =&gt; 页面本身的入口文件。</p>
<p>有两个注意事项：</p>
<ul>
<li>如果你是像我一样利用<code>HtmlWebpackPlugin</code>来生成HTML并自动加载chunk的话，请务必在&lt;head&gt;里手写&lt;script&gt;来加载Dll文件。</li>
<li>为了完全分离源文件和编译后生成的文件，也为了方便在编译前可以清空build目录，不应直接把Dll文件编译生成到build目录里，我建议可以先生成到源文件src目录里，再用<code>file-loader</code>给原封不动搬运过去。</li>
</ul>
<h2 id="articleHeader8">光说不练假把式，来个跑分啊大兄弟！</h2>
<p>下面以我的脚手架项目<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed</a>为例，测试一下（使用开发环境的webpack配置文件<code>webpack.dev.config.js</code>）使用这套Dll方案前后的webpack编译时间：</p>
<ul>
<li>使用Dll方案前的编译时间为：10秒17</li>
<li>使用Dll方案后的编译时间为：4秒29</li>
</ul>
<p>由于该项目只是一个脚手架，涉及到的第三方库并不多，我只把jQuery、bootstrap、metisMenu给打包进Dll文件里了，尽管如此，还是差了将近6秒了，相信在实际项目中，这套<code>DllPlugin</code>&amp;<code>DllReferencePlugin</code>的方案能为你省下更多的时间来找女朋友（大误）。</p>
<h2 id="articleHeader9">示例代码</h2>
<p>诸位看本系列文章，搭配我在Github上的脚手架项目食用更佳哦（笑）：<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed</a>（<code>https://github.com/Array-Huang/webpack-seed</code>）。</p>
<h2 id="articleHeader10">附系列文章目录（同步更新）</h2>
<ul>
<li><a href="https://segmentfault.com/a/1190000006843916">webpack多页应用架构系列（一）：一步一步解决架构痛点：<code>https://segmentfault.com/a/1190000006843916</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006863968" target="_blank">webpack多页应用架构系列（二）：webpack配置常用部分有哪些？:<code>https://segmentfault.com/a/1190000006863968</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006871991">webpack多页应用架构系列（三）：怎么打包公共代码才能避免重复？：<code>https://segmentfault.com/a/1190000006871991</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006887523" target="_blank">webpack多页应用架构系列（四）：老式jQuery插件还不能丢，怎么兼容？:<code>https://segmentfault.com/a/1190000006887523</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006897458">webpack多页应用架构系列（五）：听说webpack连less/css也能打包？:<code>https://segmentfault.com/a/1190000006897458</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006907701" target="_blank">webpack多页应用架构系列（六）：听说webpack连图片和字体也能打包？:<code>https://segmentfault.com/a/1190000006907701</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006952432">webpack多页应用架构系列（七）：开发环境、生产环境傻傻分不清楚？:<code>https://segmentfault.com/a/1190000006952432</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006992218" target="_blank">webpack多页应用架构系列（八）：教练我要写ES6！webpack怎么整合Babel？:<code>https://segmentfault.com/a/1190000006992218</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007030775">webpack多页应用架构系列（九）：总有刁民想害朕！ESLint为你阻击垃圾代码:<code>https://segmentfault.com/a/1190000007030775</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007043716" target="_blank">webpack多页应用架构系列（十）：如何打造一个自定义的bootstrap:<code>https://segmentfault.com/a/1190000007043716</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007104372">webpack多页应用架构系列（十一）：预打包Dll，实现webpack音速编译:<code>https://segmentfault.com/a/1190000007104372</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007126268" target="_blank">webpack多页应用架构系列（十二）：利用webpack生成HTML普通网页&amp;页面模板:<code>https://segmentfault.com/a/1190000007126268</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007159115">webpack多页应用架构系列（十三）：构建一个简单的模板布局系统:<code>https://segmentfault.com/a/1190000007159115</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007301770" target="_blank">webpack多页应用架构系列（十四）：No复制粘贴！多项目共用基础设施</a></li>
<li><a href="https://segmentfault.com/a/1190000008203380">webpack多页应用架构系列（十五）：论前端如何在后端渲染开发模式下夹缝生存</a></li>
<li><a href="https://segmentfault.com/a/1190000010317802" target="_blank">webpack多页应用架构系列（十六）：善用浏览器缓存，该去则去，该留则留</a></li>
</ul>
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000007104372"><code>https://segmentfault.com/a/1190000007104372</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack多页应用架构系列（十一）：预打包Dll，实现webpack音速编译

## 原文链接
[https://segmentfault.com/a/1190000007104372](https://segmentfault.com/a/1190000007104372)


---
title: 'webpack多页应用架构系列（三）：怎么打包公共代码才能避免重复？' 
date: 2019-02-04 2:30:58
hidden: true
slug: zh3iom0fqn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<code>https://segmentfault.com/a/1190000006871991</code><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>与单页应用相比，多页应用存在多个入口（每个页面即一个入口），每一个入口（页面）都意味着一套完整的js代码（包括业务逻辑和加载的第三方库/框架等）。<br>在上一篇文章（<a href="https://segmentfault.com/a/1190000006863968" target="_blank">webpack多页应用架构系列（二）：webpack配置常用部分有哪些？</a>）中，我介绍了如何配置多页应用的入口(entry)，然而，如果仅仅如此操作，带来的后果就是，打包生成出来的每一个入口文件都会完整包含所有代码。<br>你也许会说："咱们以前写页面不也是每个页面都会加载所有的代码吗？浏览器会缓存，没事的啦"。其实问题在于，以前写代码都是单个单个js来加载的，一个页面加载下来的确所有页面都能共享到缓存；而到了webpack这场景，由于对于每一个页面来说，所有的js代码都打包成唯一一个js文件了，而浏览器是无法分辨出该文件内的公共代码并加以缓存的，所以，浏览器就没办法实现公共代码在页面间的缓存了（当前页面的缓存还是OK的，也就是说刷新不需要重新加载）。</p>
<h2 id="articleHeader1">想智能判断并打包公共代码？CommonsChunkPlugin能帮到你</h2>
<p>CommonsChunkPlugin的效果是：在你的多个页面（入口）所引用的代码中，找出其中满足条件（被多少个页面引用过）的代码段，判定为公共代码并打包成一个独立的js文件。至此，你只需要在每个页面都加载这个公共代码的js文件，就可以既保持代码的完整性，又不会重复下载公共代码了（多个页面间会共享此文件的缓存）。</p>
<h3 id="articleHeader2">再提一下使用Plugin的方法</h3>
<p>大部分Plugin的使用方法都有一个固定的套路：</p>
<ol>
<li>利用Plugin的初始方法并传入Plugin预设的参数进行初始化，生成一个实例。</li>
<li>将此实例插入到webpack配置文件中的<code>plugins</code>参数（数组类型）里即可。</li>
</ol>
<h3 id="articleHeader3">CommonsChunkPlugin的初始化常用参数有哪些？</h3>
<ul>
<li>
<code>name</code>，给这个包含公共代码的chunk命个名（唯一标识）。</li>
<li>
<code>filename</code>，如何命名打包后生产的js文件，也是可以用上<code>[name]</code>、<code>[hash]</code>、<code>[chunkhash]</code>这些变量的啦（具体是什么意思，请看我上一篇文章中关于filename的那一节）。</li>
<li>
<code>minChunks</code>，公共代码的判断标准：某个js模块被多少个chunk加载了才算是公共代码。</li>
<li>
<code>chunks</code>，表示需要在哪些chunk（也可以理解为webpack配置中entry的每一项）里寻找公共代码进行打包。不设置此参数则默认提取范围为所有的chunk。</li>
</ul>
<h3 id="articleHeader4">实例分析</h3>
<p>实例来自于我的脚手架项目<code>webpack-seed</code>，我是这样初始化一个CommonsChunkPlugin的实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'commons', // 这公共代码的chunk名为'commons'
    filename: '[name].bundle.js', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
    minChunks: 4, // 设定要有4个chunk（即4个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">var</span> commonsChunkPlugin = <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    <span class="hljs-attr">name</span>: <span class="hljs-string">'commons'</span>, <span class="hljs-comment">// 这公共代码的chunk名为'commons'</span>
    filename: <span class="hljs-string">'[name].bundle.js'</span>, <span class="hljs-comment">// 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了</span>
    minChunks: <span class="hljs-number">4</span>, <span class="hljs-comment">// 设定要有4个chunk（即4个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。</span>
  });</code></pre>
<p>最终生成文件的路径是根据webpack配置中的ouput.path和上面CommonsChunkPlugin的filename参数来拼的，因此想控制目录结构的，直接在filename参数里动手脚即可，例如：<code>filename: 'commons/[name].bundle.js'</code></p>
<h2 id="articleHeader5">总结</h2>
<p>整体来说，这套方案还是相当简单的，而从效果上说，也算是比较均衡的，比较适合项目初期使用。最近我也得到了打包公共代码的其它思路，相对于本文来说算是进阶版的吧，但是维护成本相对应也提高了，待我试用后再写文介绍给大家。</p>
<h2 id="articleHeader6">示例代码</h2>
<p>诸位看本系列文章，搭配我在Github上的脚手架项目食用更佳哦（笑）：<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed(<code>https://github.com/Array-Huang/webpack-seed</code>)</a>。</p>
<h2 id="articleHeader7">附系列文章目录（同步更新）</h2>
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
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<code>https://segmentfault.com/a/1190000006871991</code><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack多页应用架构系列（三）：怎么打包公共代码才能避免重复？

## 原文链接
[https://segmentfault.com/a/1190000006871991](https://segmentfault.com/a/1190000006871991)


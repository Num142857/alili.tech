---
title: 'webpack多页应用架构系列（九）：总有刁民想害朕！ESLint为你阻击垃圾代码' 
date: 2019-02-03 2:30:39
hidden: true
slug: yr59xac5pq
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000007030775"><code>https://segmentfault.com/a/1190000007030775</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<h3 id="articleHeader1">刁民，还不退下？啊……来人啊快救驾！</h3>
<p>你所在的团队里有没有“老鼠屎”？就是专门写各种看起来溜得飞起但实际上晦涩难懂的代码？又或是缩进换行乱成一团？</p>
<p>你写代码是不是特粗心？经常落下些语法错误，debug起来想死？</p>
<p>如果你有以上问题，ESLint帮到你！[手动滑稽]</p>
<h3 id="articleHeader2">ESLint的用途是？</h3>
<p>从上面两个应用场景，你大概已经猜到ESLint是用来干什么的了：</p>
<ul>
<li>审查代码是否符合编码规范和统一的代码风格；</li>
<li>审查代码是否存在语法错误；</li>
</ul>
<p>语法错误好说，编码规范和代码风格如何审查呢？ESLint定义好了一大堆规则作为可配置项;同时，一些大公司会开源出来他们使用的配置（比如说<code>airbnb</code>），你可以在某套现成配置的基础上进行修改，修改成适合你们团队使用的编码规范和代码风格。</p>
<h3 id="articleHeader3">本文主要讲什么？</h3>
<p>本文着重介绍如何在webpack里整合进ESLint，而并不介绍ESLint本身，因此，对于没有使用过ESLint的小伙伴，请先去自己入门一下啦。</p>
<h2 id="articleHeader4">webpack如何整合ESLint？</h2>
<p>这次我们需要使用到<code>eslint-loader</code>，先放出配置的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 这是webpack配置文件的内容，省略无关部分 */
{
  module: {
    preLoaders: [{
      test: /\.js$/, // 只针对js文件
      loader: 'eslint', // 指定启用eslint-loader
      include: dirVars.srcRootDir, // 指定审查范围仅为自己团队写的业务代码
      exclude: [/bootstrap/], // 剔除掉不需要利用eslint审查的文件
    }],
  },
  eslint: {
    configFile: path.resolve(dirVars.staticRootDir, './.eslintrc'), // 指定eslint的配置文件在哪里
    failOnWarning: true, // eslint报warning了就终止webpack编译
    failOnError: true, // eslint报error了就终止webpack编译
    cache: true, // 开启eslint的cache，cache存在node_modules/.cache目录里
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 这是webpack配置文件的内容，省略无关部分 */</span>
{
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">preLoaders</span>: [{
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-comment">// 只针对js文件</span>
      loader: <span class="hljs-string">'eslint'</span>, <span class="hljs-comment">// 指定启用eslint-loader</span>
      include: dirVars.srcRootDir, <span class="hljs-comment">// 指定审查范围仅为自己团队写的业务代码</span>
      exclude: [<span class="hljs-regexp">/bootstrap/</span>], <span class="hljs-comment">// 剔除掉不需要利用eslint审查的文件</span>
    }],
  },
  <span class="hljs-attr">eslint</span>: {
    <span class="hljs-attr">configFile</span>: path.resolve(dirVars.staticRootDir, <span class="hljs-string">'./.eslintrc'</span>), <span class="hljs-comment">// 指定eslint的配置文件在哪里</span>
    failOnWarning: <span class="hljs-literal">true</span>, <span class="hljs-comment">// eslint报warning了就终止webpack编译</span>
    failOnError: <span class="hljs-literal">true</span>, <span class="hljs-comment">// eslint报error了就终止webpack编译</span>
    cache: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 开启eslint的cache，cache存在node_modules/.cache目录里</span>
  }
}</code></pre>
<p>接下来解释一下这份eslint-loader的配置。</p>
<h3 id="articleHeader5">为嘛把eslint-loader放在<code>preLoaders</code>而不是<code>loaders</code>里？</h3>
<p>理论上来说放loaders里也无伤大雅，但放preLoaders里有以下好处：</p>
<ul>
<li>放在preLoader是先于loader的，因此当ESLint审查到问题报了warning/error的时候就会停掉，可以稍微省那么一点点时间吧大概[手动滑稽]。</li>
<li>
<p>如果你使用了babel，或类似的loader，那么，通过webpack编译前后的代码相差就很大了，这会造成两个问题（以babel为例）：</p>
<ul>
<li>babel把你的代码转成什么样你自己是无法控制的，这往往导致无法通过ESLint的审查。</li>
<li>我们实际上并不关心编译后生成的代码，我们只需要管好我们自己手写的代码即可，反正谁也不会没事去读读编译后的代码吧？</li>
</ul>
</li>
</ul>
<h3 id="articleHeader6">如何传参给eslint-loader？</h3>
<p>从<a href="https://github.com/MoOx/eslint-loader" rel="nofollow noreferrer" target="_blank">eslint-loader官方文档</a>可以看出，eslint-loader的配置还是比较多也比较复杂的，因此采用了独立的一个配置项<code>eslint</code>（跟<code>module</code>同级哈）。</p>
<h2 id="articleHeader7">总结</h2>
<p>只要你能在自己团队里成功推行ESLint，那么最起码，你可以放心不用再看到那些奇奇怪怪的代码了，因为，它们都编译不通过呐哈哈哈哈哈……</p>
<h2 id="articleHeader8">后话</h2>
<p>通过webpack整合ESLint，我们可以保证编译生成的代码都是没有语法错误且符合编码规范的；但在开发过程中，等到编译的时候才察觉到问题可能也是太慢了点儿。</p>
<p>因此我建议可以把ESLint整合进编辑器或IDE里，像我本人在用<code>Sublime Text 3</code>的，就可以使用一个名为<code>SublimeLinter</code>的插件，一写了有<strong>问题</strong>的代码，就马上会标识出来，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVDFaU?w=810&amp;h=216" src="https://static.alili.tech/img/bVDFaU?w=810&amp;h=216" alt="SublimeLinter效果图" title="SublimeLinter效果图" style="cursor: pointer;"></span></p>
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
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000007030775"><code>https://segmentfault.com/a/1190000007030775</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack多页应用架构系列（九）：总有刁民想害朕！ESLint为你阻击垃圾代码

## 原文链接
[https://segmentfault.com/a/1190000007030775](https://segmentfault.com/a/1190000007030775)


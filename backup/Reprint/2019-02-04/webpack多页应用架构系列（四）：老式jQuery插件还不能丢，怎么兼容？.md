---
title: 'webpack多页应用架构系列（四）：老式jQuery插件还不能丢，怎么兼容？' 
date: 2019-02-04 2:30:57
hidden: true
slug: cl4nxsuvawf
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<code>https://segmentfault.com/a/1190000006887523</code><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>目前前端虽处于百花齐放阶段，angular/react/vue竞相角逐，但毕竟尚未完全成熟，有些需求还是得依靠我们的老大哥jQuery的。</p>
<p>我个人对jQuery并不反感，但我对jQuery生态的停滞不前相当无奈，比如说赫赫有名的bootstrap（特指3代），在webpack上打包还得靠个loader的，太跟不上时势了。况且，bootstrap还算好的，有些jquery插件都有一两年没更新了，连NPM都没上架呢，可偏偏就是找不到它们的替代品，项目又急着要上，这可咋办呐？</p>
<p>别急，今天就教你适配兼容老式jQuery插件。</p>
<h2 id="articleHeader1">老式jQuery插件为和不能直接用webpack打包？</h2>
<p>如果你把jQuery看做是一个普通的js模块来加载（要用到jQuery的模块统统先require后再使用），那么，当你加载老式jQuery插件时，往往会提示找不到jQuery实例（有时候是提示找不到<code>$</code>），这是为啥呢？</p>
<p>要解释这个问题，就必须先稍微解释一下jQuery插件的机制：jQuery插件是通过jQuery提供的<code>jQuery.fn.extend(object)</code>和<code>jQuery.extend(object)</code>这俩方法，来把插件本身实现的方法挂载到<code>jQuery</code>（也即<code>$</code>）这个对象上的。传统引用jQuery及其插件的方式是先用<code>&lt;script&gt;</code>加载jQuery本身，然后再用同样的方法来加载其插件；jQuery会把<code>jQuery</code>对象设置为全局变量（当然也包括了<code>$</code>），既然是全局变量，那么插件们很容易就能找到<code>jQuery</code>对象并挂载自身的方法了。</p>
<p>而webpack作为一个遵从模块化原则的构建工具，自然是要把各模块的上下文环境给分隔开以减少相互间的影响；而jQuery也早已适配了AMD/CMD等加载方式，换句话说，我们在require <code>jQuery</code>的时候，实际上并不会把<code>jQuery</code>对象设置为全局变量。说到这里，问题也很明显了，jQuery插件们找不到<code>jQuery</code>对象了，因为在它们各自的上下文环境里，既没有局部变量<code>jQuery</code>（因为没有适配AMD/CMD，所以就没有相应的require语句了），也没有全局变量<code>jQuery</code>。</p>
<h2 id="articleHeader2">怎么来兼容老式jQuery插件呢？</h2>
<p>方法有不少，下面一个一个来看。</p>
<h3 id="articleHeader3">
<code>ProvidePlugin</code> + <code>expose-loader</code>
</h3>
<p>首先来介绍我最为推荐的方法：<code>ProvidePlugin</code> + <code>expose-loader</code>，在我公司的项目，以及我个人的脚手架开源项目<code>webpack-seed</code>里使用的都是这一种方法。</p>
<p>ProvidePlugin的配置是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var providePlugin = new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">var</span> providePlugin = <span class="hljs-keyword">new</span> webpack.ProvidePlugin({
    <span class="hljs-attr">$</span>: <span class="hljs-string">'jquery'</span>,
    <span class="hljs-attr">jQuery</span>: <span class="hljs-string">'jquery'</span>,
    <span class="hljs-string">'window.jQuery'</span>: <span class="hljs-string">'jquery'</span>,
    <span class="hljs-string">'window.$'</span>: <span class="hljs-string">'jquery'</span>,
  });</code></pre>
<p>ProvidePlugin的机制是：当webpack加载到某个js模块里，出现了未定义且名称符合（字符串完全匹配）配置中key的变量时，会自动require配置中value所指定的js模块。</p>
<p>如上述例子，当某个老式插件使用了<code>jQuery.fn.extend(object)</code>，那么webpack就会自动引入<code>jquery</code>（此处我是用NPM的版本，我也推荐使用NPM的版本）。</p>
<p>另外，使用ProvidePlugin还有个好处，就是，你自己写的代码里，再！也！不！用！require！jQuery！啦！毕竟少写一句是一句嘛哈哈哈。</p>
<p>接下来介绍expose-loader，这个loader的作用是，将指定js模块export的变量声明为全局变量。下面来看下expose-loader的配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
    很明显这是一个loader的配置项，篇幅有限也只能截取相关部分了
    看不明白的麻烦去看本系列的另一篇文章《webpack多页应用架构系列（二）：webpack配置常用部分有哪些？》：https://segmentfault.com/a/1190000006863968
 */
{
  test: require.resolve('jquery'),  // 此loader配置项的目标是NPM中的jquery
  loader: 'expose?$!expose?jQuery', // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
    很明显这是一个loader的配置项，篇幅有限也只能截取相关部分了
    看不明白的麻烦去看本系列的另一篇文章《webpack多页应用架构系列（二）：webpack配置常用部分有哪些？》：https://segmentfault.com/a/1190000006863968
 */</span>
{
  <span class="hljs-attr">test</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'jquery'</span>),  <span class="hljs-comment">// 此loader配置项的目标是NPM中的jquery</span>
  loader: <span class="hljs-string">'expose?$!expose?jQuery'</span>, <span class="hljs-comment">// 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`</span>
},</code></pre>
<p>你或许会问，有了ProvidePlugin为嘛还需要expose-loader？问得好，如果你所有的jQuery插件都是用webpack来加载的话，的确用ProvidePlugin就足够了；但理想是丰满的，现实却是骨感的，总有那么些需求是只能用<code>&lt;script&gt;</code>来加载的。</p>
<h3 id="articleHeader4">externals</h3>
<p>externals是webpack配置中的一项，用来将某个全局变量<strong>“伪装”</strong>成某个js模块的exports，如下面这个配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    externals: {
      'jquery': 'window.jQuery',
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    externals: {
      <span class="hljs-string">'jquery'</span>: <span class="hljs-string">'window.jQuery'</span>,
    },</code></pre>
<p>那么，当某个js模块显式地调用<code>var $ = require('jquery')</code>的时候，就会把<code>window,jQuery</code>返回给它。</p>
<p>与上述<code>ProvidePlugin + expose-loader</code>的方案相反，此方案是先用<code>&lt;script&gt;</code>加载的jQuery满足老式jQuery插件的需要，再通过externals将其转换成符合模块化要求的exports。</p>
<p>我个人并不太看好这种做法，毕竟这就意味着jQuery脱离NPM的管理了，不过某些童鞋有其它的考虑，例如为了加快每次打包的时间而把jQuery这些比较大的第三方库给分离出去（直接调用公共CDN的第三方库？），也算是有一定的价值。</p>
<h3 id="articleHeader5">imports-loader</h3>
<p>这个方案就相当于手动版的ProvidePlugin，以前我用requireJS的时候也是用的类似的手段，所以我一开始从requireJS迁移到webpack的时候用的也是这种方法，后来知道有ProvidePlugin就马上换了哈。</p>
<p>这里就不详细说明了，放个例子大家看看就懂：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./webpack.config.js

module.exports = {
    ...
    module: {
        loaders: [
            {
                test: require.resolve(&quot;some-module&quot;),
                loader: &quot;imports?$=jquery&amp;jQuery=jquery&quot;, // 相当于`var $ = require(&quot;jquery&quot;);var jQuery = require(&quot;jquery&quot;);`
            }
        ]
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ./webpack.config.js</span>

<span class="hljs-built_in">module</span>.exports = {
    ...
    module: {
        <span class="hljs-attr">loaders</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">"some-module"</span>),
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"imports?$=jquery&amp;jQuery=jquery"</span>, <span class="hljs-comment">// 相当于`var $ = require("jquery");var jQuery = require("jquery");`</span>
            }
        ]
    }
};</code></pre>
<h2 id="articleHeader6">总结</h2>
<p>以上的方案其实都属于shimming，并不特别针对jQuery，请举一反三使用。另外，上述方案并不仅用于shimming，比如用上<code>ProvidePlugin</code>来写少几个require，自己多多挖掘，很有乐趣的哈~~</p>
<h2 id="articleHeader7">补充</h2>
<h3 id="articleHeader8">误用externals（2016-10-17更新）</h3>
<p>有童鞋私信我，说用了我文章的方案依然提示<code>$ is not a function</code>，在我仔细分析后，发现：</p>
<ol>
<li>他用的是我推荐的<strong><code>ProvidePlugin</code> + <code>expose-loader</code></strong>方案，也就是说，他已经把jquery打包进来了。</li>
<li>但是他又不明就里得配了externals：</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  externals: {
    jquery: 'window.jQuery',
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  externals: {
    <span class="hljs-attr">jquery</span>: <span class="hljs-string">'window.jQuery'</span>,
  },</code></pre>
<ol>
<li>然而实际上他并没有直接用<code>&lt;script&gt;</code>来引用jQuery，因此window.jQuery是个null。</li>
<li>结果，他的jquery插件获得的<code>$</code>就是个null了。</li>
</ol>
<p>这里面我们可以看出，externals是会覆盖掉<code>ProvidePlugin</code>的。</p>
<p>但这里有个问题，<code>expose-loader</code>的作用就是设置好window.jQuery和window.$，那window.jQuery怎么会是null呢？我的猜想是：externals在<code>expose-loader</code>设置好<code>window.jQuery</code>前就已经取了<code>window.jQuery</code>的值(<code>null</code>)了。</p>
<p>说了这么多，其实关键意思就是，不要手贱不要手贱不要手贱（重要的事情说三遍）！</p>
<h2 id="articleHeader9">示例代码</h2>
<p>诸位看本系列文章，搭配我在Github上的脚手架项目食用更佳哦（笑）：<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed(<code>https://github.com/Array-Huang/webpack-seed</code>)</a>。</p>
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
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<code>https://segmentfault.com/a/1190000006887523</code><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack多页应用架构系列（四）：老式jQuery插件还不能丢，怎么兼容？

## 原文链接
[https://segmentfault.com/a/1190000006887523](https://segmentfault.com/a/1190000006887523)


---
title: 'webpack多页应用架构系列（十）：如何打造一个自定义的bootstrap' 
date: 2019-02-02 2:30:11
hidden: true
slug: olrdfzc0k3h
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000007043716"><code>https://segmentfault.com/a/1190000007043716</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>一般我们用bootstrap呐，都是用的从官网或github下载下来build好了的版本，千人一脸呐多没意思。当然，官网也给我们提供了自定义的工具，如下图所示，但每次要改些什么就要重新在官网上打包一份，而且还是个国外的网站，甭提有多烦躁了。</p>
<p><span class="img-wrap"><img data-src="/img/bVDHvA?w=874&amp;h=935" src="https://static.alili.tech/img/bVDHvA?w=874&amp;h=935" alt="bootstrap官网 - 自定义打包" title="bootstrap官网 - 自定义打包" style="cursor: pointer; display: inline;"></span></p>
<p>那么，有没有办法让我们随时随地都能根据业务的需要来自定义bootstrap呢？答案自然是肯定的，webpack有啥干不了的呀（大误）[手动滑稽]</p>
<h3 id="articleHeader1">sass/less的两套方案</h3>
<p>bootstrap主要由两部分组成：样式和jQuery插件。这里要说的是样式，bootstrap有less的方案，也有sass的方案，因此，也存在两个loader分别对应这两套方案：less &lt;=&gt; <a href="https://github.com/gowravshekar/bootstrap-webpack" rel="nofollow noreferrer" target="_blank">bootstrap-webpack</a> 和 sass &lt;=&gt; <a href="https://github.com/shakacode/bootstrap-loader" rel="nofollow noreferrer" target="_blank">bootstrap-loader</a> 。</p>
<p>我个人惯用的是less，因此本文以<code>bootstrap-webpack</code>为例来介绍如何打造一个自定义的bootstrap。</p>
<h2 id="articleHeader2">开工了！</h2>
<h3 id="articleHeader3">先引入全局的jQuery</h3>
<p>众所周知，bootstrap这货指明是要全局的jQuery的，甭以为现在用webpack打包的就有什么突破了。引入全局jQuery的方法请看我之前的这篇文章《<a href="https://segmentfault.com/a/1190000006887523#articleHeader3">webpack多页应用架构系列（四）：老式jQuery插件还不能丢，怎么兼容？</a>》（<code>ProvidePlugin</code> + <code>expose-loader</code>），我的脚手架项目<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed</a>也是使用的这套方案。</p>
<h3 id="articleHeader4">如何加载bootstrap配置？</h3>
<p>bootstrap-webpack提供一个默认选配下的bootstrap，不过默认的我要你何用（摔</p>
<p>好，言归正题，我们首先需要新建两个配置文件<code>bootstrap.config.js</code>和<code>bootstrap.config.less</code>，并将这俩文件放在同一级目录下（像我就把业务代码里用到的config全部丢到同一个目录里了哈哈哈）。</p>
<p>因为每个页面都需要，也只需要引用一次，因此我们可以找个每个页面都会加载的公共模块(用<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed</a>来举例就是<code>src/public-resource/logic/common.page.js</code>，我每个页面都会加载这个js模块)来加载bootstrap：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('!!bootstrap-webpack!bootstrapConfig'); // bootstrapConfig是我在webpack配置文件中设好的alias，不设的话这里就填实际的路径就好了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">'!!bootstrap-webpack!bootstrapConfig'</span>); <span class="hljs-comment">// bootstrapConfig是我在webpack配置文件中设好的alias，不设的话这里就填实际的路径就好了</span></code></pre>
<p>上文已经说到，bootstrap-webpack其实就是一个webpack的loader，所以这里是用loader的语法。需要注意的是，如果你在webpack配置文件中针对js文件设置了loader（比如说babel），那么在加载bootstrap-webpack的时候请在最前面加个<code>!!</code>，表示这个<code>require</code>语句忽略webpack配置文件中所有loader的配置，还有其它的用法，看自己需要哈：</p>
<blockquote>adding ! to a request will disable configured preLoaders<br>adding !! to a request will disable all loaders specified in the configuration<br>adding -! to a request will disable configured preLoaders and loaders but not the postLoaders</blockquote>
<h3 id="articleHeader5">如何配置bootstrap？</h3>
<p>上文提到有两个配置文件，<code>bootstrap.config.js</code>和<code>bootstrap.config.less</code>，显然，它们的作用是不一样的。</p>
<h4><code>bootstrap.config.js</code></h4>
<p><code>bootstrap.config.js</code>的作用就是配置需要加载哪些组件的样式和哪些jQuery插件，可配置的内容跟官网是一致的，官方给出这样的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  scripts: {
    // add every bootstrap script you need
    'transition': true
  },
  styles: {
    // add every bootstrap style you need
    &quot;mixins&quot;: true,

    &quot;normalize&quot;: true,
    &quot;print&quot;: true,

    &quot;scaffolding&quot;: true,
    &quot;type&quot;: true,
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">scripts</span>: {
    <span class="hljs-comment">// add every bootstrap script you need</span>
    <span class="hljs-string">'transition'</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">styles</span>: {
    <span class="hljs-comment">// add every bootstrap style you need</span>
    <span class="hljs-string">"mixins"</span>: <span class="hljs-literal">true</span>,

    <span class="hljs-string">"normalize"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"print"</span>: <span class="hljs-literal">true</span>,

    <span class="hljs-string">"scaffolding"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"type"</span>: <span class="hljs-literal">true</span>,
  }
};</code></pre>
<p>当时我是一下子懵逼了，就这么几个？完整的例子/文档在哪里？后来终于被我找到默认的配置了，直接拿过来在上面改改就能用了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  styleLoader: ExtractTextPlugin.extract('css?minimize&amp;-autoprefixer!postcss!less'),
  scripts: {
    transition: true,
    alert: true,
    button: true,
    carousel: true,
    collapse: true,
    dropdown: true,
    modal: true,
    tooltip: true,
    popover: true,
    scrollspy: true,
    tab: true,
    affix: true,
  },
  styles: {
    mixins: true,

    normalize: true,
    print: true,

    scaffolding: true,
    type: true,
    code: true,
    grid: true,
    tables: true,
    forms: true,
    buttons: true,

    'component-animations': true,
    glyphicons: false,
    dropdowns: true,
    'button-groups': true,
    'input-groups': true,
    navs: true,
    navbar: true,
    breadcrumbs: true,
    pagination: true,
    pager: true,
    labels: true,
    badges: true,
    jumbotron: true,
    thumbnails: true,
    alerts: true,
    'progress-bars': true,
    media: true,
    'list-group': true,
    panels: true,
    wells: true,
    close: true,

    modals: true,
    tooltip: true,
    popovers: true,
    carousel: true,

    utilities: true,
    'responsive-utilities': true,
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">styleLoader</span>: ExtractTextPlugin.extract(<span class="hljs-string">'css?minimize&amp;-autoprefixer!postcss!less'</span>),
  <span class="hljs-attr">scripts</span>: {
    <span class="hljs-attr">transition</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">alert</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">button</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">carousel</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">collapse</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">dropdown</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">modal</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">tooltip</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">popover</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">scrollspy</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">tab</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">affix</span>: <span class="hljs-literal">true</span>,
  },
  <span class="hljs-attr">styles</span>: {
    <span class="hljs-attr">mixins</span>: <span class="hljs-literal">true</span>,

    <span class="hljs-attr">normalize</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">print</span>: <span class="hljs-literal">true</span>,

    <span class="hljs-attr">scaffolding</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">code</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">grid</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">tables</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">forms</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">buttons</span>: <span class="hljs-literal">true</span>,

    <span class="hljs-string">'component-animations'</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">glyphicons</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">dropdowns</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">'button-groups'</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">'input-groups'</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">navs</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">navbar</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">breadcrumbs</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">pagination</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">pager</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">labels</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">badges</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">jumbotron</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">thumbnails</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">alerts</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">'progress-bars'</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">media</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">'list-group'</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">panels</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">wells</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">close</span>: <span class="hljs-literal">true</span>,

    <span class="hljs-attr">modals</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">tooltip</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">popovers</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">carousel</span>: <span class="hljs-literal">true</span>,

    <span class="hljs-attr">utilities</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">'responsive-utilities'</span>: <span class="hljs-literal">true</span>,
  },
};</code></pre>
<p>这里的<code>scripts</code>项就是jQuery插件了，而<code>styles</code>项则是样式，可以分别对照着bootstrap英文版文档来查看。</p>
<p>需要解释的是<code>styleLoader</code>项，这表示用什么loader来加载bootstrap的样式，相当于webpack配置文件中针对<code>.less</code>文件的loader配置项吧，这里我也是直接从webpack配置文件里抄过来的。</p>
<p>另外，由于我使用了<a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">iconfont</a>作为图标的解决方案，因此就去掉了<code>glyphicons</code>；如果你要使用<code>glyphicons</code>的话，请务必在webpack配置中设置好针对各类字体文件的loader配置，否则可是会报错的哦。</p>
<h4><code>bootstrap.config.less</code></h4>
<p><code>bootstrap.config.less</code>配置的是less变量，bootstarp官网上也有相同的配置，这里就不多做解释了，直接放个官方例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@font-size-base: 24px;
@btn-default-color: #444;
@btn-default-bg: #eee;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="less hljs"><code class="less"><span class="hljs-variable">@font-size-base:</span> <span class="hljs-number">24px</span>;
<span class="hljs-variable">@btn-default-color:</span> <span class="hljs-number">#444</span>;
<span class="hljs-variable">@btn-default-bg:</span> <span class="hljs-number">#eee</span>;</code></pre>
<p>需要注意的是，我一开始只用了<code>bootstrap.config.js</code>而没建<code>bootstrap.config.less</code>，结果发现报错了，还来建了个空的<code>bootstrap.config.less</code>就编译成功了，因此，无论你有没有配置less变量的需要，都请新建一个<code>bootstrap.config.less</code>。</p>
<h2 id="articleHeader6">总结</h2>
<p>至此，一个可自定义的bootstrap就出炉了，你想怎么折腾都行了，什么不用的插件不用的样式，统统给它去掉，把体积减到最小，哈哈哈。</p>
<h2 id="articleHeader7">后话</h2>
<p>此方案有个缺点：此方案相当于每次编译项目时都把整个bootstrap编译一遍，而bootstrap是一个庞大的库，每次编译都会耗费不少的时间，如果只是编译一次也就算了，每次都要耗这时间那可真恶心呢。所以，我打算折腾一下看能不能有所改进，在这里先记录下原始的方案，后面如果真能改进会继续写文的了哈。</p>
<h2 id="articleHeader8">示例代码</h2>
<p>诸位看本系列文章，搭配我在Github上的脚手架项目食用更佳哦（笑）：<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed</a>（<code>https://github.com/Array-Huang/webpack-seed</code>）。</p>
<h2 id="articleHeader9">附系列文章目录（同步更新）</h2>
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
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000007043716"><code>https://segmentfault.com/a/1190000007043716</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack多页应用架构系列（十）：如何打造一个自定义的bootstrap

## 原文链接
[https://segmentfault.com/a/1190000007043716](https://segmentfault.com/a/1190000007043716)


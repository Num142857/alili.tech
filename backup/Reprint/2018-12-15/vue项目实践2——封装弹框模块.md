---
title: 'vue项目实践2——封装弹框模块' 
date: 2018-12-15 2:30:11
hidden: true
slug: ham5s1f031o
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>本文承接前一篇文章<a href="https://segmentfault.com/a/1190000012769961">vue项目实践1——构建项目</a>，在构建项目的基础上进行弹框组件的封装。弹框组件强调js动态调用、异步处理用户交互事件。</p>
<p>另外，关于弹框模块实现上基础的网上有很多讲解，进阶的封装借鉴了C#的语法和Qt的弹窗，封装后使用方便，但封装的思想和实现不太好讲清楚。有兴趣的可以去看我的github：<a href="https://github.com/sunhuili/vueExplore" rel="nofollow noreferrer" target="_blank">https://github.com/sunhuili/v...</a>。</p>
<h1 id="articleHeader1">开发前配置</h1>
<p>基于当前构建的项目，我们需要再进行一些配置，以便更便捷舒适的开发体验。当前项目目录结构如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV27ZQ?w=182&amp;h=516" src="https://static.alili.tech/img/bV27ZQ?w=182&amp;h=516" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">配置资源文件路径别名</h2>
<p>如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV27X4?w=787&amp;h=320" src="https://static.alili.tech/img/bV27X4?w=787&amp;h=320" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">配置</h3>
<p>在webpack的配置文件webpack.base.conf.js中加入scss、assets、static三个文件的路径别名即可（重启项目后生效）。</p>
<h3 id="articleHeader4">使用</h3>
<ul>
<li>
<p>1、scss文件的引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;scss&quot; scoped=&quot;&quot;>
    @import '~scss/_variable.scss';
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span> <span class="hljs-attr">scoped</span>=<span class="hljs-string">""</span>&gt;</span><span class="css">
    @<span class="hljs-keyword">import</span> <span class="hljs-string">'~scss/_variable.scss'</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
</li>
<li>
<p>2、图片的引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;~static/images/loading.gif&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"~static/images/loading.gif"</span>&gt;</code></pre>
</li>
<li>
<p>3、动态图片引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
  return {
    loadingSrc: require('static/images/loading.gif'),
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-class"><span class="hljs-keyword">data</span>() {
  <span class="hljs-title">return</span> {
    <span class="hljs-title">loadingSrc</span>: <span class="hljs-title">require</span>('<span class="hljs-title">static</span>/<span class="hljs-title">images</span>/<span class="hljs-title">loading</span>.<span class="hljs-title">gif'</span>),
  }</span>
},</code></pre>
</li>
</ul>
<h3 id="articleHeader5">原理</h3>
<ul>
<li>1、static与assets的区别<br><strong>assets：</strong>项目编译的过程中会被webpack处理解析为模块依赖，只支持相对路径的形式，编译后文件名会加上版本hash作为后缀。<br><strong>static：</strong>不会被webpack处理、解析，会被直接复制到最终的打包目录（默认是dist/static）下。必须使用绝对路径引用这些文件，这是通过config.js文件中的build.assetsPublicPath和build.assetsSubDirectory链接来确定的。任何放在static中的文件都需要以绝对路径的形式引用“/static/[filename]”。<p><strong>综上：</strong>根据webpack的特性，总的来说就是static放不会变动的第三方文件，assets放可能会变动的文件。</p>
</li>
<li>2、动态加载和静态加载的区别<br><strong>静态加载：</strong>直接在template标签内引用，直接按路径来就可以了。<br><strong>动态绑定：</strong>script标签内的引用，因为webpack中图片资源是作为模块引入的，所以不能直接用路径。</li>
<li>3、配路径别名的重要性<br><strong>更舒适的编程体验：</strong>使用别名后可以直接用绝对路径，不用一直<code>../</code>向上查找相对路径。<br><strong>便于模块化处理：</strong>使用别名后便于迁移，不会因为换个路径就报一堆错。<br><strong>可以配合基路由的配置：</strong><strong>这个是最重要一点</strong>，前端项目编译后不一定有专门的前端服务器，很可能是前套在后端服务器的文件路径中，如<a href="http://192.168.3.10/qianduan/index.html" rel="nofollow noreferrer" target="_blank">http://192.168.3.10/qianduan/...</a> ,其中‘qianduan’就是我们的基路由，这时候因为static文件夹下文件用绝对路径引用，就会导致开发和线上路径不一致，从而导致各种问题。而设置了路径别名后就不需要担心开发和线上路径不一致的问题了。</li>
</ul>
<h2 id="articleHeader6">基础样式配置</h2>
<p>如图所示，定义好基色调、常用样式（这里多用flex布局）。</p>
<p><span class="img-wrap"><img data-src="/img/bV28a7?w=583&amp;h=298" src="https://static.alili.tech/img/bV28a7?w=583&amp;h=298" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV28a8?w=523&amp;h=289" src="https://static.alili.tech/img/bV28a8?w=523&amp;h=289" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">配套路由和测试页面</h2>
<p><span class="img-wrap"><img data-src="/img/bV28z1?w=624&amp;h=332" src="https://static.alili.tech/img/bV28z1?w=624&amp;h=332" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">测试页面一览</h3>
<p><span class="img-wrap"><img data-src="/img/bV28qM?w=388&amp;h=688" src="https://static.alili.tech/img/bV28qM?w=388&amp;h=688" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader9">封装弹框组件</h1>
<p>如图所示目录，弹框组件放在‘src/plugin/dialog’目录下。</p>
<p><span class="img-wrap"><img data-src="/img/bV28iX?w=149&amp;h=294" src="https://static.alili.tech/img/bV28iX?w=149&amp;h=294" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader10">dialog文件夹下各文件介绍</h2>
<ul>
<li>1、dialog/index.js是给外部调用的文件；</li>
<li>2、dialog.scss是弹框的样式（这里省事的所有弹框用了同一套）；</li>
<li>3、alert、confirm等文件夹里是具体弹框的实现。</li>
</ul>
<h2 id="articleHeader11">具体弹框实现，以alert为例</h2>
<p>alert文件夹下包含两个文件：alert.vue、index.js</p>
<ul>
<li>1、alert.vue：alert弹框组件（同一般的vue组件），实现alert的界面显示。</li>
<li>2、index.js：alert调用方法，封装使我们可以通过js语法动态调用alert弹框，包括js弹出窗口、js关闭窗口、异步获取用户点击事件。<br> 实现如下图：<p><span class="img-wrap"><img data-src="/img/bV28lR?w=748&amp;h=717" src="https://static.alili.tech/img/bV28lR?w=748&amp;h=717" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
</li>
</ul>
<h2 id="articleHeader12">使用方式</h2>
<ul>
<li>1、直接引用<p><span class="img-wrap"><img data-src="/img/bV28mq?w=731&amp;h=490" src="https://static.alili.tech/img/bV28mq?w=731&amp;h=490" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
</li>
<li>2、绑定为Vue的属性<p><span class="img-wrap"><img data-src="/img/bV28pg?w=682&amp;h=382" src="https://static.alili.tech/img/bV28pg?w=682&amp;h=382" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV28pv?w=768&amp;h=376" src="https://static.alili.tech/img/bV28pv?w=768&amp;h=376" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
</li>
</ul>
<h1 id="articleHeader13">结语</h1>
<p>github上vue项目持续更新<a href="https://github.com/sunhuili/vueExplore" rel="nofollow noreferrer" target="_blank">https://github.com/sunhuili/v...</a> ，主要是项目中积累的公用模块和实用配置，欢迎大家一起交流技术。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue项目实践2——封装弹框模块

## 原文链接
[https://segmentfault.com/a/1190000013101669](https://segmentfault.com/a/1190000013101669)


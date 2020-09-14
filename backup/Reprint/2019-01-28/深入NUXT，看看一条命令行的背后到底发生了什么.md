---
title: '深入NUXT，看看一条命令行的背后到底发生了什么' 
date: 2019-01-28 2:30:09
hidden: true
slug: 7248fja7laj
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVIc9l?w=536&amp;h=136" src="https://static.alili.tech/img/bVIc9l?w=536&amp;h=136" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">一、介绍</h1>
<blockquote><p><a href="https://nuxtjs.org/" rel="nofollow noreferrer" target="_blank">Nuxt.js - Universal Vue.js Applications</a></p></blockquote>
<p>随着<code>react</code>社区的<code>next.js</code>框架的发布，<code>vue</code>社区也终于诞生了属于自己的前后端同构框架<code>nuxt.js</code>。在进一步的接触与使用中，发现<code>nuxt.js</code>确实极大地方便了<code>vue</code>项目的开发，其背后的逻辑也值得我们玩味。关于<code>nuxt</code>的具体的用法请查阅<a href="https://nuxtjs.org/guide" rel="nofollow noreferrer" target="_blank">官方文档</a>，本文就不一一赘述了。</p>
<p>本文主要研究<code>nuxt</code>的运行原理，分析它从接收一条<code>nuxt</code>指令，到完成指令背后所发生的一系列事情。</p>
<p>在开始本文之前，请读者<strong>务必</strong>亲自体验过<code>nuxt.js</code>的使用，并且具备一定的<code>vue.js</code>相关开发经验。</p>
<h1 id="articleHeader1">二、NUXT指令</h1>
<p>通过查看<code>nuxt.js</code>工程目录下的<code>package.json</code>文件，我们可以看到下列几条指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;dev&quot;: &quot;nuxt&quot;,
  &quot;build&quot;: &quot;nuxt build&quot;,
  &quot;start&quot;: &quot;nuxt start&quot;,
  &quot;generate&quot;: &quot;nuxt generate&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"dev"</span>: <span class="hljs-string">"nuxt"</span>,
  <span class="hljs-string">"build"</span>: <span class="hljs-string">"nuxt build"</span>,
  <span class="hljs-string">"start"</span>: <span class="hljs-string">"nuxt start"</span>,
  <span class="hljs-string">"generate"</span>: <span class="hljs-string">"nuxt generate"</span>
}</code></pre>
<p>结合官网的介绍，我们可以知道不同的指令对应着不同的功能：</p>
<table>
<thead><tr>
<th>指令</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>nuxt</td>
<td>开启一个监听3000端口的服务器，同时提供hot-reloading功能</td>
</tr>
<tr>
<td>nuxt build</td>
<td>构建整个应用，压缩合并JS和CSS文件（用于生产环境）</td>
</tr>
<tr>
<td>nuxt start</td>
<td>开启一个生产模式的服务器（必须先运行<code>nuxt build</code>命令）</td>
</tr>
<tr>
<td>nuxt generate</td>
<td>构建整个应用，并为每一个路由生成一个静态页面（用于静态服务器）</td>
</tr>
</tbody>
</table>
<p>以上几条指令，也就是本文将要分析的重点：究竟这些指令的背后，<code>nuxt</code>都做了一些什么样的工作呢？</p>
<h1 id="articleHeader2">三、执行指令</h1>
<p>打开<code>nuxt.js</code>的工程目录，进入到到<code>bin</code>目录，我们可以看到5个文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  |__ nuxt
  |__ nuxt-build
  |__ nuxt-dev
  |__ nuxt-generate
  |__ nuxt-start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>  <span class="hljs-string">|__ nuxt</span>
  <span class="hljs-string">|__ nuxt-build</span>
  <span class="hljs-string">|__ nuxt-dev</span>
  <span class="hljs-string">|__ nuxt-generate</span>
  <span class="hljs-string">|__ nuxt-start</span></code></pre>
<p>每个文件对应着不同的指令。下面我们通过一张图来分析每一条指令的执行过程：</p>
<p><span class="img-wrap"><img data-src="/img/bVIc4x?w=1462&amp;h=510" src="https://static.alili.tech/img/bVIc4x?w=1462&amp;h=510" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>从上图可知，每一条指令基本都是做了这么几件事情：</p>
<ol>
<li><p>读取<code>nuxt.config.js</code>文件的配置；</p></li>
<li><p>实例化<code>Nuxt()</code>类，并把上一步读取到的配置覆盖<code>Nuxt()</code>类的默认配置；</p></li>
<li><p>执行各自具体的方法函数。</p></li>
</ol>
<p>对应代码如下（节选）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var nuxtConfigFile = resolve(rootDir, 'nuxt.config.js')

var options = {}
if (fs.existsSync(nuxtConfigFile)) {
  options = require(nuxtConfigFile)
}
if (typeof options.rootDir !== 'string') {
  options.rootDir = rootDir
}

var nuxt = new Nuxt(options)
nuxt.build()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> nuxtConfigFile = resolve(rootDir, <span class="hljs-string">'nuxt.config.js'</span>)

<span class="hljs-selector-tag">var</span> options = {}
<span class="hljs-keyword">if</span> (fs.existsSync(nuxtConfigFile)) {
  options = require(nuxtConfigFile)
}
<span class="hljs-keyword">if</span> (typeof options<span class="hljs-selector-class">.rootDir</span> !== <span class="hljs-string">'string'</span>) {
  options<span class="hljs-selector-class">.rootDir</span> = rootDir
}

<span class="hljs-selector-tag">var</span> nuxt = new Nuxt(options)
nuxt.build()</code></pre>
<p>第一步读取配置以及配置的内容可以查看<a href="https://nuxtjs.org/api/configuration-build" rel="nofollow noreferrer" target="_blank">官网说明</a>，下面我们将会对第二步和第三步进行深入探讨。</p>
<h1 id="articleHeader3">四、<code>Nuxt()</code>类</h1>
<p>进入到<code>nuxt/lib</code>目录，我们可以看到如下的文件目录结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  |__ app
  |__ build
    |__ index.js
    |__ webpack
  |__ generate.js
  |__ nuxt.js
  |__ render.js
  |__ server.js
  |__ utils.js
  |__ views
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>  <span class="hljs-string">|__ app</span>
  <span class="hljs-string">|__ build</span>
    <span class="hljs-string">|__ index.js</span>
    <span class="hljs-string">|__ webpack</span>
  <span class="hljs-string">|__ generate.js</span>
  <span class="hljs-string">|__ nuxt.js</span>
  <span class="hljs-string">|__ render.js</span>
  <span class="hljs-string">|__ server.js</span>
  <span class="hljs-string">|__ utils.js</span>
  <span class="hljs-string">|__ views</span>
</code></pre>
<p>目录当中的<code>nuxt.js</code>文件，就是我们要实例化的<code>Nuxt()</code>类的所在，让我们来看看它都包含一些什么内容，以及各自都有些什么作用：</p>
<p><span class="img-wrap"><img data-src="/img/bVIc6l?w=627&amp;h=706" src="https://static.alili.tech/img/bVIc6l?w=627&amp;h=706" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>上图中每一步都可以在具体的代码中自行浏览。在用户输入指令并实例化了<code>Nuxt()</code>类以后，实例化出来的<code>nuxt</code>对象就会执行图中打了绿色对勾的几个方法：<code>build()</code>, <code>render()</code>, <code>renderRoute()</code>, <code>renderAndGetWindow()</code>以及<code>generate()</code>方法。</p>
<p>同时，<code>Nuxt()</code>类也提供了一个<code>close()</code>公有方法，用于关闭其所开启的服务器。</p>
<h1 id="articleHeader4">五、<code>build()</code>方法</h1>
<p><code>build()</code>方法对应着<code>nuxt/lib/build/index.js</code>文件，其基本构成如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVIc6B?w=630&amp;h=838" src="https://static.alili.tech/img/bVIc6B?w=630&amp;h=838" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>简单来说，<code>build()</code>方法在判断完运行条件后，会先初始化产出目录<code>.nuxt</code>，然后通过不同目录下的文件结构来生成一系列的配置，写入模板文件后输出到<code>.nuxt</code>目录。接下来，则会根据不同的开发环境来调用不同的webpack配置，运行不同的webpack构建方案。</p>
<h1 id="articleHeader5">六、<code>render.js</code>文件</h1>
<p>在<code>nuxt/lib</code>目录下找到<code>render.js</code>文件，它包含着我们即将要分析的三个方法：<code>render()</code>, <code>renderRoute()</code>, <code>renderAndGetWindow()</code>。</p>
<p><span class="img-wrap"><img data-src="/img/bVIc7k?w=1349&amp;h=598" src="https://static.alili.tech/img/bVIc7k?w=1349&amp;h=598" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>通过这张图片，我们可以知道<code>nuxt</code>对于处理“客户端渲染”与“服务端渲染”的逻辑其实是非常清晰的。</p>
<p>首先，在<code>render()</code>方法在处理完一系列的路径问题后，会调用<code>renderRoute()</code>方法，获取响应所需内容并完成响应。</p>
<p>其中<code>renderRoute()</code>方法会判断当前响应是否应执行服务端渲染。如果是，则调用<code>vue</code>提供的<code>bundleRenderer()</code>方法，把html内容渲染完毕以后再整体输出；如果不是，则直接输出一个<code>&lt;div id="__nuxt"&gt;&lt;/div&gt;</code>字符串，交由客户端渲染。</p>
<p>最后，通过<code>renderAndGetWindow()</code>来检查输出的html是否存在问题，然后发出通知，表明html可用。</p>
<h1 id="articleHeader6">七、<code>generate.js</code>文件</h1>
<p>最后我们来分析一下<code>generate.js</code>文件。我们知道<code>nuxt generate</code>指令会为<code>page</code>目录下的每一个页面文件单独生成一个html静态页面，功能非常贴心。那么<code>generate.js</code>到底是怎么工作的呢？</p>
<p><span class="img-wrap"><img data-src="/img/bVIc8t?w=594&amp;h=526" src="https://static.alili.tech/img/bVIc8t?w=594&amp;h=526" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在执行<code>nuxt generate</code>时，它会先执行前文已经分析过的<code>build()</code>方法，产出编译后的文件；然后会初始化<code>dist</code>目录，调用<code>resolveRouteParams()</code>方法，读取产出后的路由配置并整理。然后通过<code>fs.writeFile()</code>等API，把内容挨个写入文件并输出，最后再统计总的<code>generate()</code>运行时间。</p>
<h1 id="articleHeader7">八、写在最后</h1>
<p><code>Nuxt</code>是一个新诞生的项目，官网文档也尚未全部完成。从一个使用者的角度来说，这是一个非常有意思的项目，<code>VueJS</code>的作者尤大也曾褒奖过这个项目，在<a href="https://vuejs.org/v2/guide/ssr.html#Nuxt-js" rel="nofollow noreferrer" target="_blank">VueJS的官网</a>也专门为其进行推荐。</p>
<p>如此interesting的项目实在很值得深入研究，作者的代码和注释也非常清晰详细。本文受限于个人水平，在分析理解上难免有出错的地方，欢迎各位读者指正！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入NUXT，看看一条命令行的背后到底发生了什么

## 原文链接
[https://segmentfault.com/a/1190000008114613](https://segmentfault.com/a/1190000008114613)


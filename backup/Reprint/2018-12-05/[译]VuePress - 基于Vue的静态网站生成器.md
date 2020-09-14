---
title: '[译]VuePress - 基于Vue的静态网站生成器' 
date: 2018-12-05 2:30:09
hidden: true
slug: sqgul1pgw8
categories: [reprint]
---

{{< raw >}}

                    
<p>4月12日，<code>Vue.js</code>的创始人尤雨溪大大在twitter上发布了一个全新的基于<code>Vue</code>的静态网站生成器-，这对于广大<code>Vue</code>爱好者来说无疑是一个好消息噜！</p>
<h1 id="articleHeader0">Vue与SEO搜索引擎优化</h1>
<p><code>SEO (Search Engine Optimization)</code>-对于开发者来说是一项必不可少的技能，尤其是前端的同学们。比如在<code>html</code>文件头部加上网站的关键字<code>keywords</code>，以及网站描述<code>description</code>，再到正确的使用<code>html</code>标签等，这些在传统的服务端渲染页面的模式下，就妥妥的足够了。<br>但是随着前端技术的不断发展壮大，前后端分离开发模式的大行其道，越来越多的前端开始使用<code>Vue</code>等<code>MVVM</code>模型的框架进行开发，这种数据驱动，动态渲染的方式，对于搜索引擎爬虫来说是非常不友好的，往往网站的内容很难被正确收录，所以在pc端页面大部分仍然采用服务端渲染的方式。</p>
<h1 id="articleHeader1">Vue与SSR服务端渲染</h1>
<p>Vue结合SSR服务端渲染就是对seo进行优化的一种解决方案，它的原理就是利用<code>webpack</code>和<code>node.js</code>将<code>Vue</code>生成的<code>html</code>文件发送给服务器，然后再由服务器渲染出来。这样做就能渲染正确的<code>html</code>文件，达到搜索引擎的优化，但是缺点也有一些，他要求前端开发者必须了解一些<code>node</code>语法，同时也加重了服务器渲染的压力，开销较大。</p>
<hr>
<h4>以下内容来自官方文档  <a href="https://vuepress.vuejs.org/" rel="nofollow noreferrer" target="_blank">vuepress.vuejs.org</a>
</h4>
<h2 id="articleHeader2">什么是VuePress</h2>
<p><code>VuePress</code>由两部分组成：一个基于<code>Vue</code>的轻量级静态网站生成器，以及为编写技术文档而优化的默认主题。 它是为了满足Vue自己的子项目文档的需求而创建的。<br><code>VuePress</code>为每一个由它生成的页面提供预加载的<code>html</code>，不仅加载速度极佳，同时对seo非常友好。一旦页面被加载之后，<code>Vue</code>就全面接管所有的静态内容，使其变成一个完全的<code>SPA</code>应用，其他的页面也会在用户使用导航进入的时候来按需加载。</p>
<h2 id="articleHeader3">
<code>VuePress</code>是怎样运作的</h2>
<p>一个<code>VuePress</code>应用实际上就是基于<code>Vue</code>、<code>VueRouter</code>以及<code>webpack</code>,如果你以前就用过<code>vue</code>,那么当你在用<code>VuePress</code>开发或者定制自己的主题的时候，你会发现使用体验几乎是一毛一样~你甚至可以用<code>Vue DevTools</code>来<code>debug</code>你的定制主题！<br>在<code>build</code>的过程中，<code>VuePress</code>会通过创建一个服务端渲染的版本，并访问每一个路由来渲染相关的<code>html</code>。这种方法是来自<code>Nuxt</code>的<code>nuxt generate</code>命令,和其他项目如<code>Gatsby</code>的启发。<br>每个<code>markdown</code>文件都被编译为<code>HTML</code>，然后作为<code>Vue</code>组件的模板进行处理。这样你可以在<code>markdown</code>文件中直接使用<code>Vue</code>，这在需要嵌入动态内容的时候非常有用。</p>
<h2 id="articleHeader4">
<code>VuePress</code>特性</h2>
<ul>
<li>内置的<code>markdown</code>扩展专为技术文档优化</li>
<li>可以在<code>markdown</code>文件中直接使用<code>vue</code>
</li>
<li>
<code>vue</code>驱动的可定制画主题</li>
<li>支持<code>PWA</code> - Progressive Web App（渐进式网页应用程序）</li>
<li>集成<code>Google Analytics</code>
</li>
<li>
<p>一个默认的<code>VuePress</code>包括：</p>
<ol>
<li>响应式布局</li>
<li>可选的主页</li>
<li>一个简单的头部搜索组件</li>
<li>可定制的导航栏和侧边栏</li>
<li>自动生成的<code>GitHub</code>链接和页面编辑链接</li>
</ol>
</li>
</ul>
<h2 id="articleHeader5">开始使用<code>VuePress</code>
</h2>
<h3 id="articleHeader6">全局使用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install globally
npm install -g vuepress

# create a markdown file
echo &quot;# Hello VuePress!&quot; > README.md

# start writing
vuepress dev .

# build
vuepress build ." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># install globally</span>
npm install -g vuepress

<span class="hljs-meta"># create a markdown file</span>
echo <span class="hljs-string">"# Hello VuePress!"</span> &gt; README.md

<span class="hljs-meta"># start writing</span>
vuepress dev .

<span class="hljs-meta"># build</span>
vuepress build .</code></pre>
<h3 id="articleHeader7">在现有项目中安装</h3>
<p>如果你已经有一个项目，可以将<code>VuePress</code>作为本地依赖进行安装，这种方式同样支持使用CI或Netlify等服务在推送时自动部署。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install as a local dependency
npm install -D vuepress

# create a docs directory
mkdir docs
# create a markdown file
echo &quot;# Hello VuePress!&quot; > docs/README.md

# start writing
npx vuepress dev docs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-comment"># install as a local dependency</span>
npm install -D vuepress

<span class="hljs-comment"># create a docs directory</span>
mkdir docs
<span class="hljs-comment"># create a markdown file</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">"# Hello VuePress!"</span> &gt; docs/README.md

<span class="hljs-comment"># start writing</span>
npx vuepress dev docs</code></pre>
<p>也可以直接在<code>package.json</code>中加入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;docs:dev&quot;: &quot;vuepress dev docs&quot;,
    &quot;docs:build&quot;: &quot;vuepress build docs&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"docs:dev"</span>: <span class="hljs-string">"vuepress dev docs"</span>,
    <span class="hljs-attr">"docs:build"</span>: <span class="hljs-string">"vuepress build docs"</span>
  }
}</code></pre>
<p>然后执行下面的命令行来运行项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run docs:dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> docs:dev</span></code></pre>
<p>默认情况下，构建的文件将位于<code>.vuepress / dist</code>中，也可以通过<code>.vuepress / config.js</code>中的dest字段进行配置。构建的文件可以部署到任何静态文件服务器。</p>
<hr>
<p>咳咳，今天的翻译先进行到这里，要睡觉了！明天来一发试试~night~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]VuePress - 基于Vue的静态网站生成器

## 原文链接
[https://segmentfault.com/a/1190000014388622](https://segmentfault.com/a/1190000014388622)


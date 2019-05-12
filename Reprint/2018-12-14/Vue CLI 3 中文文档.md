---
title: 'Vue CLI 3 中文文档' 
date: 2018-12-14 2:30:10
hidden: true
slug: o6768e6qej
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">翻译文档</h2>
<p><a href="https://github.com/toBeTheLight/vue-cli-3.x-doc-cn/blob/dev/README.md" rel="nofollow noreferrer" target="_blank"><strong>文档翻译全貌</strong></a></p>
<h2 id="articleHeader1">前言</h2>
<p>之前写了一篇<a href="https://segmentfault.com/a/1190000013090943">Vue CLI 3.x 版本的简单体验</a>，当时文档还不全，具体的使用方法并不是很清楚，大概是2月7号，收到<code>Vue CLI 3</code>接近Beta版的提示，作者尤雨溪也讲下周会出文档，没想到昨天已经出来了。本着对新功能的好奇心，花了一晚上浏览并翻译了一下文档。</p>
<p>如今最大的变化在配置方面，变成了一种独立配置文件的形式。同时集成了很多功能，整个Vue CLI更像一个系统，功能的扩展使用插件的形式向系统中自定义注入。</p>
<p>同时，新的文档将开发中的注意事项也列出来了很多，阅读一下以有助于理解前端的开发流程，对之前使用<code>Vue CLI 2</code>的项目也有一定的帮助。</p>
<p>在这里只展示<strong>构建目标</strong>部分，也算是对上篇文章的一个重要补充，了解详情全貌请查看翻译文档。</p>
<h2 id="articleHeader2">构建目标</h2>
<p><em>目前使用CLI可将代码构建为以下几种形式</em></p>
<h3 id="articleHeader3">应用</h3>
<p><em>App</em></p>
<p>应用模式是默认的模式，这种模式下：</p>
<ul>
<li>资源和资源提示会被插入到<code>index.html</code>文件</li>
<li>vendor库们被打包进一个独立的块（chunk）来更好的缓存</li>
<li>10kb大小以下的静态资源被内联进JavaScript</li>
<li>
<code>public</code>文件中的静态资源被复制到构建输出目录</li>
</ul>
<h3 id="articleHeader4">库</h3>
<p><em>Library</em></p>
<p>你可以使用一个独立的入口文件来构建库</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue-cli-service build --target lib --name myLib [entry]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code style="word-break: break-word; white-space: initial;">vue-cli-service build --target <span class="hljs-class"><span class="hljs-keyword">lib</span> --<span class="hljs-title">name</span> <span class="hljs-title">myLib</span> [<span class="hljs-title">entry</span>]</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="File                     Size                     Gzipped

dist/myLib.umd.min.js    13.28 kb                 8.42 kb
dist/myLib.umd.js        20.95 kb                 10.22 kb
dist/myLib.common.js     20.57 kb                 10.09 kb
dist/myLib.css           0.33 kb                  0.23 kb" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>File                     Size                     Gzipped

dist/myLib<span class="hljs-selector-class">.umd</span><span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.js</span>    <span class="hljs-number">13.28</span> kb                 <span class="hljs-number">8.42</span> kb
dist/myLib<span class="hljs-selector-class">.umd</span><span class="hljs-selector-class">.js</span>        <span class="hljs-number">20.95</span> kb                 <span class="hljs-number">10.22</span> kb
dist/myLib<span class="hljs-selector-class">.common</span><span class="hljs-selector-class">.js</span>     <span class="hljs-number">20.57</span> kb                 <span class="hljs-number">10.09</span> kb
dist/myLib<span class="hljs-selector-class">.css</span>           <span class="hljs-number">0.33</span> kb                  <span class="hljs-number">0.23</span> kb</code></pre>
<p>入口文件可以是<code>.js</code>或<code>.vue</code>文件。如果没有指定入口文件，将会使用<code>src/App.vue</code>。</p>
<p>lib构建输出：</p>
<ul>
<li>
<code>dist/myLib.common.js</code>： 通过打包器使用的CommonJS包（不幸的是，webpack还不支持包的ES模块化标准输出）</li>
<li>
<code>dist/myLib.umd.js</code>: 一个UMD格式的包，可直接在浏览器使用或通过AMD加载器加载</li>
<li>
<code>dist/myLib.umd.min.js</code>: UMD格式构建的压缩版本</li>
<li>
<code>dist/myLib.css</code>: 提取出来的CSS样式文件（可通过在<code>vue.config.js</code>中设置<code>css: { extract: false }</code>强制内联）</li>
</ul>
<p><strong>在库模式下，Vue是被外部化设置的</strong>这意味即使你导入了Vue，包也不会打包Vue。如果通过打包器使用此库，它将试图通过依赖关系加载Vue；否则会降级使用全局变量<code>Vue</code>。</p>
<h3 id="articleHeader5">Web组件</h3>
<p><em>HTML Web Component</em></p>
<blockquote><a href="https://github.com/vuejs/vue-web-component-wrapper#compatibility" rel="nofollow noreferrer" target="_blank">兼容性</a></blockquote>
<p>你可以使用一个独立的入口文件来构建库</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue-cli-service build --target wc --name my-element [entry]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code style="word-break: break-word; white-space: initial;">vue-cli-service build --<span class="hljs-keyword">target</span> wc --<span class="hljs-keyword">name</span> my-element [<span class="hljs-built_in">entry</span>]</code></pre>
<p>这将生成一个JavaScript文件（和他的压缩版本），其中包含所有内容。当script文件在页面中使用时，会使用<code>@vue/web-component-wrapper</code>注册包含目标Vue组件的<code>&lt;my-element&gt;</code>自定义元素。wrapper会自动代理prop属性，attr属性，事件和slots插槽。查看更多详情参阅<a href="https://github.com/vuejs/vue-web-component-wrapper" rel="nofollow noreferrer" target="_blank"><code>@vue/web-component-wrapper</code>的文档</a>。</p>
<p><strong>注意，此包依赖与Vue页面全局可用</strong></p>
<p>该模式允许组件的使用者将Vue作为普通的DOM元素使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/vue&quot;></script>
<script src=&quot;path/to/my-element.js&quot;></script>

<!-- 在纯html或任何其他framework中使用 -->
<my-element></my-element>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"path/to/my-element.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 在纯html或任何其他framework中使用 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">my-element</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-element</span>&gt;</span></code></pre>
<h4>捆绑打包多个web组件</h4>
<p>当构建web组件包时，你还可以使用匹配模式指定多个组件作为打包入口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue-cli-service build --target wc --name foo 'src/components/*.vue'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">vue-cli-</span><span class="hljs-string">service </span><span class="hljs-string">build </span><span class="hljs-built_in">--target</span> <span class="hljs-string">wc </span><span class="hljs-built_in">--name</span> <span class="hljs-string">foo </span><span class="hljs-string">'src/components/*.vue'</span></code></pre>
<p>在构建多个web组件时，<code>--name</code>会被作为前缀使用，并且自定义元素名会从组件文件名中被推断出来。比如，使用<code>--name foo</code>且组件名为<code>HelloWorld.vue</code>的话，生成的自定义元素将会被注册为<code>&lt;foo-hello-world&gt;</code>。</p>
<h3 id="articleHeader6">异步Web组件</h3>
<blockquote><a href="https://github.com/vuejs/vue-web-component-wrapper#compatibility" rel="nofollow noreferrer" target="_blank">兼容性</a></blockquote>
<p>当指定捆绑打包多个web组件时，这个包会变得相当大，而且用户可能只用包里的部分组件。异步web组件模式下会生成一个代码拆分包，其中包含一个用于在所有组件间提供共享运行时的小的入口文件并且会提前注册所有的自定义元素。然后只有在页面上使用相应的自定义元素的实例时，才会按需获取组件的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue-cli-service build --target wc-async --name foo 'src/components/*.vue'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">vue-cli-</span><span class="hljs-string">service </span><span class="hljs-string">build </span><span class="hljs-built_in">--target</span> <span class="hljs-string">wc-async </span><span class="hljs-built_in">--name</span> <span class="hljs-string">foo </span><span class="hljs-string">'src/components/*.vue'</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="File                Size                        Gzipped

dist/foo.0.min.js    12.80 kb                    8.09 kb
dist/foo.min.js      7.45 kb                     3.17 kb
dist/foo.1.min.js    2.91 kb                     1.02 kb
dist/foo.js          22.51 kb                    6.67 kb
dist/foo.0.js        17.27 kb                    8.83 kb
dist/foo.1.js        5.24 kb                     1.64 kb" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>File                Size                        Gzipped

dist/foo<span class="hljs-number">.0</span>.min.js    <span class="hljs-number">12.80</span> kb                    <span class="hljs-number">8.09</span> kb
dist/foo.min.js      <span class="hljs-number">7.45</span> kb                     <span class="hljs-number">3.17</span> kb
dist/foo<span class="hljs-number">.1</span>.min.js    <span class="hljs-number">2.91</span> kb                     <span class="hljs-number">1.02</span> kb
dist/foo.js          <span class="hljs-number">22.51</span> kb                    <span class="hljs-number">6.67</span> kb
dist/foo<span class="hljs-number">.0</span>.js        <span class="hljs-number">17.27</span> kb                    <span class="hljs-number">8.83</span> kb
dist/foo<span class="hljs-number">.1</span>.js        <span class="hljs-number">5.24</span> kb                     <span class="hljs-number">1.64</span> kb</code></pre>
<p>然后用户只需要在页面中加载Vue和入口文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/vue&quot;></script>
<script src=&quot;path/to/foo.min.js&quot;></script>

<!-- foo-one的代码块会在它被使用时自动加载 -->
<foo-one></foo-one>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"path/to/foo.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- foo-one的代码块会在它被使用时自动加载 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">foo-one</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">foo-one</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue CLI 3 中文文档

## 原文链接
[https://segmentfault.com/a/1190000013249668](https://segmentfault.com/a/1190000013249668)


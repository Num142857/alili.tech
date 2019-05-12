---
title: 'Element 一套优雅的 Vue 2 组件库是如何开发的' 
date: 2019-02-02 2:30:11
hidden: true
slug: awfhylei7vr
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVDD9H?w=2502&amp;h=1222" src="https://static.alili.tech/img/bVDD9H?w=2502&amp;h=1222" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>今年的 JSConf 大会上，受到 <a href="https://github.com/gridcontrol/gridcontrol" rel="nofollow noreferrer" target="_blank">gridcontrol</a> 作者现场开源项目的感染，我们也在现场宣布开源这套基于 Vue 2 开发的组件库 —— Element。上场前五分钟才建的空仓库，到晚上我们真正推代码上去已经收（pian）到了 100 多 star，而且仅仅三天时间就获得了 1k star。这个项目其实早在 Vue 2 进入 beta 时就开始开发了，一直到八月底才接近尾声。初期也遇到一些棘手的问题，很庆幸都找到了解决方案。在这里整理一些解决方案分享给大家。</p>
<h2 id="articleHeader0">如何管理多个独立的组件项目 -- <a href="https://github.com/lerna/lerna" rel="nofollow noreferrer" target="_blank">lerna</a>
</h2>
<p>最初制定的目标是有一个主项目管理所有的组件弄成一个包，然后每一个组件都是单独一个包。这样用户可以安装所有组件也可以只安装自己需要的组件。于是我们最直接的做法就是一个组件建一个项目，到后面组件越来越多管理起来也越加复杂，每一次升级主仓库就要更新一堆依赖组件的版本号。而且开发起来也不方便。</p>
<p>后来看到 <a href="https://github.com/babel/babel" rel="nofollow noreferrer" target="_blank">babel</a> 的仓库的目录结构很是奇特。一个 packages 文件夹下有所有的 babel 官方插件，直到发现他们用了一个叫 <a href="https://github.com/lerna/lerna" rel="nofollow noreferrer" target="_blank">lerna</a> 的工具。可以让你在主项目下管理多个子项目，从而解决了多个包互相依赖，且发布时需要手动维护多个包的问题。</p>
<p>所以我们重构了目录结构，所有插件单独一个项目放在 packages 目录下，可单独打包发布；同时最外面的 src 目录下的入口文件引入所有组件，打包发布的主项目就是包含了所有的组件。从而就解决了多个子项目管理的问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="element/
  package.json
  packages/
    component-a/
      package.json
    component-b/
      package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code>element/
  <span class="hljs-keyword">package</span>.json
  packages/
    <span class="hljs-keyword">component</span>-a/
      <span class="hljs-keyword">package</span>.json
    <span class="hljs-keyword">component</span>-b/
      <span class="hljs-keyword">package</span>.json</code></pre>
<h2 id="articleHeader1">如何解决定制多套主题的问题</h2>
<p>组件库一般都会自带一套主题，也可能会有多套主题可供选择，当然也要满足用户自定义的需求。所以 Vue 推荐的定义 scope 的样式就不可行了，同时也不能把样式写在组件里。那么如何写样式同时单独发布的组件如何引用样式文件也是我们要解决的问题。</p>
<p>为了方便用户覆盖样式，我们采用 BEM 风格来写 CSS，这样的好处是类名基本都是一级，少数才会有嵌套情况，这样很容易的就可以直接覆盖掉原有样式。我们使用了自家开发的 <a href="https://github.com/ElemeFE/postcss-salad" rel="nofollow noreferrer" target="_blank">postcss-salad</a> PostCSS 插件来写样式。集成了多个实用的 PostCSS 插件同时也支持 BEM 风格。</p>
<p>并且样式文件目录也作为单独一个子项目发布，这样引入整个包可以包含样式文件，单独安装的组件可以通过安装主题包的方式引入样式文件。</p>
<p>这么做的好处是方便以后扩展其他主题，或者开发者可以自己定义一套其他 CSS 预处理的版本例如 Less 或 Scss。</p>
<h2 id="articleHeader2">文档是如何工作的 -- <a href="https://github.com/QingWei-Li/vue-markdown-loader" rel="nofollow noreferrer" target="_blank">vue-markdown-loader</a>
</h2>
<p>当初写 <a href="https://github.com/ElemeFE/mint-ui" rel="nofollow noreferrer" target="_blank">Mint UI</a> 时就遇到了要用 Vue 写文档的问题：如何才能在写 Markdown 时也能写 Vue 组件的 Demo。虽然后来并没有在 Mint UI 的文档里写 Demo。最开始在 Element 的内部版本里，找遍了各种 Vue 的 Markdown 相关插件，要么是在 template 里定义 Markdown 格式，要么就是有一个 Markdown 的组件。都不能做到纯粹的写 Markdown 文件，并且还能写 Demo。</p>
<p>后来想到或许可以尝试把 Markdown 文件转成 Vue 组件。毕竟可以在 Markdown 里写 HTML，那么完全可以作为 Vue 的模板。后来就有了 vue-markdown-loader，一个把 Markdown 转成 Vue 组件的 webpack loader，搭配 vue-router 就能搭建一个可以在 Markdown 里写 Vue 代码的文档网站。</p>
<h2 id="articleHeader3">如何同时打包多个组件 -- <a href="https://github.com/ElemeFE/cooking" rel="nofollow noreferrer" target="_blank">cooking</a>
</h2>
<p>由于前面的设定，最终需要每个组件都单独打包一份并发布。同时每一个组件下面都会有一个对应的配置文件，传统的用 webpack 打包虽然支持传入数组，但是并不能传入多个文件。但是我们有 cooking，一个基于 webpack 但是配置更简单同时使用上也更容易的工具。打包时只需要同时传入多个配置文件，利用 webpack 接受数组配置项的特性，就能同时进行打包。</p>
<p>有了这些工具，让 Element 的开发工作变得更容易且更高效。现在 Element 已经正式开源，并且我们已经放出了文档，同时还放出了设计资源，欢迎各位 Vue 开发者来尝试，也欢迎来做贡献。</p>
<hr>
<p>相关项目链接:</p>
<ul>
<li><p><a href="https://github.com/ElemeFE/element" rel="nofollow noreferrer" target="_blank">https://github.com/ElemeFE/element</a></p></li>
<li><p><a href="https://github.com/lerna/lerna" rel="nofollow noreferrer" target="_blank">https://github.com/lerna/lerna</a></p></li>
<li><p><a href="https://github.com/ElemeFE/postcss-salad" rel="nofollow noreferrer" target="_blank">https://github.com/ElemeFE/postcss-salad</a></p></li>
<li><p><a href="https://github.com/ElemeFE/mint-ui" rel="nofollow noreferrer" target="_blank">https://github.com/ElemeFE/mint-ui</a></p></li>
<li><p><a href="https://github.com/QingWei-Li/vue-markdown-loader" rel="nofollow noreferrer" target="_blank">https://github.com/QingWei-Li/vue-markdown-loader</a></p></li>
<li><p><a href="https://github.com/ElemeFE/cooking" rel="nofollow noreferrer" target="_blank">https://github.com/ElemeFE/cooking</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Element 一套优雅的 Vue 2 组件库是如何开发的

## 原文链接
[https://segmentfault.com/a/1190000007026819](https://segmentfault.com/a/1190000007026819)


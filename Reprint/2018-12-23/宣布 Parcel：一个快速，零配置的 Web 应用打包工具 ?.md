---
title: '宣布 Parcel：一个快速，零配置的 Web 应用打包工具 ?' 
date: 2018-12-23 2:30:07
hidden: true
slug: u25mcb3w7ga
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">? 宣布 Parcel：一个快速，零配置的 Web 应用打包工具 ?</h2>
<blockquote>
<p>原文：<a href="https://hackernoon.com/announcing-parcel-a-blazing-fast-zero-configuration-web-application-bundler-feac43aac0f1" rel="nofollow noreferrer" target="_blank">? Announcing Parcel: A blazing fast, zero configuration web application bundler ?</a></p>
<p>译者：<a href="https://github.com/neal1991" rel="nofollow noreferrer" target="_blank">neal1991</a></p>
<p>welcome to star my <a href="https://github.com/neal1991" rel="nofollow noreferrer" target="_blank">articles-translator </a>, providing you advanced articles translation. Any suggestion, please issue or contact <a href="mailto:bing@stu.ecnu.edu.cn">me</a></p>
<p>LICENSE: <a href="https://opensource.org/licenses/MIT" rel="nofollow noreferrer" target="_blank">MIT</a></p>
</blockquote>
<p>今天，我非常高兴地宣布 Parcel，一个快速，零配置的 Web 应用程序打包工具，我对于该工具的工作已经持续了几个月。 去 <a href="https://github.com/parcel-bundler/parcel" rel="nofollow noreferrer" target="_blank">Github</a>上看看吧！</p>
<p><span class="img-wrap"><img data-src="/img/bVZUj3?w=2997&amp;h=857" src="https://static.alili.tech/img/bVZUj3?w=2997&amp;h=857" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>为了解决我在 Browserify 和 Webpack 等现有模块打包工具中遇到的两个主要问题：<strong>性能</strong>和<strong>配置经验</strong>，我开始研究 Parcel。</p>
<h3 id="articleHeader1">特性</h3>
<ul>
<li>? <strong>非常快</strong>的打包时间 - 多核编译，以及文件系统缓存，这样即使在重新启动后也能快速重建。</li>
<li>?对于 JS, CSS, HTML, 图片以及文件资源以及其它支持<a href="https://parceljs.org/assets.html" rel="nofollow noreferrer" target="_blank">开箱即用</a>，<strong>不需要安装插件</strong>。</li>
<li>?在需要时使用 Babel，PostCSS 和 PostHTML <strong>自动</strong><a href="https://parceljs.org/transforms.html" rel="nofollow noreferrer" target="_blank"><strong>转换</strong></a><strong>模块</strong> - 甚至是node_modules。</li>
<li>✂️ <strong>零配置</strong><a href="https://parceljs.org/code_splitting.html" rel="nofollow noreferrer" target="_blank">代码分割</a>使用动态import() 语句。</li>
<li>?内置支持<a href="https://parceljs.org/hmr.htm" rel="nofollow noreferrer" target="_blank">热加载</a>
</li>
<li>? 友好的错误日志体验 - 语法高亮显示的代码帧有助于查明问题。</li>
</ul>
<h3 id="articleHeader2">性能</h3>
<p>我被激发建立一个新的打包工具的第一个原因是性能。 我已经在数千个模块上做了一些相当大的应用程序，并且总是对现有打包工具的速度感到失望。 大型应用程序可能需要几分钟才能完成，这在开发过程中尤其令人沮丧</p>
<p>许多打包工具专注于快速增量重新构建性能，这是很好的。 但是，最初的构建性能对于开发和生产/ CI 构建也非常重要。</p>
<p>Parcel 通过使用工作进程<strong>并行编译代码</strong>，利用现代多核处理器解决了这个问题。 这导致了初始构建的巨大加速。 它还有一个文件系统缓存，可以保存每个文件的编译结果，以便更快的后续启动。</p>
<p><span class="img-wrap"><img data-src="/img/bVZUjU?w=405&amp;h=302" src="https://static.alili.tech/img/bVZUjU?w=405&amp;h=302" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">零配置体验</h3>
<p>我建立Parcel的第二个原因是帮助解决管理配置的痛苦。大多数其它打包工具都是围绕着配置文件以及大量的插件建立起来的，为了使事情顺利进行，看到 500 行以上的应用程序配置并不罕见。</p>
<p>这种配置不仅繁琐耗时，而且很难正确使用，并且必须针对每个应用程序进行复制。通常情况下，这可能导致次优化的应用程序转到到生产。</p>
<p>Parcel 被设计为<strong>零配置</strong>：只需将它指向你的应用程序的入口点，它就能正确工作。 Parcel 支持 JS，CSS，HTML，图片，文件资源等等 - 不需要任何插件。</p>
<p>Parcel 的零配置体验也涉及到文件格式。当 Parcel 检测到 .babelrc，.postcssrc 等时，也会自动应用像 Babel，PostCSS 和 PostHTML 这样的<strong>转换</strong>。这甚至适用于仅用于该模块的 node_modules 中的第三方代码，因此应用程序作者不需要知道如何构建他们导入的每个模块，并且构建不会减慢不必要地在每个文件上运行 Babel。</p>
<p>最后，还支持代码分割和热模块重新加载等高级打包功能。在生产模式下，Parcel 自动启用缩小，未来还会进行其他优化，如 tree-shaking。</p>
<h3 id="articleHeader4">未来架构</h3>
<p>启动一个新项目的一个好处是，我能够为 Parcel 设计一个更加现代化的架构，这个架构更加可扩展，更灵活，同时无需用户配置，并支持<strong>代码拆分</strong>和<strong>热加载</strong>等高级功能。</p>
<p>大多数打包工具主要关注 JavaScript，并支持其他格式。例如，默认情况下，其他文件类型通常会内嵌到JavaScript 文件中，并使用额外的插件和 hack 将其再次提取到单独的文件中。</p>
<p>在 Parcel 中，任何类型的文件都可以成为一等公民。添加代表输入文件的新资源类型和将类似类型的资源组合到输出文件中的打包工具很容易。</p>
<p>例如，分析和生成 CSS 代码的 CSS 资源类型和将 CSS 资源组合成最终打包的 CSS Packager。 JS，HTML 等存在类似的类型。这样，Parcel 完全是<strong>文件类型无关</strong>的。</p>
<p>你可以阅读更多关于<a href="https://parceljs.org/how_it_works.html" rel="nofollow noreferrer" target="_blank">Parcel 如何在网站上工作</a>的信息。</p>
<h3 id="articleHeader5">试试把</h3>
<p>Parcel  刚刚开始，但许多应用程序已经开箱即用并且零配置！ 所以试试看吧 - 删除你的webpack/browserify配置，卸载这些插件，然后尝试Parcel。?</p>
<p>欢迎向我反馈！ 你可以在Twitter上找到我<a href="https://twitter.com/devongovett" rel="nofollow noreferrer" target="_blank">@devongovett</a>。</p>
<ul>
<li><a href="https://parceljs.org" rel="nofollow noreferrer" target="_blank">网站和文档</a></li>
<li><a href="https://github.com/parcel-bundler/parcel" rel="nofollow noreferrer" target="_blank">Github</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
宣布 Parcel：一个快速，零配置的 Web 应用打包工具 ?

## 原文链接
[https://segmentfault.com/a/1190000012332187](https://segmentfault.com/a/1190000012332187)


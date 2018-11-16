---
title: 10个为您的下一个Web应用程序使用Nuxt.js的理由
hidden: true
categories: [reprint]
slug: 544102cc
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>如果你是一个Vue开发者，可能你听说过Nuxt.js。但是你可能不太知道关于它的所有炒作。你可能会问，为什么我要在一个框架里面再用一个框架，Vue已经让开发JavaScript应用变得很容易了，Nuxt.js背后的想法是什么？</p>
<p>这篇文章，我们将讲述为什么要在你的下一个项目中使用Nuxt的10个原因。</p>
<p><img src="https://p0.ssl.qhimg.com/t01eb33e2c584463bc2.png" alt=""></p>
<h3>Nuxt.js 是什么?</h3>
<p>Nuxt.js是一个更高级的框架，它构建在Vue之上。 它简化了通用或单页Vue应用程序的开发。</p>
<p>Nuxt.js抽象出服务器和客户端代码分发的细节，以便您可以专注于应用程序开发。 Nuxt的目标是让它足够灵活，可以作为主要的项目基础使用。 由于大部分Nuxt在开发阶段都会发生，因此只需要少量的额外千字节被添加到JavaScript文件中，您就可以获得很多功能。</p>
<p>让我们来探索一下为什么你需要考虑在你的下个Vue项目中要使用Nuxt的原因。</p>
<h3>1. 轻松创建通用应用程序</h3>
<p>Nuxt.js的一个最大的卖点就是创建通用应用程序从未如此简单</p>
<h4>什么是一个通用应用程序?</h4>
<p>一个通用应用程序用于描述可在客户端和服务器端执行的JavaScript代码。很多现代的JavaScript框架，比如说Vue，旨在创建单页面应用(SPAs)，在传统网站上使用SPA有很多好处，比如说，您可以构建快速更新且运行快速的用户界面。 但是，SPA还具有诸如加载时间长的缺点，并且谷歌正在与他们斗争，因为页面上最初没有内容用于搜索引擎优化目的。 所有的内容都是在事后用JavaScript生成的。</p>
<p>一个通用的应用程序是关于有一个SPA，但不是有一个空白的index.html页面，而是在Web服务器上预加载应用程序，并发送渲染的HTML页面作为对每条路线的浏览器请求的响应，以加快加载 并通过使Google更容易抓取网页来改进SEO。</p>
<h4>Nuxt.js让你写一个通用应用程序更加简单</h4>
<p>构建通用应用程序可能很乏味，因为您必须在服务器端和客户端都进行大量配置。</p>
<p>这是Nuxt.js旨在解决Vue应用程序的问题。 Nuxt.js使得在客户端和服务器之间共享代码变得简单，因此您可以专注于应用程序的逻辑。</p>
<p>Nuxt.js允许您访问组件上的isServer和isClient等属性（<a href="https://nuxtjs.org/api/context/)，">https://nuxtjs.org/api/context/)，</a> 以便您可以轻松决定是在客户端还是在服务器上呈现某些内容。 还有一些特殊的组件，如no-ssr组件(<a href="https://nuxtjs.org/api/components-no-ssr/)，">https://nuxtjs.org/api/components-no-ssr/)，</a> 用于故意阻止组件在服务器端呈现。</p>
<p>最后，Nuxt使您可以访问组件内部的[asyncData方法]（<a href="https://nuxtjs.org/api/），">https://nuxtjs.org/api/），</a> 您可以使用它来获取数据并在服务器端渲染数据。</p>
<p>这是Nuxt如何帮助您创建通用应用程序的冰山一角。 [点击此处]（<a href="https://nuxtjs.org/guide）">https://nuxtjs.org/guide）</a> 了解更多关于Nuxt提供的渲染Universal应用程序的信息。</p>
<h3>2. 静态渲染您的Vue应用程序，并获得通用应用程序的所有优势，而无需服务器</h3>
<p>Nuxt最大的创新在于它的nuxt generate命令。 该命令会生成一个完全静态的网站版本。 它会为您的每条路由生成HTML，并将其放入其自己的文件中。
例如，如果您有以下<strong>页面</strong>（Nuxt的路由术语）：</p>
<pre><code class="hljs coq">-| <span class="hljs-type">pages</span>/----| <span class="hljs-type">about</span>.vue----| <span class="hljs-type">index</span>.vue
</code></pre><p>Nuxt将会为你生成一下文件结构：</p>
<pre><code class="hljs coq">-| <span class="hljs-type">dist</span>/----| <span class="hljs-type">about</span>/------| <span class="hljs-type">index</span>.html----| <span class="hljs-type">index</span>.html
</code></pre><p>这样做的好处与通用应用程序的优点非常相似。 有标记可以使网页更快加载，并帮助搜索引擎和社交媒体抓取工具抓取网站。</p>
<p>不同之处在于你不再需要服务器。 一切都在开发阶段产生。</p>
<p>它功能强大，因为您可以在不需要服务器的情况下获得通用渲染的好处。 您可以将您的应用程序托管在GitHub Pages或Amazon S3上。</p>
<p>了解关于更多 <a href="https://nuxtjs.org/guide">静态生成 (预渲染)</a> 部分在Nuxt.js文档</p>
<h3>3. 获取自动代码分割（预渲染页面）</h3>
<p>Nuxt.js能够使用特殊的Webpack配置生成您的网站的静态版本。</p>
<p>对于静态生成的每个路由（页面），路由也会获取自己的JavaScript文件，只需运行该路由所需的代码即可。</p>
<p>这对速度确实有帮助，因为它可以保持JavaScript文件的大小相对于整个应用程序的大小。</p>
<h3>4. 通过命令行使用入门模板进行设置</h3>
<p>Nuxt.js提供了一个名为starter-template的入门模板，它为您提供所需的所有脚手架，以便您可以开始使用具有良好文件夹结构的项目。</p>
<p>确保你已经安装了vue-cli，然后运行如下命令：</p>
<p>$ vue init nuxt-community/starter-template &lt;project-name&gt;</p>
<p>从那里只需cd进入应用程序并运行npm install，这应该很容易。</p>
<p><a href="https://nuxtjs.org/guide/installation">点击这儿</a>了解更多关于使用命令行设置项目的信息。</p>
<h3>6. 获得优秀的默认项目结构</h3>
<p>在许多小Vue应用程序中，您最终会像在多个文件中那样管理代码的结构。 默认的Nuxt.js应用程序结构为您以可理解的方式组织应用程序提供了一个很好的起点。</p>
<p><img src="https://p0.ssl.qhimg.com/t0126857f0a26b8786d.png" alt=""></p>
<p>以下是您设置的几个主要目录：</p>
<ul>
<li>组件 — 一个组织你单独的Vue组件文件夹。</li>
<li>布局 — 包含主要应用程序布局的文件夹.</li>
<li>页面 —一个文件夹来包含您的应用程序的路由。 Nuxt.js读取此目录中的所有.vue文件并创建应用程序路由器。</li>
<li>存储 - 一个包含所有应用程序的Vuex存储文件的文件夹。</li>
</ul>
<p><a href="https://nuxtjs.org/guide/directory-structure">点击这儿</a> 以了解更多关于Nuxt.js为您提供的所有文件夹结构。</p>
<h3>5. 轻松设置您的路由之间的转换</h3>
<p>Vue有一个包装器&lt;transition&gt;元素，可以很容易地处理元素或组件的JavaScript动画，CSS动画和CSS转换。</p>
<p>如果您需要对Vue的&lt;transition&gt;元素和总体转换进行复习，我们会写一篇关于它们的文章 <a href="https://medium.com/vue-mastery/how-to-create-vue-js-transitions-6487dffd0baa">点击这儿</a>.</p>
<p>Nuxt.js以这样的方式设置路由，即每个页面都包装在&lt;transition&gt;元素中，这样您就可以简单地在页面之间创建切换。</p>
<p><a href="https://nuxtjs.org/examples/routes-transitions/">点击这儿</a> 查看Nuxt.js如何帮助您进行页面转换的示例。</p>
<h3>7. 轻松编写单个文件组件</h3>
<p>在许多小型的Vue项目中，组件是使用Vue.component定义的，然后是新的Vue({ el: ‘#container’ })来定位每个页面主体中的容器元素。</p>
<p>这适用于JavaScript仅用于增强某些视图的小型项目。 但是在更大的项目中，它可能变得难以管理。</p>
<p>所有这些问题都可以通过带有.vue扩展名的<strong>单文件组件</strong>来解决。 为了使用它们，你必须使用Webpack和Babel等工具来建立一个构建过程。</p>
<p>这里是一个单文件.vue组件的例子</p>
<p><img src="https://p0.ssl.qhimg.com/t014e678f63d5858d98.png" alt=""></p>
<p>Nuxt.js是为Webpack预先配置的，因此您可以开始使用.vue文件，而无需亲自设置复杂的构建过程。</p>
<p>要了解有关单个文件组件的更多信息，请访问Vue文档<a href="https://vuejs.org/v2/guide/single-file-components.html">点击这儿</a>.</p>
<h3>8. 无需额外工作即可获得ES6 / ES7编译</h3>
<p>除Webpack之外，Nuxt.js还预装了Babel。 Babel处理将最新的JavaScript版本（如ES6和ES7）编译为可在旧版浏览器上运行的JavaScript。</p>
<p>Nuxt.js为您设置了Babel，因此所有.vue文件和您在&lt;script&gt;标记内编写的所有ES6代码都可以编译成适用于所有浏览器的JavaScript。</p>
<p><a href="https://babeljs.io/">点击这儿</a> 了解更多有关Babel</p>
<p><img src="https://cdn-images-1.medium.com/max/1600/1*IpbVaWq2fHkbVoHtSc-LDQ.png" alt=""></p>
<h3>9. 使用自动更新服务器进行设置以简化开发</h3>
<p>与自己设置此过程或我们web开发人员习惯的更改 - 刷新 - 更改 - 刷新过程相比，使用Nuxt.js进行开发非常轻松。 它为你设置了一个自动更新的开发服务器。</p>
<p>在您开发和处理这些.vue文件时，Nuxt.js使用Webpack配置来检查更改并为您编译所有内容。</p>
<p>您可以在Nuxt.js项目中运行命令npm run dev，它将设置开发服务器。</p>
<p><img src="https://cdn-images-1.medium.com/max/1600/1*0zxBhC7ArC1I1MuDOd3uZg.png" alt=""></p>
<h3>10. 访问Nuxt.js社区中的所有内容</h3>
<p>最后，有一个名为<strong> Nuxt Community </strong>的[GitHub集合]（<a href="https://github.com/nuxt-community），">https://github.com/nuxt-community），</a> 它编译了有用的库，模块，入门套件等，使它更容易创建您的应用程序。 在您自己编写代码之前，请通过此处查看您需要的内容。</p>
<p><img src="https://cdn-images-1.medium.com/max/1600/0*puQ2jCgJYY9sYTMs.png" alt=""></p>
<h3>总结</h3>
<p>所有这些功能都使Vue.js应用程序的开发更加美好。 即使您不需要通用应用程序，并希望坚持使用SPA，使用Nuxt.js仍然有好处。 它可以成为你项目的主要基础，具有诸如.vue文件，ES6编译等许多功能。</p>
<h3>更多Nuxt内容</h3>
<p>在[VueMastery.com]（<a href="https://www.vuemastery.com/）">https://www.vuemastery.com/）</a> 学习Nuxt.js。 Nuxt专注的内容即将发布。 您可以创建一个免费帐户来获得通知。</p>
<h3>继续深入阅读</h3>
<ul>
<li><a href="https://medium.com/vue-mastery/best-practices-for-nuxt-js-seo-32399c49b2e5">Best Practices for Nuxt.js SEO</a></li>
<li><a href="https://medium.com/p/ffc46cc38756/edit">VuePress vs. Nuxt.js</a></li>
<li><a href="https://medium.com/vue-mastery/how-to-create-vue-js-transitions-6487dffd0baa">How to Create Vue.js Transitions</a></li>
</ul>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/10-reasons-to-use-nuxt-js-for-your-next-web-application](https://www.zcfy.cc/article/10-reasons-to-use-nuxt-js-for-your-next-web-application)
原文标题: 10个为您的下一个Web应用程序使用Nuxt.js的理由
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

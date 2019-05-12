---
title: '🚀 Nuxt 2 即将来临! Oh yeah! – Nuxt.js – Medium' 
date: 2019-01-20 2:30:11
hidden: true
slug: 2rsjn4df0wf
categories: [reprint]
---

{{< raw >}}

            <hr>
<p>1.4.0发布25天后，Nuxt2就即将来临。超过330次提交，320次更改文件，8,200次添加和7,000次删除（不包括其他nuxt repositories）！好吧，似乎很多变化，但不用担心，我们会尽最大努力减少breaking changes的数量，更多的关注于稳定性，性能和更好的开发体验。我们对这些变化进行了总结：</p>
<h2>🏎 Webpack 4 (Legato)</h2>
<p>仅这个改进就值得一篇专门的文章。有什么新特性呢？</p>
<ul>
<li>🏎 Webpack 4, is FAST!</li>
<li>😍 Mode, #0CJS, and sensible defaults</li>
<li>✂ Goodbye CommonsChunkPlugin</li>
<li>🔬WebAssembly Support</li>
<li>🐐 Module Type’s Introduced + .mjs support</li>
</ul>
<p>想了解更多信息请看 <a href="https://medium.com/@TheLarkInn">Sean T. Larkin</a>的 <a href="https://medium.com/webpack/webpack-4-released-today-6cdb994702d4">这篇文章</a> 以及Webpack <a href="https://github.com/webpack/webpack/releases">Release Notes</a>.</p>
<p>其他改进:</p>
<ul>
<li>Default dev tool for client bundle is the webpack default <code>eval</code> which is the fastest option.</li>
<li>Module Concatenation (Scope Hoisting) optimization is enabled by default.</li>
<li>删除了实验属性<code>build.dll</code>。它不稳定，而webpack 4速度已经足够快。</li>
</ul>
<p>💡 <strong>迁移提示:</strong> 好消息是，你不需要更改项目中的任何代码。只要升级到Nuxt 2，所有东西都会立刻迁移。</p>
<h2>👋 弃掉了venders</h2>
<p>我们以前一直使用 <code>vendors</code> chunk，这次发布后，我们不再使用CommonsChunkPlugin，所以不必明确指定<code>vendors</code>。Nuxt自动添加了核心的packages(包括vue,vue-router,babel-runtime...)到<strong>Cache Group</strong>中。这使得webpack可以用最合理的方式拆分你的代码。</p>
<p>💡 <strong>迁移提示:</strong> 如果你在项目的<code>nuxt.config.js</code>中配置了<code>vendors</code>，直接去掉即可。 如果你是一个module author,你可以继续使用<code>this.addVendor()</code>，但我们可能会有弃用提示。</p>
<h2>✂️ chunk splitting的完全控制</h2>
<p>以前，Nuxt被选择用于代码分割。尽管Nuxt试图提供最有效的分割，但现在可以使用<code>build.splitChunks</code>选项完全控制它，并且可以选择禁用每个路由的异步块。</p>
<p>⚠️ <strong>BREAKING CHANGE:</strong> nuxt默认不再拆分layout chunks，它们将像nuxt core, plugins, middleware和store一样被加载进主入口。你也可以通过<code>build.splitChunks.layouts: true</code>使得layout拆分。另外为了更好的控制<strong> webpack </strong>块分割，你可以使用<code>build.optimization.splitChunks</code>选项。</p>
<p>⚠️ <strong>BREAKING CHANGE:</strong> 对于生产环境，我们不再使用文件名作为 chunk names 的一部分( <code>/_nuxt/pages/foo/bar.[hash].js</code>变成<code>[hash.js]</code>)这样容易让别人意外发现工程内部的漏洞。你也可以使用<code>build.optimization.splitChunks.name: true</code>强制开启。 (如果未指定，names仍然在 <code>dev</code>和<code>--analyze</code> 模式下启用)</p>
<p>⚠️ <strong>BREAKING CHANGE:</strong> webpack默认不会拆分runtime（manifest）chunk以减少异步请求而是将其移入main chunk。你可以使用<code>build.optimization.runtimeChunk: true</code>启用。</p>
<p>⚠️ <strong>注意:</strong> Nuxt的默认设置基于最佳实践，并在与实际项目应用之后进行了优化。建议阅读 <a href="https://medium.com/@sokra">Tobias Koppers</a>写的<a href="https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693">RIP CommonsChunkPlugin</a>并在每次更改之后使用<code>nuxt build --analyze</code>.</p>
<p>💡 <strong>迁移提示:</strong> 保持默认值。根据您的需求对您的实际项目进行基准测试并根据需要定制选项。</p>
<h2>🔥 Vue Loader 15 and mini-css-extract-plugin</h2>
<p>如果您没有听过<a href="https://vue-loader.vuejs.org/en/">vue-loader</a>, 其实他就是把 <code>.vue</code> 文件解析为可运行的JS/CSS and HTMl。Vue-Loader 15进行了完全的重写，它使用了一种完全不同的新架构，能够将webpack配置中定义的任何规则应用于<code>* .vue</code>文件内。</p>
<p>对于CSS抽取，我们使用一个新的插件<code>mini-css-extract-plugin</code>，它支持CSS和SourceMaps（CSS splitting）的按需加载，并构建在新的webpack v4特性（module types）上。</p>
<p>两者都是新的，所以在我们最终的2.0.0版本发布之前，预计会有一些不一致。 </p>
<h2>Nuxt 💖 ES modules</h2>
<p>现在你可以在<code>nuxt.config.js</code>中使用<code>import</code> and <code>export</code> , 服务器middleware和modules要感谢<a href="https://github.com/standard-things/esm">std/esm</a>. A fast, production ready, zero-dependency package to enable ES modules in Node 6+ by <a href="https://medium.com/@jdalton">John-David Dalton</a>.</p>
<h2>🖥️ CLI 改善</h2>
<p>我们非常感谢开发人员，并相信他们需要优雅的开发经验才能创造美好的事物，所以我们重写了很多关于CLI的东西。</p>
<p>在使用 <code>nuxt dev</code>时, 即使CLI显示Nuxt准备就绪，您也可能感觉到构建延迟。这是因为webpack运行两次。一次用于客户端，一次用于SSR捆绑。第二个是隐藏的！因此，我们创建了 <a href="https://github.com/nuxt/webpackbar">WebpackBar</a> ，使得开发模式更加顺畅。</p>
<p>现在，所有debug信息都默认隐藏（可以使用<code>DEBUG=nuxt:*</code> 环境变量启用），相反，我们会为builder和generator展示更好的信息。</p>
<p>Nuxt经常要求的增强功能支持Test and CI（持续集成）环境。 Nuxt 2自动检测配置项和测试环境，并将切换到一个称为minimalCLI的特殊模式，其中包含更少的详细消息。</p>
<h2>🤷 Nuxt 1.0中删除的功能</h2>
<ul>
<li>Removed <code>context.isServer</code> and <code>context.isClient</code> (Use <code>process.client</code> and <code>process.server</code>)</li>
<li>Removed <code>options.dev</code> in <code>build.extend()</code> (Use <code>options.isDev</code>)</li>
<li>Removed tappable hooks (<code>nuxt.plugin()</code>) in modules (Use new hooks system)</li>
<li>Removed callback for modules (Use <code>async</code> or return a <code>Promise</code>)</li>
</ul>
<h2>🎌 Experimental Multi-Thread Compiler</h2>
<p>虽然这将是webpack 5的官方功能，但你可以使用实验性的<code>options.build.cache：true</code>来启用<a href="https://github.com/webpack-contrib/cache-loader">cache-loader</a>和babel cache以及<code>options.build.parallel：true</code>启用<a href="https://github.com/webpack-contrib/thread-loader">thread-loader</a>。</p>
<h2>⭕ SPA改善</h2>
<p>Nuxt.js是Vue.js开发人员的通用框架，这意味着它可以用于SSR或仅用于客户端（单页面应用）模式。我们重新修改了SPA的一些重要内容。</p>
<p>SPA重要的组件之一是页面加载指示器。它被重新设计，如果发生任何问题就会进入错误状态，并会在约2秒后自适应地开始在DOM中显示。如果SPA应用加载速度够快，这将有助于不必要的闪屏。我们还添加了aria标签，以帮助屏幕阅读器和搜索引擎正确检测启动画面。</p>
<p>SPA模式使用特殊的meta渲染器将<code>nuxt.config.js</code>中定义的所有meta标签添加到页面标题中，以实现SEO和HTTP2支持！我们也为SPA模式增加了<code>options.render.bundleRenderer.shouldPrefetch</code>和<code>options.render.bundleRenderer.shouldPreload</code></p>
<p>⚠️ <strong>BREAKING CHANGE:</strong> <code>shouldPrefetch</code>默认是禁用的。许多用户反馈不需要的页面块prefetch，尤其是在中型项目上。此外，所有不必要的资源提示在非生产模式下都会被禁用，以便于调试。</p>
<h2>🐰 等不及发布了吧? 使用nuxt-edge!</h2>
<p>您可以通过删除<code>[nuxt] [12]</code>并安装<code>[nuxt-edge] [13]</code>NPM package来帮助我们试验最新功能。随意留下您的评论标上<code>[edge]</code>。</p>
<p>对于yarn，你可以使用这个命令安装: <code>yarn add nuxt@npm:nuxt-edge</code> (Thanks to <a href="https://medium.com/@bemile?source=user_popover" title="Go to the profile of Benoît Emile">t</a>he <a href="https://medium.com/@bemile">Benoît Emile</a>’s suggestion)</p>
<h3>💭 期待你的反馈 :)</h3>
<p>Nuxt 2 即将来临。我们正在做最后的检查，优化和测试以便发布更加稳定的版本。同时我们期待您的反馈 <a href="https://nuxtjs.cmty.io"><strong>https://nuxtjs.cmty.io</strong></a></p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
🚀 Nuxt 2 即将来临! Oh yeah! – Nuxt.js – Medium

## 原文链接
[https://www.zcfy.cc/article/x1f680-nuxt-2-is-coming-oh-yeah-nuxt-js-medium](https://www.zcfy.cc/article/x1f680-nuxt-2-is-coming-oh-yeah-nuxt-js-medium)


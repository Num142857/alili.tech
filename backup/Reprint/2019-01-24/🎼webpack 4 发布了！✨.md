---
title: '🎼webpack 4 发布了！✨' 
date: 2019-01-24 2:30:11
hidden: true
slug: tz98l3ubyp
categories: [reprint]
---

{{< raw >}}

            <h3>代号: _Legato 🎶</h3>
<p>今天我们愉快的宣布 webpack 4_(Legato)_正式发布了！你可以使用 yarn 或者 npm 获得它：</p>
<pre><code class="hljs dockerfile">$&gt; yarn <span class="hljs-keyword">add</span><span class="bash"> webpack --dev
</span></code></pre><p>或者</p>
<pre><code class="hljs q">$&gt; npm i webpack --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
</code></pre><h2>🎼 为什么叫 Legato?</h2>
<p>首先我们会开始一个新传统：为我们以后的每个大版本设定_代号_！因此，我们决定将命名这个特权给予我们最大的 <a href="https://medium.com/@opencollect">OpenCollective</a> 捐赠者：<strong><em>trivago</em></strong>！</p>
<p>当我们向其发出请求后他们是这么回复我们的：</p>
<blockquote>
<p>[在 trivago] 我们通常以音乐主题来命名我们的项目。例如，我们之前的 JS 框架叫 “Harmony”，我们的新框架叫“Melody”。PHP 的话我们使用基于 Symfony 上层封装，我们叫它“Orchestra”。
 <strong>Legato 意味着毫无间隙地连续演奏每个节奏。</strong>
 这点和 Webpack 很像，Webpack 将我们的前端资源（JS，CSS甚至更多）无间隙的打包在一起。因此我们相信 <strong>“Legato”</strong> 这个代号会适合 Webpack。
 ——   <a href="https://medium.com/@pgotthardt.pg">Patrick Gotthardt</a></p>
</blockquote>
<p>我们得知后也非常地激动，因为新版 Webpack 中我们所做的每一个更新目的都在于此，为了当大家在使用 Webpack 的时候敏捷<strong>_连续_</strong>毫无顿挫感。<strong>非常感谢过去的这些年 trivago 对 webpack 的无私捐赠支持，更感谢其为 webpack 4 命名！👏👏</strong></p>
<p><strong>引申阅读：</strong><a href="https://medium.com/webpack/trivago-helps-secure-webpacks-future-73a58a016873" title="https://medium.com/webpack/trivago-helps-secure-webpacks-future-73a58a016873">🎊 trivago 帮助保护 webpack 的未来 🎊</a></p>
<h2>🕵️‍ 有什么更新？</h2>
<p>webpack 4 有太多的新东西可以说了，但是我不可能在本文中列举所有的内容，否则这篇文章就要推迟很久才能发布了。因此下面我会和大家分享一些我觉得有趣的更新内容，如果大家想要看所有的更新的话可以查阅 <a href="https://github.com/webpack/webpack/releases"><strong>webpack 4 的更新日志</strong></a>。</p>
<h2>🏎 webpack 4 更快（速度提升98%）！</h2>
<p>我们在<a href="https://twitter.com/TheLarkInn/status/964607133495865351?ref_src=twsrc%5Etfw&amp;ref_url=https%3A%2F%2Fmedium.com%2Fmedia%2Ff45612237403efcbcc6212011da27699%3FpostId%3D6cdb994702d4">社区中请求大家对 webpack 4 进行构建性能测试</a>，得出的结果非常有趣。<strong>结果很惊人，构建时间降低了 60%-98%！！这里给大家分享一下某个用户的测试结果：</strong></p>
<p><img src="https://p0.ssl.qhimgs4.com/t01629e95968f237d4f.jpg" alt=""></p>
<p><img src="https://p0.ssl.qhimgs4.com/t01b4d24a7b90c594f5.jpg" alt=""></p>
<p><strong>来源：</strong> <a href="https://twitter.com/probablyup/status/965128389307846657/photo/1?ref_src=twsrc%5Etfw&amp;ref_url=https%3A%2F%2Fmedium.com%2Fmedia%2Fa16b28cebee191890eaae9530d49ead3%3FpostId%3D6cdb994702d4">Twitter</a></p>
<p>当然这只是一部分用户的测试数据，你可以在我的<a href="https://twitter.com/TheLarkInn/status/964607133495865351?ref_src=twsrc%5Etfw&amp;ref_url=https%3A%2F%2Fmedium.com%2Fmedia%2Ff45612237403efcbcc6212011da27699%3FpostId%3D6cdb994702d4">推文的回复</a>中查看他们所有的结果。</p>
<p>性能测试过程中也发现了一些 loader 的 bug 我们已经及时修复了！！<strong><em>PS: 我们还没有实现多进程，或者缓存功能（计划在v5版实现）。所以理论上我们的性能还有非常大的提升空间！！！！</em></strong></p>
<p>构件速度是我们此次发布最主要的目标。你可以把所有的功能都添加到工具中，但是如果不能节省开发时间那你加这些功能又有什么用呢？当然以上的这些都是部分示例，我们非常欢迎大家在推特上使用 <code>#webpack #webpack4</code> 开头提交你们的构建时间报告。</p>
<h2>😍 Mode, 零配置以及默认值</h2>
<p>我们为 webpack 新增了一个 <code>mode</code> 配置项。Mode 有两个值：<code>development</code> 或者是 <code>production</code>，默认值是 <code>production</code>。Mode 是我们为减小生产环境构建<strong>体积</strong>以及节约开发环境的构建<strong>时间</strong>提供的一种优化方案。</p>
<p>如果想要了解更多 mode 配置项的内容，大家可以看看我们之前的一篇文章： <a href="https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a" title="https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a"><strong>webpack 4: mode 和优化</strong></a>。</p>
<p>另外，<code>entry</code>，<code>output</code> 这些配置项也都有默认值了。这意味着<strong><em>你不需要每次都配置它们了，</em></strong>当然包括 <code>mode</code>。这可能意味着从现在开始，你的配置文件在我们做出如此巨大改变之后会变得非常小！</p>
<blockquote>
<p> <strong>Legato 意味着毫无间隙地连续演奏每个节奏。</strong></p>
</blockquote>
<p>另外，我们提供零配置平台来扩展。webpack 最大的一个特色就是可扩展性。最终我们实现的零配置平台会是什么样子呢？当我们实现了 webpack presets 功能后，这意味着你可以基于零配置平台配置你自己，公司，甚至是社区的工作流配置用以继承直接使用。</p>
<h2>✂ 再见 CommonsChunkPlugin</h2>
<p>在新版中我们废弃并移除了 CommonsChunkPlugin，并且使用一些默认值以及更容易被复写的新 API <code>optimize.splitChunks</code> 来代替它。现在你可以在大部分场景中享受自动分块带来的便利了！</p>
<p><a href="https://v.qq.com/iframe/player.html?vid=y0559vc6zin&amp;tiny=1&amp;auto=1">https://v.qq.com/iframe/player.html?vid=y0559vc6zin&amp;tiny=1&amp;auto=1</a></p>
<p>如果想要了解更多该 API 可以查看这篇文章：<a href="https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366" title="https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366"><strong>webpack 4: 代码分块以及分块优化</strong></a></p>
<h2>🔬 WebAssembly 支持</h2>
<p>Webpack 现在默认支持在任何本地 WebAssembly 模块中的 <code>import</code> 和 <code>export</code> 语句。这意味着你可以直接在 Rust, C++, C 或者其它 WebAssembly 支持语言中使用 <code>import</code>。</p>
<h2>🐐 模块类型简介以及 .mjs 支持</h2>
<p>之前，JS 一直都是 Webpack 唯一的一等模块类型。当用户不需要使用 CSS/HTML 的时可能会造成一些麻烦。我们基于新的 API 抽象实现了 JS 类型。目前，我们已经支持5种模块类型实现：</p>
<ul>
<li><code>javascript/auto</code>: _（<strong><em>webpack 3</em></strong> 默认值）_ 所有的 JS 模块规范都可用：CommonJS，AMD，ESM</li>
<li><code>javascript/esm</code>：EcmaScript 模块规范，其它的模块规范都不可用 <em>(.mjs 文件的默认值)</em> </li>
<li><code>javascript/dynamic</code>: 仅支持 CommonJS 和 AMD，EcmaScript 模块规范不可用</li>
<li><code>json</code>: JSON 数据，使用 <code>require</code> 和 <code>import</code> 导入 JSON 数据时可用 <em>（.json 文件的默认值）</em></li>
<li><code>webassembly/experimental</code>: WebAssembly 模块 <em>(.wasm 文件的默认值，目前还是试验阶段）</em></li>
<li>另外 webpack 支持直接查找 <code>.wasm</code>, <code>.mjs</code>, <code>.js</code> 和 <code>.json</code> 后缀文件</li>
</ul>
<p><strong>最让人激动的是，我们甚至可以支持 CSS 和 HTML 模块类型（计划在 webpack 4.x - 5 间版本实现）。</strong> 它将允许我们直接将 HTML 作为入口文件！</p>
<h2>🛑 如果你正在使用 HtmlWebpackPlugin</h2>
<p><a href="https://medium.com/webpack/webpack-4-beta-try-it-today-6b1d27d7d7e2">在发布之前我们预留了一个月的时间</a> 来升级所有的插件和 loader 以适配 webpack 4 的 API。然而，<a href="https://medium.com/@jantimon">Jan Nicklas</a> 因为工作原因没办法参加，因此我们不得不发布了一个 <code>html-webpack-plugin</code> 的 fork 版。你可以使用如下命令安装它：</p>
<pre><code class="hljs dockerfile">$&gt; yarn <span class="hljs-keyword">add</span><span class="bash"> html-webpack-plugin@webpack-contrib/html-webpack-plugin
</span></code></pre><p>当 Jan 本月底从海外工作回来时，我们会将我们的更新合并回 <code>jantimon/html-webpack-plugin</code> 仓库中！在此之前，如果你有任何问题，可以提交到<a href="https://github.com/webpack-contrib/html-webpack-plugin">这里</a>！</p>
<p>如果你是插件或 loader 的开发者，你可以查看我们的迁移指南：<a href="https://medium.com/webpack/webpack-4-migration-guide-for-plugins-loaders-20a79b927202" title="https://medium.com/webpack/webpack-4-migration-guide-for-plugins-loaders-20a79b927202"><strong>webpack 4: 插件/loader 迁移指南</strong></a>。</p>
<h2>💖 还有！</h2>
<p>还有更多的特性没有在本文列出，<strong>我们强烈建议大家去看一下</strong>我们的<a href="https://github.com/webpack/webpack/releases/tag/v4.0.0-beta.0"><strong><em>官方更新日志</em></strong></a>。</p>
<h2>🐣 v4 的文档在哪？</h2>
<p>我们马上要完成迁移指南和v4 的文档了。你可以访问 <a href="https://github.com/webpack/webpack.js.org/issues/1706">文档仓库</a> 切换到 <code>next</code> 分支来获取更新情况，当然能搭把手帮个忙是再好不过了！</p>
<h2>🤷‍ 各框架 cli 工具支持怎么样了?</h2>
<p>在过去的一个月我们也为每个框架的脚手架工作确保它们能支持 webpack 4。甚至最流行的库例如 lodash-es, RxJS 已经支持 <code>sideEffects</code>  选项，因此使用它们的最新版后你会发现打包体积会大幅度的减小。</p>
<p>AngularCLI 团队已经计划在近几周即将发布的大版本中直接使用 webpack 4！如果你想要知道最新进展，可以直接联系他们，并<strong>询问他们你能帮什么忙<em>而不是直接询问它什么时候发布</em></strong>。</p>
<h2>😒 为什么你用如此多的 emoji 表情？</h2>
<p>因为这样写文章很开心呀！大家也可以试试 😍。</p>
<h2>🎨 接下来？</h2>
<p>我们已经在着手计划下一个版本 webpack 4.x 和 5 的特性了，包括但不限于：</p>
<ul>
<li>ESM 模块导出支持</li>
<li>持久缓存</li>
<li>WebAssembly 支持从 <code>experimental</code> 升级为 <code>stable</code> 稳定版。并增加 tree-shaking 和未使用代码去除！</li>
<li>Presets —— 基于零配置设计，任何东西都能支持零配置</li>
<li>CSS 模块类型——支持 CSS 作为入口文件（再见吧 ExtractTextWebpackPlugin）</li>
<li>HTML 模块类型——支持 HTML 作为入口文件</li>
<li>URL/文件 模块类型</li>
<li>自定义模块类型</li>
<li>多线程</li>
<li>重新定义我们的组织章程和计划任务</li>
<li>Google Summer of Code <em>(之后单独写文说明!!!)</em></li>
</ul>
<h2>🙇 再次感谢 🙇</h2>
<p>对于我们的贡献者团队，核心团队，loader 和插件作者，那些第一次提交他们的提交，或者帮助解决故障的人：我们不能不感谢你们。<strong><em>这个产品是为你而生的，你们帮助塑造了它</em></strong>。</p>
<p><img src="https://cdn-images-1.medium.com/max/1600/1*qWgUvV_NRgrnAfupZ9x-9w.png" alt=""><br>2018 我们将注定要抛弃老古董思维，迎接 JS 的美丽复兴！❤</p>
<p>我之前已经多次强调过，在 <strong><em>JS 复兴</em></strong> 的今天，没有社区的帮忙，webpack 是不会变的如此强大，可持续以及蓬勃的生长。如果没有你们的帮助，webpack 可能现在也还只是<strong>另外一款普通的构建工具</strong>[Yet Another Build Tool (YABT)]而已。</p>
<p>via: <a href="https://medium.com/webpack/webpack-4-released-today-6cdb994702d4">https://medium.com/webpack/webpack-4-released-today-6cdb994702d4</a></p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
🎼webpack 4 发布了！✨

## 原文链接
[https://www.zcfy.cc/article/x1f3bc-webpack-4-released-today-webpack-medium](https://www.zcfy.cc/article/x1f3bc-webpack-4-released-today-webpack-medium)


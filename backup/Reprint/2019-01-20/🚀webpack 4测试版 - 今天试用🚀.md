---
title: '🚀webpack 4测试版 - 今天试用🚀' 
date: 2019-01-20 2:30:11
hidden: true
slug: pwichf6c2y
categories: [reprint]
---

{{< raw >}}

            <p>自8月初以来—当我们将 <strong><code>nex branch</code></strong>合并到<strong><code>webpack/webpack#master</code></strong>—我们看到了巨大的贡献！</p>
<p><img src="https://p0.ssl.qhimg.com/t018cd5d17891afe179.png" alt=""></p>
<p><strong>🎉今天，我们很自豪地发布webpack 4.0.0-beta.0来分享这项工作的成果！</strong> <strong>🎉</strong></p>
<h4>🎁A Promise Fulfilled — 可预测的发布周期</h4>
<p>当我们完成webpack 3的发布后，我们向社区承诺，我们会在主要版本之间为您提供更长的开发周期。</p>
<p>我们已经实现了这个承诺[并继续实现它]，为您带来一系列功能，改进和错误修复，我们已经等不及想要你试试这些新功能了！以下就讲讲如何开始！</p>
<h4>🤷‍如何安装[v4.0.0-beta.0]</h4>
<p>如果你使用的是<code>yarn</code>:</p>
<p><code>yarn add webpack@next webpack-cli --dev</code></p>
<p>或者 <code>npm</code>:</p>
<p><code>npm install webpack@next webpack-cli --save-dev</code></p>
<h4>🛠如何迁移?</h4>
<p>在测试webpack 4时，越来越多的人尝试将<code>reporting plugin</code>和<code>loader</code>程序不兼容，我们就可以构建一个生动的移植指南。</p>
<p><strong><em>因此，我们需要您查看</em></strong> <a href="https://github.com/webpack/webpack/releases/tag/v4.0.0-beta.0"><strong><em>官方更改日志</em></strong></a> <strong>_以及_</strong> <a href="https://github.com/webpack/webpack/issues/6357"><strong><em>我们的迁移草案</em></strong></a> <strong><em>并在我们有遗漏的地方提供反馈! 这将帮助我们的文档团队创建我们的官方稳定版本迁移指南！</em></strong></p>
<h3>webpack 4有什么新功能?</h3>
<p>以下是一些您想要知道的以及一些更值得注意的功能. 有关更改功能和内部API修改的完整列表 <a href="https://github.com/webpack/webpack/releases/tag/v4.0.0-beta.0"><strong><em>请参阅我们的更改日志!!!</em></strong></a></p>
<h3>🚀性能</h3>
<p>在webpack 4的多种场景中，性能将显着增强。以下是我们为实现此目标而做出的一些显着变化：</p>
<ul>
<li>默认情况下，在使用 <code>production</code> 模式时，我们将自动并行化并缓存由UglifyJS完成的缩小工作。</li>
<li>我们发布了<a href="https://github.com/webpack/tapable">新版本的插件系统</a>，以便事件挂钩和处理程序是单态的。</li>
<li>此外，webpack现在已经放弃了对Node v4的支持，使我们能够添加大量较新的ES6语法和数据结构，并且也通过V8进行了优化。到目前为止，我们已经看到<a href="https://github.com/webpack/webpack/issues/6248">9小时12分钟的真实报道</a>！</li>
</ul>
<p><em>PS: 我们甚至还没有实现全缓存和并行性</em> 😉 <em>[webpack 5里程碑]</em></p>
<h3>🔥更好的默认值 — #0CJS</h3>
<p>直到今天，webpack一直要求您明确设置您的输入和输出属性。使用webpack 4，webpack会自动假设您的入口属性为<code>./src/</code>，并且默认情况下，bundle将输出为<code>./dist</code>。</p>
<p>这意味着 <strong><em>您不再需要配置就可以开始使用webpack!!</em></strong></p>
<p><img src="https://p0.ssl.qhimg.com/t012e1f896458cc6ca4.png" alt=""></p>
<p>现在webpack是＃0CJS（Zero Configuration）开箱即用的打包程序，我们将在<code>4.x</code>和<code>5.0</code>中奠定基础，以便在将来提供更多的默认功能。</p>
<h3>💪更好的默认值  — mode</h3>
<p>您现在必须在两种模式之间选择（<code>模式</code>或 - <code>模式</code>）：<code>“production”</code> 或者<code>“development”.”</code>。</p>
<ul>
<li>生产模式为您提供各种优化。这包括缩小，范围提升，抖动，无副作用的模块修剪，并且包括必须像<code>NoEmitOnErrorsPlugin</code>一样手动使用的插件。</li>
<li>开发模式针对速度和开发人员的体验进以同样的方式，我们会自动在您的包输出中包含路径名称等功能，eval-source-maps，这些功能是为了易于阅读代码和快速构建！</li>
</ul>
<h3>🍰sideEffects —  bundle sizes的巨大胜利</h3>
<p>我们在package.json中引入了对<code>sideEffects：false</code>。添加此字段时，它会向webpack发送信号，表明库中没有正在使用的sideEffects。这意味着webpack可以安全地消除代码中使用的任何重新导出。</p>
<p>例如，仅从lodash-es作为single_export_导入将花费约223 KiB [压缩后]。<strong><em>在webpack 4中，这个代价现在是〜3 KiB！</em></strong></p>
<h3>🌳JSON Support &amp; Tree Shaking</h3>
<p>当您使用ESModule语法导入JSON时，webpack将从“JSON模块”中消除未使用的导出。对于那些已经将大量未使用的片段导入到代码中的人来说，<strong><em>你会发现你的包的大小会显着减小。</em></strong></p>
<h3>😍升级到UglifyJS2</h3>
<p>这意味着您可以使用ES6语法，将其缩小，而无需第一个转译器。</p>
<p><em>我们要感谢UglifyJs2团队的贡献者为实现ES6支持所做的无私和努力工作。这不是一件容易的事情，我们很乐意让你<a href="https://github.com/mishoo/UglifyJS2/graphs/contributors?from=2017-01-14&amp;to=2018-01-25&amp;type=c">去看看他们的 repository 并表达你的赞赏和支持</a></em></p>
<p><img src="https://p0.ssl.qhimg.com/t01ee970cd603f27fb4.png" alt=""></p>
<h3>🐐 Module Type的推出+ .mjs支持</h3>
<p>历史上，JavaScript是webpack中唯一的一流模块类型。这给用户带来了很多尴尬的痛苦，他们无法有效地使用CSS / HTML Bundle等。现在我们从代码库中抽象出JavaScript特性，以允许这个新的API。我们现在有5个模块类型实现：</p>
<ul>
<li><code>javascript/auto</code>:<em>（在webpack 3中的默认值</em>）_已启用所有模块系统的Javascript模块：CommonJS，AMD，ESM</li>
<li><code>javascript/esm</code>: EcmaScript模块，所有其他模块系统都不可用<em>（默认为.mjs文件）</em></li>
<li><code>javascript/dynamic</code>: 只有CommonJS和AMD; EcmaScript模块不可用</li>
<li><code>json</code>: JSON数据，它可以通过require和import <em>（默认的.json文件）</em></li>
<li><code>webassembly/experimental</code>: WebAssembly模块 <em>（当前为.wasm文件的实验文件和默认文件）</em></li>
<li>此外，webpack现在按此顺序查找<code>.wasm</code>，<code>.mjs</code>，<code>.js</code>和<code>.json</code>扩展名以解析</li>
</ul>
<p><strong><em>这个功能最令人兴奋的是，现在我们可以继续使用CSS和HTML模块类型（4.x）</em></strong>。这将允许像HTML这样的功能成为您的入门点！</p>
<h3>🔬WebAssembly支持</h3>
<p>默认情况下，Webpack支持导入和导出任何本地WebAssembly模块。这意味着您还可以编写装载器，以便您直接导入Rust，C ++，C和其他WebAssembly主机lang文件：</p>
<h3>💀再见CommonsChunkPlugin</h3>
<p>我们还删除了<code>CommonsChunkPlugin</code>并默认启用了其许多功能。另外，对于那些需要对其缓存策略进行细粒度控制的用户，<a href="https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693">我们添加了更丰富，更灵活的一组功能</a><code>optimization.splitChunks</code>和<code>optimization.runtimeChunk</code></p>
<h3>💖还有更多！</h3>
<p>还有更多的功能，我们强烈建议您在我们的 <a href="https://github.com/webpack/webpack/releases/tag/v4.0.0-beta.0"><strong><em>官方日志中</em></strong></a>中查看所有功能。 </p>
<h3>⌚倒计时</h3>
<p><strong>按照承诺，我们将从今天开始等待一个月，然后再释放webpack 4稳定版</strong>。这为我们的插件，加载程序和集成生态系统提供了测试，报告和升级到webpack 4.0.0的时间！</p>
<p>我们需要您帮助我们升级并测试此测试版。我们今天可以测试的越多，我们就可以更快地进行分类并找出任何可能出现的问题！</p>
<p>非常感谢所有帮助我们制作wepback 4的贡献者。正如我们总是说的那样，webpack的威力是我们的零件和生态系统的总和。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
🚀webpack 4测试版 - 今天试用🚀

## 原文链接
[https://www.zcfy.cc/article/webpack-4-beta-try-it-today](https://www.zcfy.cc/article/webpack-4-beta-try-it-today)


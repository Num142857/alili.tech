---
title: 'React v16 与 Webpack v4 的多特性模板项目' 
date: 2018-11-30 2:30:12
hidden: true
slug: 5jc0sx1w2vs
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://camo.githubusercontent.com/0f548a3dd0a4d63cc30e4e75f26b701bbd0c5107/68747470733a2f2f7777772e726f62696e776965727563682e64652f696d672f706f7374732f6d696e696d616c2d72656163742d7765627061636b2d626162656c2d73657475702f62616e6e65722e6a7067" rel="nofollow noreferrer"><span class="img-wrap"><img data-src="https://camo.githubusercontent.com/0f548a3dd0a4d63cc30e4e75f26b701bbd0c5107/68747470733a2f2f7777772e726f62696e776965727563682e64652f696d672f706f7374732f6d696e696d616c2d72656163742d7765627061636b2d626162656c2d73657475702f62616e6e65722e6a7067" src="https://static.alili.techhttps://camo.githubusercontent.com/0f548a3dd0a4d63cc30e4e75f26b701bbd0c5107/68747470733a2f2f7777772e726f62696e776965727563682e64652f696d672f706f7374732f6d696e696d616c2d72656163742d7765627061636b2d626162656c2d73657475702f62616e6e65722e6a7067" alt="img" title="img"></span></a></p>
<p>题注：欢迎加入阿里南京前端团队，欢迎关注<a href="https://zhuanlan.zhihu.com/ali-nanjing" rel="nofollow noreferrer">阿里南京技术专刊</a>了解更多讯息。</p>
<h1>React &amp; Webpack Boilerplate V4</h1>
<p><a href="https://github.com/wxyyxc1992/fe-boilerplate/blob/master/react/webpack/README.md" rel="nofollow noreferrer">React &amp; Webpack Boilerplate V4</a> 是笔者前端常用模板集锦项目 <a href="https://github.com/wxyyxc1992/fe-boilerplate" rel="nofollow noreferrer">fe-boilerplate</a> 的一部分，尽可能地使用无异议的工具，提供直观且简洁明了的方式；相较于 create-react-app，具有更好的可配置性与适应性，适合于中长期项目。支持最新的 Webpack 4 &amp; React 16.3 版本，如果需要引入 TypeScript 支持，可以借鉴 <a href="https://github.com/wxyyxc1992/fe-boilerplate" rel="nofollow noreferrer">react/webpack-ts</a> 这个模板。</p>
<p>为了保证项目的纯粹性，将原本 React Router，Redux，MobX 等常见的技术框架的使用迁移到了 <a href="https://github.com/wxyyxc1992/fe-boilerplate" rel="nofollow noreferrer">fe-boilerplate</a> 的其他模板项目中。也可以查阅 <a href="https://github.com/wxyyxc1992/Awesome-CheatSheet/blob/master/Web/Builder/Webpack-CheatSheet.md" rel="nofollow noreferrer">Webpack CheatSheet</a>，或者 <a href="https://github.com/wxyyxc1992/Awesome-CheatSheet/blob/master/Web/Framework/React-CheatSheet.md" rel="nofollow noreferrer">React CheatSheet</a>、<a href="https://github.com/wxyyxc1992/Web-Series" rel="nofollow noreferrer">现代 Web 开发基础与工程实践</a> 了解更多 Web 开发实践的知识。</p>
<h1>配置与使用</h1>
<p>下载或者克隆 <a href="https://github.com/wxyyxc1992/fe-boilerplate" rel="nofollow noreferrer">fe-boilerplate</a>，并且进入 <code>react/webpack</code> 子目录：</p>
<pre><code># 安装依赖
$ cnpm install

# 仅启动 Web 开发服务器
$ npm run dev

# 启动 Web 开发服务器与 Mock 服务器
$ npm start

# 启动 Storybook 服务，在进行组件开发时使用
$ npm run storybook

# 编译为可发布的包体
$ npm run build

# 使用 *.umd.* 配置文件，编译为库
$ npm run build:lib

# 执行 ESLint
$ npm run lint

# 执行包体分析
$ npm run analyze</code></pre>
<p>如果我们是进行的多页面应用开发，那么可以在 <a href="https://github.com/wxyyxc1992/fe-boilerplate/blob/master/react/webpack/dev-config/webpack.config.base.js" rel="nofollow noreferrer">webpack.config.base.js</a> 文件中添加更多的 Entry 与 <a href="https://github.com/jantimon/html-webpack-plugin" rel="nofollow noreferrer">HtmlWebpackPlugin</a> 配置。</p>
<h1>技术栈</h1>
<ul>
<li>
<p>样式</p>
<ul>
<li>支持使用 CSS Modules/SCSS/Less 等 CSS 模块化解决方案，对于潜在的类名过长导致的冗余包体等问题可以参考 <a href="https://parg.co/Yln" rel="nofollow noreferrer">babel-plugin-jsx-nested-classname</a>。</li>
<li>示例代码使用了 <a href="https://github.com/styled-components/styled-components" rel="nofollow noreferrer">styled-components</a> 作为 CSS-in-JS 库。</li>
<li>使用 PostCSS 作为 CSS 代码的后置 Polyfill 以及语法转换支持，详见 <a href="https://github.com/wxyyxc1992/fe-boilerplate/blob/master/react/webpack/postcss.config.js" rel="nofollow noreferrer">postcss.config.js</a> 中的配置。</li>
</ul>
</li>
<li>
<p>约束</p>
<ul>
<li>使用 <a href="https://github.com/prettier/prettier" rel="nofollow noreferrer">Prettier</a> 作为代码格式化工具。</li>
<li>强烈建议使用 ESLint 进行代码风格控制，可以使用 <a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" rel="nofollow noreferrer">vscode-eslint</a> 插件以获得更好的开发体验；ESLint 规则推荐使用 <a href="https://www.npmjs.com/package/eslint-config-airbnb" rel="nofollow noreferrer">eslint-config-airbnb</a>。</li>
<li>可以使用 <a href="https://github.com/MagicCube/vscode-import-formatter" rel="nofollow noreferrer">vscode-import-formatter</a> 等格式化工具处理代码的细节风格，譬如引用顺序等问题。</li>
</ul>
</li>
<li>
<p>测试</p>
<ul>
<li>使用 <a href="https://facebook.github.io/jest/" rel="nofollow noreferrer">Jest</a> 作为 Test Runner 以及单元测试框架。</li>
<li>使用 <a href="https://github.com/airbnb/enzyme" rel="nofollow noreferrer">Enzyme</a> 作为 React 组件的测试框架。</li>
</ul>
</li>
<li>
<p>计算</p>
<ul><li>使用 <a href="https://github.com/developit/workerize-loader" rel="nofollow noreferrer">workerize-loader</a> 提供便捷的 Web Worker 计算支撑，可以参考 <a href="https://parg.co/YlB" rel="nofollow noreferrer">DOM CheatSheet</a> 获取更多内容。</li></ul>
</li>
</ul>
<h1>开发态特性</h1>
<ul>
<li>
<p>热加载</p>
<ul>
<li>使用内建的 <a href="https://webpack.js.org/configuration/dev-server/" rel="nofollow noreferrer">Webpack DevServer</a> 作为开发服务器。</li>
<li>使用 <a href="https://github.com/gaearon/react-hot-loader" rel="nofollow noreferrer">React Hot Loader V4</a> 提供 React 组件热加载的能力。</li>
</ul>
</li>
<li>
<p>构建优化</p>
<ul>
<li>使用 DllPlugin 作为开发环境下公共代码提取工具以优化编译速度生产环境。</li>
<li>可以考虑使用 <a href="https://github.com/amireh/happypack" rel="nofollow noreferrer">HappyPack</a>, <a href="https://github.com/trivago/parallel-webpack" rel="nofollow noreferrer">parallel-webpack</a> 等工具提升 Webpack 的并行处理能力。</li>
</ul>
</li>
</ul>
<h1>发布态特性</h1>
<ul>
<li>代码分割，Webpack 4 移除了 CommonChunksPlugin，替换以 optimization 与 splitChunks 配置项，详细配置参考 <a href="https://github.com/wxyyxc1992/fe-boilerplate/blob/master/react/webpack/dev-config/webpack.config.prod.js" rel="nofollow noreferrer">webpack.config.prod.js</a>。</li>
<li>PWA 特性，使用 <a href="https://github.com/NekR/offline-plugin" rel="nofollow noreferrer">offline-plugin</a> 添加便捷的 PWA 支持。</li>
<li>服务端渲染，详见 <a href="https://github.com/wxyyxc1992/fe-boilerplate/blob/master/react/webpack/ssr/server.js" rel="nofollow noreferrer">ssr/server</a>。</li>
<li>代码优化，使用 Prepack &amp; prepack-webpack-plugin 进行代码优化。</li>
</ul>
<p>我的博客即将搬运同步至腾讯云+社区，邀请大家一同入驻：<a href="https://cloud.tencent.com/developer/support-plan?invite_code=1dzz5uvo6vydj" rel="nofollow noreferrer">https://cloud.tencent.com/dev...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React v16 与 Webpack v4 的多特性模板项目

## 原文链接
[https://segmentfault.com/a/1190000014849127](https://segmentfault.com/a/1190000014849127)


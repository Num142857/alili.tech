---
title: '学习Vue2.0的建议顺序' 
date: 2019-01-26 2:30:18
hidden: true
slug: 0k2yjg5scpsb
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">学习Vue2.0的建议顺序</h2>
<blockquote><p>注：本文是看过其他关于vue文章之后的想法，欢迎转载，请注明出处。</p></blockquote>
<p>　</p>
<blockquote><p>Vue官方文档：<a href="http://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue2.0官方文档</a>，官方文档永远是学习资料的第一步</p></blockquote>
<h3 id="articleHeader1">起步</h3>
<blockquote>
<p><strong>扎实的 JavaScript / HTML / CSS 基本功。这是前置条件。</strong></p>
<ol>
<li><p>通读官方教程 (guide) 的基础篇。不要用任何构建工具，就只用最简单的 &lt;script&gt;，把教程里的例子模仿一遍，理解用法。不推荐上来就直接用 vue-cli 构建项目，尤其是如果没有 Node/Webpack 基础。</p></li>
<li><p>照着官网上的示例，自己想一些类似的例子，模仿着实现来练手，加深理解。</p></li>
<li><p>阅读官方教程进阶篇的前半部分，到『自定义指令 (Custom Directive) 』为止。着重理解 Vue 的响应式机制和组件生命周期。『渲染函数（Render Function)』如果理解吃力可以先跳过。</p></li>
<li><p>阅读教程里关于路由和状态管理的章节，然后根据需要学习 vue-router 和 vuex。同样的，先不要管构建工具，以跟着文档里的例子理解用法为主。</p></li>
<li><p>走完基础文档后，如果你对于基于 Node 的前端工程化不熟悉，就需要补课了。下面这些严格来说并不是 Vue 本身的内容，也不涵盖所有的前端工程化知识，但对于大型的 Vue 工程是前置条件，也是合格的『前端工程师』应当具备的知识。</p></li>
</ol>
</blockquote>
<h3 id="articleHeader2">前端生态/工程化</h3>
<blockquote><ol>
<li><p>了解 JavaScript 背后的规范，ECMAScript 的历史和目前的规范制定方式。学习 ES2015/16 的新特性，理解 ES2015 modules，建议可以看看<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">阮一峰ES6的教程</a>。</p></li>
<li><p>学习 Node.js 基础。node.js的学习曲线会比较长，需要了解到npm的常用命令，以及CMD和AMD的模块规范，node.js的API也很多，其实更多的是属于一项后端语言。<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">node.js官方文档</a></p></li>
<li><p>了解如何使用 / 配置 Babel 来将 ES2015 编译到 ES5 用于浏览器环境。</p></li>
<li><p>学习 Webpack。建议可以先看看<a href="http://webpackdoc.com/" rel="nofollow noreferrer" target="_blank">webpack的中文文档</a>。Webpack 是一个极其强大同时也复杂的工具。也是当下最流行的前端工程化的工具</p></li>
</ol></blockquote>
<h3 id="articleHeader3">Vue 进阶</h3>
<blockquote><ol>
<li><p>有了 Node 和 Webpack 的基础，可以通过 vue-cli 来搭建基于 Webpack ，并且支持单文件组件的项目了。建议用 webpack-simple 这个模板开始，并阅读官方教程进阶篇剩余的内容以及 vue-loader 的文档，了解一些进阶配置。有兴趣的可以自己亲手从零开始搭一个项目加深理解。</p></li>
<li><p>根据 例子 尝试在 Webpack 模板基础上整合 vue-router 和 vuex,可以在git上下载<a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a>项目看看</p></li>
<li><p>深入理解 Virtual DOM 和『渲染函数 (Render Functions)』这一章节（可选择性使用 JSX)，理解模板和渲染函数之间的对应关系，了解其使用方法和适用场景。</p></li>
<li><p>（可选）根据需求，了解服务端渲染的使用（需要配合 Node 服务器开发的知识）。其实更重要的是理解它所解决的问题并搞清楚你是否需要它。</p></li>
<li><p>阅读开源的 Vue 应用、组件、插件源码，自己尝试编写开源的 Vue 组件、插件。</p></li>
</ol></blockquote>
<p>参考链接：<a href="https://zhuanlan.zhihu.com/p/23134551" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
学习Vue2.0的建议顺序

## 原文链接
[https://segmentfault.com/a/1190000008358727](https://segmentfault.com/a/1190000008358727)


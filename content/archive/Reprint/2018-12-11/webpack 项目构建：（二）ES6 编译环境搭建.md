---
title: 'webpack 项目构建：（二）ES6 编译环境搭建' 
date: 2018-12-11 2:30:10
hidden: true
slug: n9v9xk8qmxr
categories: [reprint]
---

{{< raw >}}

                    
<p><em>注：以下教程均在 windows 环境实现，使用其他操作系统的同学实践过程可能会有些出入。</em></p>
<p>  在上一章 <a href="https://segmentfault.com/a/1190000013512471">webpack 项目构建：（一）基本架构搭建</a> 我们搭建了一个最基本的 webpack 项目，现在让我们以此为基础，结合 babel，构建一个可以运行最新 ES6 语法的 webpack 项目。</p>
<h2 id="articleHeader0">一、上期回顾</h2>
<p>  在上一章，我们搭建了一个如下结构的 webpack 项目：<br><span class="img-wrap"><img data-src="/img/bV4XuH?w=559&amp;h=130" src="https://static.alili.tech/img/bV4XuH?w=559&amp;h=130" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>  并通过 webpack.config.js 的 entry 和 output 属性，配置了 webpack 的打包规则：</p>
<p>webpack.config.js<br><span class="img-wrap"><img data-src="/img/bV4Xvs?w=932&amp;h=170" src="https://static.alili.tech/img/bV4Xvs?w=932&amp;h=170" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>  即以当前目录下的 index.js 为打包入口，通过 webpack 打包构建，在当前目录生成一个 test.js 文件。通过简单的配置就能让 webpack 正常工作了。<br>  现在通过在当前目录执行 webpack 打包命令，我们就能得到 test.js 文件了。<br><span class="img-wrap"><img data-src="/img/bV4Xwq?w=485&amp;h=149" src="https://static.alili.tech/img/bV4Xwq?w=485&amp;h=149" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">二、使用打包生成的 test.js 文件</h2>
<p>  第一章中 index.js 文件做的事情很简单，仅仅是声明了一个值为整型 123 的 test 变量。</p>
<p>index.js<br><span class="img-wrap"><img data-src="/img/bV4Xx6?w=667&amp;h=58" src="https://static.alili.tech/img/bV4Xx6?w=667&amp;h=58" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>  在实际的环境中，这样一段代码完成的功能很有限。现在让我们来扩展我们的项目，使之能完成更强大的功能。</p>
<ol>
<li>修改 index.js 文件，完成等待 1 秒弹出问候语的功能：<br> index.js<br><span class="img-wrap"><img data-src="/img/bV4XEM?w=922&amp;h=143" src="https://static.alili.tech/img/bV4XEM?w=922&amp;h=143" alt="图片描述" title="图片描述" style="cursor: pointer;"></span>
</li>
<li>webpack 打包生成 test.js 文件；</li>
<li>新建 index.html 文件，并引用打包生成的 test.js 文件：<br> index.html<br><span class="img-wrap"><img data-src="/img/bV4XFd?w=926&amp;h=252" src="https://static.alili.tech/img/bV4XFd?w=926&amp;h=252" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
</ol>
<p>  现在让我们在浏览器里打开 index.html 文件，等待一秒就会弹出信息为 Hello word! 的弹窗。由此可见打包生成的 test.js 具有 index.js 一样的功能。<br>  这是因为 webpack 打包的本质，就是从入口文件出发，递归解析所有相关的依赖文件，并打包成一个或多个文件（bundle）。webpack 只是重新组织、精简了你写的代码，并不会影响代码的功能。webpack 的魅力也正是在于其强大的组织、优化代码的能力。现在让我们一步步地深入了解 webpack 的打包配置，一点点揭开 webpack 神秘的面纱。</p>
<h2 id="articleHeader2">三、ES6 和 Babel</h2>
<p>  <a href="http://es6.ruanyifeng.com/#README" rel="nofollow noreferrer" target="_blank">ECMAScript6</a> 实现了很多强大的新特性，借助 ES6 我们能用更加优雅的方式完成许多强大的功能。只是鉴于许多老版本的浏览器尚未支持 ES6 语法，需要在使用之前转换为 ES5 语法，以使其兼容更多的浏览器。而完成这些转换工作的就是 Babel 了。<br>  Babel 本质就是一个 JavaScript 编译器，通过：</p>
<ol>
<li>将 JavaScript 源代码解析成抽象语法树（AST）；</li>
<li>将源代码的 AST 结果一系列转换生成目标代码的 AST；</li>
<li>将目标代码的 AST 转换成 JavaScript 代码。</li>
</ol>
<p>  就可以完成 ES6 代码到 ES5 代码的转换，当然转换的过程会很复杂，我们在这里先了解一下基本的原理。想深入了解的同学可以通过开发自己的 <a href="https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md" rel="nofollow noreferrer" target="_blank">Babel Plugin</a>，熟悉 AST 的操作流程。</p>
<p>  Babel 本身的安装使用是很简单的，针对我们当前的应用，我们可以通过如下过程实现：</p>
<ol>
<li>安装 babel-core 包：cnpm i --save-dev babel-core；</li>
<li>新建一个 Babel 测试文件 babelTest.js 并使用 babel-core 转换 ES6 代码（我们使用了 ES6 的<a href="http://es6.ruanyifeng.com/#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0" rel="nofollow noreferrer" target="_blank">箭头函数</a>）：<br>babelTest.js<br><span class="img-wrap"><img data-src="/img/bV4YL6?w=997&amp;h=210" src="https://static.alili.tech/img/bV4YL6?w=997&amp;h=210" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>安装上一步中使用的 babel-preset-env 和 babel-preset-stage-0 包：cnpm i --save-dev babel-preset-env babel-preset-stage-0；（babel-preset-env 是一个主流的 Babel 插件数组；Stage-X 是实验阶段的 Presets，）<br>TC39 将提案分为以下几个阶段:<br>Stage 0 - 稻草人: 只是一个想法，可能是 babel 插件。<br>Stage 1 - 提案: 初步尝试。<br>Stage 2 - 初稿: 完成初步规范。<br>Stage 3 - 候选: 完成规范和浏览器初步实现。<br>Stage 4 - 完成: 将被添加到下一年度发布。</li>
<li>在当前目录执行 babelTest.js 文件：node babelTest.js，控制台输出信息：<br><span class="img-wrap"><img data-src="/img/bV4YP9?w=657&amp;h=84" src="https://static.alili.tech/img/bV4YP9?w=657&amp;h=84" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>可以看到我们的 ES6 箭头函数被转换为了 ES5的 '(function() {})'。</li>
</ol>
<p>  了解了 Babel 的基本工作原理，现在让我们用 ES6 的新特性，稍微改写一下我们的 index.js：</p>
<p>index.js<br><span class="img-wrap"><img data-src="/img/bV4YSg?w=808&amp;h=162" src="https://static.alili.tech/img/bV4YSg?w=808&amp;h=162" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>  在这里我们用了 ES6 的<a href="http://es6.ruanyifeng.com/#docs/string#%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2" rel="nofollow noreferrer" target="_blank">模板字符串</a>和<a href="http://es6.ruanyifeng.com/#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0" rel="nofollow noreferrer" target="_blank">箭头函数</a>。模板字符串通过用反引号（`）标识字符串，可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。<br>  在没有配置 Babel 的情况下，我们通过 webpack 命令打包，可以发现生成的 test.js 文件还是用的 ES6 语法：</p>
<p>test.js<br><span class="img-wrap"><img data-src="/img/bV4Y1b?w=955&amp;h=342" src="https://static.alili.tech/img/bV4Y1b?w=955&amp;h=342" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><em>注：截图部分是 test.js 的最后参数部分。</em></p>
<p>  下面让我们看一下如何将 Babel 结合到 webpack 中，来实现 ES6 代码到 ES5 代码的转换。</p>
<h2 id="articleHeader3">四、webpack + Babel 构建 ES6 开发平台</h2>
<p>  既然要将 webpack 和 Babel 结合在一起，就需要在两者之间建立一条纽带，而通过 webpack 的 loaders 就可以生成这条纽带，现在让我们修改我们的 webpack.config.js 配置文件：</p>
<p>webpack.config.js<br><span class="img-wrap"><img data-src="/img/bV4YxK?w=951&amp;h=425" src="https://static.alili.tech/img/bV4YxK?w=951&amp;h=425" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>  可以看到我们在这里加了一段 module.rules 配置项，rules 数组里的每一项就是一条 loader 使用规则，loader 用于对不同类型文件的源代码进行转换，可以使你在 import 或"加载"模块时预处理文件。<br>  现在我们配置的第一条规则，就是针对以 .js 结尾的文件使用 babel-loader。由于现在我们的项目中还不存在 babel-loader，让我们先通过 cnpm 安装该模块： cnpm i --save-dev babel-loader。</p>
<p>  现在我们已经准备好了 webpack、webpack 和 Babel 的纽带，接下来就需要准备 Babel 的相关配置了。<br>  在上一节已经介绍了单独使用 Babel 的实现方法，但是在 webpack 中一般情况下我们不会主动调用 babel-core 解析 ES6 代码，而是通过 babel-loader 在 webpack 编译过程中自动解析 ES6 代码。那么现在的问题就是在上一节使用 babel-core 的过程中，我们使用了 env 和 stage-0 两个 preset，现在不使用 babel-core 了，这两个 preset 又应该在哪里配置？<br>  这里我们有两种方式可以实现上述配置：</p>
<ol>
<li>使用 Babel 提供的方法：通过 Babel 目录下的 .babelrc 配置文件完成配置（直接创建 .babelrc 文件可能会有命名规范的问题，可以通过 VS Code、Sublime 等编辑器创建该文件）。这里的 .babelrc 就类似于 webpack.config.js 的作用，只是 .babelrc 文件是在 babel-loader 执行的过程中使用的。<br>.babelrc<br><span class="img-wrap"><img data-src="/img/bV4YWo?w=879&amp;h=164" src="https://static.alili.tech/img/bV4YWo?w=879&amp;h=164" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>使用 webpack 提供的方法：在 webpack.config.js 的 module.rules 规则中，我们还可以通过使用 loader 语法配置 Babel 的 presets：<br>webpack.config.js<br><span class="img-wrap"><img data-src="/img/bV4YYc?w=1118&amp;h=617" src="https://static.alili.tech/img/bV4YYc?w=1118&amp;h=617" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
</ol>
<p>  我们采用第一种方式配置 .babelrc 文件，项目目录结构如下：<br><span class="img-wrap"><img data-src="/img/bV4Y0e?w=732&amp;h=192" src="https://static.alili.tech/img/bV4Y0e?w=732&amp;h=192" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>  现在让我们在当前目录下执行 webpack 命令并查看生成的 test.js 文件，可以发现我们的 index.js 已经被转换成 ES5 代码了：<br><span class="img-wrap"><img data-src="/img/bV4Y1E?w=967&amp;h=411" src="https://static.alili.tech/img/bV4Y1E?w=967&amp;h=411" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>  在浏览器中打开我们的 index.html，发现打包出来的 test.js 能正常工作：<br><span class="img-wrap"><img data-src="/img/bV4Y4V?w=1796&amp;h=338" src="https://static.alili.tech/img/bV4Y4V?w=1796&amp;h=338" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>  使用 webpack 搭建 ES6 编译环境就讲完了。下一章我们开始搭建一个 webpack 开发环境。（<a href="https://segmentfault.com/a/1190000013586090">webpack 项目构建：（三）开发环境——本地服务器搭建</a>）</p>
<p>源码下载地址：<a href="https://github.com/xh4722/webpackDemo" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/xh4722/webpackDemo" rel="nofollow noreferrer" target="_blank">https://github.com/xh4722/web...</a></p>
<p>参考资料：<br><a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">ECMAScript 6入门（阮一峰）</a><br><a href="https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md" rel="nofollow noreferrer" target="_blank">babel-handbook</a><br><a href="https://doc.webpack-china.org/concepts/" rel="nofollow noreferrer" target="_blank">webpack 中文文档</a><br><a href="https://babeljs.cn/docs/setup/" rel="nofollow noreferrer" target="_blank">Babel中文网</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack 项目构建：（二）ES6 编译环境搭建

## 原文链接
[https://segmentfault.com/a/1190000013542132](https://segmentfault.com/a/1190000013542132)


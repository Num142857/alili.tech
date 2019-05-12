---
title: 'React+Redux开发实录（二）React技术栈一览' 
date: 2019-01-11 2:30:08
hidden: true
slug: vj0p0bpsmdd
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://segmentfault.com/a/1190000012505414">React+Redux开发实录（一）搭建工程脚手架</a><br>React+Redux开发实录（二）React技术栈一览</p>
<h1 id="articleHeader0">React技术栈一览</h1>
<p>从上面搭建工程脚手架中，我们看到了React开发技术栈。有ES6、babel、eslint、webpack、react、redux、react-router。</p>
<p>对React新手（有HTML、JavaScript、CSS基础）来说，需明确掌握React和Redux相关概念。至于其他的，了解就可以。不过我们有必要在实践之前从整体上俯瞰一下。清楚来龙去脉，避免迷迷糊糊一味跟随别人的代码去Ctrl+C &amp; Ctrl+V，即痛苦又容易半途而废。</p>
<h2 id="articleHeader1">ES6</h2>
<p>JavaScript的下一代标准，规定今后按年份发布新版。2015年发布的ECMAScript6.0，也叫ES2015。<br>实践React之前，建议先了解下ES6的模块化、箭头函数、表达式解构、Promise异步编程。</p>
<p>完整了解ES6，推荐阅读前端大牛Nicholas C. Zakas（尼古拉斯.泽卡斯）的《深入理解ES6》</p>
<p>线上阅读推荐：阮一峰的开源书<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">《ECMAScript6入门》</a></p>
<h2 id="articleHeader2">Babel</h2>
<p>JavaScript在不断发展，各种新的标准提案层出不穷，由于浏览器的多样性导致可能几年之内都无法广泛普及。<a href="http://babeljs.io/" rel="nofollow noreferrer" target="_blank">Babel</a>是一个广泛使用的转码器，可以将ES6代码转化为几乎所有浏览器都认识的ES5旧代码，你可以不必顾虑的使用ES新特性。</p>
<p>这里有个Babel的<a href="https://babeljs.io/repl/" rel="nofollow noreferrer" target="_blank">REPL线上编译器</a>。在左侧输入箭头函数f=&gt;f感受下吧。</p>
<p>实践React之前，知道有这么个东西就可以了。Webpack会在构建项目时自动调用Babel进行转换。</p>
<p>线上阅读推荐：<a href="https://segmentfault.com/a/1190000009909951">React技术栈之Babel</a></p>
<h2 id="articleHeader3">ESlint</h2>
<p>ESLint是一个JavaScript代码静态检查工具，可以有效提高代码质量。维持前端团队高度一致的编码风格。ESLint不但提供一些默认的规则，也提供用户自定义规则去约束JavaScript风格。</p>
<p>ESLint是Nicholas C. Zakas（尼古拉斯.泽卡斯）创造的。前端大牛，前雅虎前端技术主管，YUI 库的贡献者。当年的我，凭着他的红宝书《JavaScript高级程序设计》，再配合《CSS网站布局实录》，就迈入前端。他同时也是《编写可维护的JavaScript》、《高性能JavaScript》和《深入理解ES6》的作者。</p>
<p>实践React之前，知道有这么个东西就可以了。项目过程中，需要调整规则的时候，参考<a href="http://eslint.cn/docs/rules/" rel="nofollow noreferrer" target="_blank">ESlint完整规则列表</a></p>
<h2 id="articleHeader4">Webpack</h2>
<p>Webpack是新一代打包工具。如今，前端项目日渐复杂，构建系统已成为开发过程中不可或缺的部分，而模块打包正是前端构建系统的核心。</p>
<p>实践React之前，了解下webpack就可以。通过ceate-react-app创建的脚手架，执行npm run eject弹出的webpack配置，就已经相当完美了。再集合项目，适当定制就可以了。</p>
<p>线上阅读推荐：<br><a href="https://segmentfault.com/a/1190000006178770">入门webpack</a><br><a href="http://www.cnblogs.com/vajoy/p/4650467.html" rel="nofollow noreferrer" target="_blank">一小时包教会webpack</a></p>
<p>线上阅读推荐：<br><a href="https://segmentfault.com/a/1190000009902941">React技术栈之Webpack环境搭建（一）手动搭建</a><br><a href="https://segmentfault.com/a/1190000009952845" target="_blank">React技术栈之Webpack环境搭建（二）不同环境不同配置</a><br><a href="https://segmentfault.com/a/1190000010003262">React技术栈之Webpack环境搭建（三）打包性能优化</a></p>
<h2 id="articleHeader5">React</h2>
<p>React是Facebook推出的JavaScript库。口号是“用来创建用户界面的JavaScript库”，所以它只是和用户界面打交道，可以把它看成MVC中的V（视图）层，项目中一般再配上Redux进行数据流和状态的管理。</p>
<p>实践React之前，强烈建议熟悉下React概念。</p>
<p>线上阅读推荐：<br><a href="https://segmentfault.com/a/1190000009882841" target="_blank">React技术栈之React（一）初识React</a><br><a href="https://segmentfault.com/a/1190000009921542">React技术栈之React（二）组件的prop和state</a><br><a href="https://segmentfault.com/a/1190000009921634" target="_blank">React技术栈之React（三）组件的生命周期</a></p>
<h2 id="articleHeader6">Redux</h2>
<p>React的核心就是组件，它只负责view，当应用复杂程度增加时，还需要有数据流向控制、状态管理等方案。</p>
<p>React推出了Flux架构及其官方实现。同时业界也推出了很多Flux的实现，其中以Redux为翘楚，它将 Flux 与函数式编程结合一起，很短时间内就成为了最热门的前端架构。</p>
<p>直接使用Redux是有点烦的，因此React官方提供了react-redux库，它对redux api进行了封装，借助react-redux，可以在项目中更方便的使用Redux。</p>
<p>实践React之前，必须熟悉Redux和react-redux，了解Flex架构更好但不是必须。</p>
<p>线上阅读推荐：<br><a href="http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html" rel="nofollow noreferrer" target="_blank">Redux入门教程</a><br><a href="https://segmentfault.com/a/1190000010112836">React技术栈之Redux异步流</a><br><a href="https://segmentfault.com/a/1190000010205508" target="_blank">React技术栈之Redux高阶运用</a></p>
<h2 id="articleHeader7">react-router</h2>
<p>路由库React-Router，是React体系的一个重要部分。它是官方维护的，事实上也是唯一可选的路由库。它通过管理URL，实现组件的切换和状态的变化。现在已经到了react-router4版本了，跟3版本用法有所不同。</p>
<p>实践React之前，可以了解下。</p>
<p>线上阅读参考：<br><a href="https://segmentfault.com/a/1190000009894639">React技术栈之React-Router</a>(这个是react-router3)</p>
<h2 id="articleHeader8">UI框架</h2>
<p>诸如 <a href="https://ant.design/index-cn" rel="nofollow noreferrer" target="_blank">Ant Design</a>、<a href="http://www.material-ui.com/" rel="nofollow noreferrer" target="_blank">Material-UI</a>、<a href="https://react-bootstrap.github.io/" rel="nofollow noreferrer" target="_blank">React bootstrap</a>、<a href="http://reactdesktop.js.org/" rel="nofollow noreferrer" target="_blank">React Desktop</a>、<a href="http://amazeui.org/react/" rel="nofollow noreferrer" target="_blank">Amaze UI React</a></p>
<p><a href="https://segmentfault.com/a/1190000012505414">React+Redux开发实录（一）搭建工程脚手架</a><br>React+Redux开发实录（二）React技术栈一览</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React+Redux开发实录（二）React技术栈一览

## 原文链接
[https://segmentfault.com/a/1190000009879742](https://segmentfault.com/a/1190000009879742)


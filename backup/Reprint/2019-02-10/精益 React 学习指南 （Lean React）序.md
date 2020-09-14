---
title: '精益 React 学习指南 （Lean React）序' 
date: 2019-02-10 2:30:42
hidden: true
slug: 30m00d3vikw
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Lean React</h1>
<p><span class="img-wrap"><img data-src="/img/bVvIsW" src="https://static.alili.tech/img/bVvIsW" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>目前本书正在撰写过程中，将这个目录结构先发出来，希望能得到更多读者的反馈，有兴趣的朋友可以回复订阅更新</strong></p>
<h2 id="articleHeader1">关于</h2>
<p>应该是在 2013 年我还在天猫的时候，在一次团队会议中 Teamleader 邀请了来自 Facebook 的前端工程师来分享他们的开发栈，其中就有提到 React，当说到它有自己的独特语法的时候（JSX 语法），我对此不屑一顾，认为这样的前端框架只会昙花一现，顶多能够在 Facebook 内部流行起来。 但是到目前为止，React 的发展令我瞠目结舌，俨然已成为前端开发栈中的主角。</p>
<p>当我真正深入了解并在业务中使用 React 的时候，才意识到 React 是多么不可思议。 在 React 出现以前我们讨论过 MVC，MVVM，Web Component，这些模式不乏有很多出众的框架，但当我们了解了 React 的设计过后，会发现 React 回到了前端界面开发的本质 <strong>数据和 UI 的结合表达</strong>。 React 的设计可以简单理解为 <strong>组件的组合模式和数据的单向流动</strong>，正是这种极简的架构设计才能成为构建大型前端应用的基石。</p>
<p>虽然现在网上有很多关于 React 的书籍，课程等，但是总体看下来有以下的一些问题。</p>
<ol>
<li><p>内容主要是针对初级阶段的 React 学习者</p></li>
<li><p>没有系统性介绍 React ，某些部分只是蜻蜓点水</p></li>
<li><p>缺乏真实业务开发的实战介绍</p></li>
</ol>
<p>所以打算写一本电子关于 React 的电子书，以及 React 教学课程， 这本书的特点是：</p>
<ol>
<li><p>针对初级阶段的读者会系统性 step by step 的讲解 React 的基础知识</p></li>
<li><p>系统性的介绍 React 开发生态中的技术</p></li>
<li><p>有针对性的介绍 React 的特定主题，如数据可视化，自定义 Renderer, virtual DOM, 编辑器</p></li>
<li><p>真实业务开发需要的资源或者组件的介绍</p></li>
<li><p>实例代码和理论结合讲解</p></li>
<li><p>针对部分章节配套视频讲解</p></li>
</ol>
<p>简单而言，本书的目标：</p>
<blockquote><p>The Best React Book For React Beginners And Professionals</p></blockquote>
<h2 id="articleHeader2">本书内容</h2>
<p>这本书我会由简单到复杂的带领大家进入 React 的世界， 其中 1 - 3 章节都是 React 的基础知识，需要提醒读者的是大多数的基础知识都可以通过 React 的官方文档学习，如果对英语敏感的读者也可以看翻译。 对比官方文档本书 1 - 3 章会循序渐进的带领大家学习 React 基础知识，其中会有些自己的见解和领悟希望能让读者更容易理解学习，每个章节都会有一个实例作业，所以读者可以同时结合官方文档和本书进行学习。</p>
<blockquote><p>有 React 基础的读者可以跳过 1 - 3 章节 ， 后面的章节都是独立的，可以打乱顺序挑选阅读</p></blockquote>
<p>文章的样例代码都在放在 <a href="https://github.com/leanklass/leanreact/" rel="nofollow noreferrer" target="_blank">https://github.com/leanklass/leanreact/</a> 的不同分支上，可以直接 checkout 分支按照 README 的指示运行。</p>
<h3 id="articleHeader3">第一章：React 入门</h3>
<p>本章会带领大家重 0 到 1 入门 React，会涉及到 React 背景和应用范围的介绍。 然后会介绍 React 的基础知识，包括 JSX 语法和 React 组件，Flux 模式介绍等。</p>
<ul>
<li><p>1.1 <a href="https://segmentfault.com/a/1190000005140569">React 介绍</a></p></li>
<li><p>1.2 <a href="https://segmentfault.com/a/1190000005145610" target="_blank">JSX 语法</a></p></li>
<li><p>1.3 <a href="https://segmentfault.com/a/1190000005151182">React 组件</a></p></li>
<li><p>1.4 <a href="https://segmentfault.com/a/1190000005161417" target="_blank">React 组件生命周期和方法</a></p></li>
<li><p>1.5 <a href="https://segmentfault.com/a/1190000005182270">React 与 DOM</a></p></li>
<li><p>1.6 <a href="https://segmentfault.com/a/1190000005348206" target="_blank">Flux</a></p></li>
</ul>
<h3 id="articleHeader4">第二章：React 工程化</h3>
<p>前面一章我们已经熟悉了 React 的基础，能够掌握通过 JSX 和 React 的思维来完成业务应用，但是真正的前端项目构建不仅仅是业务代码本身，我们需要搭建一整套完整的前端开发流程，也就是前端工程化。在本章中将会讲解前端工程化相关的知识，并通过 gulp，webpack 等工具搭建出一套完整的 React 前端开发环境。</p>
<ul>
<li><p>2.1 <a href="https://segmentfault.com/a/1190000005594760">前端工程化概述</a></p></li>
<li><p>2.2 <a href="https://segmentfault.com/a/1190000005612506" target="_blank">Webpack</a></p></li>
<li><p>2.3 <a href="https://segmentfault.com/a/1190000005636680">Gulp</a></p></li>
<li><p>2.4 <a href="https://segmentfault.com/a/1190000005657651" target="_blank">webpack + gulp 构建完整前端工作流</a></p></li>
<li><p>2.5 <a href="https://segmentfault.com/a/1190000005666159">Webpack 进阶</a></p></li>
</ul>
<h3 id="articleHeader5">第三章：React 与 Redux</h3>
<p>Redux 是目前 flux 模式最流行的实现，本章节会带领大家了解 Redux 的设计概念， 阅读 Redux 的源码，以及通过实例应用讲解 Redux + React 的开发模式。</p>
<ul>
<li><p>3.1 <a href="https://segmentfault.com/a/1190000005696767" target="_blank">redux 介绍</a></p></li>
<li><p>3.2 <a href="https://segmentfault.com/a/1190000005758244">react-redux todoApp</a></p></li>
<li><p>3.3 <a href="https://segmentfault.com/a/1190000005766289" target="_blank">理解 redux 中间件</a></p></li>
<li><p>3.4 <a href="https://segmentfault.com/a/1190000005773725">掌控 redux 异步</a></p></li>
<li><p>3.5 <a href="https://segmentfault.com/a/1190000005776381" target="_blank">compose redux sagas</a></p></li>
</ul>
<h3 id="articleHeader6">第四章：React 进阶</h3>
<p>我们已经能基于 React 实现基本的交互逻辑，但是在使用 React 的过程中还是可能会有些不确定的地方或者一些特殊的功能不知道怎么实现，可能会问 React 中有没有一些 Best practices 或者 Good Pattern 可以参考的，本章会在各个维度介绍之前没有讲过的 React 特性。</p>
<ul>
<li><p>4.1 <a href="https://segmentfault.com/a/1190000005825618">react 代码规范</a></p></li>
<li><p>4.2 <a href="https://segmentfault.com/a/1190000005838634" target="_blank">react patterns</a></p></li>
<li><p>4.3 react magics and tricks</p></li>
<li><p>4.4 react 动画</p></li>
<li><p>4.5 不可变数据与 React</p></li>
<li><p>4.6 性能管理</p></li>
</ul>
<h3 id="articleHeader7">第五章：React 实战业务开发</h3>
<p>真实业务开发中会遇到很多很多的问题，本章会把大多数在真实业务开发中遇到的场景进行讲解，涉及到如具体组件的开发，表单处理，后台交互等具体开发场景问题。</p>
<h3 id="articleHeader8">第六章：React 与 服务端渲染</h3>
<p>React 除了可以在浏览器端渲染以外， 还可以在服务器端渲染 HTML， 本章节会实现一个 基于 express + React 模板渲染器，通过这个渲染器渲染第一章的 HTML。</p>
<h3 id="articleHeader9">第七章：React 与 数据可视化</h3>
<p>数据可视化的需求日益增加，React 同样可以胜任数据可视化的工作，本章节会带领大家通过 React 实现一些基本的图表，讲解 React 和 D3.js 如何协作。</p>
<h3 id="articleHeader10">第八章：React 内部实现</h3>
<p>当深入的学习和使用过 React 后， 一定会对 React 的内部运作机制好奇，本章节会部分介绍 React 内部的一些核心工作机制， 包括 Virtual DOM 算法， 生命周期内部运作方式。</p>
<h3 id="articleHeader11">第九章：React 自定义 Renderer</h3>
<p>React 独特的地方在于， virtual dom 这种组件的组合模式可以应用于很多地方， 除了 ReactDOM 渲染器实现外，我们可以实现一个自己的渲染器， 比如 D3 渲染器， PIXI.JS 渲染器， Three.js 渲染器。</p>
<h3 id="articleHeader12">扩展：React 资源</h3>
<h3 id="articleHeader13">扩展*: 各种 React 组件实现</h3>
<h3 id="articleHeader14">扩展*：各种应用源码分析</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精益 React 学习指南 （Lean React）序

## 原文链接
[https://segmentfault.com/a/1190000005136764](https://segmentfault.com/a/1190000005136764)


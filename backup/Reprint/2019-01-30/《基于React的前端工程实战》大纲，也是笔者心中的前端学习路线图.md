---
title: '《基于React的前端工程实战》大纲，也是笔者心中的前端学习路线图' 
date: 2019-01-30 2:30:23
hidden: true
slug: n0ipwrblbx
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文从属于笔者的<a href="https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices" rel="nofollow noreferrer" target="_blank">Web 前端入门与最佳实践</a>。</p></blockquote>
<p>前几日偶然接到某出版社编辑大大的私信，邀约看看能否整理出版一本前端方面的书籍，笔者再三确定即使一本卖不出去（虽然自己肯定会买至少一本，或者多买些屯着代替那啥）也不会被打死之后着手准备大纲具体的章节。笔者还是很惶恐的，毕竟自己的水自己知道。本文是为书准备的大纲，不过也是笔者心目中的现代前端开发者学习路线图，即使最终无法出版笔者也会默默整理出来，希望能帮助到些许童鞋。</p>
<p>不过既然有那么些概率出版，也很欢迎所有大大给予指教，对于章节内容的选择，章节目录的顺序，大家觉得还想聊聊的内容都可以欢迎留言或者邮箱：384924552<a href="/u/qq">@qq</a> .com。本文的永久地址为:<a href="https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/React-And-Frontend-Engineering.md" rel="nofollow noreferrer" target="_blank">基于React的前端工程实战大纲，也是笔者心中的前端学习路线图</a>。另外笔者前几日收到某个跨年演讲邀请，虽然这几天为了毕业论文和项目被虐出翔没准备，还是欢迎有兴趣的搬个板凳瞅瞅，我给大家讲段子。<br><span class="img-wrap"><img data-src="/img/remote/1460000007730443?w=591&amp;h=960" src="https://static.alili.tech/img/remote/1460000007730443?w=591&amp;h=960" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader0">前言</h1>
<p>本书囊括了笔者五年来在前端工程领域的实践总结，笔者希望对于不同等级的开发者都能有所收获。本书最核心的目标:</p>
<ul>
<li><p>希望对于没有经验的开发者能够在本书选定的最短路径上快速成为一名合格的现代前端开发者。每一小节都会讲解最基础的语法或者使用要点，但是不会长篇大论地介绍语法细节这些应该查看文档的内容。通过简单的示例快速上手之后，笔者会介绍很多工程当中的具体实践。可能刚入门的开发者并不能理解这些实践的意义或者价值，但是首先保证能用，而后在自己的实践中慢慢回味，逐渐明了。</p></li>
<li><p>而对于有一定前端开发经验的开发者，本书能够帮你梳理现代纷繁复杂的前端开发状况，探寻百花齐放的工具库背后蕴藏的设计理念与编程范式，最终融会贯通，形成自己的前端工程化思想与体系。</p></li>
</ul>
<p>本书最大的优势在于形成了完整的知识体系结构，让你合理归纳自己学到的知识，将知识放在它该在的地方。另外笔者想强调的是，无论React还是Vue或者Angular2都是非常优秀的前端框架，使用哪个框架还是属于术的范畴。本书虽然立足于React，但是其中蕴含的设计模式与工程架构可以通用于任何框架。笔者也着力于不希望受到某个具体框架的太多的束缚，毕竟在这个日新月异的前端世界，说不准哪天就落于人后了。</p>
<h1 id="articleHeader1">序</h1>
<h1 id="articleHeader2">第一部分 初窥门径，看山是山</h1>
<h1 id="articleHeader3">前端基础</h1>
<h2 id="articleHeader4">Hyper Text Markup Language</h2>
<h3 id="articleHeader5">HTML语法基础</h3>
<h3 id="articleHeader6">Semantic HTML</h3>
<h3 id="articleHeader7">H5</h3>
<h2 id="articleHeader8">CSS</h2>
<h3 id="articleHeader9">CSS 语法基础</h3>
<h3 id="articleHeader10">盒模型</h3>
<h3 id="articleHeader11">基于Flexbox的网格布局</h3>
<h3 id="articleHeader12">SCSS</h3>
<h3 id="articleHeader13">CSS 工程实践</h3>
<h2 id="articleHeader14">JavaScript</h2>
<h3 id="articleHeader15">JavaScript 语法基础</h3>
<p>本章节对于JavaScript语法基础进行简单介绍，涉及JavaScript/ECMAScript语言的衍化过程，基本的变量定义，变量赋值，变量作用域，常见类型与格式的判断以及转换。</p>
<h3 id="articleHeader16">JavaScript 数据结构</h3>
<p>本章节包含对于基本数值类型、字符串类型、时间与日期类型、数组类型的操作与解释。</p>
<h3 id="articleHeader17">JavaScript 控制流</h3>
<h3 id="articleHeader18">JavaScript 函数</h3>
<h3 id="articleHeader19">JavaScript 类与对象</h3>
<p>本部分包含对于JavaScript 中Class的使用以及常见的单例模式的编写介绍。</p>
<h2 id="articleHeader20">DOM</h2>
<h3 id="articleHeader21">元素选择与操作</h3>
<h3 id="articleHeader22">事件响应</h3>
<h3 id="articleHeader23">Ajax</h3>
<h3 id="articleHeader24">客户端存储</h3>
<h2 id="articleHeader25">简单的网页设计规范</h2>
<p>本部分会以一步一步来美化网站为例将上述学到的HTML、CSS与JavaScript的知识加以应用。</p>
<h1 id="articleHeader26">常用的前端工具库</h1>
<h2 id="articleHeader27">jQuery</h2>
<h3 id="articleHeader28">jQuery 基础</h3>
<h3 id="articleHeader29">jQuery 小窍门</h3>
<h3 id="articleHeader30">jQuery Plugins</h3>
<h3 id="articleHeader31">你并不需要jQuery</h3>
<h2 id="articleHeader32">Lodash</h2>
<h3 id="articleHeader33">Lodash 基础</h3>
<h3 id="articleHeader34">你并不需要Lodash</h3>
<h2 id="articleHeader35">Pattern Library</h2>
<h3 id="articleHeader36">jQuery UI</h3>
<h3 id="articleHeader37">BootStrap</h3>
<h1 id="articleHeader38">Webpack</h1>
<h2 id="articleHeader39">Webpack语法基础</h2>
<h2 id="articleHeader40">常用的Webpack插件</h2>
<h2 id="articleHeader41">Webpack 代码分割</h2>
<h2 id="articleHeader42">Webpack</h2>
<h1 id="articleHeader43">第三章 React 初探</h1>
<h2 id="articleHeader44">数据流驱动的页面</h2>
<p>本部分主要介绍React设计思想，从命令式编程到声明式编程的变化，及以jQuery与React实现相同功能的例子对比。</p>
<h2 id="articleHeader45">搭建你的脚手架</h2>
<h3 id="articleHeader46">create-react-app</h3>
<h3 id="articleHeader47">基于Webpack2的完整脚手架介绍</h3>
<h2 id="articleHeader48">React组件</h2>
<h3 id="articleHeader49">组件声明</h3>
<h3 id="articleHeader50">组件生命周期</h3>
<h3 id="articleHeader51">组件样式</h3>
<h2 id="articleHeader52">React 事件交互</h2>
<h3 id="articleHeader53">React 事件绑定与处理</h3>
<h3 id="articleHeader54">React 拖拽</h3>
<h2 id="articleHeader55">第五节 React Router</h2>
<h2 id="articleHeader56">第六节 React 动画</h2>
<h1 id="articleHeader57">第三章 React 技术栈</h1>
<h2 id="articleHeader58">Redux</h2>
<h3 id="articleHeader59">Flux</h3>
<h3 id="articleHeader60">Redux设计思想</h3>
<h3 id="articleHeader61">简单的Redux实例</h3>
<h2 id="articleHeader62">MobX</h2>
<h3 id="articleHeader63">MobX 设计思想</h3>
<h3 id="articleHeader64">Observable</h3>
<h3 id="articleHeader65">简单的MobX实例</h3>
<h1 id="articleHeader66">第二部分 登堂入室，看山不是山</h1>
<h1 id="articleHeader67">第五章 深入JavaScript工程实践</h1>
<h2 id="articleHeader68">基于Flow 的 JavaScript 类型检查</h2>
<h2 id="articleHeader69">JavaScript 函数式编程</h2>
<h2 id="articleHeader70">JavaScript 异步编程</h2>
<h3 id="articleHeader71">Promise</h3>
<h3 id="articleHeader72">Generator</h3>
<h3 id="articleHeader73">Async/Await</h3>
<h2 id="articleHeader74">JavaScript 面向对象</h2>
<h3 id="articleHeader75">琢磨不透的this</h3>
<h3 id="articleHeader76">原型链与继承</h3>
<h3 id="articleHeader77">JavaScript 类的几种实现方式</h3>
<h2 id="articleHeader78">JavaScript 数据绑定</h2>
<h3 id="articleHeader79">脏检测</h3>
<h3 id="articleHeader80">ES6 Proxy</h3>
<h2 id="articleHeader81">JavaScript 性能优化与样式规范</h2>
<h3 id="articleHeader82">变量</h3>
<h3 id="articleHeader83">数据类型</h3>
<h3 id="articleHeader84">函数</h3>
<h1 id="articleHeader85">React工程实践</h1>
<h2 id="articleHeader86">React 设计模式与样式指南</h2>
<h3 id="articleHeader87">High-Order Component</h3>
<h3 id="articleHeader88">Stateless Functional Component</h3>
<h3 id="articleHeader89">Pretty Component</h3>
<h2 id="articleHeader90">React 性能优化</h2>
<h2 id="articleHeader91">React 组件测试</h2>
<h3 id="articleHeader92">Jest</h3>
<h3 id="articleHeader93">Enzyme</h3>
<h2 id="articleHeader94">第五节 React 打包发布</h2>
<h3 id="articleHeader95">包体压缩</h3>
<h3 id="articleHeader96">避免XSS漏洞</h3>
<h2 id="articleHeader97">基于React的Pattern Library</h2>
<h3 id="articleHeader98">Material UI</h3>
<h3 id="articleHeader99">antd</h3>
<h1 id="articleHeader100">第五章 深入React内部原理</h1>
<h2 id="articleHeader101">简单的Virtual DOM实现</h2>
<h2 id="articleHeader102">React Diff算法</h2>
<h2 id="articleHeader103">React setState</h2>
<h2 id="articleHeader104">React Fiber</h2>
<h2 id="articleHeader105">Virtual DOM Alternatives</h2>
<h1 id="articleHeader106">前端状态管理</h1>
<h2 id="articleHeader107">Redux的得与失</h2>
<h2 id="articleHeader108">渐进的前端状态管理</h2>
<h2 id="articleHeader109">常见的状态管理模式</h2>
<h2 id="articleHeader110">合理的状态设置</h2>
<h1 id="articleHeader111">第七章 前端性能优化</h1>
<h2 id="articleHeader112">浏览器渲染原理</h2>
<h2 id="articleHeader113">前端性能评测</h2>
<h2 id="articleHeader114">资源加载</h2>
<h2 id="articleHeader115">首页与关键路径</h2>
<h2 id="articleHeader116">渲染策略</h2>
<h1 id="articleHeader117">第八章 前端质量保障</h1>
<h1 id="articleHeader118">NodeJS</h1>
<h2 id="articleHeader119">NodeJS 初窥</h2>
<h2 id="articleHeader120">常用NodeJS框架</h2>
<h3 id="articleHeader121">Express</h3>
<h3 id="articleHeader122">Koa</h3>
<h2 id="articleHeader123">服务端渲染</h2>
<h2 id="articleHeader124">Electron</h2>
<h1 id="articleHeader125">移动开发</h1>
<h2 id="articleHeader126">Mobile First</h2>
<h2 id="articleHeader127">React Native</h2>
<h2 id="articleHeader128">微信小程序</h2>
<h1 id="articleHeader129">第三部分 融会贯通，看山还是山</h1>
<h1 id="articleHeader130">GUI应用程序架构变迁</h1>
<h2 id="articleHeader131">MVC</h2>
<h2 id="articleHeader132">MVP&amp;MVVM</h2>
<h2 id="articleHeader133">Flux Unidirectional Data Flow</h2>
<h1 id="articleHeader134">REST 表现层状态转化</h1>
<h2 id="articleHeader135">HTTP</h2>
<h3 id="articleHeader136">HTTP 协议基础</h3>
<h3 id="articleHeader137">HTTP 请求与响应</h3>
<h3 id="articleHeader138">HTTP 缓存</h3>
<h2 id="articleHeader139">RESTful API</h2>
<h2 id="articleHeader140">RESTful API 最佳实践</h2>
<h2 id="articleHeader141">REST的不足与GraphQL</h2>
<h1 id="articleHeader142">第三章 前端工程化</h1>
<h2 id="articleHeader143">前后端分离与全栈</h2>
<h2 id="articleHeader144">合理的使用工具</h2>
<h2 id="articleHeader145">渐进式的工程架构</h2>
<h2 id="articleHeader146">组件化与Web Components</h2>
<h2 id="articleHeader147">模块系统</h2>
<h2 id="articleHeader148">微服务与微前端</h2>
<h1 id="articleHeader149">数据可视化</h1>
<h2 id="articleHeader150">数据可视化范式</h2>
<h2 id="articleHeader151">常见的数据可视化库</h2>
<h3 id="articleHeader152">ECharts</h3>
<h3 id="articleHeader153">D3.js</h3>
<h1 id="articleHeader154">Web 安全基础</h1>
<h1 id="articleHeader155">第七章 Web的未来</h1>
<h2 id="articleHeader156">WebAssembly</h2>
<h2 id="articleHeader157">WebVR</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《基于React的前端工程实战》大纲，也是笔者心中的前端学习路线图

## 原文链接
[https://segmentfault.com/a/1190000007730440](https://segmentfault.com/a/1190000007730440)


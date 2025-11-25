---
title: '如何设计 Web App 应用架构？「两分钟了解 IOING」' 
date: 2018-12-30 2:30:10
hidden: true
slug: oet8obncgoc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">IOING 在做些什么？</h2>
<p>IOING 在你的代码和浏览器之间架设了一个中间解释层，该解释层提供了一套新的语法来填补浏览器所不具备的能力。</p>
<h2 id="articleHeader1">SPA 开发痛点</h2>
<p>开发一个 SPA 应用的痛点是不同模块页面的状态保存，当从一个页面跳转到另一个页面的时候窗口的所有状态都将被清空重载，历史页面与当前页面将不产生任何联系，这个过程是一个拆毁重建的过程，如果你要回到历史同样只能再次拆毁重建，并且在这个过程中不可避免的出现加载期的窗口白屏，显然这样的丑陋效果不符合一个高贵 App 的设定，但正因这种方式前后页面不共存的简单特性也使得开发逻辑变得简单，开发者只需考虑单个页面的逻辑即可，而每一次新页面的加载都能将之前页面进行完全释放，完全不需要担心高耦合和内存无法完全释放的问题，这也算是传统技术的优点，虽然简单粗暴，但是它很管用。那到底有没有两全其美的办法呢？</p>
<h2 id="articleHeader2">传统模式带来的挑战</h2>
<p>和 SPA 应用不同的是多页面应用往往相对要变得简单，页面与页面之间不需要有复杂的数据交换，也无需保存页面历史状态，因此使用传统技术最适合不过了。</p>
<p>而 SPA 应用则要协调页面间的关系，它的每一个模块都可能是联动的，而且需要保持窗口的数据状态，因而催生了另一个技术的流行，即通过使用 Ajax 和模版将新模块内容载入到当前页面，但这也导致新载入模块的脚本和 DOM 树内容在主文档下不断堆积，且在不需要时也无法将其很好移除和释放（比如 setTimeout 等僵尸事件）。另一种情况是一旦其中一个模块发生错误将很有可能导致整个 SPA 应用崩溃。</p>
<p>除了高耦合问题外，Ajax 每次载入大量的 DOM 结构到主 DOM Tree 下时都将可能会导致这个庞大的 DOM Tree 进行 reflow(回流) 和 repaint(重绘)，从而影响整体运行效率</p>
<h2 id="articleHeader3">实现方案分析</h2>
<p>基于上述分析，我们要得到一个稳定的 SPA 应用时必须改造浏览器使其支持以下特性：</p>
<ol>
<li>为保证应用松耦合，浏览器必须具备能够使新加载的模块与已加载模块不产生相互干扰的能力。</li>
<li>为使浏览器载入大量模块时不会造成内存占用过高，浏览器应能使被移除后的模块能被完全释放。</li>
<li>浏览器应使模块运行在独立空间中，以保证模块自身错误时不至于导致整个应用停止工作。</li>
</ol>
<p>只有具备了这些特性时才能保证一个大型 WEB 应用的稳定运行，那么对于上述问题 IOING 是怎么处理的呢？</p>
<p>首先为了保证模块的代码错误不至于影响整个应用的运行，我们需要保证除引擎外的所有不可控脚本都不能运行在主 window 下，而模块脚本自需要运行在单独的沙盒中。</p>
<h2 id="articleHeader4">什么是沙盒模块？</h2>
<p>沙盒（Sandbox）简单来讲就是: &lt;iframe src="_blank" sandbox="..."&gt;&lt;/iframe&gt;<br>无需解释大家也就都懂了，但是很多人在看到 iframe 时就开始各种担心起来，联想起各种文章对 iframe 的负面描述。这里需要解释一下，iframe 直接作为嵌入网页使用时确实会占用当前页面连接池，但其在引擎中其主要目的是作为沙盒使用而并不是为了嵌入网页使用的，当引擎将编译好内容时会先主动创建一个空 iframe，然后直接将编译内容直接丢入其中，注意 iframe 的 src="_blank"，这是一个空页面，该情况下 iframe 并不会共享主窗口连接池。</p>
<p>我们设想一下这样一个场景：你在浏览器打开多个窗口分别载入不同的模块页面，然后在你需要打开其他页面时能通过自定义动画使浏览器窗口进行动画过渡将页面展示，当你返回时也能通过反向动画再将之前窗口内容过渡回来，如果浏览器支持这些或许 webApp 看起来将更酷，但现实是浏览器并没有这样的操作?‍♂️。</p>
<p>而这个设想可以通过沙盒来实现，在沙盒中的页面就像新开一个浏览器窗口那样，能够很好的隔离模块的 DOM 元素和变量，也能保存页面状态，并能通过动画控制其转场。</p>
<p>沙盒虽然很稳妥，但其过于独立，这导致模块内元素不能突破沙盒限制显示在模块外区域，比如说一些复合型模块（即嵌入主模块中的模块，沙盒一般适用与独立的全屏模块），当你有这个需求时沙盒特性则不能满足你，此时你应该支持另一种模块运行方式：shadowbox 应运而生。</p>
<h2 id="articleHeader5">shadowbox</h2>
<p>使用 shadowbox 配置的模块，其模块内容将以一颗新 DOM Tree 插入到主 DOM Tree 中（即 shadowdom 方式），这颗新 DOM Tree 中的 CSS样式 和 元素id 将不会和外部元素耦合，而此时模块的 js 文件则依旧在其沙盒中运行。（若运行浏览器不支持该特性时应自动降级处理）</p>
<h2 id="articleHeader6">后续</h2>
<p>当然只有一个沙盒模型是远远不够的，比如组件同样需要一套合理运作机制。之后「两分钟了解IOING」将会继续推出以下话题：</p>
<ol>
<li>组件设计与通信</li>
<li>模块刷新机制</li>
<li>量子 DOM 原理（和 Def 算法不同的数据双向绑定设计）</li>
<li>CSS 引擎的设计思想</li>
</ol>
<p>更多敬请期待...</p>
<h2 id="articleHeader7">往期话题</h2>
<p><a href="https://segmentfault.com/a/1190000011243084?_ea=2588940">IOING在开发SPA大型应用时有哪些必要的技术条件？</a><br><a href="https://segmentfault.com/a/1190000010693229" target="_blank">如何用 js 获取虚拟键盘高度？（适用所有平台）</a><br><a href="https://segmentfault.com/a/1190000010637511">让 CSS 完成背景图加载完毕后显示 之 解析 IOING 的 onload url 原理</a></p>
<h2 id="articleHeader8">IOING 主要特点图示</h2>
<p>IOING 是一款高性能的前端开发引擎。它为创建一个大型应用提供一整套的完备方案，如页面模块化拆分、层级路由控制、可编程CSS、热拔插组件、双向数据绑定、DOM语法扩展、自动兼容处理等</p>
<p><span class="img-wrap"><img data-src="/img/bVVJyA?w=1598&amp;h=2606" src="https://static.alili.tech/img/bVVJyA?w=1598&amp;h=2606" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader9">联系</h2>
<p>扫码二维码关注我的公众号：<br><span class="img-wrap"><img data-src="/img/bVSN8m?w=430&amp;h=430" src="https://static.alili.tech/img/bVSN8m?w=430&amp;h=430" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader10">资源</h2>
<p><a href="http://ioing.com/#!demo/app-ios!/" rel="nofollow noreferrer" target="_blank">传送门：IOING 仿ios界面</a></p>
<p><a href="http://ioing.com" rel="nofollow noreferrer" target="_blank">传送门：官网</a></p>
<p><a href="https://github.com/ioing/IOING" rel="nofollow noreferrer" target="_blank">传送门：Github 项目地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何设计 Web App 应用架构？「两分钟了解 IOING」

## 原文链接
[https://segmentfault.com/a/1190000011337535](https://segmentfault.com/a/1190000011337535)


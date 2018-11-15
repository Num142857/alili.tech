---
title: BLUI：创建游戏 UI 的简单方法
reprint: true
categories: reprint
abbrlink: 6adc68c9
date: 2018-10-20 00:00:00
---

{{% raw %}}

            <h1><a href="#blui创建游戏-ui-的简单方法"></a>BLUI：创建游戏 UI 的简单方法</h1>
<blockquote>
<p>开源游戏开发插件运行虚幻引擎的用户使用基于 Web 的编程方式创建独特的用户界面元素。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/242d3e933fdfc4cdff79f70e173363c4f77430ba/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f67616d696e675f706c7567696e5f626c75695f73637265656e73686f742e6a70673f69746f6b3d39316e6e5943745f"><img src="https://p0.ssl.qhimg.com/t01f1c1b519db02bddd.jpg" alt=""></a></p>
<p>游戏开发引擎在过去几年中变得越来越易于​​使用。像 Unity 这样一直免费使用的引擎，以及最近从基于订阅的服务切换到免费服务的虚幻引擎Unreal Engine，允许独立开发者使用 AAA 发行商相同达到行业标准的工具。虽然这些引擎都不是开源的，但每个引擎都能够促进其周围的开源生态系统的发展。</p>
<p>这些引擎中可以包含插件以允许开发人员通过添加特定程序来增强引擎的基本功能。这些程序的范围可以从简单的资源包到更复杂的事物，如人工智能 （AI） 集成。这些插件来自不同的创作者。有些是由引擎开发工作室和有些是个人提供的。后者中的很多是开源插件。</p>
<h3><a href="#什么是-blui"></a>什么是 BLUI？</h3>
<p>作为独立游戏开发工作室的一员，我体验到了在专有游戏引擎上使用开源插件的好处。Aaron Shea 开发的一个开源插件 <a href="https://github.com/AaronShea/BLUI">BLUI</a> 对我们团队的开发过程起到了重要作用。它允许我们使用基于 Web 的编程（如 HTML/CSS 和 JavaScript）创建用户界面 （UI） 组件。尽管虚幻引擎Unreal Engine（我们选择的引擎）有一个实现了类似目的的内置 UI 编辑器，我们也选择使用这个开源插件。我们选择使用开源替代品有三个主要原因：它们的可访问性、易于实现以及伴随的开源程序活跃的、支持性好的在线社区。</p>
<p>在虚幻引擎的最早版本中，我们在游戏中创建 UI 的唯一方法是通过引擎的原生 UI 集成，使用 Autodesk 的 Scaleform 程序，或通过在虚幻社区中传播的一些选定的基于订阅的虚幻引擎集成。在这些情况下，这些解决方案要么不能为独立开发者提供有竞争力的 UI 解决方案，对于小型团队来说太昂贵，要么只能为大型团队和 AAA 开发者提供。</p>
<p>在商业产品和虚幻引擎的原生整合失败后，我们向独立社区寻求解决方案。我们在那里发现了 BLUI。它不仅与虚幻引擎无缝集成，而且还保持了一个强大且活跃的社区，经常推出更新并确保独立开发人员可以轻松访问文档。BLUI 使开发人员能够将 HTML 文件导入虚幻引擎，并在程序内部对其进行编程。这使得通过 web 语言创建的 UI 能够集成到游戏的代码、资源和其他元素中，并拥有所有 HTML、CSS、Javascript 和其他网络语言的能力。它还为开源 <a href="https://bitbucket.org/chromiumembedded/cef">Chromium Embedded Framework</a> 提供全面支持。</p>
<h3><a href="#安装和使用-blui"></a>安装和使用 BLUI</h3>
<p>使用 BLUI 的基本过程包括首先通过 HTML 创建 UI。开发人员可以使用任何工具来实现此目的，包括自举bootstrapped JavaScript 代码、外部 API 或任何数据库代码。一旦这个 HTML 页面完成，你可以像安装任何虚幻引擎插件那样安装它，并加载或创建一个项目。项目加载后，你可以将 BLUI 函数放在虚幻引擎 UI 图纸中的任何位置，或者通过 C++ 进行硬编码。开发人员可以通过其 HTML 页面调用函数，或使用 BLUI 的内部函数轻松更改变量。</p>
<p><a href="https://camo.githubusercontent.com/42c6e8468e0c0339e72e3c3431bea48c907d9a9c/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f75706c6f6164732f626c75695f67616d696e675f706c7567696e2d696e746567726174696e67626c75692e706e67"><img src="https://p0.ssl.qhimg.com/t01de5f11143a6b322d.png" alt="Integrating BLUI into Unreal Engine 4 blueprints" title="Integrating BLUI into Unreal Engine 4 blueprints"></a></p>
<p><em>将 BLUI 集成到虚幻 4 图纸中。</em></p>
<p>在我们当前的项目中，我们使用 BLUI 将 UI 元素与游戏中的音轨同步，为游戏机制的节奏方面提供视觉反馈。将定制引擎编程与 BLUI 插件集成很容易。</p>
<p><a href="https://camo.githubusercontent.com/de7243f0ca8353b38b809b53e847860203595c58/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f75706c6f6164732f626c75695f67616d696e675f706c7567696e2d73796e6375692e706e67"><img src="https://p0.ssl.qhimg.com/t012d602412a366bd71.png" alt="Using BLUI to sync UI elements with the soundtrack." title="Using BLUI to sync UI elements with the soundtrack."></a></p>
<p><em>使用 BLUI 将 UI 元素与音轨同步。</em></p>
<p>通过 BLUI GitHub 页面上的<a href="https://github.com/AaronShea/BLUI/wiki">文档</a>，将 BLUI 集成到虚幻 4 中是一个轻松的过程。还有一个由支持虚幻引擎开发人员组成的<a href="https://forums.unrealengine.com/community/released-projects/29036-blui-open-source-html5-js-css-hud-ui">论坛</a>，他们乐于询问和回答关于插件以及实现该工具时出现的任何问题。</p>
<h3><a href="#开源优势"></a>开源优势</h3>
<p>开源插件可以在专有游戏引擎的范围内扩展创意。他们继续降低进入游戏开发的障碍，并且可以产生前所未有的游戏内的机制和资源。随着对专有游戏开发引擎的访问持续增长，开源插件社区将变得更加重要。不断增长的创造力必将超过专有软件，开源代码将会填补这些空白，并促进开发真正独特的游戏。而这种新颖性正是让独立游戏如此美好的原因！</p>
<hr>
<p>via: <a href="https://opensource.com/article/18/6/blui-game-development-plugin">https://opensource.com/article/18/6/blui-game-development-plugin</a></p>
<p>作者：<a href="https://opensource.com/users/uwikaiddi">Uwana lkaiddi</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/blui-an-easy-way-to-create-game-ui](https://www.zcfy.cc/article/blui-an-easy-way-to-create-game-ui)
原文标题: BLUI：创建游戏 UI 的简单方法
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

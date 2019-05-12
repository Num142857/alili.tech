---
title: '[译] 解密 Uber 数据部门的数据可视化最佳实践' 
date: 2019-02-10 2:30:42
hidden: true
slug: mt9816klql
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000006771644" src="https://static.alili.tech/img/remote/1460000006771644" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">概述</h1>
<p>在2015年初，我们在Uber规划了一个官方的数据科学团队。这个主意的缘起是：通过可视化数据探索工具从Uber的数据中发现洞见。每天，Uber 管理上亿级别的GPS位置信息。每分钟，我们的平台处理上百万的移动事件。每次我们不用技术分析就直观地知道这是一个我们错过了解我们业务的好机会。</p>
<p>自成立以来，这个数据可视化团队就不断发展壮大，从我和另外一个工程师两个人发展到了现在的15人的全栈团队。数据可视化技术专家囊括了从计算机图形学到信息设计、封面创意技术以及 Web 平台开发。我们团队专注于从视觉分析到地图绘制以及从框架开发到面向公众的数据可视化的整个过程。</p>
<p>让我们看看都做了哪些工作:</p>
<h1 id="articleHeader1">可视化分析:增强数据可操作性</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006771645?w=900&amp;h=563" src="https://static.alili.tech/img/remote/1460000006771645?w=900&amp;h=563" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>AB测试平台的表格和置信区间可视化</blockquote>
<p>可视化分析主要都是由抽象数据可视化组成的。这个涉及到可视化工作的数据是没有内在的地理结构。与之相反的是科学可视化，这种可视化从物理世界（地图、3D物理结构等等）的角度描述了数据。大多数有效的可视化分析在这种情况下都是关于报告、仪表盘、实时分析的图标和网络图。我们的团队在大多数商业洞见应用和商业数据探索上加强了可视化图层。其他地区的同事用我们的可视化工具加强了包括我们的AB测试平台和内部的大规模机器学习平台的可视化效果。</p>
<p>我们团队强调建设像我们创建这个应用类似的可复用组件。我们最近开源了<code>react-vis</code>，这是一个 React 和加强版的D3 可视化库，它提供了 基于JSX的语法，专用的语言来组织图表的坐标、图标类型以及其他一些可视化元素。它支持开发人员以声明的方式在他们的数据集用 React- 和 JSX-友好型的形式来塑造他们想的可视化效果。</p>
<p>在地图绘制上我们也在做类似的工作。</p>
<h1 id="articleHeader2">地图绘制：大数据探索</h1>
<p>基于地图的信息是我们在Uber最大最丰富的资产。然而，一方面，每天我们的平台实时采集上亿的GPS点。另一方面，我们必须在浏览器内实现数据密集可视化。这些都对实时地图可视化作出了极大挑战。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005154325" src="https://static.alili.tech/img/remote/1460000005154325" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>在给定半径区域内拖动鼠标将可以实时看到Uber的目的地分布情况</blockquote>
<p>我们为不同顾客量身定制多种地图应用。其中一类顾客是在Uber运营的400多个城市内的总经理和城市运营团队。这个普通人需要有一个当前供求分布的及时信息。他们也需要获取聚合数据来理解城市的市场以便于进一步的策划市场营销活动。另一类用户是数据科学团队，他们需要丰富的数据探索界面来操作多维数据（通过产品、时间、地理数据来向下钻取）。我们为其他团队构建可以分块和切片的应用以便于从数据中获得洞见。</p>
<p>对于这些应用，我们的技术栈是由一些我们之前开发并且开源的库构成的。react-map-gl 提供一个在MapboxGL基础上与React类似的图层。这个MapboxGL是一个我们在Uber广泛使用的从Mapbox引入的库。<code>deck.gl</code>提供了一个创建WebGL增强图层的应用，它可以放在地图的最上层或者独自用来创建一个抽象的数据可视层。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005154328" src="https://static.alili.tech/img/remote/1460000005154328" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>deck.gl 和 react-map-gl 提供了 WebGL 界面来创建数据密集型的地图应用</blockquote>
<p>但是所有这些技术都可以以一种创造性的方式被运用。数据可视化最重要的部分其实是数据故事叙述和数据艺术化呈现。</p>
<h1 id="articleHeader3">面向公众：讲述数据故事</h1>
<p>用数据可视化讲述Uber的故事的方法有很多种。我们可以围绕诸如安全、效率、流量、政策等话题在大众传播网络中展开可视化叙述。</p>
<p>最近，我们开始了一个探索uberPool是如何让城市交通变得更高效的数据可视化项目。在 Travis Kalanick 的TED演讲之后，你将看到我们制作的数据可视化显示每个没有使用uberPOOL的街区流量情况，这表明了 POOL可以通过减少流量让城市变得更加智能化。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005154329" src="https://static.alili.tech/img/remote/1460000005154329" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>左图： SF 在没有uberPOOL时交通拥堵的城区。右图：POOL用一种聪明的办法均衡了交通流量。</p>
<p>我们继续做一起其他的可视化叙述。这个工作范畴有趣的融合了数据作家和数据艺术化呈现所带来的挑战。数据处理和我们我们内部可视化探索的数据分析产品一样充满挑战。但是这时候，以人为本的美学设计和通俗易懂的解释性是比高效的信息设计技术来得更重要的。</p>
<p>例如，我们开始和设计团队协作。为了动态地图可以显示每天每辆车的Uber行程，我们拿到了品牌视频。这里的特效就是用WebGL应用为每一帧动效都在服务端渲染进行渲染然后编译到视频里形成的。这个应用关注从数据获取（通过Hive）到视频离线渲染输出技术的每一个环节。</p>
<p>一个身临其境的 3D 动画地图匿名展示了一整天的Uber之旅:</p>
<p><a href="https://www.youtube.com/watch?v=SwPdy3vEQ5I" rel="nofollow noreferrer" target="_blank">三藩市：</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005157098" src="https://static.alili.tech/img/remote/1460000005157098" alt="" title="" style="cursor: pointer;"></span></p>
<p><a href="https://www.youtube.com/watch?v=EwJzUhhxi98" rel="nofollow noreferrer" target="_blank">洛杉矶：</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005157097" src="https://static.alili.tech/img/remote/1460000005157097" alt="" title="" style="cursor: pointer;"></span></p>
<p>对于这样的工作我们也开发了一套叫做<code>luma.gl</code>的框架，这套框架专注于基于WebGL的可视化应用。它根据一些诸如ES6、WebGL 2.0、组件化平台的现代技术而设计。这使得<code>luma.gl</code>可以和其他诸如<code>stack.gl</code>那样的流行的库一起互操作。</p>
<h1 id="articleHeader4">想知道更多吗？</h1>
<p>在Uber，数据使我们最大的财富。我们用可视化探索数据分析工具通过数据来发现洞见，而且我们业务矩阵的数据探索也能够让我们Uber所有城市的管理者做出更加有效的商业决策。<br>如果你对和我们的Uber工程团队一起面对这些挑战感兴趣，你可以查看我们的数据可视化工程的开放职位列表，然后联系data-viz@uber.com。我们期待你的加入。</p>
<blockquote>原作者： NICOLAS GARCIA BELMONTE 译者：Harryzhu<br>英文原文地址：<a href="https://eng.uber.com/data-viz-intel/" rel="nofollow noreferrer" target="_blank">https://eng.uber.com/data-viz...</a><p>作为分享主义者(sharism)，本人所有互联网发布的图文均遵从CC版权，转载请保留作者信息并注明作者 Harry Zhu 的 FinanceR专栏:<a href="https://segmentfault.com/blog/harryprince">https://segmentfault.com/blog...</a>，如果涉及源代码请注明GitHub地址：<a href="https://github.com/harryprince" rel="nofollow noreferrer" target="_blank">https://github.com/harryprince</a>。微信号: harryzhustudio<br>商业使用请联系作者。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] 解密 Uber 数据部门的数据可视化最佳实践

## 原文链接
[https://segmentfault.com/a/1190000005154321](https://segmentfault.com/a/1190000005154321)


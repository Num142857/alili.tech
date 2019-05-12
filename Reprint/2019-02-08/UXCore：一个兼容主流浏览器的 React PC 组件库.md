---
title: 'UXCore：一个兼容主流浏览器的 React PC 组件库' 
date: 2019-02-08 2:30:40
hidden: true
slug: uoy07nhnrig
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="https://gw.alicdn.com/tps/TB1TVapKFXXXXbbXpXXXXXXXXXX-1000-500.png" src="https://static.alili.techhttps://gw.alicdn.com/tps/TB1TVapKFXXXXbbXpXXXXXXXXXX-1000-500.png" alt="图1 uxcore 概念图" title="图1 uxcore 概念图" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">0. 为什么我们需要 UXCore？</h2>
<p>UXCore 是一个基于 React 的 PC UI 套件库，兼容 IE8+。<a href="http://uxco.re/" rel="nofollow noreferrer" target="_blank">http://uxco.re/</a>  <br>阿里巴巴信息平台是负责整个阿里巴巴集团智能办公系统的团队，涉及非常多的企业业务系统，包括薪酬、人力、财务、行政、IT 等等，在这些系统中产生了大量的表格、表单和图表的交互场景，这里面有很多重复配置的地方，也有很多定制变化的地方，目前业界的这一方面还没有能够完全满足这一方面的解决方案，因此有了 UXCore。  <br>UXCore 要解决的核心问题，就是方便高效地产出表单、表格，同时提供足够强大的定制能力，使用户可以对组件的每一个渲染部分进行修改，从而满足各种不同种类的业务场景。  <br>为了实现核心的目标，我们和 UED 团队积极合作，充分收集业务场景和进行视觉优化，在这个过程我们产出了一系列的简单易用的基础组件，用于构建页面的其他部分。目前信息平台的新系统都在使用 UXCore 进行承载，我们也很愿意将我们已经成熟的解决方案分享出来，帮助更多的企业系统开发者解决他们开发上的痛苦，同时也寄希望于依靠社区的反馈，可以让 UXCore 走的更好。</p>
<h2 id="articleHeader1">1. UXCore 有哪些特性。</h2>
<h3 id="articleHeader2">1.1 丰富的组件</h3>
<p>超过 35 个常用基础组件用来构建你的系统业务，涵盖大部分常用功能</p>
<h3 id="articleHeader3">1.2 专注于企业应用</h3>
<p><span class="img-wrap"><img data-src="https://gw.alicdn.com/tps/TB1WB1bKFXXXXa2XVXXXXXXXXXX-1308-796.png" src="https://static.alili.techhttps://gw.alicdn.com/tps/TB1WB1bKFXXXXa2XVXXXXXXXXXX-1308-796.png" alt="图2 table 全家福/form 全家福" title="图2 table 全家福/form 全家福" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>图2：UXCore 致力于产出方便易用、功能强大且高度可定制的表单、表格、布局组件。'</p></blockquote>
<ul>
<li><p>表单内置 10 余种常用表单域可以直接使用。</p></li>
<li><p>表格除了基础功能外，还支持折叠展开二级面板、树形结构、行内编辑等复杂场景。</p></li>
<li><p>布局支持传统的左右自适应布局和栅格布局，轻松搞定页面排版。</p></li>
<li><p>除了内置的功能外，表单、表格还有一套简易地定制体系，随时可以在业务中为组件注入更强大的力量。</p></li>
</ul>
<h3 id="articleHeader4">1.3 全面的国际化支持</h3>
<p>所有组件的内置文案支持国际化，大部分文案用户可以主动设置。</p>
<h3 id="articleHeader5">1.4 可以定制的主题</h3>
<p><span class="img-wrap"><img data-src="https://gw.alicdn.com/tps/TB1N8mdKFXXXXasXVXXXXXXXXXX-1170-583.png" src="https://static.alili.techhttps://gw.alicdn.com/tps/TB1N8mdKFXXXXasXVXXXXXXXXXX-1170-583.png" alt="图3 定制主题" title="图3 定制主题" style="cursor: pointer;"></span></p>
<blockquote><p>我们默认提供了两套主题供使用，这两套主题也同时在我们的系统中使用，如果你不喜欢我们的主题，你也可以使用我们的<a href="http://uxco.re/theme/builder" rel="nofollow noreferrer" target="_blank">在线定制工具</a>定制你的主题，我们目前开放了所有颜色的定制，未来可能会开放更多的定制点。</p></blockquote>
<h3 id="articleHeader6">1.5 按需使用</h3>
<p>UXCore 的每个组件都是单独项目维护的，并且也会单独发布于 npm，因此如果你不喜欢引用 UXCore 的大全包，你也可以单独引用独立的组件使用。同时，修改 UXCore 原有的样式也十分简单，只需修改类名前缀(prefixCls)，即可定制属于自己的 UXCore 组件风格。</p>
<h3 id="articleHeader7">1.6 提供项目级的建议和支持</h3>
<p>如果你苦于搭建使用 React 和 UXCore 的项目环境，可以参考我们的 <a href="https://github.com/uxcore/starter-kit" rel="nofollow noreferrer" target="_blank">starter kit</a>，在这里我们给出了团队在众多项目实践总结出的统一解决方案(NOWA)，供你参考。<br><span class="img-wrap"><img data-src="https://gw.alicdn.com/tps/TB1ZkmxKFXXXXbHXXXXXXXXXXXX-638-385.png" src="https://static.alili.techhttps://gw.alicdn.com/tps/TB1ZkmxKFXXXXbHXXXXXXXXXXXX-638-385.png" alt="图4 nowa 工具" title="图4 nowa 工具" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">2. UXCore 正在做的事情</h2>
<h3 id="articleHeader9">2.1 更加值得信赖</h3>
<p><span class="img-wrap"><img data-src="https://gw.alicdn.com/tps/TB1aVGeKFXXXXa0XVXXXXXXXXXX-820-254.png" src="https://static.alili.techhttps://gw.alicdn.com/tps/TB1aVGeKFXXXXa0XVXXXXXXXXXX-820-254.png" alt="图5 持续集成" title="图5 持续集成" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>为了保证后续迭代和社区贡献的质量，我们会积极地接入代码风格校验和持续集成测试，目前我们的方案已经确定，正在向所有的组件进行推广。</p></blockquote>
<h3 id="articleHeader10">2.2 可视化页面搭建</h3>
<p>通过在线可视化的页面，通过拖拽和简单配置来实现简单交互页面的搭建，同时输出代码，用以后续更改和添加代码。</p>
<h3 id="articleHeader11">2.3 持续的功能增强</h3>
<p>借助社区和团队自身的力量，UXCore 会在现有基础上优化使用体验，增强组件功能，添加更多常用组件来满足不同场景的需求。</p>
<h2 id="articleHeader12">3. 链接</h2>
<ul>
<li><p>github: <a href="https://github.com/uxcore/uxcore" rel="nofollow noreferrer" target="_blank">https://github.com/uxcore/uxcore</a></p></li>
<li><p>文档站点: <a href="http://uxco.re/" rel="nofollow noreferrer" target="_blank">http://uxco.re/</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
UXCore：一个兼容主流浏览器的 React PC 组件库

## 原文链接
[https://segmentfault.com/a/1190000005805135](https://segmentfault.com/a/1190000005805135)


---
title: 'iView 近期的更新，以及那些“不为人知”的故事' 
date: 2018-12-11 2:30:10
hidden: true
slug: s2dcabyd1yq
categories: [reprint]
---

{{< raw >}}

                    
<p>在过去的两个多月里，<strong><a href="https://github.com/iview/iview" rel="nofollow noreferrer" target="_blank">iView</a></strong> 陆续发布了 2.9.0 和 2.10.0 两个重要版本。这两个版本总共有 255 个 commit，超过 40 项更新。来看一下，iView 具体都更新了些什么。</p>
<p>完整的更新日志可以到 GitHub releases 查看:<br>2.9.0: <a href="https://github.com/iview/iview/releases/tag/v2.9.0" rel="nofollow noreferrer" target="_blank">https://github.com/iview/iview/releases/tag/v2.9.0</a><br>2.10.0: <a href="https://github.com/iview/iview/releases/tag/v2.10.0" rel="nofollow noreferrer" target="_blank">https://github.com/iview/iview/releases/tag/v2.10.0</a></p>
<p>或者在 iView 文档的更新日志查看：<br><a href="https://www.iviewui.com/docs/guide/update" rel="nofollow noreferrer" target="_blank">https://www.iviewui.com/docs/guide/update</a></p>
<blockquote>说明：由于 2.10.0 存在编译后文件过大的问题，请更新至 2.10.1</blockquote>
<h2 id="articleHeader0">“看得见”的更新</h2>
<p>所谓看得见的更新，就是更新后能真实感受到的东西。这两个版本都得感谢两位瑞典大神<br><a href="https://github.com/SergioCrisostomo" rel="nofollow noreferrer" target="_blank">SergioCrisostomo</a> 和 <a href="https://github.com/Xotic750" rel="nofollow noreferrer" target="_blank">Xotic750</a> 的贡献，iView 才得以越来越完善。</p>
<h3 id="articleHeader1">日期组件 DatePicker 的重构</h3>
<p>首先是在 2.10.0 对日期组件 DatePicker 的重构。DatePicker 是 iView 48 个组件里最复杂的组件之一。复杂的功能使得代码逻辑非常重，在许多新特性的支持上，比如兼容不同国家的日历规范等都很难在此基础上迭代，不得不推倒重来。</p>
<p>SergioCrisostomo 之前有开发过日期相关的 JS 库（<a href="https://github.com/SergioCrisostomo/js-calendar" rel="nofollow noreferrer" target="_blank">https://github.com/SergioCrisostomo/js-calendar</a>），所以对日期相关的功能点和 API 非常熟，iView 也是基于此库进行的重构。</p>
<p>新的日期组件主要增加了以下功能：</p>
<p><strong>1.范围选择支持从右往左选择了。</strong><br>之前在范围选择时，必须先选起点，再选终点，也就是从左往右选，但很多用户的习惯却刚好相反。该版本则同时支持两个方向的选择。</p>
<p><strong>2.新增 <code>split-panels</code> 属性，开启后，左右两面板可以不联动。</strong><br>之前在范围选择时，左右两个面板是联动的，也就是右边永远比左边大一个月，任何一个面板切换月份或年份，另一个面板都会自动切换。该版本则可以设置为不联动，这样方便定位起始月份和结束月份。如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013663361?w=918&amp;h=612" src="https://static.alili.tech/img/remote/1460000013663361?w=918&amp;h=612" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>3.新增 <code>multiple</code> 属性，开启后，可以选择多个日期。</strong><br>虽然之前版本可以用其它 iView 组件组合出来一个多选的日期，但效果和交互多少会打折扣，该版本只要增加属性 <code>multiple</code>，就可以在一个日期面板上同时选择和呈现多个日期了。如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013663362?w=948&amp;h=688" src="https://static.alili.tech/img/remote/1460000013663362?w=948&amp;h=688" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>4.新增属性 <code>show-week-numbers</code>，开启后，可以显示星期数。</strong><br>增加这个属性，就可以在日历面板上显示当前是一年的第几周。如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013663363?w=920&amp;h=636" src="https://static.alili.tech/img/remote/1460000013663363?w=920&amp;h=636" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>还有其它很多项的更新，比如新增 <code>start-date</code> 属性，可以设置面板展开时默认显示的日期。新增属性 <code>time-picker-options</code>，可以在 type 为 datetime 和 datetimerange 下，配置 TimePicker 的属性，比如时间间隔 steps。完整的更新可以产看更新日志，这里不一一列举了。</p>
<h3 id="articleHeader2">键盘可访问性的支持</h3>
<p>键盘的可访问性，主要是通过键盘的<strong>方向键</strong>、<strong>tab键</strong>、<strong>空格键</strong>等完成表单组件的切换和交互。在填写一个表单时（iView <code>Form</code> 组件），尤其有用，你可以离开鼠标，就完成一个复杂表单的填写与提交。</p>
<p>目前 iView 最新版本支持键盘可访问性的组件有：<br><code>Button</code>、<code>Input</code>、<code>Radio</code>、<code>Checkbox</code>、<code>Switch</code>、<code>AutoComplete</code>、<code>Slider</code>、<code>InputNumber</code>。更多组件还在陆续支持中。</p>
<p>事实上，原生的表单控件，浏览器都是支持键盘的可访问性的，比如 <code>&lt;button&gt;</code>、<code>&lt;input type="radio"&gt;</code> 等等。iView 对这些原生控件进行了重塑，不仅仅使得 UI 好看和统一，更重要的是功能的丰富和交互体验的提升。</p>
<p>目前上述的组件，都是可以通过键盘的 <code>tab键</code> 选中的，这是第一步，如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013663364?w=1000&amp;h=600" src="https://static.alili.tech/img/remote/1460000013663364?w=1000&amp;h=600" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，组件在被选中时，外面多了一个高亮层，表明当前选中的控件，这时就可以通过键盘其它按键继续操作了，比如单选组件 <code>Radio</code>，在选中状态下，可以通过键盘的方向键直接切换选项；<code>Checkbox</code> 在被激活时，可以通过空格键选择和取消选择某小项，通过 tab 键激活下一个小项。</p>
<h2 id="articleHeader3">“看不见”的更新</h2>
<p>还有一些更新，是无法直接看见和体会到的。</p>
<p>比如更新了大量的依赖：</p>
<ul>
<li>babel 系列全部更新</li>
<li>使用了 <code>browserslist</code>
</li>
</ul>
<p>使用了 <code>sourcemap</code>。</p>
<p>部分组件的重构，虽然功能无任何变化，但代码结构和逻辑都做了优化和可维护性设计。</p>
<p>还有部分组件的自动化测试、持续集成对 GitHub travis-ci 的兼容等等。</p>
<p>外表需要优化，内部同样也是，就像一个人，既要有外在美，也要有内在美。</p>
<h2 id="articleHeader4">“不为人知”的故事</h2>
<p>在开源工作中，发生过许多有趣的事，这里分享几个有意思的。</p>
<h4>在瑞典，想用开源项目，得先改 bug</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013663365?w=750&amp;h=1334" src="https://static.alili.tech/img/remote/1460000013663365?w=750&amp;h=1334" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在瑞典使用开源项目到生产环境时，开发者有义务来修复开源项目的 bug。这一刻，觉得瑞典好好啊。</p>
<h4>“吵”不过老外</h4>
<p><code>Sorry for my poor english.</code> 已经成为一个段子了，然后不得不用 english。但是老外一句 <code>Sorry for my poor Chinese</code> 就会让你无话可说。所以，英语不好的我，有时候就“吵”不过老外们了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013663366?w=1198&amp;h=1342" src="https://static.alili.tech/img/remote/1460000013663366?w=1198&amp;h=1342" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>当我还在查 “optimisation” 是啥意思的时候，对方已经 balabala 说一堆了，吵不过就妥协吧。</p>
<p>就像你跟仰慕的女神聊天，你 bibibi 说了一大堆，对方半天回你一句 “哦” 一样，哈哈。</p>
<p>不过，妥协归妥协，讲的还是有道理的，不能为了妥协而妥协，真理才是最重要的。</p>
<p>讲这些，更多想说的是，iView 的每个功能点，都是我们精心揣摩探讨出来的，不会凭借主观意识去做，也不会因为任何一个 Feature Request 就去支持，每个 feature 都是讨论出的结果。所以，这是一个既有情怀，又负责的开源项目。</p>
<p>目前的 iView 核心团队有 3 人在同时维护，相比以前独立奋斗的我要好的多了，但仍然需要更多像瑞典开发者这样有开源精神的工程师们加入，致力把 iView 打造成全球最好用、最好看的 UI 组件库。期待你的加入！</p>
<blockquote>下个版本预告：下个版本计划重构 <code>Select</code> 组件，以全面支持表单组件的键盘可访问性，敬请期待。完整的计划见里程碑 <a href="https://github.com/iview/iview/milestone/9" rel="nofollow noreferrer" target="_blank">https://github.com/iview/iview/milestone/9</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
iView 近期的更新，以及那些“不为人知”的故事

## 原文链接
[https://segmentfault.com/a/1190000013663356](https://segmentfault.com/a/1190000013663356)


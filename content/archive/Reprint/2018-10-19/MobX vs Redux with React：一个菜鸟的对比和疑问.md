---
title: MobX vs Redux with React：一个菜鸟的对比和疑问
reprint: true
categories: reprint
abbrlink: a588c908
date: 2018-10-19 00:00:00
---

{{% raw %}}

            <p>React中的状态管理一直是Javascript兄弟会讨论的主题。 我最近想在我的一个项目中实施状态管理，希望在做出重大决策之前做一点研究。</p>
<p><img src="https://p0.ssl.qhimg.com/t01c21a5f915093f515.jpg" alt=""></p>
<p>是<strong> MobX还是Redux？</strong></p>
<p>在本文中，我们将探讨两者的好处和权衡。 你如何在其中任何一个之间做出选择？ 本文假设您具有有关React状态管理的基本知识。</p>
<p>Redux和MobX都在react中运行良好。</p>
<h4>单个store vs 多个store</h4>
<p>简单来说，store就是您保存所有数据的地方。</p>
<p>Redux总是有一个大型store，其中存储了所有状态。 MobX通常有多个store。 因此，在MobX中，您可以在逻辑上分隔您的store。</p>
<p>此外，在Redux中，数据通常是标准化的。 在MobX中，您可以保留非规范化数据。</p>
<h4>普通数据 vs 可观察数据</h4>
<p>Redux使用普通的Javascript对象来存储数据。 另一方面，MobX使用observable来存储数据。</p>
<p>为什么这么重要？</p>
<p>您可以监听可观察数据并自动跟踪数据发生的变化。 在redux中，必须手动跟踪所有更新。</p>
<h4>不可变与可变（纯与不纯）</h4>
<p>Redux使用不可变状态。 这意味着状态是只读的，您不能直接覆盖它们。 在Redux中，先前的状态被新状态替换。 因此Redux是纯粹的，或者它使用 <a href="https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976">纯函数</a>.</p>
<p>当你必须恢复到以前的状态时，这可以非常方便。 例如 - 撤消操作。</p>
<p>在MobX中，状态可以被覆盖。 您只需使用新值更新状态即可。 因此，MobX可以被称为不纯粹。</p>
<h4><strong>学习</strong></h4>
<p>MobX更容易学习，并且具有稳定的学习曲线。 特别是因为大多数传统的Javascript开发人员都熟悉OOP，所以很容易掌握MobX。 MobX中有很多抽象，这也使它更容易。 你不必为许多事情烦恼，否则你必须小心。 （例如：订阅状态）</p>
<p>Redux遵循函数式编程范例。 对于没有函数式编程经验的Javascript开发人员来说，很难直接完全掌握Redux。 您将需要了解像<a href="https://github.com/gaearon/redux-thunk">Redux Thunk</a>这样的中间件，这将使学习曲线更加陡峭。</p>
<p>在MobX中有很多内置的抽象，这导致代码更少。 但是在实现redux时，你最终会编写很多样板代码。</p>
<h4><strong>调试</strong></h4>
<p>由于有更多的抽象，调试变得更加困难。 而MobX现有的开发人员工具也只是平均水平。 结果有时会变得无法预测。</p>
<p>另一方面，Redux提供kickass开发人员工具，包括时间旅行。 使用纯函数和较少的抽象，与MobX相比，Redux中的调试将是更好的体验。 遵循通量范例使Redux更具可预测性。</p>
<h4>规模和维护</h4>
<p>由于整个纯函数的东西和函数式编程范例Redux更易于维护。 Redux可以控制一切。</p>
<h4>开发者支持</h4>
<p>Redux的开发人员社区领先于MobX社区。</p>
<h3>问一下你自己</h3>
<p><strong>1)应用程序是否小而简单？</strong></p>
<p>选 MobX</p>
<p><strong>2)喜欢快速构建应用程序？</strong></p>
<p>选MobX</p>
<p><strong>3)大型团队正在寻找更易维护的代码？</strong></p>
<p>选 Redux</p>
<p><strong>4)具有可扩展选项的复杂应用</strong></p>
<p>选 Redux</p>
<p><strong>最后也是最重要的问题 - 你喜欢哪一个？?</strong></p>
<p><strong>就选择哪一个.</strong></p>
<p>因为:</p>
<p><img src="https://p0.ssl.qhimg.com/t01364fba67bb856029.gif" alt=""></p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/mobx-vs-redux-with-react-a-noob-s-comparison-and-questions](https://www.zcfy.cc/article/mobx-vs-redux-with-react-a-noob-s-comparison-and-questions)
原文标题: MobX vs Redux with React：一个菜鸟的对比和疑问
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

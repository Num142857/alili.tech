---
title: '4 张动图解释为什么（什么时候）使用 Redux' 
date: 2018-12-24 2:30:07
hidden: true
slug: l793a95m0e
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://github.com/dev-reading/fe" rel="nofollow noreferrer" target="_blank">dev-reading/fe</a> 是一个阅读、导读、速读的 repo，不要依赖于 <a href="https://github.com/dev-reading/fe" rel="nofollow noreferrer" target="_blank">dev-reading/fe</a> 学习知识。本 repo 只是一个快速了解文章内容的工具，并不提供全文解读和翻译。你可以通过本平台快速了解文章里面的内容，找到感兴趣的文章，然后去阅读全文。</p></blockquote>
<p>本文讨论地址：<a href="https://github.com/dev-reading/fe/issues/11" rel="nofollow noreferrer" target="_blank">https://github.com/dev-readin...</a></p>
<p>阅读时间大概 1 分钟</p>
<hr>
<blockquote><p>过早优化是万恶之源 —— Donald Knuth</p></blockquote>
<p>本文描述了<strong>什么时候</strong>开始使用 Redux。作者描述了在构建一个真实 React APP 时，从没有使用 Redux 到使用 Redux 的过程以及收获。</p>
<p>首先，<strong>并不是所有的 React 应用程序都需要使用 Redux</strong>。事实上，大多数非常简单的 React 应用程序根本不能从 Redux 中受益。</p>
<h2 id="articleHeader0">第 1 天</h2>
<p>使用 React 本地组件状态</p>
<p>React 使用<a href="https://reactjs.org/docs/state-and-lifecycle.html#the-data-flows-down" rel="nofollow noreferrer" target="_blank">单向数据流</a>，这意味着父组件把自身的状态作为属性传递给子组件。</p>
<p><span class="img-wrap"><img data-src="/img/bVY6Xf?w=550&amp;h=300" src="https://static.alili.tech/img/bVY6Xf?w=550&amp;h=300" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">第 5 天</h2>
<p>随着添加更多的功能，<strong>非父子</strong>组件之间需要<strong>共享</strong>一些状态。</p>
<p>我们通过<a href="https://reactjs.org/docs/lifting-state-up.html" rel="nofollow noreferrer" target="_blank">提升状态</a>来解决这个问题。</p>
<p>这意味着我们将状态（和改变这个状态的函数）<strong>提升到最接近的祖先</strong>（Container Component）。我们将这些函数绑定到容器组件，并将它们作为属性向下传递。这意味着子组件可以触发其父组件中的状态更改，这将<strong>更新树中的所有其他组件</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bVY6Xp?w=550&amp;h=325" src="https://static.alili.tech/img/bVY6Xp?w=550&amp;h=325" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">第 20 天</h2>
<p>随着添加了更多的功能和组件，我们的应用程序状态流程开始看起来像这样...</p>
<p><span class="img-wrap"><img data-src="/img/bVY6XB?w=550&amp;h=475" src="https://static.alili.tech/img/bVY6XB?w=550&amp;h=475" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">第 n 天</h2>
<p>如果您开始遇到上述某些问题，则可能意味着您应该使用 Redux 了。</p>
<h2 id="articleHeader4">Redux</h2>
<p>当我们使用 Redux 后，状态变成了这样：</p>
<p><span class="img-wrap"><img data-src="/img/bVY6XH?w=700&amp;h=475" src="https://static.alili.tech/img/bVY6XH?w=700&amp;h=475" alt="" title="" style="cursor: pointer;"></span></p>
<p>如果您的应用符合以下某些条件，那么我认为应该立即使用 Redux。</p>
<ul>
<li>UI 可以根据应用程序状态显着变化</li>
<li>并不总是以一种线性的，单向的方式流动</li>
<li>许多不相关的组件以相同的方式更新状态</li>
<li>状态树并不简单</li>
<li>状态以许多不同的方式更新</li>
<li>您需要能够撤消以前的用户操作</li>
</ul>
<hr>
<blockquote>
<p>阅读原文：<a href="https://medium.com/dailyjs/when-do-i-know-im-ready-for-redux-f34da253c85f" rel="nofollow noreferrer" target="_blank">When do I know I’m ready for Redux?</a></p>
<p>讨论地址：<a href="https://github.com/dev-reading/fe/issues/11" rel="nofollow noreferrer" target="_blank">4 张动图解释为什么（什么时候）使用 Redux #11</a></p>
<p>如果你想参与讨论，请<a href="https://github.com/dev-reading/fe" rel="nofollow noreferrer" target="_blank">点击这里</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
4 张动图解释为什么（什么时候）使用 Redux

## 原文链接
[https://segmentfault.com/a/1190000012142449](https://segmentfault.com/a/1190000012142449)


---
title: '精读《手写 SQL 编译器 - 性能优化之缓存》' 
date: 2019-03-02 2:30:07
hidden: true
slug: rk2y27auqs8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1 引言</h2>
<p>重回 “手写 SQL 编辑器” 系列。这次介绍如何利用缓存优化编译器执行性能。</p>
<p>可以利用 <strong>Frist 集</strong> 与 <strong>Match 节点缓存</strong> 这两种方式优化。</p>
<p>本文会用到一些图做解释，下面介绍图形规则：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016904880?w=1057&amp;h=128" src="https://static.alili.tech/img/remote/1460000016904880?w=1057&amp;h=128" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>First 集优化，是指在初始化时，<strong>将整体文法的 First 集找到，因此在节点匹配时，如果 Token 不存在于 First 集中，可以快速跳过这个文法</strong>，在文法调用链很长，或者 “或” 的情况比较多时，可以少走一些弯路：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016904881?w=1133&amp;h=414" src="https://static.alili.tech/img/remote/1460000016904881?w=1133&amp;h=414" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>如图所示，只要构建好了 First 集，<strong>不论这个节点的路径有多长，都可以以最快速度判断节点是否不匹配</strong>。如果节点匹配，则继续深度遍历方式访问节点。</p>
<p>现在节点不匹配时性能已经最优，那下一步就是如何优化匹配时的性能，这时就用到 Match 节点缓存。</p>
<p>Match 节点缓存，指在运行时，缓存节点到其第一个终结符的过程。与 First 集相反，First 集可以快速跳过，而 Match 节点缓存可以快速找到终结符进行匹配，在非终结符很多时，效果比较好：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016904882?w=640&amp;h=542" src="https://static.alili.tech/img/remote/1460000016904882?w=640&amp;h=542" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>如图所示，当匹配到节点时，如果已经构建好了缓存，可以直接调到真正匹配 Token 的 Match 节点，从而节省了大量节点遍历时间。</p>
<p>这里需要注意的是，由于 Tree 节点存在分支可能性，因此缓存也包含将 “沿途” Chances 推入 Chances 池的职责。</p>
<h2 id="articleHeader1">2 精读</h2>
<p>那么如何构建 First 集与 Match 节点缓存呢？通过两张图解释。</p>
<h3 id="articleHeader2">构建 First 集</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016904883" src="https://static.alili.tech/img/remote/1460000016904883" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>如图所示，构建 First 集是个自下而上的过程，当访问到 MatchNode 节点时，就可以收集作为<strong>父节点的</strong> First 集了！父集判断 First 集收集完毕的话，就会触发它的父节点 First 集收集判断，如此递归，最后完成 First 集收集的是最顶级节点。</p>
<h3 id="articleHeader3">构建 Match 节点缓存</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016904884?w=682&amp;h=539" src="https://static.alili.tech/img/remote/1460000016904884?w=682&amp;h=539" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>如图所示，访问节点时，如果没有缓存，则会将这个节点添加到 <strong>Match 缓存查找队列</strong>，同时路途遇到 TreeNode，也会将下一个 Chance 添加到缓存查找队列。直到遇到了第一个 MatchNode 节点，则这个节点是 “Match 缓存查找队列” 所有节点的 Match 节点缓存，此时这些节点的缓存就可以生效了，指向这个 MatchNode，同时清空缓存查找队列，等待下一次查找。</p>
<h2 id="articleHeader4">3 总结</h2>
<p>拿 <code>select a, b, c, d from e</code> 这个语句做测试：</p>
<table>
<thead><tr>
<th>node 节点访问次数</th>
<th>Frist 集优化</th>
<th>First 集 + Match 节点缓存优化</th>
</tr></thead>
<tbody><tr>
<td>784</td>
<td>669</td>
<td>652</td>
</tr></tbody>
</table>
<p>从这个简单 Demo 来看，提效了 16% 左右。不过考虑到文法结构会影响到提效，对于层级更深的文法、能激活深层级文法的输入可以达到更好的效率提升。</p>
<h2 id="articleHeader5">4 更多讨论</h2>
<blockquote>讨论地址是：<a href="https://github.com/dt-fe/weekly/issues/110" rel="nofollow noreferrer" target="_blank">精读《手写 SQL 编译器 - 性能优化之缓存》 · Issue #110 · dt-fe/weekly</a>
</blockquote>
<p><strong>如果你想参与讨论，请<a href="https://github.com/dt-fe/weekly" rel="nofollow noreferrer" target="_blank">点击这里</a>，每周都有新的主题，周末或周一发布。前端精读 - 帮你筛选靠谱的内容。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精读《手写 SQL 编译器 - 性能优化之缓存》

## 原文链接
[https://segmentfault.com/a/1190000016904877](https://segmentfault.com/a/1190000016904877)


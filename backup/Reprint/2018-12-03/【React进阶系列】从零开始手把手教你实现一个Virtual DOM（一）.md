---
title: '【React进阶系列】从零开始手把手教你实现一个Virtual DOM（一）' 
date: 2018-12-03 2:30:08
hidden: true
slug: 7fvkc5swso
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>假如你的项目使用了React，你知道怎么做性能优化吗？</strong><br><strong>你知道为什么React让你写shouldComponentUpdate或者React.PureComponent吗？</strong><br><strong>你知道为什么React让你写Immutable Data Structures吗？</strong><br><strong>你知道为什么React让你在渲染列表时，一定要给每个子项加一个key吗？</strong><br><strong>你知道为什么React让你在条件渲染时，不写if而写&amp;&amp;操作符或三元操作符吗？</strong></p>
<p>一切的答案都在<strong><em>Virtual DOM</em></strong>上！<br>只要你跟着我完成了这个手写Virtual DOM的系列，上面的所有问题你都将得到解答，从此进入react高手的阵营！</p>
<hr>
<p>现在当我们谈virtual DOM (VDOM)的时候，通常会将React捆绑在一起谈。可实际上VDOM并不是React创造的，React将这个概念拿过来以后融会贯通慢慢地成为目前前端最炙手可热的框架之一。</p>
<h2>什么是VDOM？</h2>
<p>首先我们都知道什么是DOM(Document Object Model)，简单说就是将一个HTML文档抽象表达为树结构。VDOM则是将DOM再抽象一层生成的简化版js对象，这个对象也拥有DOM上的一些属性，比如id, class等，但它是完全脱离于浏览器而存在的。</p>
<h2>为什么要用VDOM？</h2>
<p>随着前端技术的发展，现在的网页应用变得越来越庞大，DOM树也随之变得复杂。当我们要修改DOM的某个元素时，我们需要先遍历找个这个元素，然后才修改能修改。而且如果我们大量地去修改DOM，每次DOM修改浏览器就得重绘（repaint）页面，有的时候甚至还得重排(reflow)页面，浏览器的重排重绘是很损耗性能的。</p>
<p>React是怎么用VDOM解决这个问题的呢？</p>
<ol>
<li>首先，在React当我们要去修改数据的时候，我们会调用React提供的setState方法来修改数据；</li>
<li>React根据新的数据生成一个新的VDOM，因为VDOM本质上只是一个普通的js对象，所以这个过程是很快的；</li>
<li>然后React拿着新生成VDOM和之前的VDOM进行对比（diff算法），找出不同的地方(新增，删除，修改)，生成一个个的补丁（patches）;</li>
<li>最后React把这些补丁一次性打到DOM上，完成视图的修改。</li>
</ol>
<p>原理其实还是很直观的，但React到底是怎么用代码实现的呢？其中最关键的一步是React是怎么diff的？如果搞清楚了内部的实现原理，对于我们使用React来写出性能更高的代码至关重要。所以今天我要手把手教大家怎么从零开始实现VDOM。</p>
<h2>我们的设计蓝图</h2>
<p>我们将采用跟React类似的方式</p>
<ol>
<li>使用JSX来编写组件；</li>
<li>用Babel将JSX转化为纯js(类似hyperscript)；</li>
<li>将hyperscript转化成我们的VDOM；</li>
<li>将VDOM渲染到页面，形成真实的DOM；</li>
<li>手动更新数据并手动触发更新视图操作(这部分是react做的，跟VDOM的实现无关，所以我们手动模拟一下)；</li>
<li>重复步骤二和步骤三，得到新的VDOM；</li>
<li>diff新VDOM和旧VDOM，得到需要修改真实DOM的patches；</li>
<li>把patches一次性打到DOM上，只更新DOM上需要更改的地方。</li>
</ol>
<h2><span class="img-wrap"><img data-src="/img/bV9o7Q?w=314&amp;h=517" src="https://static.alili.tech/img/bV9o7Q?w=314&amp;h=517" alt="图片描述" title="图片描述"></span></h2>
<p><strong><em>下面我们开始正式进入写代码环节，建议大家打开编辑器跟着我一步一步的敲代码。这样手把手教你敲代码的的博主你去哪里找？还不抓住这个千载难逢的机会？???</em></strong></p>
<h2>项目结构</h2>
<ol>
<li>index.html</li>
<li>index.js(所有的逻辑都写在这个文件里)</li>
<li>.babelrc（babel的配置页）</li>
<li>package.json</li>
<li>compiled.js (这个文件是babel打包自己生成的，不需要自己写)</li>
</ol>
<p>大家可以新建一个目录，然后新建1-4这四个文件</p>
<p><a href="https://segmentfault.com/a/1190000014603332">从零开始手把手教你实现一个Virtual DOM（二）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【React进阶系列】从零开始手把手教你实现一个Virtual DOM（一）

## 原文链接
[https://segmentfault.com/a/1190000014572815](https://segmentfault.com/a/1190000014572815)


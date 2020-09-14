---
title: '入口文件开始，分析Vue源码实现' 
date: 2018-12-03 2:30:08
hidden: true
slug: 92vh215lyvr
categories: [reprint]
---

{{< raw >}}

                    
<h2>Why?</h2>
<p>网上现有的Vue源码解析文章一搜一大批，但是为什么我还要去做这样的事情呢？因为觉得<code>纸上得来终觉浅，绝知此事要躬行</code>。</p>
<p>然后平时的项目也主要是Vue，在使用Vue的过程中，也对其一些约定产生了一些疑问，可能<a href="https://cn.vuejs.org/" rel="nofollow noreferrer">官网</a>上只会建议你这么做，但是核心实现我们可能并不知道。比如：</p>
<ul>
<li>v-for key 是如何达到“就地复用”策略</li>
<li>数组更新检测是如何完成的</li>
<li>set 为什么就能动态添加根级别的响应式属性</li>
<li>为什么Vue可以跨平台支持weex，以及后来出现的mpvue</li>
<li>...</li>
</ul>
<p>其次，很久没有更新内容了，之前对Vue源码也是有点研究，只不过没有很体系的记录，现在抽了点时间，做了一次基础的总结吧。一方面是因为想要克服自己的惰性，另一方面也是想重新温故一遍。</p>
<h2>What？</h2>
<p>一共分成了10个基础部分，后续还会继续记录。我们可以先看一下概览：<br><span class="img-wrap"><img data-src="/img/remote/1460000014564913?w=1079&amp;h=544" src="https://static.alili.tech/img/remote/1460000014564913?w=1079&amp;h=544" alt="" title=""></span></p>
<p><strong>然后我们来看一下基础的目录：</strong></p>
<p><a href="https://github.com/monkeyWangs/blogs/blob/master/src/Vue/1.md" rel="nofollow noreferrer">入口开始，解读Vue源码（一）———— 造物创世</a></p>
<p><a href="https://github.com/monkeyWangs/blogs/blob/master/src/Vue/2.md" rel="nofollow noreferrer">入口开始，解读Vue源码（二）—— new Vue 的故事</a></p>
<p><a href="https://github.com/monkeyWangs/blogs/blob/master/src/Vue/3.md" rel="nofollow noreferrer">入口开始，解读Vue源码（三）—— initMixin 上篇</a></p>
<p><a href="https://github.com/monkeyWangs/blogs/blob/master/src/Vue/4.md" rel="nofollow noreferrer">入口开始，解读Vue源码（三）—— initMixin 下篇</a></p>
<p><a href="https://github.com/monkeyWangs/blogs/blob/master/src/Vue/5.md" rel="nofollow noreferrer">入口开始，解读Vue源码（四）—— 实现一个基础的 Vue 双向绑定</a></p>
<p><a href="https://github.com/monkeyWangs/blogs/blob/master/src/Vue/6.md" rel="nofollow noreferrer">入口开始，解读Vue源码（五）—— $mount 内部实现</a></p>
<p><a href="https://github.com/monkeyWangs/blogs/blob/master/src/Vue/7.md" rel="nofollow noreferrer">入口开始，解读Vue源码（六）—— $mount 内部实现 --- compile parse函数生成AST</a></p>
<p><a href="https://github.com/monkeyWangs/blogs/blob/master/src/Vue/8.md" rel="nofollow noreferrer">入口开始，解读Vue源码（七）—— $mount 内部实现 --- compile optimize标记节点</a></p>
<p><a href="https://github.com/monkeyWangs/blogs/blob/master/src/Vue/9.md" rel="nofollow noreferrer">入口开始，解读Vue源码（八）—— $mount 内部实现 --- compile generate 生成render函数</a></p>
<p><a href="https://github.com/monkeyWangs/blogs/blob/master/src/Vue/10.md" rel="nofollow noreferrer">入口开始，解读Vue源码（九）—— $mount 内部实现 --- render函数 --&gt; VNode</a></p>
<p><a href="https://github.com/monkeyWangs/blogs/blob/master/src/Vue/11.md" rel="nofollow noreferrer">入口开始，解读Vue源码（十）—— $mount 内部实现 --- patch</a></p>
<h2>End?</h2>
<p>文章前后也是利用碎片时间总结整理而成，有些也是翻阅了很多的资料，也有过引用巨人的段落，文章中有所标注。如果没有标注，可能是本人忘记了，欢迎提醒。文章中如果有笔误或者不正确的解释，也欢迎批评指正，共同进步。</p>
<p>最后：</p>
<p><a href="https://github.com/monkeyWangs/blogs" rel="nofollow noreferrer">github地址</a></p>
<p><a href="https://github.com/monkeyWangs/wue" rel="nofollow noreferrer">部分源码demo</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
入口文件开始，分析Vue源码实现

## 原文链接
[https://segmentfault.com/a/1190000014564902](https://segmentfault.com/a/1190000014564902)


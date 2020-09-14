---
title: '前端面试题-display:none和visibility:hidden的区别' 
date: 2018-12-09 2:30:08
hidden: true
slug: gpwxd1eg49u
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、display:none和visibility:hidden的区别</h2>
<h3 id="articleHeader1">1.1 空间占据</h3>
<h3 id="articleHeader2">1.2 回流和渲染</h3>
<h3 id="articleHeader3">1.3 株连性</h3>
<h2 id="articleHeader4">二、空间占据</h2>
<blockquote>display:none 隐藏后的元素<strong>不占据任何空间</strong>，而 visibility:hidden 隐藏的元素<strong>空间依旧存在</strong>。</blockquote>
<h2 id="articleHeader5">三、回流和渲染</h2>
<blockquote>display:none 隐藏产生回流和重绘（reflow 和 repaint），而 visibility:hidden 只产生重绘。</blockquote>
<h2 id="articleHeader6">三、株连性</h2>
<p>display:none 就是“株连性”明显的声明：一旦父节点元素应用了 <strong>display:none</strong>，父节点及其子孙节点元素<strong>全部不可见</strong>，而且无论其子孙元素如何不屈地挣扎都无济于事。</p>
<h2 id="articleHeader7">四、隐藏失效</h2>
<p>若子孙元素应用了 <strong>visibility:visible</strong>，则这个子孙元素不但不会隐藏，而且会显现出来。</p>
<p>Code</p>
<p><span class="img-wrap"><img data-src="/img/bV6AsA?w=656&amp;h=601" src="https://static.alili.tech/img/bV6AsA?w=656&amp;h=601" alt="隐藏失效" title="隐藏失效" style="cursor: pointer; display: inline;"></span></p>
<p>Example</p>
<p><span class="img-wrap"><img data-src="/img/bV6As8?w=460&amp;h=516" src="https://static.alili.tech/img/bV6As8?w=460&amp;h=516" alt="隐藏失效" title="隐藏失效" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://segmentfault.com/u/webing123">阅读更多</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试题-display:none和visibility:hidden的区别

## 原文链接
[https://segmentfault.com/a/1190000013929168](https://segmentfault.com/a/1190000013929168)


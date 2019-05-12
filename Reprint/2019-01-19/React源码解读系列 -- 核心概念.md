---
title: 'React源码解读系列 -- 核心概念' 
date: 2019-01-19 2:30:10
hidden: true
slug: wm504yx7dcb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>文章原地址：<a href="http://zhenhua-lee.github.io/react/react.html" rel="nofollow noreferrer" target="_blank">前去阅读</a></p></blockquote>
<p>最近阅读了<code>react</code>部分源码，重点研究了virtual dom、生命周期、reactDOM.render、setState异步原理、react更新策略等问题，收获不少，解决了不少心中的疑惑，用思维导图的方式记录其中的逻辑关系。</p>
<h3 id="articleHeader0">1. Virtual DOM</h3>
<p><span class="img-wrap"><img data-src="/img/bVKex3?w=1715&amp;h=709" src="https://static.alili.tech/img/bVKex3?w=1715&amp;h=709" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">2. 生命周期</h3>
<h4>2.1 生命周期的基本流程</h4>
<p><span class="img-wrap"><img data-src="/img/bVKeyj?w=1454&amp;h=794" src="https://static.alili.tech/img/bVKeyj?w=1454&amp;h=794" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>2.2 生命周期的内部实现逻辑</h4>
<p><span class="img-wrap"><img data-src="/img/bVKeyp?w=1541&amp;h=619" src="https://static.alili.tech/img/bVKeyp?w=1541&amp;h=619" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">3. React 首次渲染</h3>
<p><span class="img-wrap"><img data-src="/img/bVKeyv?w=1263&amp;h=641" src="https://static.alili.tech/img/bVKeyv?w=1263&amp;h=641" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">4. setState异步的原理</h3>
<p><span class="img-wrap"><img data-src="/img/bVKeyw?w=712&amp;h=207" src="https://static.alili.tech/img/bVKeyw?w=712&amp;h=207" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">5. React更新原理</h3>
<p><span class="img-wrap"><img data-src="/img/bVKeyx?w=1485&amp;h=613" src="https://static.alili.tech/img/bVKeyx?w=1485&amp;h=613" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">参考</h3>
<ul>
<li><p><a href="https://undefinedblog.com/what-happened-after-set-state/" rel="nofollow noreferrer" target="_blank">https://undefinedblog.com/what-happened-after-set-state/</a></p></li>
<li><p><a href="https://zhuanlan.zhihu.com/p/20328570?refer=purerender" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/20328570?refer=purerender</a></p></li>
<li><p><a href="http://purplebamboo.github.io/2015/09/15/reactjs_source_analyze_part_one/" rel="nofollow noreferrer" target="_blank">http://purplebamboo.github.io/2015/09/15/reactjs_source_analyze_part_one/</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React源码解读系列 -- 核心概念

## 原文链接
[https://segmentfault.com/a/1190000008596719](https://segmentfault.com/a/1190000008596719)


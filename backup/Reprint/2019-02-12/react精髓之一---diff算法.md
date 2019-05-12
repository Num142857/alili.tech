---
title: 'react精髓之一---diff算法' 
date: 2019-02-12 2:30:12
hidden: true
slug: civuizfy2y
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">从react渲染开始：</h2>
<p>　　在说react虚拟dom之前我们先来看看react渲染过程，下面链接是根据源码渲染过程写的简写版。<br><a href="http://1.sharemandy.sinaapp.com/react_mount_code.js" rel="nofollow noreferrer" target="_blank">http://1.sharemandy.sinaapp.c...</a>  有js基础的比较好理解，也写了注释，不再详细展开。了解了初始化渲染后，再来看如何对比渲染。</p>
<h2 id="articleHeader1">传统diff算法</h2>
<p>react的一大特点就是虚拟DOM的diff算法，下图为diff实现流程图。</p>
<p><span class="img-wrap"><img data-src="/img/bVuHXW" src="https://static.alili.tech/img/bVuHXW" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>现在我们就主要分析下react的diff算法：<br>react的算法和传统算法有多不同，下面是我对传统算法的理解画的流程图（欢迎讨论）：</p>
<p><span class="img-wrap"><img data-src="/img/bVuGgm" src="https://static.alili.tech/img/bVuGgm" alt="传统diff算法" title="传统diff算法" style="cursor: pointer; display: inline;"></span></p>
<p>　　图很清楚，其实传统算法就是对每个节点一一对比，循环遍历所有的子节点，然后判断子节点的更新状态，分别为remove、add、change。如果before的子节点仍有子节点依旧顺次执行。<br>　　我们来观察下复杂度,传统 diff 算法的复杂度为 O(n^3)，单纯从demo看，复杂度不到n3，但实际上。<br>React 通过制定大胆的策略，将 O(n^3) 复杂度的问题转换成 O(n) 复杂度的问题。<br>　　其实算法直接降低这么多，肯定是有多牺牲的，或者说是是指定了特定的策略，定制化的实现了所需算法。react就是如此，他根据自己的特点，实现了部分代码的简化。</p>
<p><span class="img-wrap"><img data-src="/img/bVuH57" src="https://static.alili.tech/img/bVuH57" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上面的特点为react的核心，其实react的核心代码并不多，所以很多人都深究过，很多文章都有详细解释，在下面的好文章收录中都有提到，这里不再赘述，只做总结。</p>
<p>下篇我们就会讲讲diff算法的详细流程图</p>
<p>好文章收录：<br>react算法源码地址：<a href="https://github.com/facebook/react/blob/master/src/renderers/shared/reconciler/ReactMultiChild.js" rel="nofollow noreferrer" target="_blank">https://github.com/facebook/r...</a><br>论文算法详解：<a href="http://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf" rel="nofollow noreferrer" target="_blank">http://grfia.dlsi.ua.es/ml/al...</a><br>react源码剖析（这篇文章对图中移位算法有详细解释）：<a href="http://zhuanlan.zhihu.com/p/20346379?refer=purerender" rel="nofollow noreferrer" target="_blank">http://zhuanlan.zhihu.com/p/2...</a><br>源码分析：<a href="http://purplebamboo.github.io/" rel="nofollow noreferrer" target="_blank">http://purplebamboo.github.io/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react精髓之一---diff算法

## 原文链接
[https://segmentfault.com/a/1190000004913592](https://segmentfault.com/a/1190000004913592)


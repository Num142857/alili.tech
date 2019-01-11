---
title: '不小心用js重做了一遍贪吃蛇' 
date: 2019-01-12 2:30:24
hidden: true
slug: ru9bfzfnlvc
categories: [reprint]
---

{{< raw >}}

                    
<p>贪吃蛇游戏想必没人会感到陌生，这个游戏的js版本在网上也是一搜一大把，今天我要介绍的仍然是如何用js做一个贪吃蛇游戏，但在关键一步，蛇的运动的实现上略有不同。</p>
<p>贪吃蛇的js版本通常用连续的方块元素来实现蛇身，蛇的运动处理一般是这样的，让蛇头向运动方向偏移一格，其后的元素依次移向前一个元素的位置，从而实现蛇的移动，这里有一个更简单的方法，就是直接将蛇尾移到蛇头的移动位置，这样也可以实现移动效果，但只需要对一个元素进行一次DOM操作即可，无论从实现难度还是游戏性能方面，都有很大的优势。</p>
<p>基于这个核心重新实现了一次贪吃蛇游戏，并且完善了游戏的关卡设计，效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVPuWH?w=497&amp;h=576" src="https://static.alili.tech/img/bVPuWH?w=497&amp;h=576" alt="snake.png" title="snake.png" style="cursor: pointer; display: inline;"></span></p>
<p>效果预览：<a href="http://refined-x.com/projects/codes/snake.html" rel="nofollow noreferrer" target="_blank">http://refined-x.com/projects...</a></p>
<p>详细思路分析：<a href="http://refined-x.com/2017/06/19/%E5%86%8D%E5%81%9A%E4%B8%80%E6%9D%A1%E8%B4%AA%E5%90%83%E8%9B%87/" rel="nofollow noreferrer" target="_blank">http://refined-x.com/2017/06/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
不小心用js重做了一遍贪吃蛇

## 原文链接
[https://segmentfault.com/a/1190000009851357](https://segmentfault.com/a/1190000009851357)


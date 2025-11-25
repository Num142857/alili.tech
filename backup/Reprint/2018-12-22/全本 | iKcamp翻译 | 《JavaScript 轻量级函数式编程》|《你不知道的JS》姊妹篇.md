---
title: '全本 | iKcamp翻译 | 《JavaScript 轻量级函数式编程》|《你不知道的JS》姊妹篇' 
date: 2018-12-22 2:30:11
hidden: true
slug: k6blzotl6te
categories: [reprint]
---

{{< raw >}}

                    
<ul>
<li>原文地址：<a href="https://github.com/getify/Functional-Light-JS" rel="nofollow noreferrer" target="_blank">Functional-Light-JS</a>
</li>
<li>原文作者：<a href="https://github.com/getify" rel="nofollow noreferrer" target="_blank">Kyle Simpson　－　《You-Dont-Know-JS》作者</a>
</li>
</ul>
<blockquote>
<p>译者团队（排名不分先后）：<a href="https://github.com/aximario" rel="nofollow noreferrer" target="_blank">阿希</a>、<a href="https://github.com/blueken" rel="nofollow noreferrer" target="_blank">blueken</a>、<a href="https://github.com/brucecham" rel="nofollow noreferrer" target="_blank">brucecham</a>、<a href="https://github.com/cfanlife" rel="nofollow noreferrer" target="_blank">cfanlife</a>、<a href="https://github.com/dail" rel="nofollow noreferrer" target="_blank">dail</a>、<a href="https://github.com/kyoko-df" rel="nofollow noreferrer" target="_blank">kyoko-df</a>、<a href="https://github.com/l3ve" rel="nofollow noreferrer" target="_blank">l3ve</a>、<a href="https://github.com/lilins" rel="nofollow noreferrer" target="_blank">lilins</a>、<a href="https://github.com/LittlePineapple" rel="nofollow noreferrer" target="_blank">LittlePineapple</a>、<a href="https://github.com/MatildaJin" rel="nofollow noreferrer" target="_blank">MatildaJin</a>、<a href="https://github.com/miaodongqing" rel="nofollow noreferrer" target="_blank">冬青</a>、<a href="https://github.com/pobusama" rel="nofollow noreferrer" target="_blank">pobusama</a>、<a href="https://github.com/sunshine940326" rel="nofollow noreferrer" target="_blank">Cherry</a>、<a href="https://github.com/torrac12" rel="nofollow noreferrer" target="_blank">萝卜</a>、<a href="https://github.com/vavd317" rel="nofollow noreferrer" target="_blank">vavd317</a>、<a href="https://github.com/vivaxy" rel="nofollow noreferrer" target="_blank">vivaxy</a>、<a href="https://github.com/yanyixin" rel="nofollow noreferrer" target="_blank">萌萌</a>、<a href="https://github.com/zhouyao" rel="nofollow noreferrer" target="_blank">zhouyao</a></p>
<p>关于译者：这是一个流淌着沪江血液的纯粹工程：认真，是 HTML 最坚实的梁柱；分享，是 CSS  里最闪耀的一瞥；总结，是 JavaScript 中最严谨的逻辑。经过捶打磨练，成就了本书的中文版。本书包含了函数式编程之精髓，希望可以帮助大家在学习函数式编程的道路上走的更顺畅。比心。</p>
</blockquote>
<p>本书主要探索函数式编程<sup><a href="#note1">[1]</a></sup>(FP)的核心思想。在此过程中，作者不会执着于使用大量复杂的概念来进行诠释，这也是本书的特别之处。我们在 JavaScript 中应用的仅仅是一套基本的函数式编程概念的子集。我称之为“轻量级函数式编程(FLP)”。</p>
<p><strong>注释：</strong> 题目中使用了“轻量”二字，然而这并不是一本“轻松的”“入门级”书籍。本书是严谨的，充斥着各种复杂的细节，适合拥有扎实 JS 知识基础的阅读者进行研读。“轻量”意味着范围缩小。通常来说，关于函数式编程的 JavaScript 书籍都热衷于拓展阅读者的知识面，并企图覆盖更多的知识点。而本书则对于每一个话题都进行了深入的探究，尽管这种探究是小范围进行的。</p>
<p>让我们面对这个事实：除非你已经是函数式编程高手中的一员（至少我不是！），否则类似“一个单子仅仅是自函子中的幺半群”这类说法对我们来说毫无意义。</p>
<p>这并不是说，各种复杂繁琐的概念是<strong>无意义</strong>的，更不是说，函数式编程者滥用了它们。一旦你完全掌握了轻量的函数式编程内容，你将会／但愿会想要对函数式编程的各种概念进行更正式更系统的学习，并且你一定会对它们的意义和原因有更深入的理解。</p>
<p>但是我更想要让你能够<strong>现在</strong>就把一些函数式编程的基础运用到 JavaScript 编程过程中去，因为我相信这会帮助你写出更优秀的，更<strong>符合逻辑</strong>的代码。</p>
<p><strong>更多关于本书背后的动机和各种观点讨论，请参看[前言]。</strong></p>
<h2 id="articleHeader0">JavaScript 轻量级函数式编程</h2>
<h3 id="articleHeader1">目录</h3>
<ul>
<li>
<a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/foreword.md" rel="nofollow noreferrer" target="_blank">引言</a> (by <a href="https://twitter.com/DrBoolean" rel="nofollow noreferrer" target="_blank">Brian Lonsdorf aka "Prof Frisby"</a>)</li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/preface.md" rel="nofollow noreferrer" target="_blank">前言</a></li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch1.md" rel="nofollow noreferrer" target="_blank">第 1 章：为什么使用函数式编程？</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch1.md#%E7%BD%AE%E4%BF%A1%E5%BA%A6" rel="nofollow noreferrer" target="_blank">置信度</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch1.md#%E4%BA%A4%E6%B5%81%E6%B8%A0%E9%81%93" rel="nofollow noreferrer" target="_blank">交流渠道</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch1.md#%E5%8F%AF%E8%AF%BB%E6%80%A7%E6%9B%B2%E7%BA%BF" rel="nofollow noreferrer" target="_blank">可读性曲线</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch1.md#%E6%8E%A5%E5%8F%97" rel="nofollow noreferrer" target="_blank">接受</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch1.md#%E4%BD%A0%E4%B8%8D%E9%9C%80%E8%A6%81%E5%AE%83" rel="nofollow noreferrer" target="_blank">你不需要它</a></li>
<li><p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch1.md#%E8%B5%84%E6%BA%90" rel="nofollow noreferrer" target="_blank">资源</a></p></li>
<li><ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch1.md#%E4%B9%A6%E7%B1%8D%E6%8E%A8%E8%8D%90" rel="nofollow noreferrer" target="_blank">书籍推荐</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch1.md#%E5%8D%9A%E5%AE%A2%E5%92%8C%E7%AB%99%E7%82%B9" rel="nofollow noreferrer" target="_blank">博客和站点</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch1.md#%E4%B8%80%E4%BA%9B%E5%BA%93" rel="nofollow noreferrer" target="_blank">一些库</a></li>
</ul></li>
<ul><li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch1.md#%E6%80%BB%E7%BB%93" rel="nofollow noreferrer" target="_blank">总结</a></li></ul>
</ul>
</li>
</ul>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md" rel="nofollow noreferrer" target="_blank">第 2 章：函数基础</a></p>
<ul>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md#%E4%BB%80%E4%B9%88%E6%98%AF%E5%87%BD%E6%95%B0" rel="nofollow noreferrer" target="_blank">什么是函数？</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md#%E7%AE%80%E8%A6%81%E7%9A%84%E6%95%B0%E5%AD%A6%E5%9B%9E%E9%A1%BE" rel="nofollow noreferrer" target="_blank">简要的数学回顾</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md#%E5%87%BD%E6%95%B0-vs-%E7%A8%8B%E5%BA%8F" rel="nofollow noreferrer" target="_blank">函数 vs 程序</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md#%E5%87%BD%E6%95%B0%E8%BE%93%E5%85%A5" rel="nofollow noreferrer" target="_blank">函数输入</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md#%E8%BE%93%E5%85%A5%E8%AE%A1%E6%95%B0" rel="nofollow noreferrer" target="_blank">输入计数</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md#%E9%9A%8F%E7%9D%80%E8%BE%93%E5%85%A5%E8%80%8C%E5%8F%98%E5%8C%96%E7%9A%84%E5%87%BD%E6%95%B0" rel="nofollow noreferrer" target="_blank">随着输入而变化的函数</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md#%E5%87%BD%E6%95%B0%E8%BE%93%E5%87%BA" rel="nofollow noreferrer" target="_blank">函数输出</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md#%E6%8F%90%E5%89%8D-return" rel="nofollow noreferrer" target="_blank">提前 return</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md#%E6%9C%AA-return-%E7%9A%84%E8%BE%93%E5%87%BA" rel="nofollow noreferrer" target="_blank">未 return 的输出</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md#%E5%87%BD%E6%95%B0%E5%8A%9F%E8%83%BD" rel="nofollow noreferrer" target="_blank">函数功能</a></p>
<ul><li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md#%E4%BF%9D%E6%8C%81%E4%BD%9C%E7%94%A8%E5%9F%9F" rel="nofollow noreferrer" target="_blank">保持作用域</a></li></ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md#%E5%8F%A5%E6%B3%95" rel="nofollow noreferrer" target="_blank">句法</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md#%E4%BB%80%E4%B9%88%E6%98%AF%E5%90%8D%E7%A7%B0" rel="nofollow noreferrer" target="_blank">什么是名称？</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md#%E6%B2%A1%E6%9C%89-function-%E7%9A%84%E5%87%BD%E6%95%B0" rel="nofollow noreferrer" target="_blank">没有 function 的函数</a></li>
</ul>
</li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md#%E6%9D%A5%E8%AF%B4%E8%AF%B4-this-" rel="nofollow noreferrer" target="_blank">来说说 This ？</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch2.md#%E6%80%BB%E7%BB%93" rel="nofollow noreferrer" target="_blank">总结</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch3.md" rel="nofollow noreferrer" target="_blank">第 3 章：管理函数的输入（Inputs）</a></p>
<ul>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch3.md#%E7%AB%8B%E5%8D%B3%E4%BC%A0%E5%8F%82%E5%92%8C%E7%A8%8D%E5%90%8E%E4%BC%A0%E5%8F%82" rel="nofollow noreferrer" target="_blank">立即传参和稍后传参</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch3.md#bind" rel="nofollow noreferrer" target="_blank">bind(..)</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch3.md#%E5%B0%86%E5%AE%9E%E5%8F%82%E9%A1%BA%E5%BA%8F%E9%A2%A0%E5%80%92" rel="nofollow noreferrer" target="_blank">将实参顺序颠倒</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch3.md#%E4%B8%80%E6%AC%A1%E4%BC%A0%E4%B8%80%E4%B8%AA" rel="nofollow noreferrer" target="_blank">一次传一个</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch3.md#%E6%9F%AF%E9%87%8C%E5%8C%96%E5%92%8C%E5%81%8F%E5%BA%94%E7%94%A8%E6%9C%89%E4%BB%80%E4%B9%88%E7%94%A8" rel="nofollow noreferrer" target="_blank">柯里化和偏应用有什么用？</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch3.md#%E5%A6%82%E4%BD%95%E6%9F%AF%E9%87%8C%E5%8C%96%E5%A4%9A%E4%B8%AA%E5%AE%9E%E5%8F%82" rel="nofollow noreferrer" target="_blank">如何柯里化多个实参？</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch3.md#%E5%8F%8D%E6%9F%AF%E9%87%8C%E5%8C%96" rel="nofollow noreferrer" target="_blank">反柯里化</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch3.md#%E5%8F%AA%E8%A6%81%E4%B8%80%E4%B8%AA%E5%AE%9E%E5%8F%82" rel="nofollow noreferrer" target="_blank">只要一个实参</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch3.md#%E4%BC%A0%E4%B8%80%E4%B8%AA%E8%BF%94%E5%9B%9E%E4%B8%80%E4%B8%AA" rel="nofollow noreferrer" target="_blank">传一个返回一个</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch3.md#%E6%81%92%E5%AE%9A%E5%8F%82%E6%95%B0" rel="nofollow noreferrer" target="_blank">恒定参数</a></li>
</ul>
</li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch3.md#%E6%89%A9%E5%B1%95%E5%9C%A8%E5%8F%82%E6%95%B0%E4%B8%AD%E7%9A%84%E5%A6%99%E7%94%A8" rel="nofollow noreferrer" target="_blank">扩展在参数中的妙用</a></li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch3.md#%E5%8F%82%E6%95%B0%E9%A1%BA%E5%BA%8F%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B%E5%84%BF" rel="nofollow noreferrer" target="_blank">参数顺序的那些事儿</a></p>
<ul><li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch3.md#%E5%B1%9E%E6%80%A7%E6%89%A9%E5%B1%95" rel="nofollow noreferrer" target="_blank">属性扩展</a></li></ul>
</li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch3.md#%E6%97%A0%E5%BD%A2%E5%8F%82%E9%A3%8E%E6%A0%BC" rel="nofollow noreferrer" target="_blank">无形参风格</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch3.md#%E6%80%BB%E7%BB%93" rel="nofollow noreferrer" target="_blank">总结</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch4.md" rel="nofollow noreferrer" target="_blank">第 4 章：组合函数</a></p>
<ul>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch4.md#%E8%BE%93%E5%87%BA%E5%88%B0%E8%BE%93%E5%85%A5" rel="nofollow noreferrer" target="_blank">输出到输入</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch4.md#%E5%88%B6%E9%80%A0%E6%9C%BA%E5%99%A8" rel="nofollow noreferrer" target="_blank">制造机器</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch4.md#%E7%BB%84%E5%90%88%E7%9A%84%E5%8F%98%E4%BD%93" rel="nofollow noreferrer" target="_blank">组合的变体</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch4.md#%E9%80%9A%E7%94%A8%E7%BB%84%E5%90%88" rel="nofollow noreferrer" target="_blank">通用组合</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch4.md#%E4%B8%8D%E5%90%8C%E7%9A%84%E5%AE%9E%E7%8E%B0" rel="nofollow noreferrer" target="_blank">不同的实现</a></li>
</ul>
</li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch4.md#%E9%87%8D%E6%8E%92%E5%BA%8F%E7%BB%84%E5%90%88" rel="nofollow noreferrer" target="_blank">重排序组合</a></li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch4.md#%E6%8A%BD%E8%B1%A1" rel="nofollow noreferrer" target="_blank">抽象</a></p>
<ul><li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch4.md#%E5%B0%86%E7%BB%84%E5%90%88%E5%BD%93%E4%BD%9C%E6%8A%BD%E8%B1%A1" rel="nofollow noreferrer" target="_blank">将组合当作抽象</a></li></ul>
</li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch4.md#%E5%9B%9E%E9%A1%BE%E5%BD%A2%E5%8F%82" rel="nofollow noreferrer" target="_blank">回顾形参</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch4.md#%E6%80%BB%E7%BB%93" rel="nofollow noreferrer" target="_blank">总结</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md" rel="nofollow noreferrer" target="_blank">第 5 章：减少副作用</a></p>
<ul>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#%E4%BB%80%E4%B9%88%E6%98%AF%E5%89%AF%E4%BD%9C%E7%94%A8" rel="nofollow noreferrer" target="_blank">什么是副作用</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#%E6%BD%9C%E5%9C%A8%E7%9A%84%E5%8E%9F%E5%9B%A0" rel="nofollow noreferrer" target="_blank">潜在的原因</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#io-%E6%95%88%E6%9E%9C" rel="nofollow noreferrer" target="_blank">I/O 效果</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#%E5%85%B6%E4%BB%96%E7%9A%84%E9%94%99%E8%AF%AF" rel="nofollow noreferrer" target="_blank">其他的错误</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#%E4%B8%80%E6%AC%A1%E5%B0%B1%E5%A5%BD" rel="nofollow noreferrer" target="_blank">一次就好</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#%E6%95%B0%E5%AD%A6%E4%B8%AD%E7%9A%84%E5%B9%82%E7%AD%89" rel="nofollow noreferrer" target="_blank">数学中的幂等</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#%E7%BC%96%E7%A8%8B%E4%B8%AD%E7%9A%84%E5%B9%82%E7%AD%89" rel="nofollow noreferrer" target="_blank">编程中的幂等</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#%E7%BA%AF%E7%B2%B9%E7%9A%84%E5%BF%AB%E4%B9%90" rel="nofollow noreferrer" target="_blank">纯粹的快乐</a></p>
<ul><li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#%E7%9B%B8%E5%AF%B9%E7%9A%84%E7%BA%AF%E7%B2%B9" rel="nofollow noreferrer" target="_blank">相对的纯粹</a></li></ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#%E6%9C%89%E6%88%96%E8%80%85%E6%97%A0" rel="nofollow noreferrer" target="_blank">有或者无</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#%E6%80%9D%E8%80%83%E4%B8%8A%E7%9A%84%E9%80%8F%E6%98%8E" rel="nofollow noreferrer" target="_blank">思考上的透明</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#%E4%B8%8D%E5%A4%9F%E9%80%8F%E6%98%8E" rel="nofollow noreferrer" target="_blank">不够透明？</a></li>
</ul>
</li>
<li><p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#%E7%BA%AF%E5%8C%96" rel="nofollow noreferrer" target="_blank">纯化</a></p></li>
<li><ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#%E5%B0%81%E9%97%AD%E7%9A%84%E5%BD%B1%E5%93%8D" rel="nofollow noreferrer" target="_blank">封闭的影响</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#%E8%A6%86%E7%9B%96%E6%95%88%E6%9E%9C" rel="nofollow noreferrer" target="_blank">覆盖效果</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#%E5%9B%9E%E9%81%BF%E5%BD%B1%E5%93%8D" rel="nofollow noreferrer" target="_blank">回避影响</a></li>
</ul></li>
<ul><li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch5.md#%E6%80%BB%E7%BB%93" rel="nofollow noreferrer" target="_blank">总结</a></li></ul>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch6.md" rel="nofollow noreferrer" target="_blank">第 6 章：值的不可变性</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch6.md#%E5%8E%9F%E5%A7%8B%E5%80%BC%E7%9A%84%E4%B8%8D%E5%8F%AF%E5%8F%98%E6%80%A7" rel="nofollow noreferrer" target="_blank">原始值的不可变性</a></li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch6.md#%E4%BB%8E%E5%80%BC%E5%88%B0%E5%80%BC" rel="nofollow noreferrer" target="_blank">从值到值</a></p>
<ul><li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch6.md#%E6%B6%88%E9%99%A4%E6%9C%AC%E5%9C%B0%E5%BD%B1%E5%93%8D" rel="nofollow noreferrer" target="_blank">消除本地影响</a></li></ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch6.md#%E9%87%8D%E6%96%B0%E8%B5%8B%E5%80%BC" rel="nofollow noreferrer" target="_blank">重新赋值</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch6.md#%E6%84%8F%E5%9B%BE" rel="nofollow noreferrer" target="_blank">意图</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch6.md#%E5%86%BB%E7%BB%93" rel="nofollow noreferrer" target="_blank">冻结</a></li>
</ul>
</li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch6.md#%E6%80%A7%E8%83%BD" rel="nofollow noreferrer" target="_blank">性能</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch6.md#%E4%BB%A5%E4%B8%8D%E5%8F%AF%E5%8F%98%E7%9A%84%E7%9C%BC%E5%85%89%E7%9C%8B%E5%BE%85%E6%95%B0%E6%8D%AE" rel="nofollow noreferrer" target="_blank">以不可变的眼光看待数据</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch6.md#%E6%80%BB%E7%BB%93" rel="nofollow noreferrer" target="_blank">总结</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch7.md" rel="nofollow noreferrer" target="_blank">第 7 章: 闭包 vs 对象</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch7.md#%E8%BE%BE%E6%88%90%E5%85%B1%E8%AF%86" rel="nofollow noreferrer" target="_blank">达成共识</a></li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch7.md#%E7%9B%B8%E5%83%8F" rel="nofollow noreferrer" target="_blank">相像</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch7.md#%E7%8A%B6%E6%80%81" rel="nofollow noreferrer" target="_blank">状态</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch7.md#%E8%A1%8C%E4%B8%BA%E4%B9%9F%E6%98%AF%E4%B8%80%E6%A0%B7" rel="nofollow noreferrer" target="_blank">行为，也是一样！</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch7.md#%E4%B8%8D%E5%8F%AF%E5%8F%98" rel="nofollow noreferrer" target="_blank">（不）可变</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch7.md#%E5%90%8C%E6%9E%84" rel="nofollow noreferrer" target="_blank">同构</a></li>
</ul>
</li>
<li><p><a>同根异枝</a></p></li>
<li><ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch7.md#%E7%BB%93%E6%9E%84%E5%8F%AF%E5%8F%98%E6%80%A7" rel="nofollow noreferrer" target="_blank">结构可变性</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch7.md#%E7%A7%81%E6%9C%89" rel="nofollow noreferrer" target="_blank">私有</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch7.md#%E7%8A%B6%E6%80%81%E6%8B%B7%E8%B4%9D" rel="nofollow noreferrer" target="_blank">状态拷贝</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch7.md#%E6%80%A7%E8%83%BD" rel="nofollow noreferrer" target="_blank">性能</a></li>
</ul></li>
<ul><li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch7.md#%E6%80%BB%E7%BB%93" rel="nofollow noreferrer" target="_blank">总结</a></li></ul>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch8.md" rel="nofollow noreferrer" target="_blank">第 8 章：列表操作</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch8.md#%E9%9D%9E%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B%E5%88%97%E8%A1%A8%E5%A4%84%E7%90%86" rel="nofollow noreferrer" target="_blank">非函数式编程列表处理</a></li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch8.md#%E6%98%A0%E5%B0%84" rel="nofollow noreferrer" target="_blank">映射</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch8.md#%E6%98%A0%E5%B0%84-vs-%E9%81%8D%E5%8E%86" rel="nofollow noreferrer" target="_blank">映射 vs 遍历</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch8.md#%E4%B8%80%E4%B8%AA%E8%AF%8D%E5%87%BD%E5%AD%90" rel="nofollow noreferrer" target="_blank">一个词：函子</a></li>
</ul>
</li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch8.md#%E8%BF%87%E6%BB%A4%E5%99%A8" rel="nofollow noreferrer" target="_blank">过滤器</a></li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch8.md#reduce" rel="nofollow noreferrer" target="_blank">Reduce</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch8.md#map-%E4%B9%9F%E6%98%AF-reduce" rel="nofollow noreferrer" target="_blank">Map 也是 Reduce</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch8.md#filter-%E4%B9%9F%E6%98%AF-reduce" rel="nofollow noreferrer" target="_blank">Filter 也是 Reduce</a></li>
</ul>
</li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch8.md#%E9%AB%98%E7%BA%A7%E5%88%97%E8%A1%A8%E6%93%8D%E4%BD%9C" rel="nofollow noreferrer" target="_blank">高级列表操作</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch8.md#%E6%96%B9%E6%B3%95-vs-%E7%8B%AC%E7%AB%8B" rel="nofollow noreferrer" target="_blank">方法 vs 独立</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch8.md#%E6%9F%A5%E5%AF%BB%E5%88%97%E8%A1%A8" rel="nofollow noreferrer" target="_blank">查寻列表</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch8.md#%E8%9E%8D%E5%90%88" rel="nofollow noreferrer" target="_blank">融合</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch8.md#%E5%88%97%E8%A1%A8%E4%B9%8B%E5%A4%96" rel="nofollow noreferrer" target="_blank">列表之外</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch8.md#%E6%80%BB%E7%BB%93" rel="nofollow noreferrer" target="_blank">总结</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch9.md" rel="nofollow noreferrer" target="_blank">第 9 章：递归</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch9.md#%E5%AE%9A%E4%B9%89" rel="nofollow noreferrer" target="_blank">定义</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch9.md#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%80%89%E6%8B%A9%E9%80%92%E5%BD%92" rel="nofollow noreferrer" target="_blank">为什么选择递归</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch9.md#%E5%A3%B0%E6%98%8E%E5%BC%8F%E9%80%92%E5%BD%92" rel="nofollow noreferrer" target="_blank">声明式递归</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch9.md#%E9%87%8D%E6%9E%84%E9%80%92%E5%BD%92" rel="nofollow noreferrer" target="_blank">重构递归</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch9.md#%E6%80%BB%E7%BB%93" rel="nofollow noreferrer" target="_blank">总结</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch10.md" rel="nofollow noreferrer" target="_blank">第 10 章：异步的函数式</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch10.md#%E6%97%B6%E9%97%B4%E7%8A%B6%E6%80%81" rel="nofollow noreferrer" target="_blank">时间状态</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch10.md#%E7%A7%AF%E6%9E%81%E7%9A%84-vs-%E6%83%B0%E6%80%A7%E7%9A%84" rel="nofollow noreferrer" target="_blank">积极的 vs 惰性的</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch10.md#%E5%93%8D%E5%BA%94%E5%BC%8F%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B" rel="nofollow noreferrer" target="_blank">响应式函数式编程</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch10.md#%E6%80%BB%E7%BB%93" rel="nofollow noreferrer" target="_blank">总结</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch11.md" rel="nofollow noreferrer" target="_blank">第 11 章：融会贯通</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch11.md#%E5%87%86%E5%A4%87" rel="nofollow noreferrer" target="_blank">准备</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch11.md#%E8%82%A1%E7%A5%A8%E4%BF%A1%E6%81%AF" rel="nofollow noreferrer" target="_blank">股票信息</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch11.md#%E8%82%A1%E7%A5%A8%E8%A1%8C%E6%83%85%E7%95%8C%E9%9D%A2" rel="nofollow noreferrer" target="_blank">股票行情界面</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/ch11.md#%E6%80%BB%E7%BB%93" rel="nofollow noreferrer" target="_blank">总结</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apA.md" rel="nofollow noreferrer" target="_blank">附录 A: Transducing</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apA.md#%E9%A6%96%E5%85%88%E4%B8%BA%E4%BB%80%E4%B9%88" rel="nofollow noreferrer" target="_blank">首先，为什么</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apA.md#%E5%A6%82%E4%BD%95%E4%B8%8B%E4%B8%80%E6%AD%A5" rel="nofollow noreferrer" target="_blank">如何,下一步</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apA.md#%E6%9C%80%E5%90%8E" rel="nofollow noreferrer" target="_blank">最后</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apA.md#%E6%80%BB%E7%BB%93" rel="nofollow noreferrer" target="_blank">总结</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apB.md" rel="nofollow noreferrer" target="_blank">附录 B: 谦虚的 Monad</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apB.md#%E7%B1%BB%E5%9E%8B" rel="nofollow noreferrer" target="_blank">类型</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apB.md#%E6%9D%BE%E6%95%A3%E6%8E%A5%E5%8F%A3" rel="nofollow noreferrer" target="_blank">松散接口</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apB.md#maybe" rel="nofollow noreferrer" target="_blank">Maybe</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apB.md#humble" rel="nofollow noreferrer" target="_blank">Humble</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apB.md#humility" rel="nofollow noreferrer" target="_blank">Humility</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apB.md#%E6%80%BB%E7%BB%93" rel="nofollow noreferrer" target="_blank">总结</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apC.md" rel="nofollow noreferrer" target="_blank">附录 C: 函数式编程函数库</a></p>
<ul>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apC.md#ramda-0230" rel="nofollow noreferrer" target="_blank">Ramda (0.23.0)</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apC.md#lodashfp-4174" rel="nofollow noreferrer" target="_blank">Lodash/fp (4.17.4)</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apC.md#mori-032" rel="nofollow noreferrer" target="_blank">Mori (0.3.2)</a></li>
<li><a href="https://github.com/ikcamp/Functional-Light-JS/blob/zh-cn/apC.md#%E6%80%BB%E7%BB%93" rel="nofollow noreferrer" target="_blank">总结</a></li>
</ul>
</li>
<h2 id="articleHeader2">关于出版</h2>
<p>本书主要在 <a href="https://leanpub.com/fljs/" rel="nofollow noreferrer" target="_blank">on Leanpub</a> 平台上以电子版本的形式进行出版。我也尝试出售本书的纸质版本，但没有确定的方案。</p>
<p>除了购买本书以外，如果你想要对本书作一些物质上的捐赠，请在 <a href="https://www.patreon.com/getify" rel="nofollow noreferrer" target="_blank">patreon</a> 上进行操作。本书作者感谢你的慷慨解囊。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010887895" src="https://static.alili.tech/img/remote/1460000010887895" alt="Patreon" title="Patreon" style="cursor: pointer;"></span><br><a href="https://www.patreon.com/getify" rel="nofollow noreferrer" target="_blank">Patreon</a></p>
<h2 id="articleHeader3">Contributions</h2>
<p><strong>非常欢迎</strong>对于本书的任何内容贡献。但是在提交 PR 之前<strong>请务必</strong>认真阅读 <a href="https://github.com/getify/Functional-Light-JS/blob/master/CONTRIBUTING.md" rel="nofollow noreferrer" target="_blank">Contributions Guidelines</a>。</p>
<h2 id="articleHeader4">License &amp; Copyright</h2>
<p>本书所有的材料和内容都归属 (c) 2016-2017 Kyle Simpson 所有。</p>
<p><a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">&lt;img alt="Creative Commons License" style="border-width:0" src="</a><a href="https://user-gold-cdn.xitu.io/2017/8/21/e32f5f0ebb5a557478b9e5fc637e3f99&amp;quot" rel="nofollow noreferrer" target="_blank">https://user-gold-cdn.xitu.io...</a>; /&gt;<br>本书根据<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">Creative Commons Attribution-NonCommercial-NoDerivs 4.0 Unported License</a> 进行授权许可.</p>
<ol><li>
<a></a> FP，本书统称为函数式编程。</li></ol>
<ol><li>
<a></a> FPer，本书统称为函数式编程者。</li></ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010887896" src="https://static.alili.tech/img/remote/1460000010887896" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012394646?w=1426&amp;h=778" src="https://static.alili.tech/img/remote/1460000012394646?w=1426&amp;h=778" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012394647" src="https://static.alili.tech/img/remote/1460000012394647" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote><p>P.S. 　整理的好辛苦　％》——《％</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
全本 | iKcamp翻译 | 《JavaScript 轻量级函数式编程》|《你不知道的JS》姊妹篇

## 原文链接
[https://segmentfault.com/a/1190000012394641](https://segmentfault.com/a/1190000012394641)


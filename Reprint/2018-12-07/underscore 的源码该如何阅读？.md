---
title: 'underscore 的源码该如何阅读？' 
date: 2018-12-07 2:30:10
hidden: true
slug: g3i8wiz5amu
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>别名：《underscore 系列 8 篇正式完结！》</p>
<h2 id="articleHeader1">介绍</h2>
<p>underscore 系列是我写的第三个系列，前两个系列分别是 <a href="https://github.com/mqyqingfeng/Blog/issues/17" rel="nofollow noreferrer" target="_blank">JavaScript 深入系列</a>、<a href="https://github.com/mqyqingfeng/Blog/issues/53" rel="nofollow noreferrer" target="_blank">JavaScript 专题系列</a>。</p>
<p>这个系列算是 JavaScript 专题系列的番外篇，总共写了 8 篇，重点介绍了 underscore 中的代码组织、链式调用、内部函数、模板引擎、工具函数等内容，旨在帮助大家阅读源码，以及写出自己的 undercore。</p>
<p>顺便宣传一下该博客的 Github 仓库：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>，欢迎 star，鼓励一下作者。</p>
<h2 id="articleHeader2">起因</h2>
<p>想先聊聊为什么会写 underscore 系列？</p>
<p>最一开始写 JavaScript 专题系列的时候，因为涉及到去重、扁平等功能点的实现，所以就研究了 underscore 中的实现方式，后来写完专题系列，有朋友就问我该如何组织这些功能函数呢？</p>
<p>说起来，我也有这样的困惑，因为以前在技术平台上也看到过一些分享自己常用功能函数的文章，每当这个时候，总会幻想如果有篇文章能讲讲该如何组织代码，然后我学会后，在业务中不断总结完善，或许我也能写出自己的工具函数库。</p>
<p>临渊羡鱼，不如退而结网，所以我想研究下 underscore 的代码是如何组织的，后来又觉得反正都看了一遍，再进一步，讲讲 underscore 的源码吧。</p>
<p>不过，这个系列的内容跟一般讲解 underscore 源码的系列文章还是有很大的不同，主要在于它讲的算是很"边缘"的内容，从文章的标题中也可以看出，讲完代码结构后，讲了内部函数、模板引擎，工具函数等这些并不是在实际开发中常用到的 API，即便是在其他的系列文章中，这些也算是很冷门的内容，不过这也正好印证了我写 underscore 系列的目的，就是帮助大家更好的阅读源码。</p>
<p>所以它与其他 underscore 系列的文章并不冲突，完全可以在阅读完这个系列后，再跟着其他系列的文章接着学习。</p>
<h2 id="articleHeader3">如何阅读</h2>
<p>我在写 underscore 系列的时候，被问的最多的问题就是该怎么阅读 underscore 源码？我想简单聊一下自己的思路。</p>
<p>首先，underscore 的定位是一个功能函数库，提供了 110 多个 API 帮助开发，所以首先要搞明白的就是那么多的函数，是如何组织的？是如何做到既可以直接使用，又能以面向对象的方式使用的？又是如何实现链式调用的？了解了如何组织代码，甚至从中抽离得到一个模板，我们再从业务中慢慢总结，最终也能写出自己的 underscore。</p>
<p>接下来是阅读内部函数，其实不多，只有 cb、optimizeCb、restArgs、shallowProperty、deepGet 而已，之所以阅读这些函数的实现，是因为在读其他 API 时很可能会接触到这些函数，我第一次在其他 API 中看到 cb、optimizeCb、restArgs 函数时都是一脸懵逼，接着看 API 吧，总觉得这点没看懂，心里一直很不爽，转而去看这些函数的实现，又因为只读了一点源码，想不明白为什么要这样抽象，进退两难，慢慢的就产生了挫败感，这也就是我为什么会专门写了两篇介绍内部函数，不仅仅是讲解源码，更重要的是希望大家明白为什么要这么抽象。</p>
<p>最后就是跟着兴趣学习，underscore API 众多，一个一个看实在是消磨热情，倒不如你想了解哪个功能就去研究哪个功能的实现，如果说在这部分有什么建议的话，那就是在研究一些函数具体的实现方式时，可以参考一些已经写过的源码分析的文章，也许事半功倍：</p>
<ol>
<li><a href="https://www.gitbook.com/book/yoyoyohamapi/undersercore-analysis/details" rel="nofollow noreferrer" target="_blank">吴晓军源码分析系列</a></li>
<li><a href="https://github.com/hanzichi/underscore-analysis" rel="nofollow noreferrer" target="_blank">韩子迟源码分析系列</a></li>
</ol>
<p>当然啦，即便如此，阅读源码的过程也并不是一帆风顺，总会因为各种原因，放弃又重新拾起，又放弃又重新拾起，很正常，我也没有什么好的方法，只能说保持一个平和的心态就是一种进步。</p>
<h2 id="articleHeader4">全目录</h2>
<ol>
<li><a href="https://github.com/mqyqingfeng/Blog/issues/56" rel="nofollow noreferrer" target="_blank">underscore 系列之如何写自己的 underscore</a></li>
<li><a href="https://github.com/mqyqingfeng/Blog/issues/57" rel="nofollow noreferrer" target="_blank">underscore 系列之链式调用</a></li>
<li><a href="https://github.com/mqyqingfeng/Blog/issues/58" rel="nofollow noreferrer" target="_blank">underscore 系列之内部函数 cb 和 optimizeCb</a></li>
<li><a href="https://github.com/mqyqingfeng/Blog/issues/60" rel="nofollow noreferrer" target="_blank">underscore 系列之内部函数 restArgs</a></li>
<li><a href="https://github.com/mqyqingfeng/Blog/issues/62" rel="nofollow noreferrer" target="_blank">underscore 系列之防冲突与 Utility Functions</a></li>
<li><a href="https://github.com/mqyqingfeng/Blog/issues/63" rel="nofollow noreferrer" target="_blank">underscore 系列之实现一个模板引擎(上)</a></li>
<li><a href="https://github.com/mqyqingfeng/Blog/issues/70" rel="nofollow noreferrer" target="_blank">underscore 系列之实现一个模板引擎(下)</a></li>
<li><a href="https://github.com/mqyqingfeng/Blog/issues/77" rel="nofollow noreferrer" target="_blank">underscore 系列之字符实体与 _.escape</a></li>
</ol>
<h2 id="articleHeader5">下期预告</h2>
<p>按照原定的计划，是准备写 ES6 系列的，不过，因为工作的原因，很可能会先写 React 系列，暂时还不能确定，今年只希望能写完最后两个系列。</p>
<p>感谢大家的阅读和支持，我是冴羽，下个系列再见啦！[]~(￣▽￣)~**</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
underscore 的源码该如何阅读？

## 原文链接
[https://segmentfault.com/a/1190000014150441](https://segmentfault.com/a/1190000014150441)


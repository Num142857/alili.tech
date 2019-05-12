---
title: '一次发现underscore源码bug的经历以及对学术界拿来主义的思考' 
date: 2019-02-12 2:30:12
hidden: true
slug: tl3cwcff3iq
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">事情是如何发生的</h1>
<p>最近干了件事情，发现了 underscore 源码的一个 bug。这件事本身并没有什么可说的，但是过程值得我们深思，记录如下，各位看官仁者见仁智者见智。</p>
<p>平时有浏览别人文章的习惯，看到一篇关于 "函数节流" 的文章（具体是哪篇就不说了），不过很遗憾作者似乎并没有搞清楚 throttle 和 debounce 的区别（或许根本不知道 debounce)。于是随手 Google 了一下，发现大多数谈 "函数节流" 的文章都会引用《高程三》中的经典代码：</p>
<p><span class="img-wrap"><img data-src="http://images2015.cnblogs.com/blog/675542/201603/675542-20160326150241120-393738911.png" src="https://static.alili.techhttp://images2015.cnblogs.com/blog/675542/201603/675542-20160326150241120-393738911.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>代码本身并没有问题，但是很可惜，函数名有问题，应该叫 debounce 而非 throttle，这就引发了我的思考，这个错误的概念，这段错误的代码，为什么能够 "流芳百世"？</p>
<h1 id="articleHeader1">throttle vs debounce</h1>
<p>由于篇幅以及主题的关系，本文并不会讲 throttle 和 debounce 的具体用法以及区别等。（对此有兴趣的朋友可以跟帖，人数多的话楼主会另开一文）</p>
<p>有些人可能会说，凭什么你以为的 throttle 就是 throttle，debounce 就是 debounce？这就要聊聊我对于 "理解某一个概念" 的方法。</p>
<p>就以 throttle 为例，某日，老师给你布置了一个作业，让你深入理解一下 throttle，第二天上课来聊聊。张三心里非常高兴，这个概念在经典书籍《JavaScript高级程序设计》中见过，打开一看，就两页，而且解释地非常清晰，看完就高兴地干别的事情去了。而李四，觉得高程三讲的有点少，而去谷歌了下其他关于 throttle 的知识点，兴奋地看到 throttle 函数的好几种写法，发现高程三只是用了最简单的方式，还有更优雅运用场景更多的写法，或许此时他已经发现和 throttle 同时出现的还有个 debounce，这是什么鬼？反正老师没说，以后再看吧，于是心满意足地玩游戏去了。而王五，和李四一样发现了 debounce，这是什么？一起了解了吧，继而发现 debounce 的用法居然和高程三中的 throttle 一样！继续挖下去，发现高程三中的 throttle 函数其实应该叫 debounce，看到最后，王五已经把 throttle 和 debounce 彻底理解了。</p>
<p>我们要做王五。</p>
<p>首先，我们并不能只听一家之言。这里的一家是指 "个人"，对于一些官方的文档我们还是应该充分信任的。泽卡斯也是人，犯点小错在所难免。</p>
<p>其次，我们对信息要做充分删选。网上的信息大多鱼龙混杂，出错了也并不会对你负任何责任。那么如何能够辨别出正确有用的信息呢？首先当然是看官方文档，比如说要了解 HTTP 那么就去看官方的 RFC，要学习 jQuery 的话可以去官网 <a href="https://jquery.org/" rel="nofollow noreferrer" target="_blank">https://jquery.org/</a> 查查资料，这些一般都不会有什么问题。如果觉得官网资料晦涩难懂，可以试着去看看 Wikipedia 或者XX百科，维基的精确度被很多人喷过，楼主觉得还是值得一看的，如果看英文比较吃力的，就看看国内的一些百科。第三，就是浏览一些前人的文章了，这也是最普遍但是也最容易混淆概念的地方，所以我们要尽量挑一些权威的专家级作者（比如楼主，开玩笑啦^_^）。第四，如果还是觉得没法理解，可以试着去一些问答社区，首推 stackoverflow，国内的话可以看看 segmentfault，知乎，看赞同多的回答，一般来说问题不大。</p>
<p>楼主找到的关于 throttle 和 debounce 区别的资料如下：</p>
<ul>
<li><p><a href="http://benalman.com/projects/jquery-throttle-debounce-plugin/" rel="nofollow noreferrer" target="_blank">http://benalman.com/projects/jquery-throttle-debounce-plugin/</a></p></li>
<li><p><a href="https://davidwalsh.name/javascript-debounce-function" rel="nofollow noreferrer" target="_blank">https://davidwalsh.name/javascript-debounce-function</a></p></li>
<li><p><a href="https://css-tricks.com/the-difference-between-throttling-and-debouncing/" rel="nofollow noreferrer" target="_blank">https://css-tricks.com/the-difference-between-throttling-and-debouncing/</a></p></li>
<li><p><a href="https://ict.ken.be/javascript-debounce-vs-throttle-function" rel="nofollow noreferrer" target="_blank">https://ict.ken.be/javascript-debounce-vs-throttle-function</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/25991367/difference-between-throttling-and-debouncing-a-function" rel="nofollow noreferrer" target="_blank">http://stackoverflow.com/questions/25991367/difference-between-throttling-and-debouncing-a-function</a></p></li>
</ul>
<h1 id="articleHeader2">关于拿来主义</h1>
<p>为什么这么多文章里会出现泽卡斯的错误代码？楼主想到了一个词，叫做 "拿来主义"。</p>
<p>很多人写博客，只是为了写博客而写博客，随便谷歌百度下，找到搜索页前几个链接，东拼西凑下，一篇新鲜的博文就诞生了，甚至都没有自己写 demo 测试下，就把代码粘贴上去了，楼主对这样的行为是嗤之以鼻的。以前写过一篇文章，叫做 <a href="http://www.cnblogs.com/zichi/p/5229108.html" rel="nofollow noreferrer" target="_blank">get与post需要注意的几点</a>，写这篇文章的时候，看到过一篇叫做 <a href="http://www.cnblogs.com/nankezhishi/archive/2012/06/09/getandpost.html" rel="nofollow noreferrer" target="_blank">GET和POST有什么区别？及为什么网上的多数答案都是错的。</a> 的文章，就深刻抨击了 "拿来主义" 这一现象。很多知名的博主写过文章来遍历写博客的好处，于是大家都纷纷效仿，为了写博客而写博客。对于楼主来说，写博客是一种享受，通常写一篇类似本文的博文需要花费 2~4 个小时，却也乐此不疲，用心写过博文的人都知道，写一篇好的文章，需要花费大量的时间，而楼主身为一个完美主义者，每次写完一篇文章，至少自己已经读过十几遍了，写完之后还要读个两三遍才敢发表，所以很少有错别字以及不通顺的句子，但是 "拿来主义" 者则不然，简单地拼接一些资料，就能生产一篇博文，在此，楼主呼吁大家，如果写，请用心。</p>
<h1 id="articleHeader3">the bug of underscore</h1>
<p>很多谈论 throttle 和 debounce 的文章，最后都会谈到 underscore 已经将这两个方法完美封装，有的给个 underscore 的链接，有的直接上段代码，很少有去深入看看它的实现的。楼主简单地用了下 underscore 封装的 debounce 方法，发现了 bug，建了个 issue <a href="https://github.com/jashkenas/underscore/issues/2478" rel="nofollow noreferrer" target="_blank">https://github.com/jashkenas/underscore/issues/2478</a>。</p>
<p>好几个外国人表示并没有重现我的 bug，最后我直接指出了代码的错误之处，并给出了自己的 fix 方案(详见 <a href="https://github.com/jashkenas/underscore/pull/2479" rel="nofollow noreferrer" target="_blank">https://github.com/jashkenas/underscore/pull/2479</a>），老外才认识到了代码中的 bug，并进行了修复（虽然最后没有采纳我的代码）。详细的过程可以看上面的两个链接里的内容，主要是和 underscorejs 两个维护者之间的交流，最后从他们的更新来看应该是 test cases 写错了。</p>
<h1 id="articleHeader4">总结</h1>
<p>最后，楼主总结两点：</p>
<ul>
<li><p>对于知识点，请尽量查阅各种靠谱的资料，将其弄懂，不要一知半解</p></li>
<li><p>对于写博客，请弄懂了再写，不能误人子弟；如果写，请用心</p></li>
</ul>
<p><strong>最后的最后，希望大家能在 <a href="https://github.com/hanzichi" rel="nofollow noreferrer" target="_blank">Github</a> 上关注我</strong>，或者关注我的项目，我觉得 followers 多的话，也不会在发现 bug 的时候被维护者如此忽视了 ╮(╯▽╰)╭</p>
<p>Github：<a href="https://github.com/hanzichi" rel="nofollow noreferrer" target="_blank">https://github.com/hanzichi</a> 或者直接点击页面右上角，谢谢关注！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一次发现underscore源码bug的经历以及对学术界拿来主义的思考

## 原文链接
[https://segmentfault.com/a/1190000004707196](https://segmentfault.com/a/1190000004707196)


---
title: '一个JS效果竟然要研究一天，我是不是不适合做前端？' 
date: 2018-12-25 2:30:11
hidden: true
slug: cgjk1en1jp4
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVYUar?w=720&amp;h=537" src="https://static.alili.tech/img/bVYUar?w=720&amp;h=537" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">前言</h2>
<p>今天这篇文章的标题，显然是要搞事情。一个JS交互效果，居然花费了一天的宝贵时间才研究出来，我是不是不太适合做前端？</p>
<p>别急，搬好小板凳，正文从这开始～</p>
<p>本来今天下班回来感觉有点累，想着今天就别学了吧，正好看见停播了好久的《极限挑战》在网上放出了最新的一期。但是，今天发生在公司的一件小事儿，在我心里产生了不小的波澜，正好拿这个话题跟同行们聊聊.....</p>
<p>今天早晨我按时去了公司，坐在我的工位上，习惯性地点开了编辑器SublimeText（我宠幸了它三年之久～），一天的编码工作正式开始。</p>
<p>我的大脑高速运转，回忆了下昨天下班前的进度，以及要修改的bug，一个是替换iconfont字体图标的问题，一个是编写官网首页通用导航栏鼠标hover的交互效果，我估摸着上午先把这两个问题解决了，下午再忙其他的任务。</p>
<p>不一会儿，iconfont的替换工作就完成了。紧接着就是导航栏mouse over 的特效编写，殊不知，就是这个效果，让原本计划上午完成的事情，愣是被我研究了大半天才解决。二话不说，直接上图：</p>
<p><span class="img-wrap"><img data-src="/img/bVYUbk?w=640&amp;h=304" src="https://static.alili.tech/img/bVYUbk?w=640&amp;h=304" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我先给大家说下这里要实现的效果，就是当鼠标移入导航栏的某个栏目时，顶部的4px 的蓝色滑动条要尾随着鼠标，如丝般顺滑地滑入相应栏目的顶部位置，当鼠标leave时，蓝色滑动条要退回到当前current的栏目顶部。</p>
<p>刚开始我的布局是，导航栏是一个ul，ul下面有八个li，分别是八个栏目。在每个li的顶部设置一个border-top: 4px solid #2ea0ff；html结构如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVYUaE?w=640&amp;h=362" src="https://static.alili.tech/img/bVYUaE?w=640&amp;h=362" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我的初步设想是，先隐藏这个border-top，然后当鼠标移入的时候，再显示出来。代码如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVYUbI?w=640&amp;h=162" src="https://static.alili.tech/img/bVYUbI?w=640&amp;h=162" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>任何效果都是经过一步一步思考打磨出来的，不可能是一蹴而就。就比如这个例子，学过jQuery的同学都知道，这个效果就是很生硬的显示一条顶部边框，然后隐藏，没有动画的效果。但是jQuery的动画api辣么多，什么slideDown、slideUp、fadeIn、fadeOut、animate......</p>
<p><span class="img-wrap"><img data-src="/img/bVYUbA?w=640&amp;h=372" src="https://static.alili.tech/img/bVYUbA?w=640&amp;h=372" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>（默默地给@愚人码头打了个广告）</p>
<p>于是，我对代码进行了第二波改造，加上了动画效果，以下是debug现场重现：</p>
<p><span class="img-wrap"><img data-src="/img/bVYUbV?w=640&amp;h=217" src="https://static.alili.tech/img/bVYUbV?w=640&amp;h=217" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>预期的效果在浏览器上渲染出来，此时已经有了动画。但是，这还不是我想要的那个效果，后来我又想了一招，可以在每个li里添加一个span，设置为绝对定位，width默认为0，然后animate的时候，让它过渡到li的宽度。</p>
<p>嗯，这个想法不错，有点接近我心中的那个效果了。于是，我又折腾了一番：</p>
<p><span class="img-wrap"><img data-src="/img/bVYUbu?w=640&amp;h=213" src="https://static.alili.tech/img/bVYUbu?w=640&amp;h=213" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这回终于有点样子了，只不过还是每个li都有一个自己的滑动条，而领导的意思是导航栏顶部只有一条公用的4px的蓝色滑动条，鼠标移入时来回切换。</p>
<p>此时，已将近中午，我debug 的幕后过程其实更加艰辛，不像我现在写文字时那么轻描淡写。而我旁边的同事说，看你折腾来折腾去的，干嘛那么辛苦，去网上找个插件就好了，省时省力。</p>
<p>当时，我只能苦笑，因为前些日子我跟着视频里写过这个例子，不过时间隔的有点久，我自己想不起当时的逻辑了。</p>
<p>下午又研究了大半天，突然灵光一现，想到了一招，可以在ul的外层包一层div，和ul同级新增一个span元素，这个span就是那个公用的蓝色滑动条。然后给父元素设置为相对位置，给span设置为绝对位置。然后根据鼠标移入的li的索引，计算出span要滑动的距离，这个距离就等于li的width乘以移入li的index的值，再加上每个li之间的间距。还是赶紧贴上html结构：</p>
<p><span class="img-wrap"><img data-src="/img/bVYUcp?w=640&amp;h=77" src="https://static.alili.tech/img/bVYUcp?w=640&amp;h=77" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>中途因为li的index索引停滞了好一阵子，因为index值取不到。于是，我又用原生javascript写了一遍，还是取不到值，然后又改回来jquery的写法。在经过多次翻阅jquery的api文档，多次试错之后，终于效果写出来了，以下是最终的业务代码：</p>
<p><span class="img-wrap"><img data-src="/img/bVYUcu?w=640&amp;h=399" src="https://static.alili.tech/img/bVYUcu?w=640&amp;h=399" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在这里，我先解释下：</p>
<blockquote>
<p>第一步，通过filter方法筛选出className为current的li，获得它的index，然后赋值给变量currentNum；</p>
<p>第二步，在浏览器刷新时初始化滑动条sliderBar的位置到指定的栏目上；</p>
<p>第三步，利用hover方法监控鼠标移入移出的效果，从而改变sliderBar的left的值，达到滑动的动画效果。其中，stop()方法是为了解决动画队列的问题。</p>
</blockquote>
<p>以上就是我debug的过程，虽然浪费了一些时间，但是好歹问题解决了。如果你要问我，你哪来那么大的勇气，去死磕这个效果(bug)？我会告诉你，如果搁以前，我可能会在网上找个插件了事，因为在谈到javascript业务逻辑开发这块，我承认还是有不小的差距。</p>
<p>但是，今年我开始认真的研究了红皮书，也就是《JavaScript高级程序设计》这本被奉为经典的JS书籍。在经过不断的拜读和敲代码，现在我对自己的原生JS这块逐渐有了些许自信，明白了它的一些底层原理和概念设计。以前是只会照葫芦画瓢，现在也有了点知其然，更知其所以然的味道。</p>
<p>正是通过对基础的夯实，我才有了莫名的勇气去死磕这些开发中遇到的各种疑难杂症。</p>
<p>感谢老铁们不厌其烦的看我debug思维重现到这里，其实，闰土也是想借着这个事儿想跟大家说，前端基础真的很重要，尤其是JS！如果你基础不牢靠，一味的追逐热门框架，看似解决了工作上的一些问题。但回头想想，你的这种技术逻辑还没有形成自己的知识体系，它是松散的，是畸形的，是根基不牢靠的。学好基础再去学框架，会事半功倍，游刃有余。如果基础没打好，不注重底层原理，你的前端路注定走不远。</p>
<p>因为解决一个bug，浪费了一些时间，看似得不偿失，但是搞出来就算牛逼。最起码等你以后当老大了，别人问你，你就知道怎么解决，自己踩过的坑，印象最深。而不是说，以前有人帮我解决过，现在忘了。</p>
<p>所以说，实践是检验真理的唯一标准。网上很多文章写的有好有坏，自己去动手debug或者是实践一下，得出自己的结论才是靠谱的。</p>
<h2 id="articleHeader1">后记</h2>
<p>凌晨1点，夜已深，估计大家看到这篇文章的推送，已是明早上班赶路时。临睡之前，闰土送大家一句话：别人也没有多牛逼，你也可以在你的领域，开辟天地。</p>
<blockquote><p>想了解我的更多动态？欢迎关注我的微信公众号：闰土哥的前端路</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVYT6P?w=430&amp;h=430" src="https://static.alili.tech/img/bVYT6P?w=430&amp;h=430" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<hr>
<p>作者：闰土少年<br>链接：<a href="https://segmentfault.com/a/1190000012093455">https://segmentfault.com/a/11...</a><br>来源：segmentfault<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个JS效果竟然要研究一天，我是不是不适合做前端？

## 原文链接
[https://segmentfault.com/a/1190000012093455](https://segmentfault.com/a/1190000012093455)


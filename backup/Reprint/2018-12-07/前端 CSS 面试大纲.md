---
title: '前端 CSS 面试大纲' 
date: 2018-12-07 2:30:10
hidden: true
slug: giym6ilyf3
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">背景</h2>
<p>参加完 <a href="https://www.zhihu.com/question/268625571" rel="nofollow noreferrer" target="_blank">厦门第四届CSS Conf</a> 后，让我对 CSS 产生了新的思考。CSS 是前端必须熟练掌握并保持持续关注的技术，但是我又不想在 CSS 身上耗费太多精力，因为通常情况下都会有比写 CSS 更要紧的活儿等我去做。这听起来很矛盾，要想掌握好又不想花太多精力，人就是懒，不过这也正是我想要的。</p>
<p>所以我想以一种“高效而功利”的态度去学习 CSS，主要基于以下两点：</p>
<ul>
<li>前端技术体系太多，不可能去熟练掌握每一项技术</li>
<li>人的精力有限，把时间花在当前(或可预见的未来)对你最有价值的事情上</li>
</ul>
<p>而对于 CSS 关注，我想大体分三类吧：</p>
<ul>
<li>出于对 CSS 技术的热爱以及 Geek 精神</li>
<li>出于工作需要去研究学习以及 Coding</li>
<li>准备面试</li>
</ul>
<p>目前对于 CSS，我属于后面两类。本文的目的也就是：</p>
<blockquote>让你在工作中顺手的使用 CSS，在跳槽的时候能写上“熟练使用 CSS 且熟悉 W3C 标准”并顺利应对面试。</blockquote>
<p>下面我会结合自己的学习经验以及面试经验进行分析。</p>
<h2 id="articleHeader1">CSS 的学习</h2>
<p>以前入门时在图书馆借了很多 CSS 书看，有些其实写的一般，看了感觉有些浪费精力，所以这里我尝试提出一条短路径：</p>
<ol>
<li>如果你是前端小白，推荐先看看《Head First HTML与CSS(第2版)》，Head First 系列非常适合小白入门；</li>
<li>如果你前端入门了，推荐去看《CSS 权威指南(第3版)》，好好巩固一下 CSS2.1 的知识；</li>
<li>如果你 CSS 基础打好了，再去看看《精通CSS(第2版)》，虽然100%不能保证你真的能精通，但是会加深理解；</li>
<li>最后不管你现在处于什么段位了，都去看看《CSS 揭秘》。</li>
</ol>
<p>之后你可以选择继续看其他书，但我个人并不推荐花这个精力。因为学完上面几本之后你对 CSS 已经有了一个系统的认知，其他书多少会有重叠的部分，收益不大，并且书上多数技术是过时的。更好的做法是关注一下业界知名博客（如 w3cplus）和业内 CSS 方面专家，比如一丝大漠张鑫旭等，他们是活教材。另外订阅一下 CSS Weekly 邮件推送，每周保持对最新技术的关注，订阅源选一个就好，多了反而会分散你的精力，因为 CSS 方面技术只是大前端技术体系的一小部分。</p>
<p>当然做到这些还不够，想要更全面的理解 CSS，还得去看 W3C CSS 相关的 specifications。但是 spec 太多，不可能全部看完，咱们的目的是熟练，不是精通，所以我们也只挑重要的，比如：</p>
<ul>
<li><a href="https://www.w3.org/TR/2011/REC-CSS2-20110607/" rel="nofollow noreferrer" target="_blank">CSS 2.1</a></li>
<li><a href="https://www.w3.org/TR/css-ui-3/" rel="nofollow noreferrer" target="_blank">CSS Basic User Interface Module Level 3(CSS3 UI)</a></li>
<li><a href="https://www.w3.org/TR/css-values-3/" rel="nofollow noreferrer" target="_blank">CSS Values and Units Module Level 3</a></li>
<li><a href="https://www.w3.org/TR/css-backgrounds-3/" rel="nofollow noreferrer" target="_blank">CSS Backgrounds and Borders Module Level 3</a></li>
<li><a href="https://www.w3.org/TR/css3-images/" rel="nofollow noreferrer" target="_blank">CSS Image Values and Replaced Content Module Level 3</a></li>
<li><a href="https://www.w3.org/TR/css-flexbox-1/" rel="nofollow noreferrer" target="_blank">CSS Flexible Box Layout Module Level 1</a></li>
<li><a href="https://www.w3.org/TR/css-grid-1/" rel="nofollow noreferrer" target="_blank">CSS Grid Layout Module Level 1</a></li>
<li><a href="https://www.w3.org/TR/css-variables-1/" rel="nofollow noreferrer" target="_blank">CSS Custom Properties for Cascading Variables Module Level 1</a></li>
</ul>
<p>其中 CSS 2.1 的最重要，也有 <a href="https://github.com/ayqy/CSS2-1" rel="nofollow noreferrer" target="_blank">中文版</a> 的，其他的可以过一遍当做补充。这里列出了大纲：<a href="https://www.w3.org/TR/CSS/" rel="nofollow noreferrer" target="_blank">https://www.w3.org/TR/CSS/</a> 可以挑自己感兴趣的看，有的还是非常有意思的。如果你确实看不下去的话只啃 2.1 也可以，应付工作和面试应该够了（当年面阿里时特意把 2.1 看了一遍，只要面试官问 CSS 我就特开心）。咱们的目的是熟练，不是精通，当你对 CSS 有了一个系统化的认知后就只需要 keep an eye on 了，不用担心落伍，因为你关注的大佬们肯定会发给你一手(或者最新二手)资料。</p>
<p>到了这一步理论知识已经 OK 了，如果你真的仔细看了上面 spec 可以说在 CSS 方面已经超越了大部分人甚至是面试官，趁机吹一波应该没问题，但是在实践部分我们也需要准备一下。比如说 CSS 预处理器，组件化，工程化，兼容性处理等方面，这些主要是基于自己的开发经验 + 业界流行技术方案进行准备。工作上主要靠 Google，面试时最好有相关案例，比如写自己在某个项目中对 CSS 进行优化成功将 CSS 总体积精简了60%之类的就很亮眼了。但是在开始谈面试前我想先提出一个概念——<strong>学霸面试模型</strong>：</p>
<blockquote>学校的学习和公司的工作有很多相似的地方。平时我们都在完成老师(公司)布置的作业(需求)，实际上做作业（需求）的时候是可以线下谷歌百度交流学习的，但是考试（面试）是闭卷，除了少数课程敢裸考之外，一般还是需要考试（面试）前复习的。我想各位程序员如果现在直接再面试一次自己公司还不一定能过，不过这样没有意义，得给同学们充分的时间准备，即使是学霸期末也不敢裸考。并且你会发现学霸跟大神总是惊人的相似，平时上课（上班）积极动手积极思考，帮助其他同学答疑解惑，深得老师（老板）喜欢，考试（跳槽）前最嗨的是他们，考完（入职）后分数最好（薪资最高）的往往还是他们。所以对于面试，请参考上学那会儿你们班学霸的姿势。</blockquote>
<p>当然这个概念的名字是我瞎取的。完成了以上工作如果面试官问到 CSS 相关的问题大概率会加分，但是切记要写“熟练”，不要写“精通”，你永远不知道对面的面试官是什么 CSS 段位。</p>
<h2 id="articleHeader2">CSS 考前准备</h2>
<p>完成以上过程后你对 CSS 已经有了一个全面的知识体系了，剩下的就是划重点刷题准备考试了。刷题的目的不是题本身，而是梳理知识脉络，因为面试官不会单纯的只问你固定的问题，所以切记不要在自己没有对 CSS 有一个体系化的认知下就去刷题（这跟学霸考前温习和学渣考前突击是一个道理），这样即使能过也拿不到高分（面试高分 == 高薪，重点圈起来）。所以复习很重要，切忌裸考，事关工资，责任重大。</p>
<p>而一旦你的知识体系化，你会发现押题非常轻松，只要按照 spec 来划重点就可以了，我将其划分为理论篇和实践篇两大类：</p>
<h3 id="articleHeader3">理论篇</h3>
<ul>
<li><a href="http://www.ituring.com.cn/book/tupubarticle/9393" rel="nofollow noreferrer" target="_blank">CSS 标准的制定过程是怎样的？(对标准的理解)</a></li>
<li><a href="http://www.ayqy.net/doc/css2-1/cascade.html" rel="nofollow noreferrer" target="_blank">CSS 层叠样式优先级怎么计算？(考察层叠的顺序以及 important 的影响)</a></li>
<li><a href="http://www.ayqy.net/doc/css2-1/selector.html" rel="nofollow noreferrer" target="_blank">CSS 有哪些选择器？如何计算优先级？(基础题，答错死)</a></li>
<li><a href="http://www.ayqy.net/doc/css2-1/cascade.html" rel="nofollow noreferrer" target="_blank">CSS 对元素属性赋值的详细过程？(指定值-计算值-应用值-实际值)</a></li>
<li><a href="#">CSS 有哪些单位以及含义区别？(再结合 dpr 适配/响应式一起问)</a></li>
<li><a href="http://www.ayqy.net/doc/css2-1/box.html" rel="nofollow noreferrer" target="_blank">CSS 盒模型的理解？(继续拓展外边距合并，块级盒行内盒)</a></li>
<li><a href="http://www.ayqy.net/doc/css2-1/visuren.html" rel="nofollow noreferrer" target="_blank">CSS 如何处理文档流？(常规流，浮动，定位，BFC，IFC，GFC...理解这块许多面试题迎刃而解)</a></li>
<li><a href="http://www.ayqy.net/doc/css2-1/visufx.html" rel="nofollow noreferrer" target="_blank">CSS 可视化效果，如何处理裁剪和溢出？overflow 和 clip？display 和 visibility?</a></li>
<li><a href="http://www.ayqy.net/doc/css2-1/fonts.html" rel="nofollow noreferrer" target="_blank">CSS 字体匹配策略？字体族？文字效果？</a></li>
<li>好了我先写这么多吧</li>
</ul>
<h3 id="articleHeader4">实践篇</h3>
<ul>
<li>如何实现物理 1px 效果？</li>
<li>如何实现水平垂直居中？</li>
<li>常见布局方案？浮动布局？流式布局？弹性布局？Flex 布局？网格布局？</li>
<li>无线端响应式适配方案？</li>
<li>CSS 模块化/组件化设计？</li>
<li>CSS 多边框的实现方案？</li>
<li>如何实现 CSS 埋点统计？</li>
<li>CSS 硬件加速？性能优化方面？</li>
<li>CSS 预处理器和后处理器？autoprefixer？postCSS？</li>
<li>太多了一时半会儿想不全...</li>
</ul>
<p>乍一看知识点非常多，但是100%不会全考，你要学会循序善诱。尤其是实践篇，你要突出自己的重点并将面试官朝你擅长的方向引导。比如你写在 CSS 组件化方面有研究，那一般面试官是不会想到去问你兼容性相关问题的，若万一面试官真问你怎么兼容 IE，我建议你放弃这家公司，<a href="https://zhuanlan.zhihu.com/p/33999120" rel="nofollow noreferrer" target="_blank">来支付宝</a>。</p>
<h2 id="articleHeader5">总结</h2>
<p>这篇文章可能并不是那么正能量，因为对于技术我们是需要有 Geek 精神的，但是本文却违背了这一点，因为我觉得 Geek 精神是需要有一个方向的，除非你的方向就是 CSS 方面专家，否则精力上肯定跟不上，想想每天工作辣么久，还得去看电影，去装修，去找妹子，去带娃，想想就觉得时间好像都被狗吃了。所以如果你真的愿意花时间去看各种 spec，去关注 CSS 的进展，你其实被我骗了，这并不是一种“高效而功利”的态度，而是前端工程师应该有的态度。</p>
<p>哎，这套路我自己打99分，我其实并不是想骗大家去关注 CSS 的，我只是觉得，我们在工作之余，还是得好好思考下前端工程师的精神和价值。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端 CSS 面试大纲

## 原文链接
[https://segmentfault.com/a/1190000014123148](https://segmentfault.com/a/1190000014123148)


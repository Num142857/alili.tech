---
title: 'SegmentFault 社区访谈 | 有位公子在奇舞' 
date: 2019-01-10 2:30:08
hidden: true
slug: thqozuxmhs
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVQH1r?w=900&amp;h=385" src="https://static.alili.tech/img/bVQH1r?w=900&amp;h=385" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>SegmentFault 社区之前做过社区访谈，此次重开社区访谈的原因，非常的简单，就想让社区的用户近距离地和优秀的社区用户进行一次交流。和以往的访谈不同的是，我们会采用相对轻松的方式呈现所要分享的内容，虽然敲代码是件严肃且正经的事，但它同样是件有意思、令人愉悦的事，如果你对本次专访的话风不是很喜欢的话，有话私信好好聊嘛~</p>
<p>首秀很重要，所以本次邀请的嘉宾是画风清奇的公子，<a href="https://segmentfault.com/u/lizheming">公子主页传送门</a></p>
<p><span class="img-wrap"><img data-src="/img/bVQqNj?w=1334&amp;h=1002" src="https://static.alili.tech/img/bVQqNj?w=1334&amp;h=1002" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">跳不过的开场</h2>
<blockquote><p>（微笑脸）公子，请开始你的自我介绍吧~ 参考格式：My name is HanMeiMei.I'm 18 years old…</p></blockquote>
<p>（冷漠脸）哦。</p>
<p>大家好，我是公子，伪 90 后野生程序猿一枚，目前是在 360 奇舞团做前端开发。如果对我的代码之路感兴趣的话可以看看之前写的一篇文章<a href="https://segmentfault.com/a/1190000004715628" target="_blank">《别人在挖石头我在撸码的变成之路》</a>。</p>
<blockquote><p>（八卦脸）搜集公子资料的时候，发现公子的博客名字叫做怡红院落，而怡红公子是公子的别号，请问二者有什么由来吗？</p></blockquote>
<p>这几个名字很容易让人想歪，很多朋友喜欢拿来开玩笑。我的 QQ 昵称一直都是怡红公子，高中的时候被同学取外号叫宝二爷所以有了这个昵称。后来写博客的时候就顺手以贾宝玉的“怡红院”结合了我们当年学校论坛的名字“红门院落”，遂有了现在的“怡红院落”。</p>
<h2 id="articleHeader1">正片</h2>
<blockquote><p>可以简要地从性能、业务使用场景等角度，比较下 Angular，Vue 和 React 吗？你怎么看待人手一个 Vue 仿 APP 现象，例如：Vue.js 全家桶高还原网易云音乐 ？</p></blockquote>
<p>不管你目前使用了哪种框架，首先要明白的是：没有银弹。没有最好的框架，只有最适合的框架。MVVM 框架其实本质都差不多，Vue 和 React 本身都只是模板引擎，但是强大的生态造就了它们各自的前端框架套件。相比较来说 Angular 才真正算的上是 MVVM 框架，不过从 2 以后语法变得极其诡异，本来学习曲线就很陡峭，现在更是有呈 90 度的趋势。如果不是有一定背景原因的话我不是非常推荐 Angular。</p>
<p>至于 React 和 Vue 的话网上比较的文章已经有很多了，可以推荐看看 <a href="http://zcfy.cc/article/vue-vs-react-battle-of-the-javascript-frameworks-3310.html" rel="nofollow noreferrer" target="_blank">《Vue vs React: Javascript 框架之战》</a>。总的说来就是 Vue 入门简单，单文件组件形式非常方便。不过自带的数据管理太简单，大项目要用的话还是需要上外部的数据管理工具。另外Vue的生态虽然正在逐渐扩大中，不过目前来看主要还是尤大在发力。React 则是 JSX 写法自由，能够适应各种复杂的需求。不过成也 JSX 败也 JSX，混乱复杂的 JSX 语法造就了大量的 React 黑。另外就是状态管理方案多样，社区生态非常齐全，不过由于方案太多百家争鸣导致新手有点无所适从。</p>
<p>至于你说的人手一个 Vue 项目的事情，我觉得用 Demo 来学习框架是个非常好的习惯，目前的市场来说，MVVM 框架可以算是逃不过的一个问题了，即使你没有用过做过 Demo 学习了解过也是好的。这表明你善于动手热爱学习新知识，我觉得这个是很好的。不过我比较摒弃的是现在有很多人被前端框架迷了眼，唯 MVVM 框架是从，碰到个项目就想用 SPA 来做，总觉得这个项目不用 React/Vue 也太 Low 了。MVVM 框架并不是前端的全部，所有的业务选型都是要根据业务背景等多重因素决定的。重要的是你要了解框架背后的东西，了解问题的本质，打牢基础，这样不管什么样的方案你都能 hold 住！</p>
<blockquote><p>作为一个前端工程师，如何看待现今前端从业人员”人满为患“的问题？你认为前端工程师的价值体现在哪里？前端的意义又是什么？</p></blockquote>
<p>前端市场看起来是人满为患，但是有非常明显的分级现象。市场存在大量的低端人群，这主要是由前端入门简单决定的。而相对来说，中阶前端就少很多很多，这当然是由于前端知识面太广深造难度大决定的。这就造成了虽然前端工程师这么多，但是很多公司还是喊着前端工程师不好找的现象。所以不是前端不好找，是高质量的前端不好找！</p>
<p>不管是前端后端客户端，写代码就是创造的艺术，区别在于你创造的东西以及谁用。我当初选择做前端就是因为能非常简单就实现我的想法，最重要的是还特别酷炫！我相信有很大一部分同学应该和我有一样的想法。前端是最接近用户的，如何让用户觉得舒服，包括设计，交互，体验等，都是我们需要考虑的问题。将这些问题解决并做好，我想这正是我们价值的体现。</p>
<blockquote><p>在平时的业余时间，主要从哪几个方面提升自己的技术水平呢？</p></blockquote>
<p>工作之外，我基本上都是在写开源项目，目前我正在维护一个 Node.js 的博客系统 <a href="https://firekylin.org/" rel="nofollow noreferrer" target="_blank">Firekylin</a>。写开源项目是非常有意思的一件事情，不仅锻炼自己的技术，而且能让自己的技术得到沉淀。说到沉淀，我偶尔也会写写博客，说起来我的 IT 之路也是从博客开始的。从 09 年开始我就养成写博客的习惯，虽然最近几年更新变得慢了，不过还是会经常写点文章巩固下自己的学习成果。另外我还会逛逛社区看看最新的技术讯息，看看其他人的博客学习点新知识等。偶尔我也会翻译国外文章，之前曾经翻译过一本书 <a href="https://book.douban.com/subject/26838003/" rel="nofollow noreferrer" target="_blank">《Ionic In Action》</a>，平常会在<a href="https://zcfy.cc" rel="nofollow noreferrer" target="_blank">众成翻译</a>上翻译文章。生命不息学习不止，特别像是前端变化这么迅猛，只有持之以恒的学习，才能继续前进。</p>
<blockquote><p>请问下公子所在的奇舞团相较 AlloyTeam、饿了么大前端团队、淘宝 UED 前端团队、百度 BEFE 前端团队在人员的配备，技术选型上，有什么区别？奇舞团更侧重哪方面的技术发展？</p></blockquote>
<p>其它团队了解的不太清楚，饿了么应该是 Vue 用的比较多，淘宝 UED 的话用 Node, React 比较多的，百度有自家的 FIS，AlloyTeam 的话不太了解，不过早期好像偏向用 React，当然具体的技术选型肯定还要结合业务来看了，这里只是说一个大体的印象。奇舞团对新人来说是比较友好的，有导师提供一对一帮助，同时会有定期的分享以及技术视频等。对于培养新人我们向来不遗余力，举办了大量的前端特训营以及前端之星相关课程，努力让大家能够在前端的道路上全面发展自己的技术，而不是仅仅局限于某一方面。</p>
<h2 id="articleHeader2">文末福利</h2>
<blockquote><p>听说奇舞团在招人，你们要人的标准是怎么样的呢？</p></blockquote>
<p>（公事公办脸）可以看看我们的招聘JD：<a href="https://75team.com/page/join.html" rel="nofollow noreferrer" target="_blank">https://75team.com/page/join....</a></p>
<blockquote><p>方便透露下，你是如何面试前端工程师的吗？你认为前端工程师面试前该如何做准备呢？</p></blockquote>
<p>会做一些基础的前端面试题，询问些之前做过的项目，然后问问看过什么书是否写过博客有没有做过分享等等。万变不离其宗，面试前的话可以刷一些面试题，巩固下基础知识。也可以回忆下自己过去的项目，看看有哪些糟心的地方以及哪些地方是亮点。至于其他的能力都是平常一朝一夕的积累，不是抱佛脚就能解决的。</p>
<p>? 插播一则小广告：这里有一个免费向公子提付费问答的机会，戳这→ →，<a href="https://segmentfault.com/g/1570000009280187/d/1560000009961951">戳我</a></p>
<h2 id="articleHeader3">并非凑数的非技术问题</h2>
<blockquote><p>作为 SF 社区现声望榜榜首，可以谈谈你和 SF 的渊源，以及对 SF 社区的看法吗？</p></blockquote>
<p>（慈祥地微笑）作为早期SF用户，可以算是看着 SF 长大的了。SF 早期的时候有很多大牛入驻，看着他们的回答我学习到了很多。SF 社区主要是太低端化，问题基本都是前端的低端问题，很多用户也没有问问题的艺术，比如贴代码截图，XY 问题等等，更有很多人分不清楚问答社区和论坛的区别，回复也不喜欢点回复按钮。难以留住中高端用户，这算是 SF 比较大的问题吧！不过 SF 的编辑器还是很赞的，我非常喜欢~</p>
<blockquote><p>如何看待知识付费，以及 SF 现推出的讲堂、付费问答产品</p></blockquote>
<p>知识付费我觉得是非常不错的思路，我个人是百分百支持的。早前还是学生的时候，因为时间多所以会各种回答问题，把这个过程当成一种巩固自己知识的过程。后来工作了之后，发现最宝贵的就是时间，已经完全没有时间来做这些多余的事情了。知识付费让回答问题变成了收入的一种来源，这无疑解放了我们的生产力。</p>
<p>到此，和公子的对话就结束了，社区访谈的下期嘉宾，keke，上帝<a href="/u/youmingdot">@有明</a> ↖(^ω^)↗我们已成功邀请 <a href="https://segmentfault.com/u/mcfog">mcfog</a>、<a href="https://segmentfault.com/u/lilydjwg" target="_blank">依云</a>、<a href="https://segmentfault.com/u/jamesfancy">边城</a>、<a href="https://segmentfault.com/u/shamiao" target="_blank">沙渺</a> 4 位大大做访谈，大家有什么问题想对他们提出，或者你们想让社区访谈哪位用户，都可以私信清蒸哈~ Thx</p>
<p>最后，今天是奇舞团和社区用户阿冰<a href="/u/abing777">@橙汁绿茶</a> 的生日，祝奇舞团和阿冰生日快乐? 附上奇舞团庆生的视频链接，<a href="http://mp.weixin.qq.com/s/t49RvuWZCJPwfqESERBdfw" rel="nofollow noreferrer" target="_blank">Hi，奇舞团~生日快乐 ?</a></p>
<hr>
<blockquote><p>受要挟而被放出来的奇舞团公众号 -- <code>奇舞周刊</code>二维码，《奇舞周刊》是由奇舞团维护的前端技术周刊，除周五外，每天向大家推荐一篇前端相关技术文章，每周五推送周刊汇总内容。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVQqOA?w=160&amp;h=160" src="https://static.alili.tech/img/bVQqOA?w=160&amp;h=160" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SegmentFault 社区访谈 | 有位公子在奇舞

## 原文链接
[https://segmentfault.com/a/1190000010066463](https://segmentfault.com/a/1190000010066463)


---
title: 'SegmentFault 社区访谈 | Linxz：只会写 CSS 不会写 JS 的“伪”前端' 
date: 2019-01-02 2:30:09
hidden: true
slug: fy6535m0w3u
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVT0Y4?w=900&amp;h=385" src="https://static.alili.tech/img/bVT0Y4?w=900&amp;h=385" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上周没和大家见面，是去邀请大佬来访谈了(///▽///)社区访谈以来，清蒸邀请都是些大家相对熟悉的面孔，比如<a href="https://segmentfault.com/a/1190000010066463">公子</a>，比如<a href="https://segmentfault.com/a/1190000010571776" target="_blank">边城大大</a>，这次的访谈嘉宾，大家可能有些陌生，他主要出没在 css 标签下，有请专注 css 三十年不会 js 的林小志 - <a href="/u/linxz">@林小志</a> 。</p>
<h3 id="articleHeader0">破冰环节</h3>
<blockquote><p>小志，和之前的小伙伴一样，和大家简单地打个招呼吧(￣∇￣)从简就好</p></blockquote>
<p>（长篇大论的开场）自我介绍是我最不擅长的，一直以来都不知道自己应该如何介绍自己比较好。想来想去，我就随便说一下吧。工年已经有一些年头了，但是能力却一直都是一般般，在 2009 年的时候曾“无知”挂名在某人的一本书中，写了最后一页内容，事后看到书中内容跟自己写 CSS 的方式、思路有所出路，于是年少轻狂的我就出口要自己写一本。最后用了半年多的时间在晚上、在周末写完了<a href="https://book.douban.com/subject/4117497/" rel="nofollow noreferrer" target="_blank">《CSS那些事儿》</a>这本书。</p>
<p>有朋友问我为什么用这个书名，其实这个书名并不是我起的，我也没去考虑书名的问题，但是我很认真很严肃地表态，书名中不许出现“div+css”、“X 日精通”以及“精通”等字眼。最后这本书满足了我的虚荣心之后，因为销量不佳，被出版社收回销毁（据说）。</p>
<p>一个不小心从要介绍自己扯到了自己曾经的一本书，思绪又飘了。其实认识我的朋友都知道我一直以来都是在写 CSS，大概什么时候开始写呢，应该是从 07 年或者 08 年吧，具体我也不记得了。虽然之前有过接触 CSS，但并未觉得用 CSS 布局有什么好的，也没在意，后来无意间加入一个 QQ 群，在群里各位老师的带动下，我开始认真接触。遇到问题不断摸索，然后跟大家讨论交流，最后也就这样混下来了。<br>接下来几年的工作中，虽然一直都是偏重于 CSS 方面，但其他的偶尔还是会接触一下，去玩一下。所以，现在的我是一个只会 CSS 不会写 JS 的“伪”前端。然而，可怕的是，当现在的 <code>flex</code> 以及 <code>rem</code> 等一系列新的 CSS 属性出现之后，我发现，我其实连 CSS 都不会写了。</p>
<blockquote><p>【“爱·花苑”花店卖花、送花的】是你某个社交平台的简介，爱·花苑 是你自己开的花店吗？为什么要想开个花店呢？</p></blockquote>
<p>“爱·花苑”是我老婆开的花店，而我只是在利用网络以及平时周末的时间帮忙一下。开一家花店，每天身处在花丛中，给人的感觉似乎是很向往的生活。但，身为切图仔的我在花店里打工的那段时间感受来说，开一家花店，经营一家花店比打工要累太多了。</p>
<p>都说互联网的工作是经常要加班，通宵加班的。其实，做实体行业，开花店也是经常要加班的，有时候还要通宵，最后赚不了几块钱。说了可能很多人都不相信，但事实就是这样。就不说逢年过节什么的，平时一个不小心接到做开业花篮这样的单子，从准备花材、篮子、花泥，然后到处理花材，最后花篮成型，绝对是一个体力活。</p>
<p>最后想说，有时候真的不要认为花店很赚你的钱，尤其是像我们“爱·花苑”这样的，尽可能做小清新，漂亮的花束是很累的，花材根据时间的不同，进货价格也不同，但是我们又不高价出售，最后只能赚个吃饭的钱。</p>
<p>别问花店在哪里，原本是在杭州滨江，现在已经不开了。原因很多，就不多说了。</p>
<blockquote><p>如果要你帮程序员选鲜花给对象的话，你推荐哪个花种呢？</p></blockquote>
<p>不推荐任何花种。这个就跟有时候有人找我推荐书籍一样，这个我真无法推荐。每个人都有各自的喜好和追求，我所推荐的只是自己的想法而已。如果一定要推荐什么花送给对象的话，那么首先<strong>你要了解你的对象，是一个什么性格的人，喜欢什么颜色，平时有没有特别喜爱的花，对于包装有没有什么要求</strong>。</p>
<p>这些问题，都是之前在花店里我所听到所记录的。当一位顾客要送花给朋友的时候，我老婆就会很细心的询问对方一系列问题，然后针对性地用心包一束花。在我印象中，基本上来买过花束的人，满意的居多，我不敢说百分百，这年头百分百的东西还存在吗？如果有，那就是我们的花店是百分百实惠。</p>
<h3 id="articleHeader1">技术升华环节</h3>
<blockquote><p>如何理解你的微博简介：一个只会写CSS不会写JS的“伪”前端工程师？你觉得 JS 和 CSS 学习起来各有什么难点呢？</p></blockquote>
<p>微博我好久没去碰了，其实现在应该是写<strong>一个连 CSS 都不会写，更不会写 JS 的“伪”前端工程师</strong>。</p>
<p>为什么说自己是前端工程师呢，其实就是为了让自己觉得自己还是在前端行列中的，跟大家在一个行业中的；至于说只会写 CSS，那是因为我的工作从几年前开始就一直只是围绕着 CSS 在转，拿着设计师给的设计稿，实现最终的页面效果，空余时间做一些 CSS 方面的 demo 玩玩，总之就是各种围着 CSS 转；至于 JS 方面的话，我真不知道说什么，可能我会用一点，但我真不会写，所以，我在学。</p>
<p>就像前面所说的，现在 CSS 发展太快了，各种新的属性出现，感觉自己现在连 CSS 都不会写了。不过其实很多属性跟几年前 IE 中使用的滤镜效果太相似了，就连 <code>box-sizing</code> 这个属性跟之前 IE 的怪异模式下盒模型计算方式是那么的相似。</p>
<p>至于要说 JS 和 CSS 学习起来有什么难点的话，我可以肯定地说：JS 我根本不知道有什么难点啊，我连门都还没入呢；至于 CSS 的话，写来写去就那么几个属性，不难，而难的是怎么去思考一个布局用什么方式来实现。所以，写 CSS 不难，入门也就简单很多了。也就是因为这样，很多人都觉得 CSS 很简单，但事实并不是这样，CSS 其实挺难的。难点在于如何思考，如何巧妙运用每个 CSS 属性的特性。<br>可能这样说的比较虚，举个简单的例子?：隐藏文字的几种方法（用的都是以前老的方法，没有用新的 CSS 属性）。</p>
<p><span class="img-wrap"><img data-src="/img/bVT1W6?w=899&amp;h=481" src="https://static.alili.tech/img/bVT1W6?w=899&amp;h=481" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>在 CSS 中一直以来我就不觉得有绝对唯一这种说法，换个思路换个想法，结果可能还是一样的。或许这个就是那句话所说的：条条道路通罗马……</p>
<blockquote><p>你的书籍【CSS那些事儿】以 CSS 技巧实例讲解为主，可以举个经典布局例子，分析下实现思路和过程吗？</p></blockquote>
<p>这本书已经估计目前只是存在于部分人的硬盘中吧，一个盗版的 PDF。从当时开始写的时候我就是计划着用实例的方式来一点点讲解（只是针对当时的技术情况来说），所以，书中会从最简单的盒模型、单列布局慢慢延伸到三列布局，并且会对每种布局可能有的几种方式加点说明。</p>
<p>至于经典布局例子，这个有点难，因为我不知道什么是经典布局例子。布局从大到小去分析，把一个大的模块拆分中 N 个小模块，然后 N 个小模块可能还可以继续拆分，最后就是一个页面。比如左右两列布局，根据不同的 HTML 写法可以使用不同的 CSS 方式实现，但最终无非就是对布局属性的了解和掌握。</p>
<p>这里列一个几年前，又是一个几年前的东西，发觉自己真的没有新东西了，哎?。<a href="http://lab.tianyizone.com/layout/" rel="nofollow noreferrer" target="_blank">我是例子页面</a> ,这个页面是在很早之前看了国外的一个例子后自己尝试去学习整理的，同一个 HTML 结构，然后根据 CSS 的不同，最终展现不同的页面效果。而修改的 CSS 部分无非也就是 <code>float</code>、<code>margin</code> 之类的属性，有兴趣的可以看看代码。当然，我也不知道这个域名会存在多久，毕竟没有那个什么什么案来着。</p>
<blockquote><p>对于问题<a href="https://segmentfault.com/q/1010000003059724">【关于CSS核心技术关键字都有哪些？】</a>下的回答里的导图，你怎么看？</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVT1Xj?w=800&amp;h=561" src="https://static.alili.tech/img/bVT1Xj?w=800&amp;h=561" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这，怎么说呢，我没看法。不得不肯定这张图包含了很多知识点。但就我个人感觉，整理这张图的作者是最受益的。因为他从整理到最后发出来，肯定不是随随便便就完事了。</p>
<p>用心去整理，归纳的过程是一个人最好的学习过程，而他人去看这个整理的图，并不一定会完全理解里面所有的东西，有些甚至也只是走马观花似得看过，脑袋中有一个印象而已，并不会真正去理解其中每个词所代表的含义。最大的可能性应该是看到感兴趣的词，然后去挖掘一下。</p>
<p>可能有人会说，那我就每个词都挖掘一下咯。是啊，这样固然好，但我只想说，你有这个时间？不敢保证这张图的作者能完完全全把图中每个词都所深入的含义都理解透，如果全部都理解透了，我真心佩服。至少我知道其中几个词就已经可以写一大篇文章了。</p>
<p>如果不信的话，可以看看 doyoe 以前整理的有关 <code>margin</code> 的文章：<a href="http://blog.doyoe.com/2013/12/31/css/margin%E7%B3%BB%E5%88%97%E4%B9%8B%E5%B8%83%E5%B1%80%E7%AF%87/" rel="nofollow noreferrer" target="_blank">阅读传送门</a></p>
<p><span class="img-wrap"><img data-src="/img/bVT1XJ?w=387&amp;h=350" src="https://static.alili.tech/img/bVT1XJ?w=387&amp;h=350" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>那么其他的一些每个都深入去研究的话，真的不知道是需要多少时间啊。所以，现在 CSS 都是按照模块来升级研究开发，而不是一个整体来操作的。</p>
<blockquote><p>前段时间，小志你也开发了自己的小程序 -- caniuse简化版，你是出于怎么样的考虑开发的这个小程序呢？开发过程中有遇到什么坑吗？</p></blockquote>
<p>如果我说因为我无聊，所以我去折腾这个 caniuse 简化版，不知道会有多少人信。但我至少可以肯定，最开始的想法，我真的是无聊。当时一直在想玩点什么，就是不知道玩什么好，然而一个不小心在 github 上看到 <a href="https://github.com/Fyrd/caniuse" rel="nofollow noreferrer" target="_blank">caniuse 网站开源</a> 的 json 文件，于是就想要不就折腾一下这个吧，功能简单点，然后在微信里装逼的时候用一下。</p>
<p>所以，折腾这个 caniuse 简化版就是因为我无聊到后面想装逼，到最后的最后是想自己用的更顺手一点，仅此而已。然而也就是这样一个简单的想法，反反复复折腾了好几回，直到目前为止自己才算相对满意而已。</p>
<p>坑？遇到坑，首先是自己的能力不足导致的，其次就是自己的无知。当时看到这个 json 文件的时候，我在想，如果把文件下载过来，或者 fork 到自己的仓库后做修改，那么更新就麻烦了，直接引用应该是最简单的方法。</p>
<p>就因为这个想法，折腾这个 <code>1.48 MB</code> 的 json 文件让我快抓狂。里面数据量的庞大，以及自己不成熟的想法。最最开始的时候，我居然把整个 json 文件在请求之后直接丢到 <code>localStorage</code>，想想真是可怕。</p>
<p>反反复复修改了几次后，思路就清晰多了，整体的原则不变，通过对比 json 文件的 timestamp 来检测文件是否更新。因为不是必要更新，所以更新的主动权交给用户自行选择，如要尝试更新就去“关于”页面中点更新按钮即可，一般来说，一周会有一次更新。</p>
<p>json 文件请求成功之后，会根据每个属性，拆分写入到 <code>localStorage</code>，这样在搜索的时候直接从本地搜就可以了。这个时候是不是应该插入一个广告了呢。?</p>
<hr>
<p><strong>我是强势入场的广告</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVT1X8?w=344&amp;h=344" src="https://static.alili.tech/img/bVT1X8?w=344&amp;h=344" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>前面我说了，我是一个不会写 JS 的“伪”前端，所以，我在开源这个小程序代码的时候，很忐忑，但最终我还是鼓起了勇气。<a href="https://github.com/linxz/caniuse" rel="nofollow noreferrer" target="_blank">小程序代码的 GitHub 地址</a></p>
<h3 id="articleHeader2">广告环节</h3>
<blockquote><p>公众号【闲谈CSS那些事儿】</p></blockquote>
<p><strong>简介</strong><br>没啥事儿就谈谈CSS，不深入，只扯淡，扯点自己想说的，或许也是你想听的小东西，没有高深的东西，但应该不是平庸的内容……</p>
<p>我是清蒸嫌弃丑的公众号二维码</p>
<p><span class="img-wrap"><img data-src="/img/bVT153?w=400&amp;h=400" src="https://static.alili.tech/img/bVT153?w=400&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<blockquote><p>技术圈【混迹于CSS圈】，<a href="https://segmentfault.com/g/1570000010624652">技术圈传送门</a></p></blockquote>
<p><strong>简介</strong><br>层叠样式表（英语：Cascading Style Sheets，简写CSS），又称串样式列表，由W3C定义和维护的标准，一种用来为结构化文档（如HTML文档或XML应用）添加样式（字体、间距和颜色等）的计算机语言。<br>CSS 看似简单，却深似海；<br>CSS 经常用的东西似乎挺简单，但要想知道为什么，却好像不容易理解；<br>一个使用简单，深入难的东西；<br>一个没有过多复杂语法，却开始有变量的东西；<br>每个人都有各自的玩法，每个人都有各自的思想，怎么玩怎么用，全在个人。<br>#you { idea: important; }<br><a href="https://segmentfault.com/t/css3" target="_blank">站内 CSS3 问答</a><br><a href="https://segmentfault.com/t/css">站内 CSS 问答</a><br><a href="https://segmentfault.com/experts?tab=css" target="_blank">站内 CSS 专家问答</a><br><a href="https://segmentfault.com/search?q=CSS">站内 CSS 关键字的搜索结果</a></p>
<h3 id="articleHeader3">剧透环节</h3>
<p>本期访谈就到这了，下一次的访谈，我只能说他的名字全是字母，遁走~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SegmentFault 社区访谈 | Linxz：只会写 CSS 不会写 JS 的“伪”前端

## 原文链接
[https://segmentfault.com/a/1190000010931477](https://segmentfault.com/a/1190000010931477)


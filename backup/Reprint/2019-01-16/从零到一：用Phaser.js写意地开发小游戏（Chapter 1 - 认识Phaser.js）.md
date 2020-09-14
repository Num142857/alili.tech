---
title: '从零到一：用Phaser.js写意地开发小游戏（Chapter 1 - 认识Phaser.js）' 
date: 2019-01-16 2:30:07
hidden: true
slug: 0mp6u54iwj0i
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVMGY5?w=900&amp;h=500" src="https://static.alili.tech/img/bVMGY5?w=900&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>写在前面</h4>
<p>实际上我从未想过我会接触到H5小游戏开发，那是在2015年末，当时我还刚开始学习iOS不久，用Swift在写一个类似于Snapchat的应用。由于公司项目转型，需要创造一个小游戏平台，需要使用一个比较成熟的前端游戏框架来快速开发小游戏。都说创业公司有无限的实践机会，于是，我就接触到了Phaser.js，并在此后的两个月的时间里开发了十多个H5小游戏模板。</p>
<h4>Phaser.js？</h4>
<p>可能大家都没听说过，先贴个官网地址吧：<a href="http://phaser.io/" rel="nofollow noreferrer" target="_blank">http://phaser.io/</a>。</p>
<p>没错，在国内可能比较少听说这个框架，毕竟是老外在维护的一个开源项目，看风格就知道。说真的，这个洋葱头爱心脸的外星人不可能会是我国的设计师想出来的形象，国内比较有名的游戏开发引擎，例如<a href="https://www.egret.com/" rel="nofollow noreferrer" target="_blank">白鹭</a>，就很有中国特色。</p>
<p><span class="img-wrap"><img data-src="/img/bVMHfQ?w=2558&amp;h=1220" src="https://static.alili.tech/img/bVMHfQ?w=2558&amp;h=1220" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>H5游戏框架众多，为何选择它？</h4>
<p>由于近几年H5的火热，H5游戏框架如雨后春笋般一个个地冒出来，甚至有很多定位不是游戏开发的框架都被归到这个范畴中，如Pixi.js等。那么大家肯定会问一个问题：为什么选择Phaser？以下是我选择它的一些原因：</p>
<ul>
<li><p>出现在国外几乎所有的H5游戏框架的榜单中，而且名列前茅。</p></li>
<li><p>支持原生JS及TypeScript。</p></li>
<li><p>可以方便地在Canvas和WebGL之间切换。</p></li>
<li><p>仅支持开发2D游戏，因为专注，所以高效。</p></li>
<li><p>定位如上图所示，是桌面和移动端H5游戏框架，Pixi.js、Three.js这些框架则不同，它们不是专门针对游戏开发设计的，拿来开发游戏并没有很轻松。</p></li>
<li><p>非常完善的文档及示例（当然是英文文档）。</p></li>
<li><p>持续更新，目前Phaser 3正在开发，没什么比一个热度高的开源框架更值得推荐了。</p></li>
</ul>
<p>当然了，每个框架都有优缺点，这里只作介绍，并不是要比个高低。网上也有很多H5游戏框架的介绍和评测，不过大多数都是2016年的，可以分享一下：</p>
<p><a href="http://www.jianshu.com/p/0469cd7b1711" rel="nofollow noreferrer" target="_blank">HTML5游戏引擎深度测评 - 冬夏之旅/简书</a><br><a href="https://www.diycode.cc/topics/16" rel="nofollow noreferrer" target="_blank">2016年最火的15款HTML5游戏引擎 - linshulin/diycode</a><br><a href="http://ourcodeworld.com/articles/read/308/top-15-best-open-source-javascript-game-engines" rel="nofollow noreferrer" target="_blank">Top 15: Best open source javascript game engines</a></p>
<p>列举其中一个榜单，非常好奇的是国内常见的Create.js，LAYABOX之类的框架并没有出现：</p>
<p><span class="img-wrap"><img data-src="/img/bVMOvV?w=1650&amp;h=774" src="https://static.alili.tech/img/bVMOvV?w=1650&amp;h=774" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>使用Phaser.js开发的一些感想</h4>
<h5>第一点：体积并不小</h5>
<p><span class="img-wrap"><img data-src="/img/bVMOx5?w=528&amp;h=106" src="https://static.alili.tech/img/bVMOx5?w=528&amp;h=106" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVMOya?w=522&amp;h=100" src="https://static.alili.tech/img/bVMOya?w=522&amp;h=100" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>也许就游戏框架而言并不算很大，但对于还没有接触过游戏开发的我来说，当时真是吓到我了。（一般来说框架不都在100KB以内吗~）因此拿Phaser来开发的话就基本要抛弃2G用户了，尽管这部分用户为数不多。</p>
<p>可优化的方案是gzip、CDN等等，另外可能的方案是拆解phaser用不上的部分（我本人没有试过）。</p>
<h5>第二点：靠文档和示例能解决90%以上的问题</h5>
<p>官网有大量的Examples，示例详情还带在线编辑、运行环境，照顾到家了。另外官方提供example的zip下载，大概300M左右，里面的素材都够玩很久了。</p>
<p><span class="img-wrap"><img data-src="/img/bVMOAy?w=2546&amp;h=1092" src="https://static.alili.tech/img/bVMOAy?w=2546&amp;h=1092" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVMOBp?w=2376&amp;h=1008" src="https://static.alili.tech/img/bVMOBp?w=2376&amp;h=1008" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上文也有提到Phaser的文档非常完善，而且从github或官网download下来后离线版文档体验也非常好。每个类和API都有详细的说明，顺便推荐大家写文档可以用jsdoc来自动生成，非常方便。</p>
<p><span class="img-wrap"><img data-src="/img/bVMOzM?w=2550&amp;h=1202" src="https://static.alili.tech/img/bVMOzM?w=2550&amp;h=1202" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h5>第三点：上手非常简单</h5>
<p>首先由于Phaser支持原生JS，因此并无阅读障碍。另外预设配置已非常完善，很多情况下使用默认配置已经能满足需求。一个小游戏的主体逻辑在100行内基本可以搞定，其余的就是丰富游戏的表现了。</p>
<p>我们公司曾在广州大学城设立一个小游戏工作室，招纳了6个前端开发实习生，在没有H5游戏开发的经验的前提下，基本在1-2周内（每周只有3天工作时间）就完全上手Phaser，可以独立开发小游戏了。在往后的几个月内，也为我们平台<a href="http://www.24haowan.com" rel="nofollow noreferrer" target="_blank">24好玩</a>贡献了不少模板。</p>
<p>借此说明Phaser上手非常简单~</p>
<p><span class="img-wrap"><img data-src="/img/bVMOEE?w=2002&amp;h=842" src="https://static.alili.tech/img/bVMOEE?w=2002&amp;h=842" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>我的第一个作品</h4>
<p>如果你玩过《寻找单身狗》这个游戏，希望你能给我点个赞。早在2015年的光棍节前一天晚上，这个游戏就诞生了。原型是一个之前很火的非常魔性的小游戏，叫寻找程序员。后来变成24好玩的模板后，还是很受追捧，以致于使用该模板创建的活动已有过百万玩家参与，甚至我们公司设计的单身狗形象都被盗用了，就是下面这个doge：</p>
<p><span class="img-wrap"><img data-src="/img/bVMOFE?w=266&amp;h=360" src="https://static.alili.tech/img/bVMOFE?w=266&amp;h=360" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>目标就是在一堆人中找到doge，随着游戏难度增加，人会越来越多，也会越来越小。</p>
<p>游戏截图：</p>
<p><span class="img-wrap"><img data-src="/img/bVMOGe?w=664&amp;h=1174" src="https://static.alili.tech/img/bVMOGe?w=664&amp;h=1174" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这里是<a href="http://24haowan.shanyougame.com/web/game/game_id/57963" rel="nofollow noreferrer" target="_blank">游戏链接</a>，也可以扫描下面的二维码进入游戏，也算是供大家娱乐娱乐吧。</p>
<p><span class="img-wrap"><img data-src="/img/bVNsQ4?w=299&amp;h=299" src="https://static.alili.tech/img/bVNsQ4?w=299&amp;h=299" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>你的下一步？</h4>
<p>Phaser.js的介绍就到这里，想了解更多可以到Phaser的官网去。接下来还会更新几篇文章，直接以实际项目为示例来介绍如何使用Phaser.js来开发小游戏，最后会附上一些开发的常用方法和实战技巧。希望大家会喜欢。</p>
<h4>未完待续</h4>
<h5>下一节：<a href="https://segmentfault.com/a/1190000009226335">Chapter 2 - 搭建游戏的骨架</a>
</h5>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零到一：用Phaser.js写意地开发小游戏（Chapter 1 - 认识Phaser.js）

## 原文链接
[https://segmentfault.com/a/1190000009212221](https://segmentfault.com/a/1190000009212221)


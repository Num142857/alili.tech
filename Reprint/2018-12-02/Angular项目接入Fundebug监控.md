---
title: 'Angular项目接入Fundebug监控' 
date: 2018-12-02 2:30:15
hidden: true
slug: b067wzmi86
categories: [reprint]
---

{{< raw >}}

                    
<h4>Angular项目接入Fundebug</h4>
<p>最近在公司内部的Angular项目中接入了<a href="https://www.fundebug.com" rel="nofollow noreferrer" target="_blank">Fundebug</a>监控，用于线上bug实时追踪。在此，跟大家分享一下相关内容，希望大家喜欢😍。</p>
<h4>Fundebug简介</h4>
<p>Fundebug的口号是不放过每一个BUG，它提供全栈JavaScript错误监控。其实，简单理解就是所有跟JavaScript相关的监控，包括各种前端框架(Angular, Vue,js, React)，Node.js，微信小程序。</p>
<p>因为我们使用Angular(Angular 5)框架，本文介绍接入Angular的大概使用方法。</p>
<h4>接入方法</h4>
<ul>
<li>首先需要创建一个账号<p>创建账号页面使用极验验证，蛮好玩的一个东西。</p>
<p><span class="img-wrap"><img data-src="/img/bV9TM5?w=790&amp;h=484" src="https://static.alili.tech/img/bV9TM5?w=790&amp;h=484" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
</li>
<li>账号创建后会立马跳转到<strong>创建项目</strong>的界面。可以看到，支持好几个版本的Angular，所以千万不要选错了。<p><span class="img-wrap"><img data-src="/img/bV9TPo?w=938&amp;h=737" src="https://static.alili.tech/img/bV9TPo?w=938&amp;h=737" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
</li>
<li>之后会有详细的接入代码，只要复制黏贴就可以了<p>推荐使用npm安装！</p>
<p><span class="img-wrap"><img data-src="/img/bV9TN2?w=2094&amp;h=1592" src="https://static.alili.tech/img/bV9TN2?w=2094&amp;h=1592" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果不清楚，还可以直接点击右下角的对话图标，客服的解答都很专业。</p>
</li>
</ul>
<h4>报错测试</h4>
<p>当代码都接入好以后，就可以测试啦。在项目的控制台输入测试命令：<br><code>fundebug.notify("Test", "Hello, Fundebug!");</code></p>
<p><span class="img-wrap"><img data-src="/img/bV9TOh?w=589&amp;h=40" src="https://static.alili.tech/img/bV9TOh?w=589&amp;h=40" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>很快就收到了报警邮件：</p>
<p><span class="img-wrap"><img data-src="/img/bV9TOm?w=555&amp;h=419" src="https://static.alili.tech/img/bV9TOm?w=555&amp;h=419" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>点击查看详情，就可以看到详细的报错信息啦。浏览器和操作系统的信息都会分析并展示出来。有时候某些错误只会在特定的安卓版本上出现，那么有这样的信息，对于帮助分析解BUG是很有用的。</p>
<p><span class="img-wrap"><img data-src="/img/bV9TOu?w=726&amp;h=505" src="https://static.alili.tech/img/bV9TOu?w=726&amp;h=505" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>而<strong>用户行为</strong>也可以称得上是一项黑科技，它记录了出错前的用户行为、网络请求、控制台输出。这个对于更好的理解用户的操作流程，复现BUG非常有帮助。因为往往Debug的时间都是花在了分析为什么会出现这个bug，理解了用户的使用场景，才可以更好的搞清楚bug成因。</p>
<p><span class="img-wrap"><img data-src="/img/bV9TOC?w=1569&amp;h=634" src="https://static.alili.tech/img/bV9TOC?w=1569&amp;h=634" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>自定义报警规则</h4>
<p>如果每一次出错都报警的话，那将是一件很恐怖的事情。想象一下一个错误出一百万次，肯定不能发一百万封邮件。不仅邮件系统会挂掉，我们自己也会被搞晕。Fundebug默认配置了报警规则来避免这一情况的出现。而我特别喜欢的一个功能则是可以<strong>自定义报警规则</strong>。相比于默认的根据同一个错误出现多少次报警，我更喜欢同一个错误影响多少用户。</p>
<p><span class="img-wrap"><img data-src="/img/bV9TOG?w=1043&amp;h=652" src="https://static.alili.tech/img/bV9TOG?w=1043&amp;h=652" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果只有一个用户遇到，我大概会看一看，不重要的就暂时不管它。但是如果有5个用户遇到同一个错误，就会很重视了。所以我把前面的报错设置的比较频繁，保证能够及时去发现严重问题。</p>
<h4>结语</h4>
<p>大致就介绍这么多吧，如果想了解更详细的信息，可以去他们官网。</p>
<p>参考：</p>
<ol><li><a href="https://www.fundebug.com" rel="nofollow noreferrer" target="_blank">Fundebug:不放过每一个BUG</a></li></ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular项目接入Fundebug监控

## 原文链接
[https://segmentfault.com/a/1190000014713606](https://segmentfault.com/a/1190000014713606)


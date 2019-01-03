---
title: '使用react技术栈完全重写一个vue书城项目' 
date: 2019-01-04 2:30:10
hidden: true
slug: 0bs2hpxc46pj
categories: [reprint]
---

{{< raw >}}

                    
<p>本项目是在之前一个<a href="https://segmentfault.com/a/1190000010105596">vue项目</a>基础上，用react技术栈重写的一个书城项目</p>
<blockquote>
<p><a href="https://github.com/tgxhx/vue-reader" rel="nofollow noreferrer" target="_blank">vue版本地址</a></p>
<p><a href="https://github.com/tgxhx/react-reader" rel="nofollow noreferrer" target="_blank">本项目地址</a></p>
<p><a href="http://tgxhx.xyz/book" rel="nofollow noreferrer" target="_blank">预览地址</a></p>
</blockquote>
<h3 id="articleHeader0">项目说明</h3>
<p>本项目是一个react + nodejs + mysql构建的移动书城项目，数据是通过nodejs爬虫爬取，存储在mysql中，项目api通过express构建，前端部分是react技术栈。关于爬虫和api的详情请参考vue版本的说明，<a href="https://github.com/tgxhx/vue-reader" rel="nofollow noreferrer" target="_blank">地址</a>。</p>
<p>在写这个之前对于vue算是比较熟练了，转到react，jsx的语法研究了两天，然后研究了一下redux，发现跟vuex是类似的东西，上手起来也比较快。</p>
<p>然后开始用react全家桶重写这个项目，利用空余时间前后花了大概不到一个星期的样子，再之后花了一两天新增了vue版本没有的书架功能。</p>
<p>项目是基于create-react-app构建的，增加了sass的支持，组件热重载还未支持，加入了react-router和redux。</p>
<p>总结一下，vue和react的理念我认为是差不多的，重点都是组件化，state、props也是类似的作用，vuex和redux也有一定程度的类似，二者区别可能就是语法不一样了，vue写起来更像传统的html、js、css开发方式，jsx的写法有的人可能难以接受，但是也不难掌握，另外可能react对于js的掌握程度要求更高一些。</p>
<p>所以我认为，vue和react如果你熟悉其中之一，我相信上手另一个是很快的，因为核心理念你已经掌握了，剩下了就是语法了，vuex和redux也是一样。</p>
<p>本项目难点我认为是书架功能，也都写了注释，有类似想法的可以相互印证。</p>
<h2 id="articleHeader1">功能</h2>
<ul>
<li><p>[x] 首页推荐</p></li>
<li><p>[x] 书籍详情</p></li>
<li><p>[x] 相似推荐</p></li>
<li><p>[x] 分类查看</p></li>
<li><p>[x] 阅读器</p></li>
<li><p>[x] 章节跳转</p></li>
<li><p>[x] 更改字体</p></li>
<li><p>[x] 更换主题</p></li>
<li><p>[x] 夜间模式</p></li>
<li><p>[x] 翻页浏览</p></li>
<li><p>[x] 本地存储（存储每本书的阅读进度）</p></li>
<li><p>[x] 书架</p></li>
</ul>
<h4>项目截图</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010110203" src="https://static.alili.tech/img/remote/1460000010110203" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010110204" src="https://static.alili.tech/img/remote/1460000010110204" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010110205" src="https://static.alili.tech/img/remote/1460000010110205" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010110206" src="https://static.alili.tech/img/remote/1460000010110206" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010110207" src="https://static.alili.tech/img/remote/1460000010110207" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010729126" src="https://static.alili.tech/img/remote/1460000010729126" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用react技术栈完全重写一个vue书城项目

## 原文链接
[https://segmentfault.com/a/1190000010729121](https://segmentfault.com/a/1190000010729121)


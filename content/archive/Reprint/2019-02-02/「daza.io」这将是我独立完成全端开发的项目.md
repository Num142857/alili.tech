---
title: '「daza.io」这将是我独立完成全端开发的项目' 
date: 2019-02-02 2:30:11
hidden: true
slug: njfx70q5i5
categories: [reprint]
---

{{< raw >}}

                    
<p>最近三年的工作经历，让我有机会接触到不同技术栈的项目，并且从中积累了不少各个技术栈的开发经验，虽然技术深度不够，但可以用不同技术视角去思考项目的设计和开发，例如：以客户端开发的视角去思考 API 的设计、用客户端开发的思路去开发前端项目等，然而这些经验都分散在了我这两年半时间里做的大大小小的项目里。</p>
<p>所以我希望可以将我的这些经验归纳总在「 daza.io 」这个项目里，它的实质是一个内容聚合项目（参考了即刻的形式），用程序去收集一些可能感兴趣的文章，并通过其他用户对于文章的评判，以达到筛选到优质内容，提高学习效率。</p>
<p>另外它还有另外一个作为，为我的其他小项目提供数据。最简单的一个例子就是最近在写的个人博客，其中有一个模块就是用地图展示我旅行的足迹，数据就是来源于它。</p>
<p><strong>我的进步离不开开源，所以「 daza.io 」也是全部开源的</strong></p>
<blockquote><p>「 daza.io 」是打杂的拼音，也是对一种自嘲，其实个人感觉敢自称自己是打杂的人综合能力都是挺强的。</p></blockquote>
<ul>
<li><p>主页：<a href="http://daza.io" rel="nofollow noreferrer" target="_blank">http://daza.io</a></p></li>
<li><p>接口：<a href="http://api.daza.io" rel="nofollow noreferrer" target="_blank">http://api.daza.io</a></p></li>
</ul>
<h2 id="articleHeader0">LOGO</h2>
<blockquote><p>LOGO 是请我一个设计师朋友设计的，个人非常喜欢他的设计，与他合作的两年来也得到了挺多关于设计及用户体验上的经验。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007140206" src="https://static.alili.tech/img/remote/1460000007140206" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">网站截图</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007140207" src="https://static.alili.tech/img/remote/1460000007140207" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">技术栈</h2>
<h3 id="articleHeader3">REST</h3>
<blockquote><p>本人是非常喜欢文档先行的工作方式的，先用文档将思路整理一遍，然后在开发的时候再次完善。这次我在对比了多个文档工具最终选择了 Swagger 。</p></blockquote>
<ul><li><p>Swagger</p></li></ul>
<p><strong>查看文档： <a href="http://api.daza.io/docs/strong" rel="nofollow noreferrer" target="_blank">http://api.daza.io/docs</a></strong></p>
<h3 id="articleHeader4">后端（ API Only ）</h3>
<blockquote><p>在最终采用 Laravel 之前，我一度已经在使用 Sails.js 开发了，但由于考虑到代码被其他项目重用及市场现状，并且上半年负责的项目刚好使用了 Laravel 。</p></blockquote>
<ul>
<li><p>Laravel 5.3</p></li>
<li><p>MySQL</p></li>
</ul>
<h3 id="articleHeader5">前端</h3>
<blockquote><p>使用了现在非常火的 Vue.js 框架开发，肯定有人会问，现在 Vue.js 2.0 都已经发布了，为什么不用 2.0 写。那是因为这个项目在 5 月就已经创建了，所以在现在在使用 2.0 进行开发自己的<a href="https://github.com/lijy91/jianying.li" rel="nofollow noreferrer" target="_blank">个人博客</a>项目，一但把 1.x 和 2.0 的一些差异了解得差不多后就会升级。</p></blockquote>
<ul>
<li><p>Vue.js 1.x</p></li>
<li><p>vuex</p></li>
<li><p>vue-router</p></li>
<li><p>vue-resource</p></li>
<li><p>vue-validator</p></li>
</ul>
<h3 id="articleHeader6">客户端</h3>
<h4>iOS</h4>
<blockquote><p>使用 Swift 2.3 进行开发，基本参考了今日头条和即刻的设计，目前已经完成主要功能。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007140208" src="https://static.alili.tech/img/remote/1460000007140208" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>备注：将会以付费软件的形式发布到 AppStore</strong></p>
<h4>Android</h4>
<blockquote><p>尚未开始！</p></blockquote>
<h4>部署</h4>
<blockquote><p>项目其实通过 Docker + DaoCloud 实现了自动化部署，只要把代码推送到 GitHub ， DaoCloud 将会自动构建并部署。</p></blockquote>
<ul>
<li><p>Docker</p></li>
<li><p>DaoCloud</p></li>
<li><p>七牛云存储</p></li>
</ul>
<h2 id="articleHeader7">项目地址</h2>
<ul>
<li><p><a href="https://github.com/lijy91/daza-backend" rel="nofollow noreferrer" target="_blank">daza-backend</a></p></li>
<li><p><a href="https://github.com/lijy91/daza-frontend" rel="nofollow noreferrer" target="_blank">daza-frontend</a></p></li>
<li><p><a href="https://github.com/lijy91/daza-ios" rel="nofollow noreferrer" target="_blank">daza-ios</a></p></li>
<li><p><a href="https://github.com/lijy91/daza-android" rel="nofollow noreferrer" target="_blank">daza-android</a></p></li>
</ul>
<h2 id="articleHeader8">加入讨论</h2>
<blockquote><p>如果你对这个项目有兴趣，想吐槽，想提建议，为项目提供服务，欢迎加以下讨论群。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007140209" src="https://static.alili.tech/img/remote/1460000007140209" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">关于我</h2>
<blockquote><p>欢迎同行交流或者有好工作机会的朋友加我微信。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007140210" src="https://static.alili.tech/img/remote/1460000007140210" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">支持一下</h2>
<blockquote><p>如果你觉得我的代码写得还不错对你有帮助，请扫下面二维码。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007140211" src="https://static.alili.tech/img/remote/1460000007140211" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
「daza.io」这将是我独立完成全端开发的项目

## 原文链接
[https://segmentfault.com/a/1190000007140203](https://segmentfault.com/a/1190000007140203)


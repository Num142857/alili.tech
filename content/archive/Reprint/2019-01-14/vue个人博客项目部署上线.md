---
title: 'vue个人博客项目部署上线' 
date: 2019-01-14 2:30:07
hidden: true
slug: m5bqzm0p7p
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>之前有发过这个项目的文章了，根据朋友的建议改变了博客的样式，也增加了一些新功能，下面完整地介绍这个博客项目。文末附<code>前端实习求职简历</code></p>
<h2 id="articleHeader1">项目简介</h2>
<p>简要介绍：一个前后端分离的项目<br>主要技术栈：vue全家桶 + node.js + Express + Mongodb<br>github地址： <a href="https://github.com/FatDong1/VueBlog" rel="nofollow noreferrer" target="_blank">vue博客内容管理系统</a>    <br>项目线上地址： <a>FatDong的博客 --- www.xuhaodong.cn</a></p>
<h2 id="articleHeader2">实现功能</h2>
<h3 id="articleHeader3">文章</h3>
<ul>
<li><p>文章通过标签分类</p></li>
<li><p>存为草稿，草稿和文章可以随时切换</p></li>
<li><p>文章目录，与segmentfault生成的目录效果相似</p></li>
<li><p>最近更新，首页展示最近更新的三篇文章</p></li>
<li><p>搜索文章，输入标题的部分内容即可搜索相应文章</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVNEeZ?w=1345&amp;h=644" src="https://static.alili.tech/img/bVNEeZ?w=1345&amp;h=644" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVNEgJ?w=1345&amp;h=647" src="https://static.alili.tech/img/bVNEgJ?w=1345&amp;h=647" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">评论</h3>
<ul>
<li><p>过滤评论，太长、太短、含QQ群号的评论将无法发布</p></li>
<li><p>邮件通知，如果有人回复评论，会通过nodemailer来发送通知邮件</p></li>
<li><p>头像功能，访问者和站长分别用不同的头像来区分</p></li>
<li><p>点赞功能，点赞情况记录在浏览器的localStorage里，下次访问会还原点赞情况</p></li>
<li><p>防止重名，同一篇文章中不会出现评论者重名的情况，当然同一个人可以多次评论</p></li>
<li><p>排序评论，排序依据：最新、最早、最热</p></li>
<li><p>用localStorage记录邮箱和昵称，下次访问不用重新输入</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVNEgl?w=1343&amp;h=645" src="https://static.alili.tech/img/bVNEgl?w=1343&amp;h=645" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">markdown编辑器(marked)</h3>
<ul>
<li>
<p>过滤标签</p>
<ul>
<li><p>去除首尾空格</p></li>
<li><p>输入相同的标签将弹出模态框警告并自动删除，使用数据驱动视图更新的思想将所有标签放在一个数组，添加和删除标签都是对数组进行操作</p></li>
</ul>
</li>
<li><p>自定义快捷键</p></li>
<li><p>切换预览模式</p></li>
<li><p>代码高亮显示，使用hightlight.js进行代码高亮显示</p></li>
<li><p>提醒保存，没有保存就离开页面前会弹出模态框确认</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVNEiK?w=1366&amp;h=643" src="https://static.alili.tech/img/bVNEiK?w=1366&amp;h=643" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">账户</h3>
<ul>
<li>
<p>权限验证</p>
<ul>
<li><p>前台使用vue-router的beforeEach进行验证</p></li>
<li><p>后台使用jwt实现基于token的身份验证</p></li>
</ul>
</li>
<li><p>修改账号和密码</p></li>
<li><p>密码加密，使用sha1加密算法，用csprng生成的随机盐</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVNEiV?w=1366&amp;h=638" src="https://static.alili.tech/img/bVNEiV?w=1366&amp;h=638" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">页面特效</h3>
<ul>
<li>
<p>canvas粒子效果（移动端取消）</p>
<ul>
<li><p>鼠标追随粒子效果</p></li>
<li><p>单击取消展示粒子效果，重新点击随机切换粒子效果的颜色</p></li>
<li><p>鼠标离开页面后，粒子效果开始规则运动</p></li>
</ul>
</li>
<li><p>平滑回到顶部</p></li>
<li><p>点击文章段落标题，平滑滚动到锚点</p></li>
<li><p>向下滚动时，动态展示dom节点</p></li>
<li><p>底部自动加载loading</p></li>
<li><p>网站顶部图片改变景深</p></li>
</ul>
<h3 id="articleHeader8">其他功能</h3>
<ul><li><p>适配移动端。使用flex布局、rem以及百分比布局去适配移动端，实现响应式布局</p></li></ul>
<p>下面是移动端的演示<br><span class="img-wrap"><img data-src="/img/remote/1460000009411216?w=318&amp;h=568" src="https://static.alili.tech/img/remote/1460000009411216?w=318&amp;h=568" alt="mobile" title="mobile" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader9">网站部署</h3>
<ul>
<li><p>添加SSL证书，使用更为安全的https协议</p></li>
<li><p>使用nginx进行反向代理</p></li>
<li><p>服务器使用linux系统，学习了一些linux的知识</p></li>
</ul>
<h2 id="articleHeader10">收获</h2>
<ul>
<li><p>更加了解一个项目从前端到后端的流程，可以更好地和后端人员对接</p></li>
<li><p>可以加深对webpack、Vue、vuex、vue-router、vue-resource的使用</p></li>
</ul>
<h2 id="articleHeader11">最后</h2>
<p>最近在找<code>前端暑假实习</code>，这是我的<a href="https://job.xuhaodong.cn/" rel="nofollow noreferrer" target="_blank">在线简历 --- job.xuhaodong.cn</a>，谢谢?</p>
<p>本文已同步到<a href="https://www.xuhaodong.cn/articles/31#article" rel="nofollow noreferrer" target="_blank">我的博客www.xuhaodong.cn</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue个人博客项目部署上线

## 原文链接
[https://segmentfault.com/a/1190000009411213](https://segmentfault.com/a/1190000009411213)


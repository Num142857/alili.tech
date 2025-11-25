---
title: '分享一下我的 vue + koa + mysql 搭建博客之旅' 
date: 2018-11-30 2:30:11
hidden: true
slug: cgyn7t21ziv
categories: [reprint]
---

{{< raw >}}

                    
<p>一直以来都想用自己的技术做一些个人项目, 之前的<a href="https://chenyinkai.github.io/" rel="nofollow noreferrer" target="_blank">博客</a>是基于 <code>hexo</code> 搭建, 感觉啥都是别人帮你写好了, 于是便决定自己搞一个, 断断续续地弄了一段时间, 也总算是完成了个简单版本并部署上线.</p>
<p><a href="http://www.cykspace.com" rel="nofollow noreferrer" target="_blank">博客线上地址</a></p>
<p>博客地址：<a href="https://github.com/chenyinkai/cykspace" rel="nofollow noreferrer" target="_blank">cykspace</a></p>
<p>博客后台：<a href="https://github.com/chenyinkai/cykspace-node" rel="nofollow noreferrer" target="_blank">cykspace-node</a></p>
<p>如果觉得还行的话, 欢迎给个 <code>star</code> 哈. 感谢～～</p>
<blockquote>由于不会设计, 博客主题是模仿 <a href="https://github.com/iissnan/hexo-theme-next" rel="nofollow noreferrer" target="_blank">hexo-theme-next</a> 的布局样式, 感谢作者的开源分享.</blockquote>
<h2 id="articleHeader0">预览</h2>
<blockquote>首页文章列表</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014903130?w=2800&amp;h=1390" src="https://static.alili.tech/img/remote/1460000014903130?w=2800&amp;h=1390" alt="首页-pc" title="首页-pc" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000014903131" src="https://static.alili.tech/img/remote/1460000014903131" alt="首页-移动端" title="首页-移动端" style="cursor: pointer;"></span></p>
<blockquote>标签管理</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014903132?w=2812&amp;h=1394" src="https://static.alili.tech/img/remote/1460000014903132?w=2812&amp;h=1394" alt="标签-pc" title="标签-pc" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000014903133" src="https://static.alili.tech/img/remote/1460000014903133" alt="标签-移动端" title="标签-移动端" style="cursor: pointer;"></span></p>
<blockquote>文章归档</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014903134" src="https://static.alili.tech/img/remote/1460000014903134" alt="文章归档-pc" title="文章归档-pc" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000014903135" src="https://static.alili.tech/img/remote/1460000014903135" alt="文章归档-移动端" title="文章归档-移动端" style="cursor: pointer;"></span></p>
<blockquote>关于</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014903136?w=2810&amp;h=1398" src="https://static.alili.tech/img/remote/1460000014903136?w=2810&amp;h=1398" alt="关于-pc" title="关于-pc" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000014903137" src="https://static.alili.tech/img/remote/1460000014903137" alt="关于-移动端" title="关于-移动端" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">相关技术栈</h2>
<h3 id="articleHeader2">前端</h3>
<ul>
<li>
<code>vue</code> + <code>vue-router</code>: 项目由 <code>vue-cli</code> 搭建</li>
<li>
<code>axios</code>: 异步请求</li>
<li>
<code>less</code>: css 预编译处理器</li>
<li>
<code>Font-Awesome</code>: 字体库</li>
</ul>
<h3 id="articleHeader3">后台</h3>
<ul>
<li>
<code>koa</code> + <code>koa-router</code> + <code>koa-cors</code>: 后台使用 <code>koa</code> 提供接口服务</li>
<li>
<code>mysql</code> + <code>sequelize</code>: 文章数据存储以及ORM</li>
</ul>
<h3 id="articleHeader4">部署</h3>
<ul>
<li>
<code>nginx</code>: 提供网站服务</li>
<li>
<code>pm2</code>: <code>node</code> 进程管理</li>
</ul>
<h2 id="articleHeader5">未来将会加入</h2>
<ul>
<li>服务端渲染</li>
<li>后台管理</li>
<li>评论</li>
<li>网易云音乐</li>
<li>页面数据可视化统计</li>
<li>...</li>
</ul>
<h2 id="articleHeader6">测试</h2>
<p><a href="http://www.cykspace.com" rel="nofollow noreferrer" target="_blank">博客线上地址</a></p>
<p>以下是博客前端和后台源代码地址：</p>
<p>博客地址：<a href="https://github.com/chenyinkai/cykspace" rel="nofollow noreferrer" target="_blank">cykspace</a></p>
<p>博客后台：<a href="https://github.com/chenyinkai/cykspace-node" rel="nofollow noreferrer" target="_blank">cykspace-node</a></p>
<p>如果在测试期间遇到什么问题, 可留言给我, 我会及时回复。</p>
<h2 id="articleHeader7">最后</h2>
<p>感谢各位的观看, 如果有什么意见或者建议的话, 还望多多指教. 感谢～～</p>
<blockquote>如果感觉我的博客还过得去的话, 还请给个 <code>star</code> 鼓励一下作者, 嘿嘿～～。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
分享一下我的 vue + koa + mysql 搭建博客之旅

## 原文链接
[https://segmentfault.com/a/1190000014903125](https://segmentfault.com/a/1190000014903125)


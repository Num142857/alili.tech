---
title: 'react全家桶+express实战技术博客系列教程' 
date: 2018-12-28 2:30:11
hidden: true
slug: 8oj2gh0dhyi
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">React技术栈+Express+Mongodb实现个人博客</h1>
<h2 id="articleHeader1">开源地址</h2>
<p><a href="https://github.com/Nealyang/React-Express-Blog-Demo" rel="nofollow noreferrer" target="_blank">https://github.com/Nealyang/React-Express-Blog-Demo</a></p>
<h2 id="articleHeader2">说明</h2>
<p><strong><em>放到开头，这里重点说明下，很多哥们会发邮件或者群里艾特，但是好多邮件回复不了不知道什么情况，群里有时候不怎么关注就错过了，大家如果有啥问题咱就直接提issue吧，后面朋友遇到相同问题大家也可以参考</em></strong></p>
<h2 id="articleHeader3">功能描述</h2>
<p><strong><em>前端部分</em></strong></p>
<ul>
<li>文章列表展示</li>
<li>文章分类</li>
<li>登录管理</li>
<li>权限管理</li>
<li>文章详情页展示</li>
<li>管理员文章管理</li>
<li>管理员标签管理</li>
<li>发文（支持MarkDown语法）</li>
</ul>
<p><strong><em>后端部分</em></strong></p>
<ul>
<li>mongoose数据库操作</li>
<li>路由管理</li>
<li>身份验证</li>
<li>基本的增删改查</li>
<li>...</li>
</ul>
<h2 id="articleHeader4">技术栈</h2>
<ul>
<li>react</li>
<li>react-redux</li>
<li>react-router</li>
<li>redux-saga</li>
<li>babel</li>
<li>webpack</li>
<li>Express</li>
<li>Mongodb</li>
<li>Mongoose</li>
</ul>
<h2 id="articleHeader5">TODO</h2>
<ul><li>文章评论</li></ul>
<h2 id="articleHeader6">项目运行效果（这个GIF不是连续播放的，我好烦）</h2>
<ul><li>查看文章详情</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011664182?w=872&amp;h=500" src="https://static.alili.tech/img/remote/1460000011664182?w=872&amp;h=500" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>非管理员登录</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011664183?w=872&amp;h=500" src="https://static.alili.tech/img/remote/1460000011664183?w=872&amp;h=500" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>管理员登录</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011664184?w=872&amp;h=500" src="https://static.alili.tech/img/remote/1460000011664184?w=872&amp;h=500" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>发表文章</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011664185?w=872&amp;h=500" src="https://static.alili.tech/img/remote/1460000011664185?w=872&amp;h=500" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>修改文章</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011664186?w=872&amp;h=500" src="https://static.alili.tech/img/remote/1460000011664186?w=872&amp;h=500" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>标签管理</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011664187?w=872&amp;h=500" src="https://static.alili.tech/img/remote/1460000011664187?w=872&amp;h=500" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">项目介绍</h2>
<p>当然这是一个全栈的开源demo，在此之前写过一个<a href="https://github.com/Nealyang/React-Fullstack-Dianping-Demo" rel="nofollow noreferrer" target="_blank">模仿大众点评的Demo</a>,有兄弟反应说应该加点注释。<br>因为实在不想回头再麻烦，就想在这个demo中再加。</p>
<p>这个demo就是一个简单的增删改查的博客demo。前端用react技术栈、后端是express+mongoose。</p>
<h2 id="articleHeader8">项目实现步骤系列博客</h2>
<ul>
<li><a href="https://github.com/Nealyang/React-Express-Blog-Demo/blob/master/record/doc/00_%E9%A2%84%E7%83%AD%E4%B8%80%E6%B3%A2.md" rel="nofollow noreferrer" target="_blank">实战react技术栈+express前后端博客项目（0）-- 预热一波</a></li>
<li><a href="https://github.com/Nealyang/React-Express-Blog-Demo/blob/master/record/doc/01_%E6%95%B4%E4%BD%93%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E6%90%AD%E5%BB%BA%E3%80%81state%E7%8A%B6%E6%80%81%E6%A0%91%E8%AE%BE%E8%AE%A1.md" rel="nofollow noreferrer" target="_blank">实战react技术栈+express前后端博客项目（1）-- 整体项目结构搭建、state状态树设计</a></li>
<li><a href="https://github.com/Nealyang/React-Express-Blog-Demo/blob/master/record/doc/02_%E5%89%8D%E7%AB%AFreact-xxx%E3%80%81%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE.md" rel="nofollow noreferrer" target="_blank">实战react技术栈+express前后端博客项目（2）-- 前端react-xxx、路由配置</a></li>
<li><a href="https://github.com/Nealyang/React-Express-Blog-Demo/blob/master/record/doc/03_%E5%90%8E%E7%AB%AF%E8%B7%AF%E7%94%B1%E3%80%81%E4%BB%A3%E7%90%86%E4%BB%A5%E5%8F%8A%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%E6%89%98%E7%AE%A1%E7%AD%89%E5%85%B6%E4%BB%96%E9%85%8D%E7%BD%AE%E8%AF%B4%E6%98%8E.md" rel="nofollow noreferrer" target="_blank">实战react技术栈+express前后端博客项目（3）-- 后端路由、代理以及静态资源托管等其他配置说明</a></li>
<li><a href="https://github.com/Nealyang/React-Express-Blog-Demo/blob/master/record/doc/04_%E5%8D%9A%E5%AE%A2%E9%A6%96%E9%A1%B5%E4%BB%A3%E7%A0%81%E7%BC%96%E5%86%99%E4%BB%A5%E5%8F%8Aredux-saga%E7%BB%84%E7%BB%87.md" rel="nofollow noreferrer" target="_blank">实战react技术栈+express前后端博客项目（4）-- 博客首页代码编写以及redux-saga组织</a></li>
<li><a href="https://github.com/Nealyang/React-Express-Blog-Demo/blob/master/record/doc/05_%E5%89%8D%E5%90%8E%E7%AB%AF%E5%AE%9E%E7%8E%B0%E7%99%BB%E5%BD%95%E5%8A%9F%E8%83%BD.md" rel="nofollow noreferrer" target="_blank">实战react技术栈+express前后端博客项目（5）-- 前后端实现登录功能</a></li>
<li><a href="https://github.com/Nealyang/React-Express-Blog-Demo/blob/master/record/doc/06_%E4%BD%BF%E7%94%A8session%E5%AE%9E%E7%8E%B0%E5%85%8D%E7%99%BB%E9%99%86+%E7%AE%A1%E7%90%86%E5%90%8E%E5%8F%B0%E6%9D%83%E9%99%90%E9%AA%8C%E8%AF%81.md" rel="nofollow noreferrer" target="_blank">实战react技术栈+express前后端博客项目（6）-- 使用session实现免登陆+管理后台权限验证</a></li>
<li><a href="https://github.com/Nealyang/React-Express-Blog-Demo/blob/master/record/doc/07_%E5%89%8D%E7%AB%AF%E7%AE%A1%E7%90%86%E7%95%8C%E9%9D%A2%E7%94%A8%E6%88%B7%E6%9F%A5%E7%9C%8B%E5%8A%9F%E8%83%BD+%E5%90%8E%E7%AB%AF%E5%AF%B9%E5%BA%94%E6%8E%A5%E5%8F%A3%E5%BC%80%E5%8F%91.md" rel="nofollow noreferrer" target="_blank">实战react技术栈+express前后端博客项目（7）-- 前端管理界面用户查看功能+后端对应接口开发</a></li>
<li><a href="https://github.com/Nealyang/React-Express-Blog-Demo/blob/master/record/doc/08_%E5%89%8D%E7%AB%AF%E7%AE%A1%E7%90%86%E7%95%8C%E9%9D%A2%E6%A0%87%E7%AD%BE%E7%AE%A1%E7%90%86%E5%8A%9F%E8%83%BD+%E5%90%8E%E7%AB%AF%E5%AF%B9%E5%BA%94%E6%8E%A5%E5%8F%A3%E5%BC%80%E5%8F%91.md" rel="nofollow noreferrer" target="_blank">实战react技术栈+express前后端博客项目（8）-- 前端管理界面标签管理功能+后端对应接口开发</a></li>
<li><a href="https://github.com/Nealyang/React-Express-Blog-Demo/blob/master/record/doc/09_%E5%89%8D%E7%AB%AF%E7%AE%A1%E7%90%86%E7%95%8C%E9%9D%A2%E5%8F%91%E8%A1%A8%E6%96%87%E7%AB%A0%E5%8A%9F%E8%83%BD+%E5%90%8E%E7%AB%AF%E5%AF%B9%E5%BA%94%E6%8E%A5%E5%8F%A3.md" rel="nofollow noreferrer" target="_blank">实战react技术栈+express前后端博客项目（9）-- 前端管理界面发表文章功能+后端对应接口</a></li>
<li><a href="https://github.com/Nealyang/React-Express-Blog-Demo/blob/master/record/doc/10_%E5%89%8D%E7%AB%AF%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8%E3%80%81%E8%B7%AF%E7%94%B1%E6%8E%A7%E5%88%B6%E4%BB%A5%E5%8F%8A%E5%AF%B9%E5%BA%94%E5%90%8E%E7%AB%AF%E6%96%87%E7%AB%A0%E7%AE%A1%E7%90%86%E5%BC%80%E5%8F%91.md" rel="nofollow noreferrer" target="_blank">开发实战react技术栈+express前后端博客项目（10）-- 前端文章列表、路由控制以及对应后端文章管理开发</a></li>
<li><a href="https://github.com/Nealyang/React-Express-Blog-Demo/blob/master/record/doc/11_%E5%89%8D%E7%AB%AF%E6%96%87%E7%AB%A0%E7%AE%A1%E7%90%86%E9%83%A8%E5%88%86%E5%AE%8C%E5%96%84%EF%BC%88%E4%BF%AE%E6%94%B9%E3%80%81%E9%A2%84%E8%A7%88%E5%8A%9F%E8%83%BD%EF%BC%89.md" rel="nofollow noreferrer" target="_blank">实战react技术栈+express前后端博客项目（11）-- 前端文章管理部分完善（修改、预览功能）</a></li>
<li><a href="http://huziketang.com/books/react/lesson14" rel="nofollow noreferrer" target="_blank">实战react技术栈+express前后端博客项目（12）-- 博客添加评论功能以及对应后端实现</a></li>
<li><a href="https://github.com/Nealyang/React-Express-Blog-Demo/blob/master/record/doc/12_pm2%E7%9A%84%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.md" rel="nofollow noreferrer" target="_blank">实战react技术栈+express前后端博客项目（13）-- pm2的使用说明</a></li>
<li><a href="https://github.com/Nealyang/React-Express-Blog-Demo/blob/master/record/doc/13_%E6%94%B6%E5%B7%A5.md" rel="nofollow noreferrer" target="_blank">实战react技术栈+express前后端博客项目（14）-- 收工</a></li>
</ul>
<h2 id="articleHeader9">环境</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node @7.9.0
db @3.4.0
...
别的就直接npm install 了

注意MongoDB初始化后需要初始化一个admin/admin账户，用于登录后台管理" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-keyword">node</span> <span class="hljs-title">@7</span>.<span class="hljs-number">9.0</span>
db @<span class="hljs-number">3.4</span>.<span class="hljs-number">0</span>
...
别的就直接npm install 了

注意MongoDB初始化后需要初始化一个admin/admin账户，用于登录后台管理</code></pre>
<h2 id="articleHeader10">运行</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone git@github.com:Nealyang/React-Express-Blog-Demo.git

npm i

npm start

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git clone git@github<span class="hljs-selector-class">.com</span>:Nealyang/React-Express-Blog-Demo<span class="hljs-selector-class">.git</span>

npm <span class="hljs-selector-tag">i</span>

npm start

</code></pre>
<h2 id="articleHeader11">交流</h2>
<p><strong><em>扫码关注我的个人微信公众号，分享更多原创文章。点击交流学习加我微信、qq群。一起学习，一起进步</em></strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011664188?w=430&amp;h=430" src="https://static.alili.tech/img/remote/1460000011664188?w=430&amp;h=430" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>欢迎兄弟们加入：</p>
<p>Node.js技术交流群：209530601 </p>
<p>React技术栈：398240621</p>
<p>前端技术杂谈：604953717 (新建)</p>
<hr>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react全家桶+express实战技术博客系列教程

## 原文链接
[https://segmentfault.com/a/1190000011664177](https://segmentfault.com/a/1190000011664177)


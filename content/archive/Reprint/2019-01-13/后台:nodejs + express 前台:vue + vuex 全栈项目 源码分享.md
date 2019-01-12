---
title: '后台:nodejs + express 前台:vue + vuex 全栈项目 源码分享' 
date: 2019-01-13 2:30:11
hidden: true
slug: 0l4t5koi1d4h
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">关于</h1>
<p>一直考虑写一个功能齐全的完整Nodejs项目，但苦于没有找到合适的类型，而且后台系统无法直观的感受到，需要有一个前台项目配合，因此迟迟没有动笔。恰好前一段时间开源了一个<a href="https://github.com/bailicangdu/vue2-elm" rel="nofollow noreferrer" target="_blank">vue前端项目</a>，便以此为契机构筑了后台系统。</p>
<p>因为前端项目是根据饿了么官网接口写的，所以后台系统也保持了和官网一致的API接口。</p>
<p>整个项目分为两部分：前台项目接口、后台管理接口，共60多个。涉及登陆、注册、添加商品、商品展示、筛选排序、购物车、下单、用户中心等，构成一个完整的流程，基本完成一个外卖平台所需的基础功能。</p>
<h1 id="articleHeader1">源码地址：</h1>
<p><a href="https://github.com/bailicangdu/node-elm" rel="nofollow noreferrer" target="_blank">https://github.com/bailicangdu/node-elm</a></p>
<h1 id="articleHeader2">效果演示</h1>
<h4>(可在后台管理系统添加商铺，食品等数据，并在前端地址查看效果)</h4>
<h3 id="articleHeader3">前端网址</h3>
<p><a href="http://cangdu.org:8001/" rel="nofollow noreferrer" target="_blank">前端网址戳这里</a>（请用chrome手机模式预览）</p>
<h6>移动端扫描下方二维码</h6>
<p><span class="img-wrap"><img data-src="http://cangdu.org/files/images/ewm.png" src="https://static.alili.techhttp://cangdu.org/files/images/ewm.png" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">后台管理系统网址</h3>
<p><a href="http://cangdu.org/manage/" rel="nofollow noreferrer" target="_blank">后台管理网址戳这里</a></p>
<h2 id="articleHeader5">目标功能</h2>
<ul>
<li><p>[x] IP定位 -- 完成</p></li>
<li><p>[x] 城市列表 -- 完成</p></li>
<li><p>[x] 搜索地址 -- 完成</p></li>
<li><p>[x] 上传图片 -- 完成</p></li>
<li><p>[x] 添加商铺 -- 完成</p></li>
<li><p>[x] 添加食品 -- 完成</p></li>
<li><p>[x] 测量距离 -- 完成</p></li>
<li><p>[x] 搜索美食，餐馆 -- 完成</p></li>
<li><p>[x] 根据距离、销量、评分、特色菜、配送方式等进行排序和筛选 -- 完成</p></li>
<li><p>[x] 评价列表 -- 完成</p></li>
<li><p>[x] 食品详情 -- 完成</p></li>
<li><p>[x] 商家详情 -- 完成</p></li>
<li><p>[x] 购物车功能 -- 完成</p></li>
<li><p>[x] 登录、注册 -- 完成</p></li>
<li><p>[x] 修改密码 -- 完成</p></li>
<li><p>[x] 用户信息 -- 完成</p></li>
<li><p>[x] 添加、删除、修改收货地址 -- 完成</p></li>
<li><p>[x] 下单  -- 完成 ✨✨</p></li>
<li><p>[x] 订单信息 -- 完成</p></li>
<li><p>[x] 红包 -- 完成</p></li>
<li><p>[x] 商铺管理 -- 完成</p></li>
<li><p>[x] 食品管理 -- 完成</p></li>
<li><p>[x] 管理员权限验证 -- 完成</p></li>
<li><p>[x] 超级管理员 -- 完成</p></li>
<li><p>[x] 订单管理 -- 完成</p></li>
<li><p>[x] 流量统计 -- 完成</p></li>
<li><p>[x] 前后台路由同构 -- 完成</p></li>
<li><p>[x] 部署上线 -- 完成</p></li>
</ul>
<h1 id="articleHeader6">API接口文档</h1>
<h2 id="articleHeader7"><a href="https://github.com/bailicangdu/node-elm/blob/master/API.md" rel="nofollow noreferrer" target="_blank">接口文档地址</a></h2>
<h2 id="articleHeader8">部分截图</h2>
<h4>部分前台页面</h4>
<p><span class="img-wrap"><img data-src="http://cangdu.org/files/images/elm_msite.gif" src="https://static.alili.techhttp://cangdu.org/files/images/elm_msite.gif" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="http://cangdu.org/files/images/elm_shop.gif" src="https://static.alili.techhttp://cangdu.org/files/images/elm_shop.gif" alt="" title="" style="cursor: pointer;"></span></p>
<h4>部分后台管理系统页面</h4>
<p><span class="img-wrap"><img data-src="http://cangdu.org/files/images/manage_home.png" src="https://static.alili.techhttp://cangdu.org/files/images/manage_home.png" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="http://cangdu.org/files/images/manage_shop.png" src="https://static.alili.techhttp://cangdu.org/files/images/manage_shop.png" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
后台:nodejs + express 前台:vue + vuex 全栈项目 源码分享

## 原文链接
[https://segmentfault.com/a/1190000009656160](https://segmentfault.com/a/1190000009656160)


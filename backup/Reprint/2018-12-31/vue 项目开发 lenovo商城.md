---
title: 'vue 项目开发 lenovo商城' 
date: 2018-12-31 2:30:30
hidden: true
slug: wp4qo3yq5y
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>由于vue相对来说比较平缓的学习过程和新颖的技术思路，使其受到了广大前后端开发者的青睐，同时其通俗易懂的API和数据绑定的功能也为其揽获了不少用户。在初学vue的过程中遇到的一些问题，都是入门时可能会遇到的问题，那个时候觉得vue特别难学。因为vue对逻辑严谨度要求高，页面之间交互复杂，又会伴随着登录、注册、用户信息等等，常常会让我们很头疼，既然vue这么难懂  ，那么就由我来实践一个项目  开发一条思路  也许开源出来对能看到的人会有帮助。</p>
<p>基于Vue的一个组件开发。不得不说的一点就是，在实际的Vue项目中，页面中每一个小块都是由一个个组件（.vue文件）组成，经过抽离后，然后再合并一起组成一个页面。</p>
<p>起初也不知道写一个什么样的项目 ， 后来经介绍找了一项比较简单的项目  " lenovo商城 " 来实践一下个人水平……</p>
<p>该项目大大小小60多个页面，涉及 注册、登录、社交、商品展示、销量、购物车、下单等等，是一个完整的流程。</p>
<p>因为利用业余时间来做，现在刚开始写，现正处在工作期间，项目周期会有点长，项目从零布局到完成必须认真对待，目前项目已经在策划，增加详细的注释 以及简单的方法来实现， 方便读者易懂 ……</p>
<h1 id="articleHeader1">技术栈</h1>
<p>vue + vuex + vue-router + webpack + ES6/7 + fetch + sass + flex + svg</p>
<h1 id="articleHeader2">目标功能</h1>
<ul>
<li>[ ]  - 登录 -- 未完成</li>
<li>[ ]  - 注册 -- 未完成</li>
<li>[ ]  - 搜索产品 -- 未完成</li>
<li>[ ]  - 二维码 -- 未完成</li>
<li>[ ]  - 焦点图 -- 未完成</li>
<li>[ ]  - 所有分类 -- 未完成</li>
<li>[ ]  - 领券 -- 未完成</li>
<li>[ ]  - 社交互动 -- 未完成</li>
<li>[ ]  - 产品分类 -- 未完成</li>
<li>[ ]  - 物流查询 -- 未完成</li>
<li>[ ]  - 商品详情页 -- 未完成</li>
<li>[ ]  - 筛选功能 -- 未完成</li>
<li>[ ]  - 修改密码 -- 未完成</li>
<li>[ ]  - 发送短信 -- 未完成</li>
<li>[ ]  - 下单功能 -- 未完成</li>
<li>[ ]  - 订单列表 -- 未完成</li>
<li>[ ]  - 订单详情 -- 未完成</li>
<li>[ ]  - 购物车功能 -- 未完成</li>
<li>[ ]  - 我的页面 -- 未完成</li>
<li>[ ]  - 待付款 -- 未完成</li>
<li>[ ]  - 待发货 -- 未完成</li>
<li>[ ]  - 待收货 -- 未完成</li>
<li>[ ]  - 待评价 -- 未完成</li>
<li>[ ]  - 退货/换货 -- 未完成</li>
<li>[ ]  - 添加、删除、修改收货地址 -- 未完成</li>
<li>[ ]  - 设置 -- 未完成</li>
<li>[ ]  - 换肤 -- 未完成</li>
<li>[ ]  - 消息 -- 未完成</li>
<li>[ ]  - 个人信息 -- 未完成</li>
<li>[ ]  - 上传头像 -- 未完成</li>
<li>[ ]  - 收藏 -- 未完成</li>
<li>[ ]  - 评价 -- 未完成</li>
<li>[ ]  - 我的资产 -- 未完成</li>
<li>[ ]  - 优惠劵 -- 未完成</li>
<li>[ ]  - 我的收藏 -- 未完成</li>
<li>[ ]  - 收货地址 -- 未完成</li>
<li>[ ]  - 客服中心 -- 未完成</li>
<li>[ ]  - 下载App -- 未完成</li>
</ul>
<h1 id="articleHeader3">部分截图</h1>
<p>首页<br><span class="img-wrap"><img data-src="/img/bVU3QG?w=343&amp;h=699" src="https://static.alili.tech/img/bVU3QG?w=343&amp;h=699" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVU3Rx?w=341&amp;h=698" src="https://static.alili.tech/img/bVU3Rx?w=341&amp;h=698" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>分类<br><span class="img-wrap"><img data-src="/img/bVU3QJ?w=341&amp;h=701" src="https://static.alili.tech/img/bVU3QJ?w=341&amp;h=701" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVU3RC?w=341&amp;h=698" src="https://static.alili.tech/img/bVU3RC?w=341&amp;h=698" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>购物车<br><span class="img-wrap"><img data-src="/img/bVU3RD?w=342&amp;h=707" src="https://static.alili.tech/img/bVU3RD?w=342&amp;h=707" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVU3Se?w=341&amp;h=696" src="https://static.alili.tech/img/bVU3Se?w=341&amp;h=696" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我的<br><span class="img-wrap"><img data-src="/img/bVU3RN?w=345&amp;h=702" src="https://static.alili.tech/img/bVU3RN?w=345&amp;h=702" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVU3Sl?w=341&amp;h=696" src="https://static.alili.tech/img/bVU3Sl?w=341&amp;h=696" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 项目开发 lenovo商城

## 原文链接
[https://segmentfault.com/a/1190000011177248](https://segmentfault.com/a/1190000011177248)


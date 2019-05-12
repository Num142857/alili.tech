---
title: 'Vue2 全家桶仿 微信App 项目，支持多人在线聊天和机器人聊天' 
date: 2019-01-12 2:30:24
hidden: true
slug: 5e4faq5e4ag
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>这个项目是利用工作之余写的一个模仿微信app的单页面应用，整个项目包含27个页面，涉及实时群聊，机器人聊天，同学录，朋友圈等等，后续页面还是开发中。写这个项目主要目的是练习和熟悉vue和vuex的配合使用，利用socket.io实现实时聊天。</p>
<h2 id="articleHeader1">技术栈</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue2+vue-router+webpack+vuex+sass+svg构图+es6/7
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>vue2+vue-router+webpack+vuex+sass+svg构图+es6/<span class="hljs-number">7</span>
</code></pre>
<h2 id="articleHeader2">源码地址</h2>
<p>源码地址：<a href="https://github.com/bailichen/vue-weixin" rel="nofollow noreferrer" target="_blank">https://github.com/bailichen/vue-weixin</a></p>
<h2 id="articleHeader3">项目运行</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/bailichen/vue-weixin.git

cd vue-weixin

npm install

npm run dev (访问本地，运行后访问 http://localhost:8882)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>git clone <span class="hljs-string">https:</span><span class="hljs-comment">//github.com/bailichen/vue-weixin.git</span>

cd vue-weixin

npm install

npm run dev (访问本地，运行后访问 <span class="hljs-string">http:</span><span class="hljs-comment">//localhost:8882)</span>
</code></pre>
<h3 id="articleHeader4">效果演示</h3>
<p><a href="http://cangdu.org:8003/dialogue" rel="nofollow noreferrer" target="_blank">项目演示请点击这里</a> （请用chrome手机模式预览）</p>
<h3 id="articleHeader5">移动端扫描下方二维码</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009869607" src="https://static.alili.tech/img/remote/1460000009869607" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">说明</h3>
<blockquote>
<p>本项目主要用于熟悉vue2+vuex的用法</p>
<p>如有问题请直接在Issues中提出，或加qq：812571880</p>
<p>如果觉得对您学习vue有点点帮助，请右上角star一下吧   ^_^</p>
</blockquote>
<h1 id="articleHeader7">目标功能</h1>
<ul>
<li><p>[x] 微信</p></li>
<li><p>[x] 通讯录</p></li>
<li><p>[x] 发现</p></li>
<li><p>[x] 我</p></li>
<li><p>[x] 设置</p></li>
<li><p>[x] 新消息提醒</p></li>
<li><p>[x] 勿扰模式</p></li>
<li><p>[x] 聊天</p></li>
<li><p>[x] widows 微信已登录</p></li>
<li><p>[x] 搜索页</p></li>
<li><p>[x] 对话页</p></li>
<li><p>[x] 对话功能</p></li>
<li><p>[x] 单人机器人智能对话页</p></li>
<li><p>[x] 群聊</p></li>
<li><p>[x] 朋友圈</p></li>
<li><p>[x] 朋友圈点赞、评论</p></li>
<li><p>[x] 个人中心</p></li>
<li><p>[x] 详细资料</p></li>
<li><p>[x] 更多</p></li>
<li><p>[x] 个人相册</p></li>
<li><p>[x] 更多</p></li>
<li><p>[x] 收藏</p></li>
<li><p>[x] 我的钱包</p></li>
<li><p>[x] 购物</p></li>
<li><p>[x] 设置</p></li>
<li><p>[x] 登录</p></li>
</ul>
<h1 id="articleHeader8">页面部分截图</h1>
<h3 id="articleHeader9">单人聊天</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009869608?w=410&amp;h=731" src="https://static.alili.tech/img/remote/1460000009869608?w=410&amp;h=731" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">群聊</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009869609" src="https://static.alili.tech/img/remote/1460000009869609" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader11">朋友圈</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009869610?w=412&amp;h=736" src="https://static.alili.tech/img/remote/1460000009869610?w=412&amp;h=736" alt="" title="" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/remote/1460000009869611?w=410&amp;h=732" src="https://static.alili.tech/img/remote/1460000009869611?w=410&amp;h=732" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader12">项目布局</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
├── README.md                                    // webpack配置文件
├── build                                        // 项目打包路径
├── config                                       // 上线项目文件，放在服务器即可正常访问
│&nbsp;&nbsp; └── index.js
├── favicon.ico
├── index.html
├── package.json
├── printscreen
├── src                                          // 源码目录
│&nbsp;&nbsp; ├── App.vue                                  // 页面入口文件
│&nbsp;&nbsp; ├── components                               // 公共组件
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── findandMe
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── findandMe.vue                    // 发现和我共同的模块的列表
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── footer
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── foot.vue                         // 底部微信导航
│&nbsp;&nbsp; │&nbsp;&nbsp; └── header
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── head.vue                         // 头部公共组件
│&nbsp;&nbsp; ├── config                                   // 基本配置
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── env.js                               // 环境切换配置
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── fetch.js                             // 获取数据
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── iscroll.js 
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── mUtils.js                            // 工具
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── rem.js                               // px转换rem
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── swiper.min.js                        // 轮播图控件
│&nbsp;&nbsp; │&nbsp;&nbsp; └── uploadPreview.js                     // 上传图片控件
│&nbsp;&nbsp; ├── frames
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── addressbook
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── addressbook.vue                  // 通讯录
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── details
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     ├── details.vue                  // 详细资料
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     └── more
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;         └── more.vue                 // 更多
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── computer
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── computer.vue                     // pc端登录
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── conversation
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── chatmessage
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── chatmessage.vue              // 单人聊天信息
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── groupchatmessage.vue         // 群聊聊天信息
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── groupchat.vue                    // 群聊
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── singlechat.vue                   // 单人对话
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── dialogue
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── dialogue.vue                     // 微信首页(对话列表页)
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── find
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── find.vue                         // 发现
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── friendcircle
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── friendcircle.vue             // 朋友圈
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── miniapps
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     └── miniapps.vue                 // 小程序子页面
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── me
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── cardbag
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── cardbag.vue                  // 卡包
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── collect
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── collect.vue                  // 我的收藏
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── me.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── personaldetails
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── personaldetails.vue          // 个人信息
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── photoalbum
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── photoalbum.vue               // 我的相册
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── settings
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── detailset
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── aboutwc.vue              // 关于微信
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── chat.vue                 // 聊天
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── currency.vue             // 通用
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── disturbance.vue          // 勿扰模式
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── help.vue                 // 帮助与反馈
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── login.vue                // 登录
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── newmessage.vue           // 新消息提醒
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── privacy.vue              // 隐私
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── settings.vue                 // 设置
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── wallet
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     └── wallet.vue                   // 我的钱包
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── search
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── search.vue                       // 搜索
│&nbsp;&nbsp; │&nbsp;&nbsp; └── transfer
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── transfer.vue
│&nbsp;&nbsp; ├── images
│&nbsp;&nbsp; ├── main.js                                  // 程序入口文件，加载各种公共组件
│&nbsp;&nbsp; ├── router
│&nbsp;&nbsp; │&nbsp;&nbsp; └── router.js                           // 所有页面路由控制中心
│&nbsp;&nbsp; ├── service
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── data
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── album.js                        // 个人相册
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── burse.js                        // 钱包数据
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── chatmore.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── collect.js                     // 我的收藏
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── contacts.js                    // 联系人列表数据
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── dialoglist.js                  // 对话列表
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── friendcircle.js                // 朋友圈数据
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── groupchat.js                   // 群聊数据
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── login.js                       // 个人用户信息
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── search.js                      // 搜索的分类
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── userword.js
│&nbsp;&nbsp; │&nbsp;&nbsp; └── getData.js                         // 数据交互统一调配
│&nbsp;&nbsp; ├── style
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── public.scss                        // 公共样式
│&nbsp;&nbsp; │&nbsp;&nbsp; └── swiper.min.css
│&nbsp;&nbsp; └── vuex                                   // vuex的状态管理
│&nbsp;&nbsp;     ├── action.js                          // 配置根actions
│&nbsp;&nbsp;     ├── index.js                           // 引用vuex，创建store
│&nbsp;&nbsp;     ├── mutation-types.js                  // 定义常量muations名
│&nbsp;&nbsp;     └── mutation.js                        // 配置根mutations
└── tree.md

36 directories, 133 files
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
├── README<span class="hljs-selector-class">.md</span>                                    <span class="hljs-comment">// webpack配置文件</span>
├── build                                        <span class="hljs-comment">// 项目打包路径</span>
├── config                                       <span class="hljs-comment">// 上线项目文件，放在服务器即可正常访问</span>
│&nbsp;&nbsp; └── index<span class="hljs-selector-class">.js</span>
├── favicon<span class="hljs-selector-class">.ico</span>
├── index<span class="hljs-selector-class">.html</span>
├── package<span class="hljs-selector-class">.json</span>
├── printscreen
├── src                                          <span class="hljs-comment">// 源码目录</span>
│&nbsp;&nbsp; ├── App<span class="hljs-selector-class">.vue</span>                                  <span class="hljs-comment">// 页面入口文件</span>
│&nbsp;&nbsp; ├── components                               <span class="hljs-comment">// 公共组件</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── findandMe
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── findandMe<span class="hljs-selector-class">.vue</span>                    <span class="hljs-comment">// 发现和我共同的模块的列表</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">footer</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── foot<span class="hljs-selector-class">.vue</span>                         <span class="hljs-comment">// 底部微信导航</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">header</span>
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── head<span class="hljs-selector-class">.vue</span>                         <span class="hljs-comment">// 头部公共组件</span>
│&nbsp;&nbsp; ├── config                                   <span class="hljs-comment">// 基本配置</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── env<span class="hljs-selector-class">.js</span>                               <span class="hljs-comment">// 环境切换配置</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── fetch<span class="hljs-selector-class">.js</span>                             <span class="hljs-comment">// 获取数据</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── iscroll<span class="hljs-selector-class">.js</span> 
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── mUtils<span class="hljs-selector-class">.js</span>                            <span class="hljs-comment">// 工具</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── rem<span class="hljs-selector-class">.js</span>                               <span class="hljs-comment">// px转换rem</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── swiper<span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.js</span>                        <span class="hljs-comment">// 轮播图控件</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── uploadPreview<span class="hljs-selector-class">.js</span>                     <span class="hljs-comment">// 上传图片控件</span>
│&nbsp;&nbsp; ├── frames
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── addressbook
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── addressbook<span class="hljs-selector-class">.vue</span>                  <span class="hljs-comment">// 通讯录</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">details</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">details</span><span class="hljs-selector-class">.vue</span>                  <span class="hljs-comment">// 详细资料</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     └── more
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;         └── more<span class="hljs-selector-class">.vue</span>                 <span class="hljs-comment">// 更多</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── computer
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── computer<span class="hljs-selector-class">.vue</span>                     <span class="hljs-comment">// pc端登录</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── conversation
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── chatmessage
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── chatmessage<span class="hljs-selector-class">.vue</span>              <span class="hljs-comment">// 单人聊天信息</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── groupchatmessage<span class="hljs-selector-class">.vue</span>         <span class="hljs-comment">// 群聊聊天信息</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── groupchat<span class="hljs-selector-class">.vue</span>                    <span class="hljs-comment">// 群聊</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── singlechat<span class="hljs-selector-class">.vue</span>                   <span class="hljs-comment">// 单人对话</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── dialogue
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── dialogue<span class="hljs-selector-class">.vue</span>                     <span class="hljs-comment">// 微信首页(对话列表页)</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── find
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── find<span class="hljs-selector-class">.vue</span>                         <span class="hljs-comment">// 发现</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── friendcircle
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── friendcircle<span class="hljs-selector-class">.vue</span>             <span class="hljs-comment">// 朋友圈</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── miniapps
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     └── miniapps<span class="hljs-selector-class">.vue</span>                 <span class="hljs-comment">// 小程序子页面</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── me
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── cardbag
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── cardbag<span class="hljs-selector-class">.vue</span>                  <span class="hljs-comment">// 卡包</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── collect
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── collect<span class="hljs-selector-class">.vue</span>                  <span class="hljs-comment">// 我的收藏</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── me<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── personaldetails
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── personaldetails<span class="hljs-selector-class">.vue</span>          <span class="hljs-comment">// 个人信息</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── photoalbum
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── photoalbum<span class="hljs-selector-class">.vue</span>               <span class="hljs-comment">// 我的相册</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── settings
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── detailset
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── aboutwc<span class="hljs-selector-class">.vue</span>              <span class="hljs-comment">// 关于微信</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── chat<span class="hljs-selector-class">.vue</span>                 <span class="hljs-comment">// 聊天</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── currency<span class="hljs-selector-class">.vue</span>             <span class="hljs-comment">// 通用</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── disturbance<span class="hljs-selector-class">.vue</span>          <span class="hljs-comment">// 勿扰模式</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── help<span class="hljs-selector-class">.vue</span>                 <span class="hljs-comment">// 帮助与反馈</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── login<span class="hljs-selector-class">.vue</span>                <span class="hljs-comment">// 登录</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── newmessage<span class="hljs-selector-class">.vue</span>           <span class="hljs-comment">// 新消息提醒</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── privacy<span class="hljs-selector-class">.vue</span>              <span class="hljs-comment">// 隐私</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── settings<span class="hljs-selector-class">.vue</span>                 <span class="hljs-comment">// 设置</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── wallet
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     └── wallet<span class="hljs-selector-class">.vue</span>                   <span class="hljs-comment">// 我的钱包</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── search
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── search<span class="hljs-selector-class">.vue</span>                       <span class="hljs-comment">// 搜索</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── transfer
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── transfer<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; ├── images
│&nbsp;&nbsp; ├── main<span class="hljs-selector-class">.js</span>                                  <span class="hljs-comment">// 程序入口文件，加载各种公共组件</span>
│&nbsp;&nbsp; ├── router
│&nbsp;&nbsp; │&nbsp;&nbsp; └── router<span class="hljs-selector-class">.js</span>                           <span class="hljs-comment">// 所有页面路由控制中心</span>
│&nbsp;&nbsp; ├── service
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── data
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── album<span class="hljs-selector-class">.js</span>                        <span class="hljs-comment">// 个人相册</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── burse<span class="hljs-selector-class">.js</span>                        <span class="hljs-comment">// 钱包数据</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── chatmore<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── collect<span class="hljs-selector-class">.js</span>                     <span class="hljs-comment">// 我的收藏</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── contacts<span class="hljs-selector-class">.js</span>                    <span class="hljs-comment">// 联系人列表数据</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── dialoglist<span class="hljs-selector-class">.js</span>                  <span class="hljs-comment">// 对话列表</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── friendcircle<span class="hljs-selector-class">.js</span>                <span class="hljs-comment">// 朋友圈数据</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── groupchat<span class="hljs-selector-class">.js</span>                   <span class="hljs-comment">// 群聊数据</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── login<span class="hljs-selector-class">.js</span>                       <span class="hljs-comment">// 个人用户信息</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── search<span class="hljs-selector-class">.js</span>                      <span class="hljs-comment">// 搜索的分类</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── userword<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── getData<span class="hljs-selector-class">.js</span>                         <span class="hljs-comment">// 数据交互统一调配</span>
│&nbsp;&nbsp; ├── style
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── public<span class="hljs-selector-class">.scss</span>                        <span class="hljs-comment">// 公共样式</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── swiper<span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.css</span>
│&nbsp;&nbsp; └── vuex                                   <span class="hljs-comment">// vuex的状态管理</span>
│&nbsp;&nbsp;     ├── action<span class="hljs-selector-class">.js</span>                          <span class="hljs-comment">// 配置根actions</span>
│&nbsp;&nbsp;     ├── index<span class="hljs-selector-class">.js</span>                           <span class="hljs-comment">// 引用vuex，创建store</span>
│&nbsp;&nbsp;     ├── mutation-types<span class="hljs-selector-class">.js</span>                  <span class="hljs-comment">// 定义常量muations名</span>
│&nbsp;&nbsp;     └── mutation<span class="hljs-selector-class">.js</span>                        <span class="hljs-comment">// 配置根mutations</span>
└── tree<span class="hljs-selector-class">.md</span>

<span class="hljs-number">36</span> directories, <span class="hljs-number">133</span> files
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2 全家桶仿 微信App 项目，支持多人在线聊天和机器人聊天

## 原文链接
[https://segmentfault.com/a/1190000009827954](https://segmentfault.com/a/1190000009827954)


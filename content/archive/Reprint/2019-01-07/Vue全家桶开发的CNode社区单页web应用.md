---
title: 'Vue全家桶开发的CNode社区单页web应用' 
date: 2019-01-07 2:30:11
hidden: true
slug: 9czy0g8zgnn
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000010280135" src="https://static.alili.tech/img/remote/1460000010280135" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>写这篇文章就是为了记录一下我的学习过程。在以后回顾此项目时，也可以更方便地发现此项目中的不足和精华。在此，感谢<a href="https://cnodejs.org/" rel="nofollow noreferrer" target="_blank">VNode社区</a>提供的API。</p></blockquote>
<p><strong>源码在此</strong>：<a href="https://github.com/SuperJerryshen/Vue-CNode" rel="nofollow noreferrer" target="_blank">Vue-CNode</a><br><strong>预览地址</strong>：<a href="http://106.14.179.237:8082" rel="nofollow noreferrer" target="_blank">使劲点我</a><br>你也可以扫描下面的二维码预览线上项目：</p>
<p><a href="http://106.14.179.237:8082" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000010280136" src="https://static.alili.tech/img/remote/1460000010280136" alt="二维码" title="二维码" style="cursor: pointer; display: inline;"></span></a></p>
<h2 id="articleHeader0">一、需求分析</h2>
<blockquote><p>要做一个项目之前，我觉得首先要把功能做一个总结，根据需求来写项目，从而做到有的放矢。</p></blockquote>
<p>所以我根据API写了项目的需求，可见下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010285404" src="https://static.alili.tech/img/remote/1460000010285404" alt="CNode功能需求分析" title="CNode功能需求分析" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">二、技术栈</h2>
<p>本项目使用的技术栈就是标准的<code>Vue全家桶</code>，即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue2.0: 构建项目，属于底层框架。
Vue-Router: 通过hash值的变化，从而改变页面结构的路由。
Vuex: Vue官方提供的状态管理模式。
Axios, Vue-Axios: http请求模块。
ES6: 新的Javascript语法。
Sass: CSS预编译器。
Webpack: 用于打包项目。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ldif"><code><span class="hljs-attribute">Vue2.0</span>: 构建项目，属于底层框架。
<span class="hljs-attribute">Vue-Router</span>: 通过hash值的变化，从而改变页面结构的路由。
<span class="hljs-attribute">Vuex</span>: Vue官方提供的状态管理模式。
<span class="hljs-attribute">Axios, Vue-Axios</span>: http请求模块。
<span class="hljs-attribute">ES6</span>: 新的Javascript语法。
<span class="hljs-attribute">Sass</span>: CSS预编译器。
<span class="hljs-attribute">Webpack</span>: 用于打包项目。</code></pre>
<h2 id="articleHeader2">三、功能实现情况</h2>
<ul>
<li><p>[x] 首页列表</p></li>
<li><p>[x] 无限懒加载文章列表</p></li>
<li><p>[x] 切换内容主题</p></li>
<li><p>[x] 文章详情</p></li>
<li><p>[x] 在文章详情页时，可以后退至主页</p></li>
<li><p>[x] 回到顶部功能，并添加动画效果</p></li>
<li><p>[x] 关于</p></li>
<li><p>[x] 用户登录</p></li>
<li><p>[x] 用户退出</p></li>
<li><p>[x] 个人主页</p></li>
<li><p>[x] 我的收藏</p></li>
<li><p>[x] 点击用户头像，可以进入该用户的简介页面</p></li>
<li><p>[x] 登陆后，可在文章详情页点赞和评论</p></li>
<li><p>[x] 登陆后，在主页显示发布主题按钮，可以发布主题</p></li>
<li><p>[x] 消息通知，消息设置已读功能</p></li>
<li><p>[x] 对自己的文章可以进行编辑更新</p></li>
<li><p>[x] 操作成功或失败后的消息提醒</p></li>
<li><p>[ ] 增加markdown的编辑器组件和预览器组件</p></li>
<li><p>[ ] 评论排序功能</p></li>
</ul>
<h2 id="articleHeader3">四、项目初始化</h2>
<p>利用Vue-cli提供的初始化工具，运行以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install vue-cli
$ npm install --global vue-cli
# create a new project using the &quot;webpack&quot; template
$ vue init webpack my-project
# install dependencies and go!
$ cd my-project
$ npm install
$ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-comment"># install vue-cli</span>
<span class="hljs-variable">$ </span>npm install --global vue-cli
<span class="hljs-comment"># create a new project using the "webpack" template</span>
<span class="hljs-variable">$ </span>vue init webpack my-project
<span class="hljs-comment"># install dependencies and go!</span>
<span class="hljs-variable">$ </span>cd my-project
<span class="hljs-variable">$ </span>npm install
<span class="hljs-variable">$ </span>npm run dev</code></pre>
<p>此时打开<a href="http://localhost:8080/" rel="nofollow noreferrer" target="_blank">http://localhost:8080/</a>就可以访问初始化后的页面了。</p>
<h2 id="articleHeader4">五、项目编写</h2>
<blockquote><p><strong><em>注意</em></strong>：详细内容可以去源码自行查看。</p></blockquote>
<p>完成初始化之后呢，我们就可以开始编写项目了。<br>代码分为四块，分别是：<strong><em>components(组件)</em></strong>、<strong><em>vue-router(路由)</em></strong>、<strong><em>vuex(状态管理模式)</em></strong>和<strong><em>common(放置公共样式，字体和通用的功能代码)</em></strong>。<br>在项目编写之前，受限于要安装依赖，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装vuex，vue-router，axios，vue-axios
$ npm install vuex vue-router axios vue-axios --save
// 安装sass依赖
# npm install node-sass sass-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># 安装vuex，vue-router，axios，vue-axios</span>
$ npm install vuex vue-router axios vue-axios --save
<span class="hljs-comment">// 安装sass依赖</span>
<span class="hljs-meta"># npm install node-sass sass-loader --save-dev</span></code></pre>
<h3 id="articleHeader5">1.common公用文件</h3>
<p>包括样式(style)，字体(fonts)还有工具函数（utils, 包括时间格式化还有cookie存取功能）。</p>
<h3 id="articleHeader6">2.Components组件</h3>
<p>现在暂时一共有14个组件，包括：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="AboutMe
Article
ArticleCard
BackBar
BottomBar
Content
Loading
Login
MessageCard
MyCollect
navBar
Notification
Publish
UserDetail" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">AboutMe</span>
<span class="hljs-symbol">Article</span>
<span class="hljs-symbol">ArticleCard</span>
<span class="hljs-keyword">BackBar
</span><span class="hljs-keyword">BottomBar
</span><span class="hljs-symbol">Content</span>
<span class="hljs-symbol">Loading</span>
<span class="hljs-symbol">Login</span>
<span class="hljs-symbol">MessageCard</span>
<span class="hljs-symbol">MyCollect</span>
<span class="hljs-symbol">navBar</span>
<span class="hljs-symbol">Notification</span>
<span class="hljs-symbol">Publish</span>
<span class="hljs-symbol">UserDetail</span></code></pre>
<p>具体内容可以参见后面的项目目录。</p>
<h3 id="articleHeader7">3. Vue-Router 路由配置</h3>
<p>通过路由，分为一下七个页面：<br>① 主页<br>② 文章详情页<br>③ 用户详情页<br>④ 用户登录页<br>⑤ 发布文章页<br>⑥ 用户收藏页<br>⑦ 我的通知页</p>
<h3 id="articleHeader8">5. <strong>Vuex</strong>：状态管理模式</h3>
<p>状态管理分为六个模块：<code>content</code>（主页）、<code>article</code>（文章页）、<code>navbar</code>（导航栏）、<code>user</code>（用户详情状态）、<code>login</code>（用户登录状态）和<code>notification</code>（通知）。</p>
<h2 id="articleHeader9">六、项目目录</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── build                               // webpack设置
│&nbsp;&nbsp; ├── build.js
│&nbsp;&nbsp; ├── check-versions.js
│&nbsp;&nbsp; ├── dev-client.js
│&nbsp;&nbsp; ├── dev-server.js
│&nbsp;&nbsp; ├── utils.js
│&nbsp;&nbsp; ├── vue-loader.conf.js
│&nbsp;&nbsp; ├── webpack.base.conf.js
│&nbsp;&nbsp; ├── webpack.dev.conf.js
│&nbsp;&nbsp; └── webpack.prod.conf.js
├── config                              // 项目开发和打包设置
│&nbsp;&nbsp; ├── dev.env.js
│&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; └── prod.env.js
├── docs                                // 静态资源地址
│&nbsp;&nbsp; ├── index.html
│&nbsp;&nbsp; └── static
│&nbsp;&nbsp;     ├── css
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── app.d99bca81a0eef77c7e0d8c70f520707c.css
│&nbsp;&nbsp;     ├── fonts
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── iconfont.8553d3c.ttf
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── iconfont.b29ac85.eot
│&nbsp;&nbsp;     ├── img
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── iconfont.d4553f2.svg
│&nbsp;&nbsp;     └── js
│&nbsp;&nbsp;         ├── app.cb09e437ae0bec6205b9.js
│&nbsp;&nbsp;         ├── manifest.aa9548ef140031379c30.js
│&nbsp;&nbsp;         └── vendor.f3d0844a66c0c2cabe0b.js
├── src                                 // 项目文件位置
│&nbsp;&nbsp; ├── App.vue                         // 组件总入口
│&nbsp;&nbsp; ├── common                          // 通用文件
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── fonts                       // 字体
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── iconfont.eot
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── iconfont.svg
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── iconfont.ttf
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── iconfont.woff
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── style                       // 样式
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── animation.scss          // 动画
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── base.scss               // 基本样式
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── icon.scss               // iconfont的字体图标样式
│&nbsp;&nbsp; │&nbsp;&nbsp; └── utils                       // 工具函数
│&nbsp;&nbsp; │&nbsp;&nbsp;     ├── cookie.js               // cookie存取和删除
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── timeFormat.js           // 格式化时间函数
│&nbsp;&nbsp; ├── components                      // 所有组件
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── AboutMe                     // 关于
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── AboutMe.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Article                     // 文章详情页
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── Article.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── ArticleCard                 // 文章列表的单个文章卡片
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── ArticleCard.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── BackBar                     // 顶部的返回栏（返回主页和后退）
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── BackBar.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── BottomBar                   // 底部的回复栏（还包含收藏和编辑文件）
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── BottomBar.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Content                     // 主页
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── Content.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Loading                     // 正在加载组件
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── Loading.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── loading.svg
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Login                       // 登录
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── Login.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── MessageCard                 // 单个通知的详情卡片
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── MessageCard.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── MyCollect                   // 我的收藏页
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── MyCollect.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Notification                // 通知页
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── Notification.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Publish                     // 发布文章和发布更新页
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── Publish.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── UserDetail                  // 用户详情页
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── UserDetail.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; └── navBar                      // 主页的顶部导航栏
│&nbsp;&nbsp; │&nbsp;&nbsp;     ├── cnodejs_light.svg
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── navBar.vue
│&nbsp;&nbsp; ├── main.js                         // 项目的总入口
│&nbsp;&nbsp; ├── pic                             // 和代码无关，README.md中的图片
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── CNode�\212\237�\203��\234\200�\202�\210\206�\236\220.png
│&nbsp;&nbsp; │&nbsp;&nbsp; └── QR-Code.png
│&nbsp;&nbsp; ├── router                          // 路由设置
│&nbsp;&nbsp; │&nbsp;&nbsp; └── index.js
│&nbsp;&nbsp; └── store                           // 状态管理
│&nbsp;&nbsp;     ├── modules
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── article                 // 文章详情页
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── article-mutation-types.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── article.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── content                 // 主页
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── content-mutation-types.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── content.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── login                   // 登录页
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── login-mutation-types.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── login.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── navbar                  // 主页导航栏
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── navbar-mutation-types.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── navbar.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── notification            // 通知页
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── notification-mutation-types.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── notification.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── user                    // 用户详情页
│&nbsp;&nbsp;     │&nbsp;&nbsp;     ├── user-mutation-types.js
│&nbsp;&nbsp;     │&nbsp;&nbsp;     └── user.js
│&nbsp;&nbsp;     └── store.js                    // 状态管理总入口
├── README.md
├── index.html
└── package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>.
├── build                               <span class="hljs-comment">// webpack设置</span>
│&nbsp;&nbsp; ├── build.js
│&nbsp;&nbsp; ├── check-versions.js
│&nbsp;&nbsp; ├── dev-client.js
│&nbsp;&nbsp; ├── dev-server.js
│&nbsp;&nbsp; ├── utils.js
│&nbsp;&nbsp; ├── vue-loader.conf.js
│&nbsp;&nbsp; ├── webpack.base.conf.js
│&nbsp;&nbsp; ├── webpack.dev.conf.js
│&nbsp;&nbsp; └── webpack.prod.conf.js
├── config                              <span class="hljs-comment">// 项目开发和打包设置</span>
│&nbsp;&nbsp; ├── dev.env.js
│&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; └── prod.env.js
├── docs                                <span class="hljs-comment">// 静态资源地址</span>
│&nbsp;&nbsp; ├── index.html
│&nbsp;&nbsp; └── static
│&nbsp;&nbsp;     ├── css
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── app.d99bca81a0eef77c7e0d8c70f520707c.css
│&nbsp;&nbsp;     ├── fonts
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── iconfont<span class="hljs-number">.8553</span>d3c.ttf
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── iconfont.b29ac85.eot
│&nbsp;&nbsp;     ├── img
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── iconfont.d4553f2.svg
│&nbsp;&nbsp;     └── js
│&nbsp;&nbsp;         ├── app.cb09e437ae0bec6205b9.js
│&nbsp;&nbsp;         ├── manifest.aa9548ef140031379c30.js
│&nbsp;&nbsp;         └── vendor.f3d0844a66c0c2cabe0b.js
├── src                                 <span class="hljs-comment">// 项目文件位置</span>
│&nbsp;&nbsp; ├── App.vue                         <span class="hljs-comment">// 组件总入口</span>
│&nbsp;&nbsp; ├── common                          <span class="hljs-comment">// 通用文件</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── fonts                       <span class="hljs-comment">// 字体</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── iconfont.eot
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── iconfont.svg
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── iconfont.ttf
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── iconfont.woff
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── style                       <span class="hljs-comment">// 样式</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── animation.scss          <span class="hljs-comment">// 动画</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── base.scss               <span class="hljs-comment">// 基本样式</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── icon.scss               <span class="hljs-comment">// iconfont的字体图标样式</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── utils                       <span class="hljs-comment">// 工具函数</span>
│&nbsp;&nbsp; │&nbsp;&nbsp;     ├── cookie.js               <span class="hljs-comment">// cookie存取和删除</span>
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── timeFormat.js           <span class="hljs-comment">// 格式化时间函数</span>
│&nbsp;&nbsp; ├── components                      <span class="hljs-comment">// 所有组件</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── AboutMe                     <span class="hljs-comment">// 关于</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── AboutMe.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Article                     <span class="hljs-comment">// 文章详情页</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── Article.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── ArticleCard                 <span class="hljs-comment">// 文章列表的单个文章卡片</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── ArticleCard.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── BackBar                     <span class="hljs-comment">// 顶部的返回栏（返回主页和后退）</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── BackBar.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── BottomBar                   <span class="hljs-comment">// 底部的回复栏（还包含收藏和编辑文件）</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── BottomBar.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Content                     <span class="hljs-comment">// 主页</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── Content.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Loading                     <span class="hljs-comment">// 正在加载组件</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── Loading.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── loading.svg
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Login                       <span class="hljs-comment">// 登录</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── Login.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── MessageCard                 <span class="hljs-comment">// 单个通知的详情卡片</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── MessageCard.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── MyCollect                   <span class="hljs-comment">// 我的收藏页</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── MyCollect.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Notification                <span class="hljs-comment">// 通知页</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── Notification.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Publish                     <span class="hljs-comment">// 发布文章和发布更新页</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── Publish.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── UserDetail                  <span class="hljs-comment">// 用户详情页</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── UserDetail.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; └── navBar                      <span class="hljs-comment">// 主页的顶部导航栏</span>
│&nbsp;&nbsp; │&nbsp;&nbsp;     ├── cnodejs_light.svg
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── navBar.vue
│&nbsp;&nbsp; ├── main.js                         <span class="hljs-comment">// 项目的总入口</span>
│&nbsp;&nbsp; ├── pic                             <span class="hljs-comment">// 和代码无关，README.md中的图片</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── CNode�\<span class="hljs-number">212</span>\<span class="hljs-number">237</span>�\<span class="hljs-number">203</span>��\<span class="hljs-number">234</span>\<span class="hljs-number">200</span>�\<span class="hljs-number">202</span>�\<span class="hljs-number">210</span>\<span class="hljs-number">206</span>�\<span class="hljs-number">236</span>\<span class="hljs-number">220.</span>png
│&nbsp;&nbsp; │&nbsp;&nbsp; └── QR-Code.png
│&nbsp;&nbsp; ├── router                          <span class="hljs-comment">// 路由设置</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── index.js
│&nbsp;&nbsp; └── store                           <span class="hljs-comment">// 状态管理</span>
│&nbsp;&nbsp;     ├── modules
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── article                 <span class="hljs-comment">// 文章详情页</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── article-mutation-types.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── article.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── content                 <span class="hljs-comment">// 主页</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── content-mutation-types.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── content.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── login                   <span class="hljs-comment">// 登录页</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── login-mutation-types.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── login.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── navbar                  <span class="hljs-comment">// 主页导航栏</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── navbar-mutation-types.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── navbar.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── notification            <span class="hljs-comment">// 通知页</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── notification-mutation-types.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── notification.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── user                    <span class="hljs-comment">// 用户详情页</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp;     ├── user-mutation-types.js
│&nbsp;&nbsp;     │&nbsp;&nbsp;     └── user.js
│&nbsp;&nbsp;     └── store.js                    <span class="hljs-comment">// 状态管理总入口</span>
├── README.md
├── index.html
└── package.json</code></pre>
<h2 id="articleHeader10">七、过程中遇到的问题</h2>
<blockquote><p>本项目算是本人第一个完整的手机和pc都兼容，有关于文章展示的项目。整个项目做下来，遇到的Bug很多，自然收获也是很多。总结下来如下：</p></blockquote>
<p>1.很长的单词会超出边界，导致可视区域变宽。</p>
<p>解决办法：通过<code>word-wrap: break-word;</code>实现打断效果。</p>
<p>2.第二次进入文章时，会残留（暂未解决）。</p>
<p>解决办法：通过路由的钩子函数beforeRouteEnter，来获取数据，未成功获取数据时，显示Loading页面，加载完成后，显示文章详情页，从而解决这个问题。</p>
<p>3.回到首页时，不能保留原来的状态（暂未解决）。</p>
<p>解决办法：</p>
<p>①此方法为容易固定高度的解决办法。（具体方法：用vuex和vue-router的钩子函数来解决这个问题，即通过scroll事件动态保存此时的scrollTop直，当路由的beforeRouteEnter出发时，恢复其scrollTop的值。）</p>
<p>② 如果没有固定高度，直接通过Vue自带的keep-alive组件，保留组件状态。</p>
<p>4.载入中的动画效果如何做？</p>
<p>解决办法：之前是通过CSS3绘制一个图形，但是后来发现太丑了，就直接用了Iconfont上的svg图，并添加了动画效果。</p>
<p>5.如何实现主页文章列表的懒加载？</p>
<p>解决办法：判断滑动的总高度 - 滑动距离顶部的距离 &lt;= 屏幕的可用高度，也就是以下公式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.documentElement.offsetHeight - window.scrollY
<= window.screen.height" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.offsetHeight</span> - window<span class="hljs-selector-class">.scrollY</span>
&lt;= window<span class="hljs-selector-class">.screen</span><span class="hljs-selector-class">.height</span></code></pre>
<p>这里会出现一个bug，满足条件时，继续滑动，会加载多次。在此可以加入一个状态，表示此时正在加载（详细参见源代码），从而解决此bug。</p>
<p>6.回到顶部的动画怎么做？</p>
<p>解决办法：可以把现在的<code>window.scrollY</code>分成<code>n</code>份，然后再设置一个定时器，每隔<code>m</code>秒，向上滚动一份的高度，当<code>window.scrollY &gt;= 0</code>时，再终止定时器。（其中的<code>m, n</code>为任意数，根据情况设定）</p>
<p>7.如何控制正在加载页面的显示？</p>
<p>解决办法：因为加载数据是异步的，可以在加载之前和加载之后，分别更改一个类似于<code>isLoading</code>（名称自己设定）的状态，从而控制加载页面的显示。</p>
<p>8.如何设置登录功能？</p>
<p>解决办法：因为官方只提供了<code>access-token</code>，所以可以将此值和一些用户相关的数值，存入<code>document.cookie</code>中，存入的函数我单独写了一个<code>cookie</code>的工具函数，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
* Created by jerryshen on 2017/7/15.
* 用户本地cookie的存取以及清空
* 函数的功能分别是：
* 设置单个，获取所有，获取单个，删除所有，删除单个
*/

export function setCookie (name, value, exdays = 30) {
 var time = new Date()
 time.setTime(time.getTime() + exdays * 24 * 3600 * 1000)
 var expires = 'expires=' + time.toGMTString()
 document.cookie = name + '=' + value + ';' + expires
}

export function getAllCookies () {
 if (document.cookie === '') {
   return {}
 }
 const cookies = document.cookie.split(';')
 const newCookies = {}
 for (let i = 0; i < cookies.length; i++) {
   let cookie = cookies[i].trim()
   const splitCookie = cookie.split('=')
   newCookies[splitCookie[0]] = splitCookie[1]
 }
 return newCookies
}

export function getCookie (name) {
 const cname = name + '='
 const cookies = document.cookie.split(';')
 for (let i = 0; i < cookies.length; i++) {
   let cookie = cookies[i].trim()
   if (cookie.indexOf(cname) === 0) {
     return {
       success: true,
       cookie: {
         name,
         value: cookie.split(cname)[1]
       }
     }
   } else {
     return {
       success: false,
       cookie: {
         name,
         value: undefined
       }
     }
   }
 }
}

export function deleteAllCookie () {
 document.cookie += ';expires=Thu, 01 Jan 1970 00:00:00 GMT'
}

export function deleteCookie (name) {
 document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
* Created by jerryshen on 2017/7/15.
* 用户本地cookie的存取以及清空
* 函数的功能分别是：
* 设置单个，获取所有，获取单个，删除所有，删除单个
*/</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setCookie</span> (<span class="hljs-params">name, value, exdays = <span class="hljs-number">30</span></span>) </span>{
 <span class="hljs-keyword">var</span> time = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
 time.setTime(time.getTime() + exdays * <span class="hljs-number">24</span> * <span class="hljs-number">3600</span> * <span class="hljs-number">1000</span>)
 <span class="hljs-keyword">var</span> expires = <span class="hljs-string">'expires='</span> + time.toGMTString()
 <span class="hljs-built_in">document</span>.cookie = name + <span class="hljs-string">'='</span> + value + <span class="hljs-string">';'</span> + expires
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAllCookies</span> (<span class="hljs-params"></span>) </span>{
 <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.cookie === <span class="hljs-string">''</span>) {
   <span class="hljs-keyword">return</span> {}
 }
 <span class="hljs-keyword">const</span> cookies = <span class="hljs-built_in">document</span>.cookie.split(<span class="hljs-string">';'</span>)
 <span class="hljs-keyword">const</span> newCookies = {}
 <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; cookies.length; i++) {
   <span class="hljs-keyword">let</span> cookie = cookies[i].trim()
   <span class="hljs-keyword">const</span> splitCookie = cookie.split(<span class="hljs-string">'='</span>)
   newCookies[splitCookie[<span class="hljs-number">0</span>]] = splitCookie[<span class="hljs-number">1</span>]
 }
 <span class="hljs-keyword">return</span> newCookies
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCookie</span> (<span class="hljs-params">name</span>) </span>{
 <span class="hljs-keyword">const</span> cname = name + <span class="hljs-string">'='</span>
 <span class="hljs-keyword">const</span> cookies = <span class="hljs-built_in">document</span>.cookie.split(<span class="hljs-string">';'</span>)
 <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; cookies.length; i++) {
   <span class="hljs-keyword">let</span> cookie = cookies[i].trim()
   <span class="hljs-keyword">if</span> (cookie.indexOf(cname) === <span class="hljs-number">0</span>) {
     <span class="hljs-keyword">return</span> {
       <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>,
       <span class="hljs-attr">cookie</span>: {
         name,
         <span class="hljs-attr">value</span>: cookie.split(cname)[<span class="hljs-number">1</span>]
       }
     }
   } <span class="hljs-keyword">else</span> {
     <span class="hljs-keyword">return</span> {
       <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>,
       <span class="hljs-attr">cookie</span>: {
         name,
         <span class="hljs-attr">value</span>: <span class="hljs-literal">undefined</span>
       }
     }
   }
 }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deleteAllCookie</span> (<span class="hljs-params"></span>) </span>{
 <span class="hljs-built_in">document</span>.cookie += <span class="hljs-string">';expires=Thu, 01 Jan 1970 00:00:00 GMT'</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deleteCookie</span> (<span class="hljs-params">name</span>) </span>{
 <span class="hljs-built_in">document</span>.cookie = <span class="hljs-string">`<span class="hljs-subst">${name}</span>=;expires=Thu, 01 Jan 1970 00:00:00 GMT`</span>
}</code></pre>
<p>9.如何将API中的时间转换成 =&gt; ..年前，..月前，..天前等等，这种类型的格式呢？</p>
<p>解决办法：我自己写了一个格式化的工具函数，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function timeFormat (date) {
  // 获取当前时间和所传时间的Date对象
  const nowTime = new Date()
  const inDate = new Date(date)
  if (nowTime.getYear() - inDate.getYear() > 0) {
    // 年份差值 > 0，返回年
    return `${nowTime.getFullYear() - inDate.getFullYear()}年前`
  } else if (nowTime.getMonth() - inDate.getMonth() > 0) {
    // 月份差值 > 0，返回月
    return `${nowTime.getMonth() - inDate.getMonth()}个月前`
  } else if (nowTime.getDate() - inDate.getDate() > 0) {
    // 日期差值 > 0，返回日
    return `${nowTime.getDate() - inDate.getDate()}天前`
  } else if (nowTime.getHours() - inDate.getHours() > 0) {
    // 小时差值 > 0，返回时
    return `${nowTime.getHours() - inDate.getHours()}个小时前`
  } else if (nowTime.getMinutes() - inDate.getMinutes() > 0) {
    // 分钟差值 > 0，返回分钟
    return `${nowTime.getMinutes() - inDate.getMinutes()}分钟前`
  } else {
    // 其他情况，也就是秒数差值 > 0，返回秒钟
    return `${nowTime.getSeconds() - inDate.getSeconds()}秒前`
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeFormat</span> (<span class="hljs-params">date</span>) </span>{
  <span class="hljs-comment">// 获取当前时间和所传时间的Date对象</span>
  <span class="hljs-keyword">const</span> nowTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
  <span class="hljs-keyword">const</span> inDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(date)
  <span class="hljs-keyword">if</span> (nowTime.getYear() - inDate.getYear() &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-comment">// 年份差值 &gt; 0，返回年</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${nowTime.getFullYear() - inDate.getFullYear()}</span>年前`</span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (nowTime.getMonth() - inDate.getMonth() &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-comment">// 月份差值 &gt; 0，返回月</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${nowTime.getMonth() - inDate.getMonth()}</span>个月前`</span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (nowTime.getDate() - inDate.getDate() &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-comment">// 日期差值 &gt; 0，返回日</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${nowTime.getDate() - inDate.getDate()}</span>天前`</span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (nowTime.getHours() - inDate.getHours() &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-comment">// 小时差值 &gt; 0，返回时</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${nowTime.getHours() - inDate.getHours()}</span>个小时前`</span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (nowTime.getMinutes() - inDate.getMinutes() &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-comment">// 分钟差值 &gt; 0，返回分钟</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${nowTime.getMinutes() - inDate.getMinutes()}</span>分钟前`</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 其他情况，也就是秒数差值 &gt; 0，返回秒钟</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${nowTime.getSeconds() - inDate.getSeconds()}</span>秒前`</span>
  }
}</code></pre>
<p>10.BUG：当进入其他路由时，仍然会触发主页的scroll事件。</p>
<p>解决办法：之前生命周期钩子用的是<code>mounted</code>，因此进入其他路由时，scroll事件仍然存在。所以现在改用<code>beforeRouteEnter</code>和<code>beforeRouteLeave</code>这两个路由的生命周期钩子，分别实现载入路由时的scroll事件挂载、离开路由时的scroll事件卸载。从而防止主页内容的懒加载一直触发。</p>
<p>11.发布新文章或更新跳转至文章详情页面后，再按后退，怎么实现回到主页？</p>
<p>解决办法：现在初步是使用，路由跳转的时候，先跳到主页，再跳到文章详情页，再按后退时，就会回到主页。</p>
<p>12.如何实现点击评论右侧的回复按钮，添加@信息，并focus输入框？</p>
<p>解决办法：通过vuex来实时记录回复相关的信息，并通过watch输入框的value来判断是否focus。</p>
<p>13.有一个很奇怪的bug：ios下，如果在文章详情页返回主页时，此时的<code>window.scrollY</code>会保持文章详情页时的<code>window.scrollY</code>，如果此值满足异步加载更多数据的条件时，会导致异常加载数据。</p>
<p>解决办法：不得已，只好在<code>beforeRouteEnter</code>钩子中，绑定滚动事件的函数加一个定时器，使其在100ms后绑定事件，所以此时的<code>window.scrollY</code>就会变成之前的值。</p>
<p>14.如何实现全局的消息提醒？</p>
<p>解决办法：我是通过一个和路由同级的组件<code>Messages</code>，并且创建了一个状态管理的模块<code>messages</code>，在其中通过<code>state: messages</code>存放现在显示的的通知数据，利用<code>Messages</code>组件和<code>vuex</code>的<code>actions</code>控制其显示。</p>
<h2 id="articleHeader11">八、后记</h2>
<blockquote><p>本人新手一枚，还在苦逼的找工作中T_T。如过您在代码中发现了bug，可以通过评论和我交流，互相学习！有什么好的想法，也可以提出来，一起讨论。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue全家桶开发的CNode社区单页web应用

## 原文链接
[https://segmentfault.com/a/1190000010280130](https://segmentfault.com/a/1190000010280130)


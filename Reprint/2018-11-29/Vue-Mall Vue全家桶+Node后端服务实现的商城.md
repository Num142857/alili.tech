---
title: 'Vue-Mall Vue全家桶+Node后端服务实现的商城' 
date: 2018-11-29 9:34:56
hidden: true
slug: 2yu78qd0oht
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue-Mall</h1>
<blockquote>A Vue.js project</blockquote>
<h3 id="articleHeader1">一、简介</h3>
<p>Vue全家桶项目，该项目是基于Vue全家桶开发的商城网站，采用的技术栈为 Webpack + Vue + Vuex + Vue-router + Sass + Es6 + LocalStorage + Css3 + Node(express) + MongoDB；整个项目前后端分离开发，前端基于Vue全家桶进行渲染，后端由NodeJs+MongonDB提供服务。整个项目前后端由本人独自开发，基本实现了一个商城应有的功能！</p>
<h4>1、项目依赖基本核心版本：</h4>
<ul>
<li>body-parser: "~1.17.1",</li>
<li>cookie-parser: "~1.4.3",</li>
<li>debug: "~2.6.3",</li>
<li>express: "~4.15.2",</li>
<li>jade: "~1.11.0",</li>
<li>moment: "^2.20.1",</li>
<li>morgan: "~1.8.1",</li>
<li>serve-favicon: "~2.4.2",</li>
<li>vue: "^2.5.2",</li>
<li>vue-router: "^3.0.1",</li>
<li>vuex: "^3.0.1"</li>
</ul>
<h4>2、项目前端搭建:</h4>
<ul>
<li>基于Vue全家桶进行前端页面渲染</li>
<li>基本样式基于Bootstrap</li>
<li>引入了Moment.js格式化前端页面显示时间</li>
</ul>
<h4>3、项目后端搭建:</h4>
<ul>
<li>使用NodeJs的express框架完成项目后端搭建；</li>
<li>使用mongodb完成数据存储，通过mongoose模块完成对mongodb数据的构建；</li>
</ul>
<h4>4.该商城基本功能：</h4>
<p>项目正常访问无需管理员权限，对个人中心资料的修改，需要用户登录，对商城产品及分类的基本操作（增删改查），需要有管理员权限，默认一个管理员（chenjun/123456），具体功能如下：</p>
<ul>
<li>基本的用户登录、注册、个人资料修改</li>
<li>用户权限管理、登录做session处理（失效期暂为5天）</li>
<li>商城产品及产品分类的增加、删除、更新，查询（可分页查询）</li>
<li>加入购物车及结算、下单功能</li>
<li>收货地址的增加、编辑、删除</li>
<li>关键字搜索功能</li>
<li>订单查询功能</li>
</ul>
<h4>5、项目Github地址：<a href="https://github.com/chenjun1127/vue-mall" rel="nofollow noreferrer" target="_blank">vue-mall</a>
</h4>
<h3 id="articleHeader2">二、项目预览</h3>
<p>整体效果，截图看<a href="https://github.com/chenjun1127/vue-mall/blob/master/images.md" rel="nofollow noreferrer" target="_blank">这里</a></p>
<h3 id="articleHeader3">三、运行环境</h3>
<p>整个项目的运行，首先要确保 <a href="https://nodejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">Node</a> + <a href="https://www.mongodb.org/downloads#production" rel="nofollow noreferrer" target="_blank">MongoDB</a> 安装并配置好。</p>
<h3 id="articleHeader4">四、项目安装及运行</h3>
<ul><li>克隆项目，进入项目目录；</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone git@github.com:chenjun1127/vue-mall.git
cd vue-mall" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">git <span class="hljs-built_in">clone</span> git@github.com:chenjun1127/vue-mall.git
<span class="hljs-built_in">cd</span> vue-mall</code></pre>
<ul><li>安装依赖</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install or yarn install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install or yarn install</code></pre>
<ul><li>启动后端服务</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm run server</code></pre>
<ul><li>执行</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev or npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm run dev or npm start</code></pre>
<ul><li>浏览</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://localhost:4000/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">http:</span><span class="hljs-comment">//localhost:4000/</span></code></pre>
<ul><li>打包</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm run build</code></pre>
<h3 id="articleHeader5">五、项目总结</h3>
<p>整个项目由于是本人独自开发，UI部分基于Bootstrap（没有UI设计师），整体UI细节有待优化完善；部分功能有细微瑕疵，譬如订单的操作（增删改查）未根据订单的状态来判断、产品分类列表未做分页查询等等，这些都需要完善！觉得项目不错的，可以给个Star，谢谢！</p>
<h3 id="articleHeader6">六、重要提示</h3>
<p>Tips：在npm install or yarn install 的时候，请确保网络良好，如个别依赖安装不了，请设置淘宝镜像为安装源；</p>
<p>强烈推荐使用 Yarn ，Npm 真的太慢了！</p>
<p>运行此项目一定要先启动 Mongo 服务，并连接 MongoDB 数据库。</p>
<p>如有问题：请 Issue 或联系QQ：402074940</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue-Mall Vue全家桶+Node后端服务实现的商城

## 原文链接
[https://segmentfault.com/a/1190000015005746](https://segmentfault.com/a/1190000015005746)


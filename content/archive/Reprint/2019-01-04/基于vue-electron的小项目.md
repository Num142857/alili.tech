---
title: '基于vue-electron的小项目' 
date: 2019-01-04 2:30:10
hidden: true
slug: f6jj8rt9jq9
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">项目由来</h3>
<p>因为想要用GUI，而我又是一个向FontEnd Developer方向发展的小白，自然而然想到了<code>Electron</code>来套壳，让网页变成桌面应用，之前只是了解过这个领域，没真正实践过，所以这此项目也是对<code>Electron</code>的一个认识和学习吧。</p>
<p>项目的实现是一个<code>WIndows平台的文件管理器</code>，实现了基本的文件操作功能，新建，删除，复制，粘贴，剪切，重命名。</p>
<p>项目地址：<a href="https://github.com/k-water/electron-filesystem" rel="nofollow noreferrer" target="_blank">https://github.com/k-water/electron-filesystem</a></p>
<h3 id="articleHeader1">什么是Electron</h3>
<p>Electron 可以让你使用纯 JavaScript 调用丰富的原生 APIs 来创造桌面应用。你可以把它看作是专注于桌面应用而不是 web 服务器的，io.js 的一个变体。</p>
<p>这不意味着 Electron 是绑定了 GUI 库的 JavaScript。相反，Electron 使用 web 页面作为它的 GUI，所以你能把它看作成一个被 JavaScript 控制的，精简版的 Chromium 浏览器。</p>
<p>以下资料供参考学习：<br><a href="https://zh.wikipedia.org/wiki/Electron_(%E8%BD%AF%E4%BB%B6%E6%A1%86%E6%9E%B6" rel="nofollow noreferrer" target="_blank">Electron(维基百科)</a>)<br><a href="https://www.w3cschool.cn/electronmanual/" rel="nofollow noreferrer" target="_blank">中文文档</a><br><a href="https://segmentfault.com/a/1190000007503495">(译)Electron的本质</a><br><a href="http://ourcodeworld.com/articles/read/106/how-to-choose-read-save-delete-or-create-a-file-with-electron-framework" rel="nofollow noreferrer" target="_blank">入门视频教程</a></p>
<h3 id="articleHeader2">技术栈</h3>
<ul>
<li><p>[x] Vue</p></li>
<li><p>[x] VueRouter</p></li>
<li><p>[x] Vuex</p></li>
<li><p>[x] Vue-Electron</p></li>
<li><p>[x] iView</p></li>
<li><p>[x] Eslint</p></li>
<li><p>[x] Babel</p></li>
<li><p>[x] Webpack</p></li>
<li><p>[x] Less</p></li>
<li><p>[x] Nodejs</p></li>
</ul>
<p>项目采用了vue-cli脚手架搭建开发环境，在开始编码之前，在gayhub上搜了一下，发现有大神写了一个基于vue和electron的脚手架，看了文档后，发现正好适合我的需要，瞬间发现了新大陆。</p>
<p>项目名称：<code>electron-vue</code><br>项目地址：<a href="https://github.com/SimulatedGREG/electron-vue" rel="nofollow noreferrer" target="_blank">https://github.com/SimulatedGREG/electron-vue</a><br>项目文档(英文的)：<a href="https://simulatedgreg.gitbooks.io/electron-vue/content/en/" rel="nofollow noreferrer" target="_blank">https://simulatedgreg.gitbooks.io/electron-vue/content/en/</a></p>
<blockquote><p>PS：在开始编码之前要仔细阅读文档。</p></blockquote>
<h3 id="articleHeader3">工程目录</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="│
├── README.md                           <=  项目介绍
├── app                                 <=  开发目录
│   ├── dist                            <= 编译打包
│   ├── icons                           <= 相关图标
│   ├── src                             <= 项目源代码
│   │   ├── main                        <= electron主进程
│   │   │   ├── application.js
│   │   │   ├── index.dev.js
│   │   │   ├── index.js
│   │   ├── renderer                    <= electron渲染进程
│   │   │   ├── App.vue                 <=  Vue 根组件
│   │   │   ├── main.js                 <=  Vue 入口
│   │   │   ├── assets                  <=  静态资源
│   │   │   ├── common                  <=  公共配置
│   │   │   ├── config                  <=  项目配置
│   │   │   ├── extend                  <=  Vue 扩展相关
│   │   │   ├── router                  <=  Vue 路由相关
│   │   │   ├── store                   <=  Vuex
│   │   │   ├── views                   <=  视图层
│   ├── index.ejs                       <= 模板文件
│   ├── package.json                    <=  相关依赖
├── build                               <=  打包桌面应用相关
│   ├── Gruntfile.js                    <=  构建脚本
│   ├── package.json                    <=  相关依赖
├── tasks                               <=  electron-packeger打包
│   ├── release.js
│   ├── runner.js
├── test                                <=  测试文件夹  
│   ├── e2e
│   ├── unit
│   ├── .eslintrc
├── config.js                           <=  electron打包配置
├── webpack.main.config.js
├── webpack.renderer.config.js
├── package.js
│
│" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">│
├── README.md                           &lt;=  项目介绍
├── app                                 &lt;=  开发目录
│   ├── dist                            &lt;= 编译打包
│   ├── icons                           &lt;= 相关图标
│   ├── src                             &lt;= 项目源代码
│   │   ├── main                        &lt;= electron主进程
│   │   │   ├── application.js
│   │   │   ├── index.dev.js
│   │   │   ├── index.js
│   │   ├── renderer                    &lt;= electron渲染进程
│   │   │   ├── App.vue                 &lt;=  Vue 根组件
│   │   │   ├── main.js                 &lt;=  Vue 入口
│   │   │   ├── assets                  &lt;=  静态资源
│   │   │   ├── common                  &lt;=  公共配置
│   │   │   ├── config                  &lt;=  项目配置
│   │   │   ├── extend                  &lt;=  Vue 扩展相关
│   │   │   ├── router                  &lt;=  Vue 路由相关
│   │   │   ├── store                   &lt;=  Vuex
│   │   │   ├── views                   &lt;=  视图层
│   ├── index.ejs                       &lt;= 模板文件
│   ├── package.json                    &lt;=  相关依赖
├── build                               &lt;=  打包桌面应用相关
│   ├── Gruntfile.js                    &lt;=  构建脚本
│   ├── package.json                    &lt;=  相关依赖
├── tasks                               &lt;=  electron-packeger打包
│   ├── release.js
│   ├── runner.js
├── <span class="hljs-built_in">test</span>                                &lt;=  测试文件夹  
│   ├── e2e
│   ├── unit
│   ├── .eslintrc
├── config.js                           &lt;=  electron打包配置
├── webpack.main.config.js
├── webpack.renderer.config.js
├── package.js
│
│</code></pre>
<h3 id="articleHeader4">使用说明</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron app for production
npm run build

# lint all JS/Vue component files in `app/src`
npm run lint

# run webpack in production
npm run pack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># install dependencies</span>
npm install

<span class="hljs-comment"># serve with hot reload at localhost:9080</span>
npm run dev

<span class="hljs-comment"># build electron app for production</span>
npm run build

<span class="hljs-comment"># lint all JS/Vue component files in `app/src`</span>
npm run lint

<span class="hljs-comment"># run webpack in production</span>
npm run pack</code></pre>
<hr>
<h3 id="articleHeader5">效果预览</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010648367" src="https://static.alili.tech/img/remote/1460000010648367" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010648368" src="https://static.alili.tech/img/remote/1460000010648368" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010648369" src="https://static.alili.tech/img/remote/1460000010648369" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010648370" src="https://static.alili.tech/img/remote/1460000010648370" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于vue-electron的小项目

## 原文链接
[https://segmentfault.com/a/1190000010648362](https://segmentfault.com/a/1190000010648362)


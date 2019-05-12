---
title: 'VUE移动端案例整合' 
date: 2018-12-18 2:30:11
hidden: true
slug: fwx881mqj
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">介绍</h2>
<blockquote>vue-case是笔者学习VUE的过程中将各种移动APP的使用场景整合的一个项目。其中包括了轮播效果、通讯录功能、图片懒加载、滚动加载更多、按钮组件、弹框组件、侧边栏、路由权限控制、国际化等功能。</blockquote>
<h2 id="articleHeader1">技术栈</h2>
<blockquote>
<a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">vue.js</a> 构建用户界面的 MVVM 框架，核心思想是：数据驱动、组件系统。<p><a href="https://www.npmjs.com/package/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a> 是vue的脚手架工具，目录结构、本地调试、代码部署、热加载、单元测试。</p>
<p><a href="https://router.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">vue-router</a> 是官方提供的路由器，使用vue.js构建单页面应用程序变得轻而易举。</p>
<p><a href="https://www.npmjs.com/package/vue-resource" rel="nofollow noreferrer" target="_blank">vue-resource</a> 请求数据，服务器通讯，官方推荐<a href="https://www.npmjs.com/package/axios" rel="nofollow noreferrer" target="_blank">axios</a>请求数据，本项目后期改用<a href="https://www.npmjs.com/package/axios" rel="nofollow noreferrer" target="_blank">axios</a>。</p>
<p><a href="https://vuex.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">vuex</a> 是一个专为 vue.js 应用程序开发的状态管理模式，简单来说Vuex就是管理数据的。</p>
<p><a href="https://github.com/ustbhuangyi/better-scroll" rel="nofollow noreferrer" target="_blank">better-scroll</a>  是一款重点解决移动端（未来可能会考虑 PC 端）各种滚动场景需求的插件。</p>
<p><a href="https://github.com/hilongjw/vue-lazyload" rel="nofollow noreferrer" target="_blank">vue-lazyload</a>  是一款实现图片懒加载的插件。</p>
<p><a href="https://github.com/hilongjw/vue-lazyload" rel="nofollow noreferrer" target="_blank">wc-messagebox</a>  是一款基于 Vue 2.0 开发的 Alert, Toast, Confirm 插件, UI仿照 iOS 原生。</p>
</blockquote>
<h2 id="articleHeader2">源码地址</h2>
<blockquote>源码地址：<a href="https://github.com/toutouping/vue-case" rel="nofollow noreferrer" target="_blank">https://github.com/toutouping...</a>
</blockquote>
<h2 id="articleHeader3">效果展示</h2>
<p><span class="img-wrap"><img data-src="/img/bV1Shs?w=361&amp;h=640" src="https://static.alili.tech/img/bV1Shs?w=361&amp;h=640" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bV1ShQ?w=354&amp;h=629" src="https://static.alili.tech/img/bV1ShQ?w=354&amp;h=629" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bV1Sm6?w=356&amp;h=630" src="https://static.alili.tech/img/bV1Sm6?w=356&amp;h=630" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bV1Shn?w=357&amp;h=628" src="https://static.alili.tech/img/bV1Shn?w=357&amp;h=628" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">项目运行</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# set sass_binary_site
set sass_binary_site=./node
s/win32-x64-57_binding.node

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># set sass_binary_site</span>
<span class="hljs-built_in">set</span> sass_binary_site=./node
s/win32-x64-57_binding.node

<span class="hljs-comment"># install dependencies</span>
npm install

<span class="hljs-comment"># serve with hot reload at localhost:8080</span>
npm run dev

<span class="hljs-comment"># build for production with minification</span>
npm run build

<span class="hljs-comment"># build for production and view the bundle analyzer report</span>
npm run build --report

<span class="hljs-comment"># run unit tests</span>
npm run unit

<span class="hljs-comment"># run e2e tests</span>
npm run e2e

<span class="hljs-comment"># run all tests</span>
npm <span class="hljs-built_in">test</span></code></pre>
<h2 id="articleHeader5">项目布局</h2>
<p>├── README.md                                    <br>├── config                                       // webpack配置文件<br>├── build                                        // 项目打包路径<br>├── images                                       // 图片资源<br>├── static                                       // 静态资源<br>├── index.html<br>├── package.json<br>├── data.json                                    // 用于请求的JSOn数据<br>├── src                                          // 源码目录<br>│&nbsp;&nbsp; ├── components                               // 页面组件<br>│&nbsp;&nbsp; ├── common                                   // 工具类代码<br>│&nbsp;&nbsp;    ├──css                                     <br>│&nbsp;&nbsp;    ├──fonts                                  <br>│&nbsp;&nbsp;    ├──image                                  <br>│&nbsp;&nbsp;    ├──js <br>│&nbsp;&nbsp; ├── components                               <br>│&nbsp;&nbsp; ├── base                                     // 通用组件<br>│&nbsp;&nbsp; ├── App.vue                                  // 页面入口文件<br>│&nbsp;&nbsp; ├── main.js                                  // 程序入口文件，加载各种公共组件<br>│&nbsp;&nbsp; ├── router<br>│&nbsp;&nbsp; &nbsp;&nbsp; └── index.js                              // 所有页面路由控制中心<br>│── test                                         // 测试目录</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUE移动端案例整合

## 原文链接
[https://segmentfault.com/a/1190000012803013](https://segmentfault.com/a/1190000012803013)


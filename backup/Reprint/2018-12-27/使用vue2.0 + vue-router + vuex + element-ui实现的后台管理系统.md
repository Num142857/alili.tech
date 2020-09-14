---
title: '使用vue2.0 + vue-router + vuex + element-ui实现的后台管理系统' 
date: 2018-12-27 2:30:12
hidden: true
slug: xkjn3o95ha9
categories: [reprint]
---

{{< raw >}}

                    
<p>有登录注册（含登录状态管理），角色权限管理，表格分页，图表显示等。</p>
<p>登录账号有三个，分别是：admin,supplier,buyers；密码全部是：123456 。三个账号也是三个不同的角色，分别是：管理员，供货商，采购商。三种不同角色的登录会进入不同的界面，同时三种不同角色登陆后无法互相访问别的角色的界面。</p>
<p>详细实现教程，完整源码以及在线演示的地址：</p>
<p><a href="https://www.0101tx.com/pages/jyvuehdglxt.html" rel="nofollow noreferrer" target="_blank">使用vue2.0 + vue-router + vuex + element-ui实现的后台管理系统</a></p>
<h2 id="articleHeader0">初始化项目</h2>
<p>全局安装 vue-cli</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --global vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> install --<span class="hljs-built_in">global</span> vue-cli</code></pre>
<p>新建一个文件夹works，使用终端进入该文件夹，输入下面的命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack vueyiyao" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">vue init webpack vueyiyao</code></pre>
<p>此时创建了一个基于 webpack 模板的新项目，继续输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd vueyiyao
# 安装依赖
npm install
# 启动本地服务器
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-built_in">cd</span> vueyiyao
<span class="hljs-comment"># 安装依赖</span>
npm install
<span class="hljs-comment"># 启动本地服务器</span>
npm run dev</code></pre>
<p>此时浏览器将打开vue的欢迎页面，也就是基于 webpack 模板的项目页面</p>
<h2 id="articleHeader1">安装需要的依赖包</h2>
<p>在<code>vueyiyao</code>目录下，使用终端运行如下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装element-ui（基于vue的UI框架）
npm i element-ui -S
# 安装axios(AJAX与后台交互数据)
npm install axios -s
# 安装vuex（基于vue的状态管理模式）
npm install vuex -S
# 安装echarts（图表显示）
npm install echarts --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 安装element-ui（基于vue的UI框架）</span>
npm i element-ui -S
<span class="hljs-comment"># 安装axios(AJAX与后台交互数据)</span>
npm install axios <span class="hljs-_">-s</span>
<span class="hljs-comment"># 安装vuex（基于vue的状态管理模式）</span>
npm install vuex -S
<span class="hljs-comment"># 安装echarts（图表显示）</span>
npm install echarts --save</code></pre>
<blockquote>
<p><strong>依赖简介：</strong><br><code>element-ui</code>是一套采用 Vue 2.0 作为基础框架实现的组件库，它面向企业级的后台应用，能够帮助你快速地搭建网站，极大地减少研发的人力与时间成本。</p>
<p><code>axios</code>是一个基于 promise 的 HTTP 库，主要是AJAX功能。</p>
<p><code>vuex</code>是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。</p>
<p><code>ECharts</code>，一个纯 Javascript 的图表库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖轻量级的 Canvas 类库 ZRender，提供直观，生动，可交互，可高度个性化定制的数据可视化图表。</p>
</blockquote>
<p>贴两张图片出来，更多界面和功能请直接进行在线演示发掘。</p>
<p><span class="img-wrap"><img data-src="/img/bVXL1N?w=1313&amp;h=666" src="https://static.alili.tech/img/bVXL1N?w=1313&amp;h=666" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVXL1V?w=1313&amp;h=667" src="https://static.alili.tech/img/bVXL1V?w=1313&amp;h=667" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用vue2.0 + vue-router + vuex + element-ui实现的后台管理系统

## 原文链接
[https://segmentfault.com/a/1190000011823686](https://segmentfault.com/a/1190000011823686)


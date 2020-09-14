---
title: 'mpvue - 基于 Vue.js 的小程序框架' 
date: 2018-12-06 2:30:09
hidden: true
slug: yxy2waae8bp
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000014242113?w=460&amp;h=460" src="https://static.alili.tech/img/remote/1460000014242113?w=460&amp;h=460" alt="logo" title="logo" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014242114" src="https://static.alili.tech/img/remote/1460000014242114" alt="" title="" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/remote/1460000014242115" src="https://static.alili.tech/img/remote/1460000014242115" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">mpvue</h1>
<blockquote>Vue.js 小程序版, fork 自 <a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">vuejs/vue@2.4.1</a>，保留了 vue runtime 能力，添加了小程序平台的支持。</blockquote>
<p><code>mpvue</code> 是一个使用 <a href="https://vuejs.org" rel="nofollow noreferrer" target="_blank">Vue.js</a> 开发小程序的前端框架。框架基于 <code>Vue.js</code> 核心，<code>mpvue</code> 修改了 <code>Vue.js</code> 的 runtime 和 compiler 实现，使其可以运行在小程序环境中，从而为小程序开发引入了整套 <code>Vue.js</code> 开发体验。</p>
<h2 id="articleHeader1">文档</h2>
<p><a href="http://mpvue.com" rel="nofollow noreferrer" target="_blank">mpvue 文档</a></p>
<h2 id="articleHeader2">实践案例</h2>
<p>美团旗下小程序：<code>美团火车票12306抢票</code>、<code>美团汽车票</code> 和 <code>美团充电</code>，此外，正有一大批小程序正在接入中。</p>
<h2 id="articleHeader3">快速开始</h2>
<p>我们精心准备了一个简单的 <a href="http://mpvue.com/mpvue/quickstart" rel="nofollow noreferrer" target="_blank">五分钟上手教程</a> 方便你快速体验到 <code>mpvue</code> 带来的开发乐趣。</p>
<h2 id="articleHeader4">名称由来</h2>
<ul>
<li>
<code>mp</code>：mini program 的缩写</li>
<li>
<code>mpvue</code>：Vue.js in mini program</li>
</ul>
<h2 id="articleHeader5">主要特性</h2>
<p>使用 <code>mpvue</code> 开发小程序，你将在小程序技术体系的基础上获取到这样一些能力：</p>
<ul>
<li>彻底的组件化开发能力：提高代码复用性</li>
<li>完整的 <code>Vue.js</code> 开发体验</li>
<li>方便的 <code>Vuex</code> 数据管理方案：方便构建复杂应用</li>
<li>快捷的 <code>webpack</code> 构建机制：自定义构建策略、开发阶段 hotReload</li>
<li>支持使用 npm 外部依赖</li>
<li>使用 <code>Vue.js</code> 命令行工具 vue-cli 快速初始化项目</li>
<li>H5 代码转换编译成小程序目标代码的能力</li>
</ul>
<p>其它特性正在等着你去探索。</p>
<h3 id="articleHeader6">H5 和小程序如何复用代码</h3>
<p><a href="http://mpvue.com/assets/20170810-022809-HD.mp4" rel="nofollow noreferrer" target="_blank">先来看一段视频</a></p>
<p>在左侧为已经上线的 H5 页面，右侧为同代码的小程序页面，其中只需要更改小部分平台差异代码和更新下 webpack 的建构配置就可以直接运行。</p>
<p>在未来最理想的状态是，可以一套代码可以直接跑在多端：WEB、小程序（微信和支付宝）、Native（借助weex）。</p>
<p>当然从产品的层面，我们不建议这么做，各个端有自己的差异性，我们期望的只是开发和调试体验一致。</p>
<h2 id="articleHeader7">配套设施</h2>
<p><code>mpvue</code> 作为小程序版本的 <code>Vue.js</code>，在框架 SDK 之外，完整的技术体系还包括如下设施。</p>
<ul>
<li>
<a href="http://mpvue.com/build/mpvue-loader" rel="nofollow noreferrer" target="_blank">mpvue-loader</a> 提供 webpack 版本的加载器</li>
<li>
<a href="http://mpvue.com/build/mpvue-webpack-target" rel="nofollow noreferrer" target="_blank">mpvue-webpack-target</a> webpack 构建目标</li>
<li>
<a href="http://mpvue.com/build/postcss-mpvue-wxss" rel="nofollow noreferrer" target="_blank">postcss-mpvue-wxss</a> 样式代码转换预处理工具</li>
<li>
<a href="http://mpvue.com/build/px2rpx-loader" rel="nofollow noreferrer" target="_blank">px2rpx-loader</a> 样式转化插件</li>
<li>
<a href="http://mpvue.com/mpvue/quickstart" rel="nofollow noreferrer" target="_blank">mpvue-quickstart</a> mpvue-quickstart</li>
<li>
<a href="http://mpvue.com/mpvue/simple" rel="nofollow noreferrer" target="_blank">mpvue-simple</a> 辅助 mpvue 快速开发 Page / Component 级小程序页面的工具</li>
<li>其它</li>
</ul>
<p><a href="https://github.com/Meituan-Dianping/mpvue/.github/CONTRIBUTING.md" rel="nofollow noreferrer" target="_blank">贡献方法</a></p>
<p><a href="https://github.com/Meituan-Dianping/mpvue/issues/21" rel="nofollow noreferrer" target="_blank">使用 mpvue 的项目征集</a></p>
<p><a href="https://github.com/Meituan-Dianping/mpvue/issues/14" rel="nofollow noreferrer" target="_blank">分享交流群</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
mpvue - 基于 Vue.js 的小程序框架

## 原文链接
[https://segmentfault.com/a/1190000014242108](https://segmentfault.com/a/1190000014242108)


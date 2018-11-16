---
title: iView 发布 3.1.0 版本，支持 TypeScript，支持 Vue CLI 3
hidden: true
categories: [reprint]
slug: c127c8b3
date: 2018-10-22 00:00:00
---

{{< raw >}}

                    
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgnSF?w=1600&amp;h=800" src="https://static.alili.tech/img/bVbgnSF?w=1600&amp;h=800" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>自 iView 7.28 发布 3.0 后，今天我们又带来了一个重要的版本 3.1.0（版本代号：INSIDE），这个版本 iView 开始支持 <strong>TypeScript</strong>，可以算是一个新的里程碑。</p>
<p>如果觉得不错，请不要吝啬你的 Star 哦：</p>
<p>👉<a href="https://github.com/iview/iview" rel="nofollow noreferrer" target="_blank">https://github.com/iview/iview</a></p>
<h2 id="articleHeader0">更新日志</h2>
<p>先看一下 3.1.0 版本完整的更新日志：<br><a href="https://github.com/iview/iview/releases" rel="nofollow noreferrer" target="_blank">https://github.com/iview/iview/releases</a></p>
<ul>
<li>支持 <strong>TypeScript</strong>。</li>
<li>增加 Vue CLI 3 插件。<a href="https://github.com/iview/vue-cli-plugin-iview" rel="nofollow noreferrer" target="_blank">vue-cli-plugin-iview</a>
</li>
<li>文档增加 Nuxt.js 用法。<a href="https://dev.iviewui.com/articles/1024499044308881408" rel="nofollow noreferrer" target="_blank">查看</a>
</li>
<li>文档更新<strong>快速上手</strong>章节。<a href="https://www.iviewui.com/docs/guide/start" rel="nofollow noreferrer" target="_blank">查看</a>
</li>
<li>新增抽屉组件 Drawer。</li>
<li>ColorPicker 新增属性 <code>editable</code>，支持输入色值。</li>
<li>Tabs 新增属性 <code>beforeRemove</code>，返回 Promise 可中断关闭。</li>
<li>InputNumber 新增属性 <code>active-change</code>，设置为 false 时，只会在失焦时更改数据。</li>
<li>Modal 新增属性 <code>z-index</code>。</li>
<li>Modal 的 ESC 按键，现在只会关闭最顶层的模态框，当点击某个 Modal 区域时，它将置为最顶层。</li>
<li>修复 DatePicker 在某些日期下，面板联动错误的 bug。</li>
<li>修复 DatePicker 无法使用 <code>disabled</code> 属性的 bug。</li>
<li>修复 Select 开启 <code>transfer</code> 属性后，在 3.0.1 版本下有时样式错误的 bug。</li>
<li>MenuItem 设置 <code>target="_blank"</code> 时，点击菜单不再高亮当前项。</li>
</ul>
<h3 id="articleHeader1">完善的 TypeScript 支持</h3>
<p>目前 iView 所有的组件，都增加了 d.ts 定义：<br><a href="https://github.com/iview/iview/tree/2.0/types" rel="nofollow noreferrer" target="_blank">https://github.com/iview/iview/tree/2.0/types</a></p>
<p>对于喜欢写 TS 的用户来说，这是一项不错的福利。由于 Vue 本身的一些问题，目前 iView 在 <strong>tsx</strong> 的支持上还有一些问题，我们也会继续探讨支持 tsx 的解决方案，以及一些在 iView 使用 TypeScript 的方法和经验，之后都会第一时间发表在 iView 开发者社区 <a href="https://dev.iviewui.com/" rel="nofollow noreferrer" target="_blank">https://dev.iviewui.com/</a> 。</p>
<h3 id="articleHeader2">新增 Vue CLI 3 插件</h3>
<p>要说起带 GUI 的工程构建工具，iView CLI 可要比 Vue CLI 3 早上一年多：）不过二者还是有质的区别的，iView CLI 是一个基于 Electron 编译的客户端软件，通过一个界面来生成工程文件。而 Vue CLI 3 是一整套的工程管理服务了。Vue CLI 3 可以说让开发和维护变的及其简单了，所以 iView 3.0 发布后，官方也没再继续维护 iView CLI。这次我们也开发了支持 Vue CLI 3 的 iView 插件：<a href="https://github.com/iview/vue-cli-plugin-iview" rel="nofollow noreferrer" target="_blank">vue-cli-plugin-iview</a>。</p>
<p>iView 文档也对工程构建的引导进行了修改，去掉了 iView CLI，而是推荐使用 Vue CLI 3。当你在使用 Vue CLI 3 管理你的项目时，你可以在插件中搜索 iview，然后安装第一个就可以了：<br><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016259043?w=1280&amp;h=562" src="https://static.alili.tech/img/remote/1460000016259043?w=1280&amp;h=562" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>iView 插件还支持一些简单的配置：</p>
<ul>
<li>选择全局使用还是按需使用 iView（默认全局）；</li>
<li>选择使用的语言（默认是中文）；</li>
<li>选择是否需要自定义主题（默认为否）。</li>
</ul>
<p>完成不同的选择后，生成的配置文件也不同。</p>
<p>如果有机会，下一个项目，不妨试试用 Vue CLI 3 来管理吧，你绝对会爱上它！</p>
<h3 id="articleHeader3">新增抽屉组件 Drawer</h3>
<p>众所周知，iView 官方提供的组件数量是同类开源产品里最多的了，3.0 我们增加了 5 个全新的组件，这个版本，又增加了一个社区呼声较高的<strong>抽屉组件 Drawer</strong>。</p>
<p>坦说的讲，抽屉组件和模态框 Modal 组件是很像的（包括代码也一样），只不过抽屉组件是从侧边打开的，并占满全屏：</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016259044?w=1280&amp;h=653" src="https://static.alili.tech/img/remote/1460000016259044?w=1280&amp;h=653" alt="对象编辑 - 用于承载编辑相关操作，需要点击关闭按钮关闭" title="对象编辑 - 用于承载编辑相关操作，需要点击关闭按钮关闭" style="cursor: pointer; display: inline;"></span></p>
<p>本次更新，也对 Modal 进行了加强。3.0 开始，Modal 组件开始支持拖拽，这意味着同时可以显示多个 Modal，那层级就会是个问题。3.1.0 版本彻底解决了这个问题，如果你同时打开了多个 Modal（一般场景是打开了多个可拖拽的 Modal），现在是有层级关系的，新打开的，或者点击某个 Modal 的可视区域，它都将置为最顶层，而且按 <code>ESC</code> 键，只会关闭最顶层的一个 Modal，不会全部关闭了。而且新增加的 <code>z-index</code> 的属性，可以自定义 Modal 初始的层级值了。</p>
<p>如果你还没更新到 3.x，别等了，赶快更新吧，以后还有好多好东西等着你呢！</p>
<h2 id="articleHeader4">特别鸣谢</h2>
<p>特别感谢 <a href="https://github.com/yangdan8" rel="nofollow noreferrer" target="_blank">@yangdan8</a> 和 <a href="https://github.com/lcx960324" rel="nofollow noreferrer" target="_blank">@lcx960324</a> 在该版本对 iView 支持 TypeScript 的贡献！</p>

                
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000016259040](https://segmentfault.com/a/1190000016259040)

## 原文标题
iView 发布 3.1.0 版本，支持 TypeScript，支持 Vue CLI 3

---
title: '技术周刊 Vol.10 - React Native丨Learn Once, Write Anywhere' 
date: 2019-02-01 2:30:10
hidden: true
slug: 2qclu0g9vrq
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVEGKF" src="https://static.alili.techhttps://segmentfault.com/img/bVEGKF" alt="weekly-vol010" title="weekly-vol010" style="cursor: pointer; display: inline;"></span></p>
<p>结束了前两期的入门（ <a href="https://segmentfault.com/a/1190000007135115">Vol.8 - React，“5 分钟快速入门”</a>）和进阶（<a href="https://segmentfault.com/a/1190000007205944" target="_blank">Vol.9 - 进阶吧！React</a>），为期一个月的 React 学习快要完成了。接下来，我们进入学习的最后一阶段 - React Native。</p>
<p>本期周刊重点学习 React Native，从上手到项目实践，希望本期的内容，可以让你对 React 的整体结构，达到一个全局的了解。</p>
<h2 id="articleHeader0">React Native 上手</h2>
<p>上手一种新的技术，<a href="https://facebook.github.io/react-native/" rel="nofollow noreferrer" target="_blank">官方的文档</a> 自然是最详实不过了。然而，很多时候看完官方文档，我们仍旧会在自己用的时候掉进各种各样的坑里，所以，我们精选下面这几篇文章，让你在上手 React Native 的同时尽量避免进坑。</p>
<blockquote><p><strong>ChanceKing - <a href="https://segmentfault.com/a/1190000003775004">React Native 初构建之我等到花儿都谢了</a></strong></p></blockquote>
<p>喜欢 React Native，因为它改变了前端给大家的传统认知，拓展了前端的维度；因为它不仅能在 H5 的范畴里搞一搞，也可以侵占到客户端里翻云覆雨，因为它提高了前端的存在感，让人有所期盼和兴奋。本文作者将自己第一次构建 React Native 项目所踩的坑记录一下，如果你也准备上手 React Native，不妨一起跟着试一下。</p>
<blockquote><p><strong>听海 JamiE - <a href="https://segmentfault.com/a/1190000002645929" target="_blank">React Native 基础练习指北（一）</a>、<a href="https://segmentfault.com/a/1190000002647733">React Native 基础练习指北（二）</a></strong></p></blockquote>
<p>React Native 是如何开发 iOS APP？如果你也好奇，那就赶快准备好 Mac OSX, XCode, node 以及 npm，在终端输入 <code>npm install -g react-native-cli</code> 和 <code>react-native init AwesomeProject</code>，从展示一张海报开始，聊聊模拟数据、渲染，通过接口获取线上数据并展示等环节。</p>
<blockquote><p><strong>陈学家_6174 - <a href="https://segmentfault.com/a/1190000002658374" target="_blank">React-Native 之布局篇</a></strong></p></blockquote>
<p>宽度单位和像素密度、flex 布局、图片布局、绝对定位和相对定位、文本元素……详细的讲解方式，简洁的特征总结，帮你轻松搞定 React-Native 布局。</p>
<blockquote><p><strong>陈学家_6174 - <a href="https://segmentfault.com/a/1190000002694201">React-Native 与 React-Web 的融合</a></strong></p></blockquote>
<p>对于 React-Native 在实际中的应用，Facebook 官方的说法是 React-Native 是为多平台提供共同的开发方式，而不是说一份代码，多处使用。为此，作者也尝试通过一个实际的例子(以 SampleApp 做一个简单 demo）探究一下共享代码的可行性。</p>
<blockquote><p><strong>cnsnake11 - <a href="https://segmentfault.com/a/1190000004352162" target="_blank">React Native 增量升级方案</a></strong></p></blockquote>
<p>当修改了代码或者图片的时候，只要 app 使用新的 bundle 文件和 assets 文件夹，就完成了一次在线升级。本文将基于以上思路，尝试讲解增量升级的解决方案。</p>
<blockquote><p><strong> DesGemini - <a href="https://segmentfault.com/a/1190000004422456">初窥基于 react-art 库的 React Native SVG</a></strong></p></blockquote>
<p>在移动端，考虑到跨平台的需求，加之 web 端的技术积累，react-art 成为了现成绘制图形的解决方案，且添加了 iOS 和 Android 平台上对 react-art 的支持，在此，作者为诸位带来了（全球首发？=_=）入门文档。</p>
<blockquote><p><strong>静逸秋水 - <a href="https://segmentfault.com/a/1190000006048459" target="_blank">React Native 开发小 Tips</a></strong></p></blockquote>
<p>相信好多写 React Native 的都是前端出身，当遇见问题时会习惯性从前端出发，但由于 React Native 本身的限制，并不是支持足够多的属性和样式，故作者结合自己的开发实践，将一些未来开发可能会遇见的问题做了总结，并给出一些小的代码参考，希望能帮助到你。</p>
<blockquote><p><strong>DesGemini - <a href="https://segmentfault.com/a/1190000004910600">React Native 蛮荒开发生存指南</a></strong></p></blockquote>
<p>React Native 的发展可谓是大红大紫，但其文档更新速度却远远跟不上开发的速度，使得 React Native 的工程化恍若蛮荒生存。作者为某一商业项目开发 React Native App 已近半年，并将自己的踩坑和爬坑经验撰写成文，希望此份指南能为大家带来帮助。</p>
<h2 id="articleHeader1">React Native for Android</h2>
<p>本章节选自侯医生的「React Native Android 安利」系列，教程将会更多的结合原生的安卓去讲 React Native，项目从搭建 React Native Android 环境开始，层层深入，跟着教程学习，可以熟练掌握 react-native-android 的开发。</p>
<p><strong><a href="https://segmentfault.com/a/1190000006037447" target="_blank">1. 搭建 React Native Android 环境</a></strong></p>
<p>搭建 React-Native 的文章虽然很多，但大多数都是搭建 JS 层面的，没有结合原生 Android 及其开发去讲。本文将简单介绍如何使用 Android Studio 与 React Native 搭建一个 React 的基础环境，并使用其成功的制作出了一个 hello world。</p>
<p><strong><a href="https://segmentfault.com/a/1190000006059149">2. 创建简单 RN 应用（以 JS 角度来看 RN）</a></strong></p>
<p>从成功制作出一个 hello world 之后，我们要探索一下如何利用 React-Native 制作出比 Hello World 复杂一点的界面，顺便一起审视一些 React Native Android 工程的目录结构。</p>
<p><strong><a href="https://segmentfault.com/a/1190000006191310" target="_blank">4. RN 中使用 JS 调用 Java 代码</a></strong></p>
<p>掌握 <a href="https://segmentfault.com/a/1190000006082315">3. 如何控制原生 Android 的 activity 间跳转</a>，我们将其中学到的原生知识，使用 JS 去调用。这样双剑合璧，便可以更加高效的开发 React-Native 应用啦~</p>
<p><strong><a href="https://segmentfault.com/a/1190000007058805" target="_blank">6. React Native 中的 React.js 基础</a></strong></p>
<p>很多关于 React-Native 的知识，都是有关于样式，底层，环境等知识的，现在我们来学习一下 React.js 的基础，我们的代码，我们创建的组件及其他相关知识。</p>
<p><strong><a href="https://segmentfault.com/a/1190000006876813">8. 手机百度 feed 流的实现</a></strong></p>
<p>经过上述几篇文章的学习，你将基本掌握了 React-Native 样式的书写与布局的方式。这一节，我们将一起来做个动手实践的例子，来模仿一下手机百度的新闻流，巩固一下自己的 React-Native 能力。</p>
<h2 id="articleHeader2">项目分享</h2>
<blockquote><p><strong>ctriptech - <a href="https://segmentfault.com/a/1190000005776912" target="_blank">React Native 实践之携程 Moles 框架</a></strong></p></blockquote>
<p>本次分享将通过对 Moles 框架的分享，介绍携程在 React Native 方面的实战干货，希望给大家一些灵感和启发。内容包括三个方面：</p>
<ul>
<li><p>Moles 框架在 React Native 和我们主 App 的集成中起到了什么作用？</p></li>
<li><p>Moles 框架是如何打通 Android、iOS、H5、SEO，让我们一套代码跑在多个平台上？</p></li>
<li><p>Moles 框架的组成以及原理是怎样的?</p></li>
</ul>
<blockquote><p><strong>静逸秋水 - <a href="https://segmentfault.com/a/1190000006714122">使用 React Native 制作圆形加载条</a></strong></p></blockquote>
<p>进度条的常规制作方法，可以用 canvas 去绘制图，也可以用 SVG 去绘制。如何使用 React Native 写这样的进度条呢？可以跟着作者一起来尝试一下这个进度条的完成方案。</p>
<blockquote><p><strong>DesGemini - <a href="https://segmentfault.com/a/1190000007082825" target="_blank">Node.js + React Native 毕设：农业物联网监测系统的开发手记</a></strong></p></blockquote>
<p>该物联网监测系统整体上可分为三层：数据库层，服务器层和客户端层。数据库层除了原有的 Oracle 11d 数据库以外，还额外增加了一个 Redis 数据库。服务器层采用 Node.js 的 Express 框架作为客户端的 API 后台。￼客户端层绝大部分是 React Native 代码，另外采用了 Redux 来统一应用的事件分发和 UI 数据管理了。一起来感受下 react native 自带 buff 吧~</p>
<blockquote><p><strong>王铁手 - <a href="https://segmentfault.com/a/1190000005170648">React-Native 初体验 - 使用 JavaScript 来写 iOS app</a></strong></p></blockquote>
<p>写过一个 Hybrid App 了，自觉不够，又心血来潮，耍起了 React Native，非常简单的入门，不知初体验的你是否和作者想一块儿去了。</p>
<p><em>（本期完）</em><br><br></p>
<hr>
<p>往期周刊传送门：</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000006579616" target="_blank">Vol.1 - Vue.js 起手式</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006690217">Vol.2 - 666，ES6</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006751300" target="_blank">Vol.3 - 前后端分离与前端工程化</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006827148">Vol.4 - 这份 Android 有点甜</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006893394" target="_blank">Vol.5 - Build, Ship, Run, and Monitor with Docker</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006950447">Vol.6 - 面试那些事儿</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007021303" target="_blank">Vol.7 - iOS丨好好学习，从娃抓起~</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007135115">Vol.8 - React，“5 分钟快速入门”</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007205944" target="_blank">Vol.9 - 进阶吧！React</a></p></li>
</ul>
<hr>
<blockquote>
<p><strong># SegmentFault 技术周刊 #</strong></p>
<p>「技术周刊」是社区特别推出的技术内容系列，一周一主题。周刊筛选的每篇内容，是作者的独到见解，踩坑总结和经验分享。</p>
<p>每周二更新，欢迎「<a href="https://segmentfault.com/blog/weekly">关注</a>」或者「<a href="https://segmentfault.com/feeds/blog/weekly" target="_blank">订阅</a>」。大家也可以在评论处留言自己感兴趣的主题，推荐主题相关的优秀文章。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
技术周刊 Vol.10 - React Native丨Learn Once, Write Anywhere

## 原文链接
[https://segmentfault.com/a/1190000007275896](https://segmentfault.com/a/1190000007275896)


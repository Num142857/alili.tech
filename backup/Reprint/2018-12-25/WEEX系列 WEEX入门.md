---
title: 'WEEX系列 WEEX入门' 
date: 2018-12-25 2:30:11
hidden: true
slug: x4j6fbeh8kr
categories: [reprint]
---

{{< raw >}}

                    
<p>和一步一起从前端视角聊一聊WEEX</p>
<blockquote>WEEX是一套构建高性能、可扩展的原生应用跨平台<code>解决方案</code>。就一个字<code>吊</code>。</blockquote>
<p>通过使用有限的<code>类HTML标签</code>、<code>阉割的CSS</code>及<code>JS</code>基于VUE语法来快速构建原生应用。一次编写多端运行，可以使用相同的 API 开发 Web，Android 和 iOS 应用。</p>
<h2 id="articleHeader0">优势</h2>
<p>官网给出三点：1、体积小，语法简单 2、可扩展 3、高性能<br>1、简单<br>体积小不小我不知道，但是语法确实很简单。WEEX提供了10几个内建组件和10几个内建模块，简单读一读就可以开发应用程序。<br>2、可扩展<br>VueJS的亮点之一就是组件化、模块化, WEEX同样继承了其优点，基于内建组件，我们可以开发扩展自己的组件库。<br>3、高性能<br>WEEX本身对加载时间和资源占用进行了优化。站在巨人的肩膀上，我们也很容易开发出高性能的APP。<br>4、开发成本低<br>一个前端搞定三端。</p>
<h2 id="articleHeader1">原理</h2>
<p><span class="img-wrap"><img data-src="/img/bVYGEt?w=1462&amp;h=552" src="https://static.alili.tech/img/bVYGEt?w=1462&amp;h=552" alt="weex-principle.png" title="weex-principle.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们使用WEEX 提供的 template、script、style 三个标签来构建页面或者组件，然后通过 webpack 打包成 JS Bundle。我们可以把 JS Bundle 部署到服务器上实现热更新。JS 引擎运行这些Bundle实现与UI线程通信，达到和原生应用相同的体验效果。我们只需关心如何开发页面，其他工作WEEX已经替我们做了。</p>
<h2 id="articleHeader2">Hello World</h2>
<p>语法是不是很熟悉。<br><span class="img-wrap"><img data-src="/img/bVYGEz?w=1077&amp;h=603" src="https://static.alili.tech/img/bVYGEz?w=1077&amp;h=603" alt="weex-helloworld.gif" title="weex-helloworld.gif" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">其他</h2>
<p>WEEX很好，但是~上手还真挺难的，因为开源时间较短，WEEX社区还不是很强大，文档也比较坑爹。因此接下来请和一步一起踩踩坑吧。</p>
<h2 id="articleHeader4">NEXT</h2>
<p>环境搭建</p>
<blockquote>欢迎大家指正批评、或留言。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WEEX系列 WEEX入门

## 原文链接
[https://segmentfault.com/a/1190000012041307](https://segmentfault.com/a/1190000012041307)


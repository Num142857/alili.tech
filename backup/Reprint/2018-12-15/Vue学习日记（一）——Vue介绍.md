---
title: 'Vue学习日记（一）——Vue介绍' 
date: 2018-12-15 2:30:11
hidden: true
slug: 36otfm96agt
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>本人学习了一段时间的vue，并尝试写了一些小Demo之后，将vue投入了几个项目之后，一直在边学习边使用，经过看了vue,vuex,vue-router的官方文档和慕课网上的一些实战视频之后，深有体会，故此写下这些文章。</p>
<h1 id="articleHeader1">前端框架比较</h1>
<p>其实的话，前端有很多的框架，很多初学前端的人可能没有接触到框架，以为框架是很高大上的东西，就我个人而言，我是听从师姐的学习路线开始学习前端的，一开始的时候接触的就是html,css,js这些基本语言，对于框架，一直是觉得很高大上的东西。后来，经过长时间的与框架打交道之后，也明白了，基础对于前端开发者是很重要的，<strong>框架也就只是将你会复用的代码进行包装起来方便你的使用</strong>，最重要的还是基础。</p>
<p>目前前端开发有很多的框架在市面上，其实说是框架，如果从C语言java语言那些语言来说，也就是库，一些封装好的东西，告诉你用法，就可以简单的实现一个简单的项目了。如果想更加了解前端框架，建议可以百度百度，或者看这篇<a href="https://www.zhihu.com/question/35069742" rel="nofollow noreferrer" target="_blank">知乎讨论</a>，点击里面的文章看看，引用一下这里的一张图片展示一下目前的前端框架。</p>
<p><span class="img-wrap"><img data-src="https://github.com/XiaoCheng123/markdownImg/blob/master/vue%E5%AD%A6%E4%B9%A0%E6%97%A5%E8%AE%B0/1.jpg?raw=true" src="https://static.alili.techhttps://github.com/XiaoCheng123/markdownImg/blob/master/vue%E5%AD%A6%E4%B9%A0%E6%97%A5%E8%AE%B0/1.jpg?raw=true" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>是的这只是部分前端框架，就我个人觉得，目前前端框架的三大巨头也就只是<br><strong>vue,react,angular</strong>（顺序与排名无关）。</p>
<p>各个框架都有自己擅长的一方面：</p>
<ul>
<li>vue擅长单页面多路由的开发</li>
<li>react适合多页面，手机app还有一些大型的开发</li>
<li>angular系统比较完善，适合快速搭建产品的原型</li>
</ul>
<p>但是也各有各的劣势：</p>
<ul>
<li>vue并不特别适合多页面的开发</li>
<li>react在单页面开发性能并不比vue好，因为vue比较轻便</li>
<li>angular不适合程序员去自我发挥很多，因为其基本配置好饿了很多东西</li>
</ul>
<p>当然，以上也都只是个人的见解而已，有错误还望包涵指正，关于他们的社区，就不多做介绍了，三大框架社区都比较完善。</p>
<h1 id="articleHeader2">Vue的优势</h1>
<p>Vue.js是一个轻巧、高性能、可组件化的MVVM库，如果你不懂什么是mvvm模式可以看一下<a href="https://www.cnblogs.com/guwei4037/p/5591183.html" rel="nofollow noreferrer" target="_blank">这篇文章</a>个人觉得比较容易理解，同时拥有非常容易上手的API；</p>
<ul>
<li>Vue.js是一个构建数据驱动的Web界面的库。</li>
<li>Vue.js是一套构建用户界面的 渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。</li>
<li>Vue 的核心库只关注视图层，并且非常容易学习，非常容易与其它库或已有项目整合。</li>
<li>另一方面，Vue 完全有能力驱动采用单文件组件和Vue生态系统支持的库开发的复杂单页应用。</li>
</ul>
<p>简单的说，Vue.js是一个构建数据驱动的 web 界面的渐进式框架。Vue.js 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。核心是一个响应的数据绑定系统</p>
<p>Vue.js的特性如下：</p>
<ol>
<li>轻量级的框架</li>
<li>双向数据绑定</li>
<li>指令</li>
<li>插件化</li>
</ol>
<h1 id="articleHeader3">Vue渐进式框架</h1>
<blockquote>为什么说vue是渐进式框架呢？</blockquote>
<p>其实vue的官方首页就说了，vue,渐进式JavaScript 框架</p>
<p><span class="img-wrap"><img data-src="https://github.com/XiaoCheng123/markdownImg/blob/master/vue%E5%AD%A6%E4%B9%A0%E6%97%A5%E8%AE%B0/2.jpg?raw=true" src="https://static.alili.techhttps://github.com/XiaoCheng123/markdownImg/blob/master/vue%E5%AD%A6%E4%B9%A0%E6%97%A5%E8%AE%B0/2.jpg?raw=true" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>其实严格的说，vue并不是一个框架，他只是一个库，和jq一样，可以操作dom的库，不同的是vue操作的是虚拟dom，至于什么是虚拟dom我会在下篇文章继续介绍。</p>
<p>vue并不是框架，只是和他旁边的生态环境组成了一个框架，下面，贴一个官方的渐进式框架介绍图吧，方便理解。</p>
<p><span class="img-wrap"><img data-src="https://github.com/XiaoCheng123/markdownImg/blob/master/vue%E5%AD%A6%E4%B9%A0%E6%97%A5%E8%AE%B0/3.jpg?raw=true" src="https://static.alili.techhttps://github.com/XiaoCheng123/markdownImg/blob/master/vue%E5%AD%A6%E4%B9%A0%E6%97%A5%E8%AE%B0/3.jpg?raw=true" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>正如上图解释，一个vue渐进式框架就是由</p>
<ol>
<li>声明式渲染vue.js</li>
<li>组件系统element-ui（也可以用bootstrap等，但是建议还是用这个，因为其他的还要下载其他的dom库）</li>
<li>客户端路由vue-router</li>
<li>大型状态管理vuex</li>
<li>构建工具webpack</li>
</ol>
<h1 id="articleHeader4">Vue全家桶</h1>
<p>Vue著名的全家桶其实就是，包含了<a href="http://router.vuejs.org" rel="nofollow noreferrer" target="_blank">vue-router</a>，<a href="http://vuex.vuejs.org" rel="nofollow noreferrer" target="_blank">vuex</a>， <a href="https://github.com/pagekit/vue-resource" rel="nofollow noreferrer" target="_blank">vue-resource</a>（现在基本不用，而是用更为简单的axios）。再加上构建工具vue-cli，就是一个完整的vue项目的核心构成。</p>
<p>同时，在vue调试方面，可以选择安装chrome插件vue Devtools，以及有专门的组件库elment-ui，轻轻松松就可以完成一个较大型的项目</p>
<h1 id="articleHeader5">总结</h1>
<p>vue个人觉得是很不错的框架，特别还是国内牛人发布的，接下来还会有vue一系列的文章，以及vue+axios+mysql+node+express全栈实现一个系统的文章，去更加深入的了解vue。当然还有更加深入的理解，大家也可以看看官方文档，都介绍的很充分了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue学习日记（一）——Vue介绍

## 原文链接
[https://segmentfault.com/a/1190000013067831](https://segmentfault.com/a/1190000013067831)


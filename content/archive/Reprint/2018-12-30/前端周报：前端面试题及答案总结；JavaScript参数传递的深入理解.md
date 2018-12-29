---
title: '前端周报：前端面试题及答案总结；JavaScript参数传递的深入理解' 
date: 2018-12-30 2:30:10
hidden: true
slug: t2ivrwvzh29
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVVQOH?w=640&amp;h=319" src="https://static.alili.tech/img/bVVQOH?w=640&amp;h=319" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">1、2017前端面试题及答案总结</h2>
<p>|掘金技术征文 "金三银四，金九银十"，用来形容求职最好的几个月。但是随着行业的饱和，初中级前端er就业形势不容乐观。 行业状态不可控，我们能做的当然只是让自己变得更加具有竞争力。 今年自己也用了几个月的时间来准备笔记面试，巩固基础知识。特此将自己在这个过程总结的题目分享出来，希望对于求职和准备求职的同学有所帮助。</p>
<p><a href="https://juejin.im/post/59be99a0f265da0644289dde" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/59be99...</a></p>
<h2 id="articleHeader1">2、两行 JavaScript 代码</h2>
<p>最近看到了两行 JavaScript 代码，很受启发。 1. 封装 DOM 属性 在 JavaScript 中，我们可以获取HTML元素的属性值，例如 element.id 。但是，因为 for 和 class 是 JavaScript 中的关键字，所以在 JavaScript 中这两个属性名称分别用 htmlFor 和 className 代替，于是在封装的时候需要先对这两个属性进行特殊判断。</p>
<p><a href="http://www.tuicool.com/articles/vyeQnqr" rel="nofollow noreferrer" target="_blank">http://www.tuicool.com/articl...</a></p>
<h2 id="articleHeader2">3、JavaScript参数传递的深入理解</h2>
<p>今天看到《JavaScript高级程序设计》里面关于参数传递的章节时，有点懵。本着“打破砂锅问到底”的精神，看了些别人写的博客和知乎上一些大神的解释，算是对参数传递有了个比较全面的了解。在讲参数传递前，先要理解变量在内存中的存放方式。</p>
<p><a href="https://juejin.im/post/59be85735188256bd733cc10" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/59be85...</a></p>
<h2 id="articleHeader3">4、新一代Node.js的Web开发框架Koa2</h2>
<p>从零开始nodejs系列文章 ，将介绍如何利Javascript做为服务端脚本，通过Nodejs框架web开发。Nodejs框架是基于V8的引擎，是目前速度最快的Javascript引擎。chrome浏览器就基于V8，同时打开20-30个网页都很流畅。Nodejs标准的web开发框架Express，可以帮助我们迅速建立web站点，比起PHP的开发效率更高，而且学习曲线更低。</p>
<p><a href="http://www.tuicool.com/articles/22uQjqm" rel="nofollow noreferrer" target="_blank">http://www.tuicool.com/articl...</a></p>
<h2 id="articleHeader4">5、前端工程-从原理到轮子之JS模块化</h2>
<p>目前，一个典型的前端项目技术框架的选型主要包括以下三个方面： JS模块化框架。(Require/Sea/ES6 Module/NEJ) 前端模板框架。(React/Vue/Regular) 状态管理框架。(Flux/Redux) 系列文章将从上面三个方面来介绍相关原理，并且尝试自己造一个简单的轮子。 本篇介绍的是 JS模块化 。</p>
<p><a href="https://juejin.im/post/59c31a0a6fb9a00a67614596" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/59c31a...</a><br>6、2017 年 9 月：15 个有趣的 JS 和 CSS 库</p>
<p>迎来了金秋 9 月，在这收获的季节，Tutorialzine 又为我们带来了哪些新鲜、有趣的前端资源呢？前端开发者们，一起来看看有木有你需要的前端库。 1. DisplayJS DisplayJS 是一个帮助你渲染 DOM 的简易框架。使用它，你可以更容易地将 JS 变量遍历到特定的 HTML 元素中，类似于 React 或 Vue.js 处理模版的方式...</p>
<p><a href="http://www.jianshu.com/p/ec9ff744eb20" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/ec9f...</a></p>
<h2 id="articleHeader5">7、HTTP请求中的Form Data与Request Payload的区别</h2>
<p>前端开发中经常会用到AJAX发送异步请求，对于POST类型的请求会附带请求数据。而常用的两种传参方式为：Form Data 和 Request Payload。 GET请求 使用get请求时，参数会以key=value的形式拼接在请求的url后面。</p>
<p><a href="https://juejin.im/post/59c1b3c76fb9a00a636a488b" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/59c1b3...</a></p>
<h2 id="articleHeader6">8、浅谈HTML5 Web Worker</h2>
<p>Javascript是运行在单线程环境中，也就是说无法同时运行多个脚本。假设用户点击一个按钮，触发了一段用于计算的Javascript代码，那么在这段代码执行完毕之前，页面是无法响应用户操作的。但是，如果将这段代码交给Web Worker去运行的话，那么情况就不一样了：浏览器会在后台启动一个独立的worker线程来专门负责这段代码的运行，因此，页面在这段Javascript代码运行期间依然可以响应用户的其他操作。</p>
<p><a href="https://juejin.im/post/59c1b3645188250ea1502e46" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/59c1b3...</a></p>
<h2 id="articleHeader7">9、Vue.js填坑记</h2>
<p>前言 上一篇文章主要介绍了我们团队的「Vue.js项目模板」的搭建过程，这只是第一步。作为新手，在实际开发过程中，还会遇到各种各样奇怪的问题。本文主要介绍问题的原因以及解决方式。</p>
<p><a href="http://www.heeroluo.net/article/detail/138/vuejs-problems-during-usage" rel="nofollow noreferrer" target="_blank">http://www.heeroluo.net/artic...</a></p>
<h2 id="articleHeader8">10、前端 排序算法总结</h2>
<p>排序算法可能是你学编程第一个学习的算法，还记得冒泡吗？ 当然，排序和查找两类算法是面试的热门选项。如果你是一个会写快排的程序猿，面试官在比较你和一个连快排都不会写的人的时候，会优先选择你的。那么，前端需要会排序吗？答案是毋庸置疑的，必须会。现在的前端对计算机基础要求越来越高了，如果连排序这些算法都不会，那么发展前景就有限了。本篇将会总结一下，在前端的一些排序算法。</p>
<p><a href="https://segmentfault.com/a/1190000011294349">https://segmentfault.com/a/11...</a></p>
<h2 id="articleHeader9">11、前端面试题 V2.0</h2>
<p>详见： 这是一份集合了多家公司面试题的问答列表，涵盖底层原理、网络知识、性能优化等众多方面的内容，旨在帮助中、高级前端工程师检测知识点掌握情况，了解面试的各种套路。</p>
<p><a href="http://hawx1993.github.io/Front-end-Interview-Questions/#/" rel="nofollow noreferrer" target="_blank">http://hawx1993.github.io/Fro...</a></p>
<h2 id="articleHeader10">12、我从Angular 2转向Vue.js, 也没有选择React</h2>
<p>我们曾经不喜欢，现在依然不喜欢的就是Angular 2 默认使用Typescript作为开发语言。我知道Angular 2可以直接使用JavaScript，但是在Angular 2中使用JavaScript几乎等于重写整个项目。我不认为Typescript为开发增加了附加值，甚至更加糟糕了。我发现我们的编码速度反而变慢了。在JavaScript中很简单的事情，比如定义一个对象，如果使用Typescript就会变得复杂。在你决定使用Typescript之前，我强烈建议你读读下面这两篇文章。Typescript并不是每个人的最佳选择。</p>
<p><a href="https://blog.fundebug.com/2017/09/20/why-we-moved-from-angular2-to-vue" rel="nofollow noreferrer" target="_blank">https://blog.fundebug.com/201...</a></p>
<h2 id="articleHeader11">13、纯 JS 实现的懒加载器：Lozad.js</h2>
<p>详见： Lozad.js 是一个高性能、可配置的纯 JS 实现的懒加载器。它基于 IntersectionObserver API，没有任何依赖，支持动态懒加载添加元素。</p>
<p><a href="https://github.com/ApoorvSaxena/lozad.js" rel="nofollow noreferrer" target="_blank">https://github.com/ApoorvSaxe...</a></p>
<h2 id="articleHeader12">14、Nodejs流学习系列之一: Readable Stream</h2>
<p>nodejs网关开发或多或少都会牵扯到流的使用，但每次的使用都是迷迷糊糊、懵懵懂懂，总是踩完坑后才知道怎么使用，所以有必要深入学习一下Nodejs的流。学习是为了实践，因此这篇文章将利用两个很常用的demo来学习理论并实践。本来只打算一篇文章就写完的,后来看官网文档,越看越觉得一篇文章解决不来,于是打算使用3篇文章来阐述清楚nodejs流的原理.</p>
<p><a href="http://tech.dianwoda.com/2017/09/20/nodejsliu-xue-xi-xi-lie-zhi-readable-stream" rel="nofollow noreferrer" target="_blank">http://tech.dianwoda.com/2017...</a></p>
<h2 id="articleHeader13">15、优酷 HTML5 播放器扩展：Youku-HTML5-Player</h2>
<p>详见： Youku-HTML5-Player 是一个 Youku HTML5 播放器扩展，帮助你从此告别 Flash 和广告。同时，它具备智能记忆、弹幕、视频下载等功能。</p>
<p><a href="https://github.com/esterTion/Youku-HTML5-Player" rel="nofollow noreferrer" target="_blank">https://github.com/esterTion/...</a></p>
<h2 id="articleHeader14">16、JavaScript 与 异步编程</h2>
<p>按照维基百科上的解释：独立于主控制流之外发生的事件就叫做异步。因为 setTimeout 的存在，至少在被 ECMA 标准化的那一刻起，JavaScript 就支持异步编程了。与其他语言的 sleep 不同，setTimeout 是异步的——它不会阻挡当前程序继续往下执行。然而异步编程真正发展壮大，Ajax 的流行功不可没。Ajax 中的 A（Asynchronous）真正点到了异步的概念——这还是 IE5、IE6 的时代。</p>
<p><a href="https://segmentfault.com/a/1190000011296630">https://segmentfault.com/a/11...</a></p>
<h2 id="articleHeader15">17、Nodejs流学习系列之四: Nodejs流的应用例子</h2>
<p>前言 理论花了三篇文章，也算是基本讲完了Nodejs流的一些基础知识，理论是给实践服务的，我们这篇文章也就没有那么多知识了，通过两个小应用来解决我在实际项目中遇到的两个问题。实际情况当然比这里的demo复杂，这里是我简化过的，所以大家清楚解决思路即可，无须纠结内在的一些细节哈。</p>
<p><a href="http://www.tuicool.com/articles/auuyQfJ" rel="nofollow noreferrer" target="_blank">http://www.tuicool.com/articl...</a></p>
<h2 id="articleHeader16">18、React Native源码分析原理（二）(基于0.48版本)</h2>
<p>上一篇文章大家如果仔细阅读揣摩对RN有了一个初步的认识了，接下来将基于上一篇文章的这种初步认识然我们详细了解一下RN的启动过程</p>
<p><a href="http://www.tuicool.com/articles/BbaYFry" rel="nofollow noreferrer" target="_blank">http://www.tuicool.com/articl...</a></p>
<h2 id="articleHeader17">19、Vue:渲染、指令和事件</h2>
<p>如果要我用一句话描述使用 Vue 的经历，我可能会说“它如此合乎常理”或者“它提供给我需要的工具，而且没有妨碍我的工作”。每当学习 Vue 的时候，我都很高兴，因为很有意义，而且很优雅。Vue 相比其它框架的优势有: 简洁，提供更多语义化的 API ， 比 React 的表现稍好，不像 Polymer 那样使用 polyfill，相比 Angular 有独立的视图。</p>
<p><a href="http://www.cnblogs.com/nzbin/p/6363827.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/nzbin/...</a></p>
<h2 id="articleHeader18">20、html2canvas将HTML内容写入Canvas生成图片</h2>
<p>html2canvas 能够实现在用户浏览器端直接对整个或部分页面进行截屏。这个html2canvas脚本将当前页面渲染成一个canvas图片，通过读取DOM并将不同的样式应用到这些元素上实现。 #前端开发博客#</p>
<p><a href="http://caibaojian.com/html2canvas.html" rel="nofollow noreferrer" target="_blank">http://caibaojian.com/html2ca...</a></p>
<blockquote><p>喜欢这篇文章的朋友，欢迎关注、收藏、分享、评论，帮我上热门，你的支持，是我每日更新的动力！<br>喜欢前端的朋友可以点击关注一下我，每日分享精彩的前端文章！</p></blockquote>
<p>更多文章：<a href="http://caibaojian.com/fe-daily-20170924.html" rel="nofollow noreferrer" target="_blank">http://caibaojian.com/fe-dail...</a></p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVVHfb" src="https://static.alili.techhttps://segmentfault.com/img/bVVHfb" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端周报：前端面试题及答案总结；JavaScript参数传递的深入理解

## 原文链接
[https://segmentfault.com/a/1190000011365466](https://segmentfault.com/a/1190000011365466)


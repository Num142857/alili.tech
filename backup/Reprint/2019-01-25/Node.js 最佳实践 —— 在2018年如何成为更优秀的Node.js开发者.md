---
title: 'Node.js 最佳实践 —— 在2018年如何成为更优秀的Node.js开发者' 
date: 2019-01-25 2:30:23
hidden: true
slug: sl14l3jcdi
categories: [reprint]
---

{{< raw >}}

            <p>过去两年，写下如何在新的一年里成为更优秀的Node.js开发者的建议已经成为我的传统，今年也不例外！如果你对我曾经写的新年建议感兴趣，请移步RisingStack博客阅读：</p>
<ul>
<li><p><a href="https://blog.risingstack.com/how-to-become-a-better-node-js-developer-in-2016/">2016年的文章</a></p>
</li>
<li><p><a href="https://blog.risingstack.com/node-js-best-practices-2017/">2017年的文章</a></p>
</li>
</ul>
<p>闲话少说, 一起来看一下2018年的建议！ </p>
<h2><a href="#Adopt-async-await" title="Adopt async-await"></a>使用 <code>async-await</code></h2>
<p>随着 Node.js v8作为LTS发布，<code>async</code>函数变得自然可用了。你可以替换基于回调函数的异步，改写为<code>async</code>函数同步风格的异步代码。</p>
<p><code>async</code>函数是什么呢？通过<a href="https://nemethgergely.com/async-function-best-practices/">Node.js Async 函数最佳实践</a>这篇文章来概括一下：</p>
<p><code>async</code>函数可以让你写出基于<code>Promise</code>的同步风格的代码。当你使用<code>async</code>关键字定义了函数后，你可以在函数体中使用<code>await</code>关键字。当<code>async</code>函数被调用后，它会返回一个<code>Promise</code>对象。<code>async</code>函数返回一个值后，返回的<code>Promise</code>对象将会变为<code>fulfill</code>状态，如果<code>async</code>函数抛出了一个异常，返回的<code>Promise</code>对象将会变为<code>reject</code>状态。</p>
<p><code>await</code>可以用来等待<code>Promise</code>对象被<code>resolve</code>并返回<code>fulfill</code>状态。如果<code>await</code>后面不是一个<code>Promise</code>对象，它被转成<code>Promise</code>对象并立刻<code>resolve</code>。</p>
<p>如果你想精通<code>async</code>函数，我推荐你阅读下面几篇文章：</p>
<ul>
<li><p><a href="https://hueniverse.com/learning-to-throw-again-79b498504d28">Learning to throw again</a></p>
</li>
<li><p><a href="https://hueniverse.com/catching-without-awaiting-b2cb7df45790">Catching without awating</a></p>
</li>
<li><p><a href="https://nemethgergely.com/async-function-best-practices/">Node.js async function best practices</a></p>
</li>
</ul>
<h2><a href="#Graceful-shutdown-for-your-applications" title="Graceful shutdown for your applications"></a>应用优雅退出</h2>
<p>当你发布一个新版本的应用，旧版本的必须被替换掉。你使用的进程管理工具（无论是 Heroku、Kubernets、supervisor或者其它的工具）首先会发送一个<code>SIGTERM</code>信号给你的应用，让它知道自己将被干掉。一旦应用接收到这个信号，它应该停止接收新的请求，完成正在处理中的请求并且释放掉使用的资源，这些资源可能包括数据库连接和文件锁等。</p>
<p>为了让这件事变得简单，我们在GoDaddy组织中发布了一个叫做<a href="https://github.com/godaddy/terminus">terminus</a>的开源模块，来帮助你完成应用的优雅退出。</p>
<h2><a href="#Adopt-the-same-style-guide-across-the-company" title="Adopt the same style-guide across the company"></a>在公司中使用统一的代码风格</h2>
<p>在一个有数百位开发人员的公司使用统一的代码风格是一个挑战，要让所有人同意这一组规则几乎是不可能完成的挑战。</p>
<p>说句难听的话：即便是有非常明显的优势，能够让开发者方便的在两个工程中迁移，而且不需要绕弯路就能使用新的风格编写代码，你也永远不可能让数百位开发者同意这一组规则。</p>
<p>如果你工作在这样的环境下，我发现最好的方式就是相信那些经验丰富的开发人员，在其他开发者的帮助下，他们能终决定权哪些规则可以加入这份指南，哪些不可以。直到他们能让每个人都遵从这一组规则，他们想出什么并不重要（千万不要开始分号战争），必须在某个时候做出决定。</p>
<h2><a href="#Make-security-a-requirement" title="Make security a requirement"></a>安全是必须的要求</h2>
<p>我们在<a href="https://haveibeenpwned.com/">haveibeenpwned</a>看到越来越多的公司被找到了漏洞，我打赌你不想成为下一个。当你为客户编写每一块代码时，代码审查都需要具有专业安全知识的人参与。也许你们不具备这样的同事，或者他们无暇分身，一个好的解决方式就是找一家公司来做这件事情，就像<a href="https://liftsecurity.io/reviews/">Lift Security</a>。</p>
<p>作为一名开发人员，需要经常学习，让自己的安全知识得到补充，出于这样的目的，我推荐你阅读下面的文章：</p>
<ul>
<li><p><a href="https://blog.risingstack.com/node-js-security-checklist/">Node.js Security Checklist</a></p>
</li>
<li><p><a href="https://www.owasp.org/index.php/Main_Page">The Open Web Application Security Project website</a></p>
</li>
<li><p><a href="https://snyk.io/blog/">The Snyk blog</a></p>
</li>
</ul>
<h2><a href="#Talk-at-meetups-or-conferences" title="Talk at meetups or conferences"></a>在聚会或会议上讲话</h2>
<p>还有一个方式，让你成为优秀开发者并且提高表达能力，就是在聚会或者会议上发表演讲。如果你从没这么做过，我推荐你先参加内部聚会，然后参加国内和国际会议。</p>
<p>我认识到在公开场合演讲是艰难的，当我第一次准备我的演讲，<a href="http://speaking.io/">Speaking.io</a>帮了很大的忙，我推荐你使用该网站，如果你正在准备第一次演讲，而且想要得到一些反馈，可以在<a href="https://twitter.com/nthgergo">Twitter</a>上找到我，我可以和你聊一聊，希望能对你有帮助。</p>
<p>一旦你有了想在会议上讨论的主题，看一下这份在GitHub上的<a href="https://github.com/asciidisco/web-conferences-2018">会议清单</a>，太赞了！</p>
<h2><a href="#Write-modules-that-directly-use-new-browser-APIs" title="Write modules that directly use new browser APIs"></a>直接使用新的浏览器API编写模块</h2>
<p><a href="https://medium.com/@mikeal">Mikeal</a>早在九月份发表了一篇文章<a href="https://medium.com/@mikeal/modern-modules-d99b6867b8f1">Modern Modules</a>。其中我最喜欢的一部分就是开始用浏览器API编写模块，如果需要的话在Node.js中加入polyfill。一个明显的优点就是可以将JavaSctip分割到更小的静态文件中发送给浏览器，能够明显提高页面高加载速度。另一方面没有人关心你的后端依赖是不是很重。</p>
<h2><a href="#Adopt-the-twelve-factor-app-principles" title="Adopt the twelve-factor app principles"></a>使用十二因素的应用原则</h2>
<p>十二因素应用宣言描述了如何开发web应用的最佳实践，今年它也出现在我的清单中。</p>
<p>随着越来越多的使用Kuberentes和其他协调引擎，遵守十二因素的应用原则越来越重要，他们覆盖了这些领域：</p>
<ol>
<li><p><a href="http://12factor.net/zh_cn/codebase">一份基准代码，多份部署</a></p>
</li>
<li><p><a href="http://12factor.net/zh_cn/dependencies">显式声明依赖关系</a></p>
</li>
<li><p><a href="http://12factor.net/zh_cn/config">在环境中存储配置</a></p>
</li>
<li><p><a href="http://12factor.net/zh_cn/backing-services">把后端服务当做附加资源</a></p>
</li>
<li><p><a href="http://12factor.net/zh_cn/build-release-run">严格分离构建和运行</a></p>
</li>
<li><p><a href="http://12factor.net/zh_cn/processes">以一个或多个无状态的进程运行应用</a></p>
</li>
<li><p><a href="http://12factor.net/zh_cn/port-binding">通过端口绑定提供服务</a></p>
</li>
<li><p><a href="http://12factor.net/zh_cn/concurrency">通过进程模型进行扩展</a></p>
</li>
<li><p><a href="http://12factor.net/zh_cn/disposability">快速启动和优雅退出可最大化健壮性</a></p>
</li>
<li><p><a href="http://12factor.net/zh_cn/dev-prod-parity">尽可能保持开发，预发布，线上环境相同</a></p>
</li>
<li><p><a href="http://12factor.net/zh_cn/logs">把日志当做事件流</a></p>
</li>
<li><p><a href="http://12factor.net/zh_cn/admin-processes">后台管理任务当作一次性进程运行</a></p>
</li>
</ol>
<h2><a href="#Learn-the-new-ECMAScript-features" title="Learn the new ECMAScript features"></a>学习新的ECMAScript特性</h2>
<p>一些特性能明显提升你的工作效率。它们能够让你写出不言自明的代码。下面这些是我最喜欢的（当然它们不是最新的特性了）：</p>
<ul>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator">展开语法</a></p>
</li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters">剩余参数</a></p>
</li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment">解构赋值</a></p>
</li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function">Async 函数</a></p>
</li>
</ul>
<p>如果你想详细的了解ECMAScript的新特性，我推荐你阅读这本书<a href="https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&amp;%20beyond/README.md#you-dont-know-js-es6--beyond">ES6 &amp; Beyond</a>。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js 最佳实践 —— 在2018年如何成为更优秀的Node.js开发者

## 原文链接
[https://www.zcfy.cc/article/node-js-best-practices-how-to-become-a-better-node-js-developer-in-2018](https://www.zcfy.cc/article/node-js-best-practices-how-to-become-a-better-node-js-developer-in-2018)


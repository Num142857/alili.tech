---
title: Tobias Koppers：我当初为什么写webpack
hidden: true
categories: [reprint]
slug: 3c853404
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>Tobias Koppers是一位自由软件开发者，家住德国纽伦堡。他因写出webpack这个已有数百万开发者使用的开源软件而名噪一时。他目前专注于JavaScript和开源项目。以下是我对他个人的专访，希望对大家有所启发。</p>
<p><strong>Gregor：你好，Tobias，JavaScript社区都在谈论webpack，就连谷歌也已经把它集成到了自己的Angular CLI项目中了。很高兴webpack诞生于纽伦堡，离我的老家英戈尔施塔特（德国）不远。跟我们分享一下，你当时怎么想起来写webpack的，它怎么那么快就受到了大家欢迎的？</strong></p>
<p><strong>Tobias：</strong>你好，Gregor。实际上，谷歌也在参与webpack的开发，只不过是间接参与。我在迷上JavaScript以前，也写过Java。谷歌曾经推出过一个工具，叫GWT（Google Web Toolkit），让Java程序员能用Java编写客户端应用。GWT其实是一个Java应用到JavaScript SPA的编译器，也使用了谷歌的一些应用。</p>
<p>GWT有一个功能我研究了很长时间，就是代码拆分（code splitting）。这个功能可以延迟加载不常用的代码。对于要保持初始加载速度的大型应用，这个功能非常重要。但我没发现JavaScript的开源工具（2012年）中哪个具备这个功能，于是我就想写一个这样的工具，也就是webpack。</p>
<p>换句话说，webpack诞生之初主要想解决代码拆分的问题。而在我看来，这也是webpack今天这么受欢迎的原因所在。随着Web应用越写越大，而移动设备越来越普及（但上网环境相对不好），拆分代码的需求与日俱增。如果不拆分代码，就很难实现期望的性能。</p>
<p><strong>Gregor：很多人拿webpack跟NPM脚本、Grunt和Gulp等进行比较。有人也确实通过webpack实现那些工具的功能。我以后也会使用NPM脚本和webpack。你对此怎么看，你除了webpack之外，还会用其他任务工具吗？</strong></p>
<p><strong>Tobias：</strong> NPM脚本对我而言足矣。实际上，说webpack是Grunt/Gulp的替代器并不完全准确。Grunt和Gulp以及NPM脚本都是任务执行程序。</p>
<p>Webpack是模块打包程序。这两类程序的目标不一样。但webpack简化了 必须“过度使用”Grunt和Gulp和NPM脚本才能实现的Web开发任务也是事实。NPM脚本才是Grunt和Gulp的替代品。</p>
<p>不过，除了纯粹的构建之外，任务运行程序也有存在的理由，比如部署、代码检查、版本管理，等等。</p>
<p><strong>Gregor：在我的JavaScript培训课上，很多学员都说webpack上手有多难多难。有没有也人跟说这么说过？如果有，你有没有想过怎么改进？</strong></p>
<p><strong>Tobias：</strong> 有，确实有这样的反馈。不过，也有不少用户在会用以后还这么说。而实际上webpack使用起来很简单。只要会写网页，都会觉得它比之前的工具容易使用。</p>
<p>我认为这些反馈主要是因为webpack的概念与其他工具的概念明显不一样，特别是在把Grunt/Gulp迁移到webpack时。任务运行程序的配置是指令式的，描述的是每一步要执行什么任务。而Webpack的配置则是声明式的，就是说不会描述webpack要执行的步骤，而只描述执行这些步骤的方式或执行后的结果是什么样的。</p>
<p><strong>Gregor： 你的开发日程是怎么安排的？下一个webpack的版本计划有什么功能？</strong></p>
<p><strong>Tobias：</strong> 现在还说不太好。很多事情都有可能，捡几个重要的说一下吧：</p>
<ul>
<li>作用域提升：连接模块的小却强大的方式</li>
<li>WebAssembly：支持Web应用中的二进制代码</li>
<li>持久缓存：更快的初段编译</li>
<li>CSS（还有HTML）作为一类公民：对样式表（和HTML）的更多支持</li>
<li>其他</li>
</ul>
<p>用户和赞助者决定实现这些功能的优先级。我建了一个投票页面，大家可以去投。所有人都可以表达自己的想法，但赞助者和志愿者的权重更大。因为他们需要一定的回报。用户当然希望多多益善。</p>
<p><strong>Gregor：能否推荐几个webpack最佳实践？</strong></p>
<p><strong>Tobias:</strong> 使用按需加载。非常简单，效果非常好。</p>
<p><strong>Gregor：你个人有什么目标吗？我们会不会很快在媒体上看到，说你去谷歌去山景城了？</strong></p>
<p><strong>Tobias：</strong> 我不这样想。我很快会成为一个自由职业者。我会把更多的时间放到开源上来，通过捐助实现财务平衡。因为捐赠通常不够，我会接一些工作或咨询来弥补缺口。我很想知道这样行不行。也许有人会成为我的赞助商，提供额外几个星期的赞助（听见了吗，谷歌）。</p>
<p>维护一个开源项目需要付出的努力超出常人想象。现在，代码评审和解决issuse占了我80%时间。我既没足够的时间写代码，也没时间重构。甚至一些合并请求我都得拖上一段时间才能处理。我需要花时间仔细看一看。当然，志愿者并不想如此。我想这种情况会变的，只要我全职写webpack就行了。但愿我能有更多时间写更多代码。</p>
<p><strong>Gregor：非常感谢你接受采访！也感谢webpack，感谢它对JavaScript开发者的大力支持。非常喜欢你这个工具！</strong></p>
<p><strong>Tobias：</strong> 不客气。我要感谢社区。Webpack并不是“我的”工具，它是500多位志愿者共同的成果。Webpacks成功也是源于这个伟大的生态。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/interview-with-webpack-founder-tobias-koppers](https://www.zcfy.cc/article/interview-with-webpack-founder-tobias-koppers)
原文标题: Tobias Koppers：我当初为什么写webpack
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

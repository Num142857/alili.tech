---
title: '【译】苹果拒绝支持PWA，有损Web的未来' 
date: 2019-01-06 2:30:10
hidden: true
slug: e37ocycp33e
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>作者：Greg Blass<br>翻译：疯狂的技术宅<br>说明：本文是美国的资深开发者 Greg Blass 针对对苹果公司的激烈吐槽，<br>英文原文：<a href="https://medium.com/philly-dev-shop/apples-refusal-to-support-progressive-web-apps-is-a-serious-detriment-to-future-of-the-web-e81b2be29676?from=timeline&amp;isappinstalled=0" rel="nofollow noreferrer" target="_blank">https://medium.com/philly-dev...</a></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVRPsZ?w=1600&amp;h=567" src="https://static.alili.tech/img/bVRPsZ?w=1600&amp;h=567" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>苹果移动端 Safari 就是新的 Internet Explorer</p>
<p>渐进式Web应用（Progressive Web Applications，简称 PWAs）是迄今为止在Web开发中最令人兴奋的创新技术之一。PWA 使你可以用 JavaScript 来创建一个“Service Worker”，它为你提供与原生应用相关联的各种功能，例如推送通知，离线支持和应用的加载屏幕 —— 这一切可都是基于Web的！这真是极好的。</p>
<p>不过还有一个主要问题 —— 虽然谷歌已经接受并在 Android 版的 Chrome 浏览器添加了这一技术的支持，但是 Apple 却放弃了在 iOS 端的 Safari 浏览器中提供支持。他们所做的只是说“在考虑之中”，但是看上去却没有任何动作。</p>
<p>我一直在等待他们对PWA的支持，但是到目前为止一切都没有发生。由于人生苦短，我一直在学习React Native，这一点咱们稍后再说。</p>
<h1 id="articleHeader0">为什么原生应用是…在劫难逃的？！</h1>
<p>昨天我阅读了一篇特别大胆而且直言不讳的<a href="https://medium.com/javascript-scene/native-apps-are-doomed-ac397148a2c0" rel="nofollow noreferrer" target="_blank">文章</a>。在这篇文章中，作者陈述：</p>
<blockquote><p>从现在起，我将不再编写任何原生应用程序。我所有的应用都将会是渐进式 Web 应用。渐进式 Web 应用就是 Web 应用，一种在移动设备上比原生应用能够无缝工作的Web应用。</p></blockquote>
<p>我立刻想到，“既然他做出了如此大胆的声明，那么不用iOS吗，甚至永远也不会用？”</p>
<blockquote><p><a href="https://techcrunch.com/2016/08/18/gartner-androids-smartphone-marketshare-hit-86-2-in-q2/" rel="nofollow noreferrer" target="_blank">目前 Android 占有全球移动操作系统市场 86% 的份额。</a></p></blockquote>
<p>这是一个很高的比例，但前提是你要为全球市场开发应用程序——至少我不是，而且大多数美国人可能也不是这样的。这个数字很可能是由于人口众多的国家或贫困率较高的国家而造成的。</p>
<p>我_最近_完成的一个应用是为美国内科和消费者报告委员会开发的。我们对医生们进行了统计，其中80%以上的人使用iOS，大约45%的人说，离线支持对他们来说是有用的，因为他们在的办公室里没有可靠的无线连接。我本来很想开发一个PWA，但是由于这种使用iOS的比例，导致不可行，所以我们就React Native(这是一个了不起的决定)。</p>
<h1 id="articleHeader1">谷歌的PWA基线是一个笑话</h1>
<p>我最近还在 stack overflow 看到一个帖子，该帖还试图声称苹果不支持PWA其实也并不那么糟糕。作者认为Google已经建立了一个PWA的基线清单，并且其中的许多功能在移动版的 Safari 上也是支持的:</p>
<ul>
<li><p>站点通过HTTPS提供服务</p></li>
<li><p>页面对平板电脑和移动设备的响应</p></li>
<li><p>起始网址在离线时加载（在iOS上做不到）</p></li>
<li><p>提供添加到主屏幕的元数据</p></li>
<li><p>首次加载很快甚至在3G环境</p></li>
<li><p>网站跨浏览器</p></li>
<li><p>页面过渡不会被网络阻塞</p></li>
<li><p>每个页面都有一个URL</p></li>
</ul>
<blockquote><p>这是认真的吗？ 这不是在定义一个渐进式 Web 应用。这是定义一个标准的响应式 Web 应用，这在在相当长的时间里已经可行了。</p></blockquote>
<p>Service workers 可以使你在PWA配合下做出所有令人惊叹和激动人心的事情，由于移动版 Safari 缺乏对他们的支持，有效地干掉了PWA为一半美国用户工作的能力——这反过来又扼杀了他们统一的可能性。</p>
<p>以下功能是你无法在移动版 safari 上做的事情，因为苹果拒绝支持它们:</p>
<ul>
<li><p>创建应用程序加载屏幕</p></li>
<li><p>使用推送通知</p></li>
<li><p>添加离线支持</p></li>
<li><p>创建一个初始的应用程序UI来实现即时加载</p></li>
<li><p>通过浏览器引导对话框，提示安装到主屏幕</p></li>
</ul>
<h1 id="articleHeader2">苹果的“全屏”模式充满了漏洞</h1>
<p>我尽可能地在试着在移动端 safari 中推广苹果的“类原生”体验——但它有一些严重的漏洞，而苹果公司根本不关心它们。他们不但忽略了我的bug报告(在我提交它们的几个月内都没有任何回复，并被标记为“重复”)，并且忽略了公共开发者论坛上所有关于它们的帖子。</p>
<p>我在移动版 Safari 的“全屏”或“Web应用”模式中发现的一些bug包括：</p>
<ul>
<li><p>加载屏幕不起作用（恶劣——<a href="https://forums.developer.apple.com/thread/23924" rel="nofollow noreferrer" target="_blank">已经超过18000次点击，没有得到苹果的回应</a> ）。</p></li>
<li><p>固定标题闪烁（我最大的心病，这就是为什么我最终在<a href="http://brewlog.com" rel="nofollow noreferrer" target="_blank">自己的产品</a> 上禁用它的原因）</p></li>
<li><p>300ms 延迟后终于从移动版 Safari 中移除，却没有在全屏模式下移除（<a href="https://forums.developer.apple.com/thread/43415" rel="nofollow noreferrer" target="_blank">Apple没有回应。</a></p></li>
</ul>
<p>我永远不会忘记自己是怎样花费大量的时间来实现这些特性，这些特性被清楚地记录下来(<a href="https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html" rel="nofollow noreferrer" target="_blank">现在仍然如此</a>，直到最后才意识到它们实际上并没有在iOS的后续版本中起作用。</p>
<p>苹果在开发者论坛上的回应？毛也没有！文字版的无线电静默。这是我在处理早期版本的IE浏览器之后遇到的最令人沮丧的事情之一。 而且很容易找出原因：</p>
<p><strong>苹果对待Web应用就像二等公民一样，因为它们不会在 app store 中像原生应用那样赚钱</strong>。</p>
<p>必须明确告诉用户如何将你的应用程序添加到主屏幕上，这是一件可怕的事情。事实上，在做了几次之后，我就放弃了，因为这让你的应用看起来更像一个品质低劣的产品。</p>
<h1 id="articleHeader3">Cordova 怎么样？</h1>
<p>你觉得呢？我对它从不感冒。这感觉就像是把我的应用运行在一个 webview/native 包装器上一样。我曾经尝试学习并使用 Ionic/Angular，但始终对它没有什么感觉。当看到那些在 Ionic 生态体系中花费时间的开发公司时，我觉得他们可能搭错了车。（说句良心话, 在几年前还没有 React Native 这个选择）</p>
<p>一旦引入了一个包装器，你仍然需要通过 app store发布自己的应用。你仍然需要参与苹果的游戏，需要支付100美元才能进入苹果应用商店，还包括30%的税——然而你仍然只只是运行在webview中。</p>
<h1 id="articleHeader4">React Native 来救急</h1>
<p>不过，你还有另外一种选择，这是一个令人惊喜的选择，来自于 Facebook 的工程师们:React Native。</p>
<p>作为一个开发人员，你要做的最重要的事情之一就是：决定把自己的时间用在哪里，所以在这里我就不建议你学 React Native 了。不过它已经为我带来了许多新的职业机会，还有与聪明和成功人士交谈的机会。</p>
<p>在最近的6个月里，我一直在为了完成最近这个客户的<a href="https://itunes.apple.com/us/app/choosing-wisely/id1261156577" rel="nofollow noreferrer" target="_blank">项目</a>而学习并使用它，这绝对是不可思议的。学习 Angular 的感觉就像是我在与语言抗争，而 React 却使我能够立即上手。我还从来没有这么兴奋过……嗯，实际上，也从来没有过，而且支撑它的社区真的很棒。navigation 是流畅的，和原生的意义，整个应用的感觉就像一个真正的iOS应用——因为它是一个整体。</p>
<p>我认为，将来我们将会看到 PWA 和 React Native 都会有很好的发展前景。</p>
<h1 id="articleHeader5">苹果的方式</h1>
<p>苹果认为你应该学习一种完全不同和更复杂的编程语言（Objective-C / Swift），并为iOS维护完全独立的代码库。这实际上伤害了小型开发商，扼杀了创新，使创业公司的更加难走。</p>
<p><strong>初创公司和小型开发商应该集中精力学习苹果特有的编程语言，忽视（或最好延迟）Android版本的发布，这种毫无底线的想法简直是荒谬至极。</strong></p>
<p>需要说明的是，即使是我刚刚发泄完之后 —— 我并不是反苹果的一切。我每天都会使用iPhone并且在 MacBook Pro 上开发。我仍然认为实用他们的产品是一种享受，永远也不会回到使用 PC/Windows 的状态。</p>
<p>我也并不认为大多数的苹果公司员工都在故意忽视这一点:</p>
<p><strong>可能会有一些高层或董事会成员告诉大家，不要把时间浪费在不符合应用商店盈利模式的技术上。</strong></p>
<p>这仅仅是资本主义特色吗？只是谋求他们自己的好处吗？不！苹果是<a href="https://www.theguardian.com/technology/2017/may/10/apple-becomes-first-company-worth-800bn" rel="nofollow noreferrer" target="_blank">最最肮脏的</a>。我还没有看到苹果对这篇文章的任何回应，我甚至怀疑它会很快发生。这篇文章不会改变他们的想法，但我希望它能鼓励人们讨论这个话题，并能够帮助传播。</p>
<p>但有一件事是肯定的:我们不能一跳上PWA的火车，就把原生应用完全仍在脑后。<strong>还记得我们把这种行为称作什么吗——有损Web的未来。</strong></p>
<p><strong> 欢迎扫描二维码关注公众号，每天推送我翻译的技术文章。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVRyYe?w=430&amp;h=430" src="https://static.alili.tech/img/bVRyYe?w=430&amp;h=430" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】苹果拒绝支持PWA，有损Web的未来

## 原文链接
[https://segmentfault.com/a/1190000010407024](https://segmentfault.com/a/1190000010407024)


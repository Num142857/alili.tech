---
title: 'Weex小册—认识一下Weex' 
date: 2018-12-05 2:30:09
hidden: true
slug: j4s26s2adw
categories: [reprint]
---

{{< raw >}}

                    
<h4>Weex介绍</h4>
<blockquote><a href="http://weex.apache.org/cn/guide/" rel="nofollow noreferrer" target="_blank">Weex 是一个使用 Web 开发体验来开发高性能原生应用的框架。</a></blockquote>
<p>看了这句话依然不是很明白，哈哈~</p>
<p>其实就是说，weex对前端开发人员特别友好，用开发web的方式写一个页面，然后可以打包成适配三端的js——“使用同一套代码来构建 Android、iOS 和 Web 应用” 、“write once, run everywhere”。</p>
<p><span class="img-wrap"><img data-src="/img/bV8x9x?w=721&amp;h=280" src="https://static.alili.tech/img/bV8x9x?w=721&amp;h=280" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>由于weex集成了v2版本的vue（并不是依赖vue，在weex中也可以写React），我们就以.vue文件来说一下weex的开发流程：</p>
<ol>
<li>使用weex支持的标签以及css样式规则（戏称为w3c“阉割版”的css）编写vue页面</li>
<li>Web：使用 <code>vue-loader</code> 处理 <code>.vue</code> 文件，生成对应web端的js；<br>  Native：使用 <code>weex-loader</code> 处理 <code>.vue</code> 文件，生成对应native端的js</li>
<li>Web：像正常做前端SPA项目一样，html骨架+打包出来的web.js+weex-vue-render.js（Vue DSL 的 Web 渲染器，它在 Web 上实现了 Weex 的内置组件和内置模块），Web端的页面就展示出来了；<br>Native：引入WeexSDK，做对应的初始化，然后把打包出来的weex.js本地引入或以CDN在线方式引入，Native端的页面就展示出来了</li>
</ol>
<p>可以看出，相对于传统做法——同一个页面，需要前端工程师、iOS工程师、Android工程师分别写一套代码，使用weex则无疑大大提升了研发效率。</p>
<h4>Weex的使用情况</h4>
<p>weex最开始是阿里的一个开源产品，后期捐赠给了Apache基金会开始孵化，所以，weex已经渐渐成为了社区的weex，而不仅仅是阿里的weex。虽然，weex最大的应用、实践仍是在阿里，特别是像双十一这种“技术大阅兵”，但是，其他企业也在慢慢加入到weex实践、贡献的行列，weex势必发展越来越好。分享几篇weex实战文章，来自 WeexConf2018：<br><a href="https://mp.weixin.qq.com/s/-HJ42j4AZDZ0ZSo4zHuBAA" rel="nofollow noreferrer" target="_blank">Weex实战分享|腾讯企鹅电竞Weex实践和性能优化</a><br><a href="https://mp.weixin.qq.com/s/atEbHaiu60MjDirAOAiNqQ" rel="nofollow noreferrer" target="_blank">Weex实战分享|Weex在极客时间APP中的实践</a><br><a href="https://mp.weixin.qq.com/s/XSCaxW_Dg67pa4vI1LZBFg" rel="nofollow noreferrer" target="_blank">Weex实战分享|Weex在盛大游戏中的应用实践</a><br>更多相关的技术分享，可以关注“淘宝技术”微信公众号。</p>
<p>因为weex开发文档确实不尽如人意，导致很多人跟着跟着就弃坑了……想尝试的开发者看着网上各种吐槽的负面声音，有时候也就没有了前行的动力。</p>
<p>其实，我个人感觉，不管别人怎么吐槽，开发者应该有自己的判断：weex为什么会出现？它有没有带来开发效率上的提升？如果有，说明这项技术还是很有价值的，更何况现在越来越多的企业、开发者都在实践weex，大可放心使用。</p>
<h4>Weex入门实践</h4>
<p>官方提供的有<a href="https://github.com/weexteam/weex-toolkit" rel="nofollow noreferrer" target="_blank">weex-toolkit</a>脚手架工具，可以快速构建一个weex项目。但是我个人学习习惯不是这样的，刚接触一项新技术，什么都被封装好了，总感觉是云里雾里。我喜欢以自己现有的前端知识做基础，探索怎么一步一步地去构建一个weex项目，这样下来，既能明了weex的开发流程，又能对整个项目有很强的把控——这样很有安全感，哈哈~</p>
<p>接下来我会写几篇weex相关的文章，大致内容如下：<br><a href="https://segmentfault.com/a/1190000014471888">Weex小册——从0搭建一个Weex项目</a><br>Weex小册——Weex开发注意事项，又名采坑-填坑之旅<br>Weex小册——集成Weex到App<br>Weex小册——使用Weex开发一个App<br>有兴趣的可以关注下，看看是否能给你带来不一样的Weex开发体验！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Weex小册—认识一下Weex

## 原文链接
[https://segmentfault.com/a/1190000014401052](https://segmentfault.com/a/1190000014401052)


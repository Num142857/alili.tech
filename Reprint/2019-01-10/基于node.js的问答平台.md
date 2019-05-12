---
title: '基于node.js的问答平台' 
date: 2019-01-10 2:30:08
hidden: true
slug: urwwh0ppoj
categories: [reprint]
---

{{< raw >}}

                    
<p>其实我回来就应该先写这个的，但是一直不想动，懒功回家又发作了?，还有想做全栈的话真的真的会很累。脑子会不够用！</p>
<h3 id="articleHeader0">前面的话</h3>
<ul>
<li><p>这个项目是我的毕业设计，手工打造，项目做得不好也比较简单，但主要是对自己所学的知识的一次运用，这个系统的后台，别拿来用，主要是当时时间紧凑，我又不想直接拿别人的模板用，所以正在很短的时间内写出来的，各种问题都存在。主要还是看面向用户的那些界面和功能吧。</p></li>
<li><p>这个项目有一个很明显的问题，在用户没有登录到系统的时候看问题会报错。主要原因是为了设计用户的用户具有编辑和删除功能，如果是其他的用户进入到这个问题的详情页，判断是否是发表者，如果不是就看不到这两个按钮。</p></li>
<li><p>下面开始说说项目吧！</p></li>
</ul>
<h3 id="articleHeader1">登录注册</h3>
<ul><li><p>登录注册页面写的还算不错，也就是这个系统唯一的亮点吧！其他的什么也不是。<br><span class="img-wrap"><img data-src="/img/remote/1460000010019346" src="https://static.alili.tech/img/remote/1460000010019346" alt="登录" title="登录" style="cursor: pointer; display: inline;"></span></p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010019347" src="https://static.alili.tech/img/remote/1460000010019347" alt="注册" title="注册" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">首页</h3>
<ul><li><p>首页很想重构，特别想做成segmentfault那样的，感觉segmentfault做得是挺棒的，不过那是PHP实现的，想做一个node.js的。不过页面的UI调整的，在我个人看来还是挺好的。<br><span class="img-wrap"><img data-src="/img/remote/1460000010019348" src="https://static.alili.tech/img/remote/1460000010019348" alt="主页" title="主页" style="cursor: pointer; display: inline;"></span></p></li></ul>
<h3 id="articleHeader3">发表历史</h3>
<p>这个是仿照segmentfault实现的，但是样式还没有调成segmentfault那样的。不过功能算是实现了。 <br><span class="img-wrap"><img data-src="/img/remote/1460000010019349" src="https://static.alili.tech/img/remote/1460000010019349" alt="发现" title="发现" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">发表页面</h3>
<ul><li><p>这是个败笔，因为自己的想法是引入一个MarkDown语法规则的问题描述框。但是没有找到自己想要的那种MarkDown的描述框（此处省略很多字，主要原因是自己对这个要求太高了，开源的有达不到自己的要求。所以干脆直接没用了。） <br><span class="img-wrap"><img data-src="/img/remote/1460000010019350" src="https://static.alili.tech/img/remote/1460000010019350" alt="提问" title="提问" style="cursor: pointer; display: inline;"></span></p></li></ul>
<h3 id="articleHeader5">其他的一些页面就不一一介绍了，风格基本类似于segmentfault。</h3>
<h3 id="articleHeader6">自我批判</h3>
<ul>
<li><p>充分的诠释了什么叫“概念范冰冰，量产罗玉凤。”，自己想的跟实际做起来差别太大了。传说中的眼高手低就是这种情况。</p></li>
<li><p>自己一个人做项目，考虑的方面太少。根本达不到线上哪些项目的要求。</p></li>
<li><p>解决方案投票功能开发失败，很伤心。（水平不够）</p></li>
<li><p>开发不考虑超级用户管理的问题，还好导师提出来了，这点非常感谢我的导师。</p></li>
<li><p>归根结底一个字总结自己——菜~</p></li>
</ul>
<h3 id="articleHeader7">最后</h3>
<ul>
<li><p>论文和查重报告都贴出来了。以后你们做node.js项目的毕业设计的话可以参考参考，真的别抄。查重是一件很烦的事情。</p></li>
<li><p>项目地址：<a href="https://github.com/AlfieriChou/QA-platform" rel="nofollow noreferrer" target="_blank">https://github.com/AlfieriCho...</a></p></li>
<li><p>欢迎各位兄弟姐妹赏个star~</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于node.js的问答平台

## 原文链接
[https://segmentfault.com/a/1190000010023429](https://segmentfault.com/a/1190000010023429)


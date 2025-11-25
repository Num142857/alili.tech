---
title: '基于React的仿QQ音乐（移动端）' 
date: 2018-12-30 2:30:10
hidden: true
slug: 56b76i2donf
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>由于这段时间工作上也是挺忙的，就没有时间去写这个项目，中间一直都是写写停停，进度也是非常慢的。正好前几天都还比较空，就赶紧抓着空闲时间去写这个项目，最后紧赶慢赶地完成了。本项目采用了React的框架，可以帮助那些想学习React的同学们去深入学习React的项目的开发。写这个项目过程也是非常辛苦的，如果你觉得我写的还不错的话，麻烦各位给我一个收藏或者点赞，也或者去github上给我点个星，来当做对我的鼓励。不胜感激！</p>
<h1 id="articleHeader1">源码地址</h1>
<p><a href="https://github.com/ruichengping/react-mobile-qqMusic" rel="nofollow noreferrer" target="_blank">https://github.com/ruichengpi...</a></p>
<h1 id="articleHeader2">演示地址</h1>
<p><a href="https://ruichengping.github.io/react-mobile-qqMusic-demo/" rel="nofollow noreferrer" target="_blank">https://ruichengping.github.i...</a></p>
<h1 id="articleHeader3">技术栈</h1>
<ol>
<li>react</li>
<li>react-router</li>
<li>react-redux</li>
<li>es6</li>
<li>axios</li>
<li>webpack</li>
</ol>
<h1 id="articleHeader4">已实现功能</h1>
<h2 id="articleHeader5">Tab-我的</h2>
<p><span class="img-wrap"><img data-src="/img/bVVCk9?w=660&amp;h=1174" src="https://static.alili.tech/img/bVVCk9?w=660&amp;h=1174" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">Tab-音乐馆</h2>
<p><span class="img-wrap"><img data-src="/img/bVVClw?w=662&amp;h=1182" src="https://static.alili.tech/img/bVVClw?w=662&amp;h=1182" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">Tab-发现</h2>
<p><span class="img-wrap"><img data-src="/img/bVVClz?w=660&amp;h=1174" src="https://static.alili.tech/img/bVVClz?w=660&amp;h=1174" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">侧滑栏</h2>
<p><span class="img-wrap"><img data-src="/img/bVVClH?w=660&amp;h=1176" src="https://static.alili.tech/img/bVVClH?w=660&amp;h=1176" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">播放列表</h2>
<p><span class="img-wrap"><img data-src="/img/bVVCmT?w=660&amp;h=1174" src="https://static.alili.tech/img/bVVCmT?w=660&amp;h=1174" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader10">播放器</h2>
<p><span class="img-wrap"><img data-src="/img/bVVClM?w=662&amp;h=1170" src="https://static.alili.tech/img/bVVClM?w=662&amp;h=1170" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVVCl4?w=664&amp;h=1174" src="https://static.alili.tech/img/bVVCl4?w=664&amp;h=1174" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader11">歌曲搜索</h2>
<p><span class="img-wrap"><img data-src="/img/bVVCl7?w=662&amp;h=1174" src="https://static.alili.tech/img/bVVCl7?w=662&amp;h=1174" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVVCmi?w=654&amp;h=1174" src="https://static.alili.tech/img/bVVCmi?w=654&amp;h=1174" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader12">歌单管理</h2>
<p><span class="img-wrap"><img data-src="/img/bVVCmA?w=660&amp;h=1180" src="https://static.alili.tech/img/bVVCmA?w=660&amp;h=1180" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVVCmM?w=660&amp;h=1176" src="https://static.alili.tech/img/bVVCmM?w=660&amp;h=1176" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader13">项目总结</h1>
<p>整个项目采用了React这个框架来构建，之前我都是用Vue用做开发的。正好借此机会做一个小小的对比，纯是个人使用的心得体会。如果你也有一些不一样的心得交流的话，欢迎交流。</p>
<ol>
<li>React相比Vue给我感受最深的就是他的优雅的组件化，用起来是非常爽，谁用谁知道，引用即可使用。而Vue在这块相对来说就要弱一点，引用了组件之后还要注册一下。当然这不是决定React组件化优于Vue决定性因素，更重要的Vue的模板语法以及它下面那套指令系统。相信用过的小伙伴们知道，Vue的template里面出现语法错误，追踪起来很费时费力的，很难定位到问题。另外这套指令系统在多人共同维护的大型项目中弊端很大，层层的指令嵌套使得代码阅读起来晦涩难懂，维护起来异常麻烦。而React在这上面给我感觉就好很多，代码可读性也非常高。</li>
<li>Vue在双向数据绑定的体验上要优于React的，React采用的是Flux的单向数据流动。这在实现一些需要双向数据交互的功能上，Vue是占有优势的。</li>
<li>Vue相比React更加轻量级。Vue只需要引用一个Vue.js即可使用，而React则要引用React.js、React-dom.js、babel.js(用于转换jsx的语法)。</li>
<li>Vue在上手程度上要优于React。Vue学习成本很低，另外官方有比较完善的中文文档。而React官方则只有英文文档，另外学习成本也比较高。我见到网上某人喷只会Vue的是前端小白，我对这种人只能报以呵呵。简单本身是没有错误，一个东西能以简单的方式解决难道不好吗？关于这个中文文档居然还有人喷那些喜欢用Vue的是不是英文能力差，我就再报以呵呵一笑。本身拥有中文文档就是一个优势，结果还成了被喷的地方。首先，并不是所有人的英文能力都跟某些嘴炮大神那么牛逼的。其次，就算是英文能力牛逼的人，你敢说你阅读中文的能力会比你阅读英文能力差？</li>
<li>我个人感觉Vue的全家桶（不包括Vue）使用起来，我个人感觉是要比React的全家桶（不包括React）使用起来舒服的。</li>
<li>虽然Vue在一些细节上要比React好，但是不能觉得React就比Vue差。这种想法是错误。特别是大型应用上，使用React项目维护起来肯定是要比Vue要好的。当然这不代表Vue不能构建大型应用。</li>
<li>React在社区生态建设上是比Vue好很多的，而且后面站着FaceBook。不怕遇到问题没人可以帮你解决的情况，而Vue的话就要稍微担心一下。</li>
</ol>
<blockquote>最后强调一下：React和Vue都是非常棒的前端框架，建议大家都去学习一下。采用React或者是Vue还是要结合业务场景和现实情况做选择的。单纯说React还是Vue好，我个人觉得都是耍流氓。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于React的仿QQ音乐（移动端）

## 原文链接
[https://segmentfault.com/a/1190000011310457](https://segmentfault.com/a/1190000011310457)


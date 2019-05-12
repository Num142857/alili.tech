---
title: '结合Vue.js的前端压缩图片方案' 
date: 2019-02-01 2:30:10
hidden: true
slug: on69wfbsuqd
categories: [reprint]
---

{{< raw >}}

                    
<p>这是一个很简单的方案。嗯，是真的。</p>
<h2 id="articleHeader0">为什么要这么做？</h2>
<p>在移动Web蓬勃发展的今天，有太多太多的应用需要让用户在移动Web上传图片文件了，正因如此，我们有些困难必须去攻克：</p>
<ol>
<li><p>低网速下上传进度缓慢，用户体验差</p></li>
<li><p>高并发下，后台处理较大的上传文件压力大</p></li>
<li><p>或许有更多...</p></li>
</ol>
<p>在攻克上面的一些困难时，我们也可以给自己一些疑问：</p>
<ol>
<li><p>真的有必要保存用户上传的原图吗？</p></li>
<li><p>用户还能等多久？</p></li>
<li><p>或许还有更多...</p></li>
</ol>
<p>结合上面的一些困难和疑问，再结合我们实际的案例，我们或许可以这样做 —— 在用户上传图片时，图片被提交到后台之前，就对图片进行压缩处理。图片文件大小减小后，上传速度自然会提升，在同样的并发下，后台处理的速度也会得到提升，用户体验得到提升。</p>
<p>有童鞋可能会说，为什么不使用一些主流CDN的表单功能，直接把文件上传到CDN去？当然，完全可以选择那种方案，我只是在众多的方案中选择了一个来用而已，又或者说这是程序员的天性？</p>
<h2 id="articleHeader1">准备</h2>
<p>上面已经说了 “在用户上传图片时，图片被提交到后台之前，就对图片进行压缩处理。”，那我们马上准备下各种工具吧：</p>
<ol>
<li><p><a href="https://github.com/think2011/localResizeIMG" rel="nofollow noreferrer" target="_blank">localResizeIMG</a>（核心，用于在前端对图片进行压缩）</p></li>
<li><p><a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">Vue.js</a>（处理前端的数据，展现逻辑）</p></li>
<li><p><a href="https://github.com/twbs/bootstrap" rel="nofollow noreferrer" target="_blank">Bootstrap</a>（还要我多说？）</p></li>
</ol>
<h2 id="articleHeader2">怎么做？</h2>
<ol>
<li><p>上传项目变更后，使用localResizeIMG进行压缩</p></li>
<li><p>把数据通过自己期望的方式提交到后台</p></li>
</ol>
<p>localResizeIMG在调用时，就可以指定压缩后图片的宽度高度以及质量（<a href="https://github.com/think2011/localResizeIMG/wiki/2.-%E5%8F%82%E6%95%B0%E6%96%87%E6%A1%A3" rel="nofollow noreferrer" target="_blank">详细参考文档</a>），至于要怎么把数据提交到后台，可以参考该库的wiki中提到的<a href="https://github.com/think2011/localResizeIMG/wiki/1.-%E5%90%8E%E7%AB%AF%E5%A4%84%E7%90%86" rel="nofollow noreferrer" target="_blank">方案</a>，一切都很简单。</p>
<p><strong><a href="http://dc.majiawei.com/local-resize-img-with-vue/index.html" rel="nofollow noreferrer" target="_blank">演示地址</a></strong><br><strong><a href="https://github.com/jwma/daily-coding/tree/master/local-resize-img-with-vue" rel="nofollow noreferrer" target="_blank">这个例子的仓库地址</a></strong></p>
<p>本文的解决方法并不是唯一，也不一定是最好，在使用相关的框架/库时遇到的问题，可以去相应的Github仓库查看issue或者wiki。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
结合Vue.js的前端压缩图片方案

## 原文链接
[https://segmentfault.com/a/1190000007343788](https://segmentfault.com/a/1190000007343788)


---
title: '使用Easy Mock构建模拟数据' 
date: 2018-12-26 2:30:13
hidden: true
slug: hffja9befw4
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在学前端与后端相结合，在写前端页面的时候，需要从后台取数据，对页面进行更新。但苦于后台还没有写，并没有数据，因此就学习了如何用EasyMock构建模拟数据。</p>
<h2 id="articleHeader0">Easy Mock简介</h2>
<p>Easy Mock 是一个可视化，并且能快速生成 拟数据的持久化服务，将模拟数据直接写进代码里，能利用 JavaScript 拦截请求，利用 Charles、 Fiddler 等代理工具拦截请求。<br>伪造数据，能让程序的编写更高效。使用也较为简单。</p>
<h2 id="articleHeader1">使用Easy Mock创建一个项目</h2>
<h3 id="articleHeader2">第一步：点击右下角的蓝色加号按钮</h3>
<p>不管你在哪，页面右下角总是会有一个创建项目的蓝色按钮<br><span class="img-wrap"><img data-src="/img/bVYuK7?w=1348&amp;h=638" src="https://static.alili.tech/img/bVYuK7?w=1348&amp;h=638" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">第二步：创建项目</h2>
<p>补全空格中的信息<br>如果是团队项目，要记得选团队<br>补全项目名和项目基础URL。这一部分没有严格的要求，尽量简洁就好。<br><span class="img-wrap"><img data-src="/img/bVYuMT?w=517&amp;h=562" src="https://static.alili.tech/img/bVYuMT?w=517&amp;h=562" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>填完空以后，选择创建</p>
<h2 id="articleHeader4">第三步：添加数据</h2>
<p>选中刚才创建的项目，点击创建接口，就能进入信息编写的部分。<br><span class="img-wrap"><img data-src="/img/bVYuOa?w=1366&amp;h=637" src="https://static.alili.tech/img/bVYuOa?w=1366&amp;h=637" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>数据输入完毕后，要为你的这个接口写一个专属的URL，在右边的蓝色方框中，并对数据进行描述。点击创建，就创建成功了。</p>
<h2 id="articleHeader5">第四步：获取数据</h2>
<p>接口创建成功后，选择操作选项的复制链接，就能获得这个接口的地址。<br><span class="img-wrap"><img data-src="/img/bVYuPn?w=990&amp;h=195" src="https://static.alili.tech/img/bVYuPn?w=990&amp;h=195" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">第五步：前台获取模拟数据</h2>
<p>模拟数据已经成功创建完毕，那么接下来我们就看看如何在前端页面获取创建的模拟数据把。<br><span class="img-wrap"><img data-src="/img/bVYuRu?w=845&amp;h=102" src="https://static.alili.tech/img/bVYuRu?w=845&amp;h=102" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>链接就是我们上一步选择复制链接所获得的接口地址。<br><span class="img-wrap"><img data-src="/img/bVYuRV?w=1003&amp;h=250" src="https://static.alili.tech/img/bVYuRV?w=1003&amp;h=250" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>这样，我们就获得了我们创建的虚拟数据。<br><br><br>当然，Easy Mock还有很多进阶用法，以后一起学习吧。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Easy Mock构建模拟数据

## 原文链接
[https://segmentfault.com/a/1190000011996034](https://segmentfault.com/a/1190000011996034)


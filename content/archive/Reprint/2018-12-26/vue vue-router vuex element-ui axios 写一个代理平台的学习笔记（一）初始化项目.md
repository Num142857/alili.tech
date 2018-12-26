---
title: 'vue vue-router vuex element-ui axios 写一个代理平台的学习笔记（一）初始化项目' 
date: 2018-12-26 2:30:14
hidden: true
slug: 3tc5523kr2m
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">创建项目 learn</h3>
<p>直接在工作空间下用vue-cli来创建<br><code>vue init webpack learn</code><br><span class="img-wrap"><img data-src="/img/remote/1460000011966103?w=692&amp;h=162" src="https://static.alili.tech/img/remote/1460000011966103?w=692&amp;h=162" alt="Image 001.png" title="Image 001.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">安装依赖</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011966104?w=732&amp;h=268" src="https://static.alili.tech/img/remote/1460000011966104?w=732&amp;h=268" alt="Image 002.png" title="Image 002.png" style="cursor: pointer; display: inline;"></span><br>执行<br><code>cnpm i</code><br><code>cnpm run dev</code></p>
<p>成功的话讲出现这个画面<br><span class="img-wrap"><img data-src="/img/remote/1460000011966105?w=536&amp;h=502" src="https://static.alili.tech/img/remote/1460000011966105?w=536&amp;h=502" alt="Image 003.png" title="Image 003.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">正式开始写项目</h3>
<p>1、首先修改项目结构<br>  目前的结构<span class="img-wrap"><img data-src="/img/remote/1460000011966106?w=212&amp;h=433" src="https://static.alili.tech/img/remote/1460000011966106?w=212&amp;h=433" alt="Image 004.png" title="Image 004.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>新建一个vuex文件夹，用来管理部分状态，比如 <strong>登录</strong></p></li></ul>
<p>里面新建一个store.js</p>
<ul>
<li><p>新建一个api文件夹，用来写axios的请求借口,里面放一个api.js</p></li>
<li><p>新建一个data文件夹，用来存放或模拟数据，放一个data.js</p></li>
<li><p>里面放空内容就行</p></li>
</ul>
<p>现在的结构<span class="img-wrap"><img data-src="/img/remote/1460000011966107?w=205&amp;h=533" src="https://static.alili.tech/img/remote/1460000011966107?w=205&amp;h=533" alt="Image 005.png" title="Image 005.png" style="cursor: pointer; display: inline;"></span></p>
<p>2、在main.js里面引入vuex element等<br><span class="img-wrap"><img data-src="/img/remote/1460000011966108" src="https://static.alili.tech/img/remote/1460000011966108" alt="Image 006.png" title="Image 006.png" style="cursor: pointer; display: inline;"></span></p>
<p>3、修改App.vue文件代码，确认element是否引入成功<br>代码<span class="img-wrap"><img data-src="/img/remote/1460000011966109?w=686&amp;h=670" src="https://static.alili.tech/img/remote/1460000011966109?w=686&amp;h=670" alt="Image 007.png" title="Image 007.png" style="cursor: pointer; display: inline;"></span><br>输出：<span class="img-wrap"><img data-src="/img/remote/1460000011966110?w=561&amp;h=467" src="https://static.alili.tech/img/remote/1460000011966110?w=561&amp;h=467" alt="Image 008.png" title="Image 008.png" style="cursor: pointer; display: inline;"></span><br>说明是没有问题的<br></p>
<hr>
<h2 id="articleHeader3">组件规划和写路由结构</h2>
<h3 id="articleHeader4">预想中要实现的功能：</h3>
<ul>
<li><p>主页  home</p></li>
<li><p>商品展示  products</p></li>
<li><p>使用帮助  FAQ</p></li>
<li>
<p>用户操作 manger</p>
<ul>
<li><p>用户信息 manger/my</p></li>
<li><p>发货管理 manger/send</p></li>
<li><p>历史发货 manger/history</p></li>
</ul>
</li>
<li><p>登录 login</p></li>
<li><p>注册 regin</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue vue-router vuex element-ui axios 写一个代理平台的学习笔记（一）初始化项目

## 原文链接
[https://segmentfault.com/a/1190000011966098](https://segmentfault.com/a/1190000011966098)


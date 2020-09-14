---
title: 'Vue.js+express建站' 
date: 2019-01-26 2:30:18
hidden: true
slug: k7nur8ivpa
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">网站基本架构：</h1>
<p>基本的CS架构，开发时使用本地服务器，数据库使用云服务器的数据库，方便共享数据，上线时可配置服务器到云服务器。</p>
<p><span class="img-wrap"><img data-src="/img/bVJtAR?w=789&amp;h=561" src="https://static.alili.tech/img/bVJtAR?w=789&amp;h=561" alt="网站基本架构" title="网站基本架构" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1">技术栈：</h1>
<h2 id="articleHeader2">Vue.js:</h2>
<h4>前端开发框架：响应式数据绑定和组件化开发（单页应用，用户管理系统）</h4>
<p>响应式实现页面数据和代码数据的自动同步更新，使开发可以简化为操作业务数据，跟视图层分离<br>组件化开发将页面不同功能的模块独立开发，使开发更加条理清晰和独立</p>
<h4>后端渲染：seo优化页面（网站主页，内容展示页）</h4>
<p>后端直接将数据写入html文件，然后将文件发送到前端，前端不用渲染数据，直接展示</p>
<h2 id="articleHeader3">node.js</h2>
<h4>javascript运行环境，是js代码可以运行于浏览器之外，即可编写服务器等功能</h4>
<p>node.js  运用大量异步调用回调，即非同步执行代码，代码非顺序执行，node使用npm管理包，即依赖的各种功能均可直接使用npm安装</p>
<h2 id="articleHeader4">express：</h2>
<h4>基于node.js后端框架，负责路由，业务逻辑，数据库操作，页面和数据响应</h4>
<p>即架构中的业务层，对前端的请求进行响应，需要数据库的拉取数据库内容，需要判断处理的返回处理结果，请求页面文件的返回html文件</p>
<h3 id="articleHeader5">学习链接：</h3>
<p><a href="http://www.runoob.com/nodejs/nodejs-tutorial.html" rel="nofollow noreferrer" target="_blank">node.js入门教程</a><br><a href="http://www.runoob.com/vue2/vue-tutorial.html" rel="nofollow noreferrer" target="_blank">vue入门教程</a><br><a href="https://vuefe.cn/v2/guide/" rel="nofollow noreferrer" target="_blank">vue2.0官方教程</a><br><a href="http://expressjs.com/zh-cn/guide/routing.html" rel="nofollow noreferrer" target="_blank">express官方教程</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js+express建站

## 原文链接
[https://segmentfault.com/a/1190000008416738](https://segmentfault.com/a/1190000008416738)


---
title: 'react+redux实现仿大众点评webapp' 
date: 2018-12-24 2:30:07
hidden: true
slug: opcnbumqcu
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">项目简介</h3>
<p>此项目是学习react+redux过程中跟着慕课网做的一个练手项目，模仿大众点评做的一个webapp，项目不是很复杂，适合有一定react+redux基础的同学参考。<br>慕课网地址：<a href="https://coding.imooc.com/class/99.html" rel="nofollow noreferrer" target="_blank">https://coding.imooc.com/clas...</a></p>
<p>项目的前端界面使用react+less编写，后端使用的express框架搭建，后台返回的数据全部是模拟的数据，不涉及数据库交互。</p>
<p>后续可能会再写一篇文章（看心情），讲解部分代码，如果项目对大家学习react有一点帮助，麻烦在clone的同时顺手给个<strong>☆star☆</strong></p>
<h3 id="articleHeader1">项目源码</h3>
<p>githup项目源码：<a href="https://github.com/wenyuntian/webapp" rel="nofollow noreferrer" target="_blank">https://github.com/wenyuntian...</a><br>使用git clone地址：git@github.com:wenyuntian/webapp.git</p>
<h3 id="articleHeader2">运行步骤</h3>
<p>1.clone到本地后，在项目文件夹的根目录和mock文件夹下面运行npm install命令安装项目依赖<br>2.接着在根目录和mock目录下运行命令npm start启动项目，在浏览器中访问<a href="http://localhost:3000/" rel="nofollow noreferrer" target="_blank">http://localhost:3000/</a>查看项目运行效果</p>
<h3 id="articleHeader3">最终效果展示</h3>
<p><span class="img-wrap"><img data-src="/img/bVZtvf?w=240&amp;h=427" src="https://static.alili.tech/img/bVZtvf?w=240&amp;h=427" alt="首页" title="首页" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVZtvs?w=240&amp;h=419" src="https://static.alili.tech/img/bVZtvs?w=240&amp;h=419" alt="搜索列表" title="搜索列表" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVZtvI?w=239&amp;h=421" src="https://static.alili.tech/img/bVZtvI?w=239&amp;h=421" alt="详情页面" title="详情页面" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVZtvU?w=242&amp;h=425" src="https://static.alili.tech/img/bVZtvU?w=242&amp;h=425" alt="登录页面" title="登录页面" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVZtv5?w=240&amp;h=423" src="https://static.alili.tech/img/bVZtv5?w=240&amp;h=423" alt="用户中心" title="用户中心" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVZtwb?w=240&amp;h=420" src="https://static.alili.tech/img/bVZtwb?w=240&amp;h=420" alt="城市选择页面" title="城市选择页面" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">涉及的知识点</h3>
<h4>前端：</h4>
<ol>
<li>
<strong>react：</strong>使用的<a href="https://segmentfault.com/a/1190000006055973">create-react-app</a>构建工具快速搭建的前端框架（需要在package.json配置跨域代理）。</li>
<li>
<strong>redux：</strong>使用redux管理react组件的状态，实现各组件之间的通信。</li>
<li>
<strong>axios：</strong>使用axios对get、post方法进行了简单的封装，用于前后端数据交互。</li>
<li>
<strong>localStorage：</strong>简单的了解了一下localStorage，封装了get和set方法，将城市选择的城市信息存储在localStorage中。</li>
<li>
<strong>less：</strong>使用less编写css样式。（注意：在create-react-app中默认不使用less，需要自行安装less-loader模块，并在webpack进行配置）</li>
<li>
<strong>图标：</strong>项目中使用到的所有图标都是从<a href="https://icomoon.io/" rel="nofollow noreferrer" target="_blank">icoMoon</a>上下载的（学习过程中发现的素材网站，很好用，推荐！）</li>
</ol>
<h4>后端：</h4>
<ol><li>后端使用express快速搭建的一个后台数据，为了简单没有链接数据库，所有的数据都是模拟的数据。</li></ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react+redux实现仿大众点评webapp

## 原文链接
[https://segmentfault.com/a/1190000012229153](https://segmentfault.com/a/1190000012229153)


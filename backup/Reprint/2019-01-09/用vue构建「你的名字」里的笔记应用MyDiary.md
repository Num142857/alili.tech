---
title: '用vue构建「你的名字」里的笔记应用MyDiary' 
date: 2019-01-09 2:30:12
hidden: true
slug: vhqjad5otd8
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">my-diary-vue &nbsp;</h1>
<p>github地址：<a href="https://github.com/ssshooter/MyDiary-Vue" rel="nofollow noreferrer" target="_blank">https://github.com/ssshooter/...</a><br><strong>不少不熟练的地方，请大家在issues提醒我</strong></p>
<h2 id="articleHeader1">简介</h2>
<p>这个应用出自一部（曾经）很火的动画电影，这个电影的水平还是和人气成正比的    <br>看电影的时候注意到这个日记应用，忍不住立刻<a href="https://github.com/ssshooter/MyDiary" rel="nofollow noreferrer" target="_blank">仿了一个</a>，那时候用的是jquery             <br>之后，学Vue也有一段时间，浏览器端用得还算熟练，开始想更了解Vue的生态系统        <br>看完了各种资料后，觉得难懂的地方还是必须从实践中理解，于是再次想起了MyDiary        <br>这个项目前后端分离，后端使用nodejs和express实现RESTful API（<a href="https://github.com/ssshooter/MyDiary-API" rel="nofollow noreferrer" target="_blank">MyDiary API</a>）    <br>数据库选择了mongoDB，由于对数据库不太熟悉，数据库构建还是有所欠缺 &nbsp; &nbsp; &nbsp;  <br>前端使用了vue全家桶，使用webpack进行打包</p>
<h2 id="articleHeader2">技术栈</h2>
<p>vue2 / vuex / vue-router / webpack / ES6  / less</p>
<h2 id="articleHeader3">主要功能</h2>
<ul>
<li><p>电话本，有搜索功能，有侧边栏的字母索引</p></li>
<li><p>代办事项，可以新添、删除事项，划线表示完成</p></li>
<li><p>笔记本功能，有搜索功能可</p></li>
<li><p>可翻页小日历</p></li>
</ul>
<h2 id="articleHeader4">todo</h2>
<ul>
<li><p>[ ] 搜索功能待完成</p></li>
<li><p>[ ] 数据库结构优化</p></li>
<li><p>[ ] 登陆界面</p></li>
<li><p>[ ] 首页设定页面</p></li>
<li><p>[ ] 交换日记</p></li>
<li><p>[ ] 十分遥远的下一个目标，重构为PWA</p></li>
</ul>
<h2 id="articleHeader5">界面截图</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010076898" src="https://static.alili.tech/img/remote/1460000010076898" alt="ss1" title="ss1" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010076899" src="https://static.alili.tech/img/remote/1460000010076899" alt="ss2" title="ss2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010076901" src="https://static.alili.tech/img/remote/1460000010076901" alt="ss3" title="ss3" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010076902" src="https://static.alili.tech/img/remote/1460000010076902" alt="ss4" title="ss4" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010076903" src="https://static.alili.tech/img/remote/1460000010076903" alt="ss5" title="ss5" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010076904" src="https://static.alili.tech/img/remote/1460000010076904" alt="ss6" title="ss6" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">安装</h2>
<p>其实在登陆系统没做好之前，这个项目完全可以用作自己的网络笔记本和代办事项，欢迎各位使用   <br><strong>请先确定安装好了node.js和mongoDB</strong>   <br><strong>运行前请先安装MyDiary API</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># install dependencies</span>
npm install

<span class="hljs-comment"># serve with hot reload at localhost:8080</span>
npm run dev

<span class="hljs-comment"># build for production with minification</span>
npm run build</code></pre>
<h2 id="articleHeader7">PS</h2>
<p>17.7.26 BD就要发售啦！到时候可以仔细研究下剧中的App了～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue构建「你的名字」里的笔记应用MyDiary

## 原文链接
[https://segmentfault.com/a/1190000010076857](https://segmentfault.com/a/1190000010076857)


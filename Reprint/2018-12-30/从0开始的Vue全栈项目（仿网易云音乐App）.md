---
title: '从0开始的Vue全栈项目（仿网易云音乐App）' 
date: 2018-12-30 2:30:10
hidden: true
slug: eaxpcr4chfl
categories: [reprint]
---

{{< raw >}}

                    
<p>转行前端一年多，之前一直忙于写业务代码，刚好近期不忙，就想写一个完全属于自己的项目。原本打算用react来做的，但是估计边翻api边写可能会花特别长的时间，所以打算这个项目完成后写个react的项目。<br>本项目因为时间关系暂时只做了部分功能，但是有空会继续更新的。</p>
<h2 id="articleHeader0">运行项目</h2>
<ol>
<li>
<strong>将代码克隆到本地</strong>：<code>git clone https://github.com/chenging/vue.git</code>;</li>
<li>
<strong>安装依赖</strong>：进入项目根目录，命令行工具输入<code>npm install</code>;</li>
<li>
<strong>运行前端服务器</strong>：命令行工具输入<code>npm start</code>,打开<a href="http://localhost:8888" rel="nofollow noreferrer" target="_blank">http://localhost:8888</a>即可预览项目；</li>
<li>
<strong>安装数据库</strong>：可以直接到<a href="https://www.mongodb.com/download-center?jmp=nav#atlas" rel="nofollow noreferrer" target="_blank">mongodb官网</a>下载，安装完在C盘目录下新建文件夹<strong>data</strong>，进入<strong>data</strong>文件夹再新建一个<strong>db</strong>文件夹，此为<strong>mongodb</strong>默认存放数据目录；</li>
<li>
<strong>开启mongodb数据库</strong>：进入<strong>mongodb</strong>安装目录，找到<code>mongod.exe</code>文件，双击打开；</li>
<li>
<strong>运行node.js后台服务器</strong>：进入项目根目录，命令行工具输入<code>node server</code>，第一次运行会存入初始数据。</li>
</ol>
<h2 id="articleHeader1">一、目录结构</h2>
<p><span class="img-wrap"><img data-src="/img/bVVDb6?w=722&amp;h=606" src="https://static.alili.tech/img/bVVDb6?w=722&amp;h=606" alt="项目结构" title="项目结构" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">二、主要技术栈</h2>
<ol>
<li>前端：<code>vue</code>+<code>vue-router</code>+<code>axios</code>+<code>es6</code>+<code>webpack</code>+<code>canvas</code>;</li>
<li>后端：<code>node.js</code>+<code>koa</code>；</li>
<li>数据库：<code>mongodb</code>+<code>mongoose</code>
</li>
</ol>
<h2 id="articleHeader3">三、目前已完成的功能</h2>
<ol>
<li>音乐播放：包括播放进度条、播放动画、歌曲切换</li>
<li>视频播放：播放视频时暂停音乐播放，结束后会继续音乐播放；</li>
<li>登录注册：登录、注册、修改资料</li>
<li>歌曲搜索：通过歌曲名称、演唱者名字、歌词模糊查询。</li>
<li>图片轮播：自动切换图片及手动切换图片</li>
</ol>
<h2 id="articleHeader4">四、参考资料</h2>
<ol>
<li>
<strong>webpack官方文档</strong>：<a href="https://webpack.js.org/guides/getting-started/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/guides...</a>
</li>
<li>
<strong>廖老师nodejs教程</strong><a href="https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501245426ad4b91f2b880464ba876a8e3043fc8ef000" rel="nofollow noreferrer" target="_blank">https://www.liaoxuefeng.com/w...</a>
</li>
<li>
<strong>mongoose官方文档</strong>：<a href="http://mongoosejs.com/docs/api.html" rel="nofollow noreferrer" target="_blank">http://mongoosejs.com/docs/ap...</a>
</li>
</ol>
<h2 id="articleHeader5">五、在线演示及项目地址</h2>
<ol>
<li>在线演示地址：<a href="https://chenging.github.io/vue/dist/index.html#/findMusicIndex/musicIndex" rel="nofollow noreferrer" target="_blank">https://chenging.github.io/vu...</a>
</li>
<li>github地址：<a href="https://github.com/chenging/vue" rel="nofollow noreferrer" target="_blank">https://github.com/chenging/vue</a>
</li>
</ol>
<hr>
<p>项目截图和代码部分就不放了，里面有详细的注释（主要是怕自己给忘了。。。）<br>第一次写文章，也是第一个个人项目，包括后台和数据库都是第一次。。。。<br>更多的是对自己的一个总结吧，也欢迎大家对代码或者项目部分提出意见和建议。<br>项目未完成的部分后续会逐渐完成。</p>
<hr>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从0开始的Vue全栈项目（仿网易云音乐App）

## 原文链接
[https://segmentfault.com/a/1190000011316248](https://segmentfault.com/a/1190000011316248)


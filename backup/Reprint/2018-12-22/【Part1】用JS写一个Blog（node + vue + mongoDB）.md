---
title: '【Part1】用JS写一个Blog（node + vue + mongoDB）' 
date: 2018-12-22 2:30:11
hidden: true
slug: kjyexy6mtxq
categories: [reprint]
---

{{< raw >}}

                    
<p>学习JS也有一段时间了，准备试着写一个博客项目，前后端分离开发，后端用node只提供数据接口，前端用<code>vue-cli</code>脚手架搭建，路由也由前端控制，数据异步交互用vue的一个插件<code>vue-resourse</code>来做，数据库用<code>mongodb</code>。总的来说就是 <code>node</code> + <code>vue</code> + <code>mongodb</code> 开发博客系统，探索前端走向全栈之路。</p>
<p>我会记录下来整个过程在我的专栏，有兴趣的可以关注一下，一起学习，欢迎讨论。</p>
<p>话不多说，先进行前后端项目的初始化。</p>
<h4>前端项目初始化</h4>
<p>新建项目的文件夹，并切换到新建的文件夹<br>安装vue脚手架vue-cli 命令行输入 <code>npm install vue-cli -g</code><br>安装完成后，输入 <code>vue init webpack blog</code> // vue初始化，blog是项目的名称，可自行更改，初始化的数据可根据自己的的需要选择默认或是自己命名，需要说明的是，<code>vue-router</code>选项需要选择yes，因为要前后端分离，路由由前端控制。</p>
<p><span class="img-wrap"><img data-src="/img/bV0bqx?w=1220&amp;h=462" src="https://static.alili.tech/img/bV0bqx?w=1220&amp;h=462" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>安装完成后，输入命令 <code>cd blog</code> 切换到项目文件夹后,输入命令 <code>npm run dev</code> 访问一下 <code>http://localhost:8080</code>,项目初始化完成。（最新版本的vue-cli不用手动安装依赖，他会自动安装，所以没有了 npm install )</p>
<p><span class="img-wrap"><img data-src="/img/bV0btK?w=2420&amp;h=1262" src="https://static.alili.tech/img/bV0btK?w=2420&amp;h=1262" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>下面解释一下项目的目录</p>
<p><span class="img-wrap"><img data-src="/img/bV0bt3?w=592&amp;h=1158" src="https://static.alili.tech/img/bV0bt3?w=592&amp;h=1158" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><code>build</code>和<code>config</code>文件都是关于<code>webpack</code>的相关配置，暂且先不管它<br>项目中安装的依赖都存放在<code>node_modules</code>目录中<br><code>src</code>目录就是我们在开发过程中写代码的地方<br><code>assets</code>存放一些<code>js</code> <code>css</code> 图片等资源，可根据需要选择要与不要<br><code>components</code>中放的就是<code>.vue</code>的文件，每一个文件都是一个组件<br><code>router</code>中<code>index.js</code>就是我们写路由的地方<br><code>app.vue</code>就是最终的单页面呈现的组件<br><code>main.js</code>就是整个项目的入口文件</p>
<h4>后端项目初始化</h4>
<p>这里我用的node的express框架，先安装expres生成器，用来快速生成express应用骨架<br>命令行输入 <code>npm install express-generator -g</code> <br>安装成功后，命令行输入 <code>express blog-server</code>  // 这里<code>blog-server</code>是后端项目的名称，根据自己需要改变<br>安装完成后，进入后端项目 <code>cd blog-server</code><br>然后执行 <code>npm install</code> 安装项目依赖<br>安装完成后，启动项目 <code>npm start</code><br>打开浏览器访问 <code>localhost:3000</code> 可看到启动成功</p>
<p><span class="img-wrap"><img data-src="/img/bV0bwz?w=1094&amp;h=554" src="https://static.alili.tech/img/bV0bwz?w=1094&amp;h=554" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>前端和后端都启动成功，接下来就正式开始开发。<br>show time~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【Part1】用JS写一个Blog（node + vue + mongoDB）

## 原文链接
[https://segmentfault.com/a/1190000012398322](https://segmentfault.com/a/1190000012398322)


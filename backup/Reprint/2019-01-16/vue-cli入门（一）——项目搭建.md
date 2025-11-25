---
title: 'vue-cli入门（一）——项目搭建' 
date: 2019-01-16 2:30:08
hidden: true
slug: n3pl4cehzze
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>vue-cli作为一款mvvm框架语言(vue)的脚手架，集成了webpack环境及主要依赖，对于项目的搭建、打包、维护管理等都非常方便快捷。在开始项目之前，建议先熟悉vue.js基本语法。<br>安装Node环境</p>
<h1 id="articleHeader1">安装node环境</h1>
<h2 id="articleHeader2">1.安装node.js</h2>
<p>在node.js官网下载稳定版本</p>
<p><span class="img-wrap"><img data-src="/img/bVMyJp?w=626&amp;h=226" src="https://static.alili.tech/img/bVMyJp?w=626&amp;h=226" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>下载完成后点击安装，安装过程很简单，一直next即可，安装完成会自动添加node及npm环境变量。</p>
<p>检验是否安装成功，在cmd输入命令 node -v,回车 及 npm -v,回车，如出现下图所示版本信息，表示安装成功</p>
<p><span class="img-wrap"><img data-src="/img/bVMyKA?w=445&amp;h=155" src="https://static.alili.tech/img/bVMyKA?w=445&amp;h=155" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">2.安装vue-cli</h2>
<p>打开cmd命令行工具，输入npm install -g vue-cli,回车 全局安装vue-cli</p>
<p>注：npm会有点慢，建议更改为国内淘宝的镜像，只换源即可。在cmd输入命令：</p>
<p><strong>npm config set registry <a href="https://registry.npm.taobao.org/strong" rel="nofollow noreferrer" target="_blank">https://registry.npm.taobao.o...</a></strong></p>
<h1 id="articleHeader4">构建vue-cli项目</h1>
<h2 id="articleHeader5">1.创建项目</h2>
<p>打开cmd，进入想要创建项目的目录下，输入：<strong>vue init webpack projectname</strong></p>
<p>webpack默认是安装2.0版本，若要安装1.0版本，需在webpack后面加上版本号信息，</p>
<p><strong>vue init webpack#1.0 project-name</strong>(安装1.0版本)</p>
<p>projextname是自定义的项目名称，例：我这里命名为vuedemo</p>
<p><span class="img-wrap"><img data-src="/img/bVMyNM?w=477&amp;h=107" src="https://static.alili.tech/img/bVMyNM?w=477&amp;h=107" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>命令输入完成后敲回车，此时会自动下载template模板，稍微等待一会，会让你按提示完成项目的创建，如下图</p>
<p><span class="img-wrap"><img data-src="/img/bVMyNY?w=545&amp;h=259" src="https://static.alili.tech/img/bVMyNY?w=545&amp;h=259" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>Project name:——项目名称</p>
<p>Project description:——项目描述</p>
<p>Author:——作者</p>
<p>Vue build:——构建模式，一般默认选择第一种</p>
<p>Install vue-router?:——是否安装引入vue-router，这里选是，vue-router是路由组件,后面构建项目会用到</p>
<p>Use ESLint to lint your code?:——这里强烈建议选no 否则你会非常痛苦，eslint的格式验证非常严格，多一个空格少一个空格都会报错，所以对于新手来说，一般不建议开启，会加大开发难度</p>
<p>Setup unit tests with Karma + Mocha 以及Setup e2e tests with Nightwatch这两个是测试，可以不用安装</p>
<h2 id="articleHeader6">2.安装依赖</h2>
<p>项目创建完成，打开文件夹可以看到目录结构如下</p>
<p><span class="img-wrap"><img data-src="/img/bVMyP8?w=344&amp;h=364" src="https://static.alili.tech/img/bVMyP8?w=344&amp;h=364" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>此时，项目已经初具雏形，但还未安装依赖，需打开cmd，进入项目所在根目录下，输入npm install,回车</p>
<p><span class="img-wrap"><img data-src="/img/bVMyPu?w=623&amp;h=150" src="https://static.alili.tech/img/bVMyPu?w=623&amp;h=150" alt="依赖安装中" title="依赖安装中" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVMyQf?w=610&amp;h=204" src="https://static.alili.tech/img/bVMyQf?w=610&amp;h=204" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>安装完成后，再返回查看目录结构，可以看到多了node_modules文件夹，里面是各种需要的依赖包</p>
<p><span class="img-wrap"><img data-src="/img/bVMyQu?w=285&amp;h=394" src="https://static.alili.tech/img/bVMyQu?w=285&amp;h=394" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">3.运行项目</h2>
<p>打开cmd，进入到项目所在目录下，输入npm run dev,回车，启动项目</p>
<p><span class="img-wrap"><img data-src="/img/bVMyQM?w=320&amp;h=77" src="https://static.alili.tech/img/bVMyQM?w=320&amp;h=77" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>完成后，浏览器会自动打开，监听端口8080</p>
<p><span class="img-wrap"><img data-src="/img/bVMyQU?w=357&amp;h=73" src="https://static.alili.tech/img/bVMyQU?w=357&amp;h=73" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以在浏览器看到如下画面，恭喜你，已成功构建vue-cli项目，接下来就可以开始开发啦</p>
<p><span class="img-wrap"><img data-src="/img/bVMyQ6?w=1171&amp;h=648" src="https://static.alili.tech/img/bVMyQ6?w=1171&amp;h=648" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli入门（一）——项目搭建

## 原文链接
[https://segmentfault.com/a/1190000009151389](https://segmentfault.com/a/1190000009151389)


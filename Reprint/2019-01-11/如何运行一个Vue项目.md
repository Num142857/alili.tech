---
title: '如何运行一个Vue项目' 
date: 2019-01-11 2:30:08
hidden: true
slug: 41t77xtu3ux
categories: [reprint]
---

{{< raw >}}

                    
<p>一开始很多刚入手vue.js的人，会扒GitHub上的开源项目，但是发现不知如何运行GitHub上的开源项目，很尴尬。通过查阅网上教程，成功搭建好项目环境，同时对前段工程化有了朦朦胧胧的认知，因此将环境搭建过程分享给大家。</p>
<p>首先，列出来我们需要的东西：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node.js环境（npm包管理器）
vue-cli 脚手架构建工具
cnpm  npm的淘宝镜像
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-keyword">node</span>.<span class="hljs-title">js</span>环境（npm包管理器）
vue-cli 脚手架构建工具
cnpm  npm的淘宝镜像
</code></pre>
<h2 id="articleHeader0">安装node.js</h2>
<p>从node.js官网下载并安装node，安装过程很简单，一路“下一步”就可以了（傻瓜式安装）。<br>安装完成之后，打开命令行工具，输入 node -v，如下图，如果出现相应的版本号，则说明安装成功。</p>
<p><span class="img-wrap"><img data-src="/img/bVPz9f?w=649&amp;h=424" src="https://static.alili.tech/img/bVPz9f?w=649&amp;h=424" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>npm包管理器，是集成在node中的，所以，直接输入 npm -v就会如下图所示，显示出npm的版本信息。</p>
<p><span class="img-wrap"><img data-src="/img/bVPz9s?w=650&amp;h=425" src="https://static.alili.tech/img/bVPz9s?w=650&amp;h=425" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>OK！node环境已经安装完成，npm包管理器也有了。由于有些npm有些资源被屏蔽或者是国外资源的原因，经常会导致用npm安装依赖包的时候失败，所有我还需要npm的国内镜像---cnpm。</p>
<h2 id="articleHeader1">安装cnpm</h2>
<p>在命令行中输入 npm install -g cnpm --registry=<a href="http://registry.npm.taobao.org" rel="nofollow noreferrer" target="_blank">http://registry.npm.taobao.org</a> 然后等待，安装完成如下图。</p>
<p><span class="img-wrap"><img data-src="/img/bVPz9M?w=651&amp;h=423" src="https://static.alili.tech/img/bVPz9M?w=651&amp;h=423" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>完成之后，我们就可以用cnpm代替npm来安装依赖包了。如果想进一步了解cnpm的，<a href="https://npm.taobao.org/" rel="nofollow noreferrer" target="_blank">查看淘宝npm镜像官网</a>。</p>
<h2 id="articleHeader2">安装vue-cli脚手架构建工具</h2>
<p>在命令行中运行命令 cnpm install -g vue-cli ，然后等待安装完成。(注意，这里使用cnpm来替代npm，不然速度超级慢，会导致卡在那)<br>通过以上三部，我们需要准备的环境和工具都准备好了，接下来就开始使用vue-cli来构建项目。</p>
<h2 id="articleHeader3">用vue-cli构建项目</h2>
<p>要创建项目，首先我们要选定目录，然后再命令行中把目录转到选定的目录。在这里，我选择桌面来存放新建的项目，则我们需要先把目录cd到桌面，如下图。</p>
<p><span class="img-wrap"><img data-src="/img/bVPAad?w=652&amp;h=423" src="https://static.alili.tech/img/bVPAad?w=652&amp;h=423" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在桌面目录下，在命令行中运行命令 vue init webpack firstVue 。解释一下这个命令，这个命令的意思是初始化一个项目，其中webpack是构建工具，也就是整个项目是基于webpack的。其中firstVue是整个项目文件夹的名称，这个文件夹会自动生成在你指定的目录中（我的实例中，会在桌面生成该文件夹），如下图。</p>
<p><span class="img-wrap"><img data-src="/img/bVPAat?w=651&amp;h=486" src="https://static.alili.tech/img/bVPAat?w=651&amp;h=486" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>运行初始化命令的时候回让用户输入几个基本的选项，如项目名称，描述，作者等信息，如果不想填直接回车默认就好。</p>
<p><span class="img-wrap"><img data-src="/img/bVPAaN?w=653&amp;h=367" src="https://static.alili.tech/img/bVPAaN?w=653&amp;h=367" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>打开firstVue文件夹，项目文件如下所示。</p>
<p><span class="img-wrap"><img data-src="/img/bVPAaX?w=1200&amp;h=675" src="https://static.alili.tech/img/bVPAaX?w=1200&amp;h=675" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这就是整个项目的目录结构，其中，我们主要在src目录中做修改。这个项目现在还只是一个结构框架，整个项目需要的依赖资源都还没有安装，如下图。</p>
<p><span class="img-wrap"><img data-src="/img/bVPAa3?w=777&amp;h=988" src="https://static.alili.tech/img/bVPAa3?w=777&amp;h=988" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">安装项目所需的依赖</h2>
<p>要安装依赖包，首先cd到项目文件夹（firstVue文件夹），然后运行命令 cnpm install ，等待安装。</p>
<p><span class="img-wrap"><img data-src="/img/bVPAbe?w=677&amp;h=442" src="https://static.alili.tech/img/bVPAbe?w=677&amp;h=442" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>安装完成之后，会在我们的项目目录firstVue文件夹中多出一个node_modules文件夹，这里边就是我们项目需要的依赖包资源。</p>
<p><span class="img-wrap"><img data-src="/img/bVPAbj?w=1200&amp;h=675" src="https://static.alili.tech/img/bVPAbj?w=1200&amp;h=675" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>安装完依赖包之后，就可以运行整个项目了。</p>
<h2 id="articleHeader5">运行项目</h2>
<p>在项目目录中，运行命令 npm run dev ，会用热加载的方式运行我们的应用，热加载可以让我们在修改完代码后不用手动刷新浏览器就能实时看到修改后的效果。</p>
<p><span class="img-wrap"><img data-src="/img/bVPAbs?w=1260&amp;h=476" src="https://static.alili.tech/img/bVPAbs?w=1260&amp;h=476" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这里简单介绍下 npm run dev 命令，其中的“run”对应的是package.json文件中，scripts字段中的dev，也就是 node build/dev-server.js命令的一个快捷方式。</p>
<p>项目运行成功后，浏览器会自动打开localhost:8080（如果浏览器没有自动打开，可以手动输入）。运行成功后，会看到如下所示的界面。</p>
<p><span class="img-wrap"><img data-src="/img/bVPAbE?w=1064&amp;h=658" src="https://static.alili.tech/img/bVPAbE?w=1064&amp;h=658" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果看到这个页面，说明项目运行成功了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何运行一个Vue项目

## 原文链接
[https://segmentfault.com/a/1190000009871504](https://segmentfault.com/a/1190000009871504)

